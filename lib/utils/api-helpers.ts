import { API_CONFIG } from '@/config/api';
import type { ApiResponse } from '@/types/api';

export async function fetchWithRetry<T>(
  endpoint: string,
  options: RequestInit = {},
  retries = API_CONFIG.RETRY_ATTEMPTS
): Promise<ApiResponse<T>> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
      return fetchWithRetry(endpoint, options, retries - 1);
    }
    throw error;
  }
}