export interface Student {
  id: number;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  caste: string;
  status: string;
  program: string;
  rollNumber: string;
}

export interface EducationRecord {
  id: number;
  instituteName: string;
  boardUni: string;
  year: string;
  month: string;
  obtained: string;
  maximum: string;
  percentage: string;
  grade: string;
  attempt: string;
}

export interface FormData {
  // Basic Details
  studentName: string;
  rollNumber: string;
  admissionNumber: string;
  program: string;
  batch: string;
  academicYear: string;
  studentId: string;
  registrationNumber: string;
  
  // Course Details
  course: string;
  branch: string;
  semester: string;
  section: string;
  specialization: string;
  courseDuration: string;
  
  // Correspondence Address
  corrAddress: string;
  corrCity: string;
  corrState: string;
  corrPincode: string;
  corrCountry: string;
  corrLandmark: string;
  
  // Permanent Address
  permAddress: string;
  permCity: string;
  permState: string;
  permPincode: string;
  permCountry: string;
  permLandmark: string;
  sameAsCorrespondence: boolean;
  
  // Personal Details
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  caste: string;
  category: string;
  aadharNumber: string;
  panNumber: string;
  passportNumber: string;
  maritalStatus: string;
  phoneNumber: string;
  alternatePhone: string;
  email: string;
  alternateEmail: string;
  
  // Father Details
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  fatherEmail: string;
  fatherIncome: string;
  fatherEducation: string;
  fatherOrganization: string;
  
  // Mother Details
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
  motherEmail: string;
  motherIncome: string;
  motherEducation: string;
  motherOrganization: string;
  
  // Guardian Details
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianAddress: string;
  guardianOccupation: string;
  isGuardianRequired: boolean;
  
  // Previous Year
  previousSchool: string;
  previousBoard: string;
  previousPercentage: string;
  previousYear: string;
  previousGrade: string;
  previousRollNumber: string;
  tcNumber: string;
  migrationNumber: string;
  
  // Educational Information
  educationRecords: EducationRecord[];
}

export interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type ViewType = 'list' | 'edit';
export type TabType = 'basic' | 'course' | 'correspondence' | 'permanent' | 'personal' | 'father' | 'mother' | 'guardian' | 'previous' | 'educational';

export interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export interface FilterOptions {
  program: string;
  gender: string;
  status: string;
  caste: string;
}