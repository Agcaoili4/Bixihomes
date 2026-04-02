import { sendContactEmail } from '../services/email.service.js';
import logger from '../utils/logger.js';

export const submitContact = async (req, res) => {
  try {
    await sendContactEmail(req.body);

    logger.info('Contact form submitted', { email: req.body.email });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent. We will get back to you soon.',
    });
  } catch (err) {
    // Log the full error server-side but never expose SMTP details to client
    logger.error('Failed to send contact email', {
      error: err.message,
      code: err.code,
      command: err.command,
    });

    // Respond with a generic error message to avoid leaking sensitive info
    return res.status(503).json({
      success: false,
      message: 'Unable to send your message right now. Please try again later or contact us directly.',
    });
  }
};
