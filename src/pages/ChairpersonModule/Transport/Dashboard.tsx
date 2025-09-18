import React from 'react';
import { 
  Bus, 
  Users, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  MapPin,
  DollarSign,
  CheckCircle,
  BarChart3
} from 'lucide-react';
import { mockVehicles, mockDrivers, mockRoutes, mockStudents, mockIncidents } from './data/mockData1';

const Dashboard: React.FC = () => {
  const activeVehicles = mockVehicles.filter(v => v.status === 'active').length;
  const totalStudents = mockStudents.length;
  const activeRoutes = mockRoutes.filter(r => r.status === 'active').length;
  const openIncidents = mockIncidents.filter(i => i.status !== 'resolved').length;

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
      total: mockIncidents.length,
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
          <h1 className="text-2xl font-bold text-gray-900">Transport Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your transport operations
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Emergency Stop All
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Broadcast Message
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
    </div>
  );
};

export default Dashboard;