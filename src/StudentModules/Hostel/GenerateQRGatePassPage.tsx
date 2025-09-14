import React, { useState } from 'react';
import { 
  QrCode, Download, Eye, Clock, MapPin, User, Phone, 
  Calendar, CheckCircle, AlertCircle, FileText, Home,
  Building2, Mail, RefreshCw, X, Info, Camera
} from 'lucide-react';

interface GatePass {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  destination: string;
  emergencyContact: string;
  qrCode: string;
  generatedDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Used' | 'Cancelled';
  purpose: string;
  wardenSignature: string;
  securityInstructions: string[];
}

interface MovementLog {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  date: string;
  outTime: string;
  inTime?: string;
  purpose: string;
  status: 'Out' | 'Returned' | 'Late';
  gatePassId?: string;
}

const GenerateQRGatePassPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gatepass' | 'movement' | 'history'>('gatepass');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedGatePass, setSelectedGatePass] = useState<GatePass | null>(null);

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    roomNumber: 'A-201',
    phoneNumber: '+91-9876543210',
    email: 'arjun.kumar@college.edu.in',
    emergencyContact: '+91-9876543211'
  };

  const activeGatePasses: GatePass[] = [
    {
      id: 'GP001',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      leaveType: 'Home Leave',
      startDate: '2025-01-20',
      endDate: '2025-01-25',
      destination: 'Bangalore, Karnataka',
      emergencyContact: '+91-9876543211',
      qrCode: 'QR-LR001-20250120',
      generatedDate: '2025-01-16',
      expiryDate: '2025-01-25',
      status: 'Active',
      purpose: 'Family function',
      wardenSignature: 'Mr. Prakash Sharma',
      securityInstructions: [
        'Show QR code at main gate',
        'Return before 10 PM on return date',
        'Inform security if delayed',
        'Keep emergency contact updated'
      ]
    }
  ];

  const movementLogs: MovementLog[] = [
    {
      id: 'ML001',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      date: '2025-01-15',
      outTime: '18:30',
      inTime: '21:45',
      purpose: 'Library Study',
      status: 'Returned',
      gatePassId: 'GP001'
    },
    {
      id: 'ML002',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      date: '2025-01-16',
      outTime: '20:00',
      inTime: null,
      purpose: 'Movie',
      status: 'Out'
    },
    {
      id: 'ML003',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      date: '2025-01-14',
      outTime: '19:00',
      inTime: '22:30',
      purpose: 'Shopping',
      status: 'Late'
    }
  ];

  const gatePassHistory: GatePass[] = [
    {
      id: 'GP002',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      leaveType: 'Medical Leave',
      startDate: '2025-01-10',
      endDate: '2025-01-12',
      destination: 'Hospital, City',
      emergencyContact: '+91-9876543211',
      qrCode: 'QR-LR002-20250110',
      generatedDate: '2025-01-09',
      expiryDate: '2025-01-12',
      status: 'Used',
      purpose: 'Medical checkup',
      wardenSignature: 'Mr. Prakash Sharma',
      securityInstructions: [
        'Show QR code at main gate',
        'Return before 10 PM on return date',
        'Inform security if delayed'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Used': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Returned': return 'bg-green-100 text-green-800';
      case 'Out': return 'bg-yellow-100 text-yellow-800';
      case 'Late': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openQRModal = (gatePass: GatePass) => {
    setSelectedGatePass(gatePass);
    setShowQRModal(true);
  };

  const downloadQRCode = () => {
    // In a real application, this would generate and download the QR code
    alert('QR Code downloaded successfully!');
  };

  const generateNewGatePass = () => {
    alert('Redirecting to leave application form...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="  mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <QrCode className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">QR Gate Pass</h1>
                <p className="text-gray-600">Generate and manage your QR gate passes for hostel entry/exit</p>
              </div>
            </div>
            <button
              onClick={generateNewGatePass}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              Generate New Pass
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

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'gatepass', label: 'Active Gate Passes', icon: QrCode },
              { key: 'movement', label: 'Movement Logs', icon: Clock },
              { key: 'history', label: 'Pass History', icon: FileText }
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

        {/* Active Gate Passes Tab */}
        {activeTab === 'gatepass' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Active Gate Passes</h2>
              
              {activeGatePasses.length > 0 ? (
                <div className="space-y-4">
                  {activeGatePasses.map((gatePass) => (
                    <div key={gatePass.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Gate Pass #{gatePass.id}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(gatePass.status)}`}>
                            {gatePass.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openQRModal(gatePass)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View QR Code
                          </button>
                          <button
                            onClick={downloadQRCode}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download
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
                                {new Date(gatePass.startDate).toLocaleDateString('en-IN')} - {new Date(gatePass.endDate).toLocaleDateString('en-IN')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{gatePass.destination}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Purpose</h4>
                          <p className="text-sm text-gray-600">{gatePass.purpose}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">QR Code</h4>
                          <p className="text-sm text-gray-600 font-mono">{gatePass.qrCode}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Security Instructions</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          {gatePass.securityInstructions.map((instruction, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-blue-600" />
                              {instruction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Active Gate Passes</h3>
                  <p className="text-gray-500">You don't have any active gate passes at the moment</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Movement Logs Tab */}
        {activeTab === 'movement' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Movement Logs</h2>
              
              <div className="space-y-4">
                {movementLogs.map((log) => (
                  <div key={log.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Movement #{log.id}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium">{new Date(log.date).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Timing</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Out: {log.outTime}</span>
                          </div>
                          {log.inTime && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">In: {log.inTime}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Purpose</h4>
                        <p className="text-sm text-gray-600">{log.purpose}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Gate Pass</h4>
                        {log.gatePassId ? (
                          <p className="text-sm text-gray-600 font-mono">{log.gatePassId}</p>
                        ) : (
                          <p className="text-sm text-gray-500">No gate pass</p>
                        )}
                      </div>
                    </div>

                    {log.status === 'Late' && (
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">
                          <strong>Late Return:</strong> You returned after the expected time. Please inform the warden.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pass History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Gate Pass History</h2>
              
              <div className="space-y-4">
                {gatePassHistory.map((gatePass) => (
                  <div key={gatePass.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Gate Pass #{gatePass.id}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(gatePass.status)}`}>
                          {gatePass.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Generated</p>
                        <p className="font-medium">{new Date(gatePass.generatedDate).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Leave Period</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {new Date(gatePass.startDate).toLocaleDateString('en-IN')} - {new Date(gatePass.endDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{gatePass.destination}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Purpose</h4>
                        <p className="text-sm text-gray-600">{gatePass.purpose}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Warden</h4>
                        <p className="text-sm text-gray-600">{gatePass.wardenSignature}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRModal && selectedGatePass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">QR Gate Pass</h3>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-6">
                {/* QR Code Placeholder */}
                <div className="mx-auto w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">QR Code</p>
                    <p className="text-xs text-gray-400 font-mono">{selectedGatePass.qrCode}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">Gate Pass Details</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Student:</strong> {selectedGatePass.studentName}</p>
                      <p><strong>Room:</strong> {selectedGatePass.roomNumber}</p>
                      <p><strong>Valid:</strong> {new Date(selectedGatePass.startDate).toLocaleDateString('en-IN')} - {new Date(selectedGatePass.endDate).toLocaleDateString('en-IN')}</p>
                      <p><strong>Destination:</strong> {selectedGatePass.destination}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Instructions</h5>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Show this QR code at the main gate</li>
                      <li>• Keep your ID card ready</li>
                      <li>• Return before expiry time</li>
                      <li>• Inform security if delayed</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={downloadQRCode}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download QR Code
                  </button>
                  <button
                    onClick={() => setShowQRModal(false)}
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

export default GenerateQRGatePassPage;