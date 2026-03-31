import { z } from 'zod';
import { config } from 'dotenv';

// Load .env file only in non-production (production uses real env vars)
if (process.env.NODE_ENV !== 'production') {
  config();
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  CORS_ORIGIN: z.string().min(1).default('http://localhost:5173,http://localhost:5174,http://www.bixihomes.com'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('1h'),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD_HASH: z.string().min(1),
  RESEND_API_KEY: z.string().startsWith('re_', 'RESEND_API_KEY must start with re_'),
  RESEND_FROM_EMAIL: z.string().email(),
  CONTACT_EMAIL_TO: z.string().email(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const parseCorsOrigins = (rawOrigins) => {
  const origins = rawOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    throw new Error('CORS_ORIGIN must contain at least one origin');
  }

  origins.forEach((origin) => {
    try {
      // Validate URL format for each origin entry.
      // eslint-disable-next-line no-new
      new URL(origin);
    } catch {
      throw new Error(`Invalid CORS origin: ${origin}`);
    }
  });

  return origins;
};

const env = Object.freeze({
  ...parsed.data,
  CORS_ORIGINS: parseCorsOrigins(parsed.data.CORS_ORIGIN),
});

export default env;
