# Admin Dashboard Documentation

## Overview
The admin dashboard provides property owners with a centralized interface to manage bookings and availability across all VIF properties.

## Access
- **URL**: `/admin`
- **Authentication**: Only accessible to users with `isOwner` status (verified via Spark's `spark.user()` API)
- Non-owners will see an access denied message

## Features

### 1. Bookings Management
Located in the "Bookings" tab, this section allows you to:

#### Statistics Dashboard
- View real-time statistics:
  - Total bookings
  - Confirmed bookings
  - Pending bookings
  - Cancelled bookings

#### Booking List
- View all bookings with complete guest information
- Search by guest name, email, or property name
- Filter by booking status (confirmed, pending, cancelled)
- Each booking displays:
  - Guest name and contact information
  - Property name
  - Check-in and check-out dates
  - Number of guests
  - Total price
  - Booking notes

#### Add New Booking
Click the "Add Booking" button to create a new reservation:
1. Select the property
2. Enter guest details (name, email, phone)
3. Select check-in and check-out dates
4. Set number of guests
5. Choose booking status
6. Add optional notes

The system automatically calculates the total price based on:
- Nightly rate for the property
- Number of nights
- Does NOT include seasonal pricing (uses base rate)

#### Manage Bookings
- Update booking status using the dropdown (Confirmed/Pending/Cancelled)
- Delete bookings using the trash icon
- All changes persist automatically via the Spark KV storage

### 2. Availability Calendar
Located in the "Availability" tab, this section allows you to:

#### Property Selection
- Select which property to manage using the dropdown menu
- Calendar updates automatically when switching properties

#### Calendar View
- Visual calendar showing the current month
- Navigate between months using the arrow buttons or "Today" button
- Color-coded dates:
  - **Blue**: Booked by guests
  - **Red**: Blocked by admin
  - **White/Hover**: Available for booking
  - **Grayed**: Past dates

#### Block Dates
Click "Block Dates" to mark periods as unavailable:
1. Select start date
2. Select end date
3. Add optional reason (e.g., "Maintenance", "Personal use")
4. Click "Block Dates"

Blocked dates will:
- Appear in red on the calendar
- Prevent guest bookings via the front-end calendar
- Be listed in the "Blocked Periods" panel

#### Blocked Periods Panel
- Shows all upcoming blocked date ranges
- Displays the reason for each block
- Remove blocks by clicking the trash icon

### 3. Integration with Front-End Booking System

The admin dashboard integrates seamlessly with the property booking calendars on the public site:

#### Data Storage
- **Admin bookings**: Stored in `admin-bookings` key
- **Property booked dates**: Stored in `bookings-{propertyId}` key (used by front-end calendar)
- **Blocked dates**: Stored in `admin-blocked-dates` key

#### How It Works
1. When guests view properties, the booking calendar checks both:
   - Dates from `bookings-{propertyId}` (actual booked dates)
   - Dates from admin bookings with matching property ID
   
2. Admin-blocked dates prevent users from selecting those dates in the front-end calendar

3. When creating admin bookings, the dates are NOT automatically added to the property's booked dates array - this is intentional to allow you to create bookings without blocking the calendar if needed

## Data Persistence

All data is stored using Spark's KV (Key-Value) storage system:
- Survives page refreshes
- Persists between sessions
- Automatically synced
- No external database needed

## Mobile Responsive

The admin dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones (optimized for touch interactions)

## Tips

1. **Add bookings immediately** when you receive a reservation to prevent double-bookings
2. **Use blocked dates** for maintenance, personal use, or other unavailable periods
3. **Update booking status** to track confirmation and cancellations
4. **Add notes** to bookings for special requests or important information
5. **Check the calendar regularly** to stay on top of property availability

## Support

If you encounter any issues:
1. Refresh the page to ensure latest data is loaded
2. Check that you're logged in with an owner account
3. Clear browser cache if experiencing display issues
