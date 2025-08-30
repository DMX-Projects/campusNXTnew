import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from './DashboardCard';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, Calendar, CreditCard } from 'lucide-react';

const AccountsDashboard: React.FC = () => {
  const cardData = [
    { title: 'Total Revenue', value: '₹45.2L', change: '+8.5%', trend: 'up' as const, icon: DollarSign, color: 'bg-green-500' },
    { title: 'Outstanding Dues', value: '₹3.8L', change: '-12%', trend: 'down' as const, icon: AlertTriangle, color: 'bg-red-500' },
    { title: 'Monthly Collection', value: '₹38.4L', change: '+5.2%', trend: 'up' as const, icon: TrendingUp, color: 'bg-blue-500' },
    { title: 'Pending Approvals', value: '15', change: '-3', trend: 'down' as const, icon: CheckCircle, color: 'bg-orange-500' },
    { title: 'Expense Ratio', value: '78%', change: '+2%', trend: 'up' as const, icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'Payment Success', value: '96%', change: '+1%', trend: 'up' as const, icon: CheckCircle, color: 'bg-teal-500' }
  ];

  const revenueData = [
    { month: 'Aug', tuition: 42, hostel: 8, transport: 3, other: 2, total: 55 },
    { month: 'Sep', tuition: 41, hostel: 7.5, transport: 3.2, other: 1.8, total: 53.5 },
    { month: 'Oct', tuition: 43, hostel: 8.2, transport: 3.1, other: 2.2, total: 56.5 },
    { month: 'Nov', tuition: 44, hostel: 8.5, transport: 3.3, other: 2.1, total: 57.9 },
    { month: 'Dec', tuition: 45, hostel: 9, transport: 3.5, other: 2.5, total: 60 },
    { month: 'Jan', tuition: 46, hostel: 9.2, transport: 3.4, other: 2.3, total: 60.9 }
  ];

  const expenseBreakdown = [
    { category: 'Salaries', amount: 120, percentage: 48, color: '#3B82F6' },
    { category: 'Infrastructure', amount: 45, percentage: 18, color: '#10B981' },
    { category: 'Utilities', amount: 25, percentage: 10, color: '#F59E0B' },
    { category: 'Equipment', amount: 30, percentage: 12, color: '#EF4444' },
    { category: 'Maintenance', amount: 18, percentage: 7, color: '#8B5CF6' },
    { category: 'Others', amount: 12, percentage: 5, color: '#6B7280' }
  ];

  const feeCollectionStatus = [
    { department: 'Computer Science', collected: 820, pending: 30, total: 850 },
    { department: 'Electrical Engineering', collected: 590, pending: 30, total: 620 },
    { department: 'Mechanical Engineering', collected: 550, pending: 30, total: 580 },
    { department: 'Civil Engineering', collected: 460, pending: 30, total: 490 }
  ];

  const paymentMethods = [
    { method: 'Online Payment', count: 1245, percentage: 78, color: '#10B981' },
    { method: 'Bank Transfer', count: 245, percentage: 15, color: '#3B82F6' },
    { method: 'Cash', count: 85, percentage: 5, color: '#F59E0B' },
    { method: 'Cheque', count: 25, percentage: 2, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Accounts Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Financial management and revenue tracking
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Generate Invoice
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Financial Report
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
        {/* Revenue Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Revenue Breakdown (Lakhs ₹)
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

        {/* Expense Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Expense Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="amount"
                label={({ category, percentage }) => `${category}: ${percentage}%`}
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Collection Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Department-wise Fee Collection
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feeCollectionStatus}>
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
              <Bar dataKey="collected" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pending" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Payment Method Distribution
          </h3>
          <div className="space-y-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{method.method}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {method.count} ({method.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${method.percentage}%`,
                      backgroundColor: method.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Outstanding Payments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Outstanding Payments</h3>
            <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
              ₹3.8L Due
            </div>
          </div>
          <div className="space-y-3">
            {[
              { student: 'Alex Wilson', amount: '₹45,000', days: '15 days overdue', priority: 'high' },
              { student: 'Emma Johnson', amount: '₹38,000', days: '8 days overdue', priority: 'medium' },
              { student: 'Michael Chen', amount: '₹42,000', days: '3 days overdue', priority: 'low' },
              { student: 'Sophia Rodriguez', amount: '₹35,000', days: '22 days overdue', priority: 'high' }
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    payment.priority === 'high' ? 'bg-red-500' :
                    payment.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{payment.student}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{payment.days}</p>
                  </div>
                </div>
                <p className="font-bold text-red-600 dark:text-red-400">{payment.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
            <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-3">
            {[
              { type: 'Fee Payment', student: 'David Kim', amount: '+₹45,000', time: '2 hours ago', status: 'success' },
              { type: 'Refund', student: 'Lisa Park', amount: '-₹5,000', time: '4 hours ago', status: 'processed' },
              { type: 'Fee Payment', student: 'John Smith', amount: '+₹38,000', time: '6 hours ago', status: 'success' },
              { type: 'Late Fee', student: 'Sarah Wilson', amount: '+₹2,000', time: '1 day ago', status: 'success' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.type}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.student} • {transaction.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    transaction.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.amount}
                  </p>
                  <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Budget vs Actual</h3>
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-4">
            {[
              { category: 'Revenue', budget: 600, actual: 609, variance: '+1.5%' },
              { category: 'Expenses', budget: 480, actual: 465, variance: '-3.1%' },
              { category: 'Net Profit', budget: 120, actual: 144, variance: '+20%' },
              { category: 'ROI', budget: 20, actual: 24, variance: '+4%' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{item.category}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.category === 'ROI' ? `${item.actual}%` : `₹${item.actual}L`} 
                    <span className={`ml-1 ${
                      item.variance.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      ({item.variance})
                    </span>
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.variance.startsWith('+') ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min((item.actual / item.budget) * 100, 100)}%` }}
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

export default AccountsDashboard;