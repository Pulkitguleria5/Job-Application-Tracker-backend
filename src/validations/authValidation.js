import { body } from 'express-validator';

export const authValidation = {
    register: [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ min: 2 })
            .withMessage('Name must be at least 2 characters long'),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format'),

        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')

    ],

    login: [
        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format'),

        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ],

    google: [
        body('credential')
            .notEmpty()
            .withMessage('Google credential is required')
    ],

};