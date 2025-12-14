// API Service for The VIF Luxury Riviera
// Connects frontend to backend API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

// Helper to get full image URL
export function getImageUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${BACKEND_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.status = status
    this.data = data
  }
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // Add auth token if available
  const token = localStorage.getItem('vif_auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(
        data.message || 'An error occurred',
        response.status,
        data
      )
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(error.message || 'Network error', 0, null)
  }
}

// ==================== PROPERTIES ====================

export const propertyApi = {
  // Get all properties with optional filters
  getAll: async (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.type) params.append('type', filters.type)
    if (filters.minPrice) params.append('minPrice', filters.minPrice)
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
    if (filters.bedrooms) params.append('bedrooms', filters.bedrooms)
    if (filters.hasPool) params.append('hasPool', filters.hasPool)
    if (filters.hasSeaView) params.append('hasSeaView', filters.hasSeaView)
    if (filters.featured) params.append('featured', filters.featured)
    
    const queryString = params.toString()
    return request(`/properties${queryString ? `?${queryString}` : ''}`)
  },

  // Get single property by ID or slug
  getById: async (idOrSlug) => {
    return request(`/properties/${idOrSlug}`)
  },

  // Get featured properties
  getFeatured: async () => {
    return request('/properties?featured=true')
  },

  // Check availability
  checkAvailability: async (propertyId, startDate, endDate) => {
    return request(`/properties/${propertyId}/availability?startDate=${startDate}&endDate=${endDate}`)
  }
}

// ==================== EXPERIENCES ====================

export const experienceApi = {
  // Get all experiences
  getAll: async () => {
    return request('/experiences')
  },

  // Get single experience by ID or slug
  getById: async (idOrSlug) => {
    return request(`/experiences/${idOrSlug}`)
  },

  // Get featured experiences
  getFeatured: async () => {
    return request('/experiences?featured=true')
  }
}

// ==================== REVIEWS ====================

export const reviewApi = {
  // Get all reviews with optional property filter
  getAll: async (propertyId = null) => {
    const endpoint = propertyId 
      ? `/reviews?propertyId=${propertyId}`
      : '/reviews'
    return request(endpoint)
  },

  // Get reviews for a specific property
  getByProperty: async (propertyId) => {
    return request(`/reviews?propertyId=${propertyId}`)
  },

  // Create a new review (requires auth)
  create: async (reviewData) => {
    return request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    })
  }
}

// ==================== BOOKINGS ====================

export const bookingApi = {
  // Get all bookings (admin)
  getAll: async (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.status) params.append('status', filters.status)
    if (filters.propertyId) params.append('propertyId', filters.propertyId)
    const queryString = params.toString()
    return request(`/bookings${queryString ? `?${queryString}` : ''}`)
  },

  // Create a booking
  create: async (bookingData) => {
    return request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    })
  },

  // Update booking
  update: async (id, bookingData) => {
    return request(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData)
    })
  },

  // Delete booking
  delete: async (id) => {
    return request(`/bookings/${id}`, {
      method: 'DELETE'
    })
  },

  // Get user's bookings (requires auth)
  getMyBookings: async () => {
    return request('/bookings/my')
  },

  // Get booking by ID
  getById: async (id) => {
    return request(`/bookings/${id}`)
  }
}

// ==================== ADMIN PROPERTIES ====================

export const adminPropertyApi = {
  // Get all properties (including inactive) for admin
  getAll: async () => {
    return request('/admin/properties')
  },

  // Create property
  create: async (propertyData) => {
    return request('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData)
    })
  },

  // Update property
  update: async (id, propertyData) => {
    return request(`/properties/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(propertyData)
    })
  },

  // Delete property (soft delete)
  delete: async (id) => {
    return request(`/properties/${id}`, {
      method: 'DELETE'
    })
  },

  // Add property image
  addImage: async (id, imageData) => {
    return request(`/properties/${id}/images`, {
      method: 'POST',
      body: JSON.stringify(imageData)
    })
  },

  // Delete property image
  deleteImage: async (propertyId, imageId) => {
    return request(`/properties/${propertyId}/images/${imageId}`, {
      method: 'DELETE'
    })
  },

  // Update property status (active/inactive)
  updateStatus: async (id, isActive) => {
    return request(`/properties/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive })
    })
  },

  // Get property availability
  getAvailability: async (propertyId, startDate, endDate) => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    return request(`/properties/${propertyId}/availability?${params.toString()}`)
  },

  // Block dates
  blockDates: async (propertyId, blockData) => {
    return request(`/properties/${propertyId}/block-dates`, {
      method: 'POST',
      body: JSON.stringify(blockData)
    })
  },

  // Unblock dates
  unblockDates: async (propertyId, blockId) => {
    return request(`/properties/${propertyId}/block-dates/${blockId}`, {
      method: 'DELETE'
    })
  }
}

// ==================== INQUIRIES ====================

export const inquiryApi = {
  // Submit contact inquiry
  create: async (inquiryData) => {
    return request('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    })
  }
}

// ==================== AUTH ====================

export const authApi = {
  // Login
  login: async (email, password) => {
    const response = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    if (response.data?.accessToken) {
      localStorage.setItem('vif_auth_token', response.data.accessToken)
    }
    return response
  },

  // Register
  register: async (userData) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  },

  // Logout
  logout: () => {
    localStorage.removeItem('vif_auth_token')
  },

  // Get current user
  getMe: async () => {
    return request('/auth/me')
  }
}

// ==================== NEWSLETTER ====================

export const newsletterApi = {
  // Subscribe to newsletter
  subscribe: async (email) => {
    return request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }
}

// Export all APIs
export default {
  properties: propertyApi,
  experiences: experienceApi,
  reviews: reviewApi,
  bookings: bookingApi,
  inquiries: inquiryApi,
  auth: authApi,
  newsletter: newsletterApi
}
