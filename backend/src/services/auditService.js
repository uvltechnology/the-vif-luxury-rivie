import logger from '../utils/logger.js';

/**
 * Audit Log Service
 * Tracks important actions for security and compliance
 * Note: Using file-based logging since audit_logs table is not in basic schema
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
  
  // Experiences
  EXPERIENCE_CREATE: 'EXPERIENCE_CREATE',
  EXPERIENCE_UPDATE: 'EXPERIENCE_UPDATE',
  EXPERIENCE_DELETE: 'EXPERIENCE_DELETE',
  
  // Inquiries
  INQUIRY_CREATE: 'INQUIRY_CREATE',
  INQUIRY_UPDATE: 'INQUIRY_UPDATE',
  INQUIRY_DELETE: 'INQUIRY_DELETE',
  
  // Reviews
  REVIEW_CREATE: 'REVIEW_CREATE',
  REVIEW_UPDATE: 'REVIEW_UPDATE',
  REVIEW_DELETE: 'REVIEW_DELETE',
  
  // Settings
  SETTINGS_UPDATE: 'SETTINGS_UPDATE',
};

/**
 * Create audit log entry (logs to file for now)
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
    const logEntry = {
      timestamp: new Date().toISOString(),
      userId: userId || 'anonymous',
      action,
      entity,
      entityId,
      ipAddress,
      userAgent,
      changes: oldValue && newValue ? { old: oldValue, new: newValue } : undefined,
    };
    
    logger.info(`AUDIT: ${action} on ${entity}${entityId ? '#' + entityId : ''} by ${userId || 'anonymous'}`, logEntry);
    
    return logEntry;
  } catch (error) {
    logger.error('Failed to create audit log:', error);
    return null;
  }
};

/**
 * Get audit logs - placeholder for file-based implementation
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
  // In a file-based system, you'd read from log files
  // For now, return empty results
  return {
    logs: [],
    total: 0,
    page,
    limit,
    totalPages: 0,
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
