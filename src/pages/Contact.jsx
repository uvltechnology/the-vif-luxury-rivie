import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Section from '@/components/shared/Section'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnvelopeSimple, Phone, MapPin } from '@phosphor-icons/react'
import { toast } from 'sonner'

export default function Contact() {
  const [inquiries, setInquiries] = useLocalStorage('contact-inquiries', [])
  const [messages, setMessages] = useLocalStorage('admin-messages', [])
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 200], [0, 50])
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.3])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
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
    
    const propertyNames = {
      'villa-rocsea': 'Villa Rocsea',
      'villa-bellevue': 'Villa Bellevue',
      'palm-beach-apartment': 'Palm Beach Apartment',
      'not-sure': 'Not specified'
    }
    
    const adminMessage = {
      id: `MSG-${Date.now()}`,
      guestName: formData.name,
      guestEmail: formData.email,
      guestPhone: formData.phone || '',
      subject: `Inquiry about ${propertyNames[formData.property] || 'properties'}`,
      message: `${formData.message}\n\nTravel Details:\nProperty: ${propertyNames[formData.property] || 'Not specified'}\nCheck-in: ${formData.checkIn || 'Not specified'}\nCheck-out: ${formData.checkOut || 'Not specified'}\nGuests: ${formData.guests || 'Not specified'}`,
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
      property: '',
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
    <div className="pt-20">
      <Section className="bg-card border-b border-border">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          style={{
            y: headerY,
            opacity: headerOpacity,
          }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-heading font-semibold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We'd love to help you plan your French Riviera escape. Send us a message and we'll respond within 24 hours.
          </motion.p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection direction="left">
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+33 X XX XX XX XX"
                  />
                </div>

                <div>
                  <Label htmlFor="property">Interested Property</Label>
                  <Select value={formData.property} onValueChange={(value) => handleChange('property', value)}>
                    <SelectTrigger id="property">
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="villa-rocsea">Villa Rocsea</SelectItem>
                      <SelectItem value="villa-bellevue">Villa Bellevue</SelectItem>
                      <SelectItem value="palm-beach-apartment">Palm Beach Apartment</SelectItem>
                      <SelectItem value="not-sure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="check-in">Check-in Date</Label>
                    <Input
                      id="check-in"
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => handleChange('checkIn', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="check-out">Check-out Date</Label>
                    <Input
                      id="check-out"
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => handleChange('checkOut', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="12"
                    value={formData.guests}
                    onChange={(e) => handleChange('guests', e.target.value)}
                    placeholder="2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    placeholder="Tell us about your travel plans, any special requests, or questions you have..."
                    rows={5}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div>
              <h2 className="text-2xl font-heading font-semibold mb-6">Contact Details</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <EnvelopeSimple size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:hello@thevif.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hello@thevif.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href="tel:+33123456789" className="text-muted-foreground hover:text-primary transition-colors">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      French Riviera<br />
                      Côte d'Azur, France
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Response Time</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We typically respond to inquiries within 24 hours during business days. For urgent requests, please mention this in your message.
                </p>
                <h3 className="font-semibold mb-3">Office Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM (CET)<br />
                  Saturday: 10:00 AM - 4:00 PM (CET)<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </div>
  )
}
