import axios from 'axios';
import { User } from '../types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  // Register
  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post<User>('/auth/register', userData);
    return response.data;
  },

  // Login
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  },

  // Get profile
  getProfile: async () => {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
  },
};