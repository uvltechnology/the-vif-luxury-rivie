import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Card, CardContent } from '@/components/ui/card'

export default function AreaGuide() {
  const towns = [
    { name: 'Nice', distance: '15 min', description: 'The capital of the French Riviera, with stunning old town, markets, and museums.' },
    { name: 'Monaco', distance: '10-20 min', description: 'Glamorous principality known for luxury, the casino, and the Grand Prix circuit.' },
    { name: 'Èze', distance: '5-10 min', description: 'Medieval hilltop village with breathtaking views and artisan shops.' },
    { name: 'Beaulieu-sur-Mer', distance: '8 min', description: 'Elegant coastal town with Belle Époque villas and charming waterfront.' },
    { name: 'Villefranche-sur-Mer', distance: '12 min', description: 'Picturesque fishing village with colorful buildings and a deep natural harbor.' },
    { name: 'Antibes', distance: '25 min', description: 'Historic town with sandy beaches, a charming old quarter, and the Picasso Museum.' }
  ]

  const beaches = [
    { name: 'Plage de la Mala', description: 'Secluded pebble beach with crystal-clear water, popular with locals.' },
    { name: 'Paloma Beach', description: 'Exclusive beach in Saint-Jean-Cap-Ferrat with restaurant and water sports.' },
    { name: 'Larvotto Beach', description: 'Monaco\'s public beach with golden sand and clear Mediterranean waters.' }
  ]

  const dining = [
    { name: 'Local Markets', description: 'Morning markets in Nice, Monaco, and nearby villages offer fresh produce, cheese, olives, and flowers.' },
    { name: 'Waterfront Restaurants', description: 'From casual seafood bistros to Michelin-starred dining, the coast offers exceptional cuisine.' },
    { name: 'Wine Bars', description: 'Sample Provençal rosés and local wines in intimate settings throughout the region.' }
  ]

  return (
    <div className="pt-20">
      <div className="relative h-96 flex items-center justify-center overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/api/placeholder/1920/800')`
          }}
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">Discover the Riviera</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your guide to the best towns, beaches, dining, and experiences along the Côte d'Azur
          </p>
        </div>
      </div>

      <Section>
        <AnimatedSection>
          <h2 className="text-4xl font-heading font-semibold mb-8">Nearby Towns & Villages</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {towns.map((town, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-heading font-semibold">{town.name}</h3>
                    <span className="text-sm text-primary font-medium">{town.distance}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{town.description}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <AnimatedSection>
          <h2 className="text-4xl font-heading font-semibold mb-8">Beaches & Coastal Life</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {beaches.map((beach, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-2">{beach.name}</h3>
                  <p className="text-muted-foreground text-sm">{beach.description}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section>
        <AnimatedSection>
          <h2 className="text-4xl font-heading font-semibold mb-8">Dining & Markets</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dining.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-2">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section className="bg-primary/5">
        <AnimatedSection direction="fade">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-semibold mb-4">Local Insights</h2>
            <p className="text-muted-foreground">
              Each of our properties includes a personalized welcome guide with our favorite restaurants, hidden beaches, and insider tips to help you experience the Riviera like a local.
            </p>
          </div>
        </AnimatedSection>
      </Section>
    </div>
  )
}
