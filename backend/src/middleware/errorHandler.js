import logger from '../utils/logger.js';
import env from '../config/env.js';

const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;

  // Always log full error server-side
  logger.error(err.message, {
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  // Never expose stack traces or internal error details to client
  // even in development — prevents leaking file paths, dependencies, config
  if (env.NODE_ENV === 'production' || statusCode >= 500) {
    return res.status(statusCode).json({
      success: false,
      message: statusCode >= 500 ? 'Internal server error' : err.message,
    });
  }

  // Development only: expose message for 4xx client errors (no stack)
  return res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
