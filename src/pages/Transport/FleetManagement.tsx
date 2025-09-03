import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, Calendar, AlertTriangle, CheckCircle, X } from 'lucide-react';

const BusManagementSystem = () => {
  const [buses, setBuses] = useState([
    {
      id: 'BUS-001',
      route: 'North Route',
      driver: 'John Smith',
      occupancy: 32,
      maxOccupancy: 40,
      status: 'Active',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15'
    },
    {
      id: 'BUS-002',
      route: 'South Route',
      driver: 'Sarah Johnson',
      occupancy: 28,
      maxOccupancy: 35,
      status: 'Active',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20'
    },
    {
      id: 'BUS-003',
      route: 'East Route',
      driver: 'Mike Wilson',
      occupancy: 0,
      maxOccupancy: 45,
      status: 'Maintenance',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-02-15'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    route: '',
    driver: '',
    occupancy: 0,
    maxOccupancy: 0,
    status: 'Active',
    lastMaintenance: '',
    nextMaintenance: ''
  });

  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const resetForm = () => {
    setFormData({
      id: '',
      route: '',
      driver: '',
      occupancy: 0,
      maxOccupancy: 0,
      status: 'Active',
      lastMaintenance: '',
      nextMaintenance: ''
    });
    setEditingBus(null);
  };

  const openModal = (bus = null) => {
    if (bus) {
      setFormData({ ...bus });
      setEditingBus(bus);
    } else {
      resetForm();
      // Auto-generate new bus ID
      const nextId = `BUS-${String(buses.length + 1).padStart(3, '0')}`;
      setFormData(prev => ({ ...prev, id: nextId }));
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.id || !formData.route || !formData.driver || !formData.lastMaintenance || !formData.nextMaintenance) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (formData.occupancy > formData.maxOccupancy) {
      alert('Current occupancy cannot exceed maximum occupancy');
      return;
    }
    
    if (editingBus) {
      // Edit existing bus
      setBuses(prev => prev.map(bus => 
        bus.id === editingBus.id ? { ...formData } : bus
      ));
    } else {
      // Add new bus
      setBuses(prev => [...prev, { ...formData }]);
    }
    
    closeModal();
  };

  const handleDelete = (busId) => {
    setBuses(prev => prev.filter(bus => bus.id !== busId));
    setDeleteConfirm(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Maintenance':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getOccupancyPercentage = (occupancy, maxOccupancy) => {
    return maxOccupancy > 0 ? (occupancy / maxOccupancy) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Bus Details</h1>
                <p className="text-sm text-gray-500">AI Powered Campus Automation System</p>
              </div>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Bus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.map((bus) => (
            <div key={bus.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{bus.id}</h3>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(bus.status)}
                    <span className={`text-sm font-medium ${
                      bus.status === 'Active' ? 'text-green-600' : 
                      bus.status === 'Maintenance' ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {bus.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-gray-700 font-medium">{bus.route}</p>
                  <p className="text-gray-600">
                    <span className="font-medium">Driver:</span> {bus.driver}
                  </p>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Occupancy: {bus.occupancy}/{bus.maxOccupancy}</span>
                      <span>{Math.round(getOccupancyPercentage(bus.occupancy, bus.maxOccupancy))}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          getOccupancyPercentage(bus.occupancy, bus.maxOccupancy) > 80 ? 'bg-red-500' :
                          getOccupancyPercentage(bus.occupancy, bus.maxOccupancy) > 60 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${getOccupancyPercentage(bus.occupancy, bus.maxOccupancy)}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">Last Maintenance:</span> {bus.lastMaintenance}</p>
                    <p><span className="font-medium">Next Maintenance:</span> {bus.nextMaintenance}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(bus)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(bus.id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingBus ? 'Edit Bus Details' : 'Add New Bus'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bus ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={editingBus !== null}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                <input
                  type="text"
                  name="route"
                  value={formData.route}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                <input
                  type="text"
                  name="driver"
                  value={formData.driver}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Occupancy</label>
                  <input
                    type="number"
                    name="occupancy"
                    value={formData.occupancy}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Occupancy</label>
                  <input
                    type="number"
                    name="maxOccupancy"
                    value={formData.maxOccupancy}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance</label>
                  <input
                    type="date"
                    name="lastMaintenance"
                    value={formData.lastMaintenance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Next Maintenance</label>
                  <input
                    type="date"
                    name="nextMaintenance"
                    value={formData.nextMaintenance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {editingBus ? 'Update Bus' : 'Add Bus'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Bus</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete bus {deleteConfirm}? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusManagementSystem;