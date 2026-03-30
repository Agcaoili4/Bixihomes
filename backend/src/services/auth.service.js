import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const verifyCredentials = async (email, password) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (email !== adminEmail) return null;

  const valid = await bcrypt.compare(password, adminHash);
  if (!valid) return null;

  return { email: adminEmail, role: 'admin' };
};

export const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};
