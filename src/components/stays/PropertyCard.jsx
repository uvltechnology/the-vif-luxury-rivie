import { Link } from 'react-router-dom'
import { Bed, Bathtub, Users, Waves } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { OptimizedImage } from '@/components/shared/OptimizedImage'

export default function PropertyCard({ property }) {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-400 border border-border">
      <Link to={`/stays/${property.slug}`}>
        <div className="relative h-64 overflow-hidden bg-muted">
          <OptimizedImage
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {property.hasSeaView && (
            <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground z-10">
              Sea View
            </Badge>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-2xl font-heading font-semibold mb-1">{property.name}</h3>
              <p className="text-sm text-muted-foreground">{property.location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="text-xl font-semibold text-primary">€{property.price}</p>
              <p className="text-xs text-muted-foreground">per night</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2">{property.tagline}</p>

          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bed size={18} />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bathtub size={18} />
              <span>{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users size={18} />
              <span>{property.capacity} guests</span>
            </div>
            {property.hasPool && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Waves size={18} />
                <span>Pool</span>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {property.shortDescription}
          </p>

          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            View Details
          </Button>
        </CardContent>
      </Link>
    </Card>
  )
}
