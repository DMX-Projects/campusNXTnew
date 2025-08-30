import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { Users, BookOpen, Award, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

const HoDDashboard: React.FC = () => {
  const cardData = [
    { title: 'Department Students', value: '850', change: '+25', trend: 'up' as const, icon: Users, color: 'bg-blue-500' },
    { title: 'Department Faculty', value: '45', change: '+2', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Active Courses', value: '28', change: '+3', trend: 'up' as const, icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Research Projects', value: '15', change: '+4', trend: 'up' as const, icon: Award, color: 'bg-orange-500' },
    { title: 'Placement Rate', value: '94%', change: '+3%', trend: 'up' as const, icon: TrendingUp, color: 'bg-teal-500' },
    { title: 'Budget Utilization', value: '78%', change: '+5%', trend: 'up' as const, icon: AlertTriangle, color: 'bg-red-500' }
  ];

  const yearWisePerformance = [
    { year: '1st Year', students: 220, attendance: 92, performance: 85 },
    { year: '2nd Year', students: 215, attendance: 89, performance: 87 },
    { year: '3rd Year', students: 210, attendance: 94, performance: 89 },
    { year: '4th Year', students: 205, attendance: 91, performance: 92 }
  ];

  const facultyPerformance = [
    { faculty: 'Prof. Davis', classes: 6, rating: 4.8, research: 3 },
    { faculty: 'Prof. Brown', classes: 5, rating: 4.6, research: 5 },
    { faculty: 'Prof. Wilson', classes: 4, rating: 4.9, research: 2 },
    { faculty: 'Prof. Johnson', classes: 7, rating: 4.5, research: 4 },
    { faculty: 'Prof. Anderson', classes: 5, rating: 4.7, research: 3 }
  ];

  const courseDistribution = [
    { category: 'Core Courses', count: 12, color: '#3B82F6' },
    { category: 'Electives', count: 8, color: '#10B981' },
    { category: 'Lab Courses', count: 6, color: '#F59E0B' },
    { category: 'Project Work', count: 2, color: '#EF4444' }
  ];

  const budgetAllocation = [
    { category: 'Faculty Salaries', allocated: 45, utilized: 42, percentage: 93 },
    { category: 'Equipment', allocated: 25, utilized: 18, percentage: 72 },
    { category: 'Research Grants', allocated: 20, utilized: 16, percentage: 80 },
    { category: 'Infrastructure', allocated: 15, utilized: 12, percentage: 80 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            HoD Dashboard - Computer Science
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Department management and academic oversight
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Department Report
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
        {/* Year-wise Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Year-wise Student Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearWisePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="attendance" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="performance" fill="#10B981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Course Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Course Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ category, count }) => `${category}: ${count}`}
              >
                {courseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Faculty Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Faculty Performance Overview
          </h3>
          <div className="space-y-3">
            {facultyPerformance.map((faculty, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{faculty.faculty}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {faculty.classes} classes • {faculty.research} research projects
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-bold text-gray-900 dark:text-white">{faculty.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Student Rating</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Utilization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Budget Utilization (Lakhs ₹)
          </h3>
          <div className="space-y-4">
            {budgetAllocation.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{item.category}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ₹{item.utilized}L / ₹{item.allocated}L ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.percentage >= 90 ? 'bg-red-500' :
                      item.percentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {[
              { activity: 'Faculty Recruitment Drive', date: 'Jan 15', status: 'completed' },
              { activity: 'Industry Expert Lecture', date: 'Jan 18', status: 'upcoming' },
              { activity: 'Research Paper Review', date: 'Jan 20', status: 'in-progress' },
              { activity: 'Curriculum Update Meeting', date: 'Jan 22', status: 'scheduled' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'completed' ? 'bg-green-500' :
                  item.status === 'in-progress' ? 'bg-blue-500' :
                  item.status === 'upcoming' ? 'bg-orange-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.activity}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Collaborations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Industry Collaborations</h3>
          <div className="space-y-3">
            {[
              { company: 'TechCorp Solutions', type: 'Internships', students: 25 },
              { company: 'Innovation Labs', type: 'Projects', students: 15 },
              { company: 'DataFlow Systems', type: 'Training', students: 40 },
              { company: 'CloudTech Inc.', type: 'Research', students: 8 }
            ].map((collab, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{collab.company}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{collab.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600 dark:text-blue-400">{collab.students}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">students</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {[
              { event: 'Technical Symposium', date: 'Jan 25', participants: 200 },
              { event: 'Industry Visit', date: 'Jan 28', participants: 50 },
              { event: 'Research Conference', date: 'Feb 2', participants: 100 },
              { event: 'Alumni Meet', date: 'Feb 5', participants: 150 }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{event.event}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600 dark:text-purple-400">{event.participants}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">expected</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoDDashboard;