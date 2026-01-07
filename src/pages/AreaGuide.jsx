import { motion, useScroll, useTransform } from 'framer-motion'
import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { OptimizedBackgroundImage } from '@/components/shared/OptimizedImage'
import { Card, CardContent } from '@/components/ui/card'
import { useParallax } from '@/hooks/use-parallax'
import { useLanguage } from '@/contexts/LanguageContext'
import { MapPin, Compass, Gem, Mountain, Waves, Building2, TreePalm, Sailboat, Heart, Sun, Citrus, Globe } from 'lucide-react'

export default function AreaGuide() {
  const { t } = useLanguage()
  const { scrollY } = useScroll()
  const backgroundY = useParallax(0.4)
  const contentY = useTransform(scrollY, [0, 400], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const destinationKeys = ['monaco', 'laTurbie', 'eze', 'nice', 'cannes', 'lerins', 'villefranche', 'saintJean', 'menton', 'italy']
  const iconMap = {
    monaco: Gem,
    laTurbie: Mountain,
    eze: Compass,
    nice: Building2,
    cannes: TreePalm,
    lerins: Sailboat,
    villefranche: Heart,
    saintJean: Waves,
    menton: Citrus,
    italy: Globe
  }
  const featuredKeys = ['monaco', 'laTurbie', 'cannes']

  const destinations = destinationKeys.map(key => ({
    key,
    name: t(`areaGuide.destinations.${key}.name`),
    subtitle: t(`areaGuide.destinations.${key}.subtitle`),
    description: t(`areaGuide.destinations.${key}.description`),
    icon: iconMap[key],
    featured: featuredKeys.includes(key)
  }))

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
            {t('areaGuide.heroTitle')}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('areaGuide.heroSubtitle')}
          </motion.p>
        </motion.div>
      </div>

      {/* Featured Destinations - Large Cards */}
      <Section className="py-20 bg-background">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">{t('areaGuide.iconicTitle')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('areaGuide.iconicSubtitle')}
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
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">{t('areaGuide.discoverMoreTitle')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('areaGuide.discoverMoreSubtitle')}
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
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-6">{t('areaGuide.ctaTitle')}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('areaGuide.ctaDescription')}
            </p>
          </div>
        </AnimatedSection>
      </Section>
    </div>
  )
}
