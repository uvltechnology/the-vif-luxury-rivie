import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  getReminderSettings, 
  saveReminderSettings,
  getUpcomingCheckIns,
  sendCheckInReminder,
  getReminderLogs,
  clearReminderLogs,
  checkAndSendAutomaticReminders,
  resetSentRemindersForBooking
} from '@/lib/bookingReminders'
import { 
  BellRinging, 
  Calendar, 
  Check, 
  X, 
  Trash, 
  Clock, 
  PaperPlaneRight,
  Play,
  User,
  MapPin,
  ArrowsClockwise,
  Info
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { format, differenceInDays } from 'date-fns'

function CheckInReminders() {
  const [settings, setSettings] = useState(null)
  const [upcomingCheckIns, setUpcomingCheckIns] = useState([])
  const [reminderLogs, setReminderLogs] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(true)
  const [isLoadingLogs, setIsLoadingLogs] = useState(true)
  const [isSendingReminder, setIsSendingReminder] = useState(null)
  const [isRunningAutoCheck, setIsRunningAutoCheck] = useState(false)
  const [selectedLog, setSelectedLog] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    await Promise.all([
      loadSettings(),
      loadUpcomingCheckIns(),
      loadReminderLogs()
    ])
  }

  const loadSettings = async () => {
    const reminderSettings = await getReminderSettings()
    setSettings(reminderSettings)
  }

  const loadUpcomingCheckIns = async () => {
    setIsLoadingUpcoming(true)
    const upcoming = await getUpcomingCheckIns()
    setUpcomingCheckIns(upcoming)
    setIsLoadingUpcoming(false)
  }

  const loadReminderLogs = async () => {
    setIsLoadingLogs(true)
    const logs = await getReminderLogs()
    setReminderLogs(logs)
    setIsLoadingLogs(false)
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      await saveReminderSettings(settings)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSendManualReminder = async (booking) => {
    setIsSendingReminder(booking.id)
    try {
      await sendCheckInReminder(booking, booking.daysUntilCheckIn)
      await loadReminderLogs()
    } finally {
      setIsSendingReminder(null)
    }
  }

  const handleRunAutoCheck = async () => {
    setIsRunningAutoCheck(true)
    try {
      const result = await checkAndSendAutomaticReminders()
      
      if (result.skipped) {
        toast.info('Automatic reminders are disabled')
      } else {
        toast.success(`Sent ${result.sent} reminder${result.sent !== 1 ? 's' : ''} out of ${result.totalUpcoming} upcoming check-ins`)
      }
      
      await Promise.all([
        loadUpcomingCheckIns(),
        loadReminderLogs(),
        loadSettings()
      ])
    } finally {
      setIsRunningAutoCheck(false)
    }
  }

  const handleResetBookingReminders = async (bookingId) => {
    if (window.confirm('Reset reminder history for this booking? This will allow reminders to be sent again.')) {
      await resetSentRemindersForBooking(bookingId)
      await loadUpcomingCheckIns()
    }
  }

  const handleClearLogs = async () => {
    if (window.confirm('Are you sure you want to clear all reminder logs?')) {
      await clearReminderLogs()
      setReminderLogs([])
      toast.success('Reminder logs cleared')
    }
  }

  const upcomingStats = useMemo(() => {
    return {
      today: upcomingCheckIns.filter(b => b.daysUntilCheckIn === 0).length,
      tomorrow: upcomingCheckIns.filter(b => b.daysUntilCheckIn === 1).length,
      thisWeek: upcomingCheckIns.filter(b => b.daysUntilCheckIn >= 2 && b.daysUntilCheckIn <= 7).length,
      later: upcomingCheckIns.filter(b => b.daysUntilCheckIn > 7).length
    }
  }, [upcomingCheckIns])

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BellRinging size={20} className="text-primary" />
              </div>
              <div>
                <CardTitle>Check-In Reminders</CardTitle>
                <CardDescription>Automated email reminders for upcoming guest arrivals</CardDescription>
              </div>
            </div>
            <Button 
              onClick={handleRunAutoCheck} 
              disabled={isRunningAutoCheck || !settings.enabled}
              variant="default"
            >
              {isRunningAutoCheck ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Checking...
                </>
              ) : (
                <>
                  <Play size={16} className="mr-2" />
                  Run Auto-Check
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enabled" className="text-base">Enable Check-In Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Send automated reminder emails to guests before their check-in date
              </p>
            </div>
            <Switch
              id="enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enabled: checked }))}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base">Reminder Schedule</Label>
            <p className="text-sm text-muted-foreground -mt-2">
              Choose when to automatically send reminders before check-in
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <Label htmlFor="send7days" className="font-normal">7 Days Before Check-In</Label>
                  <p className="text-xs text-muted-foreground">
                    Send initial reminder one week before arrival
                  </p>
                </div>
                <Switch
                  id="send7days"
                  checked={settings.sendAt7Days}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sendAt7Days: checked }))}
                  disabled={!settings.enabled}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <Label htmlFor="send3days" className="font-normal">3 Days Before Check-In</Label>
                  <p className="text-xs text-muted-foreground">
                    Send reminder with pre-arrival details
                  </p>
                </div>
                <Switch
                  id="send3days"
                  checked={settings.sendAt3Days}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sendAt3Days: checked }))}
                  disabled={!settings.enabled}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <Label htmlFor="send1day" className="font-normal">1 Day Before Check-In</Label>
                  <p className="text-xs text-muted-foreground">
                    Send final reminder the day before arrival
                  </p>
                </div>
                <Switch
                  id="send1day"
                  checked={settings.sendAt1Day}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sendAt1Day: checked }))}
                  disabled={!settings.enabled}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <Label htmlFor="sendToday" className="font-normal">On Check-In Day</Label>
                  <p className="text-xs text-muted-foreground">
                    Send welcome reminder on the day of check-in
                  </p>
                </div>
                <Switch
                  id="sendToday"
                  checked={settings.sendOnCheckInDay}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sendOnCheckInDay: checked }))}
                  disabled={!settings.enabled}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-accent mt-0.5 flex-shrink-0" />
              <div className="space-y-0.5">
                <Label htmlFor="autoSend" className="font-normal">Automatic Sending</Label>
                <p className="text-xs text-muted-foreground">
                  {settings.autoSendEnabled 
                    ? 'Reminders will be sent automatically when you click "Run Auto-Check"' 
                    : 'Manual approval required - you can send reminders individually from the list below'}
                </p>
                {settings.lastAutoCheckTime && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Last checked: {format(new Date(settings.lastAutoCheckTime), 'MMM d, yyyy - h:mm a')}
                  </p>
                )}
              </div>
            </div>
            <Switch
              id="autoSend"
              checked={settings.autoSendEnabled}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoSendEnabled: checked }))}
              disabled={!settings.enabled}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Check-Ins</CardTitle>
              <CardDescription>Guests arriving in the next 30 days</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Calendar size={14} />
                {upcomingCheckIns.length} upcoming
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingUpcoming ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : upcomingCheckIns.length === 0 ? (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-1">No upcoming check-ins</p>
              <p className="text-sm text-muted-foreground">
                Check-ins will appear here when bookings are confirmed
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="p-3 rounded-lg border bg-card text-center">
                  <p className="text-2xl font-bold text-primary">{upcomingStats.today}</p>
                  <p className="text-xs text-muted-foreground mt-1">Today</p>
                </div>
                <div className="p-3 rounded-lg border bg-card text-center">
                  <p className="text-2xl font-bold text-secondary">{upcomingStats.tomorrow}</p>
                  <p className="text-xs text-muted-foreground mt-1">Tomorrow</p>
                </div>
                <div className="p-3 rounded-lg border bg-card text-center">
                  <p className="text-2xl font-bold text-accent">{upcomingStats.thisWeek}</p>
                  <p className="text-xs text-muted-foreground mt-1">This Week</p>
                </div>
                <div className="p-3 rounded-lg border bg-card text-center">
                  <p className="text-2xl font-bold text-muted-foreground">{upcomingStats.later}</p>
                  <p className="text-xs text-muted-foreground mt-1">Later</p>
                </div>
              </div>

              <div className="space-y-3">
                {upcomingCheckIns.map((booking) => {
                  const daysText = booking.daysUntilCheckIn === 0 
                    ? 'Today' 
                    : booking.daysUntilCheckIn === 1 
                    ? 'Tomorrow' 
                    : `In ${booking.daysUntilCheckIn} days`
                  
                  const urgency = booking.daysUntilCheckIn <= 1 
                    ? 'urgent' 
                    : booking.daysUntilCheckIn <= 3 
                    ? 'soon' 
                    : booking.daysUntilCheckIn <= 7 
                    ? 'upcoming' 
                    : 'future'

                  return (
                    <div 
                      key={booking.id}
                      className={`p-4 rounded-lg border transition-all ${
                        urgency === 'urgent' 
                          ? 'bg-destructive/5 border-destructive/30' 
                          : urgency === 'soon'
                          ? 'bg-secondary/5 border-secondary/30'
                          : 'bg-card border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={urgency === 'urgent' ? 'destructive' : urgency === 'soon' ? 'default' : 'outline'}>
                              {daysText}
                            </Badge>
                            <Badge variant="secondary">{booking.propertyName}</Badge>
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-sm">
                              <User size={14} className="text-muted-foreground flex-shrink-0" />
                              <span className="font-medium">{booking.guestName}</span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">{booking.guests} guest{booking.guests !== 1 ? 's' : ''}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar size={14} className="flex-shrink-0" />
                              <span>
                                {format(new Date(booking.checkIn), 'MMM d, yyyy')} - {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin size={14} className="flex-shrink-0" />
                              <span className="truncate">{booking.guestEmail}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSendManualReminder(booking)}
                            disabled={isSendingReminder === booking.id || !settings.enabled}
                          >
                            {isSendingReminder === booking.id ? (
                              <>
                                <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <PaperPlaneRight size={14} className="mr-2" />
                                Send Reminder
                              </>
                            )}
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResetBookingReminders(booking.id)}
                          >
                            <ArrowsClockwise size={14} className="mr-2" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Reminder History</CardTitle>
              <CardDescription>Recent check-in reminders sent to guests</CardDescription>
            </div>
            {reminderLogs.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearLogs}>
                <Trash size={16} className="mr-2" />
                Clear History
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingLogs ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : reminderLogs.length === 0 ? (
            <div className="text-center py-12">
              <BellRinging size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-1">No reminders sent yet</p>
              <p className="text-sm text-muted-foreground">
                Reminder logs will appear here when emails are sent
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {reminderLogs.slice(0, 30).map((log, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
                  onClick={() => setSelectedLog(log)}
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
                        <h4 className="font-medium text-sm">{log.subject || 'Check-in reminder'}</h4>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <p className="text-xs text-muted-foreground">
                            To: {log.guestEmail || 'Unknown'}
                          </p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">
                            {log.daysUntilCheckIn === 0 ? 'Same day' : log.daysUntilCheckIn === 1 ? '1 day before' : `${log.daysUntilCheckIn} days before`}
                          </p>
                          {log.checkInDate && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <p className="text-xs text-muted-foreground">
                                Check-in: {format(new Date(log.checkInDate), 'MMM d, yyyy')}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <Badge variant={log.status === 'sent' ? 'default' : 'destructive'} className="capitalize">
                        {log.status}
                      </Badge>
                    </div>
                    
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

      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reminder Details</DialogTitle>
            <DialogDescription>
              {selectedLog?.subject}
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Recipient</Label>
                  <p className="text-sm font-medium">{selectedLog.guestEmail}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <p className="text-sm font-medium capitalize">{selectedLog.status}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Check-In Date</Label>
                  <p className="text-sm font-medium">
                    {selectedLog.checkInDate ? format(new Date(selectedLog.checkInDate), 'MMM d, yyyy') : 'N/A'}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Days Before Check-In</Label>
                  <p className="text-sm font-medium">
                    {selectedLog.daysUntilCheckIn === 0 ? 'Same day' : `${selectedLog.daysUntilCheckIn} days`}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs text-muted-foreground">Sent At</Label>
                  <p className="text-sm font-medium">{format(new Date(selectedLog.sentAt), 'MMMM d, yyyy - h:mm a')}</p>
                </div>
              </div>

              {selectedLog.body && (
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Email Body</Label>
                  <div className="bg-muted/50 p-4 rounded-lg text-sm whitespace-pre-wrap max-h-96 overflow-y-auto border">
                    {selectedLog.body}
                  </div>
                </div>
              )}

              {selectedLog.error && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <Label className="text-xs text-destructive mb-1 block">Error</Label>
                  <p className="text-sm text-destructive">{selectedLog.error}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CheckInReminders
