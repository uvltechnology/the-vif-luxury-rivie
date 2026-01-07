import { query } from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { parsePaginationParams } from '../utils/helpers.js';
import { createAuditLog, AuditAction, extractRequestInfo } from '../services/auditService.js';
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get all reviews (Admin)
 * GET /api/v1/reviews
 */
export const getReviews = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { propertyId, isPublished, minRating } = req.query;
    
    let whereConditions = ['1=1'];
    let params = [];
    
    if (propertyId) {
      whereConditions.push('r.propertyId = ?');
      params.push(propertyId);
    }
    if (isPublished !== undefined) {
      whereConditions.push('r.isPublished = ?');
      params.push(isPublished === 'true');
    }
    if (minRating) {
      whereConditions.push('r.rating >= ?');
      params.push(parseFloat(minRating));
    }
    
    const whereClause = whereConditions.join(' AND ');
    
    const [countResult] = await query(`SELECT COUNT(*) as total FROM reviews r WHERE ${whereClause}`, params);
    const total = countResult.total;
    
    const reviews = await query(
      `SELECT r.*, p.name as propertyName, p.slug as propertySlug
       FROM reviews r
       LEFT JOIN properties p ON r.propertyId = p.id
       WHERE ${whereClause}
       ORDER BY r.createdAt DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, skip]
    );
    
    const formattedReviews = reviews.map(r => ({
      ...r,
      property: { id: r.propertyId, name: r.propertyName, slug: r.propertySlug },
    }));
    
    return paginatedResponse(res, formattedReviews, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single review (Admin)
 * GET /api/v1/reviews/:id
 */
export const getReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [review] = await query(
      `SELECT r.*, p.name as propertyName, p.slug as propertySlug
       FROM reviews r
       LEFT JOIN properties p ON r.propertyId = p.id
       WHERE r.id = ?`,
      [id]
    );
    
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }
    
    const result = {
      ...review,
      property: { id: review.propertyId, name: review.propertyName, slug: review.propertySlug },
    };
    
    return successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get reviews for a property (Public)
 * GET /api/v1/properties/:propertyId/reviews
 */
export const getPropertyReviews = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { page, limit, skip } = parsePaginationParams(req.query);
    
    const [countResult] = await query(
      'SELECT COUNT(*) as total FROM reviews WHERE propertyId = ? AND isPublished = true',
      [propertyId]
    );
    const total = countResult.total;
    
    const reviews = await query(
      `SELECT id, rating, title, content, guestName, stayDate, response, respondedAt, createdAt
       FROM reviews 
       WHERE propertyId = ? AND isPublished = true
       ORDER BY createdAt DESC
       LIMIT ? OFFSET ?`,
      [propertyId, limit, skip]
    );
    
    // Get rating summary
    const [summary] = await query(
      `SELECT 
        AVG(rating) as averageRating,
        AVG(cleanlinessRating) as cleanlinessAvg,
        AVG(locationRating) as locationAvg,
        AVG(valueRating) as valueAvg,
        AVG(communicationRating) as communicationAvg,
        COUNT(*) as totalReviews,
        SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as fiveStars,
        SUM(CASE WHEN rating >= 4 AND rating < 5 THEN 1 ELSE 0 END) as fourStars,
        SUM(CASE WHEN rating >= 3 AND rating < 4 THEN 1 ELSE 0 END) as threeStars,
        SUM(CASE WHEN rating >= 2 AND rating < 3 THEN 1 ELSE 0 END) as twoStars,
        SUM(CASE WHEN rating < 2 THEN 1 ELSE 0 END) as oneStar
       FROM reviews WHERE propertyId = ? AND isPublished = true`,
      [propertyId]
    );
    
    return paginatedResponse(res, reviews, { page, limit, total, summary });
  } catch (error) {
    next(error);
  }
};

/**
 * Create review (after stay)
 * POST /api/v1/reviews
 */
export const createReview = async (req, res, next) => {
  try {
    const {
      propertyId, bookingId, rating, title, content, guestName, guestEmail,
      cleanlinessRating, locationRating, valueRating, communicationRating, stayDate,
    } = req.body;
    
    // Validate property exists
    const [property] = await query('SELECT id, name FROM properties WHERE id = ?', [propertyId]);
    if (!property) {
      throw new ApiError(404, 'Property not found');
    }
    
    // Check if booking exists and is completed (if bookingId provided)
    if (bookingId) {
      const [booking] = await query(
        'SELECT id, status FROM bookings WHERE id = ? AND propertyId = ?',
        [bookingId, propertyId]
      );
      
      if (!booking) {
        throw new ApiError(404, 'Booking not found');
      }
      
      // Check for existing review
      const [existingReview] = await query(
        'SELECT id FROM reviews WHERE bookingId = ?',
        [bookingId]
      );
      
      if (existingReview) {
        throw new ApiError(409, 'A review already exists for this booking');
      }
    }
    
    const reviewId = uuidv4();
    await query(
      `INSERT INTO reviews (id, propertyId, bookingId, rating, title, content, guestName, guestEmail,
       cleanlinessRating, locationRating, valueRating, communicationRating, stayDate, isPublished)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, false)`,
      [reviewId, propertyId, bookingId, rating, title, content, guestName, guestEmail,
       cleanlinessRating, locationRating, valueRating, communicationRating, 
       stayDate ? new Date(stayDate) : null]
    );
    
    const [review] = await query('SELECT * FROM reviews WHERE id = ?', [reviewId]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.REVIEW_CREATE,
      entity: 'Review',
      entityId: reviewId,
      newValue: review,
    });
    
    logger.info(`Review submitted for property: ${property.name}`);
    
    return createdResponse(res, review, 'Thank you for your review! It will be published after moderation.');
  } catch (error) {
    next(error);
  }
};

/**
 * Update review (Admin)
 * PATCH /api/v1/reviews/:id
 */
export const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isPublished, response, isFeatured } = req.body;
    
    const [currentReview] = await query('SELECT * FROM reviews WHERE id = ?', [id]);
    
    if (!currentReview) {
      throw new ApiError(404, 'Review not found');
    }
    
    const updates = [];
    const params = [];
    
    if (isPublished !== undefined) {
      updates.push('isPublished = ?');
      params.push(isPublished);
    }
    
    if (response !== undefined) {
      updates.push('response = ?');
      params.push(response);
      updates.push('respondedAt = NOW()');
    }
    
    if (isFeatured !== undefined) {
      updates.push('isFeatured = ?');
      params.push(isFeatured);
    }
    
    if (updates.length > 0) {
      params.push(id);
      await query(`UPDATE reviews SET ${updates.join(', ')}, updatedAt = NOW() WHERE id = ?`, params);
    }
    
    const [review] = await query('SELECT * FROM reviews WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.REVIEW_UPDATE,
      entity: 'Review',
      entityId: id,
      oldValue: currentReview,
      newValue: review,
    });
    
    return successResponse(res, review, 'Review updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete review (Admin)
 * DELETE /api/v1/reviews/:id
 */
export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [review] = await query('SELECT * FROM reviews WHERE id = ?', [id]);
    
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }
    
    await query('DELETE FROM reviews WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.REVIEW_DELETE,
      entity: 'Review',
      entityId: id,
      oldValue: review,
    });
    
    return noContentResponse(res);
  } catch (error) {
    next(error);
  }
};

/**
 * Get featured reviews (Public)
 * GET /api/v1/reviews/featured
 */
export const getFeaturedReviews = async (req, res, next) => {
  try {
    const reviews = await query(
      `SELECT r.*, p.name as propertyName, p.slug as propertySlug
       FROM reviews r
       LEFT JOIN properties p ON r.propertyId = p.id
       WHERE r.isPublished = true AND r.isFeatured = true
       ORDER BY r.rating DESC, r.createdAt DESC
       LIMIT 10`
    );
    
    const formattedReviews = reviews.map(r => ({
      ...r,
      property: { id: r.propertyId, name: r.propertyName, slug: r.propertySlug },
    }));
    
    return successResponse(res, formattedReviews);
  } catch (error) {
    next(error);
  }
};

export default {
  getReviews,
  getReview,
  getPropertyReviews,
  createReview,
  updateReview,
  deleteReview,
  getFeaturedReviews,
};
