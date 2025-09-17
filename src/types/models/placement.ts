export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  website?: string;
  about?: string;
  locations: string[];
  contactPerson: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  };
  hiringHistory: HiringHistory[];
  rating?: number;
  isActive: boolean;
}

export interface HiringHistory {
  year: string;
  studentsHired: number;
  packages: {
    minimum: number;
    maximum: number;
    average: number;
  };
}

export interface PlacementDrive {
  id: string;
  companyId: string;
  companyName: string;
  academicYear: string;
  type: 'On-Campus' | 'Off-Campus' | 'Pool Campus' | 'Virtual';
  jobProfiles: JobProfile[];
  eligibilityCriteria: EligibilityCriteria;
  selectionProcess: SelectionRound[];
  importantDates: {
    applicationDeadline: string;
    prePlacementTalk?: string;
    assessmentDate?: string;
    interviewDates?: string[];
    resultDate?: string;
  };
  venue?: string;
  registeredStudents: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  results?: PlacementResult[];
  createdAt: string;
  updatedAt: string;
}

export interface JobProfile {
  id: string;
  title: string;
  description: string;
  type: 'Full-Time' | 'Internship' | 'Internship + Full-Time';
  location: string[];
  ctc?: {
    fixed: number;
    variable?: number;
    total: number;
  };
  stipend?: number;
  positions: number;
  skills: string[];
  responsibilities?: string[];
}

export interface EligibilityCriteria {
  departments: string[];
  courses: string[];
  minimumCGPA: number;
  maximumBacklogs: number;
  yearOfPassing: number[];
  gender?: 'Any' | 'Male' | 'Female';
  additionalCriteria?: string[];
}

export interface SelectionRound {
  roundNumber: number;
  name: string;
  type: 'Written Test' | 'Technical Interview' | 'HR Interview' | 'Group Discussion' | 'Coding Round' | 'Case Study';
  description?: string;
  duration?: number;
  eliminationRound: boolean;
}

export interface PlacementApplication {
  id: string;
  driveId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  appliedFor: string[]; // Job profile IDs
  resume: string;
  appliedOn: string;
  status: ApplicationStatus;
  currentRound?: number;
  roundsCleared: RoundResult[];
  finalResult?: 'Selected' | 'Rejected' | 'Waitlisted';
  offerDetails?: OfferDetails;
}

export type ApplicationStatus = 
  | 'Applied'
  | 'Shortlisted'
  | 'Under Review'
  | 'In Process'
  | 'Selected'
  | 'Rejected'
  | 'Waitlisted'
  | 'Withdrawn';

export interface RoundResult {
  roundNumber: number;
  roundName: string;
  status: 'Cleared' | 'Not Cleared' | 'Absent';
  score?: number;
  feedback?: string;
  evaluatedOn: string;
}

export interface OfferDetails {
  jobProfile: string;
  ctc: number;
  joiningDate: string;
  location: string;
  offerLetterUrl?: string;
  acceptanceStatus: 'Pending' | 'Accepted' | 'Declined';
  acceptedOn?: string;
}

export interface PlacementResult {
  driveId: string;
  companyName: string;
  totalApplications: number;
  totalSelections: number;
  jobProfileWise: {
    profile: string;
    selected: number;
    package: number;
  }[];
  departmentWise: {
    department: string;
    selected: number;
  }[];
}

export interface PlacementStatistics {
  academicYear: string;
  totalStudents: number;
  totalPlaced: number;
  totalCompanies: number;
  packages: {
    highest: number;
    average: number;
    median: number;
  };
  departmentStats: {
    department: string;
    eligible: number;
    placed: number;
    percentage: number;
  }[];
}

export interface StudentPlacementProfile {
  studentId: string;
  resume: string[];
  skills: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  internships: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  achievements: string[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }[];
  preferences: {
    jobTypes: string[];
    locations: string[];
    minimumCTC?: number;
  };
  placementStatus: 'Not Placed' | 'Placed' | 'Multiple Offers';
  offers: OfferDetails[];
}