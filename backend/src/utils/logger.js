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
