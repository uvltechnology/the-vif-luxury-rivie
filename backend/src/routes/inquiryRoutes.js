import { Router } from 'express';
import inquiryController from '../controllers/inquiryController.js';
import { authenticate, adminOnly, optionalAuth } from '../middleware/auth.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { createInquiryValidation, uuidParam, paginationQuery } from '../middleware/validators.js';

const router = Router();

/**
 * @swagger
 * /inquiries/stats:
 *   get:
 *     summary: Get inquiry statistics (Admin only)
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inquiry statistics
 */
router.get('/stats', authenticate, adminOnly, inquiryController.getInquiryStats);

/**
 * @swagger
 * /inquiries:
 *   get:
 *     summary: Get all inquiries (Admin only)
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [NEW, IN_PROGRESS, RESPONDED, CLOSED]
 *       - in: query
 *         name: propertyId
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of inquiries
 */
router.get('/', authenticate, adminOnly, paginationQuery, inquiryController.getInquiries);

/**
 * @swagger
 * /inquiries/{id}:
 *   get:
 *     summary: Get inquiry by ID (Admin only)
 *     tags: [Inquiries]
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
 *         description: Inquiry details
 *       404:
 *         description: Inquiry not found
 */
router.get('/:id', authenticate, adminOnly, uuidParam, inquiryController.getInquiry);

/**
 * @swagger
 * /inquiries:
 *   post:
 *     summary: Submit an inquiry (Public)
 *     tags: [Inquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               propertyId:
 *                 type: string
 *                 format: uuid
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               checkIn:
 *                 type: string
 *                 format: date
 *               checkOut:
 *                 type: string
 *                 format: date
 *               numGuests:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Inquiry submitted
 *       429:
 *         description: Too many inquiries
 */
router.post('/', optionalAuth, contactLimiter, createInquiryValidation, inquiryController.createInquiry);

/**
 * @swagger
 * /inquiries/{id}:
 *   patch:
 *     summary: Update inquiry status (Admin only)
 *     tags: [Inquiries]
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
 *               status:
 *                 type: string
 *                 enum: [NEW, IN_PROGRESS, RESPONDED, CLOSED]
 *               response:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inquiry updated
 */
router.patch('/:id', authenticate, adminOnly, uuidParam, inquiryController.updateInquiry);

/**
 * @swagger
 * /inquiries/{id}:
 *   delete:
 *     summary: Delete inquiry (Admin only)
 *     tags: [Inquiries]
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
 *         description: Inquiry deleted
 */
router.delete('/:id', authenticate, adminOnly, uuidParam, inquiryController.deleteInquiry);

export default router;
