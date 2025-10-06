import { UserRole, ModuleName } from '../types/enums';

/**
 * Application-wide configuration constants
 */

// Application Metadata
export const APP_METADATA = {
  NAME: 'AICAS - Academic Management System',
  VERSION: '1.0.0',
  DESCRIPTION: 'Comprehensive Academic Institution Management System',
  AUTHOR: 'AICAS Development Team',
  SUPPORT_EMAIL: 'support@aicas.edu',
  WEBSITE: 'https://www.aicas.edu',
};

// Navigation Configuration
export const NAVIGATION_CONFIG = {
  SIDEBAR_WIDTH: 280,
  SIDEBAR_COLLAPSED_WIDTH: 64,
  HEADER_HEIGHT: 64,
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
};

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: {
      blue: '#3b82f6',
      green: '#10b981',
      purple: '#8b5cf6',
      orange: '#f59e0b',
      red: '#ef4444',
    },
    SECONDARY: {
      blue: '#64748b',
      green: '#6b7280',
      purple: '#7c3aed',
      orange: '#d97706',
      red: '#dc2626',
    },
    NEUTRAL: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    SUCCESS: '#10b981',
    WARNING: '#f59e0b',
    ERROR: '#ef4444',
    INFO: '#3b82f6',
  },
  FONTS: {
    PRIMARY: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    MONO: '"Fira Code", "JetBrains Mono", monospace',
  },
  SPACING: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  BORDER_RADIUS: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  SHADOWS: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

