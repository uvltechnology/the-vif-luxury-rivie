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
import ElenaImg from '@/assets/images/elena.jpg'

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
    tagline: 'Perched above the Mediterranean in La Turbie\'s timeless hills',
    location: 'La Turbie, French Riviera',
    exactAddress: '205 Chemin de Giram, 06320 La Turbie, France',
    price: 380,
    size: '200 m²',
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    hasPool: true,
    hasParking: true,
    hasSeaView: true,
    hasBalcony: true,
    hasFreeWifi: true,
    petFriendly: true,
    hasView: true,
    hasFamilyRooms: true,
    entirePlace: true,
    host: {
      name: 'Elena',
      image: ElenaImg,
      rating: 9.8,
      languages: ['English', 'French', 'Italian', 'Russian'],
      description: 'I speak French, English, Italian and Russian and it\'s my pleasure to offer you an unforgettable stay in my beautiful country. There are so many things to do and to see here! I\'ll try to be as helpful as possible during your stay. Looking forward to hosting you at any moment of the year!'
    },
    shortDescription: 'Discover exceptional privacy and breathtaking panoramas at Villa Azure. Perched in the historic village of La Turbie, this three-bedroom sanctuary offers commanding views across Monaco, the Mediterranean, and the Italian coastline—where ancient Roman heritage meets contemporary Riviera luxury.',
    fullDescription: `Villa Azure stands as a masterpiece of location and design, nestled at 205 Chemin de Giram in the medieval hilltop village of La Turbie. This exceptional three-bedroom villa captures the very essence of elevated Riviera living, where sweeping vistas meet sophisticated comfort in one of the French Côte d'Azur's most prestigious addresses.

Positioned at 450 meters above sea level, the villa commands a breathtaking 180-degree panorama that stretches from the glittering principality of Monaco to the distant shores of Italy. Here, beneath the shadow of the ancient Roman monument Trophée des Alpes, you'll experience the Riviera from a perspective few discover—where eagles soar and the Mediterranean unfolds like a sapphire tapestry below.

Located in a private and wooded domain, this magnificent villa has been recently renovated with meticulous attention to detail. Step through the villa's entrance and immediately sense the harmony between architecture and landscape. Light-filled interiors flow seamlessly through French doors onto expansive terraces, where every vantage point frames nature's artistry. The thoughtfully appointed living spaces blend contemporary elegance with warm Mediterranean character—vaulted ceilings, natural stone accents, and curated furnishings that speak to both comfort and refined taste.

The master suite upstairs features a luxurious bathtub and private terrace offering stunning sea views—your personal sanctuary above the clouds. Two additional bedrooms each include independent Italian showers and garden or sea views, ensuring every guest enjoys privacy and comfort. A versatile TV room with shower can be converted into a fourth bedroom on request, making this villa perfect for larger gatherings.

The spacious 60m² living and dining area welcomes you with an all-equipped modern kitchen and charming fireplace, creating an inviting space for gathering and celebration. Outside, the villa truly reveals its magic. The large swimming pool features three different depths to accommodate all ages, from children splashing joyfully to adults swimming leisurely. Mature Mediterranean gardens—fragrant with lavender, rosemary, and century-old olive trees—provide shaded sanctuaries for afternoon reading or intimate conversations. The gas BBQ, summer lounge, and covered dining terrace become the stage for memorable meals, where local wines taste richer and conversations linger longer under the Provençal sun.

An adorable guest house with a small kitchen for 4 people can be booked additionally with the main property, perfect for extended families or friends seeking both togetherness and privacy.

La Turbie itself adds layers of enchantment to your stay. This small town is situated above the Monaco principality on the French Riviera, along the spectacular Grand Corniche road that runs from Nice to Monaco—one of the great scenic highlights of this region. The medieval village is beautifully preserved, and the great Roman monument, the Trophée des Alpes, dominates from its commanding position. For everyday life, you'll find everything you need in the village: restaurants, pharmacy, bakery, cheese, meat and grocery stores, hairdresser, and tourism office.

There are too many highlights in the region to list here, from magnificent scenery and traditional Provençal hilltop villages such as Èze to the glitzy resorts of the French Riviera like Roquebrune Cap Martin, Beaulieu sur Mer, Saint Jean Cap Ferrat and the wealthy principality of Monaco. Nice airport and Italy are also within a quarter hour drive from La Turbie. There is something close to La Turbie for everyone!

This is not merely a vacation rental. Villa Azure is your invitation to live as the Romans, artists, and aristocrats have for millennia—elevated above the everyday, immersed in beauty, and surrounded by the timeless allure of the French Riviera's most spectacular coastline.`,
    amenities: {
      property: ['The entire place is yours - 200 m² of private luxury', 'Panoramic sea views across the Mediterranean', 'Spectacular vistas of Monaco and Italian coastline', 'Private balcony with outdoor seating', 'Family-friendly configuration with spacious rooms'],
      comfort: ['Air conditioning throughout', 'Central heating system', 'Premium Italian linens', 'Luxury bathrobes & slippers', 'Professional hairdryers in all bathrooms'],
      entertainment: ['Smart 4K TVs with satellite', 'Premium Bluetooth sound system', 'Free ultra-high-speed WiFi 150Mbps', 'Curated library of art & travel books', 'Board games & playing cards'],
      kitchen: ['Fully equipped gourmet kitchen', 'Professional Nespresso machine', 'Premium cookware & utensils', 'Wine refrigerator', 'Dishwasher', 'Premium outdoor Weber BBQ grill'],
      outdoor: ['Outdoor swimming pool with panoramic views', 'Mature Mediterranean gardens', 'Multiple shaded terraces', 'Covered outdoor dining for 8', 'Luxury sun loungers', 'Outdoor shower', 'Pool safety fence available'],
      services: ['Personalized welcome & property orientation', 'Weekly professional cleaning included', 'Daily pool & garden maintenance', 'Concierge recommendations', 'Complimentary welcome provisions', 'Pet-friendly accommodation (small well-behaved dogs welcome)'],
      parking: ['Free on-site parking for 2 vehicles', 'Private secure parking area', 'Electric vehicle charging available']
    },
    houseRules: {
      checkIn: 'From 2:00 PM to 8:00 PM - Guests are required to show a photo ID and credit card at check-in. You need to let the property know what time you\'ll be arriving in advance.',
      checkOut: 'From 8:00 AM to 2:00 PM',
      minStay: '7 nights (July-August), 5 nights (June & September), 3 nights (October-May)',
      smoking: 'Smoking is not allowed',
      pets: 'Pets are allowed on request. Charges may apply.',
      events: 'Parties and events permitted with advance approval',
      quietHours: 'Guests need to be quiet between 11:00 PM and 8:00 AM',
      ageRestriction: 'There\'s no age requirement for check-in',
      children: 'Children of all ages are welcome. To see correct prices and occupancy info, add the number and ages of children in your group to your search.',
      cribs: '0-2 years: Crib upon request (Free). The number of cribs allowed depends on the option you choose. Check your selected option for more info. There are no extra beds available at this property. All cribs are subject to availability.',
      cancellation: 'Cancellation and prepayment policies vary according to accommodation type. Enter your stay dates and check the conditions of your selected option.',
      damageDeposit: 'A damage deposit of €500 is required on arrival. That\'s about $754 SGD. This will be collected as a cash payment. You should be reimbursed on check-out. Your deposit will be refunded in full, in cash, subject to an inspection of the property.',
      payment: 'Booking.com takes your payment for this stay on behalf of the property, but make sure you have cash for any extras once you get there.'
    },
    perfectFor: ['Romantic escapes with extraordinary views', 'Multi-generational family gatherings', 'Friends celebrating special occasions', 'Peaceful writing or creative retreats', 'Photography enthusiasts', 'History & culture lovers'],
    nearbyAttractions: [
      { name: 'Trophée des Alpes (Roman Monument)', distance: '5 min walk' },
      { name: 'Monaco Monte-Carlo', distance: '10 min drive' },
      { name: 'Medieval La Turbie Village', distance: '2 min walk' },
      { name: 'Èze Village & Gardens', distance: '8 min drive' },
      { name: 'Nice City Center', distance: '20 min drive' },
      { name: 'Beaches (Monaco & Cap-d\'Ail)', distance: '12 min drive' },
      { name: 'Nice Côte d\'Azur Airport', distance: '30 min drive' },
      { name: 'Italian Border', distance: '15 min drive' }
    ],
    mapMarkers: {
      restaurants: [
        { 
          name: 'Hostellerie Jérôme', 
          type: 'Michelin Star',
          address: '20 Rue Comte de Cessole, La Turbie',
          lat: 43.7450,
          lng: 7.4010,
          distance: '3 min walk'
        },
        { 
          name: 'Le Café de la Fontaine', 
          type: 'Traditional Provençal',
          address: 'Place Neuve, La Turbie',
          lat: 43.7455,
          lng: 7.4015,
          distance: '4 min walk'
        },
        { 
          name: 'Château de la Chèvre d\'Or', 
          type: 'Two Michelin Stars',
          address: 'Rue du Barri, Èze Village',
          lat: 43.7275,
          lng: 7.3615,
          distance: '8 min drive'
        },
        { 
          name: 'La Table de Patrick Raingeard', 
          type: 'Gourmet French',
          address: 'Avenue des Diables Bleus, Èze',
          lat: 43.7200,
          lng: 7.3580,
          distance: '10 min drive'
        },
        { 
          name: 'Le Louis XV - Alain Ducasse', 
          type: 'Three Michelin Stars',
          address: 'Hôtel de Paris, Monaco',
          lat: 43.7395,
          lng: 7.4285,
          distance: '12 min drive'
        },
        { 
          name: 'Elsa', 
          type: 'Organic Michelin Star',
          address: 'Monte-Carlo Beach Hotel, Monaco',
          lat: 43.7380,
          lng: 7.4400,
          distance: '15 min drive'
        },
        { 
          name: 'Blue Bay', 
          type: 'Caribbean Michelin Star',
          address: 'Monte-Carlo Bay Hotel, Monaco',
          lat: 43.7425,
          lng: 7.4310,
          distance: '13 min drive'
        },
        { 
          name: 'Le Grill', 
          type: 'Fine Dining',
          address: 'Hôtel de Paris, Monaco',
          lat: 43.7395,
          lng: 7.4285,
          distance: '12 min drive'
        },
        { 
          name: 'Château Eza', 
          type: 'Romantic Gastronomic',
          address: 'Rue de la Pise, Èze Village',
          lat: 43.7270,
          lng: 7.3610,
          distance: '8 min drive'
        },
        { 
          name: 'La Chaumière', 
          type: 'Mediterranean Terrace',
          address: 'Avenue de la Liberté, Èze',
          lat: 43.7250,
          lng: 7.3590,
          distance: '9 min drive'
        }
      ],
      attractions: [
        { 
          name: 'Trophée des Alpes', 
          type: 'Ancient Monument',
          description: 'Majestic Roman trophy built in 6 BC by Emperor Augustus',
          lat: 43.7458,
          lng: 7.4012,
          distance: '5 min walk'
        },
        { 
          name: 'La Turbie Medieval Village', 
          type: 'Historic Village',
          description: 'Charming cobblestone streets with artisan shops',
          lat: 43.7455,
          lng: 7.4015,
          distance: '2 min walk'
        },
        { 
          name: 'Monaco Monte-Carlo', 
          type: 'Principality',
          description: 'Glamorous city-state with casino and harbor',
          lat: 43.7384,
          lng: 7.4246,
          distance: '10 min drive'
        },
        { 
          name: 'Èze Village', 
          type: 'Medieval Perched Village',
          description: 'Stunning clifftop village with artisan boutiques',
          lat: 43.7275,
          lng: 7.3615,
          distance: '8 min drive'
        },
        { 
          name: 'Jardin Exotique d\'Èze', 
          type: 'Botanical Garden',
          description: 'Exotic garden perched 429m above the sea',
          lat: 43.7280,
          lng: 7.3620,
          distance: '8 min drive'
        },
        { 
          name: 'Monaco Casino de Monte-Carlo', 
          type: 'Historic Casino',
          description: 'Belle Époque architectural masterpiece',
          lat: 43.7395,
          lng: 7.4285,
          distance: '12 min drive'
        },
        { 
          name: 'Plage Mala', 
          type: 'Secluded Beach',
          description: 'Hidden cove with crystal-clear waters',
          lat: 43.7190,
          lng: 7.3570,
          distance: '12 min drive'
        },
        { 
          name: 'Cap-d\'Ail Beaches', 
          type: 'Coastal Beaches',
          description: 'Beautiful Mediterranean beaches',
          lat: 43.7210,
          lng: 7.3950,
          distance: '10 min drive'
        },
        { 
          name: 'Oceanographic Museum Monaco', 
          type: 'Marine Museum',
          description: 'Jacques Cousteau\'s legendary marine institute',
          lat: 43.7306,
          lng: 7.4254,
          distance: '12 min drive'
        },
        { 
          name: 'Prince\'s Palace of Monaco', 
          type: 'Royal Palace',
          description: 'Official residence of the Prince of Monaco',
          lat: 43.7312,
          lng: 7.4197,
          distance: '11 min drive'
        },
        { 
          name: 'Sentier du Littoral', 
          type: 'Coastal Hiking',
          description: 'Spectacular cliff-edge walking path',
          lat: 43.7200,
          lng: 7.3750,
          distance: '10 min drive'
        },
        { 
          name: 'Monaco Grand Prix Circuit', 
          type: 'F1 Circuit',
          description: 'World-famous Formula 1 street circuit',
          lat: 43.7347,
          lng: 7.4206,
          distance: '12 min drive'
        },
        { 
          name: 'Villa Kerylos', 
          type: 'Historic Villa',
          description: 'Faithfully reconstructed ancient Greek villa',
          lat: 43.7075,
          lng: 7.3302,
          distance: '15 min drive'
        },
        { 
          name: 'Larvotto Beach Monaco', 
          type: 'Urban Beach',
          description: 'Monaco\'s main public beach',
          lat: 43.7425,
          lng: 7.4380,
          distance: '14 min drive'
        },
        { 
          name: 'Japanese Garden Monaco', 
          type: 'Zen Garden',
          description: 'Tranquil authentic Japanese garden',
          lat: 43.7385,
          lng: 7.4330,
          distance: '13 min drive'
        },
        { 
          name: 'Fort de la Revère', 
          type: 'Historic Fort & Nature Park',
          description: 'Panoramic viewpoint over the entire Riviera',
          lat: 43.7520,
          lng: 7.3950,
          distance: '6 min drive'
        },
        { 
          name: 'Beaulieu-sur-Mer', 
          type: 'Coastal Town',
          description: 'Belle Époque resort town with harbor',
          lat: 43.7070,
          lng: 7.3300,
          distance: '12 min drive'
        },
        { 
          name: 'Nice Promenade des Anglais', 
          type: 'Seafront Promenade',
          description: 'Iconic 7km Mediterranean walkway',
          lat: 43.6950,
          lng: 7.2650,
          distance: '20 min drive'
        },
        { 
          name: 'Fragonard Perfumery Èze', 
          type: 'Perfume Factory',
          description: 'Historic perfume house with free tours',
          lat: 43.7278,
          lng: 7.3618,
          distance: '8 min drive'
        },
        { 
          name: 'Exotic Garden of Monaco', 
          type: 'Botanical Garden',
          description: 'Cliffside succulent garden with cave',
          lat: 43.7305,
          lng: 7.4145,
          distance: '13 min drive'
        }
      ]
    },
    images: [
      Villa128,
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
      Athena10,
      Athena01,
      Athena02,
      Athena03,
      Athena04,
      Athena05,
      Athena06,
      Athena07,
      Athena08,
      Athena09,
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
