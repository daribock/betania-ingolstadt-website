import { describe, it, expect } from 'vitest';
import {
  contactSchema,
  reasonKeys,
  spamSignals,
  type ContactFormData,
} from './contact';

const valid: ContactFormData = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  number: '',
  reason: 'FAITH_JESUS',
  message: 'Hello there',
};

const errorsFor = (override: Record<string, unknown>) => {
  const result = contactSchema.safeParse({ ...valid, ...override });
  return result.success ? [] : result.error.issues.map((i) => i.message);
};

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('exposes every reason as a key', () => {
    expect(reasonKeys).toEqual(['FAITH_JESUS', 'SERVE', 'BAPTISM', 'OTHER']);
  });

  it.each([
    [{ firstName: '' }, 'firstNameRequired'],
    [{ firstName: 'a'.repeat(51) }, 'firstNameTooLong'],
    [{ lastName: '' }, 'lastNameRequired'],
    [{ lastName: 'a'.repeat(51) }, 'lastNameTooLong'],
    [{ email: 'nope' }, 'emailInvalid'],
    [{ number: 'abc' }, 'phoneInvalid'],
    [{ reason: 'BOGUS' }, 'reasonInvalid'],
    [{ message: '' }, 'messageRequired'],
    [{ message: 'a '.repeat(101) }, 'messageTooLong'],
  ])('reports %j as %s', (override, key) => {
    expect(errorsFor(override)).toContain(key);
  });

  it.each(['+49 (841) 920-887', '0841920887', '  '])(
    'accepts phone number %j',
    (number) => {
      expect(errorsFor({ number })).toEqual([]);
    },
  );

  it.each([
    'see http://spam.example',
    'see HTTPS://spam.example',
    'visit www.spam.example',
    '[url=x]click[/url]',
  ])('rejects the link %j in every free-text field', (text) => {
    for (const field of ['firstName', 'lastName', 'message']) {
      expect(errorsFor({ [field]: text })).toContain('linksNotAllowed');
    }
  });

  it('allows plain text that merely mentions a site', () => {
    expect(errorsFor({ message: 'Ich bin neu in Ingolstadt.' })).toEqual([]);
  });
});

describe('spamSignals', () => {
  const count = (override: Partial<ContactFormData>) =>
    spamSignals({ ...valid, ...override });

  it('is 0 for a normal submission', () => {
    expect(count({})).toBe(0);
  });

  it('counts a long message without spaces', () => {
    expect(count({ message: 'HEFtdUnfEmWDTxYGuj' })).toBe(1);
  });

  it('ignores a short message without spaces', () => {
    expect(count({ message: 'Hallo' })).toBe(0);
  });

  it('counts a Gmail address with 3+ dots before the @', () => {
    expect(count({ email: 'aj.i.vot.e.22.3@gmail.com' })).toBe(1);
  });

  it('ignores 2 dots in a Gmail address and dots in other domains', () => {
    expect(count({ email: 'a.b.c@gmail.com' })).toBe(0);
    expect(count({ email: 'a.b.c.d@example.com' })).toBe(0);
  });

  it('counts a capital letter inside a name, once for both names', () => {
    expect(count({ firstName: 'aBcDe' })).toBe(1);
    expect(count({ firstName: 'aBcDe', lastName: 'xYz' })).toBe(1);
  });

  it('ignores capitalised and non-Latin names', () => {
    expect(count({ firstName: 'Anne-Marie', lastName: 'Müller' })).toBe(0);
    expect(count({ firstName: 'Ștefan', lastName: 'Popescu' })).toBe(0);
  });

  it('scores the real spam sample as 2', () => {
    expect(
      count({
        firstName: 'Qqau',
        lastName: 'Vgetemb',
        email: 'aj.i.vot.e.22.3@gmail.com',
        message: 'HEFtdUnfEmWDTxYGuj',
      }),
    ).toBe(2);
  });
});
