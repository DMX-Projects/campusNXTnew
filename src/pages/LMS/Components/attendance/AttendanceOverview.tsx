import React from 'react';
import { TrendingUp, AlertTriangle, Users } from 'lucide-react';

const AttendanceOverview: React.FC = () => {
  const attendanceStats = [
    { course: 'CS-301 Data Structures', present: 45, total: 50, percentage: 90 },
    { course: 'MATH-201 Calculus', present: 38, total: 45, percentage: 84 },
    { course: 'PHY-101 Physics', present: 42, total: 48, percentage: 88 },
    { course: 'CHEM-101 Chemistry', present: 35, total: 42, percentage: 83 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Today's Attendance Overview</h2>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="space-y-4">
        {attendanceStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${
                stat.percentage >= 90 ? 'bg-emerald-100 text-emerald-600' :
                stat.percentage >= 80 ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {stat.percentage >= 90 ? <TrendingUp className="h-5 w-5" /> :
                 stat.percentage >= 80 ? <Users className="h-5 w-5" /> :
                 <AlertTriangle className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{stat.course}</h3>
                <p className="text-sm text-gray-600">{stat.present}/{stat.total} students present</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${
                stat.percentage >= 90 ? 'text-emerald-600' :
                stat.percentage >= 80 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {stat.percentage}%
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${
                    stat.percentage >= 90 ? 'bg-emerald-500' :
                    stat.percentage >= 80 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceOverview;