import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import Section from '@/components/shared/Section'
import PropertyCard from '@/components/stays/PropertyCard'
import PropertyCardSkeleton from '@/components/stays/PropertyCardSkeleton'
import { propertyApi, getImageUrl } from '@/services/api'
import { motion } from 'framer-motion'

// Transform API response to frontend format
const transformProperty = (apiProperty) => {
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
  }
}

export default function FeaturedStays() {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await propertyApi.getAll({ featured: true, limit: 3 })
        const transformedProperties = (response.data || []).map(transformProperty)
        setProperties(transformedProperties)
      } catch (err) {
        console.error('Failed to fetch featured properties:', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProperties()
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
