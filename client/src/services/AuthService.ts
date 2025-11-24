export interface User {
  id: string;
  name?: string;
  email?: string;
}

export class AuthService {
  static async login(credentials: {
    username?: string;
    password?: string;
    apiKey?: string;
  }): Promise<User> {
    // API call would happen here
    return { id: 'user-1' };
  }

  static async logout(): Promise<void> {
    // API call would happen here
  }

  static async getCurrentUser(): Promise<User | null> {
    // API call would happen here
    return null;
  }

  static async validateApiKey(apiKey: string): Promise<boolean> {
    // API call would happen here
    return true;
  }
}
