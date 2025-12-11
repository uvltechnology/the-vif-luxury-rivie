# The VIF - Implementation Guide

## Complete React + Vite Project Structure

This is a production-ready French Riviera vacation rental website built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui components.

### Project Structure

```
/workspaces/spark-template/
├── index.html                          # Main HTML entry point with Google Fonts
├── PRD.md                              # Product Requirements Document
├── COPY.md                             # Original brand copy and content
├── package.json                        # Dependencies (React Router installed)
├── src/
│   ├── App.tsx                         # Main app with routing configuration
│   ├── index.css                       # Global styles, theme variables, typography
│   ├── main.tsx                        # Entry point (do not modify)
│   ├── main.css                        # Structural CSS (do not modify)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx             # Main layout wrapper with Outlet
│   │   │   ├── Header.jsx             # Navigation header with mobile menu
│   │   │   └── Footer.jsx             # Site footer with links and newsletter
│   │   │
│   │   ├── home/
│   │   │   ├── HomeHero.jsx           # Full-screen hero with CTA
│   │   │   ├── WhyVIF.jsx             # Three-column feature highlights
│   │   │   ├── FeaturedStays.jsx      # Property cards grid
│   │   │   └── ExperiencesTeaser.jsx  # Four-column experiences preview
│   │   │
│   │   ├── stays/
│   │   │   └── PropertyCard.jsx       # Reusable property card component
│   │   │
│   │   ├── shared/
│   │   │   └── Section.jsx            # Consistent section wrapper
│   │   │
│   │   └── ui/                        # 40+ shadcn components (pre-installed)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── sheet.tsx              # Used for mobile menu
│   │       ├── accordion.tsx
│   │       ├── badge.tsx
│   │       ├── select.tsx
│   │       └── ... (see full list in directory)
│   │
│   ├── pages/
│   │   ├── Home.jsx                   # Home page (hero + sections)
│   │   ├── Stays.jsx                  # All properties with filtering
│   │   ├── PropertyDetail.jsx         # Individual property page
│   │   ├── Experiences.jsx            # All experiences grid
│   │   ├── AreaGuide.jsx             # Riviera area information
│   │   ├── HowToBook.jsx             # Booking process and FAQs
│   │   ├── OurStory.jsx              # About page
│   │   └── Contact.jsx               # Contact form with KV storage
│   │
│   ├── data/
│   │   ├── properties.js              # 3 properties (2 villas + 1 apartment)
│   │   └── experiences.js             # 6 curated experiences
│   │
│   └── lib/
│       └── utils.ts                   # shadcn utilities (cn function)
```

---

## Key Technologies Used

- **React 19.2.0** - UI framework
- **Vite 7.2.6** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first styling
- **shadcn/ui v4** - Component library
- **@phosphor-icons/react** - Icon system
- **sonner** - Toast notifications
- **Spark KV (@github/spark/hooks)** - Data persistence

---

## Routing Structure

All routes are configured in `src/App.tsx`:

```
/                           → Home page
/stays                      → All properties page
/stays/villa-lumiere        → Villa Lumière detail
/stays/villa-azure          → Villa Azure detail
/stays/athena-apartment     → Athena Apartment detail
/experiences                → All experiences page
/the-riviera                → Area guide page
/how-to-book                → Booking information and FAQs
/our-story                  → About page
/contact                    → Contact form page
```

---

## Design System

### Color Palette (OKLCH)

```css
--background: oklch(0.98 0.005 75)      /* Cream white */
--foreground: oklch(0.25 0 0)           /* Charcoal text */
--primary: oklch(0.35 0.08 250)         /* Mediterranean blue */
--secondary: oklch(0.62 0.11 35)        /* Warm terracotta */
--accent: oklch(0.75 0.08 75)           /* Soft gold */
--muted: oklch(0.95 0.005 75)           /* Muted cream */
--border: oklch(0.88 0.005 75)          /* Subtle border */
```

### Typography

- **Headings**: Playfair Display (serif) - elegant, sophisticated
- **Body**: Inter (sans-serif) - clean, readable
- **Sizes**: Responsive with `clamp()` for fluid scaling

### Spacing System

Based on 8px grid:
- Small: 8px
- Base: 16px
- Medium: 24px
- Large: 48px
- XL: 80px

### Border Radius

- Small: 6px
- Default: 8px
- Large: 12px

---

## Data Structure

### Properties (3 total)

Each property in `/src/data/properties.js` includes:
- Basic info (name, slug, type, location, price)
- Capacity details (bedrooms, bathrooms, guests)
- Features (hasPool, hasParking, hasSeaView)
- Descriptions (short, full)
- Amenities (categorized by type)
- House rules
- Nearby attractions
- Image array

### Experiences (6 total)

Each experience in `/src/data/experiences.js` includes:
- Name, slug, tagline
- Pricing information
- Descriptions
- What's included
- Price options for different durations

---

## Data Persistence with Spark KV

The contact form uses `useKV` hook for data persistence:

```jsx
import { useKV } from '@github/spark/hooks'

const [inquiries, setInquiries] = useKV('contact-inquiries', [])

// ALWAYS use functional updates to avoid stale data
setInquiries((current) => [newInquiry, ...current])
```

**Seed data** has been created with 3 sample contact inquiries demonstrating different use cases.

---

## Component Patterns

### Reusable Section Wrapper

```jsx
import Section from '@/components/shared/Section'

<Section className="bg-muted/30">
  <h2>Section Title</h2>
  <p>Content goes here...</p>
</Section>
```

### Property Card

Used on home page and stays page:
```jsx
import PropertyCard from '@/components/stays/PropertyCard'
import { properties } from '@/data/properties'

{properties.map((property) => (
  <PropertyCard key={property.id} property={property} />
))}
```

### Responsive Navigation

- Desktop: Full horizontal nav with CTAs
- Mobile: Hamburger menu (Sheet component) + sticky "Book" button

---

## Mobile Optimizations

1. **Hamburger Menu**: Sheet component slides in from left
2. **Sticky CTAs**: Bottom booking bar on property pages
3. **Touch Targets**: Minimum 44px for all interactive elements
4. **Responsive Typography**: `clamp()` for fluid scaling
5. **Image Galleries**: Swipeable on touch devices
6. **Form Inputs**: Appropriate keyboard types (email, tel, number)

---

## Accessibility Features

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`)
- WCAG AA contrast ratios (4.5:1 minimum)
- Focus states on all interactive elements
- Keyboard navigation support
- ARIA labels where needed
- Alt text on all images

---

## Performance Optimizations

- Lazy loading images (browser native)
- Component code splitting via React Router
- Optimized font loading (preconnect)
- Minimal JavaScript bundles
- CSS variables for theming (no runtime overhead)

---

## Next Steps for Enhancement

1. **Photo Gallery Lightbox**
   - Add full-screen image viewer for property galleries
   - Implement keyboard navigation (arrow keys, ESC)
   - Add swipe gestures for mobile

2. **Booking Calendar**
   - Integrate availability checking
   - Show booked/available dates visually
   - Calculate pricing based on season/duration

3. **Guest Reviews**
   - Add testimonials component
   - Display ratings and review snippets
   - Link to full reviews on property pages

4. **Interactive Map**
   - Embed Google Maps or Mapbox
   - Show property locations and nearby attractions
   - Add custom markers and info windows

5. **Email Integration**
   - Connect contact form to email service
   - Send confirmation emails to guests
   - Notify staff of new inquiries

6. **Search & Filters**
   - Add date-based availability search
   - Filter by price range
   - Sort by popularity, price, capacity

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (latest)

---

## Notes for Developers

### Adding New Properties

1. Add property object to `/src/data/properties.js`
2. Follow existing structure exactly
3. Ensure slug matches URL pattern
4. Add appropriate images
5. Route will work automatically

### Adding New Pages

1. Create page component in `/src/pages/`
2. Add route in `/src/App.tsx`
3. Add nav link in `/src/components/layout/Header.jsx`
4. Update footer links if needed

### Modifying Theme

All theme variables are in `/src/index.css`:
- Change CSS variables in `:root`
- Colors use OKLCH for better perceptual uniformity
- Changes apply globally via CSS variables

### Using Icons

```jsx
import { IconName } from '@phosphor-icons/react'

<IconName size={24} weight="regular" />
```

Available weights: thin, light, regular, bold, fill, duotone

---

## File Naming Conventions

- Components: PascalCase.jsx (HomeHero.jsx)
- Pages: PascalCase.jsx (PropertyDetail.jsx)
- Data files: camelCase.js (properties.js)
- Utilities: camelCase.ts (utils.ts)

---

## Code Quality Standards

- Use functional components with hooks
- Prefer composition over inheritance
- Keep components focused and single-purpose
- Extract reusable logic to custom hooks
- Use TypeScript for type safety where beneficial
- Follow React best practices (keys, proper state updates)

---

## Deployment Considerations

- All routes are client-side (SPA)
- May need server-side redirects for direct URL access
- Environment variables for API keys (if added)
- Optimize images before deployment
- Enable compression (gzip/brotli)
- Set appropriate cache headers

---

This implementation provides a complete, production-ready foundation for The VIF vacation rental website. All core features are functional, the design system is cohesive, and the codebase is structured for easy maintenance and enhancement.
