import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from './DashboardCard';
import { Briefcase, Building, Users, DollarSign, Calendar, TrendingUp, Award, Target } from 'lucide-react';

const PlacementsDashboard: React.FC = () => {
  const cardData = [
    { title: 'Total Placements', value: '287', change: '+12%', trend: 'up' as const, icon: Award, color: 'bg-green-500' },
    { title: 'Companies Registered', value: '45', change: '+8', trend: 'up' as const, icon: Building, color: 'bg-blue-500' },
    { title: 'Students Trained', value: '1,245', change: '+15%', trend: 'up' as const, icon: Users, color: 'bg-purple-500' },
    { title: 'Upcoming Drives', value: '8', change: '+3', trend: 'up' as const, icon: Calendar, color: 'bg-orange-500' },
    { title: 'Average Package', value: '₹7.2L', change: '+18%', trend: 'up' as const, icon: TrendingUp, color: 'bg-teal-500' },
    { title: 'Placement Rate', value: '94%', change: '+2.1%', trend: 'up' as const, icon: Target, color: 'bg-indigo-500' }
  ];

  const placementTrends = [
    { year: '2020', placements: 245, companies: 38, avgPackage: 5.8 },
    { year: '2021', placements: 267, companies: 42, avgPackage: 6.2 },
    { year: '2022', placements: 289, companies: 47, avgPackage: 6.8 },
    { year: '2023', placements: 312, companies: 52, avgPackage: 7.2 },
    { year: '2024', placements: 287, companies: 45, avgPackage: 7.2 }
  ];

  const departmentPlacements = [
    { department: 'Computer Science', placed: 95, total: 100, percentage: 95 },
    { department: 'Information Technology', placed: 88, total: 92, percentage: 96 },
    { department: 'Electronics & Communication', placed: 78, total: 85, percentage: 92 },
    { department: 'Electrical Engineering', placed: 82, total: 90, percentage: 91 },
    { department: 'Mechanical Engineering', placed: 72, total: 80, percentage: 90 }
  ];

  const companyCategories = [
    { name: 'IT Services', count: 18, color: '#3B82F6' },
    { name: 'Product Companies', count: 12, color: '#10B981' },
    { name: 'Startups', count: 8, color: '#F59E0B' },
    { name: 'Consulting', count: 5, color: '#EF4444' },
    { name: 'Others', count: 2, color: '#8B5CF6' }
  ];

  const upcomingDrives = [
    { company: 'TechCorp Solutions', date: 'Jan 18, 2025', positions: 25, package: '₹8-12L', eligible: 78, status: 'Open' },
    { company: 'Innovation Labs', date: 'Jan 22, 2025', positions: 15, package: '₹7-10L', eligible: 92, status: 'Registration' },
    { company: 'DataFlow Systems', date: 'Jan 25, 2025', positions: 20, package: '₹6-9L', eligible: 134, status: 'Upcoming' },
    { company: 'CloudTech Inc.', date: 'Jan 28, 2025', positions: 12, package: '₹9-15L', eligible: 45, status: 'Scheduled' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
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
              <Line type="monotone" dataKey="placements" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="avgPackage" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department-wise Placements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Department-wise Placement Rate
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPlacements}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="department" stroke="#6B7280" />
              <YAxis domain={[80, 100]} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="percentage" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Company Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
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

        {/* Upcoming Drives */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Placement Drives
          </h3>
          <div className="space-y-3">
            {upcomingDrives.map((drive, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{drive.company}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {drive.date} • {drive.positions} positions • {drive.package}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{drive.eligible}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">eligible</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementsDashboard;