import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Broom, 
  Champagne, 
  UserCircle, 
  Car, 
  Tree, 
  ShieldCheck,
  CookingPot,
  Shield,
  Headset,
  TShirt,
  Steering,
  Heart,
  Barbell,
  CarProfile
} from '@phosphor-icons/react'
import { useTranslation } from '@/hooks/useTranslation'
import servicesHeroImage from '../assets/images/The VIF Services Hompage/Services.jpg'

const includedServices = [
  { icon: Broom, titleKey: 'services.included.housekeeping', descKey: 'services.included.housekeepingDesc' },
  { icon: Champagne, titleKey: 'services.included.welcome', descKey: 'services.included.welcomeDesc' },
  { icon: UserCircle, titleKey: 'services.included.manager', descKey: 'services.included.managerDesc' },
  { icon: Car, titleKey: 'services.included.parking', descKey: 'services.included.parkingDesc' },
  { icon: Tree, titleKey: 'services.included.outdoors', descKey: 'services.included.outdoorsDesc' },
  { icon: ShieldCheck, titleKey: 'services.included.security', descKey: 'services.included.securityDesc' }
]

const extraServices = [
  { icon: CookingPot, titleKey: 'services.extra.chef', descKey: 'services.extra.chefDesc' },
  { icon: Shield, titleKey: 'services.extra.guard', descKey: 'services.extra.guardDesc' },
  { icon: Headset, titleKey: 'services.extra.concierge', descKey: 'services.extra.conciergeDesc' },
  { icon: Broom, titleKey: 'services.extra.extraHousekeeping', descKey: 'services.extra.extraHousekeepingDesc' },
  { icon: TShirt, titleKey: 'services.extra.laundry', descKey: 'services.extra.laundryDesc' },
  { icon: Steering, titleKey: 'services.extra.driver', descKey: 'services.extra.driverDesc' },
  { icon: Heart, titleKey: 'services.extra.wellness', descKey: 'services.extra.wellnessDesc' },
  { icon: Barbell, titleKey: 'services.extra.trainer', descKey: 'services.extra.trainerDesc' },
  { icon: CarProfile, titleKey: 'services.extra.car', descKey: 'services.extra.carDesc' }
]

export default function Services() {
  const { t } = useTranslation()
  
  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section - Villa Soleil Style */}
      <section className="px-4 md:px-6 pt-20 md:pt-24">
        <div className="relative w-full overflow-hidden" style={{ borderRadius: '1rem' }}>
          <img
            src={servicesHeroImage}
            alt="Services - French Riviera Villa"
            className="w-full h-auto object-contain md:h-[85vh] md:object-cover"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* Included Services Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#777',
                marginBottom: '1.5rem'
              }}
            >
              {t('services.title')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#0f1c2e',
                marginBottom: '1.5rem'
              }}
            >
              {t('services.includedTitle')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}
              className="max-w-3xl mx-auto"
            >
              {t('services.includedSubtitle')}
            </motion.p>
          </div>

          {/* Included Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {includedServices.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#faf8f5] p-8 text-center group hover:bg-[#f5f0e8] transition-colors duration-300"
              >
                <div className="flex justify-center mb-6">
                  <service.icon 
                    size={48} 
                    weight="thin" 
                    className="text-[#c9a962] group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: '#0f1c2e',
                    marginBottom: '1rem'
                  }}
                >
                  {t(service.titleKey)}
                </h3>
                <p 
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: '#666'
                  }}
                >
                  {t(service.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Services Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#777',
                marginBottom: '1.5rem'
              }}
            >
              {t('services.extraTitle')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#0f1c2e',
                marginBottom: '1.5rem'
              }}
            >
              {t('services.extraTitle')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555'
              }}
              className="max-w-3xl mx-auto"
            >
              {t('services.extraSubtitle')}
            </motion.p>
          </div>

          {/* Extra Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {extraServices.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <service.icon 
                    size={48} 
                    weight="thin" 
                    className="text-[#c9a962] group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: '#0f1c2e',
                    marginBottom: '1rem'
                  }}
                >
                  {t(service.titleKey)}
                </h3>
                <p 
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: '#666'
                  }}
                >
                  {t(service.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Gallery Strip - Villa Soleil Style */}
      <section className="w-full py-4 md:py-6 px-4 md:px-6 overflow-x-auto">
        <div className="flex gap-3 md:gap-4 h-48 md:h-64 lg:h-80 min-w-max md:min-w-0">
          {[
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', // Chef cooking
            'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80', // Spa massage
            'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80', // Chauffeur/car
            'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&q=80', // Housekeeping
            'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&q=80', // Yoga/wellness
          ].map((image, index) => (
            <div key={index} className="flex-shrink-0 w-40 md:w-auto md:flex-1 min-w-0">
              <img
                src={image}
                alt={`Service ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ borderRadius: '16px' }}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
