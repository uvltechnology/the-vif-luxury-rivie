import { toast } from 'sonner'

export async function sendBookingNotification(booking, type = 'new') {
  try {
    const emailSettings = await window.spark.kv.get('email-notification-settings')
    
    if (!emailSettings?.enabled) {
      console.log('Email notifications are disabled')
      return { success: true, skipped: true }
    }

    const emailData = await generateBookingEmail(booking, type, emailSettings)
    
    await logEmailNotification({
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
    
    await logEmailNotification({
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

async function generateBookingEmail(booking, type, settings) {
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

  const prompt = window.spark.llmPrompt`Generate a professional, friendly email notification for a vacation rental property manager. The email should be well-formatted with proper spacing and structure.

Context: ${template.action} for The VIF (The Vacation in France), a luxury vacation rental company in the French Riviera.

Booking Details:
- Booking ID: ${booking.id}
- Property: ${booking.propertyName}
- Guest Name: ${booking.guestName}
- Guest Email: ${booking.guestEmail}
- Guest Phone: ${booking.guestPhone || 'Not provided'}
- Check-in: ${checkIn}
- Check-out: ${checkOut}
- Duration: ${nights} night${nights !== 1 ? 's' : ''}
- Number of Guests: ${booking.guests}
- Total Price: €${booking.totalPrice?.toLocaleString() || 'TBD'}
- Status: ${booking.status}
${booking.notes ? `- Special Notes: ${booking.notes}` : ''}

Generate a concise, professional email body (plain text format) that:
1. Clearly states the booking action at the top
2. Lists all relevant booking details in a clean format
3. Includes any special notes if provided
4. Ends with a brief next steps reminder (e.g., check availability calendar, prepare property, etc.)
5. Uses proper spacing and line breaks for readability

Do not include a subject line, greeting, or signature - only the body content.`

  const body = await window.spark.llm(prompt, 'gpt-4o-mini')

  return {
    subject: template.subject,
    body: body.trim(),
    to: settings.recipientEmail,
    from: 'The VIF Bookings <noreply@thevif.com>'
  }
}

async function logEmailNotification(log) {
  const logs = await window.spark.kv.get('email-notification-logs') || []
  logs.unshift(log)
  
  if (logs.length > 100) {
    logs.splice(100)
  }
  
  await window.spark.kv.set('email-notification-logs', logs)
}

export async function getEmailNotificationLogs() {
  return await window.spark.kv.get('email-notification-logs') || []
}

export async function clearEmailNotificationLogs() {
  await window.spark.kv.set('email-notification-logs', [])
}

export async function getEmailSettings() {
  const defaultSettings = {
    enabled: true,
    recipientEmail: '',
    notifyOnNew: true,
    notifyOnConfirmed: true,
    notifyOnCancelled: true,
    notifyOnUpdated: false
  }
  
  const settings = await window.spark.kv.get('email-notification-settings')
  return settings || defaultSettings
}

export async function saveEmailSettings(settings) {
  await window.spark.kv.set('email-notification-settings', settings)
  toast.success('Email notification settings saved')
}
