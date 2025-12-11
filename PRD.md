# The VIF - Product Requirements Document

Your French Riviera retreat awaits. A premium vacation rental platform showcasing 2 villas and 1 apartment in the Mediterranean, designed to feel more modern and trustworthy than traditional villa sites while maintaining boutique elegance.

**Experience Qualities**:
1. **Effortlessly Elegant** – Premium feel without pretension; users should feel welcomed, not intimidated
2. **Trustworthy & Transparent** – Clear information, honest photography, straightforward booking process that builds confidence
3. **Aspirational Yet Accessible** – Luxurious enough to excite, friendly enough to book with confidence

**Complexity Level**: Light Application (multiple features with basic state)
- Multi-page navigation with property browsing, filtering, and detail views
- Contact forms and booking inquiry system
- Content showcase for experiences and area guide
- Responsive across all devices with mobile-first approach

## Essential Features

### Property Browsing & Filtering
- **Functionality**: Users can view all properties in a grid/card layout and filter by type (villa/apartment), capacity, or features (pool, sea view)
- **Purpose**: Help guests quickly find the right accommodation for their needs
- **Trigger**: User navigates to "Stays" page or clicks "View Our Stays" from home
- **Progression**: Land on Stays page → See all 3 properties → Click filter pills (optional) → View filtered results → Click "View Details" on chosen property → Navigate to property detail page
- **Success criteria**: Users can identify the right property within 30 seconds; mobile users can easily swipe/scroll through options

### Property Detail Pages
- **Functionality**: Comprehensive information about each villa/apartment with interactive gallery, amenities, location, policies, and booking CTA
- **Purpose**: Provide all information needed to make a booking decision in one place with engaging visual presentation
- **Trigger**: User clicks "View Details" on any property card
- **Progression**: View hero gallery with lightbox → Click to open full-screen gallery → Zoom and swipe through images → Close lightbox → Scroll through key facts → Read description → Check amenities → Review location/policies → Click "Check Availability" CTA → Navigate to contact/booking
- **Success criteria**: Users spend 2-3 minutes on page (engaged); CTA clicked within first scroll on mobile; no confusion about what's included; gallery engagement rate >70%

### Experiences Add-Ons
- **Functionality**: Showcase optional services (private chef, wine tours, transfers, yacht excursions) with pricing and inquiry options
- **Purpose**: Increase booking value and provide convenience; position The VIF as a full-service host
- **Trigger**: User clicks "Experiences" in nav or "Enhance Your Stay" section on property pages
- **Progression**: Browse experience cards → Click "Learn More" → Read details → Click "Request This" → Fill inquiry form with dates/property
- **Success criteria**: At least 20% of property detail visitors navigate to Experiences; clear connection between stays and add-ons

### Area Guide
- **Functionality**: Editorial-style content showcasing nearby towns, beaches, dining, and activities
- **Purpose**: Build excitement, answer "what will I do there?" questions, establish local expertise
- **Trigger**: User clicks "The Riviera" in navigation or area teaser on home page
- **Progression**: View hero → Browse towns section → Click on specific town/beach → Read curated recommendations → Feel inspired → Return to Stays to book
- **Success criteria**: Users spend 1-2 minutes browsing; contributes to booking confidence; low bounce rate

### Booking Inquiry & Contact
- **Functionality**: Simple contact form with fields for dates, guests, property selection, and message
- **Purpose**: Convert interest into actionable inquiries; provide personalized service
- **Trigger**: User clicks "Check Availability", "Book Now", or "Contact" CTAs throughout site
- **Progression**: Click CTA → Form opens (or navigates to Contact page) → Fill required fields → Submit → See confirmation message → Receive email response within 24h
- **Success criteria**: Form completion rate >60%; mobile form is easy to use; validation prevents errors

