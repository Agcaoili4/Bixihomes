import { sendContactEmail } from '../services/email.service.js';
import logger from '../utils/logger.js';

export const submitContact = async (req, res, next) => {
  try {
    await sendContactEmail(req.body);

    logger.info('Contact form submitted', { email: req.body.email });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent. We will get back to you soon.',
    });
  } catch (err) {
    logger.error('Failed to send contact email', { error: err.message });
    next(err);
  }
};
