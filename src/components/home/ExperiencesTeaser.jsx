import { Link } from 'react-router-dom'
import { ChefHat, Wine, Boat, Car, FilmStrip, FlagCheckered } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function ExperiencesTeaser() {
  const experiences = [
    {
      icon: FilmStrip,
      title: 'Cannes Film Festival',
      description: 'Walk the red carpet at the world\'s most prestigious cinema event'
    },
    {
      icon: FlagCheckered,
      title: 'Monaco Grand Prix',
      description: 'Experience F1 racing through the legendary streets of Monaco'
    },
    {
      icon: Boat,
      title: 'Yacht Excursions',
      description: 'Explore hidden coves and coastal gems from the sea'
    },
    {
      icon: Wine,
      title: 'Wine & Gastronomy',
      description: 'Savor Provençal flavors and renowned local vintages'
    }
  ]

  return (
    <Section className="bg-muted/30">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">
            Iconic Riviera Experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From glamorous international events to intimate local discoveries—create moments that last a lifetime.
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
            <Link to="/experiences">Discover All Experiences</Link>
          </Button>
        </div>
      </AnimatedSection>
    </Section>
  )
}
