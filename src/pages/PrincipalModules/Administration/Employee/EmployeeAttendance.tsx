
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
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
  Settings
} from 'lucide-react';

interface EmployeeData {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  employeeType: 'teaching_faculty' | 'non_teaching_faculty' | 'administrative_staff' | 'support_staff' | 'technical_staff';
  joiningDate: string;
  shiftTiming: string;
  todayStatus: 'present' | 'absent' | 'half_day' | 'on_leave';
  checkInTime?: string;
  checkOutTime?: string;
  workingHours?: number;
  monthlyAttendance: number;
  totalWorkingDays: number;
  lateCount: number;
  leavesTaken: number;
  profileImage?: string;
}

interface FilterState {
  department: string;
  employeeType: string;
  designation: string;
  todayStatus: string;
  shiftTiming: string;
}

interface SummaryStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  onLeaveToday: number;
  avgAttendance: number;
  earlyDepartures: number;
  pendingCheckouts: number;
}

const EmployeeAttendance: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [filters, setFilters] = useState<FilterState>({
    department: '',
    employeeType: '',
    designation: '',
    todayStatus: '',
    shiftTiming: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [sortField, setSortField] = useState<keyof EmployeeData>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const itemsPerPage = 15;

  // Sample data with Indian names - replace with API call
  const [employeesData] = useState<EmployeeData[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@college.edu.in',
      phone: '+91 9876543210',
      department: 'Computer Science',
      designation: 'Professor',
      employeeType: 'teaching_faculty',
      joiningDate: '2020-08-15',
      shiftTiming: '09:00 AM - 05:00 PM',
      todayStatus: 'present',
      checkInTime: '08:45 AM',
      checkOutTime: '05:15 PM',
      workingHours: 8.5,
      monthlyAttendance: 95,
      totalWorkingDays: 22,
      lateCount: 2,
      leavesTaken: 3
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Prof. Meera Sharma',
      email: 'meera.sharma@college.edu.in',
      phone: '+91 9876543211',
      department: 'Mathematics',
      designation: 'Associate Professor',
      employeeType: 'teaching_faculty',
      joiningDate: '2018-06-10',
      shiftTiming: '09:00 AM - 05:00 PM',
      todayStatus: 'late',
      checkInTime: '09:20 AM',
      workingHours: 7.7,
      monthlyAttendance: 88,
      totalWorkingDays: 22,
      lateCount: 5,
      leavesTaken: 4
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Dr. Arjun Reddy',
      email: 'arjun.reddy@college.edu.in',
      phone: '+91 9876543212',
      department: 'Physics',
      designation: 'Assistant Professor',
      employeeType: 'teaching_faculty',
      joiningDate: '2021-01-20',
      shiftTiming: '09:00 AM - 05:00 PM',
      todayStatus: 'on_leave',
      monthlyAttendance: 92,
      totalWorkingDays: 22,
      lateCount: 1,
      leavesTaken: 2
    },
    {
      id: '4',
      employeeId: 'EMP004',
      name: 'Priya Gupta',
      email: 'priya.gupta@college.edu.in',
      phone: '+91 9876543213',
      department: 'Library',
      designation: 'Librarian',
      employeeType: 'non_teaching_faculty',
      joiningDate: '2019-03-15',
      shiftTiming: '08:30 AM - 04:30 PM',
      todayStatus: 'present',
      checkInTime: '08:25 AM',
      checkOutTime: '04:35 PM',
      workingHours: 8.2,
      monthlyAttendance: 96,
      totalWorkingDays: 22,
      lateCount: 0,
      leavesTaken: 1
    },
    {
      id: '5',
      employeeId: 'EMP005',
      name: 'Vikash Singh',
      email: 'vikash.singh@college.edu.in',
      phone: '+91 9876543214',
      department: 'Administration',
      designation: 'Administrative Officer',
      employeeType: 'administrative_staff',
      joiningDate: '2017-09-01',
      shiftTiming: '09:00 AM - 06:00 PM',
      todayStatus: 'present',
      checkInTime: '08:55 AM',
      workingHours: 8.8,
      monthlyAttendance: 94,
      totalWorkingDays: 22,
      lateCount: 3,
      leavesTaken: 2
    },
    {
      id: '6',
      employeeId: 'EMP006',
      name: 'Sneha Patel',
      email: 'sneha.patel@college.edu.in',
      phone: '+91 9876543215',
      department: 'IT Support',
      designation: 'System Administrator',
      employeeType: 'technical_staff',
      joiningDate: '2020-11-05',
      shiftTiming: '08:00 AM - 04:00 PM',
      todayStatus: 'absent',
      monthlyAttendance: 85,
      totalWorkingDays: 22,
      lateCount: 4,
      leavesTaken: 6
    },
    {
      id: '7',
      employeeId: 'EMP007',
      name: 'Ramesh Yadav',
      email: 'ramesh.yadav@college.edu.in',
      phone: '+91 9876543216',
      department: 'Maintenance',
      designation: 'Maintenance Supervisor',
      employeeType: 'support_staff',
      joiningDate: '2015-04-12',
      shiftTiming: '07:00 AM - 03:00 PM',
      todayStatus: 'present',
      checkInTime: '06:55 AM',
      checkOutTime: '03:05 PM',
      workingHours: 8.2,
      monthlyAttendance: 98,
      totalWorkingDays: 22,
      lateCount: 0,
      leavesTaken: 1
    },
    {
      id: '8',
      employeeId: 'EMP008',
      name: 'Kavya Iyer',
      email: 'kavya.iyer@college.edu.in',
      phone: '+91 9876543217',
      department: 'Chemistry',
      designation: 'Lab Assistant',
      employeeType: 'technical_staff',
      joiningDate: '2022-02-28',
      shiftTiming: '09:00 AM - 05:00 PM',
      todayStatus: 'half_day',
      checkInTime: '09:05 AM',
      checkOutTime: '01:00 PM',
      workingHours: 4.0,
      monthlyAttendance: 91,
      totalWorkingDays: 22,
      lateCount: 2,
      leavesTaken: 3
    },
    {
      id: '9',
      employeeId: 'EMP009',
      name: 'Anil Kumar',
      email: 'anil.kumar@college.edu.in',
      phone: '+91 9876543218',
      department: 'Security',
      designation: 'Security Officer',
      employeeType: 'support_staff',
      joiningDate: '2016-07-20',
      shiftTiming: '06:00 PM - 06:00 AM',
      todayStatus: 'present',
      checkInTime: '05:55 PM',
      workingHours: 11.8,
      monthlyAttendance: 97,
      totalWorkingDays: 22,
      lateCount: 1,
      leavesTaken: 1
    },
    {
      id: '10',
      employeeId: 'EMP010',
      name: 'Deepika Nair',
      email: 'deepika.nair@college.edu.in',
      phone: '+91 9876543219',
      department: 'Finance',
      designation: 'Accounts Officer',
      employeeType: 'administrative_staff',
      joiningDate: '2019-12-10',
      shiftTiming: '09:30 AM - 05:30 PM',
      todayStatus: 'late',
      checkInTime: '09:45 AM',
      workingHours: 7.7,
      monthlyAttendance: 89,
      totalWorkingDays: 22,
      lateCount: 6,
      leavesTaken: 4
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
      designation: '',
      todayStatus: '',
      shiftTiming: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSort = (field: keyof EmployeeData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleViewDetails = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  const handleStatusUpdate = (employeeId: string, status: 'present' | 'absent' | 'half_day') => {
    console.log(`Updating employee ${employeeId} status to ${status}`);
    showToast(`Employee status updated to ${status}`);
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

  const filteredData = employeesData.filter(employee => {
    const matchesSearch = searchTerm === '' || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (filters.department === '' || employee.department === filters.department) &&
      (filters.employeeType === '' || employee.employeeType === filters.employeeType) &&
      (filters.designation === '' || employee.designation === filters.designation) &&
      (filters.todayStatus === '' || employee.todayStatus === filters.todayStatus) &&
      (filters.shiftTiming === '' || employee.shiftTiming === filters.shiftTiming);

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
    totalEmployees: filteredData.length,
    presentToday: filteredData.filter(e => e.todayStatus === 'present').length,
    absentToday: filteredData.filter(e => e.todayStatus === 'absent').length,
    // lateToday: filteredData.filter(e => e.todayStatus === 'late').length,
    onLeaveToday: filteredData.filter(e => e.todayStatus === 'on_leave').length,
    avgAttendance: filteredData.length > 0 ? Number((filteredData.reduce((sum, e) => sum + e.monthlyAttendance, 0) / filteredData.length).toFixed(1)) : 0,
    earlyDepartures: filteredData.filter(e => e.todayStatus === 'half_day').length,
    pendingCheckouts: filteredData.filter(e => e.todayStatus === 'present' && !e.checkOutTime).length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700';
      case 'absent': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-700';
      // case 'late': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700';
      case 'half_day': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-100 dark:border-orange-700';
      case 'on_leave': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600';
    }
  };
const handleExport = () => {
  const textContent = "Your text content here";
  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `export_${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-600 dark:text-green-400 font-bold';
    if (percentage >= 85) return 'text-blue-600 dark:text-blue-400 font-semibold';
    if (percentage >= 75) return 'text-yellow-600 dark:text-yellow-400 font-medium';
    return 'text-red-600 dark:text-red-400 font-medium';
  };

  const SortIcon = ({ field }: { field: keyof EmployeeData }) => {
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
            <Clock className="w-8 h-8 mr-3 text-blue-500" />
            Employee Attendance Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage attendance for all faculty, staff, and administrative personnel
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
            {/* <Calendar className="w-4 h-4 text-gray-500" /> */}
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
    {/* Summary Cards */}
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 mb-7">
  {/* Total Employees */}
  <div className="rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 
                  bg-blue-100 dark:bg-blue-900/40 
                  text-gray-800 dark:text-white">
    <div>
      <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Total Employees</p>
      <p className="text-2xl font-bold">{summaryStats.totalEmployees}</p>
    </div>
  </div>

        <div className="rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 
                  bg-green-100 dark:bg-green-900/40 
                  text-gray-800 dark:text-white">
    <div>
      <p className="text-sm font-medium text-green-600 dark:text-green-300">Present Today</p>
      <p className="text-2xl font-bold">{summaryStats.presentToday}</p>
    </div>
  </div>

       <div className="rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 
                  bg-red-100 dark:bg-red-900/40 
                  text-gray-800 dark:text-white">
    <div>
      <p className="text-sm font-medium text-red-600 dark:text-red-300">Absent Today</p>
      <p className="text-2xl font-bold">{summaryStats.absentToday}</p>
    </div>
  </div>
        {/* <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Late Today</p>
              <p className="text-2xl font-bold">{summaryStats.lateToday}</p>
            </div>
            <div className="bg-yellow-300 bg-opacity-30 rounded-lg p-2">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div> */}

         {/* On Leave */}
  <div className="rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 
                  bg-purple-100 dark:bg-purple-900/40 
                  text-gray-800 dark:text-white">
    <div>
      <p className="text-sm font-medium text-purple-600 dark:text-purple-300">On Leave</p>
      <p className="text-2xl font-bold">{summaryStats.onLeaveToday}</p>
    </div>
  </div>
       {/* Avg Attendance */}
  <div className="rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 
                  bg-indigo-100 dark:bg-indigo-900/40 
                  text-gray-800 dark:text-white">
    <div>
      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Avg Attendance</p>
      <p className="text-2xl font-bold">{summaryStats.avgAttendance}%</p>
    </div>
  </div>
        {/* Half Day */}
  <div className="rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 
                  bg-orange-100 dark:bg-orange-900/40 
                  text-gray-800 dark:text-white">
    <div>
      <p className="text-sm font-medium text-orange-600 dark:text-orange-300">Half Day</p>
      <p className="text-2xl font-bold">{summaryStats.earlyDepartures}</p>
    </div>
  </div>
         {/* Pending Checkout */}
  <div className="rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 
                  bg-teal-100 dark:bg-teal-900/40 
                  text-gray-800 dark:text-white">
    <div>
      <p className="text-sm font-medium text-teal-600 dark:text-teal-300">Pending Checkout</p>
      <p className="text-2xl font-bold">{summaryStats.pendingCheckouts}</p>
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
              placeholder="Search by name, employee ID, email, or designation..."
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
            value={filters.designation}
            onChange={(e) => handleFilterChange('designation', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Designations</option>
            <option value="Professor">Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Librarian">Librarian</option>
            <option value="Administrative Officer">Administrative Officer</option>
            <option value="System Administrator">System Administrator</option>
            <option value="Lab Assistant">Lab Assistant</option>
            <option value="Security Officer">Security Officer</option>
          </select>

          <select
            value={filters.todayStatus}
            onChange={(e) => handleFilterChange('todayStatus', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            {/* <option value="late">Late</option> */}
            <option value="half_day">Half Day</option>
            <option value="on_leave">On Leave</option>
          </select>

          <select
            value={filters.shiftTiming}
            onChange={(e) => handleFilterChange('shiftTiming', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Shifts</option>
            <option value="09:00 AM - 05:00 PM">Morning Shift</option>
            <option value="08:30 AM - 04:30 PM">Early Morning</option>
            <option value="07:00 AM - 03:00 PM">Early Shift</option>
            <option value="06:00 PM - 06:00 AM">Night Shift</option>
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
          Showing {paginatedData.length} of {filteredData.length} employees
        </span>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Sorted by: <span className="font-medium capitalize">{sortField.replace(/([A-Z])/g, ' $1').trim()}</span> 
            ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
          </div>
        
          <button onClick={handleExport} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Employee Attendance Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Employee</span>
                    <SortIcon field="name" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('employeeType')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Type & Department</span>
                    <SortIcon field="employeeType" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('designation')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Designation</span>
                    <SortIcon field="designation" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Shift Timing
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('todayStatus')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Today's Status</span>
                    <SortIcon field="todayStatus" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Check In/Out
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('workingHours')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Working Hours</span>
                    <SortIcon field="workingHours" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSort('monthlyAttendance')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Monthly Attendance</span>
                    <SortIcon field="monthlyAttendance" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.filter(e => e.todayStatus !== "late").map((employee, index) => (
                <tr key={employee.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-25 dark:bg-gray-825' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {employee.employeeId} • {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getEmployeeTypeIcon(employee.employeeType)}
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                          {employee.employeeType.replace(/_/g, ' ')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {employee.department}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {employee.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{employee.shiftTiming}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(employee.todayStatus)}`}>
                      {employee.todayStatus === 'present' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {employee.todayStatus === 'absent' && <XCircle className="w-3 h-3 mr-1" />}
                      {/* {employee.todayStatus === 'late' && <AlertTriangle className="w-3 h-3 mr-1" />} */}
                      {employee.todayStatus === 'half_day' && <Clock className="w-3 h-3 mr-1" />}
                      {employee.todayStatus === 'on_leave' && <Calendar className="w-3 h-3 mr-1" />}
                      {employee.todayStatus.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="space-y-1">
                      {employee.checkInTime && (
                        <div className="flex items-center space-x-1">
                          <span className="text-green-600 dark:text-green-400">↗</span>
                          <span>{employee.checkInTime}</span>
                        </div>
                      )}
                      {employee.checkOutTime && (
                        <div className="flex items-center space-x-1">
                          <span className="text-red-600 dark:text-red-400">↙</span>
                          <span>{employee.checkOutTime}</span>
                        </div>
                      )}
                      {!employee.checkInTime && !employee.checkOutTime && (
                        <span className="text-gray-400">--:--</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {employee.workingHours ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{employee.workingHours}h</span>
                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              employee.workingHours >= 8 ? 'bg-green-500' :
                              employee.workingHours >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min((employee.workingHours / 8) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-bold ${getAttendanceColor(employee.monthlyAttendance)}`}>
                        {employee.monthlyAttendance}%
                      </span>
                      <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            employee.monthlyAttendance >= 95 ? 'bg-green-500' :
                            employee.monthlyAttendance >= 85 ? 'bg-blue-500' :
                            employee.monthlyAttendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${employee.monthlyAttendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-1"
                        onClick={() => handleViewDetails(employee)}
                        title="View Details"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                      {/* {employee.todayStatus !== 'present' && employee.todayStatus !== 'on_leave' && (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center space-x-1"
                          onClick={() => handleStatusUpdate(employee.id, 'present')}
                          title="Mark Present"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Present</span>
                        </button>
                      )} */}
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
      {showDetailModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-500" />
                Employee Details - {selectedEmployee.name}
              </h2>
              <button
                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-2xl font-bold p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => setShowDetailModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedEmployee.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Employee ID:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedEmployee.employeeId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedEmployee.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Joining Date:</span>
                        <span className="text-gray-900 dark:text-gray-100">{new Date(selectedEmployee.joiningDate).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Job Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Department:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedEmployee.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Designation:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedEmployee.designation}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Employee Type:</span>
                        <div className="flex items-center space-x-2">
                          {getEmployeeTypeIcon(selectedEmployee.employeeType)}
                          <span className="text-gray-900 dark:text-gray-100 capitalize">
                            {selectedEmployee.employeeType.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Shift Timing:</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 dark:text-gray-100">{selectedEmployee.shiftTiming}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Today's Attendance
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedEmployee.todayStatus)}`}>
                          {selectedEmployee.todayStatus === 'present' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {selectedEmployee.todayStatus === 'absent' && <XCircle className="w-3 h-3 mr-1" />}
                          {selectedEmployee.todayStatus === 'late' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {selectedEmployee.todayStatus === 'half_day' && <Clock className="w-3 h-3 mr-1" />}
                          {selectedEmployee.todayStatus === 'on_leave' && <Calendar className="w-3 h-3 mr-1" />}
                          {selectedEmployee.todayStatus.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </div>
                      {selectedEmployee.checkInTime && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Check In:</span>
                          <span className="text-green-600 dark:text-green-400 font-medium">{selectedEmployee.checkInTime}</span>
                        </div>
                      )}
                      {selectedEmployee.checkOutTime && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Check Out:</span>
                          <span className="text-red-600 dark:text-red-400 font-medium">{selectedEmployee.checkOutTime}</span>
                        </div>
                      )}
                      {selectedEmployee.workingHours && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Working Hours:</span>
                          <span className="text-gray-900 dark:text-gray-100 font-bold">{selectedEmployee.workingHours} hours</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Monthly Statistics
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Attendance:</span>
                          <span className={`text-lg font-bold ${getAttendanceColor(selectedEmployee.monthlyAttendance)}`}>
                            {selectedEmployee.monthlyAttendance}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              selectedEmployee.monthlyAttendance >= 95 ? 'bg-green-500' :
                              selectedEmployee.monthlyAttendance >= 85 ? 'bg-blue-500' :
                              selectedEmployee.monthlyAttendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedEmployee.monthlyAttendance}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Working Days:</span>
                        <span className="text-gray-900 dark:text-gray-100">{selectedEmployee.totalWorkingDays} days</span>
                      </div>
                      {/* <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Late Count:</span>
                        <span className="text-yellow-600 dark:text-yellow-400 font-medium">{selectedEmployee.lateCount} times</span>
                      </div> */}
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Leaves Taken:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{selectedEmployee.leavesTaken} days</span>
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
              {/* {selectedEmployee.todayStatus !== 'present' && selectedEmployee.todayStatus !== 'on_leave' && (
                <button
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center space-x-2"
                  onClick={() => {
                    handleStatusUpdate(selectedEmployee.id, 'present');
                    setShowDetailModal(false);
                  }}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark Present</span>
                </button>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;