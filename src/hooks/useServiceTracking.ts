import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { ServiceSession } from '../types';

export function useServiceTracking() {
  const { user } = useAuth();
  const [activeSessions, setActiveSessions] = useState<ServiceSession[]>([]);

  const startServiceSession = (serviceId: string) => {
    if (!user) return;

    const newSession: ServiceSession = {
      serviceId,
      startTime: new Date(),
    };

    setActiveSessions(prev => [...prev, newSession]);
    logServiceAction(serviceId, 'login');
  };

  const endServiceSession = (serviceId: string) => {
    if (!user) return;

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

  const saveServiceUsage = (serviceId: string, startTime: Date, duration: number) => {
    if (!user) return;

    const usage = {
      id: Date.now().toString(),
      serviceId,
      userId: user.id,
      startTime: startTime.toISOString(),
      endTime: new Date().toISOString(),
      duration,
    };

    // In a real app, this would be an API call
    console.log('Saving service usage:', usage);
  };

  const logServiceAction = (serviceId: string, action: 'login' | 'logout') => {
    if (!user) return;

    const log = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      service: serviceId,
      timestamp: new Date().toISOString(),
      action: `Service ${action}`,
    };

    // In a real app, this would be an API call
    console.log('Logging service action:', log);
  };

  // Clean up sessions on unmount
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