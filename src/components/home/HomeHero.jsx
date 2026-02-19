import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useParallax } from '@/hooks/use-parallax'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import heroVideo from '@/assets/videos/lv_0_20251213141115.mp4'
import { CaretDown } from '@phosphor-icons/react'

export default function HomeHero() {
  const { scrollY } = useScroll()
  const backgroundY = useParallax(0.3)
  const contentY = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const { t } = useTranslation()
  
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToWelcome = () => {
    const welcomeSection = document.getElementById('welcome')
    if (welcomeSection) {
      welcomeSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background - Villa Soleil Style */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div 
          className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
            isLoaded && videoReady 
              ? 'scale-100 opacity-100' 
              : 'scale-105 opacity-0'
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
        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
      
      {/* Content - Villa Soleil Style - WHITE text */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{
          y: contentY,
          opacity,
        }}
      >
        <motion.h1
          style={{ 
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: '#ffffff',
            textShadow: '0 4px 40px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          {t('hero.title')}
        </motion.h1>

        {/* Decorative wave element like Villa Soleil */}
        <motion.div
          className="flex justify-center my-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
            <path d="M0 6C10 6 10 2 20 2C30 2 30 10 40 10C50 10 50 6 60 6" stroke="white" strokeWidth="1.5" fill="none"/>
          </svg>
        </motion.div>
        
        <motion.p
          style={{ 
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '0.02em',
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 1px 10px rgba(0,0,0,0.3)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          {t('hero.subtitle')}
        </motion.p>
      </motion.div>

      {/* Scroll indicator - Villa Soleil style */}
      <motion.button
        onClick={scrollToWelcome}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CaretDown size={28} weight="thin" />
        </motion.div>
      </motion.button>
    </div>
  )
}
