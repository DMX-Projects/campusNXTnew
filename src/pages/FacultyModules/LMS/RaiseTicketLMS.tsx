import React, { useState } from 'react';
import { TicketIcon, PlusIcon, SearchIcon,  ClockIcon, CheckCircleIcon,  MessageSquareIcon,  AlertTriangleIcon } from 'lucide-react';

interface Ticket {
  id: string;
  ticketNumber: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  title: string;
  description: string;
  category: 'academic' | 'technical' | 'hostel' | 'transport' | 'fee' | 'library' | 'canteen' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'rejected';
  assignedTo: string;
  createdDate: string;
  updatedDate: string;
  resolvedDate?: string;
  attachments: string[];
  comments: TicketComment[];
  satisfaction?: number;
}

interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  userRole: string;
  content: string;
  timestamp: string;
  isInternal: boolean;
}

const RaiseTicketLMS: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      ticketNumber: 'TKT001',
      studentId: 'S001',
      studentName: 'Rahul Sharma',
      rollNumber: 'CSE001',
      department: 'CSE',
      title: 'Unable to access online portal',
      description: 'I am unable to login to the student portal. Getting error message "Invalid credentials" even though I am using correct username and password.',
      category: 'technical',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'IT Support Team',
      createdDate: '2025-09-01',
      updatedDate: '2025-09-02',
      attachments: ['screenshot.png'],
      comments: [
        {
          id: '1',
          ticketId: '1',
          userId: 'IT001',
          userName: 'IT Support',
          userRole: 'admin',
          content: 'We are looking into this issue. Please try clearing your browser cache and cookies.',
          timestamp: '2025-09-01T14:30:00Z',
          isInternal: false
        }
      ]
    },
    {
      id: '2',
      ticketNumber: 'TKT002',
      studentId: 'S002',
      studentName: 'Priya Singh',
      rollNumber: 'CSE002',
      department: 'CSE',
      title: 'Incorrect grades displayed',
      description: 'My Data Structures exam grade is showing as C+ but I believe it should be A- based on my performance. Please review.',
      category: 'academic',
      priority: 'medium',
      status: 'open',
      assignedTo: 'Academic Office',
      createdDate: '2025-08-30',
      updatedDate: '2025-08-30',
      attachments: [],
      comments: []
    },
    {
      id: '3',
      ticketNumber: 'TKT003',
      studentId: 'S003',
      studentName: 'Amit Kumar',
      rollNumber: 'CSE003',
      department: 'CSE',
      title: 'Hostel room AC not working',
      description: 'The air conditioning in my hostel room (Block A, Room 205) has not been working for the past 3 days. Need urgent repair.',
      category: 'hostel',
      priority: 'urgent',
      status: 'resolved',
      assignedTo: 'Maintenance Team',
      createdDate: '2025-08-28',
      updatedDate: '2025-08-31',
      resolvedDate: '2025-08-31',
      attachments: ['room_photo.jpg'],
      comments: [],
      satisfaction: 4
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [isViewTicketModalOpen, setIsViewTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newTicket, setNewTicket] = useState<Partial<Ticket>>({});
  const [newComment, setNewComment] = useState('');

  const categories = ['academic', 'technical', 'hostel', 'transport', 'fee', 'library', 'canteen', 'other'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const statuses = ['open', 'in_progress', 'resolved', 'closed', 'rejected'];
  const assignees = ['IT Support Team', 'Academic Office', 'Maintenance Team', 'Transport Team', 'Fee Office', 'Library', 'Canteen Staff', 'Administration'];

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'bg-purple-100 text-purple-800',
      technical: 'bg-blue-100 text-blue-800',
      hostel: 'bg-green-100 text-green-800',
      transport: 'bg-yellow-100 text-yellow-800',
      fee: 'bg-orange-100 text-orange-800',
      library: 'bg-indigo-100 text-indigo-800',
      canteen: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors];
  };

  const filteredTickets = tickets.filter(ticket => {
    return (
      (ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       ticket.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'all' || ticket.category === selectedCategory) &&
      (selectedStatus === 'all' || ticket.status === selectedStatus) &&
      (selectedPriority === 'all' || ticket.priority === selectedPriority)
    );
  });

  const handleCreateTicket = () => {
    if (newTicket.title && newTicket.description && newTicket.category) {
      const ticket: Ticket = {
        id: Date.now().toString(),
        ticketNumber: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
        studentId: 'S004',
        studentName: newTicket.studentName || 'New Student',
        rollNumber: newTicket.rollNumber || 'NEW001',
        department: newTicket.department || 'General',
        title: newTicket.title,
        description: newTicket.description,
        category: newTicket.category,
        priority: newTicket.priority || 'medium',
        status: 'open',
        assignedTo: newTicket.assignedTo || 'Administration',
        createdDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0],
        attachments: newTicket.attachments || [],
        comments: []
      };
      
      setTickets([ticket, ...tickets]);
      setNewTicket({});
      setIsCreateTicketModalOpen(false);
      alert(`Ticket created successfully!\nTicket Number: ${ticket.ticketNumber}`);
    }
  };

  const updateTicketStatus = (ticketId: string, status: string) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status: status as Ticket['status'],
            updatedDate: new Date().toISOString().split('T')[0],
            resolvedDate: status === 'resolved' ? new Date().toISOString().split('T')[0] : ticket.resolvedDate
          }
        : ticket
    );
    setTickets(updatedTickets);
    alert(`Ticket ${status} successfully!`);
  };

  const assignTicket = (ticketId: string, assignee: string) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, assignedTo: assignee, updatedDate: new Date().toISOString().split('T')[0] }
        : ticket
    );
    setTickets(updatedTickets);
    alert(`Ticket assigned to ${assignee}!`);
  };

  const addComment = (ticketId: string) => {
    if (newComment.trim() && selectedTicket) {
      const comment: TicketComment = {
        id: Date.now().toString(),
        ticketId,
        userId: 'ADMIN001',
        userName: 'Chairperson',
        userRole: 'admin',
        content: newComment,
        timestamp: new Date().toISOString(),
        isInternal: false
      };

      const updatedTickets = tickets.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, comments: [...ticket.comments, comment] }
          : ticket
      );
      setTickets(updatedTickets);
      setSelectedTicket({...selectedTicket, comments: [...selectedTicket.comments, comment]});
      setNewComment('');
    }
  };

  const exportTickets = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Ticket Number,Student Name,Roll Number,Title,Category,Priority,Status,Assigned To,Created Date,Updated Date\n" +
      filteredTickets.map(ticket => 
        `${ticket.ticketNumber},"${ticket.studentName}",${ticket.rollNumber},"${ticket.title}",${ticket.category},${ticket.priority},${ticket.status},"${ticket.assignedTo}",${ticket.createdDate},${ticket.updatedDate}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tickets_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    inProgressTickets: tickets.filter(t => t.status === 'in_progress').length,
    resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
    urgentTickets: tickets.filter(t => t.priority === 'urgent').length,
    avgResolutionTime: '2.5 days'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ticket Management System</h1>
              <p className="text-gray-600 mt-1">Manage student queries and support requests</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsCreateTicketModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Create Ticket
              </button>
              <button
                onClick={exportTickets}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Export Report
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tickets by title, description, student name, or ticket number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
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

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTickets}</p>
              </div>
              <TicketIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Open</p>
                <p className="text-2xl font-bold text-blue-600">{stats.openTickets}</p>
              </div>
              <div className="text-2xl">📫</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgressTickets}</p>
              </div>
              <ClockIcon className="text-yellow-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolvedTickets}</p>
              </div>
              <CheckCircleIcon className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgentTickets}</p>
              </div>
              <AlertTriangleIcon className="text-red-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Resolution</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgResolutionTime}</p>
              </div>
              <div className="text-2xl">⏱️</div>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Support Tickets ({filteredTickets.length})
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 font-medium text-gray-900">Ticket</th>
                    <th className="text-left p-3 font-medium text-gray-900">Student</th>
                    <th className="text-left p-3 font-medium text-gray-900">Title</th>
                    <th className="text-left p-3 font-medium text-gray-900">Category</th>
                    <th className="text-left p-3 font-medium text-gray-900">Priority</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                    <th className="text-left p-3 font-medium text-gray-900">Assigned To</th>
                    <th className="text-left p-3 font-medium text-gray-900">Date</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets
                    .sort((a, b) => {
                      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
                      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
                    })
                    .map((ticket) => (
                      <tr key={ticket.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium text-gray-900">{ticket.ticketNumber}</div>
                            <div className="text-sm text-gray-500">{ticket.comments.length} comments</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <div className="font-medium text-gray-900">{ticket.studentName}</div>
                            <div className="text-sm text-gray-500">{ticket.rollNumber} - {ticket.department}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="max-w-xs truncate" title={ticket.title}>
                            {ticket.title}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(ticket.category)}`}>
                            {ticket.category}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{ticket.assignedTo}</td>
                        <td className="p-3 text-sm text-gray-600">
                          {new Date(ticket.createdDate).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setSelectedTicket(ticket);
                                setIsViewTicketModalOpen(true);
                              }}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-1 rounded transition-colors"
                            >
                              <MessageSquareIcon size={16} />
                            </button>
                            
                            {ticket.status === 'open' && (
                              <button
                                onClick={() => updateTicketStatus(ticket.id, 'in_progress')}
                                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-1 rounded transition-colors"
                              >
                                <ClockIcon size={16} />
                              </button>
                            )}
                            
                            {(ticket.status === 'open' || ticket.status === 'in_progress') && (
                              <button
                                onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                                className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded transition-colors"
                              >
                                <CheckCircleIcon size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Create Ticket Modal */}
        {isCreateTicketModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create Support Ticket</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    value={newTicket.studentName || ''}
                    onChange={(e) => setNewTicket({...newTicket, studentName: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter student name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                  <input
                    type="text"
                    value={newTicket.rollNumber || ''}
                    onChange={(e) => setNewTicket({...newTicket, rollNumber: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter roll number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={newTicket.department || ''}
                    onChange={(e) => setNewTicket({...newTicket, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter department"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newTicket.category || ''}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value as Ticket['category']})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newTicket.priority || 'medium'}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as Ticket['priority']})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                  <select
                    value={newTicket.assignedTo || ''}
                    onChange={(e) => setNewTicket({...newTicket, assignedTo: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Team</option>
                    {assignees.map(assignee => (
                      <option key={assignee} value={assignee}>{assignee}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newTicket.title || ''}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the issue"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTicket.description || ''}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the issue"
                ></textarea>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCreateTicketModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTicket}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Ticket Modal */}
        {isViewTicketModalOpen && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">#{selectedTicket.ticketNumber}</h2>
                  <p className="text-gray-600">{selectedTicket.title}</p>
                </div>
                <button
                  onClick={() => setIsViewTicketModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedTicket.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Comments ({selectedTicket.comments.length})</h4>
                    <div className="space-y-3 mb-4">
                      {selectedTicket.comments.map(comment => (
                        <div key={comment.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{comment.userName}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                comment.userRole === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {comment.userRole}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(comment.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                      <button
                        onClick={() => addComment(selectedTicket.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Add Comment
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Ticket Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Student:</span>
                        <span className="font-medium">{selectedTicket.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Roll Number:</span>
                        <span>{selectedTicket.rollNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span>{selectedTicket.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(selectedTicket.category)}`}>
                          {selectedTicket.category}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(selectedTicket.priority)}`}>
                          {selectedTicket.priority}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedTicket.status)}`}>
                          {selectedTicket.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assigned To:</span>
                        <span className="font-medium">{selectedTicket.assignedTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span>{new Date(selectedTicket.createdDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Updated:</span>
                        <span>{new Date(selectedTicket.updatedDate).toLocaleDateString()}</span>
                      </div>
                      {selectedTicket.resolvedDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Resolved:</span>
                          <span>{new Date(selectedTicket.resolvedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Actions</h4>
                    
                    <select
                      onChange={(e) => updateTicketStatus(selectedTicket.id, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      value=""
                    >
                      <option value="" disabled>Update Status</option>
                      {statuses.filter(status => status !== selectedTicket.status).map(status => (
                        <option key={status} value={status}>
                          {status.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      onChange={(e) => assignTicket(selectedTicket.id, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      value=""
                    >
                      <option value="" disabled>Reassign Ticket</option>
                      {assignees.filter(assignee => assignee !== selectedTicket.assignedTo).map(assignee => (
                        <option key={assignee} value={assignee}>{assignee}</option>
                      ))}
                    </select>
                  </div>
                  
                  {selectedTicket.attachments.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                      <div className="space-y-2">
                        {selectedTicket.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <span>📎</span>
                            <span>{attachment}</span>
                            <button className="text-blue-600 hover:text-blue-800">Download</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedTicket.satisfaction && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Satisfaction Rating</h4>
                      <div className="flex items-center gap-1">
                        {Array.from({length: 5}).map((_, i) => (
                          <span key={i} className={`text-xl ${i < selectedTicket.satisfaction! ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ⭐
                          </span>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({selectedTicket.satisfaction}/5)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaiseTicketLMS;
