import { useState, useEffect, useCallback } from 'react'
import { X, ArrowLeft, ArrowRight, MagnifyingGlassPlus, MagnifyingGlassMinus } from '@phosphor-icons/react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export default function PropertyGalleryLightbox({ images, isOpen, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    setCurrentIndex(initialIndex)
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [initialIndex, isOpen])

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [currentIndex])

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setDirection(1)
      setCurrentIndex(currentIndex + 1)
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [currentIndex, images.length])

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.5, 3))
  }

  const handleZoomOut = () => {
    setScale(prevScale => {
      const newScale = Math.max(prevScale - 0.5, 1)
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 })
      }
      return newScale
    })
  }

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    })
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    })
  }

  const handleTouchMove = (e) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    })
  }

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return

    const deltaX = touchStart.x - touchEnd.x
    const deltaY = Math.abs(touchStart.y - touchEnd.y)
    const minSwipeDistance = 50

    if (Math.abs(deltaX) > minSwipeDistance && deltaY < 100) {
      if (deltaX > 0) {
        handleNext()
      } else {
        handlePrevious()
      }
    }

    setTouchStart({ x: 0, y: 0 })
    setTouchEnd({ x: 0, y: 0 })
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.9
    })
  }

  const thumbnailVariants = {
    inactive: {
      scale: 1,
      opacity: 0.6
    },
    active: {
      scale: 1.1,
      opacity: 1
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious()
          break
        case 'ArrowRight':
          handleNext()
          break
        case 'Escape':
          onClose()
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handlePrevious, handleNext, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[95vh] p-0 bg-black/95 border-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close gallery"
          >
            <X size={24} weight="bold" />
          </button>

          <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
            <Button
              onClick={handleZoomOut}
              disabled={scale <= 1}
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20 text-white border-none disabled:opacity-30"
            >
              <MagnifyingGlassMinus size={20} weight="bold" />
            </Button>
            <Button
              onClick={handleZoomIn}
              disabled={scale >= 3}
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20 text-white border-none disabled:opacity-30"
            >
              <MagnifyingGlassPlus size={20} weight="bold" />
            </Button>
            <span className="text-white text-sm font-medium bg-white/10 px-3 py-2 rounded">
              {Math.round(scale * 100)}%
            </span>
          </div>

          {currentIndex > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous image"
            >
              <ArrowLeft size={28} weight="bold" />
            </motion.button>
          )}

          {currentIndex < images.length - 1 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next image"
            >
              <ArrowRight size={28} weight="bold" />
            </motion.button>
          )}

          <div
            className="w-full h-full flex items-center justify-center select-none overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className={cn(
                  "max-w-full max-h-full object-contain",
                  isDragging ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : "cursor-default"
                )}
                style={{
                  transform: scale > 1 ? `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)` : undefined,
                }}
                draggable={false}
              />
            </AnimatePresence>
          </div>

          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-3 rounded-full"
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </motion.div>

          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2 max-w-[90vw] overflow-x-auto px-4 pb-2 scrollbar-hide">
            {images.map((img, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                  setScale(1)
                  setPosition({ x: 0, y: 0 })
                }}
                variants={thumbnailVariants}
                animate={currentIndex === index ? "active" : "inactive"}
                whileHover={{ opacity: 1, scale: currentIndex === index ? 1.1 : 1.05 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2",
                  currentIndex === index
                    ? "border-white"
                    : "border-transparent"
                )}
              >
                <OptimizedImage
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full"
                  objectFit="cover"
                  sizes="64px"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
