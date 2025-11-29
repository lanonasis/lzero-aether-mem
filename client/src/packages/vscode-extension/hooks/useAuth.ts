import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; name?: string } | null>(null);

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
    setUser(userData || { id: 'user-1' });
    setIsLoading(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
  };

  useEffect(() => {
    let isCancelled = false;

    const checkAuth = async () => {
      try {
        const response = await fetch('/api/memories', {
          headers: { 'Content-Type': 'application/json' },
        });

        if (!isCancelled) {
          if (response.ok) {
            setIsAuthenticated(true);
            setUser({ id: 'dev-user-1' });
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Auth check failed:', err);
          setIsAuthenticated(false);
          setUser(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };
};
