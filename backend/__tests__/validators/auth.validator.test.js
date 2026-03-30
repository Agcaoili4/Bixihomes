import { describe, it, expect } from 'vitest';
import { loginSchema } from '../../src/validators/auth.validator.js';

describe('loginSchema', () => {
  const validInput = { email: 'admin@bixihomes.com', password: 'securePassword1!' };

  it('accepts valid email and password', () => {
    const result = loginSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('rejects missing email', () => {
    const result = loginSchema.safeParse({ password: 'test' });
    expect(result.success).toBe(false);
  });

  it('rejects missing password', () => {
    const result = loginSchema.safeParse({ email: 'admin@test.com' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email format', () => {
    const result = loginSchema.safeParse({ ...validInput, email: 'not-email' });
    expect(result.success).toBe(false);
  });

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({ ...validInput, password: '' });
    expect(result.success).toBe(false);
  });

  it('trims email whitespace', () => {
    const result = loginSchema.safeParse({ ...validInput, email: '  admin@test.com  ' });
    expect(result.success).toBe(true);
    expect(result.data.email).toBe('admin@test.com');
  });
});
