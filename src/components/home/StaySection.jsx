import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Import local villa images
import indoorImage from '@/assets/images/The Villa Homepage/The Villa Homepage 2nd Image.jpg'
import outdoorImage from '@/assets/images/The Villa Homepage/The Villa Homepage 3rd Image.jpg'

export default function StaySection() {
  return (
    <section className="py-32 md:py-40 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header - Villa Soleil Style */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#777'
            }}
            className="mb-8"
          >
            Stay
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#0f1c2e'
            }}
          >
            Discover an understated elegance
          </motion.h2>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Indoor Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white group"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={indoorImage}
                alt="Indoor amenities"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-8">
              <h3 
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.75rem)',
                  fontWeight: 300,
                  color: '#0f1c2e',
                  marginBottom: '1rem'
                }}
              >
                Indoor amenities
              </h3>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#666',
                marginBottom: '1.5rem'
              }}>
                The VIF can accommodate eight to ten guests in utmost luxury, with an 
                additional double room for staff. The spacious rooms are impeccably designed 
                and offer spectacular sea views.
              </p>
              <Link 
                to="/the-villa" 
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#0f1c2e',
                  borderBottom: '1px solid #0f1c2e',
                  paddingBottom: '2px'
                }}
                className="hover:opacity-70 transition-opacity"
              >
                More Info
              </Link>
            </div>
          </motion.div>

          {/* Outdoor Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white group"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={outdoorImage}
                alt="Outdoor amenities"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-8">
              <h3 
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.75rem)',
                  fontWeight: 300,
                  color: '#0f1c2e',
                  marginBottom: '1rem'
                }}
              >
                Outdoor amenities
              </h3>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#666',
                marginBottom: '1.5rem'
              }}>
                Every element, from the timeless architecture to the carefully curated gardens, 
                evokes a sense of elegance and charm, making it an idyllic setting for creating 
                unforgettable memories.
              </p>
              <Link 
                to="/the-villa" 
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#0f1c2e',
                  borderBottom: '1px solid #0f1c2e',
                  paddingBottom: '2px'
                }}
                className="hover:opacity-70 transition-opacity"
              >
                More Info
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
