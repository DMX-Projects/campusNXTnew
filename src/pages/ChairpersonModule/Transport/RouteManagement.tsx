import React, { useState } from 'react';
import { 
  Route as RouteIcon, 
  Plus, 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  Edit, 
  Trash2,
  Navigation,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { mockRoutes } from './data/mockData1';
import { Route } from './types/transport';

const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || route.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'delayed': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Route Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Plan and optimize your transport routes
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Navigation className="w-4 h-4" />
            <span>Optimize Routes</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Route</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <RouteIcon className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Routes</p>
              <p className="text-2xl font-semibold text-gray-900">{routes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Students Served</p>
              <p className="text-2xl font-semibold text-gray-900">
                {routes.reduce((sum, route) => sum + route.assignedStudents, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Distance</p>
              <p className="text-2xl font-semibold text-gray-900">
                {routes.reduce((sum, route) => sum + route.distance, 0).toFixed(1)} km
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-2xl font-semibold text-gray-900">1.5 hrs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="delayed">Delayed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoutes.map((route) => (
          <div key={route.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <RouteIcon className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(route.status)}
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(route.status)}`}>
                    {route.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{route.startTime} - {route.endTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{route.assignedStudents} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{route.distance} km</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{route.stops.length} stops</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Route Stops</h4>
                <div className="space-y-2">
                  {route.stops.slice(0, 3).map((stop, index) => (
                    <div key={stop.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-900">{stop.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500">{stop.time}</span>
                        <span className="text-gray-500">{stop.students} students</span>
                      </div>
                    </div>
                  ))}
                  {route.stops.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{route.stops.length - 3} more stops
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Driver: {route.driverId ? 'Assigned' : 'Not Assigned'}
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Route Optimization Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Route Optimization Suggestions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  Route 1 can be optimized to save 15 minutes
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Reorder stops: Maple Street → Pine Road → Oak Avenue
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  Route 2 has capacity for 10 more students
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Consider reassigning students from overcrowded routes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteManagement;