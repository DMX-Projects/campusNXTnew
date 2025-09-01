// pages/RaiseTicket.tsx
import React, { useState } from 'react';
import { 
  TicketIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  CalendarDaysIcon,
  TagIcon,
  XMarkIcon,
  PaperClipIcon,
  ArrowRightIcon,
  CheckIcon,
  PencilIcon,
  UserPlusIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const RaiseTicket: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all-tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // Form states
  const [ticketForm, setTicketForm] = useState({
    category: 'Technical',
    priority: 'Medium',
    subject: '',
    description: '',
    email: '',
    phone: '',
    attachments: []
  });
  const [responseText, setResponseText] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tickets, setTickets] = useState([
    {
      id: 1,
      ticketNumber: 'TKT-2025-001',
      title: 'Unable to access placement portal',
      description: 'Getting error when trying to log into the placement portal with correct credentials. I have tried resetting password multiple times but still facing issues.',
      category: 'Technical',
      priority: 'High',
      status: 'Open',
      createdBy: 'Rahul Sharma (CS21001)',
      assignedTo: 'IT Support Team',
      createdDate: '2025-09-01',
      updatedDate: '2025-09-01',
      responses: 2,
      attachments: 1,
      email: 'rahul.sharma@student.edu',
      phone: '+91-9876543210',
      conversation: [
        {
          id: 1,
          author: 'Rahul Sharma',
          role: 'Student',
          message: 'I am unable to access the placement portal. Getting authentication error.',
          timestamp: '2025-09-01 09:30 AM',
          attachments: ['screenshot_error.png']
        },
        {
          id: 2,
          author: 'IT Support',
          role: 'Support',
          message: 'We are looking into this issue. Can you please clear your browser cache and try again?',
          timestamp: '2025-09-01 11:15 AM',
          attachments: []
        }
      ]
    },
    {
      id: 2,
      ticketNumber: 'TKT-2025-002',
      title: 'Request for resume review appointment',
      description: 'I need to schedule an appointment with the placement officer for resume review before the upcoming placement season.',
      category: 'General',
      priority: 'Medium',
      status: 'In Progress',
      createdBy: 'Priya Patel (IT21002)',
      assignedTo: 'Placement Officer',
      createdDate: '2025-08-30',
      updatedDate: '2025-09-01',
      responses: 3,
      attachments: 0,
      email: 'priya.patel@student.edu',
      phone: '+91-9876543211',
      conversation: [
        {
          id: 1,
          author: 'Priya Patel',
          role: 'Student',
          message: 'I would like to schedule a resume review appointment.',
          timestamp: '2025-08-30 02:00 PM',
          attachments: []
        },
        {
          id: 2,
          author: 'Placement Officer',
          role: 'Staff',
          message: 'Please share your current resume for initial review.',
          timestamp: '2025-08-30 04:30 PM',
          attachments: []
        },
        {
          id: 3,
          author: 'Priya Patel',
          role: 'Student',
          message: 'I have attached my current resume. Please let me know available time slots.',
          timestamp: '2025-09-01 10:00 AM',
          attachments: ['priya_resume.pdf']
        }
      ]
    },
    {
      id: 3,
      ticketNumber: 'TKT-2025-003',
      title: 'Company eligibility criteria clarification',
      description: 'Need clarification about eligibility criteria for Google campus drive. My CGPA is 8.5, is it sufficient?',
      category: 'Information',
      priority: 'Low',
      status: 'Resolved',
      createdBy: 'Amit Kumar (EC21003)',
      assignedTo: 'Placement Coordinator',
      createdDate: '2025-08-28',
      updatedDate: '2025-08-29',
      responses: 1,
      attachments: 0,
      email: 'amit.kumar@student.edu',
      phone: '+91-9876543212',
      conversation: [
        {
          id: 1,
          author: 'Amit Kumar',
          role: 'Student',
          message: 'What are the eligibility criteria for Google campus drive?',
          timestamp: '2025-08-28 11:00 AM',
          attachments: []
        },
        {
          id: 2,
          author: 'Placement Coordinator',
          role: 'Staff',
          message: 'Google requires minimum 8.0 CGPA with no active backlogs. Your CGPA of 8.5 meets the requirement.',
          timestamp: '2025-08-29 09:00 AM',
          attachments: []
        }
      ]
    },
    {
      id: 4,
      ticketNumber: 'TKT-2025-004',
      title: 'Missing test results',
      description: 'My aptitude test results are not showing in the portal after the TCS test conducted yesterday.',
      category: 'Technical',
      priority: 'High',
      status: 'Open',
      createdBy: 'Sneha Singh (IT21004)',
      assignedTo: 'Technical Team',
      createdDate: '2025-09-01',
      updatedDate: '2025-09-01',
      responses: 0,
      attachments: 2,
      email: 'sneha.singh@student.edu',
      phone: '+91-9876543213',
      conversation: [
        {
          id: 1,
          author: 'Sneha Singh',
          role: 'Student',
          message: 'My TCS aptitude test results are not visible in the portal.',
          timestamp: '2025-09-01 03:00 PM',
          attachments: ['test_confirmation.pdf', 'portal_screenshot.png']
        }
      ]
    }
  ]);

  const stats = [
    { name: 'Total Tickets', value: tickets.length.toString(), icon: TicketIcon, color: 'bg-blue-500' },
    { name: 'Open Tickets', value: tickets.filter(t => t.status === 'Open').length.toString(), icon: ExclamationTriangleIcon, color: 'bg-red-500' },
    { name: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length.toString(), icon: ClockIcon, color: 'bg-yellow-500' },
    { name: 'Resolved', value: tickets.filter(t => t.status === 'Resolved').length.toString(), icon: CheckCircleIcon, color: 'bg-green-500' }
  ];

  const categories = [
    { name: 'Technical', count: tickets.filter(t => t.category === 'Technical').length, color: 'bg-blue-100 text-blue-800' },
    { name: 'General', count: tickets.filter(t => t.category === 'General').length, color: 'bg-green-100 text-green-800' },
    { name: 'Information', count: tickets.filter(t => t.category === 'Information').length, color: 'bg-purple-100 text-purple-800' },
    { name: 'Complaint', count: tickets.filter(t => t.category === 'Complaint').length, color: 'bg-red-100 text-red-800' }
  ];

  const assignmentOptions = [
    'IT Support Team',
    'Placement Officer',
    'Placement Coordinator',
    'Technical Team',
    'Academic Department',
    'Administration'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-blue-100 text-blue-800';
      case 'General': return 'bg-green-100 text-green-800';
      case 'Information': return 'bg-purple-100 text-purple-800';
      case 'Complaint': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;
    const matchesTab = activeTab === 'all-tickets' || ticket.status.toLowerCase().replace(' ', '-') === activeTab;
    return matchesSearch && matchesPriority && matchesCategory && matchesTab;
  });

  // Button handlers
  const handleViewDetails = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true);
  };

  const handleAddResponse = (ticket: any) => {
    setSelectedTicket(ticket);
    setResponseText('');
    setShowResponseModal(true);
  };

  const handleAssign = (ticket: any) => {
    setSelectedTicket(ticket);
    setAssignTo(ticket.assignedTo || '');
    setShowAssignModal(true);
  };

  const handleEdit = (ticket: any) => {
    setSelectedTicket(ticket);
    setTicketForm({
      category: ticket.category,
      priority: ticket.priority,
      subject: ticket.title,
      description: ticket.description,
      email: ticket.email,
      phone: ticket.phone,
      attachments: []
    });
    setShowEditModal(true);
  };

  const handleResolve = (ticketId: number) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: 'Resolved', updatedDate: new Date().toISOString().split('T')[0] }
        : ticket
    ));
  };

  const handleCreateTicket = async () => {
    if (!ticketForm.subject || !ticketForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newTicket = {
      id: Math.max(...tickets.map(t => t.id)) + 1,
      ticketNumber: `TKT-2025-${String(tickets.length + 1).padStart(3, '0')}`,
      title: ticketForm.subject,
      description: ticketForm.description,
      category: ticketForm.category,
      priority: ticketForm.priority,
      status: 'Open',
      createdBy: 'Current User (USER001)',
      assignedTo: '',
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      responses: 0,
      attachments: ticketForm.attachments.length,
      email: ticketForm.email,
      phone: ticketForm.phone,
      conversation: [
        {
          id: 1,
          author: 'Current User',
          role: 'Student',
          message: ticketForm.description,
          timestamp: new Date().toLocaleString(),
          attachments: ticketForm.attachments
        }
      ]
    };

    setTickets([...tickets, newTicket]);
    setTicketForm({
      category: 'Technical',
      priority: 'Medium',
      subject: '',
      description: '',
      email: '',
      phone: '',
      attachments: []
    });
    setIsSubmitting(false);
    setShowCreateModal(false);
    
    alert('Ticket created successfully!');
  };

  const handleSubmitResponse = async () => {
    if (!responseText.trim()) {
      alert('Please enter a response');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket?.id) {
        const newConversation = [
          ...ticket.conversation,
          {
            id: ticket.conversation.length + 1,
            author: 'Current User',
            role: 'Student',
            message: responseText,
            timestamp: new Date().toLocaleString(),
            attachments: []
          }
        ];
        return {
          ...ticket,
          responses: ticket.responses + 1,
          updatedDate: new Date().toISOString().split('T')[0],
          conversation: newConversation
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setResponseText('');
    setIsSubmitting(false);
    setShowResponseModal(false);
    alert('Response added successfully!');
  };

  const handleSubmitAssignment = async () => {
    if (!assignTo) {
      alert('Please select an assignment option');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket?.id 
        ? { ...ticket, assignedTo: assignTo, status: 'In Progress', updatedDate: new Date().toISOString().split('T')[0] }
        : ticket
    );

    setTickets(updatedTickets);
    setIsSubmitting(false);
    setShowAssignModal(false);
    alert('Ticket assigned successfully!');
  };

  const handleUpdateTicket = async () => {
    if (!ticketForm.subject || !ticketForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket?.id 
        ? { 
            ...ticket, 
            title: ticketForm.subject,
            description: ticketForm.description,
            category: ticketForm.category,
            priority: ticketForm.priority,
            email: ticketForm.email,
            phone: ticketForm.phone,
            updatedDate: new Date().toISOString().split('T')[0]
          }
        : ticket
    );

    setTickets(updatedTickets);
    setIsSubmitting(false);
    setShowEditModal(false);
    alert('Ticket updated successfully!');
  };

  const closeAllModals = () => {
    setShowCreateModal(false);
    setShowDetailsModal(false);
    setShowResponseModal(false);
    setShowAssignModal(false);
    setShowEditModal(false);
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Raise Ticket</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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

      {/* Categories Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Ticket Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="text-center">
              <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${category.color} mb-2`}>
                <TagIcon className="w-4 h-4 mr-2" />
                {category.name}
              </div>
              <p className="text-2xl font-bold text-gray-900">{category.count}</p>
              <p className="text-sm text-gray-600">tickets</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select 
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="General">General</option>
            <option value="Information">Information</option>
            <option value="Complaint">Complaint</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'all-tickets', label: 'All Tickets' },
              { key: 'open', label: 'Open' },
              { key: 'in-progress', label: 'In Progress' },
              { key: 'resolved', label: 'Resolved' }
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
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <TicketIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
                <p className="text-gray-600">Try adjusting your filters or create a new ticket</p>
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div key={ticket.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                        <span className="text-sm font-mono text-gray-500">#{ticket.ticketNumber}</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(ticket.category)}`}>
                          {ticket.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{ticket.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-2" />
                          {ticket.createdBy}
                        </div>
                        <div className="flex items-center">
                          <CalendarDaysIcon className="w-4 h-4 mr-2" />
                          Created: {ticket.createdDate}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-2" />
                          Updated: {ticket.updatedDate}
                        </div>
                        <div className="flex items-center">
                          <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                          {ticket.responses} responses
                        </div>
                      </div>

                      {ticket.assignedTo && (
                        <div className="mt-3 text-sm">
                          <span className="font-medium text-gray-700">Assigned to:</span> {ticket.assignedTo}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => handleViewDetails(ticket)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleAddResponse(ticket)}
                        className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
                      >
                        Add Response
                      </button>
                      {ticket.attachments > 0 && (
                        <span className="text-gray-500 text-sm flex items-center">
                          <PaperClipIcon className="w-4 h-4 mr-1" />
                          {ticket.attachments} attachment{ticket.attachments !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {ticket.status === 'Open' && (
                        <button 
                          onClick={() => handleAssign(ticket)}
                          className="px-3 py-1 text-xs bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors"
                        >
                          Assign
                        </button>
                      )}
                      {ticket.status === 'In Progress' && (
                        <button 
                          onClick={() => handleResolve(ticket.id)}
                          className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                      <button 
                        onClick={() => handleEdit(ticket)}
                        className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Raise New Ticket</h2>
              <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select 
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Technical">Technical</option>
                    <option value="General">General</option>
                    <option value="Information">Information</option>
                    <option value="Complaint">Complaint</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                  <select 
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Brief description of the issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  rows={6}
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Detailed description of the issue or request..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachments (Optional)</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setTicketForm({...ticketForm, attachments: Array.from(e.target.files || [])})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-sm text-gray-500 mt-1">You can attach screenshots, documents, or other relevant files</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <EnvelopeIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="relative">
                    <PhoneIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      value={ticketForm.phone}
                      onChange={(e) => setTicketForm({...ticketForm, phone: e.target.value})}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-4">
              <button
                onClick={closeAllModals}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateTicket}
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  'Submit Ticket'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedTicket.title}</h2>
                <p className="text-sm text-gray-500">#{selectedTicket.ticketNumber}</p>
              </div>
              <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Conversation</h3>
                    <div className="space-y-4">
                      {selectedTicket.conversation.map((message: any) => (
                        <div key={message.id} className={`flex ${message.role === 'Student' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md rounded-lg p-4 ${
                            message.role === 'Student' 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-sm">{message.author}</span>
                              <span className={`text-xs ${
                                message.role === 'Student' ? 'text-indigo-200' : 'text-gray-500'
                              }`}>
                                {message.role}
                              </span>
                            </div>
                            <p className="text-sm">{message.message}</p>
                            {message.attachments.length > 0 && (
                              <div className="mt-2">
                                {message.attachments.map((file: string, idx: number) => (
                                  <div key={idx} className="flex items-center text-xs">
                                    <PaperClipIcon className="w-3 h-3 mr-1" />
                                    {file}
                                  </div>
                                ))}
                              </div>
                            )}
                            <p className={`text-xs mt-2 ${
                              message.role === 'Student' ? 'text-indigo-200' : 'text-gray-400'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Details</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(selectedTicket.status)}`}>
                          {selectedTicket.status}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Priority:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${getPriorityColor(selectedTicket.priority)}`}>
                          {selectedTicket.priority}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Category:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${getCategoryColor(selectedTicket.category)}`}>
                          {selectedTicket.category}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Created:</span>
                        <span className="ml-2 text-gray-600">{selectedTicket.createdDate}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Updated:</span>
                        <span className="ml-2 text-gray-600">{selectedTicket.updatedDate}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Created by:</span>
                        <span className="ml-2 text-gray-600">{selectedTicket.createdBy}</span>
                      </div>
                      {selectedTicket.assignedTo && (
                        <div>
                          <span className="font-medium text-gray-700">Assigned to:</span>
                          <span className="ml-2 text-gray-600">{selectedTicket.assignedTo}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-700 mb-2">Contact Info</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">{selectedTicket.email}</span>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">{selectedTicket.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={closeAllModals}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  closeAllModals();
                  handleAddResponse(selectedTicket);
                }}
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Response
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Add Response</h2>
              <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">{selectedTicket.title}</h3>
                <p className="text-sm text-gray-500">#{selectedTicket.ticketNumber}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                <textarea
                  rows={6}
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Type your response here..."
                ></textarea>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachments (Optional)</label>
                <input
                  type="file"
                  multiple
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex space-x-4">
              <button
                onClick={closeAllModals}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitResponse}
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Response'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Assign Ticket</h2>
              <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">{selectedTicket.title}</h3>
                <p className="text-sm text-gray-500">#{selectedTicket.ticketNumber}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign to</label>
                <select 
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select team/person</option>
                  {assignmentOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex space-x-4">
              <button
                onClick={closeAllModals}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitAssignment}
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Assigning...
                  </>
                ) : (
                  'Assign Ticket'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Edit Ticket</h2>
              <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Technical">Technical</option>
                    <option value="General">General</option>
                    <option value="Information">Information</option>
                    <option value="Complaint">Complaint</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select 
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={6}
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={ticketForm.email}
                    onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={ticketForm.phone}
                    onChange={(e) => setTicketForm({...ticketForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex space-x-4">
              <button
                onClick={closeAllModals}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateTicket}
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  'Update Ticket'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaiseTicket;
