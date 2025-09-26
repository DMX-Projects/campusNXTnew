

import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Calendar,
  BookOpen,
  Building,
  Sun,
  Moon,
  Menu,
  Bell,
  Search,
  ChevronRight,
  BarChart3,
  TrendingUp,
  DollarSign,
  Briefcase,
  Clock,
  IndianRupee,
} from 'lucide-react';

import { useTheme } from '../../../contexts/ThemeContext';

interface KPIData {
  totalHeadcount: number;
  facultyCount: number;
  nonFacultyCount: number;
  activeJobOpenings: number;
  payrollStatus: string;
  payrollDate: string;
}

interface DepartmentStaffData {
  name: string;
  facultyCount: number;
  nonFacultyCount: number;
  totalCount: number;
  color: string;
}

interface HiringTrend {
  month: string;
  hires: number;
}

const HRDashboard: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);

  // Updated KPI data to match actual recruitment pipeline numbers
  const kpiData: KPIData = {
    totalHeadcount: 580, // Faculty + Non-Faculty
    facultyCount: 380,   // Total Faculty
    nonFacultyCount: 200, // Total Non-Faculty/Staff
    activeJobOpenings: 2, // From positions array (2 active positions)
    payrollStatus: 'Processing',
    payrollDate: 'Oct 2025',
  };

  // Updated department data to reflect realistic staff distribution
  const departmentStaffData: DepartmentStaffData[] = [
    { name: 'Computer Science & Engineering', facultyCount: 85, nonFacultyCount: 15, totalCount: 100, color: '#3B82F6' },
    { name: 'Mechanical Engineering', facultyCount: 70, nonFacultyCount: 12, totalCount: 82, color: '#10B981' },
    { name: 'Electrical Engineering', facultyCount: 65, nonFacultyCount: 10, totalCount: 75, color: '#F59E0B' },
    { name: 'Civil Engineering', facultyCount: 55, nonFacultyCount: 8, totalCount: 63, color: '#EF4444' },
    { name: 'Electronics Engineering', facultyCount: 45, nonFacultyCount: 7, totalCount: 52, color: '#8B5CF6' },
    { name: 'Administration', facultyCount: 60, nonFacultyCount: 148, totalCount: 208, color: '#6B7280' },
  ];

  // Updated hiring trends to match recent recruitment activity
  const hiringTrends: HiringTrend[] = [
    { month: 'Apr', hires: 8 },
    { month: 'May', hires: 12 },
    { month: 'Jun', hires: 6 },
    { month: 'Jul', hires: 15 },
    { month: 'Aug', hires: 18 },
    { month: 'Sep', hires: 10 }, // Current recruitment cycle
  ];

  // Updated activities to match recruitment management workflow
  const allActivities = [
    {
      title: 'New faculty application received',
      detail: 'Dr. Sarah Johnson applied for Computer Science position',
      time: '2 hours ago',
      icon: <UserPlus className="w-4 h-4 text-green-600 dark:text-green-400" />,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Interview scheduled',
      detail: 'Sneha Reddy - Information Technology admission interview',
      time: '4 hours ago',
      icon: <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Job posting created',
      detail: 'Research Assistant - AI/ML Lab position published',
      time: '6 hours ago',
      icon: <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Admission offer extended',
      detail: 'Vikram Singh - Civil Engineering admission offer sent',
      time: '1 day ago',
      icon: <BookOpen className="w-4 h-4 text-orange-600 dark:text-orange-400" />,
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      title: 'Student enrolled',
      detail: 'Ananya Iyer completed Biotechnology enrollment',
      time: '2 days ago',
      icon: <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
  ];

  const maxHires = Math.max(...hiringTrends.map((t) => t.hires));
  const maxStaffCount = Math.max(...departmentStaffData.map((d) => d.totalCount));
  const themeClasses = isDarkMode ? 'dark' : '';

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getPayrollStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'pending':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className={`${themeClasses} min-h-screen transition-colors duration-300`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Mobile Header - Simplified */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                HR Management Dashboard
              </h1>
            </div>
          </div>
        </header>

        {/* Desktop Header - Simplified */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 hidden lg:flex items-center justify-between px-6 py-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            HR Management Dashboard
          </h1>
        </header>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 min-w-0 p-4 lg:p-5">
          {/* KPI Cards - Matching recruitment data */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
            {/* Total Headcount */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Total Headcount
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {kpiData.totalHeadcount.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-blue-600 dark:text-blue-400">
                      Faculty: {kpiData.facultyCount}
                    </span>
                    <span className="text-green-600 dark:text-green-400">
                      Staff: {kpiData.nonFacultyCount}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg shrink-0">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            {/* Active Job Openings - Matching positions data */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Active Job Openings
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {kpiData.activeJobOpenings}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">Faculty & Research positions</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg shrink-0">
                  <Briefcase className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            {/* Payroll Cycle Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Payroll Status
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {kpiData.payrollDate}
                  </p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPayrollStatusColor(kpiData.payrollStatus)}`}>
                    <Clock className="w-3 h-3 mr-1" />
                    {kpiData.payrollStatus}
                  </span>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg shrink-0">
                  <IndianRupee className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>

            {/* Faculty Count (Detailed) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Total Faculty
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {kpiData.facultyCount}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    {Math.round((kpiData.facultyCount / kpiData.totalHeadcount) * 100)}% of workforce
                  </p>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg shrink-0">
                  <UserPlus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section - Reduced spacing */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5 mb-5">
            {/* Staff Distribution by Department - Matching recruitment data */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Staff Distribution by Department
                </h3>
                <BarChart3 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>

              <div className="space-y-3">
                {departmentStaffData.map((dept, index) => {
                  const percentage = Math.round((dept.totalCount / kpiData.totalHeadcount) * 100);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {dept.name}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {dept.totalCount}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
                          {/* Faculty bar */}
                          <div
                            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-700 ease-out relative"
                            style={{
                              width: `${Math.max((dept.facultyCount / maxStaffCount) * 100, 5)}%`,
                            }}
                          />
                          {/* Non-Faculty bar */}
                          <div
                            className="h-full bg-green-500 dark:bg-green-400 absolute top-0 transition-all duration-700 ease-out"
                            style={{
                              left: `${(dept.facultyCount / maxStaffCount) * 100}%`,
                              width: `${Math.max((dept.nonFacultyCount / maxStaffCount) * 100, 5)}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                            Faculty: {dept.facultyCount}
                          </span>
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            Staff: {dept.nonFacultyCount}
                          </span>
                        </div>
                        <span>{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hiring Trends - Matching recruitment activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Hiring Trends (Last 6 Months)
                </h3>
                <TrendingUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>

              <div className="space-y-3">
                {hiringTrends.map((trend, index) => {
                  const barHeight = (trend.hires / maxHires) * 100;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8 shrink-0">
                        {trend.month}
                      </span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-7 relative overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-1000 ease-out"
                          style={{ width: `${Math.max(barHeight, 15)}%` }}
                        >
                          <span className="text-xs font-semibold text-white">{trend.hires}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    Total: <span className="font-semibold">{hiringTrends.reduce((sum, t) => sum + t.hires, 0)}</span>
                  </p>
                </div>
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Avg: <span className="font-semibold">{Math.round(hiringTrends.reduce((sum, t) => sum + t.hires, 0) / hiringTrends.length)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent HR Activities - Matching recruitment workflow */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent HR Activities
            </h3>
            <div className="space-y-2">
              {(showAllActivities ? allActivities : allActivities.slice(0, 3)).map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className={`p-1.5 rounded-full shrink-0 ${activity.bgColor}`}>{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activity.detail}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={() => setShowAllActivities(!showAllActivities)}
                className="w-full py-2 px-4 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
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

export default HRDashboard;
