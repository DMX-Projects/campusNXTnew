import React, { useState, useMemo } from 'react';
import { Check, X, ArrowUp, Briefcase } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext'; // Using your existing AuthContext

// --- 1. TYPES & MOCK DATA (Untouched) ---
type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

interface ActionRecord {
  role: string;
  action: 'Approved' | 'Rejected' | 'Escalated' | 'Submitted';
  timestamp: string;
  actorName: string;
  note?: string;
}

interface Faculty {
  id: string;
  name: string;
  department: string;
  role: 'faculty' | 'hod';
}

interface FacultyLeaveRequest {
  id: string;
  requester: Faculty;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: RequestStatus;
  currentApprover: 'hod' | 'principal' | null;
  actionHistory: ActionRecord[];
  rejectionNote?: string;
}

const MOCK_FACULTY: Faculty[] = [
  { id: 'fac_1', name: 'Prof. Anjali Devi', department: 'Computer Science', role: 'faculty' },
  { id: 'fac_2', name: 'Dr. Sanjay Gupta', department: 'Computer Science', role: 'hod' },
  { id: 'fac_3', name: 'Prof. Vikram Singh', department: 'Mechanical Engineering', role: 'faculty' },
];

const MOCK_FACULTY_LEAVE_REQUESTS: FacultyLeaveRequest[] = [
  {
    id: 'freq_101',
    requester: MOCK_FACULTY[0],
    leaveTypeName: 'Earned Leave',
    startDate: '2025-11-20',
    endDate: '2025-11-22',
    reason: 'Attending a family wedding out of state.',
    status: 'Pending',
    currentApprover: 'hod',
    actionHistory: [
      { role: 'faculty', action: 'Submitted', timestamp: '2025-11-15T09:00:00Z', actorName: 'Prof. Anjali Devi' },
    ],
  },
  {
    id: 'freq_102',
    requester: MOCK_FACULTY[1], // This is an HOD
    leaveTypeName: 'Casual Leave',
    startDate: '2025-11-18',
    endDate: '2025-11-18',
    reason: 'Personal work.',
    status: 'Pending',
    currentApprover: 'principal',
    actionHistory: [
      { role: 'hod', action: 'Submitted', timestamp: '2025-11-16T14:00:00Z', actorName: 'Dr. Sanjay Gupta' },
    ],
  },
  {
    id: 'freq_103',
    requester: MOCK_FACULTY[2],
    leaveTypeName: 'Duty Leave',
    startDate: '2025-12-01',
    endDate: '2025-12-05',
    reason: 'Attending an international conference on mechanical engineering. Need to prepare materials and travel.',
    status: 'Pending',
    currentApprover: 'principal',
    actionHistory: [
      { role: 'faculty', action: 'Submitted', timestamp: '2025-11-10T11:00:00Z', actorName: 'Prof. Vikram Singh' },
      {
        role: 'hod',
        action: 'Escalated',
        timestamp: '2025-11-11T16:30:00Z',
        actorName: 'Dr. Sanjay Gupta',
        note: 'Requires principal approval for international travel.',
      },
    ],
  },
];

// --- 2. NOTE MODAL (Untouched) ---
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

// --- 3. LEAVE CARD (UI Fixed) ---
const LeaveRequestCard = ({
  request,
  userRole,
  onApprove,
  onReject,
  onEscalate,
}: {
  request: FacultyLeaveRequest;
  userRole: string;
  onApprove: () => void;
  onReject: () => void;
  onEscalate: () => void;
}) => {
  const canEscalate = userRole === 'hod' && request.currentApprover === 'hod';

  return (
    // CHANGE: Added h-full for equal height cards in a grid row
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="flex flex-wrap gap-y-2 justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        {/* CHANGE: Added min-w-0 to allow text to shrink and wrap correctly */}
        <div className="min-w-0 pr-2">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 break-all">{request.requester.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
            {request.requester.department} - <span className="capitalize">{request.requester.role}</span>
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/50 rounded-full self-start">
          {request.leaveTypeName}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="font-semibold text-gray-600 dark:text-gray-300">From</p>
          <p className="text-gray-800 dark:text-gray-100">{request.startDate}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600 dark:text-gray-300">To</p>
          <p className="text-gray-800 dark:text-gray-100">{request.endDate}</p>
        </div>
      </div>

      <div className="flex-grow">
        <p className="font-semibold text-sm text-gray-600 dark:text-gray-300">Reason</p>
        <p className="text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md mt-1 break-all">
          {request.reason}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-sm text-gray-600 dark:text-gray-300 mb-2">History</p>
        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
          {request.actionHistory.map((act, idx) => (
            <p key={idx} className="break-words">
              - {act.action} by {act.actorName} ({act.role})
              {act.note && <span className="italic"> - "{act.note}"</span>}
            </p>
          ))}
          <p className="font-bold text-amber-600 dark:text-amber-400">- Pending with {request.currentApprover}</p>
        </div>
      </div>

      {/* CHANGE: Added sm:flex-wrap to allow buttons to wrap and added min-w for readability */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-5">
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
        {canEscalate && (
          <button
            onClick={onEscalate}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold transition-colors min-w-[100px]"
          >
            <ArrowUp size={16} className="mr-2" />
            Escalate
          </button>
        )}
      </div>
    </div>
  );
};


// --- 4. MAIN COMPONENT (Untouched) ---
const FacultyLeaveActionComponent = () => {
  const { user, loading } = useAuth();
  const [requests, setRequests] = useState<FacultyLeaveRequest[]>(MOCK_FACULTY_LEAVE_REQUESTS);
  const [modalType, setModalType] = useState<'reject' | 'escalate' | null>(null);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);

  if (loading) return <div className="p-8 text-center dark:text-gray-200">Loading...</div>;
  if (!user) return <div className="p-8 text-center dark:text-gray-200">Please log in to view action items.</div>;

  const pendingRequests = useMemo(() => {
    return requests.filter((r) => r.status === 'Pending' && r.currentApprover === user.role.toLowerCase());
  }, [requests, user]);

  const handleAction = (id: string, action: 'Approve' | 'Reject' | 'Escalate', note?: string) => {
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
          return { ...req, status: 'Approved', currentApprover: null, actionHistory: [...req.actionHistory, newHistory] };
        if (action === 'Reject')
          return {
            ...req,
            status: 'Rejected',
            currentApprover: null,
            rejectionNote: note,
            actionHistory: [...req.actionHistory, newHistory],
          };
        if (action === 'Escalate')
          return { ...req, currentApprover: 'principal', actionHistory: [...req.actionHistory, newHistory] };

        return req;
      }),
    );
  };

  const openModal = (type: 'reject' | 'escalate', id: string) => {
    setActiveRequestId(id);
    setModalType(type);
  };
  const closeModal = () => {
    setActiveRequestId(null);
    setModalType(null);
  };
  const handleModalSubmit = (note: string) => {
    if (activeRequestId && modalType) {
      handleAction(activeRequestId, modalType === 'reject' ? 'Reject' : 'Escalate', note);
    }
    closeModal();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-12 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Faculty Leave Actions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Review and process pending leave requests from faculty.
            </p>
          </div>
        </header>

        <main>
          {pendingRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pendingRequests.map((req) => (
                <LeaveRequestCard
                  key={req.id}
                  request={req}
                  userRole={user.role.toLowerCase()}
                  onApprove={() => handleAction(req.id, 'Approve')}
                  onReject={() => openModal('reject', req.id)}
                  onEscalate={() => openModal('escalate', req.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <Briefcase size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
              <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">All Clear!</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                No pending faculty leave requests for your review.
              </p>
            </div>
          )}
        </main>
      </div>
      <NoteModal
        isOpen={modalType !== null}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        title={modalType === 'reject' ? 'Reason for Rejection' : 'Note for Escalation to Principal'}
        confirmText={modalType === 'reject' ? 'Confirm Rejection' : 'Confirm Escalation'}
      />
    </div>
  );
};

export default FacultyLeaveActionComponent;