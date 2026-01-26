import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { List, Phone, Bell } from '@phosphor-icons/react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const isHomePage = location.pathname === '/'
  const useTransparentNav = isHomePage && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/the-villa', label: 'THE VILLA' },
    { path: '/services', label: 'SERVICES' },
    { path: '/experiences', label: 'EXPERIENCES' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/contact', label: 'CONTACT' },
  ]

  const isActivePath = (path) => {
    return location.pathname === path
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        useTransparentNav 
          ? 'bg-transparent' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="w-full px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Left Navigation - Villa Soleil Style */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: useTransparentNav ? '#ffffff' : '#1a1a1a',
                  textShadow: useTransparentNav ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
                }}
                className="transition-all duration-300 hover:opacity-60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center Logo - With white outline for visibility */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <span 
              style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '26px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: '#c9a962',
                textShadow: useTransparentNav 
                  ? '-1px -1px 0 rgba(255,255,255,0.5), 1px -1px 0 rgba(255,255,255,0.5), -1px 1px 0 rgba(255,255,255,0.5), 1px 1px 0 rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.3)' 
                  : 'none',
                WebkitTextStroke: useTransparentNav ? '0.5px rgba(255,255,255,0.4)' : 'none'
              }}
              className="transition-all duration-300"
            >
              THE VIF
            </span>
          </Link>

          {/* Right Side - Phone & Book Now - Villa Soleil Style */}
          <div className="hidden lg:flex items-center space-x-6">
            <a 
              href="tel:+33615322966" 
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: useTransparentNav ? '#ffffff' : '#1a1a1a',
                textShadow: useTransparentNav ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
              }}
              className="flex items-center space-x-2 transition-colors duration-300 hover:opacity-70"
            >
              <Phone size={14} weight="regular" />
              <span>+33621049443</span>
            </a>
            
            <Link
              to="/contact"
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                padding: '10px 20px'
              }}
              className="flex items-center space-x-2 transition-all duration-300 hover:bg-[#333]"
            >
              <Bell size={14} weight="regular" />
              <span>BOOK NOW</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className={`p-2 transition-colors duration-300 ${
                    useTransparentNav ? 'text-white' : 'text-[#1a1a1a]'
                  }`}
                >
                  <List className="h-6 w-6" weight="light" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-0 bg-white">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="px-6 py-6 border-b border-gray-100 text-center">
                    <span 
                      className="font-serif text-xl tracking-[0.15em]"
                      style={{ 
                        color: '#c9a962',
                        fontFamily: "'Cormorant Garamond', Georgia, serif"
                      }}
                    >
                      THE VIF
                    </span>
                  </div>
                  
                  {/* Mobile Nav Links */}
                  <nav className="flex-1 px-6 py-8">
                    <div className="space-y-5">
                      {navLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block text-[12px] tracking-[0.1em] transition-colors ${
                            isActivePath(link.path)
                              ? 'text-[#1a1a1a]'
                              : 'text-gray-500 hover:text-[#1a1a1a]'
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-gray-100 space-y-4">
                    <a 
                      href="tel:+33615322966" 
                      className="flex items-center justify-center space-x-2 text-[11px] tracking-[0.05em] text-gray-600"
                    >
                      <Phone size={14} />
                      <span>+33 6 15 32 29 66</span>
                    </a>
                    <Link 
                      to="/contact" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center space-x-2 w-full py-3 bg-[#1a1a1a] text-white text-[11px] tracking-[0.1em]"
                    >
                      <Bell size={14} />
                      <span>BOOK NOW</span>
                    </Link>
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
