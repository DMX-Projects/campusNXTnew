import React, { useState, useEffect } from 'react';
import {
  HelpCircleIcon,
  MessageSquareIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  FileTextIcon,
  ImageIcon,
  PaperclipIcon,
  SendIcon,
  EyeIcon,
  StarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  UserIcon,
  RefreshCwIcon,
  BookOpenIcon,
  PhoneIcon,
  MailIcon,
  MessageCircleIcon,
  InfoIcon,
  AlertTriangleIcon,
  SettingsIcon,
  DownloadIcon,
  ShareIcon,
  TrendingUpIcon,BriefcaseIcon
} from 'lucide-react';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'placement' | 'academic' | 'account' | 'general' | 'complaint' | 'suggestion';
  subcategory: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'pending-info' | 'resolved' | 'closed' | 'reopened';
  createdDate: string;
  lastUpdate: string;
  assignedTo?: string;
  department: string;
  ticketNumber: string;
  studentId: string;
  studentName: string;
  contactEmail: string;
  contactPhone?: string;
  attachments: TicketAttachment[];
  responses: TicketResponse[];
  resolution?: string;
  resolutionDate?: string;
  satisfactionRating?: number;
  feedback?: string;
  relatedTickets: string[];
  tags: string[];
  isEscalated: boolean;
  escalationReason?: string;
  estimatedResolutionTime?: string;
  actualResolutionTime?: string;
}

interface TicketAttachment {
  id: string;
  name: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  uploadedBy: string;
  url: string;
}

interface TicketResponse {
  id: string;
  message: string;
  author: string;
  authorType: 'student' | 'staff' | 'admin' | 'system';
  timestamp: string;
  isInternal: boolean;
  attachments: TicketAttachment[];
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpfulCount: number;
  isHelpful: boolean;
  tags: string[];
}

