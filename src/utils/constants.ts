import { UserRole, ModuleName } from '../types/enums';

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || '/api/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_STATE: 'sidebarState',
  NOTIFICATIONS: 'notifications',
};

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY HH:mm',
  DATETIME_API: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm',
  MONTH_YEAR: 'MM/YYYY',
};

// File Upload Configuration
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    SPREADSHEET: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  },
};

// Validation Rules
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: true,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    PATTERN: /^[6-9]\d{9}$/,
    MIN_LENGTH: 10,
    MAX_LENGTH: 10,
  },
  AADHAR: {
    PATTERN: /^\d{12}$/,
    LENGTH: 12,
  },
  PAN: {
    PATTERN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    LENGTH: 10,
  },
};

// Role-based Module Access
export const MODULE_ACCESS: Record<UserRole, ModuleName[]> = {
  [UserRole.STUDENT]: [
    ModuleName.ACADEMICS,
    ModuleName.ADMINISTRATION,
    ModuleName.EXAMINATION,
    ModuleName.LMS,
    ModuleName.PLACEMENTS,
    ModuleName.LIBRARY,
    ModuleName.TRANSPORT,
    ModuleName.HOSTEL,
  ],
  [UserRole.FACULTY]: [
    ModuleName.ACADEMICS,
    ModuleName.EXAMINATION,
    ModuleName.LMS,
    ModuleName.LIBRARY,
    ModuleName.PARENT,
  ],
  [UserRole.PRINCIPAL]: [
    ModuleName.ACADEMICS,
    ModuleName.ADMINISTRATION,
    ModuleName.EXAMINATION,
    ModuleName.PLACEMENTS,
    ModuleName.LMS,
    ModuleName.LIBRARY,
    ModuleName.TRANSPORT,
    ModuleName.HOSTEL,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.HOD]: [
    ModuleName.ACADEMICS,
    ModuleName.ADMINISTRATION,
    ModuleName.EXAMINATION,
    ModuleName.PLACEMENTS,
    ModuleName.LMS,
    ModuleName.LIBRARY,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.CHAIRPERSON]: [
    ModuleName.HOME,
    ModuleName.ACADEMICS,
    ModuleName.ADMINISTRATION,
    ModuleName.EXAMINATION,
    ModuleName.PLACEMENTS,
    ModuleName.LMS,
    ModuleName.LIBRARY,
    ModuleName.TRANSPORT,
    ModuleName.HOSTEL,
    ModuleName.PARENT,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.COLLEGE_SECRETARY]: [
    ModuleName.HOME,
    ModuleName.ACADEMICS,
    ModuleName.ADMINISTRATION,
    ModuleName.EXAMINATION,
    ModuleName.PLACEMENTS,
    ModuleName.LMS,
    ModuleName.LIBRARY,
    ModuleName.TRANSPORT,
    ModuleName.HOSTEL,
    ModuleName.PARENT,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.DEAN]: [
    ModuleName.ACADEMICS,
    ModuleName.ADMINISTRATION,
    ModuleName.EXAMINATION,
    ModuleName.PLACEMENTS,
    ModuleName.LMS,
    ModuleName.LIBRARY,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.TPO]: [
    ModuleName.PLACEMENTS,
    ModuleName.ACADEMICS,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.CONTROLLER_OF_EXAMINATION]: [
    ModuleName.EXAMINATION,
    ModuleName.ACADEMICS,
  ],
  [UserRole.MASTER_ADMIN]: [
    ModuleName.HOME,
  ],
  [UserRole.LAB_ASSISTANT]: [
    ModuleName.ACADEMICS,
    ModuleName.LMS,
  ],
  [UserRole.LAB_TECHNICIAN]: [
    ModuleName.ACADEMICS,
    ModuleName.LMS,
  ],
  [UserRole.PARENT]: [
    ModuleName.PARENT,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.ADMINISTRATION_OFFICER]: [
    ModuleName.ADMISSION_MANAGEMENT,
    ModuleName.INFRASTRUCTURE_MANAGEMENT,
    ModuleName.HOSTEL_MANAGEMENT,
    ModuleName.TRANSPORT_MANAGEMENT,
    ModuleName.HR_MANAGEMENT,
    ModuleName.STUDENT_FEES_MANAGEMENT,
  ],
  [UserRole.TRANSPORTATION_INCHARGE]: [
    ModuleName.TRANSPORT,
  ],
  [UserRole.HOSTEL_INCHARGE]: [
    ModuleName.HOSTEL,
  ],
  [UserRole.LIBRARY_INCHARGE]: [
    ModuleName.LIBRARY,
  ],
  [UserRole.ACCOUNTS_OFFICER]: [
    ModuleName.ADMINISTRATION,
  ],
  [UserRole.SCHOLARSHIP_INCHARGE]: [
    ModuleName.ADMINISTRATION,
  ],
  [UserRole.STORES_INCHARGE]: [
    ModuleName.ADMINISTRATION,
  ],
  [UserRole.SPORTS_INCHARGE]: [
    ModuleName.ADMINISTRATION,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.SECURITY_INCHARGE]: [
    ModuleName.ADMINISTRATION,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.IT_DEPARTMENT]: [
    ModuleName.ADMINISTRATION,
    ModuleName.ACADEMICS,
    ModuleName.EXAMINATION,
    ModuleName.PLACEMENTS,
    ModuleName.LMS,
    ModuleName.LIBRARY,
    ModuleName.TRANSPORT,
    ModuleName.HOSTEL,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.STUDENT_SERVICES]: [
    ModuleName.ADMINISTRATION,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.COLLEGE_MAINTENANCE_INCHARGE]: [
    ModuleName.ADMINISTRATION,
    ModuleName.COMMUNICATIONS,
  ],
  [UserRole.TEMPORARY_STUDENT]: [
    ModuleName.ADMISSION,
  ],
};

