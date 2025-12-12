import { useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import QuickAccessWidget from '@/components/admin/QuickAccessWidget'
import { properties } from '@/data/properties'
import { format, subDays, isWithinInterval, parseISO, differenceInDays, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns'
import { CalendarBlank, CurrencyEur, TrendUp, Users, Bed, Star, ChartLine } from '@phosphor-icons/react'

function AnalyticsDashboard() {
  const [bookings] = useKV('admin-bookings', [])

  const stats = useMemo(() => {
    const allBookings = bookings || []
    const today = new Date()
    const last30Days = subDays(today, 30)
    const last90Days = subDays(today, 90)

    const confirmedBookings = allBookings.filter(b => b.status === 'confirmed')
    
    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)
    
    const recentBookings = confirmedBookings.filter(b => {
      const bookingDate = parseISO(b.createdAt)
      return isWithinInterval(bookingDate, { start: last30Days, end: today })
    })
    
    const upcomingBookings = confirmedBookings.filter(b => {
      const checkIn = parseISO(b.checkIn)
      return checkIn >= today
    })
    
    const currentGuests = confirmedBookings.filter(b => {
      const checkIn = parseISO(b.checkIn)
      const checkOut = parseISO(b.checkOut)
      return isWithinInterval(today, { start: checkIn, end: checkOut })
    })
    
    const totalNights = confirmedBookings.reduce((sum, b) => {
      const checkIn = parseISO(b.checkIn)
      const checkOut = parseISO(b.checkOut)
      return sum + differenceInDays(checkOut, checkIn)
    }, 0)
    
    const avgBookingValue = confirmedBookings.length > 0 
      ? totalRevenue / confirmedBookings.length 
      : 0
    
    const occupancyRate = properties.reduce((acc, property) => {
      const propertyBookings = confirmedBookings.filter(b => b.propertyId === property.id)
      const bookedNights = propertyBookings.reduce((sum, b) => {
        const checkIn = parseISO(b.checkIn)
        const checkOut = parseISO(b.checkOut)
        return sum + differenceInDays(checkOut, checkIn)
      }, 0)
      const daysInPeriod = 90
      const rate = (bookedNights / daysInPeriod) * 100
      return acc + rate
    }, 0) / properties.length

    return {
      totalBookings: confirmedBookings.length,
      totalRevenue,
      recentBookings: recentBookings.length,
      upcomingBookings: upcomingBookings.length,
      currentGuests: currentGuests.reduce((sum, b) => sum + b.guests, 0),
      avgBookingValue,
      occupancyRate: occupancyRate.toFixed(1),
      totalNights,
      pendingBookings: allBookings.filter(b => b.status === 'pending').length
    }
  }, [bookings])

  const revenueByProperty = useMemo(() => {
    const allBookings = bookings || []
    return properties.map(property => {
      const propertyBookings = allBookings.filter(
        b => b.propertyId === property.id && b.status === 'confirmed'
      )
      const revenue = propertyBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)
      const bookingCount = propertyBookings.length
      return {
        name: property.name,
        revenue,
        bookingCount
      }
    }).sort((a, b) => b.revenue - a.revenue)
  }, [bookings])

  const monthlyRevenue = useMemo(() => {
    const allBookings = bookings || []
    const today = new Date()
    const sixMonthsAgo = subMonths(today, 5)
    const months = eachMonthOfInterval({ start: sixMonthsAgo, end: today })
    
    return months.map(month => {
      const monthStart = startOfMonth(month)
      const monthEnd = endOfMonth(month)
      
      const monthBookings = allBookings.filter(b => {
        if (b.status !== 'confirmed') return false
        const checkIn = parseISO(b.checkIn)
        return isWithinInterval(checkIn, { start: monthStart, end: monthEnd })
      })
      
      const revenue = monthBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)
      
      return {
        month: format(month, 'MMM yyyy'),
        revenue,
        bookings: monthBookings.length
      }
    })
  }, [bookings])

  return (
    <div className="space-y-6">
      <QuickAccessWidget />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CurrencyEur className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">€{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Avg €{stats.avgBookingValue.toFixed(0)} per booking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Total Bookings</CardDescription>
            <CalendarBlank className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.recentBookings} in last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Occupancy Rate</CardDescription>
            <TrendUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 90 days average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Current Guests</CardDescription>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.currentGuests}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.upcomingBookings} upcoming bookings
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Property</CardTitle>
            <CardDescription>Total earnings per property</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByProperty.map((property, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Bed size={16} className="text-muted-foreground" />
                      <span className="font-medium">{property.name}</span>
                    </div>
                    <span className="font-semibold">€{property.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ 
                          width: `${(property.revenue / Math.max(...revenueByProperty.map(p => p.revenue))) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground ml-3">
                      {property.bookingCount} {property.bookingCount === 1 ? 'booking' : 'bookings'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Last 6 months performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyRevenue.map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <ChartLine size={16} className="text-muted-foreground" />
                      <span className="font-medium">{month.month}</span>
                    </div>
                    <span className="font-semibold">€{month.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-secondary rounded-full transition-all"
                        style={{ 
                          width: `${(month.revenue / Math.max(...monthlyRevenue.map(m => m.revenue), 1)) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground ml-3">
                      {month.bookings} {month.bookings === 1 ? 'booking' : 'bookings'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Nights Booked</CardDescription>
            <CardTitle className="text-2xl">{stats.totalNights}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Upcoming Check-ins</CardDescription>
            <CardTitle className="text-2xl">{stats.upcomingBookings}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Approvals</CardDescription>
            <CardTitle className="text-2xl">{stats.pendingBookings}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
