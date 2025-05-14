import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(defaultAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on component mount
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth) as AuthState;
        setAuth(parsedAuth);
      } catch (e) {
        console.error('Failed to parse stored auth data', e);
        localStorage.removeItem('auth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Simulate API call
      // In a real app, this would be a fetch to your backend
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock successful login for demo purposes
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0],
          email,
        };
        
        const newAuthState: AuthState = {
          user: mockUser,
          isAuthenticated: true,
          token: 'mock-jwt-token',
        };
        
        setAuth(newAuthState);
        localStorage.setItem('auth', JSON.stringify(newAuthState));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      if (name && email && password) {
        const mockUser: User = {
          id: '1',
          name,
          email,
        };
        
        const newAuthState: AuthState = {
          user: mockUser,
          isAuthenticated: true,
          token: 'mock-jwt-token',
        };
        
        setAuth(newAuthState);
        localStorage.setItem('auth', JSON.stringify(newAuthState));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuth(defaultAuthState);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};