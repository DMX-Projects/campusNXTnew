import React, { useState } from 'react';
import { Bus, Search, Filter, Plus, X, Edit, Trash2, Users, Calendar, Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

// Mock data for buses
const initialBuses = [
  {
    id: 1,
    busNumber: 'BUS-001',
    routeName: 'North Route',
    driverName: 'John Smith',
    capacity: 40,
    currentStudents: 32,
    status: 'active',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15'
  },
  {
    id: 2,
    busNumber: 'BUS-002',
    routeName: 'South Route',
    driverName: 'Sarah Johnson',
    capacity: 35,
    currentStudents: 28,
    status: 'active',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-04-20'
  },
  {
    id: 3,
    busNumber: 'BUS-003',
    routeName: 'East Route',
    driverName: 'Mike Wilson',
    capacity: 45,
    currentStudents: 0,
    status: 'maintenance',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-02-15'
  }
];

export default function BusManagement() {
  const [buses, setBuses] = useState(initialBuses);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [newBus, setNewBus] = useState({
    busNumber: '',
    routeName: '',
    driverName: '',
    capacity: '',
    currentStudents: '',
    status: 'active',
    lastMaintenance: '',
    nextMaintenance: ''
  });

  const filteredBuses = buses.filter(bus => {
    const matchesSearch = bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || bus.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    active: 'text-green-600 bg-green-50',
    maintenance: 'text-yellow-600 bg-yellow-50',
    inactive: 'text-gray-600 bg-gray-50',
  };

  const statusIcons = {
    active: CheckCircle,
    maintenance: Wrench,
    inactive: AlertTriangle,
  };

  const getCapacityColor = (current, total) => {
    const percentage = (current / total) * 100;
    if (percentage >= 80) return 'bg-yellow-400';
    if (percentage >= 60) return 'bg-blue-400';
    return 'bg-green-400';
  };

  const handleAddBus = () => {
    if (!newBus.busNumber || !newBus.routeName || !newBus.driverName || !newBus.capacity) {
      alert('Please fill in all required fields');
      return;
    }
    
    const bus = {
      id: Date.now(),
      busNumber: newBus.busNumber,
      routeName: newBus.routeName,
      driverName: newBus.driverName,
      capacity: parseInt(newBus.capacity),
      currentStudents: parseInt(newBus.currentStudents) || 0,
      status: newBus.status,
      lastMaintenance: newBus.lastMaintenance,
      nextMaintenance: newBus.nextMaintenance
    };
    setBuses([...buses, bus]);
    resetForm();
    setShowAddModal(false);
  };

  const handleEditBus = (bus) => {
    setEditingBus(bus);
    setNewBus({
      busNumber: bus.busNumber,
      routeName: bus.routeName,
      driverName: bus.driverName,
      capacity: bus.capacity.toString(),
      currentStudents: bus.currentStudents.toString(),
      status: bus.status,
      lastMaintenance: bus.lastMaintenance,
      nextMaintenance: bus.nextMaintenance
    });
    setShowEditModal(true);
  };

  const handleUpdateBus = () => {
    if (!newBus.busNumber || !newBus.routeName || !newBus.driverName || !newBus.capacity) {
      alert('Please fill in all required fields');
      return;
    }
    
    const updatedBuses = buses.map(bus => 
      bus.id === editingBus.id 
        ? {
            ...bus,
            busNumber: newBus.busNumber,
            routeName: newBus.routeName,
            driverName: newBus.driverName,
            capacity: parseInt(newBus.capacity),
            currentStudents: parseInt(newBus.currentStudents),
            status: newBus.status,
            lastMaintenance: newBus.lastMaintenance,
            nextMaintenance: newBus.nextMaintenance
          }
        : bus
    );
    setBuses(updatedBuses);
    setShowEditModal(false);
    setEditingBus(null);
    resetForm();
  };

  const handleDeleteBus = (id) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      setBuses(buses.filter(bus => bus.id !== id));
    }
  };

  const resetForm = () => {
    setNewBus({
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

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingBus(null);
    resetForm();
  };

  // Add effect to prevent body scroll when modal is open
  React.useEffect(() => {
    if (showAddModal || showEditModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAddModal, showEditModal]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Bus Fleet</h1>
              <p className="text-sm text-gray-600">{filteredBuses.length} buses</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Bar - Always Visible on Mobile */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search buses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-12 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
                showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Collapsible Filter */}
          {showFilters && (
            <div className="mt-3 p-3 bg-gray-50 rounded-xl">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Bus Cards - Mobile Optimized */}
      <div className="mx-4 mt-4 space-y-3">
        {filteredBuses.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <Bus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">No buses found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredBuses.map((bus) => {
            const StatusIcon = statusIcons[bus.status];
            const capacityPercentage = (bus.currentStudents / bus.capacity) * 100;
            
            return (
              <div key={bus.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bus className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 text-lg">{bus.busNumber}</h3>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize flex items-center space-x-1 ${statusColors[bus.status]}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{bus.status}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{bus.routeName}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Driver</span>
                        <span className="font-medium text-gray-900">{bus.driverName}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Occupancy</span>
                        </div>
                        <span className="font-medium text-gray-900">{bus.currentStudents}/{bus.capacity}</span>
                      </div>
                      
                      {/* Capacity Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">Capacity Used</span>
                          <span className="text-gray-900 font-medium">{Math.round(capacityPercentage)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getCapacityColor(bus.currentStudents, bus.capacity)}`}
                            style={{ width: `${capacityPercentage}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                        <div>
                          <div className="flex items-center space-x-1 text-gray-600 mb-1">
                            <Calendar className="w-3 h-3" />
                            <span>Last Maintenance</span>
                          </div>
                          <p className="text-gray-900 font-medium">
                            {new Date(bus.lastMaintenance).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short'
                            })}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-1 text-gray-600 mb-1">
                            <Calendar className="w-3 h-3" />
                            <span>Next Maintenance</span>
                          </div>
                          <p className="text-gray-900 font-medium">
                            {new Date(bus.nextMaintenance).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => handleEditBus(bus)}
                        className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 hover:bg-blue-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteBus(bus.id)}
                        className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FULLSCREEN MODAL OVERLAY - Add Bus */}
      {showAddModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[99999] m-0" 
             style={{ margin: 0, padding: '16px', position: 'fixed', inset: '0px' }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Bus className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Add New Bus</h2>
              </div>
              <button
                onClick={closeAllModals}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Form */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bus Number *
                </label>
                <input
                  type="text"
                  required
                  value={newBus.busNumber}
                  onChange={(e) => setNewBus({...newBus, busNumber: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  placeholder="e.g., BUS-001"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Route Name *
                </label>
                <input
                  type="text"
                  required
                  value={newBus.routeName}
                  onChange={(e) => setNewBus({...newBus, routeName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  placeholder="e.g., North Route"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Driver Name *
                </label>
                <input
                  type="text"
                  required
                  value={newBus.driverName}
                  onChange={(e) => setNewBus({...newBus, driverName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  placeholder="e.g., John Smith"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newBus.capacity}
                    onChange={(e) => setNewBus({...newBus, capacity: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                    placeholder="40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Students
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newBus.currentStudents}
                    onChange={(e) => setNewBus({...newBus, currentStudents: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newBus.status}
                  onChange={(e) => setNewBus({...newBus, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Maintenance
                  </label>
                  <input
                    type="date"
                    value={newBus.lastMaintenance}
                    onChange={(e) => setNewBus({...newBus, lastMaintenance: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Next Maintenance
                  </label>
                  <input
                    type="date"
                    value={newBus.nextMaintenance}
                    onChange={(e) => setNewBus({...newBus, nextMaintenance: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  />
                </div>
              </div>
              {/* Modal Action Buttons */}
              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-base"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddBus}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-base flex items-center justify-center space-x-2"
                >
                  <Bus className="w-5 h-5" />
                  <span>Add Bus</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN MODAL OVERLAY - Edit Bus */}
      {showEditModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[99999] m-0" 
             style={{ margin: 0, padding: '16px', position: 'fixed', inset: '0px' }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Edit className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Edit Bus</h2>
              </div>
              <button
                onClick={closeAllModals}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Form */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bus Number *
                </label>
                <input
                  type="text"
                  required
                  value={newBus.busNumber}
                  onChange={(e) => setNewBus({...newBus, busNumber: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Route Name *
                </label>
                <input
                  type="text"
                  required
                  value={newBus.routeName}
                  onChange={(e) => setNewBus({...newBus, routeName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Driver Name *
                </label>
                <input
                  type="text"
                  required
                  value={newBus.driverName}
                  onChange={(e) => setNewBus({...newBus, driverName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newBus.capacity}
                    onChange={(e) => setNewBus({...newBus, capacity: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Students
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newBus.currentStudents}
                    onChange={(e) => setNewBus({...newBus, currentStudents: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newBus.status}
                  onChange={(e) => setNewBus({...newBus, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Maintenance
                  </label>
                  <input
                    type="date"
                    value={newBus.lastMaintenance}
                    onChange={(e) => setNewBus({...newBus, lastMaintenance: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Next Maintenance
                  </label>
                  <input
                    type="date"
                    value={newBus.nextMaintenance}
                    onChange={(e) => setNewBus({...newBus, nextMaintenance: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base"
                  />
                </div>
              </div>
              {/* Modal Action Buttons */}
              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-base"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateBus}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-base flex items-center justify-center space-x-2"
                >
                  <Edit className="w-5 h-5" />
                  <span>Update Bus</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
