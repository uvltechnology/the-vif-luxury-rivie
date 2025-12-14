import { Router } from 'express';
import propertyController from '../controllers/propertyController.js';
import { authenticate, adminOnly, optionalAuth } from '../middleware/auth.js';
import { createPropertyValidation, updatePropertyValidation, uuidParam, paginationQuery, dateRangeQuery } from '../middleware/validators.js';

const router = Router();

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [VILLA, APARTMENT]
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: bedrooms
 *         schema:
 *           type: integer
 *       - in: query
 *         name: maxGuests
 *         schema:
 *           type: integer
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of properties
 */
router.get('/', paginationQuery, propertyController.getProperties);

/**
 * @swagger
 * /properties/{idOrSlug}:
 *   get:
 *     summary: Get property by ID or slug
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: idOrSlug
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID (UUID) or slug
 *     responses:
 *       200:
 *         description: Property details
 *       404:
 *         description: Property not found
 */
router.get('/:idOrSlug', propertyController.getProperty);

/**
 * @swagger
 * /properties/{id}/availability:
 *   get:
 *     summary: Get property availability
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Availability data including bookings and blocked dates
 */
router.get('/:id/availability', dateRangeQuery, propertyController.getPropertyAvailability);

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property (Admin only)
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - description
 *               - address
 *               - city
 *               - bedrooms
 *               - bathrooms
 *               - maxGuests
 *               - pricePerNight
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [VILLA, APARTMENT]
 *               description:
 *                 type: string
 *               # ... other properties
 *     responses:
 *       201:
 *         description: Property created
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */
router.post('/', authenticate, adminOnly, createPropertyValidation, propertyController.createProperty);

/**
 * @swagger
 * /properties/{id}:
 *   patch:
 *     summary: Update property (Admin only)
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Property updated
 *       404:
 *         description: Property not found
 */
router.patch('/:id', authenticate, adminOnly, updatePropertyValidation, propertyController.updateProperty);

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete property (Admin only)
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Property deleted
 *       400:
 *         description: Cannot delete property with active bookings
 *       404:
 *         description: Property not found
 */
router.delete('/:id', authenticate, adminOnly, uuidParam, propertyController.deleteProperty);

/**
 * @swagger
 * /properties/{id}/images:
 *   post:
 *     summary: Add image to property (Admin only)
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *               alt:
 *                 type: string
 *               caption:
 *                 type: string
 *               isPrimary:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Image added
 */
router.post('/:id/images', authenticate, adminOnly, propertyController.addPropertyImage);

/**
 * @swagger
 * /properties/{id}/block-dates:
 *   post:
 *     summary: Block dates for property (Admin only)
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               type:
 *                 type: string
 *                 enum: [MAINTENANCE, OWNER_BLOCK, SEASONAL_CLOSURE, OTHER]
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dates blocked
 */
router.post('/:id/block-dates', authenticate, adminOnly, propertyController.blockDates);

/**
 * @swagger
 * /properties/{propertyId}/block-dates/{id}:
 *   delete:
 *     summary: Unblock dates (Admin only)
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Dates unblocked
 */
router.delete('/:propertyId/block-dates/:id', authenticate, adminOnly, propertyController.unblockDates);

export default router;
