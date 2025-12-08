// src/lib/agiServices.ts
class AgiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9999/api';
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  async fetchData(endpoint: string, options: RequestInit & { body?: any } = {}) {
    // Use a Headers object so we can safely call .set() to add/modify headers
    const headers = new Headers(options.headers);
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    // Add auth token if available
    if (this.token && typeof window !== 'undefined') {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
          throw new AgiError('Authentication failed');
        }
        throw new AgiError(`HTTP error! status: ${response.status}`);
      }

      // Handle No Content responses
      if (response.status === 204) {
        return null;
      }

      const text = await response.text();
      if (!text) return null;

      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.fetchData('auth/login', {
      method: 'POST',
      body: { email, password }
    } as any);
  }

  async logout() {
    return this.fetchData('auth/logout', {
      method: 'POST'
    });
  }

  async validateToken() {
    return this.fetchData('auth/validate');
  }

  // SUBSCRIPTIONS (from your existing code)
  async getSubscriptions(restaurantId: string): Promise<any[]> {
    return this.fetchData(`subscriptions/restaurant/${restaurantId}`);
  }

  // Add other methods as needed...
}

export class AgiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AgiError';
  }
}

export const agiService = new AgiService();