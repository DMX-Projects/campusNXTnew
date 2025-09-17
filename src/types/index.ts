// Re-export all types from subdirectories
export * from './models';
export * from './api';
export * from './forms';

// Legacy interface for backward compatibility
export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

// UI specific types
export interface DashboardCardData {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: any;
  color: string;
}

// Re-import User type for AuthContextType
import { User } from './models';