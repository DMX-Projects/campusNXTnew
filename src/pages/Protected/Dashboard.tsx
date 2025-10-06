import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { DashboardCardData } from '../../types/models';

const Dashboard: React.FC = () => {
  const { user, hasRole } = useAuth();

  // Mock dashboard data - this would come from an API in a real app
  const getDashboardCards = (): DashboardCardData[] => {
    if (hasRole('Student')) {
      return [
        {
          title: 'Attendance',
          value: '85%',
          change: '+2%',
          trend: 'up',
          icon: 'CheckCircle',
          color: 'green',
        },
        {
          title: 'CGPA',
          value: '8.5',
          change: '+0.2',
          trend: 'up',
          icon: 'Award',
          color: 'blue',
        },
        {
          title: 'Fees Status',
          value: 'Paid',
          change: '',
          trend: 'neutral',
          icon: 'DollarSign',
          color: 'green',
        },
        {
          title: 'Books Issued',
          value: '3',
          change: '',
          trend: 'neutral',
          icon: 'BookOpen',
          color: 'purple',
        },
      ];
    }

    if (hasRole('Faculty')) {
      return [
        {
          title: 'Classes Today',
          value: '4',
          change: '',
          trend: 'neutral',
          icon: 'Calendar',
          color: 'blue',
        },
        {
          title: 'Students',
          value: '120',
          change: '+5',
          trend: 'up',
          icon: 'Users',
          color: 'green',
        },
        {
          title: 'Pending Evaluations',
          value: '8',
          change: '-2',
          trend: 'down',
          icon: 'FileText',
          color: 'orange',
        },
        {
          title: 'Attendance Marked',
          value: '95%',
          change: '+3%',
          trend: 'up',
          icon: 'CheckCircle',
          color: 'green',
        },
      ];
    }

    // Default/Admin dashboard
    return [
      {
        title: 'Total Students',
        value: '1250',
        change: '+25',
        trend: 'up',
        icon: 'Users',
        color: 'blue',
      },
      {
        title: 'Total Faculty',
        value: '85',
        change: '+3',
        trend: 'up',
        icon: 'GraduationCap',
        color: 'green',
      },
      {
        title: 'Active Courses',
        value: '45',
        change: '+2',
        trend: 'up',
        icon: 'BookOpen',
        color: 'purple',
      },
      {
        title: 'System Health',
        value: '98%',
        change: '+1%',
        trend: 'up',
        icon: 'Activity',
        color: 'green',
      },
    ];
  };

  const dashboardCards = getDashboardCards();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening in your {hasRole('Student') ? 'academic' : 'administrative'} world today.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4"
            style={{ borderLeftColor: getColorValue(card.color) }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{card.value}</p>
                {card.change && (
                  <p className={`text-sm ${
                    card.trend === 'up' ? 'text-green-600' : 
                    card.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {card.change} from last month
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-full ${
                card.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                card.color === 'green' ? 'bg-green-100 text-green-600' :
                card.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                card.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                <IconComponent name={card.icon} className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {getRecentActivity().map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' :
                    activity.type === 'error' ? 'bg-red-400' :
                    'bg-blue-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color values
const getColorValue = (color: string): string => {
  const colors: Record<string, string> = {
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    orange: '#f59e0b',
    red: '#ef4444',
  };
  return colors[color] || '#6b7280';
};

// Simple icon component
const IconComponent: React.FC<{ name: string; className: string }> = ({ name, className }) => {
  const icons: Record<string, string> = {
    Users: '👥',
    CheckCircle: '✅',
    Award: '🏆',
    DollarSign: '💰',
    BookOpen: '📚',
    Calendar: '📅',
    FileText: '📄',
    Activity: '📊',
  };
  
  return <span className={className}>{icons[name] || '📋'}</span>;
};

// Mock recent activity data
const getRecentActivity = () => {
  return [
    {
      description: 'New student enrolled in Computer Science',
      time: '2 hours ago',
      type: 'success',
    },
    {
      description: 'Faculty attendance marked for today',
      time: '4 hours ago',
      type: 'info',
    },
    {
      description: 'Library book returned successfully',
      time: '6 hours ago',
      type: 'success',
    },
    {
      description: 'Exam schedule updated for next week',
      time: '1 day ago',
      type: 'warning',
    },
    {
      description: 'New placement drive announced',
      time: '2 days ago',
      type: 'info',
    },
  ];
};

export default Dashboard;

