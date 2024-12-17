  'use client';

  import { createContext, useContext, ReactNode } from 'react';
  import { useSession, signIn, signOut } from 'next-auth/react';

  interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    loginAsGuest: () => Promise<void>;
    logout: () => Promise<void>;
    isAdmin: boolean;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();

    const login = async (email: string, password: string) => {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/hub',
      });
    };

    const loginAsGuest = async () => {
      await signIn('credentials', {
        email: 'guest@example.com',
        password: 'guest',
        callbackUrl: '/hub',
      });
    };

    const logout = async () => {
      await signOut({ callbackUrl: '/' });
    };

    const isAdmin = session?.user?.role === 'admin';

    return (
      <AuthContext.Provider 
        value={{ 
          user: session?.user,
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