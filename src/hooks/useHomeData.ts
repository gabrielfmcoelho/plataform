import { useState, useEffect } from 'react';
import { getApplicationServices } from '../services/application-services';
import type { ApplicationService } from '../types/service';

export function useHomeData() {
  const [services, setServices] = useState<ApplicationService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
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
    }

    fetchData();
  }, []);

  return { services, loading, error };
}