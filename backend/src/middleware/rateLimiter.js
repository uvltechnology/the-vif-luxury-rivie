import rateLimit from 'express-rate-limit';
import config from '../config/index.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * General rate limiter
 */
export const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict rate limiter for auth endpoints
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

/**
 * API key rate limiter (for public API access)
 */
export const apiKeyLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: {
    success: false,
    message: 'API rate limit exceeded',
  },
  keyGenerator: (req) => {
    return req.headers['x-api-key'] || req.ip;
  },
});

/**
 * Contact form rate limiter
 */
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 inquiries per hour
  message: {
    success: false,
    message: 'Too many inquiries, please try again later',
  },
});

/**
 * Booking rate limiter
 */
export const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 booking attempts per hour
  message: {
    success: false,
    message: 'Too many booking attempts, please try again later',
  },
});
