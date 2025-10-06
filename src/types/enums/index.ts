// User Roles
export enum UserRole {
  STUDENT = 'Student',
  FACULTY = 'Faculty',
  PRINCIPAL = 'Principal',
  HOD = 'HoD',
  CHAIRPERSON = 'Chairperson',
  COLLEGE_SECRETARY = 'College Secretary',
  DEAN = 'Dean',
  TPO = 'TPO',
  CONTROLLER_OF_EXAMINATION = 'Controller of Examination',
  MASTER_ADMIN = 'Master Admin',
  LAB_ASSISTANT = 'Lab Assistant',
  LAB_TECHNICIAN = 'Lab Technician',
  PARENT = 'Parent',
  ADMINISTRATION_OFFICER = 'Administration Officer',
  TRANSPORTATION_INCHARGE = 'Transportation Incharge',
  HOSTEL_INCHARGE = 'Hostel Incharge',
  LIBRARY_INCHARGE = 'Library Incharge',
  ACCOUNTS_OFFICER = 'Accounts Officer',
  SCHOLARSHIP_INCHARGE = 'Scholarship Incharge',
  STORES_INCHARGE = 'Stores Incharge',
  SPORTS_INCHARGE = 'Sports Incharge',
  SECURITY_INCHARGE = 'Security Incharge',
  IT_DEPARTMENT = 'IT Department',
  STUDENT_SERVICES = 'Student Services',
  COLLEGE_MAINTENANCE_INCHARGE = 'College Maintenance Incharge',
  TEMPORARY_STUDENT = 'Temporary Student'
}

// Module Names
export enum ModuleName {
  HOME = 'Home',
  ACADEMICS = 'Academics',
  ADMINISTRATION = 'Administration',
  EXAMINATION = 'Examination',
  PLACEMENTS = 'Placements',
  LMS = 'LMS',
  LIBRARY = 'Library',
  TRANSPORT = 'Transport',
  HOSTEL = 'Hostel',
  PARENT = 'Parent',
  COMMUNICATIONS = 'Communications',
  ADMISSION_MANAGEMENT = 'Admission Management',
  INFRASTRUCTURE_MANAGEMENT = 'Infrastructure Management',
  HOSTEL_MANAGEMENT = 'Hostel Management',
  TRANSPORT_MANAGEMENT = 'Transport Management',
  HR_MANAGEMENT = 'HR Management',
  STUDENT_FEES_MANAGEMENT = 'Student Fees Management',
  ADMISSION = 'Admission'
}

// Attendance Status
export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  LATE = 'Late',
  EXCUSED = 'Excused'
}

// Fee Status
export enum FeeStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  OVERDUE = 'Overdue',
  PARTIAL = 'Partial'
}

// Exam Types
export enum ExamType {
  MID_SEM = 'Mid-Sem',
  END_SEM = 'End-Sem',
  INTERNAL = 'Internal',
  ASSIGNMENT = 'Assignment',
  QUIZ = 'Quiz',
  PROJECT = 'Project'
}

// Student Status
export enum StudentStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  SUSPENDED = 'Suspended',
  GRADUATED = 'Graduated',
  DROPPED = 'Dropped'
}

// Notification Types
export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

// Priority Levels
export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent'
}

// Request Status
export enum RequestStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed'
}

// Gender
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

// Blood Groups
export enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-'
}

// Academic Years
export enum AcademicYear {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  FIFTH = 5
}

// Semesters
export enum Semester {
  ODD = 'Odd',
  EVEN = 'Even'
}

// Course Types
export enum CourseType {
  THEORY = 'Theory',
  PRACTICAL = 'Practical',
  LABORATORY = 'Laboratory',
  PROJECT = 'Project',
  SEMINAR = 'Seminar',
  ELECTIVE = 'Elective',
  CORE = 'Core'
}

// Room Types
export enum RoomType {
  CLASSROOM = 'Classroom',
  LABORATORY = 'Laboratory',
  SEMINAR_HALL = 'Seminar Hall',
  AUDITORIUM = 'Auditorium',
  CONFERENCE_ROOM = 'Conference Room',
  LIBRARY = 'Library',
  OFFICE = 'Office'
}

// Vehicle Types
export enum VehicleType {
  BUS = 'Bus',
  VAN = 'Van',
  CAR = 'Car',
  BIKE = 'Bike'
}

// Hostel Room Types
export enum HostelRoomType {
  SINGLE = 'Single',
  DOUBLE = 'Double',
  TRIPLE = 'Triple',
  DORMITORY = 'Dormitory'
}

// Leave Types
export enum LeaveType {
  SICK = 'Sick Leave',
  VACATION = 'Vacation Leave',
  EMERGENCY = 'Emergency Leave',
  MATERNITY = 'Maternity Leave',
  PATERNITY = 'Paternity Leave',
  PERSONAL = 'Personal Leave',
  ACADEMIC = 'Academic Leave'
}

// Payment Methods
export enum PaymentMethod {
  CASH = 'Cash',
  CARD = 'Card',
  UPI = 'UPI',
  NET_BANKING = 'Net Banking',
  CHEQUE = 'Cheque',
  DD = 'Demand Draft'
}

// Document Types
export enum DocumentType {
  AADHAR = 'Aadhar',
  PAN = 'PAN',
  PASSPORT = 'Passport',
  DRIVING_LICENSE = 'Driving License',
  VOTER_ID = 'Voter ID',
  BIRTH_CERTIFICATE = 'Birth Certificate',
  MARK_SHEET = 'Mark Sheet',
  TRANSFER_CERTIFICATE = 'Transfer Certificate',
  MEDICAL_CERTIFICATE = 'Medical Certificate'
}

