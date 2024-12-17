'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import DemoRequestModal from '@/components/DemoRequestModal';
import ServiceFeatureCard from '@/components/cards/ServiceFeatureCard';
import PartnerCard from '@/components/cards/PartnerCard';
import { useLandingData } from '@/hooks/useLandingData';
import { serviceIcons } from '@/lib/utils/serviceIcons';

export default function Landing() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { services, partners, loading, error } = useLandingData();

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

  const handleDemoRequest = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowDemoModal(true);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <main className="relative bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Solude Hub
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Plataforma integrada de soluções hospitalares que revoluciona a gestão clínica
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                href="/hub"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50"
              >
                Explorar Soluções
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <section aria-label="Nossos Serviços">
        {services.map((service, index) => (
          <ServiceFeatureCard
            key={service.id}
            service={service}
            index={index}
            onDemoRequest={handleDemoRequest}
          />
        ))}
      </section>

      {/* Partners Section */}
      <section aria-label="Parceiros" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Parceiros de Confiança</h2>
            <p className="mt-4 text-xl text-gray-600">
              Instituições que confiam em nossas soluções para transformar a saúde
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      <DemoRequestModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        serviceName={selectedService || ''}
      />
    </div>
  );
}