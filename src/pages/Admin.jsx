import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BookingsManager from '@/components/admin/BookingsManager'
import AvailabilityCalendar from '@/components/admin/AvailabilityCalendar'
import { Lock } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await window.spark.user()
        if (user?.isOwner) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsChecking(false)
      }
    }
    
    checkAuth()
  }, [])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-6">
          <Lock size={64} className="mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-heading font-semibold mb-4">Admin Access Required</h1>
          <p className="text-muted-foreground mb-8">
            This area is restricted to property owners only. Please sign in with an authorized account.
          </p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-semibold mb-1">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your property bookings and availability</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Site
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <BookingsManager />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin
