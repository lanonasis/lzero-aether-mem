/**
 * Mobile Auth Hook
 * Wraps @lanonasis/shared hooks to match desktop useAuth API
 */

import { useLanonasis } from '@lanonasis/shared';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { id: string; email: string; name?: string } | null;
  error: Error | null;
}

export const useAuth = () => {
  const lanonasis = useLanonasis();

  return {
    isAuthenticated: lanonasis.isAuthenticated,
    isLoading: lanonasis.isConnecting,
    user: lanonasis.user,
    error: lanonasis.error,
    // Auth methods
    loginWithOAuth: lanonasis.login,
    loginWithApiKey: lanonasis.login, // SDK only has login
    login: lanonasis.login, // Legacy alias
    logout: lanonasis.logout,
  };
};
