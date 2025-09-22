import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Edit, 
  Eye, 
  DollarSign, 
  FileText, 
  Calendar,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  AlertTriangle
} from 'lucide-react';

const FinancialApprovals = () => {
  const [activeTab, setActiveTab] = useState('purchase');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [actionLoading, setActionLoading] = useState(false);
  
  // Confirmation modal state
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'default',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {}
  });

  // Sample data for purchase requisitions
  const purchaseRequests = [
    {
      id: 'PR001',
      department: 'Computer Science',
      item: 'Dell Laptops (10 units)',
      cost: 75000,
      requestDate: '2024-09-15',
      priority: 'High',
      status: 'pending',
      justification: 'Required for new programming lab setup. Current laptops are 5 years old and unable to run latest development software efficiently. This will directly impact student learning outcomes in advanced programming courses.',
      requestedBy: 'Dr. Sarah Johnson',
      vendor: 'Dell Technologies',
      specifications: 'Intel i7, 16GB RAM, 512GB SSD'
    },
    {
      id: 'PR002',
      department: 'Chemistry',
      item: 'Laboratory Equipment Set',
      cost: 125000,
      requestDate: '2024-09-14',
      priority: 'Medium',
      status: 'pending',
      justification: 'Essential equipment for organic chemistry experiments. Current equipment is outdated and poses safety risks. Required for accreditation compliance.',
      requestedBy: 'Prof. Michael Chen',
      vendor: 'LabCorp Supplies',
      specifications: 'Fume hoods, spectrophotometer, centrifuge'
    },
    {
      id: 'PR003',
      department: 'Library',
      item: 'Digital Database Subscription',
      cost: 45000,
      requestDate: '2024-09-13',
      priority: 'Medium',
      status: 'pending',
      justification: 'Annual subscription to IEEE Digital Library for engineering and computer science research. Critical for faculty research and student projects.',
      requestedBy: 'Ms. Emily Rodriguez',
      vendor: 'IEEE',
      specifications: '1-year subscription, unlimited access'
    }
  ];

  // Sample data for budget requests
  const budgetRequests = [
    {
      id: 'BR001',
      department: 'Mechanical Engineering',
      totalAmount: 850000,
      requestDate: '2024-09-10',
      period: 'Academic Year 2024-25',
      status: 'pending',
      hodName: 'Prof. James Wilson',
      breakdown: {
        'Faculty Salaries': 450000,
        'Equipment & Maintenance': 200000,
        'Laboratory Supplies': 100000,
        'Student Activities': 50000,
        'Administrative Costs': 35000,
        'Miscellaneous': 15000
      },
      comments: 'Increased allocation requested due to new automotive engineering program launch.'
    },
    {
      id: 'BR002',
      department: 'Mathematics',
      totalAmount: 320000,
      requestDate: '2024-09-08',
      period: 'Academic Year 2024-25',
      status: 'pending',
      hodName: 'Dr. Lisa Anderson',
      breakdown: {
        'Faculty Salaries': 180000,
        'Software Licenses': 60000,
        'Books & References': 40000,
        'Conference & Training': 25000,
        'Administrative Costs': 15000
      },
      comments: 'Additional software licenses needed for advanced statistical analysis courses.'
    }
  ];

  // Confirmation modal functions
  const showConfirmation = (title, message, type, confirmText, onConfirm, cancelText = 'Cancel') => {
    setConfirmationModal({
      isOpen: true,
      title,
      message,
      type,
      confirmText,
      cancelText,
      onConfirm
    });
  };

  const hideConfirmation = () => {
    setConfirmationModal({
      isOpen: false,
      title: '',
      message: '',
      type: 'default',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: () => {}
    });
  };

  const handleConfirmedAction = async () => {
    setActionLoading(true);
    try {
      await confirmationModal.onConfirm();
      hideConfirmation();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleApproval = async (id, type, action, comments = '') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`${action} ${type} ${id}`, comments);
    // Handle approval logic here
    setSelectedRequest(null);
  };

  const filteredPurchaseRequests = purchaseRequests.filter(request => {
    const matchesSearch = request.item.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredBudgetRequests = budgetRequests.filter(request => {
    const matchesSearch = request.department.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.hodName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Confirmation Modal Component
  const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type }) => {
    if (!isOpen) return null;

    const getButtonStyles = () => {
      switch(type) {
        case 'approve':
          return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
        case 'reject':
          return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
        case 'modify':
          return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
        default:
          return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
      }
    };

    const getIconColor = () => {
      switch(type) {
        case 'approve':
          return 'text-green-600';
        case 'reject':
          return 'text-red-600';
        case 'modify':
          return 'text-yellow-600';
        default:
          return 'text-blue-600';
      }
    };

    const getIcon = () => {
      switch(type) {
        case 'approve':
          return <CheckCircle size={24} className={getIconColor()} />;
        case 'reject':
          return <XCircle size={24} className={getIconColor()} />;
        case 'modify':
          return <Edit size={24} className={getIconColor()} />;
        default:
          return <AlertTriangle size={24} className={getIconColor()} />;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {getIcon()}
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {message}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={onClose}
                disabled={actionLoading}
                className="w-full sm:w-auto px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                disabled={actionLoading}
                className={`w-full sm:w-auto px-4 py-2 text-white rounded-md transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${getButtonStyles()}`}
              >
                {actionLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PurchaseRequestCard = ({ request }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
      <div 
        className="p-4 cursor-pointer hover:bg-dark-50 dark:hover:bg-slate-750 transition-colors"
        onClick={() => toggleExpanded(request.id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                {request.item}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                request.priority === 'High' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {request.priority}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{request.department}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-green-600 dark:text-green-400">
                {formatCurrency(request.cost)}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>{request.requestDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {expandedItems[request.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
        </div>
      </div>

      {expandedItems[request.id] && (
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-dark-50 dark:bg-slate-750">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Justification</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{request.justification}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-700 dark:text-slate-300">Requested by:</span>
                <p className="text-slate-600 dark:text-slate-400">{request.requestedBy}</p>
              </div>
              <div>
                <span className="font-medium text-slate-700 dark:text-slate-300">Vendor:</span>
                <p className="text-slate-600 dark:text-slate-400">{request.vendor}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="font-medium text-slate-700 dark:text-slate-300">Specifications:</span>
                <p className="text-slate-600 dark:text-slate-400">{request.specifications}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-200 dark:border-slate-600">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showConfirmation(
                    'Approve Purchase Request',
                    `Are you sure you want to approve "${request.item}" for ${formatCurrency(request.cost)}? This action will proceed with the purchase requisition.`,
                    'approve',
                    'Approve Request',
                    () => handleApproval(request.id, 'purchase', 'approve')
                  );
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <CheckCircle size={16} />
                Approve
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRequest({...request, type: 'purchase'});
                }}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <Edit size={16} />
                Modify
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showConfirmation(
                    'Reject Purchase Request',
                    `Are you sure you want to reject "${request.item}"? This action cannot be undone and the request will be permanently declined.`,
                    'reject',
                    'Reject Request',
                    () => handleApproval(request.id, 'purchase', 'reject'),
                    'Cancel'
                  );
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <XCircle size={16} />
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const BudgetRequestCard = ({ request }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
      <div
        className="p-4 cursor-pointer hover:bg-dark-50 dark:hover:bg-slate-750 transition-colors"
        onClick={() => toggleExpanded(request.id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{request.department}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">HOD: {request.hodName}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {formatCurrency(request.totalAmount)}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>{request.period}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {expandedItems[request.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
        </div>
      </div>

      {expandedItems[request.id] && (
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-dark-50 dark:bg-slate-750">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Budget Breakdown</h4>
              <div className="space-y-2">
                {Object.entries(request.breakdown).map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center py-2 px-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{category}</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {request.comments && (
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Comments</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{request.comments}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-200 dark:border-slate-600">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showConfirmation(
                    'Approve Budget Request',
                    `Are you sure you want to approve the budget request for ${request.department} totaling ${formatCurrency(request.totalAmount)}? This will allocate the requested funds for ${request.period}.`,
                    'approve',
                    'Approve Budget',
                    () => handleApproval(request.id, 'budget', 'approve')
                  );
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <CheckCircle size={16} />
                Approve
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRequest({...request, type: 'budget'});
                }}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <Edit size={16} />
                Send for Revision
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showConfirmation(
                    'Reject Budget Request',
                    `Are you sure you want to reject the budget request for ${request.department}? This action cannot be undone and the department will need to resubmit their request.`,
                    'reject',
                    'Reject Budget',
                    () => handleApproval(request.id, 'budget', 'reject'),
                    'Cancel'
                  );
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <XCircle size={16} />
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Modal = ({ request, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Add Comments
          </h3>
          <textarea
            className="w-full h-32 p-3 border border-slate-300 dark:border-slate-600 rounded-md resize-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your comments or modifications..."
          />
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={() => handleApproval(request.id, request.type, 'approve_with_comments')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save & Approve
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('purchase')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'purchase'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <DollarSign size={16} />
              <span className="hidden sm:inline">Purchase Requisitions</span>
              <span className="sm:hidden">Purchases</span>
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'budget'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <FileText size={16} />
              <span className="hidden sm:inline">Budget Requests</span>
              <span className="sm:hidden">Budgets</span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'purchase' && (
            <div>
              {filteredPurchaseRequests.length > 0 ? (
                filteredPurchaseRequests.map(request => (
                  <PurchaseRequestCard key={request.id} request={request} />
                ))
              ) : (
                <div className="text-center py-12">
                  <DollarSign size={48} className="mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">No purchase requests found</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'budget' && (
            <div>
              {filteredBudgetRequests.length > 0 ? (
                filteredBudgetRequests.map(request => (
                  <BudgetRequestCard key={request.id} request={request} />
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">No budget requests found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={hideConfirmation}
          onConfirm={handleConfirmedAction}
          title={confirmationModal.title}
          message={confirmationModal.message}
          type={confirmationModal.type}
          confirmText={confirmationModal.confirmText}
          cancelText={confirmationModal.cancelText}
        />

        {/* Comments Modal */}
        {selectedRequest && (
          <Modal 
            request={selectedRequest} 
            onClose={() => setSelectedRequest(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default FinancialApprovals;
