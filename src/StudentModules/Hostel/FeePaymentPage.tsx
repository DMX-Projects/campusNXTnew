import React, { useState } from 'react';
import { 
  CreditCard, Receipt, Download, Calendar, AlertCircle, 
  CheckCircle, Clock, RefreshCw, Eye, DollarSign,
  Building, Utensils, Bed, Car, Book, Shield,
  TrendingUp, TrendingDown, Filter, Search, Plus
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  CartesianGrid
} from 'recharts';

interface FeeStructure {
  type: 'Hostel Rent' | 'Mess Fees' | 'Security Deposit' | 'Maintenance' | 'Electricity' | 'Water' | 'Internet' | 'Laundry' | 'Other';
  amount: number;
  frequency: 'Monthly' | 'Quarterly' | 'Semester' | 'Annual' | 'One-time';
  dueDate: string;
  description: string;
  mandatory: boolean;
}

interface PaymentTransaction {
  id: string;
  transactionId: string;
  paymentDate: string;
  dueDate: string;
  feeType: string;
  amount: number;
  paymentMethod: 'Online Payment' | 'Cash' | 'Cheque' | 'Bank Transfer' | 'UPI' | 'Credit Card' | 'Debit Card';
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded' | 'Overdue';
  lateFee?: number;
  discount?: number;
  receiptNumber: string;
  semester: string;
  academicYear: string;
  remarks?: string;
  gateway?: string;
}

