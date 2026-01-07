import HomeHero from '@/components/home/HomeHero'
import WhyVIF from '@/components/home/WhyVIF'
import FeaturedStays from '@/components/home/FeaturedStays'
import NearbyDestinations from '@/components/home/NearbyDestinations'
import ExperiencesTeaser from '@/components/home/ExperiencesTeaser'
import Testimonials from '@/components/home/Testimonials'

export default function Home() {
  return (
    <div>
      <HomeHero />
      <WhyVIF />
      <FeaturedStays />
      <NearbyDestinations />
      <ExperiencesTeaser />
      <Testimonials />
    </div>
  )
}
