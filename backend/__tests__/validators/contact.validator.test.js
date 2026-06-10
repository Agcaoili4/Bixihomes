import { describe, it, expect } from 'vitest';
import { contactSchema } from '../../src/validators/contact.validator.js';

const currentServiceOptions = [
  'Roofing',
  'Siding',
  'Fascia & Gutters',
  'Window Replacement',
  'Fencing & Decking',
  'Repair & Renovation',
  'New Build',
  'Basement Development',
  'Bathroom Remodeling',
  'Garage Building',
  'Interior Finishing',
];

const legacyServiceOptions = [
  'Fascia',
  'Gutters',
  'Home Renovation',
  'Flat Roofing',
  'Sloped Roofing',
  'Fencing',
  'Decking',
  'Outdoor Builds',
];

describe('contactSchema', () => {
  const validInput = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    phone: '(403) 991-2631',
    service: 'Repair & Renovation',
    message: 'I need a quote for my kitchen.',
  };

  it('accepts valid input with all fields', () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('accepts valid input without optional fields', () => {
    const { service, message, ...required } = validInput;
    const result = contactSchema.safeParse(required);
    expect(result.success).toBe(true);
  });

  it('rejects missing firstName', () => {
    const { firstName, ...rest } = validInput;
    const result = contactSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('rejects missing email', () => {
    const { email, ...rest } = validInput;
    const result = contactSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('rejects invalid email format', () => {
    const result = contactSchema.safeParse({ ...validInput, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects phone with fewer than 10 digits', () => {
    const result = contactSchema.safeParse({ ...validInput, phone: '403-991' });
    expect(result.success).toBe(false);
  });

  it('accepts phone in various formats', () => {
    const formats = ['+14039912631', '403-991-2631', '(403) 991 2631', '4039912631'];
    for (const phone of formats) {
      const result = contactSchema.safeParse({ ...validInput, phone });
      expect(result.success).toBe(true);
    }
  });

  it('rejects invalid service option', () => {
    const result = contactSchema.safeParse({ ...validInput, service: 'Plumbing' });
    expect(result.success).toBe(false);
  });

  it('accepts all current service options used by the frontend', () => {
    for (const service of currentServiceOptions) {
      const result = contactSchema.safeParse({ ...validInput, service });
      expect(result.success).toBe(true);
    }
  });

  it('accepts legacy service options for backwards compatibility', () => {
    for (const service of legacyServiceOptions) {
      const result = contactSchema.safeParse({ ...validInput, service });
      expect(result.success).toBe(true);
    }
  });

  it('rejects firstName longer than 50 chars', () => {
    const result = contactSchema.safeParse({ ...validInput, firstName: 'A'.repeat(51) });
    expect(result.success).toBe(false);
  });

  it('rejects message longer than 2000 chars', () => {
    const result = contactSchema.safeParse({ ...validInput, message: 'A'.repeat(2001) });
    expect(result.success).toBe(false);
  });

  it('strips HTML tags from string fields', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      firstName: '<script>alert("xss")</script>John',
      message: '<b>Hello</b> world',
    });
    expect(result.success).toBe(true);
    expect(result.data.firstName).toBe('alert("xss")John');
    expect(result.data.message).toBe('Hello world');
  });

  it('trims whitespace from string fields', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      firstName: '  John  ',
      lastName: '  Smith  ',
    });
    expect(result.success).toBe(true);
    expect(result.data.firstName).toBe('John');
    expect(result.data.lastName).toBe('Smith');
  });

  it('strips CR/LF (header injection) from name fields', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      firstName: 'John\r\nBcc: attacker@evil.com',
      lastName: 'Smith\nSubject: hijacked',
    });
    expect(result.success).toBe(true);
    expect(result.data.firstName).not.toMatch(/[\r\n]/);
    expect(result.data.lastName).not.toMatch(/[\r\n]/);
    expect(result.data.firstName).toBe('JohnBcc: attacker@evil.com');
  });

  it('strips NUL and other control characters from name fields', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      firstName: 'Jo\x00hn\x07',
    });
    expect(result.success).toBe(true);
    expect(result.data.firstName).toBe('John');
  });

  it('rejects an email containing whitespace or newlines', () => {
    for (const email of ['john@example.com\nBcc: x@y.com', 'jo hn@example.com', 'john@ex\tample.com']) {
      const result = contactSchema.safeParse({ ...validInput, email });
      expect(result.success).toBe(false);
    }
  });

  it('preserves newlines in the message body but strips other control chars', () => {
    const result = contactSchema.safeParse({
      ...validInput,
      message: 'Line one\nLine two\x00\x07 still here',
    });
    expect(result.success).toBe(true);
    expect(result.data.message).toBe('Line one\nLine two still here');
  });

  it('rejects a phone number containing letters', () => {
    const result = contactSchema.safeParse({ ...validInput, phone: '403-CALL-NOW' });
    expect(result.success).toBe(false);
  });
});
