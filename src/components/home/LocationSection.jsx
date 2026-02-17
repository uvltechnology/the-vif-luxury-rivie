import { motion } from 'framer-motion'

// Import local location image
import locationImage from '@/assets/images/The VIF Experiences Hompage/Villefranche-sur-Mer.jpg'

export default function LocationSection() {
  return (
    <section className="py-24 md:py-32 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Map Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-square lg:aspect-[4/5] overflow-hidden"
          >
            <img
              src={locationImage}
              alt="Villefranche-sur-Mer - French Riviera"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          {/* Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section Label */}
            <p 
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c9a962',
                marginBottom: '1.5rem'
              }}
            >
              Location
            </p>
            
            {/* Heading */}
            <h2 
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 500,
                lineHeight: 1.2,
                color: '#0f1c2e',
                marginBottom: '1.5rem'
              }}
            >
              Nestled amidst<br />breathtaking natural<br />beauty
            </h2>
            
            {/* Wave Decoration */}
            <div className="mb-6">
              <svg width="50" height="10" viewBox="0 0 50 10" fill="none">
                <path d="M0 5C8 5 8 2 16 2C24 2 24 8 32 8C40 8 40 5 50 5" stroke="#c9a962" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            
            {/* Description */}
            <p 
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}
            >
              Perched on the hillside, the villa offers a breathtaking 
              panoramic view of the bay of Villefranche-sur-mer. 
              Surrounded by lush greenery and vibrant flowers, our villa 
              provides a tranquil retreat, perfect for immersing yourself in 
              the charm of the French Riviera.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
