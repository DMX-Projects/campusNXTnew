import React from 'react';
import { Clock, FileText, Users, Award } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'assignment',
      icon: FileText,
      title: 'New Assignment Posted',
      description: 'Data Structures Assignment 3 posted for CS-301',
      time: '2 hours ago',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 2,
      type: 'enrollment',
      icon: Users,
      title: 'New Student Enrollment',
      description: '15 students enrolled in Advanced Mathematics',
      time: '4 hours ago',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 3,
      type: 'grade',
      icon: Award,
      title: 'Grades Published',
      description: 'Mid-term grades published for Physics 101',
      time: '6 hours ago',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 4,
      type: 'attendance',
      icon: Clock,
      title: 'Attendance Alert',
      description: 'Low attendance warning for Chemistry Lab',
      time: '8 hours ago',
      color: 'bg-orange-50 text-orange-600'
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{activity.title}</h3>
                <p className="text-gray-600 text-sm">{activity.description}</p>
                <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;