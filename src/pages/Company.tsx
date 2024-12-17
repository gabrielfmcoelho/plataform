import { ArrowRight, Users, Briefcase, Lightbulb, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DemoRequestModal from '../components/DemoRequestModal';
import { useCompanyData } from '../hooks/useCompanyData';
import { useState } from 'react';

export default function Company() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { partners, companyServices, applicationServices, loading, error } = useCompanyData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
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
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Transformando Dados em Saúde
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Soluções tecnológicas inovadoras para gestão hospitalar eficiente
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
              >
                Conheça Nossas Soluções
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Our Work Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nosso Trabalho</h2>
              <p className="text-xl text-gray-600">
                {applicationServices[0]?.description || 
                  'A Solude Health Tech oferece uma série de produtos e serviços que auxiliam instituições de saúde.'}
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop"
                alt="Nossa equipe trabalhando"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-blue-900 opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
                alt="Nossa missão"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-blue-900 opacity-10 rounded-lg"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Quem Somos</h2>
              <p className="text-xl text-gray-600">
                Health Tech com o propósito de ajudar gestores na tomada de decisões baseadas na organização e visualização dos dados de Saúde, gerando eficiência na saúde e no uso e captação de recursos financeiros.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nossos Serviços</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyServices.map((service) => (
              <div key={service.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Ver Todos os Serviços
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nossos Parceiros</h2>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="col-span-1 flex justify-center items-center py-8 px-8 bg-gray-50 rounded-lg"
              >
                <img
                  className="max-h-12"
                  src={partner.logo}
                  alt={partner.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book a Talk Section */}
      <div className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Agende uma Conversa</h2>
            <p className="mt-4 text-xl text-blue-100">
              Descubra como podemos transformar a gestão da sua instituição
            </p>
            <button
              onClick={() => setShowDemoModal(true)}
              className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50"
            >
              Agendar Demonstração
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <DemoRequestModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        serviceName="Solude Health Tech"
      />
    </div>
  );
}