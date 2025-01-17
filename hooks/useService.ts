'use client';

import { useState, useEffect } from 'react';
import { getOrganizationHubServices } from '@/services/api';
import type { HubService } from '@/types/service';

export function useService() {
  const [service, setService] = useState<HubService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadService = async () => {
    try {
      setLoading(true);
      const response = await getOrganizationHubServices();
      setService(response.data);
    } catch (err) {
      setError('Falha em carregar o serviço'); 
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    service,
    setService,
    loading,
    error,
    refreshServices: loadService,
  };
}
