import prisma from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { parsePaginationParams } from '../utils/helpers.js';
import { sendInquiryNotification, sendInquiryAutoReply } from '../services/emailService.js';
import logger from '../utils/logger.js';

/**
 * Get all inquiries (Admin)
 * GET /api/v1/inquiries
 */
export const getInquiries = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { status, propertyId, search } = req.query;
    
    const where = {};
    
    if (status) where.status = status.toUpperCase();
    if (propertyId) where.propertyId = propertyId;
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          property: {
            select: { id: true, name: true, slug: true },
          },
        },
      }),
      prisma.inquiry.count({ where }),
    ]);
    
    return paginatedResponse(res, inquiries, { page, limit, total });
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
    
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: {
        property: true,
        user: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
    
    if (!inquiry) {
      throw new ApiError(404, 'Inquiry not found');
    }
    
    return successResponse(res, inquiry);
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
    const {
      name,
      email,
      phone,
      propertyId,
      subject,
      message,
      checkIn,
      checkOut,
      numGuests,
    } = req.body;
    
    // Validate property if provided
    if (propertyId) {
      const property = await prisma.property.findUnique({
        where: { id: propertyId },
      });
      if (!property) {
        throw new ApiError(404, 'Property not found');
      }
    }
    
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        propertyId,
        userId: req.user?.id || null,
        subject,
        message,
        checkIn: checkIn ? new Date(checkIn) : null,
        checkOut: checkOut ? new Date(checkOut) : null,
        numGuests,
        status: 'NEW',
      },
      include: {
        property: {
          select: { id: true, name: true },
        },
      },
    });
    
    // Send notification emails
    try {
      await sendInquiryNotification(inquiry);
      await sendInquiryAutoReply(inquiry);
    } catch (emailError) {
      logger.error('Failed to send inquiry emails:', emailError);
    }
    
    logger.info(`Inquiry created from: ${email}`);
    
    return createdResponse(res, inquiry, 'Inquiry submitted successfully. We\'ll respond within 24 hours.');
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
    const { status, response } = req.body;
    
    const currentInquiry = await prisma.inquiry.findUnique({
      where: { id },
    });
    
    if (!currentInquiry) {
      throw new ApiError(404, 'Inquiry not found');
    }
    
    const updateData = {};
    
    if (status) updateData.status = status;
    if (response) {
      updateData.response = response;
      updateData.respondedBy = req.user.id;
      updateData.respondedAt = new Date();
      if (!status) updateData.status = 'RESPONDED';
    }
    
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: updateData,
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
    
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
    });
    
    if (!inquiry) {
      throw new ApiError(404, 'Inquiry not found');
    }
    
    await prisma.inquiry.delete({
      where: { id },
    });
    
    return noContentResponse(res);
  } catch (error) {
    next(error);
  }
};

/**
 * Get inquiry statistics (Admin)
 * GET /api/v1/inquiries/stats
 */
export const getInquiryStats = async (req, res, next) => {
  try {
    const [total, newCount, inProgressCount, respondedCount, closedCount] = await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.inquiry.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.inquiry.count({ where: { status: 'RESPONDED' } }),
      prisma.inquiry.count({ where: { status: 'CLOSED' } }),
    ]);
    
    // Recent inquiries
    const recentInquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        status: true,
        createdAt: true,
      },
    });
    
    return successResponse(res, {
      total,
      new: newCount,
      inProgress: inProgressCount,
      responded: respondedCount,
      closed: closedCount,
      recentInquiries,
    });
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
