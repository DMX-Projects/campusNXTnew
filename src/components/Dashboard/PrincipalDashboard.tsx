import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
         LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from './DashboardCard';
import { Users, GraduationCap, DollarSign, BookOpen, Award, Calendar, 
         TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const PrincipalDashboard: React.FC = () => {
  const cardData = [
    { title: 'Total Students', value: '2,847', change: '+5.2%', trend: 'up' as const, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Faculty', value: '186', change: '+2.1%', trend: 'up' as const, icon: GraduationCap, color: 'bg-green-500' },
    { title: 'Revenue (This Month)', value: '₹45.2L', change: '+8.5%', trend: 'up' as const, icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Course Completion', value: '78%', change: '+3.2%', trend: 'up' as const, icon: BookOpen, color: 'bg-orange-500' },
    { title: 'Placement Rate', value: '94%', change: '+1.8%', trend: 'up' as const, icon: Award, color: 'bg-teal-500' },
    { title: 'Pending Approvals', value: '12', change: '-2', trend: 'down' as const, icon: Clock, color: 'bg-red-500' }
  ];

  const attendanceData = [
    { month: 'Jan', students: 92, faculty: 96 },
    { month: 'Feb', students: 89, faculty: 94 },
    { month: 'Mar', students: 94, faculty: 97 },
    { month: 'Apr', students: 91, faculty: 95 },
    { month: 'May', students: 88, faculty: 93 },
    { month: 'Jun', students: 93, faculty: 98 }
  ];

  const departmentData = [
    { name: 'Computer Science', students: 850, color: '#3B82F6' },
    { name: 'Electrical Eng.', students: 620, color: '#10B981' },
    { name: 'Mechanical Eng.', students: 580, color: '#F59E0B' },
    { name: 'Civil Engineering', students: 490, color: '#EF4444' },
    { name: 'Others', students: 307, color: '#8B5CF6' }
  ];

  const revenueData = [
    { month: 'Jan', tuition: 42, hostel: 8, transport: 3, other: 2 },
    { month: 'Feb', tuition: 41, hostel: 7.5, transport: 3.2, other: 1.8 },
    { month: 'Mar', tuition: 43, hostel: 8.2, transport: 3.1, other: 2.2 },
    { month: 'Apr', tuition: 44, hostel: 8.5, transport: 3.3, other: 2.1 },
    { month: 'May', tuition: 45, hostel: 9, transport: 3.5, other: 2.5 },
    { month: 'Jun', tuition: 46, hostel: 9.2, transport: 3.4, other: 2.3 }
  ];

  const resultAnalysis = [
    { semester: 'Sem 1', distinction: 45, firstClass: 78, secondClass: 92, pass: 23, fail: 8 },
    { semester: 'Sem 2', distinction: 52, firstClass: 85, secondClass: 89, pass: 18, fail: 6 },
    { semester: 'Sem 3', distinction: 48, firstClass: 82, secondClass: 94, pass: 21, fail: 5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Principal Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Complete overview of institutional performance and metrics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Attendance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="faculty" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Student Distribution by Department
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="students"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Revenue Analysis (Lakhs ₹)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Area type="monotone" dataKey="tuition" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="hostel" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="transport" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Area type="monotone" dataKey="other" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Result Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Academic Performance Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resultAnalysis}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="semester" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="distinction" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="firstClass" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="secondClass" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pass" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="fail" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pending Approvals</h3>
            <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
              12 Pending
            </div>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Faculty Leave Applications', count: 4, urgent: true },
              { title: 'Budget Requests', count: 3, urgent: false },
              { title: 'Infrastructure Proposals', count: 2, urgent: true },
              { title: 'Academic Policy Changes', count: 3, urgent: false }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  {item.urgent ? 
                    <AlertTriangle className="w-4 h-4 text-red-500" /> : 
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  }
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </span>
                </div>
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-semibold">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Events</h3>
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-3">
            {[
              { event: 'Board Meeting', date: 'Jan 15', type: 'meeting' },
              { event: 'Annual Day Preparations', date: 'Jan 18', type: 'event' },
              { event: 'Faculty Development Program', date: 'Jan 20', type: 'training' },
              { event: 'Mid-Semester Exams', date: 'Jan 25', type: 'exam' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.event}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.date}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                  item.type === 'event' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                  item.type === 'training' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                }`}>
                  {item.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Budget Overview</h3>
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-4">
            {[
              { category: 'Faculty Salaries', budget: 120, spent: 98, color: 'bg-blue-500' },
              { category: 'Infrastructure', budget: 80, spent: 65, color: 'bg-green-500' },
              { category: 'Equipment', budget: 60, spent: 42, color: 'bg-purple-500' },
              { category: 'Maintenance', budget: 40, spent: 35, color: 'bg-orange-500' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{item.category}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ₹{item.spent}L / ₹{item.budget}L
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${(item.spent / item.budget) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;