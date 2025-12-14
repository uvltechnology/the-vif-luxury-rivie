import prisma from '../config/database.js';
import logger from '../utils/logger.js';

/**
 * Audit Log Service
 * Tracks important actions for security and compliance
 */

export const AuditAction = {
  // Auth
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',
  PASSWORD_RESET: 'PASSWORD_RESET',
  
  // Bookings
  BOOKING_CREATE: 'BOOKING_CREATE',
  BOOKING_UPDATE: 'BOOKING_UPDATE',
  BOOKING_CANCEL: 'BOOKING_CANCEL',
  BOOKING_DELETE: 'BOOKING_DELETE',
  
  // Properties
  PROPERTY_CREATE: 'PROPERTY_CREATE',
  PROPERTY_UPDATE: 'PROPERTY_UPDATE',
  PROPERTY_DELETE: 'PROPERTY_DELETE',
  
  // Availability
  AVAILABILITY_BLOCK: 'AVAILABILITY_BLOCK',
  AVAILABILITY_UNBLOCK: 'AVAILABILITY_UNBLOCK',
  
  // Users
  USER_CREATE: 'USER_CREATE',
  USER_UPDATE: 'USER_UPDATE',
  USER_DELETE: 'USER_DELETE',
  USER_DEACTIVATE: 'USER_DEACTIVATE',
  
  // Settings
  SETTINGS_UPDATE: 'SETTINGS_UPDATE',
};

/**
 * Create audit log entry
 */
export const createAuditLog = async ({
  userId,
  action,
  entity,
  entityId,
  oldValue,
  newValue,
  ipAddress,
  userAgent,
}) => {
  try {
    const log = await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        oldValue: oldValue ? JSON.stringify(oldValue) : null,
        newValue: newValue ? JSON.stringify(newValue) : null,
        ipAddress,
        userAgent,
      },
    });
    
    logger.debug(`Audit log created: ${action} on ${entity} by user ${userId || 'anonymous'}`);
    return log;
  } catch (error) {
    logger.error('Failed to create audit log:', error);
    // Don't throw - audit logging should not break main functionality
    return null;
  }
};

/**
 * Get audit logs with filtering
 */
export const getAuditLogs = async ({
  userId,
  action,
  entity,
  entityId,
  startDate,
  endDate,
  page = 1,
  limit = 50,
}) => {
  const where = {};
  
  if (userId) where.userId = userId;
  if (action) where.action = action;
  if (entity) where.entity = entity;
  if (entityId) where.entityId = entityId;
  
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) where.createdAt.lte = new Date(endDate);
  }
  
  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.auditLog.count({ where }),
  ]);
  
  return {
    logs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

/**
 * Middleware helper to extract request info
 */
export const extractRequestInfo = (req) => ({
  ipAddress: req.ip || req.connection?.remoteAddress,
  userAgent: req.get('user-agent'),
  userId: req.user?.id,
});

export default {
  AuditAction,
  createAuditLog,
  getAuditLogs,
  extractRequestInfo,
};
