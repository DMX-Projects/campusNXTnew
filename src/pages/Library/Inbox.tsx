import React, { useState, useEffect } from 'react';
import { Search, Filter, Mail, MailOpen, Archive, Trash2, Star, Calendar, User, Book, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderRole: 'librarian' | 'member' | 'admin' | 'system';
  subject: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'general' | 'overdue' | 'reservation' | 'fine' | 'system' | 'complaint';
  attachments?: string[];
}

const Inbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'John Smith',
      senderRole: 'member',
      subject: 'Book Return Extension Request',
      content: 'Hello, I would like to request an extension for "The Great Gatsby" which is due tomorrow. I am still reading it.',
      timestamp: new Date('2025-09-01T10:30:00'),
      isRead: false,
      isStarred: false,
      priority: 'medium',
      category: 'general'
    },
    {
      id: '2',
      sender: 'System',
      senderRole: 'system',
      subject: 'Overdue Book Alert - Member ID: 12345',
      content: 'Member Sarah Johnson has an overdue book: "Python Programming" (Due: 2025-08-28). Fine: $5.00',
      timestamp: new Date('2025-09-01T09:15:00'),
      isRead: false,
      isStarred: true,
      priority: 'high',
      category: 'overdue'
    },
    {
      id: '3',
      sender: 'Emily Davis',
      senderRole: 'librarian',
      subject: 'New Book Acquisition Recommendations',
      content: 'I have compiled a list of recommended books for our fall acquisition. Please review the attached list.',
      timestamp: new Date('2025-08-31T16:45:00'),
      isRead: true,
      isStarred: false,
      priority: 'low',
      category: 'general',
      attachments: ['book_recommendations.pdf']
    },
    {
      id: '4',
      sender: 'Michael Brown',
      senderRole: 'member',
      subject: 'Reservation Confirmation Required',
      content: 'Please confirm my reservation for the study room on September 5th, 2025 from 2-4 PM.',
      timestamp: new Date('2025-08-31T14:20:00'),
      isRead: false,
      isStarred: false,
      priority: 'medium',
      category: 'reservation'
    },
    {
      id: '5',
      sender: 'Lisa Wilson',
      senderRole: 'member',
      subject: 'Complaint: Damaged Book Received',
      content: 'I received a damaged copy of "Database Systems" today. Several pages are torn and there are coffee stains on the cover.',
      timestamp: new Date('2025-08-30T11:30:00'),
      isRead: true,
      isStarred: false,
      priority: 'high',
      category: 'complaint'
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRead, setFilterRead] = useState<string>('all');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || message.category === filterCategory;
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'read' && message.isRead) ||
                       (filterRead === 'unread' && !message.isRead);

    return matchesSearch && matchesCategory && matchesRead;
  });

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const toggleStar = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'reservation': return 'bg-blue-100 text-blue-800';
      case 'fine': return 'bg-orange-100 text-orange-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      case 'complaint': return 'bg-purple-100 text-purple-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Library Inbox
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
        </div>

        {/* Search and Filters */}
        <div className="p-4 space-y-3 border-b border-gray-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="overdue">Overdue</option>
              <option value="reservation">Reservations</option>
              <option value="fine">Fines</option>
              <option value="system">System</option>
              <option value="complaint">Complaints</option>
            </select>
            
            <select
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
              } ${!message.isRead ? 'bg-blue-25' : ''}`}
              onClick={() => {
                setSelectedMessage(message);
                if (!message.isRead) {
                  markAsRead(message.id);
                }
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {!message.isRead ? (
                    <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  ) : (
                    <MailOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={`font-medium truncate ${!message.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                    {message.sender}
                  </span>
                  {getPriorityIcon(message.priority)}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(message.id);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Star className={`w-4 h-4 ${message.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>
              
              <h3 className={`text-sm mb-1 truncate ${!message.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                {message.subject}
              </h3>
              
              <p className="text-xs text-gray-500 truncate mb-2">
                {message.content}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(message.category)}`}>
                  {message.category}
                </span>
                <span className="text-xs text-gray-400">
                  {message.timestamp.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
          
          {filteredMessages.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No messages found</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            {/* Message Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{selectedMessage.sender}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedMessage.senderRole === 'admin' ? 'bg-purple-100 text-purple-800' :
                        selectedMessage.senderRole === 'librarian' ? 'bg-blue-100 text-blue-800' :
                        selectedMessage.senderRole === 'system' ? 'bg-gray-100 text-gray-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedMessage.senderRole}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedMessage.timestamp.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {getPriorityIcon(selectedMessage.priority)}
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(selectedMessage.category)}`}>
                    {selectedMessage.category}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStar(selectedMessage.id)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Star className={`w-4 h-4 ${selectedMessage.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                  {selectedMessage.isStarred ? 'Unstar' : 'Star'}
                </button>
                
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Archive className="w-4 h-4 text-gray-600" />
                  Archive
                </button>
                
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="flex items-center gap-2 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                
                <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Reply
                </button>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 bg-white p-6 overflow-y-auto">
              <div className="max-w-3xl">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.content}
                  </p>
                </div>

                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Book className="w-4 h-4" />
                      Attachments
                    </h4>
                    <div className="space-y-2">
                      {selectedMessage.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                          <span>📎</span>
                          <span>{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions for specific categories */}
                {selectedMessage.category === 'overdue' && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <h4 className="text-sm font-medium text-red-900 mb-3">Quick Actions</h4>
                    <div className="flex gap-2">
                      <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                        Send Reminder
                      </button>
                      <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                        Add to Collection Queue
                      </button>
                    </div>
                  </div>
                )}

                {selectedMessage.category === 'reservation' && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-3">Reservation Actions</h4>
                    <div className="flex gap-2">
                      <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Confirm Reservation
                      </button>
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Check Availability
                      </button>
                      <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                        Decline
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* No Message Selected */
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center text-gray-500">
              <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Select a message to view</h3>
              <p className="text-sm">Choose a message from the inbox to read its contents</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Sidebar */}
      <div className="w-64 bg-white border-l border-gray-200 p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Inbox Statistics</h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Unread Messages</span>
              <span className="font-semibold text-blue-900">{unreadCount}</span>
            </div>
          </div>
          
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-700">High Priority</span>
              <span className="font-semibold text-red-900">
                {messages.filter(m => m.priority === 'high').length}
              </span>
            </div>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-700">Overdue Items</span>
              <span className="font-semibold text-orange-900">
                {messages.filter(m => m.category === 'overdue').length}
              </span>
            </div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">Complaints</span>
              <span className="font-semibold text-purple-900">
                {messages.filter(m => m.category === 'complaint').length}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-medium text-gray-800 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Compose Message
            </button>
            <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Mark All as Read
            </button>
            <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Export Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;