import { connectDB, query, disconnectDB } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const createTables = async () => {
  console.log('Creating database tables...');

  // Users table
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      firstName VARCHAR(100),
      lastName VARCHAR(100),
      role ENUM('GUEST', 'ADMIN', 'SUPER_ADMIN') DEFAULT 'GUEST',
      isActive BOOLEAN DEFAULT true,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Properties table
  await query(`
    CREATE TABLE IF NOT EXISTS properties (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      type ENUM('VILLA', 'APARTMENT', 'HOUSE', 'PENTHOUSE') DEFAULT 'VILLA',
      tagline VARCHAR(500),
      description TEXT,
      shortDescription VARCHAR(500),
      address VARCHAR(500),
      city VARCHAR(100),
      region VARCHAR(100),
      country VARCHAR(100) DEFAULT 'France',
      postalCode VARCHAR(20),
      latitude DECIMAL(10, 8),
      longitude DECIMAL(11, 8),
      bedrooms INT DEFAULT 1,
      bathrooms INT DEFAULT 1,
      maxGuests INT DEFAULT 2,
      squareMeters INT,
      pricePerNight DECIMAL(10, 2) NOT NULL,
      cleaningFee DECIMAL(10, 2) DEFAULT 0,
      securityDeposit DECIMAL(10, 2) DEFAULT 0,
      minimumStay INT DEFAULT 1,
      checkInTime VARCHAR(10) DEFAULT '15:00',
      checkOutTime VARCHAR(10) DEFAULT '11:00',
      isFeatured BOOLEAN DEFAULT false,
      isActive BOOLEAN DEFAULT true,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Property Images table
  await query(`
    CREATE TABLE IF NOT EXISTS property_images (
      id VARCHAR(36) PRIMARY KEY,
      propertyId VARCHAR(36) NOT NULL,
      url VARCHAR(500) NOT NULL,
      alt VARCHAR(255),
      caption VARCHAR(500),
      \`order\` INT DEFAULT 0,
      isPrimary BOOLEAN DEFAULT false,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (propertyId) REFERENCES properties(id) ON DELETE CASCADE
    )
  `);

  // Amenities table
  await query(`
    CREATE TABLE IF NOT EXISTS amenities (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      icon VARCHAR(50),
      category VARCHAR(50),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Property Amenities junction table
  await query(`
    CREATE TABLE IF NOT EXISTS property_amenities (
      propertyId VARCHAR(36) NOT NULL,
      amenityId VARCHAR(36) NOT NULL,
      PRIMARY KEY (propertyId, amenityId),
      FOREIGN KEY (propertyId) REFERENCES properties(id) ON DELETE CASCADE,
      FOREIGN KEY (amenityId) REFERENCES amenities(id) ON DELETE CASCADE
    )
  `);

  // Reviews table
  await query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id VARCHAR(36) PRIMARY KEY,
      propertyId VARCHAR(36) NOT NULL,
      guestName VARCHAR(100) NOT NULL,
      guestEmail VARCHAR(255),
      rating DECIMAL(2, 1) NOT NULL,
      title VARCHAR(255),
      content TEXT,
      stayDate DATE,
      isPublished BOOLEAN DEFAULT true,
      response TEXT,
      respondedAt TIMESTAMP,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (propertyId) REFERENCES properties(id) ON DELETE CASCADE
    )
  `);

  // Bookings table
  await query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(36) PRIMARY KEY,
      propertyId VARCHAR(36) NOT NULL,
      userId VARCHAR(36),
      guestName VARCHAR(100) NOT NULL,
      guestEmail VARCHAR(255) NOT NULL,
      guestPhone VARCHAR(50),
      checkIn DATE NOT NULL,
      checkOut DATE NOT NULL,
      guests INT DEFAULT 1,
      totalPrice DECIMAL(10, 2) NOT NULL,
      status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') DEFAULT 'PENDING',
      specialRequests TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (propertyId) REFERENCES properties(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Inquiries table
  await query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id VARCHAR(36) PRIMARY KEY,
      propertyId VARCHAR(36),
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status ENUM('NEW', 'READ', 'REPLIED', 'CLOSED') DEFAULT 'NEW',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (propertyId) REFERENCES properties(id) ON DELETE SET NULL
    )
  `);

  // Experiences table
  await query(`
    CREATE TABLE IF NOT EXISTS experiences (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      shortDescription VARCHAR(500),
      duration VARCHAR(100),
      price DECIMAL(10, 2),
      imageUrl VARCHAR(500),
      category VARCHAR(100),
      isActive BOOLEAN DEFAULT true,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ All tables created successfully!');
};

const init = async () => {
  try {
    await connectDB();
    await createTables();
    await disconnectDB();
    console.log('Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

init();
