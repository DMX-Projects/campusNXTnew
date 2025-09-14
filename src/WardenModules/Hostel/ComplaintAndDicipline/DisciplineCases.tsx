// src/WardenModules/Hostel/DisciplineCases.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Filter,
  Search,
  Calendar,
  Gavel,
  Download,
  ChevronLeft,
  ChevronRight,
  Users,
  ClipboardList,
  Shield,
  MessageSquare,
  Plus,
} from 'lucide-react';

type CaseStatus = 'Logged' | 'Under Review' | 'Hearing Scheduled' | 'Verdict Issued' | 'Closed';
type CaseCategory = 'Misconduct' | 'Vandalism' | 'Harassment' | 'Attendance' | 'Curfew Breach' | 'Examination';
type Severity = 'Low' | 'Moderate' | 'High' | 'Severe';
type PenaltyType = 'Warning' | 'Fine' | 'Suspension' | 'Eviction' | 'Community Service';

interface StudentRef { id: string; name: string; yearDept: string; room?: string; block?: string; }

interface Evidence { id: string; name: string; url?: string; addedAt: string; }

interface CaseLog { id: string; at: string; actor: string; note: string; private?: boolean; }

interface Hearing { dateTime: string; venue: string; panel: string[]; remarks?: string; }

interface Penalty { type: PenaltyType; amount?: number; durationDays?: number; startAt?: string; endAt?: string; notes?: string; }

interface DisciplineCase {
  id: string;
  createdAt: string;
  updatedAt: string;
  student: StudentRef;
  category: CaseCategory;
  severity: Severity;
  title: string;
  description: string;
  status: CaseStatus;
  assignedTo?: string;
  evidence: Evidence[];
  logs: CaseLog[];
  hearing?: Hearing;
  verdict?: string;
  penalties: Penalty[];
  appealUntil?: string;
}

// Demo students
const students: StudentRef[] = [
  { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE', room: '101', block: 'A' },
  { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE', room: '202', block: 'B' },
  { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE', room: '303', block: 'C' },
  { id: 'ST1402', name: 'Sahil Jain', yearDept: '2nd Year - ME', room: '404', block: 'D' },
];

// Seed cases (fixed)
const seedCases: DisciplineCase[] = [
  {
    id: 'DC-2001',
    createdAt: new Date(Date.now() - 36e5 * 70).toISOString(),
    updatedAt: new Date(Date.now() - 36e5 * 6).toISOString(),
    student: students[0], // FIX: valid index
    category: 'Curfew Breach',
    severity: 'Moderate',
    title: 'Exceeding curfew time repeatedly',
    description: 'Student recorded late entry on multiple occasions this week.',
    status: 'Under Review',
    assignedTo: 'Proctor Sharma',
    evidence: [],
    logs: [
      { id: 'L1', at: new Date(Date.now() - 36e5 * 70).toISOString(), actor: 'Warden', note: 'Case logged' },
      { id: 'L2', at: new Date(Date.now() - 36e5 * 69).toISOString(), actor: 'Warden', note: 'Assigned to Proctor Sharma' },
    ],
    penalties: [],
  },
  {
    id: 'DC-2002',
    createdAt: new Date(Date.now() - 36e5 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 36e5 * 3).toISOString(),
    student: students [1],
    category: 'Vandalism',
    severity: 'High',
    title: 'Damage to common area furniture',
    description: 'Broken chair and scribbling on walls at Block A lounge.',
    status: 'Hearing Scheduled',
    assignedTo: 'Discipline Panel',
    evidence: [{ id: 'E1', name: 'CCTV Clip', addedAt: new Date(Date.now() - 36e5 * 119).toISOString() }],
    logs: [
      { id: 'L1', at: new Date(Date.now() - 36e5 * 120).toISOString(), actor: 'Warden', note: 'Case logged' },
      { id: 'L2', at: new Date(Date.now() - 36e5 * 110).toISOString(), actor: 'Proctor', note: 'Initial review complete' },
    ],
    hearing: { dateTime: new Date(Date.now() + 36e5 * 48).toISOString(), venue: 'Conference Room', panel: ['Warden', 'Proctor', 'Member A'] },
    penalties: [],
  },
];

// CSV helpers (fixed headers)
const toCSV = (rows: Record<string, any>[]) => {
  if (!rows.length) return '';
  const headers = Object.keys(rows);
  const esc = (v: any) => {
    const s = v === null || v === undefined ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(','), ...rows.map(r => headers.map(h => esc(r[h])).join(','))].join('\n');
};

const downloadCSV = (filename: string, rows: Record<string, any>[]) => {
  const blob = new Blob([toCSV(rows)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
};

const DisciplineCases: React.FC = () => {
  const [cases, setCases] = useState<DisciplineCase[]>(seedCases);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'' | CaseStatus>('');
  const [category, setCategory] = useState<'' | CaseCategory>('');
  const [severity, setSeverity] = useState<'' | Severity>('');
  const [panelMember, setPanelMember] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Create modal
  const [openCreate, setOpenCreate] = useState(false);
  const [form, setForm] = useState<Partial<DisciplineCase>>({
    status: 'Logged',
    severity: 'Low',
    category: 'Misconduct',
  });
  const [initNote, setInitNote] = useState('');

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [search, status, category, severity, panelMember, from, to]);

  const filtered = useMemo(() => {
    return cases
      .filter(c => !status || c.status === status)
      .filter(c => !category || c.category === category)
      .filter(c => !severity || c.severity === severity)
      .filter(c => !panelMember || (c.hearing?.panel || []).some(p => p.toLowerCase().includes(panelMember.trim().toLowerCase())))
      .filter(c => !from || new Date(c.createdAt) >= new Date(from))
      .filter(c => !to || new Date(c.createdAt) <= new Date(`${to}T23:59`))
      .filter(c => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        const hay = [
          c.id,
          c.title,
          c.description,
          c.student?.name || '',
          c.student?.id || '',
          c.assignedTo || '',
          c.verdict || '',
        ].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [cases, status, category, severity, panelMember, from, to, search]);

  // KPIs
  const kpis = useMemo(() => {
    const open = filtered.filter(c => c.status === 'Logged' || c.status === 'Under Review').length;
    const upcomingHearings = filtered.filter(c => c.status === 'Hearing Scheduled' && c.hearing && new Date(c.hearing.dateTime) <= new Date(Date.now() + 36e5 * 24 * 7)).length;
    const pendingVerdicts = filtered.filter(c => c.status === 'Hearing Scheduled').length;
    const activePenalties = filtered.filter(c => c.penalties.length > 0 && c.status !== 'Closed').length;
    return { open, upcomingHearings, pendingVerdicts, activePenalties };
  }, [filtered]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = filtered.slice(start, end);

  // Actions
  const addLog = (id: string, note: string, priv?: boolean) => {
    if (!note.trim()) return;
    setCases(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, updatedAt: new Date().toISOString(), logs: [...c.logs, { id: `LG-${Math.random()}`, at: new Date().toISOString(), actor: 'Warden', note: note.trim(), private: !!priv }] }
          : c
      )
    );
  };

  const setStatusFor = (id: string, s: CaseStatus) => {
    setCases(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, status: s, updatedAt: new Date().toISOString(), logs: [...c.logs, { id: `LG-${Math.random()}`, at: new Date().toISOString(), actor: 'Warden', note: `Status → ${s}` }] }
          : c
      )
    );
  };

  const scheduleHearing = (id: string) => {
    const dateTime = prompt('Hearing datetime (YYYY-MM-DDTHH:mm):', new Date(Date.now() + 36e5 * 48).toISOString().slice(0,16));
    const venue = prompt('Venue:', 'Conference Room');
    const panel = prompt('Panel (comma-separated):', 'Warden, Proctor, Member A');
    if (!dateTime || !venue || !panel) return;
    setCases(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              hearing: { dateTime, venue, panel: panel.split(',').map(s => s.trim()) },
              status: 'Hearing Scheduled',
              updatedAt: new Date().toISOString(),
              logs: [...c.logs, { id: `LG-${Math.random()}`, at: new Date().toISOString(), actor: 'Warden', note: 'Hearing scheduled' }],
            }
          : c
      )
    );
  };

  const issueVerdict = (id: string) => {
    const verdict = prompt('Verdict summary:');
    if (!verdict) return;
    setCases(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              verdict,
              status: 'Verdict Issued',
              updatedAt: new Date().toISOString(),
              appealUntil: new Date(Date.now() + 36e5 * 24 * 7).toISOString(),
              logs: [...c.logs, { id: `LG-${Math.random()}`, at: new Date().toISOString(), actor: 'Warden', note: 'Verdict issued' }],
            }
          : c
      )
    );
  };

  const addPenalty = (id: string) => {
    const type = (prompt('Penalty type (Warning/Fine/Suspension/Eviction/Community Service):', 'Warning') || 'Warning') as PenaltyType;
    let amount: number | undefined;
    let durationDays: number | undefined;
    if (type === 'Fine') amount = Number(prompt('Fine amount:', '1000') || '0');
    if (type === 'Suspension' || type === 'Community Service') durationDays = Number(prompt('Duration days:', '7') || '0');
    const notes = prompt('Notes:') || undefined;
    const startAt = new Date().toISOString();
    const endAt = durationDays ? new Date(Date.now() + 36e5 * 24 * durationDays).toISOString() : undefined;

    setCases(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              penalties: [...c.penalties, { type, amount, durationDays, startAt, endAt, notes }],
              updatedAt: new Date().toISOString(),
              logs: [...c.logs, { id: `LG-${Math.random()}`, at: new Date().toISOString(), actor: 'Warden', note: `Penalty added: ${type}` }],
            }
          : c
      )
    );
  };

  const closeCase = (id: string) => setStatusFor(id, 'Closed');

  const exportView = () => {
    const data = filtered.map(c => ({
      id: c.id,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      studentId: c.student?.id || '',
      studentName: c.student?.name || '',
      category: c.category,
      severity: c.severity,
      status: c.status,
      assignedTo: c.assignedTo || '',
      hearingAt: c.hearing?.dateTime || '',
      verdict: c.verdict || '',
      penalties: c.penalties.map(p => `${p.type}${p.amount ? `:₹${p.amount}` : ''}${p.durationDays ? `:${p.durationDays}d` : ''}`).join('|'),
    }));
    downloadCSV(`discipline_cases_${dateStamp()}.csv`, data);
  };

  const openCreateModal = () => {
    setForm({ status: 'Logged', severity: 'Low', category: 'Misconduct' });
    setInitNote('');
    setOpenCreate(true);
  };

  const submitCreate = () => {
    if (!form.student || !form.title || !form.description || !form.category || !form.severity) {
      alert('Please fill required fields.');
      return;
    }
    const nc: DisciplineCase = {
      id: `DC-${Math.floor(2000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      student: form.student!,
      category: form.category as CaseCategory,
      severity: form.severity as Severity,
      title: form.title!,
      description: form.description!,
      status: (form.status as CaseStatus) || 'Logged',
      assignedTo: form.assignedTo || undefined,
      evidence: [],
      logs: [{ id: 'L0', at: new Date().toISOString(), actor: 'Warden', note: 'Case created' }],
      penalties: [],
    };
    if (initNote.trim()) nc.logs.push({ id: 'L1', at: new Date().toISOString(), actor: 'Warden', note: initNote.trim() });
    setCases(prev => [nc, ...prev]);
    setOpenCreate(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Discipline Cases </h1>
        <p className="text-gray-600 dark:text-gray-400">Manage hostel discipline with hearings, verdicts, penalties, and audit logs.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPI label="Open/Review" value={kpis.open} icon={<Shield className="w-5 h-5" />} tone="warn" />
        <KPI label="Hearings (7d)" value={kpis.upcomingHearings} icon={<Calendar className="w-5 h-5" />} tone="neutral" />
        <KPI label="Pending Verdict" value={kpis.pendingVerdicts} icon={<Gavel className="w-5 h-5" />} tone="danger" />
        <KPI label="Active Penalties" value={kpis.activePenalties} icon={<ClipboardList className="w-5 h-5" />} tone="neutral" />
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by title/ID/student/verdict..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select value={status} onChange={e => setStatus(e.target.value as CaseStatus | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Status (All)</option>
              {['Logged','Under Review','Hearing Scheduled','Verdict Issued','Closed'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={category} onChange={e => setCategory(e.target.value as CaseCategory | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Category (All)</option>
              {['Misconduct','Vandalism','Harassment','Attendance','Curfew Breach','Examination'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={severity} onChange={e => setSeverity(e.target.value as Severity | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Severity (All)</option>
              {['Low','Moderate','High','Severe'].map(sv => <option key={sv} value={sv}>{sv}</option>)}
            </select>
            <input value={panelMember} onChange={e => setPanelMember(e.target.value)} placeholder="Panel member" className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <input type="date" value={to} onChange={e => setTo(e.target.value)} className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <button onClick={exportView} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm flex items-center gap-1">
              <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={openCreateModal} className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> New
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pageItems.map(c => (
            <li key={c.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{c.title} • {c.id}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {(c.student?.name || 'Unknown')} ({c.student?.id || '—'}) • {c.student?.yearDept || '—'} • Room {c.student?.room || '—'}, Block {c.student?.block || '—'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{c.category}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    c.severity === 'Severe' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' :
                    c.severity === 'High' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                    'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                  }`}>{c.severity}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    c.status === 'Closed' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                    c.status === 'Verdict Issued' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                  }`}>{c.status}</span>
                </div>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">{c.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">Assigned: {c.assignedTo || '—'}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Updated: {new Date(c.updatedAt).toLocaleString()}</span>
                {c.hearing?.dateTime && (
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Hearing: {new Date(c.hearing.dateTime).toLocaleString()} @ {c.hearing.venue}
                  </span>
                )}
                {c.verdict && (
                  <span className="text-xs text-gray-600 dark:text-gray-400">Verdict: {c.verdict}</span>
                )}
              </div>
              {/* Quick actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => addLog(c.id, prompt('Public note:') || '')}
                        className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> Add Note
                </button>
                <button onClick={() => addLog(c.id, prompt('Private note:') || '', true)}
                        className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                  Private Note
                </button>
                {(c.status === 'Logged' || c.status === 'Under Review') && (
                  <button onClick={() => setStatusFor(c.id, 'Under Review')}
                          className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-xs">
                    Under Review
                  </button>
                )}
                {c.status !== 'Hearing Scheduled' && (
                  <button onClick={() => scheduleHearing(c.id)}
                          className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-xs flex items-center gap-1">
                    <Users className="w-4 h-4" /> Schedule Hearing
                  </button>
                )}
                {c.status !== 'Verdict Issued' && (
                  <button onClick={() => issueVerdict(c.id)}
                          className="px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-xs flex items-center gap-1">
                    <Gavel className="w-4 h-4" /> Issue Verdict
                  </button>
                )}
                <button onClick={() => addPenalty(c.id)}
                        className="px-3 py-1.5 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-xs">
                  Add Penalty
                </button>
                {c.status !== 'Closed' && (
                  <button onClick={() => closeCase(c.id)}
                          className="px-3 py-1.5 rounded-md bg-gray-800 text-white hover:bg-black text-xs">
                    Close
                  </button>
                )}
              </div>
              {/* Evidence & Logs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Evidence</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {c.evidence.map(e => (
                      <span key={e.id} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                        {e.name}
                      </span>
                    ))}
                    <button onClick={() => alert('Attach evidence: integrate upload')}
                            className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                      + Add
                    </button>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Recent Activity</p>
                  <ul className="mt-1 space-y-1 max-h-24 overflow-y-auto pr-1">
                    {[...c.logs].slice(-5).reverse().map(l => (
                      <li key={l.id} className="text-xs text-gray-600 dark:text-gray-400">
                        [{new Date(l.at).toLocaleString()}] {l.actor}: {l.private ? '(Private) ' : ''}{l.note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
          {pageItems.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No cases found.</li>}
        </ul>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {total === 0 ? 0 : start + 1}-{end} of {total}</p>
        <div className="inline-flex -space-x-px">
          <button onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 h-9 border border-gray-300 rounded-s-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 h-9 border border-gray-300 rounded-e-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Create Modal */}
      {openCreate && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setOpenCreate(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">New Discipline Case</h3>
                <button onClick={() => setOpenCreate(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Student</label>
                  <select
                    value={form.student?.id || ''}
                    onChange={e => setForm(f => ({ ...f, student: students.find(s => s.id === e.target.value) }))}
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select student</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    value={form.category || 'Misconduct'}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value as CaseCategory }))}
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {['Misconduct','Vandalism','Harassment','Attendance','Curfew Breach','Examination'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Severity</label>
                  <select
                    value={form.severity || 'Low'}
                    onChange={e => setForm(f => ({ ...f, severity: e.target.value as Severity }))}
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {['Low','Moderate','High','Severe'].map(sv => <option key={sv} value={sv}>{sv}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Assign To</label>
                  <input value={form.assignedTo || ''} onChange={e => setForm(f => ({ ...f, assignedTo: e.target.value }))}
                         className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                         className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            rows={4}
                            className="w-full form-textarea dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Initial Note (optional)</label>
                  <input value={initNote} onChange={e => setInitNote(e.target.value)} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end gap-3">
                <button onClick={() => setOpenCreate(false)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">Cancel</button>
                <button onClick={submitCreate} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const KPI: React.FC<{ label: string; value: number; icon: React.ReactNode; tone?: 'neutral'|'warn'|'danger' }> = ({ label, value, icon, tone='neutral' }) => {
  const toneCls =
    tone === 'danger' ? 'text-red-600 dark:text-red-300' :
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

function dateStamp(): string {
  const d = new Date(); const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

export default DisciplineCases;
