import { Link, useLocation } from 'react-router-dom'
import { InstagramLogo, EnvelopeSimple, Phone } from '@phosphor-icons/react'
import { useTranslation } from '@/hooks/useTranslation'

// Gallery images for the footer strip
const galleryImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
]

export default function Footer() {
  const { t } = useTranslation()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <footer>
      {/* Gallery Strip - Only show on home page */}
      {isHomePage && (
        <div className="flex w-full h-64 overflow-hidden">
          {galleryImages.map((image, index) => (
            <div key={index} className="flex-1 min-w-0">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Footer - Villa Soleil Style */}
      <div className="bg-[#0f1c2e] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Left - Contact by Mail */}
            <div className="flex flex-col items-center md:items-start">
              <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center mb-4">
                <EnvelopeSimple size={24} weight="light" className="text-white" />
              </div>
              <span 
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#ffffff'
                }}
              >
                Contact Us By Mail
              </span>
            </div>

            {/* Center - Logo and Address */}
            <div className="flex flex-col items-center text-center">
              {/* Sun Icon */}
              <div className="mb-4">
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                  <circle cx="30" cy="20" r="8" fill="#c9a962"/>
                  <path d="M30 5 L30 10" stroke="#c9a962" strokeWidth="1.5"/>
                  <path d="M30 30 L30 35" stroke="#c9a962" strokeWidth="1.5"/>
                  <path d="M15 20 L20 20" stroke="#c9a962" strokeWidth="1.5"/>
                  <path d="M40 20 L45 20" stroke="#c9a962" strokeWidth="1.5"/>
                  <path d="M19 9 L22 12" stroke="#c9a962" strokeWidth="1.5"/>
                  <path d="M38 28 L41 31" stroke="#c9a962" strokeWidth="1.5"/>
                  <path d="M19 31 L22 28" stroke="#c9a962" strokeWidth="1.5"/>
                  <path d="M38 12 L41 9" stroke="#c9a962" strokeWidth="1.5"/>
                </svg>
              </div>
              
              {/* Logo Text */}
              <h2 
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '28px',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  color: '#c9a962',
                  marginBottom: '16px'
                }}
              >
                THE VIF
              </h2>
              
              {/* Wave Decoration */}
              <div className="mb-4">
                <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
                  <path d="M0 6C10 6 10 2 20 2C30 2 30 10 40 10C50 10 50 6 60 6" stroke="#c9a962" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              
              {/* Address */}
              <p 
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '16px',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.6
                }}
              >
                French Riviera<br />
                Côte d'Azur, France
              </p>
            </div>

            {/* Right - Phone */}
            <div className="flex flex-col items-center md:items-end">
              <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center mb-4">
                <Phone size={24} weight="light" className="text-white" />
              </div>
              <a 
                href="tel:+33615322966"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#ffffff'
                }}
                className="hover:text-[#c9a962] transition-colors"
              >
                +336 15 32 29 66
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0a1420] py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p 
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.5)'
              }}
            >
              © {new Date().getFullYear()} The VIF. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/privacy-policy" 
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.5)'
                }}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.5)'
                }}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
