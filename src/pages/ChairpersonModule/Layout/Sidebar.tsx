import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Shield, Building, BookOpen, UserCheck, School, GraduationCap, Calendar, CalendarDays, FileText, Presentation as PresentationChart, Clock, Award, MessageSquare, Inbox, Bell, CalendarCheck } from 'lucide-react';

const menuItems = [
  { path: '/home/users', label: 'Users', icon: Users },
  { path: '/home/roles', label: 'Roles', icon: Shield },
  { path: '/home/departments', label: 'Departments', icon: Building },
  { path: '/home/courses', label: 'Courses', icon: BookOpen },
  { path: '/home/clients', label: 'Clients', icon: UserCheck },
  { path: '/home/institutions', label: 'Institutions', icon: School },
  { path: '/home/programs', label: 'Programs', icon: GraduationCap },
  { path: '/home/holiday-list', label: 'Holiday List', icon: Calendar },
  { path: '/home/holiday-calendar', label: 'Holiday Calendar', icon: CalendarDays },
  { path: '/home/topics', label: 'Topics', icon: FileText },
  { path: '/home/lessons', label: 'Lessons', icon: PresentationChart },
  { path: '/home/academic-year', label: 'Academic Year', icon: Clock },
  { path: '/home/affiliation', label: 'Affiliation', icon: Award },
  { path: '/home/my-calendar', label: 'My Calendar', icon: CalendarCheck },
  { path: '/home/inbox', label: 'Inbox', icon: Inbox },
  { path: '/home/notifications', label: 'Notifications', icon: Bell },
  { path: '/home/events', label: 'Events', icon: MessageSquare }
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-lg h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Masters</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};