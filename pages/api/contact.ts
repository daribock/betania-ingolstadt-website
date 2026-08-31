import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/validations/contact';
import { z } from 'zod';

const rateLimit = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const limit = 5; // 5 requests per 15 minutes

  // Prevent memory leak
  if (rateLimit.size > 10000) {
    rateLimit.clear();
  }

  const record = rateLimit.get(ip);
  if (!record) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - record.timestamp > windowMs) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }

  record.count += 1;
  return record.count <= limit;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  // Check environment variables
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
    console.error('Missing email configuration');

    return res.status(500).json({ message: 'Email service not configured' });
  }

  console.log(req.body);

  // Validate request body with Zod
  try {
    const validatedData = contactSchema.parse(req.body);
    const { firstName, lastName, email, number, reason, message, botField } =
      validatedData;

    // Honeypot spam protection
    if (botField) {
      return res.status(400).json({ message: 'Spam detected.' });
    }

    // Send email
    try {
      const transporter = nodemailer.createTransport({
        service: 'One',
        auth: {
          user: process.env.MAIL_USER, // your one.com email address
          pass: process.env.MAIL_PASS, // your one.com email password
        },
      });

      const text: string =
        `First Name: ${firstName}\n` +
        `Last Name: ${lastName}\n` +
        `Email: ${email}\n` +
        (number ? `Phone: ${number}\n` : '') +
        `Reason: ${reason}\n` +
        `Message:\n${message}`;

      await transporter.sendMail({
        from: `Website Contact <${process.env.MAIL_USER}>`,
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
        subject: `Kontaktformular: ${firstName} ${lastName} (${reason})`,
        text,
      });

      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.issues.map((e) => e.message),
      });
    }
    return res.status(400).json({ message: 'Invalid request data' });
  }
}
