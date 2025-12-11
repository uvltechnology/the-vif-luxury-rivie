import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/shared/Section'
import PropertyCard from '@/components/stays/PropertyCard'
import PropertyCardSkeleton from '@/components/stays/PropertyCardSkeleton'
import { properties } from '@/data/properties'
import { Button } from '@/components/ui/button'

export default function Stays() {
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [filter])

  const filters = [
    { id: 'all', label: 'All Properties' },
    { id: 'villa', label: 'Villas' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'pool', label: 'With Pool' },
    { id: 'sea-view', label: 'Sea View' }
  ]

  const filteredProperties = properties.filter((property) => {
    if (filter === 'all') return true
    if (filter === 'villa') return property.type === 'villa'
    if (filter === 'apartment') return property.type === 'apartment'
    if (filter === 'pool') return property.hasPool
    if (filter === 'sea-view') return property.hasSeaView
    return true
  })

  return (
    <div className="pt-20">
      <div className="bg-card border-b border-border">
        <Section>
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-5xl md:text-6xl font-heading font-semibold mb-4">Our Collection</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your perfect French Riviera home. Each property offers a unique perspective on Mediterranean living.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {filters.map((f, index) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.3 + index * 0.05,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <Button
                  variant={filter === f.id ? 'default' : 'outline'}
                  onClick={() => {
                    setFilter(f.id)
                    setIsLoading(true)
                  }}
                  size="sm"
                  className="relative overflow-hidden"
                >
                  {f.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </div>

      <Section>
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
              {filteredProperties.map((property, index) => (
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

        {!isLoading && filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties match your filters.</p>
            <Button variant="outline" onClick={() => setFilter('all')} className="mt-4">
              View All Properties
            </Button>
          </div>
        )}
      </Section>

      <Section className="bg-muted/30">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-semibold mb-4">Still Deciding?</h2>
          <p className="text-muted-foreground mb-6">
            We're happy to help you find the perfect property for your group size, dates, and preferences.
          </p>
          <Button asChild size="lg">
            <a href="/contact">Get Personalized Recommendations</a>
          </Button>
        </div>
      </Section>
    </div>
  )
}
