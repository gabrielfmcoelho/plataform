export const ENVIRONMENT_CONFIG = {
  HIDE_ERROR: process.env.NEXT_PUBLIC_HIDE_ERROR === '1',
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
} as const;

