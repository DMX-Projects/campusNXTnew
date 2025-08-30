import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { Server, Users, AlertTriangle, CheckCircle, Wifi, HardDrive } from 'lucide-react';

const ITDashboard: React.FC = () => {
  const cardData = [
    { title: 'System Uptime', value: '99.8%', change: '+0.2%', trend: 'up' as const, icon: Server, color: 'bg-green-500' },
    { title: 'Active Users', value: '2,847', change: '+45', trend: 'up' as const, icon: Users, color: 'bg-blue-500' },
    { title: 'Open Tickets', value: '23', change: '-8', trend: 'down' as const, icon: AlertTriangle, color: 'bg-orange-500' },
    { title: 'Network Health', value: '98%', change: '+1%', trend: 'up' as const, icon: Wifi, color: 'bg-purple-500' },
    { title: 'Storage Usage', value: '78%', change: '+5%', trend: 'up' as const, icon: HardDrive, color: 'bg-teal-500' },
    { title: 'Security Score', value: '95%', change: '+2%', trend: 'up' as const, icon: CheckCircle, color: 'bg-indigo-500' }
  ];

  const systemPerformance = [
    { time: '00:00', cpu: 45, memory: 62, network: 78 },
    { time: '04:00', cpu: 38, memory: 58, network: 72 },
    { time: '08:00', cpu: 72, memory: 78, network: 85 },
    { time: '12:00', cpu: 85, memory: 82, network: 92 },
    { time: '16:00', cpu: 78, memory: 75, network: 88 },
    { time: '20:00', cpu: 65, memory: 68, network: 82 }
  ];

  const ticketCategories = [
    { category: 'Hardware Issues', count: 8, color: '#EF4444' },
    { category: 'Software Problems', count: 6, color: '#F59E0B' },
    { category: 'Network Issues', count: 4, color: '#8B5CF6' },
    { category: 'Account Access', count: 3, color: '#10B981' },
    { category: 'Email Problems', count: 2, color: '#3B82F6' }
  ];

  const networkTraffic = [
    { hour: '6:00', upload: 2.5, download: 8.2 },
    { hour: '8:00', upload: 15.8, download: 45.6 },
    { hour: '10:00', upload: 22.4, download: 68.9 },
    { hour: '12:00', upload: 18.7, download: 52.3 },
    { hour: '14:00', upload: 25.1, download: 72.8 },
    { hour: '16:00', upload: 28.9, download: 85.4 },
    { hour: '18:00', upload: 12.3, download: 35.7 },
    { hour: '20:00', upload: 6.8, download: 18.9 }
  ];

  const systemStatus = [
    { system: 'ERP System', status: 'online', uptime: '99.9%', users: 2847 },
    { system: 'Email Server', status: 'online', uptime: '99.5%', users: 3200 },
    { system: 'File Server', status: 'maintenance', uptime: '98.2%', users: 1500 },
    { system: 'Database Server', status: 'online', uptime: '99.8%', users: 2847 },
    { system: 'Web Portal', status: 'online', uptime: '99.7%', users: 2500 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            IT Infrastructure Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            System monitoring and technical support management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            System Alert
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            IT Report
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
        {/* System Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            System Performance (24 Hours)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={systemPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis domain={[0, 100]} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} name="Memory %" />
              <Line type="monotone" dataKey="network" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 4 }} name="Network %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Support Tickets */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Support Ticket Categories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketCategories}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ category, count }) => `${category}: ${count}`}
              >
                {ticketCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Network Traffic */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Network Traffic (Mbps)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={networkTraffic}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="upload" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="download" fill="#10B981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* System Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Critical Systems Status
          </h3>
          <div className="space-y-3">
            {systemStatus.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    system.status === 'online' ? 'bg-green-500' :
                    system.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{system.system}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Uptime: {system.uptime} • {system.users} users
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  system.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  system.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {system.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IT Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Support Tickets</h3>
            <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 px-2 py-1 rounded-full text-xs font-semibold">
              23 Open
            </div>
          </div>
          <div className="space-y-3">
            {[
              { ticket: 'TKT-001', issue: 'Email server down', user: 'Prof. Davis', priority: 'high', time: '2 hours ago' },
              { ticket: 'TKT-002', issue: 'WiFi connectivity issues', user: 'Alex Wilson', priority: 'medium', time: '4 hours ago' },
              { ticket: 'TKT-003', issue: 'Printer not working', user: 'Admin Office', priority: 'low', time: '6 hours ago' },
              { ticket: 'TKT-004', issue: 'Password reset request', user: 'Emma Johnson', priority: 'low', time: '1 day ago' }
            ].map((ticket, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    ticket.priority === 'high' ? 'bg-red-500' :
                    ticket.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {ticket.ticket}: {ticket.issue}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {ticket.user} • {ticket.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Monitoring */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Security Monitoring</h3>
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-4">
            {[
              { metric: 'Firewall Status', status: 'active', value: '99.9%' },
              { metric: 'Antivirus Coverage', status: 'active', value: '100%' },
              { metric: 'Failed Login Attempts', status: 'normal', value: '12' },
              { metric: 'Security Updates', status: 'current', value: '100%' },
              { metric: 'Backup Status', status: 'completed', value: '24h ago' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.metric}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">{item.value}</p>
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'active' || item.status === 'current' || item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'normal' ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Usage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Resource Usage</h3>
            <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-4">
            {[
              { resource: 'CPU Usage', current: 68, max: 100, status: 'normal' },
              { resource: 'Memory Usage', current: 74, max: 100, status: 'normal' },
              { resource: 'Disk Space', current: 78, max: 100, status: 'warning' },
              { resource: 'Network Bandwidth', current: 45, max: 100, status: 'normal' }
            ].map((resource, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{resource.resource}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {resource.current}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      resource.status === 'normal' ? 'bg-green-500' :
                      resource.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${resource.current}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITDashboard;