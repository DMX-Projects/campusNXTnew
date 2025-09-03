import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon, EyeIcon, FileTextIcon } from 'lucide-react';

interface ApprovalRequest {
  id: string;
  type: 'leave' | 'fee_waiver' | 'course_change' | 'exam_reeval' | 'hostel' | 'transcript' | 'other';
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  title: string;
  description: string;
  submittedDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  documents: string[];
  approvalLevel: 'chairperson' | 'dean' | 'registrar' | 'hod';
  comments?: string;
  amount?: number;
}

const Approval: React.FC = () => {
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    {
      id: '1',
      type: 'fee_waiver',
      studentId: 'S001',
      studentName: 'Rahul Sharma',
      rollNumber: 'CSE001',
      department: 'CSE',
      title: 'Fee Waiver Request - Financial Hardship',
      description: 'Requesting fee waiver due to family financial difficulties. Father lost job during pandemic.',
      submittedDate: '2025-09-01',
      priority: 'high',
      status: 'pending',
      documents: ['income_certificate.pdf', 'bank_statement.pdf'],
      approvalLevel: 'chairperson',
      amount: 75000
    },
    {
      id: '2',
      type: 'course_change',
      studentId: 'S002',
      studentName: 'Priya Singh',
      rollNumber: 'CSE002',
      department: 'CSE',
      title: 'Course Change Request - CSE to ECE',
      description: 'Want to change branch from Computer Science to Electronics due to interest in hardware.',
      submittedDate: '2025-08-30',
      priority: 'medium',
      status: 'under_review',
      documents: ['academic_transcript.pdf', 'personal_statement.pdf'],
      approvalLevel: 'dean'
    },
    {
      id: '3',
      type: 'exam_reeval',
      studentId: 'S003',
      studentName: 'Amit Kumar',
      rollNumber: 'CSE003',
      department: 'CSE',
      title: 'Exam Re-evaluation Request',
      description: 'Requesting re-evaluation of Data Structures exam. Expected better grades.',
      submittedDate: '2025-08-28',
      priority: 'low',
      status: 'pending',
      documents: ['exam_copy.pdf', 'application_form.pdf'],
      approvalLevel: 'chairperson'
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [approvalComment, setApprovalComment] = useState('');
  const [bulkSelection, setBulkSelection] = useState<string[]>([]);

  const requestTypes = ['leave', 'fee_waiver', 'course_change', 'exam_reeval', 'hostel', 'transcript', 'other'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const statuses = ['pending', 'approved', 'rejected', 'under_review'];

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      under_review: 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      leave: '🏖️',
      fee_waiver: '💰',
      course_change: '📚',
      exam_reeval: '📝',
      hostel: '🏠',
      transcript: '📄',
      other: '📋'
    };
    return icons[type as keyof typeof icons];
  };

  const filteredRequests = approvalRequests.filter(request => {
    return (
      (selectedFilter === 'all' || request.type === selectedFilter) &&
      (selectedPriority === 'all' || request.priority === selectedPriority) &&
      (selectedStatus === 'all' || request.status === selectedStatus)
    );
  });

  const handleApproval = (requestId: string, action: 'approved' | 'rejected') => {
    const updatedRequests = approvalRequests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: action, 
            comments: approvalComment 
          }
        : request
    );
    setApprovalRequests(updatedRequests);
    setApprovalComment('');
    setIsDetailModalOpen(false);
    alert(`Request ${action} successfully!`);
  };

  const handleBulkApproval = (action: 'approved' | 'rejected') => {
    const updatedRequests = approvalRequests.map(request => 
      bulkSelection.includes(request.id) 
        ? { ...request, status: action }
        : request
    );
    setApprovalRequests(updatedRequests);
    setBulkSelection([]);
    alert(`${bulkSelection.length} requests ${action} successfully!`);
  };

  const toggleBulkSelection = (requestId: string) => {
    setBulkSelection(prev => 
      prev.includes(requestId) 
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const exportApprovals = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Type,Student Name,Roll Number,Department,Title,Status,Priority,Submitted Date,Amount\n" +
      filteredRequests.map(request => 
        `${request.id},${request.type},${request.studentName},${request.rollNumber},${request.department},"${request.title}",${request.status},${request.priority},${request.submittedDate},${request.amount || 'N/A'}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "approval_requests.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    total: approvalRequests.length,
    pending: approvalRequests.filter(r => r.status === 'pending').length,
    approved: approvalRequests.filter(r => r.status === 'approved').length,
    rejected: approvalRequests.filter(r => r.status === 'rejected').length,
    urgent: approvalRequests.filter(r => r.priority === 'urgent').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Approval Management</h1>
              <p className="text-gray-600 mt-1">Review and approve student requests across departments</p>
            </div>
            <div className="flex gap-3">
              {bulkSelection.length > 0 && (
                <>
                  <button
                    onClick={() => handleBulkApproval('approved')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Bulk Approve ({bulkSelection.length})
                  </button>
                  <button
                    onClick={() => handleBulkApproval('rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Bulk Reject ({bulkSelection.length})
                  </button>
                </>
              )}
              <button
                onClick={exportApprovals}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Export Report
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {requestTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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

            <button
              onClick={() => {
                setSelectedFilter('all');
                setSelectedStatus('all');
                setSelectedPriority('all');
              }}
              className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileTextIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <ClockIcon className="text-yellow-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircleIcon className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircleIcon className="text-red-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
              </div>
              <div className="text-2xl">🚨</div>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Approval Requests ({filteredRequests.length})
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBulkSelection(filteredRequests.map(r => r.id));
                          } else {
                            setBulkSelection([]);
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="text-left p-3 font-medium text-gray-900">Type</th>
                    <th className="text-left p-3 font-medium text-gray-900">Student</th>
                    <th className="text-left p-3 font-medium text-gray-900">Title</th>
                    <th className="text-left p-3 font-medium text-gray-900">Priority</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                    <th className="text-left p-3 font-medium text-gray-900">Date</th>
                    <th className="text-left p-3 font-medium text-gray-900">Amount</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={bulkSelection.includes(request.id)}
                          onChange={() => toggleBulkSelection(request.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getTypeIcon(request.type)}</span>
                          <span className="text-sm font-medium">
                            {request.type.replace('_', ' ').split(' ').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="font-medium text-gray-900">{request.studentName}</div>
                          <div className="text-sm text-gray-500">{request.rollNumber} - {request.department}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="max-w-xs truncate" title={request.title}>
                          {request.title}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-600">
                        {new Date(request.submittedDate).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-sm font-medium">
                        {request.amount ? `₹${request.amount.toLocaleString()}` : '-'}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setIsDetailModalOpen(true);
                            }}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-1 rounded transition-colors"
                          >
                            <EyeIcon size={16} />
                          </button>
                          {request.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproval(request.id, 'approved')}
                                className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded transition-colors"
                              >
                                <CheckCircleIcon size={16} />
                              </button>
                              <button
                                onClick={() => handleApproval(request.id, 'rejected')}
                                className="bg-red-100 hover:bg-red-200 text-red-700 p-1 rounded transition-colors"
                              >
                                <XCircleIcon size={16} />
                              </button>
                            </>
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

        {/* Detail Modal */}
        {isDetailModalOpen && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Request Details</h2>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Request Type</label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl">{getTypeIcon(selectedRequest.type)}</span>
                      <span className="text-sm font-medium">
                        {selectedRequest.type.replace('_', ' ').split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPriorityColor(selectedRequest.priority)}`}>
                      {selectedRequest.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Student Information</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{selectedRequest.studentName}</div>
                    <div className="text-sm text-gray-600">{selectedRequest.rollNumber} - {selectedRequest.department}</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="mt-1 text-gray-900">{selectedRequest.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRequest.description}</p>
                </div>
                
                {selectedRequest.amount && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="mt-1 text-lg font-semibold text-green-600">₹{selectedRequest.amount.toLocaleString()}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Documents</label>
                  <div className="mt-1 space-y-2">
                    {selectedRequest.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <FileTextIcon size={16} className="text-gray-500" />
                        <span className="text-sm">{doc}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm ml-auto">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedRequest.status === 'pending' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                    <textarea
                      value={approvalComment}
                      onChange={(e) => setApprovalComment(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                      placeholder="Add comments for approval/rejection..."
                    ></textarea>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                {selectedRequest.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleApproval(selectedRequest.id, 'rejected')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Reject Request
                    </button>
                    <button
                      onClick={() => handleApproval(selectedRequest.id, 'approved')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Approve Request
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approval;
