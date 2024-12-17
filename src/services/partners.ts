import { apiRequest } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { mockPartners } from '../data/partners';
import type { Partner } from '../types/partner';
import type { ApiResult } from '../types/api';

export async function getPartners(): ApiResult<Partner[]> {
  try {
    return await apiRequest<Partner[]>(API_ENDPOINTS.PARTNERS);
  } catch (error) {
    console.warn('Failed to fetch partners, using mock data:', error);
    return { data: mockPartners, status: 200 };
  }
}

export async function getPartner(id: number): ApiResult<Partner> {
  try {
    return await apiRequest<Partner>(`${API_ENDPOINTS.PARTNERS}/${id}`);
  } catch (error) {
    console.warn(`Failed to fetch partner ${id}, using mock data:`, error);
    const partner = mockPartners.find(p => p.id === id);
    if (!partner) throw new Error('Partner not found');
    return { data: partner, status: 200 };
  }
}

export async function createPartner(partner: Omit<Partner, 'id'>): ApiResult<Partner> {
  try {
    return await apiRequest<Partner>(API_ENDPOINTS.PARTNERS, {
      method: 'POST',
      body: JSON.stringify(partner),
    });
  } catch (error) {
    console.warn('Failed to create partner, using mock implementation:', error);
    const newPartner = { ...partner, id: Date.now() };
    return { data: newPartner, status: 201 };
  }
}

export async function updatePartner(partner: Partner): ApiResult<Partner> {
  try {
    return await apiRequest<Partner>(`${API_ENDPOINTS.PARTNERS}/${partner.id}`, {
      method: 'PUT',
      body: JSON.stringify(partner),
    });
  } catch (error) {
    console.warn('Failed to update partner, using mock implementation:', error);
    return { data: partner, status: 200 };
  }
}

export async function deletePartner(id: number): ApiResult<void> {
  try {
    return await apiRequest<void>(`${API_ENDPOINTS.PARTNERS}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.warn('Failed to delete partner, using mock implementation:', error);
    return { data: undefined, status: 204 };
  }
}