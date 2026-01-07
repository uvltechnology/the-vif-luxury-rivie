import { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const LanguageContext = createContext()

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
]

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useLocalStorage('user-language', 'en')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!currentLanguage) {
      const browserLang = navigator.language.split('-')[0]
      const supported = SUPPORTED_LANGUAGES.find(lang => lang.code === browserLang)
      setCurrentLanguage(supported ? browserLang : 'en')
    }
    setIsLoading(false)
  }, [])

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
