import { useParams, Link } from 'react-router-dom'
import { Bed, Bathtub, Users, WifiHigh, Car, Waves, Check, Ruler, Star } from '@phosphor-icons/react'
import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { properties } from '@/data/properties'
import PropertyTestimonials from '@/components/stays/PropertyTestimonials'
import PropertyGallery from '@/components/stays/PropertyGallery'
import PropertyMap from '@/components/stays/PropertyMap'
import BookingCalendar from '@/components/stays/BookingCalendar'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'

export default function PropertyDetail() {
  const { propertySlug } = useParams()
  const property = properties.find((p) => p.slug === propertySlug)

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading mb-4">Property Not Found</h1>
          <Button asChild>
            <Link to="/stays">View All Properties</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <PropertyGallery images={property.images} propertyName={property.name} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-2">{property.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{property.location}</p>
              {property.exactAddress && (
                <p className="text-sm text-muted-foreground mb-4 flex items-start gap-2">
                  <span className="font-medium">📍</span>
                  <span>{property.exactAddress}</span>
                </p>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Bed size={20} className="text-muted-foreground" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bathtub size={20} className="text-muted-foreground" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-muted-foreground" />
                  <span>Sleeps {property.capacity}</span>
                </div>
                {property.size && (
                  <div className="flex items-center gap-2">
                    <Ruler size={20} className="text-muted-foreground" />
                    <span>{property.size} m²</span>
                  </div>
                )}
                {property.hasPool && (
                  <div className="flex items-center gap-2">
                    <Waves size={20} className="text-muted-foreground" />
                    <span>Pool</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {property.hasSeaView && <Badge variant="secondary">Sea View</Badge>}
                {property.hasBalcony && <Badge variant="secondary">Balcony</Badge>}
                {property.hasPool && <Badge variant="secondary">Private Pool</Badge>}
                {property.hasParking && <Badge variant="secondary">Parking</Badge>}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">About This {property.type === 'villa' ? 'Villa' : 'Apartment'}</h2>
              <p className="text-muted-foreground mb-4 whitespace-pre-line">{property.fullDescription}</p>
            </div>

            {property.host && (
              <div className="mb-8">
                <AnimatedSection>
                  <h2 className="text-2xl font-heading font-semibold mb-6">Hosted by {property.host.name}</h2>
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                  <div className="flex flex-col md:flex-row gap-6 p-6 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex-shrink-0">
                      <img 
                        src={property.host.image} 
                        alt={property.host.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-heading font-semibold">{property.host.name}</h3>
                        <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
                          <Star weight="fill" className="text-primary" size={16} />
                          <span className="text-sm font-semibold text-primary">{property.host.rating}</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-muted-foreground mb-1">Languages spoken:</p>
                        <div className="flex flex-wrap gap-2">
                          {property.host.languages.map((lang, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {property.host.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(property.amenities).map(([category, items], categoryIndex) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.5,
                      delay: categoryIndex * 0.1
                    }}
                  >
                    <h3 className="font-semibold capitalize mb-3 text-primary">{category}</h3>
                    <ul className="space-y-2">
                      {items.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-2 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ 
                            duration: 0.4,
                            delay: categoryIndex * 0.1 + index * 0.05
                          }}
                        >
                          <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <AnimatedSection>
                <h2 className="text-2xl font-heading font-semibold mb-4">Location</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <PropertyMap 
                  address={property.exactAddress} 
                  location={property.location}
                  mapMarkers={property.mapMarkers}
                />
              </AnimatedSection>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {property.nearbyAttractions.map((attraction, index) => (
                  <AnimatedSection key={index} delay={0.3 + index * 0.1}>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">{attraction.name}</span>
                      <span className="text-sm font-medium text-primary">{attraction.distance}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <AnimatedSection>
                <h2 className="text-2xl font-heading font-semibold mb-4">Perfect For</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="flex flex-wrap gap-3">
                  {property.perfectFor.map((item, index) => (
                    <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <div className="mb-8">
              <AnimatedSection>
                <h2 className="text-2xl font-heading font-semibold mb-4">House Rules & Policies</h2>
              </AnimatedSection>
              {property.slug === 'athena-apartment' && (
                <AnimatedSection delay={0.1}>
                  <div className="mb-4 p-4 bg-accent/20 border border-accent/30 rounded-lg">
                    <p className="text-sm font-medium text-foreground">
                      {property.name} takes special requests – add in the next step!
                    </p>
                  </div>
                </AnimatedSection>
              )}
              <AnimatedSection delay={0.2}>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="check-in">
                    <AccordionTrigger>Check-in & Check-out</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-semibold text-foreground mb-1">Check-in</p>
                          <p className="text-muted-foreground">{property.houseRules.checkIn}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">Check-out</p>
                          <p className="text-muted-foreground">{property.houseRules.checkOut}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {property.houseRules.cancellation && (
                    <AccordionItem value="cancellation">
                      <AccordionTrigger>Cancellation & Prepayment</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">{property.houseRules.cancellation}</p>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {property.houseRules.damageDeposit && (
                    <AccordionItem value="deposit">
                      <AccordionTrigger>Damage Deposit</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">{property.houseRules.damageDeposit}</p>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {(property.houseRules.children || property.houseRules.cribs || property.houseRules.ageRestriction) && (
                    <AccordionItem value="children">
                      <AccordionTrigger>Children & Beds</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-sm">
                          {property.houseRules.children && (
                            <div>
                              <p className="font-semibold text-foreground mb-1">Child Policies</p>
                              <p className="text-muted-foreground">{property.houseRules.children}</p>
                              <p className="text-muted-foreground mt-2 text-xs">To see correct prices and occupancy info, add the number and ages of children in your group to your search.</p>
                            </div>
                          )}
                          {property.houseRules.cribs && (
                            <div>
                              <p className="font-semibold text-foreground mb-1">Crib and Extra Bed Policies</p>
                              <p className="text-muted-foreground">{property.houseRules.cribs}</p>
                            </div>
                          )}
                          {property.houseRules.ageRestriction && (
                            <div>
                              <p className="font-semibold text-foreground mb-1">Age Restriction</p>
                              <p className="text-muted-foreground">{property.houseRules.ageRestriction}</p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {property.houseRules.payment && (
                    <AccordionItem value="payment">
                      <AccordionTrigger>Payment</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">{property.houseRules.payment}</p>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  <AccordionItem value="rules">
                    <AccordionTrigger>Property Rules</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-foreground">Smoking</span>
                          <span className="text-muted-foreground text-right ml-4">{property.houseRules.smoking}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-foreground">Parties/Events</span>
                          <span className="text-muted-foreground text-right ml-4">{property.houseRules.events}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-foreground">Quiet Hours</span>
                          <span className="text-muted-foreground text-right ml-4">{property.houseRules.quietHours}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-foreground">Pets</span>
                          <span className="text-muted-foreground text-right ml-4">{property.houseRules.pets}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {property.houseRules.minStay && (
                    <AccordionItem value="stay">
                      <AccordionTrigger>Minimum Stay</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">{property.houseRules.minStay}</p>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </AnimatedSection>
            </div>

            <PropertyTestimonials propertyName={property.name} />
          </div>

          <div className="lg:col-span-1">
            <BookingCalendar property={property} />
          </div>
        </div>
      </div>

      <Section className="bg-muted/30">
        <AnimatedSection direction="fade">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-semibold mb-4">Enhance Your Stay</h2>
            <p className="text-muted-foreground mb-6">
              Add curated experiences to make your Riviera escape truly unforgettable.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link to="/experiences">View Experiences</Link>
            </Button>
          </div>
        </AnimatedSection>
      </Section>
    </div>
  )
}
