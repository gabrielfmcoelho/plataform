import { apiRequest } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { mockApplicationsServices } from '../data/services';
import type { ApplicationService } from '../types/service';
import type { ApiResult } from '../types/api';

export async function getApplicationServices(): ApiResult<ApplicationService[]> {
  try {
    return await apiRequest<ApplicationService[]>(API_ENDPOINTS.APPLICATION_SERVICES);
  } catch (error) {
    console.warn('Failed to fetch application services, using mock data:', error);
    return { data: mockApplicationsServices, status: 200 };
  }
}

export async function getApplicationService(id: number): ApiResult<ApplicationService> {
  try {
    return await apiRequest<ApplicationService>(`${API_ENDPOINTS.APPLICATION_SERVICES}/${id}`);
  } catch (error) {
    console.warn(`Failed to fetch application service ${id}, using mock data:`, error);
    const service = mockApplicationsServices.find(s => s.id === id);
    if (!service) throw new Error('Application service not found');
    return { data: service, status: 200 };
  }
}

export async function createApplicationService(
  service: Omit<ApplicationService, 'id'>
): ApiResult<ApplicationService> {
  try {
    return await apiRequest<ApplicationService>(API_ENDPOINTS.APPLICATION_SERVICES, {
      method: 'POST',
      body: JSON.stringify(service),
    });
  } catch (error) {
    console.warn('Failed to create application service, using mock implementation:', error);
    const newService = { ...service, id: Date.now().toString() };
    return { data: newService, status: 201 };
  }
}

export async function updateApplicationService(
  service: ApplicationService
): ApiResult<ApplicationService> {
  try {
    return await apiRequest<ApplicationService>(
      `${API_ENDPOINTS.APPLICATION_SERVICES}/${service.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(service),
      }
    );
  } catch (error) {
    console.warn('Failed to update application service, using mock implementation:', error);
    return { data: service, status: 200 };
  }
}

export async function deleteApplicationService(id: string): ApiResult<void> {
  try {
    return await apiRequest<void>(`${API_ENDPOINTS.APPLICATION_SERVICES}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.warn('Failed to delete application service, using mock implementation:', error);
    return { data: undefined, status: 204 };
  }
}