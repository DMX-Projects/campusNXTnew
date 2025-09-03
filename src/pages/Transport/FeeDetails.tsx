import React, { useState } from 'react';
import { CreditCard, Search, Filter, Calendar, DollarSign, X, FileText, Eye, Banknote, Download, CheckCircle } from 'lucide-react';

// Mock data
const feeRecords = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    studentId: "STD001",
    class: "Class 10-A",
    dueMonth: "January 2025",
    monthlyFee: 5000,
    dueDate: "2025-01-15",
    status: "pending"
  },
  {
    id: 2,
    studentName: "Priya Singh",
    studentId: "STD002",
    class: "Class 9-B",
    dueMonth: "January 2025",
    monthlyFee: 4500,
    dueDate: "2025-01-15",
    status: "paid"
  },
  {
    id: 3,
    studentName: "Amit Kumar",
    studentId: "STD003",
    class: "Class 12-A",
    dueMonth: "January 2025",
    monthlyFee: 5500,
    dueDate: "2025-01-15",
    status: "overdue"
  },
  {
    id: 4,
    studentName: "Sneha Patel",
    studentId: "STD004",
    class: "Class 11-C",
    dueMonth: "January 2025",
    monthlyFee: 5200,
    dueDate: "2025-01-15",
    status: "paid"
  },
  {
    id: 5,
    studentName: "Vikram Reddy",
    studentId: "STD005",
    class: "Class 8-A",
    dueMonth: "January 2025",
    monthlyFee: 4200,
    dueDate: "2025-01-15",
    status: "pending"
  }
];

export default function FeeDetails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modals, setModals] = useState({
    generateReport: false,
    collect: false,
    receipt: false,
    view: false
  });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [collectForm, setCollectForm] = useState({
    amount: '',
    paymentMethod: 'cash',
    transactionId: '',
    notes: ''
  });

  const filteredRecords = feeRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    paid: 'text-green-600 bg-green-50',
    pending: 'text-yellow-600 bg-yellow-50',
    overdue: 'text-red-600 bg-red-50',
  };

  const totalFees = feeRecords.reduce((sum, record) => sum + record.monthlyFee, 0);
  const paidFees = feeRecords.filter(r => r.status === 'paid').reduce((sum, record) => sum + record.monthlyFee, 0);
  const pendingFees = feeRecords.filter(r => r.status !== 'paid').reduce((sum, record) => sum + record.monthlyFee, 0);

  const openModal = (modalName, record = null) => {
    setSelectedRecord(record);
    if (modalName === 'collect' && record) {
      setCollectForm({
        amount: record.monthlyFee.toString(),
        paymentMethod: 'cash',
        transactionId: '',
        notes: ''
      });
    }
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setSelectedRecord(null);
    setCollectForm({
      amount: '',
      paymentMethod: 'cash',
      transactionId: '',
      notes: ''
    });
  };

  const handleCollectPayment = () => {
    alert(`Payment of ₹${collectForm.amount} collected for ${selectedRecord.studentName}`);
    closeModal('collect');
  };

  const handleGenerateReport = (reportType) => {
    // Generate CSV content based on report type
    let csvContent = '';
    let filename = '';
    
    switch(reportType) {
      case 'Monthly':
        csvContent = generateMonthlyReport();
        filename = `Monthly_Fee_Report_${new Date().toISOString().slice(0, 7)}.csv`;
        break;
      case 'Outstanding':
        csvContent = generateOutstandingReport();
        filename = `Outstanding_Fee_Report_${new Date().toISOString().slice(0, 10)}.csv`;
        break;
      case 'Collection':
        csvContent = generateCollectionReport();
        filename = `Collection_Report_${new Date().toISOString().slice(0, 10)}.csv`;
        break;
      case 'Summary':
        csvContent = generateSummaryReport();
        filename = `Summary_Report_${new Date().toISOString().slice(0, 10)}.csv`;
        break;
    }
    
    // Create and download CSV file
    downloadCSV(csvContent, filename);
    closeModal('generateReport');
  };

  const generateMonthlyReport = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    let csv = `Monthly Fee Report - ${currentMonth}\n\n`;
    csv += 'Student Name,Student ID,Class,Monthly Fee,Due Date,Status\n';
    
    feeRecords.forEach(record => {
      csv += `"${record.studentName}","${record.studentId}","${record.class}",₹${record.monthlyFee},"${record.dueDate}","${record.status}"\n`;
    });
    
    csv += '\n\nSummary:\n';
    csv += `Total Students,${feeRecords.length}\n`;
    csv += `Total Fees,₹${totalFees.toLocaleString('en-IN')}\n`;
    csv += `Collected,₹${paidFees.toLocaleString('en-IN')}\n`;
    csv += `Outstanding,₹${pendingFees.toLocaleString('en-IN')}\n`;
    
    return csv;
  };

  const generateOutstandingReport = () => {
    const outstandingRecords = feeRecords.filter(r => r.status !== 'paid');
    let csv = 'Outstanding Fee Report\n\n';
    csv += 'Student Name,Student ID,Class,Amount Due,Due Date,Days Overdue,Status\n';
    
    outstandingRecords.forEach(record => {
      const dueDate = new Date(record.dueDate);
      const today = new Date();
      const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
      
      csv += `"${record.studentName}","${record.studentId}","${record.class}",₹${record.monthlyFee},"${record.dueDate}",${daysOverdue > 0 ? daysOverdue : 0},"${record.status}"\n`;
    });
    
    csv += '\n\nSummary:\n';
    csv += `Total Outstanding Students,${outstandingRecords.length}\n`;
    csv += `Total Outstanding Amount,₹${outstandingRecords.reduce((sum, r) => sum + r.monthlyFee, 0).toLocaleString('en-IN')}\n`;
    
    return csv;
  };

  const generateCollectionReport = () => {
    const paidRecords = feeRecords.filter(r => r.status === 'paid');
    let csv = 'Fee Collection Report\n\n';
    csv += 'Student Name,Student ID,Class,Amount Collected,Payment Date,Payment Method\n';
    
    paidRecords.forEach(record => {
      csv += `"${record.studentName}","${record.studentId}","${record.class}",₹${record.monthlyFee},"${record.dueDate}","Cash"\n`;
    });
    
    csv += '\n\nSummary:\n';
    csv += `Total Collections,${paidRecords.length}\n`;
    csv += `Total Amount Collected,₹${paidFees.toLocaleString('en-IN')}\n`;
    csv += `Collection Rate,${((paidRecords.length / feeRecords.length) * 100).toFixed(1)}%\n`;
    
    return csv;
  };

  const generateSummaryReport = () => {
    let csv = 'Fee Management Summary Report\n\n';
    csv += 'Generated On:,' + new Date().toLocaleDateString('en-IN') + '\n\n';
    
    csv += 'OVERALL STATISTICS:\n';
    csv += `Total Students,${feeRecords.length}\n`;
    csv += `Total Fees,₹${totalFees.toLocaleString('en-IN')}\n`;
    csv += `Collected Fees,₹${paidFees.toLocaleString('en-IN')}\n`;
    csv += `Outstanding Fees,₹${pendingFees.toLocaleString('en-IN')}\n`;
    csv += `Collection Rate,${((paidFees / totalFees) * 100).toFixed(1)}%\n\n`;
    
    csv += 'STATUS BREAKDOWN:\n';
    const statusCounts = {
      paid: feeRecords.filter(r => r.status === 'paid').length,
      pending: feeRecords.filter(r => r.status === 'pending').length,
      overdue: feeRecords.filter(r => r.status === 'overdue').length
    };
    
    csv += `Paid,${statusCounts.paid}\n`;
    csv += `Pending,${statusCounts.pending}\n`;
    csv += `Overdue,${statusCounts.overdue}\n\n`;
    
    csv += 'CLASS WISE BREAKDOWN:\n';
    const classCounts = {};
    feeRecords.forEach(record => {
      if (!classCounts[record.class]) {
        classCounts[record.class] = { count: 0, amount: 0 };
      }
      classCounts[record.class].count++;
      classCounts[record.class].amount += record.monthlyFee;
    });
    
    csv += 'Class,Students,Total Amount\n';
    Object.entries(classCounts).forEach(([className, data]) => {
      csv += `"${className}",${data.count},₹${data.amount.toLocaleString('en-IN')}\n`;
    });
    
    csv += '\n\nDETAILED RECORDS:\n';
    csv += 'Student Name,Student ID,Class,Monthly Fee,Due Date,Status\n';
    feeRecords.forEach(record => {
      csv += `"${record.studentName}","${record.studentId}","${record.class}",₹${record.monthlyFee},"${record.dueDate}","${record.status}"\n`;
    });
    
    return csv;
  };

  const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children, size = 'max-w-md' }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className={`bg-white rounded-xl shadow-2xl w-full ${size} max-h-[90vh] overflow-y-auto`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800"></h3>
          <p className="text-sm text-gray-600"></p>
        </div>
        <button 
          onClick={() => openModal('generateReport')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-center"
        >
          <span className="hidden sm:inline">Generate Report</span>
          <span className="sm:hidden">Report</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{totalFees.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-600">Total Fees</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{paidFees.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-600">Collected</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{pendingFees.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-600">Outstanding</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name or class..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-0"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="block sm:hidden space-y-4">
          {filteredRecords.map((record) => (
            <div key={record.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{record.studentName}</p>
                    <p className="text-sm text-gray-600">ID: {record.studentId}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
                  {record.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <span className="text-gray-500">Class:</span>
                  <p className="font-medium">{record.class}</p>
                </div>
                <div>
                  <span className="text-gray-500">Amount:</span>
                  <p className="font-medium">₹{record.monthlyFee.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-gray-500">Due Month:</span>
                  <p className="font-medium">{record.dueMonth}</p>
                </div>
                <div>
                  <span className="text-gray-500">Due Date:</span>
                  <p className="font-medium">{record.dueDate}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {record.status !== 'paid' ? (
                  <button 
                    onClick={() => openModal('collect', record)}
                    className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors flex-1"
                  >
                    Collect
                  </button>
                ) : (
                  <button 
                    onClick={() => openModal('receipt', record)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-2 border border-blue-600 rounded flex-1"
                  >
                    Receipt
                  </button>
                )}
                <button 
                  onClick={() => openModal('view', record)}
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-2 border border-gray-300 rounded flex-1"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Class</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Due Month</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{record.studentName}</p>
                        <p className="text-sm text-gray-600">ID: {record.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-800">{record.class}</td>
                  <td className="py-4 px-4 text-gray-800">{record.dueMonth}</td>
                  <td className="py-4 px-4 font-semibold text-gray-800">₹{record.monthlyFee.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-gray-800">
                      <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                      {record.dueDate}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      {record.status !== 'paid' ? (
                        <button 
                          onClick={() => openModal('collect', record)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          Collect
                        </button>
                      ) : (
                        <button 
                          onClick={() => openModal('receipt', record)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Receipt
                        </button>
                      )}
                      <button 
                        onClick={() => openModal('view', record)}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Report Modal */}
      <Modal 
        isOpen={modals.generateReport} 
        onClose={() => closeModal('generateReport')} 
        title="Generate Report"
        size="max-w-lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">Select the type of report you want to generate:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleGenerateReport('Monthly')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Monthly Report</p>
                <p className="text-sm text-gray-600">Current month fees</p>
              </div>
            </button>

            <button
              onClick={() => handleGenerateReport('Outstanding')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
            >
              <Download className="w-6 h-6 text-red-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Outstanding Report</p>
                <p className="text-sm text-gray-600">Pending payments</p>
              </div>
            </button>

            <button
              onClick={() => handleGenerateReport('Collection')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <Banknote className="w-6 h-6 text-green-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Collection Report</p>
                <p className="text-sm text-gray-600">Payments received</p>
              </div>
            </button>

            <button
              onClick={() => handleGenerateReport('Summary')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <FileText className="w-6 h-6 text-purple-600 mr-3" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Summary Report</p>
                <p className="text-sm text-gray-600">Complete overview</p>
              </div>
            </button>
          </div>
        </div>
      </Modal>

      {/* Collect Payment Modal */}
      <Modal 
        isOpen={modals.collect} 
        onClose={() => closeModal('collect')} 
        title={`Collect Payment - ${selectedRecord?.studentName}`}
        size="max-w-lg"
      >
        {selectedRecord && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Student Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>
                  <p className="font-medium">{selectedRecord.studentName}</p>
                </div>
                <div>
                  <span className="text-gray-500">Class:</span>
                  <p className="font-medium">{selectedRecord.class}</p>
                </div>
                <div>
                  <span className="text-gray-500">Due Month:</span>
                  <p className="font-medium">{selectedRecord.dueMonth}</p>
                </div>
                <div>
                  <span className="text-gray-500">Due Date:</span>
                  <p className="font-medium">{selectedRecord.dueDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={collectForm.amount}
                  onChange={(e) => setCollectForm({...collectForm, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  value={collectForm.paymentMethod}
                  onChange={(e) => setCollectForm({...collectForm, paymentMethod: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                  <option value="cheque">Cheque</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              {(collectForm.paymentMethod === 'card' || collectForm.paymentMethod === 'upi' || collectForm.paymentMethod === 'bank_transfer') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                  <input
                    type="text"
                    value={collectForm.transactionId}
                    onChange={(e) => setCollectForm({...collectForm, transactionId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter transaction ID"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={collectForm.notes}
                  onChange={(e) => setCollectForm({...collectForm, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows="3"
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => closeModal('collect')}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCollectPayment}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Collect Payment
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Receipt Modal */}
      <Modal 
        isOpen={modals.receipt} 
        onClose={() => closeModal('receipt')} 
        title={`Payment Receipt - ${selectedRecord?.studentName}`}
        size="max-w-lg"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="text-center border-b border-gray-200 pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Payment Successful</h3>
              <p className="text-sm text-gray-600">Receipt #RCP-{selectedRecord.id.toString().padStart(4, '0')}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Student Name:</span>
                <span className="font-medium">{selectedRecord.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Student ID:</span>
                <span className="font-medium">{selectedRecord.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class:</span>
                <span className="font-medium">{selectedRecord.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fee Period:</span>
                <span className="font-medium">{selectedRecord.dueMonth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-bold text-lg">₹{selectedRecord.monthlyFee.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => alert('Receipt downloaded!')}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              <button
                onClick={() => alert('Receipt printed!')}
                className="flex-1 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Print
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Details Modal */}
      <Modal 
        isOpen={modals.view} 
        onClose={() => closeModal('view')} 
        title={`Student Details - ${selectedRecord?.studentName}`}
        size="max-w-2xl"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Personal Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-medium">{selectedRecord.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student ID:</span>
                      <span className="font-medium">{selectedRecord.studentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class:</span>
                      <span className="font-medium">{selectedRecord.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Section:</span>
                      <span className="font-medium">A</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parent Name:</span>
                      <span className="font-medium">Mr. Parent</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">+91 98765 43210</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">parent@email.com</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Fee Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Fee:</span>
                      <span className="font-medium">₹{selectedRecord.monthlyFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Month:</span>
                      <span className="font-medium">{selectedRecord.dueMonth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium">{selectedRecord.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedRecord.status]}`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Payment History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Payment:</span>
                      <span className="font-medium">₹{selectedRecord.monthlyFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Date:</span>
                      <span className="font-medium">15 Dec 2024</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium">Cash</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => closeModal('view')}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  closeModal('view');
                  if (selectedRecord.status !== 'paid') {
                    openModal('collect', selectedRecord);
                  } else {
                    openModal('receipt', selectedRecord);
                  }
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {selectedRecord.status !== 'paid' ? 'Collect Payment' : 'View Receipt'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}