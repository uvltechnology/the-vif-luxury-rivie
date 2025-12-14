import prisma from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { slugify, parsePaginationParams, parseSortParams } from '../utils/helpers.js';
import { createAuditLog, AuditAction, extractRequestInfo } from '../services/auditService.js';
import logger from '../utils/logger.js';

/**
 * Get all properties
 * GET /api/v1/properties
 */
export const getProperties = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const orderBy = parseSortParams(req.query, ['name', 'pricePerNight', 'createdAt', 'bedrooms']);
    
    // Filter options
    const { type, city, minPrice, maxPrice, bedrooms, maxGuests, featured } = req.query;
    
    const where = {
      isActive: true,
    };
    
    if (type) where.type = type.toUpperCase();
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (minPrice) where.pricePerNight = { ...where.pricePerNight, gte: parseFloat(minPrice) };
    if (maxPrice) where.pricePerNight = { ...where.pricePerNight, lte: parseFloat(maxPrice) };
    if (bedrooms) where.bedrooms = { gte: parseInt(bedrooms) };
    if (maxGuests) where.maxGuests = { gte: parseInt(maxGuests) };
    if (featured === 'true') where.isFeatured = true;
    
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          images: {
            where: { isPrimary: true },
            take: 1,
          },
          amenities: {
            include: { amenity: true },
            take: 10,
          },
          _count: {
            select: { reviews: true },
          },
        },
      }),
      prisma.property.count({ where }),
    ]);
    
    // Calculate average rating for each property
    const propertiesWithRating = await Promise.all(
      properties.map(async (property) => {
        const avgRating = await prisma.review.aggregate({
          where: { propertyId: property.id, isPublished: true },
          _avg: { rating: true },
        });
        
        return {
          ...property,
          averageRating: avgRating._avg.rating || null,
          amenities: property.amenities.map((pa) => pa.amenity),
        };
      })
    );
    
    return paginatedResponse(res, propertiesWithRating, { page, limit, total });
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
    
    const property = await prisma.property.findFirst({
      where: isUUID ? { id: idOrSlug } : { slug: idOrSlug },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        amenities: {
          include: { amenity: true },
        },
        reviews: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            rating: true,
            title: true,
            content: true,
            guestName: true,
            stayDate: true,
            response: true,
            respondedAt: true,
            createdAt: true,
          },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });
    
    if (!property) {
      throw new ApiError(404, 'Property not found');
    }
    
    // Get average ratings
    const ratings = await prisma.review.aggregate({
      where: { propertyId: property.id, isPublished: true },
      _avg: {
        rating: true,
        cleanlinessRating: true,
        locationRating: true,
        valueRating: true,
        communicationRating: true,
      },
    });
    
    const result = {
      ...property,
      amenities: property.amenities.map((pa) => pa.amenity),
      averageRating: ratings._avg.rating,
      ratings: {
        overall: ratings._avg.rating,
        cleanliness: ratings._avg.cleanlinessRating,
        location: ratings._avg.locationRating,
        value: ratings._avg.valueRating,
        communication: ratings._avg.communicationRating,
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
    const end = endDate ? new Date(endDate) : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days
    
    // Get bookings in date range
    const bookings = await prisma.booking.findMany({
      where: {
        propertyId: id,
        status: { in: ['CONFIRMED', 'PENDING'] },
        OR: [
          { checkIn: { gte: start, lte: end } },
          { checkOut: { gte: start, lte: end } },
          { AND: [{ checkIn: { lte: start } }, { checkOut: { gte: end } }] },
        ],
      },
      select: {
        checkIn: true,
        checkOut: true,
        status: true,
      },
    });
    
    // Get blocked dates
    const blockedDates = await prisma.blockedDate.findMany({
      where: {
        propertyId: id,
        OR: [
          { startDate: { gte: start, lte: end } },
          { endDate: { gte: start, lte: end } },
          { AND: [{ startDate: { lte: start } }, { endDate: { gte: end } }] },
        ],
      },
      select: {
        startDate: true,
        endDate: true,
        type: true,
        reason: true,
      },
    });
    
    // Get property minimum nights
    const property = await prisma.property.findUnique({
      where: { id },
      select: { minNights: true, maxNights: true },
    });
    
    return successResponse(res, {
      bookings,
      blockedDates,
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
      name,
      tagline,
      type,
      description,
      shortDescription,
      address,
      city,
      region,
      country,
      latitude,
      longitude,
      bedrooms,
      bathrooms,
      maxGuests,
      squareMeters,
      pricePerNight,
      cleaningFee,
      securityDeposit,
      checkInTime,
      checkOutTime,
      minNights,
      maxNights,
      cancellationPolicy,
      houseRules,
      amenityIds,
    } = req.body;
    
    // Generate unique slug
    let slug = slugify(name);
    const existingSlug = await prisma.property.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }
    
    const property = await prisma.property.create({
      data: {
        slug,
        name,
        tagline,
        type,
        description,
        shortDescription,
        address,
        city,
        region: region || 'French Riviera',
        country: country || 'France',
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        maxGuests,
        squareMeters,
        pricePerNight,
        cleaningFee,
        securityDeposit,
        checkInTime,
        checkOutTime,
        minNights,
        maxNights,
        cancellationPolicy,
        houseRules,
        amenities: amenityIds?.length
          ? {
              create: amenityIds.map((amenityId) => ({ amenityId })),
            }
          : undefined,
      },
      include: {
        amenities: { include: { amenity: true } },
      },
    });
    
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
    const updateData = req.body;
    
    // Get current property for audit
    const currentProperty = await prisma.property.findUnique({
      where: { id },
    });
    
    if (!currentProperty) {
      throw new ApiError(404, 'Property not found');
    }
    
    // Handle slug update if name changes
    if (updateData.name && updateData.name !== currentProperty.name) {
      let slug = slugify(updateData.name);
      const existingSlug = await prisma.property.findFirst({
        where: { slug, id: { not: id } },
      });
      if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
      }
      updateData.slug = slug;
    }
    
    // Handle amenities update
    if (updateData.amenityIds) {
      // Remove existing amenities and add new ones
      await prisma.propertyAmenity.deleteMany({
        where: { propertyId: id },
      });
      
      await prisma.propertyAmenity.createMany({
        data: updateData.amenityIds.map((amenityId) => ({
          propertyId: id,
          amenityId,
        })),
      });
      
      delete updateData.amenityIds;
    }
    
    const property = await prisma.property.update({
      where: { id },
      data: updateData,
      include: {
        amenities: { include: { amenity: true } },
        images: true,
      },
    });
    
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
    
    const property = await prisma.property.findUnique({
      where: { id },
    });
    
    if (!property) {
      throw new ApiError(404, 'Property not found');
    }
    
    // Check for active bookings
    const activeBookings = await prisma.booking.count({
      where: {
        propertyId: id,
        status: { in: ['CONFIRMED', 'PENDING'] },
        checkOut: { gte: new Date() },
      },
    });
    
    if (activeBookings > 0) {
      throw new ApiError(400, 'Cannot delete property with active bookings');
    }
    
    // Soft delete (mark as inactive) or hard delete
    await prisma.property.update({
      where: { id },
      data: { isActive: false },
    });
    
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
      await prisma.propertyImage.updateMany({
        where: { propertyId: id, isPrimary: true },
        data: { isPrimary: false },
      });
    }
    
    // Get max order
    const maxOrder = await prisma.propertyImage.aggregate({
      where: { propertyId: id },
      _max: { order: true },
    });
    
    const image = await prisma.propertyImage.create({
      data: {
        propertyId: id,
        url,
        alt,
        caption,
        isPrimary: isPrimary || false,
        order: (maxOrder._max.order || 0) + 1,
      },
    });
    
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
    
    const blockedDate = await prisma.blockedDate.create({
      data: {
        propertyId: id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        type: type || 'OWNER_BLOCK',
        reason,
      },
    });
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.AVAILABILITY_BLOCK,
      entity: 'BlockedDate',
      entityId: blockedDate.id,
      newValue: blockedDate,
    });
    
    return createdResponse(res, blockedDate, 'Dates blocked successfully');
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
    const { id } = req.params;
    
    const blockedDate = await prisma.blockedDate.delete({
      where: { id },
    });
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.AVAILABILITY_UNBLOCK,
      entity: 'BlockedDate',
      entityId: id,
      oldValue: blockedDate,
    });
    
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
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        amenities: {
          include: { amenity: true },
        },
        _count: {
          select: { reviews: true, bookings: true },
        },
      },
    });
    
    // Calculate average rating for each property
    const propertiesWithRating = await Promise.all(
      properties.map(async (property) => {
        const avgRating = await prisma.review.aggregate({
          where: { propertyId: property.id, isPublished: true },
          _avg: { rating: true },
        });
        
        return {
          ...property,
          averageRating: avgRating._avg.rating || null,
          amenities: property.amenities.map((pa) => pa.amenity),
        };
      })
    );
    
    return successResponse(res, propertiesWithRating);
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
