import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EnvelopeSimple, Phone, MapPin } from '@phosphor-icons/react'
import { toast } from 'sonner'

export default function Contact() {
  const [inquiries, setInquiries] = useLocalStorage('contact-inquiries', [])
  const [messages, setMessages] = useLocalStorage('admin-messages', [])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newInquiry = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    }
    
    const adminMessage = {
      id: `MSG-${Date.now()}`,
      guestName: formData.name,
      guestEmail: formData.email,
      guestPhone: formData.phone || '',
      subject: `Inquiry about The VIF`,
      message: `${formData.message}\n\nTravel Details:\nCheck-in: ${formData.checkIn || 'Not specified'}\nCheck-out: ${formData.checkOut || 'Not specified'}\nGuests: ${formData.guests || 'Not specified'}`,
      status: 'unread',
      createdAt: new Date().toISOString(),
      replies: []
    }
    
    setInquiries((current) => [newInquiry, ...current])
    setMessages((current) => [adminMessage, ...(current || [])])
    
    toast.success('Thank you! We\'ll get back to you within 24 hours.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: '',
      message: ''
    })
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section - Villa Soleil Style */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
            alt="Contact The VIF"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <h1 
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#ffffff',
              textShadow: '0 2px 40px rgba(0,0,0,0.15)'
            }}
          >
            Contact
          </h1>
        </motion.div>
      </section>

      {/* Contact Content - Villa Soleil Style */}
      <section className="py-32 md:py-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#777',
                marginBottom: '1.5rem'
              }}>
                Get in Touch
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#0f1c2e',
                marginBottom: '2rem'
              }}>
                We'd love to hear from you
              </h2>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#555',
                marginBottom: '3rem'
              }}>
                Have questions about The VIF or ready to book your stay? We're here to help 
                you plan your perfect French Riviera experience. Reach out to us and we'll 
                respond within 24 hours.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#f5f0e8]">
                    <EnvelopeSimple size={24} weight="light" style={{ color: '#0f1c2e' }} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#0f1c2e',
                      marginBottom: '4px'
                    }}>Email</h3>
                    <a 
                      href="mailto:contact@thevif.com" 
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: '14px',
                        fontWeight: 300,
                        color: '#666'
                      }}
                      className="hover:text-[#0f1c2e] transition-colors"
                    >
                      contact@thevif.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#f5f0e8]">
                    <Phone size={24} weight="light" style={{ color: '#0f1c2e' }} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#0f1c2e',
                      marginBottom: '4px'
                    }}>Phone</h3>
                    <a 
                      href="tel:+33600000000" 
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: '14px',
                        fontWeight: 300,
                        color: '#666'
                      }}
                      className="hover:text-[#0f1c2e] transition-colors"
                    >
                      +33 6 00 00 00 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#f5f0e8]">
                    <MapPin size={24} weight="light" style={{ color: '#0f1c2e' }} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#0f1c2e',
                      marginBottom: '4px'
                    }}>Location</h3>
                    <p style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#666'
                    }}>
                      French Riviera, France
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="border-border bg-white h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="border-border bg-white h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="border-border bg-white h-12"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Check-in
                    </label>
                    <Input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => handleChange('checkIn', e.target.value)}
                      className="border-border bg-white h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Check-out
                    </label>
                    <Input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => handleChange('checkOut', e.target.value)}
                      className="border-border bg-white h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Guests
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.guests}
                      onChange={(e) => handleChange('guests', e.target.value)}
                      className="border-border bg-white h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    rows={5}
                    className="border-border bg-white resize-none"
                    placeholder="Tell us about your ideal stay..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-10 py-4 bg-[#0f1c2e] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#1a2d42] transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
