import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export const verifyCredentials = async (email, password) => {
  if (email !== env.ADMIN_EMAIL) return null;

  const valid = await bcrypt.compare(password, env.ADMIN_PASSWORD_HASH);
  if (!valid) return null;

  return { email: env.ADMIN_EMAIL, role: 'admin' };
};

export const signToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};
