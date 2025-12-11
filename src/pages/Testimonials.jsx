import { Star, Quotes, Seal, FunnelSimple, SortAscending } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Section from '@/components/shared/Section'
import { testimonials, stats } from '@/data/testimonials'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="h-full p-6 md:p-8 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-4 right-4 text-accent/10 group-hover:text-accent/20 transition-colors duration-300">
          <Quotes size={64} weight="fill" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={18} weight="fill" className="text-secondary" />
              ))}
            </div>
            {testimonial.verified && (
              <Badge variant="outline" className="gap-1 text-xs border-primary/30 text-primary">
                <Seal size={14} weight="fill" />
                Verified
              </Badge>
            )}
          </div>

          <blockquote className="text-foreground mb-4 leading-relaxed">
            "{testimonial.review}"
          </blockquote>

          {testimonial.highlight && (
            <div className="mb-4 p-3 bg-accent/10 rounded-lg border-l-3 border-accent">
              <p className="text-sm italic text-foreground/90">
                {testimonial.highlight}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="font-medium text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary">{testimonial.propertyStayed}</p>
              <p className="text-xs text-muted-foreground">{testimonial.date}</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function StatsHero() {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-2xl p-8 md:p-12 mb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold mb-4">
          Guest Reviews
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Real experiences from real guests. Every review is verified from guests who have stayed at our properties.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="text-center p-6 rounded-xl bg-card border border-border shadow-sm">
          <div className="text-4xl md:text-5xl font-heading font-semibold text-primary mb-2">
            {stats.averageRating}
          </div>
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} weight="fill" className="text-secondary" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Average Rating</p>
        </div>

        <div className="text-center p-6 rounded-xl bg-card border border-border shadow-sm">
          <div className="text-4xl md:text-5xl font-heading font-semibold text-primary mb-2">
            {stats.totalGuests}+
          </div>
          <p className="text-sm text-muted-foreground mt-4">Happy Guests</p>
        </div>

        <div className="text-center p-6 rounded-xl bg-card border border-border shadow-sm">
          <div className="text-4xl md:text-5xl font-heading font-semibold text-primary mb-2">
            {stats.repeatGuestRate}%
          </div>
          <p className="text-sm text-muted-foreground mt-4">Repeat Guests</p>
        </div>

        <div className="text-center p-6 rounded-xl bg-card border border-border shadow-sm">
          <div className="text-4xl md:text-5xl font-heading font-semibold text-primary mb-2">
            {stats.yearsHosting}+
          </div>
          <p className="text-sm text-muted-foreground mt-4">Years Hosting</p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsPage() {
  const [propertyFilter, setPropertyFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const filteredAndSortedTestimonials = useMemo(() => {
    let result = [...testimonials]

    if (propertyFilter !== 'all') {
      result = result.filter(t => t.propertyStayed === propertyFilter)
    }

    if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [propertyFilter, sortBy])

  const uniqueProperties = [...new Set(testimonials.map(t => t.propertyStayed))]

  return (
    <div>
      <Section className="bg-background">
        <StatsHero />

        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <FunnelSimple size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter by property:</span>
            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Properties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                {uniqueProperties.map(property => (
                  <SelectItem key={property} value={property}>
                    {property}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <SortAscending size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Most Recent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredAndSortedTestimonials.length} {filteredAndSortedTestimonials.length === 1 ? 'review' : 'reviews'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredAndSortedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {filteredAndSortedTestimonials.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">No reviews found for this filter.</p>
            <Button onClick={() => setPropertyFilter('all')} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </Section>

      <Section className="bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community of satisfied guests and discover why The VIF is the premier choice for French Riviera vacations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View Our Stays
            </Button>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
