'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  return <>{children}</>;
}
