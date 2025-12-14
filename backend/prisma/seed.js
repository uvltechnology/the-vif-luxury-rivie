// Seed file for The VIF Luxury Riviera Database
// This contains all the real data from the frontend static files

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...\n')

  // Clear existing data
  console.log('Clearing existing data...')
  await prisma.bookingExperience.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.review.deleteMany()
  await prisma.experiencePriceOption.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.blockedDate.deleteMany()
  await prisma.propertyAmenity.deleteMany()
  await prisma.propertyImage.deleteMany()
  await prisma.property.deleteMany()
  await prisma.amenity.deleteMany()
  await prisma.inquiry.deleteMany()
  await prisma.newsletter.deleteMany()
  await prisma.auditLog.deleteMany()
  await prisma.settings.deleteMany()
  await prisma.user.deleteMany()
  console.log('✅ Existing data cleared\n')

  // Create admin user
  console.log('Creating admin user...')
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'VIFAdmin2024!', 12)
  
  const admin = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@thevif.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      isActive: true,
      emailVerified: true
    }
  })
  console.log(`✅ Admin user created: ${admin.email}\n`)

  // Create amenities
  console.log('Creating amenities...')
  const amenitiesData = [
    { name: 'Sea View', category: 'property', icon: 'eye' },
    { name: 'Swimming Pool', category: 'outdoor', icon: 'pool' },
    { name: 'Private Terrace', category: 'outdoor', icon: 'sun' },
    { name: 'Private Balcony', category: 'outdoor', icon: 'sun' },
    { name: 'Mediterranean Garden', category: 'outdoor', icon: 'flower' },
    { name: 'Pet Friendly', category: 'property', icon: 'paw-print' },
    { name: 'Private Bathroom', category: 'property', icon: 'bath' },
    { name: 'Family Rooms', category: 'property', icon: 'users' },
    { name: 'Air Conditioning', category: 'comfort', icon: 'wind' },
    { name: 'Central Heating', category: 'comfort', icon: 'flame' },
    { name: 'Premium Linens', category: 'comfort', icon: 'bed' },
    { name: 'Bathrobes & Slippers', category: 'comfort', icon: 'shirt' },
    { name: 'Hairdryers', category: 'comfort', icon: 'wind' },
    { name: 'In-Room Safe', category: 'comfort', icon: 'lock' },
    { name: 'Smart TV', category: 'entertainment', icon: 'tv' },
    { name: 'Satellite Channels', category: 'entertainment', icon: 'satellite' },
    { name: 'Bluetooth Sound System', category: 'entertainment', icon: 'speaker' },
    { name: 'Free WiFi 150Mbps', category: 'entertainment', icon: 'wifi' },
    { name: 'Book Library', category: 'entertainment', icon: 'book' },
    { name: 'Board Games', category: 'entertainment', icon: 'puzzle' },
    { name: 'Fully Equipped Kitchen', category: 'kitchen', icon: 'utensils' },
    { name: 'Nespresso Machine', category: 'kitchen', icon: 'coffee' },
    { name: 'Premium Cookware', category: 'kitchen', icon: 'pot' },
    { name: 'Wine Refrigerator', category: 'kitchen', icon: 'wine' },
    { name: 'Dishwasher', category: 'kitchen', icon: 'droplet' },
    { name: 'Weber BBQ Grill', category: 'kitchen', icon: 'flame' },
    { name: 'Multiple Terraces', category: 'outdoor', icon: 'sun' },
    { name: 'Outdoor Dining', category: 'outdoor', icon: 'table' },
    { name: 'Sun Loungers', category: 'outdoor', icon: 'chair' },
    { name: 'Outdoor Shower', category: 'outdoor', icon: 'shower' },
    { name: 'Pool Safety Fence', category: 'outdoor', icon: 'shield' },
    { name: 'Welcome Orientation', category: 'services', icon: 'hand-wave' },
    { name: 'Weekly Cleaning', category: 'services', icon: 'sparkles' },
    { name: 'Pool Maintenance', category: 'services', icon: 'droplet' },
    { name: 'Concierge Service', category: 'services', icon: 'bell' },
    { name: 'Welcome Basket', category: 'services', icon: 'gift' },
    { name: 'Free Parking', category: 'parking', icon: 'car' },
    { name: 'Secure Parking', category: 'parking', icon: 'shield-check' },
    { name: 'EV Charging', category: 'parking', icon: 'bolt' }
  ]

  const amenities = await Promise.all(
    amenitiesData.map(amenity => 
      prisma.amenity.create({ data: amenity })
    )
  )
  console.log(`✅ Created ${amenities.length} amenities\n`)

  // Helper to find amenity by name
  const findAmenity = (name) => amenities.find(a => a.name === name)?.id

  // Create properties
  console.log('Creating properties...')
  
  // Villa Rocsea
  const villaRocsea = await prisma.property.create({
    data: {
      slug: 'villa-rocsea',
      name: 'Villa Rocsea',
      type: 'VILLA',
      tagline: "Where rock meets sea at La Turbie's most enchanting address",
      description: `Villa Rocsea—named for the dramatic meeting of rock and sea that defines this spectacular location—stands as a beacon of refined living in La Turbie. Positioned at 450 meters above sea level, this magnificent four-bedroom villa offers breathtaking views stretching from Monaco to the Italian coastline.

The architecture pays elegant homage to classic Provençal design while embracing every modern comfort. Inside, four generously proportioned bedrooms provide sanctuary for up to eight guests. The master suite features a luxurious en-suite bathroom and private terrace.

The heart of the villa is its expansive 60m² living and dining area with a fully equipped modern kitchen. Outside, the swimming pool features three varying depths. Mature Mediterranean gardens provide shaded sanctuaries with lavender, rosemary, and century-old olive trees.`,
      shortDescription: "Discover Villa Rocsea—where rugged coastal beauty meets sweeping Mediterranean panoramas. This four-bedroom sanctuary captures the very soul of elevated Riviera living.",
      address: '205 Chemin de Giram, 06320 La Turbie, France',
      city: 'La Turbie',
      region: 'French Riviera',
      country: 'France',
      latitude: 43.7450,
      longitude: 7.4010,
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8,
      squareMeters: 350,
      pricePerNight: 450,
      cleaningFee: 150,
      securityDeposit: 500,
      currency: 'EUR',
      checkInTime: '15:00',
      checkOutTime: '11:00',
      minNights: 3,
      maxNights: 30,
      cancellationPolicy: 'Free cancellation up to 14 days before check-in. After that, 50% refund.',
      houseRules: JSON.stringify({
        checkIn: 'From 3:00 PM to 8:00 PM',
        checkOut: 'From 10:00 AM to 11:00 AM',
        smoking: 'Not allowed',
        pets: 'Allowed on request',
        events: 'Not allowed',
        quietHours: '10:00 PM - 8:00 AM'
      }),
      isActive: true,
      isFeatured: true
    }
  })

  // Create property images for Villa Rocsea (Villa_201.jpg to Villa_267.jpg)
  const rocseaImages = []
  for (let i = 201; i <= 267; i++) {
    rocseaImages.push({
      propertyId: villaRocsea.id,
      url: `/uploads/images/Villa_${i}.jpg`,
      alt: `Villa Rocsea image ${i - 200}`,
      order: i === 227 ? 0 : (i < 227 ? i - 200 : i - 201),
      isPrimary: i === 227
    })
  }
  await prisma.propertyImage.createMany({ data: rocseaImages })

  // Link amenities to Villa Rocsea
  const rocseaAmenities = ['Sea View', 'Swimming Pool', 'Private Terrace', 'Mediterranean Garden', 'Pet Friendly', 
    'Air Conditioning', 'Central Heating', 'Premium Linens', 'Smart TV', 'Free WiFi 150Mbps', 
    'Fully Equipped Kitchen', 'Nespresso Machine', 'Multiple Terraces', 'Outdoor Dining', 'Sun Loungers',
    'Welcome Orientation', 'Weekly Cleaning', 'Concierge Service', 'Free Parking', 'EV Charging']
  
  for (const amenityName of rocseaAmenities) {
    const amenityId = findAmenity(amenityName)
    if (amenityId) {
      await prisma.propertyAmenity.create({
        data: { propertyId: villaRocsea.id, amenityId }
      })
    }
  }

  // Villa Bellevue
  const villaBellevue = await prisma.property.create({
    data: {
      slug: 'villa-bellevue',
      name: 'Villa Bellevue',
      type: 'VILLA',
      tagline: "Perched above the Mediterranean in La Turbie's timeless hills",
      description: `Villa Bellevue stands as a masterpiece of location and design in La Turbie. This exceptional three-bedroom villa captures the essence of elevated Riviera living with sweeping vistas meeting sophisticated comfort.

Positioned at 450 meters above sea level, the villa commands a 180-degree panorama from Monaco to Italy. Located in a private wooded domain, recently renovated with meticulous attention to detail.

The master suite features a luxurious bathtub and private terrace. Two additional bedrooms each include Italian showers. The 60m² living area has a modern kitchen and charming fireplace. The pool features three depths for all ages.`,
      shortDescription: "Discover exceptional privacy and breathtaking panoramas at Villa Bellevue. This three-bedroom sanctuary offers commanding views across Monaco, the Mediterranean, and the Italian coastline.",
      address: '205 Chemin de Giram, 06320 La Turbie, France',
      city: 'La Turbie',
      region: 'French Riviera',
      country: 'France',
      latitude: 43.7450,
      longitude: 7.4010,
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      squareMeters: 200,
      pricePerNight: 380,
      cleaningFee: 120,
      securityDeposit: 400,
      currency: 'EUR',
      checkInTime: '14:00',
      checkOutTime: '10:00',
      minNights: 3,
      maxNights: 30,
      cancellationPolicy: 'Free cancellation up to 14 days before check-in.',
      houseRules: JSON.stringify({
        checkIn: 'From 2:00 PM to 8:00 PM',
        checkOut: 'From 8:00 AM to 10:00 AM',
        smoking: 'Not allowed',
        pets: 'Allowed on request',
        events: 'With advance approval',
        quietHours: '11:00 PM - 8:00 AM'
      }),
      isActive: true,
      isFeatured: true
    }
  })

  // Create property images for Villa Bellevue (Villa_101.jpg to Villa_136.jpg)
  const bellevueImages = []
  for (let i = 101; i <= 136; i++) {
    bellevueImages.push({
      propertyId: villaBellevue.id,
      url: `/uploads/images/Villa_${i}.jpg`,
      alt: `Villa Bellevue image ${i - 100}`,
      order: i === 128 ? 0 : (i < 128 ? i - 100 : i - 101),
      isPrimary: i === 128
    })
  }
  await prisma.propertyImage.createMany({ data: bellevueImages })

  // Link amenities to Villa Bellevue
  const bellevueAmenities = ['Sea View', 'Swimming Pool', 'Private Terrace', 'Mediterranean Garden', 'Pet Friendly',
    'Air Conditioning', 'Central Heating', 'Premium Linens', 'Smart TV', 'Free WiFi 150Mbps',
    'Fully Equipped Kitchen', 'Nespresso Machine', 'Multiple Terraces', 'Outdoor Dining', 'Sun Loungers',
    'Welcome Orientation', 'Weekly Cleaning', 'Concierge Service', 'Free Parking', 'EV Charging']
  
  for (const amenityName of bellevueAmenities) {
    const amenityId = findAmenity(amenityName)
    if (amenityId) {
      await prisma.propertyAmenity.create({
        data: { propertyId: villaBellevue.id, amenityId }
      })
    }
  }

  // Palm Beach Apartment
  const palmBeach = await prisma.property.create({
    data: {
      slug: 'palm-beach-apartment',
      name: 'Palm Beach Apartment',
      type: 'APARTMENT',
      tagline: 'Contemporary elegance on the prestigious Pointe Croisette',
      description: `Welcome to Palm Beach Apartment, your private sanctuary on the Pointe Croisette. This 50m² residence embodies modern Mediterranean living with contemporary design and coastal elegance.

Floor-to-ceiling windows bathe the space in natural light. From your private balcony, enjoy morning espresso with bay views or evening aperitifs at sunset over the Lérins Islands.

Stroll to pristine beaches in minutes, explore Cannes' renowned restaurants and boutiques, or retreat to your beautifully appointed space with every modern amenity.`,
      shortDescription: "Discover refined coastal living in this 50m² apartment at Residence Athena. Situated on the exclusive Pointe Croisette with free parking, private balcony, and captivating views.",
      address: 'Residence Athena, 8 rue Eugene Brieux, 06400 Cannes, France',
      city: 'Cannes',
      region: 'French Riviera',
      country: 'France',
      latitude: 43.5490,
      longitude: 7.0240,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 4,
      squareMeters: 50,
      pricePerNight: 220,
      cleaningFee: 80,
      securityDeposit: 200,
      currency: 'EUR',
      checkInTime: '14:00',
      checkOutTime: '10:00',
      minNights: 2,
      maxNights: 30,
      cancellationPolicy: 'Free cancellation up to 7 days before check-in.',
      houseRules: JSON.stringify({
        checkIn: 'From 2:00 PM to 8:00 PM',
        checkOut: 'From 9:00 AM to 10:00 AM',
        smoking: 'Not allowed',
        pets: 'Allowed on request',
        events: 'Not allowed',
        quietHours: '10:00 PM - 8:00 AM'
      }),
      isActive: true,
      isFeatured: true
    }
  })

  // Create property images for Palm Beach Apartment (Athena_01.jpg to Athena_22.jpg)
  const palmBeachImages = []
  for (let i = 1; i <= 22; i++) {
    const paddedNum = i.toString().padStart(2, '0')
    palmBeachImages.push({
      propertyId: palmBeach.id,
      url: `/uploads/images/Athena_${paddedNum}.jpg`,
      alt: `Palm Beach Apartment image ${i}`,
      order: i === 10 ? 0 : (i < 10 ? i : i - 1),
      isPrimary: i === 10
    })
  }
  await prisma.propertyImage.createMany({ data: palmBeachImages })

  // Link amenities to Palm Beach Apartment
  const palmBeachAmenities = ['Sea View', 'Private Balcony', 'Air Conditioning', 'Premium Linens',
    'Smart TV', 'Free WiFi 150Mbps', 'Fully Equipped Kitchen', 'Nespresso Machine',
    'Welcome Orientation', 'Free Parking', 'Secure Parking']
  
  for (const amenityName of palmBeachAmenities) {
    const amenityId = findAmenity(amenityName)
    if (amenityId) {
      await prisma.propertyAmenity.create({
        data: { propertyId: palmBeach.id, amenityId }
      })
    }
  }

  console.log('✅ Created 3 properties with images and amenities\n')

  // Create experiences
  console.log('Creating experiences...')
  
  const privateChef = await prisma.experience.create({
    data: {
      slug: 'private-chef',
      name: 'Private Chef Experience',
      tagline: 'Exquisite cuisine in the comfort of your villa',
      fullDescription: `Savor the flavors of the French Riviera with a personal chef preparing Provençal specialties using the finest local ingredients. From market-fresh Mediterranean cuisine to elegant multi-course dinners, enjoy restaurant-quality dining without leaving your villa.

Our experienced chefs bring their expertise to your kitchen, creating memorable culinary experiences tailored to your preferences. Whether it's a romantic dinner for two or a celebration with friends, we handle everything from shopping to cleanup.`,
      shortDescription: 'Savor the flavors of the French Riviera with a personal chef preparing Provençal specialties in your villa.',
      basePrice: 350,
      priceUnit: 'per couple',
      duration: '4 hours',
      isActive: true,
      isFeatured: true,
      includes: ['Professional chef service', 'Menu customization', 'All ingredients (market-fresh)', 'Wine pairing suggestions', 'Full kitchen cleanup']
    }
  })

  await prisma.experiencePriceOption.createMany({
    data: [
      { experienceId: privateChef.id, name: 'Romantic Dinner', price: 350, description: 'Intimate 4-course dinner for 2' },
      { experienceId: privateChef.id, name: 'Family Feast', price: 500, description: '5-course family-style dinner up to 6 guests' },
      { experienceId: privateChef.id, name: 'Villa Party', price: 800, description: 'Full celebration dinner up to 12 guests' }
    ]
  })

  const wineExperience = await prisma.experience.create({
    data: {
      slug: 'wine-tasting',
      name: 'Wine Tasting Journey',
      tagline: 'Discover the vineyards of Provence',
      fullDescription: `Explore the renowned wine regions of Provence with private tastings at boutique wineries. From rosé specialists to hidden gem producers, experience the terroir that makes this region famous.

Your private sommelier guide will share the stories behind each estate, help you discover your palate preferences, and ensure a memorable journey through the vine-covered hills.`,
      shortDescription: 'Explore renowned Provence vineyards with private tastings at boutique wineries.',
      basePrice: 180,
      priceUnit: 'per person',
      duration: '6 hours',
      isActive: true,
      isFeatured: true,
      includes: ['Private sommelier guide', 'Visit 3 prestigious wineries', 'All tasting fees included', 'Charcuterie & cheese pairing', 'Door-to-door transport']
    }
  })

  await prisma.experiencePriceOption.createMany({
    data: [
      { experienceId: wineExperience.id, name: 'Classic Tour', price: 180, description: 'Half-day experience with 3 wineries' },
      { experienceId: wineExperience.id, name: 'Premium Tour', price: 280, description: 'Full-day with lunch and 4 wineries' }
    ]
  })

  const yachtCharter = await prisma.experience.create({
    data: {
      slug: 'yacht-charter',
      name: 'Yacht Charter',
      tagline: 'Sail the Mediterranean in style',
      fullDescription: `Experience the Côte d'Azur from the deck of a luxury yacht. Cruise past legendary ports, anchor in secluded coves, and swim in crystal-clear waters. Our experienced crew handles everything while you relax and enjoy.

From half-day coastal cruises to full-day adventures to Saint-Tropez or the Lérins Islands, create your perfect day on the water.`,
      shortDescription: 'Experience the Côte d\'Azur from the deck of a luxury yacht with experienced crew.',
      basePrice: 1200,
      priceUnit: 'per group',
      duration: '4-8 hours',
      isActive: true,
      isFeatured: true,
      includes: ['Luxury yacht with crew', 'Captain & deckhand', 'Snorkeling equipment', 'Refreshments on board', 'Fuel included']
    }
  })

  await prisma.experiencePriceOption.createMany({
    data: [
      { experienceId: yachtCharter.id, name: 'Half Day', price: 1200, description: '4-hour coastal cruise' },
      { experienceId: yachtCharter.id, name: 'Full Day', price: 2200, description: '8-hour adventure with lunch stop' }
    ]
  })

  const transfers = await prisma.experience.create({
    data: {
      slug: 'luxury-transfers',
      name: 'Luxury Transfers',
      tagline: 'Travel in comfort and style',
      fullDescription: `Start and end your Riviera journey in elegance. Our premium transfer service connects you to airports, train stations, and destinations throughout the region. Professional chauffeurs, luxury vehicles, and impeccable service.

Whether arriving at Nice Airport, transferring from Monaco, or exploring the coast, travel in complete comfort with our dedicated team.`,
      shortDescription: 'Premium transfer service with professional chauffeurs and luxury vehicles.',
      basePrice: 80,
      priceUnit: 'one way',
      duration: 'Variable',
      isActive: true,
      isFeatured: false,
      includes: ['Professional chauffeur', 'Mercedes S-Class or similar', 'Meet & greet service', 'Flight monitoring', 'Complimentary water']
    }
  })

  await prisma.experiencePriceOption.createMany({
    data: [
      { experienceId: transfers.id, name: 'Nice Airport', price: 120, description: 'Direct transfer to/from Nice' },
      { experienceId: transfers.id, name: 'Monaco', price: 80, description: 'Transfer to/from Monaco' },
      { experienceId: transfers.id, name: 'Full Day', price: 600, description: 'At your disposal for 8 hours' }
    ]
  })

  const spaWellness = await prisma.experience.create({
    data: {
      slug: 'spa-wellness',
      name: 'Spa & Wellness',
      tagline: 'Rejuvenate body and mind',
      fullDescription: `Indulge in world-class spa treatments brought directly to your villa. Our skilled therapists create a sanctuary of relaxation with massages, facials, and wellness rituals using premium products.

Choose from signature treatments inspired by Mediterranean traditions or customize your own wellness journey. Complete privacy and personalization in the comfort of your accommodation.`,
      shortDescription: 'World-class spa treatments brought directly to your villa by skilled therapists.',
      basePrice: 150,
      priceUnit: 'per person',
      duration: '1-3 hours',
      isActive: true,
      isFeatured: false,
      includes: ['Certified massage therapist', 'Premium organic products', 'Professional massage table', 'Aromatherapy setup', 'Post-treatment refreshments']
    }
  })

  await prisma.experiencePriceOption.createMany({
    data: [
      { experienceId: spaWellness.id, name: 'Relaxation Massage', price: 150, description: '60-minute Swedish massage' },
      { experienceId: spaWellness.id, name: 'Couples Retreat', price: 350, description: '90-minute side-by-side massage' },
      { experienceId: spaWellness.id, name: 'Full Spa Day', price: 500, description: 'Massage, facial, and body treatment' }
    ]
  })

  const photoshoot = await prisma.experience.create({
    data: {
      slug: 'photoshoot',
      name: 'Professional Photoshoot',
      tagline: 'Capture your Riviera moments',
      fullDescription: `Preserve your vacation memories with a professional photoshoot. Our talented photographers know the most stunning locations on the Riviera—from golden-hour villa shots to iconic coastal backdrops.

Perfect for families, couples, or special celebrations. Receive professionally edited high-resolution images that capture the magic of your stay.`,
      shortDescription: 'Professional photography at stunning Riviera locations to preserve your vacation memories.',
      basePrice: 400,
      priceUnit: 'per session',
      duration: '2 hours',
      isActive: true,
      isFeatured: false,
      includes: ['Professional photographer', 'Location scouting', '50+ edited high-res images', 'Online gallery', 'Print-ready files']
    }
  })

  await prisma.experiencePriceOption.createMany({
    data: [
      { experienceId: photoshoot.id, name: 'Portrait Session', price: 400, description: '1-hour shoot, 30 edited images' },
      { experienceId: photoshoot.id, name: 'Extended Session', price: 650, description: '2-hour shoot, 60 edited images' }
    ]
  })

  console.log('✅ Created 6 experiences with price options\n')

  // Create reviews
  console.log('Creating reviews...')
  
  await prisma.review.createMany({
    data: [
      {
        propertyId: villaRocsea.id,
        guestName: 'Sophie M.',
        rating: 5,
        title: 'Absolutely stunning villa!',
        content: 'Absolutely stunning villa with breathtaking views! The pool was perfect and the location couldn\'t be better. We spent every evening watching the sunset over Monaco. The host Elena was incredibly helpful with restaurant recommendations. The panoramic terrace at sunset was pure magic.',
        stayDate: new Date('2024-08-15'),
        isPublished: true,
        isVerified: true
      },
      {
        propertyId: villaRocsea.id,
        guestName: 'Jean-Pierre D.',
        rating: 5,
        title: 'Un séjour exceptionnel',
        content: 'Un séjour exceptionnel dans cette magnifique villa. Le jardin méditerranéen, la piscine et la vue sur Monaco sont à couper le souffle. Nous reviendrons certainement! Le petit-déjeuner sur la terrasse avec vue mer était magique.',
        stayDate: new Date('2024-07-20'),
        isPublished: true,
        isVerified: true
      },
      {
        propertyId: villaBellevue.id,
        guestName: 'Marcus W.',
        rating: 5,
        title: 'Perfect family vacation!',
        content: 'Perfect family vacation! The kids loved the pool with different depths and we appreciated the peaceful location. Monaco is just a short drive away. The kitchen was well-equipped for cooking. The infinity pool overlooking the coastline was incredible.',
        stayDate: new Date('2024-08-01'),
        isPublished: true,
        isVerified: true
      },
      {
        propertyId: villaBellevue.id,
        guestName: 'Isabella R.',
        rating: 5,
        title: 'Exceeded our expectations',
        content: 'Villa Bellevue exceeded our expectations. The privacy of the wooded domain combined with those incredible views created the perfect escape. The renovation is impeccable - modern comfort with classic charm. Evening aperitivo by the pool watching the lights of Monaco was unforgettable.',
        stayDate: new Date('2024-06-10'),
        isPublished: true,
        isVerified: true
      },
      {
        propertyId: palmBeach.id,
        guestName: 'Emma K.',
        rating: 5,
        title: 'The perfect Cannes apartment!',
        content: 'The perfect Cannes apartment! Steps from the beach, beautiful views from the balcony, and the free parking was a huge bonus. The Pointe Croisette location is unbeatable. Morning coffee on the balcony watching the yachts was lovely.',
        stayDate: new Date('2024-07-05'),
        isPublished: true,
        isVerified: true
      },
      {
        propertyId: palmBeach.id,
        guestName: 'Thomas L.',
        rating: 5,
        title: 'Great value for Cannes!',
        content: 'Great value for Cannes! Clean, modern apartment with everything you need. The balcony views were lovely and it was easy to walk to restaurants and the beach. Would definitely stay again. The stunning sunset views from the balcony were amazing.',
        stayDate: new Date('2024-05-22'),
        isPublished: true,
        isVerified: true
      }
    ]
  })

  console.log('✅ Created 6 reviews\n')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
