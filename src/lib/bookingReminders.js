import { toast } from 'sonner'
import { format, differenceInDays, addDays, isBefore, isAfter, startOfDay } from 'date-fns'

export async function sendCheckInReminder(booking, daysUntilCheckIn) {
  try {
    const reminderSettings = await getReminderSettings()
    
    if (!reminderSettings.enabled) {
      console.log('Check-in reminders are disabled')
      return { success: true, skipped: true }
    }

    const emailData = await generateReminderEmail(booking, daysUntilCheckIn, reminderSettings)
    
    await logReminderNotification({
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
    
    await logReminderNotification({
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

async function generateReminderEmail(booking, daysUntilCheckIn, settings) {
  const checkInDate = new Date(booking.checkIn)
  const checkOutDate = new Date(booking.checkOut)
  
  const checkInFormatted = format(checkInDate, 'EEEE, MMMM d, yyyy')
  const checkOutFormatted = format(checkOutDate, 'EEEE, MMMM d, yyyy')
  const checkInTime = format(checkInDate, 'h:mm a')
  
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

  const prompt = window.spark.llmPrompt`Generate a warm, welcoming check-in reminder email for a guest staying at a luxury vacation rental property in the French Riviera.

Context: The VIF (The Vacation in France) is sending a check-in reminder to a confirmed guest.

Booking Details:
- Property: ${booking.propertyName}
- Guest Name: ${booking.guestName}
- Check-in: ${checkInFormatted}
- Check-out: ${checkOutFormatted}
- Duration: ${nights} night${nights !== 1 ? 's' : ''}
- Number of Guests: ${booking.guests}
- Days Until Check-in: ${daysUntilCheckIn}
- Timeframe: ${timeframeText}

The email should:
1. Start with a warm, personalized greeting using their name
2. Express excitement about their upcoming arrival
3. Confirm key details: property name, check-in date and time (2:00 PM - 8:00 PM), check-out date
4. Include essential pre-arrival information:
   - Check-in time window: 2:00 PM - 8:00 PM
   - Remind them to notify the property of their estimated arrival time
   - Mention bringing a valid ID and credit card for check-in
   ${booking.propertyId === 'athena-apartment' ? '- Security deposit: €600 (credit card)' : ''}
   ${booking.propertyId === 'villa-bellevue' ? '- Security deposit: €500 (cash)' : ''}
   ${booking.propertyId === 'villa-rocsea' ? '- Security deposit: €2,000 (credit card, collected 7 days before arrival)' : ''}
5. Provide helpful tips for arrival:
   - Address will be provided 24-48 hours before check-in
   - Contact information for questions
   - WiFi and amenities will be ready upon arrival
6. ${daysUntilCheckIn <= 1 ? 'Include last-minute reminders (weather check, parking, etc.)' : 'Mention looking forward to welcoming them'}
7. End with a friendly closing that emphasizes The VIF's commitment to an exceptional stay
8. Keep the tone luxurious yet approachable - elegant but not stuffy

Format: Plain text email with proper spacing and line breaks for readability.
Do not include subject line - only the email body.`

  const body = await window.spark.llm(prompt, 'gpt-4o')

  return {
    subject,
    body: body.trim(),
    to: booking.guestEmail,
    guestName: booking.guestName,
    from: 'The VIF Guest Services <concierge@thevif.com>'
  }
}

async function logReminderNotification(log) {
  const logs = await window.spark.kv.get('check-in-reminder-logs') || []
  logs.unshift(log)
  
  if (logs.length > 200) {
    logs.splice(200)
  }
  
  await window.spark.kv.set('check-in-reminder-logs', logs)
}

export async function getReminderLogs() {
  return await window.spark.kv.get('check-in-reminder-logs') || []
}

export async function clearReminderLogs() {
  await window.spark.kv.set('check-in-reminder-logs', [])
}

export async function getReminderSettings() {
  const defaultSettings = {
    enabled: true,
    sendAt7Days: true,
    sendAt3Days: true,
    sendAt1Day: true,
    sendOnCheckInDay: false,
    autoSendEnabled: false,
    lastAutoCheckTime: null
  }
  
  const settings = await window.spark.kv.get('check-in-reminder-settings')
  return settings || defaultSettings
}

export async function saveReminderSettings(settings) {
  await window.spark.kv.set('check-in-reminder-settings', settings)
  toast.success('Check-in reminder settings saved')
}

export async function getUpcomingCheckIns() {
  const bookings = await window.spark.kv.get('admin-bookings') || []
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
  const settings = await getReminderSettings()
  
  if (!settings.enabled || !settings.autoSendEnabled) {
    console.log('Automatic reminders are disabled')
    return { sent: 0, skipped: true }
  }

  const upcomingCheckIns = await getUpcomingCheckIns()
  const sentReminders = await getSentRemindersIndex()
  
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
        await markReminderAsSent(reminderKey)
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

  await saveReminderSettings({
    ...settings,
    lastAutoCheckTime: new Date().toISOString()
  })

  return {
    sent: sentCount,
    results,
    totalUpcoming: upcomingCheckIns.length
  }
}

async function getSentRemindersIndex() {
  return await window.spark.kv.get('sent-reminders-index') || {}
}

async function markReminderAsSent(reminderKey) {
  const index = await getSentRemindersIndex()
  index[reminderKey] = {
    sentAt: new Date().toISOString()
  }
  await window.spark.kv.set('sent-reminders-index', index)
}

export async function resetSentRemindersForBooking(bookingId) {
  const index = await getSentRemindersIndex()
  const keysToRemove = Object.keys(index).filter(key => key.startsWith(`${bookingId}-`))
  
  keysToRemove.forEach(key => {
    delete index[key]
  })
  
  await window.spark.kv.set('sent-reminders-index', index)
  toast.success('Reminder history reset for this booking')
}

export async function clearAllSentReminders() {
  await window.spark.kv.set('sent-reminders-index', {})
  toast.success('All reminder history cleared')
}
