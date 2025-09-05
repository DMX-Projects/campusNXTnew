
import React, { useState } from 'react';
import {
  Send,
  Search,
  Filter,
  ChevronDown,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  School,
  Calendar,
  Reply,
  Trash2,
  Archive,
  Star,
} from 'lucide-react';

interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
  type: 'received' | 'sent';
  category: 'academic' | 'administrative' | 'event' | 'general';
}

const ParentMessages: React.FC = () => {
  // Set current user role here
  const userRole = 'faculty'; // change to 'admin' or other roles as needed

  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'compose'>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sample messages data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'Academic Office',
      to: 'Parent',
      subject: 'Mid-term Examination Schedule',
      content:
        'Dear Parent, This is to inform you that the mid-term examinations for your ward will commence from March 15th, 2025. Please ensure your child is well-prepared. Detailed schedule is attached.',
      timestamp: '2025-03-01T10:30:00Z',
      status: 'unread',
      priority: 'high',
      type: 'received',
      category: 'academic',
    },
    {
      id: '2',
      from: 'Accounts Department',
      to: 'Parent',
      subject: 'Fee Payment Reminder',
      content:
        'Dear Parent, This is a friendly reminder that the semester fee payment is due by March 10th, 2025. Please make the payment to avoid any late fees.',
      timestamp: '2025-02-28T14:15:00Z',
      status: 'read',
      priority: 'medium',
      type: 'received',
      category: 'administrative',
    },
    {
      id: '3',
      from: 'You',
      to: 'Class Teacher',
      subject: 'Request for Leave',
      content:
        'Dear Teacher, I would like to request leave for my child from March 5th to March 7th due to family function. Please let me know if any assignments need to be completed.',
      timestamp: '2025-02-27T09:45:00Z',
      status: 'replied',
      priority: 'medium',
      type: 'sent',
      category: 'general',
    },
    {
      id: '4',
      from: 'Events Committee',
      to: 'Parent',
      subject: 'Annual Day Celebration',
      content:
        'We are excited to invite you to our Annual Day celebration on March 20th, 2025. Your child has been selected to participate in the cultural program.',
      timestamp: '2025-02-26T16:20:00Z',
      status: 'read',
      priority: 'low',
      type: 'received',
      category: 'event',
    },
  ]);

  const [composeForm, setComposeForm] = useState({
    to: '',
    subject: '',
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || message.category === filterCategory;
    const matchesTab =
      activeTab === 'inbox' ? message.type === 'received' : activeTab === 'sent' ? message.type === 'sent' : true;
    return matchesSearch && matchesCategory && matchesTab;
  });

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'read':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'replied':
        return <Reply className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleSendMessage = () => {
    if (composeForm.to && composeForm.subject && composeForm.content) {
      const newMessage: Message = {
        id: Date.now().toString(),
        from: 'You',
        to: composeForm.to,
        subject: composeForm.subject,
        content: composeForm.content,
        timestamp: new Date().toISOString(),
        status: 'read',
        priority: composeForm.priority,
        type: 'sent',
        category: 'general',
      };

      setMessages([newMessage, ...messages]);
      setComposeForm({ to: '', subject: '', content: '', priority: 'medium' });
      setActiveTab('sent');
      setSelectedMessage(null);
    }
  };

  // Define recipients based on userRole
  const recipientOptions =
    userRole === 'faculty'
      ? [
          { value: 'Class Teacher', label: 'Class Teacher' },
          { value: 'Academic Office', label: 'Academic Office' },
          { value: 'Principal', label: 'Principal' },
        ]
      : [
          { value: 'Academic Office', label: 'Academic Office' },
          { value: 'Accounts Department', label: 'Accounts Department' },
          { value: 'Class Teacher', label: 'Class Teacher' },
          { value: 'Principal', label: 'Principal' },
          { value: 'Hostel Warden', label: 'Hostel Warden' },
          { value: 'Transport Department', label: 'Transport Department' },
        ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <School className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Parent Messages</h1>
                  <p className="text-sm text-gray-600">Communication with college administration</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {messages.filter((m) => m.status === 'unread').length} Unread
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'inbox' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Inbox ({messages.filter((m) => m.type === 'received').length})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'sent' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Sent ({messages.filter((m) => m.type === 'sent').length})
            </button>
            <button
              onClick={() => setActiveTab('compose')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'compose' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Compose New
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Messages List */}
          {activeTab !== 'compose' && (
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Search and Filters */}
                <div className="p-4 border-b border-gray-200">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Filter className="w-4 h-4" />
                      <span>Filters</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {showFilters && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <label className="block text-xs font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Categories</option>
                        <option value="academic">Academic</option>
                        <option value="administrative">Administrative</option>
                        <option value="event">Events</option>
                        <option value="general">General</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Messages List */}
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                      } ${message.status === 'unread' ? 'bg-blue-25' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            {message.type === 'received' ? (
                              <User className="w-8 h-8 text-gray-400 bg-gray-100 rounded-full p-1.5" />
                            ) : (
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                Me
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm truncate ${message.status === 'unread' ? 'font-semibold' : 'font-medium'}`}>
                              {message.from}
                            </p>
                            <p className="text-xs text-gray-500">{formatDateTime(message.timestamp)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(message.status)}
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                              message.priority
                            )}`}
                          >
                            {message.priority}
                          </span>
                        </div>
                      </div>
                      <h3 className={`text-sm mb-1 ${message.status === 'unread' ? 'font-semibold' : 'font-medium'}`}>
                        {message.subject}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {message.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Message Detail or Compose */}
          <div className={activeTab === 'compose' ? 'lg:col-span-12' : 'lg:col-span-7 xl:col-span-8'}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {activeTab === 'compose' ? (
                /* Compose Form */
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Compose New Message</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                      <select
                        value={composeForm.to}
                        onChange={(e) => setComposeForm({ ...composeForm, to: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select recipient...</option>
                        {userRole === 'faculty' ? (
                          <>
                            <option value="Class Teacher">Class Teacher</option>
                            <option value="HOD">HOD</option>
                            <option value="Principal">Principal</option>
                          </>
                        ) : (
                          <>
                            <option value="HOD">HOD</option>
                            <option value="Accounts Department">Accounts Department</option>
                            <option value="Class Teacher">Class Teacher</option>
                            <option value="Principal">Principal</option>
                            <option value="Hostel Warden">Hostel Warden</option>
                            <option value="Transport Department">Transport Department</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        value={composeForm.subject}
                        onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
                        placeholder="Enter subject..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={composeForm.priority}
                        onChange={(e) =>
                          setComposeForm({ ...composeForm, priority: e.target.value as 'low' | 'medium' | 'high' })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        value={composeForm.content}
                        onChange={(e) => setComposeForm({ ...composeForm, content: e.target.value })}
                        rows={8}
                        placeholder="Type your message..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <button
                        onClick={() => setComposeForm({ to: '', subject: '', content: '', priority: 'medium' })}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Clear
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!composeForm.to || !composeForm.subject || !composeForm.content}
                        className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : selectedMessage ? (
                /* Message Detail */
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>From: {selectedMessage.from}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDateTime(selectedMessage.timestamp)}</span>
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            selectedMessage.priority
                          )}`}
                        >
                          {selectedMessage.priority} priority
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-yellow-500 transition-colors">
                        <Star className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                        <Archive className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{selectedMessage.content}</p>
                    </div>
                  </div>

                  {selectedMessage.type === 'received' && (
                    <div className="border-t border-gray-200 pt-6">
                      <button
                        onClick={() => {
                          setComposeForm({
                            ...composeForm,
                            to: selectedMessage.from,
                            subject: `Re: ${selectedMessage.subject}`,
                          });
                          setActiveTab('compose');
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Reply className="w-4 h-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* No Message Selected */
                <div className="p-6 text-center">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No message selected</h3>
                    <p className="text-gray-600">Select a message from the list to view its content</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentMessages;
