import type { NextApiRequest, NextApiResponse } from 'next';

type HealthCheckResponse = {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  checks?: {
    emailConfig: boolean;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthCheckResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    });
  }

  // Check email configuration
  const emailConfigured =
    Boolean(process.env.MAIL_USER) &&
    Boolean(process.env.MAIL_PASS) &&
    Boolean(process.env.NEXT_PUBLIC_CONTACT_EMAIL);

  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    checks: {
      emailConfig: emailConfigured,
    },
  });
}
