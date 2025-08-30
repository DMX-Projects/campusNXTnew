import React, { useState } from 'react';
import { Send, Bell, Mail, Phone, MessageSquare, Users, Filter, Plus, AlertTriangle, DollarSign } from 'lucide-react';
import { alerts, members } from './Data/mockData';

export default function Alerts() {
  const [activeTab, setActiveTab] = useState<'send' | 'history'>('send');
  const [alertType, setAlertType] = useState('Overdue');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const alertTemplates = {
    Overdue: {
      subject: 'Overdue Book Return Notice',
      message: 'Dear [Member Name],\n\nYour book "[Book Title]" was due on [Due Date] and is now overdue. Please return it as soon as possible to avoid additional fines.\n\nCurrent fine: $[Fine Amount]\n\nThank you,\nLibrary Staff'
    },
    Reservation: {
      subject: 'Book Reservation Available',
      message: 'Dear [Member Name],\n\nYour reserved book "[Book Title]" is now available for pickup. Please collect it within 3 days to maintain your reservation.\n\nThank you,\nLibrary Staff'
    },
    Fine: {
      subject: 'Outstanding Library Fine',
      message: 'Dear [Member Name],\n\nYou have an outstanding fine of $[Fine Amount] for the late return of "[Book Title]". Please settle this amount at your earliest convenience.\n\nThank you,\nLibrary Staff'
    },
    System: {
      subject: 'Library System Notice',
      message: 'Dear [Member Name],\n\nThis is a system notification regarding your library account. Please contact us if you have any questions.\n\nThank you,\nLibrary Staff'
    }
  };

  const handleTemplateSelect = (type: string) => {
    const template = alertTemplates[type as keyof typeof alertTemplates];
    setSubject(template.subject);
    setMessage(template.message);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Reservation': return 'bg-blue-100 text-blue-800';
      case 'Fine': return 'bg-orange-100 text-orange-800';
      case 'System': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Bell className="h-6 w-6 text-blue-600" />
          Send Alerts
        </h2>
        <p className="text-gray-600">Send notifications to library members</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('send')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'send'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Send className="h-4 w-4" />
          Send Alert
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          Alert History
        </button>
      </div>

      {activeTab === 'send' && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition-colors">
              <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-red-800">Send Overdue Reminders</p>
              <p className="text-xs text-red-600 mt-1">12 members</p>
            </button>
            
            <button className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors">
              <Bell className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">Reservation Alerts</p>
              <p className="text-xs text-blue-600 mt-1">8 members</p>
            </button>
            
            <button className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:bg-orange-100 transition-colors">
              <DollarSign className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-orange-800">Fine Notices</p>
              <p className="text-xs text-orange-600 mt-1">5 members</p>
            </button>
            
            <button className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition-colors">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-800">Bulk Notification</p>
              <p className="text-xs text-purple-600 mt-1">All members</p>
            </button>
          </div>

          {/* Alert Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Compose Alert</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
                  <select
                    value={alertType}
                    onChange={(e) => {
                      setAlertType(e.target.value);
                      handleTemplateSelect(e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Overdue">Overdue</option>
                    <option value="Reservation">Reservation</option>
                    <option value="Fine">Fine</option>
                    <option value="System">System</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Method</label>
                  <div className="flex gap-2">
                    <button type="button" className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
                      <Mail className="h-4 w-4" />
                      Email
                    </button>
                    <button type="button" className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      <Phone className="h-4 w-4" />
                      SMS
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                <div className="flex gap-2 mb-2">
                  <button type="button" className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                    All Members
                  </button>
                  <button type="button" className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                    Overdue Members
                  </button>
                  <button type="button" className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                    Students
                  </button>
                  <button type="button" className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                    Faculty
                  </button>
                </div>
                <textarea
                  placeholder="Enter email addresses (comma separated) or select from quick options above"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use placeholders: [Member Name], [Book Title], [Due Date], [Fine Amount]
                </p>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className="flex gap-2">
                  <button type="button" className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Save as Template
                  </button>
                  <button type="button" className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Preview
                  </button>
                </div>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Send Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <p className="text-sm font-medium text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">247</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">38</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600 mt-1">96.3%</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600 mt-1">9</p>
            </div>
          </div>

          {/* Alert History */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Alert History</h3>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option>All Types</option>
                  <option>Overdue</option>
                  <option>Reservation</option>
                  <option>Fine</option>
                  <option>System</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alerts.map((alert) => (
                    <tr key={alert.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(alert.createdDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(alert.type)}`}>
                          {alert.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {alert.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {alert.recipient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}