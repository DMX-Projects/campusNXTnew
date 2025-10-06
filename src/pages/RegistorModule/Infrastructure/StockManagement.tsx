import React, { useState, useMemo } from 'react';
import {
  Package, AlertCircle, CheckCircle, MapPin, Filter, Search, BarChart3,
  Plus, X, Edit2, Trash2, ChevronDown, ChevronUp, Building2
} from 'lucide-react';

// Stock data structure with locations
const initialStockData = [
  {
    id: 1,
    name: 'Desktop Computers',
    category: 'Electronics',
    locations: [
      { id: 101, room: 'Computer Lab A', department: 'IT Department', total: 50, used: 48 },
      // ... add many more locations here to test! ...
      { id: 102, room: 'Computer Lab B', department: 'IT Department', total: 40, used: 38 },
      { id: 103, room: 'Admin Office', department: 'Administration', total: 30, used: 28 },
      { id: 104, room: 'Library', department: 'Library', total: 30, used: 28 },
      { id: 105, room: 'Spare Room 1', department: 'IT Department', total: 10, used: 8 },
      { id: 106, room: 'Spare Room 2', department: 'IT Department', total: 8, used: 6 },
      { id: 107, room: 'Storage', department: 'Administration', total: 15, used: 13 },
      { id: 108, room: 'Computer Lab C', department: 'IT Department', total: 15, used: 12 },
      // ... imagine 10-25 more similar objects ...
    ]
  },
  // ... other assets ...
  {
    id: 2,
    name: 'Laptops',
    category: 'Electronics',
    locations: [
      { id: 201, room: 'Computer Lab B', department: 'IT Department', total: 40, used: 38 },
      { id: 202, room: 'Faculty Room', department: 'Administration', total: 25, used: 22 },
      { id: 203, room: 'Meeting Room', department: 'Administration', total: 15, used: 15 }
    ]
  },
  {
    id: 3,
    name: 'Projectors',
    category: 'Electronics',
    locations: [
      { id: 301, room: 'Classroom 101', department: 'Teaching', total: 15, used: 15 },
      { id: 302, room: 'Classroom 102', department: 'Teaching', total: 15, used: 13 },
      { id: 303, room: 'Auditorium', department: 'Events', total: 10, used: 8 },
      { id: 304, room: 'Conference Hall', department: 'Administration', total: 5, used: 4 }
    ]
  },
  {
    id: 4,
    name: 'Chairs',
    category: 'Furniture',
    locations: [
      { id: 401, room: 'Classrooms', department: 'Teaching', total: 300, used: 295 },
      { id: 402, room: 'Library', department: 'Library', total: 100, used: 95 },
      { id: 403, room: 'Admin Offices', department: 'Administration', total: 50, used: 48 },
      { id: 404, room: 'Faculty Rooms', department: 'Faculty', total: 50, used: 47 }
    ]
  },
  {
    id: 5,
    name: 'Microscopes',
    category: 'Lab Equipment',
    locations: [
      { id: 501, room: 'Biology Lab', department: 'Science', total: 20, used: 18 },
      { id: 502, room: 'Research Lab', department: 'Research', total: 10, used: 10 }
    ]
  }
];

