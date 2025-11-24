import { useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; name?: string } | null>(null);

  const login = (userData?: { id: string; name?: string }) => {
    setIsAuthenticated(true);
    setUser(userData || { id: 'user-1' });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};
