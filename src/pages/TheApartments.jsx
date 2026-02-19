import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Waves, MapPin, SwimmingPool, TennisBall, Car, WifiHigh, ThermometerCold, CookingPot } from '@phosphor-icons/react'
import { useTranslation } from '@/hooks/useTranslation'
import apartmentsHeroImage from '../assets/images/The Apartments Homepage/The VIF Apartments.jpg'

export default function TheApartments() {
  const { t } = useTranslation()
  
  const highlights = [
    { icon: <SwimmingPool size={32} weight="light" />, titleKey: "apartments.highlights.pool", descKey: "apartments.highlights.poolDesc" },
    { icon: <TennisBall size={32} weight="light" />, titleKey: "apartments.highlights.tennis", descKey: "apartments.highlights.tennisDesc" },
    { icon: <Waves size={32} weight="light" />, titleKey: "apartments.highlights.views", descKey: "apartments.highlights.viewsDesc" },
    { icon: <Car size={32} weight="light" />, titleKey: "apartments.highlights.parking", descKey: "apartments.highlights.parkingDesc" }
  ]

  const amenities = [
    { icon: <CookingPot size={20} />, labelKey: "apartments.amenities.kitchen" },
    { icon: <WifiHigh size={20} />, labelKey: "apartments.amenities.wifi" },
    { icon: <ThermometerCold size={20} />, labelKey: "apartments.amenities.ac" },
    { icon: <Waves size={20} />, labelKey: "apartments.amenities.terrace" },
    { icon: <Car size={20} />, labelKey: "apartments.amenities.parking" },
    { icon: <MapPin size={20} />, labelKey: "apartments.amenities.beach" }
  ]

  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section */}
      <section className="px-4 md:px-6 pt-20 md:pt-24">
        <div className="relative w-full overflow-hidden" style={{ borderRadius: '1rem' }}>
          <img
            src={apartmentsHeroImage}
            alt="The VIF Apartments"
            className="w-full h-auto object-contain md:h-[80vh] md:object-cover"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#c9a96e] mb-6 font-medium">{t('apartments.subtitle')}</p>
              <h2 style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif", 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                fontWeight: 300, 
                lineHeight: 1.1,
                color: '#0f1c2e'
              }} className="mb-8">
                {t('apartments.title')}
              </h2>
              <div className="space-y-6 text-[#555] leading-relaxed font-light text-lg">
                <p>
                  {t('apartments.description')}
                </p>
                <p>
                  {t('apartments.descriptionMore')}
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="bg-[#0f1c2e] p-8 rounded-2xl text-white aspect-square flex flex-col justify-end">
                  <span className="text-4xl font-serif mb-2">15</span>
                  <span className="text-xs uppercase tracking-widest opacity-60">{t('apartments.infoBoxes.minsToMonaco')}</span>
                </div>
                <div className="bg-[#f5f0e8] p-8 rounded-2xl aspect-[4/5] flex flex-col justify-between">
                  <Waves size={32} className="text-[#c9a96e]" />
                  <span className="text-sm font-light text-[#0f1c2e]">{t('apartments.infoBoxes.mediterraneanViews')}</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm aspect-[4/5] flex flex-col justify-between border border-[#eee]">
                  <SwimmingPool size={32} className="text-[#c9a96e]" />
                  <span className="text-sm font-light text-[#0f1c2e]">{t('apartments.infoBoxes.sharedPool')}</span>
                </div>
                <div className="bg-[#c9a96e] p-8 rounded-2xl text-white aspect-square flex flex-col justify-end">
                  <span className="text-4xl font-serif mb-2">20</span>
                  <span className="text-xs uppercase tracking-widest opacity-80">{t('apartments.infoBoxes.minsToNice')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#faf8f5] text-[#c9a962] mb-6">
                  {item.icon}
                </div>
                <h4 className="font-serif text-xl mb-3 text-[#0f1c2e]">{t(item.titleKey)}</h4>
                <p className="text-sm text-[#777] leading-relaxed px-4">{t(item.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details & Amenities */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#0f1c2e] text-white p-12 md:p-20 rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a962] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#c9a962',
                marginBottom: '4rem',
                textAlign: 'center'
              }}
            >
              {t('apartments.facilities')}
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 group hover:border-[#c9a962]/30 transition-colors duration-300">
                  <span className="text-[#c9a962] group-hover:scale-110 transition-transform duration-300">
                    {amenity.icon}
                  </span>
                  <span style={{ 
                    fontFamily: "'Lato', sans-serif", 
                    fontSize: '14px', 
                    fontWeight: 300, 
                    letterSpacing: '0.05em',
                    color: 'rgba(255,255,255,0.8)' 
                  }}>
                    {t(amenity.labelKey)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link 
                to="/contact" 
                style={{
                  display: 'inline-block',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  padding: '16px 40px',
                  backgroundColor: '#c9a962',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#ffffff'
                  e.target.style.color = '#0f1c2e'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#c9a962'
                  e.target.style.color = '#ffffff'
                }}
              >
                {t('apartments.bookStay')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
