# Bixihomes Backend — Architecture & Flow

## Overview

Express 5 API server that handles contact form submissions and admin authentication for the Bixihomes website. All input is validated with Zod, emails are sent via Resend, and authentication uses stateless JWT tokens.

## How It Works

### Starting the Server

`server.js` imports the configured Express app from `app.js` and starts listening. This split lets you import `app.js` in tests without booting the server.

```
server.js  →  app.js  →  mounts middleware + routes  →  listens on PORT
```

### Request Lifecycle

Every request flows through this pipeline in order:

```
1. Helmet          → Sets 13 security headers (CSP, HSTS, X-Frame-Options, etc.)
2. CORS            → Checks origin against comma-separated allowlist
3. JSON Parser     → Parses body (max 10kb, rejects oversized payloads)
4. Rate Limiter    → Blocks if IP exceeded limit (100 req / 15 min global)
5. Router          → Matches the route
6. Validate        → Zod checks req.body, strips HTML, trims whitespace
7. Auth (if needed)→ Verifies JWT + role
8. Controller      → Handles request, calls service
9. Service         → Business logic (send email, sign JWT)
10. Response       → JSON back to client
```

If anything throws at any step, the **centralized error handler** catches it and returns a safe response. Stack traces and internal details are never exposed to the client in any environment.

### Contact Form Flow

```
Frontend form submit
    ↓
POST /api/contact
    ↓
Rate limiter (5 req / 15 min per IP)
    ↓
Zod validates: firstName, lastName, email, phone, service, message
    ↓
HTML tags stripped, whitespace trimmed, types enforced
    ↓
Controller calls emailService.sendContactEmail()
    ↓
Resend sends HTML email to business owner (CONTACT_EMAIL_TO)
    ↓
Client gets: { success: true, message: "Your message has been sent..." }
```

On email failure, the client gets a safe 503 error. Provider/internal details are logged server-side only.

Current accepted `service` values are:

- `Flat Roofing`
- `Sloped Roofing`
- `Siding`
- `Fascia`
- `Gutters`
- `Window Replacement`
- `Fencing`
- `Decking`
- `Home Renovation`
- `New Build`
- `Basement Development`

### Authentication Flow

```
POST /api/auth/login  { email, password }
    ↓
Rate limiter (10 req / 15 min per IP)
    ↓
Zod validates input
    ↓
Compare email against ADMIN_EMAIL env var
    ↓
bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    ↓
Sign JWT: { email, role: 'admin' }, expires in JWT_EXPIRES_IN
    ↓
Client gets: { token: "eyJ..." }
```

Failed logins return the same generic message regardless of whether the email or password was wrong (prevents user enumeration).

### Protecting a Route

```js
import { authenticate, authorize } from './src/middleware/auth.js';

// Any logged-in user
router.get('/profile', authenticate, controller);

// Admin only
router.get('/admin/stats', authenticate, authorize('admin'), controller);
```

### Health Check

```
GET /api/health  →  { success: true, message: "OK" }
```

Useful for load balancers and uptime monitors.

## Folder Map

```
backend/
├── app.js                    # Express app (middleware stack, routes)
├── server.js                 # HTTP entry point (listen on PORT)
├── .env.example              # Documented env template
├── package.json
├── src/
│   ├── config/
│   │   └── env.js            # Zod-validated env config (fail-fast on bad vars)
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── contact.controller.js
│   ├── middleware/
│   │   ├── auth.js           # JWT authenticate + role-based authorize
│   │   ├── errorHandler.js   # Centralized error handler (no stack leaks)
│   │   ├── rateLimiter.js    # Global, contact, and auth rate limiters
│   │   └── validate.js       # Generic Zod validation middleware
│   ├── routes/
│   │   ├── auth.routes.js    # POST /api/auth/login
│   │   └── contact.routes.js # POST /api/contact
│   ├── services/
│   │   ├── auth.service.js   # bcrypt + JWT signing
│   │   └── email.service.js  # Resend email sending with HTML escaping
│   ├── validators/
│   │   ├── auth.validator.js
│   │   └── contact.validator.js
│   └── utils/
│       └── logger.js         # Structured logger (info, warn, error, debug)
└── __tests__/                # 27 unit tests across 4 files
    ├── middleware/
    │   └── errorHandler.test.js
    ├── services/
    │   └── auth.service.test.js
    └── validators/
        ├── auth.validator.test.js
        └── contact.validator.test.js
```

## Security

| Layer | Protection |
|-------|-----------|
| HTTP headers | Helmet (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, etc.) |
| CORS | Origin allowlist from env var (comma-separated, validated) |
| Body size | 10kb limit on JSON payloads |
| Rate limiting | Global 100/15m, contact 5/15m, auth 10/15m per IP |
| Input validation | Zod schemas enforce strict types — rejects objects in string fields |
| XSS | HTML tags stripped from all text inputs + HTML entity escaping in emails |
| NoSQL injection | Zod rejects non-string types in all fields |
| Prototype pollution | Zod strips unrecognized keys from request body |
| User enumeration | Same error message for wrong email vs wrong password |
| Error leakage | Stack traces never sent to client in any environment |
| Secrets | All credentials in `.env` (gitignored), validated at startup |

## Environment Variables

All configuration comes from `.env`. See `.env.example` for the full list. Never commit `.env` — it's gitignored.

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5050` |
| `CORS_ORIGIN` | Allowed frontend origins (comma-separated) | `http://localhost:5173` |
| `JWT_SECRET` | Signing key (min 32 chars, use crypto random) | `a0b1c2d3...` |
| `JWT_EXPIRES_IN` | Token expiry | `1h` |
| `ADMIN_EMAIL` | Admin login email | `admin@bixihomes.com` |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of admin password | `$2a$12$...` |
| `RESEND_API_KEY` | Resend API key (must start with `re_`) | `re_xxxxx` |
| `RESEND_FROM_EMAIL` | Verified sender address in Resend | `onboarding@resend.dev` |
| `CONTACT_EMAIL_TO` | Where contact emails are delivered | `info@bixihomes.com` |

## Running the Server

```bash
cd backend
npm install
cp .env.example .env   # Then fill in your values
npm run dev             # Development with auto-reload
npm start               # Production
npm test                # Run all 27 tests
npm run test:watch      # Run tests in watch mode
```

## Generating an Admin Password Hash

```bash
node -e "import('bcryptjs').then(b => b.hash('your-password', 12).then(console.log))"
```

Copy the output into `ADMIN_PASSWORD_HASH` in your `.env`.
