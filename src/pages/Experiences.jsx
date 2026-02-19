import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/hooks/useTranslation'
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

export default function Experiences() {
  const { t } = useTranslation()
  
  const destinations = [
    { key: 'villefranche', image: villefrancheImage },
    { key: 'saintJean', image: saintJeanImage },
    { key: 'eze', image: ezeImage },
    { key: 'monaco', image: monacoImage },
    { key: 'cannes', image: cannesImage },
    { key: 'nice', image: niceImage }
  ]

  const beachClubs = [
    { key: 'paloma', image: palomaBeachImage },
    { key: 'laMala', image: laMalaImage },
    { key: 'passable', image: plagePassableImage },
    { key: 'dauphin', image: clubDauphinImage }
  ]

  const italianDestinations = [
    { key: 'bordighera', image: bordigheraImage },
    { key: 'sanRemo', image: sanRemoImage },
    { key: 'dolceAcqua', image: dolceAcquaImage }
  ]

  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section - Villa Soleil Style */}
      <section className="px-4 md:px-6 pt-20 md:pt-24">
        <div className="relative w-full overflow-hidden" style={{ borderRadius: '1rem' }}>
          <img
            src={experiencesHeroImage}
            alt="French Riviera"
            className="w-full h-auto object-contain md:h-[85vh] md:object-cover"
            decoding="async"
            fetchPriority="high"
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
              {t('experiences.page.journeyTitle')}
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
              {t('experiences.page.journeyDesc')}
            </motion.p>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden mb-6">
                  <img
                    src={destination.image}
                    alt={t(`experiences.page.destinations.${destination.key}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: '#0f1c2e',
                  marginBottom: '0.75rem'
                }}>{t(`experiences.page.destinations.${destination.key}.name`)}</h3>
                <p style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#666'
                }}>
                  {t(`experiences.page.destinations.${destination.key}.desc`)}
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
              {t('experiences.page.beachClubsTitle')}
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
              {t('experiences.page.beachClubsDesc')}
            </motion.p>
          </div>

          {/* Beach Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beachClubs.map((club, index) => (
              <motion.div
                key={club.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-square overflow-hidden mb-4">
                  <img
                    src={club.image}
                    alt={t(`experiences.page.beachClubs.${club.key}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.125rem',
                  fontWeight: 400,
                  color: '#0f1c2e',
                  marginBottom: '0.5rem'
                }}>{t(`experiences.page.beachClubs.${club.key}.name`)}</h3>
                <p style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '13px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#666'
                }}>
                  {t(`experiences.page.beachClubs.${club.key}.desc`)}
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
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 300,
                color: '#0f1c2e',
                marginBottom: '1rem'
              }}>
                {t('experiences.page.boatTitle')}
              </h2>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}>
                {t('experiences.page.boatDesc')}
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
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 300,
                color: '#0f1c2e',
                marginBottom: '1rem'
              }}>
                {t('experiences.page.hikingTitle')}
              </h2>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}>
                {t('experiences.page.hikingDesc')}
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
              {t('experiences.page.italyLabel')}
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
              {t('experiences.page.italyTitle')}
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
              {t('experiences.page.italyDesc')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {italianDestinations.map((place, index) => (
              <motion.div
                key={place.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="aspect-[4/3] overflow-hidden mb-6 rounded-lg">
                  <img
                    src={place.image}
                    alt={t(`experiences.page.italianDestinations.${place.key}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#0f1c2e',
                  marginBottom: '1rem'
                }}>{t(`experiences.page.italianDestinations.${place.key}.name`)}</h3>
                <p style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#666'
                }}>
                  {t(`experiences.page.italianDestinations.${place.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
