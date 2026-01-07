import { query } from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { slugify, parsePaginationParams, parseSortParams } from '../utils/helpers.js';
import { createAuditLog, AuditAction, extractRequestInfo } from '../services/auditService.js';
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get all properties
 * GET /api/v1/properties
 */
export const getProperties = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { type, city, minPrice, maxPrice, bedrooms, maxGuests, featured } = req.query;
    const { sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Build WHERE clause
    let whereConditions = ['isActive = true'];
    let params = [];
    
    if (type) {
      whereConditions.push('type = ?');
      params.push(type.toUpperCase());
    }
    if (city) {
      whereConditions.push('city LIKE ?');
      params.push(`%${city}%`);
    }
    if (minPrice) {
      whereConditions.push('pricePerNight >= ?');
      params.push(parseFloat(minPrice));
    }
    if (maxPrice) {
      whereConditions.push('pricePerNight <= ?');
      params.push(parseFloat(maxPrice));
    }
    if (bedrooms) {
      whereConditions.push('bedrooms >= ?');
      params.push(parseInt(bedrooms));
    }
    if (maxGuests) {
      whereConditions.push('maxGuests >= ?');
      params.push(parseInt(maxGuests));
    }
    if (featured === 'true') {
      whereConditions.push('isFeatured = true');
    }
    
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
    
    // Allowed sort columns
    const allowedSortColumns = ['name', 'pricePerNight', 'createdAt', 'bedrooms'];
    const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : 'createdAt';
    const order = sortOrder.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
    
    // Get total count
    const [countResult] = await query(`SELECT COUNT(*) as total FROM properties ${whereClause}`, params);
    const total = countResult.total;
    
    // Get properties
    const properties = await query(
      `SELECT * FROM properties ${whereClause} ORDER BY ${sortColumn} ${order} LIMIT ? OFFSET ?`,
      [...params, limit, skip]
    );
    
    // Get images and amenities for each property
    const propertiesWithDetails = await Promise.all(
      properties.map(async (property) => {
        // Get primary image
        const images = await query(
          'SELECT * FROM property_images WHERE propertyId = ? AND isPrimary = true LIMIT 1',
          [property.id]
        );
        
        // Get amenities
        const amenities = await query(
          `SELECT a.* FROM amenities a 
           INNER JOIN property_amenities pa ON pa.amenityId = a.id 
           WHERE pa.propertyId = ? LIMIT 10`,
          [property.id]
        );
        
        // Get review count and average
        const [reviewStats] = await query(
          'SELECT COUNT(*) as count, AVG(rating) as avgRating FROM reviews WHERE propertyId = ? AND isPublished = true',
          [property.id]
        );
        
        return {
          ...property,
          images,
          amenities,
          _count: { reviews: reviewStats.count },
          averageRating: reviewStats.avgRating || null,
        };
      })
    );
    
    return paginatedResponse(res, propertiesWithDetails, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single property by ID or slug
 * GET /api/v1/properties/:idOrSlug
 */
export const getProperty = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    
    // Try to find by UUID first, then by slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    
    const [property] = await query(
      isUUID ? 'SELECT * FROM properties WHERE id = ?' : 'SELECT * FROM properties WHERE slug = ?',
      [idOrSlug]
    );
    
    if (!property) {
      throw new ApiError(404, 'Property not found');
    }
    
    // Get images
    const images = await query(
      'SELECT * FROM property_images WHERE propertyId = ? ORDER BY `order` ASC',
      [property.id]
    );
    
    // Get amenities
    const amenities = await query(
      `SELECT a.* FROM amenities a 
       INNER JOIN property_amenities pa ON pa.amenityId = a.id 
       WHERE pa.propertyId = ?`,
      [property.id]
    );
    
    // Get reviews
    const reviews = await query(
      `SELECT id, rating, title, content, guestName, stayDate, response, respondedAt, createdAt 
       FROM reviews WHERE propertyId = ? AND isPublished = true 
       ORDER BY createdAt DESC LIMIT 10`,
      [property.id]
    );
    
    // Get average ratings
    const [ratings] = await query(
      `SELECT 
        AVG(rating) as overall,
        AVG(cleanlinessRating) as cleanliness,
        AVG(locationRating) as location,
        AVG(valueRating) as value,
        AVG(communicationRating) as communication,
        COUNT(*) as count
       FROM reviews WHERE propertyId = ? AND isPublished = true`,
      [property.id]
    );
    
    const result = {
      ...property,
      images,
      amenities,
      reviews,
      _count: { reviews: ratings.count },
      averageRating: ratings.overall,
      ratings: {
        overall: ratings.overall,
        cleanliness: ratings.cleanliness,
        location: ratings.location,
        value: ratings.value,
        communication: ratings.communication,
      },
    };
    
    return successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get property availability
 * GET /api/v1/properties/:id/availability
 */
export const getPropertyAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
    
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    
    // Get bookings in date range
    const bookings = await query(
      `SELECT checkIn, checkOut, status FROM bookings 
       WHERE propertyId = ? AND status IN ('CONFIRMED', 'PENDING')
       AND ((checkIn >= ? AND checkIn <= ?) OR (checkOut >= ? AND checkOut <= ?) 
            OR (checkIn <= ? AND checkOut >= ?))`,
      [id, start, end, start, end, start, end]
    );
    
    // Get property minimum nights
    const [property] = await query(
      'SELECT minNights, maxNights FROM properties WHERE id = ?',
      [id]
    );
    
    return successResponse(res, {
      bookings,
      blockedDates: [],
      minNights: property?.minNights || 3,
      maxNights: property?.maxNights || 30,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create property (Admin only)
 * POST /api/v1/properties
 */
export const createProperty = async (req, res, next) => {
  try {
    const {
      name, tagline, type, description, shortDescription, address, city, region,
      country, latitude, longitude, bedrooms, bathrooms, maxGuests, squareMeters,
      pricePerNight, cleaningFee, securityDeposit, checkInTime, checkOutTime,
      minNights, maxNights, cancellationPolicy, houseRules, amenityIds,
    } = req.body;
    
    // Generate unique slug
    let slug = slugify(name);
    const [existingSlug] = await query('SELECT id FROM properties WHERE slug = ?', [slug]);
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }
    
    const id = uuidv4();
    
    await query(
      `INSERT INTO properties (id, slug, name, tagline, type, description, shortDescription, 
       address, city, region, country, latitude, longitude, bedrooms, bathrooms, maxGuests,
       squareMeters, pricePerNight, cleaningFee, securityDeposit, checkInTime, checkOutTime,
       minNights, maxNights, cancellationPolicy, houseRules)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, slug, name, tagline, type, description, shortDescription, address, city,
       region || 'French Riviera', country || 'France', latitude, longitude, bedrooms,
       bathrooms, maxGuests, squareMeters, pricePerNight, cleaningFee, securityDeposit,
       checkInTime, checkOutTime, minNights, maxNights, cancellationPolicy, houseRules]
    );
    
    // Add amenities
    if (amenityIds?.length) {
      for (const amenityId of amenityIds) {
        await query('INSERT INTO property_amenities (propertyId, amenityId) VALUES (?, ?)', [id, amenityId]);
      }
    }
    
    const [property] = await query('SELECT * FROM properties WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.PROPERTY_CREATE,
      entity: 'Property',
      entityId: property.id,
      newValue: property,
    });
    
    logger.info(`Property created: ${property.name}`);
    
    return createdResponse(res, property, 'Property created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update property (Admin only)
 * PATCH /api/v1/properties/:id
 */
export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Get current property for audit
    const [currentProperty] = await query('SELECT * FROM properties WHERE id = ?', [id]);
    
    if (!currentProperty) {
      throw new ApiError(404, 'Property not found');
    }
    
    // Handle slug update if name changes
    if (updateData.name && updateData.name !== currentProperty.name) {
      let slug = slugify(updateData.name);
      const [existingSlug] = await query('SELECT id FROM properties WHERE slug = ? AND id != ?', [slug, id]);
      if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
      }
      updateData.slug = slug;
    }
    
    // Handle amenities update
    if (updateData.amenityIds) {
      await query('DELETE FROM property_amenities WHERE propertyId = ?', [id]);
      for (const amenityId of updateData.amenityIds) {
        await query('INSERT INTO property_amenities (propertyId, amenityId) VALUES (?, ?)', [id, amenityId]);
      }
      delete updateData.amenityIds;
    }
    
    // Build dynamic UPDATE query
    const updateFields = Object.keys(updateData).filter(key => updateData[key] !== undefined);
    if (updateFields.length > 0) {
      const setClause = updateFields.map(field => `${field} = ?`).join(', ');
      const values = updateFields.map(field => updateData[field]);
      await query(`UPDATE properties SET ${setClause}, updatedAt = NOW() WHERE id = ?`, [...values, id]);
    }
    
    const [property] = await query('SELECT * FROM properties WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.PROPERTY_UPDATE,
      entity: 'Property',
      entityId: property.id,
      oldValue: currentProperty,
      newValue: property,
    });
    
    return successResponse(res, property, 'Property updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete property (Admin only)
 * DELETE /api/v1/properties/:id
 */
export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [property] = await query('SELECT * FROM properties WHERE id = ?', [id]);
    
    if (!property) {
      throw new ApiError(404, 'Property not found');
    }
    
    // Check for active bookings
    const [activeBookings] = await query(
      `SELECT COUNT(*) as count FROM bookings 
       WHERE propertyId = ? AND status IN ('CONFIRMED', 'PENDING') AND checkOut >= NOW()`,
      [id]
    );
    
    if (activeBookings.count > 0) {
      throw new ApiError(400, 'Cannot delete property with active bookings');
    }
    
    // Soft delete
    await query('UPDATE properties SET isActive = false, updatedAt = NOW() WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.PROPERTY_DELETE,
      entity: 'Property',
      entityId: id,
      oldValue: property,
    });
    
    logger.info(`Property deleted: ${property.name}`);
    
    return noContentResponse(res);
  } catch (error) {
    next(error);
  }
};

/**
 * Add property image (Admin only)
 * POST /api/v1/properties/:id/images
 */
export const addPropertyImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { url, alt, caption, isPrimary } = req.body;
    
    // If setting as primary, unset other primary images
    if (isPrimary) {
      await query('UPDATE property_images SET isPrimary = false WHERE propertyId = ? AND isPrimary = true', [id]);
    }
    
    // Get max order
    const [maxOrder] = await query('SELECT MAX(`order`) as maxOrder FROM property_images WHERE propertyId = ?', [id]);
    
    const imageId = uuidv4();
    await query(
      'INSERT INTO property_images (id, propertyId, url, alt, caption, isPrimary, `order`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [imageId, id, url, alt, caption, isPrimary || false, (maxOrder.maxOrder || 0) + 1]
    );
    
    const [image] = await query('SELECT * FROM property_images WHERE id = ?', [imageId]);
    
    return createdResponse(res, image, 'Image added successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Block dates for property (Admin only)
 * POST /api/v1/properties/:id/block-dates
 */
export const blockDates = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, type, reason } = req.body;
    
    // Note: blocked_dates table not implemented in basic schema
    return createdResponse(res, { message: 'Date blocking not yet implemented' });
  } catch (error) {
    next(error);
  }
};

/**
 * Unblock dates (Admin only)
 * DELETE /api/v1/properties/:propertyId/block-dates/:id
 */
export const unblockDates = async (req, res, next) => {
  try {
    return noContentResponse(res);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all properties for Admin (including inactive)
 * GET /api/v1/admin/properties
 */
export const getAdminProperties = async (req, res, next) => {
  try {
    const properties = await query('SELECT * FROM properties ORDER BY createdAt DESC');
    
    // Get images, amenities, and stats for each property
    const propertiesWithDetails = await Promise.all(
      properties.map(async (property) => {
        const images = await query(
          'SELECT * FROM property_images WHERE propertyId = ? ORDER BY `order` ASC',
          [property.id]
        );
        
        const amenities = await query(
          `SELECT a.* FROM amenities a 
           INNER JOIN property_amenities pa ON pa.amenityId = a.id 
           WHERE pa.propertyId = ?`,
          [property.id]
        );
        
        const [stats] = await query(
          `SELECT 
            (SELECT COUNT(*) FROM reviews WHERE propertyId = ?) as reviewCount,
            (SELECT COUNT(*) FROM bookings WHERE propertyId = ?) as bookingCount,
            (SELECT AVG(rating) FROM reviews WHERE propertyId = ? AND isPublished = true) as avgRating`,
          [property.id, property.id, property.id]
        );
        
        return {
          ...property,
          images,
          amenities,
          _count: { reviews: stats.reviewCount, bookings: stats.bookingCount },
          averageRating: stats.avgRating || null,
        };
      })
    );
    
    return successResponse(res, propertiesWithDetails);
  } catch (error) {
    next(error);
  }
};

export default {
  getProperties,
  getAdminProperties,
  getProperty,
  getPropertyAvailability,
  createProperty,
  updateProperty,
  deleteProperty,
  addPropertyImage,
  blockDates,
  unblockDates,
};