// Default Dashboard Routes for each role
export const DEFAULT_ROUTES: Record<UserRole, string> = {
  [UserRole.STUDENT]: '/academics/dashboard',
  [UserRole.FACULTY]: '/academics/dashboard',
  [UserRole.PRINCIPAL]: '/academics/dashboard',
  [UserRole.HOD]: '/academics/dashboard',
  [UserRole.CHAIRPERSON]: '/home/dashboard',
  [UserRole.COLLEGE_SECRETARY]: '/home/dashboard',
  [UserRole.DEAN]: '/academics/dashboard',
  [UserRole.TPO]: '/placements/dashboard',
  [UserRole.CONTROLLER_OF_EXAMINATION]: '/examination/dashboard',
  [UserRole.MASTER_ADMIN]: '/home/dashboard',
  [UserRole.LAB_ASSISTANT]: '/academics/dashboard',
  [UserRole.LAB_TECHNICIAN]: '/academics/dashboard',
  [UserRole.PARENT]: '/parent/dashboard',
  [UserRole.ADMINISTRATION_OFFICER]: '/administration/dashboard',
  [UserRole.TRANSPORTATION_INCHARGE]: '/transport/dashboard',
  [UserRole.HOSTEL_INCHARGE]: '/hostel/dashboard',
  [UserRole.LIBRARY_INCHARGE]: '/library/dashboard',
  [UserRole.ACCOUNTS_OFFICER]: '/administration/dashboard',
  [UserRole.SCHOLARSHIP_INCHARGE]: '/administration/dashboard',
  [UserRole.STORES_INCHARGE]: '/administration/dashboard',
  [UserRole.SPORTS_INCHARGE]: '/administration/dashboard',
  [UserRole.SECURITY_INCHARGE]: '/administration/dashboard',
  [UserRole.IT_DEPARTMENT]: '/administration/dashboard',
  [UserRole.STUDENT_SERVICES]: '/administration/dashboard',
  [UserRole.COLLEGE_MAINTENANCE_INCHARGE]: '/administration/dashboard',
  [UserRole.TEMPORARY_STUDENT]: '/admission/dashboard',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  SAVE_SUCCESS: 'Data saved successfully!',
  UPDATE_SUCCESS: 'Data updated successfully!',
  DELETE_SUCCESS: 'Data deleted successfully!',
  UPLOAD_SUCCESS: 'File uploaded successfully!',
  EMAIL_SENT: 'Email sent successfully!',
  PASSWORD_RESET: 'Password reset email sent!',
};

// Status Colors
export const STATUS_COLORS = {
  ACTIVE: '#10b981',
  INACTIVE: '#ef4444',
  PENDING: '#f59e0b',
  APPROVED: '#10b981',
  REJECTED: '#ef4444',
  PAID: '#10b981',
  UNPAID: '#ef4444',
  OVERDUE: '#dc2626',
  PRESENT: '#10b981',
  ABSENT: '#ef4444',
  LATE: '#f59e0b',
};

// Chart Colors
export const CHART_COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Orange
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
  '#ec4899', // Pink
  '#6366f1', // Indigo
];

// Export Status Options
export const EXPORT_FORMATS = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
  { value: 'csv', label: 'CSV' },
];

// Notification Types
export const NOTIFICATION_TYPES = [
  { value: 'info', label: 'Information', color: '#3b82f6' },
  { value: 'success', label: 'Success', color: '#10b981' },
  { value: 'warning', label: 'Warning', color: '#f59e0b' },
  { value: 'error', label: 'Error', color: '#ef4444' },
];

// Priority Levels
export const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: '#10b981' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'high', label: 'High', color: '#ef4444' },
  { value: 'urgent', label: 'Urgent', color: '#dc2626' },
];

