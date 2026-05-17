import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import env from './src/config/env.js';
import { globalLimiter } from './src/middleware/rateLimiter.js';
import errorHandler from './src/middleware/errorHandler.js';
import contactRoutes from './src/routes/contact.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import logger from './src/utils/logger.js';

const app = express();

// Trust exactly one proxy hop in production (Vercel/nginx/etc.) so req.ip
// reflects the real client for rate limiting. Never use `true` — that
// allows clients to spoof X-Forwarded-For and bypass rate limits.
app.set('trust proxy', env.NODE_ENV === 'production' ? 1 : false);

// --- Security middleware ---
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (env.CORS_ORIGINS.includes(origin)) return callback(null, true);
      // Log blocked origin server-side, return generic error to client
      logger.warn('CORS request blocked', { origin });
      return callback(new Error('Not allowed'));
    },
    optionsSuccessStatus: 200,
  })
);
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
