import { create } from 'zustand'
import { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  return {
    user: user,
    isAuthenticated: token ? true : false,
    login: (user) => {
      localStorage.setItem('token', user.token); // Save token
      localStorage.setItem('user', JSON.stringify(user)); // Save user data
      set({ user, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ user: null, isAuthenticated: false });
    },
  };
});