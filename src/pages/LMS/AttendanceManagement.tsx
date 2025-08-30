import React, { useState } from 'react';
import { Calendar, Users, TrendingUp, Clock } from 'lucide-react';
import AttendanceOverview from '../LMS/Components/attendance/AttendanceOverview';
import AttendanceTable from '../LMS/Components/attendance/AttendanceTable';

const AttendanceManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourse, setSelectedCourse] = useState('');

  const courses = ['CS-301 Data Structures', 'MATH-201 Calculus', 'PHY-101 Physics', 'CHEM-101 Chemistry'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
        <p className="text-gray-600 mt-1">Track student attendance and generate reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">87.5%</h3>
              <p className="text-gray-600 text-sm">Overall Attendance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-emerald-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">92.1%</h3>
              <p className="text-gray-600 text-sm">This Week</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-orange-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">45</h3>
              <p className="text-gray-600 text-sm">Absent Today</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">23</h3>
              <p className="text-gray-600 text-sm">Classes Today</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Mark Attendance</h2>
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <AttendanceTable course={selectedCourse} date={selectedDate} />
      </div>

      <AttendanceOverview />
    </div>
  );
};

export default AttendanceManagement;