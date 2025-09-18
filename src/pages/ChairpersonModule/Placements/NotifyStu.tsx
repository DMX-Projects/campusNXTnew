// pages/NotifyStu.tsx
import React, { useState } from 'react';
import { 
  BellIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const NotifyStu: React.FC = () => {
  const [activeTab, setActiveTab] = useState('compose');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Placement Drive - TCS Campus Recruitment',
      message: 'TCS is conducting campus recruitment on September 15, 2025. Eligible students should register by September 10.',
      type: 'placement',
      priority: 'high',
      recipients: 'Computer Science & IT Students',
      sentDate: '2025-09-01',
      sentTime: '10:30 AM',
      status: 'sent',
      recipientCount: 234,
      readCount: 189,
      createdBy: 'Admin'
    },
    {
      id: 2,
      title: 'Resume Review Session',
      message: 'Free resume review session scheduled for September 8, 2025. Book your slot now.',
      type: 'info',
      priority: 'medium',
      recipients: 'All 4th Year Students',
      sentDate: '2025-08-30',
      sentTime: '02:15 PM',
      status: 'sent',
      recipientCount: 450,
      readCount: 387,
      createdBy: 'Placement Officer'
    },
    {
      id: 3,
      title: 'Document Verification Required',
      message: 'Please submit your updated documents for placement eligibility verification.',
      type: 'urgent',
      priority: 'high',
      recipients: 'Selected Students',
      sentDate: '2025-08-28',
      sentTime: '11:45 AM',
      status: 'sent',
      recipientCount: 45,
      readCount: 32,
      createdBy: 'Admin'
    }
  ]);

  const [newNotification, setNewNotification] = useState({
    title: '',
    priority: 'low',
    type: 'info',
    recipients: 'all',
    message: ''
  });

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  const students = [
    { id: 1, name: 'Rahul Sharma', rollNumber: 'CS21001', department: 'Computer Science', year: '4th Year', email: 'rahul.sharma@college.edu', phone: '+91 98765 43210' },
    { id: 2, name: 'Priya Patel', rollNumber: 'IT21002', department: 'Information Technology', year: '4th Year', email: 'priya.patel@college.edu', phone: '+91 87654 32109' },
    { id: 3, name: 'Amit Kumar', rollNumber: 'EC21003', department: 'Electronics', year: '4th Year', email: 'amit.kumar@college.edu', phone: '+91 76543 21098' }
  ];

  const stats = [
    { name: 'Total Notifications', value: notifications.length.toString(), icon: BellIcon, color: 'bg-blue-500' },
    { name: 'Sent Today', value: '12', icon: PaperAirplaneIcon, color: 'bg-green-500' },
    { name: 'Active Recipients', value: '1,247', icon: UserGroupIcon, color: 'bg-purple-500' },
    { name: 'Read Rate', value: '84%', icon: CheckCircleIcon, color: 'bg-yellow-500' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <ExclamationTriangleIcon className="w-5 h-5" />;
      case 'info': return <InformationCircleIcon className="w-5 h-5" />;
      case 'placement': return <BellIcon className="w-5 h-5" />;
      default: return <InformationCircleIcon className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'placement': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStudentSelect = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedStudents(
      selectedStudents.length === students.length 
        ? [] 
        : students.map(student => student.id)
    );
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotification.title || !newNotification.message) return;

    const now = new Date();
    const newEntry = {
      id: notifications.length + 1,
      ...newNotification,
      sentDate: now.toISOString().split('T')[0],
      sentTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      recipientCount: 100,
      readCount: 0,
      createdBy: 'You'
    };

    setNotifications([newEntry, ...notifications]);
    setActiveTab('sent'); // go to Sent tab after sending
    setNewNotification({ title: '', priority: 'low', type: 'info', recipients: 'all', message: '' });
  };

  const openDetailsModal = (notification: any) => {
    setSelectedNotification(notification);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Notify Students</h1>
        <button
          onClick={() => setActiveTab('compose')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
          <span>Send Notification</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'compose', label: 'Compose' },
              { key: 'sent', label: 'Sent Notifications' },
            //   { key: 'recipients', label: 'Manage Recipients' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Compose Tab */}
          {activeTab === 'compose' && (
            <form onSubmit={handleSendNotification} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
                  <input
                    type="text"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter notification title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newNotification.priority}
                    onChange={(e) => setNewNotification({ ...newNotification, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
                  <select
                    value={newNotification.type}
                    onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="info">Information</option>
                    <option value="placement">Placement</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                  <select
                    value={newNotification.recipients}
                    onChange={(e) => setNewNotification({ ...newNotification, recipients: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Students</option>
                    <option value="year4">4th Year Students</option>
                    <option value="cs">Computer Science</option>
                    <option value="it">Information Technology</option>
                    <option value="ec">Electronics</option>
                    <option value="selected">Selected Students</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your notification message here..."
                ></textarea>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  <span>Send Now</span>
                </button>
              </div>
            </form>
          )}

          {/* Sent Notifications Tab */}
          {activeTab === 'sent' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                            {getTypeIcon(notification.type)}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(notification.priority)}`}>
                            {notification.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{notification.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <UserGroupIcon className="w-4 h-4 text-gray-500" />
                          <span>{notification.recipientCount} recipients</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <EyeIcon className="w-4 h-4 text-green-500" />
                          <span>{notification.readCount} read</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openDetailsModal(notification)}
                          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                        >
                          View Details
                        </button>
                        <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
                          Resend
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recipients Tab */}
          {activeTab === 'recipients' && (
            <div>… (same as before) …</div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedNotification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedNotification.title}</h2>
            <p className="mb-4 text-gray-700">{selectedNotification.message}</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Type:</strong> {selectedNotification.type}</p>
              <p><strong>Priority:</strong> {selectedNotification.priority}</p>
              <p><strong>Recipients:</strong> {selectedNotification.recipients}</p>
              <p><strong>Sent On:</strong> {selectedNotification.sentDate} at {selectedNotification.sentTime}</p>
              <p><strong>Created By:</strong> {selectedNotification.createdBy}</p>
              <p><strong>Recipients Count:</strong> {selectedNotification.recipientCount}</p>
              <p><strong>Read Count:</strong> {selectedNotification.readCount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotifyStu;
