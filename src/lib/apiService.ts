import { 
  ApiError, 
  AuthenticationError, 
  AuthorizationError, 
  ValidationError
} from './errors/apiError';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  getMenuItems(id: string) {
    throw new Error("Method not implemented.");
  }
  private static instance: ApiService;
  private token: string | null = null;
  private userRole: string | null = null;
  private refreshToken: string | null = null;
  private isRefreshing: boolean = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  private constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
      this.userRole = localStorage.getItem('userRole');
      this.refreshToken = localStorage.getItem('refreshToken');
    }
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public setAuthToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  public setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  public setUserRole(role: string): void {
    this.userRole = role;
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role);
    }
  }

  public clearAuth(): void {
    this.token = null;
    this.userRole = null;
    this.refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('refreshToken');
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async refreshAuthToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new AuthenticationError('No refresh token available');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (!response.ok) {
        throw new AuthenticationError('Failed to refresh token');
      }

      const data = await response.json();
      this.setAuthToken(data.token);
      if (data.refreshToken) {
        this.setRefreshToken(data.refreshToken);
      }

      return data.token;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  private async handleRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
        credentials: 'include',
      });

      // Handle token refresh on 401
      if (response.status === 401 && this.refreshToken && !endpoint.includes('/auth/')) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          
          try {
            const newToken = await this.refreshAuthToken();
            this.isRefreshing = false;
            
            // Retry the original request with new token
            return this.handleRequest<T>(endpoint, options);
          } catch (refreshError) {
            this.isRefreshing = false;
            this.clearAuth();
            throw new AuthenticationError('Session expired. Please login again.');
          }
        } else {
          // Wait for token refresh to complete
          return new Promise((resolve, reject) => {
            this.refreshSubscribers.push((token: string) => {
              resolve(this.handleRequest<T>(endpoint, options));
            });
          });
        }
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Unknown error occurred' };
        }

        switch (response.status) {
          case 400:
            throw new ValidationError(errorData.message || 'Bad request', errorData);
          case 401:
            throw new AuthenticationError(errorData.message || 'Unauthorized', errorData);
          case 403:
            throw new AuthorizationError(errorData.message || 'Forbidden', errorData);
          case 404:
            throw new ApiError(errorData.message || 'Not found', 404, errorData);
          case 409:
            throw new ApiError(errorData.message || 'Conflict', 409, errorData);
          case 500:
            throw new ApiError(errorData.message || 'Internal server error', 500, errorData);
          default:
            throw new ApiError(
              errorData.message || `HTTP error! status: ${response.status}`,
              response.status,
              errorData
            );
        }
      }

      // Handle empty response
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return {} as T;
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network errors or other issues
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new ApiError('Network error. Please check your connection.', 0);
      }
      
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        0
      );
    }
  }

  // Public API methods
  public async fetchData<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.handleRequest<T>(endpoint, options);
  }

  // Auth methods
  public async login(
    email: string, 
    password: string, 
    userType: 'owner' | 'manager'
  ): Promise<{ token: string; refreshToken: string; user: any }> {
    try {
      const response = await this.handleRequest<{
        token: string;
        refreshToken: string;
        user: any;
      }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, userType }),
      });

      // Store tokens and user info
      this.setAuthToken(response.token);
      this.setRefreshToken(response.refreshToken);
      this.setUserRole(userType);

      return response;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.handleRequest('/auth/logout', {
        method: 'POST',
      });
    } finally {
      this.clearAuth();
    }
  }

  public async getCurrentUser(): Promise<any> {
    return this.handleRequest('/auth/me');
  }

  // Restaurant methods
  public async getRestaurant(id: string): Promise<any> {
    return this.handleRequest(`/restaurants/${id}`);
  }

  public async getRestaurants(): Promise<any[]> {
    return this.handleRequest('/restaurants');
  }

  public async createRestaurant(data: any): Promise<any> {
    return this.handleRequest('/restaurants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public async updateRestaurant(id: string, data: any): Promise<any> {
    return this.handleRequest(`/restaurants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  public async deleteRestaurant(id: string): Promise<void> {
    return this.handleRequest(`/restaurants/${id}`, {
      method: 'DELETE',
    });
  }

  // Manager methods
  public async getManagerDashboard(): Promise<any> {
    return this.handleRequest('/managers/dashboard');
  }

  public async getManagerOrders(): Promise<any[]> {
    return this.handleRequest('/managers/orders');
  }

  public async updateOrderStatus(orderId: string, status: string): Promise<any> {
    return this.handleRequest(`/managers/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Owner methods
  public async getOwnerDashboard(): Promise<any> {
    return this.handleRequest('/owners/dashboard');
  }

  public async getRestaurantStats(restaurantId: string): Promise<any> {
    return this.handleRequest(`/owners/restaurants/${restaurantId}/stats`);
  }

  // Utility methods
  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getUserRole(): string | null {
    return this.userRole;
  }

  public getToken(): string | null {
    return this.token;
  }

  // For debugging
  public debugAuth(): { token: string | null; role: string | null; hasRefresh: boolean } {
    return {
      token: this.token,
      role: this.userRole,
      hasRefresh: !!this.refreshToken,
    };
  }
}

// Export singleton instance
export default ApiService.getInstance();