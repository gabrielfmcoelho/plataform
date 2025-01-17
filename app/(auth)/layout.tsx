'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is logged in, redirect away from this auth page (e.g., to /hub)
    if (authUser) {
      router.push('/hub');
    }
  }, [authUser, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
