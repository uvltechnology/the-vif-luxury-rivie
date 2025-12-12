import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { properties } from '@/data/properties'
import { Pencil, Users, Bed, MapPin, CurrencyEur, House, Check, X } from '@phosphor-icons/react'
import { toast } from 'sonner'

function PropertyManager() {
  const [propertySettings, setPropertySettings] = useKV('admin-property-settings', {})
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    price: '',
    minStay: '',
    maxGuests: '',
    description: '',
    isActive: true,
    cleaningFee: '',
    securityDeposit: ''
  })

  const handleEditProperty = (property) => {
    const settings = propertySettings[property.id] || {}
    setSelectedProperty(property)
    setFormData({
      price: settings.price || property.price,
      minStay: settings.minStay || 3,
      maxGuests: settings.maxGuests || property.guests,
      description: settings.description || property.description,
      isActive: settings.isActive !== undefined ? settings.isActive : true,
      cleaningFee: settings.cleaningFee || 150,
      securityDeposit: settings.securityDeposit || property.deposit || 500
    })
    setIsEditDialogOpen(true)
  }

  const handleSaveProperty = () => {
    if (!selectedProperty) return

    const newSettings = {
      ...propertySettings,
      [selectedProperty.id]: {
        price: parseInt(formData.price),
        minStay: parseInt(formData.minStay),
        maxGuests: parseInt(formData.maxGuests),
        description: formData.description,
        isActive: formData.isActive,
        cleaningFee: parseInt(formData.cleaningFee),
        securityDeposit: parseInt(formData.securityDeposit),
        updatedAt: new Date().toISOString()
      }
    }

    setPropertySettings(newSettings)
    setIsEditDialogOpen(false)
    setSelectedProperty(null)
    toast.success('Property settings updated')
  }

  const getPropertySettings = (propertyId) => {
    return propertySettings[propertyId] || {}
  }

  const isPropertyActive = (propertyId) => {
    const settings = propertySettings[propertyId]
    return settings?.isActive !== undefined ? settings.isActive : true
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Management</CardTitle>
          <CardDescription>Update pricing, availability, and property details</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map(property => {
          const settings = getPropertySettings(property.id)
          const isActive = isPropertyActive(property.id)
          const currentPrice = settings.price || property.price

          return (
            <Card key={property.id} className={`relative ${!isActive ? 'opacity-60' : ''}`}>
              <div className="absolute top-4 right-4">
                {isActive ? (
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
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                  <img 
                    src={property.images[0]} 
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="pr-20">{property.name}</CardTitle>
                <CardDescription>{property.location}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-muted-foreground" />
                    <span>{settings.maxGuests || property.guests} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed size={16} className="text-muted-foreground" />
                    <span>{property.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span>{property.location.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <House size={16} className="text-muted-foreground" />
                    <span>{property.bathrooms} bathrooms</span>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Nightly Rate</span>
                    <span className="text-lg font-semibold">€{currentPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cleaning Fee</span>
                    <span className="font-medium">€{settings.cleaningFee || 150}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Security Deposit</span>
                    <span className="font-medium">€{settings.securityDeposit || property.deposit || 500}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Min Stay</span>
                    <span className="font-medium">{settings.minStay || 3} nights</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleEditProperty(property)}
                >
                  <Pencil size={16} className="mr-2" />
                  Edit Settings
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property Settings</DialogTitle>
            <DialogDescription>
              {selectedProperty?.name} - Update pricing and availability
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-0.5">
                <Label className="text-base">Property Status</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.isActive ? 'Visible and bookable' : 'Hidden from guests'}
                </p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Nightly Rate (€)</Label>
                <Input 
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="250"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="minStay">Minimum Stay (nights)</Label>
                <Input 
                  id="minStay"
                  type="number"
                  min="1"
                  value={formData.minStay}
                  onChange={(e) => setFormData(prev => ({ ...prev, minStay: e.target.value }))}
                  placeholder="3"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cleaningFee">Cleaning Fee (€)</Label>
                <Input 
                  id="cleaningFee"
                  type="number"
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
                  value={formData.securityDeposit}
                  onChange={(e) => setFormData(prev => ({ ...prev, securityDeposit: e.target.value }))}
                  placeholder="500"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maxGuests">Maximum Guests</Label>
              <Input 
                id="maxGuests"
                type="number"
                min="1"
                value={formData.maxGuests}
                onChange={(e) => setFormData(prev => ({ ...prev, maxGuests: e.target.value }))}
                placeholder="8"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Property Description</Label>
              <Textarea 
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Updated property description..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                This will override the default description on the property page
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProperty}>
              <Check size={18} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PropertyManager
