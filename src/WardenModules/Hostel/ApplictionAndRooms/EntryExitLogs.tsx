// src/components/hostel/EntryExitLogs.tsx
import React, { useMemo, useEffect, useState } from 'react';
import { Search, Filter, QrCode, LogIn, LogOut, User2, Clock3, CalendarDays, ChevronLeft, ChevronRight, BellRing, AlertTriangle, Phone, Mail, MessageSquare } from 'lucide-react';

type Direction = 'Entry' | 'Exit';
type Via = 'GatePass' | 'VisitorPass' | 'StaffID';
type Status = 'On-campus' | 'Off-campus' | 'Returned';

interface StudentRef { id: string; name: string; yearDept: string; }

type ContactInfo = { name?: string; relation?: string; phone?: string };

interface LogRecord {
  id: string;
  student: StudentRef;
  direction: Direction;
  via: Via;
  refId?: string;               // gate pass ID
  time: string;                 // ISO exact timestamp
  date: string;                 // YYYY-MM-DD
  guardName: string;
  notes?: string;
  status: Status;
  expectedReturnAt?: string;    // for Exit via GatePass

  // New optional fields for notification workflow
  studentPhone?: string;
  parentGuardian?: ContactInfo;
  emergencyContact?: ContactInfo;
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
  {
    id: 'LOG-7001',
    student: { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE' },
    direction: 'Exit',
    via: 'GatePass',
    refId: 'GP-99021',
    time: new Date(Date.now() - 1000*60*60*4).toISOString(),
    date: new Date().toISOString().slice(0,10),
    guardName: 'R. Singh',
    notes: 'Family function',
    status: 'Off-campus',
    expectedReturnAt: new Date(Date.now() - 1000*60*60*2).toISOString(),
    studentPhone: '+91-90000-11111',
    parentGuardian: { name: 'Mr. Gupta', relation: 'Father', phone: '+91-90000-22222' },
    emergencyContact: { name: 'Amit Gupta', relation: 'Uncle', phone: '+91-90000-33333' },
  },
  {
    id: 'LOG-7002',
    student: { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE' },
    direction: 'Entry',
    via: 'GatePass',
    refId: 'GP-99021',
    time: new Date(Date.now() - 1000*60*60*1).toISOString(),
    date: new Date().toISOString().slice(0,10),
    guardName: 'R. Singh',
    status: 'Returned',
    studentPhone: '+91-90000-44444',
    parentGuardian: { name: 'Mrs. Joshi', relation: 'Mother', phone: '+91-90000-55555' },
  },
  {
    id: 'LOG-7003',
    student: { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE' },
    direction: 'Exit',
    via: 'GatePass',
    refId: 'GP-99022',
    time: new Date(Date.now() - 1000*60*60*5).toISOString(),
    date: new Date().toISOString().slice(0,10),
    guardName: 'M. Khan',
    notes: 'Fieldwork',
    status: 'Off-campus',
    expectedReturnAt: new Date(Date.now() - 1000*60*60*2).toISOString(),
    studentPhone: '+91-90000-66666',
    parentGuardian: { name: 'Mr. Khan', relation: 'Father', phone: '+91-90000-77777' },
    emergencyContact: { name: 'Rehan Khan', relation: 'Brother', phone: '+91-90000-88888' },
  },
  {
    id: 'LOG-7004',
    student: { id: 'ST1130', name: 'Mohan Das', yearDept: '2nd Year - IT' },
    direction: 'Entry',
    via: 'GatePass',
    refId: 'GP-98001',
    time: new Date(Date.now() - 1000*60*30).toISOString(),
    date: new Date().toISOString().slice(0,10),
    guardName: 'A. Verma',
    status: 'Returned',
    studentPhone: '+91-90000-99999',
    parentGuardian: { name: 'Mrs. Das', relation: 'Mother', phone: '+91-90000-12345' },
  },
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

  // Notify modal state
  const [notifyItem, setNotifyItem] = useState<LogRecord | null>(null);
  const [notifyMsg, setNotifyMsg] = useState('');

  // Helpers
  const isLate = (log: LogRecord) => {
    if (log.direction !== 'Exit' || !log.expectedReturnAt) return false;
    const now = Date.now();
    const due = new Date(log.expectedReturnAt).getTime();
    return now > due && log.status === 'Off-campus';
  };

  const defaultNotifyMsg = (log: LogRecord) => {
    const due = log.expectedReturnAt ? new Date(log.expectedReturnAt).toLocaleString() : 'the due time';
    return `Dear Parent/Guardian, this is to inform you that ${log.student.name} (ID: ${log.student.id}) has not returned by ${due}. Kindly be informed. - Warden`;
  };

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
  }, [logs]); // triggers when logs change [4][14]

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
  }, [logs, alerts.length]); // keep synced with logs [4][14]

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
  }, [logs, tab, via, dateFrom, dateTo, search, sortBy]); // stable filtering [20][12]

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
  }, [logs]); // snapshot of campus status [5]

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Entry & Exit</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Entry and Exit tabs with date filters, late-return highlighting, and parent/guardian notifications.</p>
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
                  {item.expectedReturnAt && item.direction === 'Exit' && (
                    <span className="inline-flex items-center gap-1">
                      <AlertTriangle className={`w-4 h-4 ${isLate(item) ? 'text-red-600' : 'text-amber-500'}`} />
                      Return by: {new Date(item.expectedReturnAt).toLocaleTimeString()}
                    </span>
                  )}
                </div>
                {item.notes && <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{item.notes}</p>}

                {/* Notify button */}
                {item.direction === 'Exit' && (
                  <div className="mt-2">
                    <button
                      onClick={() => { setNotifyItem(item); setNotifyMsg(defaultNotifyMsg(item)); }}
                      className={`px-3 py-1.5 rounded-md text-sm inline-flex items-center gap-1 ${
                        isLate(item)
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-amber-500 text-white hover:bg-amber-600'
                      }`}
                      title="Notify Parent/Guardian"
                    >
                      <MessageSquare className="w-4 h-4" /> Notify Parent/Guardian
                    </button>
                  </div>
                )}
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

      {/* Notify Modal */}
      {notifyItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setNotifyItem(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notify Parent/Guardian</h3>
                <button onClick={() => setNotifyItem(null)} className="px-2 py-1 rounded text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700">Close</button>
              </div>

              <div className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                <p className="font-medium">Student</p>
                <p>{notifyItem.student.name} ({notifyItem.student.id}) • {notifyItem.student.yearDept}</p>
                {notifyItem.expectedReturnAt && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">Expected return: {new Date(notifyItem.expectedReturnAt).toLocaleString()}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Phone Numbers</p>
                  <p className="text-gray-700 dark:text-gray-300">Student: {notifyItem.studentPhone || '—'}</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Parent/Guardian: {notifyItem.parentGuardian?.name ? `${notifyItem.parentGuardian.name} (${notifyItem.parentGuardian.relation || '—'})` : '—'}
                    {notifyItem.parentGuardian?.phone ? ` • ${notifyItem.parentGuardian.phone}` : ''}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Emergency: {notifyItem.emergencyContact?.name ? `${notifyItem.emergencyContact.name} (${notifyItem.emergencyContact.relation || '—'})` : '—'}
                    {notifyItem.emergencyContact?.phone ? ` • ${notifyItem.emergencyContact.phone}` : ''}
                  </p>
                </div>

                <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Message</p>
                  <textarea
                    value={notifyMsg}
                    onChange={e => setNotifyMsg(e.target.value)}
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="Type message to send..."
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={() => setNotifyItem(null)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">Close</button>
                {/* Replace with backend integrations and audit logging */}
                <button onClick={() => { /* TODO: integrate SMS */ alert('SMS sent (demo)'); }} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 inline-flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> Send SMS
                </button>
                <button onClick={() => { /* TODO: integrate Email */ alert('Email sent (demo)'); }} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-1">
                  <Mail className="w-4 h-4" /> Send Email
                </button>
                <a
                  href={notifyItem.parentGuardian?.phone ? `tel:${notifyItem.parentGuardian.phone}` : '#'}
                  className={`px-4 py-2 rounded-md inline-flex items-center gap-1 ${notifyItem.parentGuardian?.phone ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                  onClick={e => { if (!notifyItem.parentGuardian?.phone) e.preventDefault(); }}
                >
                  <Phone className="w-4 h-4" /> Call Parent
                </a>
              </div>

              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Ensure notifications comply with institute privacy and guardian consent policies. [Refer institute handbook/guidelines offline]
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryExitLogs;
