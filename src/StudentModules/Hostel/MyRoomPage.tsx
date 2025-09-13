
import React, { useState } from 'react';
import { 
  User, Users, Bed, MapPin, Wifi, Snowflake, 
  Lightbulb, Wrench, RefreshCw, AlertCircle, 
  Phone, Mail, Calendar, Clock, CheckCircle,
  FileText, Camera, MessageSquare, Settings
} from 'lucide-react';


interface Student {
  id: string;
  name: string;
  rollNumber: string;
  branch: string;
  semester: number;
  phoneNumber: string;
  email: string;
  profileImage?: string;
  emergencyContact: string;
  bloodGroup: string;
  hometown: string;
}


interface Room {
  roomNumber: string;
  block: string;
  floor: number;
  roomType: 'Single AC' | 'Single Non-AC' | 'Double AC' | 'Double Non-AC' | 'Triple';
  capacity: number;
  monthlyRent: number;
  amenities: string[];
  facilities: string[];
  currentOccupants: number;
  maintenanceStatus: 'Good' | 'Under Maintenance' | 'Needs Attention';
  lastCleaned: string;
  wifiPassword: string;
  electricityMeter: string;
  allocatedDate: string;
}


interface MaintenanceRequest {
  id: string;
  type: 'Electrical' | 'Plumbing' | 'Furniture' | 'AC/Fan' | 'Cleaning' | 'Other';
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Submitted' | 'In Progress' | 'Resolved' | 'Cancelled';
  submittedDate: string;
  resolvedDate?: string;
  assignedTo?: string;
  remarks?: string;
}


interface RoomTransferRequest {
  id: string;
  currentRoom: string;
  requestedRoom?: string;
  requestedBlock?: string;
  roomType?: string;
  reason: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processing';
  remarks?: string;
}


const MyRoomPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'roommates' | 'maintenance' | 'transfer'>('overview');
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);

  // Modals for messaging and profile viewing roommates
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState<Student | null>(null);
  const [messageText, setMessageText] = useState("");

  // Sample data - would come from API in real application
  const currentStudent: Student = {
    id: 'STU001',
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    branch: 'Computer Science Engineering',
    semester: 4,
    phoneNumber: '+91-9876543210',
    email: 'arjun.kumar@college.edu.in',
    emergencyContact: '+91-9876543211',
    bloodGroup: 'B+',
    hometown: 'Bangalore, Karnataka'
  };


  const myRoom: Room = {
    roomNumber: 'A-205',
    block: 'A Block',
    floor: 2,
    roomType: 'Double AC',
    capacity: 2,
    monthlyRent: 5500,
    amenities: ['AC', 'Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom'],
    facilities: ['24/7 Security', 'Laundry Service', 'Common Room', 'Gym Access'],
    currentOccupants: 2,
    maintenanceStatus: 'Good',
    lastCleaned: '2025-09-01',
    wifiPassword: 'HostelA205@2025',
    electricityMeter: 'EM-A205-001',
    allocatedDate: '2023-07-15'
  };


  const roommates: Student[] = [
    {
      id: 'STU002',
      name: 'Arjun Patel',
      rollNumber: '2023CSE002',
      branch: 'Computer Science Engineering',
      semester: 4,
      phoneNumber: '+91-9876543220',
      email: 'arjun.patel@college.edu.in',
      emergencyContact: '+91-9876543221',
      bloodGroup: 'O+',
      hometown: 'Ahmedabad, Gujarat'
    }
  ];


  const maintenanceRequests: MaintenanceRequest[] = [
    {
      id: 'MR001',
      type: 'AC/Fan',
      description: 'AC not cooling properly, making unusual noise',
      priority: 'High',
      status: 'In Progress',
      submittedDate: '2025-08-30',
      assignedTo: 'Maintenance Team - Ravi Kumar',
      remarks: 'Technician will visit on Sept 3rd'
    },
    {
      id: 'MR002',
      type: 'Furniture',
      description: 'Study table drawer handle broken',
      priority: 'Low',
      status: 'Resolved',
      submittedDate: '2025-08-25',
      resolvedDate: '2025-08-28',
      assignedTo: 'Carpenter - Suresh',
      remarks: 'Handle replaced successfully'
    }
  ];


  const transferRequests: RoomTransferRequest[] = [
    {
      id: 'TR001',
      currentRoom: 'A-205',
      requestedBlock: 'C Block',
      roomType: 'Single AC',
      reason: 'Need single room for better study environment during final year',
      submittedDate: '2025-08-20',
      status: 'Pending',
      remarks: 'Request under review by hostel administration'
    }
  ];


  const [maintenanceForm, setMaintenanceForm] = useState({
    type: 'Electrical' as MaintenanceRequest['type'],
    description: '',
    priority: 'Medium' as MaintenanceRequest['priority']
  });


  const [transferForm, setTransferForm] = useState({
    requestedRoom: '',
    requestedBlock: '',
    roomType: '',
    reason: ''
  });


  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle maintenance request submission
    console.log('Maintenance request submitted:', maintenanceForm);
    setShowMaintenanceForm(false);
    setMaintenanceForm({ type: 'Electrical', description: '', priority: 'Medium' });
  };


  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle transfer request submission
    console.log('Transfer request submitted:', transferForm);
    setShowTransferForm(false);
    setTransferForm({ requestedRoom: '', requestedBlock: '', roomType: '', reason: '' });
  };

  // Send message modal submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoommate) return;
    console.log(`Message to ${selectedRoommate.name}:`, messageText);
    alert(`Message sent to ${selectedRoommate.name}`);
    setShowMessageModal(false);
    setMessageText("");
  };

  // Handlers for buttons
  const openMessageModal = (roommate: Student) => {
    setSelectedRoommate(roommate);
    setShowMessageModal(true);
  };

  const openProfileModal = (roommate: Student) => {
    setSelectedRoommate(roommate);
    setShowProfileModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
       


        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'overview', label: 'Room Overview', icon: Bed },
              { key: 'roommates', label: 'Roommates', icon: Users },
              { key: 'maintenance', label: 'Maintenance', icon: Wrench },
              { key: 'transfer', label: 'Room Transfer', icon: RefreshCw }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
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


        {/* Room Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Room Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Room Details</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  myRoom.maintenanceStatus === 'Good' ? 'bg-green-100 text-green-800' :
                  myRoom.maintenanceStatus === 'Under Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {myRoom.maintenanceStatus}
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Basic Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Room Number</p>
                        <p className="font-medium">{myRoom.roomNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bed className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Room Type</p>
                        <p className="font-medium">{myRoom.roomType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Occupancy</p>
                        <p className="font-medium">{myRoom.currentOccupants}/{myRoom.capacity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Allocated Since</p>
                        <p className="font-medium">{new Date(myRoom.allocatedDate).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Amenities */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Room Amenities</h3>
                  <div className="space-y-2">
                    {myRoom.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>


                {/* Facilities */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Block Facilities</h3>
                  <div className="space-y-2">
                    {myRoom.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Wi-Fi Details */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Wifi className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Wi-Fi Access</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Network: Hostel_A_Block</p>
                  <p className="text-sm text-gray-600">Password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{myRoom.wifiPassword}</span></p>
                  <p className="text-xs text-gray-500">Speed: 100 Mbps shared</p>
                </div>
              </div>


              {/* Monthly Rent */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Monthly Rent</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-800">₹{myRoom.monthlyRent.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Per month</p>
                  <p className="text-xs text-gray-500">Next due: Oct 5, 2025</p>
                </div>
              </div>


              {/* Maintenance Status */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Wrench className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Maintenance</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Last Cleaned: {new Date(myRoom.lastCleaned).toLocaleDateString('en-IN')}</p>
                  <p className="text-sm text-gray-600">Status: <span className="font-medium text-green-600">All Good</span></p>
                  <button 
                    onClick={() => setShowMaintenanceForm(true)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Report Issue →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Roommates Tab */}
        {activeTab === 'roommates' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Roommate Information</h2>
              
              {roommates.length > 0 ? (
                <div className="space-y-6">
                  {roommates.map((roommate) => (
                    <div key={roommate.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">{roommate.name}</h3>
                          <p className="text-gray-600 mb-4">{roommate.rollNumber} • {roommate.branch}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-700">{roommate.phoneNumber}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-700">{roommate.email}</span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-700">{roommate.hometown}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-700">Blood Group: {roommate.bloodGroup}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() => {
                                setSelectedRoommate(roommate);
                                setShowMessageModal(true);
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                            >
                              Send Message
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRoommate(roommate);
                                setShowProfileModal(true);
                              }}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
                            >
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Roommates</h3>
                  <p className="text-gray-500">You have this room to yourself!</p>
                </div>
              )}
            </div>
          </div>
        )}


        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            {/* Request Maintenance Button */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Maintenance Requests</h2>
                  <p className="text-gray-600">Report and track maintenance issues for your room</p>
                </div>
                <button
                  onClick={() => setShowMaintenanceForm(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  Report Issue
                </button>
              </div>
            </div>


            {/* Maintenance Requests List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Request History</h3>
              
              {maintenanceRequests.length > 0 ? (
                <div className="space-y-4">
                  {maintenanceRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-800">{request.type}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                            request.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {request.priority}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          request.status === 'Submitted' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{request.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Submitted: {new Date(request.submittedDate).toLocaleDateString('en-IN')}</span>
                        {request.assignedTo && <span>Assigned to: {request.assignedTo}</span>}
                        {request.resolvedDate && <span>Resolved: {new Date(request.resolvedDate).toLocaleDateString('en-IN')}</span>}
                      </div>
                      
                      {request.remarks && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700"><strong>Remarks:</strong> {request.remarks}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Maintenance Requests</h3>
                  <p className="text-gray-500">Your room is in perfect condition!</p>
                </div>
              )}
            </div>
          </div>
        )}


        {/* Room Transfer Tab */}
        {activeTab === 'transfer' && (
          <div className="space-y-6">
            {/* Request Transfer Button */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Room Transfer Requests</h2>
                  <p className="text-gray-600">Request to transfer to a different room or block</p>
                </div>
                <button
                  onClick={() => setShowTransferForm(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Request Transfer
                </button>
              </div>
            </div>


            {/* Transfer Requests List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer History</h3>
              
              {transferRequests.length > 0 ? (
                <div className="space-y-4">
                  {transferRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-gray-800">
                            {request.currentRoom} → {request.requestedRoom || `${request.requestedBlock} (${request.roomType})`}
                          </h4>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3"><strong>Reason:</strong> {request.reason}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>Submitted: {new Date(request.submittedDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      
                      {request.remarks && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700"><strong>Admin Remarks:</strong> {request.remarks}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <RefreshCw className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Transfer Requests</h3>
                  <p className="text-gray-500">You haven't requested any room transfers yet</p>
                </div>
              )}
            </div>
          </div>
        )}


        {/* Maintenance Request Modal */}
        {showMaintenanceForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Report Maintenance Issue</h3>
                <button
                  onClick={() => setShowMaintenanceForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleMaintenanceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                  <select
                    value={maintenanceForm.type}
                    onChange={(e) => setMaintenanceForm({...maintenanceForm, type: e.target.value as MaintenanceRequest['type']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="AC/Fan">AC/Fan</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={maintenanceForm.priority}
                    onChange={(e) => setMaintenanceForm({...maintenanceForm, priority: e.target.value as MaintenanceRequest['priority']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={maintenanceForm.description}
                    onChange={(e) => setMaintenanceForm({...maintenanceForm, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Please describe the issue in detail..."
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMaintenanceForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* Transfer Request Modal */}
        {showTransferForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Request Room Transfer</h3>
                <button
                  onClick={() => setShowTransferForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleTransferSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Block</label>
                  <select
                    value={transferForm.requestedBlock}
                    onChange={(e) => setTransferForm({...transferForm, requestedBlock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Block</option>
                    <option value="A Block">A Block</option>
                    <option value="B Block">B Block</option>
                    <option value="C Block">C Block</option>
                    <option value="D Block">D Block</option>
                    <option value="E Block">E Block</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Room Type</label>
                  <select
                    value={transferForm.roomType}
                    onChange={(e) => setTransferForm({...transferForm, roomType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Room Type</option>
                    <option value="Single AC">Single AC</option>
                    <option value="Single Non-AC">Single Non-AC</option>
                    <option value="Double AC">Double AC</option>
                    <option value="Double Non-AC">Double Non-AC</option>
                    <option value="Triple">Triple</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specific Room (Optional)</label>
                  <input
                    type="text"
                    value={transferForm.requestedRoom}
                    onChange={(e) => setTransferForm({...transferForm, requestedRoom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., C-301"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Transfer</label>
                  <textarea
                    value={transferForm.reason}
                    onChange={(e) => setTransferForm({...transferForm, reason: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Please explain why you want to transfer..."
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTransferForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Send Message Modal */}
        {showMessageModal && selectedRoommate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Send Message to {selectedRoommate.name}</h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Close message modal"
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                  required
                />

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Profile Modal */}
        {showProfileModal && selectedRoommate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 overflow-y-auto max-h-[80vh]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">{selectedRoommate.name}'s Profile</h3>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Close profile modal"
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center mb-6">
                {selectedRoommate.profileImage ? (
                  <img
                    src={selectedRoommate.profileImage}
                    alt={`${selectedRoommate.name} profile`}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-blue-600" />
                  </div>
                )}
                <p className="text-lg font-semibold">{selectedRoommate.name}</p>
                <p className="text-gray-600 text-sm">{selectedRoommate.rollNumber}</p>
              </div>

              <div className="space-y-4 text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Hometown: {selectedRoommate.hometown}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Branch: {selectedRoommate.branch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Semester: {selectedRoommate.semester}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone: {selectedRoommate.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email: {selectedRoommate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Blood Group: {selectedRoommate.bloodGroup}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Emergency Contact: {selectedRoommate.emergencyContact}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default MyRoomPage;

