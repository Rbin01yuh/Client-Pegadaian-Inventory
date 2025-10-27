import { create } from 'zustand';

export type Role = 'admin' | 'staff';

interface User {
  id: string;
  name: string;
  role: Role;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (payload: { token: string; user: User }) => void;
  logout: () => void;
  setLoading: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('smartinventory_token'),
  user: null,
  loading: false,
  login: ({ token, user }) => {
    localStorage.setItem('smartinventory_token', token);
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('smartinventory_token');
    set({ token: null, user: null });
  },
  setLoading: (v) => set({ loading: v }),
}));