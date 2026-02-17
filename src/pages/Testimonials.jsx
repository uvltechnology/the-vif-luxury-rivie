import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quotes } from '@phosphor-icons/react'
import { reviewApi } from '@/services/api'

const defaultReviews = [
  {
    id: 1,
    quote: "The place is impeccable. Words cannot possibly describe how superb the location is, the incredible ambience on the main terrace where the pool also is, and how stylish the internal décor is.",
    name: "Sarah Mitchell",
    location: "England",
    rating: 5,
    date: "August 2025"
  },
  {
    id: 2,
    quote: "An absolutely stunning property with breathtaking views. The attention to detail and the level of service exceeded all our expectations. A truly magical experience on the French Riviera.",
    name: "Jean-Pierre Dubois",
    location: "France",
    rating: 5,
    date: "July 2025"
  },
  {
    id: 3,
    quote: "We've stayed at many luxury villas around the world, but The VIF is truly special. The combination of elegance, comfort, and that incredible Mediterranean view is unmatched.",
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    date: "June 2025"
  },
  {
    id: 4,
    quote: "From the moment we arrived, we knew this was going to be a special vacation. The villa exceeded every expectation. The pool area is magnificent and the sunsets are unforgettable.",
    name: "Emma & James",
    location: "United States",
    rating: 5,
    date: "May 2025"
  },
  {
    id: 5,
    quote: "Pure perfection. The villa is beautifully maintained, the views are spectacular, and the location is ideal for exploring the Riviera. We will definitely be returning.",
    name: "Alessandro Rossi",
    location: "Italy",
    rating: 5,
    date: "April 2025"
  },
  {
    id: 6,
    quote: "A dream come true! The property photos don't do it justice. Every room is thoughtfully designed and the outdoor spaces are perfect for relaxing and entertaining.",
    name: "Charlotte van der Berg",
    location: "Netherlands",
    rating: 5,
    date: "March 2025"
  }
]

export default function Testimonials() {
  const [reviews, setReviews] = useState(defaultReviews)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewApi.getAll()
        const apiReviews = response.data || []
        
        if (apiReviews.length > 0) {
          const transformedReviews = apiReviews.map(review => ({
            id: review.id,
            quote: review.comment || '',
            name: review.guestName || 'Guest',
            location: review.guestCountry || 'International',
            rating: review.rating || 5,
            date: new Date(review.stayDate || review.createdAt).toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })
          }))
          setReviews(transformedReviews)
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err)
      }
    }
    
    fetchReviews()
  }, [])

  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
            alt="Guest Reviews"
            className="w-full h-full object-cover"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white"
        >
          <h1 className="font-heading text-5xl md:text-7xl font-light tracking-wide">
            Guest Reviews
          </h1>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6"
          >
            Testimonials
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-light mb-8"
          >
            What our guests say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground leading-relaxed"
          >
            Authentic stories from travelers who discovered the magic of the French Riviera 
            at The VIF. We're honored to have hosted guests from around the world.
          </motion.p>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} weight="fill" className="text-[#c9a962]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-heading text-lg font-light leading-relaxed mb-6 italic">
                  "{review.quote}"
                </blockquote>

                {/* Author */}
                <div className="pt-6 border-t border-border">
                  <p className="font-medium text-sm">{review.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {review.location} • {review.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[#0f1c2e] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Quotes size={48} weight="light" className="mx-auto text-white/30 mb-8" />
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-light mb-8"
          >
            Ready to create your own memories?
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href="/contact"
              className="inline-block px-10 py-4 border border-white/30 text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0f1c2e] transition-all duration-300"
            >
              Book Your Stay
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
