'use client';

import { useState, useEffect } from 'react';
import { getPartners, getApplicationServices } from '@/services/api';
import type { Partner } from '@/types/partner';
import type { ApplicationService } from '@/types/service';

export function useLandingData() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [services, setServices] = useState<ApplicationService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [partnersRes, servicesRes] = await Promise.all([
          getPartners(),
          getApplicationServices(),
        ]);
        setPartners(partnersRes.data);
        setServices(servicesRes.data);
      } catch (err) {
        setError('Failed to load landing page data');
        console.error('Error loading landing page data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, partners, services, error };
}