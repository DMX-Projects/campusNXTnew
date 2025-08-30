import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import DashboardCard from './DashboardCard';
import { Hotel, Users, DollarSign, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const HostelDashboard: React.FC = () => {
  const cardData = [
    { title: 'Total Occupancy', value: '85%', change: '+3.2%', trend: 'up' as const, icon: Hotel, color: 'bg-blue-500' },
    { title: 'Hostel Students', value: '1,456', change: '+28', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Monthly Revenue', value: '₹9.2L', change: '+5.8%', trend: 'up' as const, icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Late Returns', value: '12', change: '-3', trend: 'down' as const, icon: Clock, color: 'bg-orange-500' },
    { title: 'Pending Dues', value: '₹1.2L', change: '-15%', trend: 'down' as const, icon: AlertTriangle, color: 'bg-red-500' },
    { title: 'Room Transfers', value: '8', change: '+2', trend: 'up' as const, icon: CheckCircle, color: 'bg-teal-500' }
  ];

  const occupancyData = [
    { hostel: 'Boys Hostel A', occupied: 145, capacity: 160, percentage: 90.6 },
    { hostel: 'Boys Hostel B', occupied: 132, capacity: 150, percentage: 88.0 },
    { hostel: 'Girls Hostel A', occupied: 98, capacity: 120, percentage: 81.7 },
    { hostel: 'Girls Hostel B', occupied: 156, capacity: 180, percentage: 86.7 }
  ];

  const feeStatusData = [
    { status: 'Paid', count: 1245, color: '#10B981' },
    { status: 'Pending', count: 156, color: '#F59E0B' },
    { status: 'Overdue', count: 55, color: '#EF4444' }
  ];

  const inOutData = [
    { time: '6:00', in: 12, out: 145 },
    { time: '8:00', in: 234, out: 89 },
    { time: '10:00', in: 45, out: 23 },
    { time: '12:00', in: 67, out: 78 },
    { time: '14:00', in: 89, out: 56 },
    { time: '16:00', in: 123, out: 34 },
    { time: '18:00', in: 178, out: 12 },
    { time: '20:00', in: 234, out: 8 },
    { time: '22:00', in: 89, out: 3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hostel Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor hostel operations and student accommodation
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Room Allocation
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
        {/* Hostel Occupancy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Hostel Occupancy Details
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hostel" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="occupied" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="capacity" fill="#E5E7EB" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Fee Payment Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={feeStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ status, count }) => `${status}: ${count}`}
              >
                {feeStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* In/Out Register */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Daily In/Out Register
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inOutData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="in" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
              <Line type="monotone" dataKey="out" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HostelDashboard;