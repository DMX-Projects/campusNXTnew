import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { Bus, Users, DollarSign, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

const TransportDashboard: React.FC = () => {
  const cardData = [
    { title: 'Active Routes', value: '12', change: '+1', trend: 'up' as const, icon: Bus, color: 'bg-blue-500' },
    { title: 'Total Passengers', value: '1,245', change: '+23', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Monthly Revenue', value: '₹3.4L', change: '+8.2%', trend: 'up' as const, icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Vehicles Active', value: '18', change: '0', trend: 'neutral' as const, icon: CheckCircle, color: 'bg-teal-500' },
    { title: 'Pending Dues', value: '₹45K', change: '-12%', trend: 'down' as const, icon: AlertTriangle, color: 'bg-orange-500' },
    { title: 'Maintenance Due', value: '3', change: '-1', trend: 'down' as const, icon: AlertTriangle, color: 'bg-red-500' }
  ];

  const routeData = [
    { route: 'Route 1 - City Center', passengers: 145, capacity: 160, utilization: 90.6 },
    { route: 'Route 2 - Suburbs', passengers: 132, capacity: 150, utilization: 88.0 },
    { route: 'Route 3 - Industrial Area', passengers: 98, capacity: 120, utilization: 81.7 },
    { route: 'Route 4 - Residential', passengers: 156, capacity: 180, utilization: 86.7 }
  ];

  const feeCollectionData = [
    { month: 'Aug', collected: 3.2, pending: 0.8 },
    { month: 'Sep', collected: 3.1, pending: 0.6 },
    { month: 'Oct', collected: 3.3, pending: 0.7 },
    { month: 'Nov', collected: 3.4, pending: 0.5 },
    { month: 'Dec', collected: 3.5, pending: 0.4 },
    { month: 'Jan', collected: 3.4, pending: 0.45 }
  ];

  const vehicleStatusData = [
    { status: 'Active', count: 15, color: '#10B981' },
    { status: 'Maintenance', count: 2, color: '#F59E0B' },
    { status: 'Out of Service', count: 1, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Transport Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor transport operations and passenger management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Track Vehicles
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Utilization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Route Utilization Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={routeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="route" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="passengers" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="capacity" fill="#E5E7EB" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Collection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Fee Collection (Lakhs ₹)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feeCollectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="collected" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pending" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Tracking & Vehicle Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Vehicle Tracking */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Live Vehicle Tracking</h3>
            <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-3">
            {[
              { vehicle: 'Bus-001', route: 'City Center', status: 'On Route', location: 'Main Gate', passengers: 45 },
              { vehicle: 'Bus-002', route: 'Suburbs', status: 'At Stop', location: 'Metro Station', passengers: 38 },
              { vehicle: 'Bus-003', route: 'Industrial Area', status: 'On Route', location: 'Highway Junction', passengers: 42 },
              { vehicle: 'Bus-004', route: 'Residential', status: 'Depot', location: 'College Parking', passengers: 0 }
            ].map((vehicle, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    vehicle.status === 'On Route' ? 'bg-green-500' :
                    vehicle.status === 'At Stop' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {vehicle.vehicle} - {vehicle.route}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {vehicle.location} • {vehicle.passengers} passengers
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  vehicle.status === 'On Route' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  vehicle.status === 'At Stop' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {vehicle.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Vehicle Status Overview
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={vehicleStatusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                label={({ status, count }) => `${status}: ${count}`}
              >
                {vehicleStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TransportDashboard;