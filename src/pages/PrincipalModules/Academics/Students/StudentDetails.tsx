
import React, { useState, useEffect } from 'react';

interface StudentData {
  id: string;
  studentName: string;
  studentId: string;
  rollNumber: string;
  email: string;
  phone: string;
  department: string;
  program: string;
  year: string;
  semester: string;
  section: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  admissionDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'dropped';
  cgpa: number;
  attendance: number;
  feesStatus: 'paid' | 'pending' | 'overdue';
  profileImage?: string;
}

interface FilterState {
  department: string;
  program: string;
  semester: string;
  section: string;
  year: string;
  status: string;
  feesStatus: string;
}

interface SummaryStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  graduatedStudents: number;
  droppedStudents: number;
  avgCGPA: number;
  avgAttendance: number;
  feesPendingCount: number;
}

const StudentDetails: React.FC = () => {
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
    feesStatus: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [sortField, setSortField] = useState<keyof StudentData>('studentName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 15;

  // Sample data with Indian names - replace with API call
  const [studentsData] = useState<StudentData[]>([
    {
      id: '1',
      studentName: 'Aarav Sharma',
      studentId: 'STU001',
      rollNumber: '2024001',
      email: 'aarav.sharma@college.edu.in',
      phone: '+91 9876543210',
      department: 'Computer Science',
      program: 'B.Tech',
      year: '2nd',
      semester: '3rd',
      section: 'A',
      dateOfBirth: '2003-05-15',
      address: '123 MG Road, Mumbai, Maharashtra',
      parentName: 'Rajesh Sharma',
      parentPhone: '+91 9876543211',
      admissionDate: '2023-08-15',
      status: 'active',
      cgpa: 8.5,
      attendance: 92,
      feesStatus: 'paid'
    },
    {
      id: '2',
      studentName: 'Priya Patel',
      studentId: 'STU002',
      rollNumber: '2024002',
      email: 'priya.patel@college.edu.in',
      phone: '+91 9876543212',
      department: 'Mathematics',
      program: 'B.Sc',
      year: '1st',
      semester: '2nd',
      section: 'B',
      dateOfBirth: '2004-08-22',
      address: '456 Gandhi Nagar, Ahmedabad, Gujarat',
      parentName: 'Kiran Patel',
      parentPhone: '+91 9876543213',
      admissionDate: '2024-08-15',
      status: 'active',
      cgpa: 7.8,
      attendance: 88,
      feesStatus: 'pending'
    },
    {
      id: '3',
      studentName: 'Arjun Reddy',
      studentId: 'STU003',
      rollNumber: '2024003',
      email: 'arjun.reddy@college.edu.in',
      phone: '+91 9876543214',
      department: 'Physics',
      program: 'B.Sc',
      year: '3rd',
      semester: '5th',
      section: 'A',
      dateOfBirth: '2002-12-10',
      address: '789 Jubilee Hills, Hyderabad, Telangana',
      parentName: 'Suresh Reddy',
      parentPhone: '+91 9876543215',
      admissionDate: '2022-08-15',
      status: 'active',
      cgpa: 9.2,
      attendance: 95,
      feesStatus: 'paid'
    },
    {
      id: '4',
      studentName: 'Kavya Singh',
      studentId: 'STU004',
      rollNumber: '2021001',
      email: 'kavya.singh@college.edu.in',
      phone: '+91 9876543216',
      department: 'Chemistry',
      program: 'B.Tech',
      year: '4th',
      semester: '8th',
      section: 'C',
      dateOfBirth: '2001-03-18',
      address: '321 Civil Lines, Delhi, NCR',
      parentName: 'Vikram Singh',
      parentPhone: '+91 9876543217',
      admissionDate: '2021-08-15',
      status: 'graduated',
      cgpa: 8.7,
      attendance: 91,
      feesStatus: 'paid'
    },
    {
      id: '5',
      studentName: 'Rohit Kumar',
      studentId: 'STU005',
      rollNumber: '2024005',
      email: 'rohit.kumar@college.edu.in',
      phone: '+91 9876543218',
      department: 'Computer Science',
      program: 'B.Tech',
      year: '1st',
      semester: '1st',
      section: 'B',
      dateOfBirth: '2004-11-25',
      address: '654 Fraser Road, Patna, Bihar',
      parentName: 'Manoj Kumar',
      parentPhone: '+91 9876543219',
      admissionDate: '2024-08-15',
      status: 'inactive',
      cgpa: 6.5,
      attendance: 75,
      feesStatus: 'overdue'
    },
    {
      id: '6',
      studentName: 'Ananya Gupta',
      studentId: 'STU006',
      rollNumber: '2023006',
      email: 'ananya.gupta@college.edu.in',
      phone: '+91 9876543220',
      department: 'Mathematics',
      program: 'M.Sc',
      year: '2nd',
      semester: '3rd',
      section: 'A',
      dateOfBirth: '2000-07-08',
      address: '987 Park Street, Kolkata, West Bengal',
      parentName: 'Amit Gupta',
      parentPhone: '+91 9876543221',
      admissionDate: '2023-08-15',
      status: 'active',
      cgpa: 8.9,
      attendance: 94,
      feesStatus: 'paid'
    },
    {
      id: '7',
      studentName: 'Vikash Yadav',
      studentId: 'STU007',
      rollNumber: '2024007',
      email: 'vikash.yadav@college.edu.in',
      phone: '+91 9876543222',
      department: 'Physics',
      program: 'B.Sc',
      year: '2nd',
      semester: '4th',
      section: 'B',
      dateOfBirth: '2003-01-14',
      address: '123 Hazratganj, Lucknow, Uttar Pradesh',
      parentName: 'Ramesh Yadav',
      parentPhone: '+91 9876543223',
      admissionDate: '2023-08-15',
      status: 'active',
      cgpa: 7.3,
      attendance: 86,
      feesStatus: 'paid'
    },
    {
      id: '8',
      studentName: 'Sneha Iyer',
      studentId: 'STU008',
      rollNumber: '2024008',
      email: 'sneha.iyer@college.edu.in',
      phone: '+91 9876543224',
      department: 'Chemistry',
      program: 'B.Sc',
      year: '1st',
      semester: '2nd',
      section: 'A',
      dateOfBirth: '2004-09-03',
      address: '456 Brigade Road, Bangalore, Karnataka',
      parentName: 'Krishnan Iyer',
      parentPhone: '+91 9876543225',
      admissionDate: '2024-08-15',
      status: 'active',
      cgpa: 8.1,
      attendance: 89,
      feesStatus: 'pending'
    },
    {
      id: '9',
      studentName: 'Deepak Mishra',
      studentId: 'STU009',
      rollNumber: '2022009',
      email: 'deepak.mishra@college.edu.in',
      phone: '+91 9876543226',
      department: 'Computer Science',
      program: 'M.Tech',
      year: '3rd',
      semester: '5th',
      section: 'A',
      dateOfBirth: '1999-06-20',
      address: '789 Ashok Nagar, Bhopal, Madhya Pradesh',
      parentName: 'Shyam Mishra',
      parentPhone: '+91 9876543227',
      admissionDate: '2022-08-15',
      status: 'active',
      cgpa: 9.1,
      attendance: 97,
      feesStatus: 'paid'
    },
    {
      id: '10',
      studentName: 'Meera Nair',
      studentId: 'STU010',
      rollNumber: '2023010',
      email: 'meera.nair@college.edu.in',
      phone: '+91 9876543228',
      department: 'Mathematics',
      program: 'B.Sc',
      year: '2nd',
      semester: '3rd',
      section: 'C',
      dateOfBirth: '2002-04-12',
      address: '321 Marine Drive, Kochi, Kerala',
      parentName: 'Sunil Nair',
      parentPhone: '+91 9876543229',
      admissionDate: '2023-08-15',
      status: 'dropped',
      cgpa: 5.8,
      attendance: 68,
      feesStatus: 'overdue'
    },
    {
      id: '11',
      studentName: 'Aditya Joshi',
      studentId: 'STU011',
      rollNumber: '2024011',
      email: 'aditya.joshi@college.edu.in',
      phone: '+91 9876543230',
      department: 'Physics',
      program: 'B.Tech',
      year: '1st',
      semester: '1st',
      section: 'A',
      dateOfBirth: '2004-10-28',
      address: '654 FC Road, Pune, Maharashtra',
      parentName: 'Prakash Joshi',
      parentPhone: '+91 9876543231',
      admissionDate: '2024-08-15',
      status: 'active',
      cgpa: 7.9,
      attendance: 90,
      feesStatus: 'paid'
    },
    {
      id: '12',
      studentName: 'Riya Verma',
      studentId: 'STU012',
      rollNumber: '2024012',
      email: 'riya.verma@college.edu.in',
      phone: '+91 9876543232',
      department: 'Chemistry',
      program: 'B.Sc',
      year: '1st',
      semester: '2nd',
      section: 'B',
      dateOfBirth: '2004-02-16',
      address: '987 Connaught Place, New Delhi, NCR',
      parentName: 'Ajay Verma',
      parentPhone: '+91 9876543233',
      admissionDate: '2024-08-15',
      status: 'active',
      cgpa: 8.4,
      attendance: 91,
      feesStatus: 'paid'
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
      feesStatus: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSort = (field: keyof StudentData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleViewDetails = (student: StudentData) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const handleStatusUpdate = (studentId: string, newStatus: 'active' | 'inactive' | 'graduated' | 'dropped') => {
    console.log(`Updating student ${studentId} to ${newStatus}`);
    showToast(`Student status updated to ${newStatus}`);
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

  const filteredData = studentsData.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (filters.department === '' || student.department === filters.department) &&
      (filters.program === '' || student.program === filters.program) &&
      (filters.semester === '' || student.semester === filters.semester) &&
      (filters.section === '' || student.section === filters.section) &&
      (filters.year === '' || student.year === filters.year) &&
      (filters.status === '' || student.status === filters.status) &&
      (filters.feesStatus === '' || student.feesStatus === filters.feesStatus);

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
    totalStudents: filteredData.length,
    activeStudents: filteredData.filter(s => s.status === 'active').length,
    inactiveStudents: filteredData.filter(s => s.status === 'inactive').length,
    graduatedStudents: filteredData.filter(s => s.status === 'graduated').length,
    droppedStudents: filteredData.filter(s => s.status === 'dropped').length,
    avgCGPA: filteredData.length > 0 ? Number((filteredData.reduce((sum, s) => sum + s.cgpa, 0) / filteredData.length).toFixed(2)) : 0,
    avgAttendance: filteredData.length > 0 ? Number((filteredData.reduce((sum, s) => sum + s.attendance, 0) / filteredData.length).toFixed(1)) : 0,
    feesPendingCount: filteredData.filter(s => s.feesStatus === 'pending' || s.feesStatus === 'overdue').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'inactive': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'graduated': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'dropped': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getFeesStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 8.5) return 'text-green-600 dark:text-green-400 font-bold';
    if (cgpa >= 7.0) return 'text-blue-600 dark:text-blue-400 font-semibold';
    if (cgpa >= 6.0) return 'text-yellow-600 dark:text-yellow-400 font-medium';
    return 'text-red-600 dark:text-red-400 font-medium';
  };

  const SortIcon = ({ field }: { field: keyof StudentData }) => {
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
            Student Details Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive overview and management of all student information
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold">{summaryStats.totalStudents}</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active</p>
              <p className="text-2xl font-bold">{summaryStats.activeStudents}</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Avg CGPA</p>
              <p className="text-2xl font-bold">{summaryStats.avgCGPA}</p>
            </div>
            <div className="bg-yellow-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Avg Attendance</p>
              <p className="text-2xl font-bold">{summaryStats.avgAttendance}%</p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Fees Pending</p>
              <p className="text-2xl font-bold">{summaryStats.feesPendingCount}</p>
            </div>
            <div className="bg-red-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Graduated</p>
              <p className="text-2xl font-bold">{summaryStats.graduatedStudents}</p>
            </div>
            <div className="bg-indigo-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Inactive</p>
              <p className="text-2xl font-bold">{summaryStats.inactiveStudents}</p>
            </div>
            <div className="bg-orange-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm font-medium">Dropped</p>
              <p className="text-2xl font-bold">{summaryStats.droppedStudents}</p>
            </div>
            <div className="bg-teal-400 bg-opacity-30 rounded-lg p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
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
            placeholder="Search by name, student ID, roll number, or email..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
            <option value="dropped">Dropped</option>
          </select>

          <select
            value={filters.feesStatus}
            onChange={(e) => handleFilterChange('feesStatus', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Fee Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
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
          Showing {paginatedData.length} of {filteredData.length} students
        </span>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Sorted by: <span className="font-medium capitalize">{sortField.replace(/([A-Z])/g, ' $1').trim()}</span> 
          ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('studentName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Student Name</span>
                    <SortIcon field="studentName" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('studentId')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Student ID</span>
                    <SortIcon field="studentId" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('rollNumber')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Roll Number</span>
                    <SortIcon field="rollNumber" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('department')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Department</span>
                    <SortIcon field="department" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('program')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Program</span>
                    <SortIcon field="program" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Year/Sem/Sec
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('cgpa')}
                >
                  <div className="flex items-center space-x-1">
                    <span>CGPA</span>
                    <SortIcon field="cgpa" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('attendance')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Attendance</span>
                    <SortIcon field="attendance" />
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
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('feesStatus')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Fees Status</span>
                    <SortIcon field="feesStatus" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((student, index) => (
                <tr key={student.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-25 dark:bg-gray-825' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {student.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {student.studentName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {student.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {student.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {student.year} / {student.semester} / {student.section}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${getCGPAColor(student.cgpa)}`}>
                      {student.cgpa}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <span className="mr-2">{student.attendance}%</span>
                      <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            student.attendance >= 90 ? 'bg-green-500' :
                            student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFeesStatusColor(student.feesStatus)}`}>
                      {student.feesStatus.charAt(0).toUpperCase() + student.feesStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => handleViewDetails(student)}
                        title="View Details"
                      >
                        View
                      </button>
                      {student.status === 'active' && (
                        <button
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          onClick={() => handleStatusUpdate(student.id, 'inactive')}
                          title="Mark as Inactive"
                        >
                          Inactive
                        </button>
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
      {showDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Student Details - {selectedStudent.studentName}
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
                      Personal Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Student ID:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.studentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Roll Number:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.rollNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Date of Birth:</span>
                        <span className="text-gray-900 dark:text-gray-100">{new Date(selectedStudent.dateOfBirth).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                      </svg>
                      Academic Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Department:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Program:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.program}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Year:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Semester:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.semester}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Section:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.section}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Admission Date:</span>
                        <span className="text-gray-900 dark:text-gray-100">{new Date(selectedStudent.admissionDate).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                      Parent/Guardian Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Parent Name:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.parentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Parent Phone:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedStudent.parentPhone}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Address:</span>
                        <p className="text-gray-900 dark:text-gray-100 mt-1">{selectedStudent.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      Academic Performance
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">CGPA:</span>
                        <span className={`text-lg font-bold ${getCGPAColor(selectedStudent.cgpa)}`}>
                          {selectedStudent.cgpa}
                        </span>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Attendance:</span>
                          <span className="text-gray-900 dark:text-gray-100 font-medium">{selectedStudent.attendance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              selectedStudent.attendance >= 90 ? 'bg-green-500' :
                              selectedStudent.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedStudent.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedStudent.status)}`}>
                          {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Fees Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFeesStatusColor(selectedStudent.feesStatus)}`}>
                          {selectedStudent.feesStatus.charAt(0).toUpperCase() + selectedStudent.feesStatus.slice(1)}
                        </span>
                      </div>
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
              {selectedStudent.status === 'active' && (
                <button
                  className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onClick={() => {
                    handleStatusUpdate(selectedStudent.id, 'inactive');
                    setShowDetailModal(false);
                  }}
                >
                  Mark as Inactive
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
