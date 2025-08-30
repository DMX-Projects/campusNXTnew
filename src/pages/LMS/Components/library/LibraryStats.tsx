import React from 'react';
import { BookOpen, Users, TrendingDown, Clock } from 'lucide-react';

const LibraryStats: React.FC = () => {
  const stats = [
    { title: 'Total Books', value: '12,547', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Books Borrowed', value: '1,234', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Overdue Books', value: '23', icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50' },
    { title: 'Due This Week', value: '156', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LibraryStats;