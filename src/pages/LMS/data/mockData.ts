export const mockCourses = [
  {
    id: 1,
    code: 'CS-301',
    name: 'Data Structures and Algorithms',
    department: 'Computer Science',
    credits: 4,
    status: 'Active',
    enrolledStudents: 45,
    faculty: 'Dr. Smith',
    semester: 'Spring 2025'
  },
  {
    id: 2,
    code: 'MATH-201',
    name: 'Advanced Calculus',
    department: 'Mathematics',
    credits: 3,
    status: 'Active',
    enrolledStudents: 32,
    faculty: 'Prof. Johnson',
    semester: 'Spring 2025'
  },
  {
    id: 3,
    code: 'PHY-101',
    name: 'General Physics',
    department: 'Physics',
    credits: 4,
    status: 'Active',
    enrolledStudents: 56,
    faculty: 'Dr. Wilson',
    semester: 'Spring 2025'
  }
];

export const mockStudents = [
  {
    id: 1,
    studentId: '2024001',
    name: 'John Smith',
    email: 'john.smith@college.edu',
    department: 'Computer Science',
    semester: '6th',
    status: 'Active',
    gpa: '3.85',
    phone: '+1-555-0123',
    admissionDate: '2022-09-01'
  },
  {
    id: 2,
    studentId: '2024002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@college.edu',
    department: 'Mathematics',
    semester: '4th',
    status: 'Active',
    gpa: '3.92',
    phone: '+1-555-0124',
    admissionDate: '2023-09-01'
  },
  {
    id: 3,
    studentId: '2024003',
    name: 'Mike Chen',
    email: 'mike.chen@college.edu',
    department: 'Physics',
    semester: '8th',
    status: 'Active',
    gpa: '3.67',
    phone: '+1-555-0125',
    admissionDate: '2021-09-01'
  }
];

export const mockFaculty = [
  {
    id: 1,
    employeeId: 'EMP001',
    name: 'Dr. Robert Smith',
    email: 'robert.smith@college.edu',
    department: 'Computer Science',
    designation: 'Professor',
    experience: '15 years',
    status: 'Active',
    phone: '+1-555-1001'
  },
  {
    id: 2,
    employeeId: 'EMP002',
    name: 'Prof. Mary Johnson',
    email: 'mary.johnson@college.edu',
    department: 'Mathematics',
    designation: 'Associate Professor',
    experience: '12 years',
    status: 'Active',
    phone: '+1-555-1002'
  },
  {
    id: 3,
    employeeId: 'EMP003',
    name: 'Dr. James Wilson',
    email: 'james.wilson@college.edu',
    department: 'Physics',
    designation: 'Professor',
    experience: '18 years',
    status: 'Active',
    phone: '+1-555-1003'
  }
];

export const mockEvents = [
  {
    id: 1,
    title: 'Faculty Meeting',
    description: 'Monthly faculty coordination meeting',
    date: '2025-01-15',
    time: '14:00',
    location: 'Conference Room A',
    type: 'Meeting',
    status: 'Scheduled',
    attendees: 25
  },
  {
    id: 2,
    title: 'Student Registration',
    description: 'Spring semester registration for new students',
    date: '2025-01-20',
    time: '09:00',
    location: 'Admin Building',
    type: 'Registration',
    status: 'Scheduled',
    attendees: 200
  },
  {
    id: 3,
    title: 'Mid-term Exams',
    description: 'Mid-semester examinations begin',
    date: '2025-03-15',
    time: '10:00',
    location: 'Exam Hall 1',
    type: 'Exam',
    status: 'Scheduled',
    attendees: 500
  }
];

export const mockAssignments = [
  {
    id: 1,
    title: 'Data Structures Project',
    course: 'CS-301',
    dueDate: '2025-01-25',
    maxMarks: 100,
    status: 'Active',
    submissions: 35,
    type: 'Project'
  },
  {
    id: 2,
    title: 'Calculus Problem Set 3',
    course: 'MATH-201',
    dueDate: '2025-01-22',
    maxMarks: 50,
    status: 'Active',
    submissions: 28,
    type: 'Assignment'
  },
  {
    id: 3,
    title: 'Physics Lab Report',
    course: 'PHY-101',
    dueDate: '2025-01-20',
    maxMarks: 25,
    status: 'Graded',
    submissions: 52,
    type: 'Lab'
  }
];

export const mockGrades = [
  {
    id: 1,
    studentName: 'John Smith',
    studentId: '2024001',
    course: 'CS-301',
    assessment: 'Midterm Exam',
    marksObtained: 85,
    maxMarks: 100,
    grade: 'B+',
    dateRecorded: '2025-01-10'
  },
  {
    id: 2,
    studentName: 'Sarah Johnson',
    studentId: '2024002',
    course: 'MATH-201',
    assessment: 'Assignment 1',
    marksObtained: 95,
    maxMarks: 100,
    grade: 'A+',
    dateRecorded: '2025-01-12'
  },
  {
    id: 3,
    studentName: 'Mike Chen',
    studentId: '2024003',
    course: 'PHY-101',
    assessment: 'Lab Report 1',
    marksObtained: 22,
    maxMarks: 25,
    grade: 'A',
    dateRecorded: '2025-01-08'
  }
];

export const mockBooks = [
  {
    id: 1,
    isbn: '978-0-123456-78-9',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    category: 'Computer Science',
    totalCopies: 10,
    availableCopies: 7,
    status: 'Available',
    location: 'CS Section, Shelf A-5',
    publisher: 'MIT Press'
  },
  {
    id: 2,
    isbn: '978-0-987654-32-1',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    category: 'Mathematics',
    totalCopies: 15,
    availableCopies: 3,
    status: 'Limited',
    location: 'Math Section, Shelf B-2',
    publisher: 'Cengage Learning'
  },
  {
    id: 3,
    isbn: '978-0-456789-01-2',
    title: 'University Physics',
    author: 'Hugh Young',
    category: 'Physics',
    totalCopies: 8,
    availableCopies: 0,
    status: 'Out of Stock',
    location: 'Physics Section, Shelf C-1',
    publisher: 'Pearson'
  }
];

export const mockAttendance = [
  {
    id: 1,
    studentId: '2024001',
    studentName: 'John Smith',
    course: 'CS-301',
    date: '2025-01-14',
    status: 'present'
  },
  {
    id: 2,
    studentId: '2024002',
    studentName: 'Sarah Johnson',
    course: 'CS-301',
    date: '2025-01-14',
    status: 'present'
  },
  {
    id: 3,
    studentId: '2024003',
    studentName: 'Mike Chen',
    course: 'CS-301',
    date: '2025-01-14',
    status: 'absent'
  }
];