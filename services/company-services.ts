import { apiRequest } from '@/lib/utils/api';
import { API_ENDPOINTS } from '@/config/api';
import { mockCompanyServices } from '@/data/services';
import type { CompanyService } from '@/types/service';
import type { ApiResponse } from '@/types/api';

export async function getCompanyServices(): Promise<ApiResponse<CompanyService[]>> {
  try {
    return await apiRequest<CompanyService[]>(API_ENDPOINTS.COMPANY_SERVICES);
  } catch (error) {
    console.warn('Failed to fetch company services, using mock data:', error);
    return { data: mockCompanyServices, status: 200 };
  }
}

export async function getCompanyService(id: number): Promise<ApiResponse<CompanyService>> {
  try {
    return await apiRequest<CompanyService>(`${API_ENDPOINTS.COMPANY_SERVICES}/${id}`);
  } catch (error) {
    console.warn(`Failed to fetch company service ${id}, using mock data:`, error);
    const service = mockCompanyServices.find(s => s.id === id);
    if (!service) throw new Error('Company service not found');
    return { data: service, status: 200 };
  }
}