const StockManagement = () => {
  const [stockData, setStockData] = useState(initialStockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedAsset, setExpandedAsset] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);
  const [showAddLocationModal, setShowAddLocationModal] = useState(null);
  const [newAsset, setNewAsset] = useState({ name: '', category: 'Electronics' });
  const [newLocation, setNewLocation] = useState({ room: '', department: '', total: '', used: '' });

  const stats = useMemo(() => {
    let totalItems = 0;
    let totalUsed = 0;
    stockData.forEach(asset => {
      asset.locations.forEach(location => {
        totalItems += location.total;
        totalUsed += location.used;
      });
    });
    const totalAvailable = totalItems - totalUsed;
    const utilizationRate = totalItems > 0 ? ((totalUsed / totalItems) * 100).toFixed(1) : 0;
    return { totalItems, totalUsed, totalAvailable, utilizationRate };
  }, [stockData]);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(stockData.map(item => item.category))];
    return cats;
  }, [stockData]);

  const filteredStock = useMemo(() => {
    return stockData.filter(asset => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.locations.some(loc =>
          loc.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loc.department.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory = filterCategory === 'All' || asset.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [stockData, searchTerm, filterCategory]);

  const getAssetTotals = (asset) => {
    const total = asset.locations.reduce((sum, loc) => sum + loc.total, 0);
    const used = asset.locations.reduce((sum, loc) => sum + loc.used, 0);
    const available = total - used;
    return { total, used, available };
  };

  const getStockStatus = (total, used) => {
    if (total === 0) return { label: 'No Stock', color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-900/30' };
    const available = total - used;
    const percentage = (available / total) * 100;
    if (percentage === 0) return { label: 'Out of Stock', color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30', card: 'bg-red-50/60 border-red-300' };
    if (percentage <= 10) return { label: 'Critical', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30', card: 'bg-orange-50/60 border-orange-300' };
    if (percentage <= 25) return { label: 'Low Stock', color: 'text-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20', card: 'bg-yellow-50/60 border-yellow-200' };
    return { label: 'Available', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30', card: 'bg-green-50/60 border-green-200' };
  };

  const handleAddAsset = () => {
    if (!newAsset.name) {
      alert('Please enter asset name');
      return;
    }
    const newItem = {
      id: Math.max(...stockData.map(a => a.id), 0) + 1,
      name: newAsset.name,
      category: newAsset.category,
      locations: []
    };
    setStockData([...stockData, newItem]);
    setNewAsset({ name: '', category: 'Electronics' });
    setShowAddModal(false);
  };

  const handleAddLocation = (assetId) => {
    if (!newLocation.room || !newLocation.department || !newLocation.total || !newLocation.used) {
      alert('Please fill in all fields');
      return;
    }
    const total = parseInt(newLocation.total);
    const used = parseInt(newLocation.used);
    if (used > total) {
      alert('Used items cannot exceed total items');
      return;
    }
    setStockData(stockData.map(asset => {
      if (asset.id === assetId) {
        const maxLocationId = asset.locations.length > 0
          ? Math.max(...asset.locations.map(l => l.id))
          : assetId * 100;
        return {
          ...asset,
          locations: [...asset.locations, {
            id: maxLocationId + 1,
            room: newLocation.room,
            department: newLocation.department,
            total: total,
            used: used
          }]
        };
      }
      return asset;
    }));

    setNewLocation({ room: '', department: '', total: '', used: '' });
    setShowAddLocationModal(null);
  };

  const handleEditLocation = (assetId, locationId, updatedLocation) => {
    setStockData(stockData.map(asset => {
      if (asset.id === assetId) {
        return {
          ...asset,
          locations: asset.locations.map(loc =>
            loc.id === locationId ? { ...loc, ...updatedLocation } : loc
          )
        };
      }
      return asset;
    }));
    setEditingLocation(null);
  };

  const handleDeleteLocation = (assetId, locationId) => {
    if (!confirm('Are you sure you want to delete this location?')) return;
    setStockData(stockData.map(asset => {
      if (asset.id === assetId) {
        return {
          ...asset,
          locations: asset.locations.filter(loc => loc.id !== locationId)
        };
      }
      return asset;
    }));
  };

  const handleDeleteAsset = (assetId) => {
    if (!confirm('Are you sure you want to delete this asset and all its locations?')) return;
    setStockData(stockData.filter(asset => asset.id !== assetId));
    setExpandedAsset(null);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Stock Control & Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">College Fixed Assets Inventory System</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Add Asset</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 rounded-xl p-6 text-blue-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 opacity-80" />
              <BarChart3 className="w-6 h-6 opacity-60" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Items</p>
            <p className="text-3xl font-bold">{stats.totalItems.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 via-green-50 to-green-200 rounded-xl p-6 text-green-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 opacity-80" />
              <div className="text-sm opacity-90">In Use</div>
            </div>
            <p className="text-sm opacity-90 mb-1">Used Items</p>
            <p className="text-3xl font-bold">{stats.totalUsed.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200 rounded-xl p-6 text-purple-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 opacity-80" />
              <div className="text-sm opacity-90">Available</div>
            </div>
            <p className="text-sm opacity-90 mb-1">Free Stock</p>
            <p className="text-3xl font-bold">{stats.totalAvailable.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-100 via-orange-50 to-orange-200 rounded-xl p-6 text-orange-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 opacity-80" />
              <div className="text-sm opacity-90">Rate</div>
            </div>
            <p className="text-sm opacity-90 mb-1">Utilization</p>
            <p className="text-3xl font-bold">{stats.utilizationRate}%</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by asset name, room, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full lg:w-48 pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stock Items Grid */}
        <div className="space-y-6">
          {filteredStock.map((asset) => {
            const totals = getAssetTotals(asset);
            const status = getStockStatus(totals.total, totals.used);
            const isExpanded = expandedAsset === asset.id;
            const percentage = totals.total > 0 ? ((totals.used / totals.total) * 100).toFixed(1) : 0;

            return (
              <div
                key={asset.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                {/* Asset Summary */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {asset.name}
                        </h3>
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-800">
                          {asset.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {asset.locations.length} location{asset.locations.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.bgColor} ${status.color}`}>
                        {status.label}
                      </span>
                      <button
                        onClick={() => handleDeleteAsset(asset.id)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Stock</p>
                      <p className="text-2xl font-bold text-gray-900">{totals.total}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-700 mb-1">In Use</p>
                      <p className="text-2xl font-bold text-blue-800">{totals.used}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-green-600 mb-1">Available</p>
                      <p className="text-2xl font-bold text-green-700">{totals.available}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span>Overall Usage</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          percentage >= 90 ? 'bg-red-300' :
                          percentage >= 75 ? 'bg-orange-300' :
                          percentage >= 50 ? 'bg-yellow-200' :
                          'bg-green-300'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpandedAsset(isExpanded ? null : asset.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      <span>{isExpanded ? 'Hide' : 'Show'} Location Details</span>
                    </button>
                    <button
                      onClick={() => setShowAddLocationModal(asset.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add Location
                    </button>
                  </div>
                </div>

                {/* Detailed Location View */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Location Breakdown
                    </h4>
                    {asset.locations.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No locations added yet. Click "Add Location" to add one.
                      </p>
                    ) : (
                      <div
                        className="
                          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
                          max-h-[420px] overflow-y-auto pr-2
                          scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100
                        "
                        style={{ }}
                      >
                        {asset.locations.map((location) => {
                          const locStatus = getStockStatus(location.total, location.used);
                          const available = location.total - location.used;
                          const locPercentage = location.total > 0 ? ((location.used / location.total) * 100).toFixed(1) : 0;
                          const isEditing = editingLocation?.assetId === asset.id && editingLocation?.locationId === location.id;

                          return (
                            <div
                              key={location.id}
                              className={`
                                relative rounded-xl shadow
                                p-4 border
                                transition duration-300
                                bg-white ${locStatus.card}
                              `}
                            >
                              {isEditing ? (
                                <div className="space-y-2">
                                  <div className="grid grid-cols-2 gap-2">
                                    <input
                                      type="text"
                                      value={editingLocation.data.room}
                                      onChange={(e) => setEditingLocation({
                                        ...editingLocation,
                                        data: { ...editingLocation.data, room: e.target.value }
                                      })}
                                      placeholder="Room"
                                      className="px-2 py-1 border border-gray-300 rounded-md"
                                    />
                                    <input
                                      type="text"
                                      value={editingLocation.data.department}
                                      onChange={(e) => setEditingLocation({
                                        ...editingLocation,
                                        data: { ...editingLocation.data, department: e.target.value }
                                      })}
                                      placeholder="Department"
                                      className="px-2 py-1 border border-gray-300 rounded-md"
                                    />
                                    <input
                                      type="number"
                                      value={editingLocation.data.total}
                                      onChange={(e) => setEditingLocation({
                                        ...editingLocation,
                                        data: { ...editingLocation.data, total: parseInt(e.target.value) || 0 }
                                      })}
                                      placeholder="Total"
                                      className="px-2 py-1 border border-gray-300 rounded-md"
                                    />
                                    <input
                                      type="number"
                                      value={editingLocation.data.used}
                                      onChange={(e) => setEditingLocation({
                                        ...editingLocation,
                                        data: { ...editingLocation.data, used: parseInt(e.target.value) || 0 }
                                      })}
                                      placeholder="Used"
                                      className="px-2 py-1 border border-gray-300 rounded-md"
                                    />
                                  </div>
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => {
                                        if (editingLocation.data.used > editingLocation.data.total) {
                                          alert('Used items cannot exceed total items');
                                          return;
                                        }
                                        handleEditLocation(asset.id, location.id, editingLocation.data);
                                      }}
                                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingLocation(null)}
                                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-center justify-between mb-1">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="font-semibold text-base text-gray-900">{location.room}</span>
                                      </div>
                                      <span className="text-xs rounded-full px-2 py-0.5 bg-blue-50 text-blue-800 mt-1 inline-block">
                                        {location.department}
                                      </span>
                                    </div>
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${locStatus.bgColor} ${locStatus.color}`}>
                                      {locStatus.label}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 py-2">
                                    <div className="flex flex-col items-center">
                                      <span className="text-xs text-gray-500">Total</span>
                                      <span className="text-lg font-bold text-gray-700">{location.total}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-xs text-blue-600">In Use</span>
                                      <span className="text-lg font-bold text-blue-800">{location.used}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-xs text-green-600">Available</span>
                                      <span className="text-lg font-bold text-green-700">{available}</span>
                                    </div>
                                  </div>
                                  <div className="mb-1">
                                    <div className="flex justify-between text-xs text-gray-400 mb-0.5">
                                      <span>Usage</span>
                                      <span>{locPercentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                      <div
                                        className={`h-full rounded-full transition-all duration-500 ${
                                          locPercentage >= 90 ? 'bg-red-200' :
                                          locPercentage >= 75 ? 'bg-orange-200' :
                                          locPercentage >= 50 ? 'bg-yellow-200' :
                                          'bg-green-200'
                                        }`}
                                        style={{ width: `${locPercentage}%` }}
                                      />
                                    </div>
                                  </div>
                                  <div className="absolute top-3 right-3 flex gap-1">
                                    <button
                                      onClick={() => setEditingLocation({
                                        assetId: asset.id,
                                        locationId: location.id,
                                        data: { ...location }
                                      })}
                                      className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteLocation(asset.id, location.id)}
                                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Asset Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Add New Asset</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset Name
                  </label>
                  <input
                    type="text"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                    placeholder="e.g., Desktop Computers"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newAsset.category}
                    onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Lab Equipment">Lab Equipment</option>
                    <option value="Sports Equipment">Sports Equipment</option>
                    <option value="Office Supplies">Office Supplies</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleAddAsset}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Add Asset
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Location Modal */}
        {showAddLocationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Add Location</h3>
                <button
                  onClick={() => setShowAddLocationModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room/Location
                  </label>
                  <input
                    type="text"
                    value={newLocation.room}
                    onChange={(e) => setNewLocation({ ...newLocation, room: e.target.value })}
                    placeholder="e.g., Computer Lab A"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newLocation.department}
                    onChange={(e) => setNewLocation({ ...newLocation, department: e.target.value })}
                    placeholder="e.g., IT Department"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Items
                    </label>
                    <input
                      type="number"
                      value={newLocation.total}
                      onChange={(e) => setNewLocation({ ...newLocation, total: e.target.value })}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Used Items
                    </label>
                    <input
                      type="number"
                      value={newLocation.used}
                      onChange={(e) => setNewLocation({ ...newLocation, used: e.target.value })}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleAddLocation(showAddLocationModal)}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Add Location
                  </button>
                  <button
                    onClick={() => setShowAddLocationModal(null)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                  >
                    Cancel
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

export default StockManagement;
