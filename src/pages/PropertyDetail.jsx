import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Bed, Bathtub, Users, WifiHigh, Car, Waves, Check } from '@phosphor-icons/react'
import Section from '@/components/shared/Section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { properties } from '@/data/properties'
import PropertyTestimonials from '@/components/stays/PropertyTestimonials'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function PropertyDetail() {
  const { propertySlug } = useParams()
  const property = properties.find((p) => p.slug === propertySlug)
  const [selectedImage, setSelectedImage] = useState(0)

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-8">
          <div className="lg:col-span-3 relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <img
              src={property.images[selectedImage]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {property.images.slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-32 lg:h-[120px] rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <img src={img} alt={`${property.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-2">{property.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{property.location}</p>
              
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
                {property.hasPool && (
                  <div className="flex items-center gap-2">
                    <Waves size={20} className="text-muted-foreground" />
                    <span>Pool</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {property.hasSeaView && <Badge variant="secondary">Sea View</Badge>}
                {property.hasPool && <Badge variant="secondary">Private Pool</Badge>}
                {property.hasParking && <Badge variant="secondary">Parking</Badge>}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">About This {property.type === 'villa' ? 'Villa' : 'Apartment'}</h2>
              <p className="text-muted-foreground mb-4 whitespace-pre-line">{property.fullDescription}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(property.amenities).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-semibold capitalize mb-3 text-primary">{category}</h3>
                    <ul className="space-y-2">
                      {items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">Location</h2>
              <div className="bg-muted rounded-lg p-6 mb-4">
                <p className="text-muted-foreground mb-4">Interactive map placeholder</p>
                <div className="h-64 bg-card rounded flex items-center justify-center">
                  <p className="text-muted-foreground">Map of {property.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {property.nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted rounded">
                    <span className="text-sm">{attraction.name}</span>
                    <span className="text-sm font-medium text-primary">{attraction.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">Perfect For</h2>
              <div className="flex flex-wrap gap-3">
                {property.perfectFor.map((item, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">House Rules & Policies</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="check-in">
                  <AccordionTrigger>Check-in & Check-out</AccordionTrigger>
                  <AccordionContent>
                    <p><strong>Check-in:</strong> {property.houseRules.checkIn}</p>
                    <p><strong>Check-out:</strong> {property.houseRules.checkOut}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="stay">
                  <AccordionTrigger>Minimum Stay</AccordionTrigger>
                  <AccordionContent>
                    <p>{property.houseRules.minStay}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rules">
                  <AccordionTrigger>Property Rules</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      <li><strong>Smoking:</strong> {property.houseRules.smoking}</li>
                      <li><strong>Pets:</strong> {property.houseRules.pets}</li>
                      <li><strong>Events:</strong> {property.houseRules.events}</li>
                      <li><strong>Quiet hours:</strong> {property.houseRules.quietHours}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <PropertyTestimonials propertyName={property.name} />
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">From</p>
                  <p className="text-4xl font-bold text-primary">€{property.price}</p>
                  <p className="text-sm text-muted-foreground">per night</p>
                </div>

                <Button asChild className="w-full mb-4" size="lg">
                  <Link to="/contact">Check Availability</Link>
                </Button>

                <div className="border-t pt-4 space-y-2 text-sm text-muted-foreground">
                  <p>• Free cancellation up to 60 days</p>
                  <p>• 30% deposit required</p>
                  <p>• Weekly cleaning included</p>
                  <p>• Welcome concierge service</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Section className="bg-muted/30">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-semibold mb-4">Enhance Your Stay</h2>
          <p className="text-muted-foreground mb-6">
            Add curated experiences to make your Riviera escape truly unforgettable.
          </p>
          <Button asChild size="lg" variant="outline">
            <Link to="/experiences">View Experiences</Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}
