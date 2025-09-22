import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  DollarSign,
  IndianRupee, 
  TrendingUp, 
  Clock, 
  Sun, 
  Moon,
  Menu,
  X,
  BarChart3,
  PieChart,
  Activity,
  ChevronRight,
  Bell,
  Search
} from 'lucide-react';

interface KPIData {
  totalHeadcount: number;
  facultyCount: number;
  nonFacultyCount: number;
  activeJobOpenings: number;
  currentPayrollCycle: string;
}

interface DepartmentData {
  name: string;
  count: number;
  color: string;
}

interface HiringTrend {
  month: string;
  hires: number;
}

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample data
  const kpiData: KPIData = {
    totalHeadcount: 1247,
    facultyCount: 456,
    nonFacultyCount: 791,
    activeJobOpenings: 23,
    currentPayrollCycle: 'March 2024'
  };

  const departmentData: DepartmentData[] = [
    { name: 'Engineering', count: 324, color: '#3B82F6' },
    { name: 'Sales', count: 198, color: '#10B981' },
    { name: 'Marketing', count: 156, color: '#F59E0B' },
    { name: 'HR', count: 89, color: '#EF4444' },
    { name: 'Finance', count: 134, color: '#8B5CF6' },
    { name: 'Operations', count: 246, color: '#06B6D4' },
    { name: 'Others', count: 100, color: '#6B7280' }
  ];

  const hiringTrends: HiringTrend[] = [
    { month: 'Sep', hires: 12 },
    { month: 'Oct', hires: 18 },
    { month: 'Nov', hires: 15 },
    { month: 'Dec', hires: 8 },
    { month: 'Jan', hires: 22 },
    { month: 'Feb', hires: 28 }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const maxHires = Math.max(...hiringTrends.map(t => t.hires));
  const themeClasses = isDarkMode ? 'dark' : '';

  return (
    <div className={`₹{themeClasses} min-h-screen transition-colors duration-300`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Mobile Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-manipulation"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">HR Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              {/* <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 touch-manipulation">
                <Bell size={18} />
              </button> */}
              {/* <button
                onClick={toggleTheme}lg:block
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors touch-manipulation"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button> */}
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 hidden ">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HR Management Dashboard</h1>
            </div>
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
              {/* <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div> */}
            </div>
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
          <div className="flex-1 lg:ml-0 min-w-0">
            <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Headcount</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">{kpiData.totalHeadcount.toLocaleString()}</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Faculty</span>
                          <span className="font-semibold">{kpiData.facultyCount}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Non-Faculty</span>
                          <span className="font-semibold">{kpiData.nonFacultyCount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl shrink-0">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Active Openings</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">{kpiData.activeJobOpenings}</p>
                      <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        +2 this week
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
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Payroll Cycle</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate">{kpiData.currentPayrollCycle}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Processing</p>
                    </div>
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl shrink-0">
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Response Time</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">2.4</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">days average</p>
                    </div>
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl shrink-0">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
                {/* Department Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Staff Distribution</h3>
                    <PieChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {departmentData.map((dept, index) => {
                      const percentage = Math.round((dept.count / kpiData.totalHeadcount) * 100);
                      return (
                        <div key={index} className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: dept.color }}
                          ></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{dept.name}</span>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white ml-2">{dept.count}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all duration-700 ease-out"
                                style={{ 
                                  backgroundColor: dept.color,
                                  width: `₹{percentage}%`
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

                {/* Hiring Trends */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Hiring Trends</h3>
                    <TrendingUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {hiringTrends.map((trend, index) => {
                      const barHeight = (trend.hires / maxHires) * 100;
                      return (
                        <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8 shrink-0">{trend.month}</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 sm:h-10 relative overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
                              style={{ width: `₹{Math.max(barHeight, 10)}%` }}
                            >
                              <span className="text-xs sm:text-sm font-semibold text-white">{trend.hires}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Total hires (6 months): <span className="font-semibold">{hiringTrends.reduce((sum, t) => sum + t.hires, 0)}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Recent Activities</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full shrink-0">
                      <UserPlus className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">New employee onboarded</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sarah Johnson joined Engineering department</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">2 hours ago</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full shrink-0">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Payroll cycle initiated</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">March 2024 payroll processing started</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">5 hours ago</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full shrink-0">
                      <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Team meeting scheduled</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">HR quarterly review meeting</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">1 day ago</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6">
                  <button className="w-full py-2 px-4 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors touch-manipulation">
                    View All Activities
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Dashboard;