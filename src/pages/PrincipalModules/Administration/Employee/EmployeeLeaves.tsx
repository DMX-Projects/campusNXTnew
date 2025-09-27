import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  UserCheck,
  UserX,
  TrendingUp,
  Filter,
  Search,
  Eye,
  Download,
  RotateCcw,
  Sun,
  Moon,
  Building2,
  GraduationCap,
  Briefcase,
  Settings,
  PlusCircle,
  MinusCircle,
  FileText,
  Paperclip,
  Send
} from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  email: string;
  department: string;
  designation: string;
  employeeType: 'teaching_faculty' | 'non_teaching_faculty' | 'administrative_staff' | 'support_staff' | 'technical_staff';
  leaveType: 'sick' | 'casual' | 'earned' | 'maternity' | 'paternity' | 'emergency' | 'compensatory' | 'study' | 'sabbatical';
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approvedBy?: string;
  approvedDate?: string;
  rejectedBy?: string;
  rejectedDate?: string;
  rejectionReason?: string;
  documents?: string[];
  leaveBalance: {
    casual: number;
    sick: number;
    earned: number;
    total: number;
  };
  reportingManager: string;
  emergencyContact: string;
  coveringEmployee?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface FilterState {
  department: string;
  employeeType: string;
  leaveType: string;
  status: string;
  priority: string;
  dateRange: string;
}

interface SummaryStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  urgentRequests: number;
  avgProcessingTime: number;
  thisMonthRequests: number;
  activeLeaves: number;
}

const EmployeeLeaves: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [filters, setFilters] = useState<FilterState>({
    department: '',
    employeeType: '',
    leaveType: '',
    status: '',
    priority: '',
    dateRange: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [sortField, setSortField] = useState<keyof LeaveRequest>('appliedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const itemsPerPage = 15;

  // Sample data with Indian names - replace with API call
  const [leaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@college.edu.in',
      department: 'Computer Science',
      designation: 'Professor',
      employeeType: 'teaching_faculty',
      leaveType: 'casual',
      fromDate: '2025-10-05',
      toDate: '2025-10-07',
      totalDays: 3,
      reason: 'Family function - daughter\'s wedding preparations',
      appliedDate: '2025-09-27',
      status: 'pending',
      reportingManager: 'Dr. Priya Sharma (HOD)',
      emergencyContact: '+91 9876543210',
      coveringEmployee: 'Dr. Amit Gupta',
      priority: 'medium',
      leaveBalance: {
        casual: 8,
        sick: 12,
        earned: 15,
        total: 35
      }
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Prof. Meera Sharma',
      email: 'meera.sharma@college.edu.in',
      department: 'Mathematics',
      designation: 'Associate Professor',
      employeeType: 'teaching_faculty',
      leaveType: 'sick',
      fromDate: '2025-09-30',
      toDate: '2025-10-02',
      totalDays: 3,
      reason: 'Viral fever and doctor advised rest',
      appliedDate: '2025-09-28',
      status: 'approved',
      approvedBy: 'Dr. Vikash Singh (Principal)',
      approvedDate: '2025-09-29',
      reportingManager: 'Dr. Ananya Reddy (HOD)',
      emergencyContact: '+91 9876543211',
      priority: 'high',
      documents: ['medical_certificate.pdf'],
      leaveBalance: {
        casual: 10,
        sick: 9,
        earned: 18,
        total: 37
      }
    },
    {
      id: '3',
      employeeId: 'EMP004',
      employeeName: 'Priya Gupta',
      email: 'priya.gupta@college.edu.in',
      department: 'Library',
      designation: 'Librarian',
      employeeType: 'non_teaching_faculty',
      leaveType: 'earned',
      fromDate: '2025-10-15',
      toDate: '2025-10-20',
      totalDays: 6,
      reason: 'Personal vacation - family trip to Kerala',
      appliedDate: '2025-09-20',
      status: 'approved',
      approvedBy: 'Ms. Kavya Nair (Admin Head)',
      approvedDate: '2025-09-25',
      reportingManager: 'Ms. Kavya Nair',
      emergencyContact: '+91 9876543213',
      priority: 'low',
      leaveBalance: {
        casual: 12,
        sick: 12,
        earned: 9,
        total: 33
      }
    },
    {
      id: '4',
      employeeId: 'EMP005',
      employeeName: 'Vikash Singh',
      email: 'vikash.singh@college.edu.in',
      department: 'Administration',
      designation: 'Administrative Officer',
      employeeType: 'administrative_staff',
      leaveType: 'emergency',
      fromDate: '2025-09-29',
      toDate: '2025-09-30',
      totalDays: 2,
      reason: 'Father hospitalized - emergency situation',
      appliedDate: '2025-09-28',
      status: 'approved',
      approvedBy: 'Dr. Vikash Singh (Principal)',
      approvedDate: '2025-09-28',
      reportingManager: 'Dr. Deepika Nair',
      emergencyContact: '+91 9876543214',
      priority: 'urgent',
      leaveBalance: {
        casual: 11,
        sick: 12,
        earned: 16,
        total: 39
      }
    },
    {
      id: '5',
      employeeId: 'EMP006',
      employeeName: 'Sneha Patel',
      email: 'sneha.patel@college.edu.in',
      department: 'IT Support',
      designation: 'System Administrator',
      employeeType: 'technical_staff',
      leaveType: 'maternity',
      fromDate: '2025-11-01',
      toDate: '2026-04-30',
      totalDays: 180,
      reason: 'Maternity leave for childbirth and recovery',
      appliedDate: '2025-09-15',
      status: 'approved',
      approvedBy: 'Dr. Vikash Singh (Principal)',
      approvedDate: '2025-09-18',
      reportingManager: 'Mr. Anil Kumar',
      emergencyContact: '+91 9876543215',
      priority: 'high',
      documents: ['maternity_certificate.pdf', 'doctor_recommendation.pdf'],
      leaveBalance: {
        casual: 12,
        sick: 12,
        earned: 20,
        total: 44
      }
    },
    {
      id: '6',
      employeeId: 'EMP007',
      employeeName: 'Ramesh Yadav',
      email: 'ramesh.yadav@college.edu.in',
      department: 'Maintenance',
      designation: 'Maintenance Supervisor',
      employeeType: 'support_staff',
      leaveType: 'casual',
      fromDate: '2025-10-10',
      toDate: '2025-10-11',
      totalDays: 2,
      reason: 'Son\'s school annual day function',
      appliedDate: '2025-09-25',
      status: 'pending',
      reportingManager: 'Mr. Suresh Kumar',
      emergencyContact: '+91 9876543216',
      priority: 'low',
      leaveBalance: {
        casual: 10,
        sick: 12,
        earned: 14,
        total: 36
      }
    },
    {
      id: '7',
      employeeId: 'EMP008',
      employeeName: 'Kavya Iyer',
      email: 'kavya.iyer@college.edu.in',
      department: 'Chemistry',
      designation: 'Lab Assistant',
      employeeType: 'technical_staff',
      leaveType: 'study',
      fromDate: '2025-11-15',
      toDate: '2025-11-25',
      totalDays: 11,
      reason: 'Attending advanced lab techniques workshop in IIT Bombay',
      appliedDate: '2025-09-22',
      status: 'approved',
      approvedBy: 'Dr. Meera Nair (HOD Chemistry)',
      approvedDate: '2025-09-26',
      reportingManager: 'Dr. Meera Nair',
      emergencyContact: '+91 9876543217',
      priority: 'medium',
      documents: ['workshop_invitation.pdf'],
      leaveBalance: {
        casual: 12,
        sick: 12,
        earned: 18,
        total: 42
      }
    },
    {
      id: '8',
      employeeId: 'EMP009',
      employeeName: 'Anil Kumar',
      email: 'anil.kumar@college.edu.in',
      department: 'Security',
      designation: 'Security Officer',
      employeeType: 'support_staff',
      leaveType: 'compensatory',
      fromDate: '2025-10-08',
      toDate: '2025-10-09',
      totalDays: 2,
      reason: 'Compensatory off for working during college fest weekend',
      appliedDate: '2025-09-26',
      status: 'approved',
      approvedBy: 'Mr. Suresh Kumar (Security Head)',
      approvedDate: '2025-09-27',
      reportingManager: 'Mr. Suresh Kumar',
      emergencyContact: '+91 9876543218',
      priority: 'low',
      leaveBalance: {
        casual: 12,
        sick: 12,
        earned: 16,
        total: 40
      }
    },
    {
      id: '9',
      employeeId: 'EMP010',
      employeeName: 'Deepika Nair',
      email: 'deepika.nair@college.edu.in',
      department: 'Finance',
      designation: 'Accounts Officer',
      employeeType: 'administrative_staff',
      leaveType: 'sick',
      fromDate: '2025-10-03',
      toDate: '2025-10-05',
      totalDays: 3,
      reason: 'Medical checkup and minor surgery',
      appliedDate: '2025-09-24',
      status: 'rejected',
      rejectedBy: 'Dr. Vikash Singh (Principal)',
      rejectedDate: '2025-09-25',
      rejectionReason: 'Critical financial audit period. Request to reschedule after October 15th.',
      reportingManager: 'Ms. Priya Gupta',
      emergencyContact: '+91 9876543219',
      priority: 'medium',
      documents: ['medical_appointment.pdf'],
      leaveBalance: {
        casual: 11,
        sick: 12,
        earned: 17,
        total: 40
      }
    },
    {
      id: '10',
      employeeId: 'EMP003',
      employeeName: 'Dr. Arjun Reddy',
      email: 'arjun.reddy@college.edu.in',
      department: 'Physics',
      designation: 'Assistant Professor',
      employeeType: 'teaching_faculty',
      leaveType: 'sabbatical',
      fromDate: '2026-01-01',
      toDate: '2026-12-31',
      totalDays: 365,
      reason: 'PhD research work at CERN, Switzerland - sabbatical leave',
      appliedDate: '2025-09-10',
      status: 'pending',
      reportingManager: 'Dr. Sunil Sharma (HOD Physics)',
      emergencyContact: '+91 9876543212',
      priority: 'high',
      documents: ['cern_acceptance_letter.pdf', 'research_proposal.pdf'],
      leaveBalance: {
        casual: 12,
        sick: 12,
        earned: 25,
        total: 49
      }
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
      employeeType: '',
      leaveType: '',
      status: '',
      priority: '',
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
    toast.className = 'fixed top-5 right-5 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-0 transition-all duration-300 ease-in-out';
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
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (filters.department === '' || request.department === filters.department) &&
      (filters.employeeType === '' || request.employeeType === filters.employeeType) &&
      (filters.leaveType === '' || request.leaveType === filters.leaveType) &&
      (filters.status === '' || request.status === filters.status) &&
      (filters.priority === '' || request.priority === filters.priority);

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
    urgentRequests: filteredData.filter(r => r.priority === 'urgent').length,
    avgProcessingTime: 2.3,
    thisMonthRequests: filteredData.filter(r => new Date(r.appliedDate).getMonth() === new Date().getMonth()).length,
    activeLeaves: filteredData.filter(r => r.status === 'approved' && new Date(r.fromDate) <= new Date() && new Date(r.toDate) >= new Date()).length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700';
      case 'approved': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700';
      case 'cancelled': return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'sick': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700';
      case 'casual': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700';
      case 'earned': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700';
      case 'emergency': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-100 dark:border-orange-700';
      case 'maternity': return 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900 dark:text-pink-100 dark:border-pink-700';
      case 'paternity': return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:border-indigo-700';
      case 'study': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700';
      case 'sabbatical': return 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900 dark:text-teal-100 dark:border-teal-700';
      case 'compensatory': return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-100 dark:border-cyan-700';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getEmployeeTypeIcon = (type: string) => {
    switch (type) {
      case 'teaching_faculty': return <GraduationCap className="w-4 h-4" />;
      case 'non_teaching_faculty': return <Building2 className="w-4 h-4" />;
      case 'administrative_staff': return <Briefcase className="w-4 h-4" />;
      case 'technical_staff': return <Settings className="w-4 h-4" />;
      case 'support_staff': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '📋';
      case 'low': return '📝';
      default: return '';
    }
  };

  const SortIcon = ({ field }: { field: keyof LeaveRequest }) => {
    if (sortField !== field) {
      return <span className="text-gray-400">⇅</span>;
    }
    return sortDirection === 'asc' ? <span className="text-blue-500">↑</span> : <span className="text-blue-500">↓</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-blue-500" />
            Employee Leave Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and approve leave requests for all faculty and staff members
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-sm focus:outline-none"
            />
          </div>
          {/* <button
            className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-xl hover:bg-blue-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button> */}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Requests</p>
              <p className="text-2xl font-bold">{summaryStats.totalRequests}</p>
            </div>
            <div className="bg-blue-300 bg-opacity-30 rounded-lg p-2">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold">{summaryStats.pendingRequests}</p>
            </div>
            <div className="bg-yellow-300 bg-opacity-30 rounded-lg p-2">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Approved</p>
              <p className="text-2xl font-bold">{summaryStats.approvedRequests}</p>
            </div>
            <div className="bg-green-300 bg-opacity-30 rounded-lg p-2">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Rejected</p>
              <p className="text-2xl font-bold">{summaryStats.rejectedRequests}</p>
            </div>
            <div className="bg-red-300 bg-opacity-30 rounded-lg p-2">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Urgent</p>
              <p className="text-2xl font-bold">{summaryStats.urgentRequests}</p>
            </div>
            <div className="bg-orange-300 bg-opacity-30 rounded-lg p-2">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Avg Time</p>
              <p className="text-2xl font-bold">{summaryStats.avgProcessingTime}d</p>
            </div>
            <div className="bg-purple-300 bg-opacity-30 rounded-lg p-2">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">This Month</p>
              <p className="text-2xl font-bold">{summaryStats.thisMonthRequests}</p>
            </div>
            <div className="bg-indigo-300 bg-opacity-30 rounded-lg p-2">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm font-medium">Active Leaves</p>
              <p className="text-2xl font-bold">{summaryStats.activeLeaves}</p>
            </div>
            <div className="bg-teal-300 bg-opacity-30 rounded-lg p-2">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm">
        <div className="mb-5">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name, ID, email, or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
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
            <option value="Library">Library</option>
            <option value="Administration">Administration</option>
            <option value="IT Support">IT Support</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Security">Security</option>
            <option value="Finance">Finance</option>
          </select>

          <select
            value={filters.employeeType}
            onChange={(e) => handleFilterChange('employeeType', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Employee Types</option>
            <option value="teaching_faculty">Teaching Faculty</option>
            <option value="non_teaching_faculty">Non-Teaching Faculty</option>
            <option value="administrative_staff">Administrative Staff</option>
            <option value="technical_staff">Technical Staff</option>
            <option value="support_staff">Support Staff</option>
          </select>

          <select
            value={filters.leaveType}
            onChange={(e) => handleFilterChange('leaveType', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Leave Types</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="earned">Earned Leave</option>
            <option value="maternity">Maternity Leave</option>
            <option value="paternity">Paternity Leave</option>
            <option value="emergency">Emergency Leave</option>
            <option value="compensatory">Compensatory Leave</option>
            <option value="study">Study Leave</option>
            <option value="sabbatical">Sabbatical Leave</option>
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
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button 
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center space-x-2"
            onClick={handleClearFilters}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Showing {paginatedData.length} of {filteredData.length} leave requests
        </span>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Sorted by: <span className="font-medium capitalize">{sortField.replace(/([A-Z])/g, ' $1').trim()}</span> 
            ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
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
                  onClick={() => handleSort('employeeName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Employee</span>
                    <SortIcon field="employeeName" />
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Leave Balance
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
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg">{getPriorityIcon(request.priority)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {request.employeeName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {request.employeeName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                          {getEmployeeTypeIcon(request.employeeType)}
                          <span>{request.employeeId} • {request.designation}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLeaveTypeColor(request.leaveType)}`}>
                      {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div>
                      <div className="font-medium flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(request.fromDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        to {new Date(request.toDate).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-bold text-blue-600 dark:text-blue-400">{request.totalDays}</span> days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div>
                      <div className="font-medium">{request.department}</div>
                      <div className="text-gray-500 dark:text-gray-400 capitalize">
                        {request.employeeType.replace(/_/g, ' ')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Casual:</span>
                        <span className="text-xs font-medium">{request.leaveBalance.casual}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Sick:</span>
                        <span className="text-xs font-medium">{request.leaveBalance.sick}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Earned:</span>
                        <span className="text-xs font-medium">{request.leaveBalance.earned}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(request.appliedDate).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {request.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {request.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {request.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-1"
                        onClick={() => handleViewDetails(request)}
                        title="View Details"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center space-x-1"
                            onClick={() => handleStatusUpdate(request.id, 'approved')}
                            title="Approve Request"
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>Approve</span>
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center space-x-1"
                            onClick={() => handleStatusUpdate(request.id, 'rejected')}
                            title="Reject Request"
                          >
                            <XCircle className="w-3 h-3" />
                            <span>Reject</span>
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
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-blue-500" />
                Leave Request Details - {selectedRequest.employeeName}
              </h2>
              <button
                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-2xl font-bold p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => setShowDetailModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Employee Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedRequest.employeeName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Employee ID:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedRequest.employeeId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedRequest.email}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Department:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedRequest.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Designation:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedRequest.designation}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Type:</span>
                          <div className="flex items-center space-x-2">
                            {getEmployeeTypeIcon(selectedRequest.employeeType)}
                            <span className="text-gray-900 dark:text-gray-100 capitalize">
                              {selectedRequest.employeeType.replace(/_/g, ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Leave Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Leave Type:</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLeaveTypeColor(selectedRequest.leaveType)}`}>
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
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Total Days:</span>
                          <span className="text-gray-900 dark:text-gray-100 font-bold text-blue-600 dark:text-blue-400">{selectedRequest.totalDays} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Applied Date:</span>
                          <span className="text-gray-900 dark:text-gray-100">{new Date(selectedRequest.appliedDate).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Priority:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getPriorityIcon(selectedRequest.priority)}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                              {selectedRequest.priority.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Reason for Leave
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 italic">
                      "{selectedRequest.reason}"
                    </p>
                  </div>

                  {selectedRequest.documents && selectedRequest.documents.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                        <Paperclip className="w-5 h-5 mr-2" />
                        Supporting Documents
                      </h3>
                      <div className="space-y-2">
                        {selectedRequest.documents.map((doc, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm bg-white dark:bg-gray-800 p-2 rounded border">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-900 dark:text-gray-100">{doc}</span>
                            <button className="text-blue-600 hover:text-blue-800 text-xs underline ml-auto">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Leave Balance
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Casual Leave:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">{selectedRequest.leaveBalance.casual}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Sick Leave:</span>
                        <span className="text-red-600 dark:text-red-400 font-bold">{selectedRequest.leaveBalance.sick}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Earned Leave:</span>
                        <span className="text-green-600 dark:text-green-400 font-bold">{selectedRequest.leaveBalance.earned}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-100 dark:bg-blue-900 rounded border-2 border-blue-200 dark:border-blue-700">
                        <span className="font-bold text-blue-700 dark:text-blue-300">Total Balance:</span>
                        <span className="text-blue-800 dark:text-blue-200 font-bold text-lg">{selectedRequest.leaveBalance.total}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Contact Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Reporting Manager:</span>
                        <p className="text-gray-900 dark:text-gray-100 mt-1">{selectedRequest.reportingManager}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Emergency Contact:</span>
                        <p className="text-gray-900 dark:text-gray-100 mt-1">{selectedRequest.emergencyContact}</p>
                      </div>
                      {selectedRequest.coveringEmployee && (
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Covering Employee:</span>
                          <p className="text-gray-900 dark:text-gray-100 mt-1">{selectedRequest.coveringEmployee}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Status Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Current Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedRequest.status)}`}>
                          {selectedRequest.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {selectedRequest.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {selectedRequest.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                          {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                        </span>
                      </div>
                      {selectedRequest.status === 'approved' && selectedRequest.approvedBy && (
                        <>
                          <div>
                            <span className="font-medium text-green-700 dark:text-green-300">Approved by:</span>
                            <p className="text-green-900 dark:text-green-100 mt-1">{selectedRequest.approvedBy}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-700 dark:text-green-300">Approved on:</span>
                            <p className="text-green-900 dark:text-green-100 mt-1">{selectedRequest.approvedDate && new Date(selectedRequest.approvedDate).toLocaleDateString('en-IN')}</p>
                          </div>
                        </>
                      )}
                      {selectedRequest.status === 'rejected' && selectedRequest.rejectedBy && (
                        <>
                          <div>
                            <span className="font-medium text-red-700 dark:text-red-300">Rejected by:</span>
                            <p className="text-red-900 dark:text-red-100 mt-1">{selectedRequest.rejectedBy}</p>
                          </div>
                          <div>
                            <span className="font-medium text-red-700 dark:text-red-300">Rejected on:</span>
                            <p className="text-red-900 dark:text-red-100 mt-1">{selectedRequest.rejectedDate && new Date(selectedRequest.rejectedDate).toLocaleDateString('en-IN')}</p>
                          </div>
                          {selectedRequest.rejectionReason && (
                            <div>
                              <span className="font-medium text-red-700 dark:text-red-300">Reason:</span>
                              <p className="text-red-900 dark:text-red-100 mt-1 bg-red-50 dark:bg-red-900 p-2 rounded border">{selectedRequest.rejectionReason}</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
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
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center space-x-2"
                    onClick={() => {
                      handleStatusUpdate(selectedRequest.id, 'approved');
                      setShowDetailModal(false);
                    }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve Request</span>
                  </button>
                  <button
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center space-x-2"
                    onClick={() => {
                      handleStatusUpdate(selectedRequest.id, 'rejected', 'Rejected by admin');
                      setShowDetailModal(false);
                    }}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Request</span>
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

export default EmployeeLeaves;
