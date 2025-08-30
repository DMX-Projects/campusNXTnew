// Mock data for the ERP system
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  year: number;
  section: string;
  rollNumber: string;
  admissionDate: string;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  cgpa: number;
  photo?: string;
}

export interface Faculty {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  qualification: string;
  experience: number;
  joiningDate: string;
  salary: number;
  subjects: string[];
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  year: number;
  semester: number;
  credits: number;
  facultyId: string;
  description: string;
  thumbnail?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  markedBy: string;
}

export interface Exam {
  id: string;
  name: string;
  courseId: string;
  date: string;
  time: string;
  duration: number;
  venue: string;
  totalMarks: number;
  examType: 'Mid-term' | 'End-term' | 'Quiz' | 'Assignment';
  status: 'Scheduled' | 'Ongoing' | 'Completed';
}

export interface Result {
  id: string;
  studentId: string;
  examId: string;
  marksObtained: number;
  grade: string;
  remarks?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  department: string;
  totalCopies: number;
  availableCopies: number;
  price: number;
}

export interface FeeStructure {
  id: string;
  department: string;
  year: number;
  semester: number;
  tuitionFee: number;
  labFee: number;
  libraryFee: number;
  examFee: number;
  totalFee: number;
}

// Mock data
export const mockStudents: Student[] = [
  {
    id: 'STU001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@college.edu',
    phone: '+1234567890',
    department: 'Computer Science',
    year: 2,
    section: 'A',
    rollNumber: 'CS2023001',
    admissionDate: '2023-08-15',
    feeStatus: 'Paid',
    cgpa: 8.5,
  },
  {
    id: 'STU002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@college.edu',
    phone: '+1234567891',
    department: 'Computer Science',
    year: 2,
    section: 'A',
    rollNumber: 'CS2023002',
    admissionDate: '2023-08-15',
    feeStatus: 'Pending',
    cgpa: 9.2,
  },
  {
    id: 'STU003',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@college.edu',
    phone: '+1234567892',
    department: 'Electrical Engineering',
    year: 3,
    section: 'B',
    rollNumber: 'EE2022001',
    admissionDate: '2022-08-15',
    feeStatus: 'Paid',
    cgpa: 7.8,
  },
  {
    id: 'STU004',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@college.edu',
    phone: '+1234567893',
    department: 'Mechanical Engineering',
    year: 1,
    section: 'A',
    rollNumber: 'ME2024001',
    admissionDate: '2024-08-15',
    feeStatus: 'Overdue',
    cgpa: 8.9,
  },
];

export const mockFaculty: Faculty[] = [
  {
    id: 'FAC001',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@college.edu',
    phone: '+1234567800',
    department: 'Computer Science',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Computer Science',
    experience: 8,
    joiningDate: '2020-07-01',
    salary: 85000,
    subjects: ['Data Structures', 'Algorithms', 'Database Systems'],
  },
  {
    id: 'FAC002',
    firstName: 'Robert',
    lastName: 'Thompson',
    email: 'robert.thompson@college.edu',
    phone: '+1234567801',
    department: 'Electrical Engineering',
    designation: 'Professor',
    qualification: 'Ph.D. in Electrical Engineering',
    experience: 12,
    joiningDate: '2018-08-01',
    salary: 95000,
    subjects: ['Circuit Analysis', 'Digital Electronics', 'Power Systems'],
  },
];

export const mockCourses: Course[] = [
  {
    id: 'COU001',
    name: 'Data Structures and Algorithms',
    code: 'CS301',
    department: 'Computer Science',
    year: 2,
    semester: 1,
    credits: 4,
    facultyId: 'FAC001',
    description: 'Introduction to fundamental data structures and algorithms',
  },
  {
    id: 'COU002',
    name: 'Database Management Systems',
    code: 'CS302',
    department: 'Computer Science',
    year: 2,
    semester: 2,
    credits: 3,
    facultyId: 'FAC001',
    description: 'Comprehensive study of database design and management',
  },
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: 'ATT001',
    studentId: 'STU001',
    courseId: 'COU001',
    date: '2025-01-15',
    status: 'Present',
    markedBy: 'FAC001',
  },
  {
    id: 'ATT002',
    studentId: 'STU002',
    courseId: 'COU001',
    date: '2025-01-15',
    status: 'Present',
    markedBy: 'FAC001',
  },
];

export const mockExams: Exam[] = [
  {
    id: 'EXM001',
    name: 'Mid-term Examination',
    courseId: 'COU001',
    date: '2025-02-15',
    time: '10:00',
    duration: 180,
    venue: 'Exam Hall 1',
    totalMarks: 100,
    examType: 'Mid-term',
    status: 'Scheduled',
  },
];

export const mockResults: Result[] = [
  {
    id: 'RES001',
    studentId: 'STU001',
    examId: 'EXM001',
    marksObtained: 85,
    grade: 'A',
    remarks: 'Excellent performance',
  },
];

export const mockBooks: Book[] = [
  {
    id: 'BOO001',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0262033848',
    category: 'Academic',
    department: 'Computer Science',
    totalCopies: 10,
    availableCopies: 7,
    price: 5500,
  },
  {
    id: 'BOO002',
    title: 'Database System Concepts',
    author: 'Abraham Silberschatz',
    isbn: '978-0078022159',
    category: 'Academic',
    department: 'Computer Science',
    totalCopies: 8,
    availableCopies: 5,
    price: 4200,
  },
];

export const mockFeeStructure: FeeStructure[] = [
  {
    id: 'FEE001',
    department: 'Computer Science',
    year: 1,
    semester: 1,
    tuitionFee: 75000,
    labFee: 15000,
    libraryFee: 5000,
    examFee: 3000,
    totalFee: 98000,
  },
  {
    id: 'FEE002',
    department: 'Computer Science',
    year: 2,
    semester: 1,
    tuitionFee: 80000,
    labFee: 18000,
    libraryFee: 5000,
    examFee: 3000,
    totalFee: 106000,
  },
];
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

// export const mockCourses: Course[] = [
//   {
//     id: '1',
//     code: 'CSE101',
//     name: 'Introduction to Programming',
//     credits: 4,
//     department: 'Computer Science Engineering',
//     status: 'active',
//     description: 'Basic programming concepts using Python'
//   },
//   {
//     id: '2',
//     code: 'CSE201',
//     name: 'Data Structures and Algorithms',
//     credits: 4,
//     department: 'Computer Science Engineering',
//     status: 'active',
//     description: 'Fundamental data structures and algorithms'
//   },
//   {
//     id: '3',
//     code: 'EE101',
//     name: 'Circuit Analysis',
//     credits: 3,
//     department: 'Electrical Engineering',
//     status: 'active',
//     description: 'Basic electrical circuit analysis'
//   },
//   {
//     id: '4',
//     code: 'ME101',
//     name: 'Engineering Mechanics',
//     credits: 3,
//     department: 'Mechanical Engineering',
//     status: 'active',
//     description: 'Fundamentals of engineering mechanics'
//   }
// ];

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