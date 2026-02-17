import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'

// Import local villa images
import slide1 from '@/assets/images/The VIF Gallery/1.jpg'
import slide2 from '@/assets/images/The VIF Gallery/2.jpg'
import slide3 from '@/assets/images/The VIF Gallery/3.jpg'
import slide4 from '@/assets/images/The VIF Gallery/4.jpg'
import slide5 from '@/assets/images/The VIF Gallery/5.jpg'
import villaImage from '@/assets/images/The Villa Homepage/The Villa Homepage 1st Image.jpg'
import experiencesImage from '@/assets/images/The VIF Experiences Hompage/Experiences.jpg'

const slides = [
  {
    image: slide1,
    alt: 'Luxury villa exterior'
  },
  {
    image: slide2,
    alt: 'Villa pool view'
  },
  {
    image: slide3,
    alt: 'Villa interior'
  },
  {
    image: slide4,
    alt: 'Villa terrace'
  },
  {
    image: slide5,
    alt: 'Sea view from villa'
  }
]

export default function FeaturedCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="bg-[#faf8f5]">
      {/* Full-Width Image Carousel - Villa Soleil Style */}
      <div className="relative w-full">
        <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 1.05
              }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </motion.div>
          ))}
          
          {/* Left Arrow - Villa Soleil Style */}
          <button 
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
            aria-label="Previous slide"
          >
            <ArrowLeft size={28} weight="light" />
          </button>
          
          {/* Right Arrow - Villa Soleil Style */}
          <button 
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
            aria-label="Next slide"
          >
            <ArrowRight size={28} weight="light" />
          </button>
          
          {/* Slide Indicator - Villa Soleil Style */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white">
            <button 
              onClick={prevSlide}
              className="hover:opacity-70 transition-opacity"
              aria-label="Previous slide"
            >
              <ArrowLeft size={16} weight="light" />
            </button>
            <span style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.05em'
            }}>
              Slide {currentSlide + 1} of {slides.length}.
            </span>
            <button 
              onClick={nextSlide}
              className="hover:opacity-70 transition-opacity"
              aria-label="Next slide"
            >
              <ArrowRight size={16} weight="light" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards - Villa Soleil Style with Image Overlay */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Discover the Villa Card */}
        <Link to="/the-villa" className="group relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <img
              src={villaImage}
              alt="Villa exterior"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            {/* Gold/Orange Overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(201, 169, 98, 0.85) 0%, rgba(201, 169, 98, 0.4) 50%, transparent 100%)'
              }}
            />
            {/* Text Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 400,
                  color: '#fff',
                  marginBottom: '0.75rem'
                }}
              >
                Discover the Villa
              </h3>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.9)'
              }}>
                With its breathtaking sea views and elegant design, this villa offers 
                an unforgettable coastal living experience.
              </p>
            </div>
            {/* Arrow Button */}
            <div className="absolute bottom-8 right-8">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ArrowRight size={20} weight="light" style={{ color: '#0f1c2e' }} />
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Experiences Card */}
        <Link to="/experiences" className="group relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <img
              src={experiencesImage}
              alt="French Riviera experiences"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            {/* Text Content - positioned at bottom left */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 400,
                  color: '#fff',
                  marginBottom: '0.5rem'
                }}
              >
                Experiences are just<br />around the corner
              </h3>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.9)'
              }}>
                Experience all that the villa and its surroundings have to offer
              </p>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  )
}
