import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import type { Service } from '../../types';
import ServiceModal from '../ServiceModal';
import ServiceCard from '../ServiceCard';
import { APP_TEXTS } from '../../constants/texts';

interface ServicesTabProps {
  services: Service[];
  loading: boolean;
  onAddService: (service: Omit<Service, 'id'>) => Promise<Service>;
  onEditService: (service: Service) => Promise<Service>;
  onDeleteService: (id: string) => Promise<void>;
}

export default function ServicesTab({
  services,
  loading,
  onAddService,
  onEditService,
  onDeleteService,
}: ServicesTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleAddService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleSaveService = async (service: Service) => {
    try {
      if (editingService) {
        await onEditService(service);
      } else {
        await onAddService(service);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">{APP_TEXTS.COMMON.LOADING}</div>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={APP_TEXTS.SERVICES.SEARCH_PLACEHOLDER}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddService}
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {APP_TEXTS.SERVICES.ADD_SERVICE}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services
          .filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={() => handleEditService(service)}
              onDelete={() => onDeleteService(service.id)}
            />
          ))}
      </div>

      <ServiceModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveService}
        service={editingService}
      />
    </div>
  );
}