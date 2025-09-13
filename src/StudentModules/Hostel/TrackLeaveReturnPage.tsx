import React, { useState } from 'react';
import { 
  Clock, MapPin, Calendar, CheckCircle, AlertCircle, 
  User, Phone, Home, Building2, Eye, RefreshCw,
  FileText, QrCode, Download, Bell, Activity, X
} from 'lucide-react';

interface LeaveTracking {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  destination: string;
  emergencyContact: string;
  status: 'Active' | 'Completed' | 'Overdue' | 'Cancelled';
  currentLocation: string;
  lastUpdate: string;
  expectedReturn: string;
  actualReturn?: string;
  qrCode: string;
  wardenApproval: string;
  securityCheckpoints: Checkpoint[];
  alerts: Alert[];
}

interface Checkpoint {
  id: string;
  name: string;
  location: string;
  checkTime: string;
  status: 'Pending' | 'Completed' | 'Missed';
  notes?: string;
}

interface Alert {
  id: string;
  type: 'Info' | 'Warning' | 'Critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

const TrackLeaveReturnPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'alerts'>('active');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveTracking | null>(null);

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    roomNumber: 'A-201',
    phoneNumber: '+91-9876543210',
    email: 'arjun.kumar@college.edu.in'
  };

  const activeLeaves: LeaveTracking[] = [
    {
      id: 'LT001',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      leaveType: 'Home Leave',
      startDate: '2025-01-20',
      endDate: '2025-01-25',
      destination: 'Bangalore, Karnataka',
      emergencyContact: '+91-9876543211',
      status: 'Active',
      currentLocation: 'Bangalore, Karnataka',
      lastUpdate: '2025-01-22T14:30:00',
      expectedReturn: '2025-01-25T18:00:00',
      qrCode: 'QR-LR001-20250120',
      wardenApproval: 'Mr. Prakash Sharma',
      securityCheckpoints: [
        {
          id: 'CP001',
          name: 'Main Gate Exit',
          location: 'Hostel Main Gate',
          checkTime: '2025-01-20T08:00:00',
          status: 'Completed',
          notes: 'Left hostel at 8:00 AM'
        },
        {
          id: 'CP002',
          name: 'City Checkpoint',
          location: 'Bangalore City Center',
          checkTime: '2025-01-20T12:00:00',
          status: 'Completed',
          notes: 'Reached destination safely'
        },
        {
          id: 'CP003',
          name: 'Return Checkpoint',
          location: 'Hostel Main Gate',
          checkTime: '2025-01-25T18:00:00',
          status: 'Pending',
          notes: 'Expected return time'
        }
      ],
      alerts: [
        {
          id: 'ALT001',
          type: 'Info',
          message: 'Leave period is active. Remember to return by Jan 25, 2025',
          timestamp: '2025-01-22T09:00:00',
          acknowledged: true
        },
        {
          id: 'ALT002',
          type: 'Warning',
          message: 'Return date is approaching. Please confirm your return schedule.',
          timestamp: '2025-01-23T10:00:00',
          acknowledged: false
        }
      ]
    }
  ];

  const completedLeaves: LeaveTracking[] = [
    {
      id: 'LT002',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      leaveType: 'Medical Leave',
      startDate: '2025-01-10',
      endDate: '2025-01-12',
      destination: 'Hospital, City',
      emergencyContact: '+91-9876543211',
      status: 'Completed',
      currentLocation: 'Hostel A-201',
      lastUpdate: '2025-01-12T20:00:00',
      expectedReturn: '2025-01-12T18:00:00',
      actualReturn: '2025-01-12T20:00:00',
      qrCode: 'QR-LR002-20250110',
      wardenApproval: 'Mr. Prakash Sharma',
      securityCheckpoints: [
        {
          id: 'CP004',
          name: 'Main Gate Exit',
          location: 'Hostel Main Gate',
          checkTime: '2025-01-10T09:00:00',
          status: 'Completed',
          notes: 'Left hostel at 9:00 AM'
        },
        {
          id: 'CP005',
          name: 'Hospital Checkpoint',
          location: 'City Hospital',
          checkTime: '2025-01-10T10:30:00',
          status: 'Completed',
          notes: 'Reached hospital for checkup'
        },
        {
          id: 'CP006',
          name: 'Return Checkpoint',
          location: 'Hostel Main Gate',
          checkTime: '2025-01-12T20:00:00',
          status: 'Completed',
          notes: 'Returned to hostel at 8:00 PM'
        }
      ],
      alerts: [
        {
          id: 'ALT003',
          type: 'Info',
          message: 'Leave completed successfully. Welcome back to hostel.',
          timestamp: '2025-01-12T20:00:00',
          acknowledged: true
        }
      ]
    }
  ];

  const allAlerts: Alert[] = [
    {
      id: 'ALT001',
      type: 'Info',
      message: 'Leave period is active. Remember to return by Jan 25, 2025',
      timestamp: '2025-01-22T09:00:00',
      acknowledged: true
    },
    {
      id: 'ALT002',
      type: 'Warning',
      message: 'Return date is approaching. Please confirm your return schedule.',
      timestamp: '2025-01-23T10:00:00',
      acknowledged: false
    },
    {
      id: 'ALT004',
      type: 'Critical',
      message: 'Emergency contact has been notified about your extended absence.',
      timestamp: '2025-01-23T15:00:00',
      acknowledged: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Missed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'Info': return 'bg-blue-100 text-blue-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openDetails = (leave: LeaveTracking) => {
    setSelectedLeave(leave);
    setShowDetails(true);
  };

  const acknowledgeAlert = (alertId: string) => {
    console.log('Alert acknowledged:', alertId);
    // In real application, this would update the alert status
  };

  const getTimeRemaining = (expectedReturn: string) => {
    const now = new Date();
    const returnTime = new Date(expectedReturn);
    const diff = returnTime.getTime() - now.getTime();
    
    if (diff < 0) {
      return 'Overdue';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Leave Tracking</h1>
                <p className="text-gray-600">Track your leave status and return schedule</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                {allAlerts.filter(alert => !alert.acknowledged).length} Unread Alerts
              </div>
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
              <Building2 className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Roll Number</p>
                <p className="font-medium">{currentStudent.rollNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'active', label: 'Active Leaves', icon: Clock },
              { key: 'completed', label: 'Completed Leaves', icon: CheckCircle },
              { key: 'alerts', label: 'Alerts & Notifications', icon: Bell }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
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

        {/* Active Leaves Tab */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Active Leave Requests</h2>
              
              {activeLeaves.length > 0 ? (
                <div className="space-y-4">
                  {activeLeaves.map((leave) => (
                    <div key={leave.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Leave #{leave.id}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(leave.status)}`}>
                            {leave.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openDetails(leave)}
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Track Details
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Leave Period</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {new Date(leave.startDate).toLocaleDateString('en-IN')} - {new Date(leave.endDate).toLocaleDateString('en-IN')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{leave.destination}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Current Status</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{leave.currentLocation}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                Last update: {new Date(leave.lastUpdate).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Return Schedule</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                Expected: {new Date(leave.expectedReturn).toLocaleString('en-IN')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-orange-600 font-medium">
                                Time remaining: {getTimeRemaining(leave.expectedReturn)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Recent Checkpoints</h4>
                        <div className="space-y-2">
                          {leave.securityCheckpoints.slice(0, 2).map((checkpoint) => (
                            <div key={checkpoint.id} className="flex items-center gap-2 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(checkpoint.status)}`}>
                                {checkpoint.status}
                              </span>
                              <span className="text-blue-800">{checkpoint.name}</span>
                              <span className="text-blue-600">- {new Date(checkpoint.checkTime).toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Active Leaves</h3>
                  <p className="text-gray-500">You don't have any active leave requests at the moment</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Completed Leaves Tab */}
        {activeTab === 'completed' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Completed Leave Requests</h2>
              
              <div className="space-y-4">
                {completedLeaves.map((leave) => (
                  <div key={leave.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Leave #{leave.id}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(leave.status)}`}>
                          {leave.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetails(leave)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Leave Period</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {new Date(leave.startDate).toLocaleDateString('en-IN')} - {new Date(leave.endDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{leave.destination}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Return Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Expected: {new Date(leave.expectedReturn).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">
                              Actual: {leave.actualReturn ? new Date(leave.actualReturn).toLocaleString('en-IN') : 'Not returned'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">Successfully completed</span>
                          </div>
                          {leave.actualReturn && new Date(leave.actualReturn) > new Date(leave.expectedReturn) && (
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-orange-600">Returned late</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Alerts & Notifications</h2>
              
              <div className="space-y-4">
                {allAlerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${
                    alert.acknowledged ? 'border-gray-200 bg-gray-50' : 'border-orange-200 bg-orange-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertTypeColor(alert.type)}`}>
                            {alert.type}
                          </span>
                          <span className="text-sm text-gray-600">
                            {new Date(alert.timestamp).toLocaleString('en-IN')}
                          </span>
                          {!alert.acknowledged && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-800">{alert.message}</p>
                      </div>
                      {!alert.acknowledged && (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leave Details Modal */}
        {showDetails && selectedLeave && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Leave Tracking Details - #{selectedLeave.id}</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
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
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Destination</p>
                          <p className="font-medium">{selectedLeave.destination}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Expected Return</p>
                          <p className="font-medium">{new Date(selectedLeave.expectedReturn).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Current Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Current Location</p>
                          <p className="font-medium">{selectedLeave.currentLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Last Update</p>
                          <p className="font-medium">{new Date(selectedLeave.lastUpdate).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLeave.status)}`}>
                          {selectedLeave.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Security Checkpoints</h4>
                  <div className="space-y-3">
                    {selectedLeave.securityCheckpoints.map((checkpoint) => (
                      <div key={checkpoint.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(checkpoint.status)}`}>
                            {checkpoint.status}
                          </span>
                          <div>
                            <p className="font-medium text-gray-800">{checkpoint.name}</p>
                            <p className="text-sm text-gray-600">{checkpoint.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{new Date(checkpoint.checkTime).toLocaleString('en-IN')}</p>
                          {checkpoint.notes && (
                            <p className="text-xs text-gray-500">{checkpoint.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Alerts</h4>
                  <div className="space-y-2">
                    {selectedLeave.alerts.map((alert) => (
                      <div key={alert.id} className={`p-3 rounded-lg ${
                        alert.acknowledged ? 'bg-gray-50' : 'bg-orange-50 border border-orange-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertTypeColor(alert.type)}`}>
                            {alert.type}
                          </span>
                          <span className="text-xs text-gray-600">
                            {new Date(alert.timestamp).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDetails(false)}
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

export default TrackLeaveReturnPage;