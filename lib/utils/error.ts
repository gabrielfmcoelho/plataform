export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): never {
  if (error instanceof ApiError) {
    throw error;
  }
  
  if (error instanceof Error) {
    throw new ApiError(500, error.message);
  }
  
  throw new ApiError(500, 'An unknown error occurred');
}