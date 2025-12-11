import { Star, ArrowRight } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { testimonials } from '@/data/testimonials'

export default function PropertyTestimonials({ propertyName }) {
  const propertyReviews = testimonials.filter(t => t.propertyStayed === propertyName).slice(0, 2)
  
  if (propertyReviews.length === 0) {
    return null
  }

  const averageRating = propertyReviews.reduce((acc, t) => acc + t.rating, 0) / propertyReviews.length

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-heading font-semibold mb-2">Guest Reviews</h3>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  weight={i < Math.round(averageRating) ? "fill" : "regular"} 
                  className="text-secondary" 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} ({propertyReviews.length} reviews)
            </span>
          </div>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link to="/reviews" className="flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {propertyReviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex gap-1 mb-3">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={14} weight="fill" className="text-secondary" />
              ))}
            </div>
            <p className="text-sm text-foreground mb-3 line-clamp-3">
              "{review.review}"
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <p className="text-sm font-medium text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.location}</p>
              </div>
              <p className="text-xs text-muted-foreground">{review.date}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