### Guest Reviews & Testimonials
- **Functionality**: Display verified guest reviews on home page, dedicated reviews page, and property detail pages with filtering and sorting capabilities
- **Purpose**: Build trust through social proof; showcase authentic guest experiences; help potential guests make informed decisions
- **Trigger**: User views home page testimonials section, navigates to /reviews page, or scrolls to reviews on property detail page
- **Progression**: View testimonials section → Read featured reviews → Click "Read More Reviews" or "View All" → Filter by property or sort by date/rating → Read detailed reviews → Feel confident about booking
- **Success criteria**: Reviews appear on key pages; filters work smoothly; users spend time reading reviews; contributes to booking confidence

### Photo Gallery Lightbox
- **Functionality**: Full-screen, immersive photo gallery with zoom (up to 3x), pan, and swipe/keyboard navigation for all property images
- **Purpose**: Allow guests to thoroughly inspect properties; build confidence through detailed visual exploration; create engaging, premium browsing experience
- **Trigger**: User clicks on any property image, "View Gallery" overlay, or "View All Photos" button on property detail pages
- **Progression**: Click image/button → Lightbox opens full-screen → View current image → Swipe/arrow to next/previous → Zoom in to inspect details → Pan around zoomed image → Click thumbnails to jump to specific image → Press ESC or close to exit
- **Success criteria**: Smooth 60fps animations; touch gestures work intuitively on mobile; zoom functionality allows detailed inspection; keyboard shortcuts work (arrows, +/-, ESC); no lag or janky transitions

## Edge Case Handling

- **No Properties Available for Dates** – Show alternative date suggestions or waitlist signup option
- **Mobile Menu Open + Orientation Change** – Menu repositions gracefully; closes automatically on large landscape
- **Slow Image Loading** – Blur-up placeholders prevent layout shift; skeleton loaders with shimmer animation for property cards during initial load and filter changes
- **Property Card Loading States** – Animated skeleton placeholders appear during data fetching with smooth shimmer effect; staggered fade-in when content loads
- **Form Submission Errors** – Clear error messages with specific field highlights; data persists on error
- **Invalid URLs / 404 Pages** – Custom 404 page with navigation back to home/stays
- **Accessibility Navigation** – Full keyboard support; skip-to-content link; focus trapping in modals

## Design Direction

The design should evoke the feeling of a warm September afternoon on a Mediterranean terrace: sunlight filtering through, soft linens, terracotta tiles, the distant sound of the sea. It's elegant but never stuffy—like a boutique hotel run by a sophisticated friend who genuinely wants you to have the best holiday. Think editorial photography layouts (Kinfolk, Cereal magazine) combined with the functional clarity of modern booking platforms (Airbnb Luxe, Mr & Mrs Smith).

## Color Selection

**Approach**: Mediterranean-inspired palette balancing cool coastal blues with warm terracotta and golden accents. Sophisticated but not corporate; warm but not overwhelming.

- **Primary Color**: Deep Mediterranean Blue `oklch(0.35 0.08 250)` – Evokes the Riviera sea at depth; conveys trust, sophistication, and stability. Used for primary CTAs and key UI elements.
  
- **Secondary Color**: Warm Terracotta `oklch(0.62 0.11 35)` – References coastal architecture and sunset hues; provides warmth and approachability. Used for accents, hover states, and highlighting.
  
- **Accent Color**: Soft Gold `oklch(0.75 0.08 75)` – Suggests sunlight and premium quality without being garish. Used sparingly for special highlights, badges, or premium indicators.
  
- **Background**: Cream White `oklch(0.98 0.005 75)` – Softer than pure white; easier on eyes and feels more premium. Main page background.
  
- **Surface/Card**: Pure White `oklch(1 0 0)` – For cards and elevated surfaces to create subtle depth against cream background.
  
- **Text Primary**: Charcoal `oklch(0.25 0 0)` – Softer than black for reduced eye strain while maintaining strong readability.
  
- **Text Secondary**: Muted Gray `oklch(0.55 0 0)` – For supporting text, captions, and less critical information.

