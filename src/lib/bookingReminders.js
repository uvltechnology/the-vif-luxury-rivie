import { toast } from 'sonner'
import { format, differenceInDays, addDays, isBefore, isAfter, startOfDay } from 'date-fns'

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

export async function sendCheckInReminder(booking, daysUntilCheckIn) {
  try {
    const reminderSettings = getReminderSettings()
    
    if (!reminderSettings.enabled) {
      console.log('Check-in reminders are disabled')
      return { success: true, skipped: true }
    }

    const emailData = generateReminderEmail(booking, daysUntilCheckIn, reminderSettings)
    
    logReminderNotification({
      bookingId: booking.id,
      daysUntilCheckIn,
      guestEmail: booking.guestEmail,
      subject: emailData.subject,
      body: emailData.body,
      sentAt: new Date().toISOString(),
      status: 'sent',
      checkInDate: booking.checkIn
    })

    toast.success(`Check-in reminder sent to ${booking.guestName}`)
    
    return { success: true, emailData }
  } catch (error) {
    console.error('Failed to send check-in reminder:', error)
    
    logReminderNotification({
      bookingId: booking.id,
      daysUntilCheckIn,
      guestEmail: booking.guestEmail,
      error: error.message,
      sentAt: new Date().toISOString(),
      status: 'failed',
      checkInDate: booking.checkIn
    })
    
    toast.error('Failed to send check-in reminder')
    return { success: false, error }
  }
}

function generateReminderEmail(booking, daysUntilCheckIn, settings) {
  const checkInDate = new Date(booking.checkIn)
  const checkOutDate = new Date(booking.checkOut)
  
  const checkInFormatted = format(checkInDate, 'EEEE, MMMM d, yyyy')
  const checkOutFormatted = format(checkOutDate, 'EEEE, MMMM d, yyyy')
  
  const nights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
  )

  let timeframeText = ''
  if (daysUntilCheckIn === 0) {
    timeframeText = 'today'
  } else if (daysUntilCheckIn === 1) {
    timeframeText = 'tomorrow'
  } else if (daysUntilCheckIn === 7) {
    timeframeText = 'in one week'
  } else if (daysUntilCheckIn === 3) {
    timeframeText = 'in 3 days'
  } else {
    timeframeText = `in ${daysUntilCheckIn} days`
  }

  const subject = `Your stay at ${booking.propertyName} is ${timeframeText}!`

  // Generate email without LLM
  const body = `
Dear ${booking.guestName},

We are delighted to remind you that your stay at ${booking.propertyName} is ${timeframeText}!

Booking Details:
----------------
Property: ${booking.propertyName}
Check-in: ${checkInFormatted} (2:00 PM - 8:00 PM)
Check-out: ${checkOutFormatted}
Duration: ${nights} night${nights !== 1 ? 's' : ''}
Guests: ${booking.guests}

Pre-Arrival Information:
------------------------
• Check-in time window: 2:00 PM - 8:00 PM
• Please notify us of your estimated arrival time
• Please bring a valid ID and credit card for check-in
• Property address and access details will be provided 24-48 hours before check-in

What to Expect:
---------------
• High-speed WiFi ready upon arrival
• All amenities freshly prepared for your stay
• Welcome orientation available upon request
• 24/7 concierge support for any needs

${daysUntilCheckIn <= 1 ? `
Last-Minute Reminders:
----------------------
• Check the local weather forecast for packing
• Parking is available at the property
• Don't hesitate to contact us if you have any questions
` : ''}

We look forward to welcoming you to the French Riviera!

Warm regards,
The VIF Guest Services Team

---
The VIF - Luxury Vacation Rentals
French Riviera
concierge@thevif.com
`.trim()

  return {
    subject,
    body,
    to: booking.guestEmail,
    guestName: booking.guestName,
    from: 'The VIF Guest Services <concierge@thevif.com>'
  }
}

function logReminderNotification(log) {
  const logs = getFromStorage('check-in-reminder-logs', [])
  logs.unshift(log)
  
  if (logs.length > 200) {
    logs.splice(200)
  }
  
  setToStorage('check-in-reminder-logs', logs)
}

export function getReminderLogs() {
  return getFromStorage('check-in-reminder-logs', [])
}

