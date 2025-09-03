import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCheck, Search, Phone, MapPin, Briefcase, 
  X, Edit, Eye, Plus 
} from 'lucide-react';

// Mock data - replace with your actual data source
const initialStaffData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    designation: "Professor",
    department: "Computer Science",
    busRoute: "Route A1",
    pickupPoint: "Central Plaza",
    contact: "+91 98765 43210"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    designation: "Associate Professor",
    department: "Mathematics",
    busRoute: "Route B2",
    pickupPoint: "Tech Park Gate",
    contact: "+91 98765 43211"
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    designation: "Assistant Professor",
    department: "Physics",
    busRoute: "Route C3",
    pickupPoint: "Metro Station",
    contact: "+91 98765 43212"
  },
  {
    id: 4,
    name: "Prof. Rajesh Kumar",
    designation: "Professor",
    department: "Chemistry",
    busRoute: "Route A1",
    pickupPoint: "City Center",
    contact: "+91 98765 43213"
  },
  {
    id: 5,
    name: "Dr. Anjali Reddy",
    designation: "Assistant Professor",
    department: "Biology",
    busRoute: "Route B2",
    pickupPoint: "Hospital Junction",
    contact: "+91 98765 43214"
  }
];

export default function StaffList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [staff, setStaff] = useState(initialStaffData);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  
  const navigate = useNavigate();

  const handleAddStaff = () => {
    navigate('/transport/add-faculty');
  };

  const handleViewDetails = (member) => {
    setSelectedStaff(member);
    setShowDetailsModal(true);
  };

  const handleEdit = (member) => {
    setSelectedStaff(member);
    setEditForm({ ...member });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setStaff(staff.map(member => 
      member.id === selectedStaff.id ? { ...editForm } : member
    ));
    setShowEditModal(false);
    setSelectedStaff(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setSelectedStaff(null);
    setEditForm({});
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedStaff(null);
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800"></h3>
            <p className="text-sm text-gray-600"></p>
          </div>

          <button
            onClick={handleAddStaff}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>

        {/* Search + Staff List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {member.designation}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Department</span>
                    <span className="font-medium text-gray-800">{member.department}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Route</span>
                    <span className="font-medium text-gray-800">{member.busRoute}</span>
                  </div>

                  <div className="flex items-start justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Pickup
                    </span>
                    <span className="font-medium text-gray-800 text-right">{member.pickupPoint}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Contact
                    </span>
                    <span className="font-medium text-gray-800">{member.contact}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-300">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetails(member)}
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                      <button 
                        onClick={() => handleEdit(member)}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm flex items-center justify-center"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No staff members found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Staff Details</h3>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{selectedStaff.name}</h4>
                    <p className="text-sm text-gray-600">{selectedStaff.designation}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Department
                    </span>
                    <span className="font-medium text-gray-800">{selectedStaff.department}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Bus Route</span>
                    <span className="font-medium text-gray-800">{selectedStaff.busRoute}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Pickup Point
                    </span>
                    <span className="font-medium text-gray-800">{selectedStaff.pickupPoint}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </span>
                    <span className="font-medium text-gray-800">{selectedStaff.contact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Edit Staff Member</h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={editForm.designation || ''}
                    onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={editForm.department || ''}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bus Route</label>
                  <input
                    type="text"
                    value={editForm.busRoute || ''}
                    onChange={(e) => setEditForm({ ...editForm, busRoute: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Point</label>
                  <input
                    type="text"
                    value={editForm.pickupPoint || ''}
                    onChange={(e) => setEditForm({ ...editForm, pickupPoint: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <input
                    type="text"
                    value={editForm.contact || ''}
                    onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
