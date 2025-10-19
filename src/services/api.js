import axios from 'axios';
import { RegisterData } from '../types';
const API_BASE_URL = 'http://localhost:5000/api';
const api = axios.create({
    baseURL: API_BASE_URL,
});
// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (userData) => api.post('/auth/register', userData),
    getProfile: () => api.get('/auth/me'),
};
export const demarchesAPI = {
    getAll: () => api.get('/demarches'),
    getById: (id) => api.get(`/demarches/${id}`),
};
export const dossiersAPI = {
    create: (formData) => api.post('/dossiers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getMyDossiers: () => api.get('/dossiers/mes-dossiers'),
    getById: (id) => api.get(`/dossiers/${id}`),
    getAll: (params) => api.get('/dossiers', { params }),
    updateStatus: (id, data) => api.patch(`/dossiers/${id}/statut`, data),
};
export default api;
//# sourceMappingURL=api.js.map