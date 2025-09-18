import React, { useState } from 'react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: 'Maintenance' | 'IT Support' | 'Security' | 'Housekeeping' | 'Administrative' | 'Food Services' | 'Facilities' | 'Other';
  subCategory?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Cancelled';
  createdDate: string;
  updatedDate: string;
  assignedTo?: string;
  reportedBy: string;
  reporterContact: string;
  location: string;
  attachments?: string[];
  estimatedResolution?: string;
  actualResolution?: string;
  resolution?: string;
  cost?: number;
  comments: TicketComment[];
}

interface TicketComment {
  id: string;
  author: string;
  message: string;
  date: string;
  isInternal: boolean;
}

const RaiseTicketManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'raise' | 'mytickets' | 'alltickets' | 'analytics'>('raise');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in-progress' | 'resolved' | 'closed'>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states for new ticket
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    category: 'Maintenance' as Ticket['category'],
    subCategory: '',
    priority: 'Medium' as Ticket['priority'],
    location: '',
    reporterContact: '',
    urgency: false
  });

  // Sample tickets data
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TKT001', title: 'Broken ceiling fan in Room A-205', 
      description: 'The ceiling fan in room A-205 is making loud noises and not rotating properly. Students are unable to sleep due to the noise.',
      category: 'Maintenance', subCategory: 'Electrical', priority: 'High', status: 'In Progress',
      createdDate: '2025-08-29T10:30:00Z', updatedDate: '2025-08-30T14:20:00Z',
      assignedTo: 'Maintenance Team - Ravi Kumar', reportedBy: 'Rahul Sharma (2023CSE001)',
      reporterContact: '+91-9876543210', location: 'A Block - Room 205',
      estimatedResolution: '2025-08-31T18:00:00Z',
      comments: [
        { id: 'C001', author: 'Maintenance Team', message: 'Issue acknowledged. Will inspect today.', date: '2025-08-29T11:00:00Z', isInternal: false },
        { id: 'C002', author: 'Maintenance Team', message: 'Fan motor needs replacement. Ordered new part.', date: '2025-08-30T14:20:00Z', isInternal: false }
      ]
    },
    {
      id: 'TKT002', title: 'WiFi connectivity issues in B Block', 
      description: 'Students in B Block are experiencing frequent WiFi disconnections, especially during evening hours. This is affecting online classes and assignments.',
      category: 'IT Support', subCategory: 'Network', priority: 'High', status: 'Open',
      createdDate: '2025-08-30T16:45:00Z', updatedDate: '2025-08-30T16:45:00Z',
      reportedBy: 'Priya Patel (2023ECE015)', reporterContact: '+91-9876543211',
      location: 'B Block - Common Areas and Rooms', comments: []
    },
    {
      id: 'TKT003', title: 'Clogged drainage in C Block bathroom', 
      description: 'The drainage system in the C Block common bathroom (2nd floor) is completely blocked, causing water overflow.',
      category: 'Maintenance', subCategory: 'Plumbing', priority: 'Critical', status: 'Resolved',
      createdDate: '2025-08-28T08:15:00Z', updatedDate: '2025-08-29T17:30:00Z',
      assignedTo: 'Plumbing Team - Suresh Reddy', reportedBy: 'Amit Singh (2022ME020)',
      reporterContact: '+91-9876543212', location: 'C Block - 2nd Floor Bathroom',
      actualResolution: '2025-08-29T17:30:00Z', resolution: 'Drainage cleared and pipes cleaned. Issue resolved.',
      cost: 2500, comments: [
        { id: 'C003', author: 'Plumbing Team', message: 'Emergency repair completed. Drainage restored.', date: '2025-08-29T17:30:00Z', isInternal: false }
      ]
    },
    {
      id: 'TKT004', title: 'Insufficient lighting in D Block corridor', 
      description: 'Several tube lights in the D Block main corridor are not working, making it dark during evening hours.',
      category: 'Maintenance', subCategory: 'Electrical', priority: 'Medium', status: 'Open',
      createdDate: '2025-08-31T12:00:00Z', updatedDate: '2025-08-31T12:00:00Z',
      reportedBy: 'Sneha Gupta (2023IT008)', reporterContact: '+91-9876543213',
      location: 'D Block - Main Corridor', comments: []
    },
    {
      id: 'TKT005', title: 'Broken door lock in E Block laundry room', 
      description: 'The electronic door lock in the E Block laundry room is malfunctioning. Students cannot access the laundry facilities.',
      category: 'Security', subCategory: 'Access Control', priority: 'High', status: 'In Progress',
      createdDate: '2025-08-30T09:20:00Z', updatedDate: '2025-08-31T10:15:00Z',
      assignedTo: 'Security Team - Rajesh Kumar', reportedBy: 'Hostel Warden',
      reporterContact: '+91-9876543214', location: 'E Block - Laundry Room',
      estimatedResolution: '2025-09-01T12:00:00Z',
      comments: [
        { id: 'C004', author: 'Security Team', message: 'Temporary manual lock installed. Electronic lock replacement in progress.', date: '2025-08-31T10:15:00Z', isInternal: false }
      ]
    }
  ]);

  const subCategories = {
    'Maintenance': ['Electrical', 'Plumbing', 'Carpentry', 'Painting', 'General Repair'],
    'IT Support': ['Network', 'Hardware', 'Software', 'Internet', 'System Access'],
    'Security': ['Access Control', 'CCTV', 'Alarm System', 'Guard Services', 'Emergency'],
    'Housekeeping': ['Cleaning', 'Waste Management', 'Laundry', 'Pest Control', 'Supplies'],
    'Administrative': ['Fee Issues', 'Documentation', 'Policies', 'Complaints', 'Suggestions'],
    'Food Services': ['Mess Quality', 'Menu Issues', 'Hygiene', 'Timing', 'Special Diet'],
    'Facilities': ['Common Areas', 'Recreation', 'Study Rooms', 'Sports', 'Events'],
    'Other': ['Miscellaneous']
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'open' && ticket.status === 'Open') ||
      (filterStatus === 'in-progress' && ticket.status === 'In Progress') ||
      (filterStatus === 'resolved' && ticket.status === 'Resolved') ||
      (filterStatus === 'closed' && ticket.status === 'Closed');
    
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.title || !ticketForm.description || !ticketForm.location) {
      alert('Please fill in all required fields');
      return;
    }

    const newTicket: Ticket = {
      id: `TKT${(tickets.length + 1).toString().padStart(3, '0')}`,
      title: ticketForm.title,
      description: ticketForm.description,
      category: ticketForm.category,
      subCategory: ticketForm.subCategory,
      priority: ticketForm.urgency ? 'Critical' : ticketForm.priority,
      status: 'Open',
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      reportedBy: 'Current User', // In real app, this would be from auth context
      reporterContact: ticketForm.reporterContact,
      location: ticketForm.location,
      comments: []
    };

    setTickets([...tickets, newTicket]);
    setTicketForm({
      title: '', description: '', category: 'Maintenance', subCategory: '',
      priority: 'Medium', location: '', reporterContact: '', urgency: false
    });
    alert('Ticket submitted successfully! You will receive updates on the progress.');
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-500 text-white';
      case 'In Progress': return 'bg-accent-500 text-white';
      case 'Resolved': return 'bg-secondary-500 text-white';
      case 'Closed': return 'bg-gray-500 text-white';
      case 'Cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Analytics data
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="">
        
        {/* Tab Navigation */}
        <nav className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm border">
          {[
            { key: 'raise', label: 'Raise New Ticket' },
            { key: 'mytickets', label: 'My Tickets' },
            { key: 'alltickets', label: 'All Tickets' },
            { key: 'analytics', label: 'Ticket Analytics' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
                activeTab === tab.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Raise New Ticket Tab */}
        {activeTab === 'raise' && (
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Report an Issue</h2>
              <p className="text-gray-600">Please provide detailed information about the issue you're experiencing. This helps us resolve it faster.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketForm.title}
                    onChange={(e) => setTicketForm({...ticketForm, title: e.target.value})}
                    placeholder="Brief summary of the issue"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({...ticketForm, category: e.target.value as Ticket['category'], subCategory: ''})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {Object.keys(subCategories).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                  <select
                    value={ticketForm.subCategory}
                    onChange={(e) => setTicketForm({...ticketForm, subCategory: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select sub-category</option>
                    {subCategories[ticketForm.category]?.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketForm.location}
                    onChange={(e) => setTicketForm({...ticketForm, location: e.target.value})}
                    placeholder="e.g., A Block - Room 205, Common Area"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value as Ticket['priority']})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="Low">Low - Can wait a few days</option>
                    <option value="Medium">Medium - Should be fixed soon</option>
                    <option value="High">High - Needs immediate attention</option>
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    placeholder="Please describe the issue in detail. Include when it started, how often it occurs, and any steps you've already taken..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-vertical"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    value={ticketForm.reporterContact}
                    onChange={(e) => setTicketForm({...ticketForm, reporterContact: e.target.value})}
                    placeholder="Your contact number for updates"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="urgency"
                    checked={ticketForm.urgency}
                    onChange={(e) => setTicketForm({...ticketForm, urgency: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="urgency" className="text-sm text-gray-700">
                    This is an emergency/safety issue requiring immediate attention
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                >
                  Submit Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setTicketForm({
                    title: '', description: '', category: 'Maintenance', subCategory: '',
                    priority: 'Medium', location: '', reporterContact: '', urgency: false
                  })}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Reset Form
                </button>
              </div>
            </form>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">📋 Tips for Better Support</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Be specific about the location and timing of the issue</li>
                <li>• Include any error messages or unusual sounds/smells</li>
                <li>• Mention if the issue affects multiple people</li>
                <li>• For technical issues, note what you were doing when it occurred</li>
              </ul>
            </div>
          </div>
        )}

        {/* All Tickets Tab */}
        {(activeTab === 'mytickets' || activeTab === 'alltickets') && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Open Tickets</h3>
                <p className="text-3xl font-bold text-blue-600">{openTickets}</p>
                <p className="text-sm text-gray-600">Awaiting action</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-accent-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">In Progress</h3>
                <p className="text-3xl font-bold text-accent-600">{inProgressTickets}</p>
                <p className="text-sm text-gray-600">Being worked on</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-secondary-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Resolved</h3>
                <p className="text-3xl font-bold text-secondary-600">{resolvedTickets}</p>
                <p className="text-sm text-gray-600">Recently completed</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Tickets</h3>
                <p className="text-3xl font-bold text-primary-600">{totalTickets}</p>
                <p className="text-sm text-gray-600">All time</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search tickets by ID, title, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'All Status' },
                    { key: 'open', label: 'Open' },
                    { key: 'in-progress', label: 'In Progress' },
                    { key: 'resolved', label: 'Resolved' },
                    { key: 'closed', label: 'Closed' }
                  ].map((status) => (
                    <button
                      key={status.key}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        filterStatus === status.key
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'border border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600'
                      }`}
                      onClick={() => setFilterStatus(status.key as any)}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tickets List */}
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-800">{ticket.title}</h3>
                          <span className="text-sm text-gray-500">#{ticket.id}</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ticket.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>📍 {ticket.location}</span>
                          <span>📅 {formatDateTime(ticket.createdDate)}</span>
                          <span>👤 {ticket.reportedBy}</span>
                          {ticket.assignedTo && <span>🔧 {ticket.assignedTo}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <button
                          onClick={() => handleViewTicket(ticket)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredTickets.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m0 0V9a1 1 0 011-1h.01a1 1 0 011 1v3m-6 0v6a1 1 0 001 1h6a1 1 0 001-1v-6m0 0V9a1 1 0 011-1h.01a1 1 0 011 1v3m0 9v6a1 1 0 01-1 1H7a1 1 0 01-1-1v-6a1 1 0 011-1h6z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No tickets found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tickets by Category</h3>
                <div className="space-y-3">
                  {Object.keys(subCategories).map((category) => {
                    const count = tickets.filter(t => t.category === category).length;
                    const percentage = totalTickets > 0 ? Math.round((count / totalTickets) * 100) : 0;
                    return (
                      <div key={category}>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{category}:</span>
                          <span className="font-medium">{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Priority Distribution</h3>
                <div className="space-y-2">
                  {['Critical', 'High', 'Medium', 'Low'].map((priority) => {
                    const count = tickets.filter(t => t.priority === priority).length;
                    return (
                      <div key={priority} className="flex justify-between text-sm">
                        <span className="text-gray-600">{priority}:</span>
                        <span className={`font-medium px-2 py-1 rounded ${getPriorityColor(priority)}`}>
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Resolution Rate</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary-600 mb-2">
                    {totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0}%
                  </div>
                  <p className="text-sm text-gray-600">Tickets resolved successfully</p>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-secondary-500 h-2 rounded-full"
                      style={{ width: `${totalTickets > 0 ? (resolvedTickets / totalTickets) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Ticket Activity</h3>
              <div className="space-y-4">
                {tickets.slice(0, 5).map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">#{ticket.id} - {ticket.title}</h4>
                      <p className="text-sm text-gray-600">
                        {ticket.status === 'Resolved' ? 'Resolved' : 'Updated'} on {formatDateTime(ticket.updatedDate)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ticket Detail Modal */}
        {isModalOpen && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">#{selectedTicket.id}</h2>
                  <p className="text-gray-600">{selectedTicket.title}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Ticket Details */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ticket Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                            {selectedTicket.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Priority:</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getPriorityColor(selectedTicket.priority)}`}>
                            {selectedTicket.priority}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">{selectedTicket.category}</span>
                        </div>
                        {selectedTicket.subCategory && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sub Category:</span>
                            <span className="font-medium">{selectedTicket.subCategory}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">{selectedTicket.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reported By:</span>
                          <span className="font-medium">{selectedTicket.reportedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span className="font-medium">{formatDateTime(selectedTicket.createdDate)}</span>
                        </div>
                        {selectedTicket.assignedTo && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Assigned To:</span>
                            <span className="font-medium">{selectedTicket.assignedTo}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{selectedTicket.description}</p>
                    </div>

                    {selectedTicket.resolution && (
                      <div className="bg-secondary-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resolution</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{selectedTicket.resolution}</p>
                        {selectedTicket.cost && (
                          <div className="mt-3 text-sm">
                            <span className="text-gray-600">Cost: </span>
                            <span className="font-semibold text-secondary-600">₹{selectedTicket.cost.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Comments Section */}
                  <div className="space-y-6">
                    <div className="bg-accent-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments & Updates</h3>
                      {selectedTicket.comments.length > 0 ? (
                        <div className="space-y-4">
                          {selectedTicket.comments.map((comment) => (
                            <div key={comment.id} className="bg-white rounded-lg p-4 border border-accent-200">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-gray-800">{comment.author}</span>
                                <span className="text-xs text-gray-500">{formatDateTime(comment.date)}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{comment.message}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>No updates yet</p>
                          <p className="text-sm">You'll receive notifications when there are updates</p>
                        </div>
                      )}
                    </div>

                    {selectedTicket.estimatedResolution && (
                      <div className="bg-primary-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Estimated Resolution</h3>
                        <p className="text-primary-700 font-medium">
                          {formatDateTime(selectedTicket.estimatedResolution)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
                  {selectedTicket.status !== 'Closed' && (
                    <>
                      <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                        Add Comment
                      </button>
                      <button className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                        Update Status
                      </button>
                    </>
                  )}
                  <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Print Ticket
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Share Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaiseTicketManagement;
