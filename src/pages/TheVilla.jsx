import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Quotes } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import villaHeroImage from '../assets/images/The Villa Homepage/The VILLAS..jpg'
import discoverImage from '../assets/images/The Villa Homepage/The Villa Homepage 1st Image.jpg'
import indoorImage from '../assets/images/The Villa Homepage/The Villa Homepage 2nd Image.jpg'
import outdoorImage from '../assets/images/The Villa Homepage/The Villa Homepage 3rd Image.jpg'

// Villa Rocsea Photos
import rocsea1 from '../assets/images/The VIF Gallery/Rocsea/Portrait/Rocsea30L.jpg'
import rocsea2 from '../assets/images/The VIF Gallery/Rocsea/Portrait/Rocsea19L.jpg'
import rocsea3 from '../assets/images/The VIF Gallery/Rocsea/Portrait/Rocsea24L.jpg'
import rocsea4 from '../assets/images/The VIF Gallery/Rocsea/Portrait/Rocsea31L.jpg'

// Villa Bellevue Photos
import bellevue1 from '../assets/images/The VIF Gallery/Bellevue/Landscape/Bellevue9L.jpg'
import bellevue2 from '../assets/images/The VIF Gallery/Bellevue/Landscape/Bellevue1L.jpg'
import bellevue3 from '../assets/images/The VIF Gallery/Bellevue/Landscape/Bellevue3L.jpg'
import bellevue4 from '../assets/images/The VIF Gallery/Bellevue/Landscape/Bellevue7L.jpg'

export default function TheVilla() {
  const { t } = useTranslation()
  
  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section - Villa Soleil Style */}
      <section className="px-4 md:px-6 pt-20 md:pt-24">
        <div className="relative w-full overflow-hidden" style={{ borderRadius: '1rem' }}>
          <img
            src={villaHeroImage}
            alt="The VIF Villa"
            className="w-full h-auto object-contain md:h-[85vh] md:object-cover"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 md:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif italic text-[#1a1a1a]"
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              lineHeight: 1.8,
              fontWeight: 400
            }}
          >
            {t('villas.quote')}
          </motion.blockquote>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#777',
              marginTop: '2rem'
            }}
          >
            {t('villas.team')}
          </motion.p>
        </div>
      </section>

      {/* Villas Showcase Section - Gallery Preview */}
      <section className="py-16 md:py-32 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 300,
                color: '#0f1c2e',
                marginBottom: '1rem'
              }}
            >
              {t('villas.title')}
            </motion.h2>
            <div className="w-24 h-px bg-[#c9a96e] mx-auto opacity-50" />
          </div>

          {/* Villa Rocsea Gallery */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-10"
            >
              <h3 style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif", 
                fontSize: '2.5rem', 
                fontWeight: 300, 
                color: '#0f1c2e',
                letterSpacing: '0.05em'
              }}>
                Villa Rocsea
              </h3>
              <Link 
                to="/gallery" 
                className="text-xs uppercase tracking-[0.2em] text-[#777] hover:text-[#c9a96e] transition-colors border-b border-[#777]/30 pb-1"
              >
                {t('villas.viewFullGallery')}
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[rocsea1, rocsea2, rocsea3, rocsea4].map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to="/gallery" className="block relative aspect-[4/3] overflow-hidden rounded-lg group shadow-sm hover:shadow-xl transition-shadow duration-500">
                    <img
                      src={photo}
                      alt={`Villa Rocsea preview ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-white text-[10px] uppercase tracking-[0.3em] border border-white/50 px-6 py-3 bg-black/20 backdrop-blur-sm">{t('villas.exploreGallery')}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Villa Bellevue Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-10"
            >
              <h3 style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif", 
                fontSize: '2.5rem', 
                fontWeight: 300, 
                color: '#0f1c2e',
                letterSpacing: '0.05em'
              }}>
                Villa Bellevue
              </h3>
              <Link 
                to="/gallery" 
                className="text-xs uppercase tracking-[0.2em] text-[#777] hover:text-[#c9a96e] transition-colors border-b border-[#777]/30 pb-1"
              >
                {t('villas.viewFullGallery')}
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[bellevue1, bellevue2, bellevue3, bellevue4].map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to="/gallery" className="block relative aspect-[4/3] overflow-hidden rounded-lg group shadow-sm hover:shadow-xl transition-shadow duration-500">
                    <img
                      src={photo}
                      alt={`Villa Bellevue preview ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-white text-[10px] uppercase tracking-[0.3em] border border-white/50 px-6 py-3 bg-black/20 backdrop-blur-sm">{t('villas.exploreGallery')}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Villa Soleil Style */}
      <section className="py-16 md:py-32 lg:py-40 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#777',
                marginBottom: '1.5rem'
              }}>
                {t('villas.ourStory.label')}
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#0f1c2e',
                marginBottom: '2rem'
              }}>
                {t('villas.ourStory.title')}
              </h2>
              <div className="space-y-6" style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}>
                <p>
                  {t('villas.ourStory.desc1')}
                </p>
                <p>
                  {t('villas.ourStory.desc2')}
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={discoverImage}
                alt="Villa interior"
                className="w-full h-auto object-contain"
                style={{ borderRadius: '16px' }}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Indoor Amenities Section - Villa Soleil Style */}
      <section className="bg-[#faf8f5] py-4 md:py-6 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[600px] gap-4">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] lg:h-full overflow-hidden"
            style={{ borderRadius: '1rem' }}
          >
            <img
              src={indoorImage}
              alt="Indoor amenities"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
          
          {/* Right - Text Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0f1c2e] flex items-center justify-center p-8 md:p-12 lg:p-20 h-auto lg:h-full"
            style={{ borderRadius: '1rem' }}
          >
            <div className="max-w-md">
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.2,
                color: '#c9a96e',
                marginBottom: '1.5rem'
              }}>
                {t('villas.indoor.title')}
              </h2>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#a0a0a0',
                marginBottom: '2rem'
              }}>
                {t('villas.indoor.desc')}
              </p>
              <Link
                to="/gallery"
                style={{
                  display: 'inline-block',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  padding: '14px 28px',
                  border: '1px solid #ffffff',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#ffffff'
                  e.target.style.color = '#0f1c2e'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#ffffff'
                }}
              >
                {t('villas.indoor.moreInfo')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Outdoor Amenities Section - Villa Soleil Style */}
      <section className="bg-[#faf8f5] py-4 md:py-6 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[600px] gap-4">
          {/* Left - Text Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0f1c2e] flex items-center justify-center p-8 md:p-12 lg:p-20 order-2 lg:order-1 h-auto lg:h-full"
            style={{ borderRadius: '1rem' }}
          >
            <div className="max-w-md">
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.2,
                color: '#c9a96e',
                marginBottom: '1.5rem'
              }}>
                {t('villas.outdoor.title')}
              </h2>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#a0a0a0',
                marginBottom: '2rem'
              }}>
                {t('villas.outdoor.desc')}
              </p>
              <Link
                to="/gallery"
                style={{
                  display: 'inline-block',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  padding: '14px 28px',
                  border: '1px solid #ffffff',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#ffffff'
                  e.target.style.color = '#0f1c2e'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#ffffff'
                }}
              >
                {t('villas.outdoor.moreInfo')}
              </Link>
            </div>
          </motion.div>
          
          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[300px] lg:h-full order-1 lg:order-2 overflow-hidden"
            style={{ borderRadius: '1rem' }}
          >
            <img
              src={outdoorImage}
              alt="Outdoor amenities"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
