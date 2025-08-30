import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Building2, Users, DollarSign, Calendar, Search, Filter, Download, Plus } from 'lucide-react';

const Administration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const employeeData = [
    { department: 'Computer Science', faculty: 28, staff: 5, total: 33 },
    { department: 'Electrical Engineering', faculty: 22, staff: 4, total: 26 },
    { department: 'Mechanical Engineering', faculty: 20, staff: 3, total: 23 },
    { department: 'Civil Engineering', faculty: 18, staff: 3, total: 21 },
    { department: 'Administration', faculty: 0, staff: 15, total: 15 }
  ];

  const payrollData = [
    { month: 'Aug', faculty: 85, staff: 35, total: 120 },
    { month: 'Sep', faculty: 85, staff: 35, total: 120 },
    { month: 'Oct', faculty: 87, staff: 36, total: 123 },
    { month: 'Nov', faculty: 87, staff: 36, total: 123 },
    { month: 'Dec', faculty: 89, staff: 37, total: 126 },
    { month: 'Jan', faculty: 89, staff: 37, total: 126 }
  ];

  const feeStatusData = [
    { status: 'Paid', amount: 420, color: '#10B981' },
    { status: 'Pending', amount: 85, color: '#F59E0B' },
    { status: 'Overdue', amount: 25, color: '#EF4444' }
  ];

  const admissionStats = [
    { program: 'B.Tech CSE', applications: 1200, admitted: 120, enrolled: 108 },
    { program: 'B.Tech EEE', applications: 800, admitted: 80, enrolled: 72 },
    { program: 'B.Tech ME', applications: 600, admitted: 60, enrolled: 54 },
    { program: 'B.Tech CE', applications: 500, admitted: 50, enrolled: 45 }
  ];

  const tabs = [
    { id: 'overview', name: 'Campus Overview' },
    { id: 'employees', name: 'Employee Management' },
    { id: 'fees', name: 'Fee Management' },
    { id: 'admissions', name: 'Admissions' },
    { id: 'facilities', name: 'Facilities' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Administration Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive campus administration and operations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
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
                {/* Employee Distribution */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Department-wise Employee Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={employeeData}>
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
                      <Bar dataKey="faculty" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="staff" fill="#10B981" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Payroll Trends */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Monthly Payroll Trends (Lakhs ₹)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={payrollData}>
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
                      <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Campus Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Students', value: '2,847', icon: Users, color: 'bg-blue-500' },
                  { title: 'Total Faculty', value: '186', icon: Users, color: 'bg-green-500' },
                  { title: 'Classrooms', value: '45', icon: Building2, color: 'bg-purple-500' },
                  { title: 'Laboratories', value: '18', icon: Building2, color: 'bg-orange-500' }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Fee Management Overview
                </h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Process Payments
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Fee Status Distribution */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                    Fee Collection Status (Lakhs ₹)
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={feeStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="amount"
                        label={({ status, amount }) => `${status}: ₹${amount}L`}
                      >
                        {feeStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Admission Statistics */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                    Current Year Admission Statistics
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={admissionStats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="program" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: 'none', 
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="applications" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="admitted" fill="#10B981" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="enrolled" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Administration;