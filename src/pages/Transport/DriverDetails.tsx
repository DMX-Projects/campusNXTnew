import React, { useState } from 'react';
import { UserCog, Search, Phone, Star, CheckCircle, XCircle, Award, X, User, Mail, MapPin, Calendar, Truck } from 'lucide-react';

// Mock data for drivers
const initialDrivers = [
  {
    id: 1,
    name: "John Smith",
    licenseNumber: "DL123456789",
    busAssigned: "Bus-001",
    experience: 8,
    contact: "+1-234-567-8900",
    rating: 4.5,
    address: "123 Main Street, Springfield, IL 62701",
    attendanceToday: "present",
    email: "john.smith@email.com",
    dateOfJoining: "2020-03-15",
    emergencyContact: "+1-234-567-8901"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    licenseNumber: "DL987654321",
    busAssigned: "Bus-002",
    experience: 5,
    contact: "+1-234-567-8902",
    rating: 4.8,
    address: "456 Oak Avenue, Chicago, IL 60601",
    attendanceToday: "present",
    email: "sarah.johnson@email.com",
    dateOfJoining: "2021-07-22",
    emergencyContact: "+1-234-567-8903"
  },
  {
    id: 3,
    name: "Mike Wilson",
    licenseNumber: "DL456789123",
    busAssigned: "Bus-003",
    experience: 12,
    contact: "+1-234-567-8904",
    rating: 4.2,
    address: "789 Pine Road, Milwaukee, WI 53201",
    attendanceToday: "absent",
    email: "mike.wilson@email.com",
    dateOfJoining: "2018-01-10",
    emergencyContact: "+1-234-567-8905"
  }
];

