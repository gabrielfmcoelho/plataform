'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface ServiceSession {
  serviceId: string;
  startTime: Date;
}

export function useServiceTracking() {
  const { data: session } = useSession();
  const [activeSessions, setActiveSessions] = useState<ServiceSession[]>([]);

  const startServiceSession = (serviceId: string) => {
    if (!session?.user) return;

    const newSession: ServiceSession = {
      serviceId,
      startTime: new Date(),
    };

    setActiveSessions(prev => [...prev, newSession]);
    logServiceAction(serviceId, 'login');
  };

  const endServiceSession = (serviceId: string) => {
    if (!session?.user) return;

    setActiveSessions(prev => {
      const session = prev.find(s => s.serviceId === serviceId);
      if (session) {
        const duration = new Date().getTime() - session.startTime.getTime();
        saveServiceUsage(serviceId, session.startTime, duration);
      }
      return prev.filter(s => s.serviceId !== serviceId);
    });

    logServiceAction(serviceId, 'logout');
  };

  const saveServiceUsage = async (serviceId: string, startTime: Date, duration: number) => {
    if (!session?.user) return;

    try {
      await fetch('/api/usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          serviceId,
          startTime: startTime.toISOString(),
          endTime: new Date().toISOString(),
          duration,
        }),
      });
    } catch (error) {
      console.error('Failed to save service usage:', error);
    }
  };

  const logServiceAction = async (serviceId: string, action: 'login' | 'logout') => {
    if (!session?.user) return;

    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          userName: session.user.name,
          serviceId,
          action,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to log service action:', error);
    }
  };

  useEffect(() => {
    return () => {
      activeSessions.forEach(session => {
        endServiceSession(session.serviceId);
      });
    };
  }, []);

  return {
    startServiceSession,
    endServiceSession,
  };
}