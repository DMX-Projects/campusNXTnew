import React, { useState } from 'react';
import { 
  Bus, 
  Users, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  MapPin,
  DollarSign,
  CheckCircle,
  BarChart3,
  X,
  Search,
  Filter,
  Download,
  Calendar,
  FileText,
  Printer
} from 'lucide-react';

// Mock data
const mockVehicles = [
  { id: 1, registrationNumber: 'BUS-001', model: 'Tata LP 407', status: 'active', fuelLevel: 85, location: 'Route A - Stop 3', driver: 'John Doe' },
  { id: 2, registrationNumber: 'BUS-002', model: 'Ashok Leyland', status: 'maintenance', fuelLevel: 45, location: 'Workshop', driver: 'Jane Smith' },
  { id: 3, registrationNumber: 'BUS-003', model: 'Mahindra Tourister', status: 'active', fuelLevel: 92, location: 'Route B - Stop 7', driver: 'Mike Johnson' },
  { id: 4, registrationNumber: 'BUS-004', model: 'Tata LP 407', status: 'idle', fuelLevel: 78, location: 'Depot', driver: 'Sarah Wilson' },
];

const mockRoutes = [
  { id: 1, name: 'Route A - North Campus', assignedStudents: 45, status: 'active' },
  { id: 2, name: 'Route B - South Campus', assignedStudents: 38, status: 'active' },
  { id: 3, name: 'Route C - East Campus', assignedStudents: 52, status: 'active' },
];

const TrackVehiclesForm = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      case 'idle': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFuelColor = (level) => {
    if (level > 70) return 'text-green-600';
    if (level > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl flex flex-col" style={{ height: '90vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Track Vehicles</h2>
            <p className="text-sm text-gray-600 mt-1">Monitor real-time vehicle status and locations</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vehicles, drivers, or models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="idle">Idle</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle List - Scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="grid gap-4">
              {filteredVehicles.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Bus className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{vehicle.registrationNumber}</h3>
                        <p className="text-sm text-gray-600">{vehicle.model}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Driver</p>
                      <p className="font-medium text-gray-900">{vehicle.driver}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{vehicle.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fuel Level</p>
                      <p className={`font-medium ${getFuelColor(vehicle.fuelLevel)}`}>
                        {vehicle.fuelLevel}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredVehicles.length} of {mockVehicles.length} vehicles
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GenerateReportForm = ({ onClose }) => {
  const [reportType, setReportType] = useState('vehicle-utilization');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [includeFinancials, setIncludeFinancials] = useState(true);
  const [includeMaintenanceData, setIncludeMaintenanceData] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { value: 'vehicle-utilization', label: 'Vehicle Utilization Report' },
    { value: 'route-performance', label: 'Route Performance Report' },
    { value: 'driver-performance', label: 'Driver Performance Report' },
    { value: 'financial-summary', label: 'Financial Summary Report' },
    { value: 'maintenance-report', label: 'Maintenance Report' },
    { value: 'student-transport', label: 'Student Transport Report' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleRouteToggle = (routeId) => {
    setSelectedRoutes(prev => 
      prev.includes(routeId) 
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    );
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert('Report generated successfully! Download will start shortly.');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Generate Report</h2>
            <p className="text-sm text-gray-600 mt-1">Create detailed transport reports</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form - Scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Date Range */}
            {dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Route Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Routes to Include
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {mockRoutes.map(route => (
                  <label key={route.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRoutes.includes(route.id)}
                      onChange={() => handleRouteToggle(route.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{route.name}</span>
                  </label>
                ))}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRoutes.length === mockRoutes.length}
                    onChange={() => setSelectedRoutes(
                      selectedRoutes.length === mockRoutes.length ? [] : mockRoutes.map(r => r.id)
                    )}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm font-medium text-blue-600">Select All Routes</span>
                </label>
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeFinancials}
                    onChange={(e) => setIncludeFinancials(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include Financial Data</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeMaintenanceData}
                    onChange={(e) => setIncludeMaintenanceData(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include Maintenance Data</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const [showTrackVehicles, setShowTrackVehicles] = useState(false);
  const [showGenerateReport, setShowGenerateReport] = useState(false);

  const activeVehicles = mockVehicles.filter(v => v.status === 'active').length;
  const totalStudents = 650;
  const activeRoutes = mockRoutes.filter(r => r.status === 'active').length;
  const openIncidents = 2;

  const stats = [
    {
      title: 'Active Vehicles',
      value: activeVehicles,
      total: mockVehicles.length,
      icon: Bus,
      color: 'bg-blue-500',
      change: '+2 from yesterday',
    },
    {
      title: 'Students Transported',
      value: totalStudents,
      total: 680,
      icon: Users,
      color: 'bg-green-500',
      change: '+15 this week',
    },
    {
      title: 'Active Routes',
      value: activeRoutes,
      total: mockRoutes.length,
      icon: MapPin,
      color: 'bg-purple-500',
      change: 'All routes operational',
    },
    {
      title: 'Open Incidents',
      value: openIncidents,
      total: 5,
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-1 from yesterday',
    },
  ];

  const recentActivities = [
    { id: 1, type: 'success', message: 'Route 1 completed successfully', time: '2 minutes ago' },
    { id: 2, type: 'warning', message: 'BUS-002 scheduled for maintenance', time: '15 minutes ago' },
    { id: 3, type: 'info', message: 'New driver John Smith assigned to Route 3', time: '1 hour ago' },
    { id: 4, type: 'success', message: 'All morning routes completed on time', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900"></h1>
          <p className="mt-1 text-sm text-gray-500">
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button 
            onClick={() => setShowTrackVehicles(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Track Vehicles
          </button>
          <button 
            onClick={() => setShowGenerateReport(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline mt-2">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className="ml-2 text-sm text-gray-500">/ {stat.total}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Fleet Status */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Live Fleet Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockVehicles.slice(0, 4).map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      vehicle.status === 'active' ? 'bg-green-400' :
                      vehicle.status === 'maintenance' ? 'bg-red-400' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{vehicle.registrationNumber}</p>
                      <p className="text-sm text-gray-500">{vehicle.model}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 capitalize">{vehicle.status}</p>
                    <p className="text-sm text-gray-500">Fuel: {vehicle.fuelLevel}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Route Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Today's Route Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockRoutes.map((route) => (
                <div key={route.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{route.name}</p>
                    <p className="text-sm text-gray-500">{route.assignedStudents} students</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-600">On Time</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Bus className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Add Vehicle</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Add Driver</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <MapPin className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Create Route</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <BarChart3 className="w-8 h-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showTrackVehicles && (
        <TrackVehiclesForm onClose={() => setShowTrackVehicles(false)} />
      )}
      
      {showGenerateReport && (
        <GenerateReportForm onClose={() => setShowGenerateReport(false)} />
      )}
    </div>
  );
};

export default Dashboard;