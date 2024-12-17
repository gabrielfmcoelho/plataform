import { apiRequest } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { mockCompanyServices } from '../data/services';
import type { CompanyService } from '../types/service';
import type { ApiResult } from '../types/api';

export async function getCompanyServices(): ApiResult<CompanyService[]> {
  try {
    return await apiRequest<CompanyService[]>(API_ENDPOINTS.COMPANY_SERVICES);
  } catch (error) {
    console.warn('Failed to fetch company services, using mock data:', error);
    return { data: mockCompanyServices, status: 200 };
  }
}

export async function getCompanyService(id: number): ApiResult<CompanyService> {
  try {
    return await apiRequest<CompanyService>(`${API_ENDPOINTS.COMPANY_SERVICES}/${id}`);
  } catch (error) {
    console.warn(`Failed to fetch company service ${id}, using mock data:`, error);
    const service = mockCompanyServices.find(s => s.id === id);
    if (!service) throw new Error('Company service not found');
    return { data: service, status: 200 };
  }
}

export async function createCompanyService(
  service: Omit<CompanyService, 'id'>
): ApiResult<CompanyService> {
  try {
    return await apiRequest<CompanyService>(API_ENDPOINTS.COMPANY_SERVICES, {
      method: 'POST',
      body: JSON.stringify(service),
    });
  } catch (error) {
    console.warn('Failed to create company service, using mock implementation:', error);
    const newService = { ...service, id: Date.now().toString() };
    return { data: newService, status: 201 };
  }
}

export async function updateCompanyService(
  service: CompanyService
): ApiResult<CompanyService> {
  try {
    return await apiRequest<CompanyService>(
      `${API_ENDPOINTS.COMPANY_SERVICES}/${service.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(service),
      }
    );
  } catch (error) {
    console.warn('Failed to update company service, using mock implementation:', error);
    return { data: service, status: 200 };
  }
}

export async function deleteCompanyService(id: string): ApiResult<void> {
  try {
    return await apiRequest<void>(`${API_ENDPOINTS.COMPANY_SERVICES}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.warn('Failed to delete company service, using mock implementation:', error);
    return { data: undefined, status: 204 };
  }
}