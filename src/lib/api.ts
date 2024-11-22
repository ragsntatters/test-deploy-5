import axios from 'axios'

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.gbptracker.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth endpoints
export const auth = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    api.post('/auth/register', data),
  
  logout: () => api.post('/auth/logout')
}

// Location endpoints
export const locations = {
  getAll: () => api.get('/locations'),
  
  get: (id: string) => api.get(`/locations/${id}`),
  
  create: (data: any) => api.post('/locations', data),
  
  update: (id: string, data: any) => api.patch(`/locations/${id}`, data),
  
  delete: (id: string) => api.delete(`/locations/${id}`)
}

// Reviews endpoints
export const reviews = {
  getByLocation: (locationId: string) => 
    api.get(`/reviews/locations/${locationId}`),
  
  reply: (reviewId: string, text: string) =>
    api.post(`/reviews/${reviewId}/reply`, { text }),
  
  getMetrics: (locationId: string) =>
    api.get(`/reviews/locations/${locationId}/metrics`)
}

// Posts endpoints
export const posts = {
  getByLocation: (locationId: string) =>
    api.get(`/posts/locations/${locationId}`),
  
  create: (data: FormData) =>
    api.post('/posts', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  
  update: (id: string, data: FormData) =>
    api.patch(`/posts/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  
  approve: (id: string) =>
    api.post(`/posts/${id}/approve`),
  
  reject: (id: string, reason: string) =>
    api.post(`/posts/${id}/reject`, { reason })
}

// Keywords endpoints
export const keywords = {
  getByLocation: (locationId: string) =>
    api.get(`/keywords/locations/${locationId}`),
  
  create: (data: any) =>
    api.post('/keywords', data),
  
  getHistory: (id: string) =>
    api.get(`/keywords/${id}/history`)
}

// Reports endpoints
export const reports = {
  create: (data: any) =>
    api.post('/reports', data),
  
  getAll: () =>
    api.get('/reports'),
  
  generate: (id: string, format?: string) =>
    api.get(`/reports/${id}/generate${format ? `?format=${format}` : ''}`)
}

// Team endpoints
export const team = {
  getMembers: (locationId: string) =>
    api.get(`/team/locations/${locationId}`),
  
  addMember: (locationId: string, data: any) =>
    api.post(`/team/locations/${locationId}`, data),
  
  updateMember: (locationId: string, memberId: string, data: any) =>
    api.patch(`/team/locations/${locationId}/members/${memberId}`, data),
  
  removeMember: (locationId: string, memberId: string) =>
    api.delete(`/team/locations/${locationId}/members/${memberId}`)
}

// Analytics endpoints
export const analytics = {
  getLocationMetrics: (locationId: string, params?: any) =>
    api.get(`/analytics/locations/${locationId}`, { params }),
  
  generateReport: (locationId: string, date: string) =>
    api.post(`/analytics/locations/${locationId}/generate`, { date })
}

export default api