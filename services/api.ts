import { fetchWithRetry } from '@/lib/utils/api-helpers';
import { API_ENDPOINTS } from '@/config/api';
import { mockTeamMembers, mockTeamNews } from '@/data/team';
import { mockPartners } from '@/data/partners';
import { mockApplicationsServices, mockCompanyServices } from '@/data/services';
import type { ApiResponse } from '@/types/api';
import type { TeamMember, TeamNews } from '@/types/team';
import type { Partner } from '@/types/partner';
import type { ApplicationService, CompanyService } from '@/types/service';

export async function getTeamMembers(): Promise<ApiResponse<TeamMember[]>> {
  try {
    return await fetchWithRetry<TeamMember[]>(`${API_ENDPOINTS.TEAM}/members`);
  } catch (error) {
    console.warn('Failed to fetch team members, using mock data:', error);
    return { data: mockTeamMembers, status: 200 };
  }
}

export async function getTeamNews(): Promise<ApiResponse<TeamNews[]>> {
  try {
    return await fetchWithRetry<TeamNews[]>(`${API_ENDPOINTS.TEAM}/news`);
  } catch (error) {
    console.warn('Failed to fetch team news, using mock data:', error);
    return { data: mockTeamNews, status: 200 };
  }
}

export async function getPartners(): Promise<ApiResponse<Partner[]>> {
  try {
    return await fetchWithRetry<Partner[]>(API_ENDPOINTS.PARTNERS);
  } catch (error) {
    console.warn('Failed to fetch partners, using mock data:', error);
    return { data: mockPartners, status: 200 };
  }
}

export async function getApplicationServices(): Promise<ApiResponse<ApplicationService[]>> {
  try {
    return await fetchWithRetry<ApplicationService[]>(API_ENDPOINTS.APPLICATION_SERVICES);
  } catch (error) {
    console.warn('Failed to fetch application services, using mock data:', error);
    return { data: mockApplicationsServices, status: 200 };
  }
}

export async function getCompanyServices(): Promise<ApiResponse<CompanyService[]>> {
  try {
    return await fetchWithRetry<CompanyService[]>(API_ENDPOINTS.COMPANY_SERVICES);
  } catch (error) {
    console.warn('Failed to fetch company services, using mock data:', error);
    return { data: mockCompanyServices, status: 200 };
  }
}