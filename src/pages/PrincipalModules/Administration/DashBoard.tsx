import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  Users, 
  FileText, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  UserCheck,
  Building,
  BookOpen
} from 'lucide-react';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock data
  const pendingTasks = [
    { id: 1, type: 'Purchase Requests', count: 5, priority: 'high', link: '/purchase-requests' },
    { id: 2, type: 'Leave Approvals', count: 3, priority: 'medium', link: '/leave-approvals' },
    { id: 3, type: 'Budget Reviews', count: 2, priority: 'high', link: '/budget-reviews' },
    { id: 4, type: 'Event Approvals', count: 1, priority: 'low', link: '/event-approvals' },
  ];

  const kpiData = [
    { title: 'Faculty on Leave Today', value: '8', icon: UserCheck, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { title: 'High-Priority Tickets', value: '3', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
    { title: 'Active Students', value: '1,247', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Pending Documents', value: '12', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Faculty Meeting', date: '2025-09-21', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Parent-Teacher Conference', date: '2025-09-22', time: '2:00 PM', type: 'conference' },
    { id: 3, title: 'Annual Sports Day', date: '2025-09-25', time: '9:00 AM', type: 'event' },
    { id: 4, title: 'Board Meeting', date: '2025-09-28', time: '11:00 AM', type: 'meeting' },
  ];

  const recentAlerts = [
    { id: 1, message: 'New budget proposal submitted', time: '5 min ago', type: 'info' },
    { id: 2, message: 'Emergency maintenance scheduled', time: '15 min ago', type: 'warning' },
    { id: 3, message: 'Student enrollment milestone reached', time: '1 hour ago', type: 'success' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Bell className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Pending Tasks - Most Prominent Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                <Clock className="w-7 h-7 text-blue-600 mr-3" />
                Pending Tasks
              </h2>
              <div className="text-sm text-slate-600 dark:text-slate-300 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                {pendingTasks.reduce((sum, task) => sum + task.count, 0)} Total Items
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="group bg-slate-50 dark:bg-slate-700 rounded-xl p-4 hover:bg-blue-50 dark:hover:bg-slate-600 cursor-pointer transition-all duration-200 hover:shadow-md border border-slate-200 dark:border-slate-600"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {task.count}
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {task.type}
                  </h3>
               
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                      {kpi.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {kpi.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${kpi.bg}`}>
                    <IconComponent className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section - Calendar and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                Upcoming Events
              </h3>
             
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {event.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-1 rounded-full">
                    {event.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <Bell className="w-6 h-6 text-blue-600 mr-3" />
                Administrative Alerts
              </h3>
           
            </div>
            
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors cursor-pointer">
                  <div className="mr-3 mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">98.5%</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Attendance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">156</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Faculty</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">23</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Departments</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;