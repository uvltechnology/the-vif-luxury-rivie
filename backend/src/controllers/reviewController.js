import prisma from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { parsePaginationParams } from '../utils/helpers.js';
import logger from '../utils/logger.js';

/**
 * Get all reviews
 * GET /api/v1/reviews
 */
export const getReviews = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { propertyId, rating, verified } = req.query;
    
    const where = {
      isPublished: true,
    };
    
    if (propertyId) where.propertyId = propertyId;
    if (rating) where.rating = parseInt(rating);
    if (verified === 'true') where.isVerified = true;
    
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
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
      prisma.review.count({ where }),
    ]);
    
    return paginatedResponse(res, reviews, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

/**
 * Get reviews for a property
 * GET /api/v1/reviews/property/:propertyId
 */
export const getPropertyReviews = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { page, limit, skip } = parsePaginationParams(req.query);
    
    const where = {
      propertyId,
      isPublished: true,
    };
    
    const [reviews, total, avgRating] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.review.count({ where }),
      prisma.review.aggregate({
        where,
        _avg: {
          rating: true,
          cleanlinessRating: true,
          locationRating: true,
          valueRating: true,
          communicationRating: true,
        },
      }),
    ]);
    
    // Rating distribution
    const ratingDistribution = await prisma.review.groupBy({
      by: ['rating'],
      where,
      _count: { rating: true },
    });
    
    return paginatedResponse(res, {
      reviews,
      summary: {
        averageRating: avgRating._avg.rating,
        totalReviews: total,
        ratings: {
          overall: avgRating._avg.rating,
          cleanliness: avgRating._avg.cleanlinessRating,
          location: avgRating._avg.locationRating,
          value: avgRating._avg.valueRating,
          communication: avgRating._avg.communicationRating,
        },
        distribution: ratingDistribution.reduce((acc, r) => {
          acc[r.rating] = r._count.rating;
          return acc;
        }, {}),
      },
    }, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single review
 * GET /api/v1/reviews/:id
 */
export const getReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        property: {
          select: { id: true, name: true, slug: true },
        },
        user: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });
    
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }
    
    return successResponse(res, review);
  } catch (error) {
    next(error);
  }
};

/**
 * Create review
 * POST /api/v1/reviews
 */
export const createReview = async (req, res, next) => {
  try {
    const {
      propertyId,
      rating,
      title,
      content,
      guestName,
      guestEmail,
      cleanlinessRating,
      locationRating,
      valueRating,
      communicationRating,
      stayDate,
    } = req.body;
    
    // Validate property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    
    if (!property) {
      throw new ApiError(404, 'Property not found');
    }
    
    // Check if user has a completed booking (for verification)
    let isVerified = false;
    if (req.user) {
      const completedBooking = await prisma.booking.findFirst({
        where: {
          userId: req.user.id,
          propertyId,
          status: 'COMPLETED',
        },
      });
      isVerified = !!completedBooking;
    }
    
    const review = await prisma.review.create({
      data: {
        propertyId,
        userId: req.user?.id || null,
        guestName,
        guestEmail,
        rating,
        title,
        content,
        cleanlinessRating,
        locationRating,
        valueRating,
        communicationRating,
        stayDate: stayDate ? new Date(stayDate) : null,
        isVerified,
        isPublished: true, // Could be false for moderation
      },
    });
    
    logger.info(`Review created for property: ${property.name}`);
    
    return createdResponse(res, review, 'Review submitted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update review (Admin - for responding or moderation)
 * PATCH /api/v1/reviews/:id
 */
export const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { response, isPublished } = req.body;
    
    const currentReview = await prisma.review.findUnique({
      where: { id },
    });
    
    if (!currentReview) {
      throw new ApiError(404, 'Review not found');
    }
    
    const updateData = {};
    
    if (response !== undefined) {
      updateData.response = response;
      updateData.respondedAt = new Date();
    }
    
    if (isPublished !== undefined) {
      updateData.isPublished = isPublished;
    }
    
    const review = await prisma.review.update({
      where: { id },
      data: updateData,
    });
    
    return successResponse(res, review, 'Review updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete review (Admin only)
 * DELETE /api/v1/reviews/:id
 */
export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const review = await prisma.review.findUnique({
      where: { id },
    });
    
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }
    
    await prisma.review.delete({
      where: { id },
    });
    
    return noContentResponse(res);
  } catch (error) {
    next(error);
  }
};

/**
 * Get featured reviews for homepage
 * GET /api/v1/reviews/featured
 */
export const getFeaturedReviews = async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        isPublished: true,
        rating: { gte: 4 },
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: {
        property: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
    
    return successResponse(res, reviews);
  } catch (error) {
    next(error);
  }
};

export default {
  getReviews,
  getPropertyReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  getFeaturedReviews,
};
