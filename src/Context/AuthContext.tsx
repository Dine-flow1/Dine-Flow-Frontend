"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

export interface User {
  displayName: any;
  lastName: string;
  firstName: string;
  _id: string;
  fullName: string;
  // keep `name` for components that expect `user.name`
  name?: string;
  email: string;
  role: 'customer' | 'owner' | 'admin';
  restaurantId?: string;
}

interface AuthContextType {
  user: User | null;
  setCurrentUser: any;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: any) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  isOwner: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create a provider component that can handle server-side rendering
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = typeof window !== "undefined" ? localStorage.getItem('currentUser') : null;
    if (user) {
      try {
        const parsed = JSON.parse(user);
        // normalize shape: ensure `name` exists for UI components
        if (parsed && !parsed.name && parsed.fullName) {
          parsed.name = parsed.fullName;
        }
        setCurrentUser(parsed);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
      }
    }
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    // If an authenticated user already stored, reuse it
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem('currentUser');
      const storedToken = localStorage.getItem('token');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // ensure `name` exists
          if (!parsed.name && parsed.fullName) parsed.name = parsed.fullName;
          // ensure role defaults to 'customer' when missing
          parsed.role = parsed.role || 'customer';
          setCurrentUser(parsed);
          return parsed;
        } catch {
          // fall through to create mock user
        }
      }

      // NOTE: replace this with real API call in production
      const mockUser: User = {
        _id: 'user_' + Date.now(),
        fullName: email.split('@')[0],
        name: email.split('@')[0],
        email,
        role: 'customer',
        displayName: undefined,
        lastName: '',
        firstName: ''
      };

      setCurrentUser(mockUser);
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      // preserve or set token
      if (!storedToken) localStorage.setItem('token', 'mock-token-' + Date.now());
      return mockUser;
    }

    // On server (should not normally reach here in client usage)
    throw new Error('Login must be called on the client');
  };

  const register = async (userData: any): Promise<User> => {
    // Mock registration
    const user: User = {
      _id: `user_${Date.now()}`,
      fullName: userData.fullName,
      name: userData.fullName,
      email: userData.email,
      role: userData.role || 'customer',
      restaurantId: userData.restaurantId,
      displayName: undefined,
      lastName: '',
      firstName: ''
    };
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    // store a token as if returned by API
    localStorage.setItem('token', 'mock-token-' + Date.now());
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  const value = {
    user: currentUser,
    setCurrentUser,
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
    isOwner: currentUser?.role === 'owner',
    isCustomer: currentUser?.role === 'customer'
  };

  // Don't render children until auth state is initialized
  if (!isInitialized) {
    return (
      <AuthContext.Provider value={value}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}