import React, { useState } from 'react';
import { Calendar, Filter, Search, Users, UserCheck, UserX, Clock, X } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface AttendanceRecord {
  id: string;
  facultyName: string;
  department: string;
  date: string;
  status: 'present' | 'absent' | 'leave';
  timeIn: string;
  timeOut: string;
  hoursWorked: string;
  leaveType?: string;
  remarks?: string;
}

export default function FacultyAttendance() {
  const { isDarkMode } = useTheme();
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [facultyNameFilter, setFacultyNameFilter] = useState('');
  const [fromDateFilter, setFromDateFilter] = useState('');
  const [toDateFilter, setToDateFilter] = useState('');
  const [dateRange, setDateRange] = useState('week');

  const attendanceData: AttendanceRecord[] = [
    {
      id: '1',
      facultyName: 'Dr. John Smith',
      department: 'Computer Science',
      date: '2024-09-18',
      status: 'present',
      timeIn: '09:00 AM',
      timeOut: '05:30 PM',
      hoursWorked: '8.5'
    },
    {
      id: '2',
      facultyName: 'Dr. Sarah Johnson',
      department: 'Mathematics',
      date: '2024-09-18',
      status: 'present',
      timeIn: '08:45 AM',
      timeOut: '05:15 PM',
      hoursWorked: '8.5'
    },
    {
      id: '3',
      facultyName: 'Prof. Michael Brown',
      department: 'Physics',
      date: '2024-09-18',
      status: 'leave',
      timeIn: '-',
      timeOut: '-',
      hoursWorked: '0',
      leaveType: 'Sick Leave'
    },
    {
      id: '4',
      facultyName: 'Dr. Emily Davis',
      department: 'Computer Science',
      date: '2024-09-18',
      status: 'absent',
      timeIn: '-',
      timeOut: '-',
      hoursWorked: '0',
      remarks: 'No notification'
    },
    {
      id: '5',
      facultyName: 'Prof. Robert Wilson',
      department: 'Chemistry',
      date: '2024-09-18',
      status: 'present',
      timeIn: '09:15 AM',
      timeOut: '06:00 PM',
      hoursWorked: '8.75'
    },
    {
      id: '6',
      facultyName: 'Dr. Lisa Brown',
      department: 'Biology',
      date: '2024-09-18',
      status: 'present',
      timeIn: '08:30 AM',
      timeOut: '05:00 PM',
      hoursWorked: '8.5'
    },
    {
      id: '7',
      facultyName: 'Dr. John Smith',
      department: 'Computer Science',
      date: '2024-09-17',
      status: 'present',
      timeIn: '09:00 AM',
      timeOut: '05:30 PM',
      hoursWorked: '8.5'
    },
    {
      id: '8',
      facultyName: 'Dr. Sarah Johnson',
      department: 'Mathematics',
      date: '2024-09-17',
      status: 'leave',
      timeIn: '-',
      timeOut: '-',
      hoursWorked: '0',
      leaveType: 'Personal Leave'
    },
    {
      id: '9',
      facultyName: 'Prof. Michael Brown',
      department: 'Physics',
      date: '2024-09-17',
      status: 'present',
      timeIn: '08:50 AM',
      timeOut: '05:20 PM',
      hoursWorked: '8.5'
    },
    {
      id: '10',
      facultyName: 'Dr. Emily Davis',
      department: 'Computer Science',
      date: '2024-09-16',
      status: 'present',
      timeIn: '09:10 AM',
      timeOut: '05:40 PM',
      hoursWorked: '8.5'
    }
  ];

  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

  // Enhanced filtering logic
  const filteredAttendance = attendanceData.filter(record => {
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesFacultyName = facultyNameFilter === '' || 
      record.facultyName.toLowerCase().includes(facultyNameFilter.toLowerCase());
    
    // Date range filtering
    let matchesDateRange = true;
    if (fromDateFilter && toDateFilter) {
      const recordDate = new Date(record.date);
      const fromDate = new Date(fromDateFilter);
      const toDate = new Date(toDateFilter);
      matchesDateRange = recordDate >= fromDate && recordDate <= toDate;
    } else if (fromDateFilter) {
      const recordDate = new Date(record.date);
      const fromDate = new Date(fromDateFilter);
      matchesDateRange = recordDate >= fromDate;
    } else if (toDateFilter) {
      const recordDate = new Date(record.date);
      const toDate = new Date(toDateFilter);
      matchesDateRange = recordDate <= toDate;
    }
    
    return matchesDepartment && matchesStatus && matchesFacultyName && matchesDateRange;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20';
      case 'absent':
        return 'bg-rose-100 dark:bg-red-500/10 text-rose-800 dark:text-red-400 border border-rose-200 dark:border-red-500/20';
      case 'leave':
        return 'bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20';
      default:
        return 'bg-slate-100 dark:bg-slate-500/10 text-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-500/20';
    }
  };

  // Calculate summary based on filtered data
  const totalFaculty = filteredAttendance.length;
  const presentCount = filteredAttendance.filter(r => r.status === 'present').length;
  const absentCount = filteredAttendance.filter(r => r.status === 'absent').length;
  const onLeaveCount = filteredAttendance.filter(r => r.status === 'leave').length;

  const clearFilters = () => {
    setDepartmentFilter('all');
    setStatusFilter('all');
    setFacultyNameFilter('');
    setFromDateFilter('');
    setToDateFilter('');
    setDateRange('week');
  };

  const hasActiveFilters = departmentFilter !== 'all' || statusFilter !== 'all' || facultyNameFilter || fromDateFilter || toDateFilter;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Faculty Attendance
          </h1>
          <p className="text-sm mt-1 text-gray-500 dark:text-slate-400">
            Track and monitor faculty attendance records
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-blue-50 dark:bg-slate-800 border-blue-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium mb-2 text-gray-600 dark:text-slate-400">
                Total Faculty
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                {totalFaculty}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="p-5 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-emerald-50 dark:bg-slate-800 border-emerald-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium mb-2 text-gray-600 dark:text-slate-400">
                Present
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {presentCount}
              </p>
              <p className="text-xs text-emerald-500 dark:text-emerald-400/70">
                {totalFaculty > 0 ? ((presentCount / totalFaculty) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
              <UserCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
        
        <div className="p-5 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-rose-50 dark:bg-slate-800 border-rose-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium mb-2 text-gray-600 dark:text-slate-400">
                Absent
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-red-400">
                {absentCount}
              </p>
              <p className="text-xs text-rose-500 dark:text-red-400/70">
                {totalFaculty > 0 ? ((absentCount / totalFaculty) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <div className="p-3 rounded-xl bg-rose-100 dark:bg-red-500/10">
              <UserX className="w-6 h-6 text-rose-600 dark:text-red-400" />
            </div>
          </div>
        </div>
        
        <div className="p-5 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-amber-50 dark:bg-slate-800 border-amber-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium mb-2 text-gray-600 dark:text-slate-400">
                On Leave
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400">
                {onLeaveCount}
              </p>
              <p className="text-xs text-amber-500 dark:text-amber-400/70">
                {totalFaculty > 0 ? ((onLeaveCount / totalFaculty) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-500/10">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="p-6 rounded-xl shadow-sm border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-500 dark:text-slate-400" />
            <h3 className="text-lg font-semibold">
              Filter Attendance Records
            </h3>
            {hasActiveFilters && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                {filteredAttendance.length} results
              </span>
            )}
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
              Faculty Name
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-400" />
              <input
                type="text"
                placeholder="Search faculty..."
                value={facultyNameFilter}
                onChange={(e) => setFacultyNameFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
              From Date
            </label>
            <input
              type="date"
              value={fromDateFilter}
              onChange={(e) => setFromDateFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
              To Date
            </label>
            <input
              type="date"
              value={toDateFilter}
              onChange={(e) => setToDateFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="leave">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {filteredAttendance.length === 0 ? (
            <div className="p-8 text-center rounded-xl border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
              <Calendar className="w-12 h-12 mb-4 text-gray-300 dark:text-slate-500 mx-auto" />
              <p className="text-lg font-medium mb-2 text-gray-500 dark:text-slate-300">
                No attendance records found
              </p>
              <p className="text-sm text-gray-400 dark:text-slate-400">
                Try adjusting your filters or search criteria
              </p>
            </div>
          ) : (
            filteredAttendance.map((record) => (
              <div key={record.id} className="p-4 rounded-xl border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {record.facultyName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {record.facultyName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        {record.department}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Date:</span>
                    <span className="text-sm font-medium">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Time In:</span>
                    <span className="text-sm font-medium">{record.timeIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Time Out:</span>
                    <span className="text-sm font-medium">{record.timeOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Hours:</span>
                    <span className="text-sm font-medium">{record.hoursWorked}h</span>
                  </div>
                  {record.leaveType && (
                    <div className="pt-2 border-t border-gray-200 dark:border-slate-600">
                      <p className="text-sm text-gray-500 dark:text-slate-400">
                        Leave Type: {record.leaveType}
                      </p>
                    </div>
                  )}
                  {record.remarks && (
                    <div className="pt-2 border-t border-gray-200 dark:border-slate-600">
                      <p className="text-sm text-gray-500 dark:text-slate-400">
                        Remarks: {record.remarks}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block rounded-xl overflow-hidden shadow-sm border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
              <tr>
                {['Faculty', 'Department', 'Date', 'Status', 'Time In', 'Time Out', 'Hours'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Calendar className="w-12 h-12 mb-4 text-gray-300 dark:text-slate-500" />
                      <p className="text-lg font-medium mb-2 text-gray-500 dark:text-slate-300">
                        No attendance records found
                      </p>
                      <p className="text-sm text-gray-400 dark:text-slate-400">
                        Try adjusting your filters or search criteria
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {record.facultyName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                            {record.facultyName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-slate-300">
                        {record.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-slate-300">
                        {new Date(record.date).toLocaleDateString('en-US', { 
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                      {record.leaveType && (
                        <div className="text-xs mt-1 text-gray-500 dark:text-slate-400">
                          {record.leaveType}
                        </div>
                      )}
                      {record.remarks && (
                        <div className="text-xs mt-1 text-gray-500 dark:text-slate-400">
                          {record.remarks}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={record.timeIn === '-' ? 'text-gray-400 dark:text-slate-500' : 'text-gray-700 dark:text-slate-300'}>
                        {record.timeIn}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={record.timeOut === '-' ? 'text-gray-400 dark:text-slate-500' : 'text-gray-700 dark:text-slate-300'}>
                        {record.timeOut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={record.hoursWorked === '0' ? 'text-gray-400 dark:text-slate-500' : 'text-gray-900 dark:text-slate-200 font-medium'}>
                        {record.hoursWorked}h
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
