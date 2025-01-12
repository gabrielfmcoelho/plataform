'use client';

import { useState } from 'react';

import HeroSection from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/Services';
import PartnersSection from '@/components/sections/Partners';
import CTASection from '@/components/sections/CTA';
import Error from '@/components/Error';
import GenericSection from '@/components/sections/Generic';
import { OurWork } from '@/data/sections/ourWork';
import { AboutUs } from '@/data/sections/aboutUs';

import DemoRequestModal from '@/components/DemoRequestModal';
import { useCompanyData } from '@/hooks/useCompanyData';

export default function Company() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { loading, partners, companyServices, error } = useCompanyData();

  if (error) {
    return (
      <Error error={error} />
    );
  }

  return (
    <div className="bg-white">
      <HeroSection 
        title='Transformando Dados em Saúde' 
        subtitle='Soluções tecnológicas inovadoras para gestão hospitalar eficiente'
        callToAction='Conheça Nossas Soluções'
        ctaHref='/services'
      />
      <GenericSection
        title={OurWork.title}
        description={OurWork.description}
        imgAlt={OurWork.imgAlt}
        backgroundType={1}
      />
      <GenericSection
        title={AboutUs.title}
        description={AboutUs.description}
        imgAlt={AboutUs.imgAlt}
        backgroundType={0}
        inverted
      />
      <ServicesSection 
        loading={loading}
        companyServices={companyServices}
      />
      <PartnersSection
        loading={loading}
        partners={partners}
      />
      <CTASection
        calling='Agende uma Conversa'
        description='Descubra como nossas soluções podem beneficiar a transformação e gestão da sua instituição'
        callToAction='Agendar Demonstração'
        onDemoRequest={() => setShowDemoModal(true)}
      />

      <DemoRequestModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        serviceName="Solude Health Tech"
      />
    </div>
  );
}
