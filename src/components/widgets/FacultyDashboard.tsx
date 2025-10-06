import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DashboardCard } from '../shared';
import { Users, BookOpen, Calendar, CheckCircle, Clock, Award } from 'lucide-react';

const FacultyDashboard: React.FC = () => {
  const cardData = [
    { title: 'My Classes', value: '8', change: '+1', trend: 'up' as const, icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Total Students', value: '156', change: '+5', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Avg. Class Attendance', value: '89%', change: '+2.3%', trend: 'up' as const, icon: CheckCircle, color: 'bg-purple-500' },
    { title: 'Pending Evaluations', value: '12', change: '-8', trend: 'down' as const, icon: Clock, color: 'bg-orange-500' }
  ];

  const classAttendanceData = [
    { class: 'Data Structures', attendance: 92 },
    { class: 'Algorithms', attendance: 88 },
    { class: 'Database Systems', attendance: 94 },
    { class: 'Software Engineering', attendance: 86 }
  ];

  const studentPerformanceData = [
    { range: '90-100', count: 28, color: '#10B981' },
    { range: '80-89', count: 45, color: '#3B82F6' },
    { range: '70-79', count: 52, color: '#F59E0B' },
    { range: '60-69', count: 23, color: '#EF4444' },
    { range: 'Below 60', count: 8, color: '#6B7280' }
  ];

  const weeklySchedule = [
    { day: 'Mon', classes: 4 },
    { day: 'Tue', classes: 3 },
    { day: 'Wed', classes: 5 },
    { day: 'Thu', classes: 3 },
    { day: 'Fri', classes: 4 },
    { day: 'Sat', classes: 2 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Faculty Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your classes and track student performance
          </p>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Attendance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Class Attendance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student Performance Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Student Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={studentPerformanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {studentPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Schedule</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklySchedule}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="classes" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Take Attendance</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mark student attendance</p>
              </div>
            </div>
          </button>
          <button className="p-4 text-left bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Grade Assignments</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Evaluate student work</p>
              </div>
            </div>
          </button>
          <button className="p-4 text-left bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">View Schedule</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Check class timetable</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;

