import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { Wrench, AlertTriangle, CheckCircle, Calendar, DollarSign, Clock } from 'lucide-react';

const MaintenanceDashboard: React.FC = () => {
  const cardData = [
    { title: 'Open Work Orders', value: '34', change: '+8', trend: 'up' as const, icon: Wrench, color: 'bg-blue-500' },
    { title: 'Completed Today', value: '12', change: '+3', trend: 'up' as const, icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Emergency Requests', value: '3', change: '-2', trend: 'down' as const, icon: AlertTriangle, color: 'bg-red-500' },
    { title: 'Scheduled Maintenance', value: '8', change: '+2', trend: 'up' as const, icon: Calendar, color: 'bg-purple-500' },
    { title: 'Monthly Budget', value: '₹2.5L', change: '+15%', trend: 'up' as const, icon: DollarSign, color: 'bg-orange-500' },
    { title: 'Avg Response Time', value: '2.3h', change: '-0.5h', trend: 'down' as const, icon: Clock, color: 'bg-teal-500' }
  ];

  const workOrdersByCategory = [
    { category: 'Electrical', open: 12, completed: 8, emergency: 2 },
    { category: 'Plumbing', open: 8, completed: 6, emergency: 1 },
    { category: 'HVAC', open: 6, completed: 4, emergency: 0 },
    { category: 'Carpentry', open: 4, completed: 3, emergency: 0 },
    { category: 'Painting', open: 3, completed: 5, emergency: 0 },
    { category: 'General', open: 1, completed: 2, emergency: 0 }
  ];

  const maintenanceTrends = [
    { month: 'Aug', requests: 145, completed: 138, cost: 2.2 },
    { month: 'Sep', requests: 132, completed: 128, cost: 2.1 },
    { month: 'Oct', requests: 156, completed: 149, cost: 2.4 },
    { month: 'Nov', requests: 148, completed: 142, cost: 2.3 },
    { month: 'Dec', requests: 162, completed: 155, cost: 2.6 },
    { month: 'Jan', requests: 158, completed: 151, cost: 2.5 }
  ];

  const facilityStatus = [
    { facility: 'Academic Block A', status: 'good', issues: 2, color: '#10B981' },
    { facility: 'Academic Block B', status: 'fair', issues: 5, color: '#F59E0B' },
    { facility: 'Library Building', status: 'excellent', issues: 0, color: '#3B82F6' },
    { facility: 'Sports Complex', status: 'fair', issues: 4, color: '#F59E0B' },
    { facility: 'Hostel Block', status: 'good', issues: 3, color: '#10B981' },
    { facility: 'Cafeteria', status: 'needs attention', issues: 8, color: '#EF4444' }
  ];

  const priorityDistribution = [
    { priority: 'Emergency', count: 3, color: '#EF4444' },
    { priority: 'High', count: 8, color: '#F59E0B' },
    { priority: 'Medium', count: 15, color: '#3B82F6' },
    { priority: 'Low', count: 8, color: '#10B981' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Maintenance Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Campus facility maintenance and work order management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Emergency Request
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Schedule Maintenance
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
        {/* Work Orders by Category */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Work Orders by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workOrdersByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="category" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="open" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="completed" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="emergency" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Maintenance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Maintenance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={maintenanceTrends}>
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
              <Line type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Facility Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Facility Condition Status
          </h3>
          <div className="space-y-3">
            {facilityStatus.map((facility, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: facility.color }}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{facility.facility}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {facility.issues} open issues
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  facility.status === 'excellent' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                  facility.status === 'good' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  facility.status === 'fair' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {facility.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Work Order Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ priority, count }) => `${priority}: ${count}`}
              >
                {priorityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Maintenance Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Work Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Work Orders</h3>
            <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-semibold">
              34 Open
            </div>
          </div>
          <div className="space-y-3">
            {[
              { id: 'WO-001', issue: 'AC not working in Room 201', location: 'Academic Block A', priority: 'high', time: '2 hours ago' },
              { id: 'WO-002', issue: 'Leaking faucet in washroom', location: 'Library', priority: 'medium', time: '4 hours ago' },
              { id: 'WO-003', issue: 'Broken window in classroom', location: 'Academic Block B', priority: 'low', time: '6 hours ago' },
              { id: 'WO-004', issue: 'Electrical outlet not working', location: 'Hostel Block', priority: 'medium', time: '1 day ago' }
            ].map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    order.priority === 'high' ? 'bg-red-500' :
                    order.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}: {order.issue}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {order.location} • {order.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Team */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Maintenance Team</h3>
            <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-3">
            {[
              { name: 'Rajesh Kumar', specialty: 'Electrical', status: 'available', workload: 3 },
              { name: 'Suresh Patel', specialty: 'Plumbing', status: 'busy', workload: 5 },
              { name: 'Amit Singh', specialty: 'HVAC', status: 'available', workload: 2 },
              { name: 'Ravi Sharma', specialty: 'General', status: 'on-leave', workload: 0 }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.specialty} • {member.workload} active tasks
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  member.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  member.status === 'busy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preventive Maintenance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Preventive Maintenance</h3>
            <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-3">
            {[
              { task: 'HVAC System Inspection', due: 'Jan 20', facility: 'All Buildings', status: 'scheduled' },
              { task: 'Fire Safety Equipment Check', due: 'Jan 22', facility: 'Academic Blocks', status: 'overdue' },
              { task: 'Electrical Panel Maintenance', due: 'Jan 25', facility: 'Hostel Block', status: 'scheduled' },
              { task: 'Plumbing System Check', due: 'Jan 28', facility: 'Sports Complex', status: 'upcoming' }
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{task.task}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {task.facility} • Due: {task.due}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                  task.status === 'overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Tracking */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Budget Tracking</h3>
          <div className="space-y-4">
            {[
              { category: 'Emergency Repairs', allocated: 50000, spent: 38000, percentage: 76 },
              { category: 'Preventive Maintenance', allocated: 80000, spent: 65000, percentage: 81 },
              { category: 'Equipment Replacement', allocated: 120000, spent: 95000, percentage: 79 },
              { category: 'Contractor Services', allocated: 60000, spent: 42000, percentage: 70 }
            ].map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{budget.category}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ₹{(budget.spent / 1000).toFixed(0)}K / ₹{(budget.allocated / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      budget.percentage >= 90 ? 'bg-red-500' :
                      budget.percentage >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${budget.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{budget.percentage}% utilized</span>
                  <span>₹{((budget.allocated - budget.spent) / 1000).toFixed(0)}K remaining</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {[
              { metric: 'Average Response Time', value: '2.3 hours', target: '< 4 hours', status: 'good' },
              { metric: 'Work Order Completion Rate', value: '94%', target: '> 90%', status: 'excellent' },
              { metric: 'Customer Satisfaction', value: '4.2/5', target: '> 4.0', status: 'good' },
              { metric: 'Preventive Maintenance Compliance', value: '87%', target: '> 85%', status: 'good' },
              { metric: 'Emergency Response Time', value: '45 minutes', target: '< 1 hour', status: 'excellent' }
            ].map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{metric.metric}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Target: {metric.target}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  <div className={`w-3 h-3 rounded-full ${
                    metric.status === 'excellent' ? 'bg-green-500' :
                    metric.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;