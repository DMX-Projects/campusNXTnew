export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
  profilePicture?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  token?: string;
  refreshToken?: string;
}

export type UserRole = 
  | 'Student'
  | 'Faculty'
  | 'HoD'
  | 'Principal'
  | 'Admin'
  | 'Librarian'
  | 'Warden'
  | 'Parent'
  | 'Dean'
  | 'Chairperson'
  | 'TPO'
  | 'Lab Assistant'
  | 'Accountant'
  | 'Security'
  | 'Maintenance';

export interface UserProfile extends User {
  department?: string;
  designation?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}