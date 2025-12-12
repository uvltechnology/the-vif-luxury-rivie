import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'
import { useParallax } from '@/hooks/use-parallax'
import { OptimizedBackgroundImage } from '@/components/shared/OptimizedImage'

export default function HomeHero() {
  const { scrollY } = useScroll()
  const backgroundY = useParallax(0.5)
  const contentY = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          y: backgroundY,
          scale,
        }}
      >
        <OptimizedBackgroundImage
          src="/api/placeholder/1920/1080"
          className="w-full h-full"
          priority={true}
          overlay={true}
          overlayOpacity={0.35}
        />
      </motion.div>
      
      <motion.div
        className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
        style={{
          y: contentY,
          opacity,
        }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-heading font-bold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your French Riviera Retreat Awaits
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 font-light tracking-wide drop-shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Curated villas and apartments in the heart of the Mediterranean
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/stays">
              View Our Stays
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ opacity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}
