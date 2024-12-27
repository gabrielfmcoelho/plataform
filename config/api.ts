export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  MOCK_ON_ERROR: process.env.NEXT_PUBLIC_MOCK_ON_ERROR === '1',
  TIMEOUT: 1000,
  RETRY_ATTEMPTS: 2,
  RETRY_DELAY: 200,
} as const;

export const API_ENDPOINTS_CONFIG = {
  USERS: '/users',
  ORGANIZATIONS: '/organizations',
  SERVICES: '/services',
  PIPELINES: '/pipelines',
  USER_METRICS: '/user-metrics',
  USER_CONFIGS: '/user-configs', 
  PARTNERS: '/partners',
  APPLICATION_SERVICES: '/application-services',
  COMPANY_SERVICES: '/company-services',
  TEAM: '/team',
} as const;