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
  const [selectedTag, setSelectedTag] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<HubService | null>(null);

  const tags = useMemo(() => {
    // Populate with unique tags from all services
    return Array.from(
      new Set(services.flatMap(service => service.tags)) // Flatten all tags and ensure uniqueness
    );
  }, [services]);

  // Filtering logic
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === 'all' || service.tags.includes(selectedTag); // Use `tags` array for filtering
      return matchesSearch && matchesTag;
    });
  }, [services, searchTerm, selectedTag]);

  // Group services by status
  const groupedServices = useMemo(() => {
    return filteredServices.reduce((acc, service) => {
      const status = service.status;
      if (!acc[status]) acc[status] = [];
      acc[status].push(service);
      return acc;
    }, {} as Record<string, HubService[]>);
  }, [filteredServices]);


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

  const handleEditService = (service: HubService) => {
    setEditingService(service);
    setIsModalOpen(true);
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
        tags={tags}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
      />

      <ServiceGroups
        groupedServices={groupedServices}
        onTogglePin={handleTogglePin}
        onEdit={handleEditService}
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
