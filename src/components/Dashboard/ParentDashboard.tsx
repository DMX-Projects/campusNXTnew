import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { User, BookOpen, Calendar, Award, AlertCircle, DollarSign } from 'lucide-react';

const ParentDashboard: React.FC = () => {
  const cardData = [
    { title: "Child's CGPA", value: '8.5', change: '+0.3', trend: 'up' as const, icon: Award, color: 'bg-green-500' },
    { title: "Child's Attendance", value: '92%', change: '-1.2%', trend: 'down' as const, icon: User, color: 'bg-blue-500' },
    { title: 'Fee Status', value: 'Paid', change: '', trend: 'neutral' as const, icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Pending Assignments', value: '2', change: '-1', trend: 'down' as const, icon: BookOpen, color: 'bg-orange-500' }
  ];

  const attendanceData = [
    { month: 'Aug', percentage: 95 },
    { month: 'Sep', percentage: 88 },
    { month: 'Oct', percentage: 92 },
    { month: 'Nov', percentage: 89 },
    { month: 'Dec', percentage: 94 },
    { month: 'Jan', percentage: 92 }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', score: 88 },
    { subject: 'Physics', score: 92 },
    { subject: 'Chemistry', score: 85 },
    { subject: 'Programming', score: 94 },
    { subject: 'English', score: 87 }
  ];

  const feeBreakdown = [
    { category: 'Tuition Fee', amount: 75000, color: '#3B82F6' },
    { category: 'Laboratory Fee', amount: 15000, color: '#10B981' },
    { category: 'Library Fee', amount: 5000, color: '#F59E0B' },
    { category: 'Development Fund', amount: 10000, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Parent Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor your child's academic progress and activities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Contact Teacher
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
        {/* Attendance Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Attendance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
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
                stroke="#3B82F6" 
                strokeWidth={3} 
                dot={{ fill: '#3B82F6', r: 5 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Subject-wise Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="subject" stroke="#6B7280" />
              <YAxis domain={[0, 100]} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="score" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Fee Breakdown (Current Semester)
          </h3>
          <div className="space-y-4">
            {feeBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.category}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  ₹{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-white">Total</span>
                <span className="font-bold text-lg text-green-600 dark:text-green-400">
                  ₹{feeBreakdown.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities & Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Notifications</h3>
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-3">
            {[
              { 
                title: 'Assignment Submitted', 
                desc: 'Data Structures project submitted successfully',
                time: '2 hours ago',
                type: 'success'
              },
              { 
                title: 'Parent-Teacher Meeting', 
                desc: 'Scheduled for January 20th at 3:00 PM',
                time: '1 day ago',
                type: 'info'
              },
              { 
                title: 'Fee Reminder', 
                desc: 'Next semester fee due by January 30th',
                time: '2 days ago',
                type: 'warning'
              },
              { 
                title: 'Exam Results', 
                desc: 'Mid-semester results have been published',
                time: '3 days ago',
                type: 'success'
              }
            ].map((notification, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'warning' ? 'bg-yellow-500' :
                  notification.type === 'info' ? 'bg-blue-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {notification.desc}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;