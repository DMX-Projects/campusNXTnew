import React, { useState, useMemo } from 'react';
import { Search, Download, Filter, Calendar, IndianRupee, Users, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';

const FeePaymentReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState('All');
  const [paymentModeFilter, setPaymentModeFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const transactions = [
    { id: 'TXN001', studentName: 'John Doe', studentId: 'ST2024001', amount: 15000, paymentMode: 'Online', status: 'Paid', timestamp: '2024-09-15 10:30 AM', course: 'Computer Science', date: '2024-09-15' },
    { id: 'TXN002', studentName: 'Jane Smith', studentId: 'ST2024002', amount: 12000, paymentMode: 'Bank Transfer', status: 'Pending', timestamp: '2024-09-14 02:15 PM', course: 'Business Administration', date: '2024-09-14' },
    { id: 'TXN003', studentName: 'Michael Johnson', studentId: 'ST2024003', amount: 18000, paymentMode: 'Cash', status: 'Failed', timestamp: '2024-09-13 09:45 AM', course: 'Engineering', date: '2024-09-13' },
    { id: 'TXN004', studentName: 'Emily Brown', studentId: 'ST2024004', amount: 14500, paymentMode: 'Credit Card', status: 'Paid', timestamp: '2024-09-12 04:20 PM', course: 'Arts & Literature', date: '2024-09-12' },
    { id: 'TXN005', studentName: 'David Wilson', studentId: 'ST2024005', amount: 16000, paymentMode: 'Online', status: 'Paid', timestamp: '2024-09-11 11:00 AM', course: 'Science', date: '2024-09-11' },
    { id: 'TXN006', studentName: 'Sarah Davis', studentId: 'ST2024006', amount: 13000, paymentMode: 'Bank Transfer', status: 'Pending', timestamp: '2024-09-10 03:30 PM', course: 'Mathematics', date: '2024-09-10' },
    { id: 'TXN007', studentName: 'Robert Miller', studentId: 'ST2024007', amount: 17500, paymentMode: 'Online', status: 'Failed', timestamp: '2024-09-09 08:15 AM', course: 'Physics', date: '2024-09-09' },
    { id: 'TXN008', studentName: 'Lisa Anderson', studentId: 'ST2024008', amount: 15500, paymentMode: 'Credit Card', status: 'Paid', timestamp: '2024-09-08 01:45 PM', course: 'Chemistry', date: '2024-09-08' }
  ];

  // Helper function to check if date falls within selected range
  const isDateInRange = (transactionDate, range) => {
    const today = new Date();
    const transDate = new Date(transactionDate);
    
    switch (range) {
      case 'Today':
        return transDate.toDateString() === today.toDateString();
      case 'Week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return transDate >= weekAgo;
      case 'Month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return transDate >= monthAgo;
      case 'Quarter':
        const quarterAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        return transDate >= quarterAgo;
      case 'All':
      default:
        return true;
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch =
        transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
      
      const matchesPaymentMode = paymentModeFilter === 'All' || transaction.paymentMode === paymentModeFilter;
      
      const matchesCourse = courseFilter === 'All' || transaction.course === courseFilter;
      
      const matchesDateRange = dateRange === 'All' || isDateInRange(transaction.date, dateRange);
      
      return matchesSearch && matchesStatus && matchesPaymentMode && matchesCourse && matchesDateRange;
    });
  }, [searchTerm, statusFilter, paymentModeFilter, courseFilter, dateRange]);

  const stats = useMemo(() => {
    const filteredStats = filteredTransactions;
    const totalTransactions = filteredStats.length;
    const totalAmount = filteredStats.reduce((sum, t) => sum + t.amount, 0);
    const paidTransactions = filteredStats.filter(t => t.status === 'Paid').length;
    const pendingTransactions = filteredStats.filter(t => t.status === 'Pending').length;
    const failedTransactions = filteredStats.filter(t => t.status === 'Failed').length;

    return { totalTransactions, totalAmount, paidTransactions, pendingTransactions, failedTransactions };
  }, [filteredTransactions]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setDateRange('All');
    setPaymentModeFilter('All');
    setCourseFilter('All');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1";
    switch (status) {
      case 'Paid':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'Failed':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      default:
        return baseClasses;
    }
  };

  const handleGenerateReport = () => {
    const reportData = {
      totalRecords: filteredTransactions.length,
      filters: {
        search: searchTerm,
        status: statusFilter,
        dateRange,
        paymentMode: paymentModeFilter,
        course: courseFilter
      },
      stats
    };
    
    console.log('Generating report with data:', reportData);
    alert(`Report generated successfully!\n\nFiltered Records: ${filteredTransactions.length}\nTotal Amount: ₹${stats.totalAmount.toLocaleString()}\n\nDownload will begin shortly.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Fee Payment Reports</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor and generate reports on all admission-related fee transactions</p>
          </div>
        </div>

        {/* Active Filters Indicator */}
        {(searchTerm || statusFilter !== 'All' || dateRange !== 'All' || paymentModeFilter !== 'All' || courseFilter !== 'All') && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Active Filters:</span>
              {searchTerm && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">Search: "{searchTerm}"</span>}
              {statusFilter !== 'All' && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">Status: {statusFilter}</span>}
              {dateRange !== 'All' && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">Date: {dateRange}</span>}
              {paymentModeFilter !== 'All' && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">Payment: {paymentModeFilter}</span>}
              {courseFilter !== 'All' && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">Course: {courseFilter}</span>}
              <button 
                onClick={clearAllFilters}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Stats - Now showing filtered data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTransactions}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{stats.totalAmount.toLocaleString()}</p>
              </div>
              <IndianRupee className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Paid</p>
                <p className="text-2xl font-bold text-green-600">{stats.paidTransactions}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingTransactions}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failedTransactions}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name, student ID, or transaction ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex gap-2 flex-wrap">
                  {['All', 'Paid', 'Pending', 'Failed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        statusFilter === status
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <button
                  onClick={handleGenerateReport}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Time</option>
                    <option value="Today">Today</option>
                    <option value="Week">This Week</option>
                    <option value="Month">This Month</option>
                    <option value="Quarter">This Quarter</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Mode</label>
                  <select 
                    value={paymentModeFilter}
                    onChange={(e) => setPaymentModeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Methods</option>
                    <option value="Online">Online</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course</label>
                  <select 
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Courses</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Arts & Literature">Arts & Literature</option>
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowFilters(false)}
                  className="sm:self-end p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student Details</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment Mode</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{transaction.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.studentName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.studentId}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white">{transaction.course}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">₹{transaction.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white">{transaction.paymentMode}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(transaction.status)}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{transaction.timestamp}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No transactions found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing 1 to {Math.min(10, filteredTransactions.length)} of {filteredTransactions.length} results
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">1</button>
              <button className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeePaymentReports;