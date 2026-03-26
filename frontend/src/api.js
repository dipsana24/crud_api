import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const taskAPI = {
  getAll: (params = {}) => api.get('/tasks/', { params }),
  getOne: (id) => api.get(`/tasks/${id}/`),
  create: (data) => api.post('/tasks/', data),
  update: (id, data) => api.put(`/tasks/${id}/`, data),
  patch: (id, data) => api.patch(`/tasks/${id}/`, data),
  delete: (id) => api.delete(`/tasks/${id}/`),
  getStats: () => api.get('/tasks/stats/'),
};

export default api;
