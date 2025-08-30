import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from './DashboardCard';
import { Users, Briefcase, TrendingUp, Calendar, Award, Target, Building, CheckCircle } from 'lucide-react';

const TPODashboard: React.FC = () => {
  const cardData = [
    { title: 'Total Placements', value: '287', change: '+12%', trend: 'up' as const, icon: Award, color: 'bg-green-500' },
    { title: 'Companies Registered', value: '45', change: '+8', trend: 'up' as const, icon: Building, color: 'bg-blue-500' },
    { title: 'Students Trained', value: '1,245', change: '+15%', trend: 'up' as const, icon: Users, color: 'bg-purple-500' },
    { title: 'Upcoming Drives', value: '8', change: '+3', trend: 'up' as const, icon: Calendar, color: 'bg-orange-500' },
    { title: 'Average Package', value: '₹7.2L', change: '+18%', trend: 'up' as const, icon: TrendingUp, color: 'bg-teal-500' },
    { title: 'Placement Rate', value: '94%', change: '+2.1%', trend: 'up' as const, icon: Target, color: 'bg-indigo-500' }
  ];

  const driveStatusData = [
    { drive: 'TechCorp Solutions', registered: 78, appeared: 65, round1: 42, round2: 28, selected: 15 },
    { drive: 'Innovation Labs', registered: 92, appeared: 84, round1: 56, round2: 35, selected: 18 },
    { drive: 'DataFlow Systems', registered: 134, appeared: 118, round1: 78, round2: 45, selected: 22 },
    { drive: 'CloudTech Inc.', registered: 45, appeared: 38, round1: 25, round2: 18, selected: 12 }
  ];

  const trainingStatusData = [
    { department: 'Computer Science', coverage: 95, feedback: 4.8 },
    { department: 'Information Technology', coverage: 88, feedback: 4.6 },
    { department: 'Electronics & Communication', coverage: 82, feedback: 4.5 },
    { department: 'Electrical Engineering', coverage: 78, feedback: 4.3 },
    { department: 'Mechanical Engineering', coverage: 75, feedback: 4.2 }
  ];

  const placementTrends = [
    { year: '2020', placements: 245, avgPackage: 5.8 },
    { year: '2021', placements: 267, avgPackage: 6.2 },
    { year: '2022', placements: 289, avgPackage: 6.8 },
    { year: '2023', placements: 312, avgPackage: 7.2 },
    { year: '2024', placements: 287, avgPackage: 7.2 }
  ];

  const studentPerformanceData = [
    { department: 'Computer Science', excellent: 45, good: 78, average: 32, needsImprovement: 12 },
    { department: 'IT', excellent: 38, good: 65, average: 28, needsImprovement: 15 },
    { department: 'ECE', excellent: 32, good: 58, average: 35, needsImprovement: 18 },
    { department: 'EEE', excellent: 28, good: 52, average: 38, needsImprovement: 22 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Training & Placement Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive placement analytics and training management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Schedule Drive
          </button>
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
        {/* Drive Status Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Drive Status Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={driveStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="drive" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="registered" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="appeared" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="round1" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="selected" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Training Coverage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Training Coverage & Feedback
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trainingStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="department" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Area type="monotone" dataKey="coverage" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Historical Placement Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Historical Placement Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={placementTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="placements" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="avgPackage" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Student Test Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Student Test Performance by Department
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="department" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="excellent" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="good" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="average" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="needsImprovement" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Drives */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Drives</h3>
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-3">
            {[
              { company: 'TechCorp Solutions', date: 'Jan 18', positions: 25, eligible: 78 },
              { company: 'Innovation Labs', date: 'Jan 22', positions: 15, eligible: 92 },
              { company: 'DataFlow Systems', date: 'Jan 25', positions: 20, eligible: 134 },
              { company: 'CloudTech Inc.', date: 'Jan 28', positions: 12, eligible: 45 }
            ].map((drive, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {drive.company}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {drive.date} • {drive.positions} positions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {drive.eligible}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">eligible</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Training Progress</h3>
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-4">
            {[
              { module: 'Aptitude Training', progress: 85, students: 245 },
              { module: 'Technical Skills', progress: 72, students: 198 },
              { module: 'Communication Skills', progress: 91, students: 267 },
              { module: 'Interview Preparation', progress: 68, students: 156 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{item.module}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.progress}% ({item.students} students)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pending Approvals</h3>
            <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
              8 Pending
            </div>
          </div>
          <div className="space-y-3">
            {[
              { item: 'Company MOU Approvals', count: 3, urgent: true },
              { item: 'Drive Schedule Confirmations', count: 2, urgent: true },
              { item: 'Student Eligibility Reviews', count: 2, urgent: false },
              { item: 'Training Budget Requests', count: 1, urgent: false }
            ].map((approval, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${approval.urgent ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {approval.item}
                  </span>
                </div>
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-semibold">
                  {approval.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TPODashboard;