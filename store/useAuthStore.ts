import { create } from 'zustand';
import { User } from '@/models/User';
import { signInWithGoogle, signOut, createGuestUser, onAuthChange } from '@/services/authService';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initializeAuth: () => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loginAsGuest: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  initializeAuth: () => {
    onAuthChange((user) => {
      if (user) {
        set({ user, isLoading: false });
      } else {
        // Check for guest mode
        const guestId = localStorage.getItem('guestId');
        if (guestId) {
          const guestUser = createGuestUser();
          set({ user: guestUser, isLoading: false });
        } else {
          set({ user: null, isLoading: false });
        }
      }
    });
  },

  loginWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });
      const user = await signInWithGoogle();
      set({ user, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await signOut();
      set({ user: null, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  loginAsGuest: () => {
    const guestUser = createGuestUser();
    set({ user: guestUser, isLoading: false });
  },
}));
