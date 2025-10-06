/**
 * Environment configuration
 * Handles all environment variables and provides type-safe access
 */

export interface AppConfig {
  // API Configuration
  API_URL: string;
  API_TIMEOUT: number;
  API_RETRY_ATTEMPTS: number;
  
  // Authentication
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  TOKEN_EXPIRY: string;
  REFRESH_TOKEN_EXPIRY: string;
  
  // Application
  APP_NAME: string;
  APP_VERSION: string;
  APP_ENVIRONMENT: 'development' | 'staging' | 'production';
  DEBUG: boolean;
  
  // Features
  ENABLE_ANALYTICS: boolean;
  ENABLE_ERROR_REPORTING: boolean;
  ENABLE_DEBUG_TOOLS: boolean;
  
  // File Upload
  MAX_FILE_SIZE: number;
  ALLOWED_FILE_TYPES: string[];
  
  // External Services
  GOOGLE_ANALYTICS_ID?: string;
  SENTRY_DSN?: string;
  
  // Development
  MOCK_API?: boolean;
  API_MOCK_DELAY?: number;
}

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, fallback?: string): string => {
  const value = import.meta.env[key];
  if (value === undefined && fallback === undefined) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value || fallback || '';
};

/**
 * Get boolean environment variable
 */
const getBooleanEnvVar = (key: string, fallback: boolean = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
};

/**
 * Get number environment variable
 */
const getNumberEnvVar = (key: string, fallback: number): number => {
  const value = import.meta.env[key];
  if (value === undefined) return fallback;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return fallback;
  return parsed;
};

/**
 * Application configuration
 */
export const config: AppConfig = {
  // API Configuration
  API_URL: getEnvVar('REACT_APP_API_URL', '/api/v1'),
  API_TIMEOUT: getNumberEnvVar('REACT_APP_API_TIMEOUT', 30000),
  API_RETRY_ATTEMPTS: getNumberEnvVar('REACT_APP_API_RETRY_ATTEMPTS', 3),
  
  // Authentication
  JWT_SECRET: getEnvVar('REACT_APP_JWT_SECRET', 'your-secret-key'),
  REFRESH_TOKEN_SECRET: getEnvVar('REACT_APP_REFRESH_TOKEN_SECRET', 'your-refresh-secret-key'),
  TOKEN_EXPIRY: getEnvVar('REACT_APP_TOKEN_EXPIRY', '1h'),
  REFRESH_TOKEN_EXPIRY: getEnvVar('REACT_APP_REFRESH_TOKEN_EXPIRY', '7d'),
  
  // Application
  APP_NAME: getEnvVar('REACT_APP_NAME', 'AICAS - Academic Management System'),
  APP_VERSION: getEnvVar('REACT_APP_VERSION', '1.0.0'),
  APP_ENVIRONMENT: (getEnvVar('REACT_APP_ENVIRONMENT', 'development') as 'development' | 'staging' | 'production'),
  DEBUG: getBooleanEnvVar('VITE_DEBUG', import.meta.env.DEV),
  
  // Features
  ENABLE_ANALYTICS: getBooleanEnvVar('REACT_APP_ENABLE_ANALYTICS', false),
  ENABLE_ERROR_REPORTING: getBooleanEnvVar('REACT_APP_ENABLE_ERROR_REPORTING', false),
  ENABLE_DEBUG_TOOLS: getBooleanEnvVar('VITE_ENABLE_DEBUG_TOOLS', import.meta.env.DEV),
  
  // File Upload
  MAX_FILE_SIZE: getNumberEnvVar('REACT_APP_MAX_FILE_SIZE', 10 * 1024 * 1024), // 10MB
  ALLOWED_FILE_TYPES: getEnvVar('REACT_APP_ALLOWED_FILE_TYPES', 'image/jpeg,image/png,image/gif,application/pdf').split(','),
  
  // External Services
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  
  // Development
  MOCK_API: getBooleanEnvVar('VITE_MOCK_API', import.meta.env.DEV),
  API_MOCK_DELAY: getNumberEnvVar('REACT_APP_API_MOCK_DELAY', 1000),
};

/**
 * Check if running in development mode
 */
export const isDevelopment = config.APP_ENVIRONMENT === 'development';

/**
 * Check if running in production mode
 */
export const isProduction = config.APP_ENVIRONMENT === 'production';

/**
 * Check if running in staging mode
 */
export const isStaging = config.APP_ENVIRONMENT === 'staging';

/**
 * Get API endpoint URL
 */
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = config.API_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.replace(/^\//, ''); // Remove leading slash
  return `${baseUrl}/${cleanEndpoint}`;
};

/**
 * Validate configuration on startup
 */
export const validateConfig = (): void => {
  const requiredFields: (keyof AppConfig)[] = [
    'API_URL',
    'APP_NAME',
    'APP_VERSION',
    'APP_ENVIRONMENT',
  ];

  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required configuration: ${missingFields.join(', ')}`);
  }

  // Validate environment-specific configurations
  if (config.APP_ENVIRONMENT === 'production') {
    if (config.DEBUG) {
      console.warn('Debug mode is enabled in production environment');
    }
    
    if (config.ENABLE_DEBUG_TOOLS) {
      console.warn('Debug tools are enabled in production environment');
    }
  }
};

/**
 * Log configuration on startup (only in development)
 */
export const logConfig = (): void => {
  if (isDevelopment && config.DEBUG) {
    console.group('🚀 Application Configuration');
    console.log('Environment:', config.APP_ENVIRONMENT);
    console.log('Version:', config.APP_VERSION);
    console.log('API URL:', config.API_URL);
    console.log('Debug Mode:', config.DEBUG);
    console.log('Mock API:', config.MOCK_API);
    console.groupEnd();
  }
};

// Validate configuration on module load
validateConfig();

// Log configuration in development
logConfig();

