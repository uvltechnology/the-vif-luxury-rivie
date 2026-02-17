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
import servicesHeroImage from '../assets/images/The VIF Services Hompage/Services.jpg'

const includedServices = [
  {
    icon: Broom,
    title: 'Weekly housekeeping',
    description: 'Weekly cleaning (10 hours/week). Change of linen and pool towels for your comfort.'
  },
  {
    icon: Champagne,
    title: 'Personalized welcome',
    description: 'To kickstart your Mediterranean experience, a bottle of Champagne and a tailored welcome amenity will be waiting for you.'
  },
  {
    icon: UserCircle,
    title: 'Villa Manager',
    description: 'Available 5 days a week: Restaurants, activities and tours reservation assistance.'
  },
  {
    icon: Car,
    title: 'Secure parking',
    description: 'Capacity to park 3 vehicles safely within the property grounds.'
  },
  {
    icon: Tree,
    title: 'Weekly outdoors maintenance',
    description: 'Weekly cleaning of pool, garden and barbecue to ensure pristine conditions.'
  },
  {
    icon: ShieldCheck,
    title: 'Secure domain',
    description: 'Domain under video surveillance 24/7 for your peace of mind.'
  }
]

const extraServices = [
  {
    icon: CookingPot,
    title: 'Private chef',
    description: 'From an intimate, special meal to catered meals throughout your stay, relax while your private chef prepares incredible dishes.'
  },
  {
    icon: Shield,
    title: 'Security guard',
    description: 'Although our properties are all secure and alarmed with armed response, we can provide you with access to additional security.'
  },
  {
    icon: Headset,
    title: 'Concierge Assistance',
    description: 'We can help plan your entire trip and offer you tips and advice to make the most of your stay at any villa.'
  },
  {
    icon: Broom,
    title: 'Additional housekeeper',
    description: 'Additional housekeeping services are available for your comfort and convenience.'
  },
  {
    icon: TShirt,
    title: 'Laundry and Dry Cleaning',
    description: 'Enjoy your stay freely while we handle your laundry needs. We conveniently pick up and promptly deliver your clothes right to your villa.'
  },
  {
    icon: Steering,
    title: 'Driver',
    description: 'Luxury transportation services designed to offer a more personalized and convenient experience during your stay.'
  },
  {
    icon: Heart,
    title: 'Wellness',
    description: 'Our team can arrange a variety of activities and amenities designed to promote physical and mental well-being during your stay.'
  },
  {
    icon: Barbell,
    title: 'Personal trainer',
    description: 'What better way to stay active during your holidays than by exercising with a personal trainer at home?'
  },
  {
    icon: CarProfile,
    title: 'Car rental',
    description: 'We will book it for you with one of our selected partners whether you need a luxury car or a family/group van.'
  }
]

export default function Services() {
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
              Services
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
              Included services for your stay
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
              The discreet team of the Villa is permanently caring for your well-being by 
              assuring daily hotel services and more. All these services are for you the freedom 
              and the assurance of an unforgettable stay. Just drop your luggage and you are on holidays!
            </motion.p>
          </div>

          {/* Included Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {includedServices.map((service, index) => (
              <motion.div
                key={service.title}
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
                  {service.title}
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
                  {service.description}
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
              Extra Services
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
              Extra services
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
              To make your stay unforgettable, The VIF offers you a range of tailor-made services. 
              Please do not hesitate to let us know your needs.
            </motion.p>
          </div>

          {/* Extra Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {extraServices.map((service, index) => (
              <motion.div
                key={service.title}
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
                  {service.title}
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
                  {service.description}
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
