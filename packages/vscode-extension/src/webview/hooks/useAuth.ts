/**
 * Authentication Hook for VS Code Extension
 * Uses LanonasisContext for OAuth and API key management
 */
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
        isLoading,
        user,
        error,
        // Expose both login methods
        loginWithOAuth,
        loginWithApiKey,
        // Legacy login function (for backward compatibility)
        login: loginWithOAuth,
        logout,
    };
};
