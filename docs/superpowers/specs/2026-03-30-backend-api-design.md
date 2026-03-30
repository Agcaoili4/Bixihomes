# Bixihomes Backend API — Design Spec

**Date:** 2026-03-30
**Status:** Approved

## Overview

Production-ready Node.js/Express backend for the Bixihomes website. Two features: a contact form endpoint that emails submissions to the business owner, and JWT-based authentication for future admin functionality.

## Stack

- **Runtime:** Node.js 18+
- **Framework:** Express 5
- **Validation:** Zod
- **Email:** Nodemailer (SMTP)
- **Auth:** JWT (access tokens only, no refresh)
- **Security:** Helmet, CORS, rate limiting, centralized error handling

## Architecture

Flat Express — `routes → controllers → services → middleware`. No domain modules, no DI, no repository pattern. Refactor to domain-driven modules if the app grows beyond 5-6 features.

### Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── env.js              # Loads & validates env vars with Zod
│   ├── controllers/
│   │   ├── auth.controller.js  # Login handler
│   │   └── contact.controller.js
│   ├── middleware/
│   │   ├── auth.js             # JWT verification + role check
│   │   ├── errorHandler.js     # Centralized error handling
│   │   ├── rateLimiter.js      # Rate limiting config
│   │   └── validate.js         # Generic Zod validation middleware
│   ├── routes/
│   │   ├── auth.routes.js      # POST /api/auth/login
│   │   └── contact.routes.js   # POST /api/contact
│   ├── services/
│   │   ├── auth.service.js     # JWT sign/verify, credential check
│   │   └── email.service.js    # Nodemailer send logic
│   ├── validators/
│   │   ├── auth.validator.js   # Login schema
│   │   └── contact.validator.js # Contact form schema
│   └── utils/
│       └── logger.js           # Simple structured logger
├── app.js                      # Express app setup
├── server.js                   # HTTP listen entry point
├── .env.example                # Documented env template
└── package.json
```

### Request Flow

```
Client → Express → Helmet → CORS → JSON Parser → Rate Limiter
  → Route → Validate (Zod) → [Auth if protected] → Controller → Service → Response
                                                                     ↓
                                                         Error → errorHandler
```

## Contact Endpoint — `POST /api/contact`

### Validation Schema

| Field       | Type   | Required | Constraints                              |
|-------------|--------|----------|------------------------------------------|
| firstName   | string | yes      | 1-50 chars, trimmed, HTML stripped        |
| lastName    | string | yes      | 1-50 chars, trimmed, HTML stripped        |
| email       | string | yes      | Valid email format                        |
| phone       | string | yes      | 10+ digits after stripping non-digits     |
| service     | string | no       | Must be one of 7 predefined options       |
| message     | string | no       | Max 2000 chars, trimmed, HTML stripped    |

Service options: Home Renovation, New Build, Basement Development, Roofing, Electrical Installation, General Maintenance, Other.

### Email Flow

1. Controller receives validated data
2. Calls `emailService.sendContactEmail(data)`
3. Nodemailer composes HTML email with all form fields
4. Sends to business owner (`CONTACT_EMAIL_TO` env var)
5. Returns `{ success: true, message: "Your message has been sent" }`

### Rate Limit

5 requests per 15 minutes per IP (stricter than global).

## Authentication

### No Registration

Admin credentials seeded via env vars (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`). Bcrypt-hashed password only.

### Login — `POST /api/auth/login`

1. Validate email + password with Zod
2. Compare against env-stored admin credentials
3. Verify password with bcrypt
4. Sign JWT: `{ email, role: 'admin' }`, configurable expiry (default 1h)
5. Return `{ token }`

### Auth Middleware

- Reads `Authorization: Bearer <token>` header
- Verifies JWT signature and expiry
- Attaches `req.user` with decoded payload
- 401 if missing/invalid, 403 if wrong role

### Role-Based Authorization

`authorize('admin')` higher-order middleware checks `req.user.role`. Chain with `authenticate` on any protected route.

## Security Middleware Stack (applied in order)

1. **Helmet** — secure HTTP headers (CSP, X-Frame-Options, HSTS, etc.)
2. **CORS** — locked to `CORS_ORIGIN` env var in production
3. **JSON parser** — `express.json({ limit: '10kb' })` to prevent large payloads
4. **Global rate limiter** — 100 req / 15 min per IP
5. **Contact rate limiter** — 5 req / 15 min per IP (on contact route only)
6. **Zod validation** — generic `validate(schema)` middleware, returns 400 with field errors
7. **Centralized error handler** — generic message in production, full details in development

### Not Needed

- **NoSQL injection:** No database yet. Zod enforces strict string types on all inputs anyway.
- **CSRF:** Stateless JWT API with no cookies — no CSRF vector.

## Environment Variables

```
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://yourdomain.com
JWT_SECRET=your-32-char-minimum-secret
JWT_EXPIRES_IN=1h
ADMIN_EMAIL=admin@bixihomes.com
ADMIN_PASSWORD_HASH=$2b$10$...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL_TO=info@bixihomes.com
```

## Design Decisions

- **app.js / server.js split:** Keeps the Express app importable for testing without starting the HTTP server.
- **Access tokens only:** No refresh tokens — admin-only, low complexity. Add later if needed.
- **Env-seeded admin:** No user table needed. Single admin account via env vars.
- **Zod over Joi:** Lighter, modern API, TypeScript-ready.
- **Nodemailer SMTP:** Free, works with any provider. No vendor lock-in.
- **HTML stripping in Zod transforms:** Prevents stored XSS without an extra sanitization library.
