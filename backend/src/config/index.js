import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  // Server
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  apiVersion: process.env.API_VERSION || 'v1',
  
  // Database
  databaseUrl: process.env.DATABASE_URL,
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-fallback-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  
  // CORS - Allow multiple local development ports
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:3000',
      'http://localhost:3173',
      'http://localhost:5000',
      'http://localhost:5001',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5000',
      'http://127.0.0.1:5001',
      'http://127.0.0.1:5173'
    ],
  },
  
  // Email
  email: {
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM || 'noreply@thevif.com',
    fromName: process.env.EMAIL_FROM_NAME || 'The VIF Luxury Riviera',
  },
  
  // Admin
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@thevif.com',
    defaultPassword: process.env.ADMIN_DEFAULT_PASSWORD || 'changeThisPassword123!',
  },
  
  // File Upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024, // 10MB
    uploadDir: process.env.UPLOAD_DIR || 'uploads',
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
    file: process.env.LOG_FILE || 'logs/app.log',
  },
  
  // External Services
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  
  googleMaps: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
  },
};

// Validate required configuration
const validateConfig = () => {
  const required = ['databaseUrl'];
  const missing = required.filter(key => !config[key]);
  
  if (missing.length > 0 && config.env === 'production') {
    throw new Error(`Missing required configuration: ${missing.join(', ')}`);
  }
};

validateConfig();

export default config;