// Role-based Access Control
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.STUDENT]: [
    'view_own_profile',
    'edit_own_profile',
    'view_own_attendance',
    'view_own_results',
    'view_own_timetable',
    'view_own_fees',
    'view_own_library_books',
    'apply_for_leave',
    'view_own_placements',
  ],
  [UserRole.FACULTY]: [
    'view_own_profile',
    'edit_own_profile',
    'view_students',
    'mark_attendance',
    'view_own_timetable',
    'upload_study_materials',
    'create_assignments',
    'view_exam_results',
    'apply_for_leave',
    'view_parent_messages',
  ],
  [UserRole.PRINCIPAL]: [
    'view_all_profiles',
    'edit_all_profiles',
    'view_all_attendance',
    'view_all_results',
    'view_all_timetables',
    'view_all_fees',
    'manage_academic_calendar',
    'approve_leave_requests',
    'view_reports',
    'manage_placements',
  ],
  [UserRole.HOD]: [
    'view_department_profiles',
    'edit_department_profiles',
    'view_department_attendance',
    'view_department_results',
    'manage_department_timetable',
    'approve_department_leave',
    'view_department_reports',
    'manage_department_courses',
  ],
  [UserRole.CHAIRPERSON]: [
    'view_all_data',
    'edit_all_data',
    'manage_system_settings',
    'view_system_reports',
    'manage_user_roles',
    'approve_financial_decisions',
    'manage_institution_settings',
  ],
  [UserRole.COLLEGE_SECRETARY]: [
    'view_all_data',
    'edit_all_data',
    'manage_student_admissions',
    'manage_faculty_recruitment',
    'view_financial_reports',
    'manage_institution_policies',
  ],
  [UserRole.DEAN]: [
    'view_academic_data',
    'manage_academic_programs',
    'approve_course_changes',
    'view_academic_reports',
    'manage_faculty_evaluation',
  ],
  [UserRole.TPO]: [
    'manage_placements',
    'view_student_profiles',
    'manage_company_drives',
    'view_placement_reports',
    'manage_training_programs',
  ],
  [UserRole.CONTROLLER_OF_EXAMINATION]: [
    'manage_examinations',
    'view_exam_results',
    'manage_exam_schedules',
    'view_exam_reports',
    'approve_exam_requests',
  ],
  [UserRole.MASTER_ADMIN]: [
    'manage_system',
    'view_system_logs',
    'manage_backups',
    'configure_system_settings',
    'manage_user_accounts',
  ],
  [UserRole.LAB_ASSISTANT]: [
    'view_lab_schedules',
    'manage_lab_equipment',
    'view_student_lab_records',
    'report_lab_issues',
  ],
  [UserRole.LAB_TECHNICIAN]: [
    'manage_lab_equipment',
    'view_lab_schedules',
    'maintain_lab_records',
    'manage_lab_inventory',
  ],
  [UserRole.PARENT]: [
    'view_child_profile',
    'view_child_attendance',
    'view_child_results',
    'view_child_fees',
    'communicate_with_mentor',
    'view_notices',
  ],
  [UserRole.ADMINISTRATION_OFFICER]: [
    'manage_admissions',
    'manage_infrastructure',
    'manage_hostel_operations',
    'manage_transport_operations',
    'manage_hr_operations',
    'manage_fee_collections',
  ],
  [UserRole.TRANSPORTATION_INCHARGE]: [
    'manage_transport_routes',
    'manage_vehicles',
    'manage_drivers',
    'view_transport_reports',
    'manage_transport_fees',
  ],
  [UserRole.HOSTEL_INCHARGE]: [
    'manage_hostel_rooms',
    'manage_room_allocations',
    'manage_hostel_fees',
    'view_hostel_reports',
    'manage_hostel_rules',
  ],
  [UserRole.LIBRARY_INCHARGE]: [
    'manage_library_books',
    'manage_book_issues',
    'manage_library_members',
    'view_library_reports',
    'manage_library_rules',
  ],
  [UserRole.ACCOUNTS_OFFICER]: [
    'manage_financial_records',
    'view_financial_reports',
    'manage_fee_structures',
    'approve_financial_requests',
  ],
  [UserRole.SCHOLARSHIP_INCHARGE]: [
    'manage_scholarships',
    'view_scholarship_applications',
    'approve_scholarships',
    'view_scholarship_reports',
  ],
  [UserRole.STORES_INCHARGE]: [
    'manage_inventory',
    'manage_purchases',
    'view_inventory_reports',
    'manage_suppliers',
  ],
  [UserRole.SPORTS_INCHARGE]: [
    'manage_sports_activities',
    'view_sports_reports',
    'manage_sports_equipment',
    'organize_sports_events',
  ],
  [UserRole.SECURITY_INCHARGE]: [
    'manage_security_operations',
    'view_security_reports',
    'manage_visitor_logs',
    'manage_security_incidents',
  ],
  [UserRole.IT_DEPARTMENT]: [
    'manage_system_technical',
    'manage_user_accounts',
    'view_system_logs',
    'manage_system_backups',
    'provide_technical_support',
  ],
  [UserRole.STUDENT_SERVICES]: [
    'manage_student_services',
    'view_student_requests',
    'manage_student_support',
    'view_service_reports',
  ],
  [UserRole.COLLEGE_MAINTENANCE_INCHARGE]: [
    'manage_maintenance_requests',
    'view_maintenance_reports',
    'manage_maintenance_schedules',
    'manage_maintenance_equipment',
  ],
  [UserRole.TEMPORARY_STUDENT]: [
    'view_admission_status',
    'complete_admission_process',
    'view_fee_payment',
  ],
};

