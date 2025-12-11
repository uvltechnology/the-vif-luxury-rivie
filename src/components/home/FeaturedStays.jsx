import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import Section from '@/components/shared/Section'
import PropertyCard from '@/components/stays/PropertyCard'
import PropertyCardSkeleton from '@/components/stays/PropertyCardSkeleton'
import { properties } from '@/data/properties'
import { motion } from 'framer-motion'

export default function FeaturedStays() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <Section>
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">Our Stays</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Each property is hand-selected for its character, views, and proximity to the best the Riviera offers.
          </p>
        </div>
        <Button asChild variant="ghost" className="hidden md:flex">
          <Link to="/stays">
            Browse All
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <PropertyCardSkeleton />
              </motion.div>
            ))}
          </>
        ) : (
          <>
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </>
        )}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Button asChild variant="outline">
          <Link to="/stays">
            Browse All Stays
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </Button>
      </div>
    </Section>
  )
}
