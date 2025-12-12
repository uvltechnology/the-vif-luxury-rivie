import Athena01 from '@/assets/images/Athena_01.jpg'
import Athena02 from '@/assets/images/Athena_02.jpg'
import Athena03 from '@/assets/images/Athena_03.jpg'
import Athena04 from '@/assets/images/Athena_04.jpg'
import Athena05 from '@/assets/images/Athena_05.jpg'
import Athena06 from '@/assets/images/Athena_06.jpg'
import Athena07 from '@/assets/images/Athena_07.jpg'
import Athena08 from '@/assets/images/Athena_08.jpg'
import Athena09 from '@/assets/images/Athena_09.jpg'
import Athena10 from '@/assets/images/Athena_10.jpg'
import Athena11 from '@/assets/images/Athena_11.jpg'
import Athena12 from '@/assets/images/Athena_12.jpg'
import Athena13 from '@/assets/images/Athena_13.jpg'
import Athena14 from '@/assets/images/Athena_14.jpg'
import Athena15 from '@/assets/images/Athena_15.jpg'
import Athena16 from '@/assets/images/Athena_16.jpg'
import Athena17 from '@/assets/images/Athena_17.jpg'
import Athena18 from '@/assets/images/Athena_18.jpg'
import Athena19 from '@/assets/images/Athena_19.jpg'
import Athena20 from '@/assets/images/Athena_20.jpg'
import Athena21 from '@/assets/images/Athena_21.jpg'
import Athena22 from '@/assets/images/Athena_22.jpg'

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
    tagline: 'Contemporary elegance on the prestigious Pointe Croisette',
    location: 'Pointe Croisette, Cannes',
    exactAddress: 'Residence Athena, 8 rue Eugene Brieux, Pointe Croisette, 06400 Cannes, France',
    price: 220,
    capacity: 4,
    bedrooms: 1,
    bathrooms: 1,
    size: 50,
    hasPool: false,
    hasParking: true,
    hasSeaView: true,
    hasBalcony: true,
    shortDescription: 'Discover refined coastal living in this beautifully appointed 50m² apartment at Residence Athena. Situated on the exclusive Pointe Croisette, this entire place offers sophisticated comfort with free on-site parking, a private balcony, and captivating views—just moments from Cannes\' legendary beaches and world-class dining.',
    fullDescription: `Welcome to Athena Apartment, your private sanctuary in one of the French Riviera's most coveted addresses. Located within the prestigious Residence Athena on Pointe Croisette, this thoughtfully designed 50m² residence embodies the essence of modern Mediterranean living.

Step inside to discover a harmonious blend of contemporary design and coastal elegance. The apartment welcomes you with an open, light-filled layout where every detail has been curated for your comfort. Floor-to-ceiling windows bathe the space in natural light, while the refined interior palette of soft neutrals and natural textures creates an atmosphere of serene sophistication.

The residence places you at the heart of Cannes' glamorous coastline, where the Mediterranean's azure waters meet golden sands just steps from your door. From your private balcony, savor morning espresso as sailboats glide across the bay, or unwind with evening aperitifs while the sun sets over the Lérins Islands.

This is more than accommodation—it's your gateway to the authentic Riviera lifestyle. Stroll to pristine beaches in minutes, explore Cannes' renowned restaurants and boutiques, or simply retreat to your beautifully appointed space where every modern amenity awaits. Whether you're seeking a romantic escape, a family retreat, or an extended stay on the Côte d'Azur, Athena Apartment offers the perfect balance of location, luxury, and genuine Mediterranean charm.`,
    amenities: {
      property: ['Entire place to yourself', '50m² living space', 'Private entrance', 'Non-smoking throughout'],
      comfort: ['Free WiFi high-speed', 'Air conditioning', 'Premium linens & towels', 'Family-friendly amenities', 'Private bathroom with premium fixtures'],
      entertainment: ['Smart TV', 'Streaming services available', 'Complimentary WiFi'],
      kitchen: ['Fully equipped modern kitchen', 'Coffee maker', 'Refrigerator & freezer', 'Cookware & dining essentials', 'Dishware & cutlery'],
      outdoor: ['Private balcony with seating', 'Panoramic sea views', 'Outdoor furniture', 'Al fresco dining option'],
      services: ['Professional cleaning', 'Fresh towels & linens', 'Welcome assistance'],
      parking: ['Free on-site parking', 'Secure parking area', 'Convenient access']
    },
    houseRules: {
      checkIn: '3:00 PM onwards',
      checkOut: '11:00 AM',
      minStay: '3 nights',
      smoking: 'Non-smoking property',
      pets: 'Pet-friendly - please inquire',
      events: 'Contact for approval',
      quietHours: '10:00 PM - 8:00 AM'
    },
    perfectFor: ['Romantic getaways', 'Family vacations', 'Beach lovers', 'Extended stays', 'Cannes Film Festival visits', 'Couples retreats'],
    nearbyAttractions: [
      { name: 'Plage de la Croisette', distance: '3 min walk' },
      { name: 'La Croisette Boulevard', distance: '5 min walk' },
      { name: 'Palais des Festivals', distance: '12 min walk' },
      { name: 'Old Port of Cannes', distance: '15 min walk' },
      { name: 'Le Suquet (Old Town)', distance: '15 min' },
      { name: 'Cannes City Center', distance: '10 min' },
      { name: 'Nice Airport', distance: '30 min' },
      { name: 'Monaco', distance: '40 min' }
    ],
    images: [
      Athena01,
      Athena02,
      Athena03,
      Athena04,
      Athena05,
      Athena06,
      Athena07,
      Athena08,
      Athena09,
      Athena10,
      Athena11,
      Athena12,
      Athena13,
      Athena14,
      Athena15,
      Athena16,
      Athena17,
      Athena18,
      Athena19,
      Athena20,
      Athena21,
      Athena22
    ]
  }
]
