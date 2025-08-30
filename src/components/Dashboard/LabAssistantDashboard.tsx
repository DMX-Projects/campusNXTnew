import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line } from 'recharts';
import DashboardCard from './DashboardCard';
import { Users, Settings, AlertTriangle, CheckCircle, Calendar, Clock } from 'lucide-react';

const LabAssistantDashboard: React.FC = () => {
  const cardData = [
    { title: 'Assigned Labs', value: '2', change: '0', trend: 'neutral' as const, icon: Settings, color: 'bg-blue-500' },
    { title: 'Lab Sessions Today', value: '6', change: '+1', trend: 'up' as const, icon: Calendar, color: 'bg-green-500' },
    { title: 'Equipment Status', value: '98%', change: '+1%', trend: 'up' as const, icon: CheckCircle, color: 'bg-purple-500' },
    { title: 'Maintenance Due', value: '3', change: '-2', trend: 'down' as const, icon: AlertTriangle, color: 'bg-orange-500' },
    { title: 'Student Attendance', value: '92%', change: '+3%', trend: 'up' as const, icon: Users, color: 'bg-teal-500' },
    { title: 'Safety Incidents', value: '0', change: '0', trend: 'neutral' as const, icon: CheckCircle, color: 'bg-green-600' }
  ];

  const labUtilization = [
    { time: '9:00', lab1: 85, lab2: 92 },
    { time: '10:00', lab1: 92, lab2: 88 },
    { time: '11:00', lab1: 78, lab2: 95 },
    { time: '12:00', lab1: 0, lab2: 0 },
    { time: '2:00', lab1: 88, lab2: 85 },
    { time: '3:00', lab1: 95, lab2: 90 },
    { time: '4:00', lab1: 82, lab2: 87 }
  ];

  const equipmentStatus = [
    { equipment: 'Computers', total: 40, working: 38, maintenance: 2, status: 'good' },
    { equipment: 'Projectors', total: 2, working: 2, maintenance: 0, status: 'excellent' },
    { equipment: 'Network Equipment', total: 8, working: 7, maintenance: 1, status: 'good' },
    { equipment: 'Software Licenses', total: 50, working: 50, maintenance: 0, status: 'excellent' }
  ];

  const todaySchedule = [
    { time: '9:00-10:00', subject: 'Data Structures Lab', students: 38, lab: 'LAB001' },
    { time: '10:00-11:00', subject: 'Programming Lab', students: 42, lab: 'LAB002' },
    { time: '11:00-12:00', subject: 'Database Lab', students: 35, lab: 'LAB001' },
    { time: '2:00-3:00', subject: 'Web Development', students: 40, lab: 'LAB002' },
    { time: '3:00-4:00', subject: 'Software Testing', students: 36, lab: 'LAB001' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Lab Assistant Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Laboratory management and technical support
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Equipment Check
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Maintenance Log
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
        {/* Lab Utilization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Daily Lab Utilization
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={labUtilization}>
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
              <Line type="monotone" dataKey="lab1" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} name="LAB001" />
              <Line type="monotone" dataKey="lab2" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} name="LAB002" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Equipment Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Equipment Status Overview
          </h3>
          <div className="space-y-4">
            {equipmentStatus.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{item.equipment}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.working}/{item.total}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'excellent' ? 'bg-green-500' :
                      item.status === 'good' ? 'bg-blue-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.status === 'excellent' ? 'bg-green-500' :
                      item.status === 'good' ? 'bg-blue-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(item.working / item.total) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Working: {item.working}</span>
                  <span>Maintenance: {item.maintenance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Schedule and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Lab Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Today's Lab Schedule</h3>
          <div className="space-y-3">
            {todaySchedule.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{session.subject}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.time} • {session.lab} • {session.students} students
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                    Ready
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Maintenance Tasks</h3>
          <div className="space-y-3">
            {[
              { task: 'Computer System Update', lab: 'LAB001', priority: 'high', due: 'Today' },
              { task: 'Network Switch Replacement', lab: 'LAB002', priority: 'medium', due: 'Jan 20' },
              { task: 'Software License Renewal', lab: 'Both Labs', priority: 'low', due: 'Jan 25' },
              { task: 'Projector Calibration', lab: 'LAB001', priority: 'medium', due: 'Jan 22' }
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{task.task}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{task.lab}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.due}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lab Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lab Usage Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Lab Usage Statistics</h3>
          <div className="space-y-4">
            {[
              { metric: 'Average Daily Usage', value: '87%', lab: 'LAB001' },
              { metric: 'Average Daily Usage', value: '89%', lab: 'LAB002' },
              { metric: 'Peak Usage Time', value: '11:00 AM', lab: 'Both' },
              { metric: 'Weekly Utilization', value: '85%', lab: 'Overall' }
            ].map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{stat.metric}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.lab}</p>
                </div>
                <p className="font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Compliance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Safety & Compliance</h3>
          <div className="space-y-4">
            {[
              { check: 'Fire Safety Equipment', status: 'compliant', lastCheck: 'Jan 10' },
              { check: 'Electrical Safety', status: 'compliant', lastCheck: 'Jan 12' },
              { check: 'Emergency Exits', status: 'compliant', lastCheck: 'Jan 8' },
              { check: 'First Aid Kit', status: 'needs-update', lastCheck: 'Dec 28' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.check}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Last check: {item.lastCheck}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'compliant' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {item.status === 'compliant' ? 'OK' : 'Update'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { action: 'Report Equipment Issue', icon: AlertTriangle, color: 'bg-red-500' },
              { action: 'Schedule Maintenance', icon: Calendar, color: 'bg-blue-500' },
              { action: 'Update Inventory', icon: CheckCircle, color: 'bg-green-500' },
              { action: 'Generate Usage Report', icon: Settings, color: 'bg-purple-500' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <button key={index} className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.action}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabAssistantDashboard;