import { describe, expect, test } from 'bun:test';
import { contactSchema, ContactReason } from './contact';

describe('Contact Schema Validation', () => {
  const validData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    number: '1234567890',
    reason: ContactReason.OTHER,
    message: 'This is a test message.',
  };

  test('should validate correct data', () => {
    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('firstName validation', () => {
    test('should require firstName', () => {
      const { firstName, ...rest } = validData;
      const result = contactSchema.safeParse(rest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid input: expected string, received undefined');
      }
    });

    test('should fail if firstName is empty', () => {
      const result = contactSchema.safeParse({ ...validData, firstName: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('First name is required');
      }
    });

    test('should fail if firstName is too long', () => {
      const result = contactSchema.safeParse({
        ...validData,
        firstName: 'a'.repeat(51),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('First name too long');
      }
    });
  });

  describe('lastName validation', () => {
    test('should require lastName', () => {
      const { lastName, ...rest } = validData;
      const result = contactSchema.safeParse(rest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid input: expected string, received undefined');
      }
    });

    test('should fail if lastName is empty', () => {
      const result = contactSchema.safeParse({ ...validData, lastName: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Last name is required');
      }
    });

    test('should fail if lastName is too long', () => {
      const result = contactSchema.safeParse({
        ...validData,
        lastName: 'a'.repeat(51),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Last name too long');
      }
    });
  });

  describe('email validation', () => {
    test('should require email', () => {
      const { email, ...rest } = validData;
      const result = contactSchema.safeParse(rest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid input: expected string, received undefined');
      }
    });

    test('should fail if email is invalid', () => {
      const result = contactSchema.safeParse({
        ...validData,
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email format');
      }
    });
  });

  describe('number validation', () => {
    test('should allow empty number (optional)', () => {
      const { number, ...rest } = validData;
      const result = contactSchema.safeParse(rest);
      expect(result.success).toBe(true);
    });

    test('should allow empty string for number', () => {
      const result = contactSchema.safeParse({ ...validData, number: '' });
      expect(result.success).toBe(true);
    });

    test('should allow whitespace for number', () => {
      const result = contactSchema.safeParse({ ...validData, number: '   ' });
      expect(result.success).toBe(true);
    });

    test('should allow formatted phone numbers', () => {
      const formats = [
        '+1 (555) 123-4567',
        '+44 20 7123 1234',
        '0049 89 123456',
        '0176-12345678',
        '123456',
        '123456789012345'
      ];

      formats.forEach(num => {
        const result = contactSchema.safeParse({ ...validData, number: num });
        expect(result.success).toBe(true);
      });
    });

    test('should fail if phone number is too short', () => {
      const result = contactSchema.safeParse({ ...validData, number: '12345' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid phone number format');
      }
    });

    test('should fail if phone number is too long', () => {
      const result = contactSchema.safeParse({ ...validData, number: '1234567890123456' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid phone number format');
      }
    });

    test('should fail if phone number contains invalid characters', () => {
      const result = contactSchema.safeParse({ ...validData, number: '123456789a' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid phone number format');
      }
    });
  });

  describe('reason validation', () => {
    test('should require reason', () => {
      const { reason, ...rest } = validData;
      const result = contactSchema.safeParse(rest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please select a valid reason');
      }
    });

    test('should fail if reason is invalid', () => {
      const result = contactSchema.safeParse({ ...validData, reason: 'INVALID_REASON' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please select a valid reason');
      }
    });
  });

  describe('message validation', () => {
    test('should require message', () => {
      const { message, ...rest } = validData;
      const result = contactSchema.safeParse(rest);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid input: expected string, received undefined');
      }
    });

    test('should fail if message is empty', () => {
      const result = contactSchema.safeParse({ ...validData, message: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Message is required');
      }
    });

    test('should fail if message is too long', () => {
      const result = contactSchema.safeParse({
        ...validData,
        message: 'a'.repeat(201),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Message too long (max 200 characters)');
      }
    });
  });

  describe('botField validation', () => {
    test('should allow empty botField', () => {
      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test('should allow string in botField', () => {
      const result = contactSchema.safeParse({ ...validData, botField: 'spam' });
      expect(result.success).toBe(true);
    });
  });
});
