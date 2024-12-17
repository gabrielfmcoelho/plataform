export const environment = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  mockOnError: process.env.NEXT_PUBLIC_MOCK_ON_ERROR === '1',
  hideError: process.env.NEXT_PUBLIC_HIDE_ERROR === '1',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;