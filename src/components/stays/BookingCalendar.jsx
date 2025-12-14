import { useState, useEffect, useMemo } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarDots, Users, Moon, CurrencyEuro, Info, CheckCircle } from '@phosphor-icons/react'
import { format, differenceInDays, addDays, isBefore, isWithinInterval, startOfDay } from 'date-fns'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

const SEASONAL_PRICING = {
  peak: 1.5,
  high: 1.2,
  mid: 1.0,
  low: 0.8
}

const PEAK_DATES = [
  { start: new Date(2025, 6, 1), end: new Date(2025, 7, 31) },
  { start: new Date(2025, 11, 20), end: new Date(2026, 0, 5) }
]

const HIGH_DATES = [
  { start: new Date(2025, 4, 1), end: new Date(2025, 5, 30) },
  { start: new Date(2025, 8, 1), end: new Date(2025, 9, 15) }
]

const LOW_DATES = [
  { start: new Date(2025, 10, 1), end: new Date(2025, 11, 19) },
  { start: new Date(2026, 0, 6), end: new Date(2026, 1, 28) }
]

function getSeasonForDate(date) {
  const dateOnly = startOfDay(date)
  
  for (const period of PEAK_DATES) {
    if (isWithinInterval(dateOnly, { start: startOfDay(period.start), end: startOfDay(period.end) })) {
      return 'peak'
    }
  }
  
  for (const period of HIGH_DATES) {
    if (isWithinInterval(dateOnly, { start: startOfDay(period.start), end: startOfDay(period.end) })) {
      return 'high'
    }
  }
  
  for (const period of LOW_DATES) {
    if (isWithinInterval(dateOnly, { start: startOfDay(period.start), end: startOfDay(period.end) })) {
      return 'low'
    }
  }
  
  return 'mid'
}

function generateRandomBookedDates() {
  const bookedDates = []
  const today = startOfDay(new Date())
  
  for (let i = 0; i < 15; i++) {
    const randomDays = Math.floor(Math.random() * 180) + 1
    const startDate = addDays(today, randomDays)
    const duration = Math.floor(Math.random() * 7) + 3
    
    for (let j = 0; j < duration; j++) {
      bookedDates.push(addDays(startDate, j).toISOString())
    }
  }
  
  return bookedDates
}

