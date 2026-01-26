import HomeHero from '@/components/home/HomeHero'
import WelcomeSection from '@/components/home/WelcomeSection'
import FeaturedCarousel from '@/components/home/FeaturedCarousel'
import StaySection from '@/components/home/StaySection'
import GuestReviews from '@/components/home/GuestReviews'
import LocationSection from '@/components/home/LocationSection'

export default function Home() {
  return (
    <div>
      <HomeHero />
      <WelcomeSection />
      <FeaturedCarousel />
      <StaySection />
      <GuestReviews />
      <LocationSection />
    </div>
  )
}
