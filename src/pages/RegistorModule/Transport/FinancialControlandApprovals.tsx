import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Filter,
  Search,
  Download,
  AlertCircle,
  ChevronDown,
  Calendar,
  User,
  Eye,
  ArrowLeft,
  Car,
  Fuel,
  Wrench,
  Shield,
  Users,
  MapPin,
  Route,
  Activity
} from 'lucide-react';

const FinancialControlAndApprovals = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('approvals');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);

  const [pendingApprovals, setPendingApprovals] = useState([
    { 
      id: 'REQ-001', 
      type: 'Fuel Purchase', 
      amount: '₹3,920', 
      requestedBy: 'Transport Manager', 
      date: '2024-01-15', 
      priority: 'high', 
      description: 'Monthly fuel procurement for transport fleet',
      category: 'fuel'
    },
    { 
      id: 'REQ-002', 
      type: 'Vehicle Maintenance', 
      amount: '₹45,230', 
      requestedBy: 'Transport Manager', 
      date: '2024-01-14', 
      priority: 'medium', 
      description: 'Routine maintenance for BUS-001 and VAN-015',
      category: 'maintenance'
    },
    { 
      id: 'REQ-003', 
      type: 'Insurance Premium', 
      amount: '₹8,900', 
      requestedBy: 'Admin', 
      date: '2024-01-14', 
      priority: 'high', 
      description: 'Annual insurance renewal for entire fleet',
      category: 'insurance'
    },
    { 
      id: 'REQ-004', 
      type: 'Driver Overtime', 
      amount: '₹680', 
      requestedBy: 'Transport Manager', 
      date: '2024-01-13', 
      priority: 'low', 
      description: 'Overtime compensation for extra shifts',
      category: 'overtime'
    },
    { 
      id: 'REQ-005', 
      type: 'Route Profitability Analysis', 
      amount: '₹2,500', 
      requestedBy: 'Transport Manager', 
      date: '2024-01-12', 
      priority: 'medium', 
      description: 'Quarterly route performance and profitability assessment',
      category: 'route_profitability'
    },
    { 
      id: 'REQ-006', 
      type: 'Accident Allocation Summary', 
      amount: '₹12,300', 
      requestedBy: 'Transport Manager', 
      date: '2024-01-11', 
      priority: 'high', 
      description: 'Monthly accident costs and insurance claim allocation',
      category: 'accident_allocation'
    }
  ]);

  const expenseOverview = [
    { category: 'Fuel', amount: '₹25,640', percentage: 35, trend: '+5.2%', color: 'blue' },
    { category: 'Maintenance', amount: '₹18,230', percentage: 25, trend: '-2.1%', color: 'green' },
    { category: 'Insurance', amount: '₹12,890', percentage: 18, trend: '+1.8%', color: 'purple' },
    { category: 'Salaries', amount: '₹15,820', percentage: 22, trend: '+3.4%', color: 'orange' }
  ];

  // Route Profitability Data
  const routeProfitability = [
    { 
      id: 'RT-001', 
      name: 'Route A', 
      revenue: '₹45,200', 
      expenses: '₹32,800', 
      profit: '₹12,400', 
      margin: '27.4%', 
      vehicles: 3, 
      students: 85,
      status: 'profitable'
    },
    { 
      id: 'RT-002', 
      name: 'Route B', 
      revenue: '₹38,600', 
      expenses: '₹29,200', 
      profit: '₹9,400', 
      margin: '24.4%', 
      vehicles: 2, 
      students: 68,
      status: 'profitable'
    },
    { 
      id: 'RT-003', 
      name: 'Route C', 
      revenue: '₹22,800', 
      expenses: '₹25,100', 
      profit: '-₹2,300', 
      margin: '-10.1%', 
      vehicles: 2, 
      students: 42,
      status: 'loss'
    },
    { 
      id: 'RT-004', 
      name: 'Route D', 
      revenue: '₹31,500', 
      expenses: '₹28,900', 
      profit: '₹2,600', 
      margin: '8.3%', 
      vehicles: 2, 
      students: 56,
      status: 'marginal'
    }
  ];

  // Accident Allocation Data
  const accidentAllocation = [
    {
      id: 'ACC-001',
      date: '2024-01-10',
      vehicle: 'BUS-001',
      route: 'Route A',
      type: 'Minor Collision',
      cost: '₹8,500',
      insurance: '₹6,000',
      selfPay: '₹2,500',
      status: 'settled'
    },
    {
      id: 'ACC-002',
      date: '2024-01-08',
      vehicle: 'VAN-003',
      route: 'Route C',
      type: 'Property Damage',
      cost: '₹12,300',
      insurance: '₹10,000',
      selfPay: '₹2,300',
      status: 'pending'
    },
    {
      id: 'ACC-003',
      date: '2024-01-05',
      vehicle: 'BUS-002',
      route: 'Route B',
      type: 'Mechanical Failure',
      cost: '₹5,800',
      insurance: '₹0',
      selfPay: '₹5,800',
      status: 'settled'
    }
  ];

  const tabs = [
    { id: 'approvals', label: 'Pending Approvals', icon: Clock },
    { id: 'expenses', label: 'Expense Overview', icon: TrendingUp },
    { id: 'revenue', label: 'Fee Revenue', icon: DollarSign },
    { id: 'route_profitability', label: 'Route Profitability', icon: Route },
    { id: 'accident_allocation', label: 'Accident Allocation', icon: Shield }
  ];

  const filteredApprovals = pendingApprovals.filter(request => {
    const matchesSearch = request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.priority === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handle view request details
  const handleViewRequest = (request) => {
    const routeMap = {
      'fuel': 'fuel-consumption',
      'maintenance': 'vehicle-cost-analysis',
      'insurance': 'insurance-details',
      'overtime': 'driver-overtime',
      'route_profitability': 'route-profitability',
      'accident_allocation': 'accident-allocation'
    };
    
    const route = routeMap[request.category] || 'details';
    navigate(`/management/transport/financial-control/${route}/${request.id}`);
  };

  // Direct approval/rejection with toast
  const handleApprovalAction = (request, action) => {
    setPendingApprovals(prev => prev.filter(req => req.id !== request.id));
    
    const actionText = action === 'approve' ? 'approved' : 'rejected';
    showToast(
      `Request ${request.id} (${request.type}) has been ${actionText} successfully!`,
      action === 'approve' ? 'success' : 'warning'
    );
    
    console.log(`${action} request ${request.id}`);
  };

  const handleExport = (format) => {
    const data = activeTab === 'approvals' ? filteredApprovals : 
                 activeTab === 'route_profitability' ? routeProfitability :
                 activeTab === 'accident_allocation' ? accidentAllocation :
                 expenseOverview;
    console.log(`Exporting ${activeTab} data to ${format}:`, data);
    
    if (format === 'excel') {
      let csvContent = '';
      
      if (activeTab === 'approvals') {
        csvContent = 'ID,Type,Amount,Requested By,Date,Priority\n' + 
          filteredApprovals.map(req => `${req.id},${req.type},${req.amount},${req.requestedBy},${req.date},${req.priority}`).join('\n');
      } else if (activeTab === 'route_profitability') {
        csvContent = 'Route ID,Name,Revenue,Expenses,Profit,Margin,Vehicles,Students,Status\n' + 
          routeProfitability.map(route => `${route.id},${route.name},${route.revenue},${route.expenses},${route.profit},${route.margin},${route.vehicles},${route.students},${route.status}`).join('\n');
      } else if (activeTab === 'accident_allocation') {
        csvContent = 'ID,Date,Vehicle,Route,Type,Total Cost,Insurance,Self Pay,Status\n' + 
          accidentAllocation.map(acc => `${acc.id},${acc.date},${acc.vehicle},${acc.route},${acc.type},${acc.cost},${acc.insurance},${acc.selfPay},${acc.status}`).join('\n');
      } else {
        csvContent = 'Category,Amount,Percentage,Trend\n' + 
          expenseOverview.map(exp => `${exp.category},${exp.amount},${exp.percentage}%,${exp.trend}`).join('\n');
      }
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeTab}_report.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      showToast('Report exported successfully!', 'success');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Toast Notification */}
      {toastMessage && (
        <Toast 
          message={toastMessage.message} 
          type={toastMessage.type} 
          onClose={() => setToastMessage(null)}
          isDark={isDark}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Financial Control & Approvals
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage transport expenses, fee collection, and approval workflows
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</p>
                  <p className="text-xl font-bold">{pendingApprovals.length}</p>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Approved</p>
                  <p className="text-xl font-bold">18</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Budget</p>
                  <p className="text-xl font-bold">₹72.5K</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Utilization</p>
                  <p className="text-xl font-bold">87%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? `border-blue-500 ${isDark ? 'text-blue-400' : 'text-blue-600'}`
                        : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'approvals' && (
            <div className="space-y-6">
              {/* Search and Filter Bar */}
              <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search requests by type or requester..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className={`px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="all">All Priorities</option>
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                    
                    <button 
                      onClick={() => handleExport('excel')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>
              </div>

              {/* Pending Requests */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                  Pending Approval Requests ({filteredApprovals.length})
                </h3>
                
                {filteredApprovals.length === 0 ? (
                  <div className={`p-8 rounded-xl shadow-md text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <CheckCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-lg font-medium mb-1">No pending requests</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      All approval requests have been processed
                    </p>
                  </div>
                ) : (
                  filteredApprovals.map((request, index) => (
                    <RequestCard 
                      key={request.id}
                      request={request}
                      onView={() => handleViewRequest(request)}
                      onApprove={() => handleApprovalAction(request, 'approve')}
                      onReject={() => handleApprovalAction(request, 'reject')}
                      isDark={isDark}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                  Expense Breakdown
                </h3>
                <button 
                  onClick={() => handleExport('excel')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expenseOverview.map((expense, index) => (
                  <ExpenseCard key={index} expense={expense} isDark={isDark} />
                ))}
              </div>

              {/* Expense Chart Placeholder */}
              <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <h4 className="text-lg font-semibold mb-4">Monthly Expense Trend</h4>
                <div className={`h-48 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto text-blue-500 mb-2" />
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Interactive expense chart will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'route_profitability' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  <Route className="w-5 h-5 mr-2 text-green-500" />
                  Route Profitability Analysis
                </h3>
                <button 
                  onClick={() => handleExport('excel')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {routeProfitability.map((route, index) => (
                  <RouteProfitabilityCard key={route.id} route={route} isDark={isDark} />
                ))}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Revenue</p>
                  <p className="text-xl font-bold text-green-600">₹1,38,100</p>
                </div>
                <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Expenses</p>
                  <p className="text-xl font-bold text-red-600">₹1,16,000</p>
                </div>
                <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Net Profit</p>
                  <p className="text-xl font-bold text-blue-600">₹22,100</p>
                </div>
                <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Avg Margin</p>
                  <p className="text-xl font-bold text-purple-600">16.0%</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accident_allocation' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-500" />
                  Accident Allocation Summary
                </h3>
                <button 
                  onClick={() => handleExport('excel')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </button>
              </div>

              {/* Accident Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Accident Cost</p>
                  <p className="text-xl font-bold text-red-600">₹26,600</p>
                </div>
                <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Insurance Coverage</p>
                  <p className="text-xl font-bold text-green-600">₹16,000</p>
                </div>
                <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Self Payment</p>
                  <p className="text-xl font-bold text-orange-600">₹10,600</p>
                </div>
              </div>

              {/* Accident Details */}
              <div className="space-y-4">
                {accidentAllocation.map((accident, index) => (
                  <AccidentCard key={accident.id} accident={accident} isDark={isDark} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                Fee Revenue Management
              </h3>
              
              <div className={`p-8 rounded-xl shadow-md text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <DollarSign className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Fee Revenue Tracking</h4>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Transportation fee collection and revenue management features coming soon.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className="text-sm text-gray-500">Monthly Collection</p>
                    <p className="text-2xl font-bold text-green-600">₹45,200</p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className="text-sm text-gray-500">Outstanding</p>
                    <p className="text-2xl font-bold text-orange-600">₹12,800</p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className="text-sm text-gray-500">Collection Rate</p>
                    <p className="text-2xl font-bold text-blue-600">78%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Toast Notification Component
const Toast = ({ message, type, onClose, isDark }) => {
  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
      <div className={`max-w-sm w-full rounded-lg shadow-lg overflow-hidden ${
        type === 'success' ? 'bg-green-600' :
        type === 'warning' ? 'bg-orange-600' :
        type === 'error' ? 'bg-red-600' :
        'bg-blue-600'
      }`}>
        <div className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {type === 'success' && <CheckCircle className="h-5 w-5 text-white" />}
              {type === 'warning' && <AlertCircle className="h-5 w-5 text-white" />}
              {type === 'error' && <XCircle className="h-5 w-5 text-white" />}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={onClose}
                className="inline-flex text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Request Card Component
const RequestCard = ({ request, onView, onApprove, onReject, isDark }) => (
  <div className={`p-4 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg ${
    isDark ? 'bg-gray-800' : 'bg-white'
  }`}>
    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-3">
          <h4 className="font-semibold text-lg">{request.type}</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            request.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
            request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          }`}>
            {request.priority.toUpperCase()}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
            <span className="font-semibold text-blue-600 dark:text-blue-400">{request.amount}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm">{request.requestedBy}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm">{request.date}</span>
          </div>
        </div>
        
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {request.description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 lg:ml-6">
        <button 
          onClick={onView}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center font-medium"
        >
          <Eye className="w-4 h-4 mr-2" />
          View
        </button>
        <button 
          onClick={onApprove}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center font-medium"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Approve
        </button>
        <button 
          onClick={onReject}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center font-medium"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Reject
        </button>
      </div>
    </div>
  </div>
);

// Expense Card Component
const ExpenseCard = ({ expense, isDark }) => (
  <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="font-semibold text-lg mb-1">{expense.category}</h4>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{expense.amount}</p>
      </div>
      <div className="text-right">
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          expense.trend.startsWith('+') 
            ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' 
            : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {expense.trend}
        </span>
      </div>
    </div>
    
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>Budget Usage</span>
        <span>{expense.percentage}%</span>
      </div>
      <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${expense.percentage}%` }}
        />
      </div>
    </div>
    
    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
      {expense.percentage}% of total budget allocated
    </p>
  </div>
);

// Route Profitability Card Component
const RouteProfitabilityCard = ({ route, isDark }) => (
  <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="font-semibold text-lg mb-1 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          {route.name}
        </h4>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{route.id}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        route.status === 'profitable' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
        route.status === 'loss' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      }`}>
        {route.status === 'loss' ? 'Loss Making' : 
         route.status === 'marginal' ? 'Marginal' : 'Profitable'}
      </span>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Revenue</p>
        <p className="text-lg font-semibold text-green-600">{route.revenue}</p>
      </div>
      <div>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expenses</p>
        <p className="text-lg font-semibold text-red-600">{route.expenses}</p>
      </div>
      <div>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Profit/Loss</p>
        <p className={`text-lg font-semibold ${
          route.profit.startsWith('-') ? 'text-red-600' : 'text-blue-600'
        }`}>{route.profit}</p>
      </div>
      <div>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Margin</p>
        <p className={`text-lg font-semibold ${
          route.margin.startsWith('-') ? 'text-red-600' : 'text-green-600'
        }`}>{route.margin}</p>
      </div>
    </div>
    
    <div className="flex justify-between text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
      <span><Car className="w-4 h-4 inline mr-1" />{route.vehicles} vehicles</span>
      <span><Users className="w-4 h-4 inline mr-1" />{route.students} students</span>
    </div>
  </div>
);

// Accident Card Component  
const AccidentCard = ({ accident, isDark }) => (
  <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-3">
          <h4 className="font-semibold text-lg">{accident.type}</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            accident.status === 'settled' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}>
            {accident.status.toUpperCase()}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm">{accident.date}</span>
          </div>
          <div className="flex items-center">
            <Car className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm">{accident.vehicle}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm">{accident.route}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm font-semibold">{accident.cost}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-green-600 font-medium">Insurance: {accident.insurance}</span>
          </div>
          <div>
            <span className="text-orange-600 font-medium">Self Pay: {accident.selfPay}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FinancialControlAndApprovals;
