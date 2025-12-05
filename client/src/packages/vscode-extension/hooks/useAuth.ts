import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; name?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check stored auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to fetch a protected endpoint to verify auth
        const response = await fetch('/api/memories', {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          setIsAuthenticated(true);
          setUser({ id: 'dev-user-1' });
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData?: { id: string; name?: string }) => {
    setIsAuthenticated(true);
    setUser(userData || { id: 'dev-user-1' });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };
};
