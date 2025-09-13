import React, { useState } from 'react';
import { 
  CalendarCheck, Clock, MapPin, Phone, Mail, User, 
  FileText, CheckCircle, AlertCircle, Calendar, Home,
  Building2, DollarSign, Info, X, Eye, Download
} from 'lucide-react';

interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  leaveType: 'Home Leave' | 'Medical Leave' | 'Emergency Leave' | 'Academic Leave' | 'Personal Leave';
  startDate: string;
  endDate: string;
  reason: string;
  destination: string;
  emergencyContact: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processing';
  approvedBy?: string;
  approvedDate?: string;
  qrCode?: string;
  remarks?: string;
  duration: number;
}

interface LeavePolicy {
  leaveType: string;
  maxDuration: number;
  advanceNotice: number;
  requiredDocuments: string[];
  restrictions: string[];
}

const ApplyForLeavePage: React.FC = () => {
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showLeaveDetails, setShowLeaveDetails] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Home Leave' as LeaveRequest['leaveType'],
    startDate: '',
    endDate: '',
    reason: '',
    destination: '',
    emergencyContact: '',
    alternativeContact: '',
    expectedReturnTime: '',
    documents: [] as string[]
  });

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    roomNumber: 'A-201',
    phoneNumber: '+91-9876543210',
    email: 'arjun.kumar@college.edu.in',
    emergencyContact: '+91-9876543211',
    hometown: 'Bangalore, Karnataka'
  };

  const existingRequests: LeaveRequest[] = [
    {
      id: 'LR001',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      leaveType: 'Home Leave',
      startDate: '2025-01-20',
      endDate: '2025-01-25',
      reason: 'Family function',
      destination: 'Bangalore, Karnataka',
      emergencyContact: '+91-9876543211',
      submittedDate: '2025-01-15',
      status: 'Approved',
      approvedBy: 'Mr. Prakash Sharma',
      approvedDate: '2025-01-16',
      qrCode: 'QR-LR001-20250120',
      remarks: 'Approved for 5 days',
      duration: 5
    },
    {
      id: 'LR002',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      leaveType: 'Medical Leave',
      startDate: '2025-01-18',
      endDate: '2025-01-20',
      reason: 'Medical checkup',
      destination: 'Ahmedabad, Gujarat',
      emergencyContact: '+91-9876543211',
      submittedDate: '2025-01-17',
      status: 'Pending',
      remarks: 'Under review',
      duration: 2
    }
  ];

  const leavePolicies: LeavePolicy[] = [
    {
      leaveType: 'Home Leave',
      maxDuration: 7,
      advanceNotice: 2,
      requiredDocuments: ['Parent/Guardian consent letter'],
      restrictions: ['Maximum 2 home leaves per month', 'Not allowed during exam periods']
    },
    {
      leaveType: 'Medical Leave',
      maxDuration: 15,
      advanceNotice: 0,
      requiredDocuments: ['Medical certificate', 'Prescription'],
      restrictions: ['Medical certificate required for leaves > 3 days', 'Emergency contact must be informed']
    },
    {
      leaveType: 'Emergency Leave',
      maxDuration: 3,
      advanceNotice: 0,
      requiredDocuments: ['Emergency proof', 'Parent/Guardian consent'],
      restrictions: ['Only for genuine emergencies', 'Must inform warden immediately']
    },
    {
      leaveType: 'Academic Leave',
      maxDuration: 5,
      advanceNotice: 3,
      requiredDocuments: ['Academic requirement proof', 'Faculty recommendation'],
      restrictions: ['Only for academic purposes', 'Must not conflict with classes']
    },
    {
      leaveType: 'Personal Leave',
      maxDuration: 2,
      advanceNotice: 1,
      requiredDocuments: ['Personal reason explanation'],
      restrictions: ['Maximum 1 personal leave per month', 'Not allowed during weekends']
    }
  ];

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Leave request submitted:', leaveForm);
    alert('Leave request submitted successfully! You will be notified about the status.');
    setShowLeaveForm(false);
    setLeaveForm({
      leaveType: 'Home Leave',
      startDate: '',
      endDate: '',
      reason: '',
      destination: '',
      emergencyContact: '',
      alternativeContact: '',
      expectedReturnTime: '',
      documents: []
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveTypeColor = (leaveType: string) => {
    switch (leaveType) {
      case 'Home Leave': return 'bg-blue-100 text-blue-800';
      case 'Medical Leave': return 'bg-red-100 text-red-800';
      case 'Emergency Leave': return 'bg-orange-100 text-orange-800';
      case 'Academic Leave': return 'bg-purple-100 text-purple-800';
      case 'Personal Leave': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openLeaveDetails = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setShowLeaveDetails(true);
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCurrentPolicy = (leaveType: string) => {
    return leavePolicies.find(policy => policy.leaveType === leaveType);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <CalendarCheck className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Leave Management</h1>
                <p className="text-gray-600">Apply for leave and track your leave requests</p>
              </div>
            </div>
            <button
              onClick={() => setShowLeaveForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              Apply for Leave
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
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Hometown</p>
                <p className="font-medium">{currentStudent.hometown}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leave Policies */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Leave Policies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leavePolicies.map((policy, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{policy.leaveType}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(policy.leaveType)}`}>
                    Max {policy.maxDuration} days
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Advance notice: {policy.advanceNotice} days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Max duration: {policy.maxDuration} days</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Required Documents</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {policy.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Restrictions</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {policy.restrictions.map((restriction, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-orange-500" />
                        {restriction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Requests */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Leave Requests</h2>
          
          {existingRequests.length > 0 ? (
            <div className="space-y-4">
              {existingRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Request #{request.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLeaveTypeColor(request.leaveType)}`}>
                        {request.leaveType}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openLeaveDetails(request)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      {request.qrCode && (
                        <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          QR Code
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Leave Period</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {new Date(request.startDate).toLocaleDateString('en-IN')} - {new Date(request.endDate).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{request.duration} days</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Destination</h4>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{request.destination}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Emergency Contact</h4>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{request.emergencyContact}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Reason</h4>
                    <p className="text-sm text-gray-600">{request.reason}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Submitted: {new Date(request.submittedDate).toLocaleDateString('en-IN')}</span>
                    {request.approvedBy && <span>Approved by: {request.approvedBy}</span>}
                    {request.approvedDate && <span>Approved: {new Date(request.approvedDate).toLocaleDateString('en-IN')}</span>}
                  </div>

                  {request.remarks && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Admin Remarks:</strong> {request.remarks}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Leave Requests</h3>
              <p className="text-gray-500">You haven't submitted any leave requests yet</p>
            </div>
          )}
        </div>

        {/* Leave Form Modal */}
        {showLeaveForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">New Leave Request</h3>
                <button
                  onClick={() => setShowLeaveForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleLeaveSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Leave Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={leaveForm.leaveType}
                      onChange={(e) => setLeaveForm({...leaveForm, leaveType: e.target.value as LeaveRequest['leaveType']})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Home Leave">Home Leave</option>
                      <option value="Medical Leave">Medical Leave</option>
                      <option value="Emergency Leave">Emergency Leave</option>
                      <option value="Academic Leave">Academic Leave</option>
                      <option value="Personal Leave">Personal Leave</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={leaveForm.startDate}
                      onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={leaveForm.endDate}
                      onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min={leaveForm.startDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Return Time
                    </label>
                    <input
                      type="time"
                      value={leaveForm.expectedReturnTime}
                      onChange={(e) => setLeaveForm({...leaveForm, expectedReturnTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={leaveForm.destination}
                    onChange={(e) => setLeaveForm({...leaveForm, destination: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bangalore, Karnataka"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Leave <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Please explain the reason for your leave..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={leaveForm.emergencyContact}
                      onChange={(e) => setLeaveForm({...leaveForm, emergencyContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+91-9876543210"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alternative Contact
                    </label>
                    <input
                      type="tel"
                      value={leaveForm.alternativeContact}
                      onChange={(e) => setLeaveForm({...leaveForm, alternativeContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+91-9876543211"
                    />
                  </div>
                </div>

                {leaveForm.leaveType && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Policy Information</h4>
                    {(() => {
                      const policy = getCurrentPolicy(leaveForm.leaveType);
                      return policy ? (
                        <div className="text-sm text-blue-800 space-y-1">
                          <p>• Maximum duration: {policy.maxDuration} days</p>
                          <p>• Advance notice required: {policy.advanceNotice} days</p>
                          <p>• Required documents: {policy.requiredDocuments.join(', ')}</p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeaveForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Leave Details Modal */}
        {showLeaveDetails && selectedLeave && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Leave Request Details - #{selectedLeave.id}</h3>
                <button
                  onClick={() => setShowLeaveDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLeaveTypeColor(selectedLeave.leaveType)}`}>
                    {selectedLeave.leaveType}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLeave.status)}`}>
                    {selectedLeave.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Leave Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Leave Period</p>
                          <p className="font-medium">
                            {new Date(selectedLeave.startDate).toLocaleDateString('en-IN')} - {new Date(selectedLeave.endDate).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-medium">{selectedLeave.duration} days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Destination</p>
                          <p className="font-medium">{selectedLeave.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Emergency Contact</p>
                          <p className="font-medium">{selectedLeave.emergencyContact}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Home className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Room Number</p>
                          <p className="font-medium">{selectedLeave.roomNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Reason</h4>
                  <p className="text-gray-700">{selectedLeave.reason}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p><strong>Submitted:</strong> {new Date(selectedLeave.submittedDate).toLocaleDateString('en-IN')}</p>
                    {selectedLeave.approvedBy && <p><strong>Approved by:</strong> {selectedLeave.approvedBy}</p>}
                  </div>
                  <div>
                    {selectedLeave.approvedDate && <p><strong>Approved:</strong> {new Date(selectedLeave.approvedDate).toLocaleDateString('en-IN')}</p>}
                    {selectedLeave.qrCode && <p><strong>QR Code:</strong> {selectedLeave.qrCode}</p>}
                  </div>
                </div>

                {selectedLeave.remarks && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Admin Remarks:</strong> {selectedLeave.remarks}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  {selectedLeave.qrCode && (
                    <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download QR Code
                    </button>
                  )}
                  <button
                    onClick={() => setShowLeaveDetails(false)}
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

export default ApplyForLeavePage;