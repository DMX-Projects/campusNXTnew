
import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Calendar,
  BookOpen,
  Cpu,
  Sun,
  Moon,
  Menu,
  Bell,
  Search,
  ChevronRight,
  PieChart,
  TrendingUp,
} from 'lucide-react';

import { useTheme } from '../../../contexts/ThemeContext';

interface KPIData {
  totalStudents: number;
  totalFaculty: number;
  activeProjects: number;
  upcomingEvents: number;
}

interface DepartmentData {
  name: string;
  count: number;
  color: string;
}

interface AcademicTrend {
  month: string;
  events: number;
}

const EngineeringCollegeDashboard: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);

  const kpiData: KPIData = {
    totalStudents: 4200,
    totalFaculty: 380,
    activeProjects: 48,
    upcomingEvents: 7,
  };

  const departmentData: DepartmentData[] = [
    { name: 'Computer Engineering', count: 1100, color: '#3B82F6' },
    { name: 'Mechanical Engineering', count: 900, color: '#10B981' },
    { name: 'Electrical Engineering', count: 850, color: '#F59E0B' },
    { name: 'Civil Engineering', count: 650, color: '#EF4444' },
    { name: 'Electronics Engineering', count: 500, color: '#8B5CF6' },
    { name: 'Administration', count: 200, color: '#6B7280' },
  ];

  const academicTrends: AcademicTrend[] = [
    { month: 'Mar', events: 2 },
    { month: 'Apr', events: 4 },
    { month: 'May', events: 3 },
    { month: 'Jun', events: 5 },
    { month: 'Jul', events: 6 },
    { month: 'Aug', events: 8 },
  ];

  const allActivities = [
    {
      title: 'New student enrolled',
      detail: 'Amit Patel joined Computer Engineering',
      time: '2 hours ago',
      icon: <UserPlus className="w-4 h-4 text-green-600 dark:text-green-400" />,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Project review meeting',
      detail: 'Mechanical Dept. project presentations',
      time: '6 hours ago',
      icon: <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Faculty workshop completed',
      detail: 'Advanced AI techniques seminar',
      time: '1 day ago',
      icon: <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'New course approved',
      detail: 'Introduction to Quantum Computing added',
      time: '2 days ago',
      icon: <BookOpen className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      title: 'Campus maintenance scheduled',
      detail: 'Power shutdown on Saturday',
      time: '3 days ago',
      icon: <Cpu className="w-4 h-4 text-red-600 dark:text-red-400" />,
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
  ];

  const maxEvents = Math.max(...academicTrends.map((t) => t.events));
  const themeClasses = isDarkMode ? 'dark' : '';

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`${themeClasses} min-h-screen transition-colors duration-300`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Mobile Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center space-x-3">
    
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                Engineering College ERP
              </h1>
            </div>
            <div className="flex items-center space-x-2">
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 hidden lg:flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Engineering College ERP Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell size={20} />
            </button>
           
          </div>
        </header>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 min-w-0 p-3 sm:p-4 lg:p-6 xl:p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Total Students
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {kpiData.totalStudents.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl shrink-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Total Faculty
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {kpiData.totalFaculty.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl shrink-0">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Active Projects
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                    {kpiData.activeProjects}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl shrink-0">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Upcoming Events
                  </p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {kpiData.upcomingEvents}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">This month</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
            {/* Department Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Department Distribution
                </h3>
                <PieChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>

              <div className="space-y-3 sm:space-y-4">
                {departmentData.map((dept, index) => {
                  const percentage = Math.round((dept.count / kpiData.totalStudents) * 100);
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: dept.color }}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                            {dept.name}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white ml-2">
                            {dept.count}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-700 ease-out"
                            style={{
                              backgroundColor: dept.color,
                              width: `${percentage}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Academic Events Trends */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Academic Events Trends
                </h3>
                <TrendingUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>

              <div className="space-y-3 sm:space-y-4">
                {academicTrends.map((trend, index) => {
                  const barHeight = (trend.events / maxEvents) * 100;
                  return (
                    <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8 shrink-0">
                        {trend.month}
                      </span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 sm:h-10 relative overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
                          style={{ width: `${Math.max(barHeight, 10)}%` }}
                        >
                          <span className="text-xs sm:text-sm font-semibold text-white">{trend.events}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Total events (6 months):{' '}
                  <span className="font-semibold">{academicTrends.reduce((sum, t) => sum + t.events, 0)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Recent Activities
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {(showAllActivities ? allActivities : allActivities.slice(0, 3)).map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <div className={`p-2 rounded-full shrink-0 ${activity.bgColor}`}>{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{activity.detail}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6">
              <button
                onClick={() => setShowAllActivities(!showAllActivities)}
                className="w-full py-2 px-4 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors touch-manipulation"
              >
                {showAllActivities ? 'Show Less' : 'View All Activities'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringCollegeDashboard;
