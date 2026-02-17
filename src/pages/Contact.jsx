import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    arrivalDate: '',
    departureDate: '',
    adults: '',
    children0to5: '',
    children6to16: '',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      toast.success('Thank you! We\'ll get back to you within 24 hours.')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        arrivalDate: '',
        departureDate: '',
        adults: '',
        children0to5: '',
        children6to16: '',
        message: ''
      })
    } catch (error) {
      toast.error(error.message || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const inputStyle = {
    fontFamily: "'Lato', sans-serif",
    fontSize: '14px',
    fontWeight: 300,
    color: '#333',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '0',
    padding: '16px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  }

  const labelStyle = {
    fontFamily: "'Lato', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#0f1c2e',
    marginBottom: '8px',
    display: 'block'
  }

  const sectionTitleStyle = {
    fontFamily: "'Lato', sans-serif",
    fontSize: '16px',
    fontWeight: 500,
    color: '#0f1c2e',
    marginBottom: '24px'
  }

  return (
    <div className="bg-[#faf8f5]">
      {/* Header Section - Villa Soleil Style */}
      <section className="pt-32 md:pt-40 pb-8 md:pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(3.5rem, 12vw, 8rem)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#0f1c2e',
              marginBottom: '1.5rem'
            }}
          >
            Contact us
          </motion.h1>
          
          {/* Decorative Wave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <svg width="60" height="12" viewBox="0 0 60 12" fill="none" className="mx-auto">
              <path d="M0 6C10 6 10 2 20 2C30 2 30 10 40 10C50 10 50 6 60 6" stroke="#c9a962" strokeWidth="1.5" fill="none"/>
            </svg>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.6,
              color: '#555'
            }}
          >
            For reservations within one week, please<br className="hidden md:block" />
            contact us by phone.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Your Details Section */}
            <div className="mb-12">
              <h2 style={sectionTitleStyle}>Your details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#c9a962'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#c9a962'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#c9a962'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Telephone Number</label>
                  <input
                    type="tel"
                    placeholder="Please provide the country code (e.g +33)"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#c9a962'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>
              </div>
            </div>

            {/* When will you be arriving Section */}
            <div className="mb-12">
              <h2 style={sectionTitleStyle}>When will you be arriving?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Arrival Date</label>
                  <input
                    type="text"
                    placeholder="dd-mm-yyyy"
                    value={formData.arrivalDate}
                    onChange={(e) => handleChange('arrivalDate', e.target.value)}
                    onFocus={(e) => {
                      e.target.type = 'date'
                      e.target.style.borderColor = '#c9a962'
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text'
                      e.target.style.borderColor = '#e5e5e5'
                    }}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Departure Date</label>
                  <input
                    type="text"
                    placeholder="dd-mm-yyyy"
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                    onFocus={(e) => {
                      e.target.type = 'date'
                      e.target.style.borderColor = '#c9a962'
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text'
                      e.target.style.borderColor = '#e5e5e5'
                    }}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Number of Guests Section */}
            <div className="mb-12">
              <h2 style={sectionTitleStyle}>Number of guests</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label style={labelStyle}>Adults</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.adults}
                    onChange={(e) => handleChange('adults', e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#c9a962'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Children (0 - 5 years)</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.children0to5}
                    onChange={(e) => handleChange('children0to5', e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#c9a962'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Children (6 - 16 years)</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.children6to16}
                    onChange={(e) => handleChange('children6to16', e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#c9a962'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>
              </div>
            </div>

            {/* Inquiry and Request Section */}
            <div className="mb-12">
              <h2 style={sectionTitleStyle}>Inquiry and request</h2>
              
              <textarea
                placeholder="Your message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                required
                rows={6}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '150px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#c9a962'}
                onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '18px 40px',
                backgroundColor: isSubmitting ? '#4a5568' : '#0f1c2e',
                color: '#ffffff',
                fontFamily: "'Lato', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s ease',
                opacity: isSubmitting ? 0.7 : 1
              }}
              onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#1a2d42')}
              onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#0f1c2e')}
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  )
}
