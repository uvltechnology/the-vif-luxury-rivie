import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function NearbyDestinations() {
  const destinations = [
    {
      name: 'Monaco',
      distance: '10 min',
      highlight: 'Casino, Grand Prix, luxury shopping'
    },
    {
      name: 'Nice',
      distance: '20 min',
      highlight: 'Old Town, Promenade des Anglais'
    },
    {
      name: 'Cannes',
      distance: '35 min',
      highlight: 'Film Festival, La Croisette'
    },
    {
      name: 'Saint-Jean-Cap-Ferrat',
      distance: '15 min',
      highlight: 'Villa Ephrussi, coastal paths'
    },
    {
      name: 'Villefranche-sur-Mer',
      distance: '12 min',
      highlight: 'Charming harbor, citadel'
    },
    {
      name: 'Menton',
      distance: '25 min',
      highlight: 'Lemon Festival, Italian border'
    }
  ]

  return (
    <Section className="bg-gradient-to-b from-background to-muted/30">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">
            Your Gateway to the Côte d'Azur
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From our properties in La Turbie and Cannes, the most iconic destinations of the French Riviera are just moments away.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {destinations.map((dest, index) => (
          <AnimatedSection key={index} delay={0.1 + index * 0.05}>
            <div className="group text-center p-4 rounded-xl bg-card hover:bg-primary/5 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                <MapPin size={20} weight="fill" />
              </div>
              <h3 className="font-heading font-semibold text-sm mb-1">{dest.name}</h3>
              <p className="text-xs text-primary font-medium mb-1">{dest.distance}</p>
              <p className="text-xs text-muted-foreground leading-snug">{dest.highlight}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.5} direction="fade">
        <div className="text-center mt-10">
          <Button asChild size="lg" variant="outline">
            <Link to="/area-guide">
              Explore the Region
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </AnimatedSection>
    </Section>
  )
}
