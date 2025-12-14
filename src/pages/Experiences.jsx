import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'
import ExperienceCardSkeleton from '@/components/shared/ExperienceCardSkeleton'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { experienceApi } from '@/services/api'

// Transform API response to frontend format
const transformExperience = (apiExp) => {
  // Parse JSON fields that might be stored as strings
  const parseJsonField = (field) => {
    if (!field) return []
    if (typeof field === 'string') {
      try { return JSON.parse(field) } catch { return [] }
    }
    return Array.isArray(field) ? field : []
  }
  
  // Find the lowest price from options
  const priceOptions = parseJsonField(apiExp.priceOptions)
  const lowestPrice = priceOptions.length > 0 
    ? Math.min(...priceOptions.map(p => p.price || 0))
    : apiExp.price || 0
  const priceUnit = priceOptions.length > 0 ? priceOptions[0].unit : 'per person'
  
  return {
    id: apiExp.id,
    slug: apiExp.slug,
    name: apiExp.name,
    tagline: apiExp.tagline,
    shortDescription: apiExp.shortDescription || apiExp.description?.substring(0, 200),
    price: lowestPrice,
    priceUnit,
    priceOptions,
    includes: parseJsonField(apiExp.includes),
    image: apiExp.images?.[0]?.url || '/api/placeholder/800/400'
  }
}

export default function Experiences() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 200], [0, 50])
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.3])

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await experienceApi.getAll({ limit: 50 })
        const transformedExperiences = (response.data || []).map(transformExperience)
        setExperiences(transformedExperiences)
      } catch (err) {
        console.error('Failed to fetch experiences:', err)
        setError('Failed to load experiences. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchExperiences()
  }, [])

  return (
    <div className="pt-20">
      <Section className="bg-card border-b border-border">
        <motion.div
          className="text-center max-w-3xl mx-auto"
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
            Curated Experiences
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Elevate your Riviera escape with thoughtfully selected services and local discoveries. Each experience is designed to deepen your connection to this extraordinary region.
          </motion.p>
        </motion.div>
      </Section>

      <Section>
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              <>
                <ExperienceCardSkeleton />
                <ExperienceCardSkeleton />
                <ExperienceCardSkeleton />
                <ExperienceCardSkeleton />
              </>
            ) : (
              experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="h-48 bg-muted relative">
                    <OptimizedImage
                      src="/api/placeholder/800/400"
                      alt={exp.name}
                      className="w-full h-full"
                      objectFit="cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 right-4 bg-card px-4 py-2 rounded-full z-10">
                      <p className="text-sm font-semibold">From €{exp.price}</p>
                      <p className="text-xs text-muted-foreground">{exp.priceUnit}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-heading font-semibold mb-2">{exp.name}</h3>
                    <p className="text-muted-foreground mb-4">{exp.tagline}</p>
                    <p className="text-sm mb-6">{exp.shortDescription}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2 text-sm">Includes:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {exp.includes.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <Button asChild variant="outline" className="w-full">
                      <a href="/contact">Request This Experience</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
            )}
          </div>
        )}
      </Section>

      <Section className="bg-muted/30">
        <AnimatedSection direction="fade">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-semibold mb-4">Custom Experiences</h2>
            <p className="text-muted-foreground mb-6">
              Have something specific in mind? We can arrange bespoke experiences tailored to your interests and group.
            </p>
            <Button asChild size="lg">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </AnimatedSection>
      </Section>
    </div>
  )
}
