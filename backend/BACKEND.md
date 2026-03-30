# Bixihomes Backend — Architecture & Flow

## Overview

Express 5 API server that handles contact form submissions and admin authentication for the Bixihomes website.

## How It Works

### Starting the Server

`server.js` imports the configured Express app from `app.js` and starts listening. This split lets you import `app.js` in tests without booting the server.

```
server.js  →  app.js  →  mounts middleware + routes  →  listens on PORT
```

### Request Lifecycle

Every request flows through this pipeline in order:

```
1. Helmet          → Sets security headers
2. CORS            → Checks origin against allowlist
3. JSON Parser     → Parses body (max 10kb)
4. Rate Limiter    → Blocks if IP exceeded limit
5. Router          → Matches the route
6. Validate        → Zod checks req.body against schema
7. Auth (if needed)→ Verifies JWT + role
8. Controller      → Handles request, calls service
9. Service         → Business logic (send email, sign JWT)
10. Response       → JSON back to client
```

If anything throws at any step, the **centralized error handler** catches it and returns a safe response.

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
Controller calls emailService.sendContactEmail()
    ↓
Nodemailer sends HTML email to business owner (CONTACT_EMAIL_TO)
    ↓
Client gets: { success: true, message: "Your message has been sent" }
```

### Authentication Flow

```
POST /api/auth/login  { email, password }
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

### Protecting a Route

```js
import { authenticate, authorize } from './src/middleware/auth.js';

// Any logged-in user
router.get('/profile', authenticate, controller);

// Admin only
router.get('/admin/stats', authenticate, authorize('admin'), controller);
```

## Folder Map

| Folder/File         | Purpose                                      |
|---------------------|----------------------------------------------|
| `server.js`         | Entry point — starts HTTP server             |
| `app.js`            | Express config — middleware + route mounting  |
| `src/config/`       | Environment variable loading and validation  |
| `src/controllers/`  | Handle requests, call services, send responses |
| `src/services/`     | Business logic (email sending, JWT signing)  |
| `src/middleware/`    | Auth, validation, rate limiting, error handling |
| `src/routes/`       | Route definitions — maps URLs to controllers |
| `src/validators/`   | Zod schemas for request validation           |
| `src/utils/`        | Logger and shared utilities                  |

## Environment Variables

All configuration comes from `.env`. See `.env.example` for the full list. Never commit `.env` — it's gitignored.

Key variables:
- `PORT` — server port (default 5000)
- `CORS_ORIGIN` — allowed frontend origin
- `JWT_SECRET` — signing key for tokens
- `SMTP_*` — mail server credentials
- `CONTACT_EMAIL_TO` — where contact form emails are delivered
- `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH` — admin login credentials

## Running the Server

```bash
cd backend
npm install
cp .env.example .env   # Then fill in your values
npm run dev             # Development with auto-reload
npm start               # Production
```
