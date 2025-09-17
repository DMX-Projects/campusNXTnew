export interface AttendanceRecord {
  id: string;
  date: string;
  type: 'Student' | 'Faculty';
  subjectId?: string;
  subjectName?: string;
  sessionType?: 'Theory' | 'Lab' | 'Tutorial';
  startTime: string;
  endTime: string;
  markedBy: string;
  markedAt: string;
  records: AttendanceEntry[];
  summary: {
    total: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
  };
  remarks?: string;
}

export interface AttendanceEntry {
  personId: string;
  personName: string;
  rollNumber?: string;
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
  remarks?: string;
  isExcused?: boolean;
  excuseReason?: string;
}

export type AttendanceStatus = 
  | 'Present'
  | 'Absent'
  | 'Late'
  | 'Excused'
  | 'Holiday'
  | 'On Leave';

export interface AttendanceSummary {
  personId: string;
  personName: string;
  subjectId?: string;
  subjectName?: string;
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
  lastUpdated: string;
}

export interface LeaveApplication {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantType: 'Student' | 'Faculty';
  leaveType: 'Casual' | 'Medical' | 'Emergency' | 'Academic' | 'Personal';
  startDate: string;
  endDate: string;
  numberOfDays: number;
  reason: string;
  documents?: string[];
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  appliedOn: string;
  approvedBy?: string;
  approvedOn?: string;
  remarks?: string;
}