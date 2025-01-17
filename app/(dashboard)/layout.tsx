'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/Loading';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is not found, redirect to login
    if (!authUser) {
      router.push('/login');
    }
  }, [authUser, router]);

  // Optional loading indicator if the user is not yet resolved
  if (!authUser) {
    return (<Loading />);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
    </div>
  );
}
