import React, { createContext, useContext, useState ,useEffect} from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationContextType {
  activeModule: string;
  setActiveModule: (module: string) => void;
  activeSidebarItem: string;
  setActiveSidebarItem: (item: string) => void;
  getModulesForRole: (role: string) => string[];
  getSidebarItemsForModule: (module: string, role: string) => any[];
  expandedItems: string[];
  toggleExpanded: (itemPath: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

// Module access control based on user roles
const MODULE_ACCESS = {
  'College Secretary': ['Home', 'Academics', 'Administration', 'Examination', 'Placements', 'LMS', 'Library', 'Transport', 'Hostel', 'Parent', 'Communications'],
  'Chairperson': ['Home', 'Academics', 'Administration', 'Examination', 'Placements', 'LMS', 'Library', 'Transport', 'Hostel', 'Parent', 'Communications'],
  'Principal': [ 'Academics', 'Administration', 'Examination', 'Placements', 'LMS', 'Library', 'Transport', 'Hostel', 'Communications'],
  'Dean': [ 'Academics', 'Administration', 'Examination', 'Placements', 'LMS', 'Library', 'Communications'],
  'HoD': ['Academics', 'Examination', 'Placements', 'LMS', 'Library', 'Communications'],
  'TPO': [ 'Placements', 'Academics', 'Communications'],
  'Controller of Examination': [ 'Examination', 'Academics'],
  'Faculty': ['Academics', 'LMS', 'Library'],
  'Lab Assistant': ['Academics', 'LMS'],
  'Lab Technician': ['Academics', 'LMS'],
  'Student': ['LMS', 'Library', 'Transport', 'Hostel'],
  'Parent': ['Parent', 'Communications'],
  'Administration Officer': ['Administration', 'Communications'],
  'Transportation Incharge': ['Transport'],
  'Hostel Incharge': ['Hostel'],
  'Library Incharge': ['Library'],
  'Accounts Officer': ['Administration'],
  'Scholarship Incharge': ['Administration'],
  'Stores Incharge': ['Administration'],
  'Sports Incharge': ['Administration', 'Communications'],
  'Security Incharge': ['Administration', 'Communications'],
  'IT Department': ['Administration', 'Academics', 'Examination', 'Placements', 'LMS', 'Library', 'Transport', 'Hostel', 'Communications'],
  'Student Services': ['Administration', 'Communications'],
  'College Maintenance Incharge': ['Administration', 'Communications'],
  // 'ERP Admin': ['Administration', 'Academics', 'Examination', 'Placements', 'LMS', 'Library', 'Transport', 'Hostel', 'Parent', 'Communications']
};

// Sidebar items for each module based on user role
const SIDEBAR_ITEMS = {
  Home: {
    'Chairperson': [
      { name: 'Dashboard', path: '/home/dashboard', icon: 'BarChart3' },
      { 
        name: 'Masters', 
        path: '/home', 
        icon: 'Settings',
        children: [
          { name: 'Users', path: '/home/users', icon: 'Users' },
          { name: 'Roles', path: '/home/roles', icon: 'Shield' },
          { name: 'Departments', path: '/home/departments', icon: 'Building2' },
          { name: 'Courses', path: '/home/courses', icon: 'BookOpen' },
          { name: 'Clients', path: '/home/clients', icon: 'Users' },
          { name: 'Institutions', path: '/home/institutions', icon: 'Building' },
          { name: 'Programs', path: '/home/programs', icon: 'GraduationCap' },
          { name: 'Holiday List', path: '/home/holiday-list', icon: 'List' },
          { name: 'Holiday Calendar', path: '/home/holiday-calendar', icon: 'Calendar' },
          { name: 'Topics', path: '/home/topics', icon: 'FileText' },
          { name: 'Lessons', path: '/home/lessons', icon: 'BookOpen' },
          { name: 'Affiliations', path: '/home/affiliation', icon: 'Link' }
        ]
      },
      { name: 'My Calendar', path: '/home/my-calendar', icon: 'Calendar' },
      { name: 'Inbox', path: '/home/inbox', icon: 'Mail' },
      { name: 'Notifications', path: '/home/notifications', icon: 'Bell' },
      { name: 'Events', path: '/home/events', icon: 'Calendar' }
    ],
    'College Secretary': [
      { 
        name: 'Masters', 
        path: '/home', 
        icon: 'Settings',
        children: [
          { name: 'Users', path: '/home/users', icon: 'Users' },
          { name: 'Roles', path: '/home/roles', icon: 'Shield' },
          { name: 'Departments', path: '/home/departments', icon: 'Building2' },
          { name: 'Courses', path: '/home/courses', icon: 'BookOpen' },
          { name: 'Clients', path: '/home/clients', icon: 'Users' },
          { name: 'Institutions', path: '/home/institutions', icon: 'Building' },
          { name: 'Programs', path: '/home/programs', icon: 'GraduationCap' },
          { name: 'Holiday List', path: '/home/holiday-list', icon: 'List' },
          { name: 'Holiday Calendar', path: '/home/holiday-calendar', icon: 'Calendar' },
          { name: 'Topics', path: '/home/topics', icon: 'FileText' },
          { name: 'Lessons', path: '/home/lessons', icon: 'BookOpen' },
          { name: 'Affiliations', path: '/home/affiliation', icon: 'Link' }
        ]
      },
      { name: 'My Calendar', path: '/home/my-calendar', icon: 'Calendar' },
      { name: 'Inbox', path: '/home/inbox', icon: 'Mail' },
      { name: 'Notifications', path: '/home/notifications', icon: 'Bell' },
      { name: 'Events', path: '/home/events', icon: 'Calendar' }
    ],
    'Principal': [
      { 
        name: 'Masters', 
        path: '/home', 
        icon: 'Settings',
        children: [
          { name: 'Users', path: '/home/users', icon: 'Users' },
          { name: 'Roles', path: '/home/roles', icon: 'Shield' },
          { name: 'Departments', path: '/home/departments', icon: 'Building2' },
          { name: 'Courses', path: '/home/courses', icon: 'BookOpen' },
          { name: 'Clients', path: '/home/clients', icon: 'Users' },
          { name: 'Institutions', path: '/home/institutions', icon: 'Building' },
          { name: 'Programs', path: '/home/programs', icon: 'GraduationCap' },
          { name: 'Holiday List', path: '/home/holiday-list', icon: 'List' },
          { name: 'Holiday Calendar', path: '/home/holiday-calendar', icon: 'Calendar' },
          { name: 'Topics', path: '/home/topics', icon: 'FileText' },
          { name: 'Lessons', path: '/home/lessons', icon: 'BookOpen' },
          { name: 'Affiliations', path: '/home/affiliation', icon: 'Link' }
        ]
      },
      { name: 'My Calendar', path: '/home/my-calendar', icon: 'Calendar' },
      { name: 'Inbox', path: '/home/inbox', icon: 'Mail' },
      { name: 'Notifications', path: '/home/notifications', icon: 'Bell' },
      { name: 'Events', path: '/home/events', icon: 'Calendar' }
    ],
    'default': [
      { name: 'My Calendar', path: '/home/my-calendar', icon: 'Calendar' },
      { name: 'Inbox', path: '/home/inbox', icon: 'Mail' },
      { name: 'Notifications', path: '/home/notifications', icon: 'Bell' },
      { name: 'Events', path: '/home/events', icon: 'Calendar' }
    ]
  },
  Academics: {
    'Chairperson': [
      { name: 'Dashboard', path: '/academics/dashboard', icon: 'BarChart3' },
      { name: 'Faculty', path: '/academics/faculty', icon: 'GraduationCap' },
      { name: 'Inbox', path: '/academics/inbox', icon: 'Mail' },
      { name: 'Student Attendance', path: '/academics/student-attendance', icon: 'CheckCircle' },
      { name: 'Timetable', path: '/academics/timetable', icon: 'Calendar' },
      { name: 'Student Leaves', path: '/academics/student-leaves', icon: 'UserMinus' },
      { name: 'Student Approval', path: '/academics/student-approval', icon: 'UserCheck' },
      { name: 'Academic Calendar', path: '/academics/academic-calendar', icon: 'Calendar' },
      { name: 'Subjects & Syllabus', path: '/academics/subjects-syllabus', icon: 'BookOpen' },
      { name: 'Student Exam Preparation', path: '/academics/exam-preparation', icon: 'FileText' },
      { name: 'Study Material', path: '/academics/study-material', icon: 'FolderOpen' },
      { name: 'Student Projects', path: '/academics/student-projects', icon: 'Briefcase' },
      { name: 'Online Tests', path: '/academics/online-tests', icon: 'Monitor' },
      { name: 'Coding Assessment', path: '/academics/coding-assessment', icon: 'Code' },
      { name: 'Faculty Feedback', path: '/academics/faculty-feedback', icon: 'MessageSquare' },
      { name: 'Syllabus Tracking', path: '/academics/syllabus-tracking', icon: 'Target' },
      { name: 'Schedule Online Class', path: '/academics/schedule-online-class', icon: 'Video' },
      { name: 'Reports', path: '/academics/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/academics/raise-ticket', icon: 'AlertCircle' }
    ],
    'Principal': [
      { name: 'Dashboard', path: '/academics/dashboard', icon: 'BarChart3' },
      { name: 'Faculty', path: '/academics/faculty', icon: 'GraduationCap' },
      { name: 'Inbox', path: '/academics/inbox', icon: 'Mail' },
      { name: 'Student Attendance', path: '/academics/student-attendance', icon: 'CheckCircle' },
      { name: 'Timetable', path: '/academics/timetable', icon: 'Calendar' },
      { name: 'Student Leaves', path: '/academics/student-leaves', icon: 'UserMinus' },
      { name: 'Student Approval', path: '/academics/student-approval', icon: 'UserCheck' },
      { name: 'Academic Calendar', path: '/academics/academic-calendar', icon: 'Calendar' },
      { name: 'Subjects & Syllabus', path: '/academics/subjects-syllabus', icon: 'BookOpen' },
      { name: 'Student Exam Preparation', path: '/academics/exam-preparation', icon: 'FileText' },
      { name: 'Study Material', path: '/academics/study-material', icon: 'FolderOpen' },
      { name: 'Student Projects', path: '/academics/student-projects', icon: 'Briefcase' },
      { name: 'Online Tests', path: '/academics/online-tests', icon: 'Monitor' },
      { name: 'Coding Assessment', path: '/academics/coding-assessment', icon: 'Code' },
      { name: 'Faculty Feedback', path: '/academics/faculty-feedback', icon: 'MessageSquare' },
      { name: 'Syllabus Tracking', path: '/academics/syllabus-tracking', icon: 'Target' },
      { name: 'Schedule Online Class', path: '/academics/schedule-online-class', icon: 'Video' },
      { name: 'Reports', path: '/academics/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/academics/raise-ticket', icon: 'AlertCircle' }
    ],
    'HoD': [
      { name: 'Dashboard', path: '/academics/dashboard', icon: 'BarChart3' },
      { name: 'Faculty', path: '/academics/faculty', icon: 'GraduationCap' },
      { name: 'Inbox', path: '/academics/inbox', icon: 'Mail' },
      { name: 'Student Attendance', path: '/academics/student-attendance', icon: 'CheckCircle' },
      { name: 'Timetable', path: '/academics/timetable', icon: 'Calendar' },
      { name: 'Student Leaves', path: '/academics/student-leaves', icon: 'UserMinus' },
      { name: 'Student Approval', path: '/academics/student-approval', icon: 'UserCheck' },
      { name: 'Academic Calendar', path: '/academics/academic-calendar', icon: 'Calendar' },
      { name: 'Subjects & Syllabus', path: '/academics/subjects-syllabus', icon: 'BookOpen' },
      { name: 'Student Exam Preparation', path: '/academics/exam-preparation', icon: 'FileText' },
      { name: 'Study Material', path: '/academics/study-material', icon: 'FolderOpen' },
      { name: 'Student Projects', path: '/academics/student-projects', icon: 'Briefcase' },
      { name: 'Online Tests', path: '/academics/online-tests', icon: 'Monitor' },
      { name: 'Coding Assessment', path: '/academics/coding-assessment', icon: 'Code' },
      { name: 'Faculty Feedback', path: '/academics/faculty-feedback', icon: 'MessageSquare' },
      { name: 'Syllabus Tracking', path: '/academics/syllabus-tracking', icon: 'Target' },
      { name: 'Schedule Online Class', path: '/academics/schedule-online-class', icon: 'Video' },
      { name: 'Reports', path: '/academics/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/academics/raise-ticket', icon: 'AlertCircle' }
    ],
    'Faculty': [
      { name: 'Dashboard', path: '/academics/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/academics/inbox', icon: 'Mail' },
      { name: 'Student Attendance', path: '/academics/student-attendance', icon: 'CheckCircle' },
      { name: 'Timetable', path: '/academics/timetable', icon: 'Calendar' },
      { name: 'Academic Calendar', path: '/academics/academic-calendar', icon: 'Calendar' },
      { name: 'Subjects & Syllabus', path: '/academics/subjects-syllabus', icon: 'BookOpen' },
      { name: 'Study Material', path: '/academics/study-material', icon: 'FolderOpen' },
      { name: 'Student Projects', path: '/academics/student-projects', icon: 'Briefcase' },
      { name: 'Online Tests', path: '/academics/online-tests', icon: 'Monitor' },
      { name: 'Coding Assessment', path: '/academics/coding-assessment', icon: 'Code' },
      { name: 'Syllabus Tracking', path: '/academics/syllabus-tracking', icon: 'Target' },
      { name: 'Schedule Online Class', path: '/academics/schedule-online-class', icon: 'Video' },
      { name: 'Reports', path: '/academics/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/academics/raise-ticket', icon: 'AlertCircle' }
    ],
    'default': [
      { name: 'Dashboard', path: '/academics/dashboard', icon: 'BarChart3' },
      { name: 'Faculty', path: '/academics/faculty', icon: 'GraduationCap' },
      { name: 'Inbox', path: '/academics/inbox', icon: 'Mail' },
      { name: 'Student Attendance', path: '/academics/student-attendance', icon: 'CheckCircle' },
      { name: 'Timetable', path: '/academics/timetable', icon: 'Calendar' },
      { name: 'Academic Calendar', path: '/academics/academic-calendar', icon: 'Calendar' },
      { name: 'Subjects & Syllabus', path: '/academics/subjects-syllabus', icon: 'BookOpen' },
      { name: 'Reports', path: '/academics/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/academics/raise-ticket', icon: 'AlertCircle' }
    ]
  },
  Administration: {
    'Chairperson': [
      { name: 'Upload Student List', path: '/administration/upload-student-list', icon: 'Upload' },
      { name: 'Student Details', path: '/administration/student-details', icon: 'Users' },
      { name: 'Student Enquiry', path: '/administration/student-enquiry', icon: 'HelpCircle' },
      { 
        name: 'Masters', 
        path: '/administration/masters', 
        icon: 'Settings',
        children: [
          { name: 'Fee Types', path: '/administration/masters/fee-types', icon: 'DollarSign' },
          { name: 'Leave Types', path: '/administration/masters/leave-types', icon: 'Calendar' }
        ]
      }
    ],
    'Principal': [
      { name: 'Upload Student List', path: '/administration/upload-student-list', icon: 'Upload' },
      { name: 'Student Details', path: '/administration/student-details', icon: 'Users' },
      { name: 'Student Enquiry', path: '/administration/student-enquiry', icon: 'HelpCircle' },
      { 
        name: 'Masters', 
        path: '/administration/masters', 
        icon: 'Settings',
        children: [
          { name: 'Fee Types', path: '/administration/masters/fee-types', icon: 'DollarSign' },
          { name: 'Leave Types', path: '/administration/masters/leave-types', icon: 'Calendar' }
        ]
      }
    ],
    'Administration Officer': [
      { name: 'Upload Student List', path: '/administration/upload-student-list', icon: 'Upload' },
      { name: 'Student Details', path: '/administration/student-details', icon: 'Users' },
      { name: 'Student Enquiry', path: '/administration/student-enquiry', icon: 'HelpCircle' },
      { 
        name: 'Masters', 
        path: '/administration/masters', 
        icon: 'Settings',
        children: [
          { name: 'Fee Types', path: '/administration/masters/fee-types', icon: 'DollarSign' },
          { name: 'Leave Types', path: '/administration/masters/leave-types', icon: 'Calendar' }
        ]
      }
    ],
    'default': [
      { name: 'Upload Student List', path: '/administration/upload-student-list', icon: 'Upload' },
      { name: 'Student Details', path: '/administration/student-details', icon: 'Users' },
      { name: 'Student Enquiry', path: '/administration/student-enquiry', icon: 'HelpCircle' },
      { 
        name: 'Masters', 
        path: '/administration/masters', 
        icon: 'Settings',
        children: [
          { name: 'Fee Types', path: '/administration/masters/fee-types', icon: 'DollarSign' },
          { name: 'Leave Types', path: '/administration/masters/leave-types', icon: 'Calendar' }
        ]
      }
    ]
  },
  Examination: {
    'Chairperson': [
      { name: 'Dashboard', path: '/examination/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/examination/inbox', icon: 'Mail' },
      { name: 'Exam Timetable', path: '/examination/exam-timetable', icon: 'Calendar' },
      { name: 'Seating Plan', path: '/examination/seating-plan', icon: 'MapPin' },
      { name: 'Investigation', path: '/examination/investigation', icon: 'Search' },
      { name: 'Student Attendance', path: '/examination/student-attendance', icon: 'CheckCircle' },
      { name: 'Condonation List', path: '/examination/condonation-list', icon: 'FileCheck' },
      { name: 'Detained List', path: '/examination/detained-list', icon: 'UserX' },
      { name: 'Hall Tickets', path: '/examination/hall-tickets', icon: 'CreditCard' },
      { name: 'Exam Attendance', path: '/examination/exam-attendance', icon: 'CheckSquare' },
      { name: 'Exam Evaluation', path: '/examination/exam-evaluation', icon: 'FileText' },
      { name: 'Exam Results', path: '/examination/exam-results', icon: 'Award' },
      { name: 'Marks List', path: '/examination/marks-list', icon: 'List' },
      { name: 'Generate Marks Memo', path: '/examination/generate-marks-memo', icon: 'FileOutput' },
      { name: 'Academic Promotion', path: '/examination/academic-promotion', icon: 'TrendingUp' },
      { name: 'Assessment Tests', path: '/examination/assessment-tests', icon: 'FileQuestion' },
      { name: 'Reports', path: '/examination/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/examination/raise-ticket', icon: 'AlertCircle' }
    ],
    'Controller of Examination': [
      { name: 'Dashboard', path: '/examination/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/examination/inbox', icon: 'Mail' },
      { name: 'Exam Timetable', path: '/examination/exam-timetable', icon: 'Calendar' },
      { name: 'Seating Plan', path: '/examination/seating-plan', icon: 'MapPin' },
      { name: 'Investigation', path: '/examination/investigation', icon: 'Search' },
      { name: 'Student Attendance', path: '/examination/student-attendance', icon: 'CheckCircle' },
      { name: 'Condonation List', path: '/examination/condonation-list', icon: 'FileCheck' },
      { name: 'Detained List', path: '/examination/detained-list', icon: 'UserX' },
      { name: 'Hall Tickets', path: '/examination/hall-tickets', icon: 'CreditCard' },
      { name: 'Exam Attendance', path: '/examination/exam-attendance', icon: 'CheckSquare' },
      { name: 'Exam Evaluation', path: '/examination/exam-evaluation', icon: 'FileText' },
      { name: 'Exam Results', path: '/examination/exam-results', icon: 'Award' },
      { name: 'Marks List', path: '/examination/marks-list', icon: 'List' },
      { name: 'Generate Marks Memo', path: '/examination/generate-marks-memo', icon: 'FileOutput' },
      { name: 'Academic Promotion', path: '/examination/academic-promotion', icon: 'TrendingUp' },
      { name: 'Assessment Tests', path: '/examination/assessment-tests', icon: 'FileQuestion' },
      { name: 'Reports', path: '/examination/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/examination/raise-ticket', icon: 'AlertCircle' }
    ],
    'Faculty': [
      { name: 'Dashboard', path: '/examination/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/examination/inbox', icon: 'Mail' },
      { name: 'Exam Timetable', path: '/examination/exam-timetable', icon: 'Calendar' },
      { name: 'Exam Evaluation', path: '/examination/exam-evaluation', icon: 'FileText' },
      { name: 'Assessment Tests', path: '/examination/assessment-tests', icon: 'FileQuestion' },
      { name: 'Reports', path: '/examination/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/examination/raise-ticket', icon: 'AlertCircle' }
    ],
    'Student': [
      { name: 'Exam Timetable', path: '/examination/exam-timetable', icon: 'Calendar' },
      { name: 'Hall Tickets', path: '/examination/hall-tickets', icon: 'CreditCard' },
      { name: 'Exam Results', path: '/examination/exam-results', icon: 'Award' },
      { name: 'Assessment Tests', path: '/examination/assessment-tests', icon: 'FileQuestion' },
      { name: 'Raise Ticket', path: '/examination/raise-ticket', icon: 'AlertCircle' }
    ],
    'default': [
      { name: 'Dashboard', path: '/examination/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/examination/inbox', icon: 'Mail' },
      { name: 'Exam Timetable', path: '/examination/exam-timetable', icon: 'Calendar' },
      { name: 'Hall Tickets', path: '/examination/hall-tickets', icon: 'CreditCard' },
      { name: 'Exam Results', path: '/examination/exam-results', icon: 'Award' },
      { name: 'Reports', path: '/examination/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/examination/raise-ticket', icon: 'AlertCircle' }
    ]
  },
  Placements: {
    'Chairperson': [
      { name: 'Dashboard', path: '/placements/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/placements/inbox', icon: 'Mail' },
      { name: 'Placement Calendar', path: '/placements/placement-calendar', icon: 'Calendar' },
      { name: 'Historical Placement', path: '/placements/historical-placement', icon: 'History' },
      { name: 'Placement Company', path: '/placements/placement-company', icon: 'Building' },
      { name: 'Notify Students', path: '/placements/notify-students', icon: 'Bell' },
      { name: 'Student Registration', path: '/placements/student-registration', icon: 'UserPlus' },
      { name: 'Generate Eligible Students', path: '/placements/generate-eligible-students', icon: 'Users' },
      { name: 'Assessment Test', path: '/placements/assessment-test', icon: 'FileQuestion' },
      { name: 'Schedule Tests', path: '/placements/schedule-tests', icon: 'Calendar' },
      { name: 'Placement Results', path: '/placements/placement-results', icon: 'Award' },
      { name: 'Resume Management', path: '/placements/resume-management', icon: 'FileText' },
      { name: 'Internships', path: '/placements/internships', icon: 'Briefcase' },
      { name: 'Placed Student Details', path: '/placements/placed-student-details', icon: 'UserCheck' },
      { name: 'Placement Courses', path: '/placements/placement-courses', icon: 'BookOpen' },
      { name: 'Reports', path: '/placements/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/placements/raise-ticket', icon: 'AlertCircle' }
    ],
    'Student': [
      { name: 'Dashboard', path: '/placements/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/placements/inbox', icon: 'Mail' },
      { name: 'Placement Calendar', path: '/placements/placement-calendar', icon: 'Calendar' },
      { name: 'Student Registration', path: '/placements/student-registration', icon: 'UserPlus' },
      { name: 'Assessment Test', path: '/placements/assessment-test', icon: 'FileQuestion' },
      { name: 'Placement Results', path: '/placements/placement-results', icon: 'Award' },
      { name: 'Resume Management', path: '/placements/resume-management', icon: 'FileText' },
      { name: 'Internships', path: '/placements/internships', icon: 'Briefcase' },
      { name: 'Placement Courses', path: '/placements/placement-courses', icon: 'BookOpen' },
      { name: 'Raise Ticket', path: '/placements/raise-ticket', icon: 'AlertCircle' }
    ],
    'default': [
      { name: 'Dashboard', path: '/placements/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/placements/inbox', icon: 'Mail' },
      { name: 'Placement Calendar', path: '/placements/placement-calendar', icon: 'Calendar' },
      { name: 'Placement Company', path: '/placements/placement-company', icon: 'Building' },
      { name: 'Reports', path: '/placements/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/placements/raise-ticket', icon: 'AlertCircle' }
    ]
  },
  LMS: {
    'Chairperson': [
      { name: 'Mail', path: '/lms/mail', icon: 'Mail' },
      { name: 'Folder', path: '/lms/folder', icon: 'Folder' },
      { name: 'Semester Prep', path: '/lms/semester-prep', icon: 'BookOpen' },
      { name: 'Study Material', path: '/lms/study-material', icon: 'FolderOpen' },
      { name: 'Projects', path: '/lms/projects', icon: 'Briefcase' },
      { name: 'Placement Corner', path: '/lms/placement-corner', icon: 'Target' },
      { name: 'Online Test', path: '/lms/online-test', icon: 'Monitor' },
      { name: 'Code Compiler', path: '/lms/code-compiler', icon: 'Code' },
      { name: 'Time Table', path: '/lms/time-table', icon: 'Calendar' },
      { name: 'Attendance', path: '/lms/attendance', icon: 'CheckCircle' },
      { name: 'Results', path: '/lms/results', icon: 'Award' },
      { name: 'Chat with Mentor', path: '/lms/chat-mentor', icon: 'MessageCircle' },
      { name: 'Approval', path: '/lms/approval', icon: 'CheckSquare' },
      { name: 'Library', path: '/lms/library', icon: 'BookOpen' },
      { name: 'Campus Calendar', path: '/lms/campus-calendar', icon: 'Calendar' },
      { name: 'Alumni', path: '/lms/alumni', icon: 'Users' },
      { name: 'Live Bus Tracking', path: '/lms/live-bus-tracking', icon: 'Navigation' },
      { name: 'College Contact', path: '/lms/college-contact', icon: 'Phone' },
      { name: 'Fee Payment', path: '/lms/fee-payment', icon: 'CreditCard' },
      { name: 'Hall Ticket', path: '/lms/hall-ticket', icon: 'CreditCard' },
      { name: 'Notice Board', path: '/lms/notice-board', icon: 'Clipboard' },
      { name: 'College Wall', path: '/lms/college-wall', icon: 'MessageSquare' },
      { name: 'Raise Ticket', path: '/lms/raise-ticket', icon: 'AlertCircle' }
    ],
    'Student': [
      { name: 'Mail', path: '/lms/mail', icon: 'Mail' },
      { name: 'Folder', path: '/lms/folder', icon: 'Folder' },
      { name: 'Semester Prep', path: '/lms/semester-prep', icon: 'BookOpen' },
      { name: 'Study Material', path: '/lms/study-material', icon: 'FolderOpen' },
      { name: 'Projects', path: '/lms/projects', icon: 'Briefcase' },
      { name: 'Placement Corner', path: '/lms/placement-corner', icon: 'Target' },
      { name: 'Online Test', path: '/lms/online-test', icon: 'Monitor' },
      { name: 'Code Compiler', path: '/lms/code-compiler', icon: 'Code' },
      { name: 'Time Table', path: '/lms/time-table', icon: 'Calendar' },
      { name: 'Attendance', path: '/lms/attendance', icon: 'CheckCircle' },
      { name: 'Results', path: '/lms/results', icon: 'Award' },
      { name: 'Chat with Mentor', path: '/lms/chat-mentor', icon: 'MessageCircle' },
      { name: 'Approval', path: '/lms/approval', icon: 'CheckSquare' },
      { name: 'Library', path: '/lms/library', icon: 'BookOpen' },
      { name: 'Campus Calendar', path: '/lms/campus-calendar', icon: 'Calendar' },
      { name: 'Alumni', path: '/lms/alumni', icon: 'Users' },
      { name: 'Live Bus Tracking', path: '/lms/live-bus-tracking', icon: 'Navigation' },
      { name: 'College Contact', path: '/lms/college-contact', icon: 'Phone' },
      { name: 'Fee Payment', path: '/lms/fee-payment', icon: 'CreditCard' },
      { name: 'Hall Ticket', path: '/lms/hall-ticket', icon: 'CreditCard' },
      { name: 'Notice Board', path: '/lms/notice-board', icon: 'Clipboard' },
      { name: 'College Wall', path: '/lms/college-wall', icon: 'MessageSquare' },
      { name: 'Raise Ticket', path: '/lms/raise-ticket', icon: 'AlertCircle' }
    ],
    'Faculty': [
      { name: 'Mail', path: '/lms/mail', icon: 'Mail' },
      { name: 'Folder', path: '/lms/folder', icon: 'Folder' },
      { name: 'Semester Prep', path: '/lms/semester-prep', icon: 'BookOpen' },
      { name: 'Study Material', path: '/lms/study-material', icon: 'FolderOpen' },
      { name: 'Projects', path: '/lms/projects', icon: 'Briefcase' },
      { name: 'Online Test', path: '/lms/online-test', icon: 'Monitor' },
      { name: 'Code Compiler', path: '/lms/code-compiler', icon: 'Code' },
      { name: 'Time Table', path: '/lms/time-table', icon: 'Calendar' },
      { name: 'Attendance', path: '/lms/attendance', icon: 'CheckCircle' },
      { name: 'Results', path: '/lms/results', icon: 'Award' },
      { name: 'Campus Calendar', path: '/lms/campus-calendar', icon: 'Calendar' },
      { name: 'Notice Board', path: '/lms/notice-board', icon: 'Clipboard' },
      { name: 'College Wall', path: '/lms/college-wall', icon: 'MessageSquare' },
      { name: 'Raise Ticket', path: '/lms/raise-ticket', icon: 'AlertCircle' }
    ],
    'default': [
      { name: 'Mail', path: '/lms/mail', icon: 'Mail' },
      { name: 'Folder', path: '/lms/folder', icon: 'Folder' },
      { name: 'Study Material', path: '/lms/study-material', icon: 'FolderOpen' },
      { name: 'Projects', path: '/lms/projects', icon: 'Briefcase' },
      { name: 'Online Test', path: '/lms/online-test', icon: 'Monitor' },
      { name: 'Time Table', path: '/lms/time-table', icon: 'Calendar' },
      { name: 'Attendance', path: '/lms/attendance', icon: 'CheckCircle' },
      { name: 'Results', path: '/lms/results', icon: 'Award' },
      { name: 'Raise Ticket', path: '/lms/raise-ticket', icon: 'AlertCircle' }
    ]
  },
  Library: {
    'Chairperson': [
      { name: 'Dashboard', path: '/library/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/library/inbox', icon: 'Mail' },
      { name: 'List of Books', path: '/library/list-of-books', icon: 'BookOpen' },
      { name: 'Book Issue', path: '/library/book-issue', icon: 'ArrowRight' },
      { name: 'Overdue List', path: '/library/overdue-list', icon: 'Clock' },
      { name: 'Book Reservation', path: '/library/book-reservation', icon: 'Bookmark' },
      { name: 'Late Fee', path: '/library/late-fee', icon: 'DollarSign' },
      { name: 'Reports', path: '/library/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/library/raise-ticket', icon: 'AlertCircle' }
    ],
    'Library Incharge': [
      { name: 'Dashboard', path: '/library/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/library/inbox', icon: 'Mail' },
      { name: 'List of Books', path: '/library/list-of-books', icon: 'BookOpen' },
      { name: 'Book Issue', path: '/library/book-issue', icon: 'ArrowRight' },
      { name: 'Overdue List', path: '/library/overdue-list', icon: 'Clock' },
      { name: 'Book Reservation', path: '/library/book-reservation', icon: 'Bookmark' },
      { name: 'Late Fee', path: '/library/late-fee', icon: 'DollarSign' },
      { name: 'Reports', path: '/library/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/library/raise-ticket', icon: 'AlertCircle' }
    ],
    'Student': [
      { name: 'List of Books', path: '/library/list-of-books', icon: 'BookOpen' },
      { name: 'Book Reservation', path: '/library/book-reservation', icon: 'Bookmark' },
      { name: 'Late Fee', path: '/library/late-fee', icon: 'DollarSign' },
      { name: 'Raise Ticket', path: '/library/raise-ticket', icon: 'AlertCircle' }
    ],
    'Faculty': [
      { name: 'List of Books', path: '/library/list-of-books', icon: 'BookOpen' },
      { name: 'Book Issue', path: '/library/book-issue', icon: 'ArrowRight' },
      { name: 'Book Reservation', path: '/library/book-reservation', icon: 'Bookmark' },
      { name: 'Late Fee', path: '/library/late-fee', icon: 'DollarSign' },
      { name: 'Raise Ticket', path: '/library/raise-ticket', icon: 'AlertCircle' }
    ],
    'default': [
      { name: 'Dashboard', path: '/library/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/library/inbox', icon: 'Mail' },
      { name: 'List of Books', path: '/library/list-of-books', icon: 'BookOpen' },
      { name: 'Book Issue', path: '/library/book-issue', icon: 'ArrowRight' },
      { name: 'Reports', path: '/library/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/library/raise-ticket', icon: 'AlertCircle' }
    ]
  },
  Transport: {
    'Chairperson': [
      { name: 'Dashboard', path: '/transport/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/transport/inbox', icon: 'Mail' },
      { name: 'Bus Details', path: '/transport/bus-details', icon: 'Bus' },
      { name: 'Student List', path: '/transport/student-list', icon: 'Users' },
      { name: 'Faculty', path: '/transport/faculty', icon: 'GraduationCap' },
      { name: 'Fee Details', path: '/transport/fee-details', icon: 'DollarSign' },
      { name: 'Driver Details', path: '/transport/driver-details', icon: 'User' },
      { name: 'Expense', path: '/transport/expense', icon: 'Receipt' },
      { name: 'Live Location', path: '/transport/live-location', icon: 'MapPin' },
      { name: 'Vehicle Documents', path: '/transport/vehicle-documents', icon: 'FileText' },
      { name: 'Reports', path: '/transport/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/transport/raise-ticket', icon: 'AlertCircle' }
    ],
    'Transportation Incharge': [
      { name: 'Dashboard', path: '/transport/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/transport/inbox', icon: 'Mail' },
      { name: 'Bus Details', path: '/transport/bus-details', icon: 'Bus' },
      { name: 'Student List', path: '/transport/student-list', icon: 'Users' },
      { name: 'Faculty', path: '/transport/faculty', icon: 'GraduationCap' },
      { name: 'Fee Details', path: '/transport/fee-details', icon: 'DollarSign' },
      { name: 'Driver Details', path: '/transport/driver-details', icon: 'User' },
      { name: 'Expense', path: '/transport/expense', icon: 'Receipt' },
      { name: 'Live Location', path: '/transport/live-location', icon: 'MapPin' },
      { name: 'Vehicle Documents', path: '/transport/vehicle-documents', icon: 'FileText' },
      { name: 'Reports', path: '/transport/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/transport/raise-ticket', icon: 'AlertCircle' }
    ],
    'Student': [
      { name: 'Bus Details', path: '/transport/bus-details', icon: 'Bus' },
      { name: 'Fee Details', path: '/transport/fee-details', icon: 'DollarSign' },
      { name: 'Live Location', path: '/transport/live-location', icon: 'MapPin' },
      { name: 'Raise Ticket', path: '/transport/raise-ticket', icon: 'AlertCircle' }
    ],
    'default': [
      { name: 'Dashboard', path: '/transport/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/transport/inbox', icon: 'Mail' },
      { name: 'Bus Details', path: '/transport/bus-details', icon: 'Bus' },
      { name: 'Student List', path: '/transport/student-list', icon: 'Users' },
      { name: 'Fee Details', path: '/transport/fee-details', icon: 'DollarSign' },
      { name: 'Live Location', path: '/transport/live-location', icon: 'MapPin' },
      { name: 'Reports', path: '/transport/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/transport/raise-ticket', icon: 'AlertCircle' }
    ]
  },
  Hostel: {
    'Chairperson': [
      { name: 'Dashboard', path: '/hostel/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/hostel/inbox', icon: 'Mail' },
      { name: 'Hostel Student List', path: '/hostel/students', icon: 'Users' },
      { name: 'Fee Details', path: '/hostel/fee-details', icon: 'DollarSign' },
      { name: 'Out Time', path: '/hostel/out-time', icon: 'Clock' },
      { name: 'Student Permissions', path: '/hostel/student-permissions', icon: 'UserCheck' },
      { name: 'Geo Fencing', path: '/hostel/geo-fencing', icon: 'MapPin' },
      { name: 'Inventory', path: '/hostel/inventory', icon: 'Package' },
      { name: 'Reports', path: '/hostel/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/hostel/raise-ticket', icon: 'AlertCircle' }
    ],
    'Hostel Incharge': [
      { name: 'Dashboard', path: '/hostel/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/hostel/inbox', icon: 'Mail' },
      { name: 'Hostel Student List', path: '/hostel/hostel-student-list', icon: 'Users' },
      { name: 'Fee Details', path: '/hostel/fee-details', icon: 'DollarSign' },
      { name: 'Out Time', path: '/hostel/out-time', icon: 'Clock' },
      { name: 'Student Permissions', path: '/hostel/student-permissions', icon: 'UserCheck' },
      { name: 'Geo Fencing', path: '/hostel/geo-fencing', icon: 'MapPin' },
      { name: 'Inventory', path: '/hostel/inventory', icon: 'Package' },
      { name: 'Reports', path: '/hostel/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/hostel/raise-ticket', icon: 'AlertCircle' }
    ],
    'Student': [
      { name: 'Fee Details', path: '/hostel/fee-details', icon: 'DollarSign' },
      { name: 'Out Time', path: '/hostel/out-time', icon: 'Clock' },
      { name: 'Student Permissions', path: '/hostel/student-permissions', icon: 'UserCheck' },
      { name: 'Raise Ticket', path: '/hostel/raise-ticket', icon: 'AlertCircle' }
    ],
    'default': [
      { name: 'Dashboard', path: '/hostel/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/hostel/inbox', icon: 'Mail' },
      { name: 'Hostel Student List', path: '/hostel/hostel-student-list', icon: 'Users' },
      { name: 'Fee Details', path: '/hostel/fee-details', icon: 'DollarSign' },
      { name: 'Out Time', path: '/hostel/out-time', icon: 'Clock' },
      { name: 'Reports', path: '/hostel/reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/hostel/raise-ticket', icon: 'AlertCircle' }
    ]
  },
  Parent: {
    'Chairperson': [
      { name: 'Inbox', path: '/parent/inbox', icon: 'Mail' },
      { name: 'Your Child Class Room', path: '/parent/child-classroom', icon: 'Users' },
      { name: 'Your Child Hostel Attendance', path: '/parent/child-hostel-attendance', icon: 'CheckCircle' },
      { name: 'Your Child Result', path: '/parent/child-result', icon: 'Award' },
      { name: 'Notice Board', path: '/parent/notice-board', icon: 'Clipboard' },
      { name: 'Fee Details', path: '/parent/fee-details', icon: 'DollarSign' },
      { name: 'Talk to Mentor', path: '/parent/talk-to-mentor', icon: 'MessageCircle' }
    ],
    'Parent': [
      { name: 'Inbox', path: '/parent/inbox', icon: 'Mail' },
      { name: 'Your Child Class Room', path: '/parent/child-classroom', icon: 'Users' },
      { name: 'Your Child Hostel Attendance', path: '/parent/child-hostel-attendance', icon: 'CheckCircle' },
      { name: 'Your Child Result', path: '/parent/child-result', icon: 'Award' },
      { name: 'Notice Board', path: '/parent/notice-board', icon: 'Clipboard' },
      { name: 'Fee Details', path: '/parent/fee-details', icon: 'DollarSign' },
      { name: 'Talk to Mentor', path: '/parent/talk-to-mentor', icon: 'MessageCircle' }
    ],
    'default': [
      { name: 'Inbox', path: '/parent/inbox', icon: 'Mail' },
      { name: 'Your Child Class Room', path: '/parent/child-classroom', icon: 'Users' },
      { name: 'Your Child Result', path: '/parent/child-result', icon: 'Award' },
      { name: 'Notice Board', path: '/parent/notice-board', icon: 'Clipboard' },
      { name: 'Fee Details', path: '/parent/fee-details', icon: 'DollarSign' },
      { name: 'Talk to Mentor', path: '/parent/talk-to-mentor', icon: 'MessageCircle' }
    ]
  },
  Communications: {
    'Chairperson': [
      { name: 'Post on Wall', path: '/communications/post-on-wall', icon: 'MessageSquare' },
      { name: 'Send Push Notification', path: '/communications/send-push-notification', icon: 'Bell' },
      { name: 'Send SMS', path: '/communications/send-sms', icon: 'MessageCircle' },
      { name: 'Send WhatsApp Messages', path: '/communications/send-whatsapp', icon: 'MessageCircle' },
      { name: 'Send Email', path: '/communications/send-email', icon: 'Mail' },
      { name: 'Message Credits', path: '/communications/message-credits', icon: 'CreditCard' },
      { name: 'Reports', path: '/communications/reports', icon: 'FileText' }
    ],
    'default': [
      { name: 'Post on Wall', path: '/communications/post-on-wall', icon: 'MessageSquare' },
      { name: 'Send Push Notification', path: '/communications/send-push-notification', icon: 'Bell' },
      { name: 'Send SMS', path: '/communications/send-sms', icon: 'MessageCircle' },
      { name: 'Send WhatsApp Messages', path: '/communications/send-whatsapp', icon: 'MessageCircle' },
      { name: 'Send Email', path: '/communications/send-email', icon: 'Mail' },
      { name: 'Message Credits', path: '/communications/message-credits', icon: 'CreditCard' },
      { name: 'Reports', path: '/communications/reports', icon: 'FileText' }
    ]
  }
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModule] = useState('Home');
  const [activeSidebarItem, setActiveSidebarItem] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-navigate to appropriate module and first item on login
  useEffect(() => {
    if (user) {
      const userModules = getModulesForRole(user.role);
      
      // Determine initial module based on role
      let initialModule = 'Academics'; // default
      if (user.role === 'Chairperson' || user.role === 'College Secretary') {
        initialModule = 'Home';
      }
      
      // Check if current path matches any module
      const currentPath = location.pathname;
      const matchedModule = userModules.find(module => 
        currentPath.includes(`/${module.toLowerCase()}`)
      );
      
      if (!matchedModule && currentPath === '/') {
        // User just logged in, redirect to appropriate module
        setActiveModule(initialModule);
        const sidebarItems = getSidebarItemsForModule(initialModule, user.role);
        
        if (sidebarItems.length > 0) {
          const firstItem = getFirstNavigableItem(sidebarItems);
          if (firstItem) {
            navigate(firstItem.path);
            setActiveSidebarItem(firstItem.path);
          }
        }
      } else if (matchedModule) {
        // Update active module based on current path
        setActiveModule(matchedModule);
      }
    }
  }, [user, location.pathname, navigate]);

  // Helper function to get the first navigable item (not a parent with children)
  const getFirstNavigableItem = (items: any[]): any | null => {
    for (const item of items) {
      if (!item.children || item.children.length === 0) {
        return item;
      } else {
        // Look in children
        const childItem = getFirstNavigableItem(item.children);
        if (childItem) return childItem;
      }
    }
    return null;
  };

  // Update active module and navigate to first item when module changes
  const handleSetActiveModule = (module: string) => {
    setActiveModule(module);
    
    if (user) {
      const sidebarItems = getSidebarItemsForModule(module, user.role);
      if (sidebarItems.length > 0) {
        const firstItem = getFirstNavigableItem(sidebarItems);
        if (firstItem) {
          navigate(firstItem.path);
          setActiveSidebarItem(firstItem.path);
        }
      }
    }
  };

  const getModulesForRole = (role: string): string[] => {
    return MODULE_ACCESS[role as keyof typeof MODULE_ACCESS] || ['Home'];
  };

  const getSidebarItemsForModule = (module: string, role: string) => {
    const moduleItems = SIDEBAR_ITEMS[module as keyof typeof SIDEBAR_ITEMS];
    if (!moduleItems) return [];
    
    return moduleItems[role as keyof typeof moduleItems] || moduleItems.default || [];
  };

  const toggleExpanded = (itemPath: string) => {
    setExpandedItems(prev => 
      prev.includes(itemPath) 
        ? prev.filter(path => path !== itemPath)
        : [...prev, itemPath]
    );
  };

  return (
    <NavigationContext.Provider value={{
      activeModule,
      setActiveModule: handleSetActiveModule, // Use the updated function
      activeSidebarItem,
      setActiveSidebarItem,
      getModulesForRole,
      getSidebarItemsForModule,
      expandedItems,
      toggleExpanded
    }}>
      {children}
    </NavigationContext.Provider>
  );
};
