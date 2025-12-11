import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { House } from '@phosphor-icons/react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-heading font-bold text-primary/20">404</h1>
        </div>
        <h2 className="text-4xl font-heading font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          The page you're looking for doesn't exist. Perhaps you'd like to explore our collection of French Riviera properties instead?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/">
              <House className="mr-2" size={20} />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/stays">Browse Properties</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
