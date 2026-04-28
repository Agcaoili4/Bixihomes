import app from './app.js';
import env from './src/config/env.js';
import logger from './src/utils/logger.js';

const PORT = env.PORT;

// Server to set up the frontend 
app.listen(PORT, () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on port http://localhost:${PORT}`);
});
