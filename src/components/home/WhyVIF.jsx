import { MapPin, Eye, Heart } from '@phosphor-icons/react'
import Section from '@/components/shared/Section'

export default function WhyVIF() {
  const features = [
    {
      icon: MapPin,
      title: 'Prime Location',
      description: 'Perfectly positioned between Monaco and Nice, with easy access to beaches, villages, and cultural attractions.'
    },
    {
      icon: Eye,
      title: 'Sea Views & Privacy',
      description: 'Every property offers stunning Mediterranean vistas and the seclusion to truly unwind and disconnect.'
    },
    {
      icon: Heart,
      title: 'Thoughtful Service',
      description: 'From welcome concierge to curated experiences, we handle the details so you can focus on creating memories.'
    }
  ]

  return (
    <Section className="bg-card">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">
          Why Choose The VIF
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          More than accommodation—a thoughtfully curated Riviera experience designed for those who appreciate quality and authenticity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <feature.icon size={32} weight="light" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
