/**
 * Mobile Auth Hook
 * Wraps @lanonasis/shared hooks to match desktop useAuth API
 */

import { useLanonasis } from '@lanonasis/shared';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { id: string; email: string; name?: string } | null;
  error: string | null;
}

export const useAuth = () => {
  const lanonasis = useLanonasis();

  return {
    isAuthenticated: lanonasis.isAuthenticated,
    isLoading: false, // SDK doesn't expose loading state
    user: lanonasis.user,
    error: null, // SDK doesn't expose error state directly
    // Auth methods
    loginWithOAuth: lanonasis.login,
    loginWithApiKey: lanonasis.login, // SDK only has login
    login: lanonasis.login, // Legacy alias
    logout: lanonasis.logout,
  };
};
