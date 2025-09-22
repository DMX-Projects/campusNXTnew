import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, Clock, BarChart3 } from 'lucide-react';

export const HODDashboard: React.FC = () => {
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: '1', title: 'Software License Renewal', amount: '₹15,000', requestor: 'IT Department', priority: 'High' },
    { id: '2', title: 'Office Furniture', amount: '₹8,500', requestor: 'Admin Department', priority: 'Medium' },
    { id: '3', title: 'Research Equipment', amount: '₹25,000', requestor: 'R&D Department', priority: 'High' }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stats = [
    {
      title: 'Total Budget Allocated',
      value: '₹2,45,00,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Budget Utilized',
      value: '₹1,85,00,000',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '-5.1%',
      trend: 'down',
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: 'Active Assets',
      value: '1,245',
      change: '+3.7%',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600'
    }
  ];

  const recentActivities = [
    { type: 'Budget Approved', item: 'IT Infrastructure Budget', time: '2 hours ago', status: 'approved' },
    { type: 'Purchase Request', item: 'Laboratory Equipment', time: '4 hours ago', status: 'pending' },
    { type: 'Asset Update', item: 'Server Room AC Unit', time: '6 hours ago', status: 'maintenance' },
    { type: 'Report Generated', item: 'Monthly Expense Summary', time: '1 day ago', status: 'completed' }
  ];

  const handleApprove = (approvalId: string, title: string) => {
    setPendingApprovals(prev => prev.filter(approval => approval.id !== approvalId));
    showToast(`${title} has been approved successfully!`, 'success');
  };

  const handleReject = (approvalId: string, title: string) => {
    setPendingApprovals(prev => prev.filter(approval => approval.id !== approvalId));
    showToast(`${title} has been rejected.`, 'error');
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HOD Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'approved' ? 'bg-green-500' :
                  activity.status === 'pending' ? 'bg-yellow-500' :
                  activity.status === 'maintenance' ? 'bg-orange-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.type}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{activity.item}</p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Approvals</h2>
            <span className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium">
              {pendingApprovals.length} pending
            </span>
          </div>
          <div className="space-y-4">
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No pending approvals</p>
              </div>
            ) : (
              pendingApprovals.map((approval) => (
                <div key={approval.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{approval.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      approval.priority === 'High' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                      'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {approval.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{approval.requestor}</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{approval.amount}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleApprove(approval.id, approval.title)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(approval.id, approval.title)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Budget Overview Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Budget Utilization Overview</h2>
        <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Budget visualization chart would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};
