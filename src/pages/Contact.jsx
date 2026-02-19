import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useTranslation } from '@/hooks/useTranslation'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Contact() {
  const { t } = useTranslation()
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
  
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    if (!phone) return true // Phone is optional
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ''))
  }

  const isDateInPast = (dateString) => {
    if (!dateString) return false
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const validateField = useCallback((field, value, currentFormData = formData) => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return t('contact.page.validation.firstNameRequired')
        return ''
      case 'lastName':
        if (!value.trim()) return t('contact.page.validation.lastNameRequired')
        return ''
      case 'email':
        if (!value.trim()) return t('contact.page.validation.emailRequired')
        if (!validateEmail(value)) return t('contact.page.validation.emailInvalid')
        return ''
      case 'phone':
        if (value && !validatePhone(value)) return t('contact.page.validation.phoneInvalid')
        return ''
      case 'arrivalDate':
        if (!value) return t('contact.page.validation.arrivalRequired')
        if (isDateInPast(value)) return t('contact.page.validation.arrivalPast')
        return ''
      case 'departureDate':
        if (!value) return t('contact.page.validation.departureRequired')
        if (isDateInPast(value)) return t('contact.page.validation.departurePast')
        if (currentFormData.arrivalDate && new Date(value) <= new Date(currentFormData.arrivalDate)) {
          return t('contact.page.validation.departureBeforeArrival')
        }
        return ''
      case 'adults':
        if (!value || parseInt(value) < 1) return t('contact.page.validation.adultsRequired')
        return ''
      case 'message':
        if (!value.trim()) return t('contact.page.validation.messageRequired')
        if (value.trim().length < 10) return t('contact.page.validation.messageMinLength')
        return ''
      default:
        return ''
    }
  }, [t, formData])

  const validateForm = () => {
    const newErrors = {}
    const fieldsToValidate = ['firstName', 'lastName', 'email', 'arrivalDate', 'departureDate', 'adults', 'message']
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field], formData)
      if (error) newErrors[field] = error
    })
    
    // Validate optional phone if provided
    if (formData.phone) {
      const phoneError = validateField('phone', formData.phone, formData)
      if (phoneError) newErrors.phone = phoneError
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Mark all required fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      arrivalDate: true,
      departureDate: true,
      adults: true,
      message: true
    })
    
    if (!validateForm()) {
      toast.error(t('contact.page.validation.formErrors') || 'Please fix the errors in the form')
      return
    }
    
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
        throw new Error(data.error || t('contact.page.errorMessage'))
      }

      toast.success(t('contact.page.successMessage'))
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
      setErrors({})
      setTouched({})
    } catch (error) {
      toast.error(error.message || t('contact.page.errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field], formData)
    setErrors(prev => ({ ...prev, [field]: error }))
    
    // Re-validate departure date if arrival date changes
    if (field === 'arrivalDate' && touched.departureDate && formData.departureDate) {
      const departureError = validateField('departureDate', formData.departureDate, formData)
      setErrors(prev => ({ ...prev, departureDate: departureError }))
    }
  }

  const getInputStyle = (field) => ({
    fontFamily: "'Lato', sans-serif",
    fontSize: '14px',
    fontWeight: 300,
    color: '#333',
    backgroundColor: '#ffffff',
    border: `1px solid ${touched[field] && errors[field] ? '#dc2626' : '#e5e5e5'}`,
    borderRadius: '0',
    padding: '16px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  })

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

  const errorStyle = {
    fontFamily: "'Lato', sans-serif",
    fontSize: '12px',
    color: '#dc2626',
    marginTop: '6px',
    display: 'block'
  }

  const renderError = (field) => {
    if (touched[field] && errors[field]) {
      return <span style={errorStyle}>{errors[field]}</span>
    }
    return null
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
            {t('contact.page.title')}
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
            {t('contact.page.subtitle')}
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
            noValidate
          >
            {/* Your Details Section */}
            <div className="mb-12">
              <h2 style={sectionTitleStyle}>{t('contact.page.yourDetails')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label style={labelStyle}>{t('contact.page.firstName')} <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="text"
                    placeholder={t('contact.page.firstName')}
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    style={getInputStyle('firstName')}
                    onFocus={(e) => e.target.style.borderColor = errors.firstName && touched.firstName ? '#dc2626' : '#c9a962'}
                  />
                  {renderError('firstName')}
                </div>
                <div>
                  <label style={labelStyle}>{t('contact.page.lastName')} <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="text"
                    placeholder={t('contact.page.lastName')}
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    style={getInputStyle('lastName')}
                    onFocus={(e) => e.target.style.borderColor = errors.lastName && touched.lastName ? '#dc2626' : '#c9a962'}
                  />
                  {renderError('lastName')}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>{t('contact.page.emailAddress')} <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="email"
                    placeholder={t('contact.page.emailAddress')}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    style={getInputStyle('email')}
                    onFocus={(e) => e.target.style.borderColor = errors.email && touched.email ? '#dc2626' : '#c9a962'}
                  />
                  {renderError('email')}
                </div>
                <div>
                  <label style={labelStyle}>{t('contact.page.telephoneNumber')}</label>
                  <input
                    type="tel"
                    placeholder={t('contact.page.phonePlaceholder')}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    style={getInputStyle('phone')}
                    onFocus={(e) => e.target.style.borderColor = errors.phone && touched.phone ? '#dc2626' : '#c9a962'}
                  />
                  {renderError('phone')}
                </div>
              </div>
            </div>

            {/* When will you be arriving Section */}
            <div className="mb-12">
              <h2 style={sectionTitleStyle}>{t('contact.page.whenArriving')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>{t('contact.page.arrivalDate')} <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="date"
                    placeholder={t('contact.page.datePlaceholder')}
                    value={formData.arrivalDate}
                    onChange={(e) => handleChange('arrivalDate', e.target.value)}
                    onBlur={() => handleBlur('arrivalDate')}
                    min={new Date().toISOString().split('T')[0]}
                    style={getInputStyle('arrivalDate')}
                    onFocus={(e) => e.target.style.borderColor = errors.arrivalDate && touched.arrivalDate ? '#dc2626' : '#c9a962'}
                  />
                  {renderError('arrivalDate')}
                </div>
                <div>
                  <label style={labelStyle}>{t('contact.page.departureDate')} <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="date"
                    placeholder={t('contact.page.datePlaceholder')}
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                    onBlur={() => handleBlur('departureDate')}
                    min={formData.arrivalDate || new Date().toISOString().split('T')[0]}
                    style={getInputStyle('departureDate')}
                    onFocus={(e) => e.target.style.borderColor = errors.departureDate && touched.departureDate ? '#dc2626' : '#c9a962'}
                  />
                  {renderError('departureDate')}
                </div>
              </div>
            </div>

            {/* Number of Guests Section */}
            <div className="mb-12">
              <h2 style={sectionTitleStyle}>{t('contact.page.numberOfGuests')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label style={labelStyle}>{t('contact.page.adults')} <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="number"
                    placeholder="1"
                    min="1"
                    value={formData.adults}
                    onChange={(e) => handleChange('adults', e.target.value)}
                    onBlur={() => handleBlur('adults')}
                    style={getInputStyle('adults')}
                    onFocus={(e) => e.target.style.borderColor = errors.adults && touched.adults ? '#dc2626' : '#c9a962'}
                  />
                  {renderError('adults')}
                </div>
                <div>
                  <label style={labelStyle}>{t('contact.page.children0to5')}</label>
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
                  <label style={labelStyle}>{t('contact.page.children6to16')}</label>
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
              <h2 style={sectionTitleStyle}>{t('contact.page.inquiryRequest')}</h2>
              
              <textarea
                placeholder={t('contact.page.yourMessage')}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                rows={6}
                style={{
                  ...getInputStyle('message'),
                  resize: 'vertical',
                  minHeight: '150px'
                }}
                onFocus={(e) => e.target.style.borderColor = errors.message && touched.message ? '#dc2626' : '#c9a962'}
              />
              {renderError('message')}
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                color: '#888',
                marginTop: '8px'
              }}>
                <span style={{ color: '#dc2626' }}>*</span> {t('contact.page.required') || 'Required fields'}
              </p>
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
              {isSubmitting ? t('contact.page.sendingRequest') : t('contact.page.sendRequest')}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  )
}