// Module-specific Configuration
export const MODULE_CONFIG = {
  [ModuleName.HOME]: {
    name: 'Home',
    icon: 'Home',
    color: '#3b82f6',
    description: 'Main dashboard and overview',
  },
  [ModuleName.ACADEMICS]: {
    name: 'Academics',
    icon: 'GraduationCap',
    color: '#10b981',
    description: 'Academic management and operations',
  },
  [ModuleName.ADMINISTRATION]: {
    name: 'Administration',
    icon: 'Settings',
    color: '#8b5cf6',
    description: 'Administrative operations and management',
  },
  [ModuleName.EXAMINATION]: {
    name: 'Examination',
    icon: 'FileText',
    color: '#f59e0b',
    description: 'Examination management and results',
  },
  [ModuleName.PLACEMENTS]: {
    name: 'Placements',
    icon: 'Briefcase',
    color: '#ef4444',
    description: 'Placement and career services',
  },
  [ModuleName.LMS]: {
    name: 'Learning Management',
    icon: 'BookOpen',
    color: '#06b6d4',
    description: 'Learning management system',
  },
  [ModuleName.LIBRARY]: {
    name: 'Library',
    icon: 'Library',
    color: '#84cc16',
    description: 'Library management and services',
  },
  [ModuleName.TRANSPORT]: {
    name: 'Transport',
    icon: 'Bus',
    color: '#f97316',
    description: 'Transportation management',
  },
  [ModuleName.HOSTEL]: {
    name: 'Hostel',
    icon: 'Home',
    color: '#ec4899',
    description: 'Hostel management and services',
  },
  [ModuleName.PARENT]: {
    name: 'Parent Portal',
    icon: 'Users',
    color: '#6366f1',
    description: 'Parent communication and information',
  },
  [ModuleName.COMMUNICATIONS]: {
    name: 'Communications',
    icon: 'MessageCircle',
    color: '#14b8a6',
    description: 'Communication and notifications',
  },
  [ModuleName.ADMISSION_MANAGEMENT]: {
    name: 'Admission Management',
    icon: 'UserPlus',
    color: '#7c3aed',
    description: 'Admission process management',
  },
  [ModuleName.INFRASTRUCTURE_MANAGEMENT]: {
    name: 'Infrastructure Management',
    icon: 'Building',
    color: '#059669',
    description: 'Infrastructure and facility management',
  },
  [ModuleName.HOSTEL_MANAGEMENT]: {
    name: 'Hostel Management',
    icon: 'Home',
    color: '#dc2626',
    description: 'Hostel operations management',
  },
  [ModuleName.TRANSPORT_MANAGEMENT]: {
    name: 'Transport Management',
    icon: 'Truck',
    color: '#ea580c',
    description: 'Transport operations management',
  },
  [ModuleName.HR_MANAGEMENT]: {
    name: 'HR Management',
    icon: 'Users',
    color: '#0891b2',
    description: 'Human resources management',
  },
  [ModuleName.STUDENT_FEES_MANAGEMENT]: {
    name: 'Student Fees Management',
    icon: 'DollarSign',
    color: '#16a34a',
    description: 'Student fee collection and management',
  },
  [ModuleName.ADMISSION]: {
    name: 'Admission',
    icon: 'UserCheck',
    color: '#9333ea',
    description: 'Admission process and status',
  },
};

// Dashboard Configuration
export const DASHBOARD_CONFIG = {
  MAX_CARDS_PER_ROW: 4,
  DEFAULT_CARD_HEIGHT: 120,
  CHART_HEIGHT: 300,
  RECENT_ACTIVITIES_LIMIT: 10,
  NOTIFICATIONS_LIMIT: 5,
};

// Form Configuration
export const FORM_CONFIG = {
  DEBOUNCE_DELAY: 300,
  AUTO_SAVE_INTERVAL: 30000, // 30 seconds
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
};

// Table Configuration
export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
  SORT_DIRECTIONS: ['asc', 'desc'] as const,
};

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  AUTO_HIDE_DELAY: 5000, // 5 seconds
  MAX_NOTIFICATIONS: 10,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Cache Configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 300000, // 5 minutes
  USER_DATA_TTL: 600000, // 10 minutes
  STATIC_DATA_TTL: 3600000, // 1 hour
  MAX_CACHE_SIZE: 50 * 1024 * 1024, // 50MB
};

// Security Configuration
export const SECURITY_CONFIG = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIREMENTS: {
    UPPERCASE: true,
    LOWERCASE: true,
    NUMBERS: true,
    SPECIAL_CHARS: true,
  },
};

// Export all configurations
export default {
  APP_METADATA,
  NAVIGATION_CONFIG,
  THEME_CONFIG,
  ROLE_PERMISSIONS,
  MODULE_CONFIG,
  DASHBOARD_CONFIG,
  FORM_CONFIG,
  TABLE_CONFIG,
  NOTIFICATION_CONFIG,
  CACHE_CONFIG,
  SECURITY_CONFIG,
};

