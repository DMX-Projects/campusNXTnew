import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { Monitor, Users, BookOpen, Clock, Award, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

const LMSDashboard: React.FC = () => {
  const cardData = [
    { title: 'Active Courses', value: '124', change: '+8', trend: 'up' as const, icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Enrolled Students', value: '2,847', change: '+45', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Online Sessions', value: '156', change: '+23', trend: 'up' as const, icon: Monitor, color: 'bg-purple-500' },
    { title: 'Completion Rate', value: '87%', change: '+5%', trend: 'up' as const, icon: CheckCircle, color: 'bg-orange-500' },
    { title: 'Avg Study Time', value: '4.2h', change: '+0.3h', trend: 'up' as const, icon: Clock, color: 'bg-teal-500' },
    { title: 'Course Rating', value: '4.6/5', change: '+0.2', trend: 'up' as const, icon: Award, color: 'bg-indigo-500' }
  ];

  const courseEngagement = [
    { course: 'Data Structures', enrolled: 245, completed: 198, rating: 4.8 },
    { course: 'Web Development', enrolled: 189, completed: 156, rating: 4.6 },
    { course: 'Database Systems', enrolled: 267, completed: 234, rating: 4.7 },
    { course: 'Machine Learning', enrolled: 156, completed: 142, rating: 4.9 },
    { course: 'Mobile App Development', enrolled: 198, completed: 176, rating: 4.5 }
  ];

  const learningProgress = [
    { week: 'Week 1', videos: 85, assignments: 78, tests: 92 },
    { week: 'Week 2', videos: 89, assignments: 82, tests: 88 },
    { week: 'Week 3', videos: 92, assignments: 85, tests: 90 },
    { week: 'Week 4', videos: 88, assignments: 89, tests: 94 },
    { week: 'Week 5', videos: 94, assignments: 91, tests: 89 },
    { week: 'Week 6', videos: 91, assignments: 88, tests: 92 }
  ];

  const deviceUsage = [
    { device: 'Desktop', users: 1245, color: '#3B82F6' },
    { device: 'Mobile', users: 987, color: '#10B981' },
    { device: 'Tablet', users: 456, color: '#F59E0B' },
    { device: 'Laptop', users: 789, color: '#EF4444' }
  ];

  const onlineActivities = [
    { activity: 'Video Lectures Watched', count: 2847, change: '+12%' },
    { activity: 'Assignments Submitted', count: 1956, change: '+8%' },
    { activity: 'Online Tests Taken', count: 1234, change: '+15%' },
    { activity: 'Discussion Posts', count: 567, change: '+22%' },
    { activity: 'Code Submissions', count: 892, change: '+18%' },
    { activity: 'Peer Reviews', count: 445, change: '+25%' }
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
        {/* Course Engagement */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Course Engagement & Completion
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseEngagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="course" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="enrolled" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="completed" fill="#10B981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Learning Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Weekly Learning Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={learningProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#6B7280" />
              <YAxis domain={[75, 100]} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="videos" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              <Line type="monotone" dataKey="assignments" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
              <Line type="monotone" dataKey="tests" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Device Usage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Device Usage Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceUsage}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="users"
                label={({ device, users }) => `${device}: ${users}`}
              >
                {deviceUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Online Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Online Learning Activities
          </h3>
          <div className="space-y-4">
            {onlineActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{activity.activity}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">{activity.change} from last month</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{activity.count.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">this month</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSDashboard;