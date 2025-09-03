import { z } from 'zod';

// Contact reasons enum
export enum ContactReason {
  FAITH_JESUS = 'FAITH_JESUS',
  SERVE = 'SERVE',
  BAPTISM = 'BAPTISM',
  OTHER = 'OTHER',
}

export const reasonKeys = Object.keys(ContactReason) as Array<
  keyof typeof ContactReason
>;

// Zod schema for request body validation
export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name too long'),
  email: z.string().email('Invalid email format'),
  number: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || !val.trim()) return true; // Optional field
      const cleanedNumber = val.replace(/[\s\-\(\)\+]/g, '');
      return /^\d{6,15}$/.test(cleanedNumber);
    }, 'Invalid phone number format'),
  reason: z.enum(reasonKeys, {
    message: 'Please select a valid reason',
  }),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(200, 'Message too long (max 200 characters)'),
  botField: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
