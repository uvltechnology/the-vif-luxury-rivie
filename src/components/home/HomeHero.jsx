import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'
import { useParallax } from '@/hooks/use-parallax'
import { useState, useEffect } from 'react'
import heroVideo from '@/assets/videos/lv_0_20251213141115.mp4'

export default function HomeHero() {
  const { scrollY } = useScroll()
  const backgroundY = useParallax(0.5)
  const contentY = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])
  
  // State for smooth zoom-in animation on load
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    // Trigger zoom animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with Smooth Zoom Transition */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: backgroundY,
          scale,
        }}
      >
        <div 
          className={`absolute inset-0 transition-all duration-[2500ms] ease-out ${
            isLoaded && videoReady 
              ? 'scale-100 opacity-100' 
              : 'scale-110 opacity-0'
          }`}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            onCanPlayThrough={() => setVideoReady(true)}
            onLoadedData={() => setVideoReady(true)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        {/* Dark overlay for text readability - stronger opacity */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Additional gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      </motion.div>
      
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          y: contentY,
          opacity,
        }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
          style={{ 
            textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)',
            color: '#ffffff'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your French Riviera Retreat Awaits
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 font-light tracking-wide text-white"
          style={{ 
            textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.4)',
            color: '#ffffff'
          }}
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
