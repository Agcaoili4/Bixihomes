import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';

// Dummy hash so bcrypt.compare always runs even when the email is wrong.
// Prevents a timing side-channel that would otherwise reveal the admin email.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12);

export const verifyCredentials = async (email, password) => {
  const isAdminEmail = email === env.ADMIN_EMAIL;
  const hashToCheck = isAdminEmail ? env.ADMIN_PASSWORD_HASH : DUMMY_HASH;
  const passwordValid = await bcrypt.compare(password, hashToCheck);

  if (!isAdminEmail || !passwordValid) return null;

  return { email: env.ADMIN_EMAIL, role: 'admin' };
};

export const signToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: env.JWT_EXPIRES_IN,
  });
};
