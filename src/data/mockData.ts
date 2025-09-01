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
  name: string;          // Course Name
  code: string;          // Course Code (CS301 etc.)
  program: string;       // UG / PG / Diploma
  department: string;    // Computer Science, Mechanical etc.
  specialization?: string; // Optional specialization
  year: number;
  examType:string;          // Academic Year (1,2,3,4)
  semester: number;      // Semester (1-8 etc.)
  credits: number;       // Credits (2,3,4 etc.)
  subjectType: string;   // Core / Elective / Lab / Theory / Practical
  facultyId: string;     // Reference to faculty handling course
  internalMarks: number; // e.g. 30
  externalMarks: number; // e.g. 70
  evaluationMethod: string; // Theory / Lab / Project / Viva
  description: string;   // Short description
  thumbnail?: string;    // Optional image
  status: 'active' | 'inactive'; // For enabling/disabling courses
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

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  code?: string;
  description: string;
  status: string;
  permissions: string[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  hod: string;
  status: string;
  description: string;
}

export interface Program {
  id: string;
  code: string;             // e.g., "BTECHEE"
  name: string;             // e.g., "B.TECH ECE"
  institutionCode: string;  // e.g., "LSTINST"
  branchCode: string;       // e.g., "ECE"
  branchName: string;       // e.g., "Electronics and Communication Engineering"
  duration: string;         // e.g., "4 years"
  notes?: string;           // Optional notes
  status: "active" | "inactive";
}


export interface Institution {
  id: string;
  clientCode: string;       // e.g., "LSTUNIV"
  code: string;             // Institution Code, e.g., "LSTINST"
  name: string;             // Institution Name, e.g., "LST INSTITUTE OF ENGINEERING"
  type: string;             // e.g., "Engineering", "School", "College"
  location: string;         // e.g., "Hyderabad"
  address: string;          // Full address
  phone: string;            // Contact number
  email: string;            // Official email
  website: string;          // Institution website
  establishedYear: string;  // e.g., "2001"
  description: string;      // Short description
  status: "active" | "inactive";
}


export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  status: string;
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
    program: 'Undergraduate',
    department: 'Computer Science',
    specialization: 'Software Engineering',
    year: 2,
    examType:'Theory',
    semester: 1,
    credits: 4,
    subjectType: 'Core',
    facultyId: 'FAC001',
    internalMarks: 30,
    externalMarks: 70,
    evaluationMethod: 'Theory',
    description: 'Introduction to fundamental data structures and algorithms',
    status: 'active',
  },
  {
    id: 'COU002',
    name: 'Database Management Systems',
    code: 'CS302',
    program: 'Undergraduate',
    department: 'Computer Science',
    specialization: 'Data Engineering',
    year: 2,
    examType:'Practical',
    semester: 2,
    credits: 3,
    subjectType: 'Core',
    facultyId: 'FAC002',
    internalMarks: 30,
    externalMarks: 70,
    evaluationMethod: 'Theory + Lab',
    description: 'Comprehensive study of database design and management',
    status: 'inactive',
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
    name: 'Transportation Incharge',
    code: 'TI',
    description: 'Manages transportation and vehicle operations',
    status: 'active',
    permissions: [
      'manage_vehicles',
      'track_routes',
      'manage_drivers',
      'view_transportation_reports'
    ]
  },
  {
    id: '2',
    name: 'TPO',
    code: 'TPO',
    description: 'Training and Placement Officer',
    status: 'active',
    permissions: [
      'manage_placements',
      'coordinate_training',
      'manage_companies',
      'view_student_records',
      'schedule_interviews'
    ]
  },
  {
    id: '3',
    name: 'Super Admin',
    code: 'SA',
    description: 'Full system administrator with complete access',
    status: 'active',
    permissions: [
      'full_access',
      'manage_users',
      'manage_roles',
      'system_configuration',
      'view_all_reports',
      'manage_institutions'
    ]
  },
  {
    id: '4',
    name: 'Student',
    code: 'STU',
    description: 'Student role with limited access to academic features',
    status: 'active',
    permissions: [
      'view_courses',
      'view_attendance',
      'view_results',
      'submit_assignments',
      'view_fee_details',
      'access_library'
    ]
  },
  {
    id: '5',
    name: 'Principal',
    code: 'PRINCIPAL',
    description: 'Principal with institutional management access',
    status: 'active',
    permissions: [
      'manage_institution',
      'view_all_departments',
      'approve_policies',
      'view_financial_reports',
      'manage_faculty',
      'manage_students'
    ]
  },
  {
    id: '6',
    name: 'Parent',
    code: 'PRNT',
    description: 'Parent/Guardian with limited student information access',
    status: 'active',
    permissions: [
      'view_child_attendance',
      'view_child_results',
      'view_child_fee_status',
      'communicate_with_faculty',
      'view_child_progress'
    ]
  },
  {
    id: '7',
    name: 'Library Incharge',
    code: 'LI',
    description: 'Manages library operations and resources',
    status: 'active',
    permissions: [
      'manage_books',
      'issue_returns',
      'manage_library_members',
      'view_library_reports',
      'manage_book_inventory'
    ]
  },
  {
    id: '8',
    name: 'Lab Technician',
    code: 'LT',
    description: 'Manages laboratory equipment and assists in practical sessions',
    status: 'active',
    permissions: [
      'manage_lab_equipment',
      'assist_practicals',
      'maintain_lab_inventory',
      'report_equipment_issues'
    ]
  },
  {
    id: '9',
    name: 'Lab Assistant',
    code: 'LA',
    description: 'Assists in laboratory operations and maintenance',
    status: 'active',
    permissions: [
      'assist_lab_operations',
      'basic_equipment_handling',
      'student_assistance',
      'lab_cleanliness'
    ]
  },
  {
    id: '10',
    name: 'Hostel Incharge',
    code: 'HI',
    description: 'Manages hostel operations and student accommodation',
    status: 'active',
    permissions: [
      'manage_hostel_rooms',
      'manage_hostel_students',
      'handle_hostel_complaints',
      'manage_mess_operations',
      'hostel_fee_management'
    ]
  },
  {
    id: '11',
    name: 'Faculty',
    code: 'FAC',
    description: 'Faculty member with teaching and course management access',
    status: 'active',
    permissions: [
      'manage_courses',
      'mark_attendance',
      'grade_students',
      'create_assignments',
      'view_student_progress',
      'communicate_with_students'
    ]
  },
  {
    id: '12',
    name: 'Administrator',
    code: 'ADM',
    description: 'Administrative staff with management access',
    status: 'active',
    permissions: [
      'manage_admissions',
      'manage_fee_structure',
      'generate_reports',
      'manage_academic_calendar',
      'student_registration'
    ]
  },
  {
    id: '13',
    name: 'Head of Department',
    code: 'HOD',
    description: 'Department head with departmental management access',
    status: 'active',
    permissions: [
      'manage_department',
      'approve_courses',
      'manage_faculty',
      'approve_curriculum',
      'department_budget_management',
      'faculty_evaluation'
    ]
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

export const mockPrograms: Program[] = [
  {
    id: "PROG001",
    code: "BTECHE",
    name: "B.TECH CE",
    institutionCode: "LSTINST",
    branchCode: "CE",
    branchName: "Civil Engineering",
    duration: "4 years",
    notes: "",
    status: "active",
  },
  {
    id: "PROG002",
    code: "BTECHCSE",
    name: "B.TECH CSE",
    institutionCode: "LSTINST",
    branchCode: "CSE",
    branchName: "Computer Science Engineering",
    duration: "4 years",
    notes: "",
    status: "active",
  },
  {
    id: "PROG003",
    code: "BTECHAIML",
    name: "B.TECH CSE (AI & ML)",
    institutionCode: "LSTINST",
    branchCode: "AIML",
    branchName: "CSE (AI & ML)",
    duration: "4 years",
    notes: "",
    status: "active",
  },
  {
    id: "PROG004",
    code: "BTECHDS",
    name: "B.TECH CSE (DS)",
    institutionCode: "LSTINST",
    branchCode: "DS",
    branchName: "CSE (Data Science)",
    duration: "4 years",
    notes: "",
    status: "active",
  },
  {
    id: "PROG005",
    code: "BTECHEE",
    name: "B.TECH EEE",
    institutionCode: "LSTINST",
    branchCode: "EEE",
    branchName: "Electrical & Electronics Engineering",
    duration: "4 years",
    notes: "",
    status: "active",
  },
];


export const mockInstitutions: Institution[] = [
  {
    id: "INST001",
    clientCode: "LSTUNIV",
    code: "LSTINST",
    name: "LST INSTITUTE OF ENGINEERING",
    type: "Engineering",
    location: "Hyderabad",
    address: "Hyderabad, Telangana",
    phone: "+91-9876543210",
    email: "info@lstinst.edu.in",
    website: "http://www.lstinst.edu.in",
    establishedYear: "2005",
    description: "Premier engineering institute in Hyderabad.",
    status: "active",
  },
  {
    id: "INST002",
    clientCode: "PRGM",
    code: "PTQ",
    name: "Pragmatiq Systems",
    type: "Training",
    location: "Hyderabad",
    address: "Hyderabad, Telangana",
    phone: "+91-9845123456",
    email: "contact@pragmatiq.com",
    website: "http://www.pragmatiq.com",
    establishedYear: "2010",
    description: "Industry-focused IT training provider.",
    status: "active",
  },
  {
    id: "INST003",
    clientCode: "LSTUNIV",
    code: "MES01",
    name: "Nowrosjee Wadia College, Pune",
    type: "College",
    location: "Pune",
    address: "Pune, Maharashtra",
    phone: "+91-9768123456",
    email: "principal@wadiacollege.edu",
    website: "http://www.wadiacollege.edu",
    establishedYear: "1932",
    description: "Renowned arts and science college in Pune.",
    status: "active",
  },
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