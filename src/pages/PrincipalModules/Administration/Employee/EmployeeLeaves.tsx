import React, { useState, useMemo } from 'react';
import { Check, X, Briefcase, Calendar, Clock, FileText } from 'lucide-react';

// --- TYPES ---
type LeaveStatus = 'pending' | 'approved' | 'rejected';
type EmployeeType = 'teaching_faculty' | 'non_teaching_faculty' | 'administrative_staff' | 'support_staff' | 'technical_staff';
type LeaveType = 'sick' | 'casual' | 'earned' | 'maternity' | 'paternity' | 'emergency' | 'compensatory' | 'study' | 'sabbatical';

interface ActionRecord {
  role: string;
  action: 'Approved' | 'Rejected' | 'Submitted';
  timestamp: string;
  actorName: string;
  note?: string;
}

interface LeaveBalance {
  casual: number;
  sick: number;
  earned: number;
  total: number;
}

interface EmployeeLeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  email: string;
  department: string;
  designation: string;
  employeeType: EmployeeType;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  appliedDate: string;
  status: LeaveStatus;
  leaveBalance: LeaveBalance;
  reportingManager: string;
  emergencyContact: string;
  coveringEmployee?: string;
  documents?: string[];
  actionHistory: ActionRecord[];
  rejectionNote?: string;
}

// Mock user context (replace with your AuthContext)
const mockUser = {
  name: 'Dr. Vikash Singh',
  role: 'Principal'
};

// --- MOCK DATA ---
const MOCK_EMPLOYEE_LEAVE_REQUESTS: EmployeeLeaveRequest[] = [
  {
    id: 'ereq_101',
    employeeId: 'EMP001',
    employeeName: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@college.edu.in',
    department: 'Computer Science',
    designation: 'Professor',
    employeeType: 'teaching_faculty',
    leaveType: 'casual',
    fromDate: '2025-10-05',
    toDate: '2025-10-07',
    totalDays: 3,
    reason: 'Family function - daughter\'s wedding preparations',
    appliedDate: '2025-09-27',
    status: 'pending',
    reportingManager: 'Dr. Priya Sharma (HOD)',
    emergencyContact: '+91 9876543210',
    coveringEmployee: 'Dr. Amit Gupta',
    leaveBalance: { casual: 8, sick: 12, earned: 15, total: 35 },
    actionHistory: [
      { role: 'Employee', action: 'Submitted', timestamp: '2025-09-27T09:00:00Z', actorName: 'Dr. Rajesh Kumar' }
    ]
  },
  {
    id: 'ereq_102',
    employeeId: 'EMP005',
    employeeName: 'Vikash Singh',
    email: 'vikash.singh@college.edu.in',
    department: 'Administration',
    designation: 'Administrative Officer',
    employeeType: 'administrative_staff',
    leaveType: 'emergency',
    fromDate: '2025-09-29',
    toDate: '2025-09-30',
    totalDays: 2,
    reason: 'Father hospitalized - emergency situation',
    appliedDate: '2025-09-28',
    status: 'pending',
    reportingManager: 'Dr. Deepika Nair',
    emergencyContact: '+91 9876543214',
    leaveBalance: { casual: 11, sick: 12, earned: 16, total: 39 },
    actionHistory: [
      { role: 'Employee', action: 'Submitted', timestamp: '2025-09-28T10:30:00Z', actorName: 'Vikash Singh' }
    ]
  },
  {
    id: 'ereq_103',
    employeeId: 'EMP006',
    employeeName: 'Sneha Patel',
    email: 'sneha.patel@college.edu.in',
    department: 'IT Support',
    designation: 'System Administrator',
    employeeType: 'technical_staff',
    leaveType: 'maternity',
    fromDate: '2025-11-01',
    toDate: '2026-04-30',
    totalDays: 180,
    reason: 'Maternity leave for childbirth and recovery',
    appliedDate: '2025-09-15',
    status: 'pending',
    reportingManager: 'Mr. Anil Kumar',
    emergencyContact: '+91 9876543215',
    documents: ['maternity_certificate.pdf', 'doctor_recommendation.pdf'],
    leaveBalance: { casual: 12, sick: 12, earned: 20, total: 44 },
    actionHistory: [
      { role: 'Employee', action: 'Submitted', timestamp: '2025-09-15T14:00:00Z', actorName: 'Sneha Patel' }
    ]
  },
  {
    id: 'ereq_104',
    employeeId: 'EMP007',
    employeeName: 'Ramesh Yadav',
    email: 'ramesh.yadav@college.edu.in',
    department: 'Maintenance',
    designation: 'Maintenance Supervisor',
    employeeType: 'support_staff',
    leaveType: 'casual',
    fromDate: '2025-10-10',
    toDate: '2025-10-11',
    totalDays: 2,
    reason: 'Son\'s school annual day function',
    appliedDate: '2025-09-25',
    status: 'pending',
    reportingManager: 'Mr. Suresh Kumar',
    emergencyContact: '+91 9876543216',
    leaveBalance: { casual: 10, sick: 12, earned: 14, total: 36 },
    actionHistory: [
      { role: 'Employee', action: 'Submitted', timestamp: '2025-09-25T11:00:00Z', actorName: 'Ramesh Yadav' }
    ]
  }
];

// --- NOTE MODAL ---
const NoteModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  confirmText,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (note: string) => void;
  title: string;
  confirmText: string;
}) => {
  const [note, setNote] = useState('');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder="Write your note here..."
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"
        />
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(note)}
            disabled={!note.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- UTILITY FUNCTIONS ---
const getLeaveTypeColor = (type: LeaveType): string => {
  const colors: Record<LeaveType, string> = {
    sick: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200',
    casual: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
    earned: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200',
    emergency: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200',
    maternity: 'bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-200',
    paternity: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200',
    study: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200',
    sabbatical: 'bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200',
    compensatory: 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200'
  };
  return colors[type];
};

const formatEmployeeType = (type: EmployeeType): string => {
  return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// --- LEAVE CARD ---
const EmployeeLeaveCard = ({
  request,
  onApprove,
  onReject,
}: {
  request: EmployeeLeaveRequest;
  onApprove: () => void;
  onReject: () => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-wrap gap-y-2 justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <div className="min-w-0 pr-2 flex-1">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 break-all mb-1">{request.employeeName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
            {request.designation} - {request.department}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {request.employeeId} • {formatEmployeeType(request.employeeType)}
          </p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full self-start ${getLeaveTypeColor(request.leaveType)}`}>
          {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)}
        </span>
      </div>

      {/* Dates & Duration */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <Calendar size={14} />
            From
          </p>
          <p className="text-gray-800 dark:text-gray-100">{request.fromDate}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <Calendar size={14} />
            To
          </p>
          <p className="text-gray-800 dark:text-gray-100">{request.toDate}</p>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-3 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <Clock size={14} />
          <span className="font-bold text-indigo-700 dark:text-indigo-300">{request.totalDays} days</span>
          <span>requested</span>
        </p>
      </div>

      {/* Reason */}
      <div className="flex-grow mb-4">
        <p className="font-semibold text-sm text-gray-600 dark:text-gray-300 mb-1">Reason</p>
        <p className="text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md break-all">
          {request.reason}
        </p>
      </div>

      {/* Leave Balance */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
        <p className="font-semibold text-xs text-gray-600 dark:text-gray-300 mb-2">Leave Balance</p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">Casual</p>
            <p className="font-bold text-blue-600 dark:text-blue-400">{request.leaveBalance.casual}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">Sick</p>
            <p className="font-bold text-red-600 dark:text-red-400">{request.leaveBalance.sick}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">Earned</p>
            <p className="font-bold text-green-600 dark:text-green-400">{request.leaveBalance.earned}</p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mb-4">
        <p><span className="font-semibold">Manager:</span> {request.reportingManager}</p>
        {request.coveringEmployee && (
          <p><span className="font-semibold">Covering:</span> {request.coveringEmployee}</p>
        )}
        {request.documents && request.documents.length > 0 && (
          <p className="flex items-center gap-1">
            <FileText size={12} />
            <span className="font-semibold">{request.documents.length} document(s) attached</span>
          </p>
        )}
      </div>

      {/* History */}
      <div className="mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-sm text-gray-600 dark:text-gray-300 mb-2">History</p>
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          {request.actionHistory.map((act, idx) => (
            <p key={idx} className="break-words">
              - {act.action} by {act.actorName}
              {act.note && <span className="italic"> - "{act.note}"</span>}
            </p>
          ))}
          <p className="font-bold text-amber-600 dark:text-amber-400">- Pending Principal Approval</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-auto">
        <button
          onClick={onApprove}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors min-w-[100px]"
        >
          <Check size={16} className="mr-2" />
          Approve
        </button>
        <button
          onClick={onReject}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors min-w-[100px]"
        >
          <X size={16} className="mr-2" />
          Reject
        </button>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const EmployeeLeaveActionComponent = () => {
  const user = mockUser; // Replace with: const { user, loading } = useAuth();
  const [requests, setRequests] = useState<EmployeeLeaveRequest[]>(MOCK_EMPLOYEE_LEAVE_REQUESTS);
  const [modalType, setModalType] = useState<'reject' | null>(null);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);

  const pendingRequests = useMemo(() => {
    return requests.filter((r) => r.status === 'pending');
  }, [requests]);

  const handleAction = (id: string, action: 'Approve' | 'Reject', note?: string) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id !== id) return req;

        const newHistory: ActionRecord = {
          role: user.role,
          action,
          timestamp: new Date().toISOString(),
          actorName: user.name,
          note: note || undefined,
        };

        if (action === 'Approve')
          return { ...req, status: 'approved' as LeaveStatus, actionHistory: [...req.actionHistory, newHistory] };
        if (action === 'Reject')
          return {
            ...req,
            status: 'rejected' as LeaveStatus,
            rejectionNote: note,
            actionHistory: [...req.actionHistory, newHistory],
          };

        return req;
      }),
    );
  };

  const openModal = (id: string) => {
    setActiveRequestId(id);
    setModalType('reject');
  };
  
  const closeModal = () => {
    setActiveRequestId(null);
    setModalType(null);
  };
  
  const handleModalSubmit = (note: string) => {
    if (activeRequestId) {
      handleAction(activeRequestId, 'Reject', note);
    }
    closeModal();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-12 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Employee Leave Actions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Review and process pending leave requests from all staff members.
            </p>
          </div>
        </header>

        <main>
          {pendingRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pendingRequests.map((req) => (
                <EmployeeLeaveCard
                  key={req.id}
                  request={req}
                  onApprove={() => handleAction(req.id, 'Approve')}
                  onReject={() => openModal(req.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <Briefcase size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
              <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">All Clear!</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                No pending employee leave requests for your review.
              </p>
            </div>
          )}
        </main>
      </div>
      
      <NoteModal
        isOpen={modalType !== null}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        title="Reason for Rejection"
        confirmText="Confirm Rejection"
      />
    </div>
  );
};

export default EmployeeLeaveActionComponent;