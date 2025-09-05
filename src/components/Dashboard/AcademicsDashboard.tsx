
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { GraduationCap, Users, BookOpen, TrendingUp, Calendar, Award, Clock, CheckCircle } from 'lucide-react';

const AcademicsDashboard: React.FC = () => {
  const cardData = [
    { title: 'Total Students', value: '2,847', change: '+45', trend: 'up' as const, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Faculty', value: '186', change: '+3', trend: 'up' as const, icon: GraduationCap, color: 'bg-green-500' },
    { title: 'Active Courses', value: '124', change: '+8', trend: 'up' as const, icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Avg Attendance', value: '89%', change: '+2.3%', trend: 'up' as const, icon: CheckCircle, color: 'bg-orange-500' },
    { title: 'Course Completion', value: '94%', change: '+1.8%', trend: 'up' as const, icon: Award, color: 'bg-teal-500' },
    { title: 'Pending Approvals', value: '12', change: '-5', trend: 'down' as const, icon: Clock, color: 'bg-red-500' }
  ];

  const departmentPerformance = [
    { department: 'Computer Science', students: 850, faculty: 45, courses: 32, avgGrade: 8.2 },
    { department: 'Electrical Engineering', students: 620, faculty: 32, courses: 28, avgGrade: 7.8 },
    { department: 'Mechanical Engineering', students: 580, faculty: 28, courses: 25, avgGrade: 7.6 },
    { department: 'Civil Engineering', students: 490, faculty: 25, courses: 22, avgGrade: 7.9 },
    { department: 'Information Technology', students: 307, faculty: 18, courses: 18, avgGrade: 8.1 }
  ];

  const attendanceTrends = [
    { month: 'Aug', students: 92, faculty: 96 },
    { month: 'Sep', students: 89, faculty: 94 },
    { month: 'Oct', students: 94, faculty: 97 },
    { month: 'Nov', students: 91, faculty: 95 },
    { month: 'Dec', students: 88, faculty: 93 },
    { month: 'Jan', students: 89, faculty: 96 }
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 156, color: '#10B981' },
    { grade: 'A', count: 234, color: '#3B82F6' },
    { grade: 'B+', count: 198, color: '#F59E0B' },
    { grade: 'B', count: 145, color: '#EF4444' },
    { grade: 'C+', count: 89, color: '#8B5CF6' },
    { grade: 'C', count: 45, color: '#6B7280' }
  ];

  return (
    <div className="space-y-6">
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

        {/* Attendance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Attendance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis domain={[80, 100]} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="faculty" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Overall Grade Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ grade, count }) => `${grade}: ${count}`}
              >
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Academic Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Academic Events
          </h3>
          <div className="space-y-3">
            {[
              { event: 'Mid-Semester Exams', date: 'Feb 15-25', type: 'exam', departments: 'All' },
              { event: 'Faculty Development Program', date: 'Feb 28', type: 'training', departments: 'All Faculty' },
              { event: 'Industry Expert Lectures', date: 'Mar 5-8', type: 'lecture', departments: 'Engineering' },
              { event: 'Research Paper Presentations', date: 'Mar 12', type: 'research', departments: 'All' },
              { event: 'Annual Sports Meet', date: 'Mar 18-20', type: 'sports', departments: 'All Students' }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    event.type === 'exam' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                    event.type === 'training' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                    event.type === 'lecture' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' :
                    event.type === 'research' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                    'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                  }`}>
                    {event.type === 'exam' ? <Calendar className="w-4 h-4" /> :
                     event.type === 'training' ? <GraduationCap className="w-4 h-4" /> :
                     event.type === 'lecture' ? <BookOpen className="w-4 h-4" /> :
                     event.type === 'research' ? <Award className="w-4 h-4" /> :
                     <Calendar className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{event.event}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {event.date} • {event.departments}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicsDashboard;