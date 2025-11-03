import { create } from 'zustand';
import { User } from '@/lib/api/types';
import { authService } from '@/services/auth/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setLoading: (loading) => set({ isLoading: loading }),

  login: (user) => set({ user, isAuthenticated: true }),

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  initializeAuth: () => {
    const user = authService.getStoredUser();
    const isAuthenticated = authService.isAuthenticated();
    set({ user, isAuthenticated, isLoading: false });
  },
}));
