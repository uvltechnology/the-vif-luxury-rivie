import { Router } from 'express';
import reviewController from '../controllers/reviewController.js';
import { authenticate, adminOnly, optionalAuth } from '../middleware/auth.js';
import { createReviewValidation, uuidParam, paginationQuery } from '../middleware/validators.js';

const router = Router();

/**
 * @swagger
 * /reviews/featured:
 *   get:
 *     summary: Get featured reviews for homepage
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Featured reviews
 */
router.get('/featured', reviewController.getFeaturedReviews);

/**
 * @swagger
 * /reviews/property/{propertyId}:
 *   get:
 *     summary: Get reviews for a specific property
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Property reviews with summary statistics
 */
router.get('/property/:propertyId', paginationQuery, reviewController.getPropertyReviews);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: propertyId
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: rating
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *       - in: query
 *         name: verified
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/', paginationQuery, reviewController.getReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Review details
 *       404:
 *         description: Review not found
 */
router.get('/:id', uuidParam, reviewController.getReview);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *               - rating
 *               - content
 *               - guestName
 *             properties:
 *               propertyId:
 *                 type: string
 *                 format: uuid
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               guestName:
 *                 type: string
 *               guestEmail:
 *                 type: string
 *                 format: email
 *               cleanlinessRating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               locationRating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               valueRating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               communicationRating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               stayDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Review created
 */
router.post('/', optionalAuth, createReviewValidation, reviewController.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     summary: Update review (Admin - for responding or moderation)
 *     tags: [Reviews]
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
 *             properties:
 *               response:
 *                 type: string
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Review updated
 */
router.patch('/:id', authenticate, adminOnly, uuidParam, reviewController.updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete review (Admin only)
 *     tags: [Reviews]
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
 *         description: Review deleted
 */
router.delete('/:id', authenticate, adminOnly, uuidParam, reviewController.deleteReview);

export default router;