export function clearReminderLogs() {
  setToStorage('check-in-reminder-logs', [])
}

export function getReminderSettings() {
  const defaultSettings = {
    enabled: true,
    sendAt7Days: true,
    sendAt3Days: true,
    sendAt1Day: true,
    sendOnCheckInDay: false,
    autoSendEnabled: false,
    lastAutoCheckTime: null
  }
  
  const settings = getFromStorage('check-in-reminder-settings')
  return settings || defaultSettings
}

export function saveReminderSettings(settings) {
  setToStorage('check-in-reminder-settings', settings)
  toast.success('Check-in reminder settings saved')
}

export function getUpcomingCheckIns() {
  const bookings = getFromStorage('admin-bookings', [])
  const now = startOfDay(new Date())
  const thirtyDaysFromNow = addDays(now, 30)
  
  const upcomingCheckIns = bookings
    .filter(b => {
      if (b.status !== 'confirmed') return false
      
      const checkInDate = startOfDay(new Date(b.checkIn))
      return !isBefore(checkInDate, now) && !isAfter(checkInDate, thirtyDaysFromNow)
    })
    .map(b => {
      const checkInDate = startOfDay(new Date(b.checkIn))
      const daysUntil = differenceInDays(checkInDate, now)
      
      return {
        ...b,
        daysUntilCheckIn: daysUntil,
        checkInDate: checkInDate.toISOString()
      }
    })
    .sort((a, b) => a.daysUntilCheckIn - b.daysUntilCheckIn)
  
  return upcomingCheckIns
}

export async function checkAndSendAutomaticReminders() {
  const settings = getReminderSettings()
  
  if (!settings.enabled || !settings.autoSendEnabled) {
    console.log('Automatic reminders are disabled')
    return { sent: 0, skipped: true }
  }

  const upcomingCheckIns = getUpcomingCheckIns()
  const sentReminders = getSentRemindersIndex()
  
  let sentCount = 0
  const results = []

  for (const booking of upcomingCheckIns) {
    const { daysUntilCheckIn } = booking
    const reminderKey = `${booking.id}-${daysUntilCheckIn}`
    
    if (sentReminders[reminderKey]) {
      continue
    }

    let shouldSend = false
    
    if (daysUntilCheckIn === 7 && settings.sendAt7Days) {
      shouldSend = true
    } else if (daysUntilCheckIn === 3 && settings.sendAt3Days) {
      shouldSend = true
    } else if (daysUntilCheckIn === 1 && settings.sendAt1Day) {
      shouldSend = true
    } else if (daysUntilCheckIn === 0 && settings.sendOnCheckInDay) {
      shouldSend = true
    }

    if (shouldSend) {
      const result = await sendCheckInReminder(booking, daysUntilCheckIn)
      
      if (result.success && !result.skipped) {
        markReminderAsSent(reminderKey)
        sentCount++
        results.push({
          bookingId: booking.id,
          guestName: booking.guestName,
          daysUntilCheckIn,
          success: true
        })
      } else if (!result.success) {
        results.push({
          bookingId: booking.id,
          guestName: booking.guestName,
          daysUntilCheckIn,
          success: false,
          error: result.error?.message
        })
      }
    }
  }

  saveReminderSettings({
    ...settings,
    lastAutoCheckTime: new Date().toISOString()
  })

  return {
    sent: sentCount,
    results,
    totalUpcoming: upcomingCheckIns.length
  }
}

function getSentRemindersIndex() {
  return getFromStorage('sent-reminders-index', {})
}

function markReminderAsSent(reminderKey) {
  const index = getSentRemindersIndex()
  index[reminderKey] = {
    sentAt: new Date().toISOString()
  }
  setToStorage('sent-reminders-index', index)
}

export function resetSentRemindersForBooking(bookingId) {
  const index = getSentRemindersIndex()
  const keysToRemove = Object.keys(index).filter(key => key.startsWith(`${bookingId}-`))
  
  keysToRemove.forEach(key => {
    delete index[key]
  })
  
  setToStorage('sent-reminders-index', index)
  toast.success('Reminder history reset for this booking')
}

export function clearAllSentReminders() {
  setToStorage('sent-reminders-index', {})
  toast.success('All reminder history cleared')
}
