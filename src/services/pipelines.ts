import { apiRequest } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { mockPipelines } from '../data/pipelines';
import type { Pipeline } from '../types/pipeline';
import type { ApiResult } from '../types/api';

export async function getPipelines(): ApiResult<Pipeline[]> {
  try {
    return await apiRequest<Pipeline[]>(API_ENDPOINTS.PIPELINES);
  } catch (error) {
    console.warn('Failed to fetch pipelines, using mock data:', error);
    return { data: mockPipelines, status: 200 };
  }
}

export async function getPipeline(id: number): ApiResult<Pipeline> {
  try {
    return await apiRequest<Pipeline>(`${API_ENDPOINTS.PIPELINES}/${id}`);
  } catch (error) {
    console.warn(`Failed to fetch pipeline ${id}, using mock data:`, error);
    const pipeline = mockPipelines.find(p => p.id === id);
    if (!pipeline) throw new Error('Pipeline not found');
    return { data: pipeline, status: 200 };
  }
}

export async function createPipeline(pipeline: Omit<Pipeline, 'id'>): ApiResult<Pipeline> {
  try {
    return await apiRequest<Pipeline>(API_ENDPOINTS.PIPELINES, {
      method: 'POST',
      body: JSON.stringify(pipeline),
    });
  } catch (error) {
    console.warn('Failed to create pipeline, using mock implementation:', error);
    const newPipeline = { ...pipeline, id: Date.now() };
    return { data: newPipeline, status: 201 };
  }
}