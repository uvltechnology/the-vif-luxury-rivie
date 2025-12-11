import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'

export default function HomeHero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/api/placeholder/1920/1080')`,
        }}
      />
      
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 drop-shadow-lg">
          Your French Riviera Retreat Awaits
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light tracking-wide drop-shadow">
          Curated villas and apartments in the heart of the Mediterranean
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/stays">
              View Our Stays
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </div>
  )
}
