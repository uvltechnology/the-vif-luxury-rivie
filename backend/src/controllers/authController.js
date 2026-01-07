import { query } from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse } from '../utils/response.js';
import { generateTokens, hashPassword, comparePassword, verifyRefreshToken } from '../middleware/auth.js';
import { sanitizeUser } from '../utils/helpers.js';
import { createAuditLog, AuditAction, extractRequestInfo } from '../services/auditService.js';
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Register a new user
 * POST /api/v1/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    
    // Check if user exists
    const [existingUser] = await query('SELECT id FROM users WHERE email = ?', [email]);
    
    if (existingUser) {
      throw new ApiError(409, 'An account with this email already exists');
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const userId = uuidv4();
    await query(
      `INSERT INTO users (id, email, password, firstName, lastName, phone) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, email, hashedPassword, firstName, lastName, phone]
    );
    
    const [user] = await query('SELECT * FROM users WHERE id = ?', [userId]);
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);
    
    // Update last login
    await query('UPDATE users SET lastLoginAt = NOW() WHERE id = ?', [user.id]);
    
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
    const [user] = await query('SELECT * FROM users WHERE email = ?', [email]);
    
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
    await query('UPDATE users SET lastLoginAt = NOW() WHERE id = ?', [user.id]);
    
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
    const [user] = await query('SELECT * FROM users WHERE id = ?', [decoded.userId]);
    
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
    const [user] = await query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    
    // Get recent bookings
    const bookings = await query(
      `SELECT b.*, p.name as propertyName, p.slug as propertySlug 
       FROM bookings b 
       LEFT JOIN properties p ON b.propertyId = p.id 
       WHERE b.userId = ? 
       ORDER BY b.createdAt DESC LIMIT 5`,
      [req.user.id]
    );
    
    const userWithBookings = {
      ...sanitizeUser(user),
      bookings: bookings.map(b => ({
        ...b,
        property: { name: b.propertyName, slug: b.propertySlug }
      }))
    };
    
    return successResponse(res, userWithBookings);
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
    
    const updates = [];
    const params = [];
    
    if (firstName) { updates.push('firstName = ?'); params.push(firstName); }
    if (lastName) { updates.push('lastName = ?'); params.push(lastName); }
    if (phone) { updates.push('phone = ?'); params.push(phone); }
    
    if (updates.length > 0) {
      params.push(req.user.id);
      await query(`UPDATE users SET ${updates.join(', ')}, updatedAt = NOW() WHERE id = ?`, params);
    }
    
    const [user] = await query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    
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
    const [user] = await query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    
    // Verify current password
    const isValid = await comparePassword(currentPassword, user.password);
    
    if (!isValid) {
      throw new ApiError(401, 'Current password is incorrect');
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update password
    await query('UPDATE users SET password = ?, updatedAt = NOW() WHERE id = ?', [hashedPassword, req.user.id]);
    
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
