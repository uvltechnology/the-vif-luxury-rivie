import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Quotes } from '@phosphor-icons/react'
import villaHeroImage from '../assets/images/The Villa Homepage/The VILLA.jpg'
import discoverImage from '../assets/images/The Villa Homepage/The Villa Homepage 1st Image.jpg'
import indoorImage from '../assets/images/The Villa Homepage/The Villa Homepage 2nd Image.jpg'
import outdoorImage from '../assets/images/The Villa Homepage/The Villa Homepage 3rd Image.jpg'

export default function TheVilla() {
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
            "Each detail of our villa has been thoughtfully designed to offer an unforgettable 
            and captivating retreat. We welcome you to rest, rejuvenate, and craft cherished 
            moments in this exceptional haven"
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
            — The VIF Team
          </motion.p>
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
                Our Story
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#0f1c2e',
                marginBottom: '2rem'
              }}>
                Discover The VIF
              </h2>
              <div className="space-y-6" style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}>
                <p>
                  Welcome to The VIF, an elegant and authentic retreat nestled along 
                  the stunning French Riviera. Beautifully renovated to blend timeless 
                  charm with contemporary luxury, the villa features a heated pool, 
                  manicured gardens, and a sophisticated open-concept kitchen.
                </p>
                <p>
                  Every detail has been curated for your comfort—plush bedrooms, 
                  sun-drenched bathrooms, warm interiors, stunning panoramas, and 
                  generous living spaces await you.
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
                Indoor amenities
              </h2>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#a0a0a0',
                marginBottom: '2rem'
              }}>
                Step inside to discover a warm and welcoming atmosphere, featuring elegant furnishings, stunning vistas and generously proportioned living spaces.
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
                More Info
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
                Outdoor amenities
              </h2>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#a0a0a0',
                marginBottom: '2rem'
              }}>
                From the classic architectural details to the beautifully landscaped grounds, every aspect radiates sophistication and warmth, offering the perfect backdrop for cherished moments.
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
                More Info
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
