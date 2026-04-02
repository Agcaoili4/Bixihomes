# Bixihomes Backend API — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready Express 5 backend with a secure contact form endpoint and JWT-based admin authentication.

**Architecture:** Flat Express — routes → controllers → services → middleware. `app.js` configures the Express app, `server.js` starts the HTTP server. All secrets via env vars, all input validated with Zod, all errors caught by centralized handler.

**Tech Stack:** Node.js 18+, Express 5, Zod, Nodemailer, jsonwebtoken, bcryptjs, helmet, express-rate-limit, cors

---

## File Map

| File | Responsibility |
|------|----------------|
| `backend/server.js` | Entry point — imports app, starts HTTP server |
| `backend/app.js` | Express config — middleware stack, route mounting |
| `backend/src/config/env.js` | Load and validate all env vars with Zod |
| `backend/src/validators/contact.validator.js` | Zod schema for contact form |
| `backend/src/validators/auth.validator.js` | Zod schema for login |
| `backend/src/middleware/validate.js` | Generic Zod validation middleware |
| `backend/src/middleware/errorHandler.js` | Centralized error handler |
| `backend/src/middleware/rateLimiter.js` | Global + contact-specific rate limiters |
| `backend/src/middleware/auth.js` | JWT authenticate + role authorize |
| `backend/src/services/email.service.js` | Nodemailer transport + sendContactEmail |
| `backend/src/services/auth.service.js` | JWT sign, credential verification |
| `backend/src/controllers/contact.controller.js` | Handle POST /api/contact |
| `backend/src/controllers/auth.controller.js` | Handle POST /api/auth/login |
| `backend/src/routes/contact.routes.js` | Contact route definition |
| `backend/src/routes/auth.routes.js` | Auth route definition |
| `backend/src/utils/logger.js` | Structured logger (info, warn, error) |
| `backend/.env.example` | Documented env template |
| `backend/__tests__/validators/contact.validator.test.js` | Contact schema tests |
| `backend/__tests__/validators/auth.validator.test.js` | Auth schema tests |
| `backend/__tests__/middleware/errorHandler.test.js` | Error handler tests |
| `backend/__tests__/services/auth.service.test.js` | Auth service tests |

---

### Task 1: Project Setup & Dependencies

**Files:**
- Modify: `backend/package.json`
- Create: `backend/.env.example`

- [ ] **Step 1: Install production dependencies**

```bash
cd backend
npm install zod nodemailer jsonwebtoken bcryptjs helmet cors express-rate-limit
```

- [ ] **Step 2: Install dev dependencies**

```bash
cd backend
npm install --save-dev vitest
```

- [ ] **Step 3: Update package.json scripts**

Add the test script to `backend/package.json` scripts:

```json
{
  "scripts": {
    "dev": "node --watch server.js",
    "start": "NODE_ENV=production node server.js",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 4: Create .env.example**

```env
# Server
NODE_ENV=development
PORT=5000

# CORS — your frontend URL
CORS_ORIGIN=http://localhost:5173

# JWT
JWT_SECRET=replace-with-a-random-string-at-least-32-chars
JWT_EXPIRES_IN=1h

# Admin credentials (password hash generated with bcryptjs)
ADMIN_EMAIL=admin@bixihomes.com
ADMIN_PASSWORD_HASH=$2a$12$your-generated-bcrypt-hash-goes-here

# SMTP (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Contact form recipient
CONTACT_EMAIL_TO=info@bixihomes.com
```

- [ ] **Step 5: Create backend .env file from example**

```bash
cd backend
cp .env.example .env
```

- [ ] **Step 6: Commit**

```bash
git add backend/package.json backend/package-lock.json backend/.env.example
git commit -m "chore: add backend dependencies and env template"
```

---

### Task 2: Logger Utility

**Files:**
- Create: `backend/src/utils/logger.js`

- [ ] **Step 1: Create the logger**

```js
const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };

const currentLevel = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'production' ? 'info' : 'debug';
};

const shouldLog = (level) => LOG_LEVELS[level] <= LOG_LEVELS[currentLevel()];

const formatMessage = (level, message, meta) => {
  const timestamp = new Date().toISOString();
  const base = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  return meta ? `${base} ${JSON.stringify(meta)}` : base;
};

const logger = {
  info: (message, meta) => {
    if (shouldLog('info')) console.log(formatMessage('info', message, meta));
  },
  warn: (message, meta) => {
    if (shouldLog('warn')) console.warn(formatMessage('warn', message, meta));
  },
  error: (message, meta) => {
    if (shouldLog('error')) console.error(formatMessage('error', message, meta));
  },
  debug: (message, meta) => {
    if (shouldLog('debug')) console.log(formatMessage('debug', message, meta));
  },
};

