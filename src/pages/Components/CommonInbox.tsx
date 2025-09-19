import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  X, 
  Paperclip, 
  Send, 
  Mail, 
  Edit3, 
  Search, 
  Filter, 
  Star, 
  Archive, 
  Trash2,
  Reply,
  ReplyAll,
  Forward,
  Menu,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Refresh,
  Settings,
  User,
  Building,
  GraduationCap,
  Shield,
  BookOpen,
  Eye,
  EyeOff,
  Calendar,
  Info,
  Tag,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Pin,
  Flag
} from 'lucide-react';

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

interface Message {
  id: number;
  sender: string;
  senderEmail: string;
  senderRole?: string;
  to?: string;
  cc?: string[];
  subject: string;
  date: string;
  body: string;
  read: boolean;
  starred: boolean;
  important: boolean;
  category: 'academic' | 'administrative' | 'social' | 'system' | 'personal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: Attachment[];
  archived?: boolean;
  deleted?: boolean;
  labels?: string[];
  originalMessageId?: number; // For tracking reply chains
}

type ComposeMode = 'compose' | 'reply' | 'replyAll' | 'forward';

const Inbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [composing, setComposing] = useState(false);
  const [composeMode, setComposeMode] = useState<ComposeMode>('compose');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"inbox" | "sent" | "starred" | "archived" | "trash">("inbox");
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [showActionPanel, setShowActionPanel] = useState(false);
  const [composeData, setComposeData] = useState({
    to: "",
    cc: "",
    subject: "",
    body: "",
    attachments: [] as File[],
    priority: "medium" as const,
    category: "personal" as const,
  });
  const [errors, setErrors] = useState<{ 
    to?: string; 
    subject?: string; 
    body?: string;
  }>({});

  // Sample messages suitable for all user types
  const sampleMessages: Message[] = [
    {
      id: 1,
      sender: "Academic Office",
      senderEmail: "academics@university.edu",
      senderRole: "Academic Coordinator",
      subject: "Mid-Term Examination Schedule Released",
      date: "2024-10-20",
      body: `Dear Students and Faculty,

The mid-term examination schedule for the current semester has been released. Please check the following details:

**Important Dates:**
- Registration closes: October 25, 2024
- Examination period: November 1-15, 2024
- Results announcement: November 30, 2024

**Instructions:**
1. Students must carry their ID cards to the examination hall
2. No electronic devices are allowed during examinations
3. Report any discrepancies to the examination cell immediately

For detailed schedule and hall assignments, please visit the academic portal.

Best regards,
Academic Office`,
      read: false,
      starred: true,
      important: true,
      category: "academic",
      priority: "high",
      labels: ["Examination", "Important"],
      attachments: [
        {
          id: "att1",
          name: "Exam_Schedule.pdf",
          size: 245760,
          type: "application/pdf"
        }
      ]
    },
    {
      id: 2,
      sender: "Principal Office",
      senderEmail: "principal@university.edu",
      senderRole: "Principal",
      subject: "Monthly Faculty Meeting - October 2024",
      date: "2024-10-19",
      body: `Dear Faculty Members,

You are cordially invited to attend the monthly faculty meeting scheduled for this month.

**Meeting Details:**
- Date: October 25, 2024
- Time: 10:00 AM - 12:00 PM
- Venue: Main Conference Hall
- Mode: Hybrid (Physical + Online)

**Agenda:**
1. Review of academic progress
2. Upcoming events and initiatives
3. Student feedback discussion
4. Administrative updates

Please confirm your attendance by replying to this email.

Warm regards,
Principal Office`,
      read: true,
      starred: false,
      important: true,
      category: "administrative",
      priority: "medium",
      labels: ["Meeting", "Faculty"]
    },
    {
      id: 3,
      sender: "Placement Cell",
      senderEmail: "placements@university.edu",
      senderRole: "Placement Officer",
      subject: "Upcoming Campus Drive - Tech Innovators Pvt. Ltd.",
      date: "2024-10-18",
      body: `Dear Students,

We are excited to announce an upcoming placement drive with Tech Innovators Pvt. Ltd.

**Drive Details:**
- Company: Tech Innovators Pvt. Ltd.
- Date: November 10, 2024
- Time: 9:00 AM onwards
- Eligible Branches: CSE, IT, ECE, EEE
- Package: 6-12 LPA

**Registration Process:**
1. Update your resume on the placement portal
2. Register before November 5, 2024
3. Attend the pre-placement talk on November 8, 2024

**Requirements:**
- Valid college ID
- Updated resume (3 copies)
- Formal attire mandatory

For queries, contact the placement cell.

Best of luck!
Placement Team`,
      read: false,
      starred: true,
      important: false,
      category: "academic",
      priority: "high",
      labels: ["Placement", "Opportunity"]
    },
    {
      id: 4,
      sender: "IT Support",
      senderEmail: "itsupport@university.edu",
      senderRole: "System Administrator",
      subject: "System Maintenance - Weekend Downtime",
      date: "2024-10-17",
      body: `Dear Users,

We will be performing scheduled system maintenance this weekend to improve system performance and security.

**Maintenance Window:**
- Start: Saturday, October 21, 2024 - 11:00 PM
- End: Sunday, October 22, 2024 - 6:00 AM

**Affected Services:**
- Student Portal
- Faculty Portal
- Email System
- Library System

Please save your work and log out before the maintenance window. We apologize for any inconvenience.

IT Support Team`,
      read: true,
      starred: false,
      important: false,
      category: "system",
      priority: "low",
      labels: ["Maintenance", "System"]
    },
    {
      id: 5,
      sender: "Library Services",
      senderEmail: "library@university.edu",
      senderRole: "Chief Librarian",
      subject: "New Digital Resources Available",
      date: "2024-10-16",
      body: `Dear Library Users,

We are pleased to announce the addition of new digital resources to our collection:

**New Databases:**
- IEEE Xplore Digital Library
- ACM Digital Library
- Springer Link
- Nature Database

**Access Information:**
- Available 24/7 from anywhere on campus
- Remote access available with institutional login
- Training sessions available on request

For assistance with accessing these resources, please visit the library help desk or contact us.

Happy Learning!
Library Team`,
      read: false,
      starred: false,
      important: false,
      category: "academic",
      priority: "low",
      labels: ["Library", "Resources"]
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMessages(sampleMessages);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  const filteredMessages = useMemo(() => {
    let filtered = messages;

    // Filter by tab
    switch (activeTab) {
      case 'starred':
        filtered = messages.filter(msg => msg.starred);
        break;
      case 'archived':
        filtered = messages.filter(msg => msg.archived);
        break;
      case 'trash':
        filtered = messages.filter(msg => msg.deleted);
        break;
      case 'sent':
        return sentMessages;
      case 'inbox':
      default:
        filtered = messages.filter(msg => !msg.archived && !msg.deleted);
        break;
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(msg =>
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(msg => msg.category === selectedCategory);
    }

    // Apply priority filter
    if (selectedPriority) {
      filtered = filtered.filter(msg => msg.priority === selectedPriority);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [messages, sentMessages, activeTab, searchTerm, selectedCategory, selectedPriority]);

  const unreadCount = useMemo(() => {
    return messages.filter(msg => !msg.read && !msg.archived && !msg.deleted).length;
  }, [messages]);

  const handleComposeChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setComposeData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setComposeData(prev => ({ 
        ...prev, 
        attachments: [...prev.attachments, ...Array.from(e.target.files || [])]
      }));
    }
  }, []);

  const removeAttachment = useCallback((index: number) => {
    setComposeData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateCompose = useCallback(() => {
    const newErrors: typeof errors = {};
    
    if (!composeData.to.trim()) {
      newErrors.to = "Recipient is required";
    } else {
      const emails = composeData.to.split(',').map(email => email.trim());
      const invalidEmails = emails.filter(email => !validateEmail(email));
      if (invalidEmails.length > 0) {
        newErrors.to = "Invalid email format";
      }
    }
    
    if (!composeData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!composeData.body.trim()) {
      newErrors.body = "Message body is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [composeData]);

  // Initialize compose with different modes
  const initializeCompose = useCallback((mode: ComposeMode, message?: Message) => {
    setComposeMode(mode);
    
    switch (mode) {
      case 'reply':
        if (message) {
          setComposeData({
            to: message.senderEmail,
            cc: "",
            subject: message.subject.startsWith('Re:') ? message.subject : `Re: ${message.subject}`,
            body: `\n\n--- Original Message ---\nFrom: ${message.sender} <${message.senderEmail}>\nDate: ${new Date(message.date).toLocaleString()}\nSubject: ${message.subject}\n\n${message.body}`,
            attachments: [],
            priority: "medium",
            category: message.category
          });
        }
        break;
        
      case 'replyAll':
        if (message) {
          const ccEmails = message.cc ? message.cc.join(', ') : '';
          setComposeData({
            to: message.senderEmail,
            cc: ccEmails,
            subject: message.subject.startsWith('Re:') ? message.subject : `Re: ${message.subject}`,
            body: `\n\n--- Original Message ---\nFrom: ${message.sender} <${message.senderEmail}>\nDate: ${new Date(message.date).toLocaleString()}\nSubject: ${message.subject}\n\n${message.body}`,
            attachments: [],
            priority: "medium",
            category: message.category
          });
        }
        break;
        
      case 'forward':
        if (message) {
          setComposeData({
            to: "",
            cc: "",
            subject: message.subject.startsWith('Fwd:') ? message.subject : `Fwd: ${message.subject}`,
            body: `\n\n--- Forwarded Message ---\nFrom: ${message.sender} <${message.senderEmail}>\nDate: ${new Date(message.date).toLocaleString()}\nSubject: ${message.subject}\n\n${message.body}`,
            attachments: [],
            priority: message.priority,
            category: message.category
          });
        }
        break;
        
      default: // compose
        setComposeData({
          to: "",
          cc: "",
          subject: "",
          body: "",
          attachments: [],
          priority: "medium",
          category: "personal"
        });
        break;
    }
    
    setComposing(true);
    setErrors({});
  }, []);

  const sendComposeMail = useCallback(() => {
    if (!validateCompose()) return;

    const newMail: Message = {
      id: Date.now(),
      sender: "You",
      senderEmail: "user@university.edu",
      to: composeData.to,
      cc: composeData.cc ? composeData.cc.split(',').map(email => email.trim()) : undefined,
      subject: composeData.subject,
      date: new Date().toISOString().split("T")[0],
      body: composeData.body,
      read: true,
      starred: false,
      important: composeMode === 'reply' || composeMode === 'replyAll' ? selectedMessage?.important || false : composeData.priority === 'urgent' || composeData.priority === 'high',
      category: composeData.category,
      priority: composeData.priority,
      attachments: composeData.attachments.map((file, index) => ({
        id: `att_${Date.now()}_${index}`,
        name: file.name,
        size: file.size,
        type: file.type
      })),
      originalMessageId: (composeMode === 'reply' || composeMode === 'replyAll') ? selectedMessage?.id : undefined
    };

    setSentMessages(prev => [newMail, ...prev]);
    
    // If replying, mark original message as read
    if ((composeMode === 'reply' || composeMode === 'replyAll') && selectedMessage) {
      setMessages(prev => prev.map(msg => 
        msg.id === selectedMessage.id ? { ...msg, read: true } : msg
      ));
    }
    
    setComposing(false);
    setComposeMode('compose');
    setComposeData({
      to: "",
      cc: "",
      subject: "",
      body: "",
      attachments: [],
      priority: "medium",
      category: "personal"
    });
    setErrors({});
    
    // Show success message
    const actionMap = {
      compose: 'Email sent',
      reply: 'Reply sent',
      replyAll: 'Reply sent to all',
      forward: 'Message forwarded'
    };
    alert(`${actionMap[composeMode]} successfully!`);
  }, [composeData, validateCompose, composeMode, selectedMessage]);

  const handleMessageSelect = useCallback((messageId: number) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  }, []);

  const handleStarMessage = useCallback((messageId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ));
  }, []);

  const handleMarkAsRead = useCallback((messageIds: number[]) => {
    setMessages(prev => prev.map(msg => 
      messageIds.includes(msg.id) ? { ...msg, read: true } : msg
    ));
  }, []);

  const handleMarkAsUnread = useCallback((messageIds: number[]) => {
    setMessages(prev => prev.map(msg => 
      messageIds.includes(msg.id) ? { ...msg, read: false } : msg
    ));
  }, []);

  const handleArchiveMessages = useCallback((messageIds: number[]) => {
    setMessages(prev => prev.map(msg => 
      messageIds.includes(msg.id) ? { ...msg, archived: true } : msg
    ));
    setSelectedMessages([]);
  }, []);

  const handleDeleteMessages = useCallback((messageIds: number[]) => {
    setMessages(prev => prev.map(msg => 
      messageIds.includes(msg.id) ? { ...msg, deleted: true } : msg
    ));
    setSelectedMessages([]);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'administrative': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'social': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
      case 'system': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case 'personal': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getComposeTitle = () => {
    switch (composeMode) {
      case 'reply': return 'Reply to Message';
      case 'replyAll': return 'Reply to All';
      case 'forward': return 'Forward Message';
      default: return 'Compose New Email';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:relative lg:translate-x-0 z-50 lg:z-0 w-80 lg:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none`}>
        
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Inbox</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  {unreadCount} unread
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={() => initializeCompose('compose')}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          >
            <Edit3 className="w-5 h-5" />
            <span>Compose</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="grid grid-cols-2 gap-1 p-3">
            {[
              { id: 'inbox', label: 'Inbox', icon: Mail, count: messages.filter(m => !m.archived && !m.deleted).length },
              { id: 'sent', label: 'Sent', icon: Send, count: sentMessages.length },
              { id: 'starred', label: 'Starred', icon: Star, count: messages.filter(m => m.starred).length },
              { id: 'archived', label: 'Archive', icon: Archive, count: messages.filter(m => m.archived).length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count > 0 && (
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full min-w-[20px] text-center">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Filters</h3>
            <button
              onClick={() => setShowActionPanel(!showActionPanel)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
            >
              <option value="">All Categories</option>
              <option value="academic">📚 Academic</option>
              <option value="administrative">🏢 Administrative</option>
              <option value="social">👥 Social</option>
              <option value="system">⚙️ System</option>
              <option value="personal">👤 Personal</option>
            </select>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
            >
              <option value="">All Priorities</option>
              <option value="urgent">🔴 Urgent</option>
              <option value="high">🟠 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            
            {(selectedCategory || selectedPriority) && (
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedPriority("");
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Clear filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="space-y-2 p-3">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="p-4 animate-pulse bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">No messages found</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="space-y-2 p-3">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    setSidebarOpen(false);
                    if (!msg.read && activeTab === "inbox") {
                      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
                    }
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 bg-white dark:bg-gray-800 border hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 group ${
                    selectedMessage?.id === msg.id 
                      ? "ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg border-blue-300 dark:border-blue-600" 
                      : "border-gray-200 dark:border-gray-700"
                  } ${!msg.read && activeTab === "inbox" ? "bg-blue-50 dark:bg-blue-950/20 border-l-4 border-l-blue-500 dark:border-l-blue-400" : ""}`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Sender Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 shadow-md">
                        {msg.sender === "You" ? "Y" : msg.sender.split(" ").map(word => word[0]).join("").slice(0, 2)}
                      </div>
                      {!msg.read && activeTab === "inbox" && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm font-medium truncate max-w-32 ${
                            !msg.read && activeTab === "inbox" 
                              ? "text-gray-900 dark:text-white font-bold" 
                              : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {activeTab === "sent" ? msg.to : msg.sender}
                          </p>
                          {msg.senderRole && (
                            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                              {msg.senderRole}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(msg.date)}
                          </span>
                          <button
                            onClick={(e) => handleStarMessage(msg.id, e)}
                            className={`p-1 rounded-lg transition-colors ${
                              msg.starred 
                                ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' 
                                : 'text-gray-300 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 opacity-0 group-hover:opacity-100'
                            }`}
                          >
                            <Star className={`w-4 h-4 ${msg.starred ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                      
                      <p className={`text-sm mb-2 line-clamp-1 ${
                        !msg.read && activeTab === "inbox" 
                          ? "text-gray-900 dark:text-white font-semibold" 
                          : "text-gray-700 dark:text-gray-300"
                      }`}>
                        {msg.subject}
                      </p>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                        {msg.body.substring(0, 120)}...
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(msg.category)}`}>
                            {msg.category}
                          </span>
                          <span className={`text-xs font-medium ${getPriorityColor(msg.priority)}`}>
                            {msg.priority}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Paperclip className="w-3 h-3 mr-1" />
                              {msg.attachments.length}
                            </div>
                          )}
                          {msg.important && (
                            <Flag className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </div>

                      {msg.labels && msg.labels.length > 0 && (
                        <div className="flex gap-1 mt-3">
                          {msg.labels.slice(0, 2).map((label) => (
                            <span key={label} className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                              {label}
                            </span>
                          ))}
                          {msg.labels.length > 2 && (
                            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                              +{msg.labels.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-48">
            {selectedMessage ? selectedMessage.subject : 'Inbox'}
          </h1>
          <button
            onClick={() => initializeCompose('compose')}
            className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <Edit3 className="w-6 h-6" />
          </button>
        </div>

        {/* Compose Modal */}
        {composing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Edit3 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{getComposeTitle()}</h3>
                </div>
                <button
                  onClick={() => setComposing(false)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)] bg-white dark:bg-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To *</label>
                    <input
                      type="email"
                      name="to"
                      value={composeData.to}
                      onChange={handleComposeChange}
                      placeholder="recipient@example.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors shadow-sm"
                    />
                    {errors.to && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.to}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CC</label>
                    <input
                      type="email"
                      name="cc"
                      value={composeData.cc}
                      onChange={handleComposeChange}
                      placeholder="cc@example.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={composeData.subject}
                    onChange={handleComposeChange}
                    placeholder="Email subject"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors shadow-sm"
                  />
                  {errors.subject && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.subject}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                    <select
                      name="priority"
                      value={composeData.priority}
                      onChange={handleComposeChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors shadow-sm"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🟠 High</option>
                      <option value="urgent">🔴 Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select
                      name="category"
                      value={composeData.category}
                      onChange={handleComposeChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors shadow-sm"
                    >
                      <option value="personal">👤 Personal</option>
                      <option value="academic">📚 Academic</option>
                      <option value="administrative">🏢 Administrative</option>
                      <option value="social">👥 Social</option>
                      <option value="system">⚙️ System</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message *</label>
                  <textarea
                    name="body"
                    value={composeData.body}
                    onChange={handleComposeChange}
                    rows={12}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors resize-none shadow-sm"
                  />
                  {errors.body && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.body}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments</label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      >
                        <Paperclip className="w-4 h-4 mr-2" />
                        Choose Files
                      </label>
                      {composeData.attachments.length > 0 && (
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                          {composeData.attachments.length} file(s) selected
                        </span>
                      )}
                    </div>
                    
                    {composeData.attachments.length > 0 && (
                      <div className="space-y-2 max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        {composeData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 shadow-sm">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <Paperclip className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate max-w-48">{file.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeAttachment(index)}
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {composeMode !== 'compose' && selectedMessage && (
                    <span>In response to: {selectedMessage.subject}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setComposing(false)}
                    className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendComposeMail}
                    className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {composeMode === 'compose' ? 'Send Email' : 
                     composeMode === 'reply' ? 'Send Reply' :
                     composeMode === 'replyAll' ? 'Reply to All' : 'Forward Message'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Display */}
        {selectedMessage ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Message Header */}
            <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                    {selectedMessage.subject}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                        {selectedMessage.sender === "You" ? "Y" : selectedMessage.sender.split(" ").map(word => word[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {activeTab === "sent" ? `To: ${selectedMessage.to}` : `From: ${selectedMessage.sender}`}
                        </p>
                        {selectedMessage.senderEmail && (
                          <p className="text-xs text-gray-600 dark:text-gray-400">{selectedMessage.senderEmail}</p>
                        )}
                        {selectedMessage.senderRole && (
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{selectedMessage.senderRole}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(selectedMessage.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(selectedMessage.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleStarMessage(selectedMessage.id, e)}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      selectedMessage.starred 
                        ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 shadow-md' 
                        : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${selectedMessage.starred ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Message Metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(selectedMessage.category)} shadow-sm`}>
                  {selectedMessage.category}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-opacity-20 ${getPriorityColor(selectedMessage.priority)} border`} style={{
                  borderColor: selectedMessage.priority === 'urgent' ? '#dc2626' : 
                               selectedMessage.priority === 'high' ? '#ea580c' :
                               selectedMessage.priority === 'medium' ? '#ca8a04' : '#16a34a'
                }}>
                  {selectedMessage.priority.toUpperCase()} PRIORITY
                </span>
                {selectedMessage.important && (
                  <span className="flex items-center text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full font-medium">
                    <Flag className="w-3 h-3 mr-1" />
                    Important
                  </span>
                )}
                {selectedMessage.labels && selectedMessage.labels.map((label) => (
                  <span key={label} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                    <Tag className="w-3 h-3 inline mr-1" />
                    {label}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={() => initializeCompose('reply', selectedMessage)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Reply className="w-4 h-4 mr-2" />
                  Reply
                </button>
                <button 
                  onClick={() => initializeCompose('replyAll', selectedMessage)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <ReplyAll className="w-4 h-4 mr-2" />
                  Reply All
                </button>
                <button 
                  onClick={() => initializeCompose('forward', selectedMessage)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-600 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Forward className="w-4 h-4 mr-2" />
                  Forward
                </button>
                <button 
                  onClick={() => handleArchiveMessages([selectedMessage.id])}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </button>
                <button 
                  onClick={() => handleDeleteMessages([selectedMessage.id])}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
            
            {/* Message Body */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50 dark:bg-gray-900">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
                <div className="prose prose-sm lg:prose-base max-w-none dark:prose-invert">
                  <div className="whitespace-pre-wrap text-gray-900 dark:text-gray-100 leading-relaxed">
                    {selectedMessage.body}
                  </div>
                </div>
                
                {/* Attachments */}
                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Paperclip className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                      Attachments ({selectedMessage.attachments.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedMessage.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                              <Paperclip className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate max-w-32 sm:max-w-48">
                                {attachment.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatFileSize(attachment.size)}
                              </p>
                            </div>
                          </div>
                          <button className="inline-flex items-center px-3 py-2 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="text-center max-w-md">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Mail className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to your Inbox
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                Select a message to read or compose a new email to get started
              </p>
              <button
                onClick={() => initializeCompose('compose')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold rounded-2xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Edit3 className="w-6 h-6 mr-3" />
                Compose New Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
