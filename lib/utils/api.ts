import { API_CONFIG } from '@/config/api';
import type { ApiResponse, ApiErrorData } from '@/types/api';

export class ApiError extends Error implements ApiErrorData {
  constructor(
    public status: number,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = API_CONFIG.RETRY_ATTEMPTS
): Promise<Response> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message, error.details);
    }

    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  try {
    const response = await fetchWithRetry(url, options);
    const data = await response.json();
    
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    console.log('error', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Internal Server Error');
  }
}