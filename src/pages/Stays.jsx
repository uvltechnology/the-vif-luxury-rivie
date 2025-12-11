import { useState } from 'react'
import Section from '@/components/shared/Section'
import PropertyCard from '@/components/stays/PropertyCard'
import { properties } from '@/data/properties'
import { Button } from '@/components/ui/button'

export default function Stays() {
  const [filter, setFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Properties' },
    { id: 'villa', label: 'Villas' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'pool', label: 'With Pool' },
    { id: 'sea-view', label: 'Sea View' }
  ]

  const filteredProperties = properties.filter((property) => {
    if (filter === 'all') return true
    if (filter === 'villa') return property.type === 'villa'
    if (filter === 'apartment') return property.type === 'apartment'
    if (filter === 'pool') return property.hasPool
    if (filter === 'sea-view') return property.hasSeaView
    return true
  })

  return (
    <div className="pt-20">
      <div className="bg-card border-b border-border">
        <Section>
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-heading font-semibold mb-4">Our Collection</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your perfect French Riviera home. Each property offers a unique perspective on Mediterranean living.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <Button
                key={f.id}
                variant={filter === f.id ? 'default' : 'outline'}
                onClick={() => setFilter(f.id)}
                size="sm"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties match your filters.</p>
            <Button variant="outline" onClick={() => setFilter('all')} className="mt-4">
              View All Properties
            </Button>
          </div>
        )}
      </Section>

      <Section className="bg-muted/30">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-semibold mb-4">Still Deciding?</h2>
          <p className="text-muted-foreground mb-6">
            We're happy to help you find the perfect property for your group size, dates, and preferences.
          </p>
          <Button asChild size="lg">
            <a href="/contact">Get Personalized Recommendations</a>
          </Button>
        </div>
      </Section>
    </div>
  )
}
