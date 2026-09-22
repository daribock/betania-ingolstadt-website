// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../health';

function createMocks(method = 'GET') {
  const req = { method } as unknown as NextApiRequest;
  const json = vi.fn();
  const status = vi.fn().mockReturnValue({ json });
  const res = { status } as unknown as NextApiResponse;
  return { req, res, status, json };
}

describe('GET /api/health', () => {
  beforeEach(() => {
    delete process.env.MAIL_USER;
    delete process.env.MAIL_PASS;
    delete process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  });

  it('rejects non-GET methods', async () => {
    const { req, res, status, json } = createMocks('POST');

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(405);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error' }),
    );
  });

  it('reports emailConfig as false when mail env vars are missing', async () => {
    const { req, res, status, json } = createMocks();

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok', checks: { emailConfig: false } }),
    );
  });

  it('reports emailConfig as true when mail env vars are set', async () => {
    process.env.MAIL_USER = 'mail@example.com';
    process.env.MAIL_PASS = 'secret';
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = 'contact@example.com';
    const { req, res, json } = createMocks();

    await handler(req, res);

    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ checks: { emailConfig: true } }),
    );
  });
});