interface OutstandingFee {
  id: string;
  feeType: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  lateFee: number;
  totalAmount: number;
  description: string;
  canPayOnline: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

const FeePaymentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'outstanding' | 'payments' | 'receipts' | 'fee-structure'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<'current' | 'semester' | 'academic-year'>('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<OutstandingFee | null>(null);

  // Current student and fee info
  const currentStudent = {
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    block: 'A Block',
    roomNumber: 'A-205',
    roomType: 'Double AC',
    semester: 'Semester 4',
    academicYear: '2025-26'
  };

  // Fee Structure
  const feeStructure: FeeStructure[] = [
    { type: 'Hostel Rent', amount: 5500, frequency: 'Monthly', dueDate: '5th of every month', description: 'Room rent for Double AC room', mandatory: true },
    { type: 'Mess Fees', amount: 3500, frequency: 'Monthly', dueDate: '5th of every month', description: 'Food and dining charges', mandatory: true },
    { type: 'Security Deposit', amount: 10000, frequency: 'One-time', dueDate: 'At admission', description: 'Refundable security deposit', mandatory: true },
    { type: 'Maintenance', amount: 500, frequency: 'Monthly', dueDate: '5th of every month', description: 'Room and facility maintenance', mandatory: true },
    { type: 'Electricity', amount: 800, frequency: 'Monthly', dueDate: '10th of every month', description: 'Electricity consumption charges', mandatory: true },
    { type: 'Water', amount: 300, frequency: 'Monthly', dueDate: '10th of every month', description: 'Water supply charges', mandatory: true },
    { type: 'Internet', amount: 500, frequency: 'Monthly', dueDate: '5th of every month', description: 'Wi-Fi and internet charges', mandatory: true },
    { type: 'Laundry', amount: 600, frequency: 'Monthly', dueDate: '5th of every month', description: 'Laundry service charges', mandatory: false }
  ];

  // Outstanding Fees
  const [outstandingFees, setOutstandingFees] = useState<OutstandingFee[]>([
    {
      id: 'OUT001',
      feeType: 'Hostel Rent',
      amount: 5500,
      dueDate: '2025-09-05',
      daysOverdue: 0,
      lateFee: 0,
      totalAmount: 5500,
      description: 'September 2025 hostel rent',
      canPayOnline: true,
      priority: 'High'
    },
    {
      id: 'OUT002',
      feeType: 'Mess Fees',
      amount: 3500,
      dueDate: '2025-09-05',
      daysOverdue: 0,
      lateFee: 0,
      totalAmount: 3500,
      description: 'September 2025 mess charges',
      canPayOnline: true,
      priority: 'High'
    },
    {
      id: 'OUT003',
      feeType: 'Electricity',
      amount: 1200,
      dueDate: '2025-08-31',
      daysOverdue: 2,
      lateFee: 50,
      totalAmount: 1250,
      description: 'August 2025 electricity bill',
      canPayOnline: true,
      priority: 'Medium'
    }
  ]);

  // Payment History
  const paymentHistory: PaymentTransaction[] = [
    {
      id: 'PAY001',
      transactionId: 'TXN2025080001',
      paymentDate: '2025-08-03T10:30:00Z',
      dueDate: '2025-08-05',
      feeType: 'Hostel Rent',
      amount: 5500,
      paymentMethod: 'UPI',
      status: 'Paid',
      receiptNumber: 'HR-2025-08-001',
      semester: 'Semester 4',
      academicYear: '2025-26',
      gateway: 'Razorpay'
    },
    {
      id: 'PAY002',
      transactionId: 'TXN2025080002',
      paymentDate: '2025-08-03T10:35:00Z',
      dueDate: '2025-08-05',
      feeType: 'Mess Fees',
      amount: 3500,
      paymentMethod: 'UPI',
      status: 'Paid',
      receiptNumber: 'MF-2025-08-001',
      semester: 'Semester 4',
      academicYear: '2025-26',
      gateway: 'Razorpay'
    },
    {
      id: 'PAY003',
      transactionId: 'TXN2025070001',
      paymentDate: '2025-07-02T14:20:00Z',
      dueDate: '2025-07-05',
      feeType: 'Hostel Rent',
      amount: 5500,
      paymentMethod: 'Online Payment',
      status: 'Paid',
      receiptNumber: 'HR-2025-07-001',
      semester: 'Semester 4',
      academicYear: '2025-26',
      gateway: 'PayU'
    },
    {
      id: 'PAY004',
      transactionId: 'TXN2025070002',
      paymentDate: '2025-07-02T14:25:00Z',
      dueDate: '2025-07-05',
      feeType: 'Mess Fees',
      amount: 3500,
      paymentMethod: 'Online Payment',
      status: 'Paid',
      receiptNumber: 'MF-2025-07-001',
      semester: 'Semester 4',
      academicYear: '2025-26',
      gateway: 'PayU'
    },
    {
      id: 'PAY005',
      transactionId: 'TXN2025060001',
      paymentDate: '2025-06-28T09:15:00Z',
      dueDate: '2025-07-10',
      feeType: 'Electricity',
      amount: 950,
      paymentMethod: 'Credit Card',
      status: 'Paid',
      lateFee: 0,
      receiptNumber: 'EL-2025-06-001',
      semester: 'Semester 4',
      academicYear: '2025-26',
      gateway: 'Razorpay'
    }
  ];

  // Payment analytics data
  const monthlyPayments = [
    { month: 'Jan', amount: 9500, fees: 3 },
    { month: 'Feb', amount: 9000, fees: 3 },
    { month: 'Mar', amount: 9200, fees: 3 },
    { month: 'Apr', amount: 9800, fees: 4 },
    { month: 'May', amount: 9500, fees: 3 },
    { month: 'Jun', amount: 10200, fees: 4 },
    { month: 'Jul', amount: 9000, fees: 2 },
    { month: 'Aug', amount: 9000, fees: 2 }
  ];

  const feeBreakdown = [
    { type: 'Hostel Rent', amount: 44000, percentage: 60.3, color: '#3B82F6' },
    { type: 'Mess Fees', amount: 21000, percentage: 28.8, color: '#10B981' },
    { type: 'Electricity', amount: 4800, percentage: 6.6, color: '#F59E0B' },
    { type: 'Others', amount: 3200, percentage: 4.4, color: '#EF4444' }
  ];

  const totalPaid = paymentHistory.reduce((sum, payment) => payment.status === 'Paid' ? sum + payment.amount : sum, 0);
  const totalOutstanding = outstandingFees.reduce((sum, fee) => sum + fee.totalAmount, 0);
  const totalOverdue = outstandingFees.filter(fee => fee.daysOverdue > 0).reduce((sum, fee) => sum + fee.totalAmount, 0);

  const handlePayNow = (fee: OutstandingFee) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  const processPayment = (paymentMethod: string) => {
    if (!selectedFee) return;

    // Simulate payment processing
    alert(`Processing payment of ₹${selectedFee.totalAmount} via ${paymentMethod}...`);
    
    // Remove from outstanding fees (in real app, this would be handled by backend)
    setOutstandingFees(outstandingFees.filter(fee => fee.id !== selectedFee.id));
    
    setShowPaymentModal(false);
    setSelectedFee(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Refunded': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto">
        
       

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'overview', label: 'Overview', icon: DollarSign },
              { key: 'outstanding', label: 'Outstanding Fees', icon: AlertCircle },
              { key: 'payments', label: 'Payment History', icon: Receipt },
              { key: 'receipts', label: 'Receipts', icon: Download },
              { key: 'fee-structure', label: 'Fee Structure', icon: Building }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setActiveTab(tab.key as any)}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Paid (This Year)</p>
                    <p className="text-2xl font-bold text-gray-900">₹{totalPaid.toLocaleString()}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      On time payments
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Outstanding Amount</p>
                    <p className="text-2xl font-bold text-gray-900">₹{totalOutstanding.toLocaleString()}</p>
                    <p className="text-sm text-yellow-600 flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {outstandingFees.length} pending bills
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
                    <p className="text-2xl font-bold text-gray-900">₹{totalOverdue.toLocaleString()}</p>
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      Pay immediately
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Average</p>
                    <p className="text-2xl font-bold text-gray-900">₹{Math.round(totalPaid / 8).toLocaleString()}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Regular payments
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Payment Trend */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Payment Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyPayments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                    <Area type="monotone" dataKey="amount" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Breakdown (Academic Year)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={feeBreakdown}
                      dataKey="amount"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({type, percentage}) => `${type}: ${percentage}%`}
                    >
                      {feeBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveTab('outstanding')}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-left"
                >
                  <AlertCircle className="w-6 h-6 text-red-600 mb-2" />
                  <h4 className="font-medium text-red-800">Pay Outstanding</h4>
                  <p className="text-sm text-red-600">₹{totalOutstanding.toLocaleString()} pending</p>
                </button>
                
                <button 
                  onClick={() => setActiveTab('receipts')}
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
                >
                  <Download className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-blue-800">Download Receipts</h4>
                  <p className="text-sm text-blue-600">Get payment receipts</p>
                </button>
                
                <button 
                  onClick={() => setActiveTab('fee-structure')}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left"
                >
                  <Building className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-green-800">View Fee Structure</h4>
                  <p className="text-sm text-green-600">Understand fee details</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Outstanding Fees Tab */}
        {activeTab === 'outstanding' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Outstanding Fees</h2>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600">₹{totalOutstanding.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Outstanding</p>
                </div>
              </div>

              {outstandingFees.length > 0 ? (
                <div className="space-y-4">
                  {outstandingFees.map((fee) => (
                    <div key={fee.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-gray-800">{fee.feeType}</h3>
                            <span className={`px-2 py-1 text-xs font-semibold rounded ${getPriorityColor(fee.priority)}`}>
                              {fee.priority} Priority
                            </span>
                            {fee.daysOverdue > 0 && (
                              <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                                {fee.daysOverdue} days overdue
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{fee.description}</p>
                          <p className="text-sm text-gray-600"><strong>Due Date:</strong> {formatDate(fee.dueDate)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">₹{fee.totalAmount.toLocaleString()}</p>
                          {fee.lateFee > 0 && (
                            <p className="text-sm text-red-600">+₹{fee.lateFee} late fee</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          <span>Base Amount: ₹{fee.amount.toLocaleString()}</span>
                          {fee.lateFee > 0 && <span> • Late Fee: ₹{fee.lateFee}</span>}
                        </div>
                        <div className="flex gap-3">
                          {fee.canPayOnline ? (
                            <button
                              onClick={() => handlePayNow(fee)}
                              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                            >
                              <CreditCard className="w-4 h-4" />
                              Pay Now
                            </button>
                          ) : (
                            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
                              Pay at Office
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">All Caught Up!</h3>
                  <p className="text-gray-500">You have no outstanding fees at the moment.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment History Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Payment History</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="current">Current Semester</option>
                    <option value="semester">This Semester</option>
                    <option value="academic-year">Academic Year</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{payment.transactionId}</div>
                            <div className="text-sm text-gray-500">{payment.receiptNumber}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.feeType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{payment.amount.toLocaleString()}</div>
                          {payment.lateFee && (
                            <div className="text-sm text-red-600">+₹{payment.lateFee} late fee</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{payment.paymentMethod}</div>
                          {payment.gateway && (
                            <div className="text-sm text-gray-500">via {payment.gateway}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDateTime(payment.paymentDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Fee Structure Tab */}
        {activeTab === 'fee-structure' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Fee Structure - {currentStudent.academicYear}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feeStructure.map((fee, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {fee.type === 'Hostel Rent' && <Bed className="w-5 h-5 text-blue-600" />}
                          {fee.type === 'Mess Fees' && <Utensils className="w-5 h-5 text-blue-600" />}
                          {fee.type === 'Security Deposit' && <Shield className="w-5 h-5 text-blue-600" />}
                          {!['Hostel Rent', 'Mess Fees', 'Security Deposit'].includes(fee.type) && <DollarSign className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{fee.type}</h3>
                          <p className="text-sm text-gray-600">{fee.frequency}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">₹{fee.amount.toLocaleString()}</p>
                        {fee.mandatory && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Mandatory</span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-3">{fee.description}</p>
                    <p className="text-sm text-gray-600"><strong>Due:</strong> {fee.dueDate}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-4">Payment Guidelines</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• All fees must be paid by the due date to avoid late fees</li>
                  <li>• Late fee of ₹50 per day will be charged for overdue payments</li>
                  <li>• Online payments are processed instantly and receipts are auto-generated</li>
                  <li>• Security deposit is refundable upon checkout with no damage charges</li>
                  <li>• Partial payments are not accepted - pay the full amount for each fee type</li>
                  <li>• For payment issues, contact the accounts office during working hours</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Receipts Tab */}
        {activeTab === 'receipts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Download Receipts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paymentHistory.filter(p => p.status === 'Paid').map((payment) => (
                  <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Receipt className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{payment.feeType}</h3>
                        <p className="text-sm text-gray-600">{payment.receiptNumber}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">₹{payment.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Date:</span>
                        <span>{formatDate(payment.paymentDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Method:</span>
                        <span>{payment.paymentMethod}</span>
                      </div>
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Receipt
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedFee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Complete Payment</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">{selectedFee.feeType}</h4>
                  <p className="text-sm text-gray-600 mb-2">{selectedFee.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <span className="text-xl font-bold text-gray-900">₹{selectedFee.totalAmount.toLocaleString()}</span>
                  </div>
                  {selectedFee.lateFee > 0 && (
                    <div className="flex justify-between items-center text-sm text-red-600 mt-1">
                      <span>Late Fee:</span>
                      <span>+₹{selectedFee.lateFee}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Select Payment Method:</h4>
                
                <button
                  onClick={() => processPayment('UPI')}
                  className="w-full p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left flex items-center gap-3"
                >
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">UPI Payment</div>
                    <div className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm</div>
                  </div>
                </button>

                <button
                  onClick={() => processPayment('Credit/Debit Card')}
                  className="w-full p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left flex items-center gap-3"
                >
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
                  </div>
                </button>

                <button
                  onClick={() => processPayment('Net Banking')}
                  className="w-full p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left flex items-center gap-3"
                >
                  <Building className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Net Banking</div>
                    <div className="text-sm text-gray-600">All major banks supported</div>
                  </div>
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  🔒 Your payment is secured with 256-bit SSL encryption. You will receive a payment confirmation immediately after successful transaction.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeePaymentsPage;
