import { apiRequest } from '@/lib/utils/api';
import { API_ENDPOINTS } from '@/config/api';
import { mockApplicationsServices } from '@/data/services';
import type { ApplicationService } from '@/types/service';
import type { ApiResponse } from '@/types/api';

export async function getApplicationServices(): Promise<ApiResponse<ApplicationService[]>> {
  try {
    return await apiRequest<ApplicationService[]>(API_ENDPOINTS.APPLICATION_SERVICES);
  } catch (error) {
    console.warn('Failed to fetch application services, using mock data:', error);
    return { data: mockApplicationsServices, status: 200 };
  }
}

export async function getApplicationService(id: number): Promise<ApiResponse<ApplicationService>> {
  try {
    return await apiRequest<ApplicationService>(`${API_ENDPOINTS.APPLICATION_SERVICES}/${id}`);
  } catch (error) {
    console.warn(`Failed to fetch application service ${id}, using mock data:`, error);
    const service = mockApplicationsServices.find(s => s.id === id);
    if (!service) throw new Error('Application service not found');
    return { data: service, status: 200 };
  }
}