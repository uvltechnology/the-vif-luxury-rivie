import { Link } from 'react-router-dom'
import { Bed, Bathtub, Users, Waves } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { OptimizedImage } from '@/components/shared/OptimizedImage'

export default function PropertyCard({ property }) {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-400 border border-border">
      <Link to="/gallery">
        <div className="relative h-64 overflow-hidden bg-muted">
          <OptimizedImage
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            objectFit="cover"
            priority={false}
          />
        </div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-2xl font-heading font-light mb-1">{property.name}</h3>
              <p className="text-sm text-muted-foreground">{property.location}</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2 italic">{property.tagline}</p>

          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bed size={18} weight="light" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users size={18} weight="light" />
              <span>Up to {property.capacity} guests</span>
            </div>
          </div>

          <Button variant="outline" className="w-full group-hover:bg-[#0f1c2e] group-hover:text-white transition-all duration-300 uppercase tracking-widest text-[10px]">
            Explore Gallery
          </Button>
        </CardContent>
      </Link>
    </Card>
  )
}
