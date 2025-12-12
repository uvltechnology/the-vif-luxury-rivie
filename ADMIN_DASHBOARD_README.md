# Admin Dashboard - The VIF

## Overview
The Admin Dashboard is a comprehensive property management system for The VIF luxury vacation rentals. It provides complete control over bookings, property settings, guest communications, and business analytics.

## Accessing the Dashboard
Navigate to `/admin` in your browser. Access is restricted to property owners only - you must be signed in with an authorized GitHub account that has ownership permissions.

## Dashboard Sections

### 1. Overview
The main analytics dashboard provides:
- **Quick Access Widget**: Today's check-ins/check-outs and pending actions
- **Revenue Metrics**: Total revenue, average booking value, and trends
- **Occupancy Rates**: Property utilization across all rentals
- **Booking Statistics**: Total, recent, and upcoming bookings
- **Revenue by Property**: Performance comparison across villas and apartments
- **Monthly Trends**: 6-month revenue and booking history

### 2. Bookings
Complete booking management:
- **Add New Bookings**: Manual reservation creation with guest details
- **View All Bookings**: Searchable, filterable list of all reservations
- **Filter Options**: By status (confirmed, pending, cancelled)
- **Search**: Find bookings by guest name, email, or property
- **Update Status**: Change booking status with one click
- **Guest Information**: Full contact details and special requests
- **Booking Details**: Check-in/out dates, guest count, pricing

**Features:**
- Real-time booking statistics (total, confirmed, pending, cancelled)
- Automatic price calculation based on property rates and duration
- Guest contact information (email, phone)
- Special notes and requests
- Quick status updates
- Delete bookings

### 3. Availability Calendar
Visual calendar management for blocking dates:
- **Property Selection**: Switch between properties
- **Monthly Calendar**: Visual representation of availability
- **Block Dates**: Mark periods as unavailable
- **Color Coding**: 
  - Blue: Booked dates
  - Red: Blocked dates
  - White: Available dates
  - Gray: Past dates
- **Blocked Periods List**: View and manage all date blocks
- **Reasons**: Add notes for why dates are blocked (maintenance, personal use, etc.)

**Use Cases:**
- Block dates for property maintenance
- Reserve properties for personal use
- Seasonal closures
- Pre-booking holds

### 4. Properties
Manage property settings and pricing:
- **Property Cards**: Visual overview of all properties
- **Active/Inactive Status**: Toggle property visibility
- **Pricing Management**: Update nightly rates
- **Fee Settings**: Configure cleaning fees and security deposits
- **Minimum Stay**: Set minimum night requirements
- **Guest Capacity**: Update maximum occupancy
- **Descriptions**: Override default property descriptions

**Editable Settings:**
- Nightly rate
- Cleaning fee
- Security deposit
- Minimum stay duration
- Maximum guests
- Property description
- Active/inactive status

### 5. Guests
Guest communication center:
- **Message Inbox**: All guest inquiries from the contact form
- **Status Tracking**: Unread, read, replied, archived
- **Reply System**: Send responses directly from the dashboard
- **Guest Details**: Full contact information
- **Message History**: View all replies in conversation thread
- **Archive/Delete**: Organize and manage messages
- **Search & Filter**: Find messages by guest or status

**Message Workflow:**
1. Guest submits contact form on website
2. Message appears as "unread" in admin dashboard
3. Admin reads message (status changes to "read")
4. Admin sends reply (status changes to "replied")
5. Admin can archive when resolved

### 6. Reports
Export business data for record-keeping:
- **Report Types:**
  - Bookings Report: Complete reservation details
  - Revenue Summary: Financial overview with totals
  - Guest Messages: Communication history
  
- **Time Periods:**
  - Current Month
  - Last Month
  - All Time
  
- **Export Format:** CSV files for Excel/Google Sheets
- **Preview Stats**: See data summary before exporting

**Report Contents:**
- **Bookings**: ID, property, guest info, dates, pricing, status
- **Revenue**: Summary statistics and detailed transaction list
- **Messages**: Guest communications with timestamps and status

## Integration with Public Website

### Contact Form
When guests submit the contact form on the main website:
1. Inquiry is saved to contact-inquiries storage
2. Message is automatically created in admin-messages
3. Admin receives notification in Guests tab
4. Message appears as "unread" requiring response

### Property Display
Property settings from the admin affect the public website:
- Inactive properties are hidden from the Stays page
- Updated pricing reflects on property detail pages
- Modified descriptions override defaults
- Minimum stay requirements are enforced in booking calendar

## Data Persistence
All data is stored using the Spark KV (Key-Value) storage system:
- `admin-bookings`: All reservations
- `admin-blocked-dates`: Unavailable date ranges
- `admin-property-settings`: Property configurations
- `admin-messages`: Guest communications
- `contact-inquiries`: Website contact submissions

Data persists between sessions and is tied to your account.

## Best Practices

### Booking Management
- Confirm pending bookings promptly
- Add notes for special requests or requirements
- Keep guest contact information updated
- Review upcoming check-ins regularly

### Availability
- Block maintenance dates well in advance
- Review calendar weekly for accuracy
- Add clear reasons when blocking dates
- Unblock dates when plans change

### Guest Communication
- Respond to messages within 24 hours
- Use the reply system for tracking
- Archive resolved conversations
- Keep messages organized by status

### Property Settings
- Update pricing seasonally
- Review minimum stay requirements
- Adjust cleaning fees as needed
- Keep descriptions current and accurate

### Reports
- Export monthly reports for accounting
- Download quarterly revenue summaries
- Keep backup copies of booking data
- Review trends for business planning

## Tips & Shortcuts

- **Quick Stats**: The Overview tab provides instant business insights
- **Search Everything**: Use search bars to find specific bookings or messages
- **Status Filters**: Quickly filter by status in bookings and messages
- **Calendar Navigation**: Use "Today" button to return to current month
- **Batch Actions**: Update multiple booking statuses efficiently
- **Export Regularly**: Download reports for your records

## Troubleshooting

**Can't access admin?**
- Ensure you're signed in with the owner account
- Check that your account has isOwner permission
- Try refreshing the page

**Data not saving?**
- Check your internet connection
- Look for error messages in toast notifications
- Try the action again

**Calendar not showing bookings?**
- Verify the correct property is selected
- Check that bookings have confirmed status
- Ensure dates are in the current view range

**Reports showing no data?**
- Select the correct time period
- Verify bookings exist in that range
- Check that data type matches your needs

## Future Enhancements
Potential features for future updates:
- Automated email notifications to guests
- Direct booking engine integration
- Multi-property dashboard views
- Guest rating and review system
- Cleaning schedule management
- Expense tracking
- Integration with booking platforms (Airbnb, Booking.com)
- Mobile app version

---

**Need Help?**
For support with the admin dashboard, contact the development team or refer to the Spark documentation.
