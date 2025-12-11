import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import Section from '@/components/shared/Section'
import PropertyCard from '@/components/stays/PropertyCard'
import { properties } from '@/data/properties'

export default function FeaturedStays() {
  return (
    <Section>
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">Our Stays</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Each property is hand-selected for its character, views, and proximity to the best the Riviera offers.
          </p>
        </div>
        <Button asChild variant="ghost" className="hidden md:flex">
          <Link to="/stays">
            Browse All
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Button asChild variant="outline">
          <Link to="/stays">
            Browse All Stays
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </Button>
      </div>
    </Section>
  )
}
