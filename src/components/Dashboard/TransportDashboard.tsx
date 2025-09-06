import React, { useState } from 'react';
import { 
  Bus, 
  Users, 
  MapPin, 
  AlertTriangle, 
  Search, 
  X, 
  Truck, 
  Fuel, 
  User, 
  CheckCircle, 
  Wrench,
  Download,
  Calendar,
  FileText,
  Activity
} from 'lucide-react';

// Mock data
const dashboardData = {
  activeVehicles: { current: 2, total: 4, change: "+2 from yesterday" },
  studentsTransported: { current: 650, total: 680, change: "+15 this week" },
  activeRoutes: { current: 3, total: 3, change: "All routes operational" },
  openIncidents: { current: 2, total: 5, change: "-1 from yesterday" }
};

const vehicles = [
  {
    id: 1,
    busNumber: 'BUS-001',
    model: 'Tata LP 407',
    driver: 'John Doe',
    location: 'Route A - Stop 3',
    fuelLevel: 85,
    status: 'active'
  },
  {
    id: 2,
    busNumber: 'BUS-002',
    model: 'Ashok Leyland',
    driver: 'Jane Smith',
    location: 'Workshop',
    fuelLevel: 45,
    status: 'maintenance'
  },
  {
    id: 3,
    busNumber: 'BUS-003',
    model: 'Mahindra Tourister',
    driver: 'Mike Wilson',
    location: 'Route C - Stop 1',
    fuelLevel: 92,
    status: 'active'
  }
];

const recentActivities = [
  { id: 1, text: "Route 1 completed successfully", time: "2 minutes ago", type: "success" },
  { id: 2, text: "BUS-002 scheduled for maintenance", time: "15 minutes ago", type: "warning" },
  { id: 3, text: "New driver John Smith assigned to Route 3", time: "1 hour ago", type: "info" },
  { id: 4, text: "All morning routes completed on time", time: "2 hours ago", type: "success" }
];

