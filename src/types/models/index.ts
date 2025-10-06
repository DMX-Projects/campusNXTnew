import { UserRole, AttendanceStatus, FeeStatus, ExamType, StudentStatus, Gender, BloodGroup, AcademicYear, Semester, CourseType, RoomType, VehicleType, HostelRoomType, LeaveType, PaymentMethod, DocumentType } from '../enums';

// Base User Interface
export interface BaseUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup?: BloodGroup;
  aadharNumber?: string;
  panNumber?: string;
  passportNumber?: string;
  photoUrl?: string;
  role: UserRole;
  institutionId: string;
  centreId: string;
  departmentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

// Student Interface
export interface Student extends BaseUser {
  studentId: string;
  rollNumber: string;
  admissionNumber: string;
  admissionType: string;
  academicYear: string;
  currentSemester: number;
  admissionDate: string;
  status: StudentStatus;
  programId: string;
  batchId: string;
  categoryId?: string;
  parentId?: string;
  guardianId?: string;
  hostelRoomId?: string;
  cgpa: number;
  attendancePercentage: number;
  feeStatus: FeeStatus;
}

// Faculty Interface
export interface Faculty extends BaseUser {
  facultyId: string;
  employeeId: string;
  designation: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  joiningDate: string;
  salary?: number;
  salarySource?: string;
  categoryId?: string;
}

// Parent Interface
export interface Parent extends BaseUser {
  occupation?: string;
  designation?: string;
  employerName?: string;
  annualIncome?: number;
  children: string[]; // Array of student IDs
}

// Address Interface
export interface Address {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  addressType: string;
  isPrimary: boolean;
}

// Contact Interface
export interface Contact {
  id: string;
  contactType: string;
  contactValue: string;
  countryCode?: string;
  isPrimary: boolean;
  isVerified: boolean;
}

// Course Interface
export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  courseFullName: string;
  programId: string;
  semesterNumber: number;
  credits: number;
  lectureHours: number;
  tutorialHours: number;
  practicalHours: number;
  courseType: CourseType;
  isElective: boolean;
  courseFee?: number;
  departmentId: string;
  isActive: boolean;
}

// Attendance Interface
export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  facultyId: string;
  date: string;
  status: AttendanceStatus;
  markedTime: string;
  markedBy: string;
  remarks?: string;
  sessionType?: string;
}

// Exam Interface
export interface Exam {
  id: string;
  examCode: string;
  examName: string;
  courseId: string;
  examType: ExamType;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  roomId: string;
  invigilatorId: string;
  maxMarks: number;
  passingMarks: number;
  isActive: boolean;
}

// Exam Result Interface
export interface ExamResult {
  id: string;
  studentId: string;
  examId: string;
  marksObtained: number;
  grade: string;
  status: 'Pass' | 'Fail';
  remarks?: string;
  publishedAt?: string;
}

// Timetable Interface
export interface Timetable {
  id: string;
  courseId: string;
  facultyId: string;
  roomId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  semester: number;
  academicYear: string;
  sessionType: string;
  isActive: boolean;
}

// Fee Structure Interface
export interface FeeStructure {
  id: string;
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
  isActive: boolean;
}

// Fee Payment Interface
export interface FeePayment {
  id: string;
  studentId: string;
  feeStructureId: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  receiptNumber: string;
  status: FeeStatus;
  remarks?: string;
}

// Book Interface
export interface Book {
  id: string;
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
  availableCopies: number;
  price: number;
  purchaseDate: string;
  status: 'Available' | 'Issued' | 'Lost' | 'Damaged';
}

// Book Issue Interface
export interface BookIssue {
  id: string;
  bookId: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fineAmount?: number;
  status: 'Issued' | 'Returned' | 'Overdue' | 'Lost';
  remarks?: string;
}

// Placement Interface
export interface Placement {
  id: string;
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
  studentsApplied: string[];
  studentsSelected: string[];
  status: 'Scheduled' | 'Ongoing' | 'Completed' | 'Cancelled';
}

// Hostel Interface
export interface Hostel {
  id: string;
  hostelCode: string;
  hostelName: string;
  address: string;
  totalRooms: number;
  totalCapacity: number;
  currentOccupancy: number;
  wardenId: string;
  isActive: boolean;
}

// Hostel Room Interface
export interface HostelRoom {
  id: string;
  roomCode: string;
  roomNumber: string;
  hostelId: string;
  roomType: HostelRoomType;
  capacity: number;
  currentOccupancy: number;
  monthlyFee: number;
  floorNumber: number;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  amenities: string[];
}

// Room Allocation Interface
export interface RoomAllocation {
  id: string;
  studentId: string;
  roomId: string;
  allocationDate: string;
  checkoutDate?: string;
  securityDeposit: number;
  monthlyFee: number;
  status: 'Active' | 'Completed' | 'Cancelled';
}

// Transport Route Interface
export interface TransportRoute {
  id: string;
  routeCode: string;
  routeName: string;
  startPoint: string;
  endPoint: string;
  totalDistance: number;
  estimatedTime: number;
  stops: RouteStop[];
  isActive: boolean;
}

// Route Stop Interface
export interface RouteStop {
  id: string;
  stopName: string;
  stopAddress: string;
  stopSequence: number;
  distanceFromStart: number;
  timeFromStart: number;
}

// Vehicle Interface
export interface Vehicle {
  id: string;
  vehicleCode: string;
  vehicleNumber: string;
  vehicleType: VehicleType;
  makeModel: string;
  seatingCapacity: number;
  routeId?: string;
  driverId?: string;
  insuranceNumber: string;
  insuranceExpiry: string;
  permitNumber: string;
  permitExpiry: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
}

// Driver Interface
export interface Driver {
  id: string;
  driverCode: string;
  licenseNumber: string;
  licenseType: string;
  licenseExpiry: string;
  experienceYears: number;
  contactNumber: string;
  emergencyContact: string;
  isActive: boolean;
}

// Notification Interface
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  targetAudience: string[];
  sentBy: string;
  sentAt: string;
  readBy: string[];
  isActive: boolean;
}

// Leave Request Interface
export interface LeaveRequest {
  id: string;
  studentId?: string;
  facultyId?: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedBy: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  remarks?: string;
}

// Document Interface
export interface Document {
  id: string;
  userId: string;
  documentType: DocumentType;
  documentNumber: string;
  documentUrl: string;
  uploadedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  isVerified: boolean;
  expiryDate?: string;
}

// Department Interface
export interface Department {
  id: string;
  departmentCode: string;
  departmentName: string;
  hodId?: string;
  description?: string;
  isActive: boolean;
}

// Program Interface
export interface Program {
  id: string;
  programCode: string;
  programName: string;
  programFullName: string;
  durationYears: number;
  totalSemesters: number;
  intakeCapacity: number;
  departmentId: string;
  isActive: boolean;
}

// Batch Interface
export interface Batch {
  id: string;
  batchCode: string;
  batchName: string;
  academicYear: string;
  programId: string;
  maxStudents: number;
  currentStrength: number;
  isActive: boolean;
}

// Room Interface
export interface Room {
  id: string;
  roomCode: string;
  roomNumber: string;
  roomName: string;
  buildingId: string;
  roomType: RoomType;
  floorNumber: number;
  capacity: number;
  areaSqft: number;
  hasProjector: boolean;
  hasAC: boolean;
  hasWifi: boolean;
  equipment: string[];
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  isBookable: boolean;
  isActive: boolean;
}

// Dashboard Card Data Interface
export interface DashboardCardData {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
  link?: string;
}

// API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// Pagination Interface
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

// Paginated Response Interface
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

