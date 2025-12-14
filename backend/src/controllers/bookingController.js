import prisma from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { generateBookingRef, calculateNights, calculateBookingTotal, datesOverlap, parsePaginationParams } from '../utils/helpers.js';
import { createAuditLog, AuditAction, extractRequestInfo } from '../services/auditService.js';
import { sendBookingConfirmation, sendAdminBookingNotification } from '../services/emailService.js';
import logger from '../utils/logger.js';

/**
 * Get all bookings (Admin)
 * GET /api/v1/bookings
 */
export const getBookings = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { status, propertyId, startDate, endDate, search } = req.query;
    
    const where = {};
    
    if (status) where.status = status.toUpperCase();
    if (propertyId) where.propertyId = propertyId;
    
    if (startDate || endDate) {
      where.checkIn = {};
      if (startDate) where.checkIn.gte = new Date(startDate);
      if (endDate) where.checkIn.lte = new Date(endDate);
    }
    
    if (search) {
      where.OR = [
        { guestName: { contains: search, mode: 'insensitive' } },
        { guestEmail: { contains: search, mode: 'insensitive' } },
        { bookingRef: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          property: {
            select: {
              id: true,
              name: true,
              slug: true,
              type: true,
            },
          },
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          experiences: {
            include: {
              experience: {
                select: { name: true },
              },
            },
          },
        },
      }),
      prisma.booking.count({ where }),
    ]);
    
    return paginatedResponse(res, bookings, { page, limit, total });
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
    
    const booking = await prisma.booking.findFirst({
      where: isUUID ? { id } : { bookingRef: id },
      include: {
        property: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        experiences: {
          include: {
            experience: true,
          },
        },
      },
    });
    
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
    
    // Check authorization for non-admin users
    if (req.user.role === 'GUEST' && booking.userId !== req.user.id) {
      throw new ApiError(403, 'You do not have access to this booking');
    }
    
    return successResponse(res, booking);
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
    
    const where = {
      userId: req.user.id,
    };
    
    if (status) where.status = status.toUpperCase();
    
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { checkIn: 'desc' },
        skip,
        take: limit,
        include: {
          property: {
            select: {
              id: true,
              name: true,
              slug: true,
              type: true,
              images: { where: { isPrimary: true }, take: 1 },
            },
          },
        },
      }),
      prisma.booking.count({ where }),
    ]);
    
    return paginatedResponse(res, bookings, { page, limit, total });
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
      propertyId,
      checkIn,
      checkOut,
      numGuests,
      numAdults,
      numChildren,
      guestName,
      guestEmail,
      guestPhone,
      guestCountry,
      notes,
      specialRequests,
      experienceIds,
    } = req.body;
    
    // Validate property exists and is active
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    
    if (!property || !property.isActive) {
      throw new ApiError(404, 'Property not found or unavailable');
    }
    
    // Validate guest count
    if (numGuests > property.maxGuests) {
      throw new ApiError(400, `This property can accommodate up to ${property.maxGuests} guests`);
    }
    
    // Calculate nights
    const nights = calculateNights(checkIn, checkOut);
    
    // Validate minimum/maximum nights
    if (nights < property.minNights) {
      throw new ApiError(400, `Minimum stay is ${property.minNights} nights`);
    }
    
    if (nights > property.maxNights) {
      throw new ApiError(400, `Maximum stay is ${property.maxNights} nights`);
    }
    
    // Check availability - no overlapping confirmed/pending bookings
    const existingBookings = await prisma.booking.findMany({
      where: {
        propertyId,
        status: { in: ['CONFIRMED', 'PENDING'] },
        OR: [
          { checkIn: { lt: new Date(checkOut) }, checkOut: { gt: new Date(checkIn) } },
        ],
      },
    });
    
    if (existingBookings.length > 0) {
      throw new ApiError(409, 'These dates are not available');
    }
    
    // Check blocked dates
    const blockedDates = await prisma.blockedDate.findMany({
      where: {
        propertyId,
        OR: [
          { startDate: { lt: new Date(checkOut) }, endDate: { gt: new Date(checkIn) } },
        ],
      },
    });
    
    if (blockedDates.length > 0) {
      throw new ApiError(409, 'These dates are blocked');
    }
    
    // Calculate pricing
    const pricing = calculateBookingTotal({
      pricePerNight: property.pricePerNight,
      nights,
      cleaningFee: property.cleaningFee,
      serviceFee: property.pricePerNight * nights * 0.05, // 5% service fee
      taxRate: 0.1, // 10% tax
    });
    
    // Generate booking reference
    const bookingRef = generateBookingRef();
    
    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        propertyId,
        userId: req.user?.id || null,
        guestName,
        guestEmail,
        guestPhone,
        guestCountry,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        numGuests,
        numAdults: numAdults || numGuests,
        numChildren: numChildren || 0,
        pricePerNight: property.pricePerNight,
        numNights: nights,
        subtotal: pricing.subtotal,
        cleaningFee: pricing.cleaningFee,
        serviceFee: pricing.serviceFee,
        taxes: pricing.taxes,
        totalPrice: pricing.total,
        notes,
        specialRequests,
        status: 'PENDING',
      },
      include: {
        property: true,
      },
    });
    
    // Add experiences if requested
    if (experienceIds?.length > 0) {
      // Implementation for adding experiences to booking
      // Would create BookingExperience records
    }
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.BOOKING_CREATE,
      entity: 'Booking',
      entityId: booking.id,
      newValue: booking,
    });
    
    // Send emails
    try {
      await sendBookingConfirmation(booking, property);
      await sendAdminBookingNotification(booking, property);
    } catch (emailError) {
      logger.error('Failed to send booking emails:', emailError);
      // Don't fail the booking creation if emails fail
    }
    
    logger.info(`Booking created: ${bookingRef}`);
    
    return createdResponse(res, booking, 'Booking created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update booking (Admin only)
 * PATCH /api/v1/bookings/:id
 */
export const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes, internalNotes } = req.body;
    
    const currentBooking = await prisma.booking.findUnique({
      where: { id },
      include: { property: true },
    });
    
    if (!currentBooking) {
      throw new ApiError(404, 'Booking not found');
    }
    
    const updateData = {};
    
    if (status) {
      updateData.status = status;
      if (status === 'CONFIRMED') updateData.confirmedAt = new Date();
      if (status === 'CANCELLED') updateData.cancelledAt = new Date();
    }
    
    if (notes !== undefined) updateData.notes = notes;
    if (internalNotes !== undefined) updateData.internalNotes = internalNotes;
    
    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        property: true,
      },
    });
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.BOOKING_UPDATE,
      entity: 'Booking',
      entityId: booking.id,
      oldValue: currentBooking,
      newValue: booking,
    });
    
    // Send confirmation email if status changed to confirmed
    if (status === 'CONFIRMED' && currentBooking.status !== 'CONFIRMED') {
      try {
        await sendBookingConfirmation(booking, booking.property);
      } catch (emailError) {
        logger.error('Failed to send confirmation email:', emailError);
      }
    }
    
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
    
    const currentBooking = await prisma.booking.findUnique({
      where: { id },
    });
    
    if (!currentBooking) {
      throw new ApiError(404, 'Booking not found');
    }
    
    // Check if user can cancel (owner or admin)
    if (req.user.role === 'GUEST' && currentBooking.userId !== req.user.id) {
      throw new ApiError(403, 'You do not have permission to cancel this booking');
    }
    
    // Check if booking can be cancelled
    if (['CANCELLED', 'COMPLETED'].includes(currentBooking.status)) {
      throw new ApiError(400, 'This booking cannot be cancelled');
    }
    
    const booking = await prisma.booking.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        internalNotes: currentBooking.internalNotes
          ? `${currentBooking.internalNotes}\nCancellation reason: ${reason || 'Not provided'}`
          : `Cancellation reason: ${reason || 'Not provided'}`,
      },
    });
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.BOOKING_CANCEL,
      entity: 'Booking',
      entityId: booking.id,
      oldValue: currentBooking,
      newValue: booking,
    });
    
    logger.info(`Booking cancelled: ${booking.bookingRef}`);
    
    return successResponse(res, booking, 'Booking cancelled successfully');
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
    
    const booking = await prisma.booking.findUnique({
      where: { id },
    });
    
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
    
    await prisma.booking.delete({
      where: { id },
    });
    
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

