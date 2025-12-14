import { Router } from 'express';
import bookingController from '../controllers/bookingController.js';
import { authenticate, adminOnly, optionalAuth } from '../middleware/auth.js';
import { bookingLimiter } from '../middleware/rateLimiter.js';
import { createBookingValidation, updateBookingValidation, uuidParam, paginationQuery } from '../middleware/validators.js';

const router = Router();

/**
 * @swagger
 * /bookings/stats:
 *   get:
 *     summary: Get booking statistics (Admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: integer
 *         description: Number of days for statistics (default 30)
 *     responses:
 *       200:
 *         description: Booking statistics
 */
router.get('/stats', authenticate, adminOnly, bookingController.getBookingStats);

/**
 * @swagger
 * /bookings/my-bookings:
 *   get:
 *     summary: Get current user's bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW]
 *     responses:
 *       200:
 *         description: User's bookings
 */
router.get('/my-bookings', authenticate, paginationQuery, bookingController.getMyBookings);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings (Admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW]
 *       - in: query
 *         name: propertyId
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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by guest name, email, or booking reference
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/', authenticate, adminOnly, paginationQuery, bookingController.getBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get booking by ID or reference
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID (UUID) or booking reference (VIF-XXXX-XXXXX)
 *     responses:
 *       200:
 *         description: Booking details
 *       403:
 *         description: Not authorized to view this booking
 *       404:
 *         description: Booking not found
 */
router.get('/:id', authenticate, bookingController.getBooking);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *               - checkIn
 *               - checkOut
 *               - numGuests
 *               - guestName
 *               - guestEmail
 *             properties:
 *               propertyId:
 *                 type: string
 *                 format: uuid
 *               checkIn:
 *                 type: string
 *                 format: date
 *               checkOut:
 *                 type: string
 *                 format: date
 *               numGuests:
 *                 type: integer
 *                 minimum: 1
 *               numAdults:
 *                 type: integer
 *               numChildren:
 *                 type: integer
 *               guestName:
 *                 type: string
 *               guestEmail:
 *                 type: string
 *                 format: email
 *               guestPhone:
 *                 type: string
 *               guestCountry:
 *                 type: string
 *               notes:
 *                 type: string
 *               specialRequests:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Validation error
 *       404:
 *         description: Property not found
 *       409:
 *         description: Dates not available
 */
router.post('/', optionalAuth, bookingLimiter, createBookingValidation, bookingController.createBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   patch:
 *     summary: Update booking (Admin only)
 *     tags: [Bookings]
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
 *                 enum: [PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW]
 *               notes:
 *                 type: string
 *               internalNotes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking updated
 */
router.patch('/:id', authenticate, adminOnly, updateBookingValidation, bookingController.updateBooking);

/**
 * @swagger
 * /bookings/{id}/cancel:
 *   post:
 *     summary: Cancel booking
 *     tags: [Bookings]
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
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking cancelled
 *       400:
 *         description: Booking cannot be cancelled
 *       403:
 *         description: Not authorized to cancel this booking
 */
router.post('/:id/cancel', authenticate, bookingController.cancelBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete booking (Admin only)
 *     tags: [Bookings]
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
 *         description: Booking deleted
 *       404:
 *         description: Booking not found
 */
router.delete('/:id', authenticate, adminOnly, uuidParam, bookingController.deleteBooking);

export default router;