const StudentPlacementRaiseTicket: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      title: 'Unable to access placement portal',
      description: 'I am getting a login error when trying to access the placement portal. It shows "Invalid credentials" even though I am using the correct username and password.',
      category: 'technical',
      subcategory: 'Login Issues',
      priority: 'high',
      status: 'resolved',
      createdDate: '2025-09-01',
      lastUpdate: '2025-09-02',
      assignedTo: 'John Smith (IT Support)',
      department: 'IT Support',
      ticketNumber: 'PLM-2025-001',
      studentId: 'STU123456',
      studentName: 'Rahul Sharma',
      contactEmail: 'rahul.sharma@email.com',
      contactPhone: '+91-9876543210',
      attachments: [
        {
          id: '1',
          name: 'Error Screenshot',
          fileName: 'login_error.png',
          fileSize: '1.2 MB',
          fileType: 'image/png',
          uploadDate: '2025-09-01',
          uploadedBy: 'Rahul Sharma',
          url: '/attachments/login_error.png'
        }
      ],
      responses: [
        {
          id: '1',
          message: 'Thank you for reporting this issue. Our IT team is looking into the login problem. We will update you within 24 hours.',
          author: 'Support Team',
          authorType: 'staff',
          timestamp: '2025-09-01T10:30:00Z',
          isInternal: false,
          attachments: []
        },
        {
          id: '2',
          message: 'The issue has been identified and fixed. Your account password has been reset. Please check your email for the new temporary password.',
          author: 'John Smith (IT Support)',
          authorType: 'staff',
          timestamp: '2025-09-02T09:15:00Z',
          isInternal: false,
          attachments: []
        },
        {
          id: '3',
          message: 'Thank you! I can now access the portal successfully. The issue is resolved.',
          author: 'Rahul Sharma',
          authorType: 'student',
          timestamp: '2025-09-02T09:45:00Z',
          isInternal: false,
          attachments: []
        }
      ],
      resolution: 'Account password reset due to system migration. User can now access the portal with new credentials.',
      resolutionDate: '2025-09-02',
      satisfactionRating: 5,
      feedback: 'Great support! Issue resolved quickly.',
      relatedTickets: [],
      tags: ['login', 'portal-access', 'password-reset'],
      isEscalated: false,
      estimatedResolutionTime: '24 hours',
      actualResolutionTime: '23 hours'
    },
    {
      id: '2',
      title: 'Company drive registration not working',
      description: 'I am trying to register for the Microsoft campus drive but the registration button is not working. I have tried multiple times with different browsers.',
      category: 'placement',
      subcategory: 'Drive Registration',
      priority: 'medium',
      status: 'in-progress',
      createdDate: '2025-09-02',
      lastUpdate: '2025-09-03',
      assignedTo: 'Priya Patel (Placement Officer)',
      department: 'Placement Cell',
      ticketNumber: 'PLM-2025-002',
      studentId: 'STU789012',
      studentName: 'Anjali Gupta',
      contactEmail: 'anjali.gupta@email.com',
      attachments: [],
      responses: [
        {
          id: '1',
          message: 'We are looking into this issue. Can you please clear your browser cache and try again? Also, please let us know which browser you are using.',
          author: 'Priya Patel',
          authorType: 'staff',
          timestamp: '2025-09-02T14:30:00Z',
          isInternal: false,
          attachments: []
        },
        {
          id: '2',
          message: 'I tried clearing cache in Chrome, Firefox, and Edge. Still facing the same issue. The button appears greyed out.',
          author: 'Anjali Gupta',
          authorType: 'student',
          timestamp: '2025-09-03T08:20:00Z',
          isInternal: false,
          attachments: []
        }
      ],
      relatedTickets: [],
      tags: ['registration', 'microsoft', 'campus-drive'],
      isEscalated: false,
      estimatedResolutionTime: '48 hours'
    },
    {
      id: '3',
      title: 'Request for interview preparation resources',
      description: 'Can you provide me with additional interview preparation materials for technical interviews? I need help with system design and coding interview questions.',
      category: 'academic',
      subcategory: 'Study Materials',
      priority: 'low',
      status: 'closed',
      createdDate: '2025-08-28',
      lastUpdate: '2025-08-30',
      assignedTo: 'Dr. Rajesh Kumar (Faculty)',
      department: 'Academic Support',
      ticketNumber: 'PLM-2025-003',
      studentId: 'STU345678',
      studentName: 'Vikram Singh',
      contactEmail: 'vikram.singh@email.com',
      attachments: [],
      responses: [
        {
          id: '1',
          message: 'I have shared a comprehensive list of interview preparation resources with you via email. Please check the study materials section in the portal as well.',
          author: 'Dr. Rajesh Kumar',
          authorType: 'staff',
          timestamp: '2025-08-29T11:00:00Z',
          isInternal: false,
          attachments: [
            {
              id: '2',
              name: 'Interview Preparation Guide',
              fileName: 'interview_prep_guide.pdf',
              fileSize: '2.8 MB',
              fileType: 'application/pdf',
              uploadDate: '2025-08-29',
              uploadedBy: 'Dr. Rajesh Kumar',
              url: '/attachments/interview_prep_guide.pdf'
            }
          ]
        },
        {
          id: '2',
          message: 'Thank you so much! The resources are very helpful. I appreciate the quick response.',
          author: 'Vikram Singh',
          authorType: 'student',
          timestamp: '2025-08-30T09:30:00Z',
          isInternal: false,
          attachments: []
        }
      ],
      resolution: 'Provided comprehensive interview preparation resources and study materials.',
      resolutionDate: '2025-08-30',
      satisfactionRating: 4,
      relatedTickets: [],
      tags: ['interview-prep', 'study-materials', 'system-design'],
      isEscalated: false,
      actualResolutionTime: '2 days'
    }
  ]);

  const [faqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'How do I reset my placement portal password?',
      answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Enter your registered email address and you will receive a password reset link within 5-10 minutes.',
      category: 'technical',
      helpfulCount: 45,
      isHelpful: true,
      tags: ['password', 'login', 'reset']
    },
    {
      id: '2',
      question: 'When will the next campus drive schedule be announced?',
      answer: 'Campus drive schedules are typically announced 1-2 weeks before the actual date. Keep checking the placement portal and your email for updates. You can also enable notifications to get instant alerts.',
      category: 'placement',
      helpfulCount: 38,
      isHelpful: false,
      tags: ['campus-drive', 'schedule', 'notifications']
    },
    {
      id: '3',
      question: 'What documents do I need for company applications?',
      answer: 'Generally, you need: Updated Resume (PDF), Academic Transcripts, Photo ID Proof, and any relevant certificates. Some companies may require additional documents like cover letters or portfolios.',
      category: 'placement',
      helpfulCount: 52,
      isHelpful: true,
      tags: ['documents', 'application', 'requirements']
    },
    {
      id: '4',
      question: 'How can I update my profile information?',
      answer: 'Go to the "Profile" section in your dashboard. Click on "Edit Profile" and update the required information. Make sure to save your changes before exiting.',
      category: 'account',
      helpfulCount: 29,
      isHelpful: true,
      tags: ['profile', 'update', 'information']
    }
  ]);

  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>(tickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'priority' | 'status'>('recent');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'responses' | 'attachments'>('details');
  const [newResponse, setNewResponse] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'general' as const,
    subcategory: '',
    priority: 'medium' as const,
    contactEmail: 'student@email.com',
    contactPhone: '',
    attachments: [] as File[]
  });

  // Filter and sort tickets
  useEffect(() => {
    let filtered = tickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });

    // Sort tickets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'status':
          const statusOrder = { open: 4, 'in-progress': 3, 'pending-info': 2, resolved: 1, closed: 0 };
          return statusOrder[b.status as keyof typeof statusOrder] - statusOrder[a.status as keyof typeof statusOrder];
        default:
          return 0;
      }
    });

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, selectedCategory, selectedStatus, selectedPriority, sortBy]);

  const createTicket = () => {
    if (!newTicket.title || !newTicket.description) {
      alert('⚠️ Please fill in all required fields!');
      return;
    }

    const ticket: SupportTicket = {
      id: Date.now().toString(),
      ...newTicket,
      ticketNumber: `PLM-2025-${String(tickets.length + 1).padStart(3, '0')}`,
      status: 'open',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      department: getCategoryDepartment(newTicket.category),
      studentId: 'STU123456',
      studentName: 'Current Student',
      attachments: [],
      responses: [
        {
          id: '1',
          message: `Ticket created: ${newTicket.description}`,
          author: 'Current Student',
          authorType: 'student',
          timestamp: new Date().toISOString(),
          isInternal: false,
          attachments: []
        }
      ],
      relatedTickets: [],
      tags: [],
      isEscalated: false
    };

    setTickets(prev => [...prev, ticket]);
    setNewTicket({
      title: '',
      description: '',
      category: 'general',
      subcategory: '',
      priority: 'medium',
      contactEmail: 'student@email.com',
      contactPhone: '',
      attachments: []
    });
    setShowCreateModal(false);
    alert(`✅ Ticket created successfully! Ticket Number: ${ticket.ticketNumber}`);
  };

  const addResponse = () => {
    if (!newResponse.trim() || !selectedTicket) {
      alert('⚠️ Please write a response!');
      return;
    }

    const response: TicketResponse = {
      id: Date.now().toString(),
      message: newResponse,
      author: 'Current Student',
      authorType: 'student',
      timestamp: new Date().toISOString(),
      isInternal: false,
      attachments: []
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === selectedTicket.id 
        ? { 
            ...ticket, 
            responses: [...ticket.responses, response],
            lastUpdate: new Date().toISOString().split('T')[0],
            status: ticket.status === 'pending-info' ? 'in-progress' : ticket.status
          }
        : ticket
    ));

    setNewResponse('');
    alert('📤 Response added successfully!');
  };

  const rateTicket = (ticketId: string, rating: number, feedback?: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            satisfactionRating: rating,
            feedback: feedback
          }
        : ticket
    ));
    
    alert(`⭐ Thank you for rating this ticket ${rating}/5 stars!`);
  };

  const reopenTicket = (ticketId: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status: 'reopened',
            lastUpdate: new Date().toISOString().split('T')[0]
          }
        : ticket
    ));
    
    alert('🔄 Ticket has been reopened!');
  };

  const getCategoryDepartment = (category: string) => {
    const departments = {
      technical: 'IT Support',
      placement: 'Placement Cell',
      academic: 'Academic Support',
      account: 'Student Services',
      general: 'General Support',
      complaint: 'Administration',
      suggestion: 'Quality Assurance'
    };
    return departments[category as keyof typeof departments];
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      technical: SettingsIcon,
      placement: BriefcaseIcon,
      academic: BookOpenIcon,
      account: UserIcon,
      general: MessageSquareIcon,
      complaint: AlertTriangleIcon,
      suggestion: InfoIcon
    };
    return icons[category as keyof typeof icons] || MessageSquareIcon;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      open: AlertCircleIcon,
      'in-progress': ClockIcon,
      'pending-info': HelpCircleIcon,
      resolved: CheckCircleIcon,
      closed: XCircleIcon,
      reopened: RefreshCwIcon
    };
    return icons[status as keyof typeof icons] || AlertCircleIcon;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'pending-info': 'bg-orange-100 text-orange-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
      reopened: 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const markFAQHelpful = (faqId: string, isHelpful: boolean) => {
    alert(isHelpful ? '👍 Thank you for your feedback!' : '👎 We\'ll work on improving this answer.');
  };

  const downloadAttachment = (attachment: TicketAttachment) => {
    alert(`📥 Downloading ${attachment.fileName}...`);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedPriority('all');
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => ['open', 'in-progress', 'pending-info'].includes(t.status)).length,
    resolved: tickets.filter(t => ['resolved', 'closed'].includes(t.status)).length,
    avgResolutionTime: '2.5 days'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
              <p className="text-gray-600 mt-1">Get help with placement queries, technical issues, and more</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFAQModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <BookOpenIcon size={20} />
                View FAQs
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Create Ticket
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Tickets</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                </div>
                <MessageSquareIcon className="text-blue-600" size={24} />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Open Tickets</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.open}</p>
                </div>
                <ClockIcon className="text-yellow-600" size={24} />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Resolved</p>
                  <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
                </div>
                <CheckCircleIcon className="text-green-600" size={24} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Avg Resolution</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.avgResolutionTime}</p>
                </div>
                <TrendingUpIcon className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search tickets by title, description, or ticket number..."
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
                  <option value="technical">Technical</option>
                  <option value="placement">Placement</option>
                  <option value="academic">Academic</option>
                  <option value="account">Account</option>
                  <option value="general">General</option>
                  <option value="complaint">Complaint</option>
                  <option value="suggestion">Suggestion</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="recent">Most Recent</option>
                  <option value="priority">By Priority</option>
                  <option value="status">By Status</option>
                </select>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors lg:hidden"
                >
                  <FilterIcon size={16} />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending-info">Pending Info</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                  <option value="reopened">Reopened</option>
                </select>
                
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                
                {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedPriority !== 'all') && (
                  <button
                    onClick={clearAllFilters}
                    className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map(ticket => {
            const CategoryIcon = getCategoryIcon(ticket.category);
            const StatusIcon = getStatusIcon(ticket.status);
            
            return (
              <div key={ticket.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CategoryIcon size={24} className="text-gray-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{ticket.title}</h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{ticket.description}</p>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                            <StatusIcon size={14} className="inline mr-1" />
                            {ticket.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="text-sm">
                          <span className="text-gray-500">Ticket #:</span>
                          <span className="font-medium text-blue-600 ml-1">{ticket.ticketNumber}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Category:</span>
                          <span className="font-medium ml-1 capitalize">{ticket.category}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Created:</span>
                          <span className="font-medium ml-1">{new Date(ticket.createdDate).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Last Update:</span>
                          <span className="font-medium ml-1">{new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {ticket.assignedTo && (
                        <div className="flex items-center gap-2 mb-4">
                          <UserIcon size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600">Assigned to: {ticket.assignedTo}</span>
                        </div>
                      )}

                      {ticket.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {ticket.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MessageSquareIcon size={14} />
                            {ticket.responses.length} responses
                          </span>
                          {ticket.attachments.length > 0 && (
                            <span className="flex items-center gap-1">
                              <PaperclipIcon size={14} />
                              {ticket.attachments.length} attachments
                            </span>
                          )}
                          {ticket.isEscalated && (
                            <span className="flex items-center gap-1 text-red-600">
                              <AlertTriangleIcon size={14} />
                              Escalated
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowTicketModal(true);
                            }}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                          >
                            <EyeIcon size={14} />
                            View Details
                          </button>
                          
                          {ticket.status === 'closed' && !ticket.satisfactionRating && (
                            <button
                              onClick={() => {
                                const rating = prompt('Rate this ticket (1-5 stars):');
                                if (rating && parseInt(rating) >= 1 && parseInt(rating) <= 5) {
                                  const feedback = prompt('Any additional feedback? (optional)');
                                  rateTicket(ticket.id, parseInt(rating), feedback || undefined);
                                }
                              }}
                              className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                              <StarIcon size={14} />
                              Rate
                            </button>
                          )}
                          
                          {['resolved', 'closed'].includes(ticket.status) && (
                            <button
                              onClick={() => reopenTicket(ticket.id)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                              <RefreshCwIcon size={14} />
                              Reopen
                            </button>
                          )}
                        </div>
                      </div>

                      {ticket.satisfactionRating && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Your Rating:</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map(star => (
                                <StarIcon
                                  key={star}
                                  size={16}
                                  className={star <= ticket.satisfactionRating! ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            {ticket.feedback && (
                              <span className="text-gray-600 ml-2">• {ticket.feedback}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTickets.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <MessageSquareIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedPriority !== 'all'
                ? 'Try adjusting your search criteria or filters'
                : 'Create your first support ticket to get help'
              }
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Your First Ticket
            </button>
          </div>
        )}

        {/* Create Ticket Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Create Support Ticket</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of your issue"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({...newTicket, category: e.target.value as any})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General</option>
                      <option value="technical">Technical Issue</option>
                      <option value="placement">Placement Related</option>
                      <option value="academic">Academic Support</option>
                      <option value="account">Account Issue</option>
                      <option value="complaint">Complaint</option>
                      <option value="suggestion">Suggestion</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as any})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                  <input
                    type="text"
                    value={newTicket.subcategory}
                    onChange={(e) => setNewTicket({...newTicket, subcategory: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Login Issues, Registration Problems, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your issue in detail. Include steps to reproduce the problem if applicable."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
                    <input
                      type="email"
                      value={newTicket.contactEmail}
                      onChange={(e) => setNewTicket({...newTicket, contactEmail: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      value={newTicket.contactPhone}
                      onChange={(e) => setNewTicket({...newTicket, contactPhone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="+91-9876543210"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <PaperclipIcon className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-600">Drag & drop files here or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">Supported: JPG, PNG, PDF, DOC (Max 10MB each)</p>
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          setNewTicket({...newTicket, attachments: Array.from(e.target.files)});
                        }
                      }}
                    />
                  </div>
                  
                  {newTicket.attachments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Selected files:</p>
                      <div className="space-y-1">
                        {newTicket.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between text-sm text-gray-600">
                            <span>{file.name}</span>
                            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createTicket}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ticket Detail Modal */}
        {showTicketModal && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedTicket.title}</h2>
                    <p className="text-gray-600">Ticket #{selectedTicket.ticketNumber}</p>
                  </div>
                  <button
                    onClick={() => setShowTicketModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex gap-1 mt-4">
                  {(['details', 'responses', 'attachments'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Ticket Information</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                              {selectedTicket.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Priority:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                              {selectedTicket.priority.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium capitalize">{selectedTicket.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Department:</span>
                            <span className="font-medium">{selectedTicket.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Created:</span>
                            <span className="font-medium">{new Date(selectedTicket.createdDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Update:</span>
                            <span className="font-medium">{new Date(selectedTicket.lastUpdate).toLocaleDateString()}</span>
                          </div>
                          {selectedTicket.assignedTo && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Assigned To:</span>
                              <span className="font-medium">{selectedTicket.assignedTo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Student:</span>
                            <span className="font-medium">{selectedTicket.studentName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Student ID:</span>
                            <span className="font-medium">{selectedTicket.studentId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{selectedTicket.contactEmail}</span>
                          </div>
                          {selectedTicket.contactPhone && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Phone:</span>
                              <span className="font-medium">{selectedTicket.contactPhone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">{selectedTicket.description}</p>
                      </div>
                    </div>
                    
                    {selectedTicket.resolution && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Resolution</h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800 leading-relaxed">{selectedTicket.resolution}</p>
                          {selectedTicket.resolutionDate && (
                            <p className="text-green-600 text-sm mt-2">
                              Resolved on {new Date(selectedTicket.resolutionDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {selectedTicket.tags.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedTicket.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'responses' && (
                  <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900">Ticket Conversation</h3>
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {selectedTicket.responses.map(response => (
                        <div key={response.id} className={`flex gap-4 ${response.authorType === 'student' ? 'flex-row-reverse' : ''}`}>
                          <div className="flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              response.authorType === 'student' ? 'bg-blue-500' : 'bg-gray-500'
                            }`}>
                              <UserIcon size={16} className="text-white" />
                            </div>
                          </div>
                          
                          <div className={`flex-1 ${response.authorType === 'student' ? 'text-right' : ''}`}>
                            <div className={`inline-block p-4 rounded-lg max-w-xs lg:max-w-md ${
                              response.authorType === 'student' 
                                ? 'bg-blue-500 text-white rounded-br-sm' 
                                : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                            }`}>
                              <div className="mb-1">
                                <span className={`text-xs font-medium ${response.authorType === 'student' ? 'text-blue-100' : 'text-gray-600'}`}>
                                  {response.author}
                                </span>
                                <span className={`text-xs ml-2 ${response.authorType === 'student' ? 'text-blue-200' : 'text-gray-500'}`}>
                                  {new Date(response.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="leading-relaxed">{response.message}</p>
                              
                              {response.attachments.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-opacity-20">
                                  {response.attachments.map(attachment => (
                                    <div key={attachment.id} className="flex items-center gap-2 text-xs">
                                      <PaperclipIcon size={12} />
                                      <span>{attachment.name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {!['closed', 'resolved'].includes(selectedTicket.status) && (
                      <div className="border-t pt-6">
                        <h4 className="font-medium text-gray-900 mb-3">Add Response</h4>
                        <div className="space-y-3">
                          <textarea
                            value={newResponse}
                            onChange={(e) => setNewResponse(e.target.value)}
                            rows={4}
                            placeholder="Type your response here..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={addResponse}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <SendIcon size={16} />
                              Send Response
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                              <PaperclipIcon size={16} />
                              Attach File
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'attachments' && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-6">Attachments</h3>
                    {selectedTicket.attachments.length > 0 ? (
                      <div className="space-y-3">
                        {selectedTicket.attachments.map(attachment => (
                          <div key={attachment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                {attachment.fileType.includes('image') ? (
                                  <ImageIcon size={20} className="text-gray-600" />
                                ) : (
                                  <FileTextIcon size={20} className="text-gray-600" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{attachment.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span>{attachment.fileName}</span>
                                  <span>•</span>
                                  <span>{attachment.fileSize}</span>
                                  <span>•</span>
                                  <span>Uploaded by {attachment.uploadedBy}</span>
                                  <span>•</span>
                                  <span>{new Date(attachment.uploadDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => downloadAttachment(attachment)}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                              <DownloadIcon size={14} />
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <PaperclipIcon className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-600">No attachments for this ticket</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex gap-3">
                  {selectedTicket.status === 'closed' && !selectedTicket.satisfactionRating && (
                    <button
                      onClick={() => {
                        const rating = prompt('Rate this ticket (1-5 stars):');
                        if (rating && parseInt(rating) >= 1 && parseInt(rating) <= 5) {
                          const feedback = prompt('Any additional feedback? (optional)');
                          rateTicket(selectedTicket.id, parseInt(rating), feedback || undefined);
                        }
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <StarIcon size={16} />
                      Rate Support
                    </button>
                  )}
                  
                  {['resolved', 'closed'].includes(selectedTicket.status) && (
                    <button
                      onClick={() => {
                        reopenTicket(selectedTicket.id);
                        setShowTicketModal(false);
                      }}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <RefreshCwIcon size={16} />
                      Reopen Ticket
                    </button>
                  )}
                  
                  <button
                    onClick={() => alert(`📧 Sharing ticket ${selectedTicket.ticketNumber}...`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ShareIcon size={16} />
                    Share
                  </button>
                  
                  <button
                    onClick={() => setShowTicketModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Modal */}
        {showFAQModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
                <button
                  onClick={() => setShowFAQModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {faqs.map(faq => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0">
                        {faq.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {faq.helpfulCount} people found this helpful
                        </span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => markFAQHelpful(faq.id, true)}
                            className={`p-2 rounded-lg transition-colors ${
                              faq.isHelpful 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'
                            }`}
                            title="This was helpful"
                          >
                            <ThumbsUpIcon size={16} />
                          </button>
                          <button
                            onClick={() => markFAQHelpful(faq.id, false)}
                            className="bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700 p-2 rounded-lg transition-colors"
                            title="This was not helpful"
                          >
                            <ThumbsDownIcon size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 mb-4">Didn't find what you were looking for?</p>
                <button
                  onClick={() => {
                    setShowFAQModal(false);
                    setShowCreateModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Create a Support Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions Sidebar */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="space-y-3">
            {/* Emergency Contact */}
            <div className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors cursor-pointer" title="Emergency Contact">
              <button
                onClick={() => alert('📞 Emergency Contact: +91-1234567890\n📧 emergency@college.edu')}
                className="flex items-center justify-center"
              >
                <PhoneIcon size={24} />
              </button>
            </div>
            
            {/* Live Chat */}
            <div className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors cursor-pointer" title="Live Chat Support">
              <button
                onClick={() => alert('💬 Live chat feature coming soon! For now, please create a support ticket.')}
                className="flex items-center justify-center"
              >
                <MessageCircleIcon size={24} />
              </button>
            </div>
            
            {/* Quick Ticket */}
            <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer" title="Quick Ticket">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center"
              >
                <PlusIcon size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Additional Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Knowledge Base</h3>
              <p className="text-sm text-gray-600 mb-4">Browse our comprehensive documentation and guides</p>
              <button
                onClick={() => alert('📚 Opening knowledge base...')}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Browse Articles
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon size={32} className="text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600 mb-4">Speak directly with our support team</p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">+91-1234567890</p>
                <p className="text-xs text-gray-600">Mon-Fri: 9 AM - 6 PM</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MailIcon size={32} className="text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">Send us an email for non-urgent matters</p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">support@college.edu</p>
                <p className="text-xs text-gray-600">Response within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <ClockIcon className="text-blue-600" size={24} />
            <h2 className="text-lg font-semibold text-blue-900">Support Hours</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-blue-900 mb-3">Regular Support</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Monday - Friday:</span>
                  <span className="font-medium text-blue-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Saturday:</span>
                  <span className="font-medium text-blue-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Sunday:</span>
                  <span className="font-medium text-blue-900">Closed</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-blue-900 mb-3">Emergency Support</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Technical Issues:</span>
                  <span className="font-medium text-blue-900">24/7 Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Placement Urgent:</span>
                  <span className="font-medium text-blue-900">24/7 Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Emergency Contact:</span>
                  <span className="font-medium text-blue-900">+91-9876543210</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-blue-800 text-sm">
              <InfoIcon size={16} className="inline mr-2" />
              For urgent placement-related issues during company drives, emergency support is available 24/7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPlacementRaiseTicket;
