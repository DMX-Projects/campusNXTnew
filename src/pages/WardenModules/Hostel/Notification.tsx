// src/WardenModules/Hostel/Notification.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Megaphone,
  Filter,
  Search,
  Download,
  CalendarDays,
  Send,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Edit,
  Trash2,
  PauseCircle,
  PlayCircle,
} from 'lucide-react';

type AudienceType = 'All' | 'Block' | 'Floor' | 'Room' | 'Student';
type Priority = 'Normal' | 'High' | 'Critical';
type Delivery = 'Draft' | 'Scheduled' | 'Sent' | 'Failed' | 'Paused';

interface Notice {
  id: string;
  createdAt: string;
  scheduledAt?: string; // when to send
  sentAt?: string;      // actual send time
  title: string;
  message: string;
  audience: AudienceType;
  target?: string;      // e.g., A, A-2, A-101, ST2099
  priority: Priority;
  channels: Array<'In-App' | 'Email' | 'SMS'>;
  delivery: Delivery;
  createdBy: 'Warden';
  tags?: string[];
  stats: { delivered: number; failed: number; viewed: number };
  notes?: string;
}

const seed: Notice[] = [
  {
    id: 'N-9001',
    createdAt: new Date(Date.now() - 36e5 * 20).toISOString(),
    scheduledAt: new Date(Date.now() + 36e5 * 2).toISOString(),
    title: 'Water Supply Maintenance',
    message: 'Water supply will be disrupted from 2 PM to 4 PM in Block A due to maintenance.',
    audience: 'Block',
    target: 'A',
    priority: 'High',
    channels: ['In-App', 'Email'],
    delivery: 'Scheduled',
    createdBy: 'Warden',
    tags: ['maintenance', 'water', 'block-A'],
    stats: { delivered: 0, failed: 0, viewed: 0 },
  },
  {
    id: 'N-9002',
    createdAt: new Date(Date.now() - 36e5 * 50).toISOString(),
    sentAt: new Date(Date.now() - 36e5 * 45).toISOString(),
    title: 'Guest Entry Policy',
    message: 'All visitors must carry valid ID; visiting hours 09:00–19:00. Security will verify at gate.',
    audience: 'All',
    priority: 'Normal',
    channels: ['In-App'],
    delivery: 'Sent',
    createdBy: 'Warden',
    tags: ['policy', 'visitors'],
    stats: { delivered: 820, failed: 3, viewed: 610 },
  },
];

const toCSV = (rows: Record<string, any>[]) => {
  if (!rows.length) return '';
  const headers = Object.keys(rows);
  const cell = (v: any) => {
    const s = v == null ? '' : String(v);
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
const stamp = () => { const d=new Date(); const p=(n:number)=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}`; };

const Notification: React.FC = () => {
  const [items, setItems] = useState<Notice[]>(seed);

  // Compose form
  const [openCompose, setOpenCompose] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Notice>>({
    title: '',
    message: '',
    audience: 'All',
    target: '',
    priority: 'Normal',
    channels: ['In-App'],
    delivery: 'Draft',
    scheduledAt: '',
    notes: '',
    tags: [],
  });

  // Filters
  const [search, setSearch] = useState('');
  const [audience, setAudience] = useState<'' | AudienceType>('');
  const [priority, setPriority] = useState<'' | Priority>('');
  const [delivery, setDelivery] = useState<'' | Delivery>('');

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [search, audience, priority, delivery]);

  // Simulate scheduled sending tick
  useEffect(() => {
    const t = setInterval(() => {
      setItems(prev => prev.map(n => {
        if (n.delivery === 'Scheduled' && n.scheduledAt && new Date(n.scheduledAt) <= new Date()) {
          // simulate send outcomes
          const delivered = Math.floor(800 + Math.random() * 100);
          const failed = Math.floor(Math.random() * 5);
          return { ...n, delivery: 'Sent', sentAt: new Date().toISOString(), stats: { delivered, failed, viewed: Math.floor(delivered * 0.7) } };
        }
        return n;
      }));
    }, 30000); // 30s tick
    return () => clearInterval(t);
  }, []);

  // Derived
  const filtered = useMemo(() => {
    return items
      .filter(n => !audience || n.audience === audience)
      .filter(n => !priority || n.priority === priority)
      .filter(n => !delivery || n.delivery === delivery)
      .filter(n => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        const hay = [
          n.id, n.title, n.message, n.audience, n.target || '', (n.tags || []).join(' '), n.priority, n.delivery
        ].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [items, audience, priority, delivery, search]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = filtered.slice(start, end);

  // KPIs
  const kpi = useMemo(() => {
    const drafts = filtered.filter(n => n.delivery === 'Draft').length;
    const scheduled = filtered.filter(n => n.delivery === 'Scheduled').length;
    const sent = filtered.filter(n => n.delivery === 'Sent').length;
    const critical = filtered.filter(n => n.priority === 'Critical').length;
    return { drafts, scheduled, sent, critical };
  }, [filtered]);

  // Actions
  const openNew = () => {
    setEditingId(null);
    setForm({ title: '', message: '', audience: 'All', target: '', priority: 'Normal', channels: ['In-App'], delivery: 'Draft', scheduledAt: '', notes: '', tags: [] });
    setOpenCompose(true);
  };

  const openEdit = (n: Notice) => {
    setEditingId(n.id);
    setForm({ ...n });
    setOpenCompose(true);
  };

  const remove = (id: string) => {
    if (!confirm('Delete this notice?')) return;
    setItems(prev => prev.filter(n => n.id !== id));
  };

  const togglePause = (id: string) => {
    setItems(prev => prev.map(n => {
      if (n.id !== id) return n;
      if (n.delivery === 'Scheduled') return { ...n, delivery: 'Paused' };
      if (n.delivery === 'Paused') return { ...n, delivery: 'Scheduled' };
      return n;
    }));
  };

  const sendNow = (id: string) => {
    setItems(prev => prev.map(n => {
      if (n.id !== id) return n;
      const delivered = Math.floor(800 + Math.random() * 100);
      const failed = Math.floor(Math.random() * 5);
      return { ...n, delivery: 'Sent', sentAt: new Date().toISOString(), stats: { delivered, failed, viewed: Math.floor(delivered * 0.7) } };
    }));
  };

  const saveNotice = () => {
    if (!form.title?.trim() || !form.message?.trim() || !form.audience) {
      alert('Please fill Title, Message, and Audience');
      return;
    }
    if ((form.audience === 'Block' || form.audience === 'Floor' || form.audience === 'Room' || form.audience === 'Student') && !form.target?.trim()) {
      alert('Please set a target for the selected audience.');
      return;
    }
    // Normalize channels
    const channels = (form.channels && form.channels.length) ? form.channels : ['In-App'];
    const base: Notice = {
      id: editingId ? (form.id as string) : `N-${Math.floor(9000 + Math.random() * 9000)}`,
      createdAt: editingId ? (form.createdAt as string) : new Date().toISOString(),
      scheduledAt: form.scheduledAt || undefined,
      sentAt: form.sentAt || undefined,
      title: form.title!.trim(),
      message: form.message!.trim(),
      audience: form.audience as AudienceType,
      target: form.audience === 'All' ? undefined : form.target?.trim(),
      priority: form.priority as Priority,
      channels: channels as Notice['channels'],
      delivery: (form.delivery as Delivery) || 'Draft',
      createdBy: 'Warden',
      tags: form.tags || [],
      stats: form.stats || { delivered: 0, failed: 0, viewed: 0 },
      notes: form.notes,
    };

    if (editingId) {
      setItems(prev => prev.map(n => (n.id === editingId ? base : n)));
    } else {
      setItems(prev => [base, ...prev]);
    }
    setOpenCompose(false);
  };

  const exportView = () => {
    const data = filtered.map(n => ({
      id: n.id,
      createdAt: n.createdAt,
      scheduledAt: n.scheduledAt || '',
      sentAt: n.sentAt || '',
      title: n.title,
      audience: n.audience,
      target: n.target || '',
      priority: n.priority,
      channels: n.channels.join('|'),
      delivery: n.delivery,
      delivered: n.stats.delivered,
      failed: n.stats.failed,
      viewed: n.stats.viewed,
      tags: (n.tags || []).join('|'),
    }));
    downloadCSV(`notices_${stamp()}.csv`, data);
  };

  const resetFilters = () => { setSearch(''); setAudience(''); setPriority(''); setDelivery(''); };

  // Helpers
  const priorityBadge = (p: Priority) =>
    p === 'Critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
    : p === 'High' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
    : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications </h1>
          <p className="text-gray-600 dark:text-gray-400">Compose, schedule, and track delivery of announcements to selected audiences.</p>
        </div>
        <button onClick={openNew} className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 text-sm flex items-center gap-1">
          <Megaphone className="w-4 h-4" /> New Notice
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <KPI icon={<Clock className="w-5 h-5" />} label="Drafts" value={kpi.drafts} />
        <KPI icon={<CalendarDays className="w-5 h-5" />} label="Scheduled" value={kpi.scheduled} />
        <KPI icon={<CheckCircle2 className="w-5 h-5" />} label="Sent" value={kpi.sent} />
        <KPI icon={<AlertTriangle className="w-5 h-5" />} label="Critical" value={kpi.critical} />
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search title/message/tags..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select value={audience} onChange={e => setAudience(e.target.value as AudienceType | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Audience (All)</option>
              {['All','Block','Floor','Room','Student'].map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value as Priority | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Priority (All)</option>
              {['Normal','High','Critical'].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={delivery} onChange={e => setDelivery(e.target.value as Delivery | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Delivery (All)</option>
              {['Draft','Scheduled','Paused','Sent','Failed'].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <button onClick={exportView} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Export</button>
            <button onClick={resetFilters} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1"><RefreshCw className="w-4 h-4" /> Reset</button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pageItems.map(n => (
            <li key={n.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{n.title} • {n.id}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {n.audience}{n.target ? ` • ${n.target}` : ''} • Priority:
                    <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${priorityBadge(n.priority)}`}>{n.priority}</span>
                    {' '}• Channels: {n.channels.join(', ')}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    n.delivery === 'Sent' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                    n.delivery === 'Scheduled' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                    n.delivery === 'Paused' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100' :
                    n.delivery === 'Failed' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                  }`}>{n.delivery}</span>
                </div>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{n.message}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span>Created: {new Date(n.createdAt).toLocaleString()}</span>
                {n.scheduledAt && <span>Scheduled: {new Date(n.scheduledAt).toLocaleString()}</span>}
                {n.sentAt && <span>Sent: {new Date(n.sentAt).toLocaleString()}</span>}
                {!!(n.tags && n.tags.length) && <span>Tags: {(n.tags || []).join(', ')}</span>}
                <span>Stats: Delivered {n.stats.delivered} • Failed {n.stats.failed} • Viewed {n.stats.viewed}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button onClick={() => openEdit(n)} className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-xs flex items-center gap-1"><Edit className="w-4 h-4" /> Edit</button>
                <button onClick={() => remove(n.id)} className="px-3 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-xs flex items-center gap-1"><Trash2 className="w-4 h-4" /> Delete</button>
                {n.delivery === 'Scheduled' || n.delivery === 'Paused' ? (
                  <button onClick={() => togglePause(n.id)} className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1">
                    {n.delivery === 'Paused' ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />} {n.delivery === 'Paused' ? 'Resume' : 'Pause'}
                  </button>
                ) : null}
                {n.delivery !== 'Sent' && <button onClick={() => sendNow(n.id)} className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-xs flex items-center gap-1"><Send className="w-4 h-4" /> Send Now</button>}
              </div>
            </li>
          ))}
          {pageItems.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No notices.</li>}
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

      {/* Compose Modal */}
      {openCompose && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setOpenCompose(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{editingId ? 'Edit Notice' : 'New Notice'}</h3>
                <button onClick={() => setOpenCompose(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea rows={4} value={form.message || ''} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full form-textarea dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Audience</label>
                  <select value={form.audience || 'All'} onChange={e => setForm(f => ({ ...f, audience: e.target.value as AudienceType }))} className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {['All','Block','Floor','Room','Student'].map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Target</label>
                  <input placeholder="e.g., A or A-2 or A-101 or ST2099" value={form.target || ''} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <select value={form.priority || 'Normal'} onChange={e => setForm(f => ({ ...f, priority: e.target.value as Priority }))} className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {['Normal','High','Critical'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Channels</label>
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    {['In-App','Email','SMS'].map(ch => (
                      <label key={ch} className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!form.channels?.includes(ch as any)}
                          onChange={e => setForm(f => {
                            const set = new Set(f.channels || []);
                            if (e.target.checked) set.add(ch as any); else set.delete(ch as any);
                            return { ...f, channels: Array.from(set) as Notice['channels'] };
                          })}
                        />
                        {ch}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Delivery</label>
                  <select value={form.delivery || 'Draft'} onChange={e => setForm(f => ({ ...f, delivery: e.target.value as Delivery }))} className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {['Draft','Scheduled','Paused','Sent','Failed'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Schedule at</label>
                  <input type="datetime-local" value={form.scheduledAt ? toLocalInput(form.scheduledAt) : ''} onChange={e => setForm(f => ({ ...f, scheduledAt: e.target.value ? new Date(e.target.value).toISOString() : '' }))} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Tags (comma-separated)</label>
                  <input value={(form.tags || []).join(', ')} onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Internal Notes</label>
                  <input value={form.notes || ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-3">
                <button onClick={() => setOpenCompose(false)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">Cancel</button>
                <button onClick={saveNotice} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center gap-1">
                  <Send className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function toLocalInput(iso: string) {
  try {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch { return ''; }
}

const KPI: React.FC<{ icon: React.ReactNode; label: string; value: number }> = ({ icon, label, value }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center gap-3">
      <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-xl font-bold text-indigo-600 dark:text-indigo-300">{value}</p>
      </div>
    </div>
  );
};

export default Notification;
