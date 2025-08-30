import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, Building, BookOpen, School, GraduationCap } from 'lucide-react';

const dashboardCards = [
  {
    title: 'Users',
    count: '1,234',
    description: 'Total active users',
    icon: Users,
    color: 'bg-blue-500',
    path: '/home/users'
  },
  {
    title: 'Roles',
    count: '8',
    description: 'System roles',
    icon: Shield,
    color: 'bg-green-500',
    path: '/home/roles'
  },
  {
    title: 'Departments',
    count: '12',
    description: 'Academic departments',
    icon: Building,
    color: 'bg-purple-500',
    path: '/home/departments'
  },
  {
    title: 'Courses',
    count: '245',
    description: 'Active courses',
    icon: BookOpen,
    color: 'bg-orange-500',
    path: '/home/courses'
  },
  {
    title: 'Programs',
    count: '18',
    description: 'Academic programs',
    icon: GraduationCap,
    color: 'bg-indigo-500',
    path: '/home/programs'
  },
  {
    title: 'Institutions',
    count: '3',
    description: 'Campus locations',
    icon: School,
    color: 'bg-pink-500',
    path: '/home/institutions'
  }
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to the AI Powered Campus Automation System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${card.color} rounded-lg p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {card.title}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {card.count}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New user "John Doe" registered</span>
                <span className="text-xs text-gray-400">2 minutes ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Course "Data Structures" updated</span>
                <span className="text-xs text-gray-400">15 minutes ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New program added to CSE department</span>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Department meeting scheduled</span>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Stats</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Students</span>
                <span className="text-sm font-medium text-gray-900">1,156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Faculty Members</span>
                <span className="text-sm font-medium text-gray-900">78</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Running Courses</span>
                <span className="text-sm font-medium text-gray-900">245</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Applications</span>
                <span className="text-sm font-medium text-orange-600">23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};