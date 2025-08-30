export interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
  busRoute: string;
  pickupPoint: string;
  contact: string;
  guardianName: string;
  address: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
}

export interface Staff {
  id: string;
  name: string;
  designation: string;
  department: string;
  busRoute: string;
  pickupPoint: string;
  contact: string;
  address: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  routeName: string;
  capacity: number;
  currentStudents: number;
  driverId: string;
  driverName: string;
  status: 'active' | 'maintenance' | 'inactive';
  lastMaintenance: string;
  nextMaintenance: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  contact: string;
  address: string;
  experience: number;
  busAssigned: string;
  attendanceToday: 'present' | 'absent';
  rating: number;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  monthlyFee: number;
  dueMonth: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  dueDate: string;
}

export interface Expense {
  id: string;
  category: 'fuel' | 'maintenance' | 'salary' | 'insurance' | 'other';
  description: string;
  amount: number;
  date: string;
  busNumber?: string;
  receipt?: string;
}

export interface Document {
  id: string;
  busNumber: string;
  documentType: 'insurance' | 'registration' | 'fitness' | 'permit';
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
  documentUrl?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: 'maintenance' | 'route' | 'driver' | 'student' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdBy: string;
  createdAt: string;
  assignedTo?: string;
}

export interface LiveLocation {
  busNumber: string;
  latitude: number;
  longitude: number;
  speed: number;
  lastUpdate: string;
  status: 'moving' | 'stopped' | 'breakdown';
}

export interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}