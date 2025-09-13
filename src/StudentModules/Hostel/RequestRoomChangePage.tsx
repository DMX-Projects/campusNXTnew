import React, { useState } from 'react';
import { 
  RefreshCw, Home, MapPin, Bed, Users, Calendar, Clock, 
  AlertCircle, CheckCircle, FileText, Building2, DollarSign,
  Eye, X, Info, User, Phone, Mail
} from 'lucide-react';

interface RoomChangeRequest {
  id: string;
  currentRoom: string;
  requestedRoom?: string;
  requestedBlock?: string;
  roomType?: string;
  reason: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processing';
  remarks?: string;
  priority: 'Low' | 'Medium' | 'High';
}

interface AvailableRoom {
  id: string;
  block: string;
  floor: number;
  roomType: string;
  capacity: number;
  currentOccupants: number;
  monthlyRent: number;
  amenities: string[];
  availability: 'Available' | 'Occupied' | 'Under Maintenance';
}

const RequestRoomChangePage: React.FC = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoom | null>(null);
  const [requestForm, setRequestForm] = useState({
    requestedRoom: '',
    requestedBlock: '',
    roomType: '',
    reason: '',
    urgency: 'Medium' as 'Low' | 'Medium' | 'High',
    preferredMoveDate: ''
  });

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Rahul Kumar',
    rollNumber: '2023CSE001',
    currentRoom: 'A-201',
    currentBlock: 'A Block',
    currentRoomType: 'Double AC',
    monthlyRent: 5500,
    allocatedDate: '2023-07-15'
  };

  const existingRequests: RoomChangeRequest[] = [
    {
      id: 'TR001',
      currentRoom: 'A-201',
      requestedBlock: 'C Block',
      roomType: 'Single AC',
      reason: 'Need single room for better study environment during final year',
      submittedDate: '2025-01-10',
      status: 'Pending',
      remarks: 'Request under review by hostel administration',
      priority: 'High'
    }
  ];

  const availableRooms: AvailableRoom[] = [
    {
      id: 'C-301',
      block: 'C Block',
      floor: 3,
      roomType: 'Single AC',
      capacity: 1,
      currentOccupants: 0,
      monthlyRent: 7500,
      amenities: ['AC', 'Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom'],
      availability: 'Available'
    },
    {
      id: 'C-302',
      block: 'C Block',
      floor: 3,
      roomType: 'Single AC',
      capacity: 1,
      currentOccupants: 0,
      monthlyRent: 7500,
      amenities: ['AC', 'Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom'],
      availability: 'Available'
    },
    {
      id: 'A-202',
      block: 'A Block',
      floor: 2,
      roomType: 'Double AC',
      capacity: 2,
      currentOccupants: 1,
      monthlyRent: 5500,
      amenities: ['AC', 'Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom'],
      availability: 'Available'
    },
    {
      id: 'B-401',
      block: 'B Block',
      floor: 4,
      roomType: 'Single Non-AC',
      capacity: 1,
      currentOccupants: 0,
      monthlyRent: 5500,
      amenities: ['Wi-Fi', 'Study Table', 'Wardrobe', 'Attached Bathroom'],
      availability: 'Available'
    }
  ];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Room change request submitted:', requestForm);
    alert('Room change request submitted successfully! You will be notified about the status.');
    setShowRequestForm(false);
    setRequestForm({
      requestedRoom: '',
      requestedBlock: '',
      roomType: '',
      reason: '',
      urgency: 'Medium',
      preferredMoveDate: ''
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-red-100 text-red-800';
      case 'Under Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openRoomDetails = (room: AvailableRoom) => {
    setSelectedRoom(room);
    setShowRoomDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <RefreshCw className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Room Change Request</h1>
                <p className="text-gray-600">Request to transfer to a different room or block</p>
              </div>
            </div>
            <button
              onClick={() => setShowRequestForm(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Request
            </button>
          </div>
        </div>

        {/* Current Room Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Current Room Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Room Number</p>
                <p className="font-medium">{currentStudent.currentRoom}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Block</p>
                <p className="font-medium">{currentStudent.currentBlock}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bed className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Room Type</p>
                <p className="font-medium">{currentStudent.currentRoomType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Monthly Rent</p>
                <p className="font-medium">₹{currentStudent.monthlyRent}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Allocated since:</strong> {new Date(currentStudent.allocatedDate).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>

        {/* Available Rooms */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRooms.map((room) => (
              <div key={room.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{room.id}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(room.availability)}`}>
                    {room.availability}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{room.block} - Floor {room.floor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{room.roomType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{room.currentOccupants}/{room.capacity} occupants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">₹{room.monthlyRent}/month</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openRoomDetails(room)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Requests */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Room Change Requests</h2>
          
          {existingRequests.length > 0 ? (
            <div className="space-y-4">
              {existingRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Request #{request.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority} Priority
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Submitted: {new Date(request.submittedDate).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Room Change Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {request.currentRoom} → {request.requestedRoom || `${request.requestedBlock} (${request.roomType})`}
                          </span>
                        </div>
                        {request.requestedBlock && (
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Block: {request.requestedBlock}</span>
                          </div>
                        )}
                        {request.roomType && (
                          <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Type: {request.roomType}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Reason</h4>
                      <p className="text-sm text-gray-600">{request.reason}</p>
                    </div>
                  </div>

                  {request.remarks && (
                    <div className="p-3 bg-gray-50 rounded-lg">
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
              <RefreshCw className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Room Change Requests</h3>
              <p className="text-gray-500">You haven't submitted any room change requests yet</p>
            </div>
          )}
        </div>

        {/* Request Form Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">New Room Change Request</h3>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Block <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={requestForm.requestedBlock}
                      onChange={(e) => setRequestForm({...requestForm, requestedBlock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select Block</option>
                      <option value="A Block">A Block (Boys)</option>
                      <option value="B Block">B Block (Girls)</option>
                      <option value="C Block">C Block (Boys)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Room Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={requestForm.roomType}
                      onChange={(e) => setRequestForm({...requestForm, roomType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select Room Type</option>
                      <option value="Single AC">Single AC (₹7,500/month)</option>
                      <option value="Single Non-AC">Single Non-AC (₹5,500/month)</option>
                      <option value="Double AC">Double AC (₹5,500/month)</option>
                      <option value="Double Non-AC">Double Non-AC (₹4,000/month)</option>
                      <option value="Triple">Triple (₹3,500/month)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Room (Optional)
                  </label>
                  <input
                    type="text"
                    value={requestForm.requestedRoom}
                    onChange={(e) => setRequestForm({...requestForm, requestedRoom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., C-301"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Room Change <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={requestForm.reason}
                    onChange={(e) => setRequestForm({...requestForm, reason: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Please explain why you want to change your room..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      value={requestForm.urgency}
                      onChange={(e) => setRequestForm({...requestForm, urgency: e.target.value as 'Low' | 'Medium' | 'High'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Move Date
                    </label>
                    <input
                      type="date"
                      value={requestForm.preferredMoveDate}
                      onChange={(e) => setRequestForm({...requestForm, preferredMoveDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900 mb-1">Important Information</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Room change requests are processed based on availability and priority</li>
                        <li>• You will be notified via email about the request status</li>
                        <li>• Additional charges may apply for room upgrades</li>
                        <li>• Current room must be vacated within 48 hours of approval</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Room Details Modal */}
        {showRoomDetails && selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Room Details - {selectedRoom.id}</h3>
                <button
                  onClick={() => setShowRoomDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Basic Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Block</p>
                          <p className="font-medium">{selectedRoom.block}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Home className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Floor</p>
                          <p className="font-medium">{selectedRoom.floor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Bed className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Room Type</p>
                          <p className="font-medium">{selectedRoom.roomType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Capacity</p>
                          <p className="font-medium">{selectedRoom.currentOccupants}/{selectedRoom.capacity}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Pricing & Availability</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Monthly Rent</p>
                          <p className="font-medium text-lg">₹{selectedRoom.monthlyRent}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Availability</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(selectedRoom.availability)}`}>
                            {selectedRoom.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Room Comparison</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>• Current Room: {currentStudent.currentRoom} ({currentStudent.currentRoomType}) - ₹{currentStudent.monthlyRent}/month</p>
                    <p>• Requested Room: {selectedRoom.id} ({selectedRoom.roomType}) - ₹{selectedRoom.monthlyRent}/month</p>
                    {selectedRoom.monthlyRent > currentStudent.monthlyRent && (
                      <p className="text-red-600 font-medium">• Additional cost: ₹{selectedRoom.monthlyRent - currentStudent.monthlyRent}/month</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setRequestForm({
                        ...requestForm,
                        requestedRoom: selectedRoom.id,
                        requestedBlock: selectedRoom.block,
                        roomType: selectedRoom.roomType
                      });
                      setShowRoomDetails(false);
                      setShowRequestForm(true);
                    }}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
                  >
                    Request This Room
                  </button>
                  <button
                    onClick={() => setShowRoomDetails(false)}
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

export default RequestRoomChangePage;