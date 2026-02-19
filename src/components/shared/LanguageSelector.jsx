import { useState, useRef, useEffect } from 'react'
import { useLanguage, SUPPORTED_LANGUAGES } from '@/contexts/LanguageContext'
import { GlobeSimple, CaretDown } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LanguageSelector({ variant = 'default' }) {
  const { currentLanguage, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || SUPPORTED_LANGUAGES[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  // Styling based on variant (header-light, header-dark, footer, mobile)
  const isLight = variant === 'header-light'
  const isMobile = variant === 'mobile'
  const isFooter = variant === 'footer'

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 transition-all duration-300 hover:opacity-70"
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: isMobile ? '12px' : '11px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          color: isLight ? '#ffffff' : isFooter ? 'rgba(255,255,255,0.7)' : '#1a1a1a',
          textShadow: isLight ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        <GlobeSimple size={isMobile ? 16 : 14} weight="regular" />
        <span className="uppercase">{currentLang.code}</span>
        <CaretDown 
          size={12} 
          weight="bold"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${isMobile ? 'left-0' : 'right-0'} mt-2 py-2 bg-white rounded-sm shadow-lg border border-gray-100 min-w-[140px] z-50`}
            style={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
            }}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center w-full px-4 py-2.5 text-left transition-colors duration-200 ${
                  currentLanguage === lang.code 
                    ? 'bg-[#faf8f5] text-[#c9a962]' 
                    : 'text-gray-700 hover:bg-[#faf8f5]'
                }`}
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.03em'
                }}
              >
                <span className="mr-3">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
