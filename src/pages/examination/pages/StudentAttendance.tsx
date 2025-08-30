import React, { useState } from 'react';
import { Search, Filter, Download, UserCheck, UserX, Users, Clock } from 'lucide-react';

const StudentAttendance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState('EX001');
  const [attendanceFilter, setAttendanceFilter] = useState('all');

  const attendanceData = [
    {
      id: '1',
      studentId: 'CSE001',
      rollNo: '20CS001',
      studentName: 'John Doe',
      examId: 'EX001',
      subject: 'Computer Networks',
      checkInTime: '08:45 AM',
      checkOutTime: '12:15 PM',
      status: 'present',
      seatNo: 'A1'
    },
    {
      id: '2',
      studentId: 'CSE002',
      rollNo: '20CS002',
      studentName: 'Jane Smith',
      examId: 'EX001',
      subject: 'Computer Networks',
      checkInTime: '08:50 AM',
      checkOutTime: '12:10 PM',
      status: 'present',
      seatNo: 'A2'
    },
    {
      id: '3',
      studentId: 'CSE003',
      rollNo: '20CS003',
      studentName: 'Bob Wilson',
      examId: 'EX001',
      subject: 'Computer Networks',
      checkInTime: '-',
      checkOutTime: '-',
      status: 'absent',
      seatNo: 'A3'
    }
  ];

  const filteredAttendance = attendanceData.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = attendanceFilter === 'all' || record.status === attendanceFilter;
    return matchesSearch && matchesFilter;
  });

  const attendanceStats = {
    total: attendanceData.length,
    present: attendanceData.filter(r => r.status === 'present').length,
    absent: attendanceData.filter(r => r.status === 'absent').length,
    late: attendanceData.filter(r => r.status === 'late').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">STUDENT ATTENDANCE</h1>
          <p className="text-gray-600">Track and manage student attendance for examinations</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{attendanceStats.total}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{attendanceStats.present}</p>
              <p className="text-sm text-gray-600">Present</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <UserX className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{attendanceStats.absent}</p>
              <p className="text-sm text-gray-600">Absent</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{Math.round((attendanceStats.present / attendanceStats.total) * 100)}%</p>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select 
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EX001">Computer Networks - Mid Sem</option>
              <option value="EX002">Database Management - Final</option>
              <option value="EX003">Operating Systems - Mid Sem</option>
            </select>
            
            <select 
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Roll No</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Student Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Seat No</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Check In</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Check Out</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{record.rollNo}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.studentName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.seatNo}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.checkInTime}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.checkOutTime}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                      record.status === 'present' 
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'absent'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;