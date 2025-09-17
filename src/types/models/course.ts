export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  department: string;
  credits: number;
  type: 'Theory' | 'Lab' | 'Tutorial' | 'Project';
  category: 'Core' | 'Elective' | 'Open Elective' | 'Audit';
  year: number;
  semester: number;
  description?: string;
  objectives?: string[];
  outcomes?: string[];
  syllabus?: SyllabusUnit[];
  prerequisites?: string[];
  references?: string[];
  facultyId?: string;
  facultyName?: string;
  schedule?: CourseSchedule[];
  enrolledStudents?: number;
  maxCapacity?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SyllabusUnit {
  unitNumber: number;
  title: string;
  topics: string[];
  hours: number;
}

export interface CourseSchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface CourseEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: 'Enrolled' | 'Dropped' | 'Completed';
  grade?: string;
  attendance?: number;
  internalMarks?: number;
  externalMarks?: number;
  totalMarks?: number;
  credits?: number;
}