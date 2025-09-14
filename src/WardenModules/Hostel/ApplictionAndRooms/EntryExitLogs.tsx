// src/components/hostel/EntryExitLogs.tsx
import React, { useMemo, useEffect, useState } from 'react';
import { Search, Filter, QrCode, LogIn, LogOut, User2, Clock3, CalendarDays, ChevronLeft, ChevronRight, BellRing, AlertTriangle } from 'lucide-react';

type Direction = 'Entry' | 'Exit';
type Via = 'GatePass' | 'VisitorPass' | 'StaffID';
type Status = 'On-campus' | 'Off-campus' | 'Returned';

interface StudentRef { id: string; name: string; yearDept: string; }

interface LogRecord {
  id: string;
  student: StudentRef;
  direction: Direction;
  via: Via;
  refId?: string;              // gate pass ID
  time: string;                // ISO exact timestamp
  date: string;                // YYYY-MM-DD
  guardName: string;
  notes?: string;
  status: Status;
  expectedReturnAt?: string;   // for Exit via GatePass
}

interface AlertRecord {
  id: string;
  student: StudentRef;
  refId?: string;
  exitLogId: string;
  expectedReturnAt: string;
  triggeredAt: string;
  notified: ('Student' | 'Warden' | 'Mentor')[];
  resolved: boolean;
}

const statusBadge: Record<Status, string> = {
  'On-campus': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  'Off-campus': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Returned: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
};

const initialLogs: LogRecord[] = [
  { id: 'LOG-7001', student: { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE' }, direction: 'Exit', via: 'GatePass', refId: 'GP-99021', time: new Date(Date.now() - 1000*60*60*4).toISOString(), date: new Date().toISOString().slice(0,10), guardName: 'R. Singh', notes: 'Family function', status: 'Off-campus', expectedReturnAt: new Date(Date.now() - 1000*60*60*2).toISOString() },
  { id: 'LOG-7002', student: { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE' }, direction: 'Entry', via: 'GatePass', refId: 'GP-99021', time: new Date(Date.now() - 1000*60*60*1).toISOString(), date: new Date().toISOString().slice(0,10), guardName: 'R. Singh', status: 'Returned' },
  { id: 'LOG-7003', student: { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE' }, direction: 'Exit', via: 'GatePass', refId: 'GP-99022', time: new Date(Date.now() - 1000*60*60*5).toISOString(), date: new Date().toISOString().slice(0,10), guardName: 'M. Khan', notes: 'Fieldwork', status: 'Off-campus', expectedReturnAt: new Date(Date.now() - 1000*60*60*2).toISOString() },
  { id: 'LOG-7004', student: { id: 'ST1130', name: 'Mohan Das', yearDept: '2nd Year - IT' }, direction: 'Entry', via: 'GatePass', refId: 'GP-98001', time: new Date(Date.now() - 1000*60*30).toISOString(), date: new Date().toISOString().slice(0,10), guardName: 'A. Verma', status: 'Returned' },
];

const EntryExitLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogRecord[]>(initialLogs);
  const [tab, setTab] = useState<'Entry' | 'Exit'>('Entry');

  // Filters
  const [search, setSearch] = useState('');
  const [via, setVia] = useState<'' | Via>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Pagination
  const pageSize = 12;
  const [pageEntry, setPageEntry] = useState(1);
  const [pageExit, setPageExit] = useState(1);
  useEffect(() => { setPageEntry(1); setPageExit(1); }, [search, via, dateFrom, dateTo, sortBy, tab]);

  // Alerts
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);

  // Overstay detector
  useEffect(() => {
    const now = Date.now();
    const newAlerts: AlertRecord[] = [];
    const latestEntryByStudent: Record<string, number> = {};
    logs.forEach(l => {
      if (l.direction === 'Entry') {
        latestEntryByStudent[l.student.id] = Math.max(latestEntryByStudent[l.student.id] || 0, new Date(l.time).getTime());
      }
    });
    logs.forEach(l => {
      if (l.direction !== 'Exit' || !l.expectedReturnAt) return;
      const expectedTs = new Date(l.expectedReturnAt).getTime();
      const lastEntryTs = latestEntryByStudent[l.student.id] || 0;
      const alreadyAlerted = alerts.some(a => a.exitLogId === l.id && !a.resolved);
      if (now > expectedTs && lastEntryTs <= expectedTs && !alreadyAlerted) {
        newAlerts.push({
          id: `ALERT-${Math.floor(10000 + Math.random()*89999)}`,
          student: l.student,
          refId: l.refId,
          exitLogId: l.id,
          expectedReturnAt: l.expectedReturnAt,
          triggeredAt: new Date().toISOString(),
          notified: ['Student', 'Warden', 'Mentor'],
          resolved: false,
        });
      }
    });
    if (newAlerts.length) setAlerts(prev => [...newAlerts, ...prev]);
  }, [logs]);

  // Resolve alert if a matching Entry appears after expectedReturnAt
  useEffect(() => {
    if (!alerts.length) return;
    const updated = alerts.map(a => {
      if (a.resolved) return a;
      const entries = logs.filter(l => l.student.id === a.student.id && l.direction === 'Entry');
      const returned = entries.some(e => new Date(e.time).getTime() > new Date(a.expectedReturnAt).getTime());
      return returned ? { ...a, resolved: true } : a;
    });
    setAlerts(updated);
  }, [logs]);

  // Filters pipeline
  const filtered = useMemo(() => {
    const t = search.trim().toLowerCase();
    return logs
      .filter(l => l.direction === tab)
      .filter(l => (!via || l.via === via))
      .filter(l => {
        if (!dateFrom && !dateTo) return true;
        const d = l.date;
        return (!dateFrom || d >= dateFrom) && (!dateTo || d <= dateTo);
      })
      .filter(l => {
        if (!t) return true;
        const hay = [l.id, l.student.id, l.student.name, l.student.yearDept, l.via, l.refId || '', l.guardName, l.notes || ''].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a,b) => sortBy === 'newest'
        ? new Date(b.time).getTime() - new Date(a.time).getTime()
        : new Date(a.time).getTime() - new Date(b.time).getTime()
      );
  }, [logs, tab, via, dateFrom, dateTo, search, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = tab === 'Entry' ? pageEntry : pageExit;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = filtered.slice(start, end);

  // Overall stats (all logs)
  const stats = useMemo(() => {
    const all = logs;
    const on = all.filter(l => l.status === 'On-campus').length;
    const off = all.filter(l => l.status === 'Off-campus').length;
    const ret = all.filter(l => l.status === 'Returned').length;
    return { total: all.length, on, off, ret };
  }, [logs]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Entry & Exit</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Entry and Exit tabs with date filters and automated overstay alerts for gate-pass return times.</p>
      </div>

      {/* Top Stats + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Total</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p></div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">On-campus</p><p className="text-2xl font-bold text-green-600 dark:text-green-300">{stats.on}</p></div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Returned</p><p className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">{stats.ret}</p></div>
        </div>
        <div className="lg:col-span-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-100"><BellRing className="w-5 h-5 text-amber-500" /> Active Alerts</div>
          <div className="max-h-40 overflow-auto pr-2">
            {alerts.length === 0 && <p className="text-sm text-gray-600 dark:text-gray-300">No active alerts.</p>}
            {alerts.map(a => (
              <div key={a.id} className={`p-2 mb-2 rounded border ${a.resolved ? 'border-green-300 dark:border-green-700' : 'border-amber-300 dark:border-amber-700'}`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-800 dark:text-gray-100">
                    <span className="font-semibold">{a.student.name}</span> ({a.student.id}) • GP {a.refId || '—'} • due {new Date(a.expectedReturnAt).toLocaleString()}
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${a.resolved ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'}`}>
                    {a.resolved ? 'Resolved' : 'Overstay'}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  Notified: Student, Warden, Mentor at {new Date(a.triggeredAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => setTab('Entry')} className={`px-3 py-2 rounded-md text-sm ${tab==='Entry' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}`}>Entry Logs</button>
        <button onClick={() => setTab('Exit')} className={`px-3 py-2 rounded-md text-sm ${tab==='Exit' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}`}>Exit Logs</button>
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tab.toLowerCase()} logs by Log/Student/Ref/Guard...`} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select value={via} onChange={e => setVia(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Via (All)</option><option>GatePass</option><option>VisitorPass</option><option>StaffID</option>
            </select>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <span className="text-sm text-gray-500 dark:text-gray-400">to</span>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="newest">Newest</option><option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pageItems.map(item => (
            <li key={item.id} className="p-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{item.id}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${statusBadge[item.status]}`}>{item.status}</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{item.via}</span>
                </div>
                <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 truncate">
                  <span className="inline-flex items-center gap-1"><User2 className="w-4 h-4" /> {item.student.name} ({item.student.id}) • {item.student.yearDept}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1">{item.direction === 'Entry' ? <LogIn className="w-4 h-4" /> : <LogOut className="w-4 h-4" />} {item.direction}</span>
                  {item.refId && <span className="inline-flex items-center gap-1"><QrCode className="w-4 h-4" /> GP: {item.refId}</span>}
                  <span className="inline-flex items-center gap-1"><Clock3 className="w-4 h-4" /> {new Date(item.time).toLocaleTimeString()}</span>
                  <span className="inline-flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {item.date}</span>
                  {item.expectedReturnAt && tab==='Exit' && (
                    <span className="inline-flex items-center gap-1"><AlertTriangle className="w-4 h-4 text-amber-500" /> Return by: {new Date(item.expectedReturnAt).toLocaleTimeString()}</span>
                  )}
                </div>
                {item.notes && <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{item.notes}</p>}
              </div>
            </li>
          ))}
          {pageItems.length === 0 && (<li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No {tab.toLowerCase()} logs found.</li>)}
        </ul>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {total === 0 ? 0 : start + 1}-{end} of {total}</p>
        <div className="inline-flex -space-x-px">
          <button
            onClick={() => tab==='Entry' ? setPageEntry(p => Math.max(1, p - 1)) : setPageExit(p => Math.max(1, p - 1))}
            disabled={(tab==='Entry' ? pageEntry : pageExit) === 1}
            className="px-3 h-9 border border-gray-300 rounded-s-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => tab==='Entry' ? setPageEntry(p => Math.min(totalPages, p + 1)) : setPageExit(p => Math.min(totalPages, p + 1))}
            disabled={(tab==='Entry' ? pageEntry : pageExit) === totalPages}
            className="px-3 h-9 border border-gray-300 rounded-e-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryExitLogs;
