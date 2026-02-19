import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { OptimizedImage } from '../components/shared/OptimizedImage'
import { useTranslation } from '@/hooks/useTranslation'

const rocseaGlob = import.meta.glob('../assets/images/The VIF Gallery/Rocsea/Portrait/*.jpg', { eager: true, import: 'default' })
const bellevueGlob = import.meta.glob('../assets/images/The VIF Gallery/Bellevue/Landscape/*.jpg', { eager: true, import: 'default' })

// Specific additional images for Villa Rocsea
import img22 from '../assets/images/The VIF Gallery/22.jpg'
import img25 from '../assets/images/The VIF Gallery/25.jpg'

const galleryImages = [
  ...Object.values(rocseaGlob).map((src, i) => ({
    src,
    alt: `Villa Rocsea ${i + 1}`,
    category: 'Villa Rocsea'
  })),
  { src: img22, alt: 'Villa Rocsea 22', category: 'Villa Rocsea' },
  { src: img25, alt: 'Villa Rocsea 25', category: 'Villa Rocsea' },
  ...Object.values(bellevueGlob).map((src, i) => ({
    src,
    alt: `Villa Bellevue ${i + 1}`,
    category: 'Villa Bellevue'
  }))
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const { t } = useTranslation()

  const categories = [
    { key: 'All', labelKey: 'gallery.all' },
    { key: 'Villa Rocsea', labelKey: 'gallery.villaRocsea' },
    { key: 'Villa Bellevue', labelKey: 'gallery.villaBellevue' }
  ]

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return galleryImages
    return galleryImages.filter(img => img.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="bg-[#faf8f5]">
      {/* Header Section - Villa Soleil Style */}
      <section className="pt-32 md:pt-40 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3.5rem, 10vw, 6rem)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#0f1c2e',
              marginBottom: '1.5rem'
            }}
          >
            {t('gallery.title')}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <svg width="60" height="12" viewBox="0 0 60 12" fill="none" className="mx-auto">
              <path d="M0 6C10 6 10 2 20 2C30 2 30 10 40 10C50 10 50 6 60 6" stroke="#c9a962" strokeWidth="1.5" fill="none"/>
            </svg>
          </motion.div>
          
          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`text-[11px] uppercase tracking-[0.25em] pb-3 border-b transition-all duration-300 ${
                  activeCategory === cat.key 
                    ? 'border-[#c9a962] text-[#0f1c2e]' 
                    : 'border-transparent text-[#999] hover:text-[#0f1c2e]'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden cursor-pointer group aspect-[4/3] rounded-xl shadow-sm hover:shadow-2xl transition-all duration-700"
                  onClick={() => setSelectedImage(image)}
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full transition-transform duration-1000 group-hover:scale-110"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
