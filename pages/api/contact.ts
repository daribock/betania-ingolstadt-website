import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { contactSchema, spamSignals } from '@/lib/validations/contact';
import { z } from 'zod';

const MIN_FILL_MS = 3_000;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check environment variables
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
    console.error('Missing email configuration');

    return res.status(500).json({ message: 'Email service not configured' });
  }

  // Validate request body with Zod
  try {
    const validatedData = contactSchema.parse(req.body);
    const { firstName, lastName, email, number, reason, message, website, startedAt } =
      validatedData;

    // Fake success so bots don't learn what tripped the filter
    const elapsed = startedAt === undefined ? NaN : Date.now() - startedAt;
    const signals = spamSignals(validatedData);
    if (
      website ||
      !(elapsed >= MIN_FILL_MS && elapsed <= MAX_AGE_MS) ||
      signals >= 2
    ) {
      return res.status(200).json({ message: 'Email sent successfully' });
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
        subject: `${signals === 1 ? '[SPAM?] ' : ''}Kontaktformular: ${firstName} ${lastName} (${reason})`,
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
