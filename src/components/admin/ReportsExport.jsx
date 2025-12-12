import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format, startOfMonth, endOfMonth, parseISO, isWithinInterval } from 'date-fns'
import { DownloadSimple, FileText, CurrencyEur, CalendarBlank } from '@phosphor-icons/react'
import { toast } from 'sonner'

function ReportsExport() {
  const [bookings] = useKV('admin-bookings', [])
  const [messages] = useKV('admin-messages', [])
  const [reportType, setReportType] = useState('bookings')
  const [reportPeriod, setReportPeriod] = useState('current-month')

  const getDateRange = () => {
    const today = new Date()
    switch (reportPeriod) {
      case 'current-month':
        return { start: startOfMonth(today), end: endOfMonth(today) }
      case 'last-month':
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        return { start: startOfMonth(lastMonth), end: endOfMonth(lastMonth) }
      case 'all-time':
        return { start: new Date(2020, 0, 1), end: today }
      default:
        return { start: startOfMonth(today), end: endOfMonth(today) }
    }
  }

  const generateBookingsReport = () => {
    const { start, end } = getDateRange()
    const filteredBookings = (bookings || []).filter(b => {
      const checkIn = parseISO(b.checkIn)
      return isWithinInterval(checkIn, { start, end })
    })

    const csvContent = [
      ['Booking ID', 'Property', 'Guest Name', 'Email', 'Phone', 'Check-in', 'Check-out', 'Guests', 'Status', 'Total Price', 'Created At'],
      ...filteredBookings.map(b => [
        b.id,
        b.propertyName,
        b.guestName,
        b.guestEmail,
        b.guestPhone || '',
        b.checkIn,
        b.checkOut,
        b.guests,
        b.status,
        b.totalPrice,
        format(parseISO(b.createdAt), 'yyyy-MM-dd HH:mm')
      ])
    ]

    return csvContent.map(row => row.join(',')).join('\n')
  }

  const generateMessagesReport = () => {
    const { start, end } = getDateRange()
    const filteredMessages = (messages || []).filter(m => {
      const created = parseISO(m.createdAt)
      return isWithinInterval(created, { start, end })
    })

    const csvContent = [
      ['Message ID', 'Guest Name', 'Email', 'Phone', 'Subject', 'Status', 'Replies Count', 'Created At'],
      ...filteredMessages.map(m => [
        m.id,
        m.guestName,
        m.guestEmail,
        m.guestPhone || '',
        m.subject,
        m.status,
        (m.replies || []).length,
        format(parseISO(m.createdAt), 'yyyy-MM-dd HH:mm')
      ])
    ]

    return csvContent.map(row => row.join(',')).join('\n')
  }

  const generateRevenueReport = () => {
    const { start, end } = getDateRange()
    const confirmedBookings = (bookings || []).filter(b => {
      const checkIn = parseISO(b.checkIn)
      return b.status === 'confirmed' && isWithinInterval(checkIn, { start, end })
    })

    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)
    const avgBookingValue = confirmedBookings.length > 0 ? totalRevenue / confirmedBookings.length : 0

    const csvContent = [
      ['Summary Report', format(start, 'MMM d, yyyy'), 'to', format(end, 'MMM d, yyyy')],
      [],
      ['Total Bookings', confirmedBookings.length],
      ['Total Revenue', `€${totalRevenue}`],
      ['Average Booking Value', `€${avgBookingValue.toFixed(2)}`],
      [],
      ['Booking ID', 'Property', 'Guest', 'Check-in', 'Revenue'],
      ...confirmedBookings.map(b => [
        b.id,
        b.propertyName,
        b.guestName,
        b.checkIn,
        `€${b.totalPrice}`
      ])
    ]

    return csvContent.map(row => row.join(',')).join('\n')
  }

  const handleExport = () => {
    let csvContent = ''
    let filename = ''

    switch (reportType) {
      case 'bookings':
        csvContent = generateBookingsReport()
        filename = `bookings-report-${format(new Date(), 'yyyy-MM-dd')}.csv`
        break
      case 'messages':
        csvContent = generateMessagesReport()
        filename = `messages-report-${format(new Date(), 'yyyy-MM-dd')}.csv`
        break
      case 'revenue':
        csvContent = generateRevenueReport()
        filename = `revenue-report-${format(new Date(), 'yyyy-MM-dd')}.csv`
        break
      default:
        return
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success('Report exported successfully')
  }

  const getStats = () => {
    const { start, end } = getDateRange()
    
    const periodBookings = (bookings || []).filter(b => {
      const checkIn = parseISO(b.checkIn)
      return isWithinInterval(checkIn, { start, end })
    })

    const confirmedBookings = periodBookings.filter(b => b.status === 'confirmed')
    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)

    const periodMessages = (messages || []).filter(m => {
      const created = parseISO(m.createdAt)
      return isWithinInterval(created, { start, end })
    })

    return {
      bookings: periodBookings.length,
      revenue: totalRevenue,
      messages: periodMessages.length
    }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reports & Export</CardTitle>
          <CardDescription>Generate and download reports for your records</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bookings">Bookings Report</SelectItem>
                  <SelectItem value="revenue">Revenue Summary</SelectItem>
                  <SelectItem value="messages">Guest Messages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <CalendarBlank size={16} />
                  Bookings
                </CardDescription>
                <CardTitle className="text-2xl">{stats.bookings}</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <CurrencyEur size={16} />
                  Revenue
                </CardDescription>
                <CardTitle className="text-2xl">€{stats.revenue.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <FileText size={16} />
                  Messages
                </CardDescription>
                <CardTitle className="text-2xl">{stats.messages}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Button onClick={handleExport} size="lg" className="w-full">
            <DownloadSimple size={20} className="mr-2" />
            Export as CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReportsExport
