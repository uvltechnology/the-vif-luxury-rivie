import { Router } from 'express';
import authRoutes from './authRoutes.js';
import propertyRoutes from './propertyRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import inquiryRoutes from './inquiryRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import propertyController from '../controllers/propertyController.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/bookings', bookingRoutes);
router.use('/experiences', experienceRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/reviews', reviewRoutes);

// Admin routes
router.get('/admin/properties', authenticate, adminOnly, propertyController.getAdminProperties);

export default router;
