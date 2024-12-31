'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
