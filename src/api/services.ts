import { Service } from '../types';
import { mockServices } from '../data/mockData';

const API_BASE_URL = 'https://api.solude.tech';

export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) throw new Error('Failed to fetch services');
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch services, using mock data:', error);
    return mockServices;
  }
}

export async function createService(service: Omit<Service, 'id'>): Promise<Service> {
  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    if (!response.ok) throw new Error('Failed to create service');
    return await response.json();
  } catch (error) {
    console.warn('Failed to create service, using mock implementation:', error);
    return { ...service, id: Date.now().toString() };
  }
}

export async function updateService(service: Service): Promise<Service> {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${service.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    if (!response.ok) throw new Error('Failed to update service');
    return await response.json();
  } catch (error) {
    console.warn('Failed to update service, using mock implementation:', error);
    return service;
  }
}

export async function deleteService(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete service');
  } catch (error) {
    console.warn('Failed to delete service, using mock implementation:', error);
  }
}