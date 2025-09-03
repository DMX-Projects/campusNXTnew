import React, { useState } from 'react';
import { Bus, Users, Wrench, CheckCircle, AlertTriangle, Plus, Edit3, Trash2, X, Save } from 'lucide-react';

// Mock data - in a real app this would come from props or API
const initialBuses = [
  {
    id: 1,
    busNumber: "BUS-001",
    routeName: "North Route",
    driverName: "John Smith",
    currentStudents: 32,
    capacity: 40,
    status: "active",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-04-15"
  },
  {
    id: 2,
    busNumber: "BUS-002",
    routeName: "South Route",
    driverName: "Sarah Johnson",
    currentStudents: 28,
    capacity: 35,
    status: "active",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-04-20"
  },
  {
    id: 3,
    busNumber: "BUS-003",
    routeName: "East Route",
    driverName: "Mike Wilson",
    currentStudents: 0,
    capacity: 45,
    status: "maintenance",
    lastMaintenance: "2024-02-01",
    nextMaintenance: "2024-02-15"
  }
];

export default function BusDetails() {
  const [buses, setBuses] = useState(initialBuses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [formData, setFormData] = useState({
    busNumber: '',
    routeName: '',
    driverName: '',
    capacity: '',
    currentStudents: '',
    status: 'active',
    lastMaintenance: '',
    nextMaintenance: ''
  });

  const statusColors = {
    active: 'text-green-600 bg-green-50',
    maintenance: 'text-yellow-600 bg-yellow-50',
    inactive: 'text-red-600 bg-red-50',
  };

  const statusIcons = {
    active: CheckCircle,
    maintenance: Wrench,
    inactive: AlertTriangle,
  };

  const resetForm = () => {
    setFormData({
      busNumber: '',
      routeName: '',
      driverName: '',
      capacity: '',
      currentStudents: '',
      status: 'active',
      lastMaintenance: '',
      nextMaintenance: ''
    });
  };

  const handleAddBus = () => {
    setShowAddForm(true);
    setEditingBus(null);
    resetForm();
  };

  const handleEditBus = (bus) => {
    setEditingBus(bus.id);
    setFormData({
      busNumber: bus.busNumber,
      routeName: bus.routeName,
      driverName: bus.driverName,
      capacity: bus.capacity.toString(),
      currentStudents: bus.currentStudents.toString(),
      status: bus.status,
      lastMaintenance: bus.lastMaintenance,
      nextMaintenance: bus.nextMaintenance
    });
    setShowAddForm(true);
  };

  const handleDeleteBus = (busId) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      setBuses(buses.filter(bus => bus.id !== busId));
    }
  };

  const handleSaveBus = () => {
    if (!formData.busNumber || !formData.routeName || !formData.driverName || !formData.capacity) {
      alert('Please fill in all required fields');
      return;
    }

    const busData = {
      ...formData,
      capacity: parseInt(formData.capacity),
      currentStudents: parseInt(formData.currentStudents) || 0,
    };

    if (editingBus) {
      setBuses(buses.map(bus => 
        bus.id === editingBus 
          ? { ...bus, ...busData }
          : bus
      ));
    } else {
      const newBus = {
        id: Math.max(...buses.map(b => b.id)) + 1,
        ...busData
      };
      setBuses([...buses, newBus]);
    }

    setShowAddForm(false);
    setEditingBus(null);
    resetForm();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingBus(null);
    resetForm();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800"></h3>
          <p className="text-sm text-gray-600 mt-1"></p>
        </div>
        <button 
          onClick={handleAddBus}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add New Bus</span>
          <span className="sm:hidden">Add Bus</span>
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {editingBus ? 'Edit Bus' : 'Add New Bus'}
                </h4>
                <button 
                  onClick={handleCancel}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bus Number *</label>
                  <input
                    type="text"
                    value={formData.busNumber}
                    onChange={(e) => handleInputChange('busNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., BUS-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route Name *</label>
                  <input
                    type="text"
                    value={formData.routeName}
                    onChange={(e) => handleInputChange('routeName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., North Route"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name *</label>
                  <input
                    type="text"
                    value={formData.driverName}
                    onChange={(e) => handleInputChange('driverName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., John Smith"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="40"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Students</label>
                    <input
                      type="number"
                      value={formData.currentStudents}
                      onChange={(e) => handleInputChange('currentStudents', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance</label>
                    <input
                      type="date"
                      value={formData.lastMaintenance}
                      onChange={(e) => handleInputChange('lastMaintenance', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Next Maintenance</label>
                    <input
                      type="date"
                      value={formData.nextMaintenance}
                      onChange={(e) => handleInputChange('nextMaintenance', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBus}
                  className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Save className="w-4 h-4" />
                  {editingBus ? 'Update Bus' : 'Add Bus'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bus Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {buses.map((bus) => {
          const StatusIcon = statusIcons[bus.status];
          const occupancyPercentage = (bus.currentStudents / bus.capacity) * 100;
          
          return (
            <div key={bus.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Bus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{bus.busNumber}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{bus.routeName}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusColors[bus.status]}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span className="capitalize hidden sm:inline">{bus.status}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Driver</span>
                  <span className="font-medium text-gray-800 truncate ml-2">{bus.driverName}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Occupancy</span>
                    <span className="sm:hidden">Occ.</span>
                  </span>
                  <span className="font-medium text-gray-800">
                    {bus.currentStudents}/{bus.capacity}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Capacity Used</span>
                    <span>{occupancyPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        occupancyPercentage > 90 ? 'bg-red-500' :
                        occupancyPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${occupancyPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Last Maintenance</span>
                    <span>{bus.lastMaintenance}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Next Maintenance</span>
                    <span>{bus.nextMaintenance}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBus(bus)}
                      className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 text-sm font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteBus(bus.id)}
                      className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {buses.length === 0 && (
        <div className="text-center py-12">
          <Bus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No buses found</h3>
          <p className="text-gray-500 mb-4">Start by adding your first bus to the fleet</p>
          <button
            onClick={handleAddBus}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Your First Bus
          </button>
        </div>
      )}
    </div>
  );
}