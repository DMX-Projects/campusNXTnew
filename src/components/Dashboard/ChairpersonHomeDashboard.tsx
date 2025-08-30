import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from './DashboardCard';
import { Building2, Users, DollarSign, TrendingUp, Award, AlertTriangle, 
         FileText, Calendar, CheckCircle, Target, Globe, Briefcase } from 'lucide-react';

const ChairpersonHomeDashboard: React.FC = () => {
  const cardData = [
    { title: 'Total Institutions', value: '5', change: '+1', trend: 'up' as const, icon: Building2, color: 'bg-blue-500' },
    { title: 'Global Students', value: '15,247', change: '+1,245', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Global Faculty', value: '1,186', change: '+45', trend: 'up' as const, icon: Users, color: 'bg-purple-500' },
    { title: 'Annual Revenue', value: '₹285Cr', change: '+22%', trend: 'up' as const, icon: DollarSign, color: 'bg-orange-500' },
    { title: 'Board Resolutions', value: '48', change: '+12', trend: 'up' as const, icon: FileText, color: 'bg-teal-500' },
    { title: 'Compliance Score', value: '99%', change: '+1%', trend: 'up' as const, icon: Award, color: 'bg-indigo-500' },
    { title: 'Strategic Goals', value: '12/15', change: '+3', trend: 'up' as const, icon: Target, color: 'bg-pink-500' },
    { title: 'Global Ranking', value: '#8', change: '+2', trend: 'up' as const, icon: Globe, color: 'bg-cyan-500' }
  ];

  const institutionalPerformance = [
    { institution: 'Main Campus', students: 4200, faculty: 280, revenue: 85, satisfaction: 96 },
    { institution: 'North Campus', students: 3800, faculty: 250, revenue: 68, satisfaction: 94 },
    { institution: 'South Campus', students: 2547, faculty: 156, revenue: 42, satisfaction: 92 },
    { institution: 'Engineering College', students: 2800, faculty: 180, revenue: 55, satisfaction: 95 },
    { institution: 'Management College', students: 1900, faculty: 120, revenue: 35, satisfaction: 93 }
  ];

  const boardMeetingData = [
    { month: 'Aug', resolutions: 8, implemented: 8, pending: 0 },
    { month: 'Sep', resolutions: 6, implemented: 6, pending: 0 },
    { month: 'Oct', resolutions: 10, implemented: 8, pending: 2 },
    { month: 'Nov', resolutions: 12, implemented: 10, pending: 2 },
    { month: 'Dec', resolutions: 8, implemented: 6, pending: 2 },
    { month: 'Jan', resolutions: 4, implemented: 2, pending: 2 }
  ];

  const strategicInitiatives = [
    { initiative: 'Digital Transformation', progress: 92, budget: 150, spent: 138, priority: 'high' },
    { initiative: 'Global Expansion', progress: 78, budget: 200, spent: 156, priority: 'high' },
    { initiative: 'Research Excellence', progress: 85, budget: 120, spent: 102, priority: 'medium' },
    { initiative: 'Industry Partnerships', progress: 88, budget: 80, spent: 70, priority: 'medium' },
    { initiative: 'Sustainability Program', progress: 65, budget: 60, spent: 39, priority: 'low' },
    { initiative: 'Faculty Development', progress: 94, budget: 45, spent: 42, priority: 'high' }
  ];

  const complianceData = [
    { category: 'Academic Standards', score: 99, color: '#10B981' },
    { category: 'Financial Compliance', score: 98, color: '#3B82F6' },
    { category: 'Safety Regulations', score: 100, color: '#F59E0B' },
    { category: 'Environmental Standards', score: 96, color: '#EF4444' },
    { category: 'Legal Requirements', score: 100, color: '#8B5CF6' },
    { category: 'Quality Assurance', score: 97, color: '#06B6D4' }
  ];

  const globalMetrics = [
    { metric: 'Student Satisfaction', current: 94, target: 90, trend: '+2%' },
    { metric: 'Faculty Retention', current: 96, target: 95, trend: '+1%' },
    { metric: 'Research Output', current: 88, target: 85, trend: '+8%' },
    { metric: 'Industry Partnerships', current: 92, target: 90, trend: '+5%' },
    { metric: 'Alumni Network', current: 89, target: 85, trend: '+12%' },
    { metric: 'Innovation Index', current: 91, target: 88, trend: '+7%' }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Strategic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multi-Campus Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Multi-Campus Performance Overview
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={institutionalPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="institution" stroke="#6B7280" />
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
              <Bar dataKey="revenue" fill="#F59E0B" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Board Resolutions Tracking */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Board Resolutions Implementation
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={boardMeetingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Area type="monotone" dataKey="resolutions" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="implemented" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="pending" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strategic Initiatives & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategic Initiatives Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Strategic Initiatives Progress
          </h3>
          <div className="space-y-4">
            {strategicInitiatives.map((initiative, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">{initiative.initiative}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      initiative.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                      initiative.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {initiative.priority}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {initiative.progress}% • ₹{initiative.spent}Cr/₹{initiative.budget}Cr
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${initiative.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Compliance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Institutional Compliance Score
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={complianceData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="score"
                label={({ category, score }) => `${category}: ${score}%`}
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Board Approvals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pending Board Approvals</h3>
            <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">
              8 Pending
            </div>
          </div>
          <div className="space-y-3">
            {[
              { item: 'New Campus Expansion Plan', priority: 'high', date: 'Jan 20', amount: '₹50Cr' },
              { item: 'Faculty Salary Revision', priority: 'high', date: 'Jan 22', amount: '₹12Cr' },
              { item: 'Research Grant Allocation', priority: 'medium', date: 'Jan 25', amount: '₹8Cr' },
              { item: 'Infrastructure Upgrade', priority: 'medium', date: 'Jan 28', amount: '₹25Cr' },
              { item: 'International Partnership', priority: 'low', date: 'Feb 1', amount: '₹5Cr' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.priority === 'high' ? 'bg-red-500' :
                    item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.item}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.date} • {item.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global KPIs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Global Performance KPIs</h3>
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-4">
            {globalMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{metric.metric}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{metric.current}%</span>
                    <span className="text-xs text-green-600 dark:text-green-400 ml-1">{metric.trend}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      metric.current >= metric.target ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${metric.current}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Target: {metric.target}%</span>
                  <span>{metric.current >= metric.target ? 'Achieved' : 'In Progress'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Executive Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Executive Activities</h3>
            <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="space-y-3">
            {[
              { activity: 'Board Meeting Conducted', time: '2 hours ago', type: 'meeting', impact: 'high' },
              { activity: 'Strategic Plan Review', time: '1 day ago', type: 'planning', impact: 'high' },
              { activity: 'Campus Visit - North Campus', time: '2 days ago', type: 'visit', impact: 'medium' },
              { activity: 'Industry Partnership Signed', time: '3 days ago', type: 'partnership', impact: 'high' },
              { activity: 'Budget Approval Meeting', time: '4 days ago', type: 'financial', impact: 'high' },
              { activity: 'Faculty Recognition Ceremony', time: '5 days ago', type: 'event', impact: 'medium' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'meeting' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                  activity.type === 'planning' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' :
                  activity.type === 'visit' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                  activity.type === 'partnership' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                  activity.type === 'financial' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                  'bg-teal-100 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400'
                }`}>
                  {activity.type === 'meeting' ? <Calendar className="w-4 h-4" /> :
                   activity.type === 'planning' ? <Target className="w-4 h-4" /> :
                   activity.type === 'visit' ? <Building2 className="w-4 h-4" /> :
                   activity.type === 'partnership' ? <Briefcase className="w-4 h-4" /> :
                   activity.type === 'financial' ? <DollarSign className="w-4 h-4" /> :
                   <Award className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.activity}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.impact === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                      {activity.impact} impact
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial & Compliance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Financial Performance</h3>
            <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { metric: 'Total Revenue', value: '₹285Cr', change: '+22%', positive: true },
              { metric: 'Operating Profit', value: '₹68Cr', change: '+28%', positive: true },
              { metric: 'EBITDA Margin', value: '24%', change: '+3%', positive: true },
              { metric: 'ROI', value: '18%', change: '+2%', positive: true }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.metric}</p>
                <p className={`text-xs font-medium ${item.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {item.change}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Board Meetings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Board Meetings</h3>
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-3">
            {[
              { meeting: 'Quarterly Review Board Meeting', date: 'Jan 25, 2025', time: '10:00 AM', agenda: '8 items', type: 'quarterly' },
              { meeting: 'Budget Approval Meeting', date: 'Feb 2, 2025', time: '2:00 PM', agenda: '5 items', type: 'financial' },
              { meeting: 'Strategic Planning Session', date: 'Feb 8, 2025', time: '9:00 AM', agenda: '12 items', type: 'strategic' },
              { meeting: 'Campus Expansion Review', date: 'Feb 15, 2025', time: '11:00 AM', agenda: '6 items', type: 'expansion' }
            ].map((meeting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    meeting.type === 'quarterly' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                    meeting.type === 'financial' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                    meeting.type === 'strategic' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' :
                    'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                  }`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{meeting.meeting}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {meeting.date} • {meeting.time} • {meeting.agenda}
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

export default ChairpersonHomeDashboard;