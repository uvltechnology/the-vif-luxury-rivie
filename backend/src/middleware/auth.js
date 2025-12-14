import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';
import config from '../config/index.js';
import { ApiError } from '../utils/ApiError.js';
import logger from '../utils/logger.js';

/**
 * Authenticate middleware - verifies JWT token
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Access token is required');
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
      },
    });
    
    if (!user) {
      throw new ApiError(401, 'User not found');
    }
    
    if (!user.isActive) {
      throw new ApiError(401, 'User account is deactivated');
    }
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, 'Invalid access token'));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, 'Access token has expired'));
    }
    next(error);
  }
};

/**
 * Optional auth - attaches user if token present, but doesn't require it
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.secret);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
        },
      });
      
      if (user && user.isActive) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    // Silently continue without user if token is invalid
    next();
  }
};

/**
 * Authorize roles middleware
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }
    
    if (!roles.includes(req.user.role)) {
      logger.warn(`Unauthorized access attempt by user ${req.user.id} to ${req.originalUrl}`);
      return next(new ApiError(403, 'You do not have permission to perform this action'));
    }
    
    next();
  };
};

/**
 * Admin only middleware
 */
export const adminOnly = authorize('ADMIN', 'SUPER_ADMIN');

/**
 * Super admin only middleware
 */
export const superAdminOnly = authorize('SUPER_ADMIN');

/**
 * Generate JWT tokens
 */
export const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
  
  const refreshToken = jwt.sign(
    { userId },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiresIn }
  );
  
  return { accessToken, refreshToken };
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwt.refreshSecret);
};

/**
 * Hash password
 */
export const hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

/**
 * Compare password
 */
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
