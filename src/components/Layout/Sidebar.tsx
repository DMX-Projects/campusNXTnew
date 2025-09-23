import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { 
  ChevronLeft, ChevronRight, School, ChevronDown,
  BarChart3, Users, GraduationCap, BookOpen, Calendar, 
  ClipboardCheck, Award, Library, DollarSign, Settings,
  Eye, Zap, Clock, Building, FileText, Target, CheckCircle,
  Edit, CreditCard, TrendingUp, Home, Building2, Shield,
  Briefcase, Search, Video, FolderOpen, MessageCircle,
  RefreshCw, Package, Monitor, History, Bookmark, MapPin,
  Navigation, Wrench, Truck, Bus, UserCheck, AlertTriangle,
  Utensils, Megaphone, Bell, Clipboard, Mail, Folder,
  ArrowRight, UserMinus, UserPlus, FileCheck, UserX,
  CheckSquare, FileOutput, FileQuestion, Phone, Upload,
  HelpCircle, Receipt, Link, List, Code, MessageSquare,
  Inbox, FolderOpen as FolderOpenIcon
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const { user } = useAuth();
  const { activeModule, getSidebarItemsForModule, expandedItems, toggleExpanded } = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();

  const iconMap = {
    BarChart3, Users, GraduationCap, BookOpen, Calendar, 
    ClipboardCheck, Award, Library, DollarSign, Settings,
    Eye, Zap, Clock, Building, FileText, Target, CheckCircle,
    Edit, CreditCard, TrendingUp, Home, Building2, Shield,
    Briefcase, Search, Video, FolderOpen, MessageCircle,
    RefreshCw, Package, Monitor, History, Bookmark, MapPin,
    Navigation, Wrench, Truck, Bus, UserCheck, AlertTriangle,
    Utensils, Megaphone, Bell, Clipboard, Mail, Folder,
    ArrowRight, UserMinus, UserPlus, FileCheck, UserX,
    CheckSquare, FileOutput, FileQuestion, Phone, Upload,
    HelpCircle, Receipt, Link, List, Code, MessageSquare,
    Inbox, FolderOpenIcon
  };

  const menuItems = user ? getSidebarItemsForModule(activeModule, user.role) : [];


  const truncateText = (text: string, maxLength: number = 25) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderMenuItem = (item: any, level: number = 0) => {
    const Icon = iconMap[item.icon as keyof typeof iconMap] || BarChart3;
    const isActive = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.path);
    const paddingLeft = isCollapsed ? 8 : level * 12 + 8;

    return (
      <div key={item.path} className="relative">
        <div className="relative group">
          <button
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.path);
              } else {
                navigate(item.path);
              }
            }}
            className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all duration-200 text-sm relative ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
            style={{ paddingLeft: `${paddingLeft}px` }}
            title={isCollapsed ? item.name : ''}
          >
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Icon className={`w-4 h-4 flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && (
                <span className="font-medium text-xs truncate" title={item.name}>
                  {truncateText(item.name)}
                </span>
              )}
            </div>
            {!isCollapsed && hasChildren && (
              <ChevronDown 
                className={`w-3 h-3 transition-transform duration-200 flex-shrink-0 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            )}
          </button>
          
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {item.name}
            </div>
          )}
        </div>
        
        {hasChildren && !isCollapsed && isExpanded && (
          <div className="mt-1">
            <div className="max-h-80 overflow-y-auto overflow-x-hidden space-y-1 border-l border-gray-200 dark:border-gray-600">
              <div className="space-y-1">
                {item.children.map((child: any) => renderMenuItem(child, level + 1))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`${isCollapsed ? 'w-12' : 'w-64'} bg-white dark:bg-gray-800 shadow-sm h-full flex flex-col transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700`}>
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <img 
                src="/2(B)Without_Text_Transparent.png" 
                alt="AICAS Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-gray-900 dark:text-white text-xs">AICAS</span>
              <p className="text-xs text-gray-400 dark:text-gray-500">Campus System</p>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
        >
          {isCollapsed ? 
            <ChevronRight className="w-3 h-3 text-gray-600 dark:text-gray-400" /> : 
            <ChevronLeft className="w-3 h-3 text-gray-600 dark:text-gray-400" />
          }
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 dark:text-white truncate" title={user?.name}>
                {truncateText(user?.name || 'Admin User', 12)}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 truncate" title={user?.role}>
                {truncateText(user?.role || 'Administrator', 12)}
              </p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {activeModule} Module
            </h3>
          </div>
        )}
        
        {menuItems.map((item) => renderMenuItem(item))}
        
        {menuItems.length === 0 && !isCollapsed && (
          <div className="text-center text-gray-500 dark:text-gray-400 text-xs py-4">
            No items available for this module
          </div>
        )}
      </nav>

      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
      </div>
    </div>
  );
};

export default Sidebar;