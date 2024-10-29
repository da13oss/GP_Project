import { body, validationResult } from 'express-validator';

// Username validation: minimum 3 characters
export const validateUsername = body('username')
    .if(body('username').exists().notEmpty())
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long');

// Email validation
export const validateEmail = body('email')
    .if(body('email').exists().notEmpty())
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address');

// Password validation: at least one uppercase, one lowercase, and one number
export const validatePassword = body('password')
    .if(body('password').exists().notEmpty())
    .isString()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number');

// New password validation for profile updates
export const validateNewPassword = body('newPassword')
    .if(body('newPassword').exists().notEmpty())
    .isString()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number');

// Current password validation
export const validateCurrentPassword = body('currentPassword')
    .if(body('newPassword').exists().notEmpty())
    .notEmpty()
    .withMessage('Current password is required when setting new password');

// Middleware to check validation results
export const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};