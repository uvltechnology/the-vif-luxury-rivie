import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BookingsManager from '@/components/admin/BookingsManager'
import AvailabilityCalendar from '@/components/admin/AvailabilityCalendar'
import PropertyManager from '@/components/admin/PropertyManager'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'
import GuestCommunications from '@/components/admin/GuestCommunications'
import ReportsExport from '@/components/admin/ReportsExport'
import EmailNotificationSettings from '@/components/admin/EmailNotificationSettings'
import { Lock, ChartLine, CalendarBlank, Bed, Chat, House, FileText, Envelope } from '@phosphor-icons/react'
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
              <p className="text-muted-foreground">Manage your luxury vacation rentals</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Site
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 flex-wrap h-auto">
            <TabsTrigger value="overview" className="gap-2">
              <ChartLine size={18} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <CalendarBlank size={18} />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="availability" className="gap-2">
              <Bed size={18} />
              Availability
            </TabsTrigger>
            <TabsTrigger value="properties" className="gap-2">
              <House size={18} />
              Properties
            </TabsTrigger>
            <TabsTrigger value="guests" className="gap-2">
              <Chat size={18} />
              Guests
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Envelope size={18} />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText size={18} />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsManager />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityCalendar />
          </TabsContent>

          <TabsContent value="properties">
            <PropertyManager />
          </TabsContent>

          <TabsContent value="guests">
            <GuestCommunications />
          </TabsContent>

          <TabsContent value="notifications">
            <EmailNotificationSettings />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsExport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin
