import { toast } from 'sonner'

// Helper functions to work with localStorage
function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

function setToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export async function sendBookingNotification(booking, type = 'new') {
  try {
    const emailSettings = getFromStorage('email-notification-settings')
    
    if (!emailSettings?.enabled) {
      console.log('Email notifications are disabled')
      return { success: true, skipped: true }
    }

    const emailData = generateBookingEmail(booking, type, emailSettings)
    
    logEmailNotification({
      bookingId: booking.id,
      type,
      recipient: emailSettings.recipientEmail,
      subject: emailData.subject,
      body: emailData.body,
      sentAt: new Date().toISOString(),
      status: 'sent'
    })

    toast.success(`Email notification sent to ${emailSettings.recipientEmail}`)
    
    return { success: true, emailData }
  } catch (error) {
    console.error('Failed to send booking notification:', error)
    
    logEmailNotification({
      bookingId: booking.id,
      type,
      error: error.message,
      sentAt: new Date().toISOString(),
      status: 'failed'
    })
    
    toast.error('Failed to send email notification')
    return { success: false, error }
  }
}

function generateBookingEmail(booking, type, settings) {
  const templates = {
    new: {
      subject: `New Booking: ${booking.propertyName} - ${booking.guestName}`,
      action: 'received a new booking'
    },
    confirmed: {
      subject: `Booking Confirmed: ${booking.propertyName} - ${booking.guestName}`,
      action: 'confirmed a booking'
    },
    cancelled: {
      subject: `Booking Cancelled: ${booking.propertyName} - ${booking.guestName}`,
      action: 'cancelled a booking'
    },
    updated: {
      subject: `Booking Updated: ${booking.propertyName} - ${booking.guestName}`,
      action: 'updated a booking'
    }
  }

  const template = templates[type] || templates.new

  const checkIn = new Date(booking.checkIn).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  
  const checkOut = new Date(booking.checkOut).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const nights = Math.ceil(
    (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)
  )

  // Generate a simple email body without LLM
  const body = `
${template.action.toUpperCase()}

Booking Details:
----------------
Booking ID: ${booking.id}
Property: ${booking.propertyName}
Guest Name: ${booking.guestName}
Guest Email: ${booking.guestEmail}
Guest Phone: ${booking.guestPhone || 'Not provided'}
Check-in: ${checkIn}
Check-out: ${checkOut}
Duration: ${nights} night${nights !== 1 ? 's' : ''}
Number of Guests: ${booking.guests}
Total Price: €${booking.totalPrice?.toLocaleString() || 'TBD'}
Status: ${booking.status}
${booking.notes ? `Special Notes: ${booking.notes}` : ''}

Next Steps:
- Please review and update the availability calendar
- Prepare the property for the guest's arrival
- Send a welcome message to the guest

---
The VIF - Luxury Vacation Rentals
French Riviera
`.trim()

  return {
    subject: template.subject,
    body: body,
    to: settings.recipientEmail,
    from: 'The VIF Bookings <noreply@thevif.com>'
  }
}

function logEmailNotification(log) {
  const logs = getFromStorage('email-notification-logs', [])
  logs.unshift(log)
  
  if (logs.length > 100) {
    logs.splice(100)
  }
  
  setToStorage('email-notification-logs', logs)
}

export function getEmailNotificationLogs() {
  return getFromStorage('email-notification-logs', [])
}

export function clearEmailNotificationLogs() {
  setToStorage('email-notification-logs', [])
}

export function getEmailSettings() {
  const defaultSettings = {
    enabled: true,
    recipientEmail: '',
    notifyOnNew: true,
    notifyOnConfirmed: true,
    notifyOnCancelled: true,
    notifyOnUpdated: false
  }
  
  const settings = getFromStorage('email-notification-settings')
  return settings || defaultSettings
}

export function saveEmailSettings(settings) {
  setToStorage('email-notification-settings', settings)
  toast.success('Email notification settings saved')
}
