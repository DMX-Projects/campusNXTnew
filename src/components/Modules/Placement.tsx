import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Briefcase, Building, Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import DashboardCard from '../Dashboard/DashboardCard';

const Placement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const cardData = [
    { title: 'Total Placements', value: '287', change: '+12%', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Companies Visited', value: '45', change: '+8', trend: 'up' as const, icon: Building, color: 'bg-blue-500' },
    { title: 'Average Package', value: '₹7.2L', change: '+15%', trend: 'up' as const, icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Placement Rate', value: '94%', change: '+2.1%', trend: 'up' as const, icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const placementTrends = [
    { year: '2020', placements: 245, companies: 38, avgPackage: 5.8 },
    { year: '2021', placements: 267, companies: 42, avgPackage: 6.2 },
    { year: '2022', placements: 289, companies: 47, avgPackage: 6.8 },
    { year: '2023', placements: 312, companies: 52, avgPackage: 7.2 },
    { year: '2024', placements: 287, companies: 45, avgPackage: 7.2 }
  ];

  const departmentPlacements = [
    { department: 'Computer Science', placed: 95, total: 100, color: '#3B82F6' },
    { department: 'Information Technology', placed: 88, total: 92, color: '#10B981' },
    { department: 'Electronics & Communication', placed: 78, total: 85, color: '#F59E0B' },
    { department: 'Electrical Engineering', placed: 82, total: 90, color: '#EF4444' },
    { department: 'Mechanical Engineering', placed: 72, total: 80, color: '#8B5CF6' }
  ];

  const companyCategories = [
    { name: 'IT Services', count: 18, color: '#3B82F6' },
    { name: 'Product Companies', count: 12, color: '#10B981' },
    { name: 'Startups', count: 8, color: '#F59E0B' },
    { name: 'Consulting', count: 5, color: '#EF4444' },
    { name: 'Others', count: 2, color: '#8B5CF6' }
  ];

  const upcomingDrives = [
    { company: 'TechCorp Solutions', date: 'Jan 18, 2025', positions: 25, package: '₹8-12L', eligible: 78 },
    { company: 'Innovation Labs', date: 'Jan 22, 2025', positions: 15, package: '₹7-10L', eligible: 92 },
    { company: 'DataFlow Systems', date: 'Jan 25, 2025', positions: 20, package: '₹6-9L', eligible: 134 },
    { company: 'CloudTech Inc.', date: 'Jan 28, 2025', positions: 12, package: '₹9-15L', eligible: 45 }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'drives', name: 'Upcoming Drives' },
    { id: 'companies', name: 'Company Database' },
    { id: 'reports', name: 'Reports & Analytics' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Placement Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage campus recruitment activities
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Placement Trends */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    5-Year Placement Trends
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
                      <Line type="monotone" dataKey="placements" stroke="#3B82F6" strokeWidth={3} />
                      <Line type="monotone" dataKey="companies" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Company Categories */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Company Categories
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={companyCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="count"
                        label={({ name, count }) => `${name}: ${count}`}
                      >
                        {companyCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Department Placement Stats */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Department-wise Placement Statistics
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentPlacements}>
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
                    <Bar dataKey="placed" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="total" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'drives' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Upcoming Placement Drives
                </h3>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Add New Drive
                </button>
              </div>

              <div className="grid gap-4">
                {upcomingDrives.map((drive, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                            {drive.company}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {drive.positions} positions available
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{drive.date}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Package</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{drive.package}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Eligible</p>
                          <p className="font-semibold text-blue-600 dark:text-blue-400">{drive.eligible} students</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Placement;