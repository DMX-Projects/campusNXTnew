export interface Hostel {
  id: string;
  name: string;
  type: 'Boys' | 'Girls';
  capacity: number;
  occupied: number;
  blocks: HostelBlock[];
  wardenId: string;
  wardenName: string;
  assistantWardens?: string[];
  facilities: string[];
  rules?: string[];
  timings: {
    inTime: string;
    outTime: string;
    messTimings: MessTiming[];
  };
  contactNumbers: string[];
  address: string;
  isActive: boolean;
}

export interface HostelBlock {
  id: string;
  blockName: string;
  floors: number;
  roomsPerFloor: number;
  totalRooms: number;
  occupiedRooms: number;
  roomTypes: RoomType[];
}

export interface RoomType {
  type: 'Single' | 'Double' | 'Triple' | 'Dormitory';
  count: number;
  fee: number;
  facilities: string[];
}

export interface Room {
  id: string;
  hostelId: string;
  blockId: string;
  roomNumber: string;
  floor: number;
  type: 'Single' | 'Double' | 'Triple' | 'Dormitory';
  capacity: number;
  occupied: number;
  occupants: RoomOccupant[];
  facilities: string[];
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  fee: number;
  lastInspection?: string;
  remarks?: string;
}

export interface RoomOccupant {
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  year: number;
  checkInDate: string;
  checkOutDate?: string;
  bedNumber?: number;
}

export interface HostelComplaint {
  id: string;
  complaintNumber: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  category: ComplaintCategory;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  attachments?: string[];
  registeredOn: string;
  resolvedOn?: string;
  resolvedBy?: string;
  resolution?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

export type ComplaintCategory = 
  | 'Room Maintenance'
  | 'Electrical'
  | 'Plumbing'
  | 'Furniture'
  | 'Cleanliness'
  | 'Food Quality'
  | 'Security'
  | 'Internet'
  | 'Other';

export interface MessTiming {
  meal: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';
  startTime: string;
  endTime: string;
  menu?: string[];
}

export interface HostelLeave {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  leaveType: 'Day' | 'Night' | 'Vacation' | 'Emergency';
  fromDate: string;
  toDate: string;
  fromTime?: string;
  toTime?: string;
  reason: string;
  destination: string;
  contactNumber: string;
  parentApproval?: boolean;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  appliedOn: string;
  approvedBy?: string;
  approvedOn?: string;
  checkOut?: {
    time: string;
    by: string;
  };
  checkIn?: {
    time: string;
    by: string;
  };
  remarks?: string;
}