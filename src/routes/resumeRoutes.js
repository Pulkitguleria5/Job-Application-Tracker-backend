import express from 'express';
import { resumeController } from '../controllers/resumeController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

export const resumeRoutes = express.Router();

resumeRoutes.post('/upload', authMiddleware.protect, upload.single('resume'), resumeController.uploadResume);
resumeRoutes.get('/get-resume', authMiddleware.protect, resumeController.getResumes);
resumeRoutes.delete('/:id', authMiddleware.protect, resumeController.deleteResume);
resumeRoutes.patch('/:id', authMiddleware.protect, resumeController.updateResumeTitle);