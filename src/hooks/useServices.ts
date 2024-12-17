import { useState, useEffect } from 'react';
import { Service } from '../types';
import { fetchServices, createService, updateService, deleteService } from '../api/services';
import { useToast } from './useToast';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await fetchServices();
      setServices(data);
    } catch (error) {
      showToast('Error loading services', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      const newService = await createService(service);
      setServices(prev => [...prev, newService]);
      showToast('Service created successfully', 'success');
      return newService;
    } catch (error) {
      showToast('Error creating service', 'error');
      throw error;
    }
  };

  const editService = async (service: Service) => {
    try {
      const updatedService = await updateService(service);
      setServices(prev => prev.map(s => s.id === service.id ? updatedService : s));
      showToast('Service updated successfully', 'success');
      return updatedService;
    } catch (error) {
      showToast('Error updating service', 'error');
      throw error;
    }
  };

  const removeService = async (id: string) => {
    try {
      await deleteService(id);
      setServices(prev => prev.filter(s => s.id !== id));
      showToast('Service deleted successfully', 'success');
    } catch (error) {
      showToast('Error deleting service', 'error');
      throw error;
    }
  };

  return {
    services,
    loading,
    addService,
    editService,
    removeService,
    refreshServices: loadServices,
  };
}