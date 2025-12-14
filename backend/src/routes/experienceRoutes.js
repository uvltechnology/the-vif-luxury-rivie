import { Router } from 'express';
import experienceController from '../controllers/experienceController.js';
import { authenticate, adminOnly } from '../middleware/auth.js';
import { uuidParam, paginationQuery } from '../middleware/validators.js';

const router = Router();

/**
 * @swagger
 * /experiences:
 *   get:
 *     summary: Get all experiences
 *     tags: [Experiences]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of experiences
 */
router.get('/', paginationQuery, experienceController.getExperiences);

/**
 * @swagger
 * /experiences/{idOrSlug}:
 *   get:
 *     summary: Get experience by ID or slug
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: idOrSlug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experience details
 *       404:
 *         description: Experience not found
 */
router.get('/:idOrSlug', experienceController.getExperience);

/**
 * @swagger
 * /experiences:
 *   post:
 *     summary: Create experience (Admin only)
 *     tags: [Experiences]
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
 *               - basePrice
 *             properties:
 *               name:
 *                 type: string
 *               tagline:
 *                 type: string
 *               icon:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               fullDescription:
 *                 type: string
 *               basePrice:
 *                 type: number
 *               priceUnit:
 *                 type: string
 *               duration:
 *                 type: string
 *               includes:
 *                 type: array
 *                 items:
 *                   type: string
 *               priceOptions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     description:
 *                       type: string
 *     responses:
 *       201:
 *         description: Experience created
 */
router.post('/', authenticate, adminOnly, experienceController.createExperience);

/**
 * @swagger
 * /experiences/{id}:
 *   patch:
 *     summary: Update experience (Admin only)
 *     tags: [Experiences]
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
 *       200:
 *         description: Experience updated
 */
router.patch('/:id', authenticate, adminOnly, uuidParam, experienceController.updateExperience);

/**
 * @swagger
 * /experiences/{id}:
 *   delete:
 *     summary: Delete experience (Admin only)
 *     tags: [Experiences]
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
 *         description: Experience deleted
 */
router.delete('/:id', authenticate, adminOnly, uuidParam, experienceController.deleteExperience);

export default router;
