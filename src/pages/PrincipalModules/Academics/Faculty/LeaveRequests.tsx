import React, { useState } from 'react';
import { Check, X, Eye } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface LeaveRequest {
  id: string;
  facultyName: string;
  department: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  hodName: string;
}

export default function LeaveRequests() {
  const { isDarkMode } = useTheme();
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      facultyName: 'Dr. John Smith',
      department: 'Computer Science',
      leaveType: 'Sick Leave',
      fromDate: '2024-01-20',
      toDate: '2024-01-22',
      days: 3,
      reason: 'Medical treatment required for chronic back pain.',
      status: 'pending',
      appliedDate: '2024-01-18',
      hodName: 'Dr. Michael Johnson'
    },
    {
      id: '2',
      facultyName: 'Dr. Sarah Johnson',
      department: 'Mathematics',
      leaveType: 'Personal Leave',
      fromDate: '2024-01-25',
      toDate: '2024-01-27',
      days: 3,
      reason: 'Family wedding ceremony.',
      status: 'approved',
      appliedDate: '2024-01-15',
      hodName: 'Dr. Robert Smith'
    },
    {
      id: '3',
      facultyName: 'Prof. Michael Brown',
      department: 'Physics',
      leaveType: 'Conference Leave',
      fromDate: '2024-02-01',
      toDate: '2024-02-05',
      days: 5,
      reason: 'Attending International Physics Conference in Boston.',
      status: 'pending',
      appliedDate: '2024-01-19',
      hodName: 'Dr. Emily Wilson'
    },
    {
      id: '4',
      facultyName: 'Dr. Emily Davis',
      department: 'Computer Science',
      leaveType: 'Maternity Leave',
      fromDate: '2024-03-01',
      toDate: '2024-05-30',
      days: 90,
      reason: 'Maternity leave for childbirth and recovery.',
      status: 'rejected',
      appliedDate: '2024-01-10',
      hodName: 'Dr. Michael Johnson'
    },
    {
      id: '5',
      facultyName: 'Prof. Robert Wilson',
      department: 'Chemistry',
      leaveType: 'Annual Leave',
      fromDate: '2024-01-30',
      toDate: '2024-02-02',
      days: 4,
      reason: 'Annual vacation with family.',
      status: 'approved',
      appliedDate: '2024-01-12',
      hodName: 'Dr. Lisa Brown'
    }
  ]);

  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

  const filteredRequests = leaveRequests.filter(request => {
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || request.department === departmentFilter;
    
    // Date range filter
    let matchesDateRange = true;
    if (dateRangeFilter) {
      const filterDate = new Date(dateRangeFilter);
      const fromDate = new Date(request.fromDate);
      const toDate = new Date(request.toDate);
      // Check if the filter date falls within the leave period or matches the from/to date
      matchesDateRange = (filterDate >= fromDate && filterDate <= toDate) || 
                        filterDate.toDateString() === fromDate.toDateString() ||
                        filterDate.toDateString() === toDate.toDateString();
    }
    
    return matchesStatus && matchesDepartment && matchesDateRange;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800';
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const handleApprove = (requestId: string) => {
    setLeaveRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId 
          ? { ...request, status: 'approved' as const }
          : request
      )
    );
    console.log('Approved request:', requestId);
  };

  const handleReject = (requestId: string) => {
    setLeaveRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === requestId 
          ? { ...request, status: 'rejected' as const }
          : request
      )
    );
    console.log('Rejected request:', requestId);
  };

  const openModal = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const totalRequests = leaveRequests.length;
  const pendingCount = leaveRequests.filter(r => r.status === 'pending').length;
  const approvedCount = leaveRequests.filter(r => r.status === 'approved').length;
  const rejectedCount = leaveRequests.filter(r => r.status === 'rejected').length;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Leave Requests</h1>
          <p className="text-sm mt-1 text-gray-500 dark:text-slate-400">
            Manage and review faculty leave applications
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md bg-blue-50 dark:bg-slate-800 border-blue-100 dark:border-slate-700">
          <h3 className="text-xs sm:text-sm font-medium mb-1 text-gray-600 dark:text-slate-400">Total Requests</h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{totalRequests}</p>
        </div>
        <div className="p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md bg-amber-50 dark:bg-slate-800 border-amber-100 dark:border-slate-700">
          <h3 className="text-xs sm:text-sm font-medium mb-1 text-gray-600 dark:text-slate-400">Pending</h3>
          <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingCount}</p>
        </div>
        <div className="p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md bg-emerald-50 dark:bg-slate-800 border-emerald-100 dark:border-slate-700">
          <h3 className="text-xs sm:text-sm font-medium mb-1 text-gray-600 dark:text-slate-400">Approved</h3>
          <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">{approvedCount}</p>
        </div>
        <div className="p-4 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md bg-rose-50 dark:bg-slate-800 border-rose-100 dark:border-slate-700">
          <h3 className="text-xs sm:text-sm font-medium mb-1 text-gray-600 dark:text-slate-400">Rejected</h3>
          <p className="text-xl sm:text-2xl font-bold text-rose-600 dark:text-rose-400">{rejectedCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-lg shadow-sm border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Department</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Date Range</label>
            <input
              type="date"
              value={dateRangeFilter}
              onChange={(e) => setDateRangeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
              placeholder="Select date to filter"
            />
          </div>
        </div>
        
        {/* Clear Filters Button */}
        {(statusFilter !== 'all' || departmentFilter !== 'all' || dateRangeFilter) && (
          <div className="mt-4">
            <button
              onClick={() => {
                setStatusFilter('all');
                setDepartmentFilter('all');
                setDateRangeFilter('');
              }}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="p-8 text-center rounded-lg border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
              <p className="text-lg font-medium mb-2 text-gray-500 dark:text-slate-300">
                No leave requests found
              </p>
              <p className="text-sm text-gray-400 dark:text-slate-400">
                Try adjusting your filters or search criteria
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="p-4 rounded-lg border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{request.facultyName}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{request.department}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">HOD: {request.hodName}</p>
                  </div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Leave Type:</span>
                    <span className="text-sm font-medium">{request.leaveType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Duration:</span>
                    <span className="text-sm font-medium">{request.days} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">From:</span>
                    <span className="text-sm font-medium">{new Date(request.fromDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">To:</span>
                    <span className="text-sm font-medium">{new Date(request.toDate).toLocaleDateString()}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-slate-600">
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      Reason: {request.reason.length > 50 ? `${request.reason.substring(0, 50)}...` : request.reason}
                    </p>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-slate-600">
                  <button
                    onClick={() => openModal(request)}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="text-green-500 hover:text-green-700 transition-colors duration-200"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        title="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block rounded-lg overflow-hidden shadow-sm border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Faculty / HOD
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Leave Details
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 sm:px-6 py-8 text-center text-gray-500 dark:text-slate-400">
                    No leave requests found matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request.id} className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{request.facultyName}</div>
                        <div className="text-sm text-gray-500 dark:text-slate-400">{request.department}</div>
                        <div className="text-xs text-gray-400 dark:text-slate-500">HOD: {request.hodName}</div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{request.leaveType}</div>
                        <div className="text-sm text-gray-500 dark:text-slate-400">
                          {request.reason.length > 50 ? `${request.reason.substring(0, 50)}...` : request.reason}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-slate-100">
                        {new Date(request.fromDate).toLocaleDateString()} - {new Date(request.toDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-slate-400">{request.days} days</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(request)}
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="text-green-500 hover:text-green-700 transition-colors duration-200"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Leave Request Details */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Leave Request Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-slate-400">Faculty Name</label>
                  <p className="text-sm text-gray-900 dark:text-slate-100">{selectedRequest.facultyName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-slate-400">Department</label>
                  <p className="text-sm text-gray-900 dark:text-slate-100">{selectedRequest.department}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-slate-400">Leave Type</label>
                  <p className="text-sm text-gray-900 dark:text-slate-100">{selectedRequest.leaveType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-slate-400">Duration</label>
                  <p className="text-sm text-gray-900 dark:text-slate-100">{selectedRequest.days} days</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-slate-400">From Date</label>
                  <p className="text-sm text-gray-900 dark:text-slate-100">{new Date(selectedRequest.fromDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-slate-400">To Date</label>
                  <p className="text-sm text-gray-900 dark:text-slate-100">{new Date(selectedRequest.toDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-slate-400">Reason</label>
                <p className="text-sm text-gray-900 dark:text-slate-100">{selectedRequest.reason}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-slate-400">Applied Date</label>
                  <p className="text-sm text-gray-900 dark:text-slate-100">{new Date(selectedRequest.appliedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-slate-400">HOD Name</label>
                  <p className="text-sm text-gray-900 dark:text-slate-100">{selectedRequest.hodName}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-slate-400">Status</label>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(selectedRequest.status)}`}>
                  {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </span>
              </div>
              
              {selectedRequest.status === 'pending' && (
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => {
                      handleApprove(selectedRequest.id);
                      setShowModal(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Approve Request
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedRequest.id);
                      setShowModal(false);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Reject Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
