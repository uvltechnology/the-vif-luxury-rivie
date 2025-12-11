import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/shared/Section'
import ExperienceCardSkeleton from '@/components/shared/ExperienceCardSkeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { experiences } from '@/data/experiences'

export default function Experiences() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="pt-20">
      <Section className="bg-card border-b border-border">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading font-semibold mb-4">
            Curated Experiences
          </h1>
          <p className="text-xl text-muted-foreground">
            Elevate your Riviera escape with thoughtfully selected services and local discoveries. Each experience is designed to deepen your connection to this extraordinary region.
          </p>
        </div>
      </Section>

      <Section>
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
                    <img
                      src="/api/placeholder/800/400"
                      alt={exp.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-card px-4 py-2 rounded-full">
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
      </Section>

      <Section className="bg-muted/30">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-semibold mb-4">Custom Experiences</h2>
          <p className="text-muted-foreground mb-6">
            Have something specific in mind? We can arrange bespoke experiences tailored to your interests and group.
          </p>
          <Button asChild size="lg">
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </Section>
    </div>
  )
}