export default function DriverDetails() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);

  const [newDriver, setNewDriver] = useState({
    name: '',
    licenseNumber: '',
    busAssigned: '',
    experience: '',
    contact: '',
    address: '',
    email: '',
    dateOfJoining: '',
    emergencyContact: ''
  });

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.busAssigned.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const attendanceColors = {
    present: 'text-green-600 bg-green-50',
    absent: 'text-red-600 bg-red-50',
  };

  const attendanceIcons = {
    present: CheckCircle,
    absent: XCircle,
  };

  // Handle Add Driver
  const handleAddDriver = () => {
    setShowAddForm(true);
  };

  const handleSubmitNewDriver = (e) => {
    e.preventDefault();
    const newDriverData = {
      ...newDriver,
      id: Date.now(),
      rating: 4.0,
      attendanceToday: 'present',
      experience: parseInt(newDriver.experience)
    };
    setDrivers([...drivers, newDriverData]);
    setNewDriver({
      name: '',
      licenseNumber: '',
      busAssigned: '',
      experience: '',
      contact: '',
      address: '',
      email: '',
      dateOfJoining: '',
      emergencyContact: ''
    });
    setShowAddForm(false);
  };

  // Handle View Profile
  const handleViewProfile = (driver) => {
    setSelectedDriver(driver);
    setShowViewDetails(true);
  };

  // Handle Edit Driver
  const handleEditDriver = (driver) => {
    setEditingDriver({ ...driver });
    setShowEditForm(true);
  };

  const handleUpdateDriver = (e) => {
    e.preventDefault();
    setDrivers(drivers.map(driver => 
      driver.id === editingDriver.id ? editingDriver : driver
    ));
    setShowEditForm(false);
    setEditingDriver(null);
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800"></h3>
          <p className="text-sm text-gray-600"></p>
        </div>
        <button 
          onClick={handleAddDriver}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Driver
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => {
            const AttendanceIcon = attendanceIcons[driver.attendanceToday];
            
            return (
              <div key={driver.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserCog className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{driver.name}</h4>
                      <p className="text-sm text-gray-600">{driver.licenseNumber}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${attendanceColors[driver.attendanceToday]}`}>
                    <AttendanceIcon className="w-3 h-3" />
                    <span className="capitalize">{driver.attendanceToday}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Bus Assigned</span>
                    <span className="font-medium text-gray-800">{driver.busAssigned}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Experience
                    </span>
                    <span className="font-medium text-gray-800">{driver.experience} years</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Contact
                    </span>
                    <span className="font-medium text-gray-800">{driver.contact}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Rating
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium text-gray-800">{driver.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(driver.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-300">
                    <div className="text-xs text-gray-600 mb-2">Address</div>
                    <div className="text-sm text-gray-800">{driver.address}</div>
                  </div>

                  <div className="flex space-x-2 pt-3">
                    <button 
                      onClick={() => handleViewProfile(driver)}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleEditDriver(driver)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Driver Modal */}
      <Modal 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)}
        title="Add New Driver"
      >
        <form onSubmit={handleSubmitNewDriver} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={newDriver.name}
                onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
              <input
                type="text"
                required
                value={newDriver.licenseNumber}
                onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bus Assigned</label>
              <input
                type="text"
                required
                value={newDriver.busAssigned}
                onChange={(e) => setNewDriver({...newDriver, busAssigned: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
              <input
                type="number"
                required
                value={newDriver.experience}
                onChange={(e) => setNewDriver({...newDriver, experience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input
                type="tel"
                required
                value={newDriver.contact}
                onChange={(e) => setNewDriver({...newDriver, contact: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={newDriver.email}
                onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
              <input
                type="date"
                required
                value={newDriver.dateOfJoining}
                onChange={(e) => setNewDriver({...newDriver, dateOfJoining: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input
                type="tel"
                required
                value={newDriver.emergencyContact}
                onChange={(e) => setNewDriver({...newDriver, emergencyContact: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              required
              value={newDriver.address}
              onChange={(e) => setNewDriver({...newDriver, address: e.target.value})}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Driver
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* View Profile Modal */}
      <Modal 
        isOpen={showViewDetails} 
        onClose={() => setShowViewDetails(false)}
        title="Driver Profile Details"
      >
        {selectedDriver && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{selectedDriver.name}</h3>
                <p className="text-gray-600">{selectedDriver.licenseNumber}</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${attendanceColors[selectedDriver.attendanceToday]}`}>
                  <span className="capitalize">{selectedDriver.attendanceToday} Today</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Bus Assigned</p>
                    <p className="font-medium text-gray-800">{selectedDriver.busAssigned}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-medium text-gray-800">{selectedDriver.experience} years</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">{selectedDriver.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(selectedDriver.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium text-gray-800">{selectedDriver.contact}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-800">{selectedDriver.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Date of Joining</p>
                    <p className="font-medium text-gray-800">{selectedDriver.dateOfJoining}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-800">{selectedDriver.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Emergency Contact</p>
                  <p className="font-medium text-gray-800">{selectedDriver.emergencyContact}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Driver Modal */}
      <Modal 
        isOpen={showEditForm} 
        onClose={() => setShowEditForm(false)}
        title="Edit Driver Details"
      >
        {editingDriver && (
          <form onSubmit={handleUpdateDriver} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={editingDriver.name}
                  onChange={(e) => setEditingDriver({...editingDriver, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input
                  type="text"
                  required
                  value={editingDriver.licenseNumber}
                  onChange={(e) => setEditingDriver({...editingDriver, licenseNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bus Assigned</label>
                <input
                  type="text"
                  required
                  value={editingDriver.busAssigned}
                  onChange={(e) => setEditingDriver({...editingDriver, busAssigned: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                <input
                  type="number"
                  required
                  value={editingDriver.experience}
                  onChange={(e) => setEditingDriver({...editingDriver, experience: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  type="tel"
                  required
                  value={editingDriver.contact}
                  onChange={(e) => setEditingDriver({...editingDriver, contact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editingDriver.email}
                  onChange={(e) => setEditingDriver({...editingDriver, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                required
                value={editingDriver.address}
                onChange={(e) => setEditingDriver({...editingDriver, address: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Driver
              </button>
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}