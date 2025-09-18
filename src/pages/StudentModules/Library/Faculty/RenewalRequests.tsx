import React, { useState } from 'react';
import { RefreshCw, CheckCircle, XCircle, Clock, Calendar, User, AlertTriangle, Plus, X } from 'lucide-react';

// Sample data for renewal requests
const renewalRequestsData = [
  {
    id: 1,
    bookTitle: "Introduction to Computer Science",
    author: "John Smith",
    isbn: "978-0123456789",
    requestDate: "2025-09-01",
    currentDueDate: "2025-09-15",
    requestedDueDate: "2025-10-15",
    extensionDays: 30,
    status: "pending",
    reason: "Need more time to complete final assignment and research project",
    studentId: "STU001"
  },
  {
    id: 2,
    bookTitle: "Database Systems Design",
    author: "Alice Wilson",
    isbn: "978-0987654321",
    requestDate: "2025-08-28",
    currentDueDate: "2025-09-10",
    requestedDueDate: "2025-10-10",
    extensionDays: 30,
    status: "approved",
    reason: "Research project extension approved by professor",
    approvalDate: "2025-08-30",
    studentId: "STU001"
  },
  {
    id: 3,
    bookTitle: "Web Development Complete Guide",
    author: "Bob Davis",
    isbn: "978-0789123456",
    requestDate: "2025-08-30",
    currentDueDate: "2025-09-08",
    requestedDueDate: "2025-10-08",
    extensionDays: 30,
    status: "rejected",
    reason: "Personal study for certification exam",
    rejectionReason: "Book has pending reservations from other students",
    rejectionDate: "2025-09-02",
    studentId: "STU001"
  },
  {
    id: 4,
    bookTitle: "Advanced Mathematics",
    author: "Sarah Johnson",
    isbn: "978-0456789012",
    requestDate: "2025-09-03",
    currentDueDate: "2025-09-20",
    requestedDueDate: "2025-10-05",
    extensionDays: 15,
    status: "pending",
    reason: "Need additional time for exam preparation",
    studentId: "STU001"
  }
];

const RenewalRequests = () => {
  const [requests, setRequests] = useState(renewalRequestsData);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    bookTitle: '',
    author: '',
    isbn: '',
    currentDueDate: '',
    extensionDays: 15,
    reason: ''
  });

  // Get status icon based on request status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="text-green-600" size={20} />;
      case 'rejected': return <XCircle className="text-red-600" size={20} />;
      default: return <Clock className="text-yellow-600" size={20} />;
    }
  };

  // Get status color classes
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  // Calculate requested due date based on current due date and extension days
  const calculateRequestedDate = (currentDueDate, extensionDays) => {
    const currentDate = new Date(currentDueDate);
    const requestedDate = new Date(currentDate);
    requestedDate.setDate(currentDate.getDate() + parseInt(extensionDays));
    return requestedDate.toISOString().split('T')[0];
  };

  // Handle new request submission
  const handleSubmitRequest = () => {
    // Validate required fields
    if (!newRequest.bookTitle || !newRequest.author || !newRequest.currentDueDate || !newRequest.reason) {
      alert('Please fill in all required fields');
      return;
    }

    const newId = requests.length + 1;
    const today = new Date().toISOString().split('T')[0];
    const requestedDueDate = calculateRequestedDate(newRequest.currentDueDate, newRequest.extensionDays);
    
    const requestToAdd = {
      id: newId,
      bookTitle: newRequest.bookTitle,
      author: newRequest.author,
      isbn: newRequest.isbn || `978-${Math.random().toString().substr(2, 10)}`,
      requestDate: today,
      currentDueDate: newRequest.currentDueDate,
      requestedDueDate: requestedDueDate,
      extensionDays: parseInt(newRequest.extensionDays),
      status: "pending",
      reason: newRequest.reason,
      studentId: "STU001"
    };
    
    setRequests([requestToAdd, ...requests]);
    
    // Reset form
    setNewRequest({
      bookTitle: '',
      author: '',
      isbn: '',
      currentDueDate: '',
      extensionDays: 15,
      reason: ''
    });
    setShowNewRequestForm(false);
    alert('Renewal request submitted successfully!');
  };

  // Cancel pending request
  const cancelRequest = (requestId) => {
    if (window.confirm('Are you sure you want to cancel this renewal request?')) {
      setRequests(requests.filter(request => request.id !== requestId));
      alert('Request cancelled successfully');
    }
  };

  // Get summary statistics
  const getStats = () => {
    const pending = requests.filter(r => r.status === 'pending').length;
    const approved = requests.filter(r => r.status === 'approved').length;
    const rejected = requests.filter(r => r.status === 'rejected').length;
    return { pending, approved, rejected, total: requests.length };
  };

  const stats = getStats();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <RefreshCw className="text-blue-600" />
            Renewal Requests
          </h1>
          <button 
            onClick={() => setShowNewRequestForm(!showNewRequestForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={16} />
            New Renewal Request
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800">Total Requests</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800">Approved</h3>
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800">Rejected</h3>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* New Request Form */}
        {showNewRequestForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Submit New Renewal Request</h2>
              <button 
                onClick={() => setShowNewRequestForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  value={newRequest.bookTitle}
                  onChange={(e) => setNewRequest({...newRequest, bookTitle: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter book title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  value={newRequest.author}
                  onChange={(e) => setNewRequest({...newRequest, author: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter author name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISBN (Optional)
                </label>
                <input
                  type="text"
                  value={newRequest.isbn}
                  onChange={(e) => setNewRequest({...newRequest, isbn: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ISBN"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Due Date *
                </label>
                <input
                  type="date"
                  value={newRequest.currentDueDate}
                  onChange={(e) => setNewRequest({...newRequest, currentDueDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extension Period
                </label>
                <select
                  value={newRequest.extensionDays}
                  onChange={(e) => setNewRequest({...newRequest, extensionDays: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7">7 days</option>
                  <option value="15">15 days</option>
                  <option value="30">30 days</option>
                  <option value="45">45 days</option>
                </select>
              </div>
              {newRequest.currentDueDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requested New Due Date
                  </label>
                  <input
                    type="date"
                    value={calculateRequestedDate(newRequest.currentDueDate, newRequest.extensionDays)}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Extension *
              </label>
              <textarea
                value={newRequest.reason}
                onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Please provide a detailed reason for the extension request"
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleSubmitRequest}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Submit Request
              </button>
              <button 
                onClick={() => setShowNewRequestForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(request.status)}
                  <h3 className="text-xl font-semibold text-gray-800">{request.bookTitle}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
                
                {request.status === 'pending' && (
                  <button 
                    onClick={() => cancelRequest(request.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                  >
                    <X size={16} />
                    Cancel Request
                  </button>
                )}
              </div>
              
              <p className="text-gray-600 mb-3">by {request.author}</p>
              {request.isbn && (
                <p className="text-sm text-gray-500 mb-4">ISBN: {request.isbn}</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <span className="font-medium text-gray-700 flex items-center gap-1">
                    <Calendar size={14} />
                    Request Date:
                  </span>
                  <p className="text-gray-600">{new Date(request.requestDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 flex items-center gap-1">
                    <Clock size={14} />
                    Current Due:
                  </span>
                  <p className="text-gray-600">{new Date(request.currentDueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700 flex items-center gap-1">
                    <RefreshCw size={14} />
                    Requested Due:
                  </span>
                  <p className="text-gray-600">{new Date(request.requestedDueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Extension:</span>
                  <p className="text-gray-600">{request.extensionDays} days</p>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="font-medium text-gray-700">Reason:</span>
                <p className="text-gray-600 mt-1">{request.reason}</p>
              </div>
              
              {request.status === 'approved' && request.approvalDate && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="font-medium text-green-700">Request Approved</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">
                    Approved on {new Date(request.approvalDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              {request.status === 'rejected' && request.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={16} className="text-red-600" />
                    <span className="font-medium text-red-700">Request Rejected</span>
                  </div>
                  <p className="text-red-600 text-sm">
                    <strong>Reason:</strong> {request.rejectionReason}
                  </p>
                  {request.rejectionDate && (
                    <p className="text-red-500 text-xs mt-1">
                      Rejected on {new Date(request.rejectionDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="text-center py-12">
            <RefreshCw size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Renewal Requests</h3>
            <p className="text-gray-500">You haven't submitted any renewal requests yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenewalRequests;