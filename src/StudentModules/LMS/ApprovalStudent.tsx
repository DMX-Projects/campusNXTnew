import React, { useState } from 'react';
import { 
  FileTextIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  AlertCircleIcon,
  PlusIcon,
  EyeIcon,

  DownloadIcon,
 
  RefreshCwIcon,
  CalendarIcon,
  UserIcon,
  HashIcon,

} from 'lucide-react';

interface ApprovalRequest {
  id: string;
  type: 'leave' | 'fee-concession' | 'hostel' | 'library' | 'certificate' | 'exam-registration' | 'project' | 'event-permission' | 'scholarship';
  title: string;
  description: string;
  submittedDate: string;
  requiredBy?: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected' | 'requires-action';
  approver: string;
  approverDesignation: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments: ApprovalAttachment[];
  comments: ApprovalComment[];
  trackingNumber: string;
  estimatedDays: number;
  daysElapsed: number;
  nextAction?: string;
  rejectionReason?: string;
  additionalInfo: { [key: string]: unknown };
}

interface ApprovalAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  uploadDate: string;
}

interface ApprovalComment {
  id: string;
  author: string;
  authorType: 'student' | 'approver' | 'admin';
  content: string;
  timestamp: string;
  isInternal?: boolean;
}

interface NewRequest {
  type: string;
  title: string;
  description: string;
  requiredBy: string;
  attachments: File[];
  additionalFields: { [key: string]: unknown };
}

const ApprovalStu: React.FC = () => {
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    {
      id: '1',
      type: 'leave',
      title: 'Medical Leave Application',
      description: 'Requesting 3 days medical leave due to fever and flu symptoms.',
      submittedDate: '2025-09-01T10:00:00Z',
      requiredBy: '2025-09-05',
      status: 'approved',
      approver: 'Dr. Rajesh Kumar',
      approverDesignation: 'HOD Computer Science',
      priority: 'medium',
      trackingNumber: 'LEAVE2025090001',
      estimatedDays: 2,
      daysElapsed: 3,
      attachments: [
        {
          id: '1',
          name: 'medical-certificate.pdf',
          size: '1.2 MB',
          type: 'pdf',
          url: '/files/medical-cert.pdf',
          uploadDate: '2025-09-01'
        }
      ],
      comments: [
        {
          id: '1',
          author: 'Dr. Rajesh Kumar',
          authorType: 'approver',
          content: 'Leave approved. Please submit attendance regularization form upon return.',
          timestamp: '2025-09-02T14:30:00Z'
        }
      ],
      additionalInfo: {
        leaveType: 'Medical',
        startDate: '2025-09-03',
        endDate: '2025-09-05',
        totalDays: 3
      }
    },
    {
      id: '2',
      type: 'certificate',
      title: 'Character Certificate Request',
      description: 'Requesting character certificate for scholarship application.',
      submittedDate: '2025-08-25T09:00:00Z',
      requiredBy: '2025-09-10',
      status: 'under-review',
      approver: 'Prof. Priya Sharma',
      approverDesignation: 'Dean Student Affairs',
      priority: 'high',
      trackingNumber: 'CERT2025082501',
      estimatedDays: 7,
      daysElapsed: 9,
      attachments: [
        {
          id: '2',
          name: 'scholarship-form.pdf',
          size: '850 KB',
          type: 'pdf',
          url: '/files/scholarship-form.pdf',
          uploadDate: '2025-08-25'
        }
      ],
      comments: [
        {
          id: '2',
          author: 'Admin Office',
          authorType: 'admin',
          content: 'Request forwarded to Dean Student Affairs for approval.',
          timestamp: '2025-08-26T11:00:00Z'
        }
      ],
      additionalInfo: {
        certificateType: 'Character Certificate',
        purpose: 'Scholarship Application',
        urgentRequired: true
      }
    },
    {
      id: '3',
      type: 'fee-concession',
      title: 'Fee Concession Request',
      description: 'Requesting fee concession due to family financial difficulties.',
      submittedDate: '2025-08-20T16:30:00Z',
      status: 'requires-action',
      approver: 'Finance Officer',
      approverDesignation: 'Accounts Department',
      priority: 'high',
      trackingNumber: 'FEE2025082001',
      estimatedDays: 10,
      daysElapsed: 14,
      nextAction: 'Submit updated income certificate',
      attachments: [
        {
          id: '3',
          name: 'income-certificate.pdf',
          size: '2.1 MB',
          type: 'pdf',
          url: '/files/income-cert.pdf',
          uploadDate: '2025-08-20'
        }
      ],
      comments: [
        {
          id: '3',
          author: 'Finance Officer',
          authorType: 'approver',
          content: 'Please submit updated income certificate dated within last 3 months.',
          timestamp: '2025-08-28T10:15:00Z'
        },
        {
          id: '4',
          author: 'You',
          authorType: 'student',
          content: 'I will submit the updated certificate by tomorrow.',
          timestamp: '2025-08-29T09:00:00Z'
        }
      ],
      additionalInfo: {
        concessionPercentage: 50,
        semester: 5,
        familyIncome: 250000,
        reason: 'Financial hardship'
      }
    },
    {
      id: '4',
      type: 'project',
      title: 'Final Year Project Topic Approval',
      description: 'Seeking approval for project topic: "AI-based Student Performance Prediction System"',
      submittedDate: '2025-08-15T14:00:00Z',
      status: 'rejected',
      approver: 'Dr. Amit Singh',
      approverDesignation: 'Project Coordinator',
      priority: 'medium',
      trackingNumber: 'PROJ2025081501',
      estimatedDays: 5,
      daysElapsed: 19,
      rejectionReason: 'Similar project already undertaken by another team. Please propose an alternative topic.',
      attachments: [
        {
          id: '4',
          name: 'project-proposal.pdf',
          size: '3.5 MB',
          type: 'pdf',
          url: '/files/project-proposal.pdf',
          uploadDate: '2025-08-15'
        }
      ],
      comments: [
        {
          id: '5',
          author: 'Dr. Amit Singh',
          authorType: 'approver',
          content: 'Similar project already undertaken by another team in previous semester. Please propose an alternative topic focusing on different domain.',
          timestamp: '2025-08-18T11:20:00Z'
        }
      ],
      additionalInfo: {
        projectType: 'Final Year Project',
        teamMembers: ['John Doe', 'Jane Smith'],
        proposedTechnologies: ['Python', 'Machine Learning', 'Flask', 'MySQL']
      }
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  const [newRequest, setNewRequest] = useState<NewRequest>({
    type: '',
    title: '',
    description: '',
    requiredBy: '',
    attachments: [],
    additionalFields: {}
  });

  const requestTypes = [
    { value: 'leave', label: 'Leave Application' },
    { value: 'certificate', label: 'Certificate Request' },
    { value: 'fee-concession', label: 'Fee Concession' },
    { value: 'exam-registration', label: 'Exam Registration' },
    { value: 'project', label: 'Project Approval' },
    { value: 'scholarship', label: 'Scholarship Application' }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'under-review': 'bg-blue-100 text-blue-800 border-blue-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      'requires-action': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: ClockIcon,
      'under-review': RefreshCwIcon,
      approved: CheckCircleIcon,
      rejected: XCircleIcon,
      'requires-action': AlertCircleIcon
    };
    return icons[status as keyof typeof icons];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-orange-100 text-orange-700',
      urgent: 'bg-red-100 text-red-700'
    };
    return colors[priority as keyof typeof colors];
  };

  const submitNewRequest = () => {
    if (!newRequest.type || !newRequest.title || !newRequest.description) {
      alert('Please fill all required fields');
      return;
    }

    const request: ApprovalRequest = {
      id: Date.now().toString(),
      type: newRequest.type as unknown as ApprovalRequest['type'],
      title: newRequest.title,
      description: newRequest.description,
      submittedDate: new Date().toISOString(),
      requiredBy: newRequest.requiredBy,
      status: 'pending',
      approver: 'System Auto-Assigned',
      approverDesignation: 'Pending Assignment',
      priority: 'medium',
      trackingNumber: `REQ${Date.now()}`,
      estimatedDays: 7,
      daysElapsed: 0,
      attachments: newRequest.attachments.map((file, index) => ({
        id: `att_${Date.now()}_${index}`,
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadDate: new Date().toISOString().split('T')[0]
      })),
      comments: [],
      additionalInfo: newRequest.additionalFields
    };

    setApprovalRequests(prev => [request, ...prev]);
    setNewRequest({
      type: '',
      title: '',
      description: '',
      requiredBy: '',
      attachments: [],
      additionalFields: {}
    });
    setShowNewRequestModal(false);
    alert(`Request submitted successfully! Tracking number: ${request.trackingNumber}`);
  };


  const downloadAttachment = (attachment: ApprovalAttachment) => {
    alert(`Downloading ${attachment.name}...`);
  };

  const withdrawRequest = (requestId: string) => {
    if (confirm('Are you sure you want to withdraw this request?')) {
      setApprovalRequests(prev => prev.filter(req => req.id !== requestId));
      alert('Request withdrawn successfully');
    }
  };

  const filteredRequests = approvalRequests.filter(request => {
    const statusMatch = selectedStatus === 'all' || request.status === selectedStatus;
    const typeMatch = selectedType === 'all' || request.type === selectedType;
    return statusMatch && typeMatch;
  });

  const stats = {
    total: approvalRequests.length,
    pending: approvalRequests.filter(r => r.status === 'pending').length,
    underReview: approvalRequests.filter(r => r.status === 'under-review').length,
    approved: approvalRequests.filter(r => r.status === 'approved').length,
    rejected: approvalRequests.filter(r => r.status === 'rejected').length,
    requiresAction: approvalRequests.filter(r => r.status === 'requires-action').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Approval Requests</h1>
              <p className="text-gray-600 mt-1">Submit and track your approval requests</p>
            </div>
            <button
              onClick={() => setShowNewRequestModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <PlusIcon size={20} />
              New Request
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under-review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="requires-action">Requires Action</option>
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {requestTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
              <div className="text-sm text-yellow-600">Pending</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-700">{stats.underReview}</div>
              <div className="text-sm text-blue-600">Under Review</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-700">{stats.approved}</div>
              <div className="text-sm text-green-600">Approved</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-700">{stats.rejected}</div>
              <div className="text-sm text-red-600">Rejected</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-700">{stats.requiresAction}</div>
              <div className="text-sm text-orange-600">Action Needed</div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map(request => {
            const StatusIcon = getStatusIcon(request.status);
            const daysOverdue = request.daysElapsed > request.estimatedDays ? request.daysElapsed - request.estimatedDays : 0;
            
            return (
              <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">{request.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                        <StatusIcon size={14} className="inline mr-1" />
                        {request.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <HashIcon size={14} />
                        <span>{request.trackingNumber}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={14} />
                        <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                      </div>
                      {request.requiredBy && (
                        <div className="flex items-center gap-1">
                          <ClockIcon size={14} />
                          <span>Required by: {new Date(request.requiredBy).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <UserIcon size={14} />
                        <span>{request.approver}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{request.description}</p>
                    
                    {/* Progress Indicator */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Processing Time</span>
                        <span>{request.daysElapsed}/{request.estimatedDays} days</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            daysOverdue > 0 ? 'bg-red-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min((request.daysElapsed / request.estimatedDays) * 100, 100)}%` }}
                        ></div>
                      </div>
                      {daysOverdue > 0 && (
                        <div className="text-xs text-red-600 mt-1">
                          Overdue by {daysOverdue} days
                        </div>
                      )}
                    </div>
                    
                    {/* Next Action Required */}
                    {request.nextAction && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <AlertCircleIcon size={16} className="text-orange-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-orange-900">Action Required</p>
                            <p className="text-orange-800 text-sm">{request.nextAction}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Rejection Reason */}
                    {request.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <XCircleIcon size={16} className="text-red-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-900">Rejection Reason</p>
                            <p className="text-red-800 text-sm">{request.rejectionReason}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowRequestModal(true);
                      }}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                      <EyeIcon size={16} />
                      View Details
                    </button>
                    
                    {(request.status === 'pending' || request.status === 'requires-action') && (
                      <button
                        onClick={() => withdrawRequest(request.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Attachments */}
                {request.attachments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                    <div className="flex flex-wrap gap-2">
                      {request.attachments.map(attachment => (
                        <div key={attachment.id} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm">
                          <FileTextIcon size={14} />
                          <span>{attachment.name}</span>
                          <span className="text-gray-500">({attachment.size})</span>
                          <button
                            onClick={() => downloadAttachment(attachment)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <DownloadIcon size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Recent Comments */}
                {request.comments.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Latest Update:</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{request.comments[request.comments.length - 1].author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(request.comments[request.comments.length - 1].timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{request.comments[request.comments.length - 1].content}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileTextIcon className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-600 mb-6">
              {selectedStatus !== 'all' || selectedType !== 'all'
                ? 'Try adjusting your filters'
                : 'You haven\'t submitted any approval requests yet'
              }
            </p>
            <button
              onClick={() => setShowNewRequestModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Submit New Request
            </button>
          </div>
        )}

        {/* New Request Modal */}
        {showNewRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Submit New Request</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Request Type *</label>
                  <select
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select request type</option>
                    {requestTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter request title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your request in detail"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required By</label>
                  <input
                    type="date"
                    value={newRequest.requiredBy}
                    onChange={(e) => setNewRequest({...newRequest, requiredBy: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setNewRequest({
                      ...newRequest, 
                      attachments: Array.from(e.target.files || [])
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Accepted formats: PDF, DOC, DOCX, JPG, PNG. Max 5MB per file.
                  </p>
                </div>
                
                {newRequest.attachments.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
                    <div className="space-y-1">
                      {newRequest.attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <FileTextIcon size={14} />
                          <span>{file.name}</span>
                          <span className="text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNewRequestModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitNewRequest}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Request Detail Modal */}
        {showRequestModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">{selectedRequest.title}</h2>
                  <button
                    onClick={() => setShowRequestModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Request Details</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium">Tracking Number:</span>
                        <span className="ml-2">{selectedRequest.trackingNumber}</span>
                      </div>
                      <div>
                        <span className="font-medium">Type:</span>
                        <span className="ml-2 capitalize">{selectedRequest.type.replace('-', ' ')}</span>
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(selectedRequest.status)}`}>
                          {selectedRequest.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Priority:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${getPriorityColor(selectedRequest.priority)}`}>
                          {selectedRequest.priority.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Submitted:</span>
                        <span className="ml-2">{new Date(selectedRequest.submittedDate).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="font-medium">Approver:</span>
                        <span className="ml-2">{selectedRequest.approver}</span>
                      </div>
                      <div>
                        <span className="font-medium">Designation:</span>
                        <span className="ml-2">{selectedRequest.approverDesignation}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Progress Timeline</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <FileTextIcon size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Request Submitted</p>
                          <p className="text-sm text-gray-600">{new Date(selectedRequest.submittedDate).toLocaleString()}</p>
                        </div>
                      </div>
                      
                      {selectedRequest.status !== 'pending' && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                            <RefreshCwIcon size={16} className="text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Under Review</p>
                            <p className="text-sm text-gray-600">Being processed by {selectedRequest.approver}</p>
                          </div>
                        </div>
                      )}
                      
                      {(selectedRequest.status === 'approved' || selectedRequest.status === 'rejected') && (
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            selectedRequest.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {selectedRequest.status === 'approved' ? (
                              <CheckCircleIcon size={16} className="text-white" />
                            ) : (
                              <XCircleIcon size={16} className="text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {selectedRequest.status === 'approved' ? 'Approved' : 'Rejected'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedRequest.status === 'approved' 
                                ? 'Your request has been approved' 
                                : selectedRequest.rejectionReason
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRequest.description}</p>
                </div>
                
                {selectedRequest.attachments.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Attachments</h3>
                    <div className="grid gap-3">
                      {selectedRequest.attachments.map(attachment => (
                        <div key={attachment.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileTextIcon size={20} className="text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-sm text-gray-600">{attachment.size} • Uploaded on {attachment.uploadDate}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadAttachment(attachment)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedRequest.comments.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Comments & Updates</h3>
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {selectedRequest.comments.map(comment => (
                        <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{comment.author}</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                comment.authorType === 'student' ? 'bg-blue-100 text-blue-800' :
                                comment.authorType === 'approver' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {comment.authorType}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Close
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

export default ApprovalStu;
