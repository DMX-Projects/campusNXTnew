import React, { useState, useEffect, useMemo } from 'react';
import { Search, UserCheck, UserX, Calendar, GraduationCap, Users, Filter, Download, Eye, Clock, BookOpen, RefreshCw, Save, Edit, Trash2, Plus, CheckCircle, XCircle, AlertCircle, BarChart3, TrendingUp, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  branch: string;
  year: number;
  semester: number;
  section: string;
  academicYear: string;
  phoneNumber: string;
  parentContact: string;
  parentEmail: string;
  address: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  admissionDate: string;
}

interface Exam {
  id: string;
  subject: string;
  examCode: string;
  branch: string;
  semester: number;
  year: number;
  date: string;
  startTime: string;
  endTime: string;
  session: 'Morning' | 'Afternoon' | 'Evening';
  venue: string;
  invigilator: string;
  totalMarks: number;
  examType: 'Internal' | 'External' | 'Practical' | 'Viva' | 'Assignment';
  eligibleStudents: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  instructions: string;
}

interface AttendanceRecord {
  id: string;
  studentId: string;
  examId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  checkInTime?: string;
  checkOutTime?: string;
  remarks?: string;
  markedBy: string;
  timestamp: string;
  ipAddress?: string;
  deviceInfo?: string;
  parentNotified: boolean;
  excuseReason?: string;
  attachments?: string[];
}

interface StudentExamData {
  student: Student;
  exam: Exam;
  attendance?: AttendanceRecord;
}

const ExamAttendanceSystemV5 = () => {
  // Sample Students Data
  const [students] = useState<Student[]>([
    { 
      id: '1', name: 'Aarav Sharma', rollNumber: 'CSE2021001', email: 'aarav.sharma@university.edu', 
      branch: 'Computer Science', year: 3, semester: 6, section: 'A', academicYear: '2021-25', 
      phoneNumber: '+91-9876543210', parentContact: '+91-9876543211', parentEmail: 'parent.aarav@gmail.com',
      address: 'Sector 15, Gurgaon, Haryana', dateOfBirth: '2002-05-15', gender: 'Male',
      bloodGroup: 'B+', admissionDate: '2021-08-15'
    },
    { 
      id: '2', name: 'Priya Patel', rollNumber: 'CSE2021002', email: 'priya.patel@university.edu', 
      branch: 'Computer Science', year: 3, semester: 6, section: 'A', academicYear: '2021-25', 
      phoneNumber: '+91-9876543212', parentContact: '+91-9876543213', parentEmail: 'parent.priya@gmail.com',
      address: 'Vastrapur, Ahmedabad, Gujarat', dateOfBirth: '2002-08-22', gender: 'Female',
      bloodGroup: 'O+', admissionDate: '2021-08-15'
    },
    { 
      id: '3', name: 'Rahul Kumar', rollNumber: 'CSE2021003', email: 'rahul.kumar@university.edu', 
      branch: 'Computer Science', year: 3, semester: 6, section: 'B', academicYear: '2021-25', 
      phoneNumber: '+91-9876543214', parentContact: '+91-9876543215', parentEmail: 'parent.rahul@gmail.com',
      address: 'Boring Road, Patna, Bihar', dateOfBirth: '2002-11-10', gender: 'Male',
      bloodGroup: 'A+', admissionDate: '2021-08-15'
    },
    { 
      id: '4', name: 'Anjali Singh', rollNumber: 'ECE2021004', email: 'anjali.singh@university.edu', 
      branch: 'Electronics & Communication', year: 3, semester: 6, section: 'A', academicYear: '2021-25', 
      phoneNumber: '+91-9876543216', parentContact: '+91-9876543217', parentEmail: 'parent.anjali@gmail.com',
      address: 'Connaught Place, New Delhi', dateOfBirth: '2002-03-18', gender: 'Female',
      bloodGroup: 'AB+', admissionDate: '2021-08-15'
    },
    { 
      id: '5', name: 'Vikram Joshi', rollNumber: 'CSE2022005', email: 'vikram.joshi@university.edu', 
      branch: 'Computer Science', year: 2, semester: 4, section: 'A', academicYear: '2022-26', 
      phoneNumber: '+91-9876543218', parentContact: '+91-9876543219', parentEmail: 'parent.vikram@gmail.com',
      address: 'FC Road, Pune, Maharashtra', dateOfBirth: '2003-07-25', gender: 'Male',
      bloodGroup: 'B-', admissionDate: '2022-08-15'
    },
    { 
      id: '6', name: 'Meera Reddy', rollNumber: 'ME2021006', email: 'meera.reddy@university.edu', 
      branch: 'Mechanical Engineering', year: 3, semester: 6, section: 'A', academicYear: '2021-25', 
      phoneNumber: '+91-9876543220', parentContact: '+91-9876543221', parentEmail: 'parent.meera@gmail.com',
      address: 'Jubilee Hills, Hyderabad, Telangana', dateOfBirth: '2002-12-05', gender: 'Female',
      bloodGroup: 'O-', admissionDate: '2021-08-15'
    },
    { 
      id: '7', name: 'Arjun Gupta', rollNumber: 'CSE2021007', email: 'arjun.gupta@university.edu', 
      branch: 'Computer Science', year: 3, semester: 6, section: 'A', academicYear: '2021-25', 
      phoneNumber: '+91-9876543222', parentContact: '+91-9876543223', parentEmail: 'parent.arjun@gmail.com',
      address: 'Park Street, Kolkata, West Bengal', dateOfBirth: '2002-09-30', gender: 'Male',
      bloodGroup: 'A-', admissionDate: '2021-08-15'
    },
    { 
      id: '8', name: 'Shreya Iyer', rollNumber: 'ECE2021008', email: 'shreya.iyer@university.edu', 
      branch: 'Electronics & Communication', year: 3, semester: 6, section: 'B', academicYear: '2021-25', 
      phoneNumber: '+91-9876543224', parentContact: '+91-9876543225', parentEmail: 'parent.shreya@gmail.com',
      address: 'Indiranagar, Bangalore, Karnataka', dateOfBirth: '2002-04-12', gender: 'Female',
      bloodGroup: 'B+', admissionDate: '2021-08-15'
    },
    { 
      id: '9', name: 'Karthik Nair', rollNumber: 'CSE2022009', email: 'karthik.nair@university.edu', 
      branch: 'Computer Science', year: 2, semester: 4, section: 'B', academicYear: '2022-26', 
      phoneNumber: '+91-9876543226', parentContact: '+91-9876543227', parentEmail: 'parent.karthik@gmail.com',
      address: 'Marine Drive, Kochi, Kerala', dateOfBirth: '2003-01-20', gender: 'Male',
      bloodGroup: 'AB-', admissionDate: '2022-08-15'
    },
    { 
      id: '10', name: 'Divya Agarwal', rollNumber: 'ME2021010', email: 'divya.agarwal@university.edu', 
      branch: 'Mechanical Engineering', year: 3, semester: 6, section: 'A', academicYear: '2021-25', 
      phoneNumber: '+91-9876543228', parentContact: '+91-9876543229', parentEmail: 'parent.divya@gmail.com',
      address: 'Civil Lines, Jaipur, Rajasthan', dateOfBirth: '2002-06-08', gender: 'Female',
      bloodGroup: 'O+', admissionDate: '2021-08-15'
    },
    { 
      id: '11', name: 'Amit Verma', rollNumber: 'ECE2022011', email: 'amit.verma@university.edu', 
      branch: 'Electronics & Communication', year: 2, semester: 4, section: 'A', academicYear: '2022-26', 
      phoneNumber: '+91-9876543230', parentContact: '+91-9876543231', parentEmail: 'parent.amit@gmail.com',
      address: 'Hazratganj, Lucknow, Uttar Pradesh', dateOfBirth: '2003-10-14', gender: 'Male',
      bloodGroup: 'A+', admissionDate: '2022-08-15'
    },
    { 
      id: '12', name: 'Neha Kapoor', rollNumber: 'CSE2021012', email: 'neha.kapoor@university.edu', 
      branch: 'Computer Science', year: 3, semester: 6, section: 'B', academicYear: '2021-25', 
      phoneNumber: '+91-9876543232', parentContact: '+91-9876543233', parentEmail: 'parent.neha@gmail.com',
      address: 'Sector 17, Chandigarh', dateOfBirth: '2002-02-28', gender: 'Female',
      bloodGroup: 'B-', admissionDate: '2021-08-15'
    },
    { 
      id: '13', name: 'Rohan Mishra', rollNumber: 'ME2022013', email: 'rohan.mishra@university.edu', 
      branch: 'Mechanical Engineering', year: 2, semester: 4, section: 'A', academicYear: '2022-26', 
      phoneNumber: '+91-9876543234', parentContact: '+91-9876543235', parentEmail: 'parent.rohan@gmail.com',
      address: 'Banjara Hills, Hyderabad, Telangana', dateOfBirth: '2003-03-16', gender: 'Male',
      bloodGroup: 'AB+', admissionDate: '2022-08-15'
    },
    { 
      id: '14', name: 'Kavya Pillai', rollNumber: 'ECE2021014', email: 'kavya.pillai@university.edu', 
      branch: 'Electronics & Communication', year: 3, semester: 6, section: 'A', academicYear: '2021-25', 
      phoneNumber: '+91-9876543236', parentContact: '+91-9876543237', parentEmail: 'parent.kavya@gmail.com',
      address: 'Vellayambalam, Trivandrum, Kerala', dateOfBirth: '2002-07-03', gender: 'Female',
      bloodGroup: 'O+', admissionDate: '2021-08-15'
    },
    { 
      id: '15', name: 'Aditya Rao', rollNumber: 'CSE2022015', email: 'aditya.rao@university.edu', 
      branch: 'Computer Science', year: 2, semester: 4, section: 'A', academicYear: '2022-26', 
      phoneNumber: '+91-9876543238', parentContact: '+91-9876543239', parentEmail: 'parent.aditya@gmail.com',
      address: 'Koramangala, Bangalore, Karnataka', dateOfBirth: '2003-11-28', gender: 'Male',
      bloodGroup: 'A-', admissionDate: '2022-08-15'
    }
  ]);

  // Sample Exams Data
  const [exams] = useState<Exam[]>([
    {
      id: '1', subject: 'Data Structures & Algorithms', examCode: 'CSE301', branch: 'Computer Science', 
      semester: 6, year: 3, date: '2025-09-15', startTime: '09:00', endTime: '12:00', session: 'Morning',
      venue: 'Main Auditorium - Hall A', invigilator: 'Dr. Rajesh Kumar', totalMarks: 100, examType: 'External',
      eligibleStudents: ['1', '2', '3', '7', '12'], isActive: true, createdBy: 'Dr. Pradeep Singh',
      createdAt: '2025-09-01T10:00:00Z', instructions: 'Calculators not allowed. Answer all questions.'
    },
    {
      id: '2', subject: 'Database Management Systems', examCode: 'CSE302', branch: 'Computer Science', 
      semester: 6, year: 3, date: '2025-09-18', startTime: '14:00', endTime: '17:00', session: 'Afternoon',
      venue: 'Computer Lab - 201', invigilator: 'Prof. Sita Sharma', totalMarks: 100, examType: 'Internal',
      eligibleStudents: ['1', '2', '3', '7', '12'], isActive: true, createdBy: 'Dr. Pradeep Singh',
      createdAt: '2025-09-01T10:00:00Z', instructions: 'Practical exam. SQL queries and database design.'
    },
    {
      id: '3', subject: 'Digital Signal Processing', examCode: 'ECE401', branch: 'Electronics & Communication', 
      semester: 6, year: 3, date: '2025-09-20', startTime: '10:00', endTime: '13:00', session: 'Morning',
      venue: 'DSP Laboratory', invigilator: 'Dr. Amit Verma', totalMarks: 75, examType: 'Practical',
      eligibleStudents: ['4', '8', '14'], isActive: true, createdBy: 'Dr. Pradeep Singh',
      createdAt: '2025-09-01T10:00:00Z', instructions: 'MATLAB software will be provided. Bring lab manual.'
    },
    {
      id: '4', subject: 'Software Engineering', examCode: 'CSE303', branch: 'Computer Science', 
      semester: 4, year: 2, date: '2025-09-12', startTime: '15:30', endTime: '18:30', session: 'Evening',
      venue: 'Lecture Hall - B2', invigilator: 'Prof. Neha Agarwal', totalMarks: 50, examType: 'Internal',
      eligibleStudents: ['5', '9', '15'], isActive: true, createdBy: 'Dr. Pradeep Singh',
      createdAt: '2025-09-01T10:00:00Z', instructions: 'Case study based questions. Draw diagrams clearly.'
    },
    {
      id: '5', subject: 'Thermodynamics', examCode: 'ME501', branch: 'Mechanical Engineering', 
      semester: 6, year: 3, date: '2025-09-22', startTime: '09:30', endTime: '12:30', session: 'Morning',
      venue: 'Main Auditorium - Hall C', invigilator: 'Dr. Suresh Rao', totalMarks: 100, examType: 'External',
      eligibleStudents: ['6', '10'], isActive: true, createdBy: 'Dr. Pradeep Singh',
      createdAt: '2025-09-01T10:00:00Z', instructions: 'Steam tables and gas tables will be provided.'
    },
    {
      id: '6', subject: 'Circuit Analysis', examCode: 'ECE201', branch: 'Electronics & Communication', 
      semester: 4, year: 2, date: '2025-09-16', startTime: '11:00', endTime: '14:00', session: 'Morning',
      venue: 'Electronics Laboratory', invigilator: 'Dr. Priya Sharma', totalMarks: 75, examType: 'Practical',
      eligibleStudents: ['11'], isActive: true, createdBy: 'Dr. Pradeep Singh',
      createdAt: '2025-09-01T10:00:00Z', instructions: 'Multimeter and oscilloscope usage required.'
    },
    {
      id: '7', subject: 'Machine Design', examCode: 'ME401', branch: 'Mechanical Engineering', 
      semester: 4, year: 2, date: '2025-09-25', startTime: '14:30', endTime: '17:30', session: 'Afternoon',
      venue: 'Drawing Hall', invigilator: 'Prof. Vikram Singh', totalMarks: 100, examType: 'Internal',
      eligibleStudents: ['13'], isActive: true, createdBy: 'Dr. Pradeep Singh',
      createdAt: '2025-09-01T10:00:00Z', instructions: 'Drawing instruments required. Design handbook allowed.'
    }
  ]);

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterSemester, setFilterSemester] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterSession, setFilterSession] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('all');
  const [filterExamType, setFilterExamType] = useState<string>('all');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [facultyName] = useState('Dr. Pradeep Singh');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

  // Get unique filter options
  const filterOptions = useMemo(() => ({
    branches: [...new Set(students.map(s => s.branch))].sort(),
    years: [...new Set(students.map(s => s.year))].sort((a, b) => a - b),
    semesters: [...new Set(students.map(s => s.semester))].sort((a, b) => a - b),
    subjects: [...new Set(exams.map(e => e.subject))].sort(),
    sessions: [...new Set(exams.map(e => e.session))].sort(),
    dates: [...new Set(exams.map(e => e.date))].sort(),
    examTypes: [...new Set(exams.map(e => e.examType))].sort()
  }), [students, exams]);

  // Initialize attendance records
  useEffect(() => {
    const initAttendance: AttendanceRecord[] = [];
    let recordId = 1;
    
    exams.forEach(exam => {
      exam.eligibleStudents.forEach(studentId => {
        const existing = attendance.find(a => a.studentId === studentId && a.examId === exam.id);
        if (!existing) {
          initAttendance.push({
            id: `att_${recordId++}`,
            studentId,
            examId: exam.id,
            status: 'present',
            markedBy: facultyName,
            timestamp: new Date().toISOString(),
            parentNotified: false,
            remarks: '',
            ipAddress: '192.168.1.100',
            deviceInfo: 'Web Browser'
          });
        }
      });
    });
    
    if (initAttendance.length > 0) {
      setAttendance(prev => [...prev, ...initAttendance]);
    }
  }, [exams, facultyName]);

  // Get combined student-exam data
  const getStudentExamData = (): StudentExamData[] => {
    const data: StudentExamData[] = [];
    
    exams.forEach(exam => {
      exam.eligibleStudents.forEach(studentId => {
        const student = students.find(s => s.id === studentId);
        const attendanceRecord = attendance.find(a => a.studentId === studentId && a.examId === exam.id);
        
        if (student) {
          data.push({
            student,
            exam,
            attendance: attendanceRecord
          });
        }
      });
    });
    
    return data;
  };

  // Apply filters
  const getFilteredData = () => {
    let data = getStudentExamData();

    // Search filter
    if (searchTerm) {
      data = data.filter(item =>
        item.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.exam.examCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply all filters
    if (filterBranch !== 'all') data = data.filter(item => item.student.branch === filterBranch);
    if (filterYear !== 'all') data = data.filter(item => item.student.year.toString() === filterYear);
    if (filterSemester !== 'all') data = data.filter(item => item.student.semester.toString() === filterSemester);
    if (filterSubject !== 'all') data = data.filter(item => item.exam.subject === filterSubject);
    if (filterSession !== 'all') data = data.filter(item => item.exam.session === filterSession);
    if (filterDate !== 'all') data = data.filter(item => item.exam.date === filterDate);
    if (filterExamType !== 'all') data = data.filter(item => item.exam.examType === filterExamType);
    if (filterStatus !== 'all') data = data.filter(item => item.attendance?.status === filterStatus);

    return data;
  };

  // Pagination
  const paginatedData = useMemo(() => {
    const filteredData = getFilteredData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [getFilteredData(), currentPage, itemsPerPage]);

  const totalPages = Math.ceil(getFilteredData().length / itemsPerPage);

  // Attendance management functions
  const handleAttendanceChange = (studentId: string, examId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    const now = new Date();
    const checkInTime = status === 'present' || status === 'late' ? 
      `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}` : undefined;

    setAttendance(prev => prev.map(record => 
      record.studentId === studentId && record.examId === examId
        ? { 
            ...record, 
            status, 
            checkInTime, 
            timestamp: now.toISOString(),
            parentNotified: status === 'absent'
          }
        : record
    ));

    setLastSyncTime(new Date());
  };

  const handleRemarksChange = (studentId: string, examId: string, remarks: string) => {
    setAttendance(prev => prev.map(record => 
      record.studentId === studentId && record.examId === examId
        ? { ...record, remarks }
        : record
    ));
  };

  // Bulk operations
  const handleSelectRow = (key: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    const currentPageKeys = paginatedData.map(item => `${item.student.id}-${item.exam.id}`);
    const allSelected = currentPageKeys.every(key => selectedRows.has(key));
    
    if (allSelected) {
      const newSelected = new Set(selectedRows);
      currentPageKeys.forEach(key => newSelected.delete(key));
      setSelectedRows(newSelected);
    } else {
      setSelectedRows(new Set([...selectedRows, ...currentPageKeys]));
    }
  };

  const markSelectedAs = (status: 'present' | 'absent' | 'late' | 'excused') => {
    selectedRows.forEach(key => {
      const [studentId, examId] = key.split('-');
      handleAttendanceChange(studentId, examId, status);
    });
    setSelectedRows(new Set());
    setShowBulkActions(false);
  };

  // Export functionality
  const exportData = () => {
    const data = getFilteredData().map(item => ({
      'Student Name': item.student.name,
      'Roll Number': item.student.rollNumber,
      'Branch': item.student.branch,
      'Year': item.student.year,
      'Semester': item.student.semester,
      'Section': item.student.section,
      'Subject': item.exam.subject,
      'Exam Code': item.exam.examCode,
      'Exam Type': item.exam.examType,
      'Date': new Date(item.exam.date).toLocaleDateString('en-IN'),
      'Timing': `${item.exam.startTime} - ${item.exam.endTime}`,
      'Session': item.exam.session,
      'Venue': item.exam.venue,
      'Invigilator': item.exam.invigilator,
      'Attendance Status': item.attendance?.status || 'N/A',
      'Check-in Time': item.attendance?.checkInTime || 'N/A',
      'Check-out Time': item.attendance?.checkOutTime || 'N/A',
      'Remarks': item.attendance?.remarks || '',
      'Student Phone': item.student.phoneNumber,
      'Parent Contact': item.student.parentContact,
      'Parent Email': item.student.parentEmail,
      'Student Email': item.student.email,
      'Address': item.student.address,
      'Blood Group': item.student.bloodGroup,
      'Gender': item.student.gender,
      'Parent Notified': item.attendance?.parentNotified ? 'Yes' : 'No',
      'Marked By': item.attendance?.markedBy || 'N/A',
      'Last Updated': item.attendance?.timestamp ? new Date(item.attendance.timestamp).toLocaleString('en-IN') : 'N/A'
    }));

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${new Date().toISOString().split('T')[0]}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterBranch('all');
    setFilterYear('all');
    setFilterSemester('all');
    setFilterSubject('all');
    setFilterSession('all');
    setFilterStatus('all');
    setFilterDate('all');
    setFilterExamType('all');
    setSelectedRows(new Set());
    setCurrentPage(1);
  };

  // Calculate statistics
  const filteredData = getFilteredData();
  const stats = useMemo(() => ({
    total: filteredData.length,
    present: filteredData.filter(item => item.attendance?.status === 'present').length,
    absent: filteredData.filter(item => item.attendance?.status === 'absent').length,
    late: filteredData.filter(item => item.attendance?.status === 'late').length,
    excused: filteredData.filter(item => item.attendance?.status === 'excused').length
  }), [filteredData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-full mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <GraduationCap className="text-blue-600" />
                Student Examination Attendance System
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">v5.0</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Faculty: {facultyName} | Comprehensive Attendance Management</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>Last Sync: {lastSyncTime.toLocaleTimeString('en-IN')}</span>
                <span>•</span>
                <span>{filteredData.length} Records</span>
                <span>•</span>
                <span>{selectedRows.size} Selected</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm text-gray-500">
                Today: {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </div>
              <div className="text-xs text-gray-400">
                System Status: <span className="text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600 font-medium">Total Records</div>
              </div>
              <Users className="text-blue-400" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">{stats.present}</div>
                <div className="text-sm text-gray-600 font-medium">Present</div>
                <div className="text-xs text-green-600">
                  {stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}%
                </div>
              </div>
              <CheckCircle className="text-green-400" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-red-600">{stats.absent}</div>
                <div className="text-sm text-gray-600 font-medium">Absent</div>
                <div className="text-xs text-red-600">
                  {stats.total > 0 ? Math.round((stats.absent / stats.total) * 100) : 0}%
                </div>
              </div>
              <XCircle className="text-red-400" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-yellow-600">{stats.late}</div>
                <div className="text-sm text-gray-600 font-medium">Late</div>
                <div className="text-xs text-yellow-600">
                  {stats.total > 0 ? Math.round((stats.late / stats.total) * 100) : 0}%
                </div>
              </div>
              <Clock className="text-yellow-400" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600">{stats.excused}</div>
                <div className="text-sm text-gray-600 font-medium">Excused</div>
                <div className="text-xs text-purple-600">
                  {stats.total > 0 ? Math.round((stats.excused / stats.total) * 100) : 0}%
                </div>
              </div>
              <AlertCircle className="text-purple-400" size={32} />
            </div>
          </div>
        </div>

        {/* Advanced Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="text-blue-600" />
              Advanced Filters & Search
            </h2>
            <div className="flex gap-2">
              <button
                onClick={resetFilters}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Reset All
              </button>
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  showBulkActions 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <Edit size={16} />
                Bulk Actions
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by student name, roll number, subject, or exam code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-4">
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Branches</option>
              {filterOptions.branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>

            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Years</option>
              {filterOptions.years.map(year => (
                <option key={year} value={year.toString()}>Year {year}</option>
              ))}
            </select>

            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Semesters</option>
              {filterOptions.semesters.map(sem => (
                <option key={sem} value={sem.toString()}>Sem {sem}</option>
              ))}
            </select>

            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Subjects</option>
              {filterOptions.subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={filterSession}
              onChange={(e) => setFilterSession(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Sessions</option>
              {filterOptions.sessions.map(session => (
                <option key={session} value={session}>{session}</option>
              ))}
            </select>

            <select
              value={filterExamType}
              onChange={(e) => setFilterExamType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Exam Types</option>
              {filterOptions.examTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Dates</option>
              {filterOptions.dates.map(date => (
                <option key={date} value={date}>{new Date(date).toLocaleDateString('en-IN')}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="excused">Excused</option>
            </select>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus('present')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'present' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Present ({stats.present})
            </button>
            <button
              onClick={() => setFilterStatus('absent')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'absent' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Absent ({stats.absent})
            </button>
            <button
              onClick={() => setFilterStatus('late')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'late' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Late ({stats.late})
            </button>
            <button
              onClick={() => setFilterStatus('excused')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'excused' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Excused ({stats.excused})
            </button>
          </div>
        </div>

        {/* Bulk Actions Panel */}
        {showBulkActions && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-blue-800 font-medium">Bulk Actions:</span>
              
              <button
                onClick={handleSelectAll}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
              >
                <Users size={16} />
                {paginatedData.every(item => selectedRows.has(`${item.student.id}-${item.exam.id}`)) 
                  ? 'Deselect Page' : 'Select Page'}
              </button>
              
              {selectedRows.size > 0 && (
                <>
                  <div className="h-6 w-px bg-blue-300"></div>
                  
                  <button
                    onClick={() => markSelectedAs('present')}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
                  >
                    <UserCheck size={16} />
                    Mark Present ({selectedRows.size})
                  </button>
                  
                  <button
                    onClick={() => markSelectedAs('absent')}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                  >
                    <UserX size={16} />
                    Mark Absent ({selectedRows.size})
                  </button>
                  
                  <button
                    onClick={() => markSelectedAs('late')}
                    className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors flex items-center gap-2"
                  >
                    <Clock size={16} />
                    Mark Late ({selectedRows.size})
                  </button>

                  <button
                    onClick={() => markSelectedAs('excused')}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2"
                  >
                    <AlertCircle size={16} />
                    Mark Excused ({selectedRows.size})
                  </button>
                </>
              )}
              
              <div className="ml-auto">
                <button
                  onClick={exportData}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Export CSV ({filteredData.length} records)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Data Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="text-blue-600" />
                Student Attendance Records
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Show:</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                <span className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-4 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={paginatedData.length > 0 && paginatedData.every(item => 
                        selectedRows.has(`${item.student.id}-${item.exam.id}`)
                      )}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Student Details</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Academic Info</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Subject & Exam</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Schedule</th>
                  <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Attendance</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Remarks</th>
                  <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedData.map((item) => {
                  const rowKey = `${item.student.id}-${item.exam.id}`;
                  const isSelected = selectedRows.has(rowKey);
                  const status = item.attendance?.status || 'present';
                  
                  return (
                    <tr 
                      key={rowKey} 
                      className={`hover:bg-blue-50 transition-colors ${
                        isSelected ? 'bg-blue-100 border-blue-200' : ''
                      }`}
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowKey)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-gray-900">{item.student.name}</div>
                          <div className="text-sm text-blue-600 font-medium">{item.student.rollNumber}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail size={12} />
                            {item.student.email}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone size={12} />
                            {item.student.phoneNumber}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">{item.student.branch}</div>
                          <div className="text-sm text-gray-600">Year {item.student.year} • Sem {item.student.semester}</div>
                          <div className="text-xs text-gray-500">Section {item.student.section}</div>
                          <div className="text-xs text-gray-400">{item.student.academicYear}</div>
                        </div>
                      </td>
                      
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-gray-900">{item.exam.subject}</div>
                          <div className="text-sm text-gray-600">{item.exam.examCode}</div>
                          <div className="flex gap-1">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              item.exam.examType === 'External' ? 'bg-red-100 text-red-700' :
                              item.exam.examType === 'Internal' ? 'bg-blue-100 text-blue-700' :
                              item.exam.examType === 'Practical' ? 'bg-green-100 text-green-700' :
                              item.exam.examType === 'Viva' ? 'bg-purple-100 text-purple-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {item.exam.examType}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">{item.exam.totalMarks} marks</div>
                        </div>
                      </td>
                      
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(item.exam.date).toLocaleDateString('en-IN')}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock size={14} />
                            {item.exam.startTime} - {item.exam.endTime}
                          </div>
                          <div>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              item.exam.session === 'Morning' ? 'bg-yellow-100 text-yellow-700' :
                              item.exam.session === 'Afternoon' ? 'bg-orange-100 text-orange-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {item.exam.session}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">{item.exam.venue}</div>
                        </div>
                      </td>
                      
                      <td className="px-4 py-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleAttendanceChange(item.student.id, item.exam.id, 'present')}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                status === 'present'
                                  ? 'bg-green-100 text-green-600 ring-2 ring-green-300 shadow-sm'
                                  : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-500'
                              }`}
                              title="Mark Present"
                            >
                              <UserCheck size={16} />
                            </button>
                            <button
                              onClick={() => handleAttendanceChange(item.student.id, item.exam.id, 'absent')}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                status === 'absent'
                                  ? 'bg-red-100 text-red-600 ring-2 ring-red-300 shadow-sm'
                                  : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                              }`}
                              title="Mark Absent"
                            >
                              <UserX size={16} />
                            </button>
                            <button
                              onClick={() => handleAttendanceChange(item.student.id, item.exam.id, 'late')}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                status === 'late'
                                  ? 'bg-yellow-100 text-yellow-600 ring-2 ring-yellow-300 shadow-sm'
                                  : 'bg-gray-100 text-gray-400 hover:bg-yellow-50 hover:text-yellow-500'
                              }`}
                              title="Mark Late"
                            >
                              <Clock size={16} />
                            </button>
                            <button
                              onClick={() => handleAttendanceChange(item.student.id, item.exam.id, 'excused')}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                status === 'excused'
                                  ? 'bg-purple-100 text-purple-600 ring-2 ring-purple-300 shadow-sm'
                                  : 'bg-gray-100 text-gray-400 hover:bg-purple-50 hover:text-purple-500'
                              }`}
                              title="Mark Excused"
                            >
                              <AlertCircle size={16} />
                            </button>
                          </div>
                          
                          <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                            status === 'present' ? 'bg-green-100 text-green-700' :
                            status === 'absent' ? 'bg-red-100 text-red-700' :
                            status === 'late' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {status.toUpperCase()}
                          </div>
                          
                          {item.attendance?.checkInTime && (
                            <div className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                              {item.attendance.checkInTime}
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-4 py-4">
                        <textarea
                          placeholder="Add remarks..."
                          value={item.attendance?.remarks || ''}
                          onChange={(e) => handleRemarksChange(item.student.id, item.exam.id, e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={2}
                        />
                      </td>
                      
                      <td className="px-4 py-4 text-center relative">
                        <button
                          onClick={() => setSelectedStudent(selectedStudent === item.student.id ? '' : item.student.id)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50"
                          title="View Student Details"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {selectedStudent === item.student.id && (
                          <div className="absolute z-20 top-full left-0 mt-2 p-6 bg-white border rounded-xl shadow-2xl min-w-80 max-w-96">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-gray-900">Student Details</h4>
                              <button
                                onClick={() => setSelectedStudent('')}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                              >
                                ×
                              </button>
                            </div>
                            <div className="space-y-3 text-sm">
                              <div><strong>Full Name:</strong> {item.student.name}</div>
                              <div><strong>Roll Number:</strong> {item.student.rollNumber}</div>
                              <div><strong>Email:</strong> {item.student.email}</div>
                              <div><strong>Phone:</strong> {item.student.phoneNumber}</div>
                              <div><strong>Parent Contact:</strong> {item.student.parentContact}</div>
                              <div><strong>Parent Email:</strong> {item.student.parentEmail}</div>
                              <div><strong>Address:</strong> {item.student.address}</div>
                              <div><strong>Date of Birth:</strong> {new Date(item.student.dateOfBirth).toLocaleDateString('en-IN')}</div>
                              <div><strong>Gender:</strong> {item.student.gender}</div>
                              <div><strong>Blood Group:</strong> {item.student.bloodGroup}</div>
                              <div><strong>Admission Date:</strong> {new Date(item.student.admissionDate).toLocaleDateString('en-IN')}</div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{exams.length}</div>
              <div className="text-sm text-gray-600">Total Exams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{students.length}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{filterOptions.branches.length}</div>
              <div className="text-sm text-gray-600">Branches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.total > 0 ? Math.round(((stats.present + stats.late) / stats.total) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">Overall Attendance</div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-gray-600">
                <strong>System Info:</strong> Last updated {lastSyncTime.toLocaleString('en-IN')} | 
                Faculty: {facultyName} | 
                Academic Session: 2025-26
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamAttendanceSystemV5;