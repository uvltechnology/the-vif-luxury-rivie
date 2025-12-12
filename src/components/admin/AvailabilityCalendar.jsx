import { useState, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { properties } from '@/data/properties'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfDay, parseISO } from 'date-fns'
import { Plus, CaretLeft, CaretRight, CalendarBlank, Trash, Info } from '@phosphor-icons/react'
import { toast } from 'sonner'

function AvailabilityCalendar() {
  const [blockedDates, setBlockedDates] = useKV('admin-blocked-dates', [])
  const [bookings] = useKV('admin-bookings', [])
  const [selectedProperty, setSelectedProperty] = useState(properties[0]?.id || '')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  })

  const [propertyBookedDates] = useKV(`bookings-${selectedProperty}`, [])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const startDayOfWeek = monthStart.getDay()
  const previousMonthDays = Array(startDayOfWeek).fill(null)

  const allDays = [...previousMonthDays, ...daysInMonth]

  const propertyBookings = useMemo(() => {
    return (bookings || []).filter(b => 
      b.propertyId === selectedProperty && 
      b.status !== 'cancelled'
    )
  }, [bookings, selectedProperty])

  const propertyBlocked = useMemo(() => {
    return (blockedDates || []).filter(b => b.propertyId === selectedProperty)
  }, [blockedDates, selectedProperty])

  const isDateBooked = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    
    const bookedFromKV = (propertyBookedDates || []).some(bookedDateStr => {
      const bookedDate = format(startOfDay(new Date(bookedDateStr)), 'yyyy-MM-dd')
      return dateStr === bookedDate
    })
    
    if (bookedFromKV) return true
    
    return propertyBookings.some(booking => {
      const checkIn = booking.checkIn
      const checkOut = booking.checkOut
      return dateStr >= checkIn && dateStr < checkOut
    })
  }

  const isDateBlocked = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return propertyBlocked.some(blocked => {
      return dateStr >= blocked.startDate && dateStr <= blocked.endDate
    })
  }

  const getDateStatus = (date) => {
    if (!date || !isSameMonth(date, currentMonth)) return null
    
    if (isBefore(date, startOfDay(new Date()))) {
      return 'past'
    }
    
    if (isDateBooked(date)) {
      return 'booked'
    }
    
    if (isDateBlocked(date)) {
      return 'blocked'
    }
    
    return 'available'
  }

  const handleAddBlock = () => {
    if (!formData.startDate || !formData.endDate) {
      toast.error('Please select start and end dates')
      return
    }

    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)

    if (end < start) {
      toast.error('End date must be after start date')
      return
    }

    const newBlock = {
      id: `BLK-${Date.now()}`,
      propertyId: selectedProperty,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      createdAt: new Date().toISOString()
    }

    setBlockedDates((current) => [...(current || []), newBlock])
    
    setFormData({
      startDate: '',
      endDate: '',
      reason: ''
    })
    
    setIsAddDialogOpen(false)
    toast.success('Dates blocked successfully')
  }

  const handleRemoveBlock = (id) => {
    setBlockedDates((current) => (current || []).filter(b => b.id !== id))
    toast.success('Block removed')
  }

  const getDayClasses = (status) => {
    const base = 'aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors relative'
    
    switch (status) {
      case 'past':
        return `${base} text-muted-foreground/50 cursor-not-allowed`
      case 'booked':
        return `${base} bg-blue-100 text-blue-800 cursor-default`
      case 'blocked':
        return `${base} bg-red-100 text-red-800 cursor-default`
      case 'available':
        return `${base} hover:bg-accent cursor-pointer`
      default:
        return `${base} invisible`
    }
  }

  const upcomingBlocks = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd')
    return (blockedDates || [])
      .filter(b => b.propertyId === selectedProperty && b.endDate >= today)
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
  }, [blockedDates, selectedProperty])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Label>Property:</Label>
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[280px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {properties.map(property => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={20} className="mr-2" />
              Block Dates
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Block Dates</DialogTitle>
              <DialogDescription>Mark dates as unavailable for booking</DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input 
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input 
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reason">Reason (Optional)</Label>
                <Textarea 
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Maintenance, personal use, etc."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBlock}>
                Block Dates
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Availability Calendar</CardTitle>
                <CardDescription>
                  {format(currentMonth, 'MMMM yyyy')}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <CaretLeft size={20} />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentMonth(new Date())}
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <CaretRight size={20} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 rounded" />
                <span>Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 rounded" />
                <span>Blocked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-accent rounded" />
                <span>Available</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground p-2">
                  {day}
                </div>
              ))}
              
              {allDays.map((day, index) => {
                const status = getDateStatus(day)
                return (
                  <div key={index} className={getDayClasses(status)}>
                    {day ? (
                      <>
                        <span>{format(day, 'd')}</span>
                        {isToday(day) && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                        )}
                      </>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blocked Periods</CardTitle>
            <CardDescription>Upcoming blocked dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingBlocks.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarBlank size={48} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No blocked dates</p>
                </div>
              ) : (
                upcomingBlocks.map(block => (
                  <Card key={block.id} className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CalendarBlank size={16} className="text-muted-foreground flex-shrink-0" />
                          <p className="text-sm font-medium truncate">
                            {format(parseISO(block.startDate), 'MMM d')} - {format(parseISO(block.endDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                        {block.reason && (
                          <div className="flex items-start gap-2 mt-2">
                            <Info size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-muted-foreground">{block.reason}</p>
                          </div>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => handleRemoveBlock(block.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AvailabilityCalendar
