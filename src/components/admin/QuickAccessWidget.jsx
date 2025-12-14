import { useState, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format, isToday, isTomorrow, parseISO, isPast } from 'date-fns'
import { CalendarCheck, BellRinging, EnvelopeSimple, Clock } from '@phosphor-icons/react'

function QuickAccessWidget() {
  const [bookings] = useLocalStorage('admin-bookings', [])
  const [messages] = useLocalStorage('admin-messages', [])

  const todayCheckIns = useMemo(() => {
    return (bookings || []).filter(b => {
      if (b.status !== 'confirmed') return false
      const checkIn = parseISO(b.checkIn)
      return isToday(checkIn)
    })
  }, [bookings])

  const tomorrowCheckIns = useMemo(() => {
    return (bookings || []).filter(b => {
      if (b.status !== 'confirmed') return false
      const checkIn = parseISO(b.checkIn)
      return isTomorrow(checkIn)
    })
  }, [bookings])

  const todayCheckOuts = useMemo(() => {
    return (bookings || []).filter(b => {
      if (b.status !== 'confirmed') return false
      const checkOut = parseISO(b.checkOut)
      return isToday(checkOut)
    })
  }, [bookings])

  const pendingActions = useMemo(() => {
    const pending = (bookings || []).filter(b => b.status === 'pending')
    const unreadMessages = (messages || []).filter(m => m.status === 'unread')
    return {
      pendingBookings: pending.length,
      unreadMessages: unreadMessages.length
    }
  }, [bookings, messages])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Today's Activity</CardTitle>
              <CardDescription>Check-ins and check-outs for today</CardDescription>
            </div>
            <CalendarCheck size={24} className="text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {todayCheckIns.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Check-ins
                    </Badge>
                    <span className="text-muted-foreground">({todayCheckIns.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {todayCheckIns.map(booking => (
                      <div key={booking.id} className="p-3 bg-muted rounded-lg text-sm">
                        <p className="font-medium">{booking.guestName}</p>
                        <p className="text-muted-foreground">{booking.propertyName}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {todayCheckOuts.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      Check-outs
                    </Badge>
                    <span className="text-muted-foreground">({todayCheckOuts.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {todayCheckOuts.map(booking => (
                      <div key={booking.id} className="p-3 bg-muted rounded-lg text-sm">
                        <p className="font-medium">{booking.guestName}</p>
                        <p className="text-muted-foreground">{booking.propertyName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {todayCheckIns.length === 0 && todayCheckOuts.length === 0 && (
                <div className="text-center py-8">
                  <Clock size={48} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No activity scheduled for today</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pending Actions</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </div>
            <BellRinging size={24} className="text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingActions.pendingBookings > 0 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">
                      Pending Bookings
                    </h4>
                    <p className="text-sm text-yellow-800">
                      {pendingActions.pendingBookings} {pendingActions.pendingBookings === 1 ? 'booking needs' : 'bookings need'} confirmation
                    </p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    {pendingActions.pendingBookings}
                  </Badge>
                </div>
              </div>
            )}

            {pendingActions.unreadMessages > 0 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      Unread Messages
                    </h4>
                    <p className="text-sm text-blue-800">
                      {pendingActions.unreadMessages} {pendingActions.unreadMessages === 1 ? 'message requires' : 'messages require'} your response
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {pendingActions.unreadMessages}
                  </Badge>
                </div>
              </div>
            )}

            {tomorrowCheckIns.length > 0 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Tomorrow's Check-ins
                    </h4>
                    <p className="text-sm text-green-800">
                      {tomorrowCheckIns.length} {tomorrowCheckIns.length === 1 ? 'guest arrives' : 'guests arrive'} tomorrow
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {tomorrowCheckIns.length}
                  </Badge>
                </div>
              </div>
            )}

            {pendingActions.pendingBookings === 0 && 
             pendingActions.unreadMessages === 0 && 
             tomorrowCheckIns.length === 0 && (
              <div className="text-center py-8">
                <CalendarCheck size={48} className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">All caught up! No pending actions.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuickAccessWidget
