'use client';

import { useState } from 'react';
import DemoRequestModal from '@/components/DemoRequestModal';
import TeamNewsCard from '@/components/cards/TeamNewsCard';
import { useAboutData } from '@/hooks/useAboutData';
import HeroSection from '@/components/sections/Hero';
import OurTeamSection from '@/components/sections/OurTeam';
import TeamNewsSection from '@/components/sections/TeamNews';
import PartnersSection from '@/components/sections/Partners';
import CTASection from '@/components/sections/CTA';
import Error from '@/components/Error';


export default function About() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { teamMembers, teamNews, partners, loading, error } = useAboutData();

  if (error) {
    return (
      <Error error={error} />
    );
  }

  return (
    <div className="bg-white">
      <HeroSection 
        title='Sobre a Solude' 
        subtitle='Transformando a saúde através de soluções tecnológicas inovadoras'
        ctaHref='#'
      />
      <OurTeamSection loading={loading} teamMembers={teamMembers} />
      <TeamNewsSection loading={loading} teamMembers={teamMembers} teamNews={teamNews} />
      <PartnersSection loading={loading} partners={partners} />
      <CTASection
        calling='Pronto para Transformarmos a Saúde juntos?'
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