import React, { useState } from 'react';
import { Search, Mail, MailOpen, Calendar, User, FileText, AlertCircle, CheckCircle, Clock, GraduationCap } from 'lucide-react';

interface ExamMessage {
  id: string;
  sender: string;
  senderRole: 'faculty' | 'student' | 'admin' | 'system';
  subject: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'exam_schedule' | 'grade_submission' | 'revaluation' | 'postponement' | 'general' | 'urgent';
}

const ExamInbox: React.FC = () => {
  const [messages, setMessages] = useState<ExamMessage[]>([
    {
      id: '1',
      sender: 'Dr. Sarah Williams',
      senderRole: 'faculty',
      subject: 'Grade Submission Deadline Extension Request',
      content: 'I need a 2-day extension for submitting grades for CSE-301 due to unforeseen circumstances. The current deadline is September 5th.',
      timestamp: new Date('2025-09-02T09:30:00'),
      isRead: false,
      priority: 'high',
      category: 'grade_submission'
    },
    {
      id: '2',
      sender: 'System',
      senderRole: 'system',
      subject: 'Exam Schedule Conflict Alert - Room 203',
      content: 'Schedule conflict detected: Two exams are scheduled in Room 203 on September 8th at 10:00 AM. Please resolve this conflict.',
      timestamp: new Date('2025-09-02T08:15:00'),
      isRead: false,
      priority: 'high',
      category: 'exam_schedule'
    },
    {
      id: '3',
      sender: 'John Mitchell',
      senderRole: 'student',
      subject: 'Revaluation Request - ENG-202',
      content: 'I would like to request revaluation for my ENG-202 exam. Student ID: 2021CS001. I believe there may have been an error in grading.',
      timestamp: new Date('2025-09-01T16:45:00'),
      isRead: true,
      priority: 'medium',
      category: 'revaluation'
    },
    {
      id: '4',
      sender: 'Prof. Michael Brown',
      senderRole: 'faculty',
      subject: 'Medical Emergency - Exam Postponement',
      content: 'I have a medical emergency and need to postpone the MATH-301 exam scheduled for September 6th. Please advise on rescheduling.',
      timestamp: new Date('2025-09-01T14:20:00'),
      isRead: false,
      priority: 'high',
      category: 'postponement'
    },
    {
      id: '5',
      sender: 'Admin Office',
      senderRole: 'admin',
      subject: 'Semester Exam Schedule Released',
      content: 'The complete semester examination schedule has been released and is available on the portal. Please review and confirm.',
      timestamp: new Date('2025-08-31T11:30:00'),
      isRead: true,
      priority: 'medium',
      category: 'exam_schedule'
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<ExamMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || message.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
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
      case 'exam_schedule': return 'bg-blue-100 text-blue-800';
      case 'grade_submission': return 'bg-green-100 text-green-800';
      case 'revaluation': return 'bg-purple-100 text-purple-800';
      case 'postponement': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;
  const highPriorityCount = messages.filter(msg => msg.priority === 'high').length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            Examination Inbox
          </h1>
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                {unreadCount} unread
              </span>
            )}
            {highPriorityCount > 0 && (
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                {highPriorityCount} urgent
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Sidebar - Messages List */}
        <div className={`w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
          {/* Search and Filter */}
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
            
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="exam_schedule">Exam Schedule</option>
              <option value="grade_submission">Grade Submission</option>
              <option value="revaluation">Revaluation</option>
              <option value="postponement">Postponement</option>
              <option value="general">General</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
                } ${!message.isRead ? 'bg-blue-25 border-l-4 border-l-blue-500' : ''}`}
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
                    <span className={`font-medium truncate text-sm ${!message.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                      {message.sender}
                    </span>
                  </div>
                  {getPriorityIcon(message.priority)}
                </div>
                
                <h3 className={`text-sm mb-1 truncate ${!message.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                  {message.subject}
                </h3>
                
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(message.category)}`}>
                    {message.category.replace('_', ' ')}
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
        <div className={`flex-1 flex flex-col ${selectedMessage ? 'flex' : 'hidden lg:flex'}`}>
          {selectedMessage ? (
            <>
              {/* Back button for mobile */}
              <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-blue-600 text-sm font-medium"
                >
                  ← Back to Messages
                </button>
              </div>

              {/* Message Header */}
              <div className="bg-white border-b border-gray-200 p-4 md:p-6">
                <div className="mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{selectedMessage.sender}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedMessage.senderRole === 'admin' ? 'bg-purple-100 text-purple-800' :
                        selectedMessage.senderRole === 'faculty' ? 'bg-blue-100 text-blue-800' :
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

                <div className="flex flex-wrap items-center gap-2">
                  {getPriorityIcon(selectedMessage.priority)}
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(selectedMessage.category)}`}>
                    {selectedMessage.category.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 bg-white p-4 md:p-6 overflow-y-auto">
                <div className="max-w-4xl">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedMessage.content}
                  </p>

                  {/* Quick Actions based on category */}
                  {selectedMessage.category === 'grade_submission' && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <h4 className="text-sm font-medium text-green-900 mb-3">Grade Submission Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Approve Extension
                        </button>
                        <button className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm">
                          Request Details
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedMessage.category === 'exam_schedule' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-3">Schedule Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Resolve Conflict
                        </button>
                        <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                          View Schedule
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedMessage.category === 'revaluation' && (
                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <h4 className="text-sm font-medium text-purple-900 mb-3">Revaluation Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                          Approve Request
                        </button>
                        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                          Assign Evaluator
                        </button>
                        <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                          Reject
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedMessage.category === 'postponement' && (
                    <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                      <h4 className="text-sm font-medium text-orange-900 mb-3">Postponement Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Approve & Reschedule
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Check Availability
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
                <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Select a message to view</h3>
                <p className="text-sm">Choose a message from the inbox to read its contents</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Panel - Hidden on mobile when message is selected */}
        <div className={`w-full lg:w-64 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 ${selectedMessage ? 'hidden lg:block' : 'block'}`}>
          <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
          
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Unread</span>
                <span className="font-semibold text-blue-900">{unreadCount}</span>
              </div>
            </div>
            
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-700">High Priority</span>
                <span className="font-semibold text-red-900">{highPriorityCount}</span>
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Grade Submissions</span>
                <span className="font-semibold text-green-900">
                  {messages.filter(m => m.category === 'grade_submission').length}
                </span>
              </div>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-700">Revaluations</span>
                <span className="font-semibold text-purple-900">
                  {messages.filter(m => m.category === 'revaluation').length}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                View Schedule
              </button>
              <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInbox;