


import React, { useState } from 'react';
import { Plus, Eye, Calendar, Clock, AlertCircle, CheckCircle, XCircle, X, Menu, FileText, Edit, ArrowLeft, Send } from 'lucide-react';

interface Update {
  date: string;
  time: string;
  user: string;
  message: string;
}

interface Ticket {
  id: string;
  studentId: string;
  name: string;
  course: string;
  category: string;
  subCategory: string;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  lastUpdated: string;
  updates: Update[];
}

const StudentTicketSystem = () => {
  const [activeTab, setActiveTab] = useState('raise');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // New state
  const [updateMessage, setUpdateMessage] = useState(''); // New state
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TKT001',
      studentId: '2025STU001',
      name: 'Anil Kumar',
      course: 'B.Tech - CSE - 3rd Year - A Section',
      category: 'Transport',
      subCategory: 'Bus Delay',
      subject: 'Bus Route 12 always late',
      description: 'Bus No AP 29 XX 1234, Route 12 is delayed every morning by 20 minutes, causing late arrival to classes. This has been happening for the past 2 weeks and is affecting my attendance. I have already spoken to the bus driver but no improvement has been seen. Request immediate action to resolve this issue.',
      priority: 'High',
      status: 'Open',
      createdAt: '2025-01-15',
      lastUpdated: '2025-01-15',
      updates: [
        {
          date: '2025-01-15',
          time: '10:30 AM',
          user: 'Student',
          message: 'Ticket raised for bus delay issue'
        }
      ]
    }
  ]);
  
  const [formData, setFormData] = useState({
    studentId: '2025STU001',
    name: 'Anil Kumar',
    course: 'B.Tech - CSE - 3rd Year - A Section',
    category: '',
    subCategory: '',
    subject: '',
    description: '',
    priority: '' as 'Low' | 'Medium' | 'High' | ''
  });
  
  const categories: { [key: string]: string[] } = {
    'Academic': ['Assignment Issues', 'Exam Queries', 'Grade Disputes', 'Course Content'],
    'Transport': ['Bus Delay', 'Route Issues', 'Driver Complaints', 'Vehicle Condition'],
    'Hostel': ['Room Issues', 'Mess Complaints', 'Maintenance', 'Security'],
    'Infrastructure': ['Classroom Issues', 'Lab Problems', 'Library Issues', 'WiFi Problems'],
    'Administrative': ['Fee Issues', 'Document Requests', 'Certificate Issues', 'Other']
  };
  
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'category' ? { subCategory: '' } : {})
    }));
  };
  
  const handleSubmit = () => {
    if (!formData.category || !formData.subCategory || !formData.subject || !formData.description || !formData.priority) {
      alert('Please fill all required fields');
      return;
    }
    
    const newTicket: Ticket = {
      id: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      updates: [
        {
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          user: 'Student',
          message: 'Ticket raised'
        }
      ]
    };
    
    setTickets(prev => [newTicket, ...prev]);
    setFormData({
      studentId: '2025STU001',
      name: 'Anil Kumar',
      course: 'B.Tech - CSE - 3rd Year - A Section',
      category: '',
      subCategory: '',
      subject: '',
      description: '',
      priority: ''
    });
    alert('Ticket raised successfully!');
  };

  const handleUpdateSubmit = () => {
    if (!updateMessage.trim()) {
      alert('Please enter an update message.');
      return;
    }
  
    if (selectedTicket) {
      const newUpdate: Update = {
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: 'Student',
        message: updateMessage.trim(),
      };
  
      const updatedTickets = tickets.map(ticket => 
        ticket.id === selectedTicket.id 
          ? {
              ...ticket,
              updates: [...ticket.updates, newUpdate],
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : ticket
      );
  
      setTickets(updatedTickets);
      setSelectedTicket(prev => prev ? { ...prev, updates: [...prev.updates, newUpdate], lastUpdated: new Date().toISOString().split('T')[0] } : null);
      setUpdateMessage('');
      setShowUpdateForm(false);
      alert('Ticket updated successfully!');
    }
  };
  
  const handleViewDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowDetailView(true);
  };
  
  const handleCloseDetails = () => {
    setShowDetailView(false);
    setShowUpdateForm(false);
    setSelectedTicket(null);
  };
  
  const handlePrintTicket = () => {
    alert("Printing functionality is under development. Please use your browser's print option.");
    window.print();
  };
  
  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'Open': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Closed': return <XCircle className="w-4 h-4 text-gray-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };
  
  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Detail View Component
  const TicketDetailView = ({ ticket }: { ticket: Ticket }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl mt-4 mb-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCloseDetails}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors sm:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Ticket #{ticket.id}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{ticket.subject}</p>
            </div>
          </div>
          <button
            onClick={handleCloseDetails}
            className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Status and Priority */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(ticket.status)}
                <span className="font-medium text-gray-900">{ticket.status}</span>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority} Priority
              </span>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button onClick={() => setShowUpdateForm(!showUpdateForm)} className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center">
                <Edit className="w-4 h-4 mr-2" />
                Update Ticket
              </button>
              <button onClick={handlePrintTicket} className="w-full sm:w-auto px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors">
                Print
              </button>
            </div>
          </div>

          {/* New Update Form */}
          {showUpdateForm && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Add a New Update</h3>
              <textarea
                value={updateMessage}
                onChange={(e) => setUpdateMessage(e.target.value)}
                placeholder="Type your update here..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <div className="flex justify-end mt-3 space-x-2">
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Update
                </button>
              </div>
            </div>
          )}
          
          {/* Student Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Student Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Student ID:</span>
                <p className="font-medium">{ticket.studentId}</p>
              </div>
              <div>
                <span className="text-gray-500">Name:</span>
                <p className="font-medium">{ticket.name}</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <span className="text-gray-500">Course:</span>
                <p className="font-medium">{ticket.course}</p>
              </div>
            </div>
          </div>
          
          {/* Ticket Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Ticket Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Category:</span>
                <p className="font-medium">{ticket.category}</p>
              </div>
              <div>
                <span className="text-gray-500">Sub-Category:</span>
                <p className="font-medium">{ticket.subCategory}</p>
              </div>
              <div>
                <span className="text-gray-500">Created:</span>
                <p className="font-medium flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {ticket.createdAt}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Last Updated:</span>
                <p className="font-medium flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {ticket.lastUpdated}
                </p>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{ticket.description}</p>
            </div>
          </div>
          
          {/* Updates/Activity */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Activity Timeline</h3>
            <div className="space-y-3">
              {ticket.updates?.map((update, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-medium text-gray-900">{update.message}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1 sm:mt-0">
                        <span>{update.user}</span>
                        <span>•</span>
                        <span>{update.date} at {update.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button 
              onClick={handleCloseDetails}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
            <button 
              onClick={() => setShowUpdateForm(true)}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Add Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Dummy handler for Add Attachment button to prevent error
  const handleAddAttachment = () => {
    alert('Attachment feature is coming soon!');
  };

  // Main component render
  if (showDetailView && selectedTicket) {
    return <TicketDetailView ticket={selectedTicket} />;
  }
  
  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg">
        {/* Mobile Header with Menu */}
        <div className="flex items-center justify-between p-4 sm:hidden border-b border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Support Tickets</h1>
          </div>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className="sm:hidden border-b border-gray-200 bg-gray-50">
            <div className="p-4 space-y-2">
              <button
                onClick={() => {
                  setActiveTab('raise');
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                  activeTab === 'raise'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Plus className="w-4 h-4 mr-3" />
                  <span className="font-medium">Raise New Ticket</span>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('view');
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                  activeTab === 'view'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-3" />
                  <span className="font-medium">My Tickets ({tickets.length})</span>
                </div>
              </button>
            </div>
          </div>
        )}
        
        {/* Desktop Header/Tabs */}
        <div className="hidden sm:block border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('raise')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'raise'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Plus className="inline-block w-4 h-4 mr-2" />
              Raise Ticket
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'view'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Eye className="inline-block w-4 h-4 mr-2" />
              View Tickets ({tickets.length})
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'raise' ? (
            // Raise Ticket Form - Mobile Optimized
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Raise Support Ticket
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Student Info - Mobile Stacked */}
                <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID
                    </label>
                    <input
                      type="text"
                      value={formData.studentId}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course
                  </label>
                  <input
                    type="text"
                    value={formData.course}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
                
                {/* Ticket Details - Mobile Stacked */}
                <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select Category</option>
                      {Object.keys(categories).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub-Category *
                    </label>
                    <select
                      value={formData.subCategory}
                      onChange={(e) => handleInputChange('subCategory', e.target.value)}
                      disabled={!formData.category}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition-all"
                      required
                    >
                      <option value="">Select Sub-Category</option>
                      {formData.category && categories[formData.category]?.map(subCat => (
                        <option key={subCat} value={subCat}>{subCat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description of the issue"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed description of the issue..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <div onClick={handleAddAttachment} className="mt-2 text-right">
                    <button type="button" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                      + Add Attachment
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value as 'Low' | 'Medium' | 'High' | '')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                {/* Mobile-friendly button layout */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setFormData({
                      studentId: '2025STU001',
                      name: 'Anil Kumar',
                      course: 'B.Tech - CSE - 3rd Year - A Section',
                      category: '',
                      subCategory: '',
                      subject: '',
                      description: '',
                      priority: ''
                    })}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all"
                  >
                    Clear Form
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // View Tickets - Mobile Optimized
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">My Support Tickets</h2>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full w-fit">
                  Total: {tickets.length} tickets
                </div>
              </div>
              
              <div className="space-y-4">
                {tickets.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
                    <p className="text-gray-600 mb-4">You haven't raised any tickets yet.</p>
                    <button 
                      onClick={() => setActiveTab('raise')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all"
                    >
                      Raise Your First Ticket
                    </button>
                  </div>
                ) : (
                  tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                      {/* Mobile-first ticket header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div className="mb-3 sm:mb-0">
                          <div className="flex items-center flex-wrap gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">#{ticket.id}</h3>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(ticket.status)}
                              <span className="text-sm font-medium text-gray-700">{ticket.status}</span>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                            {ticket.subject}
                          </h4>
                        </div>
                      </div>
                      
                      {/* Mobile-stacked ticket details */}
                      <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Category:</span>
                          <p className="font-medium">{ticket.category}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Sub-Category:</span>
                          <p className="font-medium">{ticket.subCategory}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Created:</span>
                          <p className="font-medium flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {ticket.createdAt}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Last Updated:</span>
                          <p className="font-medium flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {ticket.lastUpdated}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-gray-500 text-sm block mb-1">Description:</span>
                        <p className="text-gray-700 text-sm sm:text-base line-clamp-3">
                          {ticket.description}
                        </p>
                      </div>
                      
                      {/* Mobile-friendly footer with responsive buttons */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-100 space-y-3 sm:space-y-0">
                        <div className="text-xs sm:text-sm text-gray-500">
                          Student: {ticket.name} ({ticket.studentId})
                        </div>
                        <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-3">
                          <button 
                            onClick={() => handleViewDetails(ticket)}
                            className="w-full xs:w-auto px-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 rounded hover:bg-blue-100 transition-all flex items-center justify-center"
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            <span className="hidden xs:inline">View Details</span>
                            <span className="xs:hidden">Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentTicketSystem;