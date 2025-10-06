import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, RadialBarChart, RadialBar } from 'recharts';
import { DashboardCard } from '../shared';
import { BookOpen, Calendar, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const cardData = [
    { title: 'Current CGPA', value: '8.5', change: '+0.2', trend: 'up' as const, icon: Award, color: 'bg-green-500' },
    { title: 'Attendance', value: '92%', change: '-1.5%', trend: 'down' as const, icon: CheckCircle, color: 'bg-blue-500' },
    { title: 'Pending Assignments', value: '3', change: '-2', trend: 'down' as const, icon: BookOpen, color: 'bg-orange-500' },
    { title: 'Upcoming Exams', value: '2', change: '0', trend: 'neutral' as const, icon: Clock, color: 'bg-purple-500' }
  ];

  const performanceData = [
    { subject: 'Data Structures', marks: 88, maxMarks: 100 },
    { subject: 'Algorithms', marks: 92, maxMarks: 100 },
    { subject: 'Database Systems', marks: 85, maxMarks: 100 },
    { subject: 'Computer Networks', marks: 90, maxMarks: 100 },
    { subject: 'Software Engineering', marks: 87, maxMarks: 100 }
  ];

  const attendanceData = [
    { month: 'Aug', percentage: 95 },
    { month: 'Sep', percentage: 88 },
    { month: 'Oct', percentage: 92 },
    { month: 'Nov', percentage: 89 },
    { month: 'Dec', percentage: 94 },
    { month: 'Jan', percentage: 92 }
  ];

  const cgpaData = [
    { name: 'Current CGPA', value: 85, fill: '#3B82F6' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="marks" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="percentage" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CGPA Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">CGPA Progress</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" data={cgpaData}>
                <RadialBar dataKey="value" fill="#3B82F6" />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">8.5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current CGPA</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">View Assignments</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check pending assignments</p>
                </div>
              </div>
            </button>
            <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">View Timetable</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check class schedule</p>
                </div>
              </div>
            </button>
            <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">View Results</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check exam results</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

