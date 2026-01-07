import { query } from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { slugify, parsePaginationParams } from '../utils/helpers.js';
import { createAuditLog, AuditAction, extractRequestInfo } from '../services/auditService.js';
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get all experiences (Public)
 * GET /api/v1/experiences
 */
export const getExperiences = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePaginationParams(req.query);
    const { category, minPrice, maxPrice, featured } = req.query;
    
    let whereConditions = ['isActive = true'];
    let params = [];
    
    if (category) {
      whereConditions.push('category = ?');
      params.push(category.toLowerCase());
    }
    if (minPrice) {
      whereConditions.push('price >= ?');
      params.push(parseFloat(minPrice));
    }
    if (maxPrice) {
      whereConditions.push('price <= ?');
      params.push(parseFloat(maxPrice));
    }
    if (featured === 'true') {
      whereConditions.push('isFeatured = true');
    }
    
    const whereClause = whereConditions.join(' AND ');
    
    const [countResult] = await query(`SELECT COUNT(*) as total FROM experiences WHERE ${whereClause}`, params);
    const total = countResult.total;
    
    const experiences = await query(
      `SELECT * FROM experiences WHERE ${whereClause} ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
      [...params, limit, skip]
    );
    
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
    
    const [experience] = await query(
      isUUID 
        ? 'SELECT * FROM experiences WHERE id = ? AND isActive = true' 
        : 'SELECT * FROM experiences WHERE slug = ? AND isActive = true',
      [idOrSlug]
    );
    
    if (!experience) {
      throw new ApiError(404, 'Experience not found');
    }
    
    return successResponse(res, experience);
  } catch (error) {
    next(error);
  }
};

/**
 * Create experience (Admin)
 * POST /api/v1/experiences
 */
export const createExperience = async (req, res, next) => {
  try {
    const { name, description, shortDescription, duration, price, category, imageUrl, isFeatured } = req.body;
    
    // Generate unique slug
    let slug = slugify(name);
    const [existingSlug] = await query('SELECT id FROM experiences WHERE slug = ?', [slug]);
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }
    
    const id = uuidv4();
    await query(
      `INSERT INTO experiences (id, slug, name, description, shortDescription, duration, price, category, imageUrl, isFeatured, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true)`,
      [id, slug, name, description, shortDescription, duration, price, category, imageUrl, isFeatured || false]
    );
    
    const [experience] = await query('SELECT * FROM experiences WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.EXPERIENCE_CREATE,
      entity: 'Experience',
      entityId: id,
      newValue: experience,
    });
    
    logger.info(`Experience created: ${name}`);
    
    return createdResponse(res, experience, 'Experience created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update experience (Admin)
 * PATCH /api/v1/experiences/:id
 */
export const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    const [currentExperience] = await query('SELECT * FROM experiences WHERE id = ?', [id]);
    
    if (!currentExperience) {
      throw new ApiError(404, 'Experience not found');
    }
    
    // Handle slug update if name changes
    if (updateData.name && updateData.name !== currentExperience.name) {
      let slug = slugify(updateData.name);
      const [existingSlug] = await query('SELECT id FROM experiences WHERE slug = ? AND id != ?', [slug, id]);
      if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
      }
      updateData.slug = slug;
    }
    
    // Build dynamic UPDATE query
    const updateFields = Object.keys(updateData).filter(key => updateData[key] !== undefined);
    if (updateFields.length > 0) {
      const setClause = updateFields.map(field => `${field} = ?`).join(', ');
      const values = updateFields.map(field => updateData[field]);
      await query(`UPDATE experiences SET ${setClause}, updatedAt = NOW() WHERE id = ?`, [...values, id]);
    }
    
    const [experience] = await query('SELECT * FROM experiences WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.EXPERIENCE_UPDATE,
      entity: 'Experience',
      entityId: id,
      oldValue: currentExperience,
      newValue: experience,
    });
    
    return successResponse(res, experience, 'Experience updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete experience (Admin)
 * DELETE /api/v1/experiences/:id
 */
export const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [experience] = await query('SELECT * FROM experiences WHERE id = ?', [id]);
    
    if (!experience) {
      throw new ApiError(404, 'Experience not found');
    }
    
    // Soft delete
    await query('UPDATE experiences SET isActive = false, updatedAt = NOW() WHERE id = ?', [id]);
    
    // Audit log
    await createAuditLog({
      ...extractRequestInfo(req),
      action: AuditAction.EXPERIENCE_DELETE,
      entity: 'Experience',
      entityId: id,
      oldValue: experience,
    });
    
    logger.info(`Experience deleted: ${experience.name}`);
    
    return noContentResponse(res);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all experiences for Admin (including inactive)
 * GET /api/v1/admin/experiences
 */
export const getAdminExperiences = async (req, res, next) => {
  try {
    const experiences = await query('SELECT * FROM experiences ORDER BY createdAt DESC');
    return successResponse(res, experiences);
  } catch (error) {
    next(error);
  }
};

/**
 * Get featured experiences
 * GET /api/v1/experiences/featured
 */
export const getFeaturedExperiences = async (req, res, next) => {
  try {
    const experiences = await query(
      'SELECT * FROM experiences WHERE isActive = true AND isFeatured = true ORDER BY createdAt DESC LIMIT 6'
    );
    return successResponse(res, experiences);
  } catch (error) {
    next(error);
  }
};

/**
 * Get experience categories
 * GET /api/v1/experiences/categories
 */
export const getExperienceCategories = async (req, res, next) => {
  try {
    const categories = await query(
      `SELECT category, COUNT(*) as count 
       FROM experiences 
       WHERE isActive = true 
       GROUP BY category 
       ORDER BY count DESC`
    );
    return successResponse(res, categories);
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
  getAdminExperiences,
  getFeaturedExperiences,
  getExperienceCategories,
};
