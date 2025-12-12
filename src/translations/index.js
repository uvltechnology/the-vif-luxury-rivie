import { en } from './en'
import { fr } from './fr'
import { it } from './it'
import { de } from './de'
import { es } from './es'

export const translations = {
  en,
  fr,
  it,
  de,
  es
}

export function getTranslation(lang, key) {
  const keys = key.split('.')
  let value = translations[lang] || translations.en
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      return key
    }
  }
  
  return value || key
}
