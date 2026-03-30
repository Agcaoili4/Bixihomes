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
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser or same-origin requests that may not send Origin header.
      if (!origin) return callback(null, true);
      if (env.CORS_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
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
