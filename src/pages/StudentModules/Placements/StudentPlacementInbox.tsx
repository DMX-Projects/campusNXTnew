import React, { useState } from 'react';
import {
  MessageSquareIcon,
  SearchIcon,
  FilterIcon,
  BriefcaseIcon,
  CalendarIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  ReplyIcon,
  ForwardIcon,
  TrashIcon,
  MoreVerticalIcon,
  // AttachmentIcon, (removed, use PaperclipIcon instead)
  XIcon,
  SendIcon,
  PaperclipIcon
} from 'lucide-react';

interface Message {
  id: string;
  subject: string;
  sender: string;
  senderRole: 'placement-officer' | 'company-hr' | 'system' | 'admin';
  content: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  isStarred: boolean;
  category: 'interview' | 'application' | 'offer' | 'general' | 'deadline' | 'announcement';
  attachments?: Attachment[];
  companyLogo?: string;
  priority: 'low' | 'medium' | 'high';
  hasDeadline: boolean;
  deadline?: string;
}

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

const StudentPlacementInbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      subject: 'Technical Interview Scheduled - TechCorp Solutions',
      sender: 'Sarah Johnson (HR Manager)',
      senderRole: 'company-hr',
      content: `Dear Student,

We are pleased to inform you that your application for the Software Engineer position has been shortlisted. 

Your technical interview has been scheduled for:
📅 Date: September 4, 2025
🕙 Time: 10:00 AM - 11:00 AM
📍 Venue: Video Conference (Google Meet)
👥 Interview Panel: 2 Technical Leads

Please find the interview guidelines attached. Make sure to:
- Test your internet connection beforehand
- Have your resume and projects ready for discussion
- Prepare for coding questions and system design

Meeting Link: https://meet.google.com/abc-defg-hij

Best regards,
Sarah Johnson
HR Manager, TechCorp Solutions`,
      timestamp: '2 hours ago',
      isRead: false,
      isImportant: true,
      isStarred: true,
      category: 'interview',
      attachments: [
        {
          id: '1',
          name: 'Interview_Guidelines.pdf',
          size: '1.2 MB',
          type: 'pdf',
          url: '/attachments/interview-guidelines.pdf'
        }
      ],
      companyLogo: '🏢',
      priority: 'high',
      hasDeadline: false
    },
    {
      id: '2',
      subject: 'Job Offer - Congratulations! 🎉',
      sender: 'Michael Chen (Recruitment Lead)',
      senderRole: 'company-hr',
      content: `Congratulations!

We are delighted to extend an offer for the position of Junior Software Developer at InnovateX.

Offer Details:
💰 Annual CTC: ₹8.5 LPA
📍 Location: Bangalore
📅 Joining Date: January 2026
📋 Role: Full Stack Developer

Please find the detailed offer letter attached. Kindly respond within 7 days.

We look forward to having you on our team!

Best regards,
Michael Chen
Recruitment Lead, InnovateX`,
      timestamp: '1 day ago',
      isRead: false,
      isImportant: true,
      isStarred: true,
      category: 'offer',
      attachments: [
        {
          id: '2',
          name: 'Offer_Letter_InnovateX.pdf',
          size: '890 KB',
          type: 'pdf',
          url: '/attachments/offer-letter.pdf'
        }
      ],
      companyLogo: '🚀',
      priority: 'high',
      hasDeadline: true,
      deadline: '2025-09-10'
    },
    {
      id: '3',
      subject: 'Application Status Update - DataFlow Inc',
      sender: 'Placement Office',
      senderRole: 'placement-officer',
      content: `Dear Student,

This is to inform you about the status of your application with DataFlow Inc.

Status: Application Submitted ✅
Next Steps: Resume screening in progress
Expected Timeline: Results within 3-5 business days

Company Details:
- Role: Data Analyst Intern
- Duration: 6 months
- Stipend: ₹25,000/month
- Location: Remote/Hybrid

You will be notified once the screening process is complete.

Best regards,
Placement Cell`,
      timestamp: '2 days ago',
      isRead: true,
      isImportant: false,
      isStarred: false,
      category: 'application',
      companyLogo: '📊',
      priority: 'medium',
      hasDeadline: false
    },
    {
      id: '4',
      subject: 'New Company Drive - Microsoft Campus Visit',
      sender: 'Placement Office',
      senderRole: 'placement-officer',
      content: `📢 IMPORTANT ANNOUNCEMENT 📢

Microsoft is visiting our campus for recruitment!

Drive Details:
🏢 Company: Microsoft India
📅 Date: September 15, 2025
🎯 Positions: SDE-1, SDE-2
💰 Package: ₹15-25 LPA
📋 Eligibility: All branches, CGPA ≥ 7.0

Registration Process:
1. Update your resume on placement portal
2. Fill the Microsoft-specific form
3. Upload transcripts and certificates

Registration Deadline: September 10, 2025
Pre-placement Talk: September 12, 2025

Don't miss this opportunity!

Placement Cell`,
      timestamp: '3 days ago',
      isRead: true,
      isImportant: true,
      isStarred: false,
      category: 'announcement',
      companyLogo: '🪟',
      priority: 'high',
      hasDeadline: true,
      deadline: '2025-09-10'
    },
    {
      id: '5',
      subject: 'Interview Feedback - CloudTech Systems',
      sender: 'Priya Patel (HR Executive)',
      senderRole: 'company-hr',
      content: `Dear Candidate,

Thank you for participating in the interview process with CloudTech Systems.

After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.

Feedback from the interview panel:
✅ Strong technical knowledge
✅ Good communication skills
❌ Limited experience with cloud technologies
❌ Need improvement in system design concepts

We encourage you to apply for future opportunities and wish you success in your job search.

Best regards,
Priya Patel
HR Executive, CloudTech Systems`,
      timestamp: '5 days ago',
      isRead: true,
      isImportant: false,
      isStarred: false,
      category: 'general',
      companyLogo: '☁️',
      priority: 'low',
      hasDeadline: false
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['interview', 'application', 'offer', 'general', 'deadline', 'announcement'];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || message.category === selectedCategory;
    const matchesUnread = !showUnreadOnly || !message.isRead;
    const matchesStarred = !showStarredOnly || message.isStarred;
    
    return matchesSearch && matchesCategory && matchesUnread && matchesStarred;
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
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      setSelectedMessage(null);
      alert('✅ Message deleted successfully!');
    }
  };

  const sendReply = () => {
    if (!replyContent.trim() || !selectedMessage) {
      alert('⚠️ Please write a reply message!');
      return;
    }

    // Simulate sending reply
    alert(`✉️ Reply sent to ${selectedMessage.sender}!`);
    setReplyContent('');
    setShowReplyModal(false);
  };

  const downloadAttachment = (attachment: Attachment) => {
    alert(`📥 Downloading ${attachment.name}...`);
    // In real app, this would trigger file download
  };

  const getSenderIcon = (role: string) => {
    const icons = {
      'placement-officer': '🏛️',
      'company-hr': '🏢',
      'system': '🤖',
      'admin': '👨‍💼'
    };
    return icons[role as keyof typeof icons] || '💌';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      interview: 'bg-blue-100 text-blue-800',
      application: 'bg-green-100 text-green-800',
      offer: 'bg-purple-100 text-purple-800',
      general: 'bg-gray-100 text-gray-800',
      deadline: 'bg-red-100 text-red-800',
      announcement: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'border-l-gray-400',
      medium: 'border-l-yellow-400',
      high: 'border-l-red-400'
    };
    return colors[priority as keyof typeof colors];
  };

  const formatTimestamp = (timestamp: string) => {
    // In a real app, this would parse the actual date
    return timestamp;
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;
  const starredCount = messages.filter(msg => msg.isStarred).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Placement Inbox</h1>
              <p className="text-gray-600 mt-1">Stay updated with placement communications and opportunities</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                <MessageSquareIcon size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-900">{filteredMessages.length} messages</span>
              </div>
              <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                <AlertCircleIcon size={16} className="text-red-600" />
                <span className="text-sm font-medium text-red-900">{unreadCount} unread</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search messages by subject, sender, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors lg:hidden"
              >
                <FilterIcon size={16} />
              </button>
            </div>
          </div>

          {/* Filter Toggles */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  showUnreadOnly 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread Only ({unreadCount})
              </button>
              <button
                onClick={() => setShowStarredOnly(!showStarredOnly)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  showStarredOnly 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Starred Only ({starredCount})
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className={`${selectedMessage ? 'hidden lg:block' : 'block'} lg:col-span-1`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Messages</h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredMessages.map(message => (
                  <div
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      markAsRead(message.id);
                    }}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(message.priority)} ${
                      !message.isRead ? 'bg-blue-50' : ''
                    } ${selectedMessage?.id === message.id ? 'bg-blue-100' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{message.companyLogo || getSenderIcon(message.senderRole)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            {message.isImportant && (
                              <AlertCircleIcon size={14} className="text-red-500" />
                            )}
                            {message.isStarred && (
                              <StarIcon size={14} className="text-yellow-500 fill-current" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
                        </div>
                        
                        <h3 className={`text-sm mb-1 line-clamp-1 ${!message.isRead ? 'font-semibold' : 'font-medium'}`}>
                          {message.subject}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-1">{message.sender}</p>
                        
                        <p className="text-xs text-gray-500 line-clamp-2">{message.content}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(message.category)}`}>
                            {message.category}
                          </span>
                          
                          <div className="flex items-center gap-1">
                            {message.attachments && message.attachments.length > 0 && (
                              <PaperclipIcon size={12} className="text-gray-400" />
                            )}
                            {message.hasDeadline && (
                              <ClockIcon size={12} className="text-red-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredMessages.length === 0 && (
                  <div className="p-8 text-center">
                    <MessageSquareIcon className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                    <p className="text-gray-600">
                      {searchTerm || selectedCategory !== 'all' || showUnreadOnly || showStarredOnly
                        ? 'Try adjusting your search or filters'
                        : 'You have no placement messages yet'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className={`${selectedMessage ? 'block' : 'hidden lg:block'} lg:col-span-2`}>
            {selectedMessage ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => setSelectedMessage(null)}
                          className="lg:hidden text-gray-400 hover:text-gray-600"
                        >
                          ←
                        </button>
                        <h1 className="text-xl font-semibold text-gray-900">{selectedMessage.subject}</h1>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{selectedMessage.companyLogo || getSenderIcon(selectedMessage.senderRole)}</span>
                          <span>{selectedMessage.sender}</span>
                        </div>
                        <span>{formatTimestamp(selectedMessage.timestamp)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedMessage.category)}`}>
                          {selectedMessage.category}
                        </span>
                        {selectedMessage.priority === 'high' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            High Priority
                          </span>
                        )}
                        {selectedMessage.hasDeadline && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Deadline: {selectedMessage.deadline}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStar(selectedMessage.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedMessage.isStarred 
                            ? 'text-yellow-500 bg-yellow-100' 
                            : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                        }`}
                      >
                        <StarIcon size={16} fill={selectedMessage.isStarred ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => setShowReplyModal(true)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <ReplyIcon size={16} />
                      </button>
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {selectedMessage.content}
                    </div>
                  </div>
                  
                  {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-3">Attachments ({selectedMessage.attachments.length})</h3>
                      <div className="space-y-2">
                        {selectedMessage.attachments.map(attachment => (
                          <div key={attachment.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <PaperclipIcon size={20} className="text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{attachment.name}</p>
                                <p className="text-sm text-gray-600">{attachment.size}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => downloadAttachment(attachment)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                            >
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowReplyModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <ReplyIcon size={16} />
                      Reply
                    </button>
                    <button
                      onClick={() => alert(`📧 Forwarding message: ${selectedMessage.subject}`)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <ForwardIcon size={16} />
                      Forward
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <MessageSquareIcon className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
                <p className="text-gray-600">Choose a message from the list to view its details</p>
              </div>
            )}
          </div>
        </div>

        {/* Reply Modal */}
        {showReplyModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Reply to: {selectedMessage.sender}</h2>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Subject: Re: {selectedMessage.subject}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your reply here..."
                    className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={sendReply}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <SendIcon size={16} />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPlacementInbox;
