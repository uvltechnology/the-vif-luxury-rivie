import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Section from '@/components/shared/Section'
import PropertyCard from '@/components/stays/PropertyCard'
import PropertyCardSkeleton from '@/components/stays/PropertyCardSkeleton'
import { propertyApi, getImageUrl } from '@/services/api'
import { Button } from '@/components/ui/button'

// Transform API response to frontend format
const transformProperty = (apiProperty) => {
  // Check if property has pool or sea view from amenities
  const amenityNames = apiProperty.amenities?.map(a => a.name?.toLowerCase() || '') || []
  const hasPool = amenityNames.some(name => name.includes('pool'))
  const hasSeaView = amenityNames.some(name => name.includes('sea view') || name.includes('sea-view'))
  
  return {
    id: apiProperty.id,
    slug: apiProperty.slug,
    name: apiProperty.name,
    tagline: apiProperty.tagline || apiProperty.shortDescription,
    type: apiProperty.type?.toLowerCase() || 'villa',
    location: `${apiProperty.city}, ${apiProperty.region || 'French Riviera'}`,
    price: apiProperty.pricePerNight,
    bedrooms: apiProperty.bedrooms,
    bathrooms: apiProperty.bathrooms,
    capacity: apiProperty.maxGuests,
    hasPool,
    hasSeaView,
    shortDescription: apiProperty.shortDescription || apiProperty.description?.substring(0, 200),
    images: apiProperty.images?.map(img => getImageUrl(img.url)) || [],
    amenities: apiProperty.amenities?.map(a => a.name) || [],
    averageRating: apiProperty.averageRating,
    reviewCount: apiProperty._count?.reviews || 0
  }
}

export default function Stays() {
  const [filter, setFilter] = useState('all')
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 200], [0, 50])
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.3])

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await propertyApi.getAll({ limit: 50 })
        const transformedProperties = (response.data || []).map(transformProperty)
        setProperties(transformedProperties)
      } catch (err) {
        console.error('Failed to fetch properties:', err)
        setError('Failed to load properties. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProperties()
  }, [])

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
            style={{
              y: headerY,
              opacity: headerOpacity,
            }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-heading font-semibold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Collection
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Choose your perfect French Riviera home. Each property offers a unique perspective on Mediterranean living.
            </motion.p>
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
                  onClick={() => setFilter(f.id)}
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
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : (
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
        )}

        {!isLoading && !error && filteredProperties.length === 0 && (
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
