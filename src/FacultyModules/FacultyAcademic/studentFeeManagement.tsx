 // StudentFeeManagement.tsx
import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  Calendar, 
  Download, 
  Eye, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Receipt,
  DollarSign,
  Filter,
  Search,
  Bell,
  Wallet,
  Building,
  Smartphone
} from 'lucide-react';

interface FeeDetail {
  id: string;
  feeHead: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  paymentDate?: string;
  receiptNumber?: string;
  description: string;
  category: 'academic' | 'hostel' | 'transport' | 'library' | 'exam' | 'fine';
  semester: string;
  academicYear: string;
  installmentNumber?: number;
  totalInstallments?: number;
}

interface PaymentHistory {
  id: string;
  feeId: string;
  amount: number;
  paymentDate: string;
  paymentMode: 'online' | 'cash' | 'cheque' | 'dd';
  transactionId: string;
  receiptNumber: string;
  status: 'success' | 'failed' | 'pending';
}

const StudentFeeManagement: React.FC = () => {
  const [studentInfo] = useState({
    name: 'Arjun Kumar',
    rollNumber: '2022CSE001',
    registrationNumber: 'REG2022001',
    department: 'Computer Science Engineering',
    semester: '5th Semester',
    batch: '2022-2026',
    section: 'A',
    profileImage: '/api/placeholder/100/100'
  });

  const [feeDetails, setFeeDetails] = useState<FeeDetail[]>([
    {
      id: 'F001',
      feeHead: 'Tuition Fee - Semester 5',
      amount: 45000,
      dueDate: '2025-10-15',
      status: 'pending',
      description: 'Academic tuition fee for 5th semester',
      category: 'academic',
      semester: '5th',
      academicYear: '2025-26',
      installmentNumber: 1,
      totalInstallments: 2
    },
    {
      id: 'F002',
      feeHead: 'Exam Fee - Mid Semester',
      amount: 2500,
      dueDate: '2025-09-30',
      status: 'paid',
      paymentDate: '2025-09-25',
      receiptNumber: 'REC001234',
      description: 'Mid-semester examination fee',
      category: 'exam',
      semester: '5th',
      academicYear: '2025-26'
    },
    {
      id: 'F003',
      feeHead: 'Library Fee',
      amount: 1500,
      dueDate: '2025-09-20',
      status: 'overdue',
      description: 'Annual library membership and usage fee',
      category: 'library',
      semester: '5th',
      academicYear: '2025-26'
    },
    {
      id: 'F004',
      feeHead: 'Lab Fee - Computer Science',
      amount: 8000,
      dueDate: '2025-10-10',
      status: 'partial',
      description: 'Laboratory equipment and maintenance fee',
      category: 'academic',
      semester: '5th',
      academicYear: '2025-26'
    },
    {
      id: 'F005',
      feeHead: 'Late Submission Fine',
      amount: 500,
      dueDate: '2025-09-05',
      status: 'overdue',
      description: 'Fine for late assignment submission',
      category: 'fine',
      semester: '5th',
      academicYear: '2025-26'
    }
  ]);

  const [paymentHistory] = useState<PaymentHistory[]>([
    {
      id: 'P001',
      feeId: 'F002',
      amount: 2500,
      paymentDate: '2025-09-25',
      paymentMode: 'online',
      transactionId: 'TXN123456789',
      receiptNumber: 'REC001234',
      status: 'success'
    }
  ]);

  const [selectedFee, setSelectedFee] = useState<FeeDetail | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | string>('all');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'netbanking' | 'upi' | ''>('');

  // Calculate fee statistics
  const feeStats = useMemo(() => {
    const totalFees = feeDetails.reduce((sum, fee) => sum + fee.amount, 0);
    const paidFees = feeDetails
      .filter(fee => fee.status === 'paid')
      .reduce((sum, fee) => sum + fee.amount, 0);
    const pendingFees = feeDetails
      .filter(fee => fee.status === 'pending' || fee.status === 'partial')
      .reduce((sum, fee) => sum + fee.amount, 0);
    const overdueFees = feeDetails
      .filter(fee => fee.status === 'overdue')
      .reduce((sum, fee) => sum + fee.amount, 0);

    return {
      total: totalFees,
      paid: paidFees,
      pending: pendingFees,
      overdue: overdueFees,
      overdueCount: feeDetails.filter(fee => fee.status === 'overdue').length
    };
  }, [feeDetails]);

  // Filter fees based on search and filters
  const filteredFees = useMemo(() => {
    return feeDetails.filter(fee => {
      const matchesSearch = fee.feeHead.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fee.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || fee.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || fee.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [feeDetails, searchTerm, filterCategory, filterStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'partial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'partial': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-50 text-blue-700';
      case 'hostel': return 'bg-purple-50 text-purple-700';
      case 'transport': return 'bg-green-50 text-green-700';
      case 'library': return 'bg-orange-50 text-orange-700';
      case 'exam': return 'bg-indigo-50 text-indigo-700';
      case 'fine': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const handlePayment = (fee: FeeDetail) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    if (!selectedFee || !paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      setFeeDetails(prev => prev.map(fee => 
        fee.id === selectedFee.id 
          ? { 
              ...fee, 
              status: 'paid', 
              paymentDate: new Date().toISOString().split('T')[0],
              receiptNumber: `REC${Date.now()}`
            }
          : fee
      ));
      
      setShowPaymentModal(false);
      setSelectedFee(null);
      setPaymentMethod('');
      alert('Payment processed successfully!');
    }, 2000);
  };

  const downloadReceipt = (fee: FeeDetail) => {
    if (fee.receiptNumber) {
      // Simulate receipt download
      alert(`Downloading receipt ${fee.receiptNumber} for ${fee.feeHead}`);
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && Date.now() > new Date(dueDate).getTime();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
              <div className="text-gray-600">
                <p>{studentInfo.name} • {studentInfo.rollNumber}</p>
                <p>{studentInfo.department} • {studentInfo.semester}</p>
              </div>
            </div>
          </div>
          
          {feeStats.overdueCount > 0 && (
            <div className="bg-red-100 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{feeStats.overdueCount} Overdue Payment(s)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fee Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">₹{feeStats.total.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Fees</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">₹{feeStats.paid.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Paid</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">₹{feeStats.pending.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">₹{feeStats.overdue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Overdue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search fees by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="academic">Academic</option>
            <option value="hostel">Hostel</option>
            <option value="transport">Transport</option>
            <option value="library">Library</option>
            <option value="exam">Exam</option>
            <option value="fine">Fine</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="partial">Partial</option>
          </select>
        </div>
      </div>

      {/* Fee Details Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Fee Details</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Fee Head</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Category</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Amount</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Due Date</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFees.map(fee => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{fee.feeHead}</div>
                      <div className="text-sm text-gray-600">{fee.description}</div>
                      {fee.installmentNumber && (
                        <div className="text-xs text-blue-600 mt-1">
                          Installment {fee.installmentNumber} of {fee.totalInstallments}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(fee.category)}`}>
                      {fee.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="font-medium text-gray-900">₹{fee.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`${isOverdue(fee.dueDate) && fee.status !== 'paid' ? 'text-red-600' : 'text-gray-900'}`}>
                      {new Date(fee.dueDate).toLocaleDateString()}
                    </div>
                    {isOverdue(fee.dueDate) && fee.status !== 'paid' && (
                      <div className="text-xs text-red-600 mt-1">Overdue</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(fee.status)}`}>
                      {getStatusIcon(fee.status)}
                      {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      {fee.status !== 'paid' ? (
                        <button
                          onClick={() => handlePayment(fee)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Pay Now
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => downloadReceipt(fee)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                          >
                            <Receipt className="w-4 h-4" />
                            Receipt
                          </button>
                        </div>
                      )}
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Make Payment</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-2">{selectedFee.feeHead}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>Amount: <span className="font-medium text-gray-900">₹{selectedFee.amount.toLocaleString()}</span></div>
                  <div>Due Date: <span className="font-medium text-gray-900">{new Date(selectedFee.dueDate).toLocaleDateString()}</span></div>
                  <div>Category: <span className="font-medium text-gray-900 capitalize">{selectedFee.category}</span></div>
                  <div>Semester: <span className="font-medium text-gray-900">{selectedFee.semester}</span></div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-colors ${
                      paymentMethod === 'card' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-colors ${
                      paymentMethod === 'netbanking' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building className="w-6 h-6 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium">Net Banking</div>
                      <div className="text-sm text-gray-600">All major banks</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-colors ${
                      paymentMethod === 'upi' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium">UPI</div>
                      <div className="text-sm text-gray-600">PhonePe, GPay, Paytm</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-blue-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-900">₹{selectedFee.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                disabled={!paymentMethod}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFeeManagement;
