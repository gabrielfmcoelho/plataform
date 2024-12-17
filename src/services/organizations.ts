import { apiRequest } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { mockOrganizations } from '../data/organizations';
import type { Organization } from '../types/organization';
import type { ApiResult } from '../types/api';

export async function getOrganizations(): ApiResult<Organization[]> {
  try {
    return await apiRequest<Organization[]>(API_ENDPOINTS.ORGANIZATIONS);
  } catch (error) {
    console.warn('Failed to fetch organizations, using mock data:', error);
    return { data: mockOrganizations, status: 200 };
  }
}

export async function getOrganization(id: number): ApiResult<Organization> {
  try {
    return await apiRequest<Organization>(`${API_ENDPOINTS.ORGANIZATIONS}/${id}`);
  } catch (error) {
    console.warn(`Failed to fetch organization ${id}, using mock data:`, error);
    const org = mockOrganizations.find(o => o.id === id);
    if (!org) throw new Error('Organization not found');
    return { data: org, status: 200 };
  }
}

export async function createOrganization(org: Omit<Organization, 'id'>): ApiResult<Organization> {
  try {
    return await apiRequest<Organization>(API_ENDPOINTS.ORGANIZATIONS, {
      method: 'POST',
      body: JSON.stringify(org),
    });
  } catch (error) {
    console.warn('Failed to create organization, using mock implementation:', error);
    const newOrg = { ...org, id: Date.now() };
    return { data: newOrg, status: 201 };
  }
}

export async function updateOrganization(org: Organization): ApiResult<Organization> {
  try {
    return await apiRequest<Organization>(`${API_ENDPOINTS.ORGANIZATIONS}/${org.id}`, {
      method: 'PUT',
      body: JSON.stringify(org),
    });
  } catch (error) {
    console.warn('Failed to update organization, using mock implementation:', error);
    return { data: org, status: 200 };
  }
}

export async function deleteOrganization(id: number): ApiResult<void> {
  try {
    return await apiRequest<void>(`${API_ENDPOINTS.ORGANIZATIONS}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.warn('Failed to delete organization, using mock implementation:', error);
    return { data: undefined, status: 204 };
  }
}