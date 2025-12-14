import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { adminPropertyApi, getImageUrl } from '@/services/api'
import { Pencil, Plus, Users, Bed, MapPin, House, Check, X, Trash, CircleNotch } from '@phosphor-icons/react'
import { toast } from 'sonner'

function PropertyManager() {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    type: 'VILLA',
    description: '',
    shortDescription: '',
    address: '',
    city: '',
    region: 'French Riviera',
    country: 'France',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    squareMeters: 150,
    pricePerNight: 250,
    cleaningFee: 150,
    securityDeposit: 500,
    minNights: 3,
    maxNights: 30,
    isActive: true,
    isFeatured: false
  })

  // Fetch properties from API
  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setIsLoading(true)
    try {
      const response = await adminPropertyApi.getAll()
      setProperties(response.data || [])
    } catch (error) {
      console.error('Failed to fetch properties:', error)
      toast.error('Failed to load properties. Make sure you are logged in as admin.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProperty = (property) => {
    setSelectedProperty(property)
    setFormData({
      name: property.name || '',
      tagline: property.tagline || '',
      type: property.type || 'VILLA',
      description: property.description || '',
      shortDescription: property.shortDescription || '',
      address: property.address || '',
      city: property.city || '',
      region: property.region || 'French Riviera',
      country: property.country || 'France',
      bedrooms: property.bedrooms || 3,
      bathrooms: property.bathrooms || 2,
      maxGuests: property.maxGuests || 6,
      squareMeters: property.squareMeters || 150,
      pricePerNight: property.pricePerNight || 250,
      cleaningFee: property.cleaningFee || 150,
      securityDeposit: property.securityDeposit || 500,
      minNights: property.minNights || 3,
      maxNights: property.maxNights || 30,
      isActive: property.isActive !== undefined ? property.isActive : true,
      isFeatured: property.isFeatured || false
    })
    setIsEditDialogOpen(true)
  }

  const handleAddProperty = () => {
    setSelectedProperty(null)
    setFormData({
      name: '',
      tagline: '',
      type: 'VILLA',
      description: '',
      shortDescription: '',
      address: '',
      city: '',
      region: 'French Riviera',
      country: 'France',
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      squareMeters: 150,
      pricePerNight: 250,
      cleaningFee: 150,
      securityDeposit: 500,
      minNights: 3,
      maxNights: 30,
      isActive: true,
      isFeatured: false
    })
    setIsAddDialogOpen(true)
  }

  const handleSaveProperty = async () => {
    if (!formData.name || !formData.city || !formData.pricePerNight) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSaving(true)
    try {
      const propertyData = {
        ...formData,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        maxGuests: parseInt(formData.maxGuests),
        squareMeters: parseInt(formData.squareMeters),
        pricePerNight: parseFloat(formData.pricePerNight),
        cleaningFee: parseFloat(formData.cleaningFee),
        securityDeposit: parseFloat(formData.securityDeposit),
        minNights: parseInt(formData.minNights),
        maxNights: parseInt(formData.maxNights)
      }

      if (selectedProperty) {
        // Update existing property
        const response = await adminPropertyApi.update(selectedProperty.id, propertyData)
        setProperties(current => 
          current.map(p => p.id === selectedProperty.id ? response.data : p)
        )
        toast.success('Property updated successfully')
      } else {
        // Create new property
        const response = await adminPropertyApi.create(propertyData)
        setProperties(current => [...current, response.data])
        toast.success('Property created successfully')
      }
      
      setIsEditDialogOpen(false)
      setIsAddDialogOpen(false)
      setSelectedProperty(null)
    } catch (error) {
      console.error('Failed to save property:', error)
      toast.error(error.message || 'Failed to save property')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteProperty = async (property) => {
    if (!confirm(`Are you sure you want to delete "${property.name}"? This will deactivate the property.`)) {
      return
    }

    try {
      await adminPropertyApi.delete(property.id)
      setProperties(current => current.filter(p => p.id !== property.id))
      toast.success('Property deleted successfully')
    } catch (error) {
      console.error('Failed to delete property:', error)
      toast.error(error.message || 'Failed to delete property')
    }
  }

  const handleToggleStatus = async (property) => {
    try {
      await adminPropertyApi.updateStatus(property.id, !property.isActive)
      setProperties(current =>
        current.map(p => p.id === property.id ? { ...p, isActive: !p.isActive } : p)
      )
      toast.success(`Property ${!property.isActive ? 'activated' : 'deactivated'}`)
    } catch (error) {
      console.error('Failed to update status:', error)
      toast.error('Failed to update property status')
    }
  }

  const getPropertyImage = (property) => {
    if (property.images && property.images.length > 0) {
      const primaryImage = property.images.find(img => img.isPrimary) || property.images[0]
      return getImageUrl(primaryImage.url)
    }
    return '/placeholder-property.jpg'
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <CircleNotch size={32} className="animate-spin text-primary" />
          <span className="ml-2">Loading properties...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Property Management</CardTitle>
            <CardDescription>Add, edit, and manage your rental properties</CardDescription>
          </div>
          <Button onClick={handleAddProperty}>
            <Plus size={18} className="mr-2" />
            Add Property
          </Button>
        </CardHeader>
      </Card>

      {properties.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <House size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Properties Yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first property to start managing bookings
            </p>
            <Button onClick={handleAddProperty}>
              <Plus size={18} className="mr-2" />
              Add Your First Property
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map(property => (
            <Card key={property.id} className={`relative ${!property.isActive ? 'opacity-60' : ''}`}>
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                {property.isFeatured && (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Featured
                  </Badge>
                )}
                {property.isActive ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    Inactive
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-4 bg-muted">
                  <img 
                    src={getPropertyImage(property)} 
                    alt={property.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-property.jpg'
                    }}
                  />
                </div>
                <CardTitle className="pr-24">{property.name}</CardTitle>
                <CardDescription>{property.city}, {property.region}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-muted-foreground" />
                    <span>{property.maxGuests} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed size={16} className="text-muted-foreground" />
                    <span>{property.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span>{property.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <House size={16} className="text-muted-foreground" />
                    <span>{property.bathrooms} bathrooms</span>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Nightly Rate</span>
                    <span className="text-lg font-semibold">€{property.pricePerNight}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cleaning Fee</span>
                    <span className="font-medium">€{property.cleaningFee || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Min Stay</span>
                    <span className="font-medium">{property.minNights || 3} nights</span>
                  </div>
                  {property._count && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Bookings</span>
                      <span className="font-medium">{property._count.bookings || 0}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => handleEditProperty(property)}
                  >
                    <Pencil size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleToggleStatus(property)}
                    title={property.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {property.isActive ? <X size={16} /> : <Check size={16} />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteProperty(property)}
                    title="Delete"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit/Add Property Dialog */}
      <Dialog open={isEditDialogOpen || isAddDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsEditDialogOpen(false)
          setIsAddDialogOpen(false)
          setSelectedProperty(null)
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProperty ? 'Edit Property' : 'Add New Property'}
            </DialogTitle>
            <DialogDescription>
              {selectedProperty 
                ? `Update details for ${selectedProperty.name}`
                : 'Fill in the details for your new property'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* Status Toggles */}
            <div className="flex gap-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <div>
                  <Label className="text-base">Active</Label>
                  <p className="text-xs text-muted-foreground">
                    {formData.isActive ? 'Visible and bookable' : 'Hidden from guests'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                />
                <div>
                  <Label className="text-base">Featured</Label>
                  <p className="text-xs text-muted-foreground">
                    Show on homepage
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid gap-4">
              <h3 className="font-semibold">Basic Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Property Name *</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Villa Rocsea"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VILLA">Villa</SelectItem>
                      <SelectItem value="APARTMENT">Apartment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input 
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                  placeholder="A stunning oceanfront retreat"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea 
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Brief description for property cards..."
                  rows={2}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea 
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed property description..."
                  rows={4}
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid gap-4">
              <h3 className="font-semibold">Location</h3>
              
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Promenade des Anglais"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City *</Label>
                  <Input 
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Nice"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="region">Region</Label>
                  <Input 
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                    placeholder="French Riviera"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="France"
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="grid gap-4">
              <h3 className="font-semibold">Property Details</h3>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input 
                    id="bedrooms"
                    type="number"
                    min="1"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input 
                    id="bathrooms"
                    type="number"
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxGuests">Max Guests</Label>
                  <Input 
                    id="maxGuests"
                    type="number"
                    min="1"
                    value={formData.maxGuests}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxGuests: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="squareMeters">Size (m²)</Label>
                  <Input 
                    id="squareMeters"
                    type="number"
                    min="1"
                    value={formData.squareMeters}
                    onChange={(e) => setFormData(prev => ({ ...prev, squareMeters: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid gap-4">
              <h3 className="font-semibold">Pricing</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pricePerNight">Nightly Rate (€) *</Label>
                  <Input 
                    id="pricePerNight"
                    type="number"
                    min="0"
                    value={formData.pricePerNight}
                    onChange={(e) => setFormData(prev => ({ ...prev, pricePerNight: e.target.value }))}
                    placeholder="250"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cleaningFee">Cleaning Fee (€)</Label>
                  <Input 
                    id="cleaningFee"
                    type="number"
                    min="0"
                    value={formData.cleaningFee}
                    onChange={(e) => setFormData(prev => ({ ...prev, cleaningFee: e.target.value }))}
                    placeholder="150"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="securityDeposit">Security Deposit (€)</Label>
                  <Input 
                    id="securityDeposit"
                    type="number"
                    min="0"
                    value={formData.securityDeposit}
                    onChange={(e) => setFormData(prev => ({ ...prev, securityDeposit: e.target.value }))}
                    placeholder="500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="minNights">Minimum Nights</Label>
                  <Input 
                    id="minNights"
                    type="number"
                    min="1"
                    value={formData.minNights}
                    onChange={(e) => setFormData(prev => ({ ...prev, minNights: e.target.value }))}
                    placeholder="3"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxNights">Maximum Nights</Label>
                  <Input 
                    id="maxNights"
                    type="number"
                    min="1"
                    value={formData.maxNights}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxNights: e.target.value }))}
                    placeholder="30"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditDialogOpen(false)
                setIsAddDialogOpen(false)
                setSelectedProperty(null)
              }}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProperty} disabled={isSaving}>
              {isSaving ? (
                <>
                  <CircleNotch size={18} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={18} className="mr-2" />
                  {selectedProperty ? 'Save Changes' : 'Create Property'}
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PropertyManager
