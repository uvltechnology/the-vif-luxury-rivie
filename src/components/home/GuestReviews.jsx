import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { reviewApi } from '@/services/api'

const defaultTestimonials = [
  {
    id: 1,
    quote: "The place is impeccable. Words cannot possibly describe how superb the location is, the incredible ambience on the main terrace where the pool also is, and how stylist the internal décor is.",
    name: "Eileen Holden",
    location: "from England",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
  },
  {
    id: 2,
    quote: "An absolutely stunning property with breathtaking views. The attention to detail and the level of service exceeded all our expectations. A truly magical experience.",
    name: "Jean-Pierre Dubois",
    location: "from France",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
  },
  {
    id: 3,
    quote: "We've stayed at many luxury villas around the world, but The VIF is truly special. The combination of elegance, comfort, and that incredible Mediterranean view is unmatched.",
    name: "Michael Chen",
    location: "from Singapore",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
  }
]

export default function GuestReviews() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewApi.getAll()
        const reviews = response.data || []
        
        if (reviews.length > 0) {
          const transformedTestimonials = reviews.map(review => ({
            id: review.id,
            quote: review.comment || '',
            name: review.guestName || 'Guest',
            location: `from ${review.guestCountry || 'International'}`,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
          }))
          setTestimonials(transformedTestimonials)
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err)
      }
    }
    
    fetchReviews()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-24 md:py-32 bg-[#faf8f5] relative">
      {/* Left Arrow - Villa Soleil Style */}
      <button 
        onClick={prevSlide}
        className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors bg-white/80"
        aria-label="Previous review"
      >
        <ArrowLeft size={20} weight="light" style={{ color: '#333' }} />
      </button>

      {/* Right Arrow - Villa Soleil Style */}
      <button 
        onClick={nextSlide}
        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors bg-white/80"
        aria-label="Next review"
      >
        <ArrowRight size={20} weight="light" style={{ color: '#333' }} />
      </button>

      <div className="max-w-3xl mx-auto px-20 text-center">
        {/* Section Label - Villa Soleil Style */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#777'
          }}
          className="mb-10"
        >
          Guest Reviews
        </motion.p>

        {/* Testimonial */}
        <div className="min-h-[280px] flex flex-col items-center justify-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <blockquote 
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 400,
                lineHeight: 1.5,
                fontStyle: 'italic',
                color: '#0f1c2e',
                marginBottom: '2.5rem'
              }}
            >
              "{currentTestimonial.quote}"
            </blockquote>
            
            {/* Avatar */}
            <div className="mb-4">
              <img 
                src={currentTestimonial.avatar} 
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-white shadow-md"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <div>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.02em',
                color: '#0f1c2e'
              }}>
                {currentTestimonial.name}
              </p>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '14px',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#c9a962'
              }}>
                {currentTestimonial.location}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-2 h-2 rounded-full transition-colors"
              style={{
                backgroundColor: index === currentIndex ? '#0f1c2e' : 'rgba(0,0,0,0.2)'
              }}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
