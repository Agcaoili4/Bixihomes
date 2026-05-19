import rateLimit from 'express-rate-limit';

const FIFTEEN_MINUTES = 15 * 60 * 1000;

const createLimiter = (max, message) =>
  rateLimit({
    windowMs: FIFTEEN_MINUTES,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message },
  });

export const globalLimiter = createLimiter(100, 'Too many requests, please try again later');
export const contactLimiter = createLimiter(5, 'Too many contact submissions, please try again later');
export const authLimiter = createLimiter(10, 'Too many login attempts, please try again later');
