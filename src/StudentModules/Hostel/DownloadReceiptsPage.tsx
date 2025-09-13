import React, { useState } from 'react';
import { 
  Download, FileText, Calendar, Clock, DollarSign, 
  Eye, Search, Filter, CheckCircle, AlertCircle,
  Home, Building2, User, Phone, Mail, RefreshCw, X
} from 'lucide-react';

interface Receipt {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  paymentDate: string;
  amount: number;
  paymentType: string;
  paymentMethod: string;
  transactionId: string;
  status: 'Success' | 'Pending' | 'Failed';
  description: string;
  academicYear: string;
  semester: string;
  downloadUrl: string;
  fileSize: string;
}

const DownloadReceiptsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    roomNumber: 'A-201',
    phoneNumber: '+91-9876543210',
    email: 'arjun.kumar@college.edu.in'
  };

  const receipts: Receipt[] = [
    {
      id: 'RCP001',
      receiptNumber: 'RCP-2025-001',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      paymentDate: '2025-01-01',
      amount: 9000,
      paymentType: 'Monthly Fee',
      paymentMethod: 'Online Payment',
      transactionId: 'TXN123456789',
      status: 'Success',
      description: 'January 2025 - Hostel Fee (Rent + Mess Fee)',
      academicYear: '2024-25',
      semester: 'Semester 4',
      downloadUrl: '/receipts/rcp-2025-001.pdf',
      fileSize: '245 KB'
    },
    {
      id: 'RCP002',
      receiptNumber: 'RCP-2023-002',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      paymentDate: '2023-07-15',
      amount: 10000,
      paymentType: 'Security Deposit',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN987654321',
      status: 'Success',
      description: 'Security Deposit - Hostel Admission',
      academicYear: '2023-24',
      semester: 'Semester 1',
      downloadUrl: '/receipts/rcp-2023-002.pdf',
      fileSize: '198 KB'
    },
    {
      id: 'RCP003',
      receiptNumber: 'RCP-2024-003',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      paymentDate: '2024-12-01',
      amount: 8500,
      paymentType: 'Monthly Fee',
      paymentMethod: 'UPI Payment',
      transactionId: 'TXN456789123',
      status: 'Success',
      description: 'December 2024 - Hostel Fee (Rent + Mess Fee)',
      academicYear: '2024-25',
      semester: 'Semester 3',
      downloadUrl: '/receipts/rcp-2024-003.pdf',
      fileSize: '267 KB'
    },
    {
      id: 'RCP004',
      receiptNumber: 'RCP-2024-004',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      paymentDate: '2024-11-01',
      amount: 8000,
      paymentType: 'Monthly Fee',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN789123456',
      status: 'Success',
      description: 'November 2024 - Hostel Fee (Rent + Mess Fee)',
      academicYear: '2024-25',
      semester: 'Semester 3',
      downloadUrl: '/receipts/rcp-2024-004.pdf',
      fileSize: '223 KB'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case 'Monthly Fee': return 'bg-blue-100 text-blue-800';
      case 'Security Deposit': return 'bg-purple-100 text-purple-800';
      case 'Late Fee': return 'bg-red-100 text-red-800';
      case 'Maintenance Fee': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.paymentType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || receipt.paymentType === filterType;
    return matchesSearch && matchesFilter;
  });

  const openReceiptModal = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setShowReceiptModal(true);
  };

  const downloadReceipt = (receipt: Receipt) => {
    // In a real application, this would trigger the actual download
    alert(`Downloading receipt: ${receipt.receiptNumber}`);
  };

  const downloadAllReceipts = () => {
    alert('Downloading all receipts as ZIP file...');
  };

  const getTotalAmount = () => {
    return receipts.reduce((total, receipt) => total + receipt.amount, 0);
  };

  const getPaymentMethods = () => {
    return [...new Set(receipts.map(receipt => receipt.paymentMethod))];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="  mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Download Receipts</h1>
                <p className="text-gray-600">View and download your payment receipts</p>
              </div>
            </div>
            <button
              onClick={downloadAllReceipts}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download All
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Total Receipts</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{receipts.length}</p>
            <p className="text-sm text-gray-600">Payment records</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Total Amount</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">₹{getTotalAmount().toLocaleString()}</p>
            <p className="text-sm text-gray-600">All payments</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Successful</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">{receipts.filter(r => r.status === 'Success').length}</p>
            <p className="text-sm text-gray-600">Payments</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <RefreshCw className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Payment Methods</h3>
            </div>
            <p className="text-2xl font-bold text-orange-600">{getPaymentMethods().length}</p>
            <p className="text-sm text-gray-600">Different methods</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search receipts by number, description, or type..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Types</option>
                  <option value="Monthly Fee">Monthly Fee</option>
                  <option value="Security Deposit">Security Deposit</option>
                  <option value="Late Fee">Late Fee</option>
                  <option value="Maintenance Fee">Maintenance Fee</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Receipts List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Receipts</h2>
          
          {filteredReceipts.length > 0 ? (
            <div className="space-y-4">
              {filteredReceipts.map((receipt) => (
                <div key={receipt.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {receipt.receiptNumber}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(receipt.status)}`}>
                        {receipt.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentTypeColor(receipt.paymentType)}`}>
                        {receipt.paymentType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openReceiptModal(receipt)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => downloadReceipt(receipt)}
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
                          <span className="text-sm text-gray-600">Amount: ₹{receipt.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Method: {receipt.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Transaction Info</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 font-mono">TXN: {receipt.transactionId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Size: {receipt.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Academic Info</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Year: {receipt.academicYear}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{receipt.semester}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                    <p className="text-sm text-gray-600">{receipt.description}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Payment Date: {new Date(receipt.paymentDate).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Generated: {new Date(receipt.paymentDate).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Receipts Found</h3>
              <p className="text-gray-500">No receipts match your search criteria</p>
            </div>
          )}
        </div>

        {/* Receipt Modal */}
        {showReceiptModal && selectedReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Receipt Details - {selectedReceipt.receiptNumber}</h3>
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
                  <p className="text-sm text-gray-500">Receipt #{selectedReceipt.receiptNumber}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Student Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {selectedReceipt.studentName}</p>
                      <p><strong>Student ID:</strong> {selectedReceipt.studentId}</p>
                      <p><strong>Room:</strong> {selectedReceipt.roomNumber}</p>
                      <p><strong>Academic Year:</strong> {selectedReceipt.academicYear}</p>
                      <p><strong>Semester:</strong> {selectedReceipt.semester}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Payment Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Amount:</strong> ₹{selectedReceipt.amount.toLocaleString()}</p>
                      <p><strong>Type:</strong> {selectedReceipt.paymentType}</p>
                      <p><strong>Method:</strong> {selectedReceipt.paymentMethod}</p>
                      <p><strong>Date:</strong> {new Date(selectedReceipt.paymentDate).toLocaleDateString('en-IN')}</p>
                      <p><strong>Status:</strong> {selectedReceipt.status}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Transaction Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Transaction ID:</strong> {selectedReceipt.transactionId}</p>
                    <p><strong>Description:</strong> {selectedReceipt.description}</p>
                    <p><strong>File Size:</strong> {selectedReceipt.fileSize}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Important Notes</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• This receipt is valid for tax and accounting purposes</li>
                    <li>• Keep this receipt for your records</li>
                    <li>• For any queries, contact the hostel administration</li>
                    <li>• Receipt generated on {new Date(selectedReceipt.paymentDate).toLocaleString('en-IN')}</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => downloadReceipt(selectedReceipt)}
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

export default DownloadReceiptsPage;