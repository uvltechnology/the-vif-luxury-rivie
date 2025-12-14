import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BookingsManager from '@/components/admin/BookingsManager'
import AvailabilityCalendar from '@/components/admin/AvailabilityCalendar'
import { Lock } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    // Check if user is already logged in via localStorage token
    const token = localStorage.getItem('vif_auth_token')
    if (token) {
      setIsAuthenticated(true)
    }
    setIsChecking(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
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
        toast.error(data.message || 'Invalid credentials')
      }
    } catch (error) {
      toast.error('Login failed. Make sure the backend is running.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('vif_auth_token')
    localStorage.removeItem('vif_auth_user')
    setIsAuthenticated(false)
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-6">
          <Lock size={64} className="mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-heading font-semibold mb-4">Admin Login</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to access the admin dashboard.
          </p>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thevif.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <Button variant="ghost" className="mt-4" onClick={() => navigate('/')}>
            Return to Home
          </Button>
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
            <Button variant="outline" onClick={handleLogout}>
              Logout
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
