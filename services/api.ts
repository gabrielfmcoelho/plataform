import { apiRequest } from '@/lib/utils/api';
import { API_CONFIG, API_ENDPOINTS_CONFIG } from '@/config/api';
import { mockTeamMembers, mockTeamNews } from '@/data/team';
import { mockPartners } from '@/data/partners';
import { mockCompanyServices } from '@/data/services';
import type { ApiResponse, LoginRequest, LoginResponse } from '@/types/api';
import type { TeamMember, TeamNews } from '@/types/team';
import type { Partner } from '@/types/partner';
import type { ApplicationService, CompanyService, HubService, MarketingService, ServiceApplication } from '@/types/service';
import type { OrganizationMetrics } from '@/types/organazation-metrics';
import type { UserMetrics } from '@/types/user-metrics';
import type { User } from '@/types/user';
import { mockUsers } from '@/data/users';
import { mockOrganizationMetrics } from '@/data/organization-metrics';
import { getAccessToken } from '@/lib/utils/cookies';

export async function getTeamMembers(): Promise<ApiResponse<TeamMember[]>> {
  try {
    if (API_CONFIG.MOCK_ON_ERROR) {
      throw new Error('Mock error');
    }
    return await apiRequest<TeamMember[]>(`${API_ENDPOINTS_CONFIG.TEAM}/members`);
  } catch (error) {
    console.warn('Failed to fetch team members, using mock data:', error);
    return { data: mockTeamMembers, status: 200 };
  }
}

export async function getTeamNews(): Promise<ApiResponse<TeamNews[]>> {
  try {
    if (API_CONFIG.MOCK_ON_ERROR) {
      throw new Error('Mock error');
    }
    return await apiRequest<TeamNews[]>(`${API_ENDPOINTS_CONFIG.TEAM}/news`);
  } catch (error) {
    console.warn('Failed to fetch team news, using mock data:', error);
    return { data: mockTeamNews, status: 200 };
  }
}

export async function getPartners(): Promise<ApiResponse<Partner[]>> {
  try {
    if (API_CONFIG.MOCK_ON_ERROR) {
      throw new Error('Mock error');
    }
    return await apiRequest<Partner[]>(API_ENDPOINTS_CONFIG.PARTNERS);
  } catch (error) {
    console.warn('Failed to fetch partners, using mock data:', error);
    return { data: mockPartners, status: 200 };
  }
}

export async function getOrganizationHubServices(): Promise<ApiResponse<HubService[]>> {
  try {
    return await apiRequest<HubService[]>(API_ENDPOINTS_CONFIG.ORGANIZATION_HUB_SERVICES, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getAccessToken()
      }
    });
  } catch (error) {
    console.warn('Failed to fetch organization hub services', error);
    return { data: [], status: 500 };
  }
}

export async function getMarketingServices(): Promise<ApiResponse<MarketingService[]>> {
  try {
    return await apiRequest<MarketingService[]>(API_ENDPOINTS_CONFIG.MARKETING_SERVICES, {
      method: 'GET',
    });
  } catch (error) {
    console.warn('Failed to fetch marketing services', error);
    return { data: [], status: 500 };
  }
}

export async function getServiceApplication(serviceId: number): Promise<ApiResponse<ServiceApplication>> {
  try {
    return await apiRequest<ServiceApplication>(API_ENDPOINTS_CONFIG.SERVICE_APPLICATION.replace(`{serviceId}`, serviceId.toString()), {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getAccessToken()
      }
    });
  } catch (error) {
    console.warn('Failed to fetch application services', error);
    throw error
  }
}

export async function getCompanyServices(): Promise<ApiResponse<CompanyService[]>> {
  try {
    if (API_CONFIG.MOCK_ON_ERROR) {
      throw new Error('Mock error');
    }
    return await apiRequest<CompanyService[]>(API_ENDPOINTS_CONFIG.COMPANY_SERVICES);
  } catch (error) {
    console.warn('Failed to fetch company services, using mock data:', error);
    return { data: mockCompanyServices, status: 200 };
  }
}

export async function getCompanyService(id: number): Promise<ApiResponse<CompanyService>> {
  try {
    if (API_CONFIG.MOCK_ON_ERROR) {
      throw new Error('Mock error');
    }
    return await apiRequest<CompanyService>(`${API_ENDPOINTS_CONFIG.COMPANY_SERVICES}/${id}`);
  } catch (error) {
    console.warn(`Failed to fetch company service ${id}, using mock data:`, error);
    const service = mockCompanyServices.find(s => s.id === id);
    if (!service) throw new Error('Company service not found');
    return { data: service, status: 200 };
  }
}

export async function getOrganizationUsers(organizationId: number): Promise<ApiResponse<User[]>> {
  try {
    if (API_CONFIG.MOCK_ON_ERROR) {
      throw new Error('Mock error');
    }
    return await apiRequest<User[]>(`${API_ENDPOINTS_CONFIG.ORGANIZATIONS}/${organizationId}/users`);
  } catch(error) {
    console.warn(`Failed to fetch organization ${organizationId} users, using mock data:`, error);
    const users = mockUsers.filter(u => u.organizationId === organizationId);
    if (!users) throw new Error('Organization users not find');
    return { data: users, status: 200 };
  }
}

export async function getOrganizationMetrics(organizationId: number): Promise<ApiResponse<OrganizationMetrics>> {
  try {
    if (API_CONFIG.MOCK_ON_ERROR) {
      throw new Error('Mock error');
    }
    return await apiRequest<OrganizationMetrics>(`${API_ENDPOINTS_CONFIG.ORGANIZATIONS}/${organizationId}/metrics`);
  } catch(error) {
    console.warn(`Failed to fetch organization ${organizationId} metrics, using mock data:`, error);
    const metrics = mockOrganizationMetrics.find(u => u.id === organizationId);
    if (!metrics) throw new Error('Organization metrics not find');
    return { data: metrics, status: 200 };
  }
}

export async function loginUser({email, password}: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  try {
    return await apiRequest<LoginResponse>(API_ENDPOINTS_CONFIG.LOGIN, {
      method: 'POST',
      body: JSON.stringify({email, password})
    });
  } catch (error) {
    console.warn('Failed to login user:', error);
    return { 
      data: {
        accessToken: '',
        refreshToken: ''
      }, 
      status: 500
    };
  }
}

export async function loginGuestUser(): Promise<ApiResponse<LoginResponse>> {
  try {
    return await apiRequest<LoginResponse>(API_ENDPOINTS_CONFIG.LOGIN_GUEST, {
      method: 'POST'
    }); 
  } catch (error) {
    console.warn('Failed to login guest user:', error);
    return { 
      data: {
        accessToken: '',
        refreshToken: ''
      }, 
      status: 500
    };
  }
}