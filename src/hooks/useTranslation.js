import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'

export function useTranslation() {
  const { currentLanguage } = useLanguage()
  
  const t = (key) => {
    return getTranslation(currentLanguage, key)
  }
  
  return { t, currentLanguage }
}
