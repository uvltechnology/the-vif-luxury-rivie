import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import experiencesHeroImage from '../assets/images/The VIF Experiences Hompage/Experiences.jpg'
import villefrancheImage from '../assets/images/The VIF Experiences Hompage/Villefranche-sur-Mer.jpg'
import saintJeanImage from '../assets/images/The VIF Experiences Hompage/Pointe_Sainte-Hospice.jpg'
import ezeImage from '../assets/images/The VIF Experiences Hompage/Èze_Alpes_Maritimes_France_(261171069).jpeg'
import monacoImage from '../assets/images/The VIF Experiences Hompage/Fuerstenhof_zu_Monaco.jpg'
import cannesImage from '../assets/images/The VIF Experiences Hompage/Cannes_from_Suquet_Tower_03.jpg'
import niceImage from '../assets/images/The VIF Experiences Hompage/Nice_from_Castle_Hill_01.jpg'
import palomaBeachImage from '../assets/images/The VIF Experiences Hompage/paloma-beach-resort.jpg'
import laMalaImage from '../assets/images/The VIF Experiences Hompage/la-mala.jpg'
import plagePassableImage from '../assets/images/The VIF Experiences Hompage/Plage de Passable.jpg'
import clubDauphinImage from '../assets/images/The VIF Experiences Hompage/club-dauphin-grand-hotel.jpg'
import boatExcursionImage from '../assets/images/The VIF Experiences Hompage/claim-the-waters-by-boat.jpg'
import hikingImage from '../assets/images/The VIF Experiences Hompage/fancy-a-day-hike.png'
import bordigheraImage from '../assets/images/The VIF Experiences Hompage/bordighera-alta.jpg'
import sanRemoImage from '../assets/images/The VIF Experiences Hompage/san-remo.jpg'
import dolceAcquaImage from '../assets/images/The VIF Experiences Hompage/dolce-acqua.jpg'

const destinations = [
  {
    name: 'Villefranche-sur-mer',
    description: 'A delightful ensemble of vibrant pastel houses and winding cobblestone lanes descending to a picturesque harbor, blessed with the pristine turquoise waters that have made the Côte d\'Azur legendary.',
    image: villefrancheImage
  },
  {
    name: 'Saint-Jean-Cap-Ferrat',
    description: 'This prestigious peninsula along the Mediterranean coast is renowned for its unspoiled natural splendor, magnificent estates, and sophisticated maritime atmosphere.',
    image: saintJeanImage
  },
  {
    name: 'Eze',
    description: 'A medieval gem perched dramatically on clifftops overlooking the azure Mediterranean, this enchanting hilltop village sits majestically between St Jean Cap Ferrat and the principality of Monaco.',
    image: ezeImage
  },
  {
    name: 'Monaco',
    description: 'Discover the glamorous Monte Carlo lifestyle, where breathtaking vistas of the glittering coastline meet world-renowned sophistication and timeless luxury.',
    image: monacoImage
  },
  {
    name: 'Cannes',
    description: 'Discover the magic of Cannes, featuring its iconic boulevard along the sea, high-end boutiques, prestigious hotels, and picturesque terraces perfect for leisurely dining.',
    image: cannesImage
  },
  {
    name: 'Nice',
    description: 'A magnificent coastal city boasting world-class museums, stunning landscapes, lush green spaces, and the legendary Promenade des Anglais stretching along the Mediterranean.',
    image: niceImage
  }
]

const beachClubs = [
  {
    name: 'Paloma Beach',
    description: 'A legendary seaside destination celebrated for its exceptional service and unparalleled waterfront setting.',
    image: palomaBeachImage
  },
  {
    name: 'La Mala',
    description: 'A stunning coastal retreat nestled between dramatic cliffs, featuring elegant teak furnishings on a charming pebble shoreline.',
    image: laMalaImage
  },
  {
    name: 'Plage de Passable',
    description: 'Overlooking the stunning Villefranche bay, this beach preserves its natural, untouched beauty. An iconic destination on Cap-Ferrat...',
    image: plagePassableImage
  },
  {
    name: 'Le Club Dauphin',
    description: 'Experience refined luxury at Club Dauphin, where a sophisticated poolside terrace offers sweeping Mediterranean panoramas.',
    image: clubDauphinImage
  }
]

export default function Experiences() {
  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section - Villa Soleil Style */}
      <section className="px-4 md:px-6 pt-20 md:pt-24">
        <div className="relative w-full overflow-hidden" style={{ borderRadius: '1rem' }}>
          <img
            src={experiencesHeroImage}
            alt="French Riviera"
            className="w-full h-auto object-contain md:h-[85vh] md:object-cover"
          />
        </div>
      </section>

      {/* Embark Section - Villa Soleil Style */}
      <section className="py-16 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
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
              Set off on a journey of discovery
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
              Our villa offers immediate access to the beach, with the historic town center 
              just a short 5-minute stroll away. Within a 10 km radius, you'll discover 
              enchanting destinations including the picturesque old city of Nice, the 
              breathtaking hilltop village of Eze, and the delightful coastal town of Beaulieu-sur-Mer.
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
              Whether you're seeking a relaxing day by the sea or an elegant evening cocktail 
              with stunning ocean views, explore the finest beach clubs along the Côte d'Azur.
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
                  src={boatExcursionImage}
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
                There's nothing quite like the joy of sailing the stunning Mediterranean coastline 
                on a warm summer afternoon. Treat yourself and your loved ones to an extraordinary 
                and memorable maritime adventure along the French Riviera.
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
                  src={hikingImage}
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
                Lace up your hiking boots and venture into the breathtaking scenery of the French Riviera! 
                Local organizations offer curated trails that showcase the natural wonders and hidden 
                treasures of the Nice Côte d'Azur region.
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
                image: bordigheraImage
              },
              {
                name: 'San Remo',
                description: 'Sanremo is the largest city in the Riviera of Flowers, boasting beautiful beaches and numerous hidden gems. In this city, history, culture, and architecture prevail, offering plenty to see and explore.',
                image: sanRemoImage
              },
              {
                name: 'Dolce acqua',
                description: 'Discover the preserved charm of this isolated valley, just minutes from the coast. The Laghetti di Rocchetta, with its pools and waterfalls, offers pure, refreshing water, perfect for relaxing in nature.',
                image: dolceAcquaImage
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
