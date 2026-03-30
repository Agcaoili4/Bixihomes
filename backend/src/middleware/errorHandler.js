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