export default function Dashboard() {
  const [showTrackVehicles, setShowTrackVehicles] = useState(false);
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [reportType, setReportType] = useState('daily');
  const [reportDateRange, setReportDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    active: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    maintenance: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    inactive: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
  };

  const statusIcons = {
    active: CheckCircle,
    maintenance: Wrench,
    inactive: AlertTriangle
  };

  const getFuelLevelColor = (level) => {
    if (level >= 70) return 'text-green-600 dark:text-green-400';
    if (level >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getFuelBarColor = (level) => {
    if (level >= 70) return 'bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-500';
    if (level >= 40) return 'bg-yellow-500 dark:bg-yellow-600 border-yellow-600 dark:border-yellow-500';
    return 'bg-red-500 dark:bg-red-600 border-red-600 dark:border-red-500';
  };

  const handleGenerateReport = () => {
    // Report generation logic would go here
    console.log('Generating report...', { reportType, reportDateRange });
    setShowGenerateReport(false);
    // You could integrate with your backend API here
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Transportation Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor and manage your fleet operations</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowTrackVehicles(true)}
              className="bg-green-600 dark:bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 dark:hover:bg-green-700 transition-colors border-2 border-green-600 dark:border-green-600 hover:border-green-700 dark:hover:border-green-700 font-medium shadow-md"
            >
              Track Vehicles
            </button>
            <button 
              onClick={() => setShowGenerateReport(true)}
              className="bg-blue-600 dark:bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors border-2 border-blue-600 dark:border-blue-600 hover:border-blue-700 dark:hover:border-blue-700 font-medium shadow-md"
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Vehicles */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center border-2 border-blue-200 dark:border-blue-800">
                <Bus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Vehicles</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{dashboardData.activeVehicles.current}</span>
                <span className="text-lg text-gray-500 dark:text-gray-400">/ {dashboardData.activeVehicles.total}</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">{dashboardData.activeVehicles.change}</p>
            </div>
          </div>

          {/* Students Transported */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center border-2 border-green-200 dark:border-green-800">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Students Transported</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{dashboardData.studentsTransported.current}</span>
                <span className="text-lg text-gray-500 dark:text-gray-400">/ {dashboardData.studentsTransported.total}</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">{dashboardData.studentsTransported.change}</p>
            </div>
          </div>

          {/* Active Routes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center border-2 border-purple-200 dark:border-purple-800">
                <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Routes</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{dashboardData.activeRoutes.current}</span>
                <span className="text-lg text-gray-500 dark:text-gray-400">/ {dashboardData.activeRoutes.total}</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">{dashboardData.activeRoutes.change}</p>
            </div>
          </div>

          {/* Open Incidents */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center border-2 border-red-200 dark:border-red-800">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Incidents</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{dashboardData.openIncidents.current}</span>
                <span className="text-lg text-gray-500 dark:text-gray-400">/ {dashboardData.openIncidents.total}</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">{dashboardData.openIncidents.change}</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Fleet Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Live Fleet Status</h3>
            </div>
            <div className="p-6 space-y-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      vehicle.status === 'active' ? 'bg-green-500 dark:bg-green-400' : 
                      vehicle.status === 'maintenance' ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-red-500 dark:bg-red-400'
                    }`} />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{vehicle.busNumber}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{vehicle.model}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800 dark:text-white capitalize">{vehicle.status}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fuel: {vehicle.fuelLevel}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activities</h3>
            </div>
            <div className="p-6 space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500 dark:bg-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-blue-500 dark:bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{activity.text}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Track Vehicles Modal */}
      {showTrackVehicles && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border-2 border-gray-300 dark:border-gray-600">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Track Vehicles</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monitor real-time vehicle status and locations</p>
              </div>
              <button 
                onClick={() => setShowTrackVehicles(false)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Filter */}
            <div className="px-6 py-2 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search vehicles, drivers, or models..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Vehicles List */}
            <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-200px)] bg-white dark:bg-gray-800">
              <div className="space-y-4">
                {filteredVehicles.map((vehicle) => {
                  const StatusIcon = statusIcons[vehicle.status];
                  
                  return (
                    <div key={vehicle.id} className="bg-white dark:bg-gray-700 rounded-xl border-2 border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center border-2 border-blue-200 dark:border-blue-800">
                            <Truck className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{vehicle.busNumber}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{vehicle.model}</p>
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 border-2 ${statusColors[vehicle.status]}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="capitalize">{vehicle.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-500">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-800">
                              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Driver</p>
                              <p className="text-sm font-semibold text-gray-800 dark:text-white">{vehicle.driver}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-500">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center border border-green-200 dark:border-green-800">
                              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Location</p>
                              <p className="text-sm font-semibold text-gray-800 dark:text-white">{vehicle.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-500">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center border border-orange-200 dark:border-orange-800">
                              <Fuel className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Fuel Level</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`text-sm font-bold ${getFuelLevelColor(vehicle.fuelLevel)}`}>
                                  {vehicle.fuelLevel}%
                                </span>
                                <div className="flex-1 h-2 bg-gray-300 dark:bg-gray-500 rounded-full border border-gray-400 dark:border-gray-600">
                                  <div 
                                    className={`h-2 rounded-full border ${getFuelBarColor(vehicle.fuelLevel)}`}
                                    style={{ width: `${vehicle.fuelLevel}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Showing {filteredVehicles.length} of {vehicles.length} vehicles
                </p>
                <button 
                  onClick={() => setShowTrackVehicles(false)}
                  className="px-6 py-2.5 bg-blue-600 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors border-2 border-blue-600 dark:border-blue-600 hover:border-blue-700 dark:hover:border-blue-700 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Report Modal */}
      {showGenerateReport && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-gray-300 dark:border-gray-600">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Generate Report</h2>
              <button 
                onClick={() => setShowGenerateReport(false)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                >
                  <option value="daily">Daily Report</option>
                  <option value="weekly">Weekly Report</option>
                  <option value="monthly">Monthly Report</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {reportType === 'custom' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={reportDateRange.startDate}
                      onChange={(e) => setReportDateRange({...reportDateRange, startDate: e.target.value})}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                    <input
                      type="date"
                      value={reportDateRange.endDate}
                      onChange={(e) => setReportDateRange({...reportDateRange, endDate: e.target.value})}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-600">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Report will include:</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Vehicle utilization statistics</li>
                  <li>• Route performance metrics</li>
                  <li>• Fuel consumption analysis</li>
                  <li>• Maintenance schedules</li>
                  <li>• Student transportation data</li>
                </ul>
              </div>
            </div>

            <div className="px-6 py-4 border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex space-x-3">
                <button
                  onClick={handleGenerateReport}
                  className="flex-1 bg-blue-600 dark:bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors border-2 border-blue-600 dark:border-blue-600 hover:border-blue-700 dark:hover:border-blue-700 font-medium flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Generate Report
                </button>
                <button
                  onClick={() => setShowGenerateReport(false)}
                  className="flex-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2.5 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors border-2 border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-400 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
