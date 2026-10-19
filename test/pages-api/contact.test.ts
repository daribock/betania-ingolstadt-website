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
  startedAt: Date.now() - 10_000,
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
    const { req, res, status, json } = createMocks({ body: validBody });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: 'Email service not configured' });
  });

  it('returns 400 on invalid request data', async () => {
    const { req, res, status, json } = createMocks({
      body: { ...validBody, email: 'not-an-email' },
    });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Validation error' }),
    );
  });

  it('silently drops submissions with the honeypot filled', async () => {
    const { req, res, status } = createMocks({ body: { ...validBody, website: 'bot' } });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it.each([
    ['too fast', { startedAt: Date.now() - 1_000 }],
    ['stale', { startedAt: Date.now() - 25 * 60 * 60 * 1000 }],
    ['without a start time', { startedAt: undefined }],
  ])('silently drops submissions that are %s', async (_name, override) => {
    const { req, res, status } = createMocks({ body: { ...validBody, ...override } });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('rejects links in the message with a translation key', async () => {
    const { req, res, status, json } = createMocks({
      body: { ...validBody, message: 'visit www.spam.example' },
    });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ errors: ['linksNotAllowed'] }),
    );
  });

  it('silently drops submissions with two gibberish signals', async () => {
    const { req, res, status } = createMocks({
      body: {
        ...validBody,
        firstName: 'Qqau',
        lastName: 'Vgetemb',
        email: 'aj.i.vot.e.22.3@gmail.com',
        number: '6181639905',
        message: 'HEFtdUnfEmWDTxYGuj',
      },
    });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('tags submissions with one gibberish signal', async () => {
    sendMail.mockResolvedValue({ response: 'ok' });
    const { req, res, status } = createMocks({
      body: { ...validBody, message: 'Gottesdienstzeitenbitte' },
    });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ subject: expect.stringMatching(/^\[SPAM\?\] /) }),
    );
  });

  it('sends the email and returns 200 on success', async () => {
    sendMail.mockResolvedValue({ response: 'ok' });
    const { req, res, status, json } = createMocks({ body: validBody });

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
    const { req, res, status, json } = createMocks({ body: validBody });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: 'Failed to send email' });
  });
});
