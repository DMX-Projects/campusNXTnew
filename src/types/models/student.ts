export interface Student {
  id: string;
  userId: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  course: string;
  year: number;
  semester: number;
  section: string;
  rollNumber: string;
  admissionNumber: string;
  admissionDate: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  nationality: string;
  address: {
    permanent: Address;
    current: Address;
  };
  parent: ParentInfo;
  academic: {
    cgpa: number;
    sgpa: number[];
    attendance: number;
    credits: {
      earned: number;
      required: number;
    };
  };
  hostel?: {
    roomNumber: string;
    block: string;
    floor: number;
  };
  transport?: {
    routeNumber: string;
    stopName: string;
  };
  fees: {
    status: 'Paid' | 'Pending' | 'Overdue';
    totalAmount: number;
    paidAmount: number;
    dueDate?: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface ParentInfo {
  father: {
    name: string;
    occupation: string;
    phone: string;
    email?: string;
  };
  mother: {
    name: string;
    occupation: string;
    phone: string;
    email?: string;
  };
  guardian?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
}