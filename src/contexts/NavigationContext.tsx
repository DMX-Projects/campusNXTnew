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

  'Faculty': ['Academics','Examination' ,'LMS', 'Library','Parent'],
  'Lab Assistant': ['Academics', 'LMS'],
  'Lab Technician': ['Academics', 'LMS'],
  'Student': ['Academics','Administration','Examination' ,'LMS','Placements', 'Library', 'Transport', 'Hostel'],

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
    'Principal': [
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
    'Student': [
      { name: 'Dashboard', path: '/academics/student-dashboard', icon: 'BarChart3' },
      { name: 'My Attendance', path: '/academics/my-attendance', icon: 'CheckCircle' },
      { name: 'Courses', path: '/academics/student-courses', icon: 'BookOpen' },
      { name: 'Assignments', path: '/academics/student-assignments', icon: 'FileText' },
      { name: 'Exams', path: '/academics/student-exams', icon: 'Monitor' },
      { name: 'Results&Records', path: '/academics/student-recordsresults', icon: 'CheckCircle' },
      { name: 'Profile', path: '/academics/student-profile', icon: 'User' },
      { name: 'Fee Management', path: '/academics/student-feemanagement', icon: 'DollarSign' },
      { name: 'Class Schedule', path: '/academics/student-classschedule', icon: 'Calendar' },
      { name: 'Study Material', path: '/academics/student-studymaterial', icon: 'FolderOpen' }
    ],
    'Principal': [
  { name: 'Dashboard', path: '/academics/dashboard', icon: 'BarChart3' },

  {
    name: 'Students',
    path: '/academics/principal-students',
    icon: 'Users',
    children: [
      { name: 'Student Attendance', path: '/academics/student-attendance', icon: 'CheckCircle' },
      { name: 'Student Leaves', path: '/academics/student-leaves', icon: 'UserMinus' },
      { name: 'Student Approval', path: '/academics/student-approval', icon: 'UserCheck' },
      { name: 'Student Projects', path: '/academics/student-projects', icon: 'Briefcase' },
    ]
  },

  {
    name: 'Academics',
    path: '/academics/principal-academics',
    icon: 'BookOpen',
    children: [
      { name: 'Timetable', path: '/academics/timetable', icon: 'Calendar' },
      { name: 'Academic Calendar', path: '/academics/academic-calendar', icon: 'Calendar' },
      { name: 'Subjects & Syllabus', path: '/academics/subjects-syllabus', icon: 'BookOpen' },
      { name: 'Syllabus Tracking', path: '/academics/syllabus-tracking', icon: 'Target' },
      { name: 'Study Material', path: '/academics/study-material', icon: 'FolderOpen' },
    ]
  },

  {
    name: 'Assessments',
    path: '/academics/principal-assessments',
    icon: 'FileText',
    children: [
      { name: 'Student Exam Preparation', path: '/academics/exam-preparation', icon: 'FileText' },
      { name: 'Online Tests', path: '/academics/online-tests', icon: 'Monitor' },
      { name: 'Coding Assessment', path: '/academics/coding-assessment', icon: 'Code' },
    ]
  },

  {
    name: 'Faculty',
    path: '/academics/principal-faculty',
    icon: 'GraduationCap',
    children: [
      { name: 'Faculty Feedback', path: '/academics/faculty-feedback', icon: 'MessageSquare' },
    ]
  },

  {
    name: 'Resources',
    path: '/academics/principal-resources',
    icon: 'FolderOpen',
    children: [
      { name: 'Schedule Online Class', path: '/academics/schedule-online-class', icon: 'Video' },
    ]
  },

  { name: 'Reports', path: '/academics/reports', icon: 'FileText' },
  { name: 'Inbox', path: '/academics/inbox', icon: 'Mail' },
  { name: 'Raise Ticket', path: '/academics/raise-ticket', icon: 'AlertCircle' }
],
    'HoD': [
  { name: 'Dashboard', path: '/academics/dashboard', icon: 'BarChart3' },
<<<<<<< Updated upstream

=======
  { name: 'Academic Calendar', path: '/common/academics/academic-calendar', icon: 'Calendar' },
  { 
    name: 'Faculty', 
    path: '/academics', 
    icon: 'GraduationCap',
    children: [
      { name: 'Faculty Details', path: '/academics/faculty/faculty-details', icon: 'GraduationCap' },
      { name: 'Faculty Attendance', path: '/academics/faculty/faculty-attendance', icon: 'MessageSquare' },
      { name: 'Faculty Leave Requests', path: '/academics/faculty/faculty-leave-requests', icon: 'MessageSquare' },
    ]
  },
>>>>>>> Stashed changes
  { 
    name: 'Students', 
    path: '/academics', 
    icon: 'Users',
    children: [
<<<<<<< Updated upstream
      { name: 'Student Attendance', path: '/academics/student-attendance', icon: 'CheckCircle' },
      { name: 'Student Leaves', path: '/academics/student-leaves', icon: 'UserMinus' },
      { name: 'Student Approval', path: '/academics/student-approval', icon: 'UserCheck' },
      { name: 'Student Projects', path: '/academics/student-projects', icon: 'Briefcase' },
=======
      { name: 'Student Attendance', path: '/academics/hod/student-attendance', icon: 'CheckCircle' },
      { name: 'Student Leaves', path: '/academics/hod/student-leaves', icon: 'UserMinus' },
      { name: 'Student Projects', path: '/academics/hod/student-projects', icon: 'Briefcase' },
>>>>>>> Stashed changes
    ]
  },

  { 
    name: 'Academics', 
    path: '/academics/setup', 
    icon: 'BookOpen',
    children: [
      { name: 'Timetable', path: '/academics/timetable', icon: 'Calendar' },
      { name: 'Academic Calendar', path: '/academics/academic-calendar', icon: 'Calendar' },
      { name: 'Subjects & Syllabus', path: '/academics/subjects-syllabus', icon: 'BookOpen' },
      { name: 'Syllabus Tracking', path: '/academics/syllabus-tracking', icon: 'Target' },
    ]
  },
<<<<<<< Updated upstream

  { 
    name: 'Assessments', 
    path: '/academics/assessments', 
    icon: 'FileText',
    children: [
      { name: 'Student Exam Preparation', path: '/academics/exam-preparation', icon: 'FileText' },
      { name: 'Online Tests', path: '/academics/online-tests', icon: 'Monitor' },
      { name: 'Coding Assessment', path: '/academics/coding-assessment', icon: 'Code' },
    ]
  },

  { 
    name: 'Resources', 
    path: '/academics/resources', 
    icon: 'FolderOpen',
    children: [
      { name: 'Study Material', path: '/academics/study-material', icon: 'FolderOpen' },
      { name: 'Schedule Online Class', path: '/academics/schedule-online-class', icon: 'Video' },
    ]
  },

  { 
    name: 'Faculty', 
    path: '/academics/faculty', 
    icon: 'GraduationCap',
    children: [
      { name: 'Faculty', path: '/academics/faculty', icon: 'GraduationCap' },
      { name: 'Faculty Feedback', path: '/academics/faculty-feedback', icon: 'MessageSquare' },
    ]
  },

  { name: 'Reports', path: '/academics/reports', icon: 'FileText' },
  { name: 'Inbox', path: '/academics/inbox', icon: 'Mail' },
  { name: 'Raise Ticket', path: '/academics/raise-ticket', icon: 'AlertCircle' }
=======
  { name: 'CAT', path: '/academics/hod/cat', icon: 'Code' },

  { name: 'Leave Requests', path: '/academics/hod/leave-requests', icon: 'FileText' },

  { name: 'Reports', path: '/academics/hod/reports', icon: 'FileText' },
  { name: 'Raise Ticket', path: '/academics/hod/raise-ticket', icon: 'AlertCircle' }
>>>>>>> Stashed changes
],

    'Faculty': [
  { name: 'Dashboard', path: '/academics/dashboard', icon: 'BarChart3' },

  { 
    name: 'Students', 
    path: '/academics/faculty-students', 
    icon: 'Users',
    children: [
      { name: 'Student Attendance', path: '/academics/faculty-studentattendance', icon: 'CheckCircle' },
      { name: 'Student Projects', path: '/academics/faculty-studentprojects', icon: 'Briefcase' },
    ]
  },

  { 
    name: 'Academics', 
    path: '/academics/faculty-academics', 
    icon: 'BookOpen',
    children: [
      { name: 'Timetable', path: '/academics/faculty-timetable', icon: 'Calendar' },
      { name: 'Academic Calendar', path: '/academics/faculty-calendar', icon: 'Calendar' },
      { name: 'Subjects & Syllabus', path: '/academics/faculty-subjects-syllabus', icon: 'BookOpen' },
      { name: 'Study Material', path: '/academics/faculty-StudyMaterial', icon: 'FolderOpen' },
    ]
  },

  { 
    name: 'Assessments', 
    path: '/academics/faculty-assessments', 
    icon: 'FileText',
    children: [
      { name: 'Online Tests', path: '/academics/faculty-FacultyOnlineTest', icon: 'Monitor' },
      // If you later enable coding or syllabus tracking for faculty, add here
    ]
  },

  { 
    name: 'Resources', 
    path: '/academics/faculty-resources', 
    icon: 'FolderOpen',
    children: [
      { name: 'Schedule Online Class', path: '/academics/faculty-schedule-onlineclass', icon: 'Video' },
    ]
  },

  { name: 'Reports', path: '/academics/faculty-reports', icon: 'FileText' },
  { name: 'Inbox', path: '/academics/faculty-inbox', icon: 'Mail' },
  { name: 'Announcement', path: '/academics/announcement', icon: 'Megaphone' },
  { name: 'Raise Ticket', path: '/academics/faculty-raiseticket', icon: 'AlertCircle' }
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
    'Student': [
      { name: 'Profile', path: '/administration/student-form', icon: 'Users' },
      { name: 'Fee Management', path: '/administration/fee-management', icon: 'DollarSign' },
      { name: 'My Certificates', path: '/administration/my-certificates', icon: 'HelpCircle' },
      
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
      { name: 'Exam Timetable', path: '/examination/exam-time-table', icon: 'Calendar' },
      { name: 'Seating Plan', path: '/examination/seating-plan', icon: 'MapPin' },
      { name: ' Invisgilators', path: '/examination/invisgilator', icon: 'Search' },
      { name: 'Student Attendance', path: '/examination/student-attendance', icon: 'CheckCircle' },
      { name: 'Condonation List', path: '/examination/condonation', icon: 'FileCheck' },
      { name: 'Detained List', path: '/examination/detained', icon: 'UserX' },
      { name: 'Hall Tickets', path: '/examination/hall-tickets', icon: 'CreditCard' },
      { name: 'Exam Attendance', path: '/examination/exam-attendance', icon: 'CheckSquare' },
      { name: 'Exam Evaluation', path: '/examination/exam-evaluation', icon: 'FileText' },
      { name: 'Exam Results', path: '/examination/exam-results', icon: 'Award' },
      { name: 'Marks List', path: '/examination/marks-list', icon: 'List' },
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
      { name: 'Dashboard', path: '/examination/dashboard-faculty', icon: 'BarChart3' },
      { name: 'Inbox', path: '/examination/inbox', icon: 'Mail' },
      { name: 'Exam Timetable', path: '/examination/examtimetable-faculty', icon: 'Calendar' },
      { name: 'Invigilation Duties', path: '/examination/invigilation-faculty', icon: 'FileText' },
      { name: 'Student Attendance', path: '/examination/studentattendance-faculty', icon: 'FileText' },
      { name: 'Exam Evaluation', path: '/examination/examevalution-faculty', icon: 'FileText' },
      { name: 'Marks List', path: '/examination/marklist-faculty', icon: 'FileText' },
      { name: 'Exam Results', path: '/examination/examresults-faculty', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/examination/faculty-raiseticket', icon: 'AlertCircle' }
    ],
    'Student': [
       { name: 'Dashboard', path: '/examination/student-dashboard', icon: 'Calendar' },
       { name: 'ExamAttendance', path: '/examination/student-examattendance', icon: 'Calendar' },
      { name: 'Exam Schedule', path: '/examination/student-examtimetable', icon: 'Calendar' },
      { name: 'Hall Tickets', path: '/examination/student-studenthallticket', icon: 'CreditCard' },
       { name: 'Exam Results', path: '/examination/student-examresult', icon: 'Award' },
      { name: 'Raise Ticket', path: '/examination/student-raiseticket', icon: 'AlertCircle' }
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
      { name: 'Placement Calendar', path: '/placements/calendar', icon: 'Calendar' },
      { name: 'Historical Placement', path: '/placements/history', icon: 'History' },
      { name: 'Placement Company', path: '/placements/Placement_Companies/companies', icon: 'Building' },
      { name: 'Notify Students', path: '/placements/notify-students', icon: 'Bell' },
      { name: 'Student Registration', path: '/placements/placement-Companies/driver-registration', icon: 'UserPlus' },
      { name: 'Generate Eligible Students', path: '/placements/Placement_Companies/eligible-students', icon: 'Users' },
      { name: 'Assessment Test', path: '/placements/assesment-test', icon: 'FileQuestion' },
      { name: 'Schedule Tests', path: '/placements/schedule-test', icon: 'Calendar' },
      { name: 'Placement Results', path: '/placements/placements-results', icon: 'Award' },
      { name: 'Internships', path: '/placements/internships', icon: 'Briefcase' },
      { name: 'Placed Student Details', path: '/placements/placed-student-details', icon: 'UserCheck' },
      { name: 'Placement Courses', path: '/placements/placement-courses', icon: 'BookOpen' },
      { name: 'Reports', path: '/placements/placement-reports', icon: 'FileText' },
      { name: 'Raise Ticket', path: '/placements/raise-ticket', icon: 'AlertCircle' }
    ],
    
    'Student': [
      { name: 'Dashboard', path: '/placements/student/dashboard', icon: 'BarChart3' },
      { name: 'Inbox', path: '/placements/student/inbox', icon: 'Mail' },
      { name: 'Placement Calendar', path: '/placements/student/placement-calendar', icon: 'Calendar' },
      { name: 'Companies', path: '/placements/student/companies', icon: 'Building' },
      { name: 'Resume Manager', path: '/placements/student/resume-manager', icon: 'FileText' },
      { name: 'Prep Materials', path: '/placements/student/prep-materials', icon: 'BookOpen' },
      { name: 'Mock Tests', path: '/placements/student/mock-tests', icon: 'FileText' },
      { name: 'Placement Results', path: '/placements/student/placement-results', icon: 'UserCheck' },
      { name: 'Internships/Offers', path: '/placements/student/internships-offers', icon: 'Briefcase' },
      { name: 'Raise Ticket', path: '/placements/student/raise-ticket', icon: 'AlertCircle' }
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
      { name: 'Time Table', path: '/lms/time-table', icon: 'Calendar' },
      { name: 'Results', path: '/lms/results', icon: 'Award' },
      { name: 'Chat with Mentor', path: '/lms/chat-mentor', icon: 'MessageCircle' },
      { name: 'Approval', path: '/lms/approval', icon: 'CheckSquare' },
      { name: 'Campus Calendar', path: '/lms/campus-calendar', icon: 'Calendar' },
      { name: 'Alumni', path: '/lms/alumni', icon: 'Users' },
      { name: 'Raise Ticket', path: '/lms/raise-ticket', icon: 'AlertCircle' }
    ],
    'Student': [
      { name: 'Mail', path: '/lms/student/mail', icon: 'Mail' },
      { name: 'Time Table', path: '/lms/student/time-table', icon: 'Calendar' },
      
      { name: 'Study Material', path: '/lms/student/study-material', icon: 'FolderOpen' },
      { name: 'Semester Prep', path: '/lms/student/semester-prep', icon: 'BookOpen' },
      { name: 'Projects', path: '/lms/student/projects', icon: 'Briefcase' },
      { name: 'Online Test', path: '/lms/student/online-test', icon: 'Monitor' },
      { name: 'Code Compiler', path: '/lms/student/code-compiler', icon: 'Code' },
      { name: 'Results', path: '/lms/student/results', icon: 'Award' },
      { name: 'Hall Ticket', path: '/lms/student/hall-ticket', icon: 'CreditCard' },
      { name: 'Chat with Mentor', path: '/lms/student/chat-mentor', icon: 'MessageCircle' },
      { name: 'Approval', path: '/lms/student/approval', icon: 'CheckSquare' },
      { name: 'Notice Board', path: '/lms/student/notice-board', icon: 'Clipboard' },
    ],
    'Faculty': [
      { name: 'Mail', path: '/lms/Faculty/mail', icon: 'Mail' },
      { name: 'Semester Prep', path: '/lms/Faculty/semester-prep', icon: 'BookOpen' },
      { name: 'Study Material', path: '/lms/Faculty/study-material', icon: 'FolderOpen' },
     
      { name: 'Time Table', path: '/lms/Faculty/time-table', icon: 'Calendar' },
      { name: 'Attendance', path: '/lms/Faculty/attendance', icon: 'CheckCircle' },
      { name: 'Results', path: '/lms/Faculty/results', icon: 'Award' },
     
      { name: 'Raise Ticket', path: '/lms/Faculty/raise-ticket', icon: 'AlertCircle' }
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
     { name: 'Dashboard', path: '/library/faculty/dashboard', icon: 'BookOpen' },
      { name: 'My Issue Books', path: '/library/faculty/book-issue', icon: 'ArrowRight' },
      { name: 'Book Reservation', path: '/library/faculty/book-reservation', icon: 'Bookmark' },
      { name: 'Over Due Books', path: '/library/over-due-books', icon: 'DollarSign' },
      { name: 'Search Book', path: '/library/Search-book', icon: 'AlertCircle' },
      { name: 'RequestBookIssue', path: '/library/request-book', icon: 'FileText' },
       { name: 'MyBorrowedBooks', path: '/library/faculty/myborrowed-books', icon: 'ArrowRight' },
      { name: 'Renewal Request', path: '/library/faculty/renewal-request', icon: 'Bookmark' },

    ],
    'Faculty': [
      { name: 'Dashboard', path: '/library/faculty/dashboard', icon: 'BookOpen' },
      { name: 'My Issue Books', path: '/library/faculty/book-issue', icon: 'ArrowRight' },
      { name: 'Book Reservation', path: '/library/faculty/book-reservation', icon: 'Bookmark' },
      { name: 'Over Due Books', path: '/library/over-due-books', icon: 'DollarSign' },
      { name: 'Search Book', path: '/library/Search-book', icon: 'AlertCircle' },
      { name: 'RequestBookIssue', path: '/library/request-book', icon: 'FileText' }
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
      { name: 'Bus Details', path: '/transport/StuTransport/bus-details', icon: 'Bus' },
      { name: 'Fee Details', path: '/transport/StuTransport/fee-details', icon: 'DollarSign' },
      { name: 'Live Location', path: '/transport/StuTransport/live-location', icon: 'MapPin' },
      { name: 'Raise Ticket', path: '/transport/StuTransport/tickets', icon: 'AlertCircle' }
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
    { 
      name: 'Hostel Setup', 
      path: '/hostel/setup', 
      icon: 'Settings',
      children: [
        { name: 'Buildings & Blocks', path: '/hostel/setup/buildings-and-blocks', icon: 'Building2' },
        { name: 'Rules & Policies', path: '/hostel/setup/rules', icon: 'FileText' }
      ]
    },
    { 
      name: 'Occupancy & Rooms', 
      path: '/hostel/rooms', 
      icon: 'Home',
      children: [
        { name: 'Hostel Applications', path: '/hostel/applications/new', icon: 'ClipboardList' },
        { name: 'Room Allotment', path: '/hostel/rooms/allotment', icon: 'UserPlus' },  
        { name: 'Room Change Requests', path: '/hostel/rooms/change-requests', icon: 'Repeat' }
      ]
    },
    { 
      name: 'Applications & Leave', 
      path: '/hostel/applications', 
      icon: 'FileCheck',
      children: [
        
        { name: 'Leave Requests', path: '/hostel/applications/leave', icon: 'CalendarCheck' },
        { name: 'Entry/Exit Logs', path: '/hostel/applications/logs', icon: 'LogIn' }
      ]
    },
    { 
      name: 'Fee Management', 
      path: '/hostel/fees', 
      icon: 'Wallet',
      children: [
        { name: 'Fee Collection', path: '/hostel/fees/collection', icon: 'CreditCard' },
        { name: 'Fee Reports', path: '/hostel/fees/reports', icon: 'FileSpreadsheet' }
      ]
    },
    { 
      name: 'Tickets', 
      path: '/hostel/complaints', 
      icon: 'AlertTriangle',
      children: [
        { name: 'Student Tickets', path: '/hostel/complaints/list', icon: 'MessageSquare' },
        { name: 'Discipline Cases', path: '/hostel/complaints/discipline', icon: 'Gavel' },
      ]
    },
    { 
      name: 'Visitors', 
      path: '/hostel/visitors', 
      icon: 'Users',
      children: [
        { name: 'Visitor Approvals', path: '/hostel/visitors/approvals', icon: 'UserCheck' },
        { name: 'Visitor Logs', path: '/hostel/visitors/logs/warden', icon: 'ClipboardList' }
      ]
    },
        { name: 'Occupancy & Fees Reports', path: '/hostel/reports/occupancy', icon: 'PieChart' },
     
    { name: 'Notifications', path: '/hostel/notifications', icon: 'Bell' }
  ],
  'default': [
    { name: 'Notifications', path: '/hostel/notifications', icon: 'Bell' }
  ],
    'Student': [
    { name: 'Dashboard', path: '/hostel/student-dashboard', icon: 'BarChart3' },
    { 
      name: 'Room & Application', 
      path: '/hostel/room', 
      icon: 'Home',
      children: [
        { name: 'Apply for Hostel', path: '/hostel/room/apply', icon: 'ClipboardList' },
        { name: 'Room Details & History', path: '/hostel/room/details', icon: 'FileText' },
        { name: 'Request Room Change', path: '/hostel/room/change-request', icon: 'Repeat' }
      ]
    },
    { 
      name: 'Leave & Movement', 
      path: '/hostel/leave', 
      icon: 'CalendarCheck',
      children: [
        { name: 'Apply for Leave', path: '/hostel/leave/apply', icon: 'FileCheck' },
        { name: ' Entry/Exit Gate Pass', path: '/hostel/leave/gate-pass', icon: 'QrCode' },
        // { name: 'Track Leave/Return', path: '/hostel/leave/status', icon: 'Clock' }
      ]
    },
    { 
      name: 'Fee Management', 
      path: '/hostel/fees', 
      icon: 'Wallet',
      children: [
        { name: 'View Fee Details', path: '/hostel/fees/details', icon: 'CreditCard' },
        { name: 'Pay Online', path: '/hostel/fees/pay', icon: 'DollarSign' },
        { name: 'Download Receipts', path: '/hostel/fees/receipts', icon: 'Download' }
      ]
    },
    // { 
    //   name: 'Complaints & Feedback', 
    //   path: '/hostel/complaints', 
    //   icon: 'AlertTriangle',
    //   children: [
    //     { name: 'Submit Complaint', path: '/hostel/complaints/new', icon: 'MessageSquare' },
    //     { name: 'Track Complaint Status', path: '/hostel/complaints/status', icon: 'Eye' },
    //     { name: 'Give Feedback', path: '/hostel/complaints/feedback', icon: 'Star' }
    //   ]
    // },
    
    { 
      name: 'Visitors', 
      path: '/hostel/visitors', 
      icon: 'Users',
      children: [
        { name: 'Register Visitor', path: '/hostel/visitors/register', icon: 'UserPlus' },
        { name: 'Visitor Logs', path: '/hostel/visitors/logs', icon: 'ClipboardList' }
      ]
    },
    { name: 'Ticket', path: 'hostel/complaints/new', icon: 'ClipboardList' },
    { name: 'Notifications', path: '/hostel/notifications', icon: 'Bell' }
  ],

  },
  Parent: {
    'Chairperson': [
      {name: 'Ticket Raised', path: '/parent/ticket-raised', icon: 'AlertCircle'}
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
    'Faculty': [
      { name: 'Parent Directory', path: '/parent/parent-directory', icon: 'Folder' },
      { name: 'Parent Messages', path: '/parent/parent-messages', icon: 'MessageCircle' },
      { name: 'Parent Notifications', path: '/parent/parent-notifications', icon: 'Bell' }
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
      } else if (user.role === 'Student') {
        initialModule = 'Hostel';
      } else if (user.role === 'Hostel Incharge') {
        initialModule = 'Hostel';
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
