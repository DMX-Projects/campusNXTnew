import { Student, Staff, Bus, Driver, FeeRecord, Expense, Document, Ticket, LiveLocation, Message } from '../types';

export const students: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    class: '10th',
    section: 'A',
    rollNumber: 'ST001',
    busRoute: 'Route A',
    pickupPoint: 'Main Street',
    contact: '+1234567890',
    guardianName: 'John Johnson',
    address: '123 Main St, City',
    feeStatus: 'paid'
  },
  {
    id: '2',
    name: 'Bob Smith',
    class: '9th',
    section: 'B',
    rollNumber: 'ST002',
    busRoute: 'Route B',
    pickupPoint: 'Central Park',
    contact: '+1234567891',
    guardianName: 'Mary Smith',
    address: '456 Oak Ave, City',
    feeStatus: 'pending'
  },
  {
    id: '3',
    name: 'Charlie Davis',
    class: '11th',
    section: 'A',
    rollNumber: 'ST003',
    busRoute: 'Route A',
    pickupPoint: 'School Gate',
    contact: '+1234567892',
    guardianName: 'David Davis',
    address: '789 Pine St, City',
    feeStatus: 'overdue'
  }
];

export const staff: Staff[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    designation: 'Principal',
    department: 'Administration',
    busRoute: 'Route C',
    pickupPoint: 'Downtown',
    contact: '+1234567893',
    address: '321 Elm St, City'
  },
  {
    id: '2',
    name: 'Mr. Michael Brown',
    designation: 'Math Teacher',
    department: 'Mathematics',
    busRoute: 'Route A',
    pickupPoint: 'Library Square',
    contact: '+1234567894',
    address: '654 Maple Ave, City'
  }
];

export const buses: Bus[] = [
  {
    id: '1',
    busNumber: 'BUS001',
    routeName: 'Route A - Downtown',
    capacity: 50,
    currentStudents: 35,
    driverId: '1',
    driverName: 'James Wilson',
    status: 'active',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15'
  },
  {
    id: '2',
    busNumber: 'BUS002',
    routeName: 'Route B - Suburbs',
    capacity: 45,
    currentStudents: 28,
    driverId: '2',
    driverName: 'Robert Johnson',
    status: 'active',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-04-10'
  },
  {
    id: '3',
    busNumber: 'BUS003',
    routeName: 'Route C - Industrial Area',
    capacity: 40,
    currentStudents: 0,
    driverId: '3',
    driverName: 'Mark Davis',
    status: 'maintenance',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-02-20'
  }
];

export const drivers: Driver[] = [
  {
    id: '1',
    name: 'James Wilson',
    licenseNumber: 'DL123456789',
    contact: '+1234567895',
    address: '987 Cedar St, City',
    experience: 8,
    busAssigned: 'BUS001',
    attendanceToday: 'present',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Robert Johnson',
    licenseNumber: 'DL987654321',
    contact: '+1234567896',
    address: '147 Birch Ave, City',
    experience: 12,
    busAssigned: 'BUS002',
    attendanceToday: 'present',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Mark Davis',
    licenseNumber: 'DL456789123',
    contact: '+1234567897',
    address: '258 Spruce St, City',
    experience: 5,
    busAssigned: 'BUS003',
    attendanceToday: 'absent',
    rating: 4.5
  }
];

export const feeRecords: FeeRecord[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Alice Johnson',
    class: '10th A',
    monthlyFee: 150,
    dueMonth: 'February 2024',
    status: 'paid',
    paidDate: '2024-02-01',
    dueDate: '2024-02-10'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Bob Smith',
    class: '9th B',
    monthlyFee: 150,
    dueMonth: 'February 2024',
    status: 'pending',
    dueDate: '2024-02-10'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Charlie Davis',
    class: '11th A',
    monthlyFee: 150,
    dueMonth: 'January 2024',
    status: 'overdue',
    dueDate: '2024-01-10'
  }
];

export const expenses: Expense[] = [
  {
    id: '1',
    category: 'fuel',
    description: 'Diesel fuel for BUS001',
    amount: 120,
    date: '2024-02-01',
    busNumber: 'BUS001'
  },
  {
    id: '2',
    category: 'maintenance',
    description: 'Brake pad replacement',
    amount: 350,
    date: '2024-01-28',
    busNumber: 'BUS003'
  },
  {
    id: '3',
    category: 'salary',
    description: 'Driver monthly salary - January',
    amount: 2500,
    date: '2024-01-31'
  }
];

export const documents: Document[] = [
  {
    id: '1',
    busNumber: 'BUS001',
    documentType: 'insurance',
    issueDate: '2023-03-01',
    expiryDate: '2024-03-01',
    status: 'expiring'
  },
  {
    id: '2',
    busNumber: 'BUS002',
    documentType: 'registration',
    issueDate: '2022-06-15',
    expiryDate: '2024-06-15',
    status: 'valid'
  },
  {
    id: '3',
    busNumber: 'BUS003',
    documentType: 'fitness',
    issueDate: '2023-01-10',
    expiryDate: '2024-01-10',
    status: 'expired'
  }
];

export const tickets: Ticket[] = [
  {
    id: '1',
    title: 'Bus AC not working',
    description: 'The air conditioning system in BUS001 is not functioning properly',
    category: 'maintenance',
    priority: 'high',
    status: 'in-progress',
    createdBy: 'James Wilson',
    createdAt: '2024-02-01T10:30:00Z',
    assignedTo: 'Maintenance Team'
  },
  {
    id: '2',
    title: 'Route timing adjustment needed',
    description: 'Parents requesting earlier pickup time for Route B',
    category: 'route',
    priority: 'medium',
    status: 'open',
    createdBy: 'Transport Manager',
    createdAt: '2024-01-30T14:15:00Z'
  }
];

export const liveLocations: LiveLocation[] = [
  {
    busNumber: 'BUS001',
    latitude: 40.7128,
    longitude: -74.0060,
    speed: 35,
    lastUpdate: '2024-02-01T08:30:00Z',
    status: 'moving'
  },
  {
    busNumber: 'BUS002',
    latitude: 40.7589,
    longitude: -73.9851,
    speed: 0,
    lastUpdate: '2024-02-01T08:29:00Z',
    status: 'stopped'
  }
];

export const messages: Message[] = [
  {
    id: '1',
    from: 'Transport Manager',
    subject: 'Monthly Route Review',
    preview: 'Please review the monthly route efficiency report...',
    date: '2024-02-01',
    isRead: false,
    priority: 'high'
  },
  {
    id: '2',
    from: 'Driver - James Wilson',
    subject: 'Bus maintenance request',
    preview: 'The bus needs some minor repairs...',
    date: '2024-01-31',
    isRead: true,
    priority: 'medium'
  },
  {
    id: '3',
    from: 'Parent - Mary Smith',
    subject: 'Bus timing inquiry',
    preview: 'Could you please confirm the bus timing...',
    date: '2024-01-30',
    isRead: false,
    priority: 'low'
  }
];