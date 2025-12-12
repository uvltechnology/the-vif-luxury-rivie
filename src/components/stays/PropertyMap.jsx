import { useState } from 'react'
import { MapPin, ForkKnife, Compass } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PropertyMap({ address, location, mapMarkers }) {
  const [activeMarker, setActiveMarker] = useState(null)
  const encodedAddress = encodeURIComponent(address || location)
  
  const restaurants = mapMarkers?.restaurants || []
  const attractions = mapMarkers?.attractions || []
  
  const createMarkersParam = () => {
    if (!mapMarkers) return ''
    
    const markers = []
    
    if (restaurants.length > 0) {
      restaurants.forEach(restaurant => {
        markers.push(`markers=color:red%7Clabel:R%7C${restaurant.lat},${restaurant.lng}`)
      })
    }
    
    if (attractions.length > 0) {
      attractions.forEach(attraction => {
        markers.push(`markers=color:blue%7Clabel:A%7C${attraction.lat},${attraction.lng}`)
      })
    }
    
    return markers.length > 0 ? '&' + markers.join('&') : ''
  }
  
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=14${createMarkersParam()}`
  
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden border border-border shadow-sm">
        <iframe
          src={mapUrl}
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${location}`}
          className="w-full"
        />
      </div>
      
      <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium mb-1">{location}</p>
            {address && <p className="text-muted-foreground">{address}</p>}
          </div>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
        >
          Get Directions →
        </a>
      </div>

      {mapMarkers && (restaurants.length > 0 || attractions.length > 0) && (
        <Card className="border-2">
          <CardContent className="p-6">
            <h3 className="text-xl font-heading font-semibold mb-4">Nearby Points of Interest</h3>
            
            <Tabs defaultValue="restaurants" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="restaurants" className="gap-2">
                  <ForkKnife size={18} />
                  Restaurants ({restaurants.length})
                </TabsTrigger>
                <TabsTrigger value="attractions" className="gap-2">
                  <Compass size={18} />
                  Attractions ({attractions.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="restaurants" className="space-y-3 mt-0">
                {restaurants.map((restaurant, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-3 bg-red-50/50 hover:bg-red-50 rounded-lg border border-red-100 transition-colors cursor-pointer"
                    onClick={() => setActiveMarker(restaurant)}
                  >
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-1">
                        <ForkKnife size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-sm">{restaurant.name}</h4>
                          <p className="text-xs text-muted-foreground">{restaurant.type}</p>
                          <p className="text-xs text-muted-foreground mt-1">{restaurant.address}</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap ml-2">
                      {restaurant.distance}
                    </Badge>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="attractions" className="space-y-3 mt-0">
                {attractions.map((attraction, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-3 bg-blue-50/50 hover:bg-blue-50 rounded-lg border border-blue-100 transition-colors cursor-pointer"
                    onClick={() => setActiveMarker(attraction)}
                  >
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-1">
                        <Compass size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-sm">{attraction.name}</h4>
                          <p className="text-xs text-muted-foreground">{attraction.type}</p>
                          {attraction.description && (
                            <p className="text-xs text-muted-foreground mt-1">{attraction.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap ml-2">
                      {attraction.distance}
                    </Badge>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
