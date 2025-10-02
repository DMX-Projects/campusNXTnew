
import React, { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, 
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
  MapPin,
  Calendar,
  FileText,
  Paperclip,
  Phone,
  Mail,
  Home,
  School
} from 'lucide-react';

interface TransferRequest {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  email: string;
  phone: string;
  currentDepartment: string;
  currentProgram: string;
  currentYear: string;
  currentSemester: string;
  currentSection: string;
  targetDepartment: string;
  targetProgram: string;
  targetYear: string;
  targetSemester: string;
  targetSection: string;
  transferType: 'internal_department' | 'internal_program' | 'external_college' | 'external_university' | 'course_change';
  reason: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_review' | 'completed';
  approvedBy?: string;
  approvedDate?: string;
  rejectedBy?: string;
  rejectedDate?: string;
  rejectionReason?: string;
  documents?: string[];
  currentCGPA: number;
  attendance: number;
  parentContact: string;
  parentName: string;
  currentAddress: string;
  newAddress?: string;
  transferFee: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  academicYear: string;
  eligibilityMet: boolean;
  remarks?: string;
}

interface FilterState {
  currentDepartment: string;
  targetDepartment: string;
  transferType: string;
  status: string;
  priority: string;
  academicYear: string;
}

interface SummaryStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  internalTransfers: number;
  externalTransfers: number;
  urgentRequests: number;
  completedTransfers: number;
}

const StudentTransfers: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [filters, setFilters] = useState<FilterState>({
    currentDepartment: '',
    targetDepartment: '',
    transferType: '',
    status: '',
    priority: '',
    academicYear: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTransfer, setSelectedTransfer] = useState<TransferRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [sortField, setSortField] = useState<keyof TransferRequest>('appliedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const itemsPerPage = 15;

  // Sample data with Indian names - replace with API call
  const [transferRequests] = useState<TransferRequest[]>([
    {
      id: '1',
      studentId: 'STU001',
      studentName: 'Aarav Sharma',
      rollNumber: '2024001',
      email: 'aarav.sharma@college.edu.in',
      phone: '+91 9876543210',
      currentDepartment: 'Computer Science',
      currentProgram: 'B.Tech',
      currentYear: '2nd',
      currentSemester: '3rd',
      currentSection: 'A',
      targetDepartment: 'Information Technology',
      targetProgram: 'B.Tech',
      targetYear: '2nd',
      targetSemester: '3rd',
      targetSection: 'B',
      transferType: 'internal_department',
      reason: 'Interest in specializing in network security and cloud computing',
      appliedDate: '2025-09-25',
      status: 'pending',
      currentCGPA: 8.5,
      attendance: 92,
      parentContact: '+91 9876543211',
      parentName: 'Rajesh Sharma',
      currentAddress: '123 MG Road, Mumbai, Maharashtra',
      transferFee: 5000,
      priority: 'medium',
      academicYear: '2024-25',
      eligibilityMet: true,
      documents: ['transfer_application.pdf', 'academic_transcript.pdf']
    },
    {
      id: '2',
      studentId: 'STU002',
      studentName: 'Priya Patel',
      rollNumber: '2023002',
      email: 'priya.patel@college.edu.in',
      phone: '+91 9876543212',
      currentDepartment: 'Mathematics',
      currentProgram: 'B.Sc',
      currentYear: '3rd',
      currentSemester: '5th',
      currentSection: 'A',
      targetDepartment: 'Statistics',
      targetProgram: 'B.Sc',
      targetYear: '3rd',
      targetSemester: '5th',
      targetSection: 'A',
      transferType: 'internal_program',
      reason: 'Career interest shifted towards data analytics and statistical modeling',
      appliedDate: '2025-09-22',
      status: 'approved',
      approvedBy: 'Dr. Vikash Singh (Principal)',
      approvedDate: '2025-09-26',
      currentCGPA: 7.8,
      attendance: 88,
      parentContact: '+91 9876543213',
      parentName: 'Kiran Patel',
      currentAddress: '456 Gandhi Nagar, Ahmedabad, Gujarat',
      transferFee: 3000,
      priority: 'low',
      academicYear: '2024-25',
      eligibilityMet: true,
      documents: ['transfer_application.pdf', 'parent_consent.pdf']
    },
    {
      id: '3',
      studentId: 'STU003',
      studentName: 'Arjun Reddy',
      rollNumber: '2024003',
      email: 'arjun.reddy@college.edu.in',
      phone: '+91 9876543214',
      currentDepartment: 'Physics',
      currentProgram: 'B.Sc',
      currentYear: '1st',
      currentSemester: '2nd',
      currentSection: 'B',
      targetDepartment: 'External',
      targetProgram: 'B.Tech Physics',
      targetYear: '1st',
      targetSemester: '2nd',
      targetSection: 'A',
      transferType: 'external_college',
      reason: 'Family relocation to Bangalore. Admission secured at RV College of Engineering',
      appliedDate: '2025-09-20',
      status: 'in_review',
      currentCGPA: 9.2,
      attendance: 95,
      parentContact: '+91 9876543215',
      parentName: 'Suresh Reddy',
      currentAddress: '789 Jubilee Hills, Hyderabad, Telangana',
      newAddress: '321 Koramangala, Bangalore, Karnataka',
      transferFee: 10000,
      priority: 'high',
      academicYear: '2024-25',
      eligibilityMet: true,
      documents: ['transfer_application.pdf', 'admission_letter.pdf', 'migration_certificate.pdf'],
      remarks: 'Excellent academic record. Transfer certificate processing initiated.'
    },
    {
      id: '4',
      studentId: 'STU004',
      studentName: 'Kavya Singh',
      rollNumber: '2022004',
      email: 'kavya.singh@college.edu.in',
      phone: '+91 9876543216',
      currentDepartment: 'Chemistry',
      currentProgram: 'B.Tech',
      currentYear: '4th',
      currentSemester: '7th',
      currentSection: 'C',
      targetDepartment: 'Chemical Engineering',
      targetProgram: 'B.Tech',
      targetYear: '4th',
      targetSemester: '7th',
      targetSection: 'A',
      transferType: 'course_change',
      reason: 'Want to focus on industrial applications rather than core chemistry',
      appliedDate: '2025-09-18',
      status: 'rejected',
      rejectedBy: 'Dr. Meera Nair (HOD Chemistry)',
      rejectedDate: '2025-09-24',
      rejectionReason: 'Transfer not feasible in final year. Significant curriculum differences.',
      currentCGPA: 8.7,
      attendance: 91,
      parentContact: '+91 9876543217',
      parentName: 'Vikram Singh',
      currentAddress: '321 Civil Lines, Delhi, NCR',
      transferFee: 7500,
      priority: 'medium',
      academicYear: '2024-25',
      eligibilityMet: false,
      documents: ['transfer_application.pdf']
    },
    {
      id: '5',
      studentId: 'STU005',
      studentName: 'Rohit Kumar',
      rollNumber: '2024005',
      email: 'rohit.kumar@college.edu.in',
      phone: '+91 9876543218',
      currentDepartment: 'Mechanical Engineering',
      currentProgram: 'B.Tech',
      currentYear: '1st',
      currentSemester: '1st',
      currentSection: 'B',
      targetDepartment: 'External',
      targetProgram: 'B.Tech CSE',
      targetYear: '1st',
      targetSemester: '1st',
      targetSection: 'A',
      transferType: 'external_university',
      reason: 'Financial constraints. Admission secured at government college with scholarship',
      appliedDate: '2025-09-27',
      status: 'urgent',
      currentCGPA: 6.5,
      attendance: 75,
      parentContact: '+91 9876543219',
      parentName: 'Manoj Kumar',
      currentAddress: '654 Fraser Road, Patna, Bihar',
      transferFee: 2000,
      priority: 'urgent',
      academicYear: '2024-25',
      eligibilityMet: true,
      documents: ['transfer_application.pdf', 'financial_certificate.pdf', 'scholarship_letter.pdf']
    },
    {
      id: '6',
      studentId: 'STU006',
      studentName: 'Ananya Gupta',
      rollNumber: '2023006',
      email: 'ananya.gupta@college.edu.in',
      phone: '+91 9876543220',
      currentDepartment: 'English Literature',
      currentProgram: 'M.A',
      currentYear: '2nd',
      currentSemester: '3rd',
      currentSection: 'A',
      targetDepartment: 'Journalism',
      targetProgram: 'M.A',
      targetYear: '2nd',
      targetSemester: '3rd',
      targetSection: 'A',
      transferType: 'internal_program',
      reason: 'Career goal changed to media and journalism field',
      appliedDate: '2025-09-15',
      status: 'completed',
      approvedBy: 'Dr. Rajesh Kumar (Dean)',
      approvedDate: '2025-09-20',
      currentCGPA: 8.9,
      attendance: 94,
      parentContact: '+91 9876543221',
      parentName: 'Amit Gupta',
      currentAddress: '987 Park Street, Kolkata, West Bengal',
      transferFee: 4000,
      priority: 'low',
      academicYear: '2024-25',
      eligibilityMet: true,
      documents: ['transfer_application.pdf', 'course_equivalence.pdf'],
      remarks: 'Transfer completed successfully. Student registered in new program.'
    },
    {
      id: '7',
      studentId: 'STU007',
      studentName: 'Vikash Yadav',
      rollNumber: '2024007',
      email: 'vikash.yadav@college.edu.in',
      phone: '+91 9876543222',
      currentDepartment: 'Civil Engineering',
      currentProgram: 'B.Tech',
      currentYear: '2nd',
      currentSemester: '4th',
      currentSection: 'B',
      targetDepartment: 'Architecture',
      targetProgram: 'B.Arch',
      targetYear: '2nd',
      targetSemester: '4th',
      targetSection: 'A',
      transferType: 'course_change',
      reason: 'Discovered passion for architectural design through civil engineering courses',
      appliedDate: '2025-09-12',
      status: 'approved',
      approvedBy: 'Prof. Deepika Nair (Academic Dean)',
      approvedDate: '2025-09-19',
      currentCGPA: 7.3,
      attendance: 86,
      parentContact: '+91 9876543223',
      parentName: 'Ramesh Yadav',
      currentAddress: '123 Hazratganj, Lucknow, Uttar Pradesh',
      transferFee: 8000,
      priority: 'medium',
      academicYear: '2024-25',
      eligibilityMet: true,
      documents: ['transfer_application.pdf', 'portfolio.pdf', 'aptitude_test_result.pdf']
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
      currentDepartment: '',
      targetDepartment: '',
      transferType: '',
      status: '',
      priority: '',
      academicYear: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSort = (field: keyof TransferRequest) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleViewDetails = (transfer: TransferRequest) => {
    setSelectedTransfer(transfer);
    setShowDetailModal(true);
  };

  const handleStatusUpdate = (transferId: string, newStatus: 'approved' | 'rejected' | 'in_review', reason?: string) => {
    console.log(`Updating transfer ${transferId} to ${newStatus}`, reason);
    showToast(`Transfer request ${newStatus} successfully`);
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

  const filteredData = transferRequests.filter(transfer => {
    const matchesSearch = searchTerm === '' || 
      transfer.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (filters.currentDepartment === '' || transfer.currentDepartment === filters.currentDepartment) &&
      (filters.targetDepartment === '' || transfer.targetDepartment === filters.targetDepartment) &&
      (filters.transferType === '' || transfer.transferType === filters.transferType) &&
      (filters.status === '' || transfer.status === filters.status) &&
      (filters.priority === '' || transfer.priority === filters.priority) &&
      (filters.academicYear === '' || transfer.academicYear === filters.academicYear);

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
    pendingRequests: filteredData.filter(t => t.status === 'pending').length,
    approvedRequests: filteredData.filter(t => t.status === 'approved').length,
    rejectedRequests: filteredData.filter(t => t.status === 'rejected').length,
    internalTransfers: filteredData.filter(t => t.transferType === 'internal_department' || t.transferType === 'internal_program' || t.transferType === 'course_change').length,
    externalTransfers: filteredData.filter(t => t.transferType === 'external_college' || t.transferType === 'external_university').length,
    urgentRequests: filteredData.filter(t => t.priority === 'urgent').length,
    completedTransfers: filteredData.filter(t => t.status === 'completed').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700';
      case 'approved': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700';
      case 'in_review': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700';
      case 'completed': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600';
    }
  };

  const getTransferTypeColor = (type: string) => {
    switch (type) {
      case 'internal_department': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700';
      case 'internal_program': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700';
      case 'external_college': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-100 dark:border-orange-700';
      case 'external_university': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700';
      case 'course_change': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700';
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

  const getTransferTypeIcon = (type: string) => {
    switch (type) {
      case 'internal_department': return <Building2 className="w-4 h-4" />;
      case 'internal_program': return <GraduationCap className="w-4 h-4" />;
      case 'external_college': return <School className="w-4 h-4" />;
      case 'external_university': return <MapPin className="w-4 h-4" />;
      case 'course_change': return <ArrowRightLeft className="w-4 h-4" />;
      default: return <ArrowRightLeft className="w-4 h-4" />;
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

  const SortIcon = ({ field }: { field: keyof TransferRequest }) => {
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
            <ArrowRightLeft className="w-8 h-8 mr-3 text-blue-500" />
            Student Transfer Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and process student transfer requests across departments, programs, and institutions
          </p>
        </div>
        <div className="flex items-center space-x-4">
         
        </div>
      </div>

     

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm">
        <div className="mb-5">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name, ID, roll number, or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
          <select
            value={filters.currentDepartment}
            onChange={(e) => handleFilterChange('currentDepartment', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">Current Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="English Literature">English Literature</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>

          <select
            value={filters.targetDepartment}
            onChange={(e) => handleFilterChange('targetDepartment', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">Target Department</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Statistics">Statistics</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Architecture">Architecture</option>
            <option value="Journalism">Journalism</option>
            <option value="External">External Institution</option>
          </select>

          <select
            value={filters.transferType}
            onChange={(e) => handleFilterChange('transferType', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Transfer Types</option>
            <option value="internal_department">Internal Department</option>
            <option value="internal_program">Internal Program</option>
            <option value="external_college">External College</option>
            <option value="external_university">External University</option>
            <option value="course_change">Course Change</option>
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
            <option value="in_review">In Review</option>
            <option value="completed">Completed</option>
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
          Showing {paginatedData.length} of {filteredData.length} transfer requests
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

     {/* Transfer Requests Table */}
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
            onClick={() => handleSort('transferType')}
          >
            <div className="flex items-center space-x-1">
              <span>Transfer Type</span>
              <SortIcon field="transferType" />
            </div>
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Current → Target
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Academic Performance
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
        {paginatedData.map((transfer, index) => (
          <tr key={transfer.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-25 dark:bg-gray-825' : ''}`}>
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">{getPriorityIcon(transfer.priority)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(transfer.priority)}`}>
                  {transfer.priority.toUpperCase()}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {transfer.studentName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {transfer.studentName}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {transfer.studentId} • {transfer.rollNumber}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center space-x-2">
                {getTransferTypeIcon(transfer.transferType)}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTransferTypeColor(transfer.transferType)}`}>
                  {transfer.transferType.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{transfer.currentDepartment}</span>
                  <span className="text-gray-400">({transfer.currentProgram})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRightLeft className="w-3 h-3 text-blue-500" />
                  <span className="font-medium text-blue-600 dark:text-blue-400">{transfer.targetDepartment}</span>
                  <span className="text-gray-400">({transfer.targetProgram})</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">CGPA:</span>
                  <span className={`font-bold ${
                    transfer.currentCGPA >= 8.5 ? 'text-green-600 dark:text-green-400' :
                    transfer.currentCGPA >= 7.0 ? 'text-blue-600 dark:text-blue-400' :
                    transfer.currentCGPA >= 6.0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transfer.currentCGPA}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Attendance:</span>
                  <span className="font-medium">{transfer.attendance}%</span>
                  <div className="w-12 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        transfer.attendance >= 85 ? 'bg-green-500' :
                        transfer.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${transfer.attendance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{new Date(transfer.appliedDate).toLocaleDateString('en-IN')}</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(transfer.status)}`}>
                {transfer.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                {transfer.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                {transfer.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                {transfer.status === 'in_review' && <Eye className="w-3 h-3 mr-1" />}
                {transfer.status === 'completed' && <UserCheck className="w-3 h-3 mr-1" />}
                {transfer.status.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                  onClick={() => handleViewDetails(transfer)}
                  title="View Details"
                >
                  <Eye className="w-3 h-3" />
                </button>
                {transfer.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
                      onClick={() => handleStatusUpdate(transfer.id, 'approved')}
                      title="Approve Transfer"
                    >
                      <CheckCircle className="w-3 h-3" />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                      onClick={() => handleStatusUpdate(transfer.id, 'rejected')}
                      title="Reject Transfer"
                    >
                      <XCircle className="w-3 h-3" />
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
      {showDetailModal && selectedTransfer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <ArrowRightLeft className="w-6 h-6 mr-3 text-blue-500" />
                Transfer Request Details - {selectedTransfer.studentName}
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
                      Student Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedTransfer.studentName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Student ID:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedTransfer.studentId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Roll Number:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedTransfer.rollNumber}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedTransfer.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedTransfer.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Academic Year:</span>
                          <span className="text-gray-900 dark:text-gray-100">{selectedTransfer.academicYear}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <ArrowRightLeft className="w-5 h-5 mr-2" />
                      Transfer Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                          <Building2 className="w-4 h-4 mr-2 text-red-500" />
                          Current Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Department:</span>
                            <span className="font-medium">{selectedTransfer.currentDepartment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Program:</span>
                            <span className="font-medium">{selectedTransfer.currentProgram}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Year:</span>
                            <span className="font-medium">{selectedTransfer.currentYear}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Semester:</span>
                            <span className="font-medium">{selectedTransfer.currentSemester}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Section:</span>
                            <span className="font-medium">{selectedTransfer.currentSection}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                          <Building2 className="w-4 h-4 mr-2 text-green-500" />
                          Target Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Department:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">{selectedTransfer.targetDepartment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Program:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">{selectedTransfer.targetProgram}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Year:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">{selectedTransfer.targetYear}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Semester:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">{selectedTransfer.targetSemester}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Section:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">{selectedTransfer.targetSection}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Transfer Type:</span>
                        <div className="flex items-center space-x-2">
                          {getTransferTypeIcon(selectedTransfer.transferType)}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTransferTypeColor(selectedTransfer.transferType)}`}>
                            {selectedTransfer.transferType.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Applied Date:</span>
                        <span className="text-gray-900 dark:text-gray-100">{new Date(selectedTransfer.appliedDate).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Reason for Transfer
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 italic">
                      "{selectedTransfer.reason}"
                    </p>
                  </div>

                  {selectedTransfer.documents && selectedTransfer.documents.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                        <Paperclip className="w-5 h-5 mr-2" />
                        Supporting Documents
                      </h3>
                      <div className="space-y-2">
                        {selectedTransfer.documents.map((doc, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm bg-white dark:bg-gray-800 p-2 rounded border">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-900 dark:text-gray-100 flex-1">{doc}</span>
                            <button className="text-blue-600 hover:text-blue-800 text-xs underline">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTransfer.newAddress && (
                    <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                        <Home className="w-5 h-5 mr-2" />
                        Address Information
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Current Address:</span>
                          <p className="text-gray-900 dark:text-gray-100 mt-1">{selectedTransfer.currentAddress}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">New Address:</span>
                          <p className="text-gray-900 dark:text-gray-100 mt-1">{selectedTransfer.newAddress}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Academic Performance
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">CGPA:</span>
                        <span className={`text-lg font-bold ${
                          selectedTransfer.currentCGPA >= 8.5 ? 'text-green-600 dark:text-green-400' :
                          selectedTransfer.currentCGPA >= 7.0 ? 'text-blue-600 dark:text-blue-400' :
                          selectedTransfer.currentCGPA >= 6.0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {selectedTransfer.currentCGPA}
                        </span>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Attendance:</span>
                          <span className="text-gray-900 dark:text-gray-100 font-medium">{selectedTransfer.attendance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              selectedTransfer.attendance >= 85 ? 'bg-green-500' :
                              selectedTransfer.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedTransfer.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Eligibility:</span>
                        <div className="flex items-center space-x-2">
                          {selectedTransfer.eligibilityMet ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-green-600 dark:text-green-400 font-medium">Met</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span className="text-red-600 dark:text-red-400 font-medium">Not Met</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Contact Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Parent Name:</span>
                        <p className="text-gray-900 dark:text-gray-100 mt-1">{selectedTransfer.parentName}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Parent Contact:</span>
                        <p className="text-gray-900 dark:text-gray-100 mt-1">{selectedTransfer.parentContact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Transfer Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Priority:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getPriorityIcon(selectedTransfer.priority)}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTransfer.priority)}`}>
                            {selectedTransfer.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Transfer Fee:</span>
                        <span className="text-green-600 dark:text-green-400 font-bold">₹{selectedTransfer.transferFee.toLocaleString()}</span>
                      </div>
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedTransfer.status)}`}>
                          {selectedTransfer.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {selectedTransfer.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {selectedTransfer.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                          {selectedTransfer.status === 'in_review' && <Eye className="w-3 h-3 mr-1" />}
                          {selectedTransfer.status === 'completed' && <UserCheck className="w-3 h-3 mr-1" />}
                          {selectedTransfer.status.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>
                      {selectedTransfer.status === 'approved' && selectedTransfer.approvedBy && (
                        <>
                          <div>
                            <span className="font-medium text-green-700 dark:text-green-300">Approved by:</span>
                            <p className="text-green-900 dark:text-green-100 mt-1">{selectedTransfer.approvedBy}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-700 dark:text-green-300">Approved on:</span>
                            <p className="text-green-900 dark:text-green-100 mt-1">{selectedTransfer.approvedDate && new Date(selectedTransfer.approvedDate).toLocaleDateString('en-IN')}</p>
                          </div>
                        </>
                      )}
                      {selectedTransfer.status === 'rejected' && selectedTransfer.rejectedBy && (
                        <>
                          <div>
                            <span className="font-medium text-red-700 dark:text-red-300">Rejected by:</span>
                            <p className="text-red-900 dark:text-red-100 mt-1">{selectedTransfer.rejectedBy}</p>
                          </div>
                          <div>
                            <span className="font-medium text-red-700 dark:text-red-300">Rejected on:</span>
                            <p className="text-red-900 dark:text-red-100 mt-1">{selectedTransfer.rejectedDate && new Date(selectedTransfer.rejectedDate).toLocaleDateString('en-IN')}</p>
                          </div>
                          {selectedTransfer.rejectionReason && (
                            <div>
                              <span className="font-medium text-red-700 dark:text-red-300">Reason:</span>
                              <p className="text-red-900 dark:text-red-100 mt-1 bg-red-50 dark:bg-red-900 p-2 rounded border">{selectedTransfer.rejectionReason}</p>
                            </div>
                          )}
                        </>
                      )}
                      {selectedTransfer.remarks && (
                        <div>
                          <span className="font-medium text-blue-700 dark:text-blue-300">Remarks:</span>
                          <p className="text-blue-900 dark:text-blue-100 mt-1 bg-blue-50 dark:bg-blue-900 p-2 rounded border">{selectedTransfer.remarks}</p>
                        </div>
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
              {selectedTransfer.status === 'pending' && (
                <>
                  <button
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center space-x-2"
                    onClick={() => {
                      handleStatusUpdate(selectedTransfer.id, 'approved');
                      setShowDetailModal(false);
                    }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve Transfer</span>
                  </button>
                  <button
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center space-x-2"
                    onClick={() => {
                      handleStatusUpdate(selectedTransfer.id, 'rejected', 'Rejected by principal');
                      setShowDetailModal(false);
                    }}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Transfer</span>
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

export default StudentTransfers;

