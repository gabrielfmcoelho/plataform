'use client';

import { useEffect, useState, useMemo } from 'react';
import { useOrganizationHubServices } from '@/hooks/useOrganzationHubServices';
import ServiceModal from '@/components/modals/ServiceModal';
import HubFilters from '@/components/filters/HubFilters';
import ServiceGroups from '@/components/sections/ServiceGroups';
import { HubService } from '@/types/service';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useAuth } from '@/contexts/AuthContext';

export default function HubContent() {  
  const { authUser, isAdmin, isAdminOrganization } = useAuth();
  const { services, setServices, loading, error } = useOrganizationHubServices();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubscribed, setFilterSubscribed] = useState<boolean | null>(null);
  const [selectedTag, setSelectedTag] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<HubService | null>(null);

  /*
  const tags = useMemo(
    () => ['all', ...new Set(services.map(service => service.tag))],
    [services]
  );
  */

  // Filtering logic extracted for clarity
  /*
  const filteredServices = useMemo(() => {
    return services
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
  }, [services, searchTerm, filterSubscribed, selectedTag]);
  */

  const groupedServices = useMemo(() => {
    return services.reduce((acc, service) => {
      const tag = service.status;
      if (!acc[tag]) acc[tag] = [];
      acc[tag].push(service);
      return acc;
    }, {} as Record<string, HubService[]>);
  }, [services]);

  const handleTogglePin = (serviceId: number) => {
    /*
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId
          ? { ...service, isPinned: !service.isPinned }
          : service
      )
    );
    */
  };

  const handleAddService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: HubService) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  
  const handleDeleteService = (serviceId: number) => {
    //setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
  };

  const handleSaveService = (service: HubService) => {
    if (editingService) {
      //setServices(prevServices =>
      //  prevServices.map(s => (s.id === service.id ? service : s))
      //);
    } else {
      //setServices(prevServices => [...prevServices, { ...service, id: String(Date.now()) }]);
    }
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <Error error={error} />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* You could also use Next.js Metadata API in the page file instead of a separate SEO component */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Hub de Aplicações</h1>
      </div>
      <p className="mb-6 text-gray-600">Gerencie seus serviços hospitalares</p>

      <HubFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        tags={['all']}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        filterSubscribed={filterSubscribed}
        onFilterChange={setFilterSubscribed}
      />

      <ServiceGroups
        groupedServices={groupedServices}
        onTogglePin={handleTogglePin}
        onEdit={handleEditService}
        onDelete={handleDeleteService}
      />

      {/*
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
        service={editingService}
      />
      */}
      
      <div className="border-b border-gray-200 my-8"></div>

      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Descubra Outras Soluções</h1>
      </div>
      <p className="mb-6 text-gray-600">Transforme sua operação</p>
    </div>
  );
}
