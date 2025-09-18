 // FacultyInbox.tsx
import React, { useState, useMemo } from 'react';
import { 
  Inbox, 
  Mail, 
  MailOpen, 
  Send, 
  Reply, 
  Trash2, 
  Search, 
  Filter, 
  Star,
  Archive,
  Plus,
  X,
  Paperclip,
  Eye,
  AlertCircle,
  User,
  Calendar,
  ChevronLeft
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderType: 'admin' | 'hod' | 'faculty' | 'student';
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  priority: 'low' | 'medium' | 'high';
  hasAttachment: boolean;
  category: 'official' | 'academic' | 'personal' | 'announcement';
}

interface FacultyInfo {
  name: string;
  email: string;
  department: string;
}

const FacultyInbox: React.FC = () => {
  // Sample messages data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Dr. Academic Dean',
      senderType: 'admin',
      recipient: 'Dr. Rajesh Kumar',
      subject: 'Faculty Meeting - Curriculum Review',
      body: 'Dear Faculty,\n\nThis is to inform you about the upcoming faculty meeting scheduled for Friday, September 8th at 3:00 PM in the conference hall. We will be discussing the curriculum review for the upcoming semester.\n\nPlease ensure your attendance.\n\nBest regards,\nAcademic Dean',
      timestamp: '2025-09-03T14:30:00',
      isRead: false,
      isStarred: true,
      isArchived: false,
      priority: 'high',
      hasAttachment: false,
      category: 'official'
    },
    {
      id: '2',
      sender: 'HOD - Computer Science',
      senderType: 'hod',
      recipient: 'Dr. Rajesh Kumar',
      subject: 'Syllabus Completion Report Due',
      body: 'Dear Dr. Kumar,\n\nKindly submit your syllabus completion report for all subjects by end of this week. Please include:\n- Current completion percentage\n- Topics covered\n- Pending topics\n- Expected completion date\n\nThanks,\nHOD - CSE',
      timestamp: '2025-09-02T11:15:00',
      isRead: false,
      isStarred: false,
      isArchived: false,
      priority: 'medium',
      hasAttachment: false,
      category: 'academic'
    },
    {
      id: '3',
      sender: 'Priya Sharma - Student',
      senderType: 'student',
      recipient: 'Dr. Rajesh Kumar',
      subject: 'Query regarding Data Structures Assignment',
      body: 'Dear Sir,\n\nI have some doubts regarding the Binary Tree assignment. Could you please clarify the following:\n1. Should we implement AVL trees or simple BST?\n2. What is the expected time complexity?\n\nI would appreciate if you could spare some time to discuss this.\n\nThank you,\nPriya Sharma\nRoll No: CS101',
      timestamp: '2025-09-01T16:45:00',
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: 'low',
      hasAttachment: false,
      category: 'academic'
    },
    {
      id: '4',
      sender: 'System Admin',
      senderType: 'admin',
      recipient: 'Dr. Rajesh Kumar',
      subject: 'Password Reset Notification',
      body: 'Your ERP system password was successfully reset on 2025-09-01 at 10:30 AM. If this was not initiated by you, please contact IT support immediately.',
      timestamp: '2025-09-01T10:30:00',
      isRead: true,
      isStarred: false,
      isArchived: true,
      priority: 'medium',
      hasAttachment: false,
      category: 'official'
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposingNew, setIsComposingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | string>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'starred' | 'archived'>('inbox');

  // Faculty information
  const facultyInfo: FacultyInfo = {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@college.edu',
    department: 'Computer Science Engineering'
  };

  // Compose form state
  const [composeForm, setComposeForm] = useState({
    to: '',
    subject: '',
    body: '',
    priority: 'medium' as const,
    category: 'academic' as const
  });

  // Filter messages based on active tab and filters
  const filteredMessages = useMemo(() => {
    let filtered = messages;

    // Filter by tab
    switch (activeTab) {
      case 'sent':
        filtered = filtered.filter(msg => msg.sender === facultyInfo.name);
        break;
      case 'starred':
        filtered = filtered.filter(msg => msg.isStarred);
        break;
      case 'archived':
        filtered = filtered.filter(msg => msg.isArchived);
        break;
      default:
        filtered = filtered.filter(msg => !msg.isArchived && msg.recipient === facultyInfo.name);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(msg => msg.category === filterCategory);
    }

    // Filter by read status
    if (filterRead !== 'all') {
      filtered = filtered.filter(msg => 
        filterRead === 'read' ? msg.isRead : !msg.isRead
      );
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [messages, activeTab, searchTerm, filterCategory, filterRead, facultyInfo.name]);

  // Handle message actions
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

  const toggleArchive = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isArchived: !msg.isArchived } : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    }
  };

  // Handle compose form
  const handleComposeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setComposeForm(prev => ({ ...prev, [name]: value }));
  };

  const sendMessage = () => {
    if (!composeForm.to || !composeForm.subject || !composeForm.body) {
      alert('Please fill in all required fields');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: facultyInfo.name,
      senderType: 'faculty',
      recipient: composeForm.to,
      subject: composeForm.subject,
      body: composeForm.body,
      timestamp: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      isArchived: false,
      priority: composeForm.priority,
      hasAttachment: false,
      category: composeForm.category
    };

    setMessages(prev => [newMessage, ...prev]);
    setComposeForm({ to: '', subject: '', body: '', priority: 'medium', category: 'academic' });
    setIsComposingNew(false);
  };

  // Get sender type styling
  const getSenderTypeColor = (senderType: string) => {
    switch (senderType) {
      case 'admin': return 'text-red-600';
      case 'hod': return 'text-purple-600';
      case 'faculty': return 'text-blue-600';
      case 'student': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  // Unread messages count
  const unreadCount = messages.filter(msg => !msg.isRead && msg.recipient === facultyInfo.name).length;

  return (
    <div className="mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Inbox className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Faculty Inbox</h1>
              <p className="text-gray-600">{facultyInfo.name} • {facultyInfo.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                {unreadCount} unread
              </span>
            )}
            <button
              onClick={() => setIsComposingNew(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Compose
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Navigation Tabs */}
            <div className="space-y-2 mb-6">
              {[
                { id: 'inbox', label: 'Inbox', icon: <Inbox className="w-5 h-5" />, count: messages.filter(m => !m.isArchived && m.recipient === facultyInfo.name).length },
                { id: 'sent', label: 'Sent', icon: <Send className="w-5 h-5" />, count: messages.filter(m => m.sender === facultyInfo.name).length },
                { id: 'starred', label: 'Starred', icon: <Star className="w-5 h-5" />, count: messages.filter(m => m.isStarred).length },
                { id: 'archived', label: 'Archived', icon: <Archive className="w-5 h-5" />, count: messages.filter(m => m.isArchived).length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  <span className="text-sm bg-gray-200 px-2 py-1 rounded">{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Categories</option>
                <option value="official">Official</option>
                <option value="academic">Academic</option>
                <option value="personal">Personal</option>
                <option value="announcement">Announcement</option>
              </select>

              <select
                value={filterRead}
                onChange={(e) => setFilterRead(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Message List */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 capitalize">{activeTab}</h2>
              <p className="text-sm text-gray-600">{filteredMessages.length} messages</p>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No messages found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredMessages.map(message => (
                    <div
                      key={message.id}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.isRead) markAsRead(message.id);
                      }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(message.priority)} ${
                        !message.isRead ? 'bg-blue-50' : ''
                      } ${selectedMessage?.id === message.id ? 'bg-blue-100' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-medium text-sm ${getSenderTypeColor(message.senderType)}`}>
                              {message.sender}
                            </span>
                            {message.hasAttachment && <Paperclip className="w-4 h-4 text-gray-400" />}
                            {message.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          </div>
                          <h3 className={`text-sm truncate ${!message.isRead ? 'font-semibold' : 'font-medium'}`}>
                            {message.subject}
                          </h3>
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {message.body.substring(0, 50)}...
                          </p>
                        </div>
                        <div className="ml-2 text-right">
                          <p className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {!message.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            <span className={`text-xs px-2 py-1 rounded capitalize ${
                              message.priority === 'high' ? 'bg-red-100 text-red-800' :
                              message.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {message.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="col-span-5">
          <div className="bg-white rounded-xl shadow-sm">
            {selectedMessage ? (
              <div>
                {/* Message Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span className={getSenderTypeColor(selectedMessage.senderType)}>
                            {selectedMessage.sender}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStar(selectedMessage.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedMessage.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${selectedMessage.isStarred ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleArchive(selectedMessage.id)}
                        className="p-2 text-gray-400 hover:text-blue-500 rounded-lg transition-colors"
                      >
                        <Archive className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-6">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {selectedMessage.body}
                    </div>
                  </div>
                  
                  {/* Reply Button */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setComposeForm({
                          to: selectedMessage.sender,
                          subject: `Re: ${selectedMessage.subject}`,
                          body: `\n\n--- Original Message ---\nFrom: ${selectedMessage.sender}\nDate: ${new Date(selectedMessage.timestamp).toLocaleString()}\nSubject: ${selectedMessage.subject}\n\n${selectedMessage.body}`,
                          priority: 'medium',
                          category: selectedMessage.category
                        });
                        setIsComposingNew(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Reply className="w-4 h-4" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {isComposingNew && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Compose Message</h2>
                <button
                  onClick={() => setIsComposingNew(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To*</label>
                  <select
                    name="to"
                    value={composeForm.to}
                    onChange={handleComposeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Recipient</option>
                    <option value="Academic Dean">Academic Dean</option>
                    <option value="HOD - Computer Science">HOD - Computer Science</option>
                    <option value="System Admin">System Admin</option>
                    <option value="All Faculty">All Faculty</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={composeForm.category}
                    onChange={handleComposeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="academic">Academic</option>
                    <option value="official">Official</option>
                    <option value="personal">Personal</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={composeForm.priority}
                    onChange={handleComposeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                <input
                  type="text"
                  name="subject"
                  value={composeForm.subject}
                  onChange={handleComposeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                <textarea
                  name="body"
                  value={composeForm.body}
                  onChange={handleComposeChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsComposingNew(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyInbox;
