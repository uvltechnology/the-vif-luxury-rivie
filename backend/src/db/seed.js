import { connectDB, query, disconnectDB } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
  console.log('Seeding database...');

  // Create admin user
  const adminId = uuidv4();
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'VIFAdmin2024!', 12);
  
  await query(`
    INSERT IGNORE INTO users (id, email, password, firstName, lastName, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [adminId, process.env.ADMIN_EMAIL || 'admin@thevif.com', hashedPassword, 'Admin', 'VIF', 'SUPER_ADMIN']);

  console.log('✅ Admin user created');

  // Create amenities
  const amenities = [
    { name: 'Private Pool', icon: 'pool', category: 'outdoor' },
    { name: 'Sea View', icon: 'waves', category: 'view' },
    { name: 'Air Conditioning', icon: 'snowflake', category: 'comfort' },
    { name: 'WiFi', icon: 'wifi', category: 'technology' },
    { name: 'Parking', icon: 'car', category: 'outdoor' },
    { name: 'Garden', icon: 'tree', category: 'outdoor' },
    { name: 'BBQ', icon: 'flame', category: 'outdoor' },
    { name: 'Terrace', icon: 'sun', category: 'outdoor' },
    { name: 'Kitchen', icon: 'utensils', category: 'indoor' },
    { name: 'Washing Machine', icon: 'shirt', category: 'appliances' },
    { name: 'TV', icon: 'tv', category: 'technology' },
    { name: 'Heating', icon: 'thermometer', category: 'comfort' },
  ];

  const amenityIds = {};
  for (const amenity of amenities) {
    const id = uuidv4();
    amenityIds[amenity.name] = id;
    await query(`
      INSERT IGNORE INTO amenities (id, name, icon, category)
      VALUES (?, ?, ?, ?)
    `, [id, amenity.name, amenity.icon, amenity.category]);
  }

  console.log('✅ Amenities created');

  // Create properties
  const properties = [
    {
      name: 'Villa Azure',
      slug: 'villa-azure',
      type: 'VILLA',
      tagline: 'Stunning hilltop villa with panoramic sea views',
      description: 'Experience the ultimate in Mediterranean luxury at Villa Azure. This stunning hilltop property offers breathtaking panoramic views of the French Riviera coastline. With its infinity pool, spacious terraces, and elegant interiors, Villa Azure is the perfect retreat for those seeking privacy and sophistication.',
      shortDescription: 'Stunning hilltop villa with panoramic sea views and infinity pool.',
      city: 'La Turbie',
      region: 'French Riviera',
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8,
      squareMeters: 280,
      pricePerNight: 850,
      cleaningFee: 200,
      isFeatured: true,
      amenities: ['Private Pool', 'Sea View', 'Air Conditioning', 'WiFi', 'Parking', 'Garden', 'BBQ', 'Terrace', 'Kitchen']
    },
    {
      name: 'Apartment Riviera',
      slug: 'apartment-riviera',
      type: 'APARTMENT',
      tagline: 'Elegant beachfront apartment in the heart of Cannes',
      description: 'Located just steps from the famous Croisette, Apartment Riviera offers the perfect blend of luxury and convenience. This beautifully designed apartment features contemporary furnishings, a private balcony with sea views, and access to pristine beaches.',
      shortDescription: 'Elegant beachfront apartment steps from the Croisette.',
      city: 'Cannes',
      region: 'French Riviera',
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      squareMeters: 95,
      pricePerNight: 450,
      cleaningFee: 100,
      isFeatured: true,
      amenities: ['Sea View', 'Air Conditioning', 'WiFi', 'Terrace', 'Kitchen', 'TV']
    },
    {
      name: 'Villa Monaco View',
      slug: 'villa-monaco-view',
      type: 'VILLA',
      tagline: 'Luxurious villa overlooking Monaco',
      description: 'Perched above Monaco, this exceptional villa offers unparalleled views of the Principality and the Mediterranean Sea. With its private pool, landscaped gardens, and sophisticated interiors, Villa Monaco View represents the pinnacle of Riviera living.',
      shortDescription: 'Luxurious villa with stunning views over Monaco.',
      city: 'La Turbie',
      region: 'French Riviera',
      bedrooms: 5,
      bathrooms: 4,
      maxGuests: 10,
      squareMeters: 350,
      pricePerNight: 1200,
      cleaningFee: 300,
      isFeatured: true,
      amenities: ['Private Pool', 'Sea View', 'Air Conditioning', 'WiFi', 'Parking', 'Garden', 'BBQ', 'Terrace', 'Kitchen', 'Heating']
    },
    {
      name: 'Cannes Palm Beach',
      slug: 'cannes-palm-beach',
      type: 'APARTMENT',
      tagline: 'Modern apartment near Palm Beach',
      description: 'This contemporary apartment is ideally located near the exclusive Palm Beach area of Cannes. Enjoy modern amenities, a sunny terrace, and easy access to beaches and restaurants.',
      shortDescription: 'Modern apartment near Palm Beach with sunny terrace.',
      city: 'Cannes',
      region: 'French Riviera',
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      squareMeters: 120,
      pricePerNight: 550,
      cleaningFee: 120,
      isFeatured: false,
      amenities: ['Air Conditioning', 'WiFi', 'Terrace', 'Kitchen', 'TV', 'Washing Machine']
    }
  ];

  for (const prop of properties) {
    const propId = uuidv4();
    
    await query(`
      INSERT INTO properties (id, name, slug, type, tagline, description, shortDescription, city, region, country, bedrooms, bathrooms, maxGuests, squareMeters, pricePerNight, cleaningFee, isFeatured, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'France', ?, ?, ?, ?, ?, ?, ?, true)
    `, [propId, prop.name, prop.slug, prop.type, prop.tagline, prop.description, prop.shortDescription, prop.city, prop.region, prop.bedrooms, prop.bathrooms, prop.maxGuests, prop.squareMeters, prop.pricePerNight, prop.cleaningFee, prop.isFeatured]);

    // Add property images
    const imageId = uuidv4();
    await query(`
      INSERT INTO property_images (id, propertyId, url, alt, \`order\`, isPrimary)
      VALUES (?, ?, ?, ?, 0, true)
    `, [imageId, propId, `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800`, prop.name]);

    // Add amenities
    for (const amenityName of prop.amenities) {
      if (amenityIds[amenityName]) {
        await query(`
          INSERT IGNORE INTO property_amenities (propertyId, amenityId)
          VALUES (?, ?)
        `, [propId, amenityIds[amenityName]]);
      }
    }
  }

  console.log('✅ Properties created');

  // Create sample reviews
  const props = await query('SELECT id, name FROM properties LIMIT 3');
  for (const prop of props) {
    const reviewId = uuidv4();
    await query(`
      INSERT INTO reviews (id, propertyId, guestName, rating, title, content, stayDate, isPublished)
      VALUES (?, ?, ?, ?, ?, ?, ?, true)
    `, [
      reviewId,
      prop.id,
      'John & Sarah',
      5.0,
      'Absolutely stunning!',
      'We had an incredible stay. The views were breathtaking and the property exceeded all our expectations. Highly recommend!',
      '2024-08-15'
    ]);
  }

  console.log('✅ Reviews created');

  // Create experiences
  const experiences = [
    {
      name: 'Private Yacht Charter',
      slug: 'private-yacht-charter',
      description: 'Explore the stunning French Riviera coastline aboard a private yacht.',
      shortDescription: 'Luxury yacht experience along the Côte d\'Azur',
      duration: 'Full day',
      price: 2500,
      category: 'sea'
    },
    {
      name: 'Wine Tasting in Provence',
      slug: 'wine-tasting-provence',
      description: 'Discover the finest wines of Provence with expert sommeliers.',
      shortDescription: 'Premium wine tour through Provence vineyards',
      duration: 'Half day',
      price: 350,
      category: 'culinary'
    },
    {
      name: 'Monaco Grand Prix Experience',
      slug: 'monaco-grand-prix',
      description: 'VIP access to the legendary Monaco Grand Prix.',
      shortDescription: 'Exclusive F1 experience in Monaco',
      duration: 'Full day',
      price: 5000,
      category: 'events'
    }
  ];

  for (const exp of experiences) {
    const expId = uuidv4();
    await query(`
      INSERT INTO experiences (id, name, slug, description, shortDescription, duration, price, category, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, true)
    `, [expId, exp.name, exp.slug, exp.description, exp.shortDescription, exp.duration, exp.price, exp.category]);
  }

  console.log('✅ Experiences created');
  console.log('🎉 Database seeding complete!');
};

const run = async () => {
  try {
    await connectDB();
    await seed();
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

run();
