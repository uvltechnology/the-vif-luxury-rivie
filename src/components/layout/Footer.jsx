import { Link, useLocation } from 'react-router-dom'
import { InstagramLogo, EnvelopeSimple, Phone } from '@phosphor-icons/react'
import { useTranslation } from '@/hooks/useTranslation'

// Import local gallery images for the footer strip
import gallery1 from '@/assets/images/The VIF Gallery/6.jpg'
import gallery2 from '@/assets/images/The VIF Gallery/7.jpg'
import gallery3 from '@/assets/images/The VIF Gallery/8.jpg'
import gallery4 from '@/assets/images/The VIF Gallery/9.jpg'
import gallery5 from '@/assets/images/The VIF Gallery/10.jpg'

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5]

export default function Footer() {
  const { t } = useTranslation()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <footer>
      {/* Gallery Strip - Only show on home page */}
      {isHomePage && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 px-4 py-4 bg-[#faf8f5]">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className={`overflow-hidden rounded-xl aspect-[4/3] ${
                index === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
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
                {t('footer.contactByMail')}
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
                  marginBottom: '4px'
                }}
              >
                {t('footer.theVif')}
              </h2>
              <p 
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '16px'
                }}
              >
                {t('footer.theVacationInFrance')}
              </p>
              
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
                href="tel:+33620493969"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#ffffff'
                }}
                className="hover:text-[#c9a962] transition-colors"
              >
                +33 6 20 49 39 69
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
              © {new Date().getFullYear()} {t('footer.copyright')}
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
                {t('footer.privacyPolicy')}
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
                {t('footer.termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
