import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useServiceTracking } from '../hooks/useServiceTracking';
import type { Service } from '../types';
import { serviceIcons } from '../utils/serviceIcons';
import { useServiceDetail } from '../hooks/useServiceDetail';

const mockServices: Record<string, Service & { version: string; url: string }> = {
  'resistracker': {
    id: '1',
    name: 'Resistracker',
    description: 'Sistema de suporte à decisão clínica que gerencia a resistência bacteriana.',
    tag: 'Clinical',
    isSubscribed: true,
    lastUpdate: '2024-03-15',
    price: 299,
    version: '2.1.0',
    url: 'https://resistracker.solude.tech',
    icon: serviceIcons['Clinical'],
  },
  'exame-extractor': {
    id: '2',
    name: 'Exame Extractor',
    description: 'Simplifica e agiliza a coleta de dados laboratoriais.',
    tag: 'Laboratory',
    isSubscribed: true,
    lastUpdate: '2024-03-10',
    price: 199,
    version: '1.8.5',
    url: 'https://exameextractor.solude.tech',
    icon: serviceIcons['Laboratory'],
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { startServiceSession, endServiceSession } = useServiceTracking();
  const { service, loading, error } = useServiceDetail(serviceId || '');

  useEffect(() => {
    if (!user) {
      navigate('/services');
      return;
    }

    if (service) {
      startServiceSession(service.id);
      return () => endServiceSession(service.id);
    }
  }, [user, navigate, service]);

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

  if (!service || !user) {
    return null;
  }

  const Icon = serviceIcons[service.tag];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link
                  to="/hub"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Voltar
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Atualizado em {service.lastUpdate}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Tag className="h-4 w-4 mr-1" />
                  v{service.version}
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center space-x-3">
              <Icon className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-12rem)]">
          <iframe
            src={service.url}
            title={service.name}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
}