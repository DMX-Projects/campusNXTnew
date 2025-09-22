
import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Users, IndianRupee, AlertTriangle } from 'lucide-react';

interface FinancialData {
  totalCollectible: number;
  totalCollected: number;
  totalOutstanding: number;
  numberOfDefaulters: number;
  collectionByType: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  monthlyProgress: Array<{
    month: string;
    collected: number;
    target: number;
    outstanding: number;
  }>;
  recentTransactions: Array<{
    id: string;
    studentName: string;
    amount: number;
    type: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
  }>;
}

const StudentfeeDashboard: React.FC = () => {
    const [showAllTransactions, setShowAllTransactions] = useState(false);
  // Mock data - replace with real API calls
  const [financialData] = useState<FinancialData>({
    totalCollectible: 2850000,
    totalCollected: 2130000,
    totalOutstanding: 720000,
    numberOfDefaulters: 156,
    collectionByType: [
      { name: 'Tuition Fees', value: 1200000, color: '#3B82F6' },
      { name: 'Hostel Fees', value: 450000, color: '#10B981' },
      { name: 'Transport Fees', value: 280000, color: '#F59E0B' },
      { name: 'Lab Fees', value: 120000, color: '#EF4444' },
      { name: 'Library Fees', value: 80000, color: '#8B5CF6' }
    ],
    monthlyProgress: [
      { month: 'Apr', collected: 180000, target: 200000, outstanding: 120000 },
      { month: 'May', collected: 220000, target: 250000, outstanding: 105000 },
      { month: 'Jun', collected: 280000, target: 300000, outstanding: 95000 },
      { month: 'Jul', collected: 320000, target: 350000, outstanding: 85000 },
      { month: 'Aug', collected: 290000, target: 320000, outstanding: 90000 },
      { month: 'Sep', collected: 340000, target: 360000, outstanding: 80000 },
      { month: 'Oct', collected: 310000, target: 330000, outstanding: 75000 },
      { month: 'Nov', collected: 200000, target: 280000, outstanding: 70000 }
    ],
    recentTransactions: [
      { id: '1', studentName: 'John Smith', amount: 15000, type: 'Tuition', date: '2024-11-15', status: 'completed' },
      { id: '2', studentName: 'Emily Davis', amount: 8500, type: 'Hostel', date: '2024-11-14', status: 'completed' },
      { id: '3', studentName: 'Michael Chen', amount: 12000, type: 'Transport', date: '2024-11-13', status: 'pending' },
      { id: '4', studentName: 'Sarah Wilson', amount: 18000, type: 'Tuition', date: '2024-11-12', status: 'failed' }
    ]
  });

  // Fixed Light Theme
  // Adaptive Light/Dark Theme
const theme = {
  background: 'bg-gray-50 dark:bg-slate-900',
  cardBg: 'bg-white dark:bg-slate-800',
  text: 'text-gray-900 dark:text-white',
  textSecondary: 'text-gray-600 dark:text-gray-400',
  border: 'border-gray-200 dark:border-gray-700',
  shadow: 'shadow-sm',
  hover: 'hover:bg-gray-50 dark:hover:bg-slate-800',
  chart: {
    collected: '#10B981',
    target: '#3B82F6',
    outstanding: '#F59E0B'
  },
  status: {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
  },
  kpi: {
    collectionRate: 'bg-blue-500',
    outstanding: 'bg-orange-500',
    defaulters: 'bg-red-500',
    collected: 'bg-green-500'
  }
};

const TransactionsModal: React.FC<{
  onClose: () => void;
  transactions: FinancialData['recentTransactions'];
}> = ({ onClose, transactions }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className={`w-11/12 max-w-4xl bg-white dark:bg-slate-800 rounded-lg p-6 ${theme.border} border shadow-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl font-semibold ${theme.text}`}>All Recent Transactions</h2>
        <button onClick={onClose} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold text-xl">&times;</button>
      </div>
      
      {/* Scrollable table container */}
      <div className="max-h-[60vh] overflow-auto border border-gray-300 dark:border-gray-600 rounded">
  <table className="min-w-full text-sm border-collapse border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className={`bg-gray-100 dark:bg-slate-700 ${theme.textSecondary}`}>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Student</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Amount</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className={`${theme.hover} ${theme.text}`}>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{transaction.studentName}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">{formatCurrency(transaction.amount)}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-500 dark:text-gray-400">{transaction.type}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-500 dark:text-gray-400">{transaction.date}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme.status[transaction.status]}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);


  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const collectionPercentage = (financialData.totalCollected / financialData.totalCollectible) * 100;

  const KPICard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    trend?: number;
    color: string;
  }> = ({ title, value, icon, trend, color }) => (
    <div className={` bg-gray-50 dark:bg-slate-900 transition-colors duration-300${theme.cardBg} p-6 rounded-lg ${theme.border} border ${theme.shadow} transition-all duration-200 hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${theme.textSecondary}`}>{title}</p>
          <p className={`text-2xl font-bold ${theme.text} mt-2`}>{value}</p>
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              {trend > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ml-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const customTooltip = (active: boolean, payload: any, label: string) => {
    if (active && payload && payload.length) {
      return (
        <div className={`bg-gray-50 dark:bg-slate-900 transition-colors duration-300${theme.cardBg} p-3 rounded-lg ${theme.border} border ${theme.shadow}`}>
          <p className={`font-medium ${theme.text}`}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`text-sm ${theme.textSecondary}`}>
              <span style={{ color: entry.color }}>{entry.dataKey}: </span>
              {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300${theme.background} p-4 lg:p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className={`text-3xl font-bold ${theme.text}`}>Financial Dashboard</h1>
          <p className={`${theme.textSecondary} mt-1`}>Real-time student fee collection overview</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Collection Rate"
            value={`${collectionPercentage.toFixed(1)}%`}
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            trend={8.2}
            color={theme.kpi.collectionRate}
          />
          <KPICard
            title="Total Outstanding"
            value={formatCurrency(financialData.totalOutstanding)}
            icon={<IndianRupee className="h-6 w-6 text-white" />}
            trend={-12.5}
            color={theme.kpi.outstanding}
          />
          <KPICard
            title="Defaulters"
            value={financialData.numberOfDefaulters.toString()}
            icon={<AlertTriangle className="h-6 w-6 text-white" />}
            trend={-5.3}
            color={theme.kpi.defaulters}
          />
          <KPICard
            title="Total Collected"
            value={formatCurrency(financialData.totalCollected)}
            icon={<Users className="h-6 w-6 text-white" />}
            trend={15.7}
            color={theme.kpi.collected}
          />
        </div>

        {/* Collection Progress Bar */}
        <div className={`bg-gray-50 dark:bg-slate-900 transition-colors duration-300 dark:text-white${theme.cardBg} p-6 rounded-lg ${theme.border} border ${theme.shadow}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme.text}`}>Collection Progress</h3>
            <div className="flex items-center space-x-4 mt-2 lg:mt-0">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: theme.chart.collected }}></div>
                <span className={`text-sm ${theme.textSecondary}`}>Collected: {formatCurrency(financialData.totalCollected)}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-gray-400"></div>
                <span className={`text-sm ${theme.textSecondary}`}>Outstanding: {formatCurrency(financialData.totalOutstanding)}</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="h-6 rounded-full flex items-center justify-center transition-all duration-500"
              style={{ width: `bg-gray-50 dark:bg-slate-900 transition-colors duration-300${collectionPercentage}%`, backgroundColor: theme.chart.collected }}
            >
              <span className="text-white text-sm font-medium">{collectionPercentage.toFixed(1)}%</span>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className={`text-sm ${theme.textSecondary}`}>₹0</span>
            <span className={`text-sm ${theme.textSecondary}`}>{formatCurrency(financialData.totalCollectible)}</span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Collection by Type Pie Chart */}
          <div className={`bg-gray-50 dark:bg-slate-900 transition-colors duration-300${theme.cardBg} p-6 rounded-lg ${theme.border} border ${theme.shadow}`}>
            <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Collections by Fee Type</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={financialData.collectionByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {financialData.collectionByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Collection Trend */}
          <div className={`bg-gray-50 dark:bg-slate-900 transition-colors duration-300${theme.cardBg} p-6 rounded-lg ${theme.border} border ${theme.shadow}`}>
            <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Monthly Collection Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={financialData.monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={({ active, payload, label }) => customTooltip(active, payload, label)} />
                  <Line type="monotone" dataKey="collected" stroke={theme.chart.collected} strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="target" stroke={theme.chart.target} strokeWidth={2} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="outstanding" stroke={theme.chart.outstanding} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className={`bg-gray-50 dark:bg-slate-900 transition-colors duration-300${theme.cardBg} p-6 rounded-lg ${theme.border} border ${theme.shadow}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${theme.text}`}>Recent Transactions</h3>
            <button
              onClick={() => setShowAllTransactions(true)}
              className="text-sm px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${theme.border} border-b`}>
                  <th className={`text-left py-3 px-4 font-medium ${theme.textSecondary}`}>Student</th>
                  <th className={`text-left py-3 px-4 font-medium ${theme.textSecondary}`}>Amount</th>
                  <th className={`text-left py-3 px-4 font-medium ${theme.textSecondary}`}>Type</th>
                  <th className={`text-left py-3 px-4 font-medium ${theme.textSecondary}`}>Date</th>
                  <th className={`text-left py-3 px-4 font-medium ${theme.textSecondary}`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {financialData.recentTransactions.slice(0, 4).map((transaction) => (
                  <tr key={transaction.id} className={`${theme.border} border-b last:border-b-0 ${theme.hover}`}>
                    <td className={`py-3 px-4 ${theme.text}`}>{transaction.studentName}</td>
                    <td className={`py-3 px-4 font-medium ${theme.text}`}>{formatCurrency(transaction.amount)}</td>
                    <td className={`py-3 px-4 ${theme.textSecondary}`}>{transaction.type}</td>
                    <td className={`py-3 px-4 ${theme.textSecondary}`}>{transaction.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme.status[transaction.status]}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for all transactions */}
        {showAllTransactions && (
          <TransactionsModal
            transactions={financialData.recentTransactions}
            onClose={() => setShowAllTransactions(false)}
          />
        )}
      </div>
    </div>
  );
};

export default StudentfeeDashboard;