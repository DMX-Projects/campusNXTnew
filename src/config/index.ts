// Central configuration file
export * from './constants';

// Environment variables
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
    hostelUrl: import.meta.env.VITE_HOSTEL_API_URL || 'http://localhost:5000',
    timeout: 30000,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'College Management System',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    env: import.meta.env.VITE_ENV || 'development',
  },
  features: {
    enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
    enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  },
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    userKey: 'user_data',
    timeout: Number(import.meta.env.VITE_AUTH_TIMEOUT) || 3600000, // 1 hour
  },
};