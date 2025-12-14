import prisma from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { slugify, parsePaginationParams } from '../utils/helpers.js';
import logger from '../utils/logger.js';

/**
 * Get all experiences
 * GET /api/v1/experiences
 */
export const getExperiences = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { featured } = req.query;
    
    const where = {
      isActive: true,
    };
    
    if (featured === 'true') where.isFeatured = true;
    
    const [experiences, total] = await Promise.all([
      prisma.experience.findMany({
        where,
        orderBy: { name: 'asc' },
        skip,
        take: limit,
        include: {
          priceOptions: true,
        },
      }),
      prisma.experience.count({ where }),
    ]);
    
    return paginatedResponse(res, experiences, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single experience
 * GET /api/v1/experiences/:idOrSlug
 */
export const getExperience = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    
    const experience = await prisma.experience.findFirst({
      where: isUUID ? { id: idOrSlug } : { slug: idOrSlug },
      include: {
        priceOptions: true,
      },
    });
    
    if (!experience) {
      throw new ApiError(404, 'Experience not found');
    }
    
    return successResponse(res, experience);
  } catch (error) {
    next(error);
  }
};

/**
 * Create experience (Admin only)
 * POST /api/v1/experiences
 */
export const createExperience = async (req, res, next) => {
  try {
    const {
      name,
      tagline,
      icon,
      shortDescription,
      fullDescription,
      basePrice,
      priceUnit,
      duration,
      includes,
      priceOptions,
    } = req.body;
    
    // Generate slug
    let slug = slugify(name);
    const existing = await prisma.experience.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }
    
    const experience = await prisma.experience.create({
      data: {
        slug,
        name,
        tagline,
        icon,
        shortDescription,
        fullDescription,
        basePrice,
        priceUnit: priceUnit || 'per person',
        duration,
        includes: includes || [],
        priceOptions: priceOptions?.length
          ? {
              create: priceOptions.map((opt) => ({
                name: opt.name,
                price: opt.price,
                description: opt.description,
              })),
            }
          : undefined,
      },
      include: {
        priceOptions: true,
      },
    });
    
    logger.info(`Experience created: ${experience.name}`);
    
    return createdResponse(res, experience, 'Experience created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update experience (Admin only)
 * PATCH /api/v1/experiences/:id
 */
export const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const currentExperience = await prisma.experience.findUnique({
      where: { id },
    });
    
    if (!currentExperience) {
      throw new ApiError(404, 'Experience not found');
    }
    
    // Handle slug update if name changes
    if (updateData.name && updateData.name !== currentExperience.name) {
      let slug = slugify(updateData.name);
      const existing = await prisma.experience.findFirst({
        where: { slug, id: { not: id } },
      });
      if (existing) {
        slug = `${slug}-${Date.now()}`;
      }
      updateData.slug = slug;
    }
    
    // Handle price options update
    if (updateData.priceOptions) {
      await prisma.experiencePriceOption.deleteMany({
        where: { experienceId: id },
      });
      
      await prisma.experiencePriceOption.createMany({
        data: updateData.priceOptions.map((opt) => ({
          experienceId: id,
          name: opt.name,
          price: opt.price,
          description: opt.description,
        })),
      });
      
      delete updateData.priceOptions;
    }
    
    const experience = await prisma.experience.update({
      where: { id },
      data: updateData,
      include: {
        priceOptions: true,
      },
    });
    
    return successResponse(res, experience, 'Experience updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete experience (Admin only)
 * DELETE /api/v1/experiences/:id
 */
export const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const experience = await prisma.experience.findUnique({
      where: { id },
    });
    
    if (!experience) {
      throw new ApiError(404, 'Experience not found');
    }
    
    // Soft delete
    await prisma.experience.update({
      where: { id },
      data: { isActive: false },
    });
    
    logger.info(`Experience deleted: ${experience.name}`);
    
    return noContentResponse(res);
  } catch (error) {
    next(error);
  }
};

export default {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
