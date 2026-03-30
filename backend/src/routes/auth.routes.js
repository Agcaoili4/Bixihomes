import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import validate from '../middleware/validate.js';
import { loginSchema } from '../validators/auth.validator.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), login);

export default router;
