import React, { useState } from 'react';
import { Clock, Users, CheckCircle, XCircle, AlertCircle, Calendar, Search, Filter, Download, User } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'on-leave';
  workingHours: string;
  date: string;
  overtimeHours?: number;
}

const EmployeeAttendance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2024-01-15');

  const employees: Employee[] = [
    {
      id: 'EMP001',
      name: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      role: 'Professor',
      checkIn: '08:30',
      checkOut: '17:15',
      status: 'present',
      workingHours: '8h 45m',
      date: '2024-01-15',
      overtimeHours: 0.75
    },
    {
      id: 'EMP002',
      name: 'Michael Brown',
      department: 'Administration',
      role: 'Admin Officer',
      checkIn: '09:15',
      checkOut: '18:00',
      status: 'late',
      workingHours: '8h 45m',
      date: '2024-01-15'
    },
    {
      id: 'EMP003',
      name: 'Emily Davis',
      department: 'Library',
      role: 'Librarian',
      checkIn: '08:00',
      checkOut: '16:30',
      status: 'present',
      workingHours: '8h 30m',
      date: '2024-01-15'
    },
    {
      id: 'EMP004',
      name: 'David Wilson',
      department: 'Mathematics',
      role: 'Assistant Professor',
      checkIn: '',
      checkOut: '',
      status: 'on-leave',
      workingHours: '0h 0m',
      date: '2024-01-15'
    },
    {
      id: 'EMP005',
      name: 'Lisa Martinez',
      department: 'Human Resources',
      role: 'HR Manager',
      checkIn: '',
      checkOut: '',
      status: 'absent',
      workingHours: '0h 0m',
      date: '2024-01-15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'on-leave': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'late': return <AlertCircle className="w-4 h-4" />;
      case 'on-leave': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const presentCount = employees.filter(emp => emp.status === 'present').length;
  const absentCount = employees.filter(emp => emp.status === 'absent').length;
  const lateCount = employees.filter(emp => emp.status === 'late').length;
  const onLeaveCount = employees.filter(emp => emp.status === 'on-leave').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Employee Attendance</h1>
          <p className="text-gray-600">Track and monitor employee attendance and working hours</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Present Today</p>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Absent Today</p>
                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Late Arrivals</p>
                <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">On Leave</p>
                <p className="text-2xl font-bold text-blue-600">{onLeaveCount}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by employee name, ID, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Administration">Administration</option>
                <option value="Library">Library</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Human Resources">Human Resources</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="on-leave">On Leave</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Records */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.checkIn || <span className="text-gray-400">--:--</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.checkOut || <span className="text-gray-400">--:--</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.workingHours}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.overtimeHours ? `${employee.overtimeHours}h` : <span className="text-gray-400">0h</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                        {getStatusIcon(employee.status)}
                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1).replace('-', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance records found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendance;