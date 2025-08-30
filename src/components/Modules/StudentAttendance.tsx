import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Download, Filter, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const StudentAttendance: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const attendanceData = [
    { subject: 'Data Structures', present: 28, total: 30, percentage: 93.3 },
    { subject: 'Algorithms', present: 26, total: 30, percentage: 86.7 },
    { subject: 'Database Systems', present: 29, total: 30, percentage: 96.7 },
    { subject: 'Computer Networks', present: 25, total: 30, percentage: 83.3 },
    { subject: 'Software Engineering', present: 27, total: 30, percentage: 90.0 }
  ];

  const monthlyTrend = [
    { month: 'Aug', percentage: 95 },
    { month: 'Sep', percentage: 88 },
    { month: 'Oct', percentage: 92 },
    { month: 'Nov', percentage: 89 },
    { month: 'Dec', percentage: 94 },
    { month: 'Jan', percentage: 92 }
  ];

  const dailyAttendance = [
    { date: 'Jan 15', day: 'Mon', classes: [
      { subject: 'Data Structures', status: 'Present', time: '9:00 AM' },
      { subject: 'Algorithms', status: 'Present', time: '10:00 AM' },
      { subject: 'Database Lab', status: 'Present', time: '11:00 AM' },
      { subject: 'Software Engineering', status: 'Present', time: '2:00 PM' },
      { subject: 'Computer Networks', status: 'Present', time: '3:00 PM' }
    ]},
    { date: 'Jan 16', day: 'Tue', classes: [
      { subject: 'Algorithms', status: 'Present', time: '9:00 AM' },
      { subject: 'Database Systems', status: 'Absent', time: '10:00 AM' },
      { subject: 'Networks Lab', status: 'Present', time: '11:00 AM' },
      { subject: 'Data Structures', status: 'Present', time: '2:00 PM' },
      { subject: 'Software Lab', status: 'Present', time: '3:00 PM' }
    ]},
    { date: 'Jan 17', day: 'Wed', classes: [
      { subject: 'Database Systems', status: 'Present', time: '9:00 AM' },
      { subject: 'Computer Networks', status: 'Present', time: '10:00 AM' },
      { subject: 'Algorithms Lab', status: 'Present', time: '11:00 AM' },
      { subject: 'Software Engineering', status: 'Present', time: '2:00 PM' },
      { subject: 'Data Structures', status: 'Present', time: '3:00 PM' }
    ]}
  ];

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 75) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getAttendanceBg = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 dark:bg-green-900/20';
    if (percentage >= 75) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Attendance Record
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your class attendance and maintain academic requirements
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="January">January 2025</option>
            <option value="December">December 2024</option>
            <option value="November">November 2024</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Overall Attendance</p>
              <p className="text-3xl font-bold">92%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Classes Attended</p>
              <p className="text-3xl font-bold">135</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Classes Missed</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <XCircle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Classes</p>
              <p className="text-3xl font-bold">147</p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-wise Attendance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Subject-wise Attendance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="subject" stroke="#6B7280" />
              <YAxis domain={[70, 100]} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="percentage" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Attendance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis domain={[80, 100]} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="percentage" 
                stroke="#10B981" 
                strokeWidth={3} 
                dot={{ fill: '#10B981', r: 5 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Subject-wise Detailed Attendance</h3>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {attendanceData.map((subject, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{subject.subject}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceBg(subject.percentage)} ${getAttendanceColor(subject.percentage)}`}>
                    {subject.percentage}%
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Classes Attended</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">{subject.present}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Total Classes</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{subject.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Classes Missed</p>
                    <p className="font-semibold text-red-600 dark:text-red-400">{subject.total - subject.present}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        subject.percentage >= 90 ? 'bg-green-500' :
                        subject.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>0%</span>
                    <span>75% (Minimum Required)</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Attendance Log */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daily Attendance Log</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by subject..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {dailyAttendance.map((day, dayIndex) => (
              <div key={dayIndex} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{day.date}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{day.day}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {day.classes.filter(c => c.status === 'Present').length} / {day.classes.length} classes attended
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {day.classes.map((classItem, classIndex) => (
                    <div key={classIndex} className={`p-3 rounded-lg border ${
                      classItem.status === 'Present' 
                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                        : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{classItem.subject}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{classItem.time}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {classItem.status === 'Present' ? (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          )}
                          <span className={`text-xs font-medium ${
                            classItem.status === 'Present' 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {classItem.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Requirements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Attendance Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-green-800 dark:text-green-400">Excellent</h4>
            <p className="text-sm text-green-600 dark:text-green-400">90% and above</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Eligible for all exams</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-400">Satisfactory</h4>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">75% - 89%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Meets minimum requirement</p>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-red-800 dark:text-red-400">Below Requirement</h4>
            <p className="text-sm text-red-600 dark:text-red-400">Below 75%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">May affect exam eligibility</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;