export default logger;
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/utils/logger.js
git commit -m "feat: add structured logger utility"
```

---

### Task 3: Environment Config

**Files:**
- Create: `backend/src/config/env.js`

- [ ] **Step 1: Create the env config with Zod validation**

```js
import { z } from 'zod';
import { config } from 'dotenv';

// Load .env file only in non-production (production uses real env vars)
if (process.env.NODE_ENV !== 'production') {
  config();
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  CORS_ORIGIN: z.string().url().default('http://localhost:5173'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('1h'),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD_HASH: z.string().min(1),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  CONTACT_EMAIL_TO: z.string().email(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const env = Object.freeze(parsed.data);

export default env;
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/config/env.js
git commit -m "feat: add env config with Zod validation"
```

---

### Task 4: Zod Validators

**Files:**
- Create: `backend/src/validators/contact.validator.js`
- Create: `backend/src/validators/auth.validator.js`
- Create: `backend/__tests__/validators/contact.validator.test.js`
- Create: `backend/__tests__/validators/auth.validator.test.js`

- [ ] **Step 1: Write failing tests for contact validator**

```js
// backend/__tests__/validators/contact.validator.test.js
import { describe, it, expect } from 'vitest';
import { contactSchema } from '../../src/validators/contact.validator.js';

describe('contactSchema', () => {
  const validInput = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    phone: '(403) 991-2631',
    service: 'Home Renovation',
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

  it('accepts all valid service options', () => {
    const services = [
      'Home Renovation', 'New Build', 'Basement Development',
      'Roofing', 'Electrical Installation', 'General Maintenance', 'Other',
    ];
    for (const service of services) {
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
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd backend && npx vitest run __tests__/validators/contact.validator.test.js
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement contact validator**

```js
// backend/src/validators/contact.validator.js
import { z } from 'zod';

// Matches the serviceOptions array in src/components/ContactForm.jsx exactly
const SERVICE_OPTIONS = [
  'Home Renovation',
  'New Build',
  'Basement Development',
  'Roofing',
  'Electrical Installation',
  'General Maintenance',
  'Other',
];

// Strip HTML tags to prevent stored XSS
const stripHtml = (str) => str.replace(/<[^>]*>/g, '');

// Sanitized string: trim whitespace, strip HTML
const sanitizedString = (maxLen) =>
  z.string().trim().transform(stripHtml).pipe(z.string().min(1).max(maxLen));

// Optional sanitized string: allow empty string or missing
const optionalSanitizedString = (maxLen) =>
  z.string().trim().transform(stripHtml).pipe(z.string().max(maxLen)).optional().or(z.literal(''));

export const contactSchema = z.object({
  firstName: sanitizedString(50),
  lastName: sanitizedString(50),
  email: z.string().trim().email('Invalid email address'),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => val.replace(/\D/g, '').length >= 10,
      { message: 'Phone number must have at least 10 digits' }
    ),
  service: z.enum(SERVICE_OPTIONS).optional(),
  message: optionalSanitizedString(2000),
});
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd backend && npx vitest run __tests__/validators/contact.validator.test.js
```

Expected: all PASS.

- [ ] **Step 5: Write failing tests for auth validator**

```js
// backend/__tests__/validators/auth.validator.test.js
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
```

- [ ] **Step 6: Run auth validator tests to verify they fail**

```bash
cd backend && npx vitest run __tests__/validators/auth.validator.test.js
```

Expected: FAIL — module not found.

- [ ] **Step 7: Implement auth validator**

```js
// backend/src/validators/auth.validator.js
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
```

- [ ] **Step 8: Run all validator tests to verify they pass**

```bash
cd backend && npx vitest run __tests__/validators/
```

Expected: all PASS.

- [ ] **Step 9: Commit**

```bash
git add backend/src/validators/ backend/__tests__/validators/
git commit -m "feat: add Zod validation schemas for contact and auth"
```

---

### Task 5: Validation Middleware

**Files:**
- Create: `backend/src/middleware/validate.js`

- [ ] **Step 1: Create the generic Zod validation middleware**

```js
// backend/src/middleware/validate.js

// Generic middleware factory: pass a Zod schema, get a middleware
// that validates req.body and returns 400 with field errors on failure.
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Replace req.body with parsed (sanitized, trimmed) data
  req.body = result.data;
  next();
};

export default validate;
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/middleware/validate.js
git commit -m "feat: add generic Zod validation middleware"
```

---

### Task 6: Centralized Error Handler

**Files:**
- Create: `backend/src/middleware/errorHandler.js`
- Create: `backend/__tests__/middleware/errorHandler.test.js`

- [ ] **Step 1: Write failing tests for error handler**

```js
// backend/__tests__/middleware/errorHandler.test.js
import { describe, it, expect, vi } from 'vitest';
import errorHandler from '../../src/middleware/errorHandler.js';

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('errorHandler', () => {
  it('returns 500 with generic message in production', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const err = new Error('DB connection failed');
    const res = mockRes();
    errorHandler(err, {}, res, () => {});

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    });

    process.env.NODE_ENV = originalEnv;
  });

  it('returns error details in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const err = new Error('Something broke');
    err.statusCode = 422;
    const res = mockRes();
    errorHandler(err, {}, res, () => {});

    expect(res.status).toHaveBeenCalledWith(422);
    const body = res.json.mock.calls[0][0];
    expect(body.success).toBe(false);
    expect(body.message).toBe('Something broke');
    expect(body.stack).toBeDefined();

    process.env.NODE_ENV = originalEnv;
  });

  it('defaults to 500 when no statusCode on error', () => {
    process.env.NODE_ENV = 'development';
    const err = new Error('oops');
    const res = mockRes();
    errorHandler(err, {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd backend && npx vitest run __tests__/middleware/errorHandler.test.js
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement error handler**

```js
// backend/src/middleware/errorHandler.js
import logger from '../utils/logger.js';

const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;

  logger.error(err.message, {
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  if (process.env.NODE_ENV === 'production') {
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? 'Internal server error' : err.message,
    });
  }

  // Development: expose full error details
  return res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};

export default errorHandler;
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd backend && npx vitest run __tests__/middleware/errorHandler.test.js
```

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/src/middleware/errorHandler.js backend/__tests__/middleware/errorHandler.test.js
git commit -m "feat: add centralized error handler middleware"
```

---

### Task 7: Rate Limiter Middleware

**Files:**
- Create: `backend/src/middleware/rateLimiter.js`

- [ ] **Step 1: Create rate limiters**

```js
// backend/src/middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// Global: 100 requests per 15 minutes per IP
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later' },
});

// Contact form: 5 requests per 15 minutes per IP
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many contact submissions, please try again later' },
});

// Auth: 10 login attempts per 15 minutes per IP
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts, please try again later' },
});
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/middleware/rateLimiter.js
git commit -m "feat: add rate limiter middleware (global, contact, auth)"
```

---

### Task 8: Auth Service

**Files:**
- Create: `backend/src/services/auth.service.js`
- Create: `backend/__tests__/services/auth.service.test.js`

- [ ] **Step 1: Write failing tests for auth service**

```js
// backend/__tests__/services/auth.service.test.js
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
    // exp should be roughly 1 hour from now
    const oneHour = 60 * 60;
    const diff = decoded.exp - decoded.iat;
    expect(diff).toBe(oneHour);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd backend && npx vitest run __tests__/services/auth.service.test.js
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement auth service**

```js
// backend/src/services/auth.service.js
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd backend && npx vitest run __tests__/services/auth.service.test.js
```

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/src/services/auth.service.js backend/__tests__/services/auth.service.test.js
git commit -m "feat: add auth service with JWT signing and credential verification"
```

---

### Task 9: Auth Middleware

**Files:**
- Create: `backend/src/middleware/auth.js`

- [ ] **Step 1: Implement authenticate and authorize middleware**

```js
// backend/src/middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Higher-order middleware: checks req.user.role
export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Insufficient permissions' });
  }
  next();
};
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/middleware/auth.js
git commit -m "feat: add JWT authenticate and role-based authorize middleware"
```

---

### Task 10: Email Service

**Files:**
- Create: `backend/src/services/email.service.js`

- [ ] **Step 1: Implement Nodemailer email service**

```js
// backend/src/services/email.service.js
import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

export const sendContactEmail = async (data) => {
  const { firstName, lastName, email, phone, service, message } = data;

  const html = `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${firstName} ${lastName}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone}</td></tr>
      ${service ? `<tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${service}</td></tr>` : ''}
      ${message ? `<tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${message}</td></tr>` : ''}
    </table>
  `;

  const mailOptions = {
    from: `"Bixihomes Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL_TO,
    replyTo: email,
    subject: `New Estimate Request from ${firstName} ${lastName}`,
    html,
  };

  const info = await getTransporter().sendMail(mailOptions);
  logger.info('Contact email sent', { messageId: info.messageId });
  return info;
};
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/services/email.service.js
git commit -m "feat: add Nodemailer email service for contact form"
```

---

### Task 11: Controllers

**Files:**
- Create: `backend/src/controllers/contact.controller.js`
- Create: `backend/src/controllers/auth.controller.js`

- [ ] **Step 1: Implement contact controller**

```js
// backend/src/controllers/contact.controller.js
import { sendContactEmail } from '../services/email.service.js';
import logger from '../utils/logger.js';

export const submitContact = async (req, res, next) => {
  try {
    await sendContactEmail(req.body);

    logger.info('Contact form submitted', { email: req.body.email });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent. We will get back to you soon.',
    });
  } catch (err) {
    logger.error('Failed to send contact email', { error: err.message });
    next(err);
  }
};
```

- [ ] **Step 2: Implement auth controller**

```js
// backend/src/controllers/auth.controller.js
import { verifyCredentials, signToken } from '../services/auth.service.js';
import logger from '../utils/logger.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await verifyCredentials(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = signToken({ email: user.email, role: user.role });

    logger.info('Admin login successful', { email: user.email });

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    logger.error('Login failed', { error: err.message });
    next(err);
  }
};
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/controllers/
git commit -m "feat: add contact and auth controllers"
```

---

### Task 12: Routes

**Files:**
- Create: `backend/src/routes/contact.routes.js`
- Create: `backend/src/routes/auth.routes.js`

- [ ] **Step 1: Create contact routes**

```js
// backend/src/routes/contact.routes.js
import { Router } from 'express';
import { submitContact } from '../controllers/contact.controller.js';
import validate from '../middleware/validate.js';
import { contactSchema } from '../validators/contact.validator.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', contactLimiter, validate(contactSchema), submitContact);

