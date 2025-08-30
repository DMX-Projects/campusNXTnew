import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { Users, BookOpen, Award, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

const DeanDashboard: React.FC = () => {
  const cardData = [
    { title: 'College Students', value: '2,847', change: '+45', trend: 'up' as const, icon: Users, color: 'bg-blue-500' },
    { title: 'College Faculty', value: '186', change: '+3', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Academic Programs', value: '12', change: '+1', trend: 'up' as const, icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Research Projects', value: '45', change: '+8', trend: 'up' as const, icon: Award, color: 'bg-orange-500' },
    { title: 'College Ranking', value: '#15', change: '+2', trend: 'up' as const, icon: TrendingUp, color: 'bg-teal-500' },
    { title: 'Pending Approvals', value: '8', change: '-2', trend: 'down' as const, icon: AlertTriangle, color: 'bg-red-500' }
  ];

  const departmentPerformance = [
    { department: 'Computer Science', students: 850, faculty: 45, research: 15, placement: 94 },
    { department: 'Electrical Engineering', students: 620, faculty: 32, research: 12, placement: 89 },
    { department: 'Mechanical Engineering', students: 580, faculty: 28, research: 8, placement: 85 },
    { department: 'Civil Engineering', students: 490, faculty: 25, research: 6, placement: 82 },
    { department: 'Information Technology', students: 307, faculty: 18, research: 4, placement: 91 }
  ];

  const academicTrends = [
    { semester: 'Sem 1', enrollment: 720, completion: 95, satisfaction: 88 },
    { semester: 'Sem 2', enrollment: 765, completion: 93, satisfaction: 90 },
    { semester: 'Sem 3', enrollment: 810, completion: 96, satisfaction: 92 },
    { semester: 'Sem 4', enrollment: 855, completion: 94, satisfaction: 89 },
    { semester: 'Sem 5', enrollment: 900, completion: 97, satisfaction: 94 }
  ];

  const researchDistribution = [
    { area: 'Computer Science', projects: 15, funding: 45, color: '#3B82F6' },
    { area: 'Engineering', projects: 18, funding: 52, color: '#10B981' },
    { area: 'Applied Sciences', projects: 8, funding: 28, color: '#F59E0B' },
    { area: 'Management', projects: 4, funding: 15, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dean Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Academic leadership and college-wide oversight
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Academic Report
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Faculty Meeting
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Department Performance Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="department" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="students" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="faculty" fill="#10B981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Academic Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Academic Performance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={academicTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="semester" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="completion" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
              <Line type="monotone" dataKey="satisfaction" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Research Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Research Projects Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={researchDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="projects"
                label={({ area, projects }) => `${area}: ${projects}`}
              >
                {researchDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Faculty Development */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Faculty Development Programs
          </h3>
          <div className="space-y-4">
            {[
              { program: 'Research Methodology', participants: 45, completion: 89 },
              { program: 'Digital Teaching Tools', participants: 62, completion: 94 },
              { program: 'Industry Collaboration', participants: 38, completion: 76 },
              { program: 'Publication Writing', participants: 28, completion: 82 }
            ].map((program, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{program.program}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {program.participants} faculty • {program.completion}% completion
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${program.completion}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeanDashboard;