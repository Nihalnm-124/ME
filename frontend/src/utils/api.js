import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const fetchNGOs = (params) => API.get('/ngos', { params });
export const fetchNGO = (id) => API.get(`/ngos/${id}`);
export const createDonation = (data) => API.post('/donations', data);
export const createNGO = (data) => API.post('/ngos', data);

// me
export const getMe = () => API.get('/auth/me');

// Admin endpoints
export const adminFetchNGOs = () => API.get('/admin/ngos');
export const adminVerifyNGO = (id, verified) => API.patch(`/admin/ngos/${id}/verify`, { verified });
export const adminFetchDonations = () => API.get('/admin/donations');
export const adminFetchUsers = () => API.get('/admin/users');
export const adminAnalytics = () => API.get('/admin/analytics');

export default API;

