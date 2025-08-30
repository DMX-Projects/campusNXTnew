import React, { useState } from 'react';
import { Package, Monitor, Printer, Smartphone, Wrench, CheckCircle, AlertTriangle, XCircle, Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  location: string;
  assignedTo?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  status: 'available' | 'assigned' | 'maintenance' | 'retired';
  warrantyExpiry: string;
  lastMaintenance?: string;
}

const InventoryAssets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');

  const assets: Asset[] = [
    {
      id: 'AST001',
      name: 'Dell OptiPlex 7090',
      category: 'Computer',
      serialNumber: 'DL789456123',
      purchaseDate: '2023-01-15',
      purchasePrice: 1200,
      currentValue: 950,
      location: 'Computer Lab 1',
      assignedTo: 'Lab Assistant',
      condition: 'excellent',
      status: 'assigned',
      warrantyExpiry: '2026-01-15',
      lastMaintenance: '2024-01-10'
    },
    {
      id: 'AST002',
      name: 'HP LaserJet Pro',
      category: 'Printer',
      serialNumber: 'HP456789012',
      purchaseDate: '2022-08-20',
      purchasePrice: 300,
      currentValue: 200,
      location: 'Admin Office',
      condition: 'good',
      status: 'available',
      warrantyExpiry: '2025-08-20',
      lastMaintenance: '2023-12-15'
    },
    {
      id: 'AST003',
      name: 'Interactive Whiteboard',
      category: 'Educational',
      serialNumber: 'IW123789456',
      purchaseDate: '2021-09-10',
      purchasePrice: 2500,
      currentValue: 1800,
      location: 'Classroom 301',
      assignedTo: 'Dr. Sarah Johnson',
      condition: 'good',
      status: 'assigned',
      warrantyExpiry: '2024-09-10'
    },
    {
      id: 'AST004',
      name: 'Projector Epson',
      category: 'AV Equipment',
      serialNumber: 'EP987654321',
      purchaseDate: '2020-03-05',
      purchasePrice: 800,
      currentValue: 400,
      location: 'Auditorium',
      condition: 'fair',
      status: 'maintenance',
      warrantyExpiry: '2023-03-05',
      lastMaintenance: '2024-01-08'
    },
    {
      id: 'AST005',
      name: 'MacBook Pro 16"',
      category: 'Laptop',
      serialNumber: 'MBP456123789',
      purchaseDate: '2023-06-01',
      purchasePrice: 2800,
      currentValue: 2400,
      location: 'Faculty Room',
      assignedTo: 'Prof. Michael Brown',
      condition: 'excellent',
      status: 'assigned',
      warrantyExpiry: '2026-06-01'
    },
    {
      id: 'AST006',
      name: 'Air Conditioner',
      category: 'Furniture',
      serialNumber: 'AC789123456',
      purchaseDate: '2019-05-15',
      purchasePrice: 1500,
      currentValue: 600,
      location: 'Library',
      condition: 'poor',
      status: 'retired',
      warrantyExpiry: '2022-05-15',
      lastMaintenance: '2023-08-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'retired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-orange-100 text-orange-800';
      case 'damaged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'assigned': return <Package className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      case 'retired': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Computer':
      case 'Laptop': return <Monitor className="w-5 h-5" />;
      case 'Printer': return <Printer className="w-5 h-5" />;
      case 'AV Equipment':
      case 'Educational': return <Smartphone className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    const matchesCondition = conditionFilter === 'all' || asset.condition === conditionFilter;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesCondition;
  });

  const totalAssets = assets.length;
  const availableAssets = assets.filter(a => a.status === 'available').length;
  const assignedAssets = assets.filter(a => a.status === 'assigned').length;
  const maintenanceAssets = assets.filter(a => a.status === 'maintenance').length;
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Inventory & Assets</h1>
          <p className="text-gray-600">Manage and track institutional assets, equipment, and inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Assets</p>
                <p className="text-2xl font-bold text-orange-600">{totalAssets}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-2xl font-bold text-green-600">{availableAssets}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Assigned</p>
                <p className="text-2xl font-bold text-blue-600">{assignedAssets}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{maintenanceAssets}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Wrench className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-red-600">${totalValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Package className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by asset name, serial number, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Categories</option>
                <option value="Computer">Computer</option>
                <option value="Laptop">Laptop</option>
                <option value="Printer">Printer</option>
                <option value="AV Equipment">AV Equipment</option>
                <option value="Educational">Educational</option>
                <option value="Furniture">Furniture</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="maintenance">Maintenance</option>
                <option value="retired">Retired</option>
              </select>
              <select
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Conditions</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
                <option value="damaged">Damaged</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Asset
              </button>
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  {getCategoryIcon(asset.category)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{asset.name}</h3>
                  <p className="text-sm text-gray-500">{asset.category}</p>
                  <p className="text-xs text-gray-400">SN: {asset.serialNumber}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                  {getStatusIcon(asset.status)}
                  {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionColor(asset.condition)}`}>
                  {asset.condition.charAt(0).toUpperCase() + asset.condition.slice(1)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Location</span>
                  <span className="text-sm font-medium text-gray-900">{asset.location}</span>
                </div>
                {asset.assignedTo && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Assigned To</span>
                    <span className="text-sm font-medium text-gray-900">{asset.assignedTo}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Current Value</span>
                  <span className="text-sm font-medium text-gray-900">${asset.currentValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Warranty</span>
                  <span className={`text-sm font-medium ${new Date(asset.warrantyExpiry) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                    {asset.warrantyExpiry}
                  </span>
                </div>
              </div>

              {asset.lastMaintenance && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">
                    <strong>Last Maintenance:</strong> {asset.lastMaintenance}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryAssets;