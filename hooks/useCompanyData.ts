'use client';

import { useState, useEffect } from 'react';
import { getPartners, getCompanyServices } from '@/services/api';
import type { Partner } from '@/types/partner';
import type { CompanyService } from '@/types/service';

export function useCompanyData() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [companyServices, setCompanyServices] = useState<CompanyService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [partnersRes, companyServicesRes] = await Promise.all([
          getPartners(),
          getCompanyServices(),
        ]);
        setPartners(partnersRes.data);
        setCompanyServices(companyServicesRes.data);
      } catch (err) {
        setError('Failed to load company data');
        console.error('Error loading company data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { loading, partners, companyServices, error };
}