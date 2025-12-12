import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  List, 
  X, 
  House, 
  Sparkle, 
  MapTrifold, 
  Star, 
  BookOpen, 
  Heart,
  ChatCircleDots,
  CaretRight
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { useTranslation } from '@/hooks/useTranslation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/stays', label: t('nav.stays'), icon: House, description: 'Villas & Apartments' },
    { path: '/experiences', label: t('nav.experiences'), icon: Sparkle, description: 'Curated Extras' },
    { path: '/the-riviera', label: t('nav.theRiviera'), icon: MapTrifold, description: 'Local Guides' },
    { path: '/reviews', label: t('nav.reviews'), icon: Star, description: 'Guest Stories' },
    { path: '/how-to-book', label: t('nav.howToBook'), icon: BookOpen, description: 'Booking Info' },
    { path: '/our-story', label: t('nav.ourStory'), icon: Heart, description: 'About Us' }
  ]

  const isActivePath = (path) => {
    if (path === '/stays' && location.pathname.startsWith('/stays')) {
      return true
    }
    return location.pathname === path
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold tracking-tight text-foreground">
              The VIF
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors relative ${
                  isActivePath(link.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
                {isActivePath(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button asChild variant="ghost" size="sm">
              <Link to="/contact">{t('nav.contact')}</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/contact">{t('nav.book')}</Link>
            </Button>
          </div>

          <div className="flex lg:hidden items-center space-x-3">
            <LanguageSwitcher />
            <Button asChild size="sm">
              <Link to="/contact">{t('nav.book')}</Link>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <List className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="px-6 py-6 border-b border-border">
                    <Link
                      to="/"
                      className="text-3xl font-heading font-bold text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      The VIF
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      The Vacation in France
                    </p>
                  </div>
                  
                  <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <div className="space-y-1">
                      {navLinks.map((link) => {
                        const Icon = link.icon
                        const isActive = isActivePath(link.path)
                        return (
                          <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`
                              group flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-200
                              ${isActive 
                                ? 'bg-primary/10 text-primary' 
                                : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                              }
                            `}
                          >
                            <div className={`
                              p-2 rounded-md transition-colors
                              ${isActive 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                              }
                            `}>
                              <Icon className="h-5 w-5" weight={isActive ? 'fill' : 'regular'} />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-base">{link.label}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {link.description}
                              </div>
                            </div>
                            <CaretRight 
                              className={`
                                h-4 w-4 transition-transform
                                ${isActive ? 'text-primary' : 'text-muted-foreground opacity-0 group-hover:opacity-100'}
                              `}
                              weight="bold"
                            />
                          </Link>
                        )
                      })}
                    </div>

                    <Separator className="my-6" />

                    <Link
                      to="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-200 text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <div className="p-2 rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                        <ChatCircleDots className="h-5 w-5" weight="regular" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-base">{t('nav.contact')}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Get in Touch
                        </div>
                      </div>
                      <CaretRight 
                        className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-transform"
                        weight="bold"
                      />
                    </Link>
                  </nav>

                  <div className="p-6 border-t border-border bg-muted/30">
                    <Button asChild className="w-full" size="lg">
                      <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                        {t('nav.book')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
