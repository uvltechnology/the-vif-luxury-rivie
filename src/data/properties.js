export const properties = [
  {
    id: 'villa-lumiere',
    slug: 'villa-lumiere',
    name: 'Villa Lumière',
    type: 'villa',
    tagline: 'Mediterranean elegance with panoramic sea views',
    location: 'Nice, French Riviera',
    price: 450,
    capacity: 8,
    bedrooms: 4,
    bathrooms: 3,
    hasPool: true,
    hasParking: true,
    hasSeaView: true,
    shortDescription: 'Perched on the hillside overlooking the Mediterranean, Villa Lumière combines classic Riviera architecture with contemporary comfort. Four spacious bedrooms, an infinity pool, and terraces that capture the sunset make this your perfect French escape.',
    fullDescription: `Villa Lumière embodies the essence of French Riviera living. This stunning four-bedroom residence sits elevated above the coastline, offering uninterrupted views across the azure Mediterranean.

The villa's architecture pays homage to classic Provençal design while incorporating modern amenities for today's discerning traveler. Sun-drenched interiors flow seamlessly to multiple outdoor terraces, creating an effortless indoor-outdoor lifestyle.

Your mornings begin on the breakfast terrace with fresh croissants and coffee, afternoons by the infinity pool, and evenings watching the sun paint the sky in shades of rose and gold. This is more than accommodation—it's an experience of the Riviera at its finest.`,
    amenities: {
      comfort: ['Air conditioning throughout', 'Underfloor heating', 'Premium linens & towels', 'Blackout curtains', 'Safe'],
      entertainment: ['Smart TV in living room', 'Sonos sound system', 'High-speed WiFi 100Mbps', 'Board games & books'],
      kitchen: ['Fully equipped modern kitchen', 'Nespresso coffee machine', 'Dishwasher', 'Wine fridge', 'BBQ grill'],
      outdoor: ['Infinity pool (heated)', 'Multiple terraces', 'Outdoor dining for 8', 'Sun loungers', 'Poolside shower'],
      services: ['Welcome concierge', 'Mid-stay cleaning included', 'Pool maintenance', 'Garden upkeep'],
      parking: ['2 private parking spaces', 'Electric vehicle charging']
    },
    houseRules: {
      checkIn: '4:00 PM',
      checkOut: '10:00 AM',
      minStay: '7 nights (peak season), 3 nights (off-season)',
      smoking: 'Outdoor areas only',
      pets: 'Not permitted',
      events: 'Contact for approval',
      quietHours: '10:00 PM - 8:00 AM'
    },
    perfectFor: ['Family holidays', 'Special celebrations', 'Romantic getaways', 'Remote work retreats'],
    nearbyAttractions: [
      { name: 'Nice Old Town', distance: '15 min' },
      { name: 'Monaco', distance: '20 min' },
      { name: 'Beach access', distance: '5 min' },
      { name: 'Grocery store', distance: '3 min' }
    ],
    images: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800'
    ]
  },
  {
    id: 'villa-azure',
    slug: 'villa-azure',
    name: 'Villa Azure',
    type: 'villa',
    tagline: 'Coastal tranquility meets refined luxury',
    location: 'Èze, French Riviera',
    price: 380,
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    hasPool: true,
    hasParking: true,
    hasSeaView: true,
    shortDescription: 'Nestled between Monaco and Nice, Villa Azure offers intimate luxury for smaller groups. Three beautifully appointed bedrooms, a private pool surrounded by Mediterranean gardens, and views that stretch across the Côte d\'Azur.',
    fullDescription: `Villa Azure is your private sanctuary on the French Riviera. This three-bedroom haven captures the relaxed elegance of Mediterranean living, with every detail considered for your comfort.

The villa's design celebrates its hillside setting, with floor-to-ceiling windows framing the sea view from every room. Whitewashed walls, natural materials, and curated artwork create a serene atmosphere that invites you to slow down and savor each moment.

The outdoor space is equally enchanting—a heated pool surrounded by lavender and olive trees, shaded lounging areas, and an alfresco dining terrace where long lunches extend into golden-hour dinners. This is the Riviera escape you've been dreaming of.`,
    amenities: {
      comfort: ['Air conditioning', 'Heating system', 'Premium bedding', 'Bathrobes & slippers', 'Hairdryers'],
      entertainment: ['Smart TVs', 'Bluetooth speakers', 'WiFi 100Mbps', 'Library of books'],
      kitchen: ['Full kitchen', 'Espresso machine', 'Dishwasher', 'Outdoor BBQ'],
      outdoor: ['Heated pool', 'Mediterranean garden', 'Outdoor dining area', 'Sun deck', 'Outdoor shower'],
      services: ['Welcome pack', 'Weekly cleaning included', 'Pool & garden maintenance'],
      parking: ['Private parking for 2 cars']
    },
    houseRules: {
      checkIn: '4:00 PM',
      checkOut: '10:00 AM',
      minStay: '5 nights (peak), 3 nights (off-peak)',
      smoking: 'Outdoor areas only',
      pets: 'Not permitted',
      events: 'Small gatherings with approval',
      quietHours: '10:00 PM - 8:00 AM'
    },
    perfectFor: ['Romantic escapes', 'Small family holidays', 'Friends getaways', 'Peaceful retreats'],
    nearbyAttractions: [
      { name: 'Èze Village', distance: '5 min' },
      { name: 'Monaco', distance: '10 min' },
      { name: 'Nice', distance: '18 min' },
      { name: 'Beach', distance: '8 min' }
    ],
    images: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800'
    ]
  },
  {
    id: 'athena-apartment',
    slug: 'athena-apartment',
    name: 'Athena Apartment',
    type: 'apartment',
    tagline: 'Chic coastal living in the heart of the Riviera',
    location: 'Beaulieu-sur-Mer, French Riviera',
    price: 220,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    hasPool: false,
    hasParking: true,
    hasSeaView: true,
    shortDescription: 'Perfect for couples seeking an intimate Riviera experience. This thoughtfully designed one-bedroom apartment offers a private balcony with sea views, walkable access to beaches and cafés, and all the charm of coastal French living.',
    fullDescription: `Athena Apartment is your charming pied-à-terre on the French Riviera. Designed for couples, this one-bedroom retreat combines boutique hotel style with the freedom of your own space.

Located in the elegant coastal town of Beaulieu-sur-Mer, you're steps from waterfront restaurants, morning markets, and some of the Riviera's most beautiful beaches. The apartment itself is a study in thoughtful design—high ceilings, soft linens, a well-equipped kitchen, and a balcony where morning coffee and evening aperitifs become daily rituals.

This is the ideal base for couples who want to explore the Côte d'Azur by day and return to a peaceful, stylish sanctuary by night. Wake to the sound of waves, wander to the beach, discover hidden cafés, and live like a local in one of the Riviera's most enchanting towns.`,
    amenities: {
      comfort: ['Air conditioning', 'Heating', 'Quality linens', 'Blackout blinds'],
      entertainment: ['Smart TV', 'High-speed WiFi', 'Bluetooth speaker'],
      kitchen: ['Modern kitchenette', 'Nespresso machine', 'Refrigerator', 'Cooking basics'],
      outdoor: ['Private balcony with sea view', 'Outdoor seating'],
      services: ['Weekly cleaning', 'Welcome essentials'],
      parking: ['Dedicated parking space']
    },
    houseRules: {
      checkIn: '4:00 PM',
      checkOut: '10:00 AM',
      minStay: '3 nights',
      smoking: 'Balcony only',
      pets: 'Not permitted',
      events: 'No',
      quietHours: '10:00 PM - 8:00 AM'
    },
    perfectFor: ['Romantic getaways', 'Couples retreats', 'Solo travelers', 'Extended stays'],
    nearbyAttractions: [
      { name: 'Beach', distance: '2 min walk' },
      { name: 'Town center', distance: '5 min walk' },
      { name: 'Monaco', distance: '10 min' },
      { name: 'Nice', distance: '15 min' }
    ],
    images: [
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800',
      '/api/placeholder/1200/800'
    ]
  }
]
