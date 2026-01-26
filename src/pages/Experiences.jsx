import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const destinations = [
  {
    name: 'Villefranche-sur-mer',
    description: 'A charming collection of brightly colored houses and cobbled streets that lead to a deep harbor, featuring the crystal-clear waters for which the French Riviera is renowned.',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80'
  },
  {
    name: 'Saint-Jean-Cap-Ferrat',
    description: 'The peninsula of St Jean Cap Ferrat, nestled along the French Riviera, is celebrated for its untamed beauty, opulent villas, and elegant yachts.',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80'
  },
  {
    name: 'Eze',
    description: 'This picturesque village, dating back to the Middle Ages, clings dramatically to the mountainside above the Mediterranean Sea, situated between St Jean Cap Ferrat and Monaco.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80'
  },
  {
    name: 'Monaco',
    description: 'Immerse yourself in the Monte Carlo ambiance, with its stunning views over the sparkling bay. This area radiates the flash and elegance you\'d expect.',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80'
  },
  {
    name: 'Cannes',
    description: 'Experience the allure of Cannes, with its wide waterfront promenade, designer shops, luxurious hotels, and streets lined with charming patios and restaurants.',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80'
  },
  {
    name: 'Nice',
    description: 'Nice is a stunning city with its numerous museums, picturesque scenery, green parks, and the famous seaside promenade des Anglais.',
    image: 'https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=800&q=80'
  }
]

const beachClubs = [
  {
    name: 'Paloma Beach',
    description: 'Paloma Beach is an iconic address, well-known for the quality of the service and privileged location.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
  },
  {
    name: 'La Mala',
    description: 'Paradise setting between cliffs for the Eden Plage Malia with its teak decoration on a pebble beach.',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80'
  },
  {
    name: 'Plage de Passable',
    description: 'Facing the bay of Villefranche, Plage de Passable has kept its wild character. A legendary place in Cap-Ferrat...',
    image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?w=800&q=80'
  },
  {
    name: 'Le Club Dauphin',
    description: 'For a truly luxurious experience, Club Dauphin offers an elegant terrace by the pool with a view of the Mediterranean Sea.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80'
  }
]

export default function Experiences() {
  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section - Villa Soleil Style */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1600&q=80"
            alt="French Riviera"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <h1 
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#ffffff',
              textShadow: '0 2px 40px rgba(0,0,0,0.15)'
            }}
          >
            Experiences
          </h1>
        </motion.div>
      </section>

      {/* Embark Section - Villa Soleil Style */}
      <section className="py-32 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#0f1c2e',
                marginBottom: '1.5rem'
              }}
            >
              Embark on an adventure to explore
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}
              className="max-w-3xl mx-auto"
            >
              The villa enjoys direct access to the main beach, with the old town just a 
              5-minute walk away. Additionally, within a 10 km radius, you can find nearby 
              towns such as the beautiful old city of Nice, the stunning village of Eze, 
              and the charming town of Beaulieu-sur-Mer.
            </motion.p>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden mb-6">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: '#0f1c2e',
                  marginBottom: '0.75rem'
                }}>{destination.name}</h3>
                <p style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#666'
                }}>
                  {destination.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beach Clubs Section - Villa Soleil Style */}
      <section className="py-32 md:py-40 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#0f1c2e',
                marginBottom: '1.5rem'
              }}
            >
              Beach clubs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}
              className="max-w-3xl mx-auto"
            >
              For a beach day or a glamorous sunset aperitif with a sea view, choose from 
              the most sophisticated beach clubs that line the French Riviera.
            </motion.p>
          </div>

          {/* Beach Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beachClubs.map((club, index) => (
              <motion.div
                key={club.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-square overflow-hidden mb-4">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.125rem',
                  fontWeight: 400,
                  color: '#0f1c2e',
                  marginBottom: '0.5rem'
                }}>{club.name}</h3>
                <p style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '13px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#666'
                }}>
                  {club.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boat & Hiking Section - Villa Soleil Style */}
      <section className="py-32 md:py-40 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Boat Excursions */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden mb-8">
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
                  alt="Boat excursion"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 300,
                color: '#0f1c2e',
                marginBottom: '1rem'
              }}>
                Claim the waters by boat
              </h2>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}>
                Nothing beats the bliss of a boat excursion along the azure French Riviera 
                on a scorching summer day. Indulge yourself and your family in one of these 
                remarkable and unforgettable sea voyages on the Côte d'Azur.
              </p>
            </motion.div>

            {/* Hiking */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden mb-8">
                <img
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
                  alt="Hiking trail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 300,
                color: '#0f1c2e',
                marginBottom: '1rem'
              }}>
                Fancy a day hike?
              </h2>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}>
                Put on your walking shoes and explore the sublime landscapes of the Côte d'Azur! 
                Hiking routes are proposed by regional organisations to help you discover the 
                assets of the Nice Côte d'Azur.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Italy Section - Villa Soleil Style */}
      <section className="py-32 md:py-40 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            {/* Italy Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="mx-auto">
                <ellipse cx="40" cy="30" rx="25" ry="20" stroke="#c9a962" strokeWidth="1.5" fill="none"/>
                <circle cx="32" cy="26" r="3" fill="#c9a962"/>
                <circle cx="48" cy="26" r="3" fill="#c9a962"/>
                <path d="M32 38 Q40 44 48 38" stroke="#c9a962" strokeWidth="1.5" fill="none"/>
                <ellipse cx="40" cy="12" rx="12" ry="6" stroke="#c9a962" strokeWidth="1.5" fill="none"/>
              </svg>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#777',
                marginBottom: '1.5rem'
              }}
            >
              Italy
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#0f1c2e',
                marginBottom: '1rem'
              }}
            >
              La Dolce Vita
            </motion.h2>
            {/* Wave decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none" className="mx-auto">
                <path d="M0 6C10 6 10 2 20 2C30 2 30 10 40 10C50 10 50 6 60 6" stroke="#c9a962" strokeWidth="1.5" fill="none"/>
              </svg>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}
              className="max-w-3xl mx-auto"
            >
              Savor an unforgettable day on the Italian Riviera, exploring its markets, 
              cuisine, and everything that contributes to Italy's distinctive charm.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Bordighera',
                description: 'Bordighera is not just about the beach and sea; behind the promenade lies a world to discover. Its medieval charm, villas with large parks, beautiful gardens, and stately buildings reflect the enduring mark of the English colony from the late nineteenth century.',
                image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80'
              },
              {
                name: 'San Remo',
                description: 'Sanremo is the largest city in the Riviera of Flowers, boasting beautiful beaches and numerous hidden gems. In this city, history, culture, and architecture prevail, offering plenty to see and explore.',
                image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80'
              },
              {
                name: 'Dolce acqua',
                description: 'Discover the preserved charm of this isolated valley, just minutes from the coast. The Laghetti di Rocchetta, with its pools and waterfalls, offers pure, refreshing water, perfect for relaxing in nature.',
                image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80'
              }
            ].map((place, index) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="aspect-[4/3] overflow-hidden mb-6 rounded-lg">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#0f1c2e',
                  marginBottom: '1rem'
                }}>{place.name}</h3>
                <p style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#666'
                }}>
                  {place.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