/**
 * Get booking statistics (Admin)
 * GET /api/v1/bookings/stats
 */
export const getBookingStats = async (req, res, next) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const [
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      revenueResult,
      upcomingBookings,
      recentBookings,
    ] = await Promise.all([
      prisma.booking.count({
        where: { createdAt: { gte: startDate } },
      }),
      prisma.booking.count({
        where: { status: 'CONFIRMED', createdAt: { gte: startDate } },
      }),
      prisma.booking.count({
        where: { status: 'PENDING' },
      }),
      prisma.booking.count({
        where: { status: 'CANCELLED', createdAt: { gte: startDate } },
      }),
      prisma.booking.aggregate({
        where: { status: 'CONFIRMED', createdAt: { gte: startDate } },
        _sum: { totalPrice: true },
      }),
      prisma.booking.count({
        where: {
          status: { in: ['CONFIRMED', 'PENDING'] },
          checkIn: { gte: new Date() },
        },
      }),
      prisma.booking.findMany({
        where: { createdAt: { gte: startDate } },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          property: { select: { name: true } },
        },
      }),
    ]);
    
    // Bookings by property
    const bookingsByProperty = await prisma.booking.groupBy({
      by: ['propertyId'],
      where: { createdAt: { gte: startDate } },
      _count: { id: true },
      _sum: { totalPrice: true },
    });
    
    // Get property names
    const propertyIds = bookingsByProperty.map((b) => b.propertyId);
    const properties = await prisma.property.findMany({
      where: { id: { in: propertyIds } },
      select: { id: true, name: true },
    });
    
    const propertyMap = new Map(properties.map((p) => [p.id, p.name]));
    
    return successResponse(res, {
      period: `${days} days`,
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      upcomingBookings,
      revenue: revenueResult._sum.totalPrice || 0,
      recentBookings,
      bookingsByProperty: bookingsByProperty.map((b) => ({
        propertyId: b.propertyId,
        propertyName: propertyMap.get(b.propertyId),
        count: b._count.id,
        revenue: b._sum.totalPrice || 0,
      })),
    });
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
  deleteBooking,
  getBookingStats,
};
