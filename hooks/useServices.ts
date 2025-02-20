'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getApplicationServices } from '@/services/application-services';
import type { Service } from '@/types/service';

export function useServices() {
  const { data: session } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await getApplicationServices();
      setServices(response.data);
    } catch (err) {
      setError('Failed to load services');
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      const newService = {
        ...service,
        id: Date.now().toString(),
        lastUpdate: new Date().toISOString(),
      };
      setServices(prev => [...prev, newService]);
      return newService;
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  };

  const editService = async (service: Service) => {
    try {
      setServices(prev => prev.map(s => s.id === service.id ? service : s));
      return service;
    } catch (error) {
      console.error('Error editing service:', error);
      throw error;
    }
  };

  const removeService = async (id: string) => {
    try {
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error removing service:', error);
      throw error;
    }
  };

  return {
    services,
    setServices,
    loading,
    error,
    addService,
    editService,
    removeService,
    refreshServices: loadServices,
  };
}
