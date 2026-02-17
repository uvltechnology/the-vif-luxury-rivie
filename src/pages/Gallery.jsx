import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { OptimizedImage } from '../components/shared/OptimizedImage'

// Import gallery images
import img1 from '../assets/images/The VIF Gallery/1.jpg'
import img2 from '../assets/images/The VIF Gallery/2.jpg'
import img3 from '../assets/images/The VIF Gallery/3.jpg'
import img4 from '../assets/images/The VIF Gallery/4.jpg'
import img5 from '../assets/images/The VIF Gallery/5.jpg'
import img6 from '../assets/images/The VIF Gallery/6.jpg'
import img7 from '../assets/images/The VIF Gallery/7.jpg'
import img8 from '../assets/images/The VIF Gallery/8.jpg'
import img9 from '../assets/images/The VIF Gallery/9.jpg'
import img10 from '../assets/images/The VIF Gallery/10.jpg'
import img11 from '../assets/images/The VIF Gallery/11.jpg'
import img12 from '../assets/images/The VIF Gallery/12.jpg'
import img13 from '../assets/images/The VIF Gallery/13.jpg'
import img14 from '../assets/images/The VIF Gallery/14.jpg'
import img15 from '../assets/images/The VIF Gallery/15.jpg'
import img16 from '../assets/images/The VIF Gallery/16.jpg'
import img17 from '../assets/images/The VIF Gallery/17.jpg'
import img18 from '../assets/images/The VIF Gallery/18.jpg'
import img19 from '../assets/images/The VIF Gallery/19.jpg'
import img20 from '../assets/images/The VIF Gallery/20.jpg'
import img21 from '../assets/images/The VIF Gallery/21.jpg'
import img22 from '../assets/images/The VIF Gallery/22.jpg'
import img23 from '../assets/images/The VIF Gallery/23.jpg'
import img24 from '../assets/images/The VIF Gallery/24.jpg'
import img25 from '../assets/images/The VIF Gallery/25.jpg'
import img26 from '../assets/images/The VIF Gallery/26.jpg'

const galleryImages = [
  { src: img1, alt: 'Villa image 1' },
  { src: img2, alt: 'Villa image 2' },
  { src: img3, alt: 'Villa image 3' },
  { src: img4, alt: 'Villa image 4' },
  { src: img5, alt: 'Villa image 5' },
  { src: img6, alt: 'Villa image 6' },
  { src: img7, alt: 'Villa image 7' },
  { src: img8, alt: 'Villa image 8' },
  { src: img9, alt: 'Villa image 9' },
  { src: img10, alt: 'Villa image 10' },
  { src: img11, alt: 'Villa image 11' },
  { src: img12, alt: 'Villa image 12' },
  { src: img13, alt: 'Villa image 13' },
  { src: img14, alt: 'Villa image 14' },
  { src: img15, alt: 'Villa image 15' },
  { src: img16, alt: 'Villa image 16' },
  { src: img17, alt: 'Villa image 17' },
  { src: img18, alt: 'Villa image 18' },
  { src: img19, alt: 'Villa image 19' },
  { src: img20, alt: 'Villa image 20' },
  { src: img21, alt: 'Villa image 21' },
  { src: img22, alt: 'Villa image 22' },
  { src: img23, alt: 'Villa image 23' },
  { src: img24, alt: 'Villa image 24' },
  { src: img25, alt: 'Villa image 25' },
  { src: img26, alt: 'Villa image 26' }
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="bg-[#faf8f5]">
      {/* Header Section - Villa Soleil Style */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3.5rem, 12vw, 8rem)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#0f1c2e',
              marginBottom: '1.5rem'
            }}
          >
            Gallery
          </motion.h1>
          
          {/* Decorative Wave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <svg width="60" height="12" viewBox="0 0 60 12" fill="none" className="mx-auto">
              <path d="M0 6C10 6 10 2 20 2C30 2 30 10 40 10C50 10 50 6 60 6" stroke="#c9a962" strokeWidth="1.5" fill="none"/>
            </svg>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.6,
              color: '#555'
            }}
          >
            Explore the Elegance: A visual journey through<br className="hidden md:block" />
            our luxurious villa
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Gallery Grid - Masonry Style */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`overflow-hidden cursor-pointer group ${
                    index % 3 === 0 ? 'aspect-[4/3]' : 'aspect-[4/3]'
                  }`}
                  style={{ borderRadius: '4px' }}
                  onClick={() => setSelectedImage(image)}
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full"
                    objectFit="cover"
                    priority={index < 4}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
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
