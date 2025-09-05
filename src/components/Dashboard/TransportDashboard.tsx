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
    active: 'text-green-600 bg-green-50 border-green-200',
    maintenance: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    inactive: 'text-red-600 bg-red-50 border-red-200'
  };

  const statusIcons = {
    active: CheckCircle,
    maintenance: Wrench,
    inactive: AlertTriangle
  };

  const getFuelLevelColor = (level) => {
    if (level >= 70) return 'text-green-600';
    if (level >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFuelBarColor = (level) => {
    if (level >= 70) return 'bg-green-500 border-green-600';
    if (level >= 40) return 'bg-yellow-500 border-yellow-600';
    return 'bg-red-500 border-red-600';
  };

  const handleGenerateReport = () => {
    // Report generation logic would go here
    console.log('Generating report...', { reportType, reportDateRange });
    setShowGenerateReport(false);
    // You could integrate with your backend API here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800"></h1>
            <p className="text-gray-600"></p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowTrackVehicles(true)}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors border-2 border-green-600 hover:border-green-700 font-medium shadow-md"
            >
              Track Vehicles
            </button>
            <button 
              onClick={() => setShowGenerateReport(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors border-2 border-blue-600 hover:border-blue-700 font-medium shadow-md"
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Vehicles */}
          <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-blue-200">
                <Bus className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Active Vehicles</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-800">{dashboardData.activeVehicles.current}</span>
                <span className="text-lg text-gray-500">/ {dashboardData.activeVehicles.total}</span>
              </div>
              <p className="text-sm text-green-600 font-medium">{dashboardData.activeVehicles.change}</p>
            </div>
          </div>

          {/* Students Transported */}
          <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center border-2 border-green-200">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Students Transported</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-800">{dashboardData.studentsTransported.current}</span>
                <span className="text-lg text-gray-500">/ {dashboardData.studentsTransported.total}</span>
              </div>
              <p className="text-sm text-green-600 font-medium">{dashboardData.studentsTransported.change}</p>
            </div>
          </div>

          {/* Active Routes */}
          <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-purple-200">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Active Routes</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-800">{dashboardData.activeRoutes.current}</span>
                <span className="text-lg text-gray-500">/ {dashboardData.activeRoutes.total}</span>
              </div>
              <p className="text-sm text-green-600 font-medium">{dashboardData.activeRoutes.change}</p>
            </div>
          </div>

          {/* Open Incidents */}
          <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center border-2 border-red-200">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Open Incidents</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-800">{dashboardData.openIncidents.current}</span>
                <span className="text-lg text-gray-500">/ {dashboardData.openIncidents.total}</span>
              </div>
              <p className="text-sm text-green-600 font-medium">{dashboardData.openIncidents.change}</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Fleet Status */}
          <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">Live Fleet Status</h3>
            </div>
            <div className="p-6 space-y-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      vehicle.status === 'active' ? 'bg-green-500' : 
                      vehicle.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-semibold text-gray-800">{vehicle.busNumber}</p>
                      <p className="text-sm text-gray-600">{vehicle.model}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800 capitalize">{vehicle.status}</p>
                    <p className="text-sm text-gray-600">Fuel: {vehicle.fuelLevel}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b-2 border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
            </div>
            <div className="p-6 space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Track Vehicles Modal */}
      {showTrackVehicles && (
        <div className="fixed inset-0 bg-black/50 backdrop flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border-2 border-gray-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200 bg-white">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Track Vehicles</h2>
                <p className="text-sm text-gray-600">Monitor real-time vehicle status and locations</p>
              </div>
              <button 
                onClick={() => setShowTrackVehicles(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Filter */}
            <div className="px-6 py-2 border-b-2 border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search vehicles, drivers, or models..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Vehicles List */}
            <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-200px)] bg-white">
              <div className="space-y-4">
                {filteredVehicles.map((vehicle) => {
                  const StatusIcon = statusIcons[vehicle.status];
                  
                  return (
                    <div key={vehicle.id} className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-blue-200">
                            <Truck className="w-7 h-7 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{vehicle.busNumber}</h3>
                            <p className="text-sm text-gray-600 font-medium">{vehicle.model}</p>
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 border-2 ${statusColors[vehicle.status]}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="capitalize">{vehicle.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Driver</p>
                              <p className="text-sm font-semibold text-gray-800">{vehicle.driver}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center border border-green-200">
                              <MapPin className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Location</p>
                              <p className="text-sm font-semibold text-gray-800">{vehicle.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center border border-orange-200">
                              <Fuel className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Fuel Level</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`text-sm font-bold ${getFuelLevelColor(vehicle.fuelLevel)}`}>
                                  {vehicle.fuelLevel}%
                                </span>
                                <div className="flex-1 h-2 bg-gray-300 rounded-full border border-gray-400">
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
            <div className="px-6 border-2 border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 font-medium">
                  Showing {filteredVehicles.length} of {vehicles.length} vehicles
                </p>
                <button 
                  onClick={() => setShowTrackVehicles(false)}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border-2 border-blue-600 hover:border-blue-700 font-medium"
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
        <div className="fixed inset-0 bg-black/50 backdrop flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-gray-300">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">Generate Report</h2>
              <button 
                onClick={() => setShowGenerateReport(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={reportDateRange.startDate}
                      onChange={(e) => setReportDateRange({...reportDateRange, startDate: e.target.value})}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={reportDateRange.endDate}
                      onChange={(e) => setReportDateRange({...reportDateRange, endDate: e.target.value})}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Report will include:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Vehicle utilization statistics</li>
                  <li>• Route performance metrics</li>
                  <li>• Fuel consumption analysis</li>
                  <li>• Maintenance schedules</li>
                  <li>• Student transportation data</li>
                </ul>
              </div>
            </div>

            <div className="px-6 py-4 border-t-2 border-gray-200 bg-gray-50">
              <div className="flex space-x-3">
                <button
                  onClick={handleGenerateReport}
                  className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors border-2 border-blue-600 hover:border-blue-700 font-medium flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Generate Report
                </button>
                <button
                  onClick={() => setShowGenerateReport(false)}
                  className="flex-1 bg-white text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors border-2 border-gray-300 hover:border-gray-400 font-medium"
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
