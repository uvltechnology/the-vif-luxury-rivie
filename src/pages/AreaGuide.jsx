import { motion, useScroll, useTransform } from 'framer-motion'
import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { OptimizedBackgroundImage } from '@/components/shared/OptimizedImage'
import { Card, CardContent } from '@/components/ui/card'
import { useParallax } from '@/hooks/use-parallax'
import { MapPin, Compass, Gem, Mountain, Waves, Building2, TreePalm, Sailboat, Heart, Sun, Citrus, Globe } from 'lucide-react'

export default function AreaGuide() {
  const { scrollY } = useScroll()
  const backgroundY = useParallax(0.4)
  const contentY = useTransform(scrollY, [0, 400], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const destinations = [
    {
      name: 'Monaco',
      subtitle: 'Luxury, excitement and world-class attractions',
      description: 'Just a few minutes away lies Monaco, with its iconic Monte-Carlo Casino, sparkling harbor, refined boutiques, and the legendary Formula 1 Grand Prix, where roaring engines transform the city each year into the world\'s most thrilling racetrack.',
      icon: Gem,
      featured: true
    },
    {
      name: 'La Turbie',
      subtitle: 'History and breathtaking views',
      description: 'Right next to the house, discover the imposing Trophy of Augustus, a Roman monument overlooking the Mediterranean. The village\'s stone streets, charming restaurants and panoramic vistas make La Turbie the perfect hilltop escape.',
      icon: Mountain,
      featured: true
    },
    {
      name: 'Éze & Fragonard',
      subtitle: 'Medieval charm and artisan perfumery',
      description: 'Just minutes from La Turbie, the medieval village of Éze rises above the sea like a fairytale fortress. With stone pathways, breathtaking views and the Exotic Garden, it is one of the Riviera\'s most enchanting sights. Stop by the iconic Fragonard Perfumery, where you can explore traditional perfume-making and even craft your own fragrance. A refined and unforgettable Riviera experience.',
      icon: Compass,
      featured: false
    },
    {
      name: 'Nice',
      subtitle: 'Art, culture and French lifestyle',
      description: 'Nearby Nice invites you to explore its world-renowned museums — including the Matisse Museum and the MAMAC — its vibrant markets and the iconic Promenade des Anglais. A city full of color, culture and inspiration.',
      icon: Building2,
      featured: false
    },
    {
      name: 'Cannes',
      subtitle: 'Beaches and glamour',
      description: 'Our properties in Cannes place you within steps of sandy beaches and the legendary Cannes Film Festival, where cinema, luxury and summer nights blend into an unforgettable Mediterranean atmosphere.',
      icon: TreePalm,
      featured: true
    },
    {
      name: 'Lérins Islands',
      subtitle: 'Nature, serenity and heritage',
      description: 'Just a short boat ride from Cannes, the Lérins Islands offer a peaceful escape. Sainte-Marguerite Island enchants visitors with its fragrant pine forests, crystal-clear coves and the historic Fort of the "Man in the Iron Mask." Saint-Honorat Island is home to an ancient monastery, vineyards and untouched landscapes. A perfect destination for a day of nature, swimming and cultural discovery.',
      icon: Sailboat,
      featured: false
    },
    {
      name: 'Villefranche-sur-Mer',
      subtitle: 'Charm, colour and an iconic bay',
      description: 'Just a short drive away, Villefranche-sur-Mer is famous for its turquoise bay—one of the most beautiful in the world—its colourful old town and its peaceful sandy beach. With its seafront restaurants and magical medieval streets, it is one of the Riviera\'s most romantic and unforgettable destinations.',
      icon: Heart,
      featured: false
    },
    {
      name: 'Saint-Jean-Cap-Ferrat',
      subtitle: 'Elegance and natural beauty',
      description: 'Just a short drive away, Saint-Jean-Cap-Ferrat offers turquoise waters, hidden coves, scenic coastal paths and the magnificent Villa Ephrussi de Rothschild. A perfect blend of luxury, tranquility and Mediterranean charm.',
      icon: Waves,
      featured: false
    },
    {
      name: 'Menton',
      subtitle: 'The pearl of the Riviera',
      description: 'Located at the gateway to Italy, Menton enchants visitors with its pastel façades, citrus gardens and the iconic Lemon Festival. A bright, gentle and beautifully Mediterranean town.',
      icon: Citrus,
      featured: false
    },
    {
      name: 'Italy',
      subtitle: 'Just around the corner',
      description: 'From our properties, the Italian border is only a short trip away. Visit Ventimiglia, Sanremo, or the picturesque Ligurian villages to enjoy Italian cuisine, open-air markets and a warm, relaxed atmosphere.',
      icon: Globe,
      featured: false
    }
  ]

  const featuredDestinations = destinations.filter(d => d.featured)
  const otherDestinations = destinations.filter(d => !d.featured)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden mb-0">
        <motion.div
          className="absolute inset-0"
          style={{
            y: backgroundY,
          }}
        >
          <OptimizedBackgroundImage
            src="/api/placeholder/1920/1080"
            className="w-full h-full"
            priority={true}
            overlay={true}
            overlayOpacity={0.5}
          />
        </motion.div>
        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
          style={{
            y: contentY,
            opacity,
          }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore the Region
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Perfectly located between the sea and the mountains, our homes in La Turbie and Cannes place you at the heart of the most authentic and exclusive French Riviera experience.
          </motion.p>
        </motion.div>
      </div>

      {/* Featured Destinations - Large Cards */}
      <Section className="py-20 bg-background">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">Iconic Destinations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              World-renowned locations just moments from your door
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/80">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <destination.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-2">{destination.name}</h3>
                    <p className="text-primary font-medium text-sm uppercase tracking-wider">{destination.subtitle}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-grow">{destination.description}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Other Destinations - Grid Layout */}
      <Section className="py-20 bg-muted/30">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">Discover More</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Enchanting villages, hidden gems and unforgettable experiences await
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherDestinations.map((destination, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card className="group h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <destination.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-heading font-bold mb-1">{destination.name}</h3>
                      <p className="text-primary font-medium text-sm uppercase tracking-wider mb-3">{destination.subtitle}</p>
                      <p className="text-muted-foreground leading-relaxed">{destination.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="py-24 bg-primary/5">
        <AnimatedSection direction="fade">
          <div className="text-center max-w-3xl mx-auto">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-6">Your Gateway to the Riviera</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Each of our properties includes a personalized welcome guide with curated recommendations, 
              insider tips, and exclusive local contacts to help you experience the French Riviera 
              like never before. From private yacht charters to hidden beach coves, we ensure every 
              moment of your stay is extraordinary.
            </p>
          </div>
        </AnimatedSection>
      </Section>
    </div>
  )
}
