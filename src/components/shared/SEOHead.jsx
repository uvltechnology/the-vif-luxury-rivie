import { useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SEOHead() {
  const { t } = useTranslation()
  const { currentLanguage } = useLanguage()

  useEffect(() => {
    // Update meta description based on language
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t('seo.metaDescription'))
    }

    // Update OG description
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', t('seo.metaDescription'))
    }

    // Update html lang attribute
    document.documentElement.lang = currentLanguage
  }, [currentLanguage, t])

  return null
}
