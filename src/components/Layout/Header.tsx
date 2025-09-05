import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { Bell, Sun, Moon, Search, Menu, School, User, MoreHorizontal, ChevronDown } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarCollapsed }) => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { activeModule, setActiveModule, getModulesForRole } = useNavigation();
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [visibleModules, setVisibleModules] = useState<string[]>([]);
  const [hiddenModules, setHiddenModules] = useState<string[]>([]);
  const tabsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const availableModules = user ? getModulesForRole(user.role) : ['Home'];

  const moduleIcons = {
    Home: '🏠',
    Students: '👥',
    Faculty: '👨‍🏫',
    Courses: '📚',
    Attendance: '✅',
    Grades: '📊',
    Library: '📖',
    Finance: '💰',
    Reports: '📈',
    Settings: '⚙️'
  };

  useEffect(() => {
    const handleResize = () => {
      if (tabsRef.current) {
        const containerWidth = tabsRef.current.offsetWidth - 100; // Reserve space for user info
        const tabWidth = 120; // Approximate width per tab
        const moreButtonWidth = 80; // Width for "More" button
        const maxVisibleTabs = Math.floor((containerWidth - moreButtonWidth) / tabWidth);
        
        if (availableModules.length > maxVisibleTabs) {
          setVisibleModules(availableModules.slice(0, maxVisibleTabs));
          setHiddenModules(availableModules.slice(maxVisibleTabs));
        } else {
          setVisibleModules(availableModules);
          setHiddenModules([]);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [availableModules]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setShowMoreDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-all duration-300 ease-in-out">
      {/* Main Header */}
      <header className="px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="/2(B)Without_Text_Transparent.png" 
                  alt="AICAS Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">AICAS</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI POWERED CAMPUS AUTOMATION SYSTEM</p>
              </div>
            </div>
            
            <div className="relative max-w-sm ml-6 hidden md:block">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-7 pr-3 py-1.5 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            {/* <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? 
                <Sun className="w-4 h-4 text-yellow-500" /> : 
                <Moon className="w-4 h-4 text-gray-600" />
              }
            </button> */}

            {/* Notifications */}
            <button className="relative p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>

            {/* User Info */}
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {user?.name?.charAt(0)}
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Module Navigation Tabs */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div ref={tabsRef} className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {visibleModules.map((module) => (
              <button
                key={module}
                onClick={() => setActiveModule(module)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                  activeModule === module
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {module}
              </button>
            ))}
            
            {hiddenModules.length > 0 && (
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg font-medium text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                >
                  <span>More</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMoreDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showMoreDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 min-w-[150px]">
                    {hiddenModules.map((module) => (
                      <button
                        key={module}
                        onClick={() => {
                          setActiveModule(module);
                          setShowMoreDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          activeModule === module
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {module}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;