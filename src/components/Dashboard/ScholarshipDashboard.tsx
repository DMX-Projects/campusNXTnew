import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import DashboardCard from './DashboardCard';
import { Award, Users, DollarSign, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

const ScholarshipDashboard: React.FC = () => {
  const cardData = [
    { title: 'Active Scholarships', value: '24', change: '+3', trend: 'up' as const, icon: Award, color: 'bg-blue-500' },
    { title: 'Total Beneficiaries', value: '456', change: '+28', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Amount Disbursed', value: '₹1.2Cr', change: '+15%', trend: 'up' as const, icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Pending Applications', value: '89', change: '+12', trend: 'up' as const, icon: Calendar, color: 'bg-orange-500' },
    { title: 'Approval Rate', value: '78%', change: '+5%', trend: 'up' as const, icon: CheckCircle, color: 'bg-teal-500' },
    { title: 'Renewal Rate', value: '92%', change: '+3%', trend: 'up' as const, icon: TrendingUp, color: 'bg-indigo-500' }
  ];

  const scholarshipTypes = [
    { type: 'Merit-based', beneficiaries: 180, amount: 45, color: '#3B82F6' },
    { type: 'Need-based', beneficiaries: 145, amount: 38, color: '#10B981' },
    { type: 'Sports', beneficiaries: 65, amount: 18, color: '#F59E0B' },
    { type: 'Cultural', beneficiaries: 42, amount: 12, color: '#EF4444' },
    { type: 'Research', beneficiaries: 24, amount: 9, color: '#8B5CF6' }
  ];

  const disbursementTrends = [
    { month: 'Aug', amount: 8.5, beneficiaries: 420 },
    { month: 'Sep', amount: 9.2, beneficiaries: 435 },
    { month: 'Oct', amount: 10.1, beneficiaries: 448 },
    { month: 'Nov', amount: 10.8, beneficiaries: 452 },
    { month: 'Dec', amount: 11.5, beneficiaries: 456 },
    { month: 'Jan', amount: 12.0, beneficiaries: 456 }
  ];

  const departmentWiseData = [
    { department: 'Computer Science', applications: 125, approved: 98, disbursed: 85 },
    { department: 'Electrical Engineering', applications: 89, approved: 72, disbursed: 68 },
    { department: 'Mechanical Engineering', applications: 76, approved: 58, disbursed: 52 },
    { department: 'Civil Engineering', applications: 65, approved: 48, disbursed: 45 }
  ];

  const applicationStatus = [
    { status: 'Approved', count: 276, color: '#10B981' },
    { status: 'Under Review', count: 89, color: '#F59E0B' },
    { status: 'Rejected', count: 45, color: '#EF4444' },
    { status: 'Pending Documents', count: 32, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Scholarship Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Financial aid and scholarship program oversight
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Process Applications
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
        {/* Scholarship Types Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Scholarship Types & Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scholarshipTypes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="type" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="beneficiaries" fill="#3B82F6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Disbursement Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Disbursement Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={disbursementTrends}>
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
              <Line type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
              <Line type="monotone" dataKey="beneficiaries" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department-wise Applications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Department-wise Scholarship Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentWiseData}>
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
              <Bar dataKey="applications" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="approved" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="disbursed" fill="#3B82F6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Application Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Application Status Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applicationStatus}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ status, count }) => `${status}: ${count}`}
              >
                {applicationStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Applications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pending Applications</h3>
            <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-semibold">
              89 Pending
            </div>
          </div>
          <div className="space-y-3">
            {[
              { student: 'Rajesh Kumar', type: 'Merit-based', amount: '₹25,000', days: '5 days ago' },
              { student: 'Priya Sharma', type: 'Need-based', amount: '₹30,000', days: '3 days ago' },
              { student: 'Amit Singh', type: 'Sports', amount: '₹15,000', days: '7 days ago' },
              { student: 'Sneha Patel', type: 'Cultural', amount: '₹20,000', days: '2 days ago' }
            ].map((application, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{application.student}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {application.type} • Applied {application.days}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600 dark:text-blue-400">{application.amount}</p>
                  <button className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Scholarship Programs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Scholarship Programs</h3>
            <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-4">
            {[
              { program: 'Academic Excellence Award', beneficiaries: 85, budget: '₹21.25L', utilization: 95 },
              { program: 'Financial Aid Program', beneficiaries: 72, budget: '₹18L', utilization: 88 },
              { program: 'Sports Scholarship', beneficiaries: 35, budget: '₹8.75L', utilization: 92 },
              { program: 'Research Grant', beneficiaries: 18, budget: '₹4.5L', utilization: 85 }
            ].map((program, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{program.program}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {program.beneficiaries} students
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Budget: {program.budget}</span>
                  <span>Utilization: {program.utilization}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${program.utilization}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activities</h3>
            <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-3">
            {[
              { activity: 'Scholarship Disbursed', student: 'Vikram Reddy', amount: '₹25,000', time: '2 hours ago', type: 'disbursement' },
              { activity: 'Application Approved', student: 'Kavya Nair', amount: '₹30,000', time: '4 hours ago', type: 'approval' },
              { activity: 'Document Verified', student: 'Rohit Gupta', amount: '₹20,000', time: '6 hours ago', type: 'verification' },
              { activity: 'New Application', student: 'Anita Joshi', amount: '₹35,000', time: '1 day ago', type: 'application' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'disbursement' ? 'bg-green-500' :
                  activity.type === 'approval' ? 'bg-blue-500' :
                  activity.type === 'verification' ? 'bg-yellow-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.activity}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.student} • {activity.amount} • {activity.time}
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

export default ScholarshipDashboard;