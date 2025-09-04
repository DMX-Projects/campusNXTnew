 // FacultyTicketSystem.tsx
import React, { useState } from 'react';
import { 
  Plus, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Eye, 
  Edit, 
  Trash2,
  MessageSquare,
  Filter,
  Search,
  Bell,
  User,
  Calendar,
  Tag
} from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Academic' | 'Administrative' | 'Infrastructure' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  facultyId: string;
  facultyName: string;
  attachments?: string[];
  comments?: Comment[];
}

interface Comment {
  id: string;
  text: string;
  author: string;
  role: 'Faculty' | 'Support' | 'Admin';
  createdAt: string;
}

const FacultyTicketSystem: React.FC = () => {
  const facultyInfo = {
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science Engineering',
    employeeId: 'FAC001'
  };

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TKT001',
      title: 'Unable to access online attendance system',
      description: 'Getting error message when trying to mark attendance for CS301 class. The system shows "Server Error 500".',
      category: 'Technical',
      priority: 'High',
      status: 'In Progress',
      createdAt: '2025-09-01T10:00:00Z',
      updatedAt: '2025-09-02T14:30:00Z',
      assignedTo: 'IT Support Team',
      facultyId: 'FAC001',
      facultyName: 'Dr. Rajesh Kumar',
      comments: [
        {
          id: 'c1',
          text: 'We have identified the issue and working on a fix. Should be resolved by today evening.',
          author: 'IT Support',
          role: 'Support',
          createdAt: '2025-09-02T14:30:00Z'
        }
      ]
    },
    {
      id: 'TKT002',
      title: 'Request for additional whiteboard in classroom',
      description: 'Room 204 needs an additional whiteboard for better visibility during lectures.',
      category: 'Infrastructure',
      priority: 'Medium',
      status: 'Open',
      createdAt: '2025-08-28T09:15:00Z',
      updatedAt: '2025-08-28T09:15:00Z',
      facultyId: 'FAC001',
      facultyName: 'Dr. Rajesh Kumar'
    }
  ]);

  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | Ticket['status']>('All');
  const [filterPriority, setFilterPriority] = useState<'All' | Ticket['priority']>('All');

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'Technical' as Ticket['category'],
    priority: 'Medium' as Ticket['priority']
  });

  const [newComment, setNewComment] = useState('');

  const handleCreateTicket = () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const ticket: Ticket = {
      id: `TKT${(tickets.length + 1).toString().padStart(3, '0')}`,
      title: newTicket.title,
      description: newTicket.description,
      category: newTicket.category,
      priority: newTicket.priority,
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      facultyId: facultyInfo.employeeId,
      facultyName: facultyInfo.name,
      comments: []
    };

    setTickets(prev => [ticket, ...prev]);
    setNewTicket({ title: '', description: '', category: 'Technical', priority: 'Medium' });
    setShowCreateTicket(false);
    alert('Ticket created successfully! You will receive updates via email.');
  };

  const addComment = (ticketId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      text: newComment,
      author: facultyInfo.name,
      role: 'Faculty',
      createdAt: new Date().toISOString()
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            comments: [...(ticket.comments || []), comment],
            updatedAt: new Date().toISOString()
          }
        : ticket
    ));
    setNewComment('');
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || ticket.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'Open': return <AlertCircle className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4" />;
      case 'Closed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
              <p className="text-gray-600">{facultyInfo.name} • {facultyInfo.department}</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateTicket(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Raise Ticket
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Tickets</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">{stats.open}</div>
          <div className="text-sm text-gray-600">Open</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No tickets found</p>
          </div>
        ) : (
          filteredTickets.map(ticket => (
            <div key={ticket.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{ticket.title}</h3>
                    <span className="text-sm font-medium text-gray-600">#{ticket.id}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{ticket.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                    {getStatusIcon(ticket.status)}
                    {ticket.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Category: {ticket.category}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created: {new Date(ticket.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
                </div>
                {ticket.assignedTo && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Assigned: {ticket.assignedTo}
                  </div>
                )}
              </div>

              {/* Comments Section */}
              {ticket.comments && ticket.comments.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Recent Updates</h4>
                  <div className="space-y-3">
                    {ticket.comments.slice(-2).map(comment => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {ticket.status !== 'Closed' && ticket.status !== 'Cancelled' && (
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Add Comment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Ticket Modal */}
      {showCreateTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create Support Ticket</h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title*</label>
                <input
                  type="text"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description*</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide detailed information about the issue, including steps to reproduce if applicable"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Technical">Technical Issue</option>
                    <option value="Academic">Academic Support</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority*</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Low">Low - General inquiry</option>
                    <option value="Medium">Medium - Normal issue</option>
                    <option value="High">High - Urgent issue</option>
                    <option value="Critical">Critical - System down</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateTicket(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTicket}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTicket.title}</h2>
                  <p className="text-gray-600">Ticket #{selectedTicket.id}</p>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Issue Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Category:</strong> {selectedTicket.category}</div>
                    <div><strong>Priority:</strong> {selectedTicket.priority}</div>
                    <div><strong>Status:</strong> {selectedTicket.status}</div>
                    <div><strong>Created:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}</div>
                    {selectedTicket.assignedTo && (
                      <div><strong>Assigned to:</strong> {selectedTicket.assignedTo}</div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-700">{selectedTicket.description}</p>
                </div>
              </div>

              {/* Comments */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Comments & Updates</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {selectedTicket.comments && selectedTicket.comments.length > 0 ? (
                    selectedTicket.comments.map(comment => (
                      <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No comments yet</p>
                  )}
                </div>

                {/* Add Comment */}
                {selectedTicket.status !== 'Closed' && selectedTicket.status !== 'Cancelled' && (
                  <div className="mt-4">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment or update..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => addComment(selectedTicket.id)}
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Add Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyTicketSystem;
