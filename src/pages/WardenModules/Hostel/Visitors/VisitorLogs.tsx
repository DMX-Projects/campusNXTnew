// src/WardenModules/Hostel/VisitorLogs.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Filter,
  Search,
  Download,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  LogIn,
  LogOut,
} from 'lucide-react';

// Keep this structure in sync with VisitorApproval to reuse data.
type VisitStatus = 'Pending' | 'Approved' | 'Denied' | 'Checked In' | 'Checked Out' | 'Expired';
type Relation = 'Parent/Guardian' | 'Relative' | 'Friend' | 'Official' | 'Other';
interface StudentRef { id: string; name: string; yearDept: string; room?: string; block?: string; }
interface VisitorRef { id: string; name: string; relation: Relation; idType?: string; idNumber?: string; }
interface VisitLog {
  id: string;
  createdAt: string;
  updatedAt: string;
  student: StudentRef;
  visitor: VisitorRef;
  purpose: string;
  visitDate: string;
  fromTime: string;
  toTime: string;
  location: string;
  needsGatePass: boolean;
  status: VisitStatus;
  passNumber?: string;
  checkedInAt?: string;
  checkedOutAt?: string;
}

const students: StudentRef[] = [
  { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE', room: '101', block: 'A' },
  { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE', room: '202', block: 'B' },
];

const seed: VisitLog[] = [
  {
    id: 'VR-5002',
    createdAt: new Date(Date.now() - 72 * 36e5).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 36e5).toISOString(),
    student: students[0],
    visitor: { id: 'V101', name: 'Priya Singh', relation: 'Relative', idType: 'Aadhaar', idNumber: 'XXXX-5678' },
    purpose: 'Dropping documents',
    visitDate: new Date(Date.now() - 24 * 36e5).toISOString().slice(0, 10),
    fromTime: '10:00',
    toTime: '12:00',
    location: 'Warden Office',
    needsGatePass: true,
    status: 'Checked Out',
    passNumber: 'GP-2025-0012',
    checkedInAt: new Date(Date.now() - 58 * 36e5).toISOString(),
    checkedOutAt: new Date(Date.now() - 56 * 36e5).toISOString(),
  },
];

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

const VisitorLogs: React.FC = () => {
  const [logs, setLogs] = useState<VisitLog[]>(seed);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'' | VisitStatus>('');
  const [relation, setRelation] = useState<'' | Relation>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [search, status, relation, dateFrom, dateTo]);

  const filtered = useMemo(() => {
    return logs
      .filter(r => !status || r.status === status)
      .filter(r => !relation || r.visitor.relation === relation)
      .filter(r => !dateFrom || new Date(r.visitDate) >= new Date(dateFrom))
      .filter(r => !dateTo || new Date(r.visitDate) <= new Date(dateTo))
      .filter(r => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        const hay = [
          r.id, r.student.name, r.student.id, r.visitor.name, r.visitor.idNumber || '', r.purpose, r.location, r.passNumber || ''
        ].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [logs, status, relation, dateFrom, dateTo, search]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = filtered.slice(start, end);

  const exportView = () => {
    const data = filtered.map(r => ({
      id: r.id,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      studentId: r.student.id,
      studentName: r.student.name,
      visitorName: r.visitor.name,
      relation: r.visitor.relation,
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
    downloadCSV(`visitor_logs_${dateStamp()}.csv`, data);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Visitor Logs </h1>
        <p className="text-gray-600 dark:text-gray-400">Audit of all visitor approvals, denials, and gate check-in/out with filters and CSV export.</p>
      </div>

      {/* Controls */}
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
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pageItems.map(r => (
            <li key={r.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{r.visitor.name} • {r.id}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {r.student.name} ({r.student.id}) • {r.student.yearDept} • Room {r.student.room || '—'}, Block {r.student.block || '—'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{r.visitor.relation}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    r.status === 'Denied' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' :
                    r.status === 'Approved' || r.status === 'Checked In' || r.status === 'Checked Out' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                    'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                  }`}>{r.status}</span>
                  {r.passNumber && <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Pass {r.passNumber}</span>}
                </div>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">{r.purpose}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-400"><CalendarDays className="w-4 h-4 inline-block mr-1" /> {r.visitDate} • {r.fromTime}-{r.toTime}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Where: {r.location}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Gate Pass: {r.needsGatePass ? 'Yes' : 'No'}</span>
                {r.checkedInAt && <span className="text-xs text-gray-600 dark:text-gray-400"><LogIn className="w-4 h-4 inline-block mr-1" /> {new Date(r.checkedInAt).toLocaleString()}</span>}
                {r.checkedOutAt && <span className="text-xs text-gray-600 dark:text-gray-400"><LogOut className="w-4 h-4 inline-block mr-1" /> {new Date(r.checkedOutAt).toLocaleString()}</span>}
              </div>
            </li>
          ))}
          {pageItems.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No logs found.</li>}
        </ul>
      </div>

      {/* Pagination */}
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

      {/* Policy note */}
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        Ensure visitors carry valid ID and are received only in permitted areas and hours; maintain gate registers as per hostel rules.
      </p>
    </div>
  );
};

export default VisitorLogs;
