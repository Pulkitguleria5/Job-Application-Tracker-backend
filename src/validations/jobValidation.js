import { body, query } from 'express-validator';

export const jobValidation = {
    createJob: [
        body('company')
            .trim()
            .notEmpty()
            .withMessage('Company name is required')
            .isLength({ min: 2 })
            .withMessage('Company name must be at least 2 characters long'),

        body('role')
            .trim()
            .notEmpty()
            .withMessage('Role is required')
            .isLength({ min: 2 })
            .withMessage('Role must be at least 2 characters long'),

        body('status')
            .trim()
            .notEmpty()
            .withMessage('Status is required')
            .isIn(['Applied', 'Interviewing', 'Offered', 'Rejected'])
            .withMessage('Status must be either "Applied", "Interviewing", "Offered", or "Rejected"'),

        body('jobUrl')
            .optional()
            .isURL()
            .withMessage('Invalid URL format for jobUrl'),

        body('location')
            .optional()
            .trim(),

        body('jobType')
            .optional()
            .isIn(['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote', 'Hybrid'])
            .withMessage('Invalid job type'),
    ],

    getJobs: [
        query('page')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Page must be a positive integer'),

        query('limit')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Limit must be a positive integer'),

        query('order')
            .optional()
            .isIn(['asc', 'desc'])
            .withMessage('Order must be either "asc" or "desc"')
    ],


};



