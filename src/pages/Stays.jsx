import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { propertyApi, getImageUrl } from '@/services/api'
import { Bed, Users, SwimmingPool, Eye } from '@phosphor-icons/react'
import rocseaVillaImage from '@/assets/images/The VIF Gallery/Rocsea/Portrait/Rocsea30L.jpg'
import bellevueVillaImage from '@/assets/images/The VIF Gallery/Bellevue/Landscape/Bellevue9L.jpg'

// Transform API response to frontend format
const transformProperty = (apiProperty) => {
  const amenityNames = apiProperty.amenities?.map(a => a.name?.toLowerCase() || '') || []
  const hasPool = amenityNames.some(name => name.includes('pool'))
  const hasSeaView = amenityNames.some(name => name.includes('sea view') || name.includes('sea-view'))
  
  let mainImage = apiProperty.images && apiProperty.images[0] ? getImageUrl(apiProperty.images[0].url) : null

  // Override images for specific villas as requested
  if (apiProperty.name === 'Villa Rocsea' || apiProperty.slug === 'villa-rocsea') {
    mainImage = rocseaVillaImage
  } else if (apiProperty.name === 'Villa Bellevue' || apiProperty.slug === 'villa-bellevue') {
    mainImage = bellevueVillaImage
  }
  
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
    images: [mainImage, ...(apiProperty.images?.slice(1).map(img => getImageUrl(img.url)) || [])],
    amenities: apiProperty.amenities?.map(a => a.name) || []
  }
}

export default function Stays() {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true)
      try {
        const response = await propertyApi.getAll({ limit: 50 })
        const apiData = response.data || response || []
        let transformedProperties = apiData.map(transformProperty)
        
        // Fallback for missing properties in API
        if (!transformedProperties.some(p => p.name === 'Villa Rocsea' || p.slug === 'villa-rocsea')) {
          transformedProperties.push({
            id: 'fallback-rocsea',
            slug: 'villa-rocsea',
            name: 'Villa Rocsea',
            location: 'French Riviera',
            price: 500,
            bedrooms: 5,
            capacity: 10,
            hasPool: true,
            hasSeaView: true,
            shortDescription: 'Modern luxury overlooking the Mediterranean',
            images: [rocseaVillaImage],
            amenities: []
          })
        }
        if (!transformedProperties.some(p => p.name === 'Villa Bellevue' || p.slug === 'villa-bellevue')) {
          transformedProperties.push({
            id: 'fallback-bellevue',
            slug: 'villa-bellevue',
            name: 'Villa Bellevue',
            location: 'French Riviera',
            price: 450,
            bedrooms: 4,
            capacity: 8,
            hasPool: true,
            hasSeaView: true,
            shortDescription: 'Elegant hillside retreat with panoramic views',
            images: [bellevueVillaImage],
            amenities: []
          })
        }
        
        setProperties(transformedProperties)
      } catch (err) {
        console.error('Failed to fetch properties:', err)
        // Set defaults on error
        setProperties([
          {
            id: 'error-rocsea',
            slug: 'villa-rocsea',
            name: 'Villa Rocsea',
            location: 'French Riviera',
            price: 500,
            bedrooms: 5,
            capacity: 10,
            hasPool: true,
            hasSeaView: true,
            shortDescription: 'Modern luxury overlooking the Mediterranean',
            images: [rocseaVillaImage],
            amenities: []
          },
          {
            id: 'error-bellevue',
            slug: 'villa-bellevue',
            name: 'Villa Bellevue',
            location: 'French Riviera',
            price: 450,
            bedrooms: 4,
            capacity: 8,
            hasPool: true,
            hasSeaView: true,
            shortDescription: 'Elegant hillside retreat with panoramic views',
            images: [bellevueVillaImage],
            amenities: []
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProperties()
  }, [])

  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
            alt="Our Stays"
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
            Our Stays
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
            Accommodations
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-light mb-8"
          >
            Discover our properties
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground leading-relaxed"
          >
            Each of our carefully selected properties offers a unique experience on the 
            French Riviera. From stunning sea views to private pools, discover your 
            perfect Mediterranean retreat.
          </motion.p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[4/3] bg-muted mb-6" />
                  <div className="h-6 bg-muted w-2/3 mb-3" />
                  <div className="h-4 bg-muted w-1/2" />
                </div>
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to="/gallery" className="group block">
                    <div className="aspect-[4/3] overflow-hidden mb-6 rounded-lg shadow-sm group-hover:shadow-xl transition-all duration-500">
                      <img
                        src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
                        alt={property.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    
                    <h3 className="font-heading text-2xl font-light mb-2">
                      {property.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      {property.location}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-2">
                        <Bed size={16} weight="light" />
                        {property.bedrooms} Bedrooms
                      </span>
                      <span className="flex items-center gap-2">
                        <Users size={16} weight="light" />
                        Up to {property.capacity}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {property.shortDescription}
                    </p>
                    
                    <span className="text-xs uppercase tracking-[0.2em] text-[#0f1c2e] border-b border-[#0f1c2e]/30 pb-1 group-hover:border-[#c9a962] group-hover:text-[#c9a962] transition-all">
                      View Gallery
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No properties available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[#0f1c2e] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-light mb-8"
          >
            Can't decide? Let us help you
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 mb-8 max-w-2xl mx-auto"
          >
            Tell us about your ideal stay and we'll recommend the perfect property for 
            your French Riviera experience.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/contact"
              className="inline-block px-10 py-4 border border-white/30 text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0f1c2e] transition-all duration-300"
            >
              Get Recommendations
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
