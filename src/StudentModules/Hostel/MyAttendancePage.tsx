


import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  TrendingUp,
  AlertCircle,
  Users,
  Download,
  Filter,
  Eye,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from 'recharts';

interface AttendanceRecord {
  date: string;
  day: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  checkInTime?: string;
  remarks?: string;
  markedBy: 'Warden' | 'Security' | 'Auto';
}

interface MonthlyStats {
  month: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  attendancePercentage: number;
}

const MyAttendancePage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('September');
  const [selectedYear, setSelectedYear] = useState('2025');

  // Current student info
  const currentStudent = {
    name: 'Rahul Kumar',
    rollNumber: '2023CSE001',
    block: 'A Block',
    roomNumber: 'A-205',
    currentStatus: 'Present',
  };

  // Recent attendance data (simple presence/absence)
  const attendanceData: AttendanceRecord[] = [
    {
      date: '2025-09-03',
      day: 'Wednesday',
      status: 'Present',
      checkInTime: '11:45 AM',
      markedBy: 'Warden',
      remarks: 'Late arrival from home',
    },
    {
      date: '2025-09-02',
      day: 'Tuesday',
      status: 'Present',
      checkInTime: '7:30 AM',
      markedBy: 'Security',
    },
    {
      date: '2025-09-01',
      day: 'Monday',
      status: 'Present',
      checkInTime: '8:15 AM',
      markedBy: 'Warden',
      remarks: 'Late morning return',
    },
    {
      date: '2025-08-31',
      day: 'Sunday',
      status: 'Absent',
      markedBy: 'Auto',
      remarks: 'Weekend home visit - Gate pass approved',
    },
    {
      date: '2025-08-30',
      day: 'Saturday',
      status: 'Present',
      checkInTime: '6:45 PM',
      markedBy: 'Security',
      remarks: 'Returned from college late',
    },
    {
      date: '2025-08-29',
      day: 'Friday',
      status: 'Present',
      checkInTime: '9:30 PM',
      markedBy: 'Warden',
      remarks: 'Late return - Permission taken',
    },
    {
      date: '2025-08-28',
      day: 'Thursday',
      status: 'Half Day',
      checkInTime: '2:15 PM',
      markedBy: 'Security',
      remarks: 'Morning at hospital - Medical',
    },
  ];

  // Monthly statistics for the year
  const monthlyStats: MonthlyStats[] = [
    { month: 'Jan', totalDays: 31, presentDays: 28, absentDays: 3, lateDays: 2, attendancePercentage: 90 },
    { month: 'Feb', totalDays: 28, presentDays: 26, absentDays: 2, lateDays: 1, attendancePercentage: 93 },
    { month: 'Mar', totalDays: 31, presentDays: 29, absentDays: 2, lateDays: 3, attendancePercentage: 94 },
    { month: 'Apr', totalDays: 30, presentDays: 27, absentDays: 3, lateDays: 2, attendancePercentage: 90 },
    { month: 'May', totalDays: 31, presentDays: 15, absentDays: 16, lateDays: 1, attendancePercentage: 48 },
    { month: 'Jun', totalDays: 30, presentDays: 30, absentDays: 0, lateDays: 0, attendancePercentage: 100 },
    { month: 'Jul', totalDays: 31, presentDays: 28, absentDays: 3, lateDays: 4, attendancePercentage: 90 },
    { month: 'Aug', totalDays: 31, presentDays: 29, absentDays: 2, lateDays: 3, attendancePercentage: 94 },
  ];

  // Current month summary
  const currentMonthSummary = {
    totalDays: 30,
    presentDays: 25,
    absentDays: 3,
    lateDays: 2,
    attendancePercentage: 83,
    daysPassed: 3,
  };

  // Attendance pattern for chart
  const attendancePattern = monthlyStats.map((stat) => ({
    month: stat.month,
    present: stat.presentDays,
    absent: stat.absentDays,
    percentage: stat.attendancePercentage,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800';
      case 'Half Day':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'Late':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Half Day':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Users className="w-5 h-5 text-gray-500" />;
    }
  };

  // Export function to download attendance data as CSV
  const handleExport = () => {
    // Convert attendance data to CSV format
    const headers = ['Date', 'Day', 'Status', 'Check-in Time', 'Marked By', 'Remarks'];
    const rows = attendanceData.map((record) => [
      record.date,
      record.day,
      record.status,
      record.checkInTime || '',
      record.markedBy,
      record.remarks ? record.remarks.replace(/(\r\n|\n|\r)/gm, ' ') : '',
    ]);

    // Create CSV string
    const csvContent =
      [headers, ...rows]
        .map((e) => e.map((cell) => `"${cell}"`).join(','))
        .join('\n');

    // Create a blob and generate a download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `attendance_${selectedMonth}_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{currentStudent.name}</h3>
                <p className="text-sm text-gray-600">
                  {currentStudent.rollNumber} • {currentStudent.block} - {currentStudent.roomNumber}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Currently {currentStudent.currentStatus}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">As of {new Date().toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-green-600">{currentMonthSummary.attendancePercentage}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This month ({currentMonthSummary.daysPassed}/{currentMonthSummary.totalDays} days)
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Days Present</p>
                <p className="text-2xl font-bold text-blue-600">{currentMonthSummary.presentDays}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Out of {currentMonthSummary.daysPassed} days</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Days Absent</p>
                <p className="text-2xl font-bold text-red-600">{currentMonthSummary.absentDays}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Including planned leave</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Late Entries</p>
                <p className="text-2xl font-bold text-yellow-600">{currentMonthSummary.lateDays}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">After 11:00 PM</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Attendance Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Attendance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendancePattern}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">September 2025 Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Present', value: currentMonthSummary.presentDays, color: '#10B981' },
                    { name: 'Absent', value: currentMonthSummary.absentDays, color: '#EF4444' },
                    {
                      name: 'Remaining',
                      value: currentMonthSummary.totalDays - currentMonthSummary.daysPassed,
                      color: '#E5E7EB',
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#EF4444" />
                  <Cell fill="#E5E7EB" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{currentMonthSummary.daysPassed}</span> days completed out of{' '}
                <span className="font-semibold">{currentMonthSummary.totalDays}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Recent Attendance Records */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Attendance Records</h2>
            <div className="flex gap-3">
              <select
                value={`${selectedMonth} ${selectedYear}`}
                onChange={(e) => {
                  const [month, year] = e.target.value.split(' ');
                  setSelectedMonth(month);
                  setSelectedYear(year);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="September 2025">September 2025</option>
                <option value="August 2025">August 2025</option>
                <option value="July 2025">July 2025</option>
              </select>

              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Marked By</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-sm text-gray-500">{record.day}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{record.checkInTime || '—'}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {record.markedBy}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{record.remarks || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guidelines */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Attendance Guidelines</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Attendance is marked by hostel warden or security staff during routine checks</li>
                <li>• Students must inform in advance for planned absences (home visits, medical leave)</li>
                <li>• Late entries after 11:00 PM require prior permission from warden</li>
                <li>• Minimum 75% attendance required as per hostel policy</li>
                <li>• Any discrepancies in attendance should be reported to the hostel office immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttendancePage;
