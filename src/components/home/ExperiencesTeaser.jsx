import { Link } from 'react-router-dom'
import { ChefHat, Wine, Boat, Car } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function ExperiencesTeaser() {
  const experiences = [
    {
      icon: ChefHat,
      title: 'Private Chef',
      description: 'Savor Provençal cuisine prepared in your villa'
    },
    {
      icon: Wine,
      title: 'Wine Tastings',
      description: 'Explore local vineyards and olive groves'
    },
    {
      icon: Boat,
      title: 'Yacht Excursions',
      description: 'Discover the coast from the water'
    },
    {
      icon: Car,
      title: 'Transfers',
      description: 'Seamless airport and local transport'
    }
  ]

  return (
    <Section className="bg-muted/30">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">
            Enhance Your Stay
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elevate your Riviera escape with curated experiences and personalized services.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map((exp, index) => (
          <AnimatedSection key={index} delay={0.2 + index * 0.1}>
            <Card className="text-center hover:shadow-lg transition-shadow h-full">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary mb-4">
                  <exp.icon size={32} weight="light" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{exp.title}</h3>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.6} direction="fade">
        <div className="text-center mt-10">
          <Button asChild size="lg" variant="outline">
            <Link to="/experiences">View All Experiences</Link>
          </Button>
        </div>
      </AnimatedSection>
    </Section>
  )
}
