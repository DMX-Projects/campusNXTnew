import React, { useState } from 'react';
import { 
  Home, MapPin, Bed, Users, Calendar, Clock, CheckCircle,
  Wifi, FileText, Wrench, RefreshCw, AlertCircle, Phone, Mail,
  User, Building2, DollarSign, Activity, History, Eye
} from 'lucide-react';

interface RoomHistory {
  id: string;
  roomNumber: string;
  block: string;
  floor: number;
  roomType: string;
  allocatedDate: string;
  deallocatedDate?: string;
  duration: string;
  reason: string;
  status: 'Active' | 'Completed' | 'Transferred';
}

interface Roommate {
  id: string;
  name: string;
  rollNumber: string;
  branch: string;
  semester: number;
  phoneNumber: string;
  email: string;
  emergencyContact: string;
  bloodGroup: string;
  hometown: string;
  allocatedDate: string;
}

interface MaintenanceRecord {
  id: string;
  type: string;
  description: string;
  priority: string;
  status: string;
  submittedDate: string;
  resolvedDate?: string;
  assignedTo?: string;
  remarks?: string;
}

const RoomDetailsHistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'roommates' | 'maintenance'>('current');

  // Sample data - would come from API in real application
  const currentRoom = {
    id: 'A-201',
    block: 'A Block',
    floor: 2,
    roomType: 'Double AC',
    capacity: 2,
    currentOccupants: 2,
    monthlyRent: 5500,
    amenities: ['AC', 'Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom'],
    facilities: ['24/7 Security', 'Laundry Service', 'Common Room', 'Gym Access'],
    maintenanceStatus: 'Good',
    lastCleaned: '2025-01-15',
    wifiPassword: 'HostelA201@2025',
    electricityMeter: 'EM-A201-001',
    allocatedDate: '2023-07-15',
    warden: 'Mr. Prakash Sharma',
    wardenPhone: '+91-9876543200',
    wardenEmail: 'prakash.sharma@college.edu.in'
  };

  const roomHistory: RoomHistory[] = [
    {
      id: 'RH001',
      roomNumber: 'A-201',
      block: 'A Block',
      floor: 2,
      roomType: 'Double AC',
      allocatedDate: '2023-07-15',
      duration: '1 year 6 months',
      reason: 'Initial allocation',
      status: 'Active'
    },
    {
      id: 'RH002',
      roomNumber: 'B-105',
      block: 'B Block',
      floor: 1,
      roomType: 'Single AC',
      allocatedDate: '2022-07-15',
      deallocatedDate: '2023-07-14',
      duration: '1 year',
      reason: 'Room change request',
      status: 'Completed'
    }
  ];

  const roommates: Roommate[] = [
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
      hometown: 'Ahmedabad, Gujarat',
      allocatedDate: '2023-07-15'
    }
  ];

  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: 'MR001',
      type: 'AC/Fan',
      description: 'AC not cooling properly, making unusual noise',
      priority: 'High',
      status: 'In Progress',
      submittedDate: '2025-01-10',
      assignedTo: 'Maintenance Team - Ravi Kumar',
      remarks: 'Technician will visit on Jan 15th'
    },
    {
      id: 'MR002',
      type: 'Furniture',
      description: 'Study table drawer handle broken',
      priority: 'Low',
      status: 'Resolved',
      submittedDate: '2025-01-05',
      resolvedDate: '2025-01-08',
      assignedTo: 'Carpenter - Suresh',
      remarks: 'Handle replaced successfully'
    },
    {
      id: 'MR003',
      type: 'Electrical',
      description: 'Power socket not working',
      priority: 'Medium',
      status: 'Resolved',
      submittedDate: '2024-12-20',
      resolvedDate: '2024-12-22',
      assignedTo: 'Electrician - Ram',
      remarks: 'Socket replaced and tested'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Transferred': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Home className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Room Details & History</h1>
              <p className="text-gray-600">View your current room details and historical records</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'current', label: 'Current Room', icon: Home },
              { key: 'history', label: 'Room History', icon: History },
              { key: 'roommates', label: 'Roommates', icon: Users },
              { key: 'maintenance', label: 'Maintenance', icon: Wrench }
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

        {/* Current Room Tab */}
        {activeTab === 'current' && (
          <div className="space-y-6">
            {/* Room Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Current Room Overview</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentRoom.maintenanceStatus === 'Good' ? 'bg-green-100 text-green-800' :
                  currentRoom.maintenanceStatus === 'Under Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentRoom.maintenanceStatus}
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
                        <p className="font-medium">{currentRoom.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Block</p>
                        <p className="font-medium">{currentRoom.block}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bed className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Room Type</p>
                        <p className="font-medium">{currentRoom.roomType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Occupancy</p>
                        <p className="font-medium">{currentRoom.currentOccupants}/{currentRoom.capacity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Allocated Since</p>
                        <p className="font-medium">{new Date(currentRoom.allocatedDate).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Room Amenities</h3>
                  <div className="space-y-2">
                    {currentRoom.amenities.map((amenity, index) => (
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
                    {currentRoom.facilities.map((facility, index) => (
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
                  <p className="text-sm text-gray-600">Password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{currentRoom.wifiPassword}</span></p>
                  <p className="text-xs text-gray-500">Speed: 100 Mbps shared</p>
                </div>
              </div>

              {/* Monthly Rent */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Monthly Rent</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-800">₹{currentRoom.monthlyRent.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Per month</p>
                  <p className="text-xs text-gray-500">Next due: Feb 5, 2025</p>
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
                  <p className="text-sm text-gray-600">Last Cleaned: {new Date(currentRoom.lastCleaned).toLocaleDateString('en-IN')}</p>
                  <p className="text-sm text-gray-600">Status: <span className="font-medium text-green-600">All Good</span></p>
                  <p className="text-xs text-gray-500">Meter: {currentRoom.electricityMeter}</p>
                </div>
              </div>
            </div>

            {/* Warden Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Warden Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{currentRoom.warden}</h4>
                  <p className="text-gray-600 mb-2">Block Warden - {currentRoom.block}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{currentRoom.wardenPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{currentRoom.wardenEmail}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Room History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Room Allocation History</h2>
              
              <div className="space-y-4">
                {roomHistory.map((record) => (
                  <div key={record.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {record.roomNumber} - {record.block}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium">{record.duration}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Room Type</p>
                        <p className="font-medium">{record.roomType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Floor</p>
                        <p className="font-medium">{record.floor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Allocated Date</p>
                        <p className="font-medium">{new Date(record.allocatedDate).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Reason</p>
                      <p className="text-gray-800">{record.reason}</p>
                    </div>

                    {record.deallocatedDate && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Deallocated:</strong> {new Date(record.deallocatedDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Roommates Tab */}
        {activeTab === 'roommates' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Current Roommates</h2>
              
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
                          
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Roommate since:</strong> {new Date(roommate.allocatedDate).toLocaleDateString('en-IN')}
                            </p>
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
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Maintenance Records</h2>
              
              {maintenanceRecords.length > 0 ? (
                <div className="space-y-4">
                  {maintenanceRecords.map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-800">{record.type}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(record.priority)}`}>
                            {record.priority}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{record.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>Submitted: {new Date(record.submittedDate).toLocaleDateString('en-IN')}</span>
                        {record.assignedTo && <span>Assigned to: {record.assignedTo}</span>}
                        {record.resolvedDate && <span>Resolved: {new Date(record.resolvedDate).toLocaleDateString('en-IN')}</span>}
                      </div>
                      
                      {record.remarks && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700"><strong>Remarks:</strong> {record.remarks}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Maintenance Records</h3>
                  <p className="text-gray-500">Your room is in perfect condition!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsHistoryPage;