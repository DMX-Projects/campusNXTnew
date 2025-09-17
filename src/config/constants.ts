// Application constants
export const APP_NAME = 'College Management System';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
  },
  STUDENTS: '/students',
  FACULTY: '/faculty',
  COURSES: '/courses',
  EXAMS: '/exams',
  RESULTS: '/results',
  ATTENDANCE: '/attendance',
  LIBRARY: '/library',
  HOSTEL: '/hostel',
  PLACEMENTS: '/placements',
} as const;

// User roles
export const USER_ROLES = {
  STUDENT: 'Student',
  FACULTY: 'Faculty',
  HOD: 'HoD',
  PRINCIPAL: 'Principal',
  ADMIN: 'Admin',
  LIBRARIAN: 'Librarian',
  WARDEN: 'Warden',
  PARENT: 'Parent',
  DEAN: 'Dean',
  CHAIRPERSON: 'Chairperson',
  TPO: 'TPO',
  LAB_ASSISTANT: 'Lab Assistant',
  ACCOUNTANT: 'Accountant',
  SECURITY: 'Security',
  MAINTENANCE: 'Maintenance',
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  STUDENTS: '/students',
  FACULTY: '/faculty',
  ACADEMICS: '/academics',
  EXAMINATION: '/examination',
  LIBRARY: '/library',
  HOSTEL: '/hostel',
  PLACEMENTS: '/placements',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'dd MMM yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'dd MMM yyyy HH:mm',
  TIME: 'HH:mm',
} as const;

// Status types
export const STATUS = {
  ATTENDANCE: {
    PRESENT: 'Present',
    ABSENT: 'Absent',
    LATE: 'Late',
    HOLIDAY: 'Holiday',
  },
  FEE: {
    PAID: 'Paid',
    PENDING: 'Pending',
    OVERDUE: 'Overdue',
  },
  LEAVE: {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
  },
  COMPLAINT: {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    RESOLVED: 'Resolved',
    CLOSED: 'Closed',
  },
} as const;

// Theme
export const THEME = {
  COLORS: {
    PRIMARY: 'blue',
    SECONDARY: 'gray',
    SUCCESS: 'green',
    WARNING: 'yellow',
    ERROR: 'red',
    INFO: 'cyan',
  },
} as const;