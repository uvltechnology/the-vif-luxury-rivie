import HomeHero from '@/components/home/HomeHero'
import WhyVIF from '@/components/home/WhyVIF'
import FeaturedStays from '@/components/home/FeaturedStays'
import ExperiencesTeaser from '@/components/home/ExperiencesTeaser'

export default function Home() {
  return (
    <div>
      <HomeHero />
      <WhyVIF />
      <FeaturedStays />
      <ExperiencesTeaser />
    </div>
  )
}
