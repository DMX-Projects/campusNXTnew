import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  Download,
  Filter,
  Search,
  Eye,
  PieChart,
  Info
} from 'lucide-react';

const FinancialsAndFees = () => {
  const [searchDefaulters, setSearchDefaulters] = useState('');
  const [filterRoom, setFilterRoom] = useState('');
  const [selectedDefaulter, setSelectedDefaulter] = useState(null);
  
  // Sample fee structure data (read-only)
  const feeStructure = [
    { id: 1, roomType: 'Single AC', semesterFee: 50000, yearlyFee: 95000 },
    { id: 2, roomType: 'Single Non-AC', semesterFee: 35000, yearlyFee: 65000 },
    { id: 3, roomType: 'Double AC', semesterFee: 40000, yearlyFee: 75000 },
    { id: 4, roomType: 'Double Non-AC', semesterFee: 28000, yearlyFee: 52000 },
    { id: 5, roomType: 'Triple AC', semesterFee: 35000, yearlyFee: 65000 },
    { id: 6, roomType: 'Triple Non-AC', semesterFee: 22000, yearlyFee: 40000 },
  ];

  // Sample financial data
  const financialStats = {
    totalCollected: 2450000,
    totalDues: 380000,
    totalExpected: 2830000,
    defaultersCount: 23
  };

  // Sample defaulters data with additional details
  const defaulters = [
    { 
      id: 1, 
      name: 'Rahul Sharma', 
      roomNo: 'A-101', 
      roomType: 'Single AC', 
      dueAmount: 25000, 
      lastPayment: '2024-08-15', 
      status: 'Critical',
      studentId: 'STU001',
      phone: '+91 9876543210',
      email: 'rahul.sharma@email.com',
      admissionDate: '2023-07-15',
      guardian: 'Mr. Suresh Sharma',
      guardianPhone: '+91 9876543211',
      paymentHistory: [
        { date: '2024-08-15', amount: 25000, type: 'Semester Fee' },
        { date: '2024-02-10', amount: 25000, type: 'Semester Fee' }
      ]
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      roomNo: 'B-205', 
      roomType: 'Double Non-AC', 
      dueAmount: 14000, 
      lastPayment: '2024-09-01', 
      status: 'Warning',
      studentId: 'STU002',
      phone: '+91 9876543220',
      email: 'priya.patel@email.com',
      admissionDate: '2023-08-01',
      guardian: 'Mrs. Meera Patel',
      guardianPhone: '+91 9876543221',
      paymentHistory: [
        { date: '2024-09-01', amount: 14000, type: 'Semester Fee' },
        { date: '2024-03-15', amount: 14000, type: 'Semester Fee' }
      ]
    },
    { 
      id: 3, 
      name: 'Amit Kumar', 
      roomNo: 'C-302', 
      roomType: 'Triple AC', 
      dueAmount: 35000, 
      lastPayment: '2024-07-20', 
      status: 'Critical',
      studentId: 'STU003',
      phone: '+91 9876543230',
      email: 'amit.kumar@email.com',
      admissionDate: '2023-06-20',
      guardian: 'Mr. Rajesh Kumar',
      guardianPhone: '+91 9876543231',
      paymentHistory: [
        { date: '2024-07-20', amount: 17500, type: 'Partial Payment' },
        { date: '2024-01-10', amount: 35000, type: 'Semester Fee' }
      ]
    },
    { 
      id: 4, 
      name: 'Sneha Gupta', 
      roomNo: 'A-205', 
      roomType: 'Single Non-AC', 
      dueAmount: 17500, 
      lastPayment: '2024-08-28', 
      status: 'Warning',
      studentId: 'STU004',
      phone: '+91 9876543240',
      email: 'sneha.gupta@email.com',
      admissionDate: '2023-07-05',
      guardian: 'Mr. Vikash Gupta',
      guardianPhone: '+91 9876543241',
      paymentHistory: [
        { date: '2024-08-28', amount: 17500, type: 'Semester Fee' },
        { date: '2024-02-20', amount: 17500, type: 'Semester Fee' }
      ]
    },
    { 
      id: 5, 
      name: 'Vikash Singh', 
      roomNo: 'B-101', 
      roomType: 'Double AC', 
      dueAmount: 20000, 
      lastPayment: '2024-08-10', 
      status: 'Critical',
      studentId: 'STU005',
      phone: '+91 9876543250',
      email: 'vikash.singh@email.com',
      admissionDate: '2023-08-15',
      guardian: 'Mrs. Sunita Singh',
      guardianPhone: '+91 9876543251',
      paymentHistory: [
        { date: '2024-08-10', amount: 20000, type: 'Semester Fee' },
        { date: '2024-01-25', amount: 20000, type: 'Semester Fee' }
      ]
    },
  ];

  // CSV Export Function
  const exportToCSV = () => {
    const csvData = [
      ['Student Name', 'Student ID', 'Room No', 'Room Type', 'Due Amount', 'Last Payment', 'Status', 'Phone', 'Email', 'Guardian', 'Guardian Phone'],
      ...filteredDefaulters.map(defaulter => [
        defaulter.name,
        defaulter.studentId,
        defaulter.roomNo,
        defaulter.roomType,
        defaulter.dueAmount,
        defaulter.lastPayment,
        defaulter.status,
        defaulter.phone,
        defaulter.email,
        defaulter.guardian,
        defaulter.guardianPhone
      ])
    ];

    const csvString = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `Fee_Defaulters_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredDefaulters = defaulters.filter(defaulter => {
    const matchesSearch = defaulter.name.toLowerCase().includes(searchDefaulters.toLowerCase()) ||
                         defaulter.roomNo.toLowerCase().includes(searchDefaulters.toLowerCase());
    const matchesRoom = filterRoom === '' || defaulter.roomType === filterRoom;
    return matchesSearch && matchesRoom;
  });

  const collectionPercentage = (financialStats.totalCollected / financialStats.totalExpected) * 100;

  // Modal Component for Defaulter Details (Read-only)
  const DefaulterModal = ({ defaulter, onClose }) => {
    if (!defaulter) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose}></div>

          <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-800 shadow-xl rounded-2xl">
            <div className="bg-white dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Student Details - {defaulter.name}
                </h3>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <Eye className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-slate-900 dark:text-white">Personal Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Student ID: </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{defaulter.studentId}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Phone: </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{defaulter.phone}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Email: </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{defaulter.email}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Admission Date: </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{defaulter.admissionDate}</span>
                    </div>
                  </div>
                </div>

                {/* Room & Guardian Information */}
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-slate-900 dark:text-white">Room & Guardian Info</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Room No: </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{defaulter.roomNo}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Room Type: </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{defaulter.roomType}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Guardian: </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{defaulter.guardian}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Guardian Phone: </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{defaulter.guardianPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mt-6">
                <h4 className="text-md font-semibold text-slate-900 dark:text-white mb-4">Payment Information</h4>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Due Amount: </span>
                      <span className="text-lg font-bold text-red-600 dark:text-red-400">₹{defaulter.dueAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Last Payment: </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{defaulter.lastPayment}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Status: </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        defaulter.status === 'Critical' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      }`}>
                        {defaulter.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment History */}
                <h5 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Payment History</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-600">
                        <th className="text-left py-2 text-slate-700 dark:text-slate-300">Date</th>
                        <th className="text-left py-2 text-slate-700 dark:text-slate-300">Amount</th>
                        <th className="text-left py-2 text-slate-700 dark:text-slate-300">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {defaulter.paymentHistory.map((payment, index) => (
                        <tr key={index} className="border-b border-slate-100 dark:border-slate-700">
                          <td className="py-2 text-slate-900 dark:text-white">{payment.date}</td>
                          <td className="py-2 text-slate-900 dark:text-white">₹{payment.amount.toLocaleString()}</td>
                          <td className="py-2 text-slate-900 dark:text-white">{payment.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 px-6 py-4 border-t border-slate-200 dark:border-slate-600">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Info className="w-4 h-4" />
                  <span>Read-only view - Contact administrator for payment updates</span>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Read-only Fee Structure Card
  const FeeStructureCard = ({ fee }) => {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{fee.roomType}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Semester: <span className="font-medium text-slate-900 dark:text-white">₹{fee.semesterFee.toLocaleString()}</span>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Yearly: <span className="font-medium text-slate-900 dark:text-white">₹{fee.yearlyFee.toLocaleString()}</span>
              </p>
            </div>
          </div>
          
          {/* <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">Read-only</span>
          </div> */}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Collections Dashboard */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Collections Dashboard
          </h2>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Collected</p>
                  <p className="text-2xl font-bold">₹{financialStats.totalCollected.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Total Dues</p>
                  <p className="text-2xl font-bold">₹{financialStats.totalDues.toLocaleString()}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Collection Rate</p>
                  <p className="text-2xl font-bold">{collectionPercentage.toFixed(1)}%</p>
                </div>
                <PieChart className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Defaulters</p>
                  <p className="text-2xl font-bold">{financialStats.defaultersCount}</p>
                </div>
                <Users className="w-8 h-8 text-orange-200" />
              </div>
            </div>
          </div>

          {/* Collection Progress Bar */}
          <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall Payment Status</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {collectionPercentage.toFixed(1)}% collected
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${collectionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Fee Structure</h2>
            <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
              {feeStructure.length} room types configured
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {feeStructure.map(fee => (
              <FeeStructureCard key={fee.id} fee={fee} />
            ))}
          </div>
        </div>

        {/* Fee Defaulters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Fee Defaulters</h2>
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export List
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name or room number..."
                  value={searchDefaulters}
                  onChange={(e) => setSearchDefaulters(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterRoom}
                onChange={(e) => setFilterRoom(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="">All Room Types</option>
                <option value="Single AC">Single AC</option>
                <option value="Single Non-AC">Single Non-AC</option>
                <option value="Double AC">Double AC</option>
                <option value="Double Non-AC">Double Non-AC</option>
                <option value="Triple AC">Triple AC</option>
                <option value="Triple Non-AC">Triple Non-AC</option>
              </select>
            </div>
          </div>

          {/* Defaulters Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Student</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Room</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Due Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Last Payment</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDefaulters.map(defaulter => (
                  <tr key={defaulter.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{defaulter.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{defaulter.roomType}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{defaulter.roomNo}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        ₹{defaulter.dueAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-sm">{defaulter.lastPayment}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        defaulter.status === 'Critical' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      }`}>
                        {defaulter.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => setSelectedDefaulter(defaulter)}
                        className="flex items-center gap-1 px-3 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDefaulters.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400">No defaulters found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Modal for Defaulter Details */}
        {selectedDefaulter && (
          <DefaulterModal 
            defaulter={selectedDefaulter} 
            onClose={() => setSelectedDefaulter(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default FinancialsAndFees;
