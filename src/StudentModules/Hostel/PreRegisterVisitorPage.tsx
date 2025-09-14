import React, { useState } from 'react';
import { 
  UserPlus, Calendar, Clock, MapPin, Phone, 
  User, FileText, Camera, QrCode, CheckCircle,
  AlertTriangle, Send, RefreshCw, Filter, Search,
  CalendarDays, Users, Eye, Edit, Trash2,X
} from 'lucide-react';

interface VisitorRegistration {
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
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  qrCode?: string;
  checkInTime?: string;
  checkOutTime?: string;
  remarks?: string;
}

interface VisitorForm {
  visitorName: string;
  visitorRelation: string;
  visitorPhone: string;
  visitorIdProof: string;
  visitorIdNumber: string;
  visitDate: string;
  visitTime: string;
  expectedDuration: string;
  purpose: string;
  emergencyContact: string;
  vehicleNumber?: string;
  itemsCarrying: string;
  specialInstructions?: string;
}

const PreRegisterVisitorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'register' | 'pending' | 'approved' | 'history'>('register');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorRegistration | null>(null);
  const [visitorForm, setVisitorForm] = useState<VisitorForm>({
    visitorName: '',
    visitorRelation: '',
    visitorPhone: '',
    visitorIdProof: 'Aadhar Card',
    visitorIdNumber: '',
    visitDate: '',
    visitTime: '',
    expectedDuration: '2 hours',
    purpose: '',
    emergencyContact: '',
    vehicleNumber: '',
    itemsCarrying: '',
    specialInstructions: ''
  });

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    roomNumber: 'A-201',
    phoneNumber: '+91-9876543210',
    email: 'arjun.kumar@college.edu.in',
    hostelId: 'H001',
    warden: 'Mr. Prakash Sharma'
  };

  const visitorRegistrations: VisitorRegistration[] = [
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
      status: 'Approved',
      submittedDate: '2025-01-18',
      approvedBy: 'Mr. Prakash Sharma',
      approvedDate: '2025-01-19',
      qrCode: 'QR-VIS001-20250120',
      checkInTime: null,
      checkOutTime: null,
      remarks: 'Approved for family visit'
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
      status: 'Pending',
      submittedDate: '2025-01-20',
      remarks: 'Under review'
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
      approvedBy: 'Mr. Prakash Sharma',
      approvedDate: '2025-01-14',
      qrCode: 'QR-VIS003-20250115',
      checkInTime: '16:05',
      checkOutTime: '17:10',
      remarks: 'Medical consultation completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Rejected': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredVisitors = visitorRegistrations.filter(visitor => {
    if (activeTab === 'register') return false;
    if (activeTab === 'pending') return visitor.status === 'Pending';
    if (activeTab === 'approved') return visitor.status === 'Approved';
    if (activeTab === 'history') return visitor.status === 'Completed';
    return true;
  });

  const openRegistrationModal = () => {
    setVisitorForm({
      visitorName: '',
      visitorRelation: '',
      visitorPhone: '',
      visitorIdProof: 'Aadhar Card',
      visitorIdNumber: '',
      visitDate: '',
      visitTime: '',
      expectedDuration: '2 hours',
      purpose: '',
      emergencyContact: '',
      vehicleNumber: '',
      itemsCarrying: '',
      specialInstructions: ''
    });
    setShowRegistrationModal(true);
  };

  const openDetailsModal = (visitor: VisitorRegistration) => {
    setSelectedVisitor(visitor);
    setShowDetailsModal(true);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Visitor registration submitted:', visitorForm);
    alert('Visitor registration submitted successfully! You will receive a confirmation once approved.');
    setShowRegistrationModal(false);
    setVisitorForm({
      visitorName: '',
      visitorRelation: '',
      visitorPhone: '',
      visitorIdProof: 'Aadhar Card',
      visitorIdNumber: '',
      visitDate: '',
      visitTime: '',
      expectedDuration: '2 hours',
      purpose: '',
      emergencyContact: '',
      vehicleNumber: '',
      itemsCarrying: '',
      specialInstructions: ''
    });
  };

  const getDaysUntilVisit = (visitDate: string) => {
    const now = new Date();
    const visit = new Date(visitDate);
    const diff = visit.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const now = new Date();
    const maxDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="  mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <UserPlus className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Pre-register Visitor</h1>
              <p className="text-gray-600">Register visitors in advance for smooth entry process</p>
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
            <p className="text-2xl font-bold text-blue-600">{visitorRegistrations.length}</p>
            <p className="text-sm text-gray-600">All time</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Pending</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{visitorRegistrations.filter(v => v.status === 'Pending').length}</p>
            <p className="text-sm text-gray-600">Awaiting approval</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Approved</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{visitorRegistrations.filter(v => v.status === 'Approved').length}</p>
            <p className="text-sm text-gray-600">Ready to visit</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CalendarDays className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Completed</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">{visitorRegistrations.filter(v => v.status === 'Completed').length}</p>
            <p className="text-sm text-gray-600">Visits completed</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'register', label: 'Register Visitor', icon: UserPlus },
              { key: 'pending', label: 'Pending', icon: Clock },
              { key: 'approved', label: 'Approved', icon: CheckCircle },
              { key: 'history', label: 'History', icon: CalendarDays }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
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

        {/* Register Visitor Tab */}
        {activeTab === 'register' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center py-8">
              <UserPlus className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Register a New Visitor</h3>
              <p className="text-gray-600 mb-6">Pre-register your visitors for smooth entry process</p>
              <button
                onClick={openRegistrationModal}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2 mx-auto"
              >
                <UserPlus className="w-5 h-5" />
                Register Visitor
              </button>
            </div>
          </div>
        )}

        {/* Visitors List */}
        {activeTab !== 'register' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {activeTab === 'pending' && 'Pending Approvals'}
              {activeTab === 'approved' && 'Approved Visitors'}
              {activeTab === 'history' && 'Visit History'}
            </h2>
            
            {filteredVisitors.length > 0 ? (
              <div className="space-y-4">
                {filteredVisitors.map((visitor) => (
                  <div key={visitor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {visitor.visitorName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(visitor.status)}`}>
                          {visitor.status}
                        </span>
                        {getStatusIcon(visitor.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetailsModal(visitor)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        {visitor.status === 'Approved' && visitor.qrCode && (
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                            <QrCode className="w-4 h-4" />
                            QR Code
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Visitor Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{visitor.visitorRelation}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{visitor.visitorPhone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{visitor.visitorIdProof}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Visit Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {new Date(visitor.visitDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{visitor.visitTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{visitor.expectedDuration}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Submitted: {new Date(visitor.submittedDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          {visitor.approvedDate && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600">
                                Approved: {new Date(visitor.approvedDate).toLocaleDateString('en-IN')}
                              </span>
                            </div>
                          )}
                          {visitor.status === 'Approved' && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span className="text-sm text-gray-600">
                                {getDaysUntilVisit(visitor.visitDate)} days until visit
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Purpose</h4>
                      <p className="text-sm text-gray-600">{visitor.purpose}</p>
                    </div>

                    {visitor.remarks && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Remarks:</strong> {visitor.remarks}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Visitors Found</h3>
                <p className="text-gray-500">No visitors match your current filter</p>
              </div>
            )}
          </div>
        )}

        {/* Registration Modal */}
        {showRegistrationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Register Visitor</h3>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visitor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={visitorForm.visitorName}
                      onChange={(e) => setVisitorForm({...visitorForm, visitorName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter visitor's full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relation <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={visitorForm.visitorRelation}
                      onChange={(e) => setVisitorForm({...visitorForm, visitorRelation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select relation</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Friend">Friend</option>
                      <option value="Relative">Relative</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={visitorForm.visitorPhone}
                      onChange={(e) => setVisitorForm({...visitorForm, visitorPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="+91-9876543210"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID Proof Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={visitorForm.visitorIdProof}
                      onChange={(e) => setVisitorForm({...visitorForm, visitorIdProof: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Passport">Passport</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={visitorForm.visitorIdNumber}
                      onChange={(e) => setVisitorForm({...visitorForm, visitorIdNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter ID number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visit Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={visitorForm.visitDate}
                      onChange={(e) => setVisitorForm({...visitorForm, visitDate: e.target.value})}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visit Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={visitorForm.visitTime}
                      onChange={(e) => setVisitorForm({...visitorForm, visitTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Duration <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={visitorForm.expectedDuration}
                      onChange={(e) => setVisitorForm({...visitorForm, expectedDuration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="1 hour">1 hour</option>
                      <option value="2 hours">2 hours</option>
                      <option value="4 hours">4 hours</option>
                      <option value="6 hours">6 hours</option>
                      <option value="8 hours">8 hours</option>
                      <option value="Full day">Full day</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Visit <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={visitorForm.purpose}
                      onChange={(e) => setVisitorForm({...visitorForm, purpose: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Describe the purpose of the visit..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={visitorForm.emergencyContact}
                      onChange={(e) => setVisitorForm({...visitorForm, emergencyContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Emergency contact number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Number
                    </label>
                    <input
                      type="text"
                      value={visitorForm.vehicleNumber}
                      onChange={(e) => setVisitorForm({...visitorForm, vehicleNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Vehicle registration number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Items Carrying
                    </label>
                    <input
                      type="text"
                      value={visitorForm.itemsCarrying}
                      onChange={(e) => setVisitorForm({...visitorForm, itemsCarrying: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="List items being carried (if any)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      value={visitorForm.specialInstructions}
                      onChange={(e) => setVisitorForm({...visitorForm, specialInstructions: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Any special instructions or requirements..."
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 font-medium flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
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
                  {selectedVisitor.status === 'Approved' && selectedVisitor.qrCode && (
                    <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2">
                      <QrCode className="w-4 h-4" />
                      Download QR Code
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

export default PreRegisterVisitorPage;