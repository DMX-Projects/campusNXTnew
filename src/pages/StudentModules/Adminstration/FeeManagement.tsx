

import React, { useState } from 'react';
import {
  CreditCard, Receipt, Download, Calendar, AlertCircle,
  CheckCircle, Clock, RefreshCw, Eye, DollarSign, Building, TrendingUp, TrendingDown,
  School, Plus, FileText, Book,
} from 'lucide-react';
import {
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

// Data Types
interface AcademicFeeItem {
  type: 'Tuition Fee' | 'Lab Fee' | 'Exam Fee' | 'Library Fee' | 'Development Fee' | 'Miscellaneous';
  amount: number;
  frequency: 'Semester' | 'Annual' | 'One-time';
  dueDate: string;
  description: string;
  mandatory: boolean;
}
interface AcademicOutstandingFee {
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
interface AcademicPaymentTransaction {
  id: string;
  transactionId: string;
  paymentDate: string;
  dueDate: string;
  feeType: string;
  amount: number;
  paymentMethod: 'Online Payment' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash' | 'Cheque' | 'UPI' | 'Bank Transfer';
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded' | 'Overdue';
  lateFee?: number;
  discount?: number;
  receiptNumber: string;
  semester: string;
  academicYear: string;
  remarks?: string;
  gateway?: string;
}
interface DelayRequest {
  id: string;
  feeType: string;
  reason: string;
  status: 'Requested' | 'Approved' | 'Rejected' | 'Pending';
  requestedDate: string;
  dueDate: string;
  adminRemarks?: string;
}

// MOCK DATA
const feeStructure: AcademicFeeItem[] = [
  { type: 'Tuition Fee', amount: 42500, frequency: 'Semester', dueDate: '2025-07-10', description: 'Covers all academic classes', mandatory: true },
  { type: 'Lab Fee', amount: 3500, frequency: 'Semester', dueDate: '2025-07-13', description: 'Science/engineering labs', mandatory: true },
  { type: 'Exam Fee', amount: 1500, frequency: 'Semester', dueDate: '2025-10-25', description: 'Semester examination charges', mandatory: true },
  { type: 'Development Fee', amount: 2500, frequency: 'Semester', dueDate: '2025-07-10', description: 'Campus development', mandatory: false },
  { type: 'Library Fee', amount: 800, frequency: 'Annual', dueDate: '2025-08-01', description: 'Library access', mandatory: false },
  { type: 'Miscellaneous', amount: 700, frequency: 'Semester', dueDate: '2025-07-20', description: 'ID, events, misc.', mandatory: false }
];

const [initialOutstanding, initialTransactions, initialDelayRequests] = (() => {
  // Outstanding fees
  const outstanding: AcademicOutstandingFee[] = [
    {
      id: 'TUIT202507',
      feeType: 'Tuition Fee',
      amount: 42500,
      dueDate: '2025-07-10',
      daysOverdue: 4,
      lateFee: 400,
      totalAmount: 42900,
      description: 'Semester 4 Tuition Fee',
      canPayOnline: true,
      priority: 'High'
    },
    {
      id: 'LAB202507',
      feeType: 'Lab Fee',
      amount: 3500,
      dueDate: '2025-07-13',
      daysOverdue: 1,
      lateFee: 0,
      totalAmount: 3500,
      description: 'Semester 4 Lab Fee',
      canPayOnline: true,
      priority: 'Medium'
    },
    {
      id: 'MISC202507',
      feeType: 'Miscellaneous',
      amount: 700,
      dueDate: '2025-07-20',
      daysOverdue: 0,
      lateFee: 0,
      totalAmount: 700,
      description: 'Miscellaneous Semester Fee',
      canPayOnline: true,
      priority: 'Low'
    }
  ];
  // Payment history
  const payments: AcademicPaymentTransaction[] = [
    {
      id: 'PAY202501',
      transactionId: 'TXNTUIT202501',
      paymentDate: '2025-01-05T10:11:00Z',
      dueDate: '2025-01-06',
      feeType: 'Tuition Fee',
      amount: 42500,
      paymentMethod: 'Net Banking',
      status: 'Paid',
      receiptNumber: 'RECEIPTTUIT202501',
      semester: 'Sem 3',
      academicYear: '2024-25',
      gateway: 'BillDesk'
    },
    {
      id: 'PAY202502',
      transactionId: 'TXNLAB202501',
      paymentDate: '2025-01-05T10:40:00Z',
      dueDate: '2025-01-07',
      feeType: 'Lab Fee',
      amount: 3500,
      paymentMethod: 'UPI',
      status: 'Paid',
      receiptNumber: 'RECEIPTLAB202501',
      semester: 'Sem 3',
      academicYear: '2024-25',
      gateway: 'Razorpay'
    },
    {
      id: 'PAY202503',
      transactionId: 'TXNDEV202501',
      paymentDate: '2025-01-06T12:00:00Z',
      dueDate: '2025-01-08',
      feeType: 'Development Fee',
      amount: 2500,
      paymentMethod: 'Credit Card',
      status: 'Paid',
      receiptNumber: 'RECEIPTDEV202501',
      semester: 'Sem 3',
      academicYear: '2024-25',
      gateway: 'Razorpay'
    }
  ];
  // Example delay requests
  const requests: DelayRequest[] = [
    {
      id: 'REQ1',
      feeType: 'Tuition Fee',
      reason: 'Family emergency, request 10 extra days.',
      status: 'Approved',
      requestedDate: '2025-07-11',
      dueDate: '2025-07-20',
      adminRemarks: "Approved till 20th July."
    }
  ];
  return [outstanding, payments, requests];
})();

const monthlyAcademicPayments = [
  { month: 'Jan', amount: 48500 },
  { month: 'Feb', amount: 0 },
  { month: 'Mar', amount: 0 },
  { month: 'Apr', amount: 0 },
  { month: 'May', amount: 0 },
  { month: 'Jun', amount: 0 },
  { month: 'Jul', amount: 0 },
];

const academicBreakdown = [
  { type: 'Tuition Fee', amount: 85000, percentage: 69.2, color: '#3B82F6' },
  { type: 'Lab Fee', amount: 7000, percentage: 5.7, color: '#6366F1' },
  { type: 'Development Fee', amount: 5000, percentage: 4.1, color: '#22D3EE' },
  { type: 'Exam Fee', amount: 3000, percentage: 2.4, color: '#F59E0B' },
  { type: 'Others', amount: 15000, percentage: 12.2, color: '#EF4444' }
];

// Util
const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-IN', { year: "numeric", month: "short", day: "numeric" });
const formatDateTime = (d: string) =>
  new Date(d).toLocaleString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Paid': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Failed': return 'bg-red-100 text-red-800';
    case 'Refunded': return 'bg-blue-100 text-blue-800';
    case 'Overdue': return 'bg-red-100 text-red-800';
    case 'Requested': return 'bg-yellow-100 text-yellow-800';
    case 'Approved': return 'bg-green-100 text-green-800';
    case 'Rejected': return 'bg-red-100 text-red-800';
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

// FEE STRUCTURE COMPONENT
const FeeStructureSection: React.FC<{ feeStructure: AcademicFeeItem[], academicYear: string }> = ({ feeStructure, academicYear }) => {
  const feeTypeIcon = (type: string) => {
    switch (type) {
      case 'Tuition Fee':       return <School className="w-5 h-5 text-blue-600" />;
      case 'Lab Fee':           return <Building className="w-5 h-5 text-green-600" />;
      case 'Exam Fee':          return <FileText className="w-5 h-5 text-yellow-600" />;
      case 'Development Fee':   return <TrendingUp className="w-5 h-5 text-purple-600" />;
      case 'Library Fee':       return <Book className="w-5 h-5 text-indigo-600" />;
      case 'Miscellaneous':     return <DollarSign className="w-5 h-5 text-pink-600" />;
      default:                  return <DollarSign className="w-5 h-5 text-gray-600" />;
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Academic Fee Structure ({academicYear})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {feeStructure.map((fee, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-5 mb-3 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                {feeTypeIcon(fee.type)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{fee.type}</h3>
                <div className="text-xs text-gray-500">{fee.frequency}</div>
              </div>
            </div>
            <div className="font-bold text-xl mt-2">₹{fee.amount.toLocaleString()}</div>
            <div className="mt-1 text-gray-600 text-sm">{fee.description}</div>
            <div className="mt-1 text-sm text-gray-600"><strong>Due:</strong> {formatDate(fee.dueDate)}</div>
            {fee.mandatory && (
              <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                Mandatory
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 p-5 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Payment Guidelines</h3>
        <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
          <li>Pay tuition, lab, exam, and other academic fees by due date to avoid penalty.</li>
          <li>Late payment will incur a late fee as per institute policy.</li>
          <li>All online payments provide instant receipt downloads.</li>
          <li>Fee extensions (delays) must be formally requested before due.</li>
          <li>Contact Accounts for bulk payment, issue, or refund concerns.</li>
        </ul>
      </div>
    </div>
  );
};

// Summary card for overview
const SummaryCard = ({
  label, value, color, icon, hint
}: { label: string, value: number, color: string, icon: React.ReactNode, hint?: string }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">₹{value.toLocaleString()}</p>
        {hint && <p className={`text-sm text-${color}-600 flex items-center mt-1`}>
          {icon} {hint}
        </p>}
      </div>
      <div className={`p-3 bg-${color}-100 rounded-full`}>
        {icon}
      </div>
    </div>
  </div>
);

const TuitionFeeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'outstanding' | 'payments' | 'fee-structure' | 'receipts' | 'requests'>('overview');
  const [outstandingFees, setOutstandingFees] = useState<AcademicOutstandingFee[]>(initialOutstanding);
  const [paymentHistory, setPaymentHistory] = useState<AcademicPaymentTransaction[]>(initialTransactions);
  const [delayRequests, setDelayRequests] = useState<DelayRequest[]>(initialDelayRequests);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<AcademicOutstandingFee | null>(null);
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [delayFeeType, setDelayFeeType] = useState<string>('');
  const [delayReason, setDelayReason] = useState<string>('');

  // Example student
  const student = {
    name: 'Rahul Kumar',
    rollNumber: '2023CSE001',
    program: 'B.Tech CSE',
    semester: '4',
    academicYear: '2025-26',
  };
  const totalPaid = paymentHistory.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalOutstanding = outstandingFees.reduce((sum, of) => sum + of.totalAmount, 0);
  const totalOverdue = outstandingFees.filter(of => of.daysOverdue > 0).reduce((sum, of) => sum + of.totalAmount, 0);

  // Download function - Fixed to work properly
  const handleDownloadPDF = (receiptData?: any) => {
    // Create a simple receipt document
    const receiptContent = receiptData ? `
      Fee Receipt
      -----------
      Transaction ID: ${receiptData.transactionId}
      Fee Type: ${receiptData.feeType}
      Amount: ₹${receiptData.amount.toLocaleString()}
      Payment Date: ${formatDateTime(receiptData.paymentDate)}
      Payment Method: ${receiptData.paymentMethod}
      Receipt Number: ${receiptData.receiptNumber}
      Status: ${receiptData.status}
    ` : 'Fee Management Report';
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = receiptData ? `receipt-${receiptData.receiptNumber}.txt` : 'fee-report.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Payment
  const handlePayNow = (fee: AcademicOutstandingFee) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };
  const processPayment = (method: string) => {
    if (!selectedFee) return;
    alert(`Processing payment of ₹${selectedFee.totalAmount} for ${selectedFee.feeType}...`);
    setOutstandingFees(outstandingFees.filter(fee => fee.id !== selectedFee.id));
    setPaymentHistory([
      {
        id: 'PAY' + Date.now(),
        transactionId: 'TXN' + selectedFee.id,
        paymentDate: new Date().toISOString(),
        dueDate: selectedFee.dueDate,
        feeType: selectedFee.feeType,
        amount: selectedFee.amount,
        lateFee: selectedFee.lateFee,
        paymentMethod: method as any,
        status: 'Paid',
        receiptNumber: `RCP-${selectedFee.id}-` + Date.now(),
        semester: `Sem ${student.semester}`,
        academicYear: student.academicYear,
        gateway: method === 'UPI' ? 'Razorpay' : 'PayU'
      },
      ...paymentHistory
    ]);
    setShowPaymentModal(false);
    setSelectedFee(null);
  };
  // Delay Request
  const handleRequestDelay = () => {
    setShowDelayModal(true);
    setDelayFeeType('');
    setDelayReason('');
  };
  const submitDelayRequest = () => {
    if (!delayFeeType || !delayReason) return;
    setDelayRequests([
      {
        id: 'REQ' + Date.now(),
        feeType: delayFeeType,
        reason: delayReason,
        status: 'Requested',
        requestedDate: new Date().toISOString().slice(0,10),
        dueDate: outstandingFees.find(f => f.feeType === delayFeeType)?.dueDate || '',
      },
      ...delayRequests,
    ]);
    setShowDelayModal(false);
    setDelayFeeType('');
    setDelayReason('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between md:gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Tuition Fee Management</h2>
            <div className="text-gray-600 text-md">
              {student.name} ({student.rollNumber}), {student.program}<br />
              Academic Year: {student.academicYear} | Semester: {student.semester}
            </div>
          </div>
          <div className="flex gap-3 mt-3 md:mt-0">
            <button
              onClick={handleRequestDelay}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2 shadow font-medium"
            >
              <Clock className="w-5 h-5" />
              Request Fee Payment Extension
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow p-1 flex gap-1 mb-8 overflow-x-auto">
          {[
            { key: 'overview', label: 'Overview', icon: DollarSign },
            { key: 'outstanding', label: 'Pending', icon: AlertCircle },
            { key: 'payments', label: 'Payment History', icon: Receipt },
            { key: 'fee-structure', label: 'Fee Structure', icon: Building },
            { key: 'receipts', label: 'Receipts', icon: Download },
            { key: 'requests', label: 'Delay Requests', icon: Clock }
          ].map(tab => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard
                label="Total Academic Paid"
                value={totalPaid}
                color="blue"
                icon={<CheckCircle className="w-8 h-8 text-blue-600" />}
                hint="All paid tuition & fees"
              />
              <SummaryCard
                label="Outstanding"
                value={totalOutstanding}
                color="yellow"
                icon={<AlertCircle className="w-8 h-8 text-yellow-600" />}
                hint={`${outstandingFees.length} pending`}
              />
              <SummaryCard
                label="Overdue"
                value={totalOverdue}
                color="red"
                icon={<TrendingDown className="w-8 h-8 text-red-600" />}
                hint="Pay now to avoid penalty"
              />
              <SummaryCard
                label="Avg/Semester"
                value={Math.round(totalPaid / 2)}
                color="green"
                icon={<DollarSign className="w-8 h-8 text-green-600" />}
                hint="Regular payment"
              />
            </div>
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Semester Payment Trend</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={monthlyAcademicPayments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={v => [`₹${v}`, 'Amount']} />
                    <Area type="monotone" dataKey="amount" stroke="#3B82F6" fill="#DBEAFE" fillOpacity={0.7} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Fee Breakdown (Academic Year)</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={academicBreakdown}
                      dataKey="amount"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ type, percentage }) => `${type}: ${percentage}%`}
                    >
                      {academicBreakdown.map((e, i) => (
                        <Cell key={e.type} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={v => [`₹${v}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        {/* Outstanding Fees Tab */}
        {activeTab === 'outstanding' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <h2 className="text-xl font-bold text-gray-800"> Academic Fees</h2>
              <div className="text-right">
                <p className="text-2xl font-bold text-red-600">₹{totalOutstanding.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Outstanding</p>
              </div>
            </div>
            {outstandingFees.length ? (
              <div className="space-y-4">
                {outstandingFees.map(fee => (
                  <div key={fee.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-3 gap-2">
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
                      <div className="text-xl font-bold text-gray-900">₹{fee.totalAmount.toLocaleString()}</div>
                    </div>
                    <div className="text-gray-600 text-sm mb-2">{fee.description}</div>
                    <div className="text-sm text-gray-600"><strong>Due Date:</strong> {formatDate(fee.dueDate)}</div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm">
                        <span>Base: ₹{fee.amount.toLocaleString()}</span>
                        {fee.lateFee > 0 && <span> • Late: ₹{fee.lateFee}</span>}
                      </div>
                      <div>
                        {fee.canPayOnline ? (
                          <button
                            onClick={() => handlePayNow(fee)}
                            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
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
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">All Clear!</h3>
                <p className="text-gray-500">No outstanding academic fees for you.</p>
              </div>
            )}
          </div>
        )}
        {/* Payment History Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Academic Payment History</h2>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">Transaction</th>
                    <th className="px-6 py-3 text-left">Fee Type</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Payment Method</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Receipt</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentHistory.map(payment => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{payment.transactionId}</div>
                        <div className="text-xs text-gray-400">{payment.receiptNumber}</div>
                      </td>
                      <td className="px-6 py-4">{payment.feeType}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold">₹{payment.amount.toLocaleString()}</span>
                        {payment.lateFee && (
                          <span className="text-xs text-red-600 font-medium">&nbsp;+₹{payment.lateFee} late fee</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span>{payment.paymentMethod}</span>
                        {payment.gateway && (
                          <span className="block text-xs text-gray-400">via {payment.gateway}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">{formatDateTime(payment.paymentDate)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full font-semibold ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDownloadPDF(payment)} className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                          <Download className="w-4 h-4" /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Receipts Tab */}
        {activeTab === 'receipts' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Download Academic Fee Receipts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paymentHistory.filter(p => p.status === 'Paid').map(paid => (
                <div key={paid.id} className="border border-gray-200 rounded-lg p-5 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Receipt className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{paid.feeType}</div>
                      <div className="text-xs text-gray-400">{paid.receiptNumber}</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">₹{paid.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date:</span>
                    <span>{formatDate(paid.paymentDate)}</span>
                  </div>
                  <button onClick={() => handleDownloadPDF(paid)} className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download Receipt
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Fee Structure Tab */}
        {activeTab === 'fee-structure' && (
          <FeeStructureSection feeStructure={feeStructure} academicYear={student.academicYear} />
        )}
        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center mb-6">
              <Clock className="w-6 h-6 mr-3 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-800">Your Fee Extension (Delay) Requests</h2>
            </div>
            {delayRequests.length ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">Fee Type</th>
                      <th className="px-6 py-3 text-left">Reason</th>
                      <th className="px-6 py-3 text-left">Requested On</th>
                      <th className="px-6 py-3 text-left">For Due Date</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Admin Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {delayRequests.map(req => (
                      <tr key={req.id} className="hover:bg-yellow-50">
                        <td className="px-6 py-4">{req.feeType}</td>
                        <td className="px-6 py-4">{req.reason}</td>
                        <td className="px-6 py-4">{formatDate(req.requestedDate)}</td>
                        <td className="px-6 py-4">{formatDate(req.dueDate)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full font-semibold ${getStatusColor(req.status)}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{req.adminRemarks || '--'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-md">
                No extension/delay requests submitted yet.
              </div>
            )}
          </div>
        )}
        {/* Payment Modal */}
        {showPaymentModal && selectedFee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Complete Payment</h3>
                <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="font-medium text-gray-800 mb-1">{selectedFee.feeType}</div>
                <div className="text-sm text-gray-600 mb-2">{selectedFee.description}</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Amount:</span>
                  <span className="text-xl font-bold text-gray-900">₹{selectedFee.totalAmount.toLocaleString()}</span>
                </div>
                {selectedFee.lateFee > 0 && (
                  <div className="flex justify-between text-sm text-red-600 mt-1">
                    <span>Late Fee:</span>
                    <span>+₹{selectedFee.lateFee}</span>
                  </div>
                )}
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
                    <div className="text-sm text-gray-600">Pay using UPI apps</div>
                  </div>
                </button>
                <button
                  onClick={() => processPayment('Credit/Debit Card')}
                  className="w-full p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 text-left flex items-center gap-3"
                >
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-gray-600">Visa, Mastercard, etc.</div>
                  </div>
                </button>
                <button
                  onClick={() => processPayment('Net Banking')}
                  className="w-full p-4 border border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 text-left flex items-center gap-3"
                >
                  <Building className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="font-medium">Net Banking</div>
                    <div className="text-sm text-gray-600">All banks supported</div>
                  </div>
                </button>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  🔒 Your payment is secured. Confirmation & receipt will be available instantly.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Fee Payment Delay/Extension Modal */}
        {showDelayModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-1">
                  <Clock className="w-5 h-5" /> Request Fee Payment Extension
                </h3>
                <button onClick={() => setShowDelayModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={e => { e.preventDefault(); submitDelayRequest(); }}>
                <div className="mb-4">
                  <label className="text-gray-700 font-medium block mb-2">
                    Fee Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    required
                    value={delayFeeType}
                    onChange={e => setDelayFeeType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Fee</option>
                    {outstandingFees.map(fee => (
                      <option key={fee.id} value={fee.feeType}>{fee.feeType}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-gray-700 font-medium block mb-2">
                    Reason <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    required
                    minLength={10}
                    rows={3}
                    value={delayReason}
                    onChange={e => setDelayReason(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Please specify your reason for requesting the delay/extension"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDelayModal(false)}
                    className="px-5 py-2 rounded-lg bg-gray-100 text-gray-900"
                  >Cancel</button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 font-semibold"
                  >Submit Request</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TuitionFeeManagement;