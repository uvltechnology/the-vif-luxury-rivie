import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { adminPropertyApi, bookingApi } from '@/services/api'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfDay, parseISO, addDays } from 'date-fns'
import { Plus, CaretLeft, CaretRight, CalendarBlank, Trash, Info, CircleNotch } from '@phosphor-icons/react'
import { toast } from 'sonner'

function AvailabilityCalendar() {
  const [properties, setProperties] = useState([])
  const [bookings, setBookings] = useState([])
  const [blockedDates, setBlockedDates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'MAINTENANCE'
  })

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await adminPropertyApi.getAll()
        const props = response.data || []
        setProperties(props)
        if (props.length > 0 && !selectedProperty) {
          setSelectedProperty(props[0].id)
        }
      } catch (error) {
        console.error('Failed to fetch properties:', error)
        toast.error('Failed to load properties')
      }
    }
    fetchProperties()
  }, [])

  // Fetch availability data when property changes
  useEffect(() => {
    if (!selectedProperty) return
    
    const fetchAvailability = async () => {
      setIsLoading(true)
      try {
        // Get 6 months of data
        const startDate = format(subMonths(new Date(), 1), 'yyyy-MM-dd')
        const endDate = format(addMonths(new Date(), 6), 'yyyy-MM-dd')
        
        const [availabilityRes, bookingsRes] = await Promise.all([
          adminPropertyApi.getAvailability(selectedProperty, startDate, endDate),
          bookingApi.getAll({ propertyId: selectedProperty })
        ])
        
        setBlockedDates(availabilityRes.data?.blockedDates || [])
        setBookings(bookingsRes.data || [])
      } catch (error) {
        console.error('Failed to fetch availability:', error)
        toast.error('Failed to load availability data')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchAvailability()
  }, [selectedProperty])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const startDayOfWeek = monthStart.getDay()
  const previousMonthDays = Array(startDayOfWeek).fill(null)

  const allDays = [...previousMonthDays, ...daysInMonth]

  const propertyBookings = useMemo(() => {
    return (bookings || []).filter(b => 
      b.propertyId === selectedProperty && 
      b.status !== 'CANCELLED'
    )
  }, [bookings, selectedProperty])

  const isDateBooked = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    
    return propertyBookings.some(booking => {
      const checkIn = booking.checkIn?.split('T')[0]
      const checkOut = booking.checkOut?.split('T')[0]
      return dateStr >= checkIn && dateStr < checkOut
    })
  }

  const isDateBlocked = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return blockedDates.some(blocked => {
      const start = blocked.startDate?.split('T')[0]
      const end = blocked.endDate?.split('T')[0]
      return dateStr >= start && dateStr <= end
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

  const handleAddBlock = async () => {
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

    setIsSaving(true)
    try {
      const response = await adminPropertyApi.blockDates(selectedProperty, {
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        type: formData.type
      })
      
      setBlockedDates(current => [...current, response.data])
      
      setFormData({
        startDate: '',
        endDate: '',
        reason: '',
        type: 'MAINTENANCE'
      })
      
      setIsAddDialogOpen(false)
      toast.success('Dates blocked successfully')
    } catch (error) {
      console.error('Failed to block dates:', error)
      toast.error(error.message || 'Failed to block dates')
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemoveBlock = async (block) => {
    try {
      await adminPropertyApi.unblockDates(selectedProperty, block.id)
      setBlockedDates(current => current.filter(b => b.id !== block.id))
      toast.success('Block removed')
    } catch (error) {
      console.error('Failed to remove block:', error)
      toast.error('Failed to remove block')
    }
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
      .filter(b => {
        const endDate = b.endDate?.split('T')[0]
        return endDate >= today
      })
      .sort((a, b) => {
        const aStart = a.startDate?.split('T')[0]
        const bStart = b.startDate?.split('T')[0]
        return aStart.localeCompare(bStart)
      })
  }, [blockedDates])

  const selectedPropertyName = properties.find(p => p.id === selectedProperty)?.name || ''

  if (isLoading && properties.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <CircleNotch size={32} className="animate-spin text-primary" />
          <span className="ml-2">Loading calendar...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Label>Property:</Label>
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select property" />
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
            <Button disabled={!selectedProperty}>
              <Plus size={20} className="mr-2" />
              Block Dates
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Block Dates</DialogTitle>
              <DialogDescription>
                Mark dates as unavailable for booking at {selectedPropertyName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input 
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input 
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  min={formData.startDate || format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Reason Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                    <SelectItem value="OWNER_USE">Owner Use</SelectItem>
                    <SelectItem value="SEASONAL">Seasonal Closure</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reason">Notes (Optional)</Label>
                <Textarea 
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Additional details..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleAddBlock} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <CircleNotch size={18} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Block Dates'
                )}
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

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <CircleNotch size={24} className="animate-spin text-primary" />
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
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
            )}
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
                        <p className="text-xs text-muted-foreground capitalize">
                          {block.type?.toLowerCase().replace('_', ' ')}
                        </p>
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
                        onClick={() => handleRemoveBlock(block)}
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
