# The VIF - French Riviera Vacation Rentals

A modern, elegant website for luxury villa and apartment rentals on the French Riviera, built with React, Vite, and Tailwind CSS.

![The VIF](https://img.shields.io/badge/React-19.2-blue) ![Vite](https://img.shields.io/badge/Vite-7.2-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-4.1-cyan)

## 🏖️ Overview

**The VIF** (The Vacation in France) is a premium vacation rental platform showcasing 2 villas and 1 apartment in the French Riviera. The site emphasizes elegant design, intuitive navigation, and trustworthy presentation—combining the structural clarity of modern booking platforms with the visual sophistication of boutique hospitality brands.

### Key Features

- ✨ **3 Curated Properties** - Villa Rocsea, Villa Bellevue, and Palm Beach Apartment
- 🎯 **6 Premium Experiences** - Private chef, wine tours, yacht excursions, transfers, cultural tours, wellness
- 🗺️ **Comprehensive Area Guide** - Nearby towns, beaches, dining, and activities
- 🔒 **Admin Dashboard** - Property owner portal for managing bookings and availability
- 📅 **Booking Calendar** - Real-time availability with seasonal pricing
- 📱 **Fully Responsive** - Mobile-first design with progressive enhancement
- 🎨 **Mediterranean Design System** - OKLCH colors, elegant typography, generous spacing
- 📧 **Contact Form** - With persistent storage using Spark KV
- 🧭 **Client-Side Routing** - Smooth navigation with React Router

## 🎨 Design Philosophy

The design evokes a **warm September afternoon on a Mediterranean terrace**—elegant but not intimidating, aspirational yet accessible. Think editorial photography layouts (Kinfolk, Cereal magazine) combined with the functional clarity of modern booking platforms.

### Color Palette

- **Primary**: Deep Mediterranean Blue `oklch(0.35 0.08 250)` - Trust and sophistication
- **Secondary**: Warm Terracotta `oklch(0.62 0.11 35)` - Warmth and approachability  
- **Accent**: Soft Gold `oklch(0.75 0.08 75)` - Premium quality
- **Background**: Cream White `oklch(0.98 0.005 75)` - Elegant, soft
- **Text**: Charcoal `oklch(0.25 0 0)` - Readable, modern

### Typography

- **Headings**: Playfair Display (serif) - Elegant, refined, European sophistication
- **Body**: Inter (sans-serif) - Clean, highly readable, modern web typography

## 🏗️ Project Structure

```
src/
├── components/
│   ├── admin/             # Admin dashboard components
│   ├── layout/            # Header, Footer, Layout wrapper
│   ├── home/              # Home page sections (Hero, WhyVIF, etc.)
│   ├── stays/             # Property-related components
│   ├── shared/            # Reusable components (Section wrapper)
│   └── ui/                # 40+ shadcn components
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Stays.jsx          # All properties with filtering
│   ├── PropertyDetail.jsx # Individual property pages
│   ├── Experiences.jsx    # Curated experiences
│   ├── AreaGuide.jsx      # French Riviera area guide
│   ├── HowToBook.jsx      # Booking process and FAQs
│   ├── OurStory.jsx       # About page
│   ├── Contact.jsx        # Contact form
│   └── Admin.tsx          # Admin dashboard (owner only)
├── data/
│   ├── properties.js      # 3 property definitions
│   └── experiences.js     # 6 experience definitions
└── App.tsx                # Router configuration
```

## 🛠️ Tech Stack

- **React 19.2** - UI framework
- **Vite 7.2** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS 4.1** - Utility-first styling
- **React Router DOM** - Client-side routing
- **shadcn/ui v4** - Component library
- **@phosphor-icons/react** - Icon system
- **Sonner** - Toast notifications
- **Spark KV** - Data persistence

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📄 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, features, property showcase |
| `/stays` | All Properties | Filterable property grid |
| `/stays/villa-lumiere` | Villa Lumière | 4-bed villa with pool |
| `/stays/villa-azure` | Villa Azure | 3-bed villa with pool |
| `/stays/athena-apartment` | Athena Apartment | 1-bed seaside apartment |
| `/experiences` | Experiences | Curated add-on services |
| `/the-riviera` | Area Guide | Local information and attractions |
| `/how-to-book` | Booking Info | Process, policies, FAQs |
| `/our-story` | About | Brand story and values |
| `/contact` | Contact | Inquiry form |
| `/admin` | Admin Dashboard | Bookings & availability (owner only) |

## 🔒 Admin Dashboard

Property owners can access the admin dashboard at `/admin` to manage bookings and availability.

**Features:**
- **Bookings Management**: View, create, update, and delete bookings
- **Real-time Statistics**: Track confirmed, pending, and cancelled reservations
- **Availability Calendar**: Block dates for maintenance or personal use
- **Search & Filter**: Find bookings quickly by guest or property
- **Mobile Responsive**: Full functionality on all devices

**Access Control:**
- Only users with `isOwner` status can access the dashboard
- Authentication verified via Spark's `spark.user()` API
- Unauthorized users see an access denied message

📖 See [ADMIN_README.md](./ADMIN_README.md) for detailed documentation.

## 🎯 Key Components

### PropertyCard
Reusable card component for displaying properties with image, details, amenities, and CTA.

```jsx
import PropertyCard from '@/components/stays/PropertyCard'
import { properties } from '@/data/properties'

<PropertyCard property={properties[0]} />
```

### Section Wrapper
Consistent section padding and container width.

```jsx
import Section from '@/components/shared/Section'

<Section className="bg-muted/30">
  <h2>Section Title</h2>
  {/* Content */}
</Section>
```

### Header & Navigation
- Desktop: Full horizontal nav with CTAs
- Mobile: Hamburger menu (Sheet) + sticky "Book" button
- Scroll-aware background blur effect

## 💾 Data Persistence

The app uses Spark KV for persistent storage across multiple features:

### Contact Inquiries
```jsx
import { useKV } from '@github/spark/hooks'

const [inquiries, setInquiries] = useKV('contact-inquiries', [])

// Use functional updates to avoid stale state
setInquiries((current) => [newInquiry, ...current])
```

### Admin Bookings
Bookings created in the admin dashboard are stored in:
- `admin-bookings` - All booking records
- `bookings-{propertyId}` - Property-specific booked dates (ISO strings)
- `admin-blocked-dates` - Admin-blocked date ranges

### Best Practices
- Always use functional updates with `setters` to avoid stale state bugs
- Data persists between sessions automatically
- No external database or API required

**Seed Data**: 3 sample contact inquiries are pre-loaded to demonstrate functionality.

## 🎨 Customization

### Changing Theme Colors

Edit `/src/index.css`:

```css
:root {
  --primary: oklch(0.35 0.08 250);     /* Your primary color */
  --secondary: oklch(0.62 0.11 35);    /* Your secondary color */
  /* ... other variables */
}
```

### Adding Properties

1. Add property object to `/src/data/properties.js`
2. Follow the existing structure
3. Ensure unique `slug` for URL
4. Route will work automatically

### Adding Pages

1. Create component in `/src/pages/`
2. Add route in `/src/App.tsx`
3. Update Header navigation if needed

## 📱 Mobile Optimizations

- Hamburger menu with smooth slide-in animation
- Bottom sticky booking CTA on property pages
- Touch-optimized buttons (min 44px targets)
- Responsive typography with fluid scaling
- Swipeable image galleries
- Appropriate keyboard types for form inputs

## ♿ Accessibility

- Semantic HTML throughout
- WCAG AA contrast ratios (4.5:1 minimum)
- Keyboard navigation support
- Focus states on all interactive elements
- ARIA labels where appropriate
- Alt text on all images

## 📚 Documentation

- **PRD.md** - Product Requirements Document with full planning framework
- **ADMIN_README.md** - Admin dashboard user guide and technical documentation
- **COPY.md** - Original brand copy, taglines, and voice guidelines
- **IMPLEMENTATION.md** - Detailed technical implementation guide

## 🎯 Suggested Next Steps

1. **Photo Gallery Lightbox** - Full-screen image viewer with keyboard navigation
2. **Booking Calendar** - Availability checking and date selection
3. **Guest Reviews** - Testimonials and ratings system
4. **Interactive Maps** - Google Maps/Mapbox integration
5. **Email Integration** - Connect form to email service
6. **Advanced Search** - Date-based availability and filters

## 🤝 Contributing

This is a production-ready template. To extend:

1. Follow existing component patterns
2. Maintain consistent styling (Tailwind utilities)
3. Use TypeScript where beneficial
4. Keep components focused and reusable
5. Test responsive behavior at all breakpoints

## 📝 License

This project is part of The VIF vacation rental brand.

---

**Built with care for the French Riviera** 🇫🇷 ☀️ 🌊
