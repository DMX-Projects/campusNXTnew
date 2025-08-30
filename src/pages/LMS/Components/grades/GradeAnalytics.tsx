import React from 'react';
import { TrendingUp, Award, Users, BarChart3 } from 'lucide-react';

const GradeAnalytics: React.FC = () => {
  const stats = [
    { title: 'Average GPA', value: '3.42', icon: Award, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Students Above 85%', value: '68%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Assessments', value: '156', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Graded This Week', value: '42', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 45, percentage: 18 },
    { grade: 'A', count: 67, percentage: 27 },
    { grade: 'B+', count: 58, percentage: 23 },
    { grade: 'B', count: 42, percentage: 17 },
    { grade: 'C+', count: 23, percentage: 9 },
    { grade: 'C', count: 12, percentage: 5 },
    { grade: 'D', count: 3, percentage: 1 },
  ];

  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Grade Distribution</h2>
        <div className="space-y-3">
          {gradeDistribution.map((item) => (
            <div key={item.grade} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 text-center font-medium text-gray-700">{item.grade}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 min-w-[200px]">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center space-x-4 min-w-[120px] justify-end">
                <span className="text-sm text-gray-600">{item.count} students</span>
                <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeAnalytics;