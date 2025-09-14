// src/WardenModules/Hostel/ConductReport.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Filter,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  Gavel,
  CalendarDays,
  FileText,
  Scale,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  MessageSquare,
  Users,
} from 'lucide-react';

// Domain models
type Severity = 'Low' | 'Moderate' | 'High' | 'Severe';
type Status = 'Open' | 'Under Review' | 'Actioned' | 'Closed';
type RuleCategory =
  | 'Curfew'
  | 'Noise'
  | 'Cleanliness'
  | 'Vandalism'
  | 'Harassment'
  | 'Smoking/Alcohol'
  | 'Electrical/Appliance'
  | 'Visitors'
  | 'Other';

type ActionType =
  | 'Warning'
  | 'Counseling'
  | 'Fine'
  | 'Community Service'
  | 'Suspension'
  | 'Eviction'
  | 'Referral';

interface StudentRef { id: string; name: string; yearDept: string; room?: string; block?: string; }

interface Rule {
  id: string;
  title: string;
  category: RuleCategory;
  description: string;
  active: boolean;
}

interface ActionRecord {
  id: string;
  at: string;
  actor: string;
  type: ActionType;
  amount?: number;
  durationDays?: number;
  note?: string;
  effectiveFrom?: string;
  effectiveUntil?: string;
}

interface Incident {
  id: string;
  createdAt: string;
  updatedAt: string;
  student: StudentRef;
  ruleId: string;
  category: RuleCategory;
  title: string;
  details: string;
  severity: Severity;
  status: Status;
  reportedBy: string;
  hearingAt?: string;
  actions: ActionRecord[];
  notes: Array<{ at: string; actor: string; text: string; private?: boolean }>;
  attachments?: Array<{ id: string; name: string; url?: string }>;
}

// Demo students
const students: StudentRef[] = [
  { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE', room: '101', block: 'A' },
  { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE', room: '202', block: 'B' },
  { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE', room: '303', block: 'C' },
  { id: 'ST1402', name: 'Sahil Jain', yearDept: '2nd Year - ME', room: '404', block: 'D' },
];

// Demo rules
const rulesSeed: Rule[] = [
  { id: 'R1', title: 'Curfew timings must be observed', category: 'Curfew', description: 'Entry after curfew requires permission and log.', active: true },
  { id: 'R2', title: 'No loud noise after 10PM', category: 'Noise', description: 'Maintain silence during rest hours.', active: true },
  { id: 'R3', title: 'No damage to hostel property', category: 'Vandalism', description: 'Damage attracts penalty and repair cost.', active: true },
  { id: 'R4', title: 'No smoking/alcohol in premises', category: 'Smoking/Alcohol', description: 'Strictly prohibited inside campus.', active: true },
  { id: 'R5', title: 'Unauthorized appliances prohibited', category: 'Electrical/Appliance', description: 'Heaters/cookers need written permission.', active: true },
];

// Demo incidents with valid students and actions
const seedIncidents: Incident[] = [
  {
    id: 'INC-3001',
    createdAt: new Date(Date.now() - 36e5 * 90).toISOString(),
    updatedAt: new Date(Date.now() - 36e5 * 20).toISOString(),
    student: students[22],
    ruleId: 'R1',
    category: 'Curfew',
    title: 'Repeated late entry beyond curfew',
    details: 'Late entries recorded on Mon and Wed; informed security and logged.',
    severity: 'Moderate',
    status: 'Under Review',
    reportedBy: 'Security',
    notes: [{ at: new Date(Date.now() - 36e5 * 90).toISOString(), actor: 'Security', text: 'Reported at 00:30' }],
    actions: [],
  },
  {
    id: 'INC-3002',
    createdAt: new Date(Date.now() - 36e5 * 140).toISOString(),
    updatedAt: new Date(Date.now() - 36e5 * 10).toISOString(),
    student: students,
    ruleId: 'R3',
    category: 'Vandalism',
    title: 'Damage to lounge chair',
    details: 'Chair arm broken and wall scribbling noticed.',
    severity: 'High',
    status: 'Actioned',
    reportedBy: 'Warden',
    notes: [
      { at: new Date(Date.now() - 36e5 * 140).toISOString(), actor: 'Warden', text: 'Case logged' },
      { at: new Date(Date.now() - 36e5 * 120).toISOString(), actor: 'Proctor', text: 'Photos attached' },
    ],
    actions: [
      { id: 'ACT-1', at: new Date(Date.now() - 36e5 * 48).toISOString(), actor: 'Warden', type: 'Fine', amount: 1500, note: 'Repair cost', effectiveFrom: new Date(Date.now() - 36e5 * 48).toISOString() },
      { id: 'ACT-2', at: new Date(Date.now() - 36e5 * 47).toISOString(), actor: 'Proctor', type: 'Warning', note: 'Written warning issued' },
    ],
  },
  {
    id: 'INC-3003',
    createdAt: new Date(Date.now() - 36e5 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 36e5 * 6).toISOString(),
    student: students[1],
    ruleId: 'R2',
    category: 'Noise',
    title: 'Loud music past 11PM',
    details: 'Complaint from adjacent room; warning served.',
    severity: 'Low',
    status: 'Closed',
    reportedBy: 'Student',
    notes: [{ at: new Date(Date.now() - 36e5 * 60).toISOString(), actor: 'Student', text: 'Raised complaint' }],
    actions: [{ id: 'ACT-3', at: new Date(Date.now() - 36e5 * 12).toISOString(), actor: 'Warden', type: 'Counseling', note: 'Counseling session done' }],
  },
];

// CSV helpers
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
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => window.URL.revokeObjectURL(url), 500);
};

// Component
const ConductReport: React.FC = () => {
  // Data
  const [incidents, setIncidents] = useState<Incident[]>(seedIncidents);
  const [ruleList, setRuleList] = useState<Rule[]>(rulesSeed);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'' | RuleCategory>('');
  const [severity, setSeverity] = useState<'' | Severity>('');
  const [status, setStatus] = useState<'' | Status>('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Views
  type DocView = 'Overview' | 'Incidents' | 'Actions' | 'Penalties' | 'Acknowledgements' | 'Rules';
  const [view, setView] = useState<DocView>('Overview');

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [search, category, severity, status, from, to, view]);

  // Incident create modal
  const [openCreate, setOpenCreate] = useState(false);
  const [incidentForm, setIncidentForm] = useState<Partial<Incident>>({
    severity: 'Low',
    status: 'Open',
    category: 'Other',
    reportedBy: 'Warden',
    ruleId: rulesSeed.id,
  });
  const [initNote, setInitNote] = useState('');

  // Rules Manager modal
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [ruleForm, setRuleForm] = useState<Partial<Rule>>({
    title: '',
    category: 'Other',
    description: '',
    active: true,
  });

  // Derived incidents
  const filteredIncidents = useMemo(() => {
    return incidents
      .filter(i => !category || i.category === category)
      .filter(i => !severity || i.severity === severity)
      .filter(i => !status || i.status === status)
      .filter(i => !from || new Date(i.createdAt) >= new Date(from))
      .filter(i => !to || new Date(i.createdAt) <= new Date(`${to}T23:59`))
      .filter(i => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        const hay = [
          i.id, i.title, i.details, i.student?.name || '', i.student?.id || '', i.category, i.severity, i.status,
        ].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [incidents, category, severity, status, from, to, search]);

  // Penalties and acknowledgements
  const penalties = useMemo(() => {
    return filteredIncidents.flatMap(i =>
      i.actions
        .filter(a => ['Fine', 'Suspension', 'Community Service', 'Eviction'].includes(a.type))
        .map(a => ({ incidentId: i.id, student: i.student, category: i.category, severity: i.severity, action: a }))
    );
  }, [filteredIncidents]);

  const acknowledgements = useMemo(() => {
    return filteredIncidents.flatMap(i =>
      i.actions
        .filter(a => a.type === 'Warning' || a.type === 'Counseling')
        .map(a => ({ incidentId: i.id, student: i.student, action: a, recordedAt: a.at }))
    );
  }, [filteredIncidents]);

  // KPIs
  const kpis = useMemo(() => {
    const total = filteredIncidents.length;
    const open = filteredIncidents.filter(i => i.status === 'Open' || i.status === 'Under Review').length;
    const actioned = filteredIncidents.filter(i => i.status === 'Actioned').length;
    const closed = filteredIncidents.filter(i => i.status === 'Closed').length;
    const sevenDays = Date.now() - 7 * 24 * 36e5;
    const last7 = filteredIncidents.filter(i => new Date(i.createdAt).getTime() >= sevenDays).length;

    const byCategory: Record<RuleCategory, number> = {
      Curfew: 0, Noise: 0, Cleanliness: 0, Vandalism: 0, Harassment: 0, 'Smoking/Alcohol': 0, 'Electrical/Appliance': 0, Visitors: 0, Other: 0,
    };
    filteredIncidents.forEach(i => { byCategory[i.category] = (byCategory[i.category] || 0) + 1; });

    const actionable = filteredIncidents.filter(i => i.status === 'Actioned' || i.status === 'Closed');
    const avgActionMs = actionable.length
      ? Math.round(actionable.reduce((s, i) => s + (new Date(i.updatedAt).getTime() - new Date(i.createdAt).getTime()), 0) / actionable.length)
      : 0;
    const avgActionHrs = Math.round(avgActionMs / 36e5);

    return { total, open, actioned, closed, last7, byCategory, avgActionHrs };
  }, [filteredIncidents]);

  // Pagination counts
  const total = (() => {
    if (view === 'Incidents' || view === 'Overview') return filteredIncidents.length;
    if (view === 'Actions') return filteredIncidents.reduce((s, i) => s + i.actions.length, 0);
    if (view === 'Penalties') return penalties.length;
    if (view === 'Acknowledgements') return acknowledgements.length;
    if (view === 'Rules') return ruleList.length;
    return filteredIncidents.length;
  })();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);

  // Incident actions
  const addNote = (incidentId: string) => {
    const text = prompt('Add public note:') || '';
    if (!text.trim()) return;
    setIncidents(prev =>
      prev.map(i =>
        i.id === incidentId
          ? { ...i, updatedAt: new Date().toISOString(), notes: [...i.notes, { at: new Date().toISOString(), actor: 'Warden', text: text.trim() }] }
          : i
      )
    );
  };

  const actionIncident = (incidentId: string) => {
    const type = (prompt('Action type (Warning/Counseling/Fine/Community Service/Suspension/Eviction/Referral):', 'Warning') || 'Warning') as ActionType;
    let amount: number | undefined;
    let durationDays: number | undefined;
    if (type === 'Fine') amount = Number(prompt('Fine amount:', '1000') || '0');
    if (['Suspension', 'Community Service'].includes(type)) durationDays = Number(prompt('Duration days:', '7') || '0');
    const note = prompt('Action note:') || undefined;

    setIncidents(prev =>
      prev.map(i =>
        i.id === incidentId
          ? {
              ...i,
              status: i.status === 'Open' ? 'Under Review' : 'Actioned',
              updatedAt: new Date().toISOString(),
              actions: [
                ...i.actions,
                {
                  id: `ACT-${Math.floor(1000 + Math.random() * 9000)}`,
                  at: new Date().toISOString(),
                  actor: 'Warden',
                  type,
                  amount,
                  durationDays,
                  note,
                  effectiveFrom: new Date().toISOString(),
                  effectiveUntil: durationDays ? new Date(Date.now() + durationDays * 24 * 36e5).toISOString() : undefined,
                },
              ],
            }
          : i
      )
    );
  };

  const closeIncident = (incidentId: string) => {
    setIncidents(prev =>
      prev.map(i => (i.id === incidentId ? { ...i, status: 'Closed', updatedAt: new Date().toISOString() } : i))
    );
  };

  const scheduleHearing = (incidentId: string) => {
    const when = prompt('Hearing datetime (YYYY-MM-DDTHH:mm):', new Date(Date.now() + 48 * 36e5).toISOString().slice(0, 16));
    if (!when) return;
    setIncidents(prev =>
      prev.map(i => (i.id === incidentId ? { ...i, hearingAt: when, updatedAt: new Date().toISOString(), status: 'Under Review' } : i))
    );
  };

  // Exports
  const exportActive = () => {
    if (view === 'Rules') {
      const data = ruleList.map(r => ({ id: r.id, title: r.title, category: r.category, active: r.active ? 'Yes' : 'No', description: r.description }));
      downloadCSV(`conduct_rules_${dateStamp()}.csv`, data);
      return;
    }
    if (view === 'Actions') {
      const data: Record<string, any>[] = [];
      filteredIncidents.forEach(i =>
        i.actions.forEach(a => {
          data.push({
            incidentId: i.id,
            studentId: i.student?.id || '',
            studentName: i.student?.name || '',
            category: i.category,
            severity: i.severity,
            actionType: a.type,
            amount: a.amount || '',
            durationDays: a.durationDays || '',
            at: a.at,
            note: a.note || '',
          });
        })
      );
      downloadCSV(`conduct_actions_${dateStamp()}.csv`, data);
      return;
    }
    if (view === 'Penalties') {
      const data = penalties.map(p => ({
        incidentId: p.incidentId,
        studentId: p.student.id,
        studentName: p.student.name,
        category: p.category,
        severity: p.severity,
        actionType: p.action.type,
        amount: p.action.amount || '',
        durationDays: p.action.durationDays || '',
        from: p.action.effectiveFrom || '',
        until: p.action.effectiveUntil || '',
      }));
      downloadCSV(`conduct_penalties_${dateStamp()}.csv`, data);
      return;
    }
    if (view === 'Acknowledgements') {
      const data = acknowledgements.map(a => ({
        incidentId: a.incidentId,
        studentId: a.student.id,
        studentName: a.student.name,
        action: a.action.type,
        recordedAt: a.recordedAt,
        note: a.action.note || '',
      }));
      downloadCSV(`conduct_ack_${dateStamp()}.csv`, data);
      return;
    }
    // Incidents/Overview
    const data = filteredIncidents.map(i => ({
      incidentId: i.id,
      createdAt: i.createdAt,
      updatedAt: i.updatedAt,
      studentId: i.student?.id || '',
      studentName: i.student?.name || '',
      category: i.category,
      severity: i.severity,
      status: i.status,
      ruleTitle: ruleList.find(r => r.id === i.ruleId)?.title || '',
      hearingAt: i.hearingAt || '',
      actions: i.actions.map(a => `${a.type}${a.amount ? `:₹${a.amount}` : ''}${a.durationDays ? `:${a.durationDays}d` : ''}`).join('|'),
      title: i.title,
    }));
    downloadCSV(`conduct_incidents_${dateStamp()}.csv`, data);
  };

  // Incident creation
  const openCreateIncident = () => {
    setIncidentForm({
      severity: 'Low',
      status: 'Open',
      category: 'Other',
      reportedBy: 'Warden',
      ruleId: ruleList?.id || 'R1',
    });
    setInitNote('');
    setOpenCreate(true);
  };

  const submitIncident = () => {
    if (!incidentForm.student || !incidentForm.title || !incidentForm.details || !incidentForm.category || !incidentForm.severity || !incidentForm.ruleId) {
      alert('Please fill all required fields (Student, Title, Details, Category, Severity, Rule).');
      return;
    }
    const now = new Date().toISOString();
    const inc: Incident = {
      id: `INC-${Math.floor(3000 + Math.random() * 9000)}`,
      createdAt: now,
      updatedAt: now,
      student: incidentForm.student!,
      ruleId: incidentForm.ruleId as string,
      category: incidentForm.category as RuleCategory,
      title: incidentForm.title!,
      details: incidentForm.details!,
      severity: incidentForm.severity as Severity,
      status: (incidentForm.status as Status) || 'Open',
      reportedBy: incidentForm.reportedBy || 'Warden',
      hearingAt: incidentForm.hearingAt || undefined,
      actions: [],
      notes: [{ at: now, actor: 'Warden', text: 'Incident created' }],
      attachments: [],
    };
    if (initNote.trim()) inc.notes.push({ at: now, actor: 'Warden', text: initNote.trim() });
    setIncidents(prev => [inc, ...prev]);
    setOpenCreate(false);
  };

  // Rules Manager helpers
  const [ruleSearch, setRuleSearch] = useState('');
  const [ruleCategoryFilter, setRuleCategoryFilter] = useState<'' | RuleCategory>('');

  const filteredRules = useMemo(() => {
    return ruleList
      .filter(r => !ruleCategoryFilter || r.category === ruleCategoryFilter)
      .filter(r => {
        const t = ruleSearch.trim().toLowerCase();
        if (!t) return true;
        const hay = [r.id, r.title, r.category, r.description].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [ruleList, ruleCategoryFilter, ruleSearch]);

  const openCreateRule = () => {
    setEditingRuleId(null);
    setRuleForm({ title: '', category: 'Other', description: '', active: true });
    setRuleModalOpen(true);
  };

  const openEditRule = (r: Rule) => {
    setEditingRuleId(r.id);
    setRuleForm({ ...r });
    setRuleModalOpen(true);
  };

  const saveRule = () => {
    if (!ruleForm.title?.trim() || !ruleForm.category || !ruleForm.description?.trim()) {
      alert('Please fill Title, Category, and Description');
      return;
    }
    if (editingRuleId) {
      setRuleList(prev => prev.map(r => (r.id === editingRuleId ? { ...(r as Rule), ...(ruleForm as Rule) } : r)));
    } else {
      const newRule: Rule = {
        id: `R-${Math.floor(100 + Math.random() * 900)}`,
        title: ruleForm.title!.trim(),
        category: ruleForm.category as RuleCategory,
        description: ruleForm.description!.trim(),
        active: ruleForm.active ?? true,
      };
      setRuleList(prev => [newRule, ...prev]);
    }
    setRuleModalOpen(false);
  };

  const toggleRuleActive = (id: string) => {
    setRuleList(prev => prev.map(r => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const deleteRule = (id: string) => {
    if (!confirm('Delete this rule?')) return;
    setRuleList(prev => prev.filter(r => r.id !== id));
  };

  // Renderers
  const renderOverview = () => {
    const cat = kpis.byCategory;
    const catList = Object.keys(cat) as RuleCategory[];
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Summary</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <KPI icon={<ClipboardList className="w-5 h-5" />} label="Total" value={kpis.total} tone="neutral" />
            <KPI icon={<AlertTriangle className="w-5 h-5" />} label="Open/Review" value={kpis.open} tone="danger" />
            <KPI icon={<Gavel className="w-5 h-5" />} label="Actioned" value={kpis.actioned} tone="warn" />
            <KPI icon={<CheckCircle2 className="w-5 h-5" />} label="Closed" value={kpis.closed} tone="success" />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
            New last 7 days: {kpis.last7} • Avg time to action: {kpis.avgActionHrs}h
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Category breakdown</p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {catList.map(c => (
              <li key={c} className="text-xs text-gray-700 dark:text-gray-300 flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                <span>{c}</span>
                <span className="font-semibold">{cat[c]}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
            <CalendarDays className="w-4 h-4" /> Configure rule texts to match official hostel policies before enforcement.
          </p>
        </div>
      </div>
    );
  };

  const renderIncidents = () => {
    const slice = filteredIncidents.slice(start, end);
    return (
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {slice.map(i => (
          <li key={i.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{i.title} • {i.id}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {(i.student?.name || 'Unknown')} ({i.student?.id || '—'}) • {i.student?.yearDept || '—'} • Room {i.student?.room || '—'}, Block {i.student?.block || '—'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{i.category}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  i.severity === 'Severe' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' :
                  i.severity === 'High' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                }`}>{i.severity}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  i.status === 'Closed' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                  i.status === 'Actioned' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                }`}>{i.status}</span>
              </div>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">{i.details}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">Reported by: {i.reportedBy}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Updated: {new Date(i.updatedAt).toLocaleString()}</span>
              {i.hearingAt && <span className="text-xs text-gray-600 dark:text-gray-400">Hearing: {i.hearingAt.replace('T',' ')}</span>}
            </div>
            {/* Quick actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => addNote(i.id)} className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1">
                <MessageSquare className="w-4 h-4" /> Note
              </button>
              <button onClick={() => scheduleHearing(i.id)} className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-xs flex items-center gap-1">
                <Users className="w-4 h-4" /> Schedule Hearing
              </button>
              <button onClick={() => actionIncident(i.id)} className="px-3 py-1.5 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-xs">
                Add Action
              </button>
              {i.status !== 'Closed' && (
                <button onClick={() => closeIncident(i.id)} className="px-3 py-1.5 rounded-md bg-gray-800 text-white hover:bg-black text-xs">Close</button>
              )}
            </div>
            {/* Notes & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Recent Notes</p>
                <ul className="mt-1 space-y-1 max-h-24 overflow-y-auto pr-1">
                  {[...i.notes].slice(-5).reverse().map((n, idx) => (
                    <li key={idx} className="text-xs text-gray-600 dark:text-gray-400">[{new Date(n.at).toLocaleString()}] {n.actor}: {n.text}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Actions</p>
                <ul className="mt-1 space-y-1 max-h-24 overflow-y-auto pr-1">
                  {i.actions.length === 0 && <li className="text-xs text-gray-500 dark:text-gray-400">No actions.</li>}
                  {i.actions.map(a => (
                    <li key={a.id} className="text-xs text-gray-600 dark:text-gray-400">
                      [{new Date(a.at).toLocaleString()}] {a.type} {a.amount ? `• ₹${a.amount}` : ''} {a.durationDays ? `• ${a.durationDays}d` : ''} {a.note ? `• ${a.note}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
        {slice.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No incidents found.</li>}
      </ul>
    );
  };

  const renderActions = () => {
    const rows: { i: Incident; a: ActionRecord }[] = [];
    filteredIncidents.forEach(i => i.actions.forEach(a => rows.push({ i, a })));
    const pageRows = rows.slice(start, end);
    return (
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {pageRows.map(({ i, a }) => (
          <li key={`${i.id}-${a.id}`} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm text-gray-800 dark:text-gray-100">{i.student?.name || 'Unknown'} ({i.student?.id || '—'}) • {i.category} • {a.type}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{new Date(a.at).toLocaleString()} • {i.id} • {a.note || '—'}</p>
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300">
              {a.amount ? `₹${a.amount.toLocaleString()} ` : ''}{a.durationDays ? `• ${a.durationDays}d` : ''}{a.effectiveUntil ? ` • until ${new Date(a.effectiveUntil).toLocaleDateString()}` : ''}
            </div>
          </li>
        ))}
        {pageRows.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No actions.</li>}
      </ul>
    );
  };

  const renderPenalties = () => {
    const list = penalties.slice(start, end);
    return (
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {list.map((p, idx) => (
          <li key={`${p.incidentId}-${idx}`} className="p-4 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm text-gray-800 dark:text-gray-100">{p.student.name} ({p.student.id}) • {p.category} • {p.action.type}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {p.action.amount ? `₹${p.action.amount.toLocaleString()} • ` : ''}{p.action.durationDays ? `${p.action.durationDays}d • ` : ''}From {p.action.effectiveFrom ? new Date(p.action.effectiveFrom).toLocaleDateString() : '—'}
                {p.action.effectiveUntil ? ` to ${new Date(p.action.effectiveUntil).toLocaleDateString()}` : ''}
              </p>
            </div>
            <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">Active</span>
          </li>
        ))}
        {list.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No active penalties.</li>}
      </ul>
    );
  };

  const renderAcknowledgements = () => {
    const list = acknowledgements.slice(start, end);
    return (
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {list.map((a, idx) => (
          <li key={`${a.incidentId}-${idx}`} className="p-4 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm text-gray-800 dark:text-gray-100">{a.student.name} ({a.student.id}) • {a.action.type}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{new Date(a.recordedAt).toLocaleString()} • {a.incidentId} • {a.action.note || '—'}</p>
            </div>
            <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Acknowledged</span>
          </li>
        ))}
        {list.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No acknowledgements.</li>}
      </ul>
    );
  };

  const renderRules = () => {
    const list = filteredRules.slice(start, end);
    return (
      <div>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              value={ruleSearch}
              onChange={e => setRuleSearch(e.target.value)}
              placeholder="Search rules by title/description..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
          </div>
          <div className="flex items-center gap-2">
            <select value={ruleCategoryFilter} onChange={e => setRuleCategoryFilter(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Category (All)</option>
              {['Curfew','Noise','Cleanliness','Vandalism','Harassment','Smoking/Alcohol','Electrical/Appliance','Visitors','Other'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={() => exportActive()} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm flex items-center gap-1">
              <Download className="w-4 h-4" /> Export Rules
            </button>
            <button onClick={openCreateRule} className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> New Rule
            </button>
          </div>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {list.map(r => (
            <li key={r.id} className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{r.title} • {r.id}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Category: {r.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${r.active ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}`}>
                    {r.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">{r.description}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button onClick={() => toggleRuleActive(r.id)} className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1">
                  {r.active ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />} {r.active ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => openEditRule(r)} className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-xs flex items-center gap-1">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => deleteRule(r.id)} className="px-3 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-xs flex items-center gap-1">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </li>
          ))}
          {list.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No rules found.</li>}
        </ul>
      </div>
    );
  };

  const headerTitle = () => {
    if (view === 'Overview') return 'Conduct Overview';
    if (view === 'Incidents') return 'Incidents';
    if (view === 'Actions') return 'Actions Taken';
    if (view === 'Penalties') return 'Active Penalties';
    if (view === 'Acknowledgements') return 'Acknowledgements';
    if (view === 'Rules') return 'Conduct Rules';
    return 'Conduct Overview';
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Conduct Report </h1>
        <p className="text-gray-600 dark:text-gray-400">Create and manage rules, incidents, actions, penalties, and acknowledgements.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPI icon={<ClipboardList className="w-5 h-5" />} label="Incidents" value={kpis.total} tone="neutral" />
        <KPI icon={<AlertTriangle className="w-5 h-5" />} label="Open/Review" value={kpis.open} tone="danger" />
        <KPI icon={<Gavel className="w-5 h-5" />} label="Actioned" value={kpis.actioned} tone="warn" />
        <KPI icon={<CheckCircle2 className="w-5 h-5" />} label="Closed" value={kpis.closed} tone="success" />
        <KPI icon={<ShieldCheck className="w-5 h-5" />} label="Avg Action (h)" value={kpis.avgActionHrs} tone="neutral" />
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by student/incident/title..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select value={view} onChange={e => setView(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>Overview</option>
              <option>Incidents</option>
              <option>Actions</option>
              <option>Penalties</option>
              <option>Acknowledgements</option>
              <option>Rules</option>
            </select>
            <select value={category} onChange={e => setCategory(e.target.value as RuleCategory | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Category (All)</option>
              {['Curfew','Noise','Cleanliness','Vandalism','Harassment','Smoking/Alcohol','Electrical/Appliance','Visitors','Other'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={severity} onChange={e => setSeverity(e.target.value as Severity | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Severity (All)</option>
              {['Low','Moderate','High','Severe'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={status} onChange={e => setStatus(e.target.value as Status | '')} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Status (All)</option>
              {['Open','Under Review','Actioned','Closed'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <input type="date" value={to} onChange={e => setTo(e.target.value)} className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <button onClick={exportActive} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm flex items-center gap-1">
              <Download className="w-4 h-4" /> Export View
            </button>
            <button onClick={openCreateIncident} className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> New Incident
            </button>
            <button onClick={() => setView('Overview')} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{headerTitle()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Mobile-first • Dark-mode ready</p>
        </div>
        <div className="p-0">
          {view === 'Overview' && renderOverview()}
          {view === 'Incidents' && renderIncidents()}
          {view === 'Actions' && renderActions()}
          {view === 'Penalties' && renderPenalties()}
          {view === 'Acknowledgements' && renderAcknowledgements()}
          {view === 'Rules' && renderRules()}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {total === 0 ? 0 : start + 1}-{Math.min(end, total)} of {total}</p>
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

      {/* Create Incident Modal */}
      {openCreate && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setOpenCreate(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">New Incident</h3>
                <button onClick={() => setOpenCreate(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Student</label>
                  <select
                    value={incidentForm.student?.id || ''}
                    onChange={e => setIncidentForm(f => ({ ...f, student: students.find(s => s.id === e.target.value)! }))}
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select student</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    value={incidentForm.category || 'Other'}
                    onChange={e => setIncidentForm(f => ({ ...f, category: e.target.value as RuleCategory }))}
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {['Curfew','Noise','Cleanliness','Vandalism','Harassment','Smoking/Alcohol','Electrical/Appliance','Visitors','Other'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Severity</label>
                  <select
                    value={incidentForm.severity || 'Low'}
                    onChange={e => setIncidentForm(f => ({ ...f, severity: e.target.value as Severity }))}
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {['Low','Moderate','High','Severe'].map(sv => <option key={sv} value={sv}>{sv}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Rule</label>
                  <select
                    value={incidentForm.ruleId || ruleList?.id || ''}
                    onChange={e => setIncidentForm(f => ({ ...f, ruleId: e.target.value }))}
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {ruleList.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input value={incidentForm.title || ''} onChange={e => setIncidentForm(f => ({ ...f, title: e.target.value }))} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Details</label>
                  <textarea rows={4} value={incidentForm.details || ''} onChange={e => setIncidentForm(f => ({ ...f, details: e.target.value }))} className="w-full form-textarea dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Initial Note (optional)</label>
                  <input value={initNote} onChange={e => setInitNote(e.target.value)} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end gap-3">
                <button onClick={() => setOpenCreate(false)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">Cancel</button>
                <button onClick={submitIncident} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rule Modal */}
      {ruleModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setRuleModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w/full max-w-2xl max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{editingRuleId ? 'Edit Rule' : 'New Rule'}</h3>
                <button onClick={() => setRuleModalOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input value={ruleForm.title || ''} onChange={e => setRuleForm(f => ({ ...f, title: e.target.value }))} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select value={ruleForm.category || 'Other'} onChange={e => setRuleForm(f => ({ ...f, category: e.target.value as RuleCategory }))} className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {['Curfew','Noise','Cleanliness','Vandalism','Harassment','Smoking/Alcohol','Electrical/Appliance','Visitors','Other'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Active</label>
                  <select value={String(ruleForm.active ?? true)} onChange={e => setRuleForm(f => ({ ...f, active: e.target.value === 'true' }))} className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea rows={4} value={ruleForm.description || ''} onChange={e => setRuleForm(f => ({ ...f, description: e.target.value }))} className="w-full form-textarea dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end gap-3">
                <button onClick={() => setRuleModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">Cancel</button>
                <button onClick={saveRule} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy note */}
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2">
        <FileText className="w-4 h-4 mt-0.5" />
        Align all rules with the official hostel Code of Conduct; wardens may amend rules via the Rules tab and export versions for circulation.
      </p>
    </div>
  );
};

// KPI card
const KPI: React.FC<{ icon: React.ReactNode; label: string; value: number; tone?: 'neutral'|'success'|'danger'|'warn' }> = ({ icon, label, value, tone='neutral' }) => {
  const toneCls =
    tone === 'success' ? 'text-green-600 dark:text-green-300' :
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

export default ConductReport;
