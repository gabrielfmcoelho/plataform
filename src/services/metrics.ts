import { apiRequest } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { mockUserMetrics } from '../data/user-metrics';
import type { UserMetrics } from '../types/user-metrics';
import type { ApiResult } from '../types/api';

export async function getUserMetrics(userId: number): ApiResult<UserMetrics> {
  try {
    return await apiRequest<UserMetrics>(`${API_ENDPOINTS.USER_METRICS}/${userId}`);
  } catch (error) {
    console.warn(`Failed to fetch metrics for user ${userId}, using mock data:`, error);
    const metrics = mockUserMetrics.find(m => m.userId === userId);
    if (!metrics) throw new Error('User metrics not found');
    return { data: metrics, status: 200 };
  }
}

export async function updateUserMetrics(metrics: UserMetrics): ApiResult<UserMetrics> {
  try {
    return await apiRequest<UserMetrics>(`${API_ENDPOINTS.USER_METRICS}/${metrics.userId}`, {
      method: 'PUT',
      body: JSON.stringify(metrics),
    });
  } catch (error) {
    console.warn('Failed to update user metrics, using mock implementation:', error);
    return { data: metrics, status: 200 };
  }
}