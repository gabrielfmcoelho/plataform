'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface ServiceMetrics {
  totalTimeSpent: number;
  averageSessionDuration: number;
  totalSessions: number;
  lastAccess: Date | null;
}

export function useServiceMetrics(serviceId: string) {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState<ServiceMetrics>({
    totalTimeSpent: 0,
    averageSessionDuration: 0,
    totalSessions: 0,
    lastAccess: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      loadMetrics();
    }
  }, [session, serviceId]);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      // In production, fetch from API
      const mockMetrics = {
        totalTimeSpent: Math.floor(Math.random() * 1000),
        averageSessionDuration: Math.floor(Math.random() * 60),
        totalSessions: Math.floor(Math.random() * 100),
        lastAccess: new Date(),
      };
      setMetrics(mockMetrics);
    } catch (err) {
      setError('Failed to load service metrics');
      console.error('Error loading service metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  return { metrics, loading, error };
}