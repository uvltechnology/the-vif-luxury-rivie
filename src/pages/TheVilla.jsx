import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Quotes } from '@phosphor-icons/react'

export default function TheVilla() {
  const amenities = [
    'Heated infinity pool',
    'Panoramic sea views',
    'Modern equipped kitchen',
    'Air conditioning throughout',
    'High-speed WiFi',
    'Private parking',
    'Landscaped gardens',
    'Outdoor dining terrace',
    'Sun loungers',
    'Daily housekeeping',
    'Concierge service',
    'Private chef available'
  ]

  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section - Villa Soleil Style with HUGE text */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
            alt="The VIF Villa"
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
            className="font-serif tracking-wide"
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              fontWeight: 300,
              lineHeight: 1,
              color: '#ffffff',
              textShadow: '0 2px 40px rgba(0,0,0,0.2)'
            }}
          >
            The villa
          </h1>
        </motion.div>
      </section>

      {/* Quote Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
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
            "Every corner of our villa has been crafted with care to ensure a memorable 
            and enchanting experience. We invite you to relax, unwind, and create beautiful 
            memories in this exquisite sanctuary"
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
      <section className="py-32 md:py-40 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                  Step into the enchanting world of The VIF, a charming and authentic villa 
                  on the French Riviera. The VIF has undergone a remarkable transformation 
                  to bring it to its current glory with modern amenities such as a heated 
                  swimming pool, landscaped gardens, and a stylish open-plan kitchen.
                </p>
                <p>
                  Guest comfort is optimal, with comfortable bedrooms and beautiful, 
                  light-filled bathrooms. The interior of the villa is inviting, with 
                  cozy décor, breathtaking views, and spacious rooms.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-[4/3] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Villa interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities Section - Villa Soleil Style */}
      <section className="py-32 md:py-40 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
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
              The Villa
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#0f1c2e',
                marginBottom: '1.5rem'
              }}
            >
              Amenities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}
              className="max-w-2xl mx-auto"
            >
              The villa can comfortably accommodate up to 8-10 guests, with each of the 
              four bedrooms featuring walk-in dressing rooms and ensuite bathrooms.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {amenities.map((amenity, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-[#f5f0e8]"
              >
                <p style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#0f1c2e'
                }}>{amenity}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
