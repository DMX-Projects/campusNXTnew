import React, { useState } from 'react';
import { MessageSquarePlus, Search, Filter, Clock, AlertTriangle, CheckCircle, Plus, X, Eye, Edit } from 'lucide-react';

// Mock data for tickets
const tickets = [
  {
    id: 1,
    title: "Bus engine making strange noise",
    description: "The bus engine has been making a grinding noise during acceleration. This needs immediate attention.",
    category: "maintenance",
    priority: "high",
    status: "open",
    createdAt: "2024-01-15",
    createdBy: "John Doe",
    assignedTo: "Mike Johnson",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    title: "New route request for Maple Street",
    description: "Parents have requested a new bus stop on Maple Street for better accessibility.",
    category: "route",
    priority: "medium",
    status: "in-progress",
    createdAt: "2024-01-14",
    createdBy: "Sarah Smith",
    assignedTo: "Route Manager",
    lastUpdated: "2024-01-16"
  },
  {
    id: 3,
    title: "Driver complaint about schedule",
    description: "Driver reported that the current schedule is too tight and causing delays.",
    category: "driver",
    priority: "medium",
    status: "resolved",
    createdAt: "2024-01-12",
    createdBy: "Admin",
    assignedTo: "HR Department",
    lastUpdated: "2024-01-18"
  }
];

export default function Tickets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editTicket, setEditTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'maintenance',
    priority: 'medium'
  });

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const priorityColors = {
    low: 'text-green-600 bg-green-50',
    medium: 'text-yellow-600 bg-yellow-50',
    high: 'text-orange-600 bg-orange-50',
    urgent: 'text-red-600 bg-red-50',
  };

  const statusColors = {
    open: 'text-blue-600 bg-blue-50',
    'in-progress': 'text-yellow-600 bg-yellow-50',
    resolved: 'text-green-600 bg-green-50',
    closed: 'text-gray-600 bg-gray-50',
  };

  const statusIcons = {
    open: Clock,
    'in-progress': AlertTriangle,
    resolved: CheckCircle,
    closed: CheckCircle,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating ticket:', newTicket);
    setShowCreateForm(false);
    setNewTicket({ title: '', description: '', category: 'maintenance', priority: 'medium' });
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowViewModal(true);
  };

  const handleEditTicket = (ticket) => {
    setEditTicket({...ticket});
    setShowEditModal(true);
  };

  const handleUpdateTicket = (e) => {
    e.preventDefault();
    console.log('Updating ticket:', editTicket);
    setShowEditModal(false);
    setEditTicket(null);
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="px-4 py-4 md:p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800"></h3>
          <p className="text-sm text-gray-600"></p>
        </div>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Raise Ticket</span>
        </button>
      </div>

      {/* Create Ticket Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Create New Ticket</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Brief description of the issue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="maintenance">Maintenance</option>
                  <option value="route">Route</option>
                  <option value="driver">Driver</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Detailed description of the issue..."
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
              >
                Create Ticket
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400 hidden md:block" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full md:w-auto"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const StatusIcon = statusIcons[ticket.status];
            
            return (
              <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquarePlus className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">{ticket.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
                          {ticket.priority} priority
                        </span>
                        <span className="text-xs text-gray-600">
                          Category: {ticket.category}
                        </span>
                        <span className="text-xs text-gray-600">
                          Created: {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-600">
                          By: {ticket.createdBy}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusColors[ticket.status]}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{ticket.status.replace('-', ' ')}</span>
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewTicket(ticket)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button 
                        onClick={() => handleEditTicket(ticket)}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center space-x-1"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Ticket Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Ticket Details"
      >
        {selectedTicket && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ticket ID</label>
                <p className="text-gray-900">#{selectedTicket.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedTicket.status]}`}>
                  {selectedTicket.status.replace('-', ' ')}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[selectedTicket.priority]}`}>
                  {selectedTicket.priority} priority
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <p className="text-gray-900 capitalize">{selectedTicket.category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Created By</label>
                <p className="text-gray-900">{selectedTicket.createdBy}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                <p className="text-gray-900">{selectedTicket.assignedTo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
                <p className="text-gray-900">{new Date(selectedTicket.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
                <p className="text-gray-900">{new Date(selectedTicket.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <p className="text-gray-900">{selectedTicket.title}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <p className="text-gray-900 whitespace-pre-wrap">{selectedTicket.description}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Ticket Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Ticket"
      >
        {editTicket && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editTicket.title}
                  onChange={(e) => setEditTicket({ ...editTicket, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={editTicket.category}
                  onChange={(e) => setEditTicket({ ...editTicket, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="maintenance">Maintenance</option>
                  <option value="route">Route</option>
                  <option value="driver">Driver</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                <input
                  type="text"
                  value={editTicket.assignedTo}
                  onChange={(e) => setEditTicket({ ...editTicket, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={editTicket.description}
                onChange={(e) => setEditTicket({ ...editTicket, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleUpdateTicket}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Ticket
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}