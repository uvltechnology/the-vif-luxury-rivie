import { Link } from 'react-router-dom'
import { InstagramLogo, FacebookLogo, EnvelopeSimple } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from '@/hooks/useTranslation'

export default function Footer() {
  const [email, setEmail] = useState('')
  const { t } = useTranslation()

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      toast.success('Thanks for subscribing! Check your inbox soon.')
      setEmail('')
    }
  }

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">The VIF</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <InstagramLogo size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FacebookLogo size={24} />
              </a>
              <a
                href="mailto:hello@thevif.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <EnvelopeSimple size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/stays" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.stays')}
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.experiences')}
                </Link>
              </li>
              <li>
                <Link to="/the-riviera" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.theRiviera')}
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.reviews')}
                </Link>
              </li>
              <li>
                <Link to="/how-to-book" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.howToBook')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">{t('nav.ourStory')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/our-story" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.ourStory')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get travel tips and exclusive offers delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder={t('contact.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-sm"
              />
              <Button type="submit" size="sm" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The VIF. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}
