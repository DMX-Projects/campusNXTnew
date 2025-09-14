// src/WardenModules/Hostel/Complaints.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Filter,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Paperclip,
  UserPlus,
  RefreshCw,
} from 'lucide-react';

// Types
type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
type Status = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
type Category = 'Room' | 'Mess' | 'Maintenance' | 'Noise' | 'Harassment' | 'Other';

interface StudentRef { id: string; name: string; yearDept: string; room?: string; block?: string; }

interface AttachmentMeta { id: string; name: string; url?: string; }

interface ComplaintLog { id: string; at: string; actor: string; note: string; private?: boolean; }

interface Complaint {
  id: string;
  createdAt: string;
  updatedAt: string;
  student: StudentRef;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: Status;
  assignee?: string;
  dueAt?: string;
  attachments: AttachmentMeta[];
  logs: ComplaintLog[];
}

// Demo student list (replace with API)
const students: StudentRef[] = [
  { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE', room: '101', block: 'A' },
  { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE', room: '202', block: 'B' },
  { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE', room: '303', block: 'C' },
  { id: 'ST1402', name: 'Sahil Jain', yearDept: '2nd Year - ME', room: '404', block: 'D' },
];

// Demo seed data (fixed)
const seedComplaints: Complaint[] = [
  {
    id: 'CMP-1001',
    createdAt: new Date(Date.now() - 36e5 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 36e5 * 10).toISOString(),
    student: students,
    title: 'Water leakage in bathroom',
    description: 'Persistent leakage near the shower causing slippery floor.',
    category: 'Maintenance',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Maintenance Team',
    dueAt: new Date(Date.now() + 36e5 * 24).toISOString().slice(0, 16),
    attachments: [],
    logs: [
      { id: 'L1', at: new Date(Date.now() - 36e5 * 30).toISOString(), actor: 'Student', note: 'Submitted complaint' },
      { id: 'L2', at: new Date(Date.now() - 36e5 * 29).toISOString(), actor: 'Warden', note: 'Assigned to Maintenance Team' },
    ],
  },
  {
    id: 'CMP-1002',
    createdAt: new Date(Date.now() - 36e5 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 36e5 * 5).toISOString(),
    student: students[20], // FIX: valid index, not students[18]
    title: 'Loud noise after midnight',
    description: 'Frequent disturbance from adjacent room post 12 AM.',
    category: 'Noise',
    priority: 'Medium',
    status: 'Open',
    assignee: 'Floor Incharge',
    dueAt: new Date(Date.now() + 36e5 * 48).toISOString().slice(0, 16),
    attachments: [],
    logs: [{ id: 'L1', at: new Date(Date.now() - 36e5 * 60).toISOString(), actor: 'Student', note: 'Submitted complaint' }],
  },
];

// CSV helpers (fixed headers)
const toCSV = (rows: Record<string, any>[]) => {
  if (!rows.length) return '';
  const headers = Object.keys(rows);
  const cell = (v: any) => {
    const s = v === undefined || v === null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(','), ...rows.map(r => headers.map(h => cell(r[h])).join(','))].join('\n');
};

const downloadCSV = (filename: string, data: Record<string, any>[]) => {
  const csv = toCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
};

// Component
const Complaints: React.FC = () => {
  const [list, setList] = useState<Complaint[]>(seedComplaints);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'' | Status>('');
  const [category, setCategory] = useState<'' | Category>('');
  const [priority, setPriority] = useState<'' | Priority>('');
  const [assignee, setAssignee] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Create modal
  const [openCreate, setOpenCreate] = useState(false);
  const [form, setForm] = useState<Partial<Complaint>>({ priority: 'Medium', category: 'Other', status: 'Open' });
  const [note, setNote] = useState('');

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [search, status, category, priority, assignee, from, to]);

  const filtered = useMemo(() => {
    return list
      .filter(c => !status || c.status === status)
      .filter(c => !category || c.category === category)
      .filter(c => !priority || c.priority === priority)
      .filter(c => !assignee || (c.assignee || '').toLowerCase().includes(assignee.trim().toLowerCase()))
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
          c.assignee || '',
        ].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [list, status, category, priority, assignee, from, to, search]);

  // KPIs
  const kpis = useMemo(() => {
    const open = filtered.filter(c => c.status === 'Open').length;
    const inprog = filtered.filter(c => c.status === 'In Progress').length;
    const now = Date.now();
    const overdue = filtered.filter(c => c.dueAt && new Date(c.dueAt).getTime() < now && c.status !== 'Closed' && c.status !== 'Resolved').length;
    const closed = filtered.filter(c => c.status === 'Closed' || c.status === 'Resolved');
    const avgCloseMs = closed.length
      ? Math.round(closed.reduce((s, c) => s + (new Date(c.updatedAt).getTime() - new Date(c.createdAt).getTime()), 0) / closed.length)
      : 0;
    const hours = Math.round(avgCloseMs / 36e5);
    return { open, inprog, overdue, avgCloseHours: hours };
  }, [filtered]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = filtered.slice(start, end);

  // Actions
  const updateStatus = (id: string, next: Status) => {
    setList(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              status: next,
              updatedAt: new Date().toISOString(),
              logs: [
                ...c.logs,
                { id: `LG-${Math.random()}`, at: new Date().toISOString(), actor: 'Warden', note: `Status changed to ${next}` },
              ],
            }
          : c
      )
    );
  };

  const assignTo = (id: string, who: string) => {
    setList(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              assignee: who,
              updatedAt: new Date().toISOString(),
              logs: [
                ...c.logs,
                { id: `LG-${Math.random()}`, at: new Date().toISOString(), actor: 'Warden', note: `Assigned to ${who}` },
              ],
            }
          : c
      )
    );
  };

  const addNote = (id: string, text: string, isPrivate?: boolean) => {
    if (!text.trim()) return;
    setList(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              updatedAt: new Date().toISOString(),
              logs: [
                ...c.logs,
                { id: `LG-${Math.random()}`, at: new Date().toISOString(), actor: 'Warden', note: text.trim(), private: !!isPrivate },
              ],
            }
          : c
      )
    );
  };

  const reopen = (id: string) => updateStatus(id, 'Open');

  const exportView = () => {
    const data = filtered.map(c => ({
      id: c.id,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      studentId: c.student?.id || '',
      studentName: c.student?.name || '',
      category: c.category,
      priority: c.priority,
      status: c.status,
      assignee: c.assignee || '',
      dueAt: c.dueAt || '',
      title: c.title,
    }));
    downloadCSV(`complaints_${dateStamp()}.csv`, data);
  };

  const openCreateModal = () => {
    setForm({ priority: 'Medium', category: 'Other', status: 'Open' });
    setNote('');
    setOpenCreate(true);
  };

  const submitCreate = () => {
    if (!form.title || !form.description || !form.category || !form.priority || !form.student) {
      alert('Please fill required fields.');
      return;
    }
    const newC: Complaint = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      student: form.student!,
      title: form.title!,
      description: form.description!,
      category: form.category as Category,
      priority: form.priority as Priority,
      status: (form.status as Status) || 'Open',
      assignee: form.assignee || undefined,
      dueAt: form.dueAt || undefined,
      attachments: [],
      logs: [{ id: 'L0', at: new Date().toISOString(), actor: 'Warden', note: 'Complaint created' }],
    };
    if (note.trim()) newC.logs.push({ id: 'L1', at: new Date().toISOString(), actor: 'Warden', note: note.trim(), private: false });
    setList(prev => [newC, ...prev]);
    setOpenCreate(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hostel Complaints </h1>
        <p className="text-gray-600 dark:text-gray-400">Track, assign, and resolve student complaints with SLA and detailed timeline.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPI label="Open" value={kpis.open} tone="danger" icon={<AlertTriangle className="w-5 h-5" />} />
        <KPI label="In Progress" value={kpis.inprog} tone="warn" icon={<Clock className="w-5 h-5" />} />
        <KPI label="Overdue" value={kpis.overdue} tone="danger" icon={<Clock className="w-5 h-5" />} />
        <KPI label="Avg Close (h)" value={kpis.avgCloseHours} tone="neutral" icon={<CheckCircle2 className="w-5 h-5" />} />
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by title/ID/student/assignee..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select value={status} onChange={e => setStatus(e.target.value as Status | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Status (All)</option>
              {['Open','In Progress','Resolved','Closed'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={category} onChange={e => setCategory(e.target.value as Category | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Category (All)</option>
              {['Room','Mess','Maintenance','Noise','Harassment','Other'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value as Priority | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Priority (All)</option>
              {['Low','Medium','High','Critical'].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input
              value={assignee}
              onChange={e => setAssignee(e.target.value)}
              placeholder="Assignee"
              className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
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
          {pageItems.map(c => {
            const overdue = c.dueAt ? new Date(c.dueAt).getTime() < Date.now() && c.status !== 'Closed' && c.status !== 'Resolved' : false;
            return (
              <li key={c.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {c.title} • {c.id}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {(c.student?.name || 'Unknown')} ({c.student?.id || '—'}) • {c.student?.yearDept || '—'} • Room {c.student?.room || '—'}, Block {c.student?.block || '—'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{c.category}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      c.priority === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' :
                      c.priority === 'High' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                    }`}>{c.priority}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      c.status === 'Closed' || c.status === 'Resolved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                    }`}>{c.status}</span>
                    {c.dueAt && (
                      <span className={`px-2 py-0.5 text-xs rounded-full ${overdue ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}`}>
                        SLA {c.dueAt.replace('T', ' ')}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300">{c.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Assignee: {c.assignee || '—'}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Updated: {new Date(c.updatedAt).toLocaleString()}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Quick actions */}
                  <button
                    onClick={() => assignTo(c.id, prompt('Assign to (name/team):', c.assignee || '') || c.assignee || '')}
                    className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1"
                  >
                    <UserPlus className="w-4 h-4" /> Assign
                  </button>
                  <button
                    onClick={() => addNote(c.id, prompt('Public note to add:') || '')}
                    className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1"
                  >
                    <MessageSquare className="w-4 h-4" /> Add Note
                  </button>
                  <button
                    onClick={() => addNote(c.id, prompt('Private staff note:') || '', true)}
                    className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1"
                  >
                    <MessageSquare className="w-4 h-4" /> Private Note
                  </button>
                  {c.status !== 'In Progress' && (
                    <button onClick={() => updateStatus(c.id, 'In Progress')} className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-xs">
                      In Progress
                    </button>
                  )}
                  {c.status !== 'Resolved' && (
                    <button onClick={() => updateStatus(c.id, 'Resolved')} className="px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-xs">
                      Resolve
                    </button>
                  )}
                  {c.status !== 'Closed' && (
                    <button onClick={() => updateStatus(c.id, 'Closed')} className="px-3 py-1.5 rounded-md bg-gray-800 text-white hover:bg-black text-xs">
                      Close
                    </button>
                  )}
                  {(c.status === 'Closed' || c.status === 'Resolved') && (
                    <button onClick={() => reopen(c.id)} className="px-3 py-1.5 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-xs flex items-center gap-1">
                      <RefreshCw className="w-4 h-4" /> Reopen
                    </button>
                  )}
                  <button
                    onClick={() => alert('Attach: Integrate upload service')}
                    className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1"
                  >
                    <Paperclip className="w-4 h-4" /> Attach
                  </button>
                </div>
                {/* Recent activity */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Recent activity</p>
                  <ul className="mt-1 space-y-1 max-h-24 overflow-y-auto pr-1">
                    {[...c.logs].slice(-5).reverse().map(l => (
                      <li key={l.id} className="text-xs text-gray-600 dark:text-gray-400">
                        [{new Date(l.at).toLocaleString()}] {l.actor}: {l.private ? '(Private) ' : ''}{l.note}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
          {pageItems.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No complaints found.</li>}
        </ul>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {total === 0 ? 0 : start + 1}-{end} of {total}</p>
        <div className="inline-flex -space-x-px">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 h-9 border border-gray-300 rounded-s-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 h-9 border border-gray-300 rounded-e-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
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
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">New Complaint</h3>
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
                    value={form.category || 'Other'}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {['Room','Mess','Maintenance','Noise','Harassment','Other'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <select
                    value={form.priority || 'Medium'}
                    onChange={e => setForm(f => ({ ...f, priority: e.target.value as Priority }))}
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {['Low','Medium','High','Critical'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">SLA Due</label>
                  <input
                    type="datetime-local"
                    value={form.dueAt || ''}
                    onChange={e => setForm(f => ({ ...f, dueAt: e.target.value }))}
                    className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={form.description || ''}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={4}
                    className="w-full form-textarea dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Initial Note (optional)</label>
                  <input value={note} onChange={e => setNote(e.target.value)} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
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

export default Complaints;
