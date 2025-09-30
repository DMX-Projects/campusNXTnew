import React, { useState, useMemo } from 'react';
import { Plus, Send, Paperclip, Calendar, ChevronDown, Clock, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';

// --- MOCK DATA & TYPES (Simulating data that would come from a backend) ---

// Corresponds to the structure from ConfigureFacultyLeave.tsx
interface LeaveTypePolicy {
  id: string;
  name: string;
  abbreviation: string;
  allowHalfDays: boolean;
  requiresDocumentationAfterDays: number | null;
}

const MOCK_LEAVE_POLICIES: LeaveTypePolicy[] = [
  { id: 'lt_1', name: 'Casual Leave', abbreviation: 'CL', allowHalfDays: true, requiresDocumentationAfterDays: null },
  { id: 'lt_2', name: 'Sick Leave', abbreviation: 'SL', allowHalfDays: true, requiresDocumentationAfterDays: 2 },
  { id: 'lt_3', name: 'Earned Leave', abbreviation: 'EL', allowHalfDays: false, requiresDocumentationAfterDays: null },
  { id: 'lt_4', name: 'Maternity Leave', abbreviation: 'ML', allowHalfDays: false, requiresDocumentationAfterDays: 1 },
  { id: 'lt_6', name: 'Leave Without Pay', abbreviation: 'LWP', allowHalfDays: false, requiresDocumentationAfterDays: null },
  { id: 'lt_7', name: 'Compensatory Off', abbreviation: 'Comp-Off', allowHalfDays: true, requiresDocumentationAfterDays: null },
];

interface LeaveBalance {
  leaveTypeId: string;
  total: number;
  used: number;
}

const MOCK_USER_BALANCES: LeaveBalance[] = [
  { leaveTypeId: 'lt_1', total: 12, used: 4 },
  { leaveTypeId: 'lt_2', total: 10, used: 1 },
  { leaveTypeId: 'lt_3', total: 15, used: 10 },
  { leaveTypeId: 'lt_7', total: 5, used: 2 },
];

type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

interface LeaveRequest {
  id: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  isHalfDay: boolean;
  halfDaySession?: 'Session 1' | 'Session 2';
  reason: string;
  status: RequestStatus;
  appliedOn: string;
}

const MOCK_REQUEST_HISTORY: LeaveRequest[] = [
    { id: 'req_1', leaveTypeId: 'lt_1', startDate: '2025-09-22', endDate: '2025-09-22', isHalfDay: false, reason: 'Personal work', status: 'Approved', appliedOn: '2025-09-20' },
    { id: 'req_2', leaveTypeId: 'lt_2', startDate: '2025-09-15', endDate: '2025-09-16', isHalfDay: false, reason: 'Fever', status: 'Approved', appliedOn: '2025-09-15' },
    { id: 'req_3', leaveTypeId: 'lt_3', startDate: '2025-10-10', endDate: '2025-10-15', isHalfDay: false, reason: 'Family vacation', status: 'Pending', appliedOn: '2025-09-10' },
    { id: 'req_4', leaveTypeId: 'lt_1', startDate: '2025-08-01', endDate: '2025-08-01', isHalfDay: true, halfDaySession: 'Session 2', reason: 'Bank work', status: 'Rejected', appliedOn: '2025-07-30' },
];


// --- UI Sub-Components ---

const LeaveBalanceCard = ({ balance, policy }: { balance: LeaveBalance, policy: LeaveTypePolicy }) => {
    const remaining = balance.total - balance.used;
    const percentage = (remaining / balance.total) * 100;

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{policy.name}</h4>
            <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">{remaining}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/ {balance.total} days</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }: { status: RequestStatus }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center";
    const styles = {
        Pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
        Approved: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
        Rejected: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    };
    const icons = {
        Pending: <Clock size={12} className="mr-1.5" />,
        Approved: <CheckCircle size={12} className="mr-1.5" />,
        Rejected: <XCircle size={12} className="mr-1.5" />,
    };
    return <span className={`${baseClasses} ${styles[status]}`}>{icons[status]} {status}</span>;
};


// --- Main Component ---

export default function RequestFacultyLeave() {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(MOCK_REQUEST_HISTORY);
    
    // Form State
    const [leaveTypeId, setLeaveTypeId] = useState<string>(MOCK_LEAVE_POLICIES[0]?.id || '');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isHalfDay, setIsHalfDay] = useState(false);
    const [halfDaySession, setHalfDaySession] = useState<'Session 1' | 'Session 2'>('Session 1');
    const [reason, setReason] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);

    const selectedPolicy = useMemo(() => MOCK_LEAVE_POLICIES.find(p => p.id === leaveTypeId), [leaveTypeId]);
    const selectedBalance = useMemo(() => MOCK_USER_BALANCES.find(b => b.leaveTypeId === leaveTypeId), [leaveTypeId]);

    const handleLeaveTypeChange = (id: string) => {
        setLeaveTypeId(id);
        setIsHalfDay(false); // Reset half-day option on type change
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!leaveTypeId || !startDate || !reason) {
            alert('Please fill all required fields.');
            return;
        }

        const newRequest: LeaveRequest = {
            id: `req_${Date.now()}`,
            leaveTypeId,
            startDate,
            endDate: isHalfDay ? startDate : (endDate || startDate),
            isHalfDay,
            halfDaySession: isHalfDay ? halfDaySession : undefined,
            reason,
            status: 'Pending',
            appliedOn: new Date().toISOString().split('T')[0],
        };

        setLeaveRequests(prev => [newRequest, ...prev]);

        // Reset form
        setLeaveTypeId(MOCK_LEAVE_POLICIES[0]?.id || '');
        setStartDate('');
        setEndDate('');
        setIsHalfDay(false);
        setReason('');
        setAttachment(null);
    };

    const isSubmitDisabled = !leaveTypeId || !startDate || !reason || (isHalfDay && !halfDaySession) || (!isHalfDay && !endDate);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                 <header className="mb-8 md:mb-12">
                     <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Leave Portal</h1>
                     <p className="text-gray-600 dark:text-gray-400 mt-1">Apply for leave and track your requests.</p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center mb-6">
                               <Plus className="mr-3 text-indigo-500"/>
                               New Leave Request
                           </h2>
                           
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                {/* Leave Type & Balance */}
                                <div>
                                    <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Type</label>
                                    <select id="leaveType" value={leaveTypeId} onChange={(e) => handleLeaveTypeChange(e.target.value)} className="w-full p-2.5 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                        {MOCK_LEAVE_POLICIES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                    {selectedBalance && <p className="text-xs text-green-600 dark:text-green-400 mt-1.5 font-semibold">{(selectedBalance.total - selectedBalance.used)} days remaining</p>}
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                        <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                                    </div>
                                    <div className={isHalfDay ? 'opacity-50' : ''}>
                                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                                        <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} disabled={isHalfDay} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 disabled:cursor-not-allowed"/>
                                    </div>
                                </div>
                                
                                 {/* Half Day Option */}
                                {selectedPolicy?.allowHalfDays && (
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="isHalfDay" checked={isHalfDay} onChange={(e) => setIsHalfDay(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                                            <label htmlFor="isHalfDay" className="ml-2 block text-sm font-medium text-gray-800 dark:text-gray-200">Request Half-Day</label>
                                        </div>
                                        {isHalfDay && (
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center"><input type="radio" name="session" value="Session 1" checked={halfDaySession === 'Session 1'} onChange={() => setHalfDaySession('Session 1')} className="mr-1"/> Session 1</label>
                                                <label className="flex items-center"><input type="radio" name="session" value="Session 2" checked={halfDaySession === 'Session 2'} onChange={() => setHalfDaySession('Session 2')} className="mr-1"/> Session 2</label>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Reason */}
                                <div>
                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason for Leave</label>
                                    <textarea id="reason" rows={4} value={reason} onChange={e => setReason(e.target.value)} placeholder="Please provide a brief reason..." className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"></textarea>
                                </div>
                                
                                {/* Attachment */}
                                <div>
                                    <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Attach Document (Optional)</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                             <Paperclip className="mx-auto h-8 w-8 text-gray-400" />
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none">
                                                    <span>{attachment ? attachment.name : "Upload a file"}</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => setAttachment(e.target.files ? e.target.files[0] : null)} />
                                                </label>
                                                <p className="pl-1">{!attachment && "or drag and drop"}</p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, PDF up to 5MB</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="text-right">
                                     <button type="submit" disabled={isSubmitDisabled} className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center ml-auto">
                                        <Send size={16} className="mr-2"/> Submit Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    {/* Right Column: Balances & History */}
                    <div className="space-y-8">
                        <div>
                             <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Your Leave Balances</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {MOCK_USER_BALANCES.map(balance => {
                                    const policy = MOCK_LEAVE_POLICIES.find(p => p.id === balance.leaveTypeId);
                                    return policy ? <LeaveBalanceCard key={balance.leaveTypeId} balance={balance} policy={policy} /> : null;
                                })}
                             </div>
                        </div>

                         <div>
                             <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Request History</h3>
                             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                         <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-700 dark:text-gray-400 uppercase">
                                            <tr>
                                                <th className="px-4 py-3">Type</th>
                                                <th className="px-4 py-3">Dates</th>
                                                <th className="px-4 py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leaveRequests.slice(0, 5).map(req => {
                                                const policy = MOCK_LEAVE_POLICIES.find(p => p.id === req.leaveTypeId);
                                                return (
                                                    <tr key={req.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{policy?.name || 'N/A'}</td>
                                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{req.startDate}{req.startDate !== req.endDate ? ` to ${req.endDate}` : ''}</td>
                                                        <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                             </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
