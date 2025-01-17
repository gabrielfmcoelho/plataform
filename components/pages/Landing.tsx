'use client';

import { useState } from 'react';
import DemoRequestModal from '@/components/DemoRequestModal';
import { useLandingData } from '@/hooks/useLandingData';
import PartnersSection from '@/components/sections/Partners';
import ServiceLandingGroups from '@/components/sections/ServiceLandingGroups';
import CTASection from '@/components/sections/CTA';
import HeroSection from '@/components/sections/Hero';
import Error from '@/components/Error';

export default function Landing() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { loading, marketingServices, partners, error } = useLandingData();

  if (error) {
    return (
      <Error error={error} />
    );
  }

  const handleDemoRequest = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowDemoModal(true);
  };
  const handleCloseDemoModal = () => {
    setSelectedService(null);
    setShowDemoModal(false);
  };

  return (
    <div className="bg-white">
      <HeroSection 
        title='Solude Hub' 
        subtitle='Plataforma integrada de soluções hospitalares que revoluciona a gestão clínica'
        callToAction='Explorar Soluções'
        ctaHref='/hub'
      />
      <ServiceLandingGroups loading={loading} services={marketingServices} handleServiceClick={handleDemoRequest} />
      <PartnersSection loading={loading} partners={partners} />
      <CTASection
        calling='Vamos Transformar a Saúde hoje ?'
        description='Descubra como nossas soluções podem beneficiar a transformação e gestão da sua instituição'
        callToAction='Agendar Demonstração'
        onDemoRequest={() => setShowDemoModal(true)}
      />

      <DemoRequestModal
        isOpen={showDemoModal}
        onClose={handleCloseDemoModal}
        serviceName={selectedService || 'Solude Health Tech'}
      />
    </div>
  );
}