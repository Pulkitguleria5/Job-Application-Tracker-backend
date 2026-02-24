import {body} from 'express-validator';
import { upload } from '../middleware/uploadMiddleware';

export const ResumeValidation = {
    uploadResume: [
        body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 2 })
    .withMessage('Title must be at least 2 characters long')
],

};