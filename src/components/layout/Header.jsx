import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
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
    { path: '/stays', label: t('nav.stays') },
    { path: '/experiences', label: t('nav.experiences') },
    { path: '/the-riviera', label: t('nav.theRiviera') },
    { path: '/reviews', label: t('nav.reviews') },
    { path: '/how-to-book', label: t('nav.howToBook') },
    { path: '/our-story', label: t('nav.ourStory') }
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
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <Link
                    to="/"
                    className="text-2xl font-heading font-bold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    The VIF
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-medium ${
                          isActivePath(link.path) ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      to="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground"
                    >
                      {t('nav.contact')}
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
