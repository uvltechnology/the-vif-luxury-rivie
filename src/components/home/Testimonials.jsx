import { useState, useEffect } from 'react'
import { Star, Quotes, Seal } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Section from '@/components/shared/Section'
import { reviewApi } from '@/services/api'
import { motion, AnimatePresence } from 'framer-motion'

// Default stats for when API is unavailable
const defaultStats = {
  averageRating: 4.9,
  totalGuests: 500,
  repeatGuestRate: 45,
  yearsHosting: 5
}

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-accent/10">
          <Quotes size={64} weight="fill" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={18} weight="fill" className="text-secondary" />
              ))}
            </div>
            {testimonial.verified && (
              <Badge variant="outline" className="gap-1 text-xs border-primary/30 text-primary">
                <Seal size={14} weight="fill" />
                Verified Stay
              </Badge>
            )}
          </div>

          <blockquote className="text-foreground mb-4 leading-relaxed">
            "{testimonial.review}"
          </blockquote>

          {testimonial.highlight && (
            <div className="mb-4 p-3 bg-accent/10 rounded-lg border-l-3 border-accent">
              <p className="text-sm italic text-foreground/90">
                {testimonial.highlight}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="font-medium text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary">{testimonial.propertyStayed}</p>
              <p className="text-xs text-muted-foreground">{testimonial.date}</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function StatsBar({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
    >
      <div className="text-center p-6 rounded-lg bg-card border border-border">
        <div className="text-3xl md:text-4xl font-heading font-semibold text-primary mb-2">
          {stats.averageRating}
        </div>
        <div className="flex justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} weight="fill" className="text-secondary" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Average Rating</p>
      </div>

      <div className="text-center p-6 rounded-lg bg-card border border-border">
        <div className="text-3xl md:text-4xl font-heading font-semibold text-primary mb-2">
          {stats.totalGuests}+
        </div>
        <p className="text-sm text-muted-foreground">Happy Guests</p>
      </div>

      <div className="text-center p-6 rounded-lg bg-card border border-border">
        <div className="text-3xl md:text-4xl font-heading font-semibold text-primary mb-2">
          {stats.repeatGuestRate}%
        </div>
        <p className="text-sm text-muted-foreground">Repeat Guests</p>
      </div>

      <div className="text-center p-6 rounded-lg bg-card border border-border">
        <div className="text-3xl md:text-4xl font-heading font-semibold text-primary mb-2">
          {stats.yearsHosting}+
        </div>
        <p className="text-sm text-muted-foreground">Years Hosting</p>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [stats, setStats] = useState(defaultStats)
  const [showAll, setShowAll] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await reviewApi.getAll({ limit: 10 })
        const reviews = response.data || []
        
        // Transform API reviews to testimonials format
        const transformedTestimonials = reviews.map(review => ({
          id: review.id,
          name: review.guestName || 'Guest',
          location: review.guestCountry || 'International',
          rating: review.rating || 5,
          review: review.comment || '',
          highlight: review.highlight,
          propertyStayed: review.property?.name || 'VIF Property',
          date: new Date(review.stayDate || review.createdAt).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          }),
          verified: true
        }))
        
        setTestimonials(transformedTestimonials)
        
        // Calculate stats from reviews
        if (reviews.length > 0) {
          const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length
          setStats(prev => ({ ...prev, averageRating: avgRating.toFixed(1) }))
        }
      } catch (err) {
        console.error('Failed to fetch testimonials:', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTestimonials()
  }, [])
  
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3)

  return (
    <Section className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">
          Guest Experiences
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Don't just take our word for it—hear from the guests who have made unforgettable memories at The VIF.
        </p>
      </motion.div>

      <StatsBar stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <AnimatePresence mode="sync">
          {displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {!showAll && testimonials.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Read More Reviews
          </button>
        </motion.div>
      )}
    </Section>
  )
}
