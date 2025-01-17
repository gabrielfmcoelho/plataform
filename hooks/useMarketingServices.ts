'use client';

import { useState, useEffect } from 'react';
import { getMarketingServices } from '@/services/api';
import type { MarketingService } from '@/types/service';

export function useMarketingServices() {
  const [marketingServices, setMarketingServices] = useState<MarketingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMarketingServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMarketingServices = async () => {
    try {
      setLoading(true);
      const response = await getMarketingServices();
      setMarketingServices(response.data);
    } catch (err) {
      setError('Failed to load services');
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    marketingServices,
    setMarketingServices,
    loading,
    error,
    refreshServices: loadMarketingServices,
  };
}
