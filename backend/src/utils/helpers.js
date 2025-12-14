import { addDays, differenceInDays, isWithinInterval, parseISO, format } from 'date-fns';

/**
 * Generate a unique booking reference
 */
export const generateBookingRef = () => {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `VIF-${year}-${random}`;
};

/**
 * Calculate the number of nights between two dates
 */
export const calculateNights = (checkIn, checkOut) => {
  const startDate = typeof checkIn === 'string' ? parseISO(checkIn) : checkIn;
  const endDate = typeof checkOut === 'string' ? parseISO(checkOut) : checkOut;
  return differenceInDays(endDate, startDate);
};

/**
 * Calculate total booking price
 */
export const calculateBookingTotal = ({
  pricePerNight,
  nights,
  cleaningFee = 0,
  serviceFee = 0,
  taxRate = 0,
  discount = 0,
}) => {
  const subtotal = pricePerNight * nights;
  const fees = cleaningFee + serviceFee;
  const beforeTax = subtotal + fees - discount;
  const taxes = beforeTax * taxRate;
  const total = beforeTax + taxes;
  
  return {
    subtotal,
    cleaningFee,
    serviceFee,
    discount,
    taxes,
    total,
  };
};

/**
 * Check if dates overlap with existing bookings
 */
export const datesOverlap = (checkIn, checkOut, existingBookings) => {
  const newCheckIn = typeof checkIn === 'string' ? parseISO(checkIn) : checkIn;
  const newCheckOut = typeof checkOut === 'string' ? parseISO(checkOut) : checkOut;
  
  return existingBookings.some((booking) => {
    const existingCheckIn = typeof booking.checkIn === 'string' ? parseISO(booking.checkIn) : booking.checkIn;
    const existingCheckOut = typeof booking.checkOut === 'string' ? parseISO(booking.checkOut) : booking.checkOut;
    
    // Check if new booking overlaps with existing
    return (
      (newCheckIn >= existingCheckIn && newCheckIn < existingCheckOut) ||
      (newCheckOut > existingCheckIn && newCheckOut <= existingCheckOut) ||
      (newCheckIn <= existingCheckIn && newCheckOut >= existingCheckOut)
    );
  });
};

/**
 * Get available dates for a property
 */
export const getAvailableDates = (bookedDates, blockedDates, startDate, endDate) => {
  const available = [];
  let currentDate = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  while (currentDate <= end) {
    const isBooked = bookedDates.some((booking) => {
      const checkIn = typeof booking.checkIn === 'string' ? parseISO(booking.checkIn) : booking.checkIn;
      const checkOut = typeof booking.checkOut === 'string' ? parseISO(booking.checkOut) : booking.checkOut;
      return isWithinInterval(currentDate, { start: checkIn, end: addDays(checkOut, -1) });
    });
    
    const isBlocked = blockedDates.some((block) => {
      const blockStart = typeof block.startDate === 'string' ? parseISO(block.startDate) : block.startDate;
      const blockEnd = typeof block.endDate === 'string' ? parseISO(block.endDate) : block.endDate;
      return isWithinInterval(currentDate, { start: blockStart, end: blockEnd });
    });
    
    if (!isBooked && !isBlocked) {
      available.push(format(currentDate, 'yyyy-MM-dd'));
    }
    
    currentDate = addDays(currentDate, 1);
  }
  
  return available;
};

/**
 * Slugify a string
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Parse pagination params from request query
 */
export const parsePaginationParams = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
  const skip = (page - 1) * limit;
  
  return { page, limit, skip };
};

/**
 * Parse sort params from request query
 */
export const parseSortParams = (query, allowedFields = []) => {
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder?.toLowerCase() === 'asc' ? 'asc' : 'desc';
  
  // Validate sort field
  const validField = allowedFields.includes(sortBy) ? sortBy : 'createdAt';
  
  return { [validField]: sortOrder };
};

/**
 * Sanitize output - remove sensitive fields
 */
export const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...sanitized } = user;
  return sanitized;
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};
