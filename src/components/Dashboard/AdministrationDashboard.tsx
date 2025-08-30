import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from './DashboardCard';
import { Building2, Users, DollarSign, Calendar, AlertTriangle, CheckCircle, TrendingUp, Clock } from 'lucide-react';

const AdministrationDashboard: React.FC = () => {
  const cardData = [
    { title: 'Total Employees', value: '186', change: '+3', trend: 'up' as const, icon: Users, color: 'bg-blue-500' },
    { title: 'Employee Attendance', value: '94.5%', change: '+1.2%', trend: 'up' as const, icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Monthly Payroll', value: '₹1.2Cr', change: '+5.8%', trend: 'up' as const, icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Pending Leaves', value: '12', change: '-3', trend: 'down' as const, icon: Clock, color: 'bg-orange-500' },
    { title: 'Fee Collection', value: '₹45.2L', change: '+8.5%', trend: 'up' as const, icon: TrendingUp, color: 'bg-teal-500' },
    { title: 'Pending Approvals', value: '8', change: '-2', trend: 'down' as const, icon: AlertTriangle, color: 'bg-red-500' }
  ];

  const employeeAttendanceData = [
    { department: 'Computer Science', present: 28, absent: 2, percentage: 93.3 },
    { department: 'Electrical Engineering', present: 22, absent: 1, percentage: 95.7 },
    { department: 'Mechanical Engineering', present: 20, absent: 3, percentage: 87.0 },
    { department: 'Civil Engineering', present: 18, absent: 1, percentage: 94.7 },
    { department: 'Administration', present: 15, absent: 0, percentage: 100.0 }
  ];

  const feeCollectionData = [
    { month: 'Aug', tuition: 42, hostel: 8, transport: 3, other: 2 },
    { month: 'Sep', tuition: 41, hostel: 7.5, transport: 3.2, other: 1.8 },
    { month: 'Oct', tuition: 43, hostel: 8.2, transport: 3.1, other: 2.2 },
    { month: 'Nov', tuition: 44, hostel: 8.5, transport: 3.3, other: 2.1 },
    { month: 'Dec', tuition: 45, hostel: 9, transport: 3.5, other: 2.5 },
    { month: 'Jan', tuition: 46, hostel: 9.2, transport: 3.4, other: 2.3 }
  ];

  const expenditureData = [
    { category: 'Salaries', amount: 120, color: '#3B82F6' },
    { category: 'Infrastructure', amount: 45, color: '#10B981' },
    { category: 'Utilities', amount: 25, color: '#F59E0B' },
    { category: 'Equipment', amount: 30, color: '#EF4444' },
    { category: 'Maintenance', amount: 18, color: '#8B5CF6' },
    { category: 'Others', amount: 12, color: '#6B7280' }
  ];

  const admissionTrends = [
    { year: '2020', applications: 3200, admitted: 800, enrolled: 720 },
    { year: '2021', applications: 3450, admitted: 850, enrolled: 765 },
    { year: '2022', applications: 3680, admitted: 900, enrolled: 810 },
    { year: '2023', applications: 3920, admitted: 950, enrolled: 855 },
    { year: '2024', applications: 4150, admitted: 1000, enrolled: 900 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Administration Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Campus operations and administrative oversight
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Generate Report
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Process Payroll
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
        {/* Employee Attendance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Department-wise Employee Attendance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employeeAttendanceData}>
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
              <Bar dataKey="present" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="absent" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Collection Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Fee Collection (Lakhs ₹)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={feeCollectionData}>
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

        {/* Expenditure Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Expenditure Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenditureData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="amount"
                label={({ category, amount }) => `${category}: ₹${amount}L`}
              >
                {expenditureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Admission Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            5-Year Admission Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={admissionTrends}>
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
              <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="admitted" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
              <Line type="monotone" dataKey="enrolled" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pending Tasks</h3>
            <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-semibold">
              8 Pending
            </div>
          </div>
          <div className="space-y-3">
            {[
              { task: 'Employee Leave Approvals', count: 3, priority: 'high' },
              { task: 'Fee Structure Updates', count: 2, priority: 'medium' },
              { task: 'Classroom Allocations', count: 1, priority: 'high' },
              { task: 'Vendor Payments', count: 2, priority: 'low' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.priority === 'high' ? 'bg-red-500' :
                    item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.task}
                  </span>
                </div>
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-semibold">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Campus at a Glance</h3>
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-4">
            {[
              { metric: 'Total Classrooms', value: '45', status: 'active' },
              { metric: 'Laboratory Facilities', value: '18', status: 'active' },
              { metric: 'Library Capacity', value: '500', status: 'active' },
              { metric: 'Hostel Occupancy', value: '85%', status: 'high' },
              { metric: 'Transport Routes', value: '12', status: 'active' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.metric}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'active' ? 'bg-green-500' :
                    item.status === 'high' ? 'bg-orange-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Budget Summary</h3>
            <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-4">
            {[
              { category: 'Allocated', amount: 250, color: 'bg-blue-500' },
              { category: 'Utilized', amount: 185, color: 'bg-green-500' },
              { category: 'Balance', amount: 65, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{item.category}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ₹{item.amount}L
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${(item.amount / 250) * 100}%` }}
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

export default AdministrationDashboard;