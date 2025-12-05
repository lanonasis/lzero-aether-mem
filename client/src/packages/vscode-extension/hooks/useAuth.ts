import { useLanonasisContext } from '../context/LanonasisContext';

export const useAuth = () => {
  const {
    isAuthenticated,
    isLoading,
    user,
    error,
    loginWithOAuth,
    loginWithApiKey,
    logout,
  } = useLanonasisContext();

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };
};
