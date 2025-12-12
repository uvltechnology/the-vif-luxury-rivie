import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  getEmailSettings, 
  saveEmailSettings, 
  getEmailNotificationLogs,
  clearEmailNotificationLogs 
} from '@/lib/emailNotifications'
import { Envelope, Check, X, Trash, Clock } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { format } from 'date-fns'

function EmailNotificationSettings() {
  const [settings, setSettings] = useState(null)
  const [logs, setLogs] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingLogs, setIsLoadingLogs] = useState(true)

  useEffect(() => {
    loadSettings()
    loadLogs()
  }, [])

  const loadSettings = async () => {
    const emailSettings = await getEmailSettings()
    setSettings(emailSettings)
  }

  const loadLogs = async () => {
    setIsLoadingLogs(true)
    const emailLogs = await getEmailNotificationLogs()
    setLogs(emailLogs)
    setIsLoadingLogs(false)
  }

  const handleSave = async () => {
    if (!settings.recipientEmail && settings.enabled) {
      toast.error('Please enter a recipient email address')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (settings.recipientEmail && !emailRegex.test(settings.recipientEmail)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSaving(true)
    try {
      await saveEmailSettings(settings)
    } finally {
      setIsSaving(false)
    }
  }

  const handleClearLogs = async () => {
    if (window.confirm('Are you sure you want to clear all email notification logs?')) {
      await clearEmailNotificationLogs()
      setLogs([])
      toast.success('Email logs cleared')
    }
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Envelope size={20} className="text-primary" />
            </div>
            <div>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure automated email alerts for new bookings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enabled" className="text-base">Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive automated emails when bookings are created or updated
              </p>
            </div>
            <Switch
              id="enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enabled: checked }))}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="recipientEmail">Recipient Email Address *</Label>
            <Input
              id="recipientEmail"
              type="email"
              placeholder="your@email.com"
              value={settings.recipientEmail}
              onChange={(e) => setSettings(prev => ({ ...prev, recipientEmail: e.target.value }))}
              disabled={!settings.enabled}
            />
            <p className="text-sm text-muted-foreground">
              All booking notifications will be sent to this email address
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base">Notification Types</Label>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifyOnNew" className="font-normal">New Bookings</Label>
                <p className="text-sm text-muted-foreground">
                  Send email when a new booking is created
                </p>
              </div>
              <Switch
                id="notifyOnNew"
                checked={settings.notifyOnNew}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifyOnNew: checked }))}
                disabled={!settings.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifyOnConfirmed" className="font-normal">Confirmed Bookings</Label>
                <p className="text-sm text-muted-foreground">
                  Send email when a booking is confirmed
                </p>
              </div>
              <Switch
                id="notifyOnConfirmed"
                checked={settings.notifyOnConfirmed}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifyOnConfirmed: checked }))}
                disabled={!settings.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifyOnCancelled" className="font-normal">Cancelled Bookings</Label>
                <p className="text-sm text-muted-foreground">
                  Send email when a booking is cancelled
                </p>
              </div>
              <Switch
                id="notifyOnCancelled"
                checked={settings.notifyOnCancelled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifyOnCancelled: checked }))}
                disabled={!settings.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifyOnUpdated" className="font-normal">Updated Bookings</Label>
                <p className="text-sm text-muted-foreground">
                  Send email when booking details are modified
                </p>
              </div>
              <Switch
                id="notifyOnUpdated"
                checked={settings.notifyOnUpdated}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifyOnUpdated: checked }))}
                disabled={!settings.enabled}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Email Notification History</CardTitle>
              <CardDescription>Recent email notifications sent from the system</CardDescription>
            </div>
            {logs.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearLogs}>
                <Trash size={16} className="mr-2" />
                Clear Logs
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingLogs ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12">
              <Envelope size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-1">No email notifications sent yet</p>
              <p className="text-sm text-muted-foreground">
                Email logs will appear here when notifications are sent
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.slice(0, 20).map((log, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    log.status === 'sent' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {log.status === 'sent' ? (
                      <Check size={16} weight="bold" />
                    ) : (
                      <X size={16} weight="bold" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{log.subject || `${log.type} booking notification`}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">
                            To: {log.recipient || 'Unknown'}
                          </p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">
                            Booking: {log.bookingId}
                          </p>
                        </div>
                      </div>
                      <Badge variant={log.status === 'sent' ? 'default' : 'destructive'} className="capitalize">
                        {log.status}
                      </Badge>
                    </div>
                    
                    {log.body && (
                      <div className="bg-muted/50 p-3 rounded text-xs font-mono whitespace-pre-wrap max-h-32 overflow-y-auto mb-2">
                        {log.body.substring(0, 200)}{log.body.length > 200 ? '...' : ''}
                      </div>
                    )}
                    
                    {log.error && (
                      <p className="text-xs text-destructive mb-2">Error: {log.error}</p>
                    )}
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      <span>{format(new Date(log.sentAt), 'MMM d, yyyy - h:mm a')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default EmailNotificationSettings