**Foreground/Background Pairings**:
- Primary Blue on Cream `oklch(0.35 0.08 250)` on `oklch(0.98 0.005 75)` – Ratio 8.2:1 ✓
- Charcoal on Cream `oklch(0.25 0 0)` on `oklch(0.98 0.005 75)` – Ratio 12.1:1 ✓
- White on Primary Blue `oklch(1 0 0)` on `oklch(0.35 0.08 250)` – Ratio 7.8:1 ✓
- Charcoal on White `oklch(0.25 0 0)` on `oklch(1 0 0)` – Ratio 13.4:1 ✓
- Muted Gray on White `oklch(0.55 0 0)` on `oklch(1 0 0)` – Ratio 4.6:1 ✓

## Font Selection

Typography should balance editorial elegance with modern web readability—serif headlines for personality and sophistication, clean sans-serif body copy for effortless reading on all devices.

**Primary Font (Headings)**: Playfair Display
- Conveys elegance, refinement, and a touch of European sophistication
- High-contrast serif with graceful curves
- Used for: H1, H2, property names, section headers

**Secondary Font (Body)**: Inter
- Exceptional readability at all sizes
- Modern, neutral, and highly functional
- Used for: Body text, navigation, buttons, form labels, captions

**Typographic Hierarchy**:
- **H1 (Page Titles)**: Playfair Display Semibold / 56px / line-height 1.1 / letter-spacing -0.02em
- **H2 (Section Headers)**: Playfair Display Semibold / 40px / line-height 1.2 / letter-spacing -0.01em
- **H3 (Card Titles)**: Playfair Display Medium / 28px / line-height 1.3 / letter-spacing 0
- **Body Large**: Inter Regular / 18px / line-height 1.6 / letter-spacing 0
- **Body**: Inter Regular / 16px / line-height 1.6 / letter-spacing 0
- **Small/Caption**: Inter Regular / 14px / line-height 1.5 / letter-spacing 0.01em
- **Buttons/Nav**: Inter Medium / 15px / line-height 1.4 / letter-spacing 0.02em / uppercase for primary CTAs

## Animations

Animations should feel like natural, physics-based movements—never robotic or distracting. They serve to guide attention, provide feedback, and add moments of delight. Think gentle Mediterranean breezes, not flashy effects.

**Philosophy**: Subtle functionality with occasional moments of delight. Every animation must have a purpose—guiding the eye, confirming an action, or creating spatial relationships. Timing follows natural ease curves; nothing snaps or feels instant.

**Specific Uses**:
- **Page transitions**: Gentle fade (300ms) prevents jarring jumps between routes
- **Property cards on hover**: Lift upward (8px translateY) with shadow growth (400ms ease-out) suggests physicality
- **Property card loading skeletons**: Shimmer animation (2s infinite) with gradient sweep across skeleton elements; staggered fade-in (100ms delay between cards) when real content loads
- **Scroll-triggered content**: Fade + slide from bottom (600ms ease-out, staggered 100ms) as sections enter viewport
- **Image galleries**: Smooth scale on hover (1.05x over 500ms); swipe gestures feel responsive with 60fps; cross-fade transitions (300ms) when switching images
- **Property amenities list**: Staggered fade-in from left (400ms ease-out, 50ms delay between items) when scrolling into view
- **Filter buttons**: Hover scale-up (1.05x) with subtle lift (2px translateY); pressed scale-down (0.98x) for tactile feedback
- **CTA buttons**: Micro-scale (1.02x) + shadow on hover (250ms ease); ripple effect on click for tactile feedback
- **Form interactions**: Input border color/glow transitions (200ms); success checkmarks draw in (400ms)
- **Mobile menu**: Slide-in from left (350ms cubic-bezier) with backdrop blur fade
- **Sticky booking bar**: Slides up from bottom when scrolling down on property pages (300ms ease-out)

## Component Selection

**Components**: Leveraging shadcn/ui for consistency and development speed, with custom modifications to match The VIF brand.

- **Navigation**: Custom Header component with shadcn Sheet for mobile menu; includes backdrop blur and smooth slide animation
- **Property Cards**: shadcn Card as base, heavily customized with hover effects, image overlays, and badge components
- **Hero Sections**: Custom full-bleed components with background images/video, text overlays with gradient scrims for legibility
- **Photo Gallery Lightbox**: Custom full-screen Dialog component with zoom controls (1x-3x), pan/drag on zoomed images, swipe gestures, keyboard navigation, thumbnail strip, and image counter
- **Buttons**: shadcn Button with three variants (primary filled, secondary outline, ghost) using brand colors
- **Forms**: shadcn Input, Textarea, Select components with custom focus states matching brand; integrated with react-hook-form for validation
- **Dialogs/Modals**: shadcn Dialog for lightbox galleries and booking forms; mobile-optimized as full-screen on small devices
- **Accordions**: shadcn Accordion for FAQs and expandable policy sections; smooth open/close animations
- **Tabs**: shadcn Tabs for organizing amenities or gallery categories if needed
- **Toasts**: sonner for success/error notifications after form submissions; positioned top-right on desktop, top-center on mobile

**Customizations**:
- Custom PropertyGallery component using Dialog + Carousel for lightbox
- PropertyCardSkeleton with shimmer animation for loading states on Stays page and home page featured properties
- StickyBookingBar custom component with scroll-triggered visibility
- Custom Section wrapper component for consistent spacing and fade-in animations
- ExperienceCard and PropertyCard as specialized Card extensions with branded styling
- Custom Icon components wrapping phosphor-icons with consistent sizing

**States**:
- **Buttons**: Default, hover (lift + darken), active (pressed), focus (ring), disabled (50% opacity)
- **Inputs**: Default, focus (border + glow), filled, error (red border + message), success (green checkmark), disabled
- **Cards**: Default, hover (lift + shadow), active (when clickable)
- **Navigation**: Default link, active page (underline), hover (color shift)

**Icon Selection** (from @phosphor-icons/react):
- Navigation: House, Bed, Compass, BookOpen, Phone, User
- Amenities: WifiHigh, Television, Snowflake (AC), Flame (heating), Car, Swimmer
- Property features: Users (capacity), BathtubIcon (bathrooms), Door (bedrooms)
- Experiences: ChefHat, WineBottle, Boat, AirplaneTakeoff
- UI actions: X (close), List (menu), MagnifyingGlass (search), Heart (save), Share, ArrowRight, Calendar

**Spacing**: Following an 8px base unit
- **Micro**: 4px (tight inline elements)
- **Small**: 8px (compact groups)
- **Base**: 16px (standard spacing between related elements)
- **Medium**: 24px (breathing room between sections within a component)
- **Large**: 48px (space between major sections)
- **XL**: 80px (top/bottom padding for hero sections)
- **Container padding**: 24px mobile, 48px tablet, 80px desktop (sides)

**Mobile**: Mobile-first approach with progressive enhancement
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Navigation**: Hamburger menu in Sheet component; logo centered; "Book" button always visible
- **Hero**: 70vh height on mobile vs full viewport on desktop; text sizing scales down
- **Property cards**: Stack vertically on mobile; horizontal scrollable gallery on tablet; grid on desktop
- **Galleries**: Swipeable on mobile using touch gestures; click-through arrows on desktop
- **Forms**: Full-width inputs; larger touch targets (min 44px); smart keyboard types (email, tel, number)
- **Sticky elements**: Booking bar sticks to bottom on mobile (fixed); sidebar booking card on desktop (sticky)
- **Typography**: Fluid sizing using clamp() for smooth scaling between breakpoints
- **Images**: Different crops for mobile portrait vs desktop landscape; lazy loading below fold
