'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storeTokensInCookies, removeTokensFromCookies, getAccessToken } from '@/lib/utils/cookies';
import { loginUser, loginGuestUser } from '@/services/api';
import { jwtDecode } from 'jwt-decode'; // optional, if you want to parse user data from the token

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  /**
   * Attempt to decode the token if present in cookies on initial load.
   */
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Here you can store user info from the token’s payload
        // e.g. decoded.email, decoded.role, etc.
        setUser({
          email: decoded.email,
          role: decoded.role,
        });
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }, []);

  /**
   * Login with email & password using the backend.
   */
  const login = async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    const tokens = response.data;
    storeTokensInCookies(tokens);

    // Optionally decode and store user info in state
    const decoded: any = jwtDecode(tokens.accessToken);
    setUser({
      email: decoded.email,
      role: decoded.role,
    });
  };

  /**
   * Login as guest using the backend.
   */
  const loginAsGuest = async () => {
    const response = await loginGuestUser();
    const tokens = response.data;
    storeTokensInCookies(tokens);

    // Optionally decode and store user info in state
    const decoded: any = jwtDecode(tokens.accessToken);
    setUser({
      email: decoded.email, // might be a placeholder
      role: decoded.role || 'guest',
    });
  };

  /**
   * Logout and remove tokens.
   */
  const logout = () => {
    removeTokensFromCookies();
    setUser(null);
  };

  /**
   * If you store `role` in your JWT, use that.
   */
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginAsGuest,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
