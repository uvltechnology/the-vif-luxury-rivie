import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BookingsManager from '@/components/admin/BookingsManager'
import AvailabilityCalendar from '@/components/admin/AvailabilityCalendar'
import PropertyManager from '@/components/admin/PropertyManager'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'
import GuestCommunications from '@/components/admin/GuestCommunications'
import ReportsExport from '@/components/admin/ReportsExport'
import EmailNotificationSettings from '@/components/admin/EmailNotificationSettings'
import { Lock, ChartLine, CalendarBlank, Bed, Chat, House, FileText, Envelope, BellRinging, Eye, EyeSlash, SignOut, List } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import CheckInReminders from '@/components/admin/CheckInReminders'
import { toast } from 'sonner'
import '../styles/admin-mobile.css'

function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const tabsContainerRef = useRef(null)

  useEffect(() => {
    // Check if user is already logged in via localStorage token
    const token = localStorage.getItem('vif_auth_token')
    if (token) {
      setIsAuthenticated(true)
    }
    setIsChecking(false)
  }, [])

  // Auto-scroll active tab into view
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeTabElement = tabsContainerRef.current.querySelector(`[data-tab="${activeTab}"]`)
      if (activeTabElement) {
        activeTabElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [activeTab])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok && data.data?.accessToken) {
        localStorage.setItem('vif_auth_token', data.data.accessToken)
        localStorage.setItem('vif_auth_user', JSON.stringify(data.data.user))
        setIsAuthenticated(true)
        toast.success('Logged in successfully')
      } else {
        setError(data.message || 'Invalid email or password. Please try again.')
      }
    } catch (err) {
      setError('Login failed. Make sure the backend is running.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('vif_auth_token')
    localStorage.removeItem('vif_auth_user')
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
    toast.success('Logged out successfully')
  }

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
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock size={32} className="text-primary" />
            </div>
            <CardTitle className="text-2xl font-heading">Admin Login</CardTitle>
            <CardDescription>
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@thevif.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="text-center">
                <Button 
                  type="button" 
                  variant="link" 
                  className="text-sm text-muted-foreground"
                  onClick={() => navigate('/')}
                >
                  ← Return to Home
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Define tabs and helper functions
  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartLine },
    { id: 'bookings', label: 'Bookings', icon: CalendarBlank },
    { id: 'availability', label: 'Availability', icon: Bed },
    { id: 'properties', label: 'Properties', icon: House },
    { id: 'guests', label: 'Guests', icon: Chat },
    { id: 'reminders', label: 'Reminders', icon: BellRinging },
    { id: 'notifications', label: 'Notifications', icon: Envelope },
    { id: 'reports', label: 'Reports', icon: FileText },
  ]

  const getCurrentTabLabel = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab)
    return currentTab ? currentTab.label : 'Dashboard'
  }

  // Swipe gesture handling
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab)
    
    if (isLeftSwipe && currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id)
    }
    if (isRightSwipe && currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-Responsive Header */}
      <div className="border-b bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Mobile Header */}
          <div className="lg:hidden py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2"
                >
                  <List size={20} />
                </Button>
                <div>
                  <h1 className="text-lg font-semibold">{getCurrentTabLabel()}</h1>
                  <p className="text-xs text-muted-foreground">VIF Admin</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
              >
                <SignOut size={18} />
              </Button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-semibold mb-1">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your luxury vacation rentals</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Back to Site
                </Button>
                <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <SignOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-72 bg-card border-r shadow-lg">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Navigation</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2"
                >
                  <SignOut size={16} className="rotate-180" />
                </Button>
              </div>
            </div>
            <div className="p-2 space-y-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <IconComponent size={18} />
                    {tab.label}
                  </button>
                )
              })}
              <div className="pt-4 mt-4 border-t">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    navigate('/')
                    setMobileMenuOpen(false)
                  }}
                >
                  <House size={18} />
                  Back to Site
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 py-4 lg:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Tabs */}
          <TabsList className="hidden lg:flex mb-8 flex-wrap h-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
                  <IconComponent size={18} />
                  {tab.label}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* Mobile Horizontal Scrollable Tabs */}
          <div className="lg:hidden mb-6">
            <div
              ref={tabsContainerRef}
              className="flex overflow-x-auto scrollbar-hide gap-2 pb-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              }}
            >
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    data-tab={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Contents with Swipe Support */}
          <div 
            className="lg:hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <TabsContent value="overview" className="mt-0">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="bookings" className="mt-0">
              <BookingsManager />
            </TabsContent>

            <TabsContent value="availability" className="mt-0">
              <AvailabilityCalendar />
            </TabsContent>

            <TabsContent value="properties" className="mt-0">
              <PropertyManager />
            </TabsContent>

            <TabsContent value="guests" className="mt-0">
              <GuestCommunications />
            </TabsContent>

            <TabsContent value="reminders" className="mt-0">
              <CheckInReminders />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <EmailNotificationSettings />
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <ReportsExport />
            </TabsContent>
          </div>

          {/* Desktop Tab Contents (No Swipe) */}
          <div className="hidden lg:block">
            <TabsContent value="overview" className="mt-0">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="bookings" className="mt-0">
              <BookingsManager />
            </TabsContent>

            <TabsContent value="availability" className="mt-0">
              <AvailabilityCalendar />
            </TabsContent>

            <TabsContent value="properties" className="mt-0">
              <PropertyManager />
            </TabsContent>

            <TabsContent value="guests" className="mt-0">
              <GuestCommunications />
            </TabsContent>

            <TabsContent value="reminders" className="mt-0">
              <CheckInReminders />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <EmailNotificationSettings />
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <ReportsExport />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin
