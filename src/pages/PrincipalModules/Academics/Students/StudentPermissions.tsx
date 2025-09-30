import React, { useState, useMemo } from 'react';
import { Check, X, ArrowUp, Briefcase, History, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';

// --- 1. Types (Untouched) ---

type UserRole = 'Faculty' | 'hod' | 'Principal';
type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

interface ActionRecord {
  role: UserRole;
  action: 'Approved' | 'Rejected' | 'Escalated';
  timestamp: string;
  actorName: string;
  note?: string;
}

interface Student {
  id: string;
  name: string;
  rollNo: string;
  department: string;
}

interface StudentLeaveRequest {
  id: string;
  student: Student;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: RequestStatus;
  currentApprover: UserRole | null;
  actionHistory: ActionRecord[];
  rejectionNote?: string;
}

// --- 2. Mock Data (Updated with historical records) ---
const MOCK_STUDENTS: Student[] = [
  { id: 'stud_1', name: 'Rohan Sharma', rollNo: 'CSE22001', department: 'Computer Science' },
  { id: 'stud_2', name: 'Priya Patel', rollNo: 'ECE22015', department: 'Electronics' },
  { id: 'stud_3', name: 'Amit Singh', rollNo: 'MECH21032', department: 'Mechanical Engineering' },
  { id: 'stud_4', name: 'Sneha Verma', rollNo: 'CSE22025', department: 'Computer Science' },
  { id: 'stud_5', name: 'Vikram Rathore', rollNo: 'CIVIL21009', department: 'Civil Engineering' },
];

const MOCK_STUDENT_LEAVE_REQUESTS: StudentLeaveRequest[] = [
  // Pending Requests
  {
    id: 'sreq_101', student: MOCK_STUDENTS[0], leaveTypeName: 'On-Duty Leave', startDate: '2025-10-20', endDate: '2025-10-22',
    reason: 'Attending a national-level hackathon representing the college.', status: 'Pending', currentApprover: 'Faculty', actionHistory: [],
  },
  {
    id: 'sreq_102', student: MOCK_STUDENTS[1], leaveTypeName: 'Sick Leave', startDate: '2025-10-25', endDate: '2025-10-26',
    reason: "Severe migraine. Doctor's note attached.", status: 'Pending', currentApprover: 'Faculty', actionHistory: [],
  },
  {
    id: 'sreq_103', student: MOCK_STUDENTS[2], leaveTypeName: 'Emergency Leave', startDate: '2025-11-01', endDate: '2025-11-01',
    reason: 'Family emergency, need to travel to my hometown immediately.', status: 'Pending', currentApprover: 'HoD',
    actionHistory: [{ role: 'Faculty', action: 'Escalated', timestamp: '2025-10-30T10:00:00Z', actorName: 'Prof. Anjali Devi', note: 'Forwarded for HoD review due to urgency.' }],
  },
  {
    id: 'sreq_104', student: MOCK_STUDENTS[3], leaveTypeName: 'Placement & Internship', startDate: '2025-11-10', endDate: '2025-11-12',
    reason: 'Attending internship interview at Tech Solutions Inc.', status: 'Pending', currentApprover: 'Principal',
    actionHistory: [
      { role: 'Faculty', action: 'Escalated', timestamp: '2025-11-05T09:00:00Z', actorName: 'Prof. Anjali Devi', note: 'Forwarded for HoD review.' },
      { role: 'HoD', action: 'Escalated', timestamp: '2025-11-06T14:30:00Z', actorName: 'Dr. Sanjay Gupta', note: 'Recommended for approval, forwarding to Principal.' },
    ],
  },
  // Historical Requests for the new table
  {
    id: 'sreq_201', student: MOCK_STUDENTS[4], leaveTypeName: 'Sick Leave', startDate: '2025-09-15', endDate: '2025-09-16',
    reason: 'Fever and cold.', status: 'Approved', currentApprover: null,
    actionHistory: [{ role: 'Faculty', action: 'Approved', timestamp: '2025-09-14T11:00:00Z', actorName: 'Prof. Anjali Devi', note: 'Get well soon.' }],
  },
  {
    id: 'sreq_202', student: MOCK_STUDENTS[0], leaveTypeName: 'Emergency Leave', startDate: '2025-09-20', endDate: '2025-09-22',
    reason: 'Unavoidable family function.', status: 'Rejected', currentApprover: null,
    actionHistory: [{ role: 'Faculty', action: 'Rejected', timestamp: '2025-09-19T17:30:00Z', actorName: 'Prof. Anjali Devi', note: 'This clashes with mid-term exams.' }],
  },
  {
    id: 'sreq_203', student: MOCK_STUDENTS[1], leaveTypeName: 'On-Duty Leave', startDate: '2025-09-25', endDate: '2025-09-26',
    reason: 'Representing college at a technical symposium.', status: 'Approved', currentApprover: null,
    actionHistory: [
        { role: 'Faculty', action: 'Escalated', timestamp: '2025-09-23T10:00:00Z', actorName: 'Prof. Anjali Devi', note: 'Forwarding for review.' },
        { role: 'HoD', action: 'Approved', timestamp: '2025-09-24T12:00:00Z', actorName: 'Dr. Sanjay Gupta', note: 'Approved. All the best.' },
    ],
  },
];

// --- 3. Reusable Modal (Untouched) ---
const NoteModal = ({ isOpen, onClose, onSubmit, title, confirmText }: { isOpen: boolean; onClose: () => void; onSubmit: (note: string) => void; title: string; confirmText: string; }) => {
    const [note, setNote] = useState('');
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={4} placeholder="Write your note here..." className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400" />
                <div className="flex justify-end space-x-4 mt-6">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 font-semibold">Cancel</button>
                    <button onClick={() => onSubmit(note)} disabled={!note.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

// --- 4. Leave Request Card (Untouched) ---
const LeaveRequestCard = ({ request, userRole, onApprove, onReject, onEscalate }: { request: StudentLeaveRequest; userRole: UserRole; onApprove: () => void; onReject: () => void; onEscalate: () => void; }) => {
    const canEscalate = userRole !== 'Principal';
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col h-full">
            <div className="flex flex-wrap gap-y-2 justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <div className="min-w-0 pr-2">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 break-all">{request.student.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 break-all">{request.student.rollNo} - {request.student.department}</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/50 rounded-full self-start">{request.leaveTypeName}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div><p className="font-semibold text-gray-600 dark:text-gray-300">From</p><p className="text-gray-800 dark:text-gray-100">{request.startDate}</p></div>
                <div><p className="font-semibold text-gray-600 dark:text-gray-300">To</p><p className="text-gray-800 dark:text-gray-100">{request.endDate}</p></div>
            </div>
            <div className="mb-4">
                <p className="font-semibold text-sm text-gray-600 dark:text-gray-300">Reason</p>
                <p className="text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md mt-1 break-all">{request.reason}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-sm text-gray-600 dark:text-gray-300 mb-2">History & Status</p>
                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    {request.actionHistory.map((act, idx) => (<p key={idx} className="break-all">- {act.action} by {act.actorName} ({act.role}) {act.note && `: "${act.note}"`}</p>))}
                    <p className="font-bold text-amber-600 dark:text-amber-400">- Pending with {request.currentApprover}</p>
                </div>
            </div>
            {request.currentApprover === userRole && (
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-5">
                    <button onClick={onApprove} className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors min-w-[100px]"><Check size={16} className="mr-2" />Approve</button>
                    <button onClick={onReject} className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors min-w-[100px]"><X size={16} className="mr-2" />Reject</button>
                    {canEscalate && (<button onClick={onEscalate} className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold transition-colors min-w-[100px]"><ArrowUp size={16} className="mr-2" />Escalate</button>)}
                </div>
            )}
        </div>
    );
};

// --- 5. NEW History Table Component ---
const HistoryTable = ({ requests }: { requests: StudentLeaveRequest[] }) => {
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    if (requests.length === 0) {
        return (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                <History size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
                <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">No History Found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">There are no completed leave requests to display yet.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Student</th>
                        <th scope="col" className="px-6 py-3">Leave Type</th>
                        <th scope="col" className="px-6 py-3">Dates</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Expand</span></th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <React.Fragment key={req.id}>
                            <tr onClick={() => setExpandedRowId(expandedRowId === req.id ? null : req.id)} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {req.student.name}<br/><span className="font-normal text-gray-500">{req.student.rollNo}</span>
                                </td>
                                <td className="px-6 py-4">{req.leaveTypeName}</td>
                                <td className="px-6 py-4">{req.startDate} to {req.endDate}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 font-semibold text-xs rounded-full ${req.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {expandedRowId === req.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </td>
                            </tr>
                            {expandedRowId === req.id && (
                                <tr className="bg-gray-50 dark:bg-gray-900/50">
                                    <td colSpan={5} className="p-4">
                                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                                            <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">Details</h4>
                                            <p className="font-semibold text-xs text-gray-600 dark:text-gray-300">Reason</p>
                                            <p className="mb-4 text-sm text-gray-700 dark:text-gray-200">{req.reason}</p>
                                            <p className="font-semibold text-xs text-gray-600 dark:text-gray-300">Action History</p>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mt-1">
                                                {req.actionHistory.map((act, idx) => (
                                                    <p key={idx}>- {act.action} by {act.actorName} ({act.role}) {act.note && `: "${act.note}"`}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


// --- 6. Main Component (Updated with Tabs) ---
const StudentLeaveActionComponent = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState<StudentLeaveRequest[]>(MOCK_STUDENT_LEAVE_REQUESTS);
    const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null as 'reject' | 'escalate' | null, title: '', confirmText: '', requestId: null as string | null, });

    const pendingRequests = useMemo(() => {
        if (!user) return [];
        return requests.filter(r => r.status === 'Pending' && r.currentApprover === user.role);
    }, [requests, user]);

    const historicalRequests = useMemo(() => {
        // For simplicity, showing all non-pending. In a real app, you might filter by department or other criteria.
        return requests.filter(r => r.status !== 'Pending');
    }, [requests]);

    if (!user) { return <div className="text-center p-10 dark:text-white">Please log in to view requests.</div>; }

    const handleAction = (id: string, action: 'Approve' | 'Reject' | 'Escalate', note?: string) => {
        setRequests(prev => prev.map(req => {
            if (req.id !== id) return req;
            const newHistory: ActionRecord = { role: user.role as UserRole, action: action === 'Approve' ? 'Approved' : action === 'Reject' ? 'Rejected' : 'Escalated', timestamp: new Date().toISOString(), actorName: user.name, note: note?.trim(), };
            if (action === 'Approve') { return { ...req, status: 'Approved', currentApprover: null, actionHistory: [...req.actionHistory, newHistory] }; }
            if (action === 'Reject') { return { ...req, status: 'Rejected', currentApprover: null, rejectionNote: note, actionHistory: [...req.actionHistory, newHistory] }; }
            if (action === 'Escalate') { const nextApprover: UserRole | null = user.role === 'Faculty' ? 'HoD' : user.role === 'HoD' ? 'Principal' : null; return { ...req, currentApprover: nextApprover, actionHistory: [...req.actionHistory, newHistory] }; }
            return req;
        }));
    };
    
    const openModal = (type: 'reject' | 'escalate', id: string) => {
        if (type === 'reject') { setModalConfig({ isOpen: true, type: 'reject', title: 'Reason for Rejection', confirmText: 'Confirm Rejection', requestId: id, }); } 
        else if (type === 'escalate') {
            const nextApprover = user.role === 'Faculty' ? 'HoD' : user.role === 'HoD' ? 'Principal' : null;
            if (nextApprover) { setModalConfig({ isOpen: true, type: 'escalate', title: `Note for Escalation to ${nextApprover}`, confirmText: 'Confirm Escalation', requestId: id, }); }
        }
    };

    const closeModal = () => setModalConfig({ isOpen: false, type: null, title: '', confirmText: '', requestId: null });
    const handleModalSubmit = (note: string) => { if (modalConfig.requestId && modalConfig.type) { handleAction(modalConfig.requestId, modalConfig.type, note); } closeModal(); };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Student Leave Actions</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Review and process student leave requests.</p>
                </header>

                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setActiveTab('pending')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'pending' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}>
                                <Briefcase size={16} className="mr-2" /> Pending Actions
                                {pendingRequests.length > 0 && <span className="ml-2 bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{pendingRequests.length}</span>}
                            </button>
                            <button onClick={() => setActiveTab('history')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'history' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}>
                                <History size={16} className="mr-2" /> Request History
                            </button>
                        </nav>
                    </div>
                </div>

                <main>
                    {activeTab === 'pending' && (
                        pendingRequests.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {pendingRequests.map(req => (<LeaveRequestCard key={req.id} request={req} userRole={user.role as UserRole} onApprove={() => handleAction(req.id, 'Approve')} onReject={() => openModal('reject', req.id)} onEscalate={() => openModal('escalate', req.id)} />))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                                <Briefcase size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
                                <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">All Clear!</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">There are no pending leave requests for you to review.</p>
                            </div>
                        )
                    )}

                    {activeTab === 'history' && <HistoryTable requests={historicalRequests} />}
                </main>
            </div>
            <NoteModal isOpen={modalConfig.isOpen} onClose={closeModal} onSubmit={handleModalSubmit} title={modalConfig.title} confirmText={modalConfig.confirmText} />
        </div>
    );
};

export default StudentLeaveActionComponent;