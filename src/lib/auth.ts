// lib/auth.ts
export interface AuthData {
  isAuthenticated: boolean;
  role: string;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}

export const checkAuth = async (): Promise<AuthData> => {
  // Simulate API call - replace with actual auth check
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        resolve({
          isAuthenticated: true,
          role: 'owner',
          user: {
            id: '1',
            email: 'admin@saaskit.com',
            name: 'Admin User'
          }
        });
      } else {
        resolve({
          isAuthenticated: false,
          role: '',
          user: null
        });
      }
    }, 500);
  });
};

export const login = async (email: string, password: string): Promise<boolean> => {
  // Simulate login API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'admin@saaskit.com' && password === 'password') {
        localStorage.setItem('auth_token', 'demo_token');
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000);
  });
};

export const logout = (): void => {
  localStorage.removeItem('auth_token');
  window.location.href = '/login';
};