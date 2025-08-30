import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { Shield, Users, AlertTriangle, CheckCircle, Camera, Clock } from 'lucide-react';

const SecurityDashboard: React.FC = () => {
  const cardData = [
    { title: 'Security Personnel', value: '24', change: '+2', trend: 'up' as const, icon: Users, color: 'bg-blue-500' },
    { title: 'Active Cameras', value: '156', change: '+8', trend: 'up' as const, icon: Camera, color: 'bg-green-500' },
    { title: 'Daily Visitors', value: '342', change: '+15', trend: 'up' as const, icon: Users, color: 'bg-purple-500' },
    { title: 'Security Incidents', value: '2', change: '-3', trend: 'down' as const, icon: AlertTriangle, color: 'bg-orange-500' },
    { title: 'Access Points', value: '12', change: '0', trend: 'neutral' as const, icon: Shield, color: 'bg-teal-500' },
    { title: 'Response Time', value: '3.2min', change: '-0.5min', trend: 'down' as const, icon: Clock, color: 'bg-indigo-500' }
  ];

  const visitorData = [
    { time: '6:00', visitors: 15, staff: 45 },
    { time: '8:00', visitors: 85, staff: 180 },
    { time: '10:00', visitors: 120, staff: 200 },
    { time: '12:00', visitors: 95, staff: 185 },
    { time: '14:00', visitors: 110, staff: 195 },
    { time: '16:00', visitors: 140, staff: 190 },
    { time: '18:00', visitors: 75, staff: 120 },
    { time: '20:00', visitors: 25, staff: 50 }
  ];

  const incidentTypes = [
    { type: 'Unauthorized Access', count: 8, color: '#EF4444' },
    { type: 'Equipment Theft', count: 3, color: '#F59E0B' },
    { type: 'Vandalism', count: 2, color: '#8B5CF6' },
    { type: 'Medical Emergency', count: 5, color: '#10B981' },
    { type: 'Fire Alarm', count: 1, color: '#3B82F6' }
  ];

  const securityZones = [
    { zone: 'Main Entrance', status: 'secure', personnel: 4, cameras: 8 },
    { zone: 'Academic Block', status: 'secure', personnel: 6, cameras: 24 },
    { zone: 'Hostel Area', status: 'alert', personnel: 8, cameras: 32 },
    { zone: 'Sports Complex', status: 'secure', personnel: 3, cameras: 12 },
    { zone: 'Parking Area', status: 'secure', personnel: 3, cameras: 16 }
  ];

  const accessLogs = [
    { person: 'Dr. John Smith', type: 'Faculty', time: '08:30', location: 'Main Gate', status: 'authorized' },
    { person: 'Alex Wilson', type: 'Student', time: '09:15', location: 'Academic Block', status: 'authorized' },
    { person: 'Visitor - Tech Corp', type: 'Visitor', time: '10:45', location: 'Admin Block', status: 'authorized' },
    { person: 'Unknown Person', type: 'Unknown', time: '14:20', location: 'Parking', status: 'flagged' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Security Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Campus security monitoring and incident management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Emergency Alert
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Security Report
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
        {/* Visitor Traffic */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Daily Visitor & Staff Traffic
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorData}>
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
              <Line type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="staff" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Incident Types */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Security Incidents (Last 30 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incidentTypes}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ type, count }) => `${type}: ${count}`}
              >
                {incidentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Security Zones & Access Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Zones Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Security Zones Status</h3>
          <div className="space-y-3">
            {securityZones.map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    zone.status === 'secure' ? 'bg-green-500' :
                    zone.status === 'alert' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{zone.zone}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {zone.personnel} personnel • {zone.cameras} cameras
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  zone.status === 'secure' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  zone.status === 'alert' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {zone.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Access Logs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Access Logs</h3>
          <div className="space-y-3">
            {accessLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    log.status === 'authorized' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                    'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {log.status === 'authorized' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{log.person}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {log.type} • {log.time} • {log.location}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  log.status === 'authorized' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency Contacts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Emergency Contacts</h3>
          <div className="space-y-3">
            {[
              { service: 'Campus Security', number: '100', status: 'active' },
              { service: 'Medical Emergency', number: '108', status: 'active' },
              { service: 'Fire Department', number: '101', status: 'active' },
              { service: 'Police Station', number: '102', status: 'active' }
            ].map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{contact.service}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Emergency: {contact.number}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  contact.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Equipment */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Security Equipment Status</h3>
          <div className="space-y-4">
            {[
              { equipment: 'CCTV Cameras', total: 156, working: 154, maintenance: 2 },
              { equipment: 'Access Control', total: 12, working: 12, maintenance: 0 },
              { equipment: 'Fire Alarms', total: 45, working: 44, maintenance: 1 },
              { equipment: 'Emergency Lights', total: 78, working: 76, maintenance: 2 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{item.equipment}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.working}/{item.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (item.working / item.total) >= 0.95 ? 'bg-green-500' :
                      (item.working / item.total) >= 0.90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(item.working / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Patrol Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Current Patrol Schedule</h3>
          <div className="space-y-3">
            {[
              { guard: 'Security Guard A', zone: 'Main Entrance', shift: '6:00-14:00', status: 'on-duty' },
              { guard: 'Security Guard B', zone: 'Academic Block', shift: '14:00-22:00', status: 'on-duty' },
              { guard: 'Security Guard C', zone: 'Hostel Area', shift: '22:00-6:00', status: 'on-duty' },
              { guard: 'Security Guard D', zone: 'Sports Complex', shift: '8:00-16:00', status: 'break' }
            ].map((patrol, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{patrol.guard}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {patrol.zone} • {patrol.shift}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  patrol.status === 'on-duty' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  patrol.status === 'break' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {patrol.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;