'use client';

import { useState, useEffect } from 'react';
import { getServiceApplication } from '@/services/api';
import type { ServiceApplication } from '@/types/service';

export function useService(serviceId: number) {
  const [serviceApplication, setServiceApplication] = useState<ServiceApplication|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadService = async () => {
    try {
      setLoading(true);
      const response = await getServiceApplication(serviceId);
      setServiceApplication(response.data);
    } catch (err) {
      setError('Falha em carregar o serviço'); 
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    serviceApplication,
    setServiceApplication,
    loading,
    error,
    refreshServices: loadService,
  };
}
