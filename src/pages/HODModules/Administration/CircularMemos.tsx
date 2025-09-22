import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, Filter, Eye, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { CircularMemo } from '../../../types';

export const CircularMemos: React.FC = () => {
  const [circulars, setCirculars] = useState<CircularMemo[]>([
    {
      id: '1',
      title: 'Updated Security Protocols',
      type: 'Circular',
      content: 'All departments are required to implement the new security protocols...',
      publishedDate: '2024-01-20',
      priority: 'High',
      acknowledged: false,
      publishedBy: 'Security Department'
    },
    {
      id: '2',
      title: 'Budget Submission Deadline',
      type: 'Memo',
      content: 'Reminder: All budget proposals must be submitted by January 31st...',
      publishedDate: '2024-01-18',
      priority: 'Medium',
      acknowledged: true,
      publishedBy: 'Finance Department'
    },
    {
      id: '3',
      title: 'New Procurement Guidelines',
      type: 'Directive',
      content: 'Effective immediately, all purchases above $1000 require...',
      publishedDate: '2024-01-15',
      priority: 'High',
      acknowledged: true,
      publishedBy: 'Procurement Office'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCircular, setSelectedCircular] = useState<CircularMemo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Function to acknowledge a circular
  const handleAcknowledgeCircular = (circularId: string, circularTitle: string) => {
    setCirculars(prevCirculars => 
      prevCirculars.map(circular => 
        circular.id === circularId 
          ? { ...circular, acknowledged: true }
          : circular
      )
    );
    showToast(`"${circularTitle}" has been acknowledged successfully.`, 'success');
    setShowModal(false);
  };

  // Function to show toast notifications
  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const filteredCirculars = circulars.filter(circular => {
    const matchesSearch = circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circular.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || circular.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || circular.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'acknowledged' && circular.acknowledged) ||
                         (statusFilter === 'pending' && !circular.acknowledged);
    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const openModal = (circular: CircularMemo) => {
    setSelectedCircular(circular);
    setShowModal(true);
  };

  const getPriorityColor = (priority: CircularMemo['priority']) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const getTypeColor = (type: CircularMemo['type']) => {
    switch (type) {
      case 'Circular': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Memo': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400';
    }
  };

  const pendingCount = circulars.filter(c => !c.acknowledged).length;
  const highPriorityCount = circulars.filter(c => c.priority === 'High' && !c.acknowledged).length;

  // Modal component that will be rendered via portal
  const Modal = () => (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={() => setShowModal(false)}
      />
      
      {/* Modal content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedCircular?.title}</h2>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedCircular?.type || 'Circular')}`}>
                  {selectedCircular?.type}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedCircular?.priority || 'Low')}`}>
                  {selectedCircular?.priority}
                </span>
                {selectedCircular?.acknowledged && (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Acknowledged</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>Published by: {selectedCircular?.publishedBy}</span>
              <span className="mx-2">•</span>
              <span>{selectedCircular?.publishedDate ? new Date(selectedCircular.publishedDate).toLocaleDateString() : ''}</span>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {selectedCircular?.content}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
            {!selectedCircular?.acknowledged && (
              <button
                onClick={() => {
                  if (selectedCircular) {
                    handleAcknowledgeCircular(selectedCircular.id, selectedCircular.title);
                  }
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Acknowledge</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-[99998]">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Circulars & Memos</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">View and acknowledge official communications</p>
        </div>
        <div className="flex items-center space-x-4">
          {pendingCount > 0 && (
            <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{pendingCount} pending acknowledgment</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{circulars.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mr-3">
              <Clock className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{pendingCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mr-3">
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Priority</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{highPriorityCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-3">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Acknowledged</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{circulars.filter(c => c.acknowledged).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search circulars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Circular">Circular</option>
              <option value="Memo">Memo</option>
              <option value="Directive">Directive</option>
            </select>
          </div>
          
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="acknowledged">Acknowledged</option>
            </select>
          </div>
        </div>
      </div>

      {/* Circulars List */}
      <div className="space-y-4">
        {filteredCirculars.map((circular) => (
          <div
            key={circular.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow ${
              !circular.acknowledged ? 'border-l-4 border-l-red-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{circular.title}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(circular.type)}`}>
                    {circular.type}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(circular.priority)}`}>
                    {circular.priority}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {circular.content.substring(0, 150)}...
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>By: {circular.publishedBy}</span>
                    <span>•</span>
                    <span>{new Date(circular.publishedDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {circular.acknowledged ? (
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Acknowledged</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600 dark:text-red-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Pending</span>
                      </div>
                    )}
                    
                    <button
                      onClick={() => openModal(circular)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render Modal via Portal */}
      {showModal && selectedCircular && createPortal(
        <Modal />,
        document.body
      )}
    </div>
  );
};
