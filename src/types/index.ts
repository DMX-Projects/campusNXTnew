export interface User {
  details: unknown;
  username: string;
  password: string;
  role: string;
  name: string;
  department?: string;
  studentId?: string;
  childId?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface Student {
  id: string;
  name: string;
  department: string;
  year: number;
  section: string;
  email: string;
  phone: string;
  parentId?: string;
  hostelRoom?: string;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  cgpa: number;
  attendancePercentage: number;
}

export interface Faculty {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  subjects: string[];
  experience: number;
  attendancePercentage: number;
}

export interface AttendanceRecord {
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  subject: string;
  facultyId: string;
}

export interface ExamResult {
  studentId: string;
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
  semester: number;
  examType: 'Mid-Sem' | 'End-Sem' | 'Internal';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  availableCopies: number;
  totalCopies: number;
  issuedTo?: string[];
}

export interface Placement {
  id: string;
  companyName: string;
  position: string;
  package: number;
  studentsSelected: string[];
  driveDate: string;
  eligibilityCriteria: {
    minCGPA: number;
    departments: string[];
    year: number;
  };
}

export interface DashboardCardData {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: any;
  color: string;
}

export interface Budget {
  id: string;
  title: string;
  department: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  submittedDate: string;
  approvedBy?: string;
  description: string;
}

export interface PurchaseRequisition {
  id: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  department: string;
  requestedBy: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Ordered';
  requestDate: string;
  justification: string;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  purchaseDate: string;
  value: number;
  status: 'Active' | 'Maintenance' | 'Disposed' | 'Lost';
  location: string;
  assignedTo?: string;
}

export interface CircularMemo {
  id: string;
  title: string;
  type: 'Circular' | 'Memo' | 'Directive';
  content: string;
  publishedDate: string;
  priority: 'High' | 'Medium' | 'Low';
  acknowledged: boolean;
  publishedBy: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'Budget' | 'Expenses' | 'Assets' | 'Summary';
  generatedDate: string;
  period: string;
  status: 'Generated' | 'Pending';
}