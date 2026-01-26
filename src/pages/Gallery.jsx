import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
    alt: 'Villa exterior with pool',
    category: 'exterior'
  },
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    alt: 'Villa terrace with sea view',
    category: 'exterior'
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    alt: 'Modern living room',
    category: 'interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    alt: 'Villa facade',
    category: 'exterior'
  },
  {
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    alt: 'Luxury bedroom',
    category: 'interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    alt: 'Kitchen area',
    category: 'interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    alt: 'Pool area',
    category: 'exterior'
  },
  {
    src: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80',
    alt: 'Bathroom',
    category: 'interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200&q=80',
    alt: 'French Riviera view',
    category: 'views'
  },
  {
    src: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80',
    alt: 'Mediterranean coastline',
    category: 'views'
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    alt: 'Beach nearby',
    category: 'views'
  },
  {
    src: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80',
    alt: 'Sunset view',
    category: 'views'
  }
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'interior', label: 'Interior' },
  { id: 'views', label: 'Views' }
]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section - Villa Soleil Style */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
            alt="Gallery - The VIF Villa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <h1 
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#ffffff',
              textShadow: '0 2px 40px rgba(0,0,0,0.15)'
            }}
          >
            Gallery
          </h1>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter */}
          <div className="flex justify-center mb-16 flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  backgroundColor: selectedCategory === category.id ? '#0f1c2e' : 'transparent',
                  color: selectedCategory === category.id ? '#ffffff' : '#0f1c2e',
                  border: '1px solid #0f1c2e',
                  transition: 'all 0.3s ease'
                }}
                className="hover:bg-[#0f1c2e] hover:text-white"
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="aspect-[4/3] overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-[#c9a962] transition-colors z-50"
            >
              <X size={32} weight="light" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
