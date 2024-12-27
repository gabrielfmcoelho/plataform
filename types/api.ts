export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiErrorData {
  status: number;
  message: string;
  details?: Record<string, any>;
}

export type ApiResult<T> = Promise<ApiResponse<T>>;