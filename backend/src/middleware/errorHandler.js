import { ApiError } from '../utils/ApiError.js';
import logger from '../utils/logger.js';
import config from '../config/index.js';

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;
  
  // Log error
  logger.error({
    message: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id,
  });
  
  // Prisma errors
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'field';
    error = new ApiError(409, `A record with this ${field} already exists`);
  }
  
  if (err.code === 'P2025') {
    error = new ApiError(404, 'Record not found');
  }
  
  if (err.code === 'P2003') {
    error = new ApiError(400, 'Invalid reference - related record not found');
  }
  
  // Validation errors from express-validator
  if (err.array && typeof err.array === 'function') {
    const errors = err.array();
    error = new ApiError(400, 'Validation error', true);
    error.errors = errors;
  }
  
  // JWT errors (already handled in auth middleware, but just in case)
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid token');
  }
  
  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Token expired');
  }
  
  // Multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new ApiError(400, 'File too large');
  }
  
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = new ApiError(400, 'Unexpected file field');
  }
  
  // Default to 500 if no status code
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  
  // Response object
  const response = {
    success: false,
    message,
    ...(error.errors && { errors: error.errors }),
    ...(config.env === 'development' && {
      stack: error.stack,
      error: err,
    }),
  };
  
  res.status(statusCode).json(response);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};

/**
 * Async handler wrapper
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
