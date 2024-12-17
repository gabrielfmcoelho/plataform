import { apiRequest } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { mockTeamMembers, mockTeamNews } from '../data/team';
import type { TeamMember, TeamNews } from '../types/team';
import type { ApiResult } from '../types/api';

export async function getTeamMembers(): ApiResult<TeamMember[]> {
  try {
    return await apiRequest<TeamMember[]>(`${API_ENDPOINTS.TEAM}/members`);
  } catch (error) {
    console.warn('Failed to fetch team members, using mock data:', error);
    return { data: mockTeamMembers, status: 200 };
  }
}

export async function getTeamNews(): ApiResult<TeamNews[]> {
  try {
    return await apiRequest<TeamNews[]>(`${API_ENDPOINTS.TEAM}/news`);
  } catch (error) {
    console.warn('Failed to fetch team news, using mock data:', error);
    return { data: mockTeamNews, status: 200 };
  }
}