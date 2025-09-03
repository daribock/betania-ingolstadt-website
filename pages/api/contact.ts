import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/validations/contact';
import { z } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the current locale
  // const locale = await getLocale();
  // const t = await getTranslations('ProfilePage');
  // const {locale} = await params;
  // const t = await getTranslations({locale, namespace: 'Metadata'});

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check environment variables
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
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
        to: 'hello@betania.de',
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
