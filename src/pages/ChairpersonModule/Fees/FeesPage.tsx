import React, { useState } from 'react';
import { Plus, DollarSign, CreditCard, AlertTriangle, TrendingUp } from 'lucide-react';
import DataTable from '../../components/Common/DataTable';
import Modal from '../../components/Common/Modal';
import Form from '../../components/Common/Form';
import { mockFeeStructure, mockStudents, FeeStructure } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const FeesPage: React.FC = () => {
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>(mockFeeStructure);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null);
  const [payments, setPayments] = useState([
    { id: 'PAY001', studentId: 'STU001', amount: 98000, paymentDate: '2025-01-10', method: 'Online', status: 'Completed' },
    { id: 'PAY002', studentId: 'STU002', amount: 50000, paymentDate: '2025-01-08', method: 'Bank Transfer', status: 'Completed' },
  ]);

  const feeFormConfig = {
    title: 'Fee Structure',
    fields: [
      { name: 'department', type: 'select', label: 'Department', required: true, options: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'] },
      { name: 'year', type: 'select', label: 'Year', required: true, options: [1, 2, 3, 4] },
      { name: 'semester', type: 'select', label: 'Semester', required: true, options: [1, 2] },
      { name: 'tuitionFee', type: 'number', label: 'Tuition Fee', required: true, min: 0 },
      { name: 'labFee', type: 'number', label: 'Lab Fee', required: true, min: 0 },
      { name: 'libraryFee', type: 'number', label: 'Library Fee', required: true, min: 0 },
      { name: 'examFee', type: 'number', label: 'Exam Fee', required: true, min: 0 },
    ]
  };

  const paymentFormConfig = {
    title: 'Record Payment',
    fields: [
      { name: 'studentId', type: 'select', label: 'Student', required: true, options: mockStudents.map(s => s.id) },
      { name: 'amount', type: 'number', label: 'Amount', required: true, min: 0 },
      { name: 'paymentDate', type: 'date', label: 'Payment Date', required: true },
      { name: 'method', type: 'select', label: 'Payment Method', required: true, options: ['Cash', 'Online', 'Bank Transfer', 'Cheque'] },
      { name: 'transactionId', type: 'text', label: 'Transaction ID' },
      { name: 'remarks', type: 'textarea', label: 'Remarks' },
    ]
  };

  const columns = [
    { key: 'id', label: 'Fee ID', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { 
      key: 'year', 
      label: 'Year/Semester', 
      render: (value: number, row: FeeStructure) => `Year ${value}, Sem ${row.semester}`
    },
    { 
      key: 'tuitionFee', 
      label: 'Tuition Fee', 
      sortable: true,
      render: (value: number) => `₹${value.toLocaleString()}`
    },
    { 
      key: 'totalFee', 
      label: 'Total Fee', 
      sortable: true,
      render: (value: number) => `₹${value.toLocaleString()}`
    },
  ];

  const paymentColumns = [
    { key: 'id', label: 'Payment ID', sortable: true },
    { 
      key: 'studentId', 
      label: 'Student', 
      render: (value: string) => {
        const student = mockStudents.find(s => s.id === value);
        return student ? `${student.firstName} ${student.lastName}` : 'Unknown';
      }
    },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      render: (value: number) => `₹${value.toLocaleString()}`
    },
    { key: 'paymentDate', label: 'Date', sortable: true },
    { key: 'method', label: 'Method', sortable: true },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const handleAddFee = (feeData: any) => {
    const totalFee = feeData.tuitionFee + feeData.labFee + feeData.libraryFee + feeData.examFee;
    const newFee: FeeStructure = {
      ...feeData,
      id: `FEE${String(feeStructures.length + 1).padStart(3, '0')}`,
      totalFee,
    };
    setFeeStructures(prev => [...prev, newFee]);
    setShowAddModal(false);
  };

  const handleEditFee = (feeData: any) => {
    if (selectedFee) {
      const totalFee = feeData.tuitionFee + feeData.labFee + feeData.libraryFee + feeData.examFee;
      setFeeStructures(prev => prev.map(fee => 
        fee.id === selectedFee.id ? { ...fee, ...feeData, totalFee } : fee
      ));
      setShowEditModal(false);
      setSelectedFee(null);
    }
  };

  const handleDeleteFee = (fee: FeeStructure) => {
    if (window.confirm('Are you sure you want to delete this fee structure?')) {
      setFeeStructures(prev => prev.filter(f => f.id !== fee.id));
    }
  };

  const handleEditClick = (fee: FeeStructure) => {
    setSelectedFee(fee);
    setShowEditModal(true);
  };

  const handleRecordPayment = (paymentData: any) => {
    const newPayment = {
      ...paymentData,
      id: `PAY${String(payments.length + 1).padStart(3, '0')}`,
      status: 'Completed'
    };
    setPayments(prev => [...prev, newPayment]);
    setShowPaymentModal(false);
    alert('Payment recorded successfully!');
  };

  // Calculate fee statistics
  const totalCollectable = feeStructures.reduce((sum, fee) => sum + fee.totalFee, 0) * mockStudents.length;
  const totalCollected = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = totalCollectable - totalCollected;

  const paymentMethodData = [
    { method: 'Online', count: payments.filter(p => p.method === 'Online').length, color: '#10B981' },
    { method: 'Bank Transfer', count: payments.filter(p => p.method === 'Bank Transfer').length, color: '#3B82F6' },
    { method: 'Cash', count: payments.filter(p => p.method === 'Cash').length, color: '#F59E0B' },
    { method: 'Cheque', count: payments.filter(p => p.method === 'Cheque').length, color: '#EF4444' },
  ];

  const departmentFeeData = feeStructures.map(fee => ({
    department: fee.department,
    totalFee: fee.totalFee,
    year: fee.year
  }));

  const statsCards = [
    {
      title: 'Total Collectable',
      value: `₹${(totalCollectable / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: 'bg-blue-500',
      change: '+8%'
    },
    {
      title: 'Amount Collected',
      value: `₹${(totalCollected / 100000).toFixed(1)}L`,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+12%'
    },
    {
      title: 'Pending Amount',
      value: `₹${(pendingAmount / 100000).toFixed(1)}L`,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      change: '-5%'
    },
    {
      title: 'Collection Rate',
      value: `${((totalCollected / totalCollectable) * 100).toFixed(1)}%`,
      icon: CreditCard,
      color: 'bg-purple-500',
      change: '+3%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Fee Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage fee structures and payments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Fee Structure</span>
          </button>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-green-600 dark:text-green-400 text-sm">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Fee Structure */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Department-wise Fee Structure</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentFeeData}>
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
              <Bar dataKey="totalFee" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Payment Methods Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ method, count }) => `${method}: ${count}`}
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fee Structures Table */}
      <DataTable
        data={feeStructures}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDeleteFee}
        searchable={true}
        exportable={true}
      />

      {/* Recent Payments */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Payments</h3>
        </div>
        <div className="p-6">
          <DataTable
            data={payments}
            columns={paymentColumns}
            searchable={true}
            exportable={true}
          />
        </div>
      </div>

      {/* Add Fee Structure Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add Fee Structure"
        size="lg"
      >
        <Form
          config={feeFormConfig}
          onSubmit={handleAddFee}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Fee Structure Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit Fee Structure"
        size="lg"
      >
        {selectedFee && (
          <Form
            config={feeFormConfig}
            initialData={selectedFee}
            onSubmit={handleEditFee}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedFee(null);
            }}
          />
        )}
      </Modal>

      {/* Record Payment Modal */}
      <Modal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)}
        title="Record Payment"
        size="lg"
      >
        <Form
          config={paymentFormConfig}
          onSubmit={handleRecordPayment}
          onCancel={() => setShowPaymentModal(false)}
        />
      </Modal>
    </div>
  );
};

export default FeesPage;