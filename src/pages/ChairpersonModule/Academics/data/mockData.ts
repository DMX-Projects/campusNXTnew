import { User, Role, Department, Course, Program, Institution, Client } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: '455677',
    firstName: 'Sujatha',
    lastName: 'Sharma',
    email: 'sujatha@college.edu',
    role: 'STU',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    username: '344456',
    firstName: 'Komali',
    lastName: 'Reddy',
    email: 'komali@college.edu',
    role: 'STU',
    status: 'active',
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    username: 'sivakumar@admin',
    firstName: 'Sanjay',
    lastName: 'Vishnu',
    email: 'sanjay@college.edu',
    role: 'ADM',
    status: 'active',
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    username: '134551',
    firstName: 'Chitra',
    lastName: 'Devi',
    email: 'chitra@college.edu',
    role: 'STU',
    status: 'inactive',
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    username: '110375',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh@college.edu',
    role: 'STU',
    status: 'active',
    createdAt: '2024-02-15'
  },
  {
    id: '6',
    username: '110376',
    firstName: 'Priya',
    lastName: 'Singh',
    email: 'priya@college.edu',
    role: 'STU',
    status: 'active',
    createdAt: '2024-02-20'
  },
  {
    id: '7',
    username: '110377',
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit@college.edu',
    role: 'STU',
    status: 'active',
    createdAt: '2024-02-25'
  },
  {
    id: '8',
    username: '110378',
    firstName: 'Sneha',
    lastName: 'Gupta',
    email: 'sneha@college.edu',
    role: 'STU',
    status: 'active',
    createdAt: '2024-03-01'
  },
  {
    id: '9',
    username: '110379',
    firstName: 'Vikram',
    lastName: 'Joshi',
    email: 'vikram@college.edu',
    role: 'STU',
    status: 'active',
    createdAt: '2024-03-05'
  },
  {
    id: '10',
    username: 'dr.sharma',
    firstName: 'Dr. Anita',
    lastName: 'Sharma',
    email: 'anita.sharma@college.edu',
    role: 'FAC',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '11',
    username: 'prof.kumar',
    firstName: 'Prof. Rahul',
    lastName: 'Kumar',
    email: 'rahul.kumar@college.edu',
    role: 'FAC',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '12',
    username: 'admin.college',
    firstName: 'College',
    lastName: 'Administrator',
    email: 'admin@college.edu',
    role: 'ADM',
    status: 'active',
    createdAt: '2023-12-01'
  }
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Student',
    description: 'Student role with limited access',
    status: 'active',
    permissions: ['view_courses', 'submit_assignments']
  },
  {
    id: '2',
    name: 'Faculty',
    description: 'Faculty member with course management access',
    status: 'active',
    permissions: ['view_courses', 'manage_courses', 'grade_students']
  },
  {
    id: '3',
    name: 'Administrator',
    description: 'Full system administrator access',
    status: 'active',
    permissions: ['full_access']
  },
  {
    id: '4',
    name: 'HOD',
    description: 'Head of Department role',
    status: 'active',
    permissions: ['manage_department', 'approve_courses', 'manage_faculty']
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science Engineering',
    code: 'CSE',
    hod: 'Dr. Anita Sharma',
    status: 'active',
    description: 'Department of Computer Science and Engineering'
  },
  {
    id: '2',
    name: 'Electrical Engineering',
    code: 'EE',
    hod: 'Prof. Rahul Kumar',
    status: 'active',
    description: 'Department of Electrical Engineering'
  },
  {
    id: '3',
    name: 'Mechanical Engineering',
    code: 'ME',
    hod: 'Dr. Suresh Patel',
    status: 'active',
    description: 'Department of Mechanical Engineering'
  },
  {
    id: '4',
    name: 'Information Technology',
    code: 'IT',
    hod: 'Dr. Priya Gupta',
    status: 'active',
    description: 'Department of Information Technology'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CSE101',
    name: 'Introduction to Programming',
    credits: 4,
    department: 'Computer Science Engineering',
    status: 'active',
    description: 'Basic programming concepts using Python'
  },
  {
    id: '2',
    code: 'CSE201',
    name: 'Data Structures and Algorithms',
    credits: 4,
    department: 'Computer Science Engineering',
    status: 'active',
    description: 'Fundamental data structures and algorithms'
  },
  {
    id: '3',
    code: 'EE101',
    name: 'Circuit Analysis',
    credits: 3,
    department: 'Electrical Engineering',
    status: 'active',
    description: 'Basic electrical circuit analysis'
  },
  {
    id: '4',
    code: 'ME101',
    name: 'Engineering Mechanics',
    credits: 3,
    department: 'Mechanical Engineering',
    status: 'active',
    description: 'Fundamentals of engineering mechanics'
  }
];

export const mockPrograms: Program[] = [
  {
    id: '1',
    code: 'BTECH-CSE',
    name: 'Bachelor of Technology in Computer Science',
    duration: '4 Years',
    department: 'Computer Science Engineering',
    status: 'active'
  },
  {
    id: '2',
    code: 'BTECH-EE',
    name: 'Bachelor of Technology in Electrical Engineering',
    duration: '4 Years',
    department: 'Electrical Engineering',
    status: 'active'
  },
  {
    id: '3',
    code: 'MTECH-CSE',
    name: 'Master of Technology in Computer Science',
    duration: '2 Years',
    department: 'Computer Science Engineering',
    status: 'active'
  }
];

export const mockInstitutions: Institution[] = [
  {
    id: '1',
    name: 'Main Campus',
    code: 'MAIN',
    type: 'Primary',
    location: 'City Center',
    status: 'active'
  },
  {
    id: '2',
    name: 'North Campus',
    code: 'NORTH',
    type: 'Branch',
    location: 'North District',
    status: 'active'
  },
  {
    id: '3',
    name: 'Research Center',
    code: 'RC',
    type: 'Research',
    location: 'Tech Park',
    status: 'active'
  }
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    phone: '+91-9876543210',
    organization: 'Technology Company',
    status: 'active'
  },
  {
    id: '2',
    name: 'EduTech Partners',
    email: 'info@edutech.com',
    phone: '+91-9876543211',
    organization: 'Education Technology',
    status: 'active'
  },
  {
    id: '3',
    name: 'Research Institute',
    email: 'research@institute.org',
    phone: '+91-9876543212',
    organization: 'Research Organization',
    status: 'inactive'
  }
];