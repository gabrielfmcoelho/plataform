import { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DemoRequestModal from '../components/DemoRequestModal';
import SEO from '../components/SEO';
import { useAuth } from '../contexts/AuthContext';
import { useLandingData } from '../hooks/useLandingData';

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(true);
  };

  const handleExploreServices = () => {
    if (user) {
      navigate('/hub');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-white">
      <SEO
        title="Soluções Hospitalares Integradas"
        description="Plataforma integrada de soluções hospitalares que revoluciona a gestão clínica, combinando inteligência artificial, automação e análise avançada."
      />
      
      {/* Hero Section */}
      <main className="relative bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Solude Hub
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Plataforma integrada de soluções hospitalares que revoluciona a gestão clínica,
              combinando inteligência artificial, automação e análise avançada para
              transformar dados em resultados excepcionais.
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <button
                onClick={handleExploreServices}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
              >
                Explorar Soluções
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <section aria-label="Nossos Serviços">
        {services.map((service, index) => (
          <article key={service.id} className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                <div className={`mb-12 lg:mb-0 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center space-x-3 mb-6">
                    <service.icon className="h-8 w-8 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">{service.name}</h2>
                  </div>
                  <p className="text-xl font-semibold text-blue-600 mb-4">{service.tagline}</p>
                  <p className="text-gray-600 mb-8">{service.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefícios Comprovados</h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recursos Principais</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2 text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleDemoRequest(service.name)}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Agendar Demonstração
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={service.screenshot}
                      alt={`${service.name} interface`}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
            </div>
          </article>
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
              <div
                key={partner.name}
                className="col-span-1 flex justify-center items-center py-8 px-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  className="max-h-12 object-contain"
                  src={partner.logo}
                  alt={partner.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section aria-label="Contato" className="bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Pronto para transformar</span>
            <span className="block text-blue-200">sua gestão hospitalar?</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => handleDemoRequest('Solude Hub')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-colors"
              >
                Fale com um Especialista
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Modal */}
      <DemoRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService || ''}
      />
    </div>
  );
}