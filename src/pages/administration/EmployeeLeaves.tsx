import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, User, Search, Filter, Plus, Eye, Download } from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
  remainingLeaves: number;
}

const EmployeeLeaves: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const leaveRequests: LeaveRequest[] = [
    {
      id: 'LR001',
      employeeId: 'EMP001',
      employeeName: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      leaveType: 'Annual Leave',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      totalDays: 6,
      reason: 'Family vacation and personal time',
      status: 'approved',
      appliedDate: '2024-01-10',
      approvedBy: 'Dr. Michael Brown',
      approvedDate: '2024-01-12',
      comments: 'Approved. Please ensure coverage for your classes.',
      remainingLeaves: 14
    },
    {
      id: 'LR002',
      employeeId: 'EMP002',
      employeeName: 'Prof. Michael Brown',
      department: 'Mathematics',
      leaveType: 'Sick Leave',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      totalDays: 2,
      reason: 'Medical appointment and recovery',
      status: 'pending',
      appliedDate: '2024-01-15',
      remainingLeaves: 8
    },
    {
      id: 'LR003',
      employeeId: 'EMP003',
      employeeName: 'Dr. Emily Davis',
      department: 'Physics',
      leaveType: 'Conference Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-15',
      totalDays: 6,
      reason: 'Attending International Physics Conference in Boston',
      status: 'approved',
      appliedDate: '2024-01-08',
      approvedBy: 'Dean Office',
      approvedDate: '2024-01-10',
      comments: 'Conference attendance approved. Travel expenses covered.',
      remainingLeaves: 12
    },
    {
      id: 'LR004',
      employeeId: 'EMP004',
      employeeName: 'Prof. David Wilson',
      department: 'Chemistry',
      leaveType: 'Personal Leave',
      startDate: '2024-02-01',
      endDate: '2024-02-03',
      totalDays: 3,
      reason: 'Personal family matters',
      status: 'rejected',
      appliedDate: '2024-01-20',
      approvedBy: 'HR Department',
      approvedDate: '2024-01-22',
      comments: 'Insufficient notice period. Please apply at least 7 days in advance.',
      remainingLeaves: 18
    },
    {
      id: 'LR005',
      employeeId: 'EMP005',
      employeeName: 'Dr. Lisa Martinez',
      department: 'Biology',
      leaveType: 'Maternity Leave',
      startDate: '2024-04-01',
      endDate: '2024-07-01',
      totalDays: 92,
      reason: 'Maternity leave for childbirth and childcare',
      status: 'approved',
      appliedDate: '2024-01-05',
      approvedBy: 'HR Department',
      approvedDate: '2024-01-06',
      comments: 'Maternity leave approved. Congratulations!',
      remainingLeaves: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getLeaveTypeColor = (leaveType: string) => {
    switch (leaveType) {
      case 'Annual Leave': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      case 'Personal Leave': return 'bg-purple-100 text-purple-800';
      case 'Conference Leave': return 'bg-green-100 text-green-800';
      case 'Maternity Leave': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesLeaveType = leaveTypeFilter === 'all' || request.leaveType === leaveTypeFilter;
    const matchesDepartment = departmentFilter === 'all' || request.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesLeaveType && matchesDepartment;
  });

  const totalRequests = leaveRequests.length;
  const pendingRequests = leaveRequests.filter(r => r.status === 'pending').length;
  const approvedRequests = leaveRequests.filter(r => r.status === 'approved').length;
  const rejectedRequests = leaveRequests.filter(r => r.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Employee Leaves</h1>
          <p className="text-gray-600">Manage employee leave requests and approvals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <p className="text-2xl font-bold text-orange-600">{totalRequests}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedRequests}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedRequests}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by employee name, ID, or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={leaveTypeFilter}
                onChange={(e) => setLeaveTypeFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Leave Types</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Conference Leave">Conference Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                <Plus className="w-4 h-4" />
                New Request
              </button>
            </div>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="space-y-6">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {request.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
                        <p className="text-sm text-gray-500">{request.department}</p>
                        <p className="text-xs text-gray-400">ID: {request.employeeId}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(request.leaveType)}`}>
                        {request.leaveType}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium text-gray-900">{request.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium text-gray-900">{request.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Days</p>
                      <p className="font-medium text-gray-900">{request.totalDays} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remaining Leaves</p>
                      <p className="font-medium text-gray-900">{request.remainingLeaves} days</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Reason</p>
                    <p className="text-gray-700">{request.reason}</p>
                  </div>

                  {request.comments && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Comments:</strong> {request.comments}
                      </p>
                      {request.approvedBy && (
                        <p className="text-xs text-gray-500 mt-1">
                          {request.status === 'approved' ? 'Approved' : 'Reviewed'} by {request.approvedBy} on {request.approvedDate}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="text-sm text-gray-500">
                    Applied on: {request.appliedDate}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {request.status === 'pending' && (
                    <>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeLeaves;