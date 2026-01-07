import { query } from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { generateBookingRef, calculateNights, calculateBookingTotal, parsePaginationParams } from '../utils/helpers.js';
import { createAuditLog, AuditAction, extractRequestInfo } from '../services/auditService.js';
import { sendBookingConfirmation, sendAdminBookingNotification } from '../services/emailService.js';
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get all bookings (Admin)
 * GET /api/v1/bookings
 */
export const getBookings = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { status, propertyId, startDate, endDate, search } = req.query;
    
    let whereConditions = ['1=1'];
    let params = [];
    
    if (status) {
      whereConditions.push('b.status = ?');
      params.push(status.toUpperCase());
    }
    if (propertyId) {
      whereConditions.push('b.propertyId = ?');
      params.push(propertyId);
    }
    if (startDate) {
      whereConditions.push('b.checkIn >= ?');
      params.push(new Date(startDate));
    }
    if (endDate) {
      whereConditions.push('b.checkIn <= ?');
      params.push(new Date(endDate));
    }
    if (search) {
      whereConditions.push('(b.guestName LIKE ? OR b.guestEmail LIKE ? OR b.bookingRef LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    const whereClause = whereConditions.join(' AND ');
    
    // Get total count
    const [countResult] = await query(`SELECT COUNT(*) as total FROM bookings b WHERE ${whereClause}`, params);
    const total = countResult.total;
    
    // Get bookings with property info
    const bookings = await query(
      `SELECT b.*, p.id as propId, p.name as propName, p.slug as propSlug, p.type as propType,
       u.id as uId, u.firstName as uFirstName, u.lastName as uLastName, u.email as uEmail
       FROM bookings b
       LEFT JOIN properties p ON b.propertyId = p.id
       LEFT JOIN users u ON b.userId = u.id
       WHERE ${whereClause}
       ORDER BY b.createdAt DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, skip]
    );
    
    // Format response
    const formattedBookings = bookings.map(b => ({
      id: b.id,
      bookingRef: b.bookingRef,
      propertyId: b.propertyId,
      userId: b.userId,
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      numGuests: b.numGuests,
      numAdults: b.numAdults,
      numChildren: b.numChildren,
      guestName: b.guestName,
      guestEmail: b.guestEmail,
      guestPhone: b.guestPhone,
      guestCountry: b.guestCountry,
      totalPrice: b.totalPrice,
      status: b.status,
      notes: b.notes,
      specialRequests: b.specialRequests,
      createdAt: b.createdAt,
      property: { id: b.propId, name: b.propName, slug: b.propSlug, type: b.propType },
      user: b.uId ? { id: b.uId, firstName: b.uFirstName, lastName: b.uLastName, email: b.uEmail } : null,
    }));
    
    return paginatedResponse(res, formattedBookings, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single booking
 * GET /api/v1/bookings/:id
 */
export const getBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Allow lookup by ID or booking reference
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    
    const [booking] = await query(
      `SELECT b.*, p.id as propId, p.name as propName, p.slug as propSlug, p.type as propType,
       u.id as uId, u.firstName as uFirstName, u.lastName as uLastName, u.email as uEmail, u.phone as uPhone
       FROM bookings b
       LEFT JOIN properties p ON b.propertyId = p.id
       LEFT JOIN users u ON b.userId = u.id
       WHERE ${isUUID ? 'b.id = ?' : 'b.bookingRef = ?'}`,
      [id]
    );
    
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
    
    // Check authorization for non-admin users
    if (req.user?.role === 'GUEST' && booking.userId !== req.user.id) {
      throw new ApiError(403, 'You do not have access to this booking');
    }
    
    // Get property image
    const images = await query(
      'SELECT * FROM property_images WHERE propertyId = ? AND isPrimary = true LIMIT 1',
      [booking.propId]
    );
    
    const result = {
      ...booking,
      property: { id: booking.propId, name: booking.propName, slug: booking.propSlug, type: booking.propType, images },
      user: booking.uId ? { id: booking.uId, firstName: booking.uFirstName, lastName: booking.uLastName, email: booking.uEmail, phone: booking.uPhone } : null,
    };
    
    return successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user's bookings
 * GET /api/v1/bookings/my-bookings
 */
export const getMyBookings = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { status } = req.query;
    
    let whereConditions = ['b.userId = ?'];
    let params = [req.user.id];
    
    if (status) {
      whereConditions.push('b.status = ?');
      params.push(status.toUpperCase());
    }
    
    const whereClause = whereConditions.join(' AND ');
    
    const [countResult] = await query(`SELECT COUNT(*) as total FROM bookings b WHERE ${whereClause}`, params);
    const total = countResult.total;
    
    const bookings = await query(
      `SELECT b.*, p.id as propId, p.name as propName, p.slug as propSlug, p.type as propType
       FROM bookings b
       LEFT JOIN properties p ON b.propertyId = p.id
       WHERE ${whereClause}
       ORDER BY b.checkIn DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, skip]
    );
    
    const formattedBookings = bookings.map(b => ({
      ...b,
      property: { id: b.propId, name: b.propName, slug: b.propSlug, type: b.propType },
    }));
    
    return paginatedResponse(res, formattedBookings, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

/**
 * Create booking
 * POST /api/v1/bookings
 */
export const createBooking = async (req, res, next) => {
  try {
    const {
      propertyId, checkIn, checkOut, numGuests, numAdults, numChildren,
      guestName, guestEmail, guestPhone, guestCountry, notes, specialRequests,
    } = req.body;
    
    // Validate property exists and is active
    const [property] = await query('SELECT * FROM properties WHERE id = ? AND isActive = true', [propertyId]);
    
    if (!property) {
      throw new ApiError(404, 'Property not found or unavailable');
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Validate dates
    if (checkInDate >= checkOutDate) {
      throw new ApiError(400, 'Check-out date must be after check-in date');
    }
    
    if (checkInDate < new Date()) {
      throw new ApiError(400, 'Check-in date cannot be in the past');
    }
    
    // Check guest capacity
    const totalGuests = numGuests || (numAdults || 1) + (numChildren || 0);
    if (totalGuests > property.maxGuests) {
      throw new ApiError(400, `Maximum ${property.maxGuests} guests allowed`);
    }
    
    // Check for overlapping bookings
    const overlapping = await query(
      `SELECT id FROM bookings WHERE propertyId = ? AND status IN ('CONFIRMED', 'PENDING')
       AND ((checkIn < ? AND checkOut > ?) OR (checkIn < ? AND checkOut > ?) OR (checkIn >= ? AND checkOut <= ?))`,
      [propertyId, checkOutDate, checkInDate, checkOutDate, checkInDate, checkInDate, checkOutDate]
    );
    
    if (overlapping.length > 0) {
      throw new ApiError(409, 'Property is not available for selected dates');
    }
    
    // Calculate pricing
    const nights = calculateNights(checkInDate, checkOutDate);
    const accommodationCost = nights * property.pricePerNight;
    const cleaningFee = property.cleaningFee || 0;
    const totalPrice = accommodationCost + cleaningFee;
    
    // Generate booking reference
    const bookingRef = generateBookingRef();
    
    const bookingId = uuidv4();
    await query(
      `INSERT INTO bookings (id, bookingRef, propertyId, userId, checkIn, checkOut, numGuests, numAdults, 
       numChildren, guestName, guestEmail, guestPhone, guestCountry, basePrice, cleaningFee, totalPrice, 
       status, notes, specialRequests)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', ?, ?)`,
      [bookingId, bookingRef, propertyId, req.user?.id || null, checkInDate, checkOutDate, totalGuests,
       numAdults || 1, numChildren || 0, guestName, guestEmail, guestPhone, guestCountry,
       accommodationCost, cleaningFee, totalPrice, notes, specialRequests]
    );
    
    const [booking] = await query('SELECT * FROM bookings WHERE id = ?', [bookingId]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      userId: req.user?.id,
      action: AuditAction.BOOKING_CREATE,
      entity: 'Booking',
      entityId: bookingId,
      newValue: booking,
    });
    
    // Send confirmation emails
    try {
      await sendBookingConfirmation(booking, property);
      await sendAdminBookingNotification(booking, property);
    } catch (emailError) {
      logger.error('Failed to send booking emails:', emailError);
    }
    
    logger.info(`Booking created: ${bookingRef}`);
    
    return createdResponse(res, { ...booking, property }, 'Booking created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update booking status (Admin)
 * PATCH /api/v1/bookings/:id
 */
export const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    const [currentBooking] = await query('SELECT * FROM bookings WHERE id = ?', [id]);
    
    if (!currentBooking) {
      throw new ApiError(404, 'Booking not found');
    }
    
    const updates = [];
    const params = [];
    
    if (status) {
      updates.push('status = ?');
      params.push(status);
      
      if (status === 'CONFIRMED') {
        updates.push('confirmedAt = NOW()');
      } else if (status === 'CANCELLED') {
        updates.push('cancelledAt = NOW()');
      }
    }
    
    if (adminNotes !== undefined) {
      updates.push('adminNotes = ?');
      params.push(adminNotes);
    }
    
    if (updates.length > 0) {
      params.push(id);
      await query(`UPDATE bookings SET ${updates.join(', ')}, updatedAt = NOW() WHERE id = ?`, params);
    }
    
    const [booking] = await query('SELECT * FROM bookings WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.BOOKING_UPDATE,
      entity: 'Booking',
      entityId: id,
      oldValue: currentBooking,
      newValue: booking,
    });
    
    return successResponse(res, booking, 'Booking updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel booking
 * POST /api/v1/bookings/:id/cancel
 */
export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const [booking] = await query('SELECT * FROM bookings WHERE id = ?', [id]);
    
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
    
    // Check authorization
    if (req.user.role === 'GUEST' && booking.userId !== req.user.id) {
      throw new ApiError(403, 'You can only cancel your own bookings');
    }
    
    if (['CANCELLED', 'COMPLETED'].includes(booking.status)) {
      throw new ApiError(400, `Booking cannot be cancelled (current status: ${booking.status})`);
    }
    
    await query(
      `UPDATE bookings SET status = 'CANCELLED', cancelledAt = NOW(), cancellationReason = ?, updatedAt = NOW() WHERE id = ?`,
      [reason, id]
    );
    
    const [updatedBooking] = await query('SELECT * FROM bookings WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      userId: req.user.id,
      action: AuditAction.BOOKING_CANCEL,
      entity: 'Booking',
      entityId: id,
      oldValue: booking,
      newValue: updatedBooking,
    });
    
    logger.info(`Booking cancelled: ${booking.bookingRef}`);
    
    return successResponse(res, updatedBooking, 'Booking cancelled successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get booking statistics (Admin)
 * GET /api/v1/bookings/stats
 */
export const getBookingStats = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    let dateFilter = '';
    const params = [];
    
    if (startDate && endDate) {
      dateFilter = 'WHERE createdAt BETWEEN ? AND ?';
      params.push(new Date(startDate), new Date(endDate));
    }
    
    const [stats] = await query(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'CONFIRMED' THEN 1 ELSE 0 END) as confirmed,
        SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) as cancelled,
        SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'CONFIRMED' THEN totalPrice ELSE 0 END) as totalRevenue
       FROM bookings ${dateFilter}`,
      params
    );
    
    return successResponse(res, stats);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete booking (Admin only)
 * DELETE /api/v1/bookings/:id
 */
export const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [booking] = await query('SELECT * FROM bookings WHERE id = ?', [id]);
    
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
    
    await query('DELETE FROM bookings WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.BOOKING_DELETE,
      entity: 'Booking',
      entityId: id,
      oldValue: booking,
    });
    
    logger.info(`Booking deleted: ${booking.bookingRef}`);
    
    return noContentResponse(res);
  } catch (error) {
    next(error);
  }
};

export default {
  getBookings,
  getBooking,
  getMyBookings,
  createBooking,
  updateBooking,
  cancelBooking,
  getBookingStats,
  deleteBooking,
};
