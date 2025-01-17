'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storeTokensInCookies, removeTokensFromCookies, getAccessToken } from '@/lib/utils/cookies';
import { loginUser, loginGuestUser } from '@/services/api';
import { jwtDecode } from 'jwt-decode'; // optional, if you want to parse user data from the token
import { AuthUser } from '@/types/user';
import { LoginResponse } from '@/types/api';
interface AuthContextType {
  authUser: AuthUser;
  login: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isAdminOrganization: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function storeDecodedUser(token: string, setAuthUser: (user: AuthUser) => void) {
  try{
    const decoded: any = jwtDecode(token);
    setAuthUser({
      id: decoded.user_id,
      roleId: decoded.user_role_id,
      email: decoded.sub,
      organizationId: decoded.organization_id,
      organizationRoleId: decoded.organization_role_id,
      organizationName: decoded.organization_name
    });
  } catch (error) {
    console.error('Failed to decode token', error);
  }
}

function handleLoginResponse(tokens: LoginResponse, setUser: (user: AuthUser) => void) {
  storeTokensInCookies(tokens);
  storeDecodedUser(tokens.accessToken, setUser);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<any>(null);

  /**
   * Attempt to decode the token if present in cookies on initial load.
   */
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      storeDecodedUser(accessToken, setAuthUser);
    }
  }, []);

  /**
   * Login with email & password using the backend.
   */
  const login = async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    handleLoginResponse(response.data, setAuthUser);
  };

  /**
   * Login as guest using the backend.
   */
  const loginAsGuest = async () => {
    const response = await loginGuestUser();
    handleLoginResponse(response.data, setAuthUser);
  };

  /**
   * Logout and remove tokens.
   */
  const logout = () => {
    removeTokensFromCookies();
    setAuthUser(null);
  };

  /**
   * If you store `role` in easy to access format, can check if the user or organization is admin.
   */
  const isAdmin = authUser?.roleId === 1;
  const isAdminOrganization = authUser?.organizationRoleId === 1;

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login,
        loginAsGuest,
        logout,
        isAdmin,
        isAdminOrganization
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
