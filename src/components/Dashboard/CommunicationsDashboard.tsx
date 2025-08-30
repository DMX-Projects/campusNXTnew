import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from './DashboardCard';
import { MessageSquare, Mail, Bell, Users, TrendingUp, Send, Phone, MessageCircle } from 'lucide-react';

const CommunicationsDashboard: React.FC = () => {
  const cardData = [
    { title: 'Messages Sent', value: '12,456', change: '+18%', trend: 'up' as const, icon: Send, color: 'bg-blue-500' },
    { title: 'Email Campaigns', value: '45', change: '+8', trend: 'up' as const, icon: Mail, color: 'bg-green-500' },
    { title: 'Push Notifications', value: '234', change: '+25%', trend: 'up' as const, icon: Bell, color: 'bg-purple-500' },
    { title: 'SMS Sent', value: '8,967', change: '+12%', trend: 'up' as const, icon: MessageSquare, color: 'bg-orange-500' },
    { title: 'WhatsApp Messages', value: '5,678', change: '+35%', trend: 'up' as const, icon: MessageCircle, color: 'bg-teal-500' },
    { title: 'Response Rate', value: '78%', change: '+5%', trend: 'up' as const, icon: TrendingUp, color: 'bg-indigo-500' }
  ];

  const communicationChannels = [
    { month: 'Aug', email: 1245, sms: 2890, whatsapp: 1560, push: 890 },
    { month: 'Sep', email: 1156, sms: 2654, whatsapp: 1789, push: 945 },
    { month: 'Oct', email: 1334, sms: 2987, whatsapp: 1923, push: 1023 },
    { month: 'Nov', email: 1278, sms: 3156, whatsapp: 2045, push: 1156 },
    { month: 'Dec', email: 1456, sms: 3289, whatsapp: 2234, push: 1234 },
    { month: 'Jan', email: 1567, sms: 3456, whatsapp: 2456, push: 1345 }
  ];

  const audienceSegments = [
    { segment: 'Students', count: 2847, color: '#3B82F6' },
    { segment: 'Faculty', count: 186, color: '#10B981' },
    { segment: 'Parents', count: 2456, color: '#F59E0B' },
    { segment: 'Alumni', count: 1234, color: '#EF4444' },
    { segment: 'Staff', count: 89, color: '#8B5CF6' }
  ];

  const campaignPerformance = [
    { campaign: 'Exam Notifications', sent: 2847, opened: 2456, clicked: 1234, rate: 86.3 },
    { campaign: 'Fee Reminders', sent: 1234, opened: 987, clicked: 456, rate: 80.0 },
    { campaign: 'Event Announcements', sent: 3456, opened: 2890, clicked: 1567, rate: 83.6 },
    { campaign: 'Academic Updates', sent: 2456, opened: 2123, clicked: 1089, rate: 86.4 },
    { campaign: 'Placement Alerts', sent: 567, opened: 489, clicked: 234, rate: 86.2 }
  ];

  const messageCredits = [
    { service: 'SMS Credits', remaining: 45000, used: 15000, total: 60000 },
    { service: 'Email Credits', remaining: 95000, used: 5000, total: 100000 },
    { service: 'WhatsApp Credits', remaining: 25000, used: 10000, total: 35000 },
    { service: 'Push Notifications', remaining: 'Unlimited', used: 1234, total: 'Unlimited' }
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
        {/* Communication Channels Usage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Communication Channels Usage
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={communicationChannels}>
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
              <Bar dataKey="email" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="sms" fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="whatsapp" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="push" fill="#EF4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Audience Segments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Audience Segments
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceSegments}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ segment, count }) => `${segment}: ${count}`}
              >
                {audienceSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Recent Campaign Performance
          </h3>
          <div className="space-y-3">
            {campaignPerformance.map((campaign, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{campaign.campaign}</h4>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{campaign.rate}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="font-medium text-gray-900 dark:text-white">{campaign.sent}</p>
                    <p className="text-gray-500 dark:text-gray-400">Sent</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-blue-600 dark:text-blue-400">{campaign.opened}</p>
                    <p className="text-gray-500 dark:text-gray-400">Opened</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-green-600 dark:text-green-400">{campaign.clicked}</p>
                    <p className="text-gray-500 dark:text-gray-400">Clicked</p>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                  <div 
                    className="bg-green-500 h-1 rounded-full"
                    style={{ width: `${campaign.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Credits */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Message Credits Status
          </h3>
          <div className="space-y-4">
            {messageCredits.map((credit, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{credit.service}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {credit.remaining === 'Unlimited' ? 'Unlimited' : `${credit.remaining.toLocaleString()} remaining`}
                  </span>
                </div>
                {credit.remaining !== 'Unlimited' && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (credit.remaining / credit.total) > 0.5 ? 'bg-green-500' :
                        (credit.remaining / credit.total) > 0.2 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(credit.remaining / credit.total) * 100}%` }}
                    ></div>
                  </div>
                )}
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Used: {credit.used.toLocaleString()}</span>
                  <span>Total: {credit.total === 'Unlimited' ? 'Unlimited' : credit.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationsDashboard;