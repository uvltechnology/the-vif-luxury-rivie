# Multilingual Support Documentation

## Overview

The VIF platform now supports 5 languages to serve international guests visiting the French Riviera:

- 🇬🇧 **English** (en) - Default
- 🇫🇷 **Français** (fr) - French
- 🇮🇹 **Italiano** (it) - Italian
- 🇩🇪 **Deutsch** (de) - German
- 🇪🇸 **Español** (es) - Spanish

## Features

### Automatic Language Detection
- Browser language is automatically detected on first visit
- Falls back to English if browser language is not supported
- Preference is persisted using Spark's KV storage

### Language Switcher
- Accessible from the header on all pages (desktop and mobile)
- Dropdown menu with flag icons and language names
- Current language is highlighted in the dropdown
- Instant language switching without page reload

### Translation Coverage
All UI elements are fully translated including:
- Navigation menus
- Property listings and details
- Amenities and house rules
- Contact forms
- Admin dashboard
- Footer content
- Button labels and CTAs
- Error messages and notifications

## Implementation

### Context Provider
The `LanguageProvider` wraps the entire app and provides:
- Current language state
- Language change function
- Loading state during initialization

```jsx
<LanguageProvider>
  <App />
</LanguageProvider>
```

### Using Translations in Components

Import the `useTranslation` hook:

```jsx
import { useTranslation } from '@/hooks/useTranslation'

function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  )
}
```

### Translation Keys Structure

Translations are organized by feature/section:

```javascript
{
  nav: { home, stays, experiences, ... },
  hero: { title, subtitle, cta, ... },
  property: { perNight, guests, amenities, ... },
  contact: { title, name, email, ... },
  admin: { dashboard, bookings, ... },
  common: { loading, error, success, ... },
  // ... and more
}
```

### Adding New Translations

1. **Add the key to all language files** (`en.js`, `fr.js`, `it.js`, `de.js`, `es.js`):

```javascript
// In src/translations/en.js
export const en = {
  // ... existing translations
  newSection: {
    newKey: 'New text in English'
  }
}
```

2. **Use in components**:

```jsx
const { t } = useTranslation()
<p>{t('newSection.newKey')}</p>
```

## File Structure

```
src/
├── contexts/
│   └── LanguageContext.jsx       # Language state management
├── hooks/
│   └── useTranslation.js         # Translation hook
├── translations/
│   ├── index.js                  # Translation utilities
│   ├── en.js                     # English translations
│   ├── fr.js                     # French translations
│   ├── it.js                     # Italian translations
│   ├── de.js                     # German translations
│   └── es.js                     # Spanish translations
└── components/
    └── shared/
        └── LanguageSwitcher.jsx  # Language selection UI
```

## Best Practices

### 1. Always use translation keys
❌ Don't hardcode text:
```jsx
<Button>Book Now</Button>
```

✅ Use translation keys:
```jsx
<Button>{t('nav.book')}</Button>
```

### 2. Keep keys descriptive and organized
Group related translations together and use clear, semantic key names:
```javascript
contact: {
  title: 'Get in Touch',
  subtitle: 'We\'re here to help',
  name: 'Name',
  email: 'Email',
  submit: 'Send Message'
}
```

### 3. Test all languages
When adding new features:
1. Add translation keys to all 5 language files
2. Test the UI with each language selected
3. Ensure text doesn't overflow or break layouts
4. Verify special characters display correctly

### 4. Handle dynamic content
For content with variables, consider using template literals or string interpolation:
```javascript
// If needed in the future
const message = `${t('booking.nights')}: ${nightCount}`
```

### 5. Consider text expansion
Different languages have different text lengths:
- German words are typically longer
- Italian and Spanish use more characters
- Design UI components with flexibility for text expansion

## Language-Specific Considerations

### French (fr)
- Apostrophes in words like "d'Azur", "l'arrivée"
- Accented characters: é, è, ê, à, ô
- Formal tone maintained throughout

### Italian (it)
- Accented characters: à, è, é, ì, ò, ù
- Natural, warm tone
- Longer phrases in some contexts

### German (de)
- Compound words can be very long
- Capitalized nouns
- Formal "Sie" form used throughout
- Use of umlauts: ä, ö, ü, ß

### Spanish (es)
- Inverted punctuation: ¡, ¿
- Accented characters: á, é, í, ó, ú, ñ
- Warm, welcoming tone

## SEO Considerations

Currently, all languages share the same URLs. For future SEO optimization, consider:
- Language-specific URLs (`/fr/stays`, `/de/stays`)
- `hreflang` tags for search engines
- Language-specific meta descriptions
- Sitemap with language alternates

## Testing

Test the multilingual system by:
1. Switching between all languages in the UI
2. Refreshing the page to verify persistence
3. Opening in incognito to test auto-detection
4. Testing on mobile and desktop
5. Verifying all pages and components

## Future Enhancements

Potential improvements:
- Add more languages (Portuguese, Russian, Chinese, Japanese)
- Translate property descriptions (currently static)
- RTL support for Arabic/Hebrew
- Language-specific date/currency formatting
- Translation management system for non-technical updates
- Professional translation review and localization
