import { create } from 'zustand';

interface User {
  username: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  setLogin: (token: string, username: string) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  setLogin: (token, username) => {
    localStorage.setItem('auth_token', token);
    set({ token, user: { username }, isAuthenticated: true });
  },

  setLogout: () => {
    localStorage.removeItem('auth_token');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));