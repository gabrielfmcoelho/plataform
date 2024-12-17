'use client';

import { useState, useEffect } from 'react';
import { getPartners, getCompanyServices, getApplicationServices } from '@/services/api';
import type { Partner } from '@/types/partner';
import type { CompanyService, ApplicationService } from '@/types/service';

export function useCompanyData() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [companyServices, setCompanyServices] = useState<CompanyService[]>([]);
  const [applicationServices, setApplicationServices] = useState<ApplicationService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [partnersRes, companyServicesRes, applicationServicesRes] = await Promise.all([
          getPartners(),
          getCompanyServices(),
          getApplicationServices(),
        ]);

        setPartners(partnersRes.data);
        setCompanyServices(companyServicesRes.data);
        setApplicationServices(applicationServicesRes.data);
      } catch (err) {
        setError('Failed to load company data');
        console.error('Error loading company data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    partners,
    companyServices,
    applicationServices,
    loading,
    error,
  };
}