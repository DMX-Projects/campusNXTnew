import React, { useState } from 'react';
import { 
  DollarSign, CreditCard, Download, Calendar, Clock, 
  CheckCircle, AlertCircle, FileText, Home, Building2,
  User, Phone, Mail, Eye, RefreshCw, Info, X, Lock, Shield
} from 'lucide-react';

interface FeeDetails {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  monthlyRent: number;
  messFee: number;
  securityDeposit: number;
  electricityCharges: number;
  maintenanceCharges: number;
  lateFee: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  lastPaymentDate: string;
  nextDueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  paymentHistory: PaymentRecord[];
  upcomingPayments: UpcomingPayment[];
}

interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  type: string;
  method: string;
  transactionId: string;
  status: 'Success' | 'Pending' | 'Failed';
  receiptNumber: string;
}

interface UpcomingPayment {
  id: string;
  dueDate: string;
  amount: number;
  type: string;
  description: string;
  status: 'Upcoming' | 'Overdue';
}

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'netbanking' | 'upi' | 'wallet';
  icon: string;
  description: string;
  processingFee: number;
  available: boolean;
}

const ViewFeeDetailsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'upcoming'>('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  
  // New states for integrated payment system
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentStep, setPaymentStep] = useState<'method' | 'details' | 'confirmation'>('method');
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    bankAccount: '',
    walletType: '',
    otp: ''
  });

  // Payment methods configuration
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit_card',
      name: 'Credit Card',
      type: 'card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
      processingFee: 0,
      available: true
    },
    {
      id: 'debit_card',
      name: 'Debit Card',
      type: 'card',
      icon: '💳',
      description: 'All major debit cards',
      processingFee: 0,
      available: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      type: 'netbanking',
      icon: '🏦',
      description: 'Direct bank transfer',
      processingFee: 0,
      available: true
    },
    {
      id: 'upi',
      name: 'UPI',
      type: 'upi',
      icon: '📱',
      description: 'PhonePe, Google Pay, Paytm',
      processingFee: 0,
      available: true
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      type: 'wallet',
      icon: '💰',
      description: 'Paytm, PhonePe Wallet',
      processingFee: 0,
      available: true
    }
  ];

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    roomNumber: 'A-201',
    phoneNumber: '+91-9876543210',
    email: 'arjun.kumar@college.edu.in',
    emergencyContact: '+91-9876543211'
  };

  const feeDetails: FeeDetails = {
    id: 'FEE001',
    studentId: 'CS2023001',
    studentName: 'Arjun Kumar',
    roomNumber: 'A-201',
    monthlyRent: 5500,
    messFee: 3000,
    securityDeposit: 10000,
    electricityCharges: 500,
    maintenanceCharges: 200,
    lateFee: 0,
    totalAmount: 19200,
    paidAmount: 10000,
    pendingAmount: 9200,
    lastPaymentDate: '2025-01-01',
    nextDueDate: '2025-02-01',
    status: 'Partial',
    paymentHistory: [
      {
        id: 'PAY001',
        date: '2025-01-01',
        amount: 9000,
        type: 'Monthly Rent + Mess Fee',
        method: 'Online Payment',
        transactionId: 'TXN123456789',
        status: 'Success',
        receiptNumber: 'RCP001'
      },
      {
        id: 'PAY002',
        date: '2023-07-15',
        amount: 10000,
        type: 'Security Deposit',
        method: 'Bank Transfer',
        transactionId: 'TXN987654321',
        status: 'Success',
        receiptNumber: 'RCP002'
      }
    ],
    upcomingPayments: [
      {
        id: 'UP001',
        dueDate: '2025-02-01',
        amount: 9200,
        type: 'Monthly Fee',
        description: 'February 2025 - Rent + Mess Fee + Electricity',
        status: 'Upcoming'
      },
      {
        id: 'UP002',
        dueDate: '2025-03-01',
        amount: 9000,
        type: 'Monthly Fee',
        description: 'March 2025 - Rent + Mess Fee',
        status: 'Upcoming'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Partial': return 'bg-blue-100 text-blue-800';
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Updated payment functions
  const openPaymentModal = () => {
    setShowPaymentModal(true);
    setPaymentStep('method');
    setSelectedMethod('');
    setPaymentForm({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      upiId: '',
      bankAccount: '',
      walletType: '',
      otp: ''
    });
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setPaymentStep('details');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('confirmation');
  };

  const processPayment = () => {
    alert(`Payment of ₹${(feeDetails.pendingAmount + feeDetails.lateFee).toLocaleString()} processed successfully via ${getSelectedMethod()?.name}! Receipt will be generated.`);
    
    setShowPaymentModal(false);
    setPaymentStep('method');
    setSelectedMethod('');
  };

  const getSelectedMethod = () => {
    return paymentMethods.find(method => method.id === selectedMethod);
  };

  // Input formatters
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const openReceiptModal = (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setShowReceiptModal(true);
  };

  const downloadReceipt = () => {
    alert('Receipt downloaded successfully!');
  };

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Fee Management</h1>
                <p className="text-gray-600">View and manage your hostel fees and payments</p>
              </div>
            </div>
            <button
              onClick={openPaymentModal}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Pay Now
            </button>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{currentStudent.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Room</p>
                <p className="font-medium">{currentStudent.roomNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{currentStudent.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{currentStudent.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Status Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Fee Status Overview</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feeDetails.status)}`}>
              {feeDetails.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Total Paid</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">₹{feeDetails.paidAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Out of ₹{feeDetails.totalAmount.toLocaleString()}</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Pending Amount</h3>
              </div>
              <p className="text-2xl font-bold text-orange-600">₹{feeDetails.pendingAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Due for payment</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Next Due Date</h3>
              </div>
              <p className="text-lg font-bold text-blue-600">{new Date(feeDetails.nextDueDate).toLocaleDateString('en-IN')}</p>
              <p className="text-sm text-gray-600">
                {getDaysUntilDue(feeDetails.nextDueDate)} days remaining
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'overview', label: 'Fee Breakdown', icon: DollarSign },
              { key: 'history', label: 'Payment History', icon: Clock },
              { key: 'upcoming', label: 'Upcoming Payments', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
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

        {/* Fee Breakdown Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Fee Breakdown</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">Monthly Rent</p>
                      <p className="text-sm text-gray-600">Room {feeDetails.roomNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{feeDetails.monthlyRent.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">per month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">Mess Fee</p>
                      <p className="text-sm text-gray-600">Meals and dining</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{feeDetails.messFee.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">per month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">Security Deposit</p>
                      <p className="text-sm text-gray-600">One-time deposit</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{feeDetails.securityDeposit.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">refundable</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">Electricity Charges</p>
                      <p className="text-sm text-gray-600">Monthly usage</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{feeDetails.electricityCharges.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">per month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">Maintenance Charges</p>
                      <p className="text-sm text-gray-600">Room maintenance</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{feeDetails.maintenanceCharges.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">per month</p>
                  </div>
                </div>

                {feeDetails.lateFee > 0 && (
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium text-red-800">Late Fee</p>
                        <p className="text-sm text-red-600">Payment delay charges</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-800">₹{feeDetails.lateFee.toLocaleString()}</p>
                      <p className="text-sm text-red-600">additional</p>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-bold text-green-800">Total Amount</p>
                        <p className="text-sm text-green-600">All charges combined</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-800">₹{feeDetails.totalAmount.toLocaleString()}</p>
                      <p className="text-sm text-green-600">total due</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment History</h2>
              
              <div className="space-y-4">
                {feeDetails.paymentHistory.map((payment) => (
                  <div key={payment.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Payment #{payment.id}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openReceiptModal(payment)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Receipt
                        </button>
                        <button
                          onClick={downloadReceipt}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Payment Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Amount: ₹{payment.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Type: {payment.type}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Transaction Info</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Method: {payment.method}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600 font-mono">TXN: {payment.transactionId}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Receipt Info</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Date: {new Date(payment.date).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Receipt: {payment.receiptNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Payments Tab */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Payments</h2>
              
              <div className="space-y-4">
                {feeDetails.upcomingPayments.map((payment) => (
                  <div key={payment.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {payment.type} - {payment.id}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">₹{payment.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">
                          Due: {new Date(payment.dueDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                      <p className="text-gray-600">{payment.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {getDaysUntilDue(payment.dueDate)} days remaining
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          Due: {new Date(payment.dueDate).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={openPaymentModal}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        Pay Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Payment Modal with integrated payment system */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {paymentStep === 'method' && 'Select Payment Method'}
                  {paymentStep === 'details' && 'Payment Details'}
                  {paymentStep === 'confirmation' && 'Payment Confirmation'}
                </h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Student Information Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Student Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{currentStudent.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Room:</span>
                    <span className="font-medium">{currentStudent.roomNumber}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection Step */}
              {paymentStep === 'method' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Payment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Pending Amount:</span>
                        <span className="font-medium">₹{feeDetails.pendingAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Late Fee:</span>
                        <span className="font-medium">₹{feeDetails.lateFee.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>₹{(feeDetails.pendingAmount + feeDetails.lateFee).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">Select Payment Method</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => handlePaymentMethodSelect(method.id)}
                          disabled={!method.available}
                          className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                            method.available
                              ? 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                              : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{method.icon}</div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-800">{method.name}</h5>
                              <p className="text-sm text-gray-600">{method.description}</p>
                              {method.processingFee > 0 && (
                                <p className="text-xs text-orange-600">Processing fee: ₹{method.processingFee}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-green-500" />
                              <span className="text-xs text-green-600">Secure</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Details Step */}
              {paymentStep === 'details' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Payment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-medium">₹{(feeDetails.pendingAmount + feeDetails.lateFee).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Method:</span>
                        <span className="font-medium">{getSelectedMethod()?.name}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>₹{(feeDetails.pendingAmount + feeDetails.lateFee).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic form fields based on payment method */}
                  {(selectedMethod === 'credit_card' || selectedMethod === 'debit_card') && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={paymentForm.cardNumber}
                          onChange={(e) => setPaymentForm({...paymentForm, cardNumber: formatCardNumber(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={paymentForm.expiryDate}
                            onChange={(e) => setPaymentForm({...paymentForm, expiryDate: formatExpiryDate(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={paymentForm.cvv}
                            onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value.replace(/\D/g, '')})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={paymentForm.cardholderName}
                          onChange={(e) => setPaymentForm({...paymentForm, cardholderName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'upi' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={paymentForm.upiId}
                        onChange={(e) => setPaymentForm({...paymentForm, upiId: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="yourname@paytm"
                        required
                      />
                    </div>
                  )}

                  {selectedMethod === 'netbanking' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Bank <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={paymentForm.bankAccount}
                        onChange={(e) => setPaymentForm({...paymentForm, bankAccount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {selectedMethod === 'wallet' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wallet Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={paymentForm.walletType}
                        onChange={(e) => setPaymentForm({...paymentForm, walletType: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select wallet</option>
                        <option value="paytm">Paytm Wallet</option>
                        <option value="phonepe">PhonePe Wallet</option>
                        <option value="amazonpay">Amazon Pay</option>
                      </select>
                    </div>
                  )}

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900 mb-1">Payment Security</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Your payment information is encrypted and secure</li>
                          <li>• We do not store your card details</li>
                          <li>• Payment will be processed immediately</li>
                          <li>• Receipt will be sent to your email</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentStep('method')}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              )}

              {/* Confirmation Step */}
              {paymentStep === 'confirmation' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirm Payment</h3>
                    <p className="text-gray-600">Please review your payment details before proceeding</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">Payment Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-medium">₹{(feeDetails.pendingAmount + feeDetails.lateFee).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="font-medium">{getSelectedMethod()?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Student:</span>
                        <span className="font-medium">{currentStudent.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Room:</span>
                        <span className="font-medium">{currentStudent.roomNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Important</h4>
                        <p className="text-sm text-blue-800">
                          By clicking "Pay Now", you agree to process this payment. The amount will be deducted from your selected payment method immediately.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setPaymentStep('details')}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={processPayment}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Receipt Modal */}
        {showReceiptModal && selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Payment Receipt</h3>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="text-center border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-800">AICAS Hostel</h2>
                  <p className="text-gray-600">Payment Receipt</p>
                  <p className="text-sm text-gray-500">Receipt #{selectedPayment.receiptNumber}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Student Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {currentStudent.name}</p>
                      <p><strong>Room:</strong> {currentStudent.roomNumber}</p>
                      <p><strong>Roll Number:</strong> {currentStudent.rollNumber}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Payment Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Amount:</strong> ₹{selectedPayment.amount.toLocaleString()}</p>
                      <p><strong>Type:</strong> {selectedPayment.type}</p>
                      <p><strong>Method:</strong> {selectedPayment.method}</p>
                      <p><strong>Date:</strong> {new Date(selectedPayment.date).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Transaction Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Transaction ID:</strong> {selectedPayment.transactionId}</p>
                    <p><strong>Status:</strong> {selectedPayment.status}</p>
                    <p><strong>Receipt Number:</strong> {selectedPayment.receiptNumber}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={downloadReceipt}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                  <button
                    onClick={() => setShowReceiptModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFeeDetailsPage;
