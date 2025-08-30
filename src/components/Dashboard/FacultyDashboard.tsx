import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
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
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Take Attendance
          </button>
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
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Class-wise Attendance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classAttendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="class" stroke="#6B7280" />
              <YAxis domain={[75, 100]} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="attendance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student Performance Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Student Performance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={studentPerformanceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ range, count }) => `${range}: ${count}`}
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

      {/* Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Weekly Teaching Schedule
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklySchedule}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="classes" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Today's Classes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Today's Classes</h3>
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-3">
            {[
              { subject: 'Data Structures', time: '9:00 - 10:00 AM', room: 'CS-101', students: 42 },
              { subject: 'Algorithms Lab', time: '11:00 AM - 1:00 PM', room: 'CS-Lab1', students: 38 },
              { subject: 'Database Systems', time: '2:00 - 3:00 PM', room: 'CS-102', students: 45 },
              { subject: 'Faculty Meeting', time: '4:00 - 5:00 PM', room: 'Conference', students: 0 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.subject}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.time} • {item.room} {item.students > 0 && `• ${item.students} students`}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.students > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {item.students > 0 ? 'Class' : 'Meeting'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;