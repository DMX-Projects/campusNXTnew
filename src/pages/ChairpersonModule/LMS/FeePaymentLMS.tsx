import React, { useState } from 'react';
import { CreditCardIcon, DollarSignIcon, CheckCircleIcon, ClockIcon, SearchIcon, FilterIcon, DownloadIcon } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  semester: string;
  email: string;
  phone: string;
}

interface FeeStructure {
  id: string;
  category: string;
  description: string;
  amount: number;
  dueDate: string;
  mandatory: boolean;
  department: string;
  semester: string;
}

interface Payment {
  id: string;
  studentId: string;
  feeStructureId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'online' | 'cash' | 'cheque' | 'dd';
  transactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  receiptNumber: string;
}

interface FeeWaiver {
  id: string;
  studentId: string;
  amount: number;
  reason: string;
  approvedBy: string;
  approvalDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const FeePaymentLMS: React.FC = () => {
  const [students] = useState<Student[]>([
    {
      id: 'S001',
      name: 'Rahul Sharma',
      rollNumber: 'CSE001',
      department: 'CSE',
      semester: '3',
      email: 'rahul.sharma@college.edu',
      phone: '+91-9876543210'
    },
    {
      id: 'S002',
      name: 'Priya Singh',
      rollNumber: 'CSE002',
      department: 'CSE',
      semester: '3',
      email: 'priya.singh@college.edu',
      phone: '+91-9876543211'
    },
    {
      id: 'S003',
      name: 'Amit Kumar',
      rollNumber: 'CSE003',
      department: 'CSE',
      semester: '3',
      email: 'amit.kumar@college.edu',
      phone: '+91-9876543212'
    }
  ]);

  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([
    {
      id: '1',
      category: 'Tuition Fee',
      description: 'Semester tuition fee',
      amount: 75000,
      dueDate: '2025-09-30',
      mandatory: true,
      department: 'CSE',
      semester: '3'
    },
    {
      id: '2',
      category: 'Laboratory Fee',
      description: 'Computer lab and equipment fee',
      amount: 15000,
      dueDate: '2025-09-30',
      mandatory: true,
      department: 'CSE',
      semester: '3'
    },
    {
      id: '3',
      category: 'Hostel Fee',
      description: 'Accommodation and mess charges',
      amount: 45000,
      dueDate: '2025-09-15',
      mandatory: false,
      department: 'All',
      semester: 'All'
    },
    {
      id: '4',
      category: 'Examination Fee',
      description: 'Mid-semester and final examination fee',
      amount: 5000,
      dueDate: '2025-10-15',
      mandatory: true,
      department: 'All',
      semester: 'All'
    }
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      studentId: 'S001',
      feeStructureId: '1',
      amount: 75000,
      paymentDate: '2025-08-15',
      paymentMethod: 'online',
      transactionId: 'TXN123456789',
      status: 'completed',
      receiptNumber: 'REC001'
    },
    {
      id: '2',
      studentId: 'S002',
      feeStructureId: '1',
      amount: 75000,
      paymentDate: '2025-08-20',
      paymentMethod: 'online',
      transactionId: 'TXN123456790',
      status: 'completed',
      receiptNumber: 'REC002'
    },
    {
      id: '3',
      studentId: 'S003',
      feeStructureId: '2',
      amount: 15000,
      paymentDate: '2025-08-25',
      paymentMethod: 'cheque',
      transactionId: 'CHQ001',
      status: 'pending',
      receiptNumber: 'REC003'
    }
  ]);

  const [feeWaivers, setFeeWaivers] = useState<FeeWaiver[]>([
    {
      id: '1',
      studentId: 'S001',
      amount: 25000,
      reason: 'Financial hardship due to family circumstances',
      approvedBy: 'Chairperson',
      approvalDate: '2025-08-10',
      status: 'approved'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'overview' | 'payments' | 'structure' | 'waivers'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddFeeModalOpen, setIsAddFeeModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isWaiverModalOpen, setIsWaiverModalOpen] = useState(false);
  const [newFeeStructure, setNewFeeStructure] = useState<Partial<FeeStructure>>({});
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({});
  const [newWaiver, setNewWaiver] = useState<Partial<FeeWaiver>>({});

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const paymentMethods = ['online', 'cash', 'cheque', 'dd'];

  const calculateStudentBalance = (studentId: string) => {
    const studentPayments = payments.filter(p => p.studentId === studentId && p.status === 'completed');
    const studentWaivers = feeWaivers.filter(w => w.studentId === studentId && w.status === 'approved');
    const student = students.find(s => s.id === studentId);
    
    if (!student) return { totalFee: 0, paid: 0, waived: 0, balance: 0 };
    
    const applicableFees = feeStructures.filter(fee => 
      fee.department === student.department || fee.department === 'All'
    );
    
    const totalFee = applicableFees.reduce((sum, fee) => sum + fee.amount, 0);
    const paid = studentPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const waived = studentWaivers.reduce((sum, waiver) => sum + waiver.amount, 0);
    const balance = totalFee - paid - waived;
    
    return { totalFee, paid, waived, balance };
  };

  const handleAddFeeStructure = () => {
    if (newFeeStructure.category && newFeeStructure.amount && newFeeStructure.dueDate) {
      const feeStructure: FeeStructure = {
        id: Date.now().toString(),
        category: newFeeStructure.category,
        description: newFeeStructure.description || '',
        amount: newFeeStructure.amount,
        dueDate: newFeeStructure.dueDate,
        mandatory: newFeeStructure.mandatory ?? true,
        department: newFeeStructure.department || 'All',
        semester: newFeeStructure.semester || 'All'
      };
      
      setFeeStructures([...feeStructures, feeStructure]);
      setNewFeeStructure({});
      setIsAddFeeModalOpen(false);
      alert('Fee structure added successfully!');
    }
  };

  const handleRecordPayment = () => {
    if (newPayment.studentId && newPayment.feeStructureId && newPayment.amount) {
      const payment: Payment = {
        id: Date.now().toString(),
        studentId: newPayment.studentId,
        feeStructureId: newPayment.feeStructureId,
        amount: newPayment.amount,
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: newPayment.paymentMethod || 'online',
        transactionId: newPayment.transactionId || `TXN${Date.now()}`,
        status: 'completed',
        receiptNumber: `REC${Date.now()}`
      };
      
      setPayments([...payments, payment]);
      setNewPayment({});
      setIsPaymentModalOpen(false);
      alert('Payment recorded successfully!');
    }
  };

  const handleApproveWaiver = () => {
    if (newWaiver.studentId && newWaiver.amount && newWaiver.reason) {
      const waiver: FeeWaiver = {
        id: Date.now().toString(),
        studentId: newWaiver.studentId,
        amount: newWaiver.amount,
        reason: newWaiver.reason,
        approvedBy: 'Chairperson',
        approvalDate: new Date().toISOString().split('T')[0],
        status: 'approved'
      };
      
      setFeeWaivers([...feeWaivers, waiver]);
      setNewWaiver({});
      setIsWaiverModalOpen(false);
      alert('Fee waiver approved successfully!');
    }
  };

  const updatePaymentStatus = (paymentId: string, status: 'completed' | 'failed' | 'refunded') => {
    const updatedPayments = payments.map(payment => 
      payment.id === paymentId ? { ...payment, status } : payment
    );
    setPayments(updatedPayments);
    alert(`Payment status updated to ${status}!`);
  };

  const generateReceipt = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    const student = students.find(s => s.id === payment?.studentId);
    const feeStructure = feeStructures.find(f => f.id === payment?.feeStructureId);
    
    if (payment && student && feeStructure) {
      alert(`Receipt generated!\n\nStudent: ${student.name}\nFee: ${feeStructure.category}\nAmount: ₹${payment.amount.toLocaleString()}\nReceipt No: ${payment.receiptNumber}`);
    }
  };

  const sendPaymentReminder = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    const balance = calculateStudentBalance(studentId);
    
    if (student && balance.balance > 0) {
      alert(`Payment reminder sent to ${student.name}\n\nPending Amount: ₹${balance.balance.toLocaleString()}\nEmail: ${student.email}\nPhone: ${student.phone}`);
    }
  };

  const exportFeeReport = () => {
    const reportData = students.map(student => {
      const balance = calculateStudentBalance(student.id);
      return {
        rollNumber: student.rollNumber,
        name: student.name,
        department: student.department,
        totalFee: balance.totalFee,
        paid: balance.paid,
        waived: balance.waived,
        balance: balance.balance
      };
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Roll Number,Name,Department,Total Fee,Paid,Waived,Balance\n" +
      reportData.map(row => 
        `${row.rollNumber},"${row.name}",${row.department},${row.totalFee},${row.paid},${row.waived},${row.balance}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fee_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-purple-100 text-purple-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const stats = {
    totalStudents: students.length,
    totalCollected: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: students.reduce((sum, student) => sum + calculateStudentBalance(student.id).balance, 0),
    totalWaivers: feeWaivers.filter(w => w.status === 'approved').reduce((sum, w) => sum + w.amount, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Fee Payment Management</h1>
              <p className="text-gray-600 mt-1">Manage student fees, payments, and financial records</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAddFeeModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Fee Structure
              </button>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Record Payment
              </button>
              <button
                onClick={exportFeeReport}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export Report
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Fully Paid</option>
              <option value="pending">Pending Payment</option>
              <option value="partial">Partially Paid</option>
            </select>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'overview', label: 'Overview', icon: DollarSignIcon },
              { key: 'payments', label: 'Payments', icon: CreditCardIcon },
              { key: 'structure', label: 'Fee Structure', icon: FilterIcon },
              { key: 'waivers', label: 'Waivers', icon: CheckCircleIcon }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedTab(key as 'overview' | 'payments' | 'structure' | 'waivers')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <div className="text-2xl">👥</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Collected</p>
                <p className="text-2xl font-bold text-green-600">₹{(stats.totalCollected / 100000).toFixed(1)}L</p>
              </div>
              <CheckCircleIcon className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Amount</p>
                <p className="text-2xl font-bold text-red-600">₹{(stats.pendingAmount / 100000).toFixed(1)}L</p>
              </div>
              <ClockIcon className="text-red-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Waivers</p>
                <p className="text-2xl font-bold text-purple-600">₹{(stats.totalWaivers / 100000).toFixed(1)}L</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </div>
        </div>

        {/* Content based on selected tab */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            {selectedTab === 'overview' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Student Fee Overview ({students.length})
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-medium text-gray-900">Student</th>
                        <th className="text-left p-3 font-medium text-gray-900">Department</th>
                        <th className="text-left p-3 font-medium text-gray-900">Total Fee</th>
                        <th className="text-left p-3 font-medium text-gray-900">Paid</th>
                        <th className="text-left p-3 font-medium text-gray-900">Waived</th>
                        <th className="text-left p-3 font-medium text-gray-900">Balance</th>
                        <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students
                        .filter(student => 
                          (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
                          (selectedDepartment === 'all' || student.department === selectedDepartment)
                        )
                        .map((student) => {
                          const balance = calculateStudentBalance(student.id);
                          return (
                            <tr key={student.id} className="border-t border-gray-200 hover:bg-gray-50">
                              <td className="p-3">
                                <div>
                                  <div className="font-medium text-gray-900">{student.name}</div>
                                  <div className="text-sm text-gray-500">{student.rollNumber}</div>
                                </div>
                              </td>
                              <td className="p-3 text-gray-700">{student.department} - Sem {student.semester}</td>
                              <td className="p-3 font-medium">₹{balance.totalFee.toLocaleString()}</td>
                              <td className="p-3 text-green-600 font-medium">₹{balance.paid.toLocaleString()}</td>
                              <td className="p-3 text-purple-600 font-medium">₹{balance.waived.toLocaleString()}</td>
                              <td className="p-3">
                                <span className={`font-medium ${balance.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                  ₹{balance.balance.toLocaleString()}
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="flex gap-1">
                                  {balance.balance > 0 && (
                                    <>
                                      <button
                                        onClick={() => sendPaymentReminder(student.id)}
                                        className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded text-xs transition-colors"
                                      >
                                        Remind
                                      </button>
                                      <button
                                        onClick={() => setIsWaiverModalOpen(true)}
                                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded text-xs transition-colors"
                                      >
                                        Waiver
                                      </button>
                                    </>
                                  )}
                                  {/* <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs transition-colors">
                                    View
                                  </button> */}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {selectedTab === 'payments' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Records ({payments.length})
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-medium text-gray-900">Student</th>
                        <th className="text-left p-3 font-medium text-gray-900">Fee Category</th>
                        <th className="text-left p-3 font-medium text-gray-900">Amount</th>
                        <th className="text-left p-3 font-medium text-gray-900">Method</th>
                        <th className="text-left p-3 font-medium text-gray-900">Date</th>
                        <th className="text-left p-3 font-medium text-gray-900">Status</th>
                        <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => {
                        const student = students.find(s => s.id === payment.studentId);
                        const feeStructure = feeStructures.find(f => f.id === payment.feeStructureId);
                        return (
                          <tr key={payment.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="p-3">
                              <div>
                                <div className="font-medium text-gray-900">{student?.name}</div>
                                <div className="text-sm text-gray-500">{student?.rollNumber}</div>
                              </div>
                            </td>
                            <td className="p-3 text-gray-700">{feeStructure?.category}</td>
                            <td className="p-3 font-medium">₹{payment.amount.toLocaleString()}</td>
                            <td className="p-3 capitalize">{payment.paymentMethod}</td>
                            <td className="p-3">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                {payment.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-1">
                                <button
                                  onClick={() => generateReceipt(payment.id)}
                                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs transition-colors"
                                >
                                  Receipt
                                </button>
                                {payment.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => updatePaymentStatus(payment.id, 'completed')}
                                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-xs transition-colors"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => updatePaymentStatus(payment.id, 'failed')}
                                      className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs transition-colors"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {selectedTab === 'structure' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Fee Structure ({feeStructures.length})
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {feeStructures.map((fee) => (
                    <div key={fee.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{fee.category}</h3>
                          <p className="text-sm text-gray-600 mt-1">{fee.description}</p>
                        </div>
                        {fee.mandatory && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                            Mandatory
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Amount:</span>
                          <span className="font-semibold text-gray-900">₹{fee.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Due Date:</span>
                          <span className="text-sm text-gray-900">{new Date(fee.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Department:</span>
                          <span className="text-sm text-gray-900">{fee.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Semester:</span>
                          <span className="text-sm text-gray-900">{fee.semester}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {/* <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs transition-colors">
                          Edit
                        </button>
                        <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs transition-colors">
                          Delete
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {selectedTab === 'waivers' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Fee Waivers ({feeWaivers.length})
                </h2>
                
                <div className="space-y-4">
                  {feeWaivers.map((waiver) => {
                    const student = students.find(s => s.id === waiver.studentId);
                    return (
                      <div key={waiver.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{student?.name}</h3>
                            <p className="text-sm text-gray-600">{student?.rollNumber} - {student?.department}</p>
                            <p className="text-gray-700 mt-2">{waiver.reason}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg text-purple-600">₹{waiver.amount.toLocaleString()}</div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(waiver.status)}`}>
                              {waiver.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>Approved by: {waiver.approvedBy}</span>
                          <span>Date: {new Date(waiver.approvalDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Add Fee Structure Modal */}
        {isAddFeeModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add Fee Structure</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fee Category</label>
                  <input
                    type="text"
                    value={newFeeStructure.category || ''}
                    onChange={(e) => setNewFeeStructure({...newFeeStructure, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter fee category"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newFeeStructure.description || ''}
                    onChange={(e) => setNewFeeStructure({...newFeeStructure, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                    <input
                      type="number"
                      value={newFeeStructure.amount || ''}
                      onChange={(e) => setNewFeeStructure({...newFeeStructure, amount: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newFeeStructure.dueDate || ''}
                      onChange={(e) => setNewFeeStructure({...newFeeStructure, dueDate: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={newFeeStructure.department || ''}
                      onChange={(e) => setNewFeeStructure({...newFeeStructure, department: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Department</option>
                      <option value="All">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                    <select
                      value={newFeeStructure.semester || ''}
                      onChange={(e) => setNewFeeStructure({...newFeeStructure, semester: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Semester</option>
                      <option value="All">All Semesters</option>
                      {Array.from({length: 8}, (_, i) => i + 1).map(sem => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newFeeStructure.mandatory ?? true}
                      onChange={(e) => setNewFeeStructure({...newFeeStructure, mandatory: e.target.checked})}
                      className="mr-2 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Mandatory Fee</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsAddFeeModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFeeStructure}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Fee Structure
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Record Payment Modal */}
        {isPaymentModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Record Payment</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
                  <select
                    value={newPayment.studentId || ''}
                    onChange={(e) => setNewPayment({...newPayment, studentId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fee Category</label>
                  <select
                    value={newPayment.feeStructureId || ''}
                    onChange={(e) => setNewPayment({...newPayment, feeStructureId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Fee Category</option>
                    {feeStructures.map(fee => (
                      <option key={fee.id} value={fee.id}>
                        {fee.category} - ₹{fee.amount.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                    <input
                      type="number"
                      value={newPayment.amount || ''}
                      onChange={(e) => setNewPayment({...newPayment, amount: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select
                      value={newPayment.paymentMethod || ''}
                      onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value as 'online' | 'cash' | 'cheque' | 'dd'})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Method</option>
                      {paymentMethods.map(method => (
                        <option key={method} value={method}>
                          {method.charAt(0).toUpperCase() + method.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                  <input
                    type="text"
                    value={newPayment.transactionId || ''}
                    onChange={(e) => setNewPayment({...newPayment, transactionId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter transaction ID"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRecordPayment}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Record Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Fee Waiver Modal */}
        {isWaiverModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Approve Fee Waiver</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
                  <select
                    value={newWaiver.studentId || ''}
                    onChange={(e) => setNewWaiver({...newWaiver, studentId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waiver Amount (₹)</label>
                  <input
                    type="number"
                    value={newWaiver.amount || ''}
                    onChange={(e) => setNewWaiver({...newWaiver, amount: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter waiver amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                  <textarea
                    value={newWaiver.reason || ''}
                    onChange={(e) => setNewWaiver({...newWaiver, reason: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter reason for fee waiver"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsWaiverModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApproveWaiver}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Approve Waiver
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeePaymentLMS;
