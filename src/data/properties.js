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

import Villa101 from '@/assets/images/Villa_101.jpg'
import Villa102 from '@/assets/images/Villa_102.jpg'
import Villa103 from '@/assets/images/Villa_103.jpg'
import Villa104 from '@/assets/images/Villa_104.jpg'
import Villa105 from '@/assets/images/Villa_105.jpg'
import Villa106 from '@/assets/images/Villa_106.jpg'
import Villa107 from '@/assets/images/Villa_107.jpg'
import Villa108 from '@/assets/images/Villa_108.jpg'
import Villa109 from '@/assets/images/Villa_109.jpg'
import Villa110 from '@/assets/images/Villa_110.jpg'
import Villa111 from '@/assets/images/Villa_111.jpg'
import Villa112 from '@/assets/images/Villa_112.jpg'
import Villa113 from '@/assets/images/Villa_113.jpg'
import Villa114 from '@/assets/images/Villa_114.jpg'
import Villa115 from '@/assets/images/Villa_115.jpg'
import Villa116 from '@/assets/images/Villa_116.jpg'
import Villa117 from '@/assets/images/Villa_117.jpg'
import Villa118 from '@/assets/images/Villa_118.jpg'
import Villa119 from '@/assets/images/Villa_119.jpg'
import Villa120 from '@/assets/images/Villa_120.jpg'
import Villa121 from '@/assets/images/Villa_121.jpg'
import Villa122 from '@/assets/images/Villa_122.jpg'
import Villa123 from '@/assets/images/Villa_123.jpg'
import Villa124 from '@/assets/images/Villa_124.jpg'
import Villa125 from '@/assets/images/Villa_125.jpg'
import Villa126 from '@/assets/images/Villa_126.jpg'
import Villa127 from '@/assets/images/Villa_127.jpg'
import Villa128 from '@/assets/images/Villa_128.jpg'
import Villa129 from '@/assets/images/Villa_129.jpg'
import Villa130 from '@/assets/images/Villa_130.jpg'
import Villa131 from '@/assets/images/Villa_131.jpg'
import Villa132 from '@/assets/images/Villa_132.jpg'
import Villa133 from '@/assets/images/Villa_133.jpg'
import Villa134 from '@/assets/images/Villa_134.jpg'
import Villa135 from '@/assets/images/Villa_135.jpg'
import Villa136 from '@/assets/images/Villa_136.jpg'

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
    mapMarkers: {
      restaurants: [
        { 
          name: 'Le Chantecler', 
          type: 'Fine Dining',
          address: '37 Promenade des Anglais',
          lat: 43.6950,
          lng: 7.2620,
          distance: '12 min drive'
        },
        { 
          name: 'La Petite Maison', 
          type: 'Mediterranean',
          address: '11 Rue Saint-François de Paule',
          lat: 43.6965,
          lng: 7.2750,
          distance: '15 min drive'
        },
        { 
          name: 'Jan', 
          type: 'Contemporary',
          address: '12 Rue Lascaris',
          lat: 43.6970,
          lng: 7.2755,
          distance: '15 min drive'
        },
        { 
          name: 'L\'Aromate', 
          type: 'Modern French',
          address: '3 Rue Dalpozzo',
          lat: 43.6955,
          lng: 7.2680,
          distance: '12 min drive'
        },
        { 
          name: 'Bistrot d\'Antoine', 
          type: 'Traditional Bistro',
          address: '27 Rue de la Préfecture',
          lat: 43.6960,
          lng: 7.2745,
          distance: '14 min drive'
        },
        { 
          name: 'La Merenda', 
          type: 'Niçoise Cuisine',
          address: '4 Rue Raoul Bosio',
          lat: 43.6968,
          lng: 7.2748,
          distance: '15 min drive'
        },
        { 
          name: 'Olive et Artichaut', 
          type: 'Mediterranean',
          address: '6 Rue Sainte-Réparate',
          lat: 43.6972,
          lng: 7.2752,
          distance: '15 min drive'
        }
      ],
      attractions: [
        { 
          name: 'Promenade des Anglais', 
          type: 'Seafront',
          description: 'Iconic Mediterranean promenade',
          lat: 43.6950,
          lng: 7.2650,
          distance: '10 min drive'
        },
        { 
          name: 'Castle Hill', 
          type: 'Viewpoint',
          description: 'Panoramic views of Nice',
          lat: 43.6955,
          lng: 7.2800,
          distance: '15 min drive'
        },
        { 
          name: 'Nice Old Town', 
          type: 'Historic District',
          description: 'Charming streets and markets',
          lat: 43.6965,
          lng: 7.2760,
          distance: '15 min drive'
        },
        { 
          name: 'Cours Saleya Market', 
          type: 'Market',
          description: 'Famous flower and food market',
          lat: 43.6960,
          lng: 7.2750,
          distance: '15 min drive'
        },
        { 
          name: 'Musée Matisse', 
          type: 'Museum',
          description: 'Collection of Matisse artworks',
          lat: 43.7190,
          lng: 7.2780,
          distance: '18 min drive'
        },
        { 
          name: 'Marc Chagall Museum', 
          type: 'Museum',
          description: 'Biblical message artworks',
          lat: 43.7088,
          lng: 7.2700,
          distance: '16 min drive'
        },
        { 
          name: 'Russian Orthodox Cathedral', 
          type: 'Cultural Site',
          description: 'Beautiful cathedral architecture',
          lat: 43.7020,
          lng: 7.2650,
          distance: '12 min drive'
        },
        { 
          name: 'Place Masséna', 
          type: 'Public Square',
          description: 'Main square with modern art',
          lat: 43.6975,
          lng: 7.2700,
          distance: '13 min drive'
        },
        { 
          name: 'Baie des Anges Beach', 
          type: 'Beach',
          description: 'Beautiful pebble beach',
          lat: 43.6945,
          lng: 7.2600,
          distance: '10 min drive'
        },
        { 
          name: 'Phoenix Park', 
          type: 'Park',
          description: 'Botanical garden and greenhouses',
          lat: 43.6820,
          lng: 7.2160,
          distance: '14 min drive'
        },
        { 
          name: 'Port Lympia', 
          type: 'Marina',
          description: 'Historic port and harbor',
          lat: 43.6950,
          lng: 7.2865,
          distance: '16 min drive'
        }
      ]
    },
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
    mapMarkers: {
      restaurants: [
        { 
          name: 'Château de la Chèvre d\'Or', 
          type: 'Michelin Star',
          address: 'Rue du Barri',
          lat: 43.7275,
          lng: 7.3615,
          distance: '5 min drive'
        },
        { 
          name: 'La Table de Patrick Raingeard', 
          type: 'Fine Dining',
          address: 'Avenue des Diables Bleus',
          lat: 43.7200,
          lng: 7.3580,
          distance: '8 min drive'
        },
        { 
          name: 'Château Eza', 
          type: 'Gastronomic',
          address: 'Rue de la Pise',
          lat: 43.7270,
          lng: 7.3610,
          distance: '5 min drive'
        },
        { 
          name: 'La Chaumière', 
          type: 'Mediterranean',
          address: 'Avenue de la Liberté',
          lat: 43.7250,
          lng: 7.3590,
          distance: '6 min drive'
        },
        { 
          name: 'Le Bistrot du Cap', 
          type: 'French Bistro',
          address: 'Boulevard de la Mer',
          lat: 43.7180,
          lng: 7.3560,
          distance: '7 min drive'
        },
        { 
          name: 'Les Remparts', 
          type: 'Provençal',
          address: 'Rue du Barri',
          lat: 43.7273,
          lng: 7.3617,
          distance: '5 min drive'
        }
      ],
      attractions: [
        { 
          name: 'Èze Village', 
          type: 'Medieval Village',
          description: 'Stunning hilltop village',
          lat: 43.7275,
          lng: 7.3615,
          distance: '5 min drive'
        },
        { 
          name: 'Jardin Exotique d\'Èze', 
          type: 'Garden',
          description: 'Exotic garden with panoramic views',
          lat: 43.7280,
          lng: 7.3620,
          distance: '6 min drive'
        },
        { 
          name: 'Monaco', 
          type: 'City',
          description: 'Glamorous principality',
          lat: 43.7384,
          lng: 7.4246,
          distance: '10 min drive'
        },
        { 
          name: 'Plage Mala', 
          type: 'Beach',
          description: 'Secluded pebble beach',
          lat: 43.7190,
          lng: 7.3570,
          distance: '8 min drive'
        },
        { 
          name: 'Cap-d\'Ail Beach', 
          type: 'Beach',
          description: 'Beautiful coastal beach',
          lat: 43.7210,
          lng: 7.3950,
          distance: '9 min drive'
        },
        { 
          name: 'Monaco Casino', 
          type: 'Entertainment',
          description: 'Iconic Monte Carlo Casino',
          lat: 43.7395,
          lng: 7.4285,
          distance: '11 min drive'
        },
        { 
          name: 'Oceanographic Museum', 
          type: 'Museum',
          description: 'Marine science museum in Monaco',
          lat: 43.7306,
          lng: 7.4254,
          distance: '10 min drive'
        },
        { 
          name: 'Monaco Grand Prix Circuit', 
          type: 'Landmark',
          description: 'Famous F1 street circuit',
          lat: 43.7347,
          lng: 7.4206,
          distance: '11 min drive'
        },
        { 
          name: 'Villa Kerylos', 
          type: 'Historic Site',
          description: 'Ancient Greek-style villa',
          lat: 43.7075,
          lng: 7.3302,
          distance: '8 min drive'
        },
        { 
          name: 'Sentier Littoral Trail', 
          type: 'Hiking',
          description: 'Scenic coastal walking path',
          lat: 43.7200,
          lng: 7.3750,
          distance: '7 min drive'
        },
        { 
          name: 'Beaulieu-sur-Mer', 
          type: 'Town',
          description: 'Charming seaside town',
          lat: 43.7070,
          lng: 7.3300,
          distance: '7 min drive'
        },
        { 
          name: 'Fragonard Perfumery Èze', 
          type: 'Shopping',
          description: 'Historic perfume factory',
          lat: 43.7278,
          lng: 7.3618,
          distance: '5 min drive'
        }
      ]
    },
    images: [
      Villa101,
      Villa102,
      Villa103,
      Villa104,
      Villa105,
      Villa106,
      Villa107,
      Villa108,
      Villa109,
      Villa110,
      Villa111,
      Villa112,
      Villa113,
      Villa114,
      Villa115,
      Villa116,
      Villa117,
      Villa118,
      Villa119,
      Villa120,
      Villa121,
      Villa122,
      Villa123,
      Villa124,
      Villa125,
      Villa126,
      Villa127,
      Villa128,
      Villa129,
      Villa130,
      Villa131,
      Villa132,
      Villa133,
      Villa134,
      Villa135,
      Villa136
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
      checkIn: 'From 2:00 PM to 8:00 PM (please notify property in advance of arrival time)',
      checkOut: 'From 9:00 AM to 1:00 PM',
      minStay: 'Varies by season - please inquire',
      smoking: 'Smoking is not allowed anywhere in the property',
      pets: 'Pets are allowed on request. Charges may apply.',
      events: 'Parties and events are not allowed',
      quietHours: '10:00 PM - 8:00 AM',
      ageRestriction: 'No age restriction for check-in',
      children: 'Children of all ages are welcome',
      cancellation: 'Cancellation and prepayment policies vary according to accommodation type. Please check conditions at time of booking.',
      damageDeposit: '€600 damage deposit required on arrival (collected by credit card). Refunded within 7 days of check-out subject to property inspection.',
      cribs: 'Cribs and extra beds are not available at this property',
      payment: 'Payment handled by Booking.com on behalf of property. Please have cash for any extras on-site.'
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
    mapMarkers: {
      restaurants: [
        { 
          name: 'La Palme d\'Or', 
          type: 'Fine Dining',
          address: '73 Boulevard de la Croisette',
          lat: 43.5501,
          lng: 7.0235,
          distance: '4 min walk'
        },
        { 
          name: 'Le Park 45', 
          type: 'Gastronomic',
          address: 'Grand Hôtel, 45 Boulevard de la Croisette',
          lat: 43.5495,
          lng: 7.0220,
          distance: '6 min walk'
        },
        { 
          name: 'Côté Jardin', 
          type: 'Mediterranean',
          address: '12 Avenue Saint-Jean',
          lat: 43.5480,
          lng: 7.0198,
          distance: '8 min walk'
        },
        { 
          name: 'La Môme', 
          type: 'French Bistro',
          address: '10 Rue Meynadier',
          lat: 43.5510,
          lng: 7.0190,
          distance: '10 min walk'
        },
        { 
          name: 'Mantel', 
          type: 'Contemporary French',
          address: '22 Rue Saint-Antoine',
          lat: 43.5488,
          lng: 7.0175,
          distance: '12 min walk'
        },
        { 
          name: 'Astoux et Brun', 
          type: 'Seafood',
          address: '27 Rue Félix Faure',
          lat: 43.5502,
          lng: 7.0182,
          distance: '10 min walk'
        },
        { 
          name: 'Le Maschou', 
          type: 'Provençal',
          address: '15 Rue Saint-Antoine',
          lat: 43.5490,
          lng: 7.0177,
          distance: '11 min walk'
        },
        { 
          name: 'L\'Affable', 
          type: 'Modern French',
          address: '5 Rue La Fontaine',
          lat: 43.5515,
          lng: 7.0158,
          distance: '13 min walk'
        },
        { 
          name: 'Aux Bons Enfants', 
          type: 'Traditional Niçoise',
          address: '80 Rue Meynadier',
          lat: 43.5508,
          lng: 7.0170,
          distance: '12 min walk'
        },
        { 
          name: 'Sea Sens', 
          type: 'Contemporary',
          address: '5 Promenade de la Croisette',
          lat: 43.5492,
          lng: 7.0215,
          distance: '7 min walk'
        }
      ],
      attractions: [
        { 
          name: 'Plage de la Croisette', 
          type: 'Beach',
          description: 'Iconic Riviera beach with crystal-clear waters',
          lat: 43.5490,
          lng: 7.0240,
          distance: '3 min walk'
        },
        { 
          name: 'Palais des Festivals', 
          type: 'Cultural Landmark',
          description: 'Home of the Cannes Film Festival',
          lat: 43.5515,
          lng: 7.0175,
          distance: '12 min walk'
        },
        { 
          name: 'Marché Forville', 
          type: 'Market',
          description: 'Authentic Provençal food market',
          lat: 43.5520,
          lng: 7.0165,
          distance: '14 min walk'
        },
        { 
          name: 'Le Suquet', 
          type: 'Historic District',
          description: 'Charming old town with panoramic views',
          lat: 43.5530,
          lng: 7.0155,
          distance: '15 min walk'
        },
        { 
          name: 'Îles de Lérins', 
          type: 'Island',
          description: 'Beautiful islands accessible by ferry',
          lat: 43.5200,
          lng: 7.0500,
          distance: '15 min by ferry'
        },
        { 
          name: 'La Croisette Boulevard', 
          type: 'Shopping',
          description: 'Luxury shopping promenade',
          lat: 43.5497,
          lng: 7.0225,
          distance: '5 min walk'
        },
        { 
          name: 'Carlton Beach Club', 
          type: 'Beach Club',
          description: 'Exclusive beach club experience',
          lat: 43.5493,
          lng: 7.0230,
          distance: '5 min walk'
        },
        { 
          name: 'Old Port (Vieux Port)', 
          type: 'Marina',
          description: 'Charming harbor with yachts',
          lat: 43.5505,
          lng: 7.0155,
          distance: '12 min walk'
        },
        { 
          name: 'Rue d\'Antibes', 
          type: 'Shopping',
          description: 'Premier shopping street',
          lat: 43.5503,
          lng: 7.0185,
          distance: '10 min walk'
        },
        { 
          name: 'Musée de la Castre', 
          type: 'Museum',
          description: 'Art and antiquities in medieval castle',
          lat: 43.5532,
          lng: 7.0152,
          distance: '16 min walk'
        },
        { 
          name: 'Notre-Dame d\'Espérance', 
          type: 'Church',
          description: 'Historic church in Le Suquet',
          lat: 43.5533,
          lng: 7.0153,
          distance: '16 min walk'
        },
        { 
          name: 'Plage du Midi', 
          type: 'Beach',
          description: 'Less crowded public beach',
          lat: 43.5470,
          lng: 7.0110,
          distance: '18 min walk'
        },
        { 
          name: 'La Malmaison', 
          type: 'Art Gallery',
          description: 'Contemporary art exhibitions',
          lat: 43.5508,
          lng: 7.0190,
          distance: '10 min walk'
        },
        { 
          name: 'Casino Barrière', 
          type: 'Entertainment',
          description: 'Casino and entertainment venue',
          lat: 43.5512,
          lng: 7.0178,
          distance: '11 min walk'
        },
        { 
          name: 'Sainte-Marguerite Island', 
          type: 'Nature',
          description: 'Island with Fort Royal and beaches',
          lat: 43.5180,
          lng: 7.0480,
          distance: '15 min by ferry'
        },
        { 
          name: 'Saint-Honorat Island', 
          type: 'Cultural Site',
          description: 'Island monastery and vineyards',
          lat: 43.5070,
          lng: 7.0500,
          distance: '20 min by ferry'
        },
        { 
          name: 'Cannes Marina', 
          type: 'Marina',
          description: 'Modern yacht harbor',
          lat: 43.5362,
          lng: 6.9580,
          distance: '20 min drive'
        }
      ]
    },
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
