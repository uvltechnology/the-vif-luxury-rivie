# Booking Reminder Emails for Upcoming Check-Ins

## Overview

The VIF now includes an automated check-in reminder email system that sends personalized reminders to guests before their arrival. This feature helps improve guest experience, reduce no-shows, and ensure guests have all necessary information before check-in.

## Features

### 1. **Automated Reminder Schedule**
- **7 Days Before**: Initial reminder with booking confirmation and arrival expectations
- **3 Days Before**: Pre-arrival details including check-in times, deposit requirements, and property information
- **1 Day Before**: Final reminder with last-minute tips and contact information
- **On Check-In Day**: Welcome reminder (optional)

### 2. **Intelligent Email Generation**
- Uses AI (GPT-4) to generate personalized, warm email content for each reminder
- Automatically includes all relevant booking details:
  - Property name and type
  - Guest name and contact information
  - Check-in/check-out dates and times
  - Number of guests
  - Security deposit requirements (varies by property)
  - Check-in time windows
  - House rules and policies

### 3. **Manual & Automatic Sending**
- **Manual Mode**: Review and send reminders individually from the dashboard
- **Automatic Mode**: Set it and forget it - run auto-check to send all due reminders
- **Run Auto-Check**: One-click button to process all upcoming check-ins and send appropriate reminders

### 4. **Smart Tracking**
- Prevents duplicate reminders - tracks which reminders have been sent for each booking
- Complete reminder history with detailed logs
- View sent reminder content and delivery status
- Reset reminder history for individual bookings if needed

### 5. **Property-Specific Information**
Each property has unique requirements automatically included in reminders:

**Palm Beach Apartment**
- Security deposit: €600 (credit card)
- Check-in: 2:00 PM - 8:00 PM
- Check-out: 9:00 AM - 1:00 PM

**Villa Bellevue**
- Security deposit: €500 (cash)
- Check-in: 2:00 PM - 8:00 PM
- Check-out: 8:00 AM - 2:00 PM

**Villa Rocsea**
- Security deposit: €2,000 (credit card, collected 7 days before)
- Check-in: 12:00 PM - 8:00 PM
- Check-out: 10:00 AM - 2:00 PM

## How to Use

### Initial Setup

1. **Navigate to Admin Dashboard** → `/admin`
2. Click the **"Reminders"** tab
3. Configure your reminder preferences:
   - Enable/disable the reminder system
   - Choose which reminder intervals to use (7-day, 3-day, 1-day, same-day)
   - Enable automatic sending if desired
4. Click **"Save Settings"**

### Sending Reminders

#### Option 1: Automatic (Recommended)
1. Enable "Automatic Sending" in settings
2. Click **"Run Auto-Check"** button
3. The system will:
   - Scan all confirmed bookings
   - Identify which guests need reminders based on check-in dates
   - Send appropriate reminders automatically
   - Skip any reminders already sent

#### Option 2: Manual
1. Review the "Upcoming Check-Ins" list
2. Click **"Send Reminder"** for individual bookings
3. View confirmation in the Reminder History

### Managing Reminders

#### View Upcoming Check-Ins
- Dashboard shows all check-ins in the next 30 days
- Organized by urgency: Today, Tomorrow, This Week, Later
- Quick stats at a glance

#### Monitor Reminder History
- View all sent reminders with timestamps
- Check delivery status (sent/failed)
- Click on any log entry to view full email content
- Clear old logs to keep dashboard clean

#### Reset Reminders
- Use **"Reset"** button for individual bookings to clear reminder history
- Useful if you need to resend reminders or if booking details changed
- Allows reminders to be sent again for that booking

## Email Content Structure

Each reminder email includes:

1. **Personalized Greeting**: Uses guest's name
2. **Excitement & Welcome**: Warm introduction expressing excitement about their stay
3. **Booking Confirmation**: Property, dates, number of guests
4. **Check-In Details**: 
   - Arrival time window
   - Security deposit information
   - ID and payment requirements
5. **Pre-Arrival Information**:
   - Address details (provided closer to check-in)
   - Contact information for questions
   - Amenities confirmation
6. **Helpful Tips**: Property-specific guidance and local recommendations
7. **Friendly Closing**: Reinforces commitment to exceptional experience

### Email Tone
- **Luxurious yet approachable**: Reflects The VIF's premium positioning without being stuffy
- **Warm and personal**: Makes guests feel valued and excited
- **Clear and informative**: Ensures guests have all necessary information
- **Helpful and reassuring**: Reduces anxiety about arrival logistics

## Technical Details

### Files Added/Modified

**New Files:**
- `/src/lib/bookingReminders.js` - Core reminder logic and email generation
- `/src/components/admin/CheckInReminders.jsx` - Admin interface for managing reminders

**Modified Files:**
- `/src/pages/Admin.jsx` - Added Reminders tab to admin dashboard

### Data Storage

Uses Spark KV storage for:
- `check-in-reminder-settings` - User configuration
- `check-in-reminder-logs` - History of sent reminders
- `sent-reminders-index` - Tracking which reminders have been sent
- `admin-bookings` - Source of booking data

### Dependencies
- `date-fns` - Date calculations and formatting
- `@github/spark/hooks` - KV storage
- Spark LLM API - Email content generation

## Best Practices

1. **Run Auto-Check Regularly**: Set a reminder to run auto-check daily to ensure timely reminders
2. **Review Settings Seasonally**: Adjust reminder timing based on peak/off-peak seasons
3. **Monitor Logs**: Check reminder history weekly to ensure emails are being sent
4. **Test First**: Send a test reminder to yourself before enabling automatic mode
5. **Keep Settings Updated**: Ensure email notification settings have correct recipient email

## Troubleshooting

**Reminders Not Sending?**
- Check that "Enable Check-In Reminders" is turned ON
- Verify at least one reminder interval is selected (7-day, 3-day, etc.)
- Ensure bookings have status "confirmed"
- Check that booking dates are in the future

**Duplicate Reminders?**
- The system automatically prevents duplicates
- If needed, use "Reset" to clear reminder history for a booking

**Missing Bookings in Upcoming List?**
- Only shows confirmed bookings
- Only shows check-ins within next 30 days
- Verify booking dates are correct

**Email Content Issues?**
- AI generates unique content each time
- Refresh/retry if content doesn't look right
- All critical details are programmatically included

## Future Enhancements

Potential improvements for future iterations:
- Email template customization
- SMS reminder option
- Guest reply tracking
- Automated follow-up after check-out
- Integration with calendar systems
- Multi-language support
- Guest portal for self-service information

## Support

For questions or issues with the reminder system:
1. Check reminder logs in the dashboard
2. Verify settings are correctly configured
3. Review this documentation
4. Contact system administrator if problems persist

---

**Last Updated**: January 2025  
**Version**: 1.0
