import { query } from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { parsePaginationParams } from '../utils/helpers.js';
import { createAuditLog, AuditAction, extractRequestInfo } from '../services/auditService.js';
import { sendInquiryAutoReply, sendInquiryNotification } from '../services/emailService.js';
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get all inquiries (Admin)
 * GET /api/v1/inquiries
 */
export const getInquiries = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { status, type, propertyId } = req.query;
    
    let whereConditions = ['1=1'];
    let params = [];
    
    if (status) {
      whereConditions.push('status = ?');
      params.push(status.toUpperCase());
    }
    if (type) {
      whereConditions.push('type = ?');
      params.push(type.toUpperCase());
    }
    if (propertyId) {
      whereConditions.push('propertyId = ?');
      params.push(propertyId);
    }
    
    const whereClause = whereConditions.join(' AND ');
    
    const [countResult] = await query(`SELECT COUNT(*) as total FROM inquiries WHERE ${whereClause}`, params);
    const total = countResult.total;
    
    const inquiries = await query(
      `SELECT i.*, p.name as propertyName, p.slug as propertySlug
       FROM inquiries i
       LEFT JOIN properties p ON i.propertyId = p.id
       WHERE ${whereClause}
       ORDER BY i.createdAt DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, skip]
    );
    
    const formattedInquiries = inquiries.map(i => ({
      ...i,
      property: i.propertyId ? { id: i.propertyId, name: i.propertyName, slug: i.propertySlug } : null,
    }));
    
    return paginatedResponse(res, formattedInquiries, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single inquiry (Admin)
 * GET /api/v1/inquiries/:id
 */
export const getInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [inquiry] = await query(
      `SELECT i.*, p.name as propertyName, p.slug as propertySlug
       FROM inquiries i
       LEFT JOIN properties p ON i.propertyId = p.id
       WHERE i.id = ?`,
      [id]
    );
    
    if (!inquiry) {
      throw new ApiError(404, 'Inquiry not found');
    }
    
    // Mark as read
    if (inquiry.status === 'NEW') {
      await query("UPDATE inquiries SET status = 'READ', readAt = NOW() WHERE id = ?", [id]);
    }
    
    const result = {
      ...inquiry,
      property: inquiry.propertyId ? { id: inquiry.propertyId, name: inquiry.propertyName, slug: inquiry.propertySlug } : null,
    };
    
    return successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

/**
 * Create inquiry (Public)
 * POST /api/v1/inquiries
 */
export const createInquiry = async (req, res, next) => {
  try {
    const { type, propertyId, name, email, phone, country, message, preferredContact, checkIn, checkOut, numGuests } = req.body;
    
    // Validate property if provided
    if (propertyId) {
      const [property] = await query('SELECT id FROM properties WHERE id = ?', [propertyId]);
      if (!property) {
        throw new ApiError(404, 'Property not found');
      }
    }
    
    const inquiryId = uuidv4();
    await query(
      `INSERT INTO inquiries (id, type, propertyId, name, email, phone, country, message, 
       preferredContact, checkIn, checkOut, numGuests, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW')`,
      [inquiryId, type || 'GENERAL', propertyId, name, email, phone, country, message, 
       preferredContact, checkIn ? new Date(checkIn) : null, checkOut ? new Date(checkOut) : null, numGuests]
    );
    
    const [inquiry] = await query('SELECT * FROM inquiries WHERE id = ?', [inquiryId]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.INQUIRY_CREATE,
      entity: 'Inquiry',
      entityId: inquiryId,
      newValue: inquiry,
    });
    
    // Send emails
    try {
      await sendInquiryAutoReply(inquiry);
      await sendInquiryNotification(inquiry);
    } catch (emailError) {
      logger.error('Failed to send inquiry emails:', emailError);
    }
    
    logger.info(`Inquiry created from ${email}`);
    
    return createdResponse(res, inquiry, 'Your inquiry has been submitted. We will get back to you soon!');
  } catch (error) {
    next(error);
  }
};

/**
 * Update inquiry status (Admin)
 * PATCH /api/v1/inquiries/:id
 */
export const updateInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, assignedTo } = req.body;
    
    const [currentInquiry] = await query('SELECT * FROM inquiries WHERE id = ?', [id]);
    
    if (!currentInquiry) {
      throw new ApiError(404, 'Inquiry not found');
    }
    
    const updates = [];
    const params = [];
    
    if (status) {
      updates.push('status = ?');
      params.push(status);
      
      if (status === 'RESPONDED') {
        updates.push('respondedAt = NOW()');
      }
    }
    
    if (adminNotes !== undefined) {
      updates.push('adminNotes = ?');
      params.push(adminNotes);
    }
    
    if (assignedTo !== undefined) {
      updates.push('assignedTo = ?');
      params.push(assignedTo);
    }
    
    if (updates.length > 0) {
      params.push(id);
      await query(`UPDATE inquiries SET ${updates.join(', ')}, updatedAt = NOW() WHERE id = ?`, params);
    }
    
    const [inquiry] = await query('SELECT * FROM inquiries WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.INQUIRY_UPDATE,
      entity: 'Inquiry',
      entityId: id,
      oldValue: currentInquiry,
      newValue: inquiry,
    });
    
    return successResponse(res, inquiry, 'Inquiry updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete inquiry (Admin)
 * DELETE /api/v1/inquiries/:id
 */
export const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [inquiry] = await query('SELECT * FROM inquiries WHERE id = ?', [id]);
    
    if (!inquiry) {
      throw new ApiError(404, 'Inquiry not found');
    }
    
    await query('DELETE FROM inquiries WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.INQUIRY_DELETE,
      entity: 'Inquiry',
      entityId: id,
      oldValue: inquiry,
    });
    
    return noContentResponse(res);
  } catch (error) {
    next(error);
  }
};

/**
 * Get inquiry stats (Admin)
 * GET /api/v1/inquiries/stats
 */
export const getInquiryStats = async (req, res, next) => {
  try {
    const [stats] = await query(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'NEW' THEN 1 ELSE 0 END) as newCount,
        SUM(CASE WHEN status = 'READ' THEN 1 ELSE 0 END) as readCount,
        SUM(CASE WHEN status = 'RESPONDED' THEN 1 ELSE 0 END) as respondedCount,
        SUM(CASE WHEN status = 'CLOSED' THEN 1 ELSE 0 END) as closedCount
       FROM inquiries`
    );
    
    return successResponse(res, stats);
  } catch (error) {
    next(error);
  }
};

export default {
  getInquiries,
  getInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiryStats,
};
