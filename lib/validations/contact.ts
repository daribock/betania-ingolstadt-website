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

const LINK_PATTERN = /https?:\/\/|www\.|\[url=/i;
const noLinks = (val: string) => !LINK_PATTERN.test(val);

// Error messages are keys under `Contact.validation` in i18n/locales/*.json
export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, 'firstNameRequired')
    .max(50, 'firstNameTooLong')
    .refine(noLinks, 'linksNotAllowed'),
  lastName: z
    .string()
    .min(1, 'lastNameRequired')
    .max(50, 'lastNameTooLong')
    .refine(noLinks, 'linksNotAllowed'),
  email: z.email('emailInvalid'),
  number: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || !val.trim()) return true; // Optional field
      const cleanedNumber = val.replace(/[\s\-\(\)\+]/g, '');
      return /^\d{6,15}$/.test(cleanedNumber);
    }, 'phoneInvalid'),
  reason: z.enum(reasonKeys, {
    message: 'reasonInvalid',
  }),
  message: z
    .string()
    .min(1, 'messageRequired')
    .max(200, 'messageTooLong')
    .refine(noLinks, 'linksNotAllowed'),
  // Honeypot: hidden from humans, bots fill it.
  website: z.string().optional(),
  // Epoch ms when the form was opened.
  startedAt: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/** Number of gibberish signals (0-3) in a submission. */
export function spamSignals(data: ContactFormData): number {
  const gmailDots =
    /^[^@]*@gmail\.com$/i.test(data.email) &&
    (data.email.split('@')[0].match(/\./g)?.length ?? 0) >= 3;
  const oddCaps = [data.firstName, data.lastName].some((n) =>
    /\p{Ll}\p{Lu}/u.test(n),
  );
  const longNoSpace = data.message.length >= 12 && !/\s/.test(data.message);

  return [gmailDots, oddCaps, longNoSpace].filter(Boolean).length;
}
