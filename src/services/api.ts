
import axios from 'axios'
import type { RegisterData } from '../types'
import { mockDemarches } from './mockData'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData: RegisterData) => 
    api.post('/auth/register', userData),
  
  getProfile: () => 
    api.get('/auth/me'),
}

export const demarchesAPI = {
  getAll: () => 
    Promise.resolve({ data: mockDemarches }), // Données mockées temporairement
  
  getById: (id: string) => 
    Promise.resolve({ data: mockDemarches.find(d => d.id === id) }),
}

export const dossiersAPI = {
  create: (formData: FormData) => 
    api.post('/dossiers', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  getMyDossiers: () => 
    api.get('/dossiers/mes-dossiers'),
  
  getById: (id: string) => 
    api.get(`/dossiers/${id}`),
  
  getAll: (params?: any) => 
    api.get('/dossiers', { params }),
  
  updateStatus: (id: string, data: any) => 
    api.patch(`/dossiers/${id}/statut`, data),
}

export default api