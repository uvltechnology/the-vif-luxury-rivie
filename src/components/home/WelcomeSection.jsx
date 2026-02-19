import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from '@/hooks/useTranslation'

export default function WelcomeSection() {
  const { t } = useTranslation()
  
  return (
    <section id="welcome" className="py-32 md:py-40 bg-[#faf8f5]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Section Label - Villa Soleil Style */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#777'
          }}
          className="mb-8"
        >
          {t('home.welcome.label')}
        </motion.p>
        
        {/* Main Heading - Villa Soleil Style Large Serif */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            color: '#0f1c2e'
          }}
          className="mb-10"
        >
          {t('home.welcome.title')}
        </motion.h2>
        
        {/* Description - Villa Soleil Style */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
            fontWeight: 300,
            lineHeight: 1.8,
            color: '#555'
          }}
          className="max-w-3xl mx-auto"
        >
          {t('home.welcome.description')}
        </motion.p>
      </div>
    </section>
  )
}
