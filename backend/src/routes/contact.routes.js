import { Router } from 'express';
import { submitContact } from '../controllers/contact.controller.js';
import validate from '../middleware/validate.js';
import { contactSchema } from '../validators/contact.validator.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', contactLimiter, validate(contactSchema), submitContact);

export default router;
