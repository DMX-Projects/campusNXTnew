import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from './DashboardCard';
import { Building2, Users, DollarSign, TrendingUp, Award, AlertTriangle, 
         FileText, Calendar, CheckCircle, Target } from 'lucide-react';

const CollegeSecretaryDashboard: React.FC = () => {
  const cardData = [
    { title: 'Total Campuses', value: '3', change: '+1', trend: 'up' as const, icon: Building2, color: 'bg-blue-500' },
    { title: 'Total Students', value: '8,547', change: '+245', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Total Faculty', value: '486', change: '+12', trend: 'up' as const, icon: Users, color: 'bg-purple-500' },
    { title: 'Annual Revenue', value: '₹125Cr', change: '+18%', trend: 'up' as const, icon: DollarSign, color: 'bg-orange-500' },
    { title: 'Board Resolutions', value: '24', change: '+6', trend: 'up' as const, icon: FileText, color: 'bg-teal-500' },
    { title: 'Compliance Score', value: '98%', change: '+2%', trend: 'up' as const, icon: Award, color: 'bg-indigo-500' }
  ];

  const institutionalPerformance = [
    { campus: 'Main Campus', students: 4200, faculty: 280, revenue: 65, satisfaction: 94 },
    { campus: 'North Campus', students: 2800, faculty: 150, revenue: 38, satisfaction: 91 },
    { campus: 'South Campus', students: 1547, faculty: 56, revenue: 22, satisfaction: 89 }
  ];

  const boardMeetingData = [
    { month: 'Aug', resolutions: 4, implemented: 4, pending: 0 },
    { month: 'Sep', resolutions: 3, implemented: 3, pending: 0 },
    { month: 'Oct', resolutions: 5, implemented: 4, pending: 1 },
    { month: 'Nov', resolutions: 6, implemented: 5, pending: 1 },
    { month: 'Dec', resolutions: 4, implemented: 3, pending: 1 },
    { month: 'Jan', resolutions: 2, implemented: 1, pending: 1 }
  ];

  const strategicInitiatives = [
    { initiative: 'Digital Transformation', progress: 85, budget: 50, spent: 42 },
    { initiative: 'Infrastructure Expansion', progress: 65, budget: 120, spent: 78 },
    { initiative: 'Faculty Development', progress: 92, budget: 25, spent: 23 },
    { initiative: 'Research Enhancement', progress: 78, budget: 80, spent: 62 }
  ];

  const complianceData = [
    { category: 'Academic Standards', score: 98, color: '#10B981' },
    { category: 'Financial Compliance', score: 96, color: '#3B82F6' },
    { category: 'Safety Regulations', score: 99, color: '#F59E0B' },
    { category: 'Environmental Standards', score: 94, color: '#EF4444' },
    { category: 'Legal Requirements', score: 100, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Executive Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Strategic oversight and institutional governance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Board Report
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Strategic Plan
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
        {/* Institutional Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Multi-Campus Performance Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={institutionalPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="campus" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="students" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="faculty" fill="#10B981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Board Resolutions Tracking */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Board Resolutions Implementation
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={boardMeetingData}>
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
              <Line type="monotone" dataKey="resolutions" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="implemented" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
              <Line type="monotone" dataKey="pending" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Strategic Initiatives Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Strategic Initiatives Progress
          </h3>
          <div className="space-y-4">
            {strategicInitiatives.map((initiative, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{initiative.initiative}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {initiative.progress}% • ₹{initiative.spent}L/₹{initiative.budget}L
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${initiative.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Institutional Compliance Score
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={complianceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="score"
                label={({ category, score }) => `${category}: ${score}%`}
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Board Approvals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pending Board Approvals</h3>
            <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-semibold">
              5 Pending
            </div>
          </div>
          <div className="space-y-3">
            {[
              { item: 'New Campus Expansion Plan', priority: 'high', date: 'Jan 20' },
              { item: 'Faculty Salary Revision', priority: 'high', date: 'Jan 22' },
              { item: 'Research Grant Allocation', priority: 'medium', date: 'Jan 25' },
              { item: 'Infrastructure Budget', priority: 'medium', date: 'Jan 28' },
              { item: 'Policy Amendment', priority: 'low', date: 'Feb 1' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.priority === 'high' ? 'bg-red-500' :
                    item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.item}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Financial Overview</h3>
            <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-4">
            {[
              { metric: 'Annual Revenue', value: '₹125Cr', change: '+18%', positive: true },
              { metric: 'Operating Expenses', value: '₹98Cr', change: '+12%', positive: false },
              { metric: 'Net Profit', value: '₹27Cr', change: '+35%', positive: true },
              { metric: 'ROI', value: '22%', change: '+4%', positive: true }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.metric}</span>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">{item.value}</p>
                  <p className={`text-xs ${item.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {item.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional KPIs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Key Performance Indicators</h3>
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-4">
            {[
              { kpi: 'Student Satisfaction', score: 94, target: 90 },
              { kpi: 'Faculty Retention', score: 96, target: 95 },
              { kpi: 'Placement Rate', score: 92, target: 90 },
              { kpi: 'Research Output', score: 88, target: 85 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{item.kpi}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.score}% (Target: {item.target}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.score >= item.target ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${(item.score / 100) * 100}%` }}
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

export default CollegeSecretaryDashboard;