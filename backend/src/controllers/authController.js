import prisma from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse } from '../utils/response.js';
import { generateTokens, hashPassword, comparePassword, verifyRefreshToken } from '../middleware/auth.js';
import { sanitizeUser } from '../utils/helpers.js';
import { createAuditLog, AuditAction, extractRequestInfo } from '../services/auditService.js';
import logger from '../utils/logger.js';

/**
 * Register a new user
 * POST /api/v1/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      throw new ApiError(409, 'An account with this email already exists');
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
      },
    });
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      userId: user.id,
      action: AuditAction.REGISTER,
      entity: 'User',
      entityId: user.id,
    });
    
    logger.info(`New user registered: ${email}`);
    
    return createdResponse(res, {
      user: sanitizeUser(user),
      accessToken,
      refreshToken,
    }, 'Registration successful');
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /api/v1/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }
    
    if (!user.isActive) {
      throw new ApiError(401, 'Your account has been deactivated');
    }
    
    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      throw new ApiError(401, 'Invalid email or password');
    }
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      userId: user.id,
      action: AuditAction.LOGIN,
      entity: 'User',
      entityId: user.id,
    });
    
    logger.info(`User logged in: ${email}`);
    
    return successResponse(res, {
      user: sanitizeUser(user),
      accessToken,
      refreshToken,
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh access token
 * POST /api/v1/auth/refresh
 */
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;
    
    if (!token) {
      throw new ApiError(400, 'Refresh token is required');
    }
    
    // Verify refresh token
    const decoded = verifyRefreshToken(token);
    
    // Check if user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    
    if (!user || !user.isActive) {
      throw new ApiError(401, 'Invalid refresh token');
    }
    
    // Generate new tokens
    const tokens = generateTokens(user.id);
    
    return successResponse(res, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }, 'Token refreshed successfully');
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Invalid or expired refresh token'));
    }
    next(error);
  }
};

/**
 * Get current user profile
 * GET /api/v1/auth/me
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        bookings: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            property: {
              select: { name: true, slug: true },
            },
          },
        },
      },
    });
    
    return successResponse(res, sanitizeUser(user));
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * PATCH /api/v1/auth/me
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone && { phone }),
      },
    });
    
    return successResponse(res, sanitizeUser(user), 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Change password
 * POST /api/v1/auth/change-password
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    
    // Verify current password
    const isValid = await comparePassword(currentPassword, user.password);
    
    if (!isValid) {
      throw new ApiError(401, 'Current password is incorrect');
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update password
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      userId: req.user.id,
      action: AuditAction.PASSWORD_CHANGE,
      entity: 'User',
      entityId: req.user.id,
    });
    
    return successResponse(res, null, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Logout (just for audit purposes, client should discard tokens)
 * POST /api/v1/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      userId: req.user.id,
      action: AuditAction.LOGOUT,
      entity: 'User',
      entityId: req.user.id,
    });
    
    return successResponse(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  refreshToken,
  getProfile,
  updateProfile,
  changePassword,
  logout,
};