export default function BookingCalendar({ property }) {
  const [bookedDates, setBookedDates] = useLocalStorage(`bookings-${property.id}`, generateRandomBookedDates())
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [guests, setGuests] = useState(2)
  const [showPricing, setShowPricing] = useState(false)

  const disabledDates = useMemo(() => {
    return bookedDates.map(dateStr => new Date(dateStr))
  }, [bookedDates])

  const isDateBooked = (date) => {
    return disabledDates.some(disabledDate => 
      startOfDay(disabledDate).getTime() === startOfDay(date).getTime()
    )
  }

  const isRangeValid = (range) => {
    if (!range?.from || !range?.to) return true
    
    const start = startOfDay(range.from)
    const end = startOfDay(range.to)
    let currentDate = start
    
    while (currentDate <= end) {
      if (isDateBooked(currentDate)) {
        return false
      }
      currentDate = addDays(currentDate, 1)
    }
    
    return true
  }

  const handleDateSelect = (value) => {
    if (!value) {
      setDateRange({ from: undefined, to: undefined })
      setShowPricing(false)
      return
    }

    // Handle single date or date range
    if (Array.isArray(value)) {
      const [from, to] = value
      const range = { from, to }
      
      // Allow all dates - remove booking restrictions for demo
      
      setDateRange(range)
      setShowPricing(!!to)
      
      // Show feedback for what was selected
      if (to) {
        toast.success(`Selected: ${format(from, 'MMM dd')} (Check-in) to ${format(to, 'MMM dd')} (Check-out)`)
      }
    } else {
      // Single date selected - allow all future dates
      setDateRange({ from: value, to: undefined })
      setShowPricing(false)
      toast.info(`Selected: ${format(value, 'MMM dd, yyyy')} (Check-in) - Now select check-out date`)
    }
  }

  const pricingDetails = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return null

    const nights = differenceInDays(dateRange.to, dateRange.from)
    if (nights <= 0) return null

    let totalBase = 0
    let breakdown = []
    
    let currentDate = startOfDay(dateRange.from)
    const endDate = startOfDay(dateRange.to)
    
    while (currentDate < endDate) {
      const season = getSeasonForDate(currentDate)
      const multiplier = SEASONAL_PRICING[season]
      const nightPrice = Math.round(property.price * multiplier)
      
      const existing = breakdown.find(b => b.season === season)
      if (existing) {
        existing.nights += 1
        existing.total += nightPrice
      } else {
        breakdown.push({
          season,
          nights: 1,
          pricePerNight: nightPrice,
          total: nightPrice
        })
      }
      
      totalBase += nightPrice
      currentDate = addDays(currentDate, 1)
    }

    const cleaningFee = 80
    const serviceFee = Math.round(totalBase * 0.12)
    const deposit = property.houseRules?.damageDeposit ? 600 : 0
    const totalBeforeDeposit = totalBase + cleaningFee + serviceFee
    const total = totalBeforeDeposit + deposit

    return {
      nights,
      breakdown,
      subtotal: totalBase,
      cleaningFee,
      serviceFee,
      deposit,
      totalBeforeDeposit,
      total
    }
  }, [dateRange, property.price, property.houseRules])

  const getSeasonBadge = (season) => {
    const config = {
      peak: { label: 'Peak Season', variant: 'destructive' },
      high: { label: 'High Season', variant: 'default' },
      mid: { label: 'Mid Season', variant: 'secondary' },
      low: { label: 'Low Season', variant: 'outline' }
    }
    return config[season] || config.mid
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDots size={24} className="text-primary" />
          Book Your Stay
        </CardTitle>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">€{property.price}</span>
          <span className="text-sm text-muted-foreground">/ night base rate</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Prices vary by season. Final price shown after date selection.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Select Dates</label>
            {dateRange?.from && !dateRange?.to && (
              <span className="text-xs text-blue-600 font-medium">
                Now select check-out date
              </span>
            )}
            {dateRange?.from && dateRange?.to && (
              <button 
                onClick={() => {
                  setDateRange({ from: undefined, to: undefined })
                  setShowPricing(false)
                  toast.info('Dates cleared')
                }}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Clear dates
              </button>
            )}
          </div>
          <Calendar
            selectRange={true}
            value={dateRange?.from && dateRange?.to ? [dateRange.from, dateRange.to] : dateRange?.from || null}
            onChange={handleDateSelect}
            minDate={new Date()}
            className="w-full"
          />
          
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              <span className="w-3 h-3 bg-destructive/10 border border-destructive/20 rounded-sm mr-1.5"></span>
              Unavailable
            </Badge>
            <Badge variant="outline" className="text-xs">
              <span className="w-3 h-3 bg-primary text-primary-foreground rounded-sm mr-1.5"></span>
              Selected
            </Badge>
          </div>
        </div>

        {dateRange?.from && dateRange?.to && (
          <div className="p-3 bg-accent/20 border border-accent/30 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Check-in</span>
              <span className="font-medium">{format(dateRange.from, 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Check-out</span>
              <span className="font-medium">{format(dateRange.to, 'MMM dd, yyyy')}</span>
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-2 block">Number of Guests</label>
          <Select value={guests.toString()} onValueChange={(val) => setGuests(parseInt(val))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: property.capacity }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {pricingDetails && showPricing && (
          <div className="space-y-4">
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CurrencyEuro size={18} className="text-primary" />
                Price Breakdown
              </h4>
              
              <div className="space-y-2.5 text-sm">
                {pricingDetails.breakdown.map((item, idx) => {
                  const badgeInfo = getSeasonBadge(item.season)
                  return (
                    <div key={idx} className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span>
                          €{item.pricePerNight} × {item.nights} {item.nights === 1 ? 'night' : 'nights'}
                        </span>
                        <Badge variant={badgeInfo.variant} className="text-xs w-fit">
                          {badgeInfo.label}
                        </Badge>
                      </div>
                      <span className="font-medium">€{item.total.toLocaleString()}</span>
                    </div>
                  )
                })}
                
                <Separator className="my-2" />
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({pricingDetails.nights} nights)</span>
                  <span className="font-medium">€{pricingDetails.subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cleaning fee</span>
                  <span>€{pricingDetails.cleaningFee}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee (12%)</span>
                  <span>€{pricingDetails.serviceFee}</span>
                </div>
                
                {pricingDetails.deposit > 0 && (
                  <>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-1">
                        <span className="text-muted-foreground">Damage deposit</span>
                        <Info size={14} className="text-muted-foreground mt-0.5" />
                      </div>
                      <span className="font-medium">€{pricingDetails.deposit}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Refundable within 7 days of checkout
                    </p>
                  </>
                )}
                
                <Separator className="my-3" />
                
                <div className="flex justify-between items-center text-base pt-1">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-primary">€{pricingDetails.total.toLocaleString()}</span>
                </div>
                
                {pricingDetails.deposit > 0 && (
                  <p className="text-xs text-muted-foreground italic">
                    Includes €{pricingDetails.deposit} refundable deposit
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Button 
            className="w-full" 
            size="lg"
            disabled={!dateRange?.from || !dateRange?.to || !isRangeValid(dateRange)}
            onClick={() => {
              if (dateRange?.from && dateRange?.to && pricingDetails) {
                toast.success('Booking request sent!', {
                  description: `${pricingDetails.nights} nights • €${pricingDetails.total.toLocaleString()}`
                })
              }
            }}
          >
            {dateRange?.from && dateRange?.to ? 'Reserve Now' : 'Select Dates to Continue'}
          </Button>
          
          {dateRange?.from && dateRange?.to && (
            <p className="text-xs text-center text-muted-foreground">
              You won't be charged yet
            </p>
          )}
        </div>

        <Separator />

        <div className="space-y-2.5 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span>Free cancellation up to 60 days before check-in</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span>30% deposit required to confirm booking</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span>Welcome concierge service included</span>
          </div>
          {property.houseRules?.minStay && (
            <div className="flex items-start gap-2">
              <Moon size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span>Minimum stay: {property.houseRules.minStay}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Add clean styles for react-calendar with proper range highlighting
const calendarStyles = `
  .react-calendar {
    width: 100%;
    background: white;
    border: none;
    font-family: inherit;
  }
  
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1rem;
  }
  
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 500;
    color: inherit;
  }
  
  .react-calendar__navigation button:enabled:hover {
    background-color: #f1f5f9;
    border-radius: 0.375rem;
  }
  
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 500;
    font-size: 0.875rem;
  }
  
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.75rem 0.5rem;
  }
  
  .react-calendar__tile {
    max-width: 100%;
    padding: 0.75rem 0.5rem;
    background: none;
    border: none;
    text-align: center;
    line-height: 16px;
    font-size: 14px;
    border-radius: 0.375rem;
    transition: background-color 0.15s ease;
  }
  
  .react-calendar__tile:enabled:hover {
    background-color: #f8fafc;
  }
  
  .react-calendar__tile--now {
    background: #f1f5f9;
    font-weight: 600;
  }
  
  .react-calendar__tile:disabled {
    color: #cbd5e1;
    cursor: not-allowed;
  }
  
  /* Range selection styling */
  .react-calendar__tile--range {
    background-color: #dbeafe !important;
    color: #1e40af !important;
    position: relative;
  }
  
  .react-calendar__tile--rangeStart {
    background-color: #10b981 !important;
    color: white !important;
    position: relative;
  }
  
  .react-calendar__tile--rangeStart::before {
    content: "Check-in";
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    background: #374151;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    z-index: 10;
  }
  
  .react-calendar__tile--rangeStart::after {
    content: "";
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #374151;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    z-index: 10;
  }
  
  .react-calendar__tile--rangeStart:hover::before,
  .react-calendar__tile--rangeStart:hover::after {
    opacity: 1;
  }
  
  .react-calendar__tile--rangeEnd {
    background-color: #ef4444 !important;
    color: white !important;
    position: relative;
  }
  
  .react-calendar__tile--rangeEnd::before {
    content: "Check-out";
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    background: #374151;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    z-index: 10;
  }
  
  .react-calendar__tile--rangeEnd::after {
    content: "";
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #374151;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    z-index: 10;
  }
  
  .react-calendar__tile--rangeEnd:hover::before,
  .react-calendar__tile--rangeEnd:hover::after {
    opacity: 1;
  }
  
  .react-calendar__tile--active {
    background-color: #2563eb !important;
    color: white !important;
  }
  
  .react-calendar__tile--active:enabled:hover {
    background-color: #1d4ed8 !important;
  }
  
  .react-calendar__tile--rangeStart:enabled:hover {
    background-color: #059669 !important;
  }
  
  .react-calendar__tile--rangeEnd:enabled:hover {
    background-color: #dc2626 !important;
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = calendarStyles
  if (!document.head.querySelector('[data-calendar-styles]')) {
    styleElement.setAttribute('data-calendar-styles', 'true')
    document.head.appendChild(styleElement)
  }
}
