import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { ClipboardCheck, Users, Calendar, Award, AlertTriangle, TrendingUp } from 'lucide-react';

const ExaminationDashboard: React.FC = () => {
  const cardData = [
    { title: 'Active Exams', value: '12', change: '+3', trend: 'up' as const, icon: ClipboardCheck, color: 'bg-blue-500' },
    { title: 'Students Enrolled', value: '2,847', change: '+45', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Results Published', value: '8', change: '+2', trend: 'up' as const, icon: Award, color: 'bg-purple-500' },
    { title: 'Pending Evaluations', value: '156', change: '-23', trend: 'down' as const, icon: AlertTriangle, color: 'bg-orange-500' },
    { title: 'Pass Percentage', value: '94.2%', change: '+1.8%', trend: 'up' as const, icon: TrendingUp, color: 'bg-teal-500' },
    { title: 'Detained Students', value: '23', change: '-5', trend: 'down' as const, icon: AlertTriangle, color: 'bg-red-500' }
  ];

  const examAttendanceData = [
    { department: 'Computer Science', present: 245, absent: 12, percentage: 95.3 },
    { department: 'Electrical Engineering', present: 198, absent: 8, percentage: 96.1 },
    { department: 'Mechanical Engineering', present: 178, absent: 15, percentage: 92.2 },
    { department: 'Civil Engineering', present: 156, absent: 9, percentage: 94.5 }
  ];

  const resultAnalysisData = [
    { semester: 'Sem 1', distinction: 45, firstClass: 78, secondClass: 92, pass: 23, fail: 8 },
    { semester: 'Sem 2', distinction: 52, firstClass: 85, secondClass: 89, pass: 18, fail: 6 },
    { semester: 'Sem 3', distinction: 48, firstClass: 82, secondClass: 94, pass: 21, fail: 5 },
    { semester: 'Sem 4', distinction: 55, firstClass: 88, secondClass: 87, pass: 16, fail: 4 }
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 156, color: '#10B981' },
    { grade: 'A', count: 234, color: '#3B82F6' },
    { grade: 'B+', count: 198, color: '#F59E0B' },
    { grade: 'B', count: 145, color: '#EF4444' },
    { grade: 'C', count: 89, color: '#8B5CF6' },
    { grade: 'F', count: 23, color: '#6B7280' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Examination Controller Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive examination management and result analysis
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Schedule Exam
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Generate Results
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
        {/* Exam Attendance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Department-wise Exam Attendance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={examAttendanceData}>
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
              <Bar dataKey="present" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="absent" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
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

        {/* Result Analysis Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Semester-wise Result Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resultAnalysisData}>
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
              <Bar dataKey="distinction" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="firstClass" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="secondClass" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pass" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="fail" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExaminationDashboard;