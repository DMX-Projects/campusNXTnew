import React, { useState, useMemo } from 'react';
import { Plus, Send, Paperclip, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// --- MOCK DATA & TYPES (Simulating data that would come from a backend) ---

interface LeaveTypePolicy {
  id: string;
  name: string;
  abbreviation: string;
  grantsAttendanceCredit: boolean;
  requiresDocumentation: boolean;
}

const MOCK_STUDENT_LEAVE_POLICIES: LeaveTypePolicy[] = [
  { id: 'slt_1', name: 'Sick Leave', abbreviation: 'SL', grantsAttendanceCredit: true, requiresDocumentation: true },
  { id: 'slt_2', name: 'On-Duty Leave', abbreviation: 'OD', grantsAttendanceCredit: true, requiresDocumentation: true },
  { id: 'slt_4', name: 'Emergency Leave', abbreviation: 'EML', grantsAttendanceCredit: true, requiresDocumentation: false },
  { id: 'slt_5', name: 'Placement & Internship', abbreviation: 'PIL', grantsAttendanceCredit: true, requiresDocumentation: true },
];

interface AttendanceStatus {
  current: number;
  required: number;
}

const MOCK_STUDENT_ATTENDANCE: AttendanceStatus = {
    current: 82,
    required: 75,
};

type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

interface LeaveRequest {
  id: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: RequestStatus;
  appliedOn: string;
  rejectionNote?: string;
}

const MOCK_STUDENT_REQUEST_HISTORY: LeaveRequest[] = [
    { id: 'sreq_1', leaveTypeId: 'slt_2', startDate: '2025-09-22', endDate: '2025-09-23', reason: 'Attending symposium', status: 'Approved', appliedOn: '2025-09-20' },
    { id: 'sreq_2', leaveTypeId: 'slt_1', startDate: '2025-09-15', endDate: '2025-09-15', reason: 'Viral Fever', status: 'Approved', appliedOn: '2025-09-15' },
    { id: 'sreq_3', leaveTypeId: 'slt_5', startDate: '2025-10-10', endDate: '2025-10-12', reason: 'Internship Interview', status: 'Pending', appliedOn: '2025-09-25' },
    { id: 'sreq_4', leaveTypeId: 'slt_1', startDate: '2025-08-01', endDate: '2025-08-01', reason: 'Not well', status: 'Rejected', appliedOn: '2025-07-30', rejectionNote: 'Medical certificate was not attached.' },
];


// --- UI Sub-Components ---

const AttendanceCard = ({ attendance }: { attendance: AttendanceStatus }) => {
    const isBelowRequired = attendance.current < attendance.required;
    const colorClass = isBelowRequired ? 'text-red-500' : 'text-green-500';
    const ringClass = isBelowRequired ? 'ring-red-500/30' : 'ring-green-500/30';

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Attendance Status</h3>
            <div className="flex items-center justify-center">
                 <div className={`relative w-32 h-32 flex items-center justify-center rounded-full ring-8 ${ringClass}`}>
                    <span className={`text-4xl font-bold ${colorClass}`}>{attendance.current}%</span>
                </div>
            </div>
            {isBelowRequired && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/40 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded-r-lg">
                    <div className="flex items-center">
                        <AlertTriangle size={20} className="mr-2"/>
                        <p className="text-sm font-semibold">Your attendance is below the required {attendance.required}%. Please consult your advisor.</p>
                    </div>
                </div>
            )}
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

export default function RequestStudentLeave() {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(MOCK_STUDENT_REQUEST_HISTORY);
    
    // Form State
    const [leaveTypeId, setLeaveTypeId] = useState<string>(MOCK_STUDENT_LEAVE_POLICIES[0]?.id || '');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);

    const selectedPolicy = useMemo(() => MOCK_STUDENT_LEAVE_POLICIES.find(p => p.id === leaveTypeId), [leaveTypeId]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!leaveTypeId || !startDate || !endDate || !reason) {
            alert('Please fill all required fields.');
            return;
        }

        const newRequest: LeaveRequest = {
            id: `sreq_${Date.now()}`,
            leaveTypeId,
            startDate,
            endDate,
            reason,
            status: 'Pending',
            appliedOn: new Date().toISOString().split('T')[0],
        };

        setLeaveRequests(prev => [newRequest, ...prev]);

        // Reset form
        setLeaveTypeId(MOCK_STUDENT_LEAVE_POLICIES[0]?.id || '');
        setStartDate('');
        setEndDate('');
        setReason('');
        setAttachment(null);
    };

    const isSubmitDisabled = !leaveTypeId || !startDate || !endDate || !reason;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                 <header className="mb-8 md:mb-12">
                     <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Leave Portal</h1>
                     <p className="text-gray-600 dark:text-gray-400 mt-1">Apply for leave and monitor your attendance.</p>
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
                                {/* Leave Type & Policy Info */}
                                <div>
                                    <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Type</label>
                                    <select id="leaveType" value={leaveTypeId} onChange={(e) => setLeaveTypeId(e.target.value)} className="w-full p-2.5 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                        {MOCK_STUDENT_LEAVE_POLICIES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                    <div className="flex justify-end items-center mt-1.5 text-xs">
                                        {selectedPolicy?.grantsAttendanceCredit && <p className="font-semibold text-blue-600 dark:text-blue-400">Grants Attendance Credit</p>}
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                        <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                                    </div>
                                    <div>
                                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                                        <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"/>
                                    </div>
                                </div>

                                {/* Reason */}
                                <div>
                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason for Leave</label>
                                    <textarea id="reason" rows={4} value={reason} onChange={e => setReason(e.target.value)} placeholder="Please provide a detailed reason..." className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"></textarea>
                                </div>
                                
                                {/* Attachment */}
                                <div>
                                    <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Attach Document (if required)</label>
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
                    
                    {/* Right Column: Info */}
                    <div className="space-y-8">
                        <AttendanceCard attendance={MOCK_STUDENT_ATTENDANCE} />
                        
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
                                                <th className="px-4 py-3">Note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leaveRequests.slice(0, 5).map(req => {
                                                const policy = MOCK_STUDENT_LEAVE_POLICIES.find(p => p.id === req.leaveTypeId);
                                                return (
                                                    <tr key={req.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{policy?.name || 'N/A'}</td>
                                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{req.startDate}{req.startDate !== req.endDate ? ` to ${req.endDate}` : ''}</td>
                                                        <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                                                         <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 italic">
                                                            {req.status === 'Rejected' ? req.rejectionNote : '-'}
                                                        </td>
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

