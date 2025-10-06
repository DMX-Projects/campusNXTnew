import { 
  Student, 
  Faculty, 
  Parent, 
  Course, 
  Attendance, 
  Exam, 
  ExamResult, 
  Timetable, 
  FeeStructure, 
  FeePayment, 
  Book, 
  BookIssue, 
  Placement, 
  Hostel, 
  HostelRoom, 
  RoomAllocation, 
  TransportRoute, 
  Vehicle, 
  Driver, 
  Notification, 
  LeaveRequest, 
  Document, 
  Department, 
  Program, 
  Batch, 
  Room,
  DashboardCardData,
  PaginatedResponse,
  PaginationParams
} from '../models';
import { UserRole, ModuleName } from '../enums';

// Auth API Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    role: UserRole;
    departmentId?: string;
    institutionId: string;
    centreId: string;
    permissions: string[];
  };
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// User Management API Types
export interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  departmentId?: string;
  password?: string;
}

export interface UpdateUserRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  departmentId?: string;
  isActive?: boolean;
}

export interface UserFilters {
  role?: UserRole;
  departmentId?: string;
  isActive?: boolean;
  search?: string;
}

// Student API Types
export interface CreateStudentRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  rollNumber: string;
  admissionNumber: string;
  programId: string;
  batchId: string;
  parentId?: string;
}

export interface StudentFilters extends PaginationParams {
  programId?: string;
  batchId?: string;
  departmentId?: string;
  status?: string;
  search?: string;
}

// Faculty API Types
export interface CreateFacultyRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  employeeId: string;
  designation: string;
  qualification: string;
  specialization: string;
  departmentId: string;
  joiningDate: string;
}

export interface FacultyFilters extends PaginationParams {
  departmentId?: string;
  designation?: string;
  isActive?: boolean;
  search?: string;
}

// Attendance API Types
export interface CreateAttendanceRequest {
  studentId: string;
  courseId: string;
  facultyId: string;
  date: string;
  status: string;
  remarks?: string;
}

export interface BulkAttendanceRequest {
  courseId: string;
  facultyId: string;
  date: string;
  attendance: Array<{
    studentId: string;
    status: string;
    remarks?: string;
  }>;
}

export interface AttendanceFilters extends PaginationParams {
  studentId?: string;
  courseId?: string;
  facultyId?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}

// Examination API Types
export interface CreateExamRequest {
  examCode: string;
  examName: string;
  courseId: string;
  examType: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  roomId: string;
  invigilatorId: string;
  maxMarks: number;
  passingMarks: number;
}

export interface ExamFilters extends PaginationParams {
  courseId?: string;
  examType?: string;
  dateFrom?: string;
  dateTo?: string;
  facultyId?: string;
}

export interface ExamResultRequest {
  examId: string;
  results: Array<{
    studentId: string;
    marksObtained: number;
    grade: string;
    remarks?: string;
  }>;
}

// Timetable API Types
export interface CreateTimetableRequest {
  courseId: string;
  facultyId: string;
  roomId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  semester: number;
  academicYear: string;
  sessionType: string;
}

export interface TimetableFilters extends PaginationParams {
  courseId?: string;
  facultyId?: string;
  roomId?: string;
  dayOfWeek?: string;
  semester?: number;
  academicYear?: string;
}

// Fee Management API Types
export interface CreateFeeStructureRequest {
  feeCode: string;
  feeName: string;
  feeCategory: string;
  programId: string;
  semester: number;
  academicYear: string;
  amount: number;
  dueDate: string;
  lateFeeAmount?: number;
  isRefundable: boolean;
}

export interface FeePaymentRequest {
  studentId: string;
  feeStructureId: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
}

export interface FeeFilters extends PaginationParams {
  studentId?: string;
  programId?: string;
  semester?: number;
  academicYear?: string;
  status?: string;
}

// Library API Types
export interface CreateBookRequest {
  bookCode: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  subjectCategory: string;
  sectionId: string;
  categoryId: string;
  totalCopies: number;
  price: number;
}

export interface BookIssueRequest {
  bookId: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
}

export interface BookFilters extends PaginationParams {
  category?: string;
  section?: string;
  author?: string;
  available?: boolean;
  search?: string;
}

// Placement API Types
export interface CreatePlacementRequest {
  companyName: string;
  companyId: string;
  position: string;
  package: number;
  driveDate: string;
  eligibilityCriteria: {
    minCGPA: number;
    departments: string[];
    year: number;
    backlogsAllowed: number;
  };
}

export interface PlacementFilters extends PaginationParams {
  companyId?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  minPackage?: number;
}

// Hostel API Types
export interface CreateHostelRequest {
  hostelCode: string;
  hostelName: string;
  address: string;
  totalRooms: number;
  totalCapacity: number;
  wardenId: string;
}

export interface RoomAllocationRequest {
  studentId: string;
  roomId: string;
  allocationDate: string;
  securityDeposit: number;
  monthlyFee: number;
}

export interface HostelFilters extends PaginationParams {
  hostelId?: string;
  roomType?: string;
  status?: string;
  search?: string;
}

// Transport API Types
export interface CreateRouteRequest {
  routeCode: string;
  routeName: string;
  startPoint: string;
  endPoint: string;
  totalDistance: number;
  estimatedTime: number;
  stops: Array<{
    stopName: string;
    stopAddress: string;
    stopSequence: number;
    distanceFromStart: number;
    timeFromStart: number;
  }>;
}

export interface CreateVehicleRequest {
  vehicleCode: string;
  vehicleNumber: string;
  vehicleType: string;
  makeModel: string;
  seatingCapacity: number;
  routeId?: string;
  driverId?: string;
  insuranceNumber: string;
  insuranceExpiry: string;
  permitNumber: string;
  permitExpiry: string;
}

export interface TransportFilters extends PaginationParams {
  routeId?: string;
  vehicleType?: string;
  status?: string;
  search?: string;
}

// Notification API Types
export interface CreateNotificationRequest {
  title: string;
  message: string;
  type: string;
  priority: string;
  targetAudience: string[];
}

export interface NotificationFilters extends PaginationParams {
  type?: string;
  priority?: string;
  sentBy?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Leave Request API Types
export interface CreateLeaveRequest {
  studentId?: string;
  facultyId?: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface LeaveFilters extends PaginationParams {
  studentId?: string;
  facultyId?: string;
  leaveType?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Dashboard API Types
export interface DashboardStatsRequest {
  userId: string;
  role: UserRole;
  module?: ModuleName;
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface DashboardStatsResponse {
  cards: DashboardCardData[];
  charts: Array<{
    title: string;
    type: 'bar' | 'line' | 'pie' | 'doughnut';
    data: any;
  }>;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    userId: string;
  }>;
}

// File Upload API Types
export interface FileUploadRequest {
  file: File;
  category: string;
  description?: string;
}

export interface FileUploadResponse {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
}

// Report API Types
export interface GenerateReportRequest {
  reportType: string;
  filters: Record<string, any>;
  format: 'pdf' | 'excel' | 'csv';
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface ReportResponse {
  reportId: string;
  downloadUrl: string;
  generatedAt: string;
  expiresAt: string;
}

// Search API Types
export interface GlobalSearchRequest {
  query: string;
  modules?: ModuleName[];
  limit?: number;
}

export interface GlobalSearchResponse {
  results: Array<{
    id: string;
    title: string;
    description: string;
    module: ModuleName;
    type: string;
    url: string;
    relevanceScore: number;
  }>;
  totalResults: number;
}

// Audit API Types
export interface AuditLogRequest extends PaginationParams {
  userId?: string;
  action?: string;
  module?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  entityType: string;
  entityId: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

