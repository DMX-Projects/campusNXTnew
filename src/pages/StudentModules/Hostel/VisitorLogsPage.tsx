import React, { useState } from 'react';
import { 
  ClipboardList, Calendar, Clock, MapPin, Phone, 
  User, FileText, QrCode, CheckCircle, AlertTriangle,
  Eye, Filter, Search, Download, RefreshCw, CalendarDays,
  Users, TrendingUp, BarChart3, Clock3, CheckSquare,X
} from 'lucide-react';

interface VisitorLog {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  visitorName: string;
  visitorRelation: string;
  visitorPhone: string;
  visitorIdProof: string;
  visitorIdNumber: string;
  visitDate: string;
  visitTime: string;
  expectedDuration: string;
  purpose: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled';
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  qrCode?: string;
  checkInTime?: string;
  checkOutTime?: string;
  actualDuration?: string;
  remarks?: string;
  feedback?: string;
}

const VisitorLogsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorLog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    roomNumber: 'A-201',
    phoneNumber: '+91-9876543210',
    email: 'arjun.kumar@college.edu.in',
    hostelId: 'H001',
    warden: 'Ms. Maria Garcia'
  };

  const visitorLogs: VisitorLog[] = [
    {
      id: 'VIS001',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      visitorName: 'Rajesh Kumar',
      visitorRelation: 'Father',
      visitorPhone: '+91-9876543211',
      visitorIdProof: 'Aadhar Card',
      visitorIdNumber: '1234-5678-9012',
      visitDate: '2025-01-20',
      visitTime: '14:00',
      expectedDuration: '2 hours',
      purpose: 'Family visit',
      status: 'Completed',
      submittedDate: '2025-01-18',
      approvedBy: 'Ms. Maria Garcia',
      approvedDate: '2025-01-19',
      qrCode: 'QR-VIS001-20250120',
      checkInTime: '14:05',
      checkOutTime: '16:30',
      actualDuration: '2 hours 25 minutes',
      remarks: 'Visit completed successfully',
      feedback: 'Smooth entry and exit process'
    },
    {
      id: 'VIS002',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      visitorName: 'Meera Patel',
      visitorRelation: 'Sister',
      visitorPhone: '+91-9876543222',
      visitorIdProof: 'Driving License',
      visitorIdNumber: 'DL-123456789',
      visitDate: '2025-01-22',
      visitTime: '10:00',
      expectedDuration: '4 hours',
      purpose: 'Personal visit',
      status: 'Approved',
      submittedDate: '2025-01-20',
      approvedBy: 'Ms. Maria Garcia',
      approvedDate: '2025-01-21',
      qrCode: 'QR-VIS002-20250122',
      remarks: 'Ready for visit'
    },
    {
      id: 'VIS003',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      visitorName: 'Dr. Anil Kumar',
      visitorRelation: 'Doctor',
      visitorPhone: '+91-9876543233',
      visitorIdProof: 'Medical License',
      visitorIdNumber: 'MED-123456',
      visitDate: '2025-01-15',
      visitTime: '16:00',
      expectedDuration: '1 hour',
      purpose: 'Medical consultation',
      status: 'Completed',
      submittedDate: '2025-01-14',
      approvedBy: 'Ms. Maria Garcia',
      approvedDate: '2025-01-14',
      qrCode: 'QR-VIS003-20250115',
      checkInTime: '16:05',
      checkOutTime: '17:10',
      actualDuration: '1 hour 5 minutes',
      remarks: 'Medical consultation completed',
      feedback: 'Professional and efficient service'
    },
    {
      id: 'VIS004',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      visitorName: 'Priya Sharma',
      visitorRelation: 'Friend',
      visitorPhone: '+91-9876543244',
      visitorIdProof: 'Aadhar Card',
      visitorIdNumber: '9876-5432-1098',
      visitDate: '2025-01-10',
      visitTime: '18:00',
      expectedDuration: '3 hours',
      purpose: 'Study group meeting',
      status: 'Completed',
      submittedDate: '2025-01-08',
      approvedBy: 'Ms. Maria Garcia',
      approvedDate: '2025-01-09',
      qrCode: 'QR-VIS004-20250110',
      checkInTime: '18:10',
      checkOutTime: '21:15',
      actualDuration: '3 hours 5 minutes',
      remarks: 'Study session completed',
      feedback: 'Good study environment'
    },
    {
      id: 'VIS005',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      visitorName: 'Vikram Singh',
      visitorRelation: 'Cousin',
      visitorPhone: '+91-9876543255',
      visitorIdProof: 'Passport',
      visitorIdNumber: 'P1234567',
      visitDate: '2025-01-25',
      visitTime: '12:00',
      expectedDuration: '6 hours',
      purpose: 'Family gathering',
      status: 'Pending',
      submittedDate: '2025-01-23',
      remarks: 'Under review'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckSquare className="w-4 h-4 text-green-600" />;
      case 'Approved': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Rejected': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Cancelled': return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getFilteredLogs = () => {
    let filtered = visitorLogs;

    // Filter by date range
    const now = new Date();
    if (activeTab === 'today') {
      const today = now.toISOString().split('T')[0];
      filtered = filtered.filter(log => log.visitDate === today);
    } else if (activeTab === 'week') {
      const weekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
      filtered = filtered.filter(log => new Date(log.visitDate) >= weekAgo);
    } else if (activeTab === 'month') {
      const monthAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      filtered = filtered.filter(log => new Date(log.visitDate) >= monthAgo);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.visitorRelation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const openDetailsModal = (visitor: VisitorLog) => {
    setSelectedVisitor(visitor);
    setShowDetailsModal(true);
  };

  const exportLogs = () => {
    const csvContent = [
      ['Visitor Name', 'Relation', 'Visit Date', 'Status', 'Purpose', 'Check-in', 'Check-out', 'Duration'],
      ...getFilteredLogs().map(log => [
        log.visitorName,
        log.visitorRelation,
        log.visitDate,
        log.status,
        log.purpose,
        log.checkInTime || 'N/A',
        log.checkOutTime || 'N/A',
        log.actualDuration || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitor-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStats = () => {
    const logs = getFilteredLogs();
    return {
      total: logs.length,
      completed: logs.filter(log => log.status === 'Completed').length,
      pending: logs.filter(log => log.status === 'Pending').length,
      approved: logs.filter(log => log.status === 'Approved').length
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <ClipboardList className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Visitor Logs</h1>
              <p className="text-gray-600">Track and manage all visitor activities</p>
            </div>
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
              <MapPin className="w-5 h-5 text-gray-500" />
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
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Warden</p>
                <p className="font-medium">{currentStudent.warden}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Total Visitors</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-sm text-gray-600">All time</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckSquare className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Completed</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-sm text-gray-600">Visits completed</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Pending</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-gray-600">Awaiting approval</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Approved</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.approved}</p>
            <p className="text-sm text-gray-600">Ready to visit</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search visitors, relations, or purposes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={exportLogs}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'all', label: 'All Logs', icon: ClipboardList },
              { key: 'today', label: 'Today', icon: Calendar },
              { key: 'week', label: 'This Week', icon: CalendarDays },
              { key: 'month', label: 'This Month', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
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

        {/* Visitor Logs Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Visitor Logs</h2>
          
          {getFilteredLogs().length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Visitor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Relation</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Visit Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Purpose</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Check-in/out</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">View pass</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredLogs().map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-800">{log.visitorName}</p>
                          <p className="text-sm text-gray-600">{log.visitorPhone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{log.visitorRelation}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm text-gray-800">{new Date(log.visitDate).toLocaleDateString('en-IN')}</p>
                          <p className="text-sm text-gray-600">{log.visitTime}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                          {getStatusIcon(log.status)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-600 max-w-xs truncate">{log.purpose}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-600">
                          {log.checkInTime ? (
                            <div>
                              <p>In: {log.checkInTime}</p>
                              {log.checkOutTime && <p>Out: {log.checkOutTime}</p>}
                            </div>
                          ) : (
                            <span className="text-gray-400">Not checked in</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openDetailsModal(log)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Visitor Logs Found</h3>
              <p className="text-gray-500">No visitor logs match your current filters</p>
            </div>
          )}
        </div>

        {/* Visitor Details Modal */}
        {showDetailsModal && selectedVisitor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Visitor Details - {selectedVisitor.visitorName}</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedVisitor.status)}`}>
                    {selectedVisitor.status}
                  </span>
                  {getStatusIcon(selectedVisitor.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Visitor Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-medium">{selectedVisitor.visitorName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Relation</p>
                          <p className="font-medium">{selectedVisitor.visitorRelation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{selectedVisitor.visitorPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">ID Proof</p>
                          <p className="font-medium">{selectedVisitor.visitorIdProof}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Visit Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Visit Date</p>
                          <p className="font-medium">{new Date(selectedVisitor.visitDate).toLocaleDateString('en-IN')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Visit Time</p>
                          <p className="font-medium">{selectedVisitor.visitTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock3 className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Expected Duration</p>
                          <p className="font-medium">{selectedVisitor.expectedDuration}</p>
                        </div>
                      </div>
                      {selectedVisitor.checkInTime && (
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <div>
                            <p className="text-sm text-gray-600">Check-in Time</p>
                            <p className="font-medium">{selectedVisitor.checkInTime}</p>
                          </div>
                        </div>
                      )}
                      {selectedVisitor.checkOutTime && (
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Check-out Time</p>
                            <p className="font-medium">{selectedVisitor.checkOutTime}</p>
                          </div>
                        </div>
                      )}
                      {selectedVisitor.actualDuration && (
                        <div className="flex items-center gap-3">
                          <Clock3 className="w-4 h-4 text-purple-500" />
                          <div>
                            <p className="text-sm text-gray-600">Actual Duration</p>
                            <p className="font-medium">{selectedVisitor.actualDuration}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Purpose</h4>
                  <p className="text-gray-700">{selectedVisitor.purpose}</p>
                </div>

                {selectedVisitor.remarks && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Remarks:</strong> {selectedVisitor.remarks}
                    </p>
                  </div>
                )}

                {selectedVisitor.feedback && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Feedback:</strong> {selectedVisitor.feedback}
                    </p>
                  </div>
                )}

                {selectedVisitor.qrCode && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">QR Code</h4>
                    <div className="inline-block p-4 bg-white rounded-lg">
                      <QrCode className="w-24 h-24 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{selectedVisitor.qrCode}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {selectedVisitor.qrCode && (
                    <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2">
                      <QrCode className="w-4 h-4" />
                      Share QR Code
                    </button>
                  )}
                  <button
                    onClick={() => setShowDetailsModal(false)}
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

export default VisitorLogsPage;