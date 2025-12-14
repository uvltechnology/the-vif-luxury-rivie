import { useState } from 'react'
import { Images as ImagesIcon } from '@phosphor-icons/react'
import PropertyGalleryLightbox from './PropertyGalleryLightbox'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

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
        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onClick={() => openLightbox(0)}
          className="lg:col-span-3 relative h-96 lg:h-[500px] rounded-lg overflow-hidden cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <OptimizedImage
              src={images[0]}
              alt={`${propertyName} - Main view`}
              className="w-full h-full"
              objectFit="cover"
              priority={true}
              sizes="(max-width: 1024px) 100vw, 75vw"
            />
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div 
              className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ImagesIcon size={20} weight="bold" />
              <span className="text-sm font-medium">View Gallery</span>
            </motion.div>
          </motion.div>
        </motion.button>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {images.slice(1, 5).map((img, index) => (
            <motion.button
              key={index + 1}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(index + 1)}
              className={cn(
                "relative h-32 lg:h-[120px] rounded-lg overflow-hidden cursor-pointer group/thumb",
                index === 3 && images.length > 5 && "after:absolute after:inset-0 after:bg-black/60 after:flex after:items-center after:justify-center"
              )}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <OptimizedImage
                  src={img}
                  alt={`${propertyName} - View ${index + 2}`}
                  className="w-full h-full"
                  objectFit="cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </motion.div>
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                  <div className="text-white text-center">
                    <ImagesIcon size={28} weight="bold" className="mx-auto mb-1" />
                    <span className="text-sm font-medium">+{images.length - 5} more</span>
                  </div>
                </div>
              )}
            </motion.button>
          ))}
        </div>
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
