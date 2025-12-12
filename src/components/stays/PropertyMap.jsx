import { MapPin } from '@phosphor-icons/react'

export default function PropertyMap({ address, location }) {
  const encodedAddress = encodeURIComponent(address || location)
  
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=15`
  
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden border border-border shadow-sm">
        <iframe
          src={mapUrl}
          width="100%"
          height="400"
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
    </div>
  )
}
