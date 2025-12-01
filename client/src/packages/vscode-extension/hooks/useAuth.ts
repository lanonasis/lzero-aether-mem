import { useEffect, useState } from 'react';
import { useLanonasis } from '@lanonasis/shared/sdk/react-hooks';

export const useAuth = () => {
  const { client, isAuthenticated, isConnecting, user, login, logout, error } =
    useLanonasis();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const verify = async () => {
      if (!isAuthenticated) {
        setIsVerifying(false);
        return;
      }

      try {
        // This calls /api/v1/memory via the shared SDK (not /api/memories)
        await client.memory.list();
      } catch (err) {
        console.error('Auth verification via /api/v1/memory failed:', err);
      } finally {
        if (!isCancelled) {
          setIsVerifying(false);
        }
      }
    };

    verify();

    return () => {
      isCancelled = true;
    };
  }, [client, isAuthenticated]);

  return {
    isAuthenticated,
    isLoading: isConnecting || isVerifying,
    user,
    login,
    logout,
    error,
  };
};
