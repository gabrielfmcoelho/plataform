import { useState, useEffect } from 'react';
import { getApplicationService } from '../services/application-services';
import type { ApplicationService } from '../types/service';

export function useServiceDetail(serviceId: string) {
  const [service, setService] = useState<ApplicationService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getApplicationService(parseInt(serviceId));
        setService(response.data);
      } catch (err) {
        setError('Failed to load service details');
        console.error('Error loading service details:', err);
      } finally {
        setLoading(false);
      }
    }

    if (serviceId) {
      fetchData();
    }
  }, [serviceId]);

  return { service, loading, error };
}