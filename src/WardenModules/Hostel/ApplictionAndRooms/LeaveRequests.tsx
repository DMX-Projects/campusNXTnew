// src/components/hostel/LeaveRequests.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { Filter, Search, Eye, CheckCircle2, XCircle, Clock3, CalendarDays, ChevronLeft, ChevronRight, X, FileText, UserCheck, ShieldAlert } from 'lucide-react';

type LeaveType = 'Hostel' | 'Academic' | 'Fieldwork';
type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
type Consent = 'Pending' | 'Received' | 'Waived';

interface StudentRef { id: string; name: string; yearDept: string; }

interface LeaveRequest {
  id: string;                    // LR-xxxx
  student: StudentRef;
  leaveType: LeaveType;
  startDate: string;             // ISO
  endDate: string;               // ISO
  durationDays: number;
  reason: string;
  destination?: string;          // city/place for Hostel/Fieldwork
  attachments?: string[];        // filenames
  wardenNote?: string;

  parentConsent: Consent;        // for hostel/night-stay
  mentorApproval: 'Pending' | 'Approved' | 'Rejected';   // academic/fieldwork
  wardenApproval: 'Pending' | 'Approved' | 'Rejected';   // hostel leaves gate-pass
  status: LeaveStatus;

  requestedAt: string;           // ISO
  decidedAt?: string;            // ISO
  gatePassId?: string;           // created when Approved (optional)
}

const initialLeaves: LeaveRequest[] = [
  {
    id: 'LR-3001',
    student: { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE' },
    leaveType: 'Hostel',
    startDate: new Date(Date.now() + 36e5 * 24).toISOString(),
    endDate: new Date(Date.now() + 36e5 * 48).toISOString(),
    durationDays: 2,
    reason: 'Family function out of station',
    destination: 'Jaipur',
    attachments: ['parent_consent.pdf'],
    parentConsent: 'Received',
    mentorApproval: 'Pending',
    wardenApproval: 'Pending',
    status: 'Pending',
    requestedAt: new Date(Date.now() - 36e5 * 3).toISOString(),
  },
  {
    id: 'LR-3002',
    student: { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE' },
    leaveType: 'Academic',
    startDate: new Date(Date.now() + 36e5 * 72).toISOString(),
    endDate: new Date(Date.now() + 36e5 * 96).toISOString(),
    durationDays: 1,
    reason: 'Department seminar presentation',
    attachments: ['invitation.pdf'],
    parentConsent: 'Waived',
    mentorApproval: 'Approved',
    wardenApproval: 'Pending',
    status: 'Pending',
    requestedAt: new Date(Date.now() - 36e5 * 20).toISOString(),
  },
  {
    id: 'LR-3003',
    student: { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE' },
    leaveType: 'Fieldwork',
    startDate: new Date(Date.now() + 36e5 * 24 * 7).toISOString(),
    endDate: new Date(Date.now() + 36e5 * 24 * 10).toISOString(),
    durationDays: 3,
    reason: 'Site visit for project',
    destination: 'Ahmedabad',
    attachments: [],
    parentConsent: 'Received',
    mentorApproval: 'Approved',
    wardenApproval: 'Approved',
    status: 'Approved',
    requestedAt: new Date(Date.now() - 36e5 * 200).toISOString(),
    decidedAt: new Date(Date.now() - 36e5 * 150).toISOString(),
    gatePassId: 'GP-99021',
  },
  {
    id: 'LR-3004',
    student: { id: 'ST1402', name: 'Sahil Jain', yearDept: '2nd Year - ME' },
    leaveType: 'Hostel',
    startDate: new Date(Date.now() + 36e5 * 36).toISOString(),
    endDate: new Date(Date.now() + 36e5 * 84).toISOString(),
    durationDays: 2,
    reason: 'Medical appointment and rest',
    destination: 'Home',
    attachments: ['prescription.jpg'],
    parentConsent: 'Pending',
    mentorApproval: 'Pending',
    wardenApproval: 'Pending',
    status: 'Pending',
    requestedAt: new Date(Date.now() - 36e5 * 10).toISOString(),
  },
];

const statusBadge: Record<LeaveStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Approved: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  Cancelled: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
};

const approvBadge: Record<'Pending' | 'Approved' | 'Rejected', string> = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Approved: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

const consentBadge: Record<Consent, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Received: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Waived: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
};

const LeaveRequests: React.FC = () => {
  const [items, setItems] = useState<LeaveRequest[]>(initialLeaves);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ status: '' | LeaveStatus; type: '' | LeaveType }>({ status: '', type: '' });
  const [sortBy, setSortBy] = useState<'requestedAt' | 'startDate' | 'duration'>('requestedAt');

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [search, filters, sortBy]);

  // Modals
  const [detailItem, setDetailItem] = useState<LeaveRequest | null>(null);
  const [actionItem, setActionItem] = useState<LeaveRequest | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items
      .filter(r => (!filters.status || r.status === filters.status) && (!filters.type || r.leaveType === filters.type))
      .filter(r => {
        if (!term) return true;
        const hay = [r.id, r.student.id, r.student.name, r.student.yearDept, r.reason, r.destination || '', r.leaveType].join(' ').toLowerCase();
        return hay.includes(term);
      })
      .sort((a, b) => {
        if (sortBy === 'requestedAt') return new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime();
        if (sortBy === 'startDate') return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        if (sortBy === 'duration') return b.durationDays - a.durationDays;
        return 0;
      });
  }, [items, search, filters, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = filtered.slice(start, end);

  const actOn = (id: string, decision: 'Approved' | 'Rejected') => {
    setItems(prev => prev.map(r => {
      if (r.id !== id) return r;
      const gatePassId = decision === 'Approved' ? `GP-${Math.floor(90000 + Math.random()*9999)}` : r.gatePassId;
      return {
        ...r,
        status: decision,
        wardenApproval: decision === 'Approved' ? 'Approved' : 'Rejected',
        decidedAt: new Date().toISOString(),
        wardenNote: adminNote || r.wardenNote,
        gatePassId,
      };
    }));
    setActionItem(null);
    setAdminNote('');
  };

  const cancelLeave = (id: string) => {
    setItems(prev => prev.map(r => r.id === id ? { ...r, status: 'Cancelled', decidedAt: new Date().toISOString() } : r));
  };

  const stats = useMemo(() => items.reduce((acc, r) => { acc.total++; acc[r.status]++; return acc; }, { total: 0, Pending: 0, Approved: 0, Rejected: 0, Cancelled: 0 } as any), [items]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leave Requests</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Handle hostel/academic/fieldwork leaves with approvals, consent, and gate-pass references.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Total</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p></div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Pending</p><p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{stats.Pending}</p></div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Approved</p><p className="text-2xl font-bold text-green-600 dark:text-green-300">{stats.Approved}</p></div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p><p className="text-2xl font-bold text-red-600 dark:text-red-300">{stats.Rejected}</p></div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Cancelled</p><p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.Cancelled}</p></div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by LR ID, Student, Reason, Destination..." className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value as any }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Status (All)</option><option>Pending</option><option>Approved</option><option>Rejected</option><option>Cancelled</option>
              </select>
              <select value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value as any }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Type (All)</option><option>Hostel</option><option>Academic</option><option>Fieldwork</option>
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="requestedAt">Sort: Requested</option><option value="startDate">Sort: Start Date</option><option value="duration">Sort: Duration</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pageItems.map(item => (
            <li key={item.id} className="p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{item.id}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${statusBadge[item.status]}`}>{item.status}</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{item.leaveType}</span>
                </div>
                <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 truncate">
                  <span className="font-medium">{item.student.name}</span> ({item.student.id}) • {item.student.yearDept}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {new Date(item.startDate).toLocaleDateString()} → {new Date(item.endDate).toLocaleDateString()} ({item.durationDays}d)</span>
                  {item.destination && (<span className="inline-flex items-center gap-1"><FileText className="w-4 h-4" /> {item.destination}</span>)}
                  {item.gatePassId && (<span className="inline-flex items-center gap-1"><ShieldAlert className="w-4 h-4" /> GP: {item.gatePassId}</span>)}
                </div>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{item.reason}</p>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">Req: {new Date(item.requestedAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setDetailItem(item)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1 text-sm"><Eye className="w-4 h-4" /> View</button>
                {(item.status === 'Pending') && (
                  <button onClick={() => { setActionItem(item); setAdminNote(''); }} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm">Take Action</button>
                )}
              </div>
            </li>
          ))}
          {pageItems.length === 0 && (<li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No leave requests found.</li>)}
        </ul>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {total === 0 ? 0 : start + 1}-{end} of {total}</p>
        <div className="inline-flex -space-x-px">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 h-9 border border-gray-300 rounded-s-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 h-9 border border-gray-300 rounded-e-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Detail Modal */}
{detailItem && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDetailItem(null)}>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="p-6">
        {/* ...existing header and chips... */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {/* Student */}
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Student</p>
            <p className="text-gray-700 dark:text-gray-300">{detailItem.student.name} ({detailItem.student.id})</p>
            <p className="text-gray-600 dark:text-gray-400">{detailItem.student.yearDept}</p>
          </div>

          {/* Schedule */}
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Schedule</p>
            <p className="text-gray-700 dark:text-gray-300">{new Date(detailItem.startDate).toLocaleString()} → {new Date(detailItem.endDate).toLocaleString()}</p>
            <p className="text-gray-600 dark:text-gray-400">Duration: {detailItem.durationDays} day(s)</p>
          </div>

          {/* Details */}
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Details</p>
            {detailItem.destination && <p className="text-gray-700 dark:text-gray-300">Destination: {detailItem.destination}</p>}
            <p className="mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{detailItem.reason}</p>
          </div>

          {/* Refs */}
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Refs</p>
            <p className="text-gray-700 dark:text-gray-300">Requested: {new Date(detailItem.requestedAt).toLocaleString()}</p>
            <p className="text-gray-700 dark:text-gray-300">Decided: {detailItem.decidedAt ? new Date(detailItem.decidedAt).toLocaleString() : '—'}</p>
            <p className="text-gray-700 dark:text-gray-300">Gate Pass: {detailItem.gatePassId || '—'}</p>
            <p className="text-gray-700 dark:text-gray-300">Attachments: {detailItem.attachments?.join(', ') || '—'}</p>
          </div>

          {/* Emergency Contact - new card */}
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 sm:col-span-2">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Emergency Contact</p>
            {/* Placeholder values; replace with real fields when API available */}
            <p className="text-gray-700 dark:text-gray-300">Contact Name: Ram Sharma</p>
            <p className="text-gray-700 dark:text-gray-300">Relationship: Father</p>
            <p className="text-gray-700 dark:text-gray-300">Phone: +91 9876543210</p>
            <p className="text-gray-700 dark:text-gray-300">Alternate Phone: +91 9876543210</p>
          </div>
        </div>

        {/* ...existing footer buttons... */}
      </div>
    </div>
  </div>
)}


      {/* Action Modal */}
      {actionItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setActionItem(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Act on {actionItem.id}</h3>
                <button onClick={() => setActionItem(null)} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
              </div>

              <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                <p className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> Parent consent: {actionItem.parentConsent}</p>
                <p className="flex items-center gap-2"><Clock3 className="w-4 h-4" /> Mentor approval: {actionItem.mentorApproval}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Warden Note</label>
                <textarea value={adminNote} onChange={e => setAdminNote(e.target.value)} rows={4} placeholder="Add context for approval or rejection..." className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setActionItem(null)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">Cancel</button>
                <button onClick={() => actOn(actionItem.id, 'Rejected')} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"><XCircle className="w-4 h-4" /> Reject</button>
                <button onClick={() => actOn(actionItem.id, 'Approved')} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Approve</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;
