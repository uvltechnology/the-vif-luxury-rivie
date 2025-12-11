import { useState } from 'react'
import { Images as ImagesIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import PropertyGalleryLightbox from './PropertyGalleryLightbox'
import { cn } from '@/lib/utils'

export default function PropertyGallery({ images, propertyName }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openLightbox = (index) => {
    setSelectedIndex(index)
    setLightboxOpen(true)
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-8 group">
        <button
          onClick={() => openLightbox(0)}
          className="lg:col-span-3 relative h-96 lg:h-[500px] rounded-lg overflow-hidden cursor-pointer"
        >
          <img
            src={images[0]}
            alt={`${propertyName} - Main view`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-4 py-2 rounded-full flex items-center gap-2">
              <ImagesIcon size={20} weight="bold" />
              <span className="text-sm font-medium">View Gallery</span>
            </div>
          </div>
        </button>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {images.slice(1, 5).map((img, index) => (
            <button
              key={index + 1}
              onClick={() => openLightbox(index + 1)}
              className={cn(
                "relative h-32 lg:h-[120px] rounded-lg overflow-hidden cursor-pointer group/thumb",
                index === 3 && images.length > 5 && "after:absolute after:inset-0 after:bg-black/60 after:flex after:items-center after:justify-center"
              )}
            >
              <img
                src={img}
                alt={`${propertyName} - View ${index + 2}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
              />
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                  <div className="text-white text-center">
                    <ImagesIcon size={28} weight="bold" className="mx-auto mb-1" />
                    <span className="text-sm font-medium">+{images.length - 5} more</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <Button
          onClick={() => openLightbox(0)}
          variant="secondary"
          className="lg:absolute lg:bottom-6 lg:right-6 lg:z-20 flex items-center gap-2"
        >
          <ImagesIcon size={20} weight="bold" />
          View All {images.length} Photos
        </Button>
      </div>

      <PropertyGalleryLightbox
        images={images}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={selectedIndex}
      />
    </>
  )
}
