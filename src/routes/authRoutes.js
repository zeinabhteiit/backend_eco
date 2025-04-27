import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

import { forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);


router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


export default router;
