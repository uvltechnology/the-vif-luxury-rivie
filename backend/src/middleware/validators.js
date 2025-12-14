import { body, param, query, validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

/**
 * Validation result handler
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: extractedErrors,
    });
  }
  next();
};

// ==================== AUTH VALIDATORS ====================

export const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name must be less than 50 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name must be less than 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  validate,
];

export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validate,
];

// ==================== PROPERTY VALIDATORS ====================

export const createPropertyValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Property name is required')
    .isLength({ max: 100 })
    .withMessage('Property name must be less than 100 characters'),
  body('type')
    .isIn(['VILLA', 'APARTMENT'])
    .withMessage('Property type must be VILLA or APARTMENT'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('bedrooms')
    .isInt({ min: 1 })
    .withMessage('Bedrooms must be at least 1'),
  body('bathrooms')
    .isFloat({ min: 0.5 })
    .withMessage('Bathrooms must be at least 0.5'),
  body('maxGuests')
    .isInt({ min: 1 })
    .withMessage('Max guests must be at least 1'),
  body('pricePerNight')
    .isFloat({ min: 0 })
    .withMessage('Price per night must be a positive number'),
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  validate,
];

export const updatePropertyValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid property ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Property name must be less than 100 characters'),
  body('type')
    .optional()
    .isIn(['VILLA', 'APARTMENT'])
    .withMessage('Property type must be VILLA or APARTMENT'),
  body('pricePerNight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per night must be a positive number'),
  validate,
];

// ==================== BOOKING VALIDATORS ====================

export const createBookingValidation = [
  body('propertyId')
    .isUUID()
    .withMessage('Invalid property ID'),
  body('checkIn')
    .isISO8601()
    .withMessage('Check-in must be a valid date')
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Check-in date cannot be in the past');
      }
      return true;
    }),
  body('checkOut')
    .isISO8601()
    .withMessage('Check-out must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.checkIn)) {
        throw new Error('Check-out must be after check-in');
      }
      return true;
    }),
  body('numGuests')
    .isInt({ min: 1 })
    .withMessage('Number of guests must be at least 1'),
  body('guestName')
    .trim()
    .notEmpty()
    .withMessage('Guest name is required'),
  body('guestEmail')
    .isEmail()
    .withMessage('Please provide a valid guest email')
    .normalizeEmail(),
  body('guestPhone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  validate,
];

export const updateBookingValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid booking ID'),
  body('status')
    .optional()
    .isIn(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'])
    .withMessage('Invalid booking status'),
  validate,
];

// ==================== INQUIRY VALIDATORS ====================

export const createInquiryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 2000 })
    .withMessage('Message must be less than 2000 characters'),
  body('propertyId')
    .optional()
    .isUUID()
    .withMessage('Invalid property ID'),
  body('checkIn')
    .optional()
    .isISO8601()
    .withMessage('Check-in must be a valid date'),
  body('checkOut')
    .optional()
    .isISO8601()
    .withMessage('Check-out must be a valid date'),
  body('numGuests')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Number of guests must be at least 1'),
  validate,
];

// ==================== REVIEW VALIDATORS ====================

export const createReviewValidation = [
  body('propertyId')
    .isUUID()
    .withMessage('Invalid property ID'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Review content is required')
    .isLength({ max: 2000 })
    .withMessage('Review must be less than 2000 characters'),
  body('guestName')
    .trim()
    .notEmpty()
    .withMessage('Guest name is required'),
  validate,
];

// ==================== COMMON VALIDATORS ====================

export const uuidParam = [
  param('id')
    .isUUID()
    .withMessage('Invalid ID format'),
  validate,
];

export const paginationQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sortBy')
    .optional()
    .isString()
    .withMessage('Sort by must be a string'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  validate,
];

export const dateRangeQuery = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
  validate,
];
