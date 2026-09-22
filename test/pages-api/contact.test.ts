// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/contact';

const sendMail = vi.fn();
vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail })),
  },
}));

function createMocks(overrides: {
  method?: string;
  body?: Record<string, unknown>;
  ip?: string;
} = {}) {
  const req = {
    method: overrides.method ?? 'POST',
    headers: { 'x-forwarded-for': overrides.ip ?? '127.0.0.1' },
    socket: { remoteAddress: overrides.ip ?? '127.0.0.1' },
    body: overrides.body ?? {},
  } as unknown as NextApiRequest;

  const json = vi.fn();
  const status = vi.fn().mockReturnValue({ json });
  const res = { status } as unknown as NextApiResponse;

  return { req, res, status, json };
}

const validBody = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  reason: 'FAITH_JESUS',
  message: 'Hello there',
};

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.MAIL_USER = 'mail@example.com';
    process.env.MAIL_PASS = 'secret';
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = 'contact@example.com';
  });

  it('rejects non-POST methods', async () => {
    const { req, res, status, json } = createMocks({ method: 'GET' });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(405);
    expect(json).toHaveBeenCalledWith({ message: 'Method not allowed' });
  });

  it('returns 500 when email is not configured', async () => {
    delete process.env.MAIL_USER;
    const { req, res, status, json } = createMocks({ body: validBody, ip: '10.0.0.1' });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: 'Email service not configured' });
  });

  it('returns 400 on invalid request data', async () => {
    const { req, res, status, json } = createMocks({
      body: { ...validBody, email: 'not-an-email' },
      ip: '10.0.0.2',
    });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Validation error' }),
    );
  });

  it('returns 400 when the honeypot field is filled', async () => {
    const { req, res, status, json } = createMocks({
      body: { ...validBody, botField: 'bot' },
      ip: '10.0.0.3',
    });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ message: 'Spam detected.' });
  });

  it('sends the email and returns 200 on success', async () => {
    sendMail.mockResolvedValue({ response: 'ok' });
    const { req, res, status, json } = createMocks({ body: validBody, ip: '10.0.0.4' });

    await handler(req, res);

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'contact@example.com',
        subject: expect.stringContaining('Jane Doe'),
      }),
    );
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ message: 'Email sent successfully' });
  });

  it('returns 500 when sending the email fails', async () => {
    sendMail.mockRejectedValue(new Error('smtp down'));
    const { req, res, status, json } = createMocks({ body: validBody, ip: '10.0.0.5' });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: 'Failed to send email' });
  });

  it('rate limits after 5 requests from the same IP', async () => {
    sendMail.mockResolvedValue({ response: 'ok' });
    const ip = '10.0.0.6';

    for (let i = 0; i < 5; i++) {
      const { req, res } = createMocks({ body: validBody, ip });
      await handler(req, res);
    }

    const { req, res, status, json } = createMocks({ body: validBody, ip });
    await handler(req, res);

    expect(status).toHaveBeenCalledWith(429);
    expect(json).toHaveBeenCalledWith({
      message: 'Too many requests, please try again later.',
    });
  });
});
