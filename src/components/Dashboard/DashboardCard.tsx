import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardCardData } from '../../types';

interface DashboardCardProps {
  data: DashboardCardData;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ data }) => {
  const { title, value, change, trend, icon: Icon, color } = data;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-md ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {change && trend && (
          <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium ${
            trend === 'up' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
              : trend === 'down'
              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">
          {title}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;