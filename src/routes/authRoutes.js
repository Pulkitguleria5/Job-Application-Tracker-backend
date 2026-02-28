import express from 'express';
import { authController } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { authValidation } from '../validations/authValidation.js';

export const authRoutes = express.Router();



authRoutes.post('/register', authValidation.register, validate, authController.register);
authRoutes.post('/login', authValidation.login, validate, authController.login);
authRoutes.post('/logout', authMiddleware.protect, authController.logout);
authRoutes.post('/google-sso', authValidation.google, validate, authController.googleSso);

authRoutes.get("/me", authMiddleware.protect, (req, res) => {
  res.json(req.user);
});


