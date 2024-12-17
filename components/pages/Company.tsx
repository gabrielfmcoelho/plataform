'use client';

import { useState, useEffect } from 'react';
import { mockApplicationsServices } from '@/services/services'; 
import HeroSection from '@/components/sections/HeroSection';
import OurWorkSection from '@/components/sections/OurWorkSection';
import AboutUsSection from '@/components/sections/AboutUsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PartnersSection from '@/components/sections/PartnersSection';
import CTASection from '@/components/sections/CTASection';
import DemoRequestModal from '@/components/DemoRequestModal';
import type { ApplicationService, CompanyService, Partner } from '@/types/service';

interface CompanyProps {
  partners: Partner[];
  companyServices: CompanyService[];
}

export default function Company({ partners, companyServices }: CompanyProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [applicationServices, setApplicationServices] = useState<ApplicationService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadApplicationServices();
  }, []);

  async function loadApplicationServices() {
    try {
      // If you have a `getApplicationServices` function:
      const res = await getApplicationServices(); 
      setApplicationServices(res.data);
    } catch (err) {
      console.error('Failed to fetch application services, using mock data:', err);
      setApplicationServices(mockApplicationsServices);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <HeroSection />
      <OurWorkSection services={applicationServices} />
      <AboutUsSection />
      <ServicesSection services={companyServices} />
      <PartnersSection partners={partners} />
      <CTASection onDemoRequest={() => setShowDemoModal(true)} />

      <DemoRequestModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        serviceName="Solude Health Tech"
      />
    </div>
  );
}
