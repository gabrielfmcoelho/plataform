'use client';

import { useState, useEffect } from 'react';
import { getOrganizationHubServices } from '@/services/api';
import type { HubService } from '@/types/service';

export function useOrganizationHubServices() {
  const [services, setServices] = useState<HubService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await getOrganizationHubServices();
      setServices(response.data);
    } catch (err) {
      setError('Failed to load services');
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    setServices,
    loading,
    error,
    refreshServices: loadServices,
  };
}
