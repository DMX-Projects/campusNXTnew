import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, RadialBarChart, RadialBar } from 'recharts';
import DashboardCard from './DashboardCard';
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Student Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your academic progress and performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            View Full Report
          </button>
        </div>
      </div>

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
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Subject Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData} layout="horizontal" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" domain={[0, 100]} stroke="#6B7280" />
              <YAxis dataKey="subject" type="category" stroke="#6B7280" width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="marks" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Attendance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis domain={[75, 100]} stroke="#6B7280" />
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

      {/* Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Recent Activities
          </h3>
          <div className="space-y-3">
            {[
              { activity: 'Submitted Assignment: Binary Search Tree', time: '2 hours ago', type: 'assignment' },
              { activity: 'Attended Lecture: Algorithms', time: '1 day ago', type: 'attendance' },
              { activity: 'Downloaded Study Material: Database Notes', time: '2 days ago', type: 'study' },
              { activity: 'Booked Library Book: Clean Code', time: '3 days ago', type: 'library' }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.type === 'assignment' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                  item.type === 'attendance' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                  item.type === 'study' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                }`}>
                  {item.type === 'assignment' ? <BookOpen className="w-4 h-4" /> :
                   item.type === 'attendance' ? <CheckCircle className="w-4 h-4" /> :
                   item.type === 'study' ? <BookOpen className="w-4 h-4" /> :
                   <BookOpen className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.activity}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CGPA Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            CGPA Progress
          </h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={cgpaData}>
                <RadialBar
                  minAngle={15}
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  clockWise
                  dataKey="value"
                  fill="#3B82F6"
                />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-current text-2xl font-bold text-gray-900 dark:text-white">
                  8.5
                </text>
                <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="fill-current text-sm text-gray-500 dark:text-gray-400">
                  CGPA
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">A</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Grade</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">3rd</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Class Rank</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;