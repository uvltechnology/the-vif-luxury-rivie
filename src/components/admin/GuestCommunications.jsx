import { useState, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import { Envelope, EnvelopeOpen, PaperPlaneRight, User, Clock, Trash, Check, X } from '@phosphor-icons/react'
import { toast } from 'sonner'

function GuestCommunications() {
  const [messages, setMessages] = useLocalStorage('admin-messages', [])
  const [bookings] = useLocalStorage('admin-bookings', [])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [replyText, setReplyText] = useState('')

  const filteredMessages = useMemo(() => {
    let filtered = messages || []

    if (filterStatus !== 'all') {
      filtered = filtered.filter(m => m.status === filterStatus)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(m => 
        m.guestName.toLowerCase().includes(query) ||
        m.guestEmail.toLowerCase().includes(query) ||
        m.subject.toLowerCase().includes(query)
      )
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [messages, filterStatus, searchQuery])

  const stats = useMemo(() => {
    const allMessages = messages || []
    return {
      total: allMessages.length,
      unread: allMessages.filter(m => m.status === 'unread').length,
      replied: allMessages.filter(m => m.status === 'replied').length,
      archived: allMessages.filter(m => m.status === 'archived').length
    }
  }, [messages])

  const handleViewMessage = (message) => {
    setSelectedMessage(message)
    setReplyText('')
    setIsViewDialogOpen(true)
    
    if (message.status === 'unread') {
      handleMarkAsRead(message.id)
    }
  }

  const handleMarkAsRead = (id) => {
    setMessages(current => 
      (current || []).map(m => m.id === id ? { ...m, status: 'read' } : m)
    )
  }

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return

    const updatedMessage = {
      ...selectedMessage,
      status: 'replied',
      replies: [
        ...(selectedMessage.replies || []),
        {
          id: `RPL-${Date.now()}`,
          text: replyText,
          sentAt: new Date().toISOString(),
          sentBy: 'admin'
        }
      ]
    }

    setMessages(current => 
      (current || []).map(m => m.id === selectedMessage.id ? updatedMessage : m)
    )

    setSelectedMessage(updatedMessage)
    setReplyText('')
    toast.success('Reply sent successfully')
  }

  const handleArchiveMessage = (id) => {
    setMessages(current => 
      (current || []).map(m => m.id === id ? { ...m, status: 'archived' } : m)
    )
    setIsViewDialogOpen(false)
    toast.success('Message archived')
  }

  const handleDeleteMessage = (id) => {
    setMessages(current => (current || []).filter(m => m.id !== id))
    setIsViewDialogOpen(false)
    toast.success('Message deleted')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      case 'read': return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
      case 'replied': return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'archived': return 'bg-orange-100 text-orange-800 hover:bg-orange-100'
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  const getRelatedBooking = (message) => {
    if (!message.bookingId) return null
    return (bookings || []).find(b => b.id === message.bookingId)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Messages</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Unread</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{stats.unread}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Replied</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.replied}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Archived</CardDescription>
            <CardTitle className="text-3xl text-orange-600">{stats.archived}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guest Messages</CardTitle>
          <CardDescription>Manage inquiries and communications with guests</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input 
                placeholder="Search by guest name, email, or subject..."
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
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <Envelope size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-1">No messages found</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || filterStatus !== 'all' 
                    ? 'Try adjusting your filters' 
                    : 'Guest inquiries will appear here'}
                </p>
              </div>
            ) : (
              filteredMessages.map(message => (
                <Card 
                  key={message.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${message.status === 'unread' ? 'border-blue-300 bg-blue-50/30' : ''}`}
                  onClick={() => handleViewMessage(message)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {message.status === 'unread' ? (
                          <Envelope size={24} className="text-blue-600" />
                        ) : (
                          <EnvelopeOpen size={24} className="text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className={`font-semibold ${message.status === 'unread' ? 'text-blue-900' : ''}`}>
                              {message.guestName}
                            </h4>
                            <Badge className={getStatusColor(message.status)}>
                              {message.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock size={14} />
                            {format(new Date(message.createdAt), 'MMM d, h:mm a')}
                          </div>
                        </div>
                        
                        <p className={`text-sm mb-2 ${message.status === 'unread' ? 'font-medium' : 'text-muted-foreground'}`}>
                          {message.subject}
                        </p>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {message.message}
                        </p>
                        
                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                          <span>{message.guestEmail}</span>
                          {message.guestPhone && <span>{message.guestPhone}</span>}
                          {message.replies && message.replies.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {message.replies.length} {message.replies.length === 1 ? 'reply' : 'replies'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Guest Message</DialogTitle>
            <DialogDescription>
              From {selectedMessage?.guestName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-muted-foreground" />
                    <span className="font-medium">{selectedMessage.guestName}</span>
                    <Badge className={getStatusColor(selectedMessage.status)}>
                      {selectedMessage.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Email: </span>
                      <span>{selectedMessage.guestEmail}</span>
                    </div>
                    {selectedMessage.guestPhone && (
                      <div>
                        <span className="text-muted-foreground">Phone: </span>
                        <span>{selectedMessage.guestPhone}</span>
                      </div>
                    )}
                  </div>

                  {getRelatedBooking(selectedMessage) && (
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      <p className="font-medium mb-1">Related Booking</p>
                      <p className="text-muted-foreground">
                        {getRelatedBooking(selectedMessage).propertyName} • 
                        {format(new Date(getRelatedBooking(selectedMessage).checkIn), ' MMM d')} - 
                        {format(new Date(getRelatedBooking(selectedMessage).checkOut), ' MMM d, yyyy')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>
                  <p className="text-sm font-medium">{selectedMessage.subject}</p>
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                    <p className="text-xs text-muted-foreground mt-3">
                      Received {format(new Date(selectedMessage.createdAt), 'PPpp')}
                    </p>
                  </div>
                </div>

                {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                  <div className="space-y-3">
                    <Label>Replies</Label>
                    {selectedMessage.replies.map(reply => (
                      <div key={reply.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap mb-2">{reply.text}</p>
                        <p className="text-xs text-muted-foreground">
                          Sent {format(new Date(reply.sentAt), 'PPpp')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="reply">Send Reply</Label>
                  <Textarea 
                    id="reply"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply to the guest..."
                    rows={4}
                  />
                  <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                    <PaperPlaneRight size={18} className="mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}

          <div className="flex justify-between pt-4 border-t">
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => handleArchiveMessage(selectedMessage?.id)}
              >
                Archive
              </Button>
              <Button 
                variant="destructive"
                onClick={() => handleDeleteMessage(selectedMessage?.id)}
              >
                <Trash size={18} className="mr-2" />
                Delete
              </Button>
            </div>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GuestCommunications
