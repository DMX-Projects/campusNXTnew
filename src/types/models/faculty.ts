export interface Faculty {
  id: string;
  userId: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: FacultyDesignation;
  qualification: string[];
  specialization: string[];
  experience: {
    total: number;
    current: number;
  };
  dateOfJoining: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  address: {
    permanent: Address;
    current: Address;
  };
  subjects: SubjectAssignment[];
  research: {
    publications: number;
    projects: number;
    patents: number;
  };
  attendance: {
    percentage: number;
    presentDays: number;
    totalDays: number;
    leaves: {
      casual: number;
      medical: number;
      earned: number;
    };
  };
  salary: {
    basic: number;
    allowances: number;
    deductions: number;
    net: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type FacultyDesignation = 
  | 'Professor'
  | 'Associate Professor'
  | 'Assistant Professor'
  | 'Lecturer'
  | 'Lab Assistant'
  | 'Research Assistant';

export interface SubjectAssignment {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  department: string;
  year: number;
  semester: number;
  section: string[];
  credits: number;
  type: 'Theory' | 'Lab' | 'Tutorial';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}