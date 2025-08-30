import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { Trophy, Users, Calendar, Award, TrendingUp, Target } from 'lucide-react';

const SportsDashboard: React.FC = () => {
  const cardData = [
    { title: 'Active Athletes', value: '342', change: '+18', trend: 'up' as const, icon: Users, color: 'bg-blue-500' },
    { title: 'Sports Events', value: '24', change: '+6', trend: 'up' as const, icon: Calendar, color: 'bg-green-500' },
    { title: 'Championships Won', value: '8', change: '+3', trend: 'up' as const, icon: Trophy, color: 'bg-purple-500' },
    { title: 'Equipment Budget', value: '₹12L', change: '+15%', trend: 'up' as const, icon: Target, color: 'bg-orange-500' },
    { title: 'Participation Rate', value: '68%', change: '+5%', trend: 'up' as const, icon: TrendingUp, color: 'bg-teal-500' },
    { title: 'Medals This Year', value: '45', change: '+12', trend: 'up' as const, icon: Award, color: 'bg-indigo-500' }
  ];

  const sportsParticipation = [
    { sport: 'Cricket', male: 45, female: 12, total: 57 },
    { sport: 'Football', male: 38, female: 15, total: 53 },
    { sport: 'Basketball', male: 25, female: 28, total: 53 },
    { sport: 'Volleyball', male: 22, female: 26, total: 48 },
    { sport: 'Badminton', male: 18, female: 22, total: 40 },
    { sport: 'Table Tennis', male: 15, female: 18, total: 33 }
  ];

  const performanceTrends = [
    { year: '2020', medals: 28, events: 18, participation: 280 },
    { year: '2021', medals: 32, events: 20, participation: 295 },
    { year: '2022', medals: 38, events: 22, participation: 315 },
    { year: '2023', medals: 42, events: 24, participation: 330 },
    { year: '2024', medals: 45, events: 24, participation: 342 }
  ];

  const medalDistribution = [
    { type: 'Gold', count: 15, color: '#FFD700' },
    { type: 'Silver', count: 18, color: '#C0C0C0' },
    { type: 'Bronze', count: 12, color: '#CD7F32' }
  ];

  const upcomingEvents = [
    { event: 'Inter-College Cricket Tournament', date: 'Jan 25-28', participants: 45, venue: 'Main Ground' },
    { event: 'Basketball Championship', date: 'Feb 2-5', participants: 32, venue: 'Sports Complex' },
    { event: 'Swimming Competition', date: 'Feb 10', participants: 28, venue: 'Aquatic Center' },
    { event: 'Athletics Meet', date: 'Feb 15-16', participants: 65, venue: 'Track & Field' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sports Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Athletic programs and sports activities oversight
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Schedule Event
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Sports Report
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
        {/* Sports Participation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Sports Participation by Gender
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sportsParticipation}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="sport" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="male" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="female" fill="#EC4899" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            5-Year Performance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrends}>
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
              <Line type="monotone" dataKey="medals" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
              <Line type="monotone" dataKey="participation" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Medal Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Medal Distribution (Current Year)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={medalDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ type, count }) => `${type}: ${count}`}
              >
                {medalDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Equipment & Facilities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Equipment & Facilities Status
          </h3>
          <div className="space-y-4">
            {[
              { facility: 'Main Sports Ground', status: 'excellent', utilization: 95 },
              { facility: 'Basketball Court', status: 'good', utilization: 88 },
              { facility: 'Swimming Pool', status: 'good', utilization: 72 },
              { facility: 'Gymnasium', status: 'excellent', utilization: 92 },
              { facility: 'Tennis Court', status: 'maintenance', utilization: 45 }
            ].map((facility, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{facility.facility}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {facility.utilization}%
                    </span>
                    <div className={`w-3 h-3 rounded-full ${
                      facility.status === 'excellent' ? 'bg-green-500' :
                      facility.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      facility.status === 'excellent' ? 'bg-green-500' :
                      facility.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${facility.utilization}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Sports Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{event.event}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {event.date} • {event.venue}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600 dark:text-blue-400">{event.participants}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">participants</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Performers</h3>
          <div className="space-y-3">
            {[
              { name: 'Rahul Sharma', sport: 'Cricket', achievements: '3 Gold, 1 Silver', year: '3rd Year' },
              { name: 'Priya Patel', sport: 'Basketball', achievements: '2 Gold, 2 Bronze', year: '2nd Year' },
              { name: 'Amit Kumar', sport: 'Swimming', achievements: '4 Gold', year: '4th Year' },
              { name: 'Sneha Singh', sport: 'Badminton', achievements: '1 Gold, 3 Silver', year: '1st Year' }
            ].map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{performer.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {performer.sport} • {performer.year}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{performer.achievements}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sports Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Programs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Training Programs</h3>
          <div className="space-y-4">
            {[
              { program: 'Fitness Training', participants: 85, sessions: 24 },
              { program: 'Skill Development', participants: 62, sessions: 18 },
              { program: 'Team Building', participants: 45, sessions: 12 },
              { program: 'Mental Conditioning', participants: 38, sessions: 16 }
            ].map((program, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{program.program}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{program.sessions} sessions</p>
                </div>
                <p className="font-bold text-blue-600 dark:text-blue-400">{program.participants}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Allocation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Budget Allocation</h3>
          <div className="space-y-4">
            {[
              { category: 'Equipment', allocated: 5, spent: 4.2, percentage: 84 },
              { category: 'Events', allocated: 3, spent: 2.8, percentage: 93 },
              { category: 'Training', allocated: 2.5, spent: 2.1, percentage: 84 },
              { category: 'Maintenance', allocated: 1.5, spent: 1.3, percentage: 87 }
            ].map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{budget.category}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ₹{budget.spent}L / ₹{budget.allocated}L
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${budget.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health & Safety */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Health & Safety</h3>
          <div className="space-y-4">
            {[
              { metric: 'Medical Checkups', completed: 320, total: 342, status: 'good' },
              { metric: 'Safety Training', completed: 342, total: 342, status: 'excellent' },
              { metric: 'Injury Reports', count: 3, severity: 'minor', status: 'good' },
              { metric: 'Equipment Safety', inspected: 95, total: 100, status: 'good' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.metric}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.completed ? `${item.completed}/${item.total}` : 
                     item.count ? `${item.count} ${item.severity}` :
                     `${item.inspected}/${item.total}`}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'excellent' ? 'bg-green-500' :
                  item.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsDashboard;