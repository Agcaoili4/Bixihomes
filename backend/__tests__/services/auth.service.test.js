import { describe, it, expect, beforeAll } from 'vitest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyCredentials, signToken } from '../../src/services/auth.service.js';

const TEST_SECRET = 'a-test-secret-that-is-at-least-32-chars-long!!';
const TEST_EMAIL = 'admin@test.com';
let TEST_HASH;

beforeAll(async () => {
  TEST_HASH = await bcrypt.hash('correct-password', 12);
  process.env.JWT_SECRET = TEST_SECRET;
  process.env.JWT_EXPIRES_IN = '1h';
  process.env.ADMIN_EMAIL = TEST_EMAIL;
  process.env.ADMIN_PASSWORD_HASH = TEST_HASH;
});

describe('verifyCredentials', () => {
  it('returns user object for valid credentials', async () => {
    const user = await verifyCredentials(TEST_EMAIL, 'correct-password');
    expect(user).toEqual({ email: TEST_EMAIL, role: 'admin' });
  });

  it('returns null for wrong email', async () => {
    const user = await verifyCredentials('wrong@test.com', 'correct-password');
    expect(user).toBeNull();
  });

  it('returns null for wrong password', async () => {
    const user = await verifyCredentials(TEST_EMAIL, 'wrong-password');
    expect(user).toBeNull();
  });
});

describe('signToken', () => {
  it('returns a valid JWT containing email and role', () => {
    const token = signToken({ email: TEST_EMAIL, role: 'admin' });
    const decoded = jwt.verify(token, TEST_SECRET);
    expect(decoded.email).toBe(TEST_EMAIL);
    expect(decoded.role).toBe('admin');
  });

  it('token expires according to JWT_EXPIRES_IN', () => {
    const token = signToken({ email: TEST_EMAIL, role: 'admin' });
    const decoded = jwt.verify(token, TEST_SECRET);
    expect(decoded.exp).toBeDefined();
    const oneHour = 60 * 60;
    const diff = decoded.exp - decoded.iat;
    expect(diff).toBe(oneHour);
  });
});
