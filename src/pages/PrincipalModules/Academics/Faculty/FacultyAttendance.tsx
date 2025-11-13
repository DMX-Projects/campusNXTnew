import React, { useState } from 'react';
import { Calendar, Filter, Search, Users, UserCheck, UserX, Clock, X, Eye } from 'lucide-react';
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
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const attendanceData: AttendanceRecord[] = [
    { id: '1', facultyName: 'Dr. John Smith', department: 'Computer Science', date: '2024-09-18', status: 'present', timeIn: '09:00 AM', timeOut: '05:30 PM', hoursWorked: '8.5' },
    { id: '2', facultyName: 'Dr. Sarah Johnson', department: 'Mathematics', date: '2024-09-18', status: 'present', timeIn: '08:45 AM', timeOut: '05:15 PM', hoursWorked: '8.5' },
    { id: '3', facultyName: 'Prof. Michael Brown', department: 'Physics', date: '2024-09-18', status: 'leave', timeIn: '-', timeOut: '-', hoursWorked: '0', leaveType: 'Sick Leave' },
    { id: '4', facultyName: 'Dr. Emily Davis', department: 'Computer Science', date: '2024-09-18', status: 'absent', timeIn: '-', timeOut: '-', hoursWorked: '0', remarks: 'No notification' },
    { id: '5', facultyName: 'Prof. Robert Wilson', department: 'Chemistry', date: '2024-09-18', status: 'present', timeIn: '09:15 AM', timeOut: '06:00 PM', hoursWorked: '8.75' },
    { id: '6', facultyName: 'Dr. Lisa Brown', department: 'Biology', date: '2024-09-18', status: 'present', timeIn: '08:30 AM', timeOut: '05:00 PM', hoursWorked: '8.5' },
    { id: '7', facultyName: 'Dr. John Smith', department: 'Computer Science', date: '2024-09-17', status: 'present', timeIn: '09:00 AM', timeOut: '05:30 PM', hoursWorked: '8.5' },
    { id: '8', facultyName: 'Dr. Sarah Johnson', department: 'Mathematics', date: '2024-09-17', status: 'leave', timeIn: '-', timeOut: '-', hoursWorked: '0', leaveType: 'Personal Leave' },
    { id: '9', facultyName: 'Prof. Michael Brown', department: 'Physics', date: '2024-09-17', status: 'present', timeIn: '08:50 AM', timeOut: '05:20 PM', hoursWorked: '8.5' },
    { id: '10', facultyName: 'Dr. Emily Davis', department: 'Computer Science', date: '2024-09-16', status: 'present', timeIn: '09:10 AM', timeOut: '05:40 PM', hoursWorked: '8.5' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700 border border-green-200';
      case 'absent': return 'bg-red-100 text-red-700 border border-red-200';
      case 'leave': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const openModal = (facultyName: string) => {
    setSelectedFaculty(facultyName);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFaculty(null);
  };

  const facultyRecords = attendanceData.filter(r => r.facultyName === selectedFaculty);
  const totalDays = facultyRecords.length;
  const presentDays = facultyRecords.filter(r => r.status === 'present').length;
  const attendancePercentage = totalDays ? ((presentDays / totalDays) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Faculty Attendance</h1>
          <p className="text-sm mt-1 text-gray-500">Track and monitor faculty attendance records</p>
        </div>
        <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-white border border-gray-200">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Faculty" value="10" icon={<Users />} color="blue" />
        <SummaryCard title="Present" value="7" percentage="70.0" icon={<UserCheck />} color="green" />
        <SummaryCard title="Absent" value="1" percentage="10.0" icon={<UserX />} color="red" />
        <SummaryCard title="On Leave" value="2" percentage="20.0" icon={<Clock />} color="yellow" />
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border bg-white border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Faculty', 'Department', 'Date', 'Status', 'Time In', 'Time Out', 'Hours', 'Actions'].map(header => (
                  <th key={header} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceData.map(record => (
                <tr key={record.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{record.facultyName}</td>
                  <td className="px-6 py-4">{record.department}</td>
                  <td className="px-6 py-4">{new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{record.timeIn}</td>
                  <td className="px-6 py-4">{record.timeOut}</td>
                  <td className="px-6 py-4">{record.hoursWorked}h</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(record.facultyName)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                    >
                      <Eye className="w-4 h-4" /> View More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedFaculty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative max-h-[80vh] overflow-y-auto border border-gray-200">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                {selectedFaculty.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{selectedFaculty}</h2>
                <p className="text-sm text-gray-500">{facultyRecords[0]?.department}</p>
              </div>
            </div>

            <table className="w-full text-sm border-t border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Hours</th>
                </tr>
              </thead>
              <tbody>
                {facultyRecords.map(r => (
                  <tr key={r.id} className="border-t border-gray-200">
                    <td className="px-4 py-2 text-gray-700">
                      {new Date(r.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(r.status)}`}>
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-700">{r.hoursWorked}h</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-blue-700 font-semibold text-sm">
                Monthly Attendance: {presentDays}/{totalDays} days ({attendancePercentage}%)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, value, percentage, icon, color }: any) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    red: 'text-red-600 bg-red-50',
    yellow: 'text-yellow-600 bg-yellow-50',
  };

  return (
    <div className={`p-5 rounded-xl shadow-sm border border-gray-200 ${colorMap[color]} bg-white`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs sm:text-sm font-medium mb-2 text-gray-600">{title}</h3>
          <p className={`text-2xl sm:text-3xl font-bold ${colorMap[color].split(' ')[0]}`}>{value}</p>
          {percentage && (
            <p className={`text-xs ${colorMap[color].split(' ')[0]}/70`}>{percentage}%</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color].split(' ')[1]}`}>{icon}</div>
      </div>
    </div>
  );
}
