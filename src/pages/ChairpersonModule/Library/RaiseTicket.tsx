import React, { useState } from 'react';
import { HelpCircle, Plus, MessageSquare, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { tickets } from './Data/mockData';

export default function RaiseTicket() {
  const [activeTab, setActiveTab] = useState<'create' | 'tickets'>('create');
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    priority: 'Medium',
    description: ''
  });

  const categories = ['Technical', 'Book Request', 'Account', 'General'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <Clock className="h-4 w-4" />;
      case 'In Progress': return <AlertTriangle className="h-4 w-4" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4" />;
      case 'Closed': return <XCircle className="h-4 w-4" />;
      default: return <HelpCircle className="h-4 w-4" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Ticket submitted:', formData);
    setFormData({
      title: '',
      category: 'General',
      priority: 'Medium',
      description: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openTickets = tickets.filter(ticket => ticket.status === 'Open' || ticket.status === 'In Progress');
  const closedTickets = tickets.filter(ticket => ticket.status === 'Resolved' || ticket.status === 'Closed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          Support Tickets
        </h2>
        <p className="text-gray-600">Report issues and track support requests</p>
      </div>

      Stats
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Open Tickets</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-1">{openTickets.length}</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900 mt-1">
            {tickets.filter(t => t.status === 'In Progress').length}
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Resolved</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-1">
            {tickets.filter(t => t.status === 'Resolved').length}
          </p>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Avg Response Time</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-1">2.4h</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('create')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'create'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Plus className="h-4 w-4" />
          Create Ticket
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'tickets'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          My Tickets ({tickets.length})
        </button>
      </div>

      {activeTab === 'create' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Ticket</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Brief description of the issue"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Please provide detailed information about the issue, including steps to reproduce if applicable..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setFormData({
                  title: '',
                  category: 'General',
                  priority: 'Medium',
                  description: ''
                })}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              All ({tickets.length})
            </button>
          
          </div>

          {/* Tickets List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                          <div className="text-sm text-gray-500 mt-1 max-w-xs truncate">
                            {ticket.description}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">ID: {ticket.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          {ticket.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(ticket.createdDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(ticket.updatedDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

  </div>
);
}