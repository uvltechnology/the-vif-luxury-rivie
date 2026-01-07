import { MapPin, Eye, Heart, Sparkle, Buildings, Compass } from '@phosphor-icons/react'
import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function WhyVIF() {
  const features = [
    {
      icon: Sparkle,
      title: 'Experience the Riviera',
      description: 'Golden beaches, picturesque villages, exquisite local cuisine, and world-renowned events—from the Cannes Film Festival to the Monaco Grand Prix.'
    },
    {
      icon: Buildings,
      title: 'Exceptional Properties',
      description: 'Luxury villas and modern apartments, fully equipped with premium amenities for an unforgettable stay on the Côte d\'Azur.'
    },
    {
      icon: Compass,
      title: 'Perfectly Positioned',
      description: 'Monaco, Nice, Menton, Saint-Jean-Cap-Ferrat, Villefranche-sur-Mer—and Italy just minutes away. Your gateway to Mediterranean treasures.'
    }
  ]

  return (
    <Section className="bg-card">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">
            Experience the Riviera
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Where sun-kissed coastlines meet timeless elegance—discover a lifestyle that has captivated travelers for generations.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {features.map((feature, index) => (
          <AnimatedSection key={index} delay={0.2 + index * 0.1}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon size={32} weight="light" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  )
}
