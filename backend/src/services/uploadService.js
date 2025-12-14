import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/index.js';
import logger from '../utils/logger.js';
import { ApiError } from '../utils/ApiError.js';

// Ensure upload directory exists
const ensureUploadDir = async () => {
  const uploadPath = path.join(process.cwd(), config.upload.uploadDir);
  try {
    await fs.access(uploadPath);
  } catch {
    await fs.mkdir(uploadPath, { recursive: true });
    logger.info(`Created upload directory: ${uploadPath}`);
  }
  return uploadPath;
};

// Configure multer storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  if (config.upload.allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed.'), false);
  }
};

// Multer upload instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.upload.maxFileSize,
  },
});

/**
 * Process and save uploaded image
 */
export const processImage = async (file, options = {}) => {
  const {
    width = 1920,
    height = 1080,
    quality = 85,
    format = 'webp',
    subfolder = 'images',
  } = options;
  
  const uploadPath = await ensureUploadDir();
  const subfolderPath = path.join(uploadPath, subfolder);
  
  // Create subfolder if needed
  await fs.mkdir(subfolderPath, { recursive: true });
  
  const filename = `${uuidv4()}.${format}`;
  const filepath = path.join(subfolderPath, filename);
  
  // Process image with sharp
  let processor = sharp(file.buffer);
  
  // Resize if needed (maintaining aspect ratio)
  processor = processor.resize(width, height, {
    fit: 'inside',
    withoutEnlargement: true,
  });
  
  // Convert to specified format
  switch (format) {
    case 'webp':
      processor = processor.webp({ quality });
      break;
    case 'jpeg':
    case 'jpg':
      processor = processor.jpeg({ quality });
      break;
    case 'png':
      processor = processor.png({ quality });
      break;
    case 'avif':
      processor = processor.avif({ quality });
      break;
    default:
      processor = processor.webp({ quality });
  }
  
  // Save processed image
  await processor.toFile(filepath);
  
  // Get file info
  const stats = await fs.stat(filepath);
  const metadata = await sharp(filepath).metadata();
  
  logger.info(`Processed image: ${filename} (${stats.size} bytes)`);
  
  return {
    filename,
    path: `/${config.upload.uploadDir}/${subfolder}/${filename}`,
    size: stats.size,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
  };
};

/**
 * Process multiple images
 */
export const processImages = async (files, options = {}) => {
  const results = await Promise.all(
    files.map((file) => processImage(file, options))
  );
  return results;
};

/**
 * Generate thumbnail
 */
export const generateThumbnail = async (file, options = {}) => {
  return processImage(file, {
    width: options.width || 400,
    height: options.height || 300,
    quality: options.quality || 80,
    format: options.format || 'webp',
    subfolder: options.subfolder || 'thumbnails',
  });
};

/**
 * Delete image file
 */
export const deleteImage = async (filepath) => {
  try {
    const fullPath = path.join(process.cwd(), filepath);
    await fs.unlink(fullPath);
    logger.info(`Deleted image: ${filepath}`);
    return true;
  } catch (error) {
    logger.error(`Failed to delete image: ${filepath}`, error);
    return false;
  }
};

/**
 * Get image info
 */
export const getImageInfo = async (filepath) => {
  try {
    const fullPath = path.join(process.cwd(), filepath);
    const metadata = await sharp(fullPath).metadata();
    return metadata;
  } catch (error) {
    logger.error(`Failed to get image info: ${filepath}`, error);
    return null;
  }
};

export default {
  upload,
  processImage,
  processImages,
  generateThumbnail,
  deleteImage,
  getImageInfo,
};
