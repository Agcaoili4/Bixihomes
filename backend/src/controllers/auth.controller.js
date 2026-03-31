import { verifyCredentials, signToken } from '../services/auth.service.js';
import logger from '../utils/logger.js';

export const login = async (req, res) => {
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

    return res.status(500).json({
      success: false,
      message: 'Login unavailable. Please try again later.',
    });
  }
};
