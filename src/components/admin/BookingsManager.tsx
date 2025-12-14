import { useState, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { properties } from '@/data/properties'
import { format } from 'date-fns'
import { Plus, User, Bed, CalendarBlank, MapPin, Envelope, Phone, Trash, Eye } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface Booking {
  id: string
  propertyId: string
  propertyName: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  guests: number
  status: 'confirmed' | 'pending' | 'cancelled'
  totalPrice: number
  notes?: string
  createdAt: string
}

function BookingsManager() {
  const [bookings, setBookings] = useLocalStorage<Booking[]>('admin-bookings', [])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [formData, setFormData] = useState({
    propertyId: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    status: 'confirmed' as const,
    notes: ''
  })

  const filteredBookings = useMemo(() => {
    let filtered = bookings || []

    if (filterStatus !== 'all') {
      filtered = filtered.filter(b => b.status === filterStatus)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(b => 
        b.guestName.toLowerCase().includes(query) ||
        b.guestEmail.toLowerCase().includes(query) ||
        b.propertyName.toLowerCase().includes(query)
      )
    }

    return filtered.sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
  }, [bookings, filterStatus, searchQuery])

  const stats = useMemo(() => {
    const allBookings = bookings || []
    return {
      total: allBookings.length,
      confirmed: allBookings.filter(b => b.status === 'confirmed').length,
      pending: allBookings.filter(b => b.status === 'pending').length,
      cancelled: allBookings.filter(b => b.status === 'cancelled').length
    }
  }, [bookings])

  const handleAddBooking = () => {
    if (!formData.propertyId || !formData.guestName || !formData.guestEmail || !formData.checkIn || !formData.checkOut) {
      toast.error('Please fill in all required fields')
      return
    }

    const property = properties.find(p => p.id === formData.propertyId)
    if (!property) return

    const checkInDate = new Date(formData.checkIn)
    const checkOutDate = new Date(formData.checkOut)
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = nights * property.price

    const newBooking: Booking = {
      id: `BK-${Date.now()}`,
      propertyId: formData.propertyId,
      propertyName: property.name,
      guestName: formData.guestName,
      guestEmail: formData.guestEmail,
      guestPhone: formData.guestPhone,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      status: formData.status,
      totalPrice,
      notes: formData.notes,
      createdAt: new Date().toISOString()
    }

    setBookings(current => [...(current || []), newBooking])
    
    setFormData({
      propertyId: '',
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      checkIn: '',
      checkOut: '',
      guests: 2,
      status: 'confirmed',
      notes: ''
    })
    
    setIsAddDialogOpen(false)
    toast.success('Booking added successfully')
  }

  const handleDeleteBooking = (id: string) => {
    setBookings(current => (current || []).filter(b => b.id !== id))
    toast.success('Booking deleted')
  }

  const handleUpdateStatus = (id: string, status: Booking['status']) => {
    setBookings(current => 
      (current || []).map(b => b.id === id ? { ...b, status } : b)
    )
    toast.success('Booking status updated')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      case 'cancelled': return 'bg-red-100 text-red-800 hover:bg-red-100'
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Bookings</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Confirmed</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.confirmed}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Cancelled</CardDescription>
            <CardTitle className="text-3xl text-red-600">{stats.cancelled}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>Manage guest reservations across all properties</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={20} className="mr-2" />
                  Add Booking
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Booking</DialogTitle>
                  <DialogDescription>Create a new reservation for a guest</DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="property">Property *</Label>
                    <Select value={formData.propertyId} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a property" />
                      </SelectTrigger>
                      <SelectContent>
                        {properties.map(property => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.name} - €{property.price}/night
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="guestName">Guest Name *</Label>
                      <Input 
                        id="guestName"
                        value={formData.guestName}
                        onChange={(e) => setFormData(prev => ({ ...prev, guestName: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="guestEmail">Email *</Label>
                      <Input 
                        id="guestEmail"
                        type="email"
                        value={formData.guestEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, guestEmail: e.target.value }))}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="guestPhone">Phone</Label>
                      <Input 
                        id="guestPhone"
                        type="tel"
                        value={formData.guestPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, guestPhone: e.target.value }))}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input 
                        id="guests"
                        type="number"
                        min="1"
                        value={formData.guests}
                        onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="checkIn">Check-in Date *</Label>
                      <Input 
                        id="checkIn"
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="checkOut">Check-out Date *</Label>
                      <Input 
                        id="checkOut"
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea 
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Special requests, dietary requirements, etc."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddBooking}>
                    Create Booking
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input 
                placeholder="Search by guest name, email, or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <Bed size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-1">No bookings found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || filterStatus !== 'all' 
                    ? 'Try adjusting your filters' 
                    : 'Add your first booking to get started'}
                </p>
              </div>
            ) : (
              filteredBookings.map(booking => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{booking.guestName}</h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Bed size={18} className="text-muted-foreground" />
                            <span>{booking.propertyName}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarBlank size={18} className="text-muted-foreground" />
                            <span>
                              {format(new Date(booking.checkIn), 'MMM d')} - {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <User size={18} className="text-muted-foreground" />
                            <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            €{booking.totalPrice.toLocaleString()}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Envelope size={18} className="text-muted-foreground" />
                            <span>{booking.guestEmail}</span>
                          </div>
                          
                          {booking.guestPhone && (
                            <div className="flex items-center gap-2">
                              <Phone size={18} className="text-muted-foreground" />
                              <span>{booking.guestPhone}</span>
                            </div>
                          )}
                        </div>

                        {booking.notes && (
                          <div className="bg-muted p-3 rounded-md text-sm">
                            <p className="font-medium mb-1">Notes:</p>
                            <p className="text-muted-foreground">{booking.notes}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Select 
                          value={booking.status} 
                          onValueChange={(value: any) => handleUpdateStatus(booking.id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteBooking(booking.id)}
                        >
                          <Trash size={20} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingsManager
