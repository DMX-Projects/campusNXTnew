export interface Exam {
  id: string;
  examName: string;
  examType: 'Mid-Semester' | 'End-Semester' | 'Internal' | 'External' | 'Practical';
  academicYear: string;
  semester: number;
  department: string;
  course: string;
  subject: {
    id: string;
    code: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  venue: string;
  totalMarks: number;
  passingMarks: number;
  instructions?: string[];
  invigilators?: string[];
  status: 'Scheduled' | 'Ongoing' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  remarks?: string;
  evaluatedBy?: string;
  evaluatedAt?: string;
  status: 'Pending' | 'Evaluated' | 'Published' | 'Withheld';
  createdAt: string;
  updatedAt: string;
}

export interface GradeScale {
  grade: string;
  minPercentage: number;
  maxPercentage: number;
  gradePoint: number;
  description: string;
}

export interface ExamSchedule {
  id: string;
  academicYear: string;
  semester: number;
  examType: string;
  startDate: string;
  endDate: string;
  exams: Exam[];
  status: 'Draft' | 'Published' | 'Completed';
  publishedAt?: string;
  publishedBy?: string;
}