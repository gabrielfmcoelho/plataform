import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import type { Service } from '../types';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';
import { Plus, ChevronDown } from 'lucide-react';
import { useHomeData } from '../hooks/useHomeData';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubscribed, setFilterSubscribed] = useState<boolean | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { services, loading, error } = useHomeData();

  useEffect(() => {
    if (!user) {
      navigate('/services');
    }
  }, [user, navigate]);

  const handleTogglePin = (serviceId: string) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId
          ? { ...service, isPinned: !service.isPinned }
          : service
      )
    );
  };

  const handleAddService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
  };

  const handleSaveService = (service: Service) => {
    if (editingService) {
      setServices(prevServices =>
        prevServices.map(s => (s.id === service.id ? service : s))
      );
    } else {
      setServices(prevServices => [...prevServices, { ...service, id: String(Date.now()) }]);
    }
    setIsModalOpen(false);
  };

  const tags = ['all', ...new Set(services.map(service => service.tag))];

  const filteredServices = services
    .filter((service) => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterSubscribed === null || service.isSubscribed === filterSubscribed;
      const matchesTag = selectedTag === 'all' || service.tag === selectedTag;
      return matchesSearch && matchesFilter && matchesTag;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  const groupedServices = filteredServices.reduce((acc, service) => {
    const tag = service.tag;
    if (!acc[tag]) {
      acc[tag] = [];
    }
    acc[tag].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  if (!user) {
    return null;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title="Hub de Serviços"
        description="Gerencie e descubra serviços hospitalares integrados. Acesse nossa plataforma centralizada para otimizar a gestão hospitalar."
      />
      
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Hub de Serviços</h1>
          <button
            onClick={handleAddService}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Serviço
          </button>
        </div>
        <p className="mt-2 text-gray-600">Gerencie e descubra serviços hospitalares</p>
      </div>

      <section aria-label="Filtros de Busca" className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar serviços..."
          aria-label="Buscar serviços"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="relative">
          <select
            className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag === 'all' ? 'All Categories' : tag}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>

        <select aria-label="Filtrar por status"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filterSubscribed === null ? '' : filterSubscribed.toString()}
          onChange={(e) => setFilterSubscribed(e.target.value === '' ? null : e.target.value === 'true')}
        >
          <option value="">Todos os Serviços</option>
          <option value="true">Assinados</option>
          <option value="false">Não Assinados</option>
        </select>
      </section>

      {Object.entries(groupedServices).map(([tag, services]) => (
        <section key={tag} aria-label={`Serviços ${tag}`} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{tag}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onTogglePin={handleTogglePin}
                onEdit={() => handleEditService(service)}
                onDelete={() => handleDeleteService(service.id)}
              />
            ))}
          </div>
        </section>
      ))}

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
        service={editingService}
      />
    </div>
  );
}