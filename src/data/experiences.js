export const experiences = [
  {
    id: 'private-chef',
    slug: 'private-chef',
    name: 'Private Chef & Catering',
    tagline: 'Savor the flavors of Provence in your villa',
    price: 200,
    priceUnit: 'per service',
    icon: 'ChefHat',
    shortDescription: 'Let a private chef bring the tastes of the French Riviera to your table. From intimate dinners to celebratory feasts, enjoy restaurant-quality cuisine without leaving your villa.',
    fullDescription: `Experience the culinary traditions of the Côte d'Azur with a private chef who brings the market to your table. Your chef will source fresh, local ingredients from Riviera markets and prepare exquisite meals tailored to your preferences.

Whether you desire a romantic dinner for two, a family-style feast, or a cocktail party with hors d'oeuvres, we can arrange the perfect culinary experience. Dietary requirements and preferences are always accommodated.

Services include menu planning, shopping, preparation, service, and cleanup—allowing you to focus entirely on enjoying exceptional food and company.`,
    includes: [
      'Menu consultation',
      'Fresh market shopping',
      'Full preparation & cooking',
      'Table service',
      'Kitchen cleanup'
    ],
    priceOptions: [
      { type: 'Breakfast service', price: 80 },
      { type: 'Lunch (3 courses)', price: 150 },
      { type: 'Dinner (4 courses)', price: 200 },
      { type: 'Full day service', price: 450 }
    ]
  },
  {
    id: 'wine-tours',
    slug: 'wine-tours',
    name: 'Wine & Olive Oil Tours',
    tagline: 'Discover Provençal vineyards and olive groves',
    price: 120,
    priceUnit: 'per person',
    icon: 'Wine',
    shortDescription: 'Explore the wine regions of Provence and the French Riviera with guided tastings at family-owned estates. Visit ancient olive groves and learn the art of local production.',
    fullDescription: `Journey through sun-drenched vineyards and centuries-old olive groves in the hills above the Mediterranean. Our curated wine and olive oil tours connect you with passionate local producers who share their craft and stories.

Visit boutique wineries producing exceptional rosés, bold reds, and crisp whites. Meet olive oil makers who continue ancient traditions, and taste the difference that Riviera sunshine makes.

Tours include transportation, guided tastings, and often a Provençal lunch at the estate. Half-day and full-day options available.`,
    includes: [
      'Transportation from villa',
      'Expert local guide',
      '2-3 estate visits',
      'Guided tastings',
      'Light lunch (full-day tours)'
    ],
    priceOptions: [
      { type: 'Half-day tour', price: 120 },
      { type: 'Full-day tour with lunch', price: 220 },
      { type: 'Private exclusive tour', price: 350 }
    ]
  },
  {
    id: 'yacht-excursions',
    slug: 'yacht-excursions',
    name: 'Yacht & Boat Excursions',
    tagline: 'Explore the Mediterranean from the water',
    price: 800,
    priceUnit: 'per day',
    icon: 'Boat',
    shortDescription: 'Charter a private yacht or join a guided boat excursion to discover hidden coves, swim in turquoise waters, and see the Riviera coastline from the sea.',
    fullDescription: `See the French Riviera as it was meant to be seen—from the sparkling Mediterranean. Charter a private yacht with captain for the day, or join a curated boat excursion to explore the coast's most beautiful spots.

Swim in secluded coves only accessible by boat, anchor near coastal villages for lunch, or cruise past the villas of Cap Ferrat and the principality of Monaco. Sunset cruises and full-day adventures are both available.

All excursions include an experienced captain, safety equipment, and refreshments. Snorkeling gear and paddleboards available upon request.`,
    includes: [
      'Private yacht or shared excursion',
      'Experienced captain',
      'Safety equipment',
      'Refreshments & snacks',
      'Snorkeling equipment'
    ],
    priceOptions: [
      { type: 'Half-day private charter', price: 500 },
      { type: 'Full-day private charter', price: 800 },
      { type: 'Sunset cruise (2 hours)', price: 300 },
      { type: 'Shared excursion', price: 150 }
    ]
  },
  {
    id: 'transfers',
    slug: 'transfers',
    name: 'Airport & Local Transfers',
    tagline: 'Seamless arrival and departure',
    price: 90,
    priceUnit: 'per transfer',
    icon: 'Car',
    shortDescription: 'Begin your holiday the moment you land. Private, comfortable transfers from Nice Airport to your villa, with meet-and-greet service and local insights along the way.',
    fullDescription: `Start and end your Riviera escape with ease. Our private transfer service ensures a smooth journey from Nice Côte d'Azur Airport to your accommodation—no waiting, no stress, just comfort.

Your driver will meet you in arrivals with a name sign, assist with luggage, and provide a comfortable, air-conditioned ride to your villa. Along the way, receive local insights and recommendations to begin your stay informed.

We also offer transfers to restaurants, events, nearby towns, or Monaco for a night out—allowing you to enjoy the evening without worrying about parking or directions.`,
    includes: [
      'Meet & greet at airport',
      'Luggage assistance',
      'Comfortable vehicle',
      'English-speaking driver',
      'Local recommendations'
    ],
    priceOptions: [
      { type: 'Nice Airport transfer', price: 90 },
      { type: 'Monaco transfer', price: 70 },
      { type: 'Local restaurant transfer', price: 50 },
      { type: 'Full-day driver service', price: 400 }
    ]
  },
  {
    id: 'guided-tours',
    slug: 'guided-tours',
    name: 'Guided Cultural Tours',
    tagline: 'Discover hidden gems with local experts',
    price: 180,
    priceUnit: 'per person',
    icon: 'Compass',
    shortDescription: 'Explore medieval villages, art museums, and local markets with knowledgeable guides who reveal the stories and secrets of the French Riviera.',
    fullDescription: `Go beyond the tourist trail with private guided tours led by passionate locals. Wander the cobblestone streets of hilltop villages, explore world-class art museums, or discover the best artisan markets and hidden galleries.

Our guides are carefully selected for their knowledge, warmth, and ability to bring the region's history and culture to life. Tours are fully customizable to your interests—art, history, architecture, gastronomy, or a blend of all.

Whether you want to visit Matisse's Chapel in Vence, explore the medieval village of Èze, or discover the Picasso Museum in Antibes, we'll craft the perfect cultural experience.`,
    includes: [
      'Expert local guide',
      'Transportation',
      'Museum or site entry fees',
      'Personalized itinerary',
      'Insider access'
    ],
    priceOptions: [
      { type: 'Half-day tour', price: 180 },
      { type: 'Full-day cultural tour', price: 320 },
      { type: 'Art-focused private tour', price: 400 }
    ]
  },
  {
    id: 'wellness',
    slug: 'wellness',
    name: 'Massage & Wellness',
    tagline: 'Relax and rejuvenate in your villa',
    price: 150,
    priceUnit: 'per session',
    icon: 'HeartStraight',
    shortDescription: 'Bring the spa to your villa with in-home massage, yoga sessions, and wellness treatments designed to help you unwind completely.',
    fullDescription: `Complete relaxation awaits. Our wellness services bring expert therapists and instructors to your villa for personalized treatments in the comfort and privacy of your own space.

Choose from therapeutic massage, couples massage, private yoga sessions on your terrace, or customized wellness programs. All practitioners are certified professionals who use high-quality, natural products.

Begin your day with sunrise yoga overlooking the Mediterranean, or end it with a relaxing massage by the pool. This is the art of doing nothing—beautifully.`,
    includes: [
      'Certified practitioners',
      'All equipment & products',
      'In-villa service',
      'Flexible scheduling',
      'Customized treatments'
    ],
    priceOptions: [
      { type: 'Massage (60 min)', price: 150 },
      { type: 'Couples massage', price: 280 },
      { type: 'Private yoga session', price: 120 },
      { type: 'Half-day wellness retreat', price: 400 }
    ]
  }
]
