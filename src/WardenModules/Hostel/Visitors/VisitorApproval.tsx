// src/WardenModules/Hostel/VisitorApproval.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Filter,
  Search,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarDays,
  MessageSquare,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  Undo2,
} from 'lucide-react';

type VisitStatus = 'Pending' | 'Approved' | 'Denied' | 'Checked In' | 'Checked Out' | 'Expired';
type Relation = 'Parent/Guardian' | 'Relative' | 'Friend' | 'Official' | 'Other';

interface StudentRef { id: string; name: string; yearDept: string; room?: string; block?: string; }
interface VisitorRef { id: string; name: string; relation: Relation; idType?: string; idNumber?: string; idVerified?: boolean; }
interface VisitRequest {
  id: string; createdAt: string; updatedAt: string;
  student: StudentRef; visitor: VisitorRef; purpose: string;
  visitDate: string; fromTime: string; toTime: string;
  location: 'Visitors Area' | 'Warden Office' | 'Common Room' | 'Room Visit';
  needsGatePass: boolean; status: VisitStatus;
  notes: Array<{ at: string; actor: 'Student' | 'Warden' | 'Security'; text: string; private?: boolean }>;
  attachments?: Array<{ id: string; name: string; url?: string }>;
  passNumber?: string; checkedInAt?: string; checkedOutAt?: string;
}

// Demo students
const students: StudentRef[] = [
  { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE', room: '101', block: 'A' },
  { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE', room: '202', block: 'B' },
  { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE', room: '303', block: 'C' },
  { id: 'ST1402', name: 'Sahil Jain', yearDept: '2nd Year - ME', room: '404', block: 'D' },
];

// FIXED seeds
const seed: VisitRequest[] = [
  {
    id: 'VR-5001',
    createdAt: new Date(Date.now() - 18 * 36e5).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 36e5).toISOString(),
    student: students[0],
    visitor: { id: 'V100', name: 'Anil Gupta', relation: 'Parent/Guardian', idType: 'Aadhaar', idNumber: 'XXXX-1234', idVerified: false },
    purpose: 'Parent meeting and bringing essentials',
    visitDate: new Date().toISOString().slice(0, 10),
    fromTime: '16:00',
    toTime: '18:00',
    location: 'Visitors Area',
    needsGatePass: true,
    status: 'Pending',
    notes: [{ at: new Date(Date.now() - 18 * 36e5).toISOString(), actor: 'Student', text: 'Requested as per visiting hours' }],
  },
  {
    id: 'VR-5002',
    createdAt: new Date(Date.now() - 72 * 36e5).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 36e5).toISOString(),
    student: students[2],
    visitor: { id: 'V101', name: 'Priya Singh', relation: 'Relative', idType: 'Aadhaar', idNumber: 'XXXX-5678', idVerified: true },
    purpose: 'Dropping documents',
    visitDate: new Date(Date.now() - 24 * 36e5).toISOString().slice(0, 10),
    fromTime: '10:00',
    toTime: '12:00',
    location: 'Warden Office',
    needsGatePass: true,
    status: 'Approved',
    passNumber: 'GP-2025-0012',
    notes: [{ at: new Date(Date.now() - 64 * 36e5).toISOString(), actor: 'Warden', text: 'Approved within slot' }],
    checkedInAt: new Date(Date.now() - 58 * 36e5).toISOString(),
    checkedOutAt: new Date(Date.now() - 56 * 36e5).toISOString(),
  },
];

// CSV helpers — FIXED headers from first row
const toCSV = (rows: Record<string, any>[]) => {
  if (!rows.length) return '';
  const headers = Object.keys(rows);
  const cell = (v: any) => {
    const s = v === undefined || v === null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(','), ...rows.map(r => headers.map(h => cell(r[h])).join(','))].join('\n');
};
const downloadCSV = (filename: string, rows: Record<string, any>[]) => {
  const csv = toCSV(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
};

function dateStamp(): string { const d=new Date(); const pad=(n:number)=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`; }

// Visiting hours configuration
const VISIT_START = '09:00';
const VISIT_END = '19:00';
const ROOM_VISIT_ALLOWED = false;

const VisitorApproval: React.FC = () => {
  const [requests, setRequests] = useState<VisitRequest[]>(seed);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'' | VisitStatus>('');
  const [relation, setRelation] = useState<'' | Relation>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [search, status, relation, dateFrom, dateTo]);

  // Derived list
  const filtered = useMemo(() => {
    return requests
      .filter(r => r.student && r.visitor) // guard for malformed rows
      .filter(r => !status || r.status === status)
      .filter(r => !relation || r.visitor.relation === relation)
      .filter(r => !dateFrom || new Date(r.visitDate) >= new Date(dateFrom))
      .filter(r => !dateTo || new Date(r.visitDate) <= new Date(dateTo))
      .filter(r => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        const hay = [
          r.id, r.student?.name || '', r.student?.id || '', r.visitor?.name || '', r.visitor?.idNumber || '', r.purpose, r.location, r.passNumber || ''
        ].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [requests, status, relation, dateFrom, dateTo, search]);

  // Auto-expire on mount if slot passed and not checked-in
  useEffect(() => {
    setRequests(prev => prev.map(r => {
      if ((r.status === 'Approved' || r.status === 'Pending') && isPastEnd(r.visitDate, r.toTime) && !r.checkedInAt) {
        return { ...r, status: 'Expired', updatedAt: new Date().toISOString(), notes: [...r.notes, { at: new Date().toISOString(), actor: 'Warden', text: 'Auto-expired after slot' }] };
      }
      return r;
    }));
  }, []);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = filtered.slice(start, end);

  // KPI
  const kpi = useMemo(() => {
    const pending = filtered.filter(r => r.status === 'Pending').length;
    const approved = filtered.filter(r => r.status === 'Approved').length;
    const activeToday = filtered.filter(r => r.visitDate === today()).length;
    return { pending, approved, activeToday };
  }, [filtered]);

  // Validations
  const withinHours = (from: string, to: string) => from >= VISIT_START && to <= VISIT_END && from < to;
  const conflictForStudent = (studentId: string, date: string, from: string, to: string, exceptId?: string) => {
    if (!studentId) return false;
    return requests.some(r =>
      r.student?.id === studentId && r.visitDate === date && r.id !== exceptId &&
      timeOverlaps(from, to, r.fromTime, r.toTime) &&
      ['Approved','Pending','Checked In'].includes(r.status)
    );
  };

  // Actions
  const addNote = (id: string) => {
    const txt = prompt('Add note (visible to staff):') || '';
    if (!txt.trim()) return;
    setRequests(prev => prev.map(r => r.id === id
      ? { ...r, updatedAt: new Date().toISOString(), notes: [...r.notes, { at: new Date().toISOString(), actor: 'Warden', text: txt.trim() }] }
      : r));
  };

  const toggleIdVerified = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id
      ? { ...r, visitor: { ...r.visitor, idVerified: !r.visitor.idVerified }, updatedAt: new Date().toISOString() }
      : r));
  };

  const approve = (id: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id !== id) return r;
      if (!r.student) return r;

      if (!withinHours(r.fromTime, r.toTime)) {
        alert(`Outside visiting hours (${VISIT_START}-${VISIT_END}). Adjust time or deny.`);
        return r;
      }
      if (!ROOM_VISIT_ALLOWED && r.location === 'Room Visit') {
        alert('Room visits are not allowed per current settings.');
        return r;
      }
      if (conflictForStudent(r.student?.id, r.visitDate, r.fromTime, r.toTime, r.id)) {
        if (!confirm('Another visit overlaps for this student. Approve anyway?')) return r;
      }
      const pass = `GP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random()*9000)}`;
      return {
        ...r,
        status: 'Approved',
        passNumber: pass,
        updatedAt: new Date().toISOString(),
        notes: [...r.notes, { at: new Date().toISOString(), actor: 'Warden', text: `Approved, Gate Pass ${pass}` }],
      };
    }));
  };

  const bulkApprove = () => {
    const ids = Object.keys(selected).filter(k => selected[k]);
    ids.forEach(approve);
    setSelected({});
  };

  const deny = (id: string) => {
    const reason = prompt('Reason for denial:') || 'Not permitted';
    setRequests(prev => prev.map(r => r.id === id
      ? { ...r, status: 'Denied', updatedAt: new Date().toISOString(), notes: [...r.notes, { at: new Date().toISOString(), actor: 'Warden', text: `Denied: ${reason}` }] }
      : r));
  };

  const bulkDeny = () => {
    const ids = Object.keys(selected).filter(k => selected[k]);
    const reason = prompt('Reason for denial (applies to selected):') || 'Not permitted';
    setRequests(prev => prev.map(r => ids.includes(r.id)
      ? { ...r, status: 'Denied', updatedAt: new Date().toISOString(), notes: [...r.notes, { at: new Date().toISOString(), actor: 'Warden', text: `Denied: ${reason}` }] }
      : r));
    setSelected({});
  };

  const revert = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id
      ? { ...r, status: 'Pending', passNumber: undefined, updatedAt: new Date().toISOString(), notes: [...r.notes, { at: new Date().toISOString(), actor: 'Warden', text: 'Reverted to Pending' }] }
      : r));
  };

  const checkIn = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id && r.status === 'Approved'
      ? { ...r, status: 'Checked In', checkedInAt: new Date().toISOString(), updatedAt: new Date().toISOString(), notes: [...r.notes, { at: new Date().toISOString(), actor: 'Security', text: 'Checked In at gate' }] }
      : r));
  };

  const checkOut = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id && (r.status === 'Checked In' || r.status === 'Approved')
      ? { ...r, status: 'Checked Out', checkedOutAt: new Date().toISOString(), updatedAt: new Date().toISOString(), notes: [...r.notes, { at: new Date().toISOString(), actor: 'Security', text: 'Checked Out at gate' }] }
      : r));
  };

  const exportView = () => {
    const data = filtered.map(r => ({
      id: r.id,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      studentId: r.student?.id || '',
      studentName: r.student?.name || '',
      visitorName: r.visitor?.name || '',
      relation: r.visitor?.relation || '',
      idVerified: r.visitor?.idVerified ? 'Yes' : 'No',
      visitDate: r.visitDate,
      fromTime: r.fromTime,
      toTime: r.toTime,
      location: r.location,
      needsGatePass: r.needsGatePass ? 'Yes' : 'No',
      status: r.status,
      passNumber: r.passNumber || '',
      checkedInAt: r.checkedInAt || '',
      checkedOutAt: r.checkedOutAt || '',
    }));
    downloadCSV(`visitor_requests_${dateStamp()}.csv`, data);
  };

  const resetFilters = () => { setSearch(''); setStatus(''); setRelation(''); setDateFrom(''); setDateTo(''); };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Visitor Approval</h1>
        <p className="text-gray-600 dark:text-gray-400">Review student-raised visitor requests, enforce visiting rules, approve/deny, pass generation, and gate check-in/out.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <KPI label="Pending" value={kpi.pending} icon={<Clock className="w-5 h-5" />} tone="warn" />
        <KPI label="Approved" value={kpi.approved} icon={<CheckCircle2 className="w-5 h-5" />} tone="success" />
        <KPI label="Today" value={kpi.activeToday} icon={<CalendarDays className="w-5 h-5" />} tone="neutral" />
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by student/visitor/purpose/pass..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select value={status} onChange={e => setStatus(e.target.value as VisitStatus | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Status (All)</option>
              {['Pending','Approved','Denied','Checked In','Checked Out','Expired'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={relation} onChange={e => setRelation(e.target.value as Relation | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Relation (All)</option>
              {['Parent/Guardian','Relative','Friend','Official','Other'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <button onClick={exportView} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm flex items-center gap-1">
              <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={resetFilters} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1">
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <button onClick={bulkApprove} className="px-3 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 text-xs disabled:opacity-50" disabled={!Object.values(selected).some(Boolean)}>
          Bulk Approve
        </button>
        <button onClick={bulkDeny} className="px-3 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-xs disabled:opacity-50" disabled={!Object.values(selected).some(Boolean)}>
          Bulk Deny
        </button>
        <span className="text-xs text-gray-600 dark:text-gray-400">Selected: {Object.values(selected).filter(Boolean).length}</span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pageItems.map(r => {
            const isToday = r.visitDate === today();
            const policyWarns: string[] = [];
            if (!withinHours(r.fromTime, r.toTime)) policyWarns.push(`Outside visiting hours ${VISIT_START}-${VISIT_END}`);
            if (!ROOM_VISIT_ALLOWED && r.location === 'Room Visit') policyWarns.push('Room visit not allowed');
            if (conflictForStudent(r.student?.id || '', r.visitDate, r.fromTime, r.toTime, r.id)) policyWarns.push('Overlaps existing visit');

            return (
              <li key={r.id} className="p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" checked={!!selected[r.id]} onChange={(e) => setSelected(s => ({ ...s, [r.id]: e.target.checked }))} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{r.visitor?.name} • {r.id}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {(r.student?.name || 'Unknown')} ({r.student?.id || '—'}) • {r.student?.yearDept || '—'} • Room {r.student?.room || '—'}, Block {r.student?.block || '—'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{r.visitor?.relation}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          r.status === 'Denied' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' :
                          r.status === 'Approved' || r.status === 'Checked In' || r.status === 'Checked Out' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                          r.status === 'Expired' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100' :
                          'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                        }`}>{r.status}</span>
                        {r.passNumber && <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Pass {r.passNumber}</span>}
                        <span className={`px-2 py-0.5 text-xs rounded-full ${r.visitor?.idVerified ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}`}>
                          ID {r.visitor?.idVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-700 dark:text-gray-300">{r.purpose}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">When: {r.visitDate} • {r.fromTime}-{r.toTime}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Where: {r.location}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Gate Pass: {r.needsGatePass ? 'Yes' : 'No'}</span>
                      {r.checkedInAt && <span className="text-xs text-gray-600 dark:text-gray-400">In: {new Date(r.checkedInAt).toLocaleString()}</span>}
                      {r.checkedOutAt && <span className="text-xs text-gray-600 dark:text-gray-400">Out: {new Date(r.checkedOutAt).toLocaleString()}</span>}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {policyWarns.map((w, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                          <AlertTriangle className="w-3 h-3" /> {w}
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                        <Clock className="w-3 h-3" /> Raised {timeAgo(r.createdAt)}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button onClick={() => addNote(r.id)} className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" /> Note
                      </button>
                      <button onClick={() => alert('Attach: integrate file upload service')} className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1">
                        <Paperclip className="w-4 h-4" /> Attach
                      </button>
                      <button onClick={() => toggleIdVerified(r.id)} className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> {r.visitor?.idVerified ? 'Unverify ID' : 'Verify ID'}
                      </button>
                      {r.passNumber && (
                        <button onClick={() => alert(`Show QR for ${r.passNumber}`)} className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-xs flex items-center gap-1">
                          <QrCode className="w-4 h-4" /> Pass QR
                        </button>
                      )}

                      {r.status === 'Pending' && (
                        <>
                          <button onClick={() => approve(r.id)} className="px-3 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Approve
                          </button>
                          <button onClick={() => deny(r.id)} className="px-3 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-xs flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Deny
                          </button>
                        </>
                      )}
                      {r.status === 'Approved' && isToday && (
                        <button onClick={() => checkIn(r.id)} className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-xs">Mark Check-In</button>
                      )}
                      {(r.status === 'Checked In' || (r.status === 'Approved' && isToday)) && (
                        <button onClick={() => checkOut(r.id)} className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-xs">Mark Check-Out</button>
                      )}
                      {(r.status === 'Approved' || r.status === 'Denied' || r.status === 'Expired') && (
                        <button onClick={() => revert(r.id)} className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1">
                          <Undo2 className="w-4 h-4" /> Revert
                        </button>
                      )}
                    </div>

                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Recent activity</p>
                      <ul className="mt-1 space-y-1 max-h-24 overflow-y-auto pr-1">
                        {[...r.notes].slice(-5).reverse().map((n, idx) => (
                          <li key={idx} className="text-xs text-gray-600 dark:text-gray-400">[{new Date(n.at).toLocaleString()}] {n.actor}: {n.text}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          {pageItems.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No requests.</li>}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {total === 0 ? 0 : start + 1}-{end} of {total}</p>
        <div className="inline-flex -space-x-px">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 h-9 border border-gray-300 rounded-s-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 h-9 border border-gray-300 rounded-e-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        Visiting requires a valid pass, permitted hours, and designated areas; maintain gate logs as per hostel rules. Configure these settings to match institute policy.
      </p>
    </div>
  );
};

// Utilities
const timeOverlaps = (aStart: string, aEnd: string, bStart: string, bEnd: string) => aStart < bEnd && bStart < aEnd;
const today = () => new Date().toISOString().slice(0,10);
const isPastEnd = (date: string, endTime: string) => new Date(`${date}T${endTime}:00`) < new Date();
const timeAgo = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diffMs / 36e5); const m = Math.floor((diffMs % 36e5) / 6e4);
  return h ? `${h}h ${m}m ago` : `${m}m ago`;
};

// KPI card
const KPI: React.FC<{ label: string; value: number; icon: React.ReactNode; tone?: 'neutral'|'warn'|'success' }> = ({ label, value, icon, tone='neutral' }) => {
  const toneCls =
    tone === 'success' ? 'text-green-600 dark:text-green-300' :
    tone === 'warn' ? 'text-amber-600 dark:text-amber-300' :
    'text-indigo-600 dark:text-indigo-300';
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center gap-3">
      <div className={`p-2 rounded-md bg-gray-100 dark:bg-gray-700 ${toneCls}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className={`text-xl font-bold ${toneCls}`}>{value}</p>
      </div>
    </div>
  );
};

export default VisitorApproval;