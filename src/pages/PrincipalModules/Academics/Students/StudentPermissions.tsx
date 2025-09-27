
import React, { useState, useEffect } from 'react';

interface LeaveRequest {
  id: string;
  studentName: string;
  studentId: string;
  rollNumber: string;
  department: string;
  program: string;
  year: string;
  semester: string;
  section: string;
  leaveType: 'sick' | 'personal' | 'emergency' | 'medical' | 'family' | 'academic';
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  documents?: string[];
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  parentContact: string;
  emergencyContact: string;
  hostelResident: boolean;
  previousLeaves: number;
  attendancePercentage: number;
}

interface FilterState {
  department: string;
  program: string;
  semester: string;
  section: string;
  year: string;
  status: string;
  leaveType: string;
  dateRange: string;
}

interface SummaryStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  emergencyRequests: number;
  avgProcessingTime: number;
  thisMonthRequests: number;
  criticalRequests: number;
}

const StudentPermissions: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [filters, setFilters] = useState<FilterState>({
    department: '',
    program: '',
    semester: '',
    section: '',
    year: '',
    status: '',
    leaveType: '',
    dateRange: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [sortField, setSortField] = useState<keyof LeaveRequest>('appliedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 15;

  // Sample data with Indian names - replace with API call
  const [leaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      studentName: 'Aarav Sharma',
      studentId: 'STU001',
      rollNumber: '2024001',
      department: 'Computer Science',
      program: 'B.Tech',
      year: '2nd',
      semester: '3rd',
      section: 'A',
      leaveType: 'sick',
      fromDate: '2025-09-30',
      toDate: '2025-10-02',
      totalDays: 3,
      reason: 'Fever and viral infection. Need rest as advised by doctor.',
      documents: ['medical_certificate.pdf'],
      appliedDate: '2025-09-27',
      status: 'pending',
      parentContact: '+91 9876543211',
      emergencyContact: '+91 9876543210',
      hostelResident: true,
      previousLeaves: 2,
      attendancePercentage: 92
    },
    {
      id: '2',
      studentName: 'Priya Patel',
      studentId: 'STU002',
      rollNumber: '2024002',
      department: 'Mathematics',
      program: 'B.Sc',
      year: '1st',
      semester: '2nd',
      section: 'B',
      leaveType: 'family',
      fromDate: '2025-10-05',
      toDate: '2025-10-07',
      totalDays: 3,
      reason: 'Sister\'s wedding ceremony. Family function attendance required.',
      appliedDate: '2025-09-25',
      status: 'approved',
      approvedBy: 'Dr. Rajesh Kumar',
      approvedDate: '2025-09-26',
      parentContact: '+91 9876543213',
      emergencyContact: '+91 9876543212',
      hostelResident: false,
      previousLeaves: 1,
      attendancePercentage: 88
    },
    {
      id: '3',
      studentName: 'Arjun Reddy',
      studentId: 'STU003',
      rollNumber: '2024003',
      department: 'Physics',
      program: 'B.Sc',
      year: '3rd',
      semester: '5th',
      section: 'A',
      leaveType: 'emergency',
      fromDate: '2025-09-28',
      toDate: '2025-09-29',
      totalDays: 2,
      reason: 'Grandfather hospitalized. Need to be with family urgently.',
      appliedDate: '2025-09-27',
      status: 'pending',
      parentContact: '+91 9876543215',
      emergencyContact: '+91 9876543214',
      hostelResident: true,
      previousLeaves: 0,
      attendancePercentage: 95
    },
    {
      id: '4',
      studentName: 'Kavya Singh',
      studentId: 'STU004',
      rollNumber: '2021001',
      department: 'Chemistry',
      program: 'B.Tech',
      year: '4th',
      semester: '8th',
      section: 'C',
      leaveType: 'academic',
      fromDate: '2025-10-10',
      toDate: '2025-10-12',
      totalDays: 3,
      reason: 'Attending technical conference and workshop in Bangalore.',
      documents: ['conference_invitation.pdf'],
      appliedDate: '2025-09-20',
      status: 'approved',
      approvedBy: 'Prof. Meera Nair',
      approvedDate: '2025-09-22',
      parentContact: '+91 9876543217',
      emergencyContact: '+91 9876543216',
      hostelResident: false,
      previousLeaves: 3,
      attendancePercentage: 91
    },
    {
      id: '5',
      studentName: 'Rohit Kumar',
      studentId: 'STU005',
      rollNumber: '2024005',
      department: 'Computer Science',
      program: 'B.Tech',
      year: '1st',
      semester: '1st',
      section: 'B',
      leaveType: 'personal',
      fromDate: '2025-10-01',
      toDate: '2025-10-03',
      totalDays: 3,
      reason: 'Need to visit home for personal work and documents.',
      appliedDate: '2025-09-26',
      status: 'rejected',
      rejectionReason: 'Insufficient attendance percentage. Current: 65%',
      parentContact: '+91 9876543219',
      emergencyContact: '+91 9876543218',
      hostelResident: true,
      previousLeaves: 4,
      attendancePercentage: 65
    },
    {
      id: '6',
      studentName: 'Ananya Gupta',
      studentId: 'STU006',
      rollNumber: '2023006',
      department: 'Mathematics',
      program: 'M.Sc',
      year: '2nd',
      semester: '3rd',
      section: 'A',
      leaveType: 'medical',
      fromDate: '2025-10-08',
      toDate: '2025-10-15',
      totalDays: 8,
      reason: 'Surgery scheduled. Post-operative recovery period required.',
      documents: ['doctor_recommendation.pdf', 'surgery_schedule.pdf'],
      appliedDate: '2025-09-24',
      status: 'approved',
      approvedBy: 'Dr. Rajesh Kumar',
      approvedDate: '2025-09-25',
      parentContact: '+91 9876543221',
      emergencyContact: '+91 9876543220',
      hostelResident: false,
      previousLeaves: 1,
      attendancePercentage: 94
    },
    {
      id: '7',
      studentName: 'Vikash Yadav',
      studentId: 'STU007',
      rollNumber: '2024007',
      department: 'Physics',
      program: 'B.Sc',
      year: '2nd',
      semester: '4th',
      section: 'B',
      leaveType: 'emergency',
      fromDate: '2025-09-29',
      toDate: '2025-09-30',
      totalDays: 2,
      reason: 'Mother hospitalized. Critical condition requires immediate presence.',
      appliedDate: '2025-09-28',
      status: 'pending',
      parentContact: '+91 9876543223',
      emergencyContact: '+91 9876543222',
      hostelResident: true,
      previousLeaves: 1,
      attendancePercentage: 86
    },
    {
      id: '8',
      studentName: 'Sneha Iyer',
      studentId: 'STU008',
      rollNumber: '2024008',
      department: 'Chemistry',
      program: 'B.Sc',
      year: '1st',
      semester: '2nd',
      section: 'A',
      leaveType: 'family',
      fromDate: '2025-10-12',
      toDate: '2025-10-14',
      totalDays: 3,
      reason: 'Cousin\'s engagement ceremony. Traditional family function.',
      appliedDate: '2025-09-23',
      status: 'pending',
      parentContact: '+91 9876543225',
      emergencyContact: '+91 9876543224',
      hostelResident: false,
      previousLeaves: 0,
      attendancePercentage: 89
    },
    {
      id: '9',
      studentName: 'Deepak Mishra',
      studentId: 'STU009',
      rollNumber: '2022009',
      department: 'Computer Science',
      program: 'M.Tech',
      year: '3rd',
      semester: '5th',
      section: 'A',
      leaveType: 'academic',
      fromDate: '2025-10-20',
      toDate: '2025-10-25',
      totalDays: 6,
      reason: 'Presenting research paper at international conference in IIT Delhi.',
      documents: ['conference_acceptance.pdf', 'paper_details.pdf'],
      appliedDate: '2025-09-18',
      status: 'approved',
      approvedBy: 'Dr. Rajesh Kumar',
      approvedDate: '2025-09-19',
      parentContact: '+91 9876543227',
      emergencyContact: '+91 9876543226',
      hostelResident: true,
      previousLeaves: 2,
      attendancePercentage: 97
    },
    {
      id: '10',
      studentName: 'Meera Nair',
      studentId: 'STU010',
      rollNumber: '2023010',
      department: 'Mathematics',
      program: 'B.Sc',
      year: '2nd',
      semester: '3rd',
      section: 'C',
      leaveType: 'personal',
      fromDate: '2025-10-15',
      toDate: '2025-10-17',
      totalDays: 3,
      reason: 'Personal commitment. Need to handle important family matters.',
      appliedDate: '2025-09-21',
      status: 'rejected',
      rejectionReason: 'Too many previous leaves this semester. Please prioritize attendance.',
      parentContact: '+91 9876543229',
      emergencyContact: '+91 9876543228',
      hostelResident: false,
      previousLeaves: 5,
      attendancePercentage: 72
    }
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      department: '',
      program: '',
      semester: '',
      section: '',
      year: '',
      status: '',
      leaveType: '',
      dateRange: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSort = (field: keyof LeaveRequest) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleViewDetails = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const handleStatusUpdate = (requestId: string, newStatus: 'approved' | 'rejected', reason?: string) => {
    console.log(`Updating request ${requestId} to ${newStatus}`, reason);
    showToast(`Leave request ${newStatus} successfully`);
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-5 right-5 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-0 transition-all duration-300 ease-in-out';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const filteredData = leaveRequests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (filters.department === '' || request.department === filters.department) &&
      (filters.program === '' || request.program === filters.program) &&
      (filters.semester === '' || request.semester === filters.semester) &&
      (filters.section === '' || request.section === filters.section) &&
      (filters.year === '' || request.year === filters.year) &&
      (filters.status === '' || request.status === filters.status) &&
      (filters.leaveType === '' || request.leaveType === filters.leaveType);

    return matchesSearch && matchesFilters;
  });

  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate summary statistics
  const summaryStats: SummaryStats = {
    totalRequests: filteredData.length,
    pendingRequests: filteredData.filter(r => r.status === 'pending').length,
    approvedRequests: filteredData.filter(r => r.status === 'approved').length,
    rejectedRequests: filteredData.filter(r => r.status === 'rejected').length,
    emergencyRequests: filteredData.filter(r => r.leaveType === 'emergency').length,
    avgProcessingTime: 2.5,
    thisMonthRequests: filteredData.filter(r => new Date(r.appliedDate).getMonth() === new Date().getMonth()).length,
    criticalRequests: filteredData.filter(r => r.leaveType === 'emergency' && r.status === 'pending').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'sick': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'emergency': return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
      case 'medical': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'family': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'personal': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100';
      case 'academic': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getPriorityIcon = (request: LeaveRequest) => {
    if (request.leaveType === 'emergency') return '🚨';
    if (request.attendancePercentage < 75) return '⚠️';
    if (request.totalDays > 7) return '📅';
    return '';
  };

  const SortIcon = ({ field }: { field: keyof LeaveRequest }) => {
    if (sortField !== field) {
      return <span className="text-gray-400">↕️</span>;
    }
    return sortDirection === 'asc' ? <span className="text-blue-600">↑</span> : <span className="text-blue-600">↓</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Student Leave Requests Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review, approve, and manage student leave applications and permissions
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Requests</p>
              <p className="text-2xl font-bold">{summaryStats.totalRequests}</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold">{summaryStats.pendingRequests}</p>
            </div>
            <div className="bg-yellow-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Approved</p>
              <p className="text-2xl font-bold">{summaryStats.approvedRequests}</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Rejected</p>
              <p className="text-2xl font-bold">{summaryStats.rejectedRequests}</p>
            </div>
            <div className="bg-red-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Emergency</p>
              <p className="text-2xl font-bold">{summaryStats.emergencyRequests}</p>
            </div>
            <div className="bg-orange-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Avg Time</p>
              <p className="text-2xl font-bold">{summaryStats.avgProcessingTime}d</p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">This Month</p>
              <p className="text-2xl font-bold">{summaryStats.thisMonthRequests}</p>
            </div>
            <div className="bg-indigo-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Critical</p>
              <p className="text-2xl font-bold">{summaryStats.criticalRequests}</p>
            </div>
            <div className="bg-pink-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm">
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search by student name, ID, roll number, or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 items-end">
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="English">English</option>
          </select>

          <select
            value={filters.program}
            onChange={(e) => handleFilterChange('program', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Programs</option>
            <option value="B.Tech">B.Tech</option>
            <option value="B.Sc">B.Sc</option>
            <option value="M.Tech">M.Tech</option>
            <option value="M.Sc">M.Sc</option>
            <option value="PhD">PhD</option>
          </select>

          <select
            value={filters.semester}
            onChange={(e) => handleFilterChange('semester', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Semesters</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
            <option value="3rd">3rd Semester</option>
            <option value="4th">4th Semester</option>
            <option value="5th">5th Semester</option>
            <option value="6th">6th Semester</option>
            <option value="7th">7th Semester</option>
            <option value="8th">8th Semester</option>
          </select>

          <select
            value={filters.section}
            onChange={(e) => handleFilterChange('section', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>

          <select
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Years</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filters.leaveType}
            onChange={(e) => handleFilterChange('leaveType', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Leave Types</option>
            <option value="sick">Sick Leave</option>
            <option value="personal">Personal Leave</option>
            <option value="emergency">Emergency Leave</option>
            <option value="medical">Medical Leave</option>
            <option value="family">Family Leave</option>
            <option value="academic">Academic Leave</option>
          </select>

          <button 
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleClearFilters}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Showing {paginatedData.length} of {filteredData.length} leave requests
        </span>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Sorted by: <span className="font-medium capitalize">{sortField.replace(/([A-Z])/g, ' $1').trim()}</span> 
          ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('studentName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Student</span>
                    <SortIcon field="studentName" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('leaveType')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Leave Type</span>
                    <SortIcon field="leaveType" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('fromDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Leave Period</span>
                    <SortIcon field="fromDate" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('totalDays')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Duration</span>
                    <SortIcon field="totalDays" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('attendancePercentage')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Attendance</span>
                    <SortIcon field="attendancePercentage" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('appliedDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Applied Date</span>
                    <SortIcon field="appliedDate" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <SortIcon field="status" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((request, index) => (
                <tr key={request.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-25 dark:bg-gray-825' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-lg">{getPriorityIcon(request)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {request.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {request.studentName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {request.studentId} • {request.rollNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeaveTypeColor(request.leaveType)}`}>
                      {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div>
                      <div className="font-medium">
                        {new Date(request.fromDate).toLocaleDateString('en-IN')}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        to {new Date(request.toDate).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-medium">{request.totalDays}</span> days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div>
                      <div className="font-medium">{request.department}</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {request.year} / {request.semester} / {request.section}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <span className={`mr-2 font-medium ${
                        request.attendancePercentage >= 85 ? 'text-green-600 dark:text-green-400' :
                        request.attendancePercentage >= 75 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {request.attendancePercentage}%
                      </span>
                      <div className="w-12 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            request.attendancePercentage >= 85 ? 'bg-green-500' :
                            request.attendancePercentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${request.attendancePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(request.appliedDate).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => handleViewDetails(request)}
                        title="View Details"
                      >
                        View
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
                            onClick={() => handleStatusUpdate(request.id, 'approved')}
                            title="Approve Request"
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                            onClick={() => handleStatusUpdate(request.id, 'rejected')}
                            title="Reject Request"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let page;
              if (totalPages <= 7) {
                page = i + 1;
              } else if (currentPage <= 4) {
                page = i + 1;
              } else if (currentPage >= totalPages - 3) {
                page = totalPages - 6 + i;
              } else {
                page = currentPage - 3 + i;
              }
              
              return (
                <button
                  key={page}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Leave Request Details - {selectedRequest.studentName}
              </h2>
              <button
                className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-2xl font-bold p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => setShowDetailModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                      Student Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedRequest.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Student ID:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedRequest.studentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Roll Number:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedRequest.rollNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Department:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedRequest.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Program:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedRequest.program}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Year/Sem/Sec:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedRequest.year} / {selectedRequest.semester} / {selectedRequest.section}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      Contact Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Parent Contact:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedRequest.parentContact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Emergency Contact:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedRequest.emergencyContact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Hostel Resident:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedRequest.hostelResident ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      Leave Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Leave Type:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeaveTypeColor(selectedRequest.leaveType)}`}>
                          {selectedRequest.leaveType.charAt(0).toUpperCase() + selectedRequest.leaveType.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">From Date:</span>
                        <span className="text-gray-900 dark:text-gray-100">{new Date(selectedRequest.fromDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">To Date:</span>
                        <span className="text-gray-900 dark:text-gray-100">{new Date(selectedRequest.toDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Total Days:</span>
                        <span className="text-gray-900 dark:text-gray-100 font-bold">{selectedRequest.totalDays} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Applied Date:</span>
                        <span className="text-gray-900 dark:text-gray-100">{new Date(selectedRequest.appliedDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                          {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      Academic Records
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Attendance:</span>
                        <div className="flex items-center">
                          <span className={`mr-2 font-bold ${
                            selectedRequest.attendancePercentage >= 85 ? 'text-green-600 dark:text-green-400' :
                            selectedRequest.attendancePercentage >= 75 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {selectedRequest.attendancePercentage}%
                          </span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                selectedRequest.attendancePercentage >= 85 ? 'bg-green-500' :
                                selectedRequest.attendancePercentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${selectedRequest.attendancePercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Previous Leaves:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedRequest.previousLeaves} times</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    Reason for Leave
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                    {selectedRequest.reason}
                  </p>
                </div>

                {selectedRequest.documents && selectedRequest.documents.length > 0 && (
                  <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                      </svg>
                      Supporting Documents
                    </h3>
                    <div className="space-y-2">
                      {selectedRequest.documents.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-gray-900 dark:text-gray-100">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRequest.status === 'approved' && selectedRequest.approvedBy && (
                  <div className="md:col-span-2 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                      Approval Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-green-700 dark:text-green-300">Approved by:</span> <span className="text-green-900 dark:text-green-100">{selectedRequest.approvedBy}</span></p>
                      <p><span className="font-medium text-green-700 dark:text-green-300">Approved on:</span> <span className="text-green-900 dark:text-green-100">{selectedRequest.approvedDate && new Date(selectedRequest.approvedDate).toLocaleDateString('en-IN')}</span></p>
                    </div>
                  </div>
                )}

                {selectedRequest.status === 'rejected' && selectedRequest.rejectionReason && (
                  <div className="md:col-span-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                      Rejection Details
                    </h3>
                    <p className="text-red-700 dark:text-red-300 text-sm">
                      <span className="font-medium">Reason:</span> {selectedRequest.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
              {selectedRequest.status === 'pending' && (
                <>
                  <button
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => {
                      handleStatusUpdate(selectedRequest.id, 'approved');
                      setShowDetailModal(false);
                    }}
                  >
                    Approve Request
                  </button>
                  <button
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => {
                      handleStatusUpdate(selectedRequest.id, 'rejected', 'Rejected by principal');
                      setShowDetailModal(false);
                    }}
                  >
                    Reject Request
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPermissions;