export default router;
```

- [ ] **Step 2: Create auth routes**

```js
// backend/src/routes/auth.routes.js
import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import validate from '../middleware/validate.js';
import { loginSchema } from '../validators/auth.validator.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), login);

export default router;
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/routes/
git commit -m "feat: add contact and auth route definitions"
```

---

### Task 13: App & Server Entry Points

**Files:**
- Create: `backend/app.js`
- Modify: `backend/server.js` (replace empty file)

- [ ] **Step 1: Create app.js — Express configuration**

```js
// backend/app.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import env from './src/config/env.js';
import { globalLimiter } from './src/middleware/rateLimiter.js';
import errorHandler from './src/middleware/errorHandler.js';
import contactRoutes from './src/routes/contact.routes.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();

// --- Security middleware ---
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, optionsSuccessStatus: 200 }));
app.use(express.json({ limit: '10kb' }));
app.use(globalLimiter);

// --- Health check (useful for load balancers / uptime monitors) ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'OK' });
});

// --- API routes ---
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// --- Centralized error handler (must be last) ---
app.use(errorHandler);

export default app;
```

- [ ] **Step 2: Create server.js — HTTP entry point**

Replace the empty `backend/server.js` with:

```js
// backend/server.js
import app from './app.js';
import env from './src/config/env.js';
import logger from './src/utils/logger.js';

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});
```

- [ ] **Step 3: Remove the old server.jsx file** (it's empty and has wrong extension)

```bash
rm backend/server.jsx
```

- [ ] **Step 4: Commit**

```bash
git add backend/app.js backend/server.js
git rm backend/server.jsx 2>/dev/null; true
git commit -m "feat: add Express app config and server entry point"
```

---

### Task 14: Smoke Test

- [ ] **Step 1: Run all unit tests**

```bash
cd backend && npx vitest run
```

Expected: all tests PASS.

- [ ] **Step 2: Verify server starts (requires .env)**

Ensure `backend/.env` exists with valid values, then:

```bash
cd backend && timeout 5 node server.js || true
```

Expected: logs `Server running in development mode on port 5000` (or exits on missing env vars — that's fine if .env isn't populated yet).

- [ ] **Step 3: Run all tests one final time**

```bash
cd backend && npx vitest run
```

Expected: all PASS.

- [ ] **Step 4: Commit any final adjustments**

```bash
git add -A backend/
git commit -m "chore: smoke test passed, backend ready"
```

---

## Post-Implementation Notes

**To generate an admin password hash:**
```bash
node -e "import('bcryptjs').then(b => b.hash('your-password', 12).then(console.log))"
```

**To test the contact endpoint:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Smith","email":"john@test.com","phone":"4039912631","service":"Roofing","message":"Need a quote"}'
```

**To test login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bixihomes.com","password":"your-password"}'
```

**Frontend integration:** Wire the ContactForm component to `POST /api/contact` with `fetch` or axios. The backend validates the same fields with the same constraints — no mismatches.
