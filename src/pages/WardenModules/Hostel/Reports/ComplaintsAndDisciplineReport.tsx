// src/WardenModules/Hostel/ComplaintsAndDisciplineReport.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Filter, Search, Download, Wrench, AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Gavel, Scale, CalendarDays, RefreshCw } from 'lucide-react';

// Models
type ComplaintType = 'Electrical' | 'Plumbing' | 'Carpentry' | 'WiFi/Network' | 'Housekeeping' | 'Other';
type ComplaintStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Escalated';
type Severity = 'Low' | 'Moderate' | 'High' | 'Severe';
type DiscStatus = 'Open' | 'Under Review' | 'Actioned' | 'Closed';
type ActionType = 'Warning' | 'Counseling' | 'Fine' | 'Community Service' | 'Suspension' | 'Eviction';

interface StudentRef { id: string; name: string; yearDept: string; room?: string; block?: string; }
interface Complaint {
  id: string; createdAt: string; updatedAt: string;
  student: StudentRef; type: ComplaintType; title: string; details: string; status: ComplaintStatus; severity: Severity;
  assignedTo?: string; slaHrs?: number; closedAt?: string; notes: Array<{ at: string; actor: string; text: string }>;
}

interface DiscAction { id: string; at: string; actor: string; type: ActionType; amount?: number; durationDays?: number; note?: string; }
interface Discipline {
  id: string; createdAt: string; updatedAt: string;
  student: StudentRef; category: string; title: string; details: string; severity: Severity; status: DiscStatus; reportedBy: string;
  actions: DiscAction[]; notes: Array<{ at: string; actor: string; text: string }>;
}

// Demo data
const students: StudentRef[] = [
  { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st - CSE', room: '101', block: 'A' },
  { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd - CSE', room: '202', block: 'B' },
  { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st - CE', room: '303', block: 'C' },
];

// FIXED seeds: valid student assignments
const complaintsSeed: Complaint[] = [
  { id: 'CM-7001', createdAt: new Date(Date.now() - 36e5*30).toISOString(), updatedAt: new Date(Date.now() - 36e5*5).toISOString(), student: students, type: 'Electrical', title: 'Tube light not working', details: 'Room light flickers and goes off.', status: 'In Progress', severity: 'Moderate', assignedTo: 'Electrician', slaHrs: 24, notes: [{ at: new Date(Date.now() - 36e5*30).toISOString(), actor: 'Student', text: 'Reported' }] },
  { id: 'CM-7002', createdAt: new Date(Date.now() - 36e5*60).toISOString(), updatedAt: new Date(Date.now() - 36e5*55).toISOString(), student: students[6], type: 'WiFi/Network', title: 'WiFi down', details: 'No connectivity since last night', status: 'Resolved', severity: 'High', assignedTo: 'Network', slaHrs: 12, closedAt: new Date(Date.now()-36e5*50).toISOString(), notes: [{ at: new Date(Date.now() - 36e5*60).toISOString(), actor: 'Student', text: 'Reported' }] },
];

const disciplineSeed: Discipline[] = [
  { id: 'DC-3002', createdAt: new Date(Date.now() - 36e5*100).toISOString(), updatedAt: new Date(Date.now() - 36e5*10).toISOString(), student: students[7], category: 'Noise', title: 'Loud music after hours', details: 'Disturbance reported by neighbors', severity: 'Low', status: 'Actioned', reportedBy: 'Warden', notes: [{ at: new Date(Date.now() - 36e5*100).toISOString(), actor: 'Warden', text: 'Logged' }], actions: [{ id: 'ACT-20', at: new Date(Date.now()-36e5*20).toISOString(), actor: 'Warden', type: 'Counseling', note: 'Counseling done' }] },
];

// CSV helpers — FIXED headers from first row
const toCSV = (rows: Record<string, any>[]) => {
  if (!rows.length) return '';
  const headers = Object.keys(rows);
  const cell = (v: any) => { const s = v==null ? '' : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s; };
  return [headers.join(','), ...rows.map(r => headers.map(h => cell(r[h])).join(','))].join('\n');
};
const downloadCSV = (fn: string, rows: Record<string, any>[]) => { const csv=toCSV(rows); const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=fn; a.click(); setTimeout(()=>URL.revokeObjectURL(url),500); };
const stamp = () => { const d=new Date(); const p=(n:number)=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}`; };

const ComplaintsAndDisciplineReport: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(complaintsSeed);
  const [discipline, setDiscipline] = useState<Discipline[]>(disciplineSeed);

  // Filters
  const [search, setSearch] = useState('');
  const [ctype, setCtype] = useState<''|ComplaintType>('');
  const [cstatus, setCstatus] = useState<''|ComplaintStatus>('');
  const [dstatus, setDstatus] = useState<''|DiscStatus>('');
  const [severity, setSeverity] = useState<''|'Low'|'Moderate'|'High'|'Severe'>('');

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(()=>setPage(1),[search,ctype,cstatus,dstatus,severity]);

  // Derived lists with guards
  const filteredComplaints = useMemo(()=> {
    return complaints
      .filter(c => c.student) // guard
      .filter(c => !ctype || c.type === ctype)
      .filter(c => !cstatus || c.status === cstatus)
      .filter(c => !severity || c.severity === severity)
      .filter(c => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        return [c.id,c.title,c.details,c.student?.name || '',c.student?.id || '',c.type,c.status].join(' ').toLowerCase().includes(t);
      })
      .sort((a,b)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [complaints, ctype, cstatus, severity, search]);

  const filteredDiscipline = useMemo(()=> {
    return discipline
      .filter(d => d.student) // guard
      .filter(d => !dstatus || d.status === dstatus)
      .filter(d => !severity || d.severity === severity)
      .filter(d => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        return [d.id,d.title,d.details,d.student?.name || '',d.student?.id || '',d.category,d.status].join(' ').toLowerCase().includes(t);
      })
      .sort((a,b)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [discipline, dstatus, severity, search]);

  // KPIs
  const kpi = useMemo(()=> {
    const compOpen = filteredComplaints.filter(c=>c.status==='Open' || c.status==='In Progress').length;
    const compResolved = filteredComplaints.filter(c=>c.status==='Resolved' || c.status==='Closed').length;
    const discOpen = filteredDiscipline.filter(d=>d.status==='Open' || d.status==='Under Review').length;
    const discActioned = filteredDiscipline.filter(d=>d.status==='Actioned' || d.status==='Closed').length;
    return { compOpen, compResolved, discOpen, discActioned };
  }, [filteredComplaints, filteredDiscipline]);

  // Complaint actions
  const escalate = (id: string) => {
    setComplaints(prev => prev.map(c => c.id===id ? { ...c, status: 'Escalated', updatedAt: new Date().toISOString(), notes: [...c.notes, { at: new Date().toISOString(), actor: 'Warden', text: 'Escalated to higher authority' }] } : c));
  };
  const closeComplaint = (id: string) => {
    setComplaints(prev => prev.map(c => c.id===id ? { ...c, status: 'Closed', closedAt: new Date().toISOString(), updatedAt: new Date().toISOString(), notes: [...c.notes, { at: new Date().toISOString(), actor: 'Warden', text: 'Closed' }] } : c));
  };

  // Discipline actions
  const addAction = (id: string) => {
    const type = (prompt('Action (Warning/Counseling/Fine/Community Service/Suspension/Eviction):','Warning')||'Warning') as ActionType;
    let amount: number|undefined; let durationDays: number|undefined;
    if (type==='Fine') amount = Number(prompt('Fine amount (Rs):','500')||'0');
    if (type==='Community Service' || type==='Suspension') durationDays = Number(prompt('Duration days:','7')||'0');
    const note = prompt('Action note:') || undefined;
    setDiscipline(prev => prev.map(d => d.id===id ? { ...d, status: d.status==='Open'?'Under Review':'Actioned', updatedAt: new Date().toISOString(), actions: [...d.actions, { id: `ACT-${Math.floor(1000+Math.random()*9000)}`, at: new Date().toISOString(), actor: 'Warden', type, amount, durationDays, note }] } : d));
  };
  const closeCase = (id: string) => {
    setDiscipline(prev => prev.map(d => d.id===id ? { ...d, status: 'Closed', updatedAt: new Date().toISOString() } : d));
  };

  // Exports
  const exportComplaints = () => {
    const data = filteredComplaints.map(c=>({ id: c.id, type: c.type, title: c.title, studentId: c.student?.id || '', studentName: c.student?.name || '', severity: c.severity, status: c.status, assignedTo: c.assignedTo||'', slaHrs: c.slaHrs||'', createdAt: c.createdAt, updatedAt: c.updatedAt }));
    downloadCSV(`complaints_${stamp()}.csv`, data);
  };
  const exportDiscipline = () => {
    const data = filteredDiscipline.map(d=>({ id: d.id, cat: d.category, title: d.title, studentId: d.student?.id || '', studentName: d.student?.name || '', severity: d.severity, status: d.status, actions: d.actions.map(a=>a.type).join('|'), createdAt: d.createdAt, updatedAt: d.updatedAt }));
    downloadCSV(`discipline_${stamp()}.csv`, data);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Complaints & Discipline </h1>
        <p className="text-gray-600 dark:text-gray-400">Track maintenance complaints and discipline cases, apply actions, escalate, and export data.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <KPI icon={<Wrench className="w-5 h-5" />} label="Complaints Open" value={kpi.compOpen} />
        <KPI icon={<CheckCircle2 className="w-5 h-5" />} label="Complaints Done" value={kpi.compResolved} />
        <KPI icon={<Gavel className="w-5 h-5" />} label="Discipline Open" value={kpi.discOpen} />
        <KPI icon={<Scale className="w-5 h-5" />} label="Discipline Actioned" value={kpi.discActioned} />
      </div>

      {/* Filters */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by student/title/case..." className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select value={ctype} onChange={e=>setCtype(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Type (All)</option>
              {['Electrical','Plumbing','Carpentry','WiFi/Network','Housekeeping','Other'].map(t=><option key={t}>{t}</option>)}
            </select>
            <select value={cstatus} onChange={e=>setCstatus(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">C Status (All)</option>
              {['Open','In Progress','Resolved','Closed','Escalated'].map(s=><option key={s}>{s}</option>)}
            </select>
            <select value={dstatus} onChange={e=>setDstatus(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">D Status (All)</option>
              {['Open','Under Review','Actioned','Closed'].map(s=><option key={s}>{s}</option>)}
            </select>
            <select value={severity} onChange={e=>setSeverity(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Severity (All)</option>
              {['Low','Moderate','High','Severe'].map(s=><option key={s}>{s}</option>)}
            </select>
            <button onClick={()=>{setSearch('');setCtype('');setCstatus('');setDstatus('');setSeverity('')}} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"><RefreshCw className="w-4 h-4 inline mr-1" /> Reset</button>
            <button onClick={exportComplaints} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm"><Download className="w-4 h-4 inline mr-1" /> Export Complaints</button>
            <button onClick={exportDiscipline} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm"><Download className="w-4 h-4 inline mr-1" /> Export Discipline</button>
          </div>
        </div>
      </div>

      {/* Complaints list */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Maintenance Complaints</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><CalendarDays className="w-4 h-4" /> SLA tracked</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredComplaints.slice((page-1)*pageSize, (page-1)*pageSize + pageSize).map(c => (
            <li key={c.id} className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{c.title} • {c.id}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{c.student?.name || 'Unknown'} ({c.student?.id || '—'}) • {c.student?.yearDept || '—'} • Room {c.student?.room || '—'}, Block {c.student?.block || '—'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{c.type}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    c.status==='Closed' || c.status==='Resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                    c.status==='Escalated' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' :
                    'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                  }`}>{c.status}</span>
                </div>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">{c.details}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span>Assigned: {c.assignedTo || '—'}</span>
                <span>SLA: {c.slaHrs ? `${c.slaHrs}h` : '—'}</span>
                <span>Updated: {new Date(c.updatedAt).toLocaleString()}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button onClick={()=>escalate(c.id)} className="px-3 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-xs">Escalate</button>
                {c.status!=='Closed' && <button onClick={()=>closeComplaint(c.id)} className="px-3 py-1.5 rounded-md bg-gray-800 text-white hover:bg-black text-xs">Close</button>}
              </div>
            </li>
          ))}
          {filteredComplaints.length===0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No complaints.</li>}
        </ul>
      </section>

      {/* Discipline list */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Discipline Cases</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Actions & penalties</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredDiscipline.slice((page-1)*pageSize, (page-1)*pageSize + pageSize).map(d => (
            <li key={d.id} className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{d.title} • {d.id}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{d.student?.name || 'Unknown'} ({d.student?.id || '—'}) • {d.student?.yearDept || '—'} • Room {d.student?.room || '—'}, Block {d.student?.block || '—'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{d.category}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    d.status==='Closed' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                    d.status==='Actioned' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' :
                    'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                  }`}>{d.status}</span>
                </div>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">{d.details}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="text-gray-600 dark:text-gray-400">
                  <p className="font-semibold">Recent Notes</p>
                  <ul className="mt-1 space-y-1 max-h-20 overflow-y-auto">
                    {[...d.notes].slice(-4).reverse().map((n,idx)=><li key={idx}>[{new Date(n.at).toLocaleString()}] {n.actor}: {n.text}</li>)}
                  </ul>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <p className="font-semibold">Actions</p>
                  <ul className="mt-1 space-y-1 max-h-20 overflow-y-auto">
                    {d.actions.length===0 && <li>None</li>}
                    {d.actions.map(a => <li key={a.id}>[{new Date(a.at).toLocaleString()}] {a.type} {a.amount?`• ₹${a.amount}`:''} {a.durationDays?`• ${a.durationDays}d`:''} {a.note?`• ${a.note}`:''}</li>)}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button onClick={()=>addAction(d.id)} className="px-3 py-1.5 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-xs">Add Action</button>
                {d.status!=='Closed' && <button onClick={()=>closeCase(d.id)} className="px-3 py-1.5 rounded-md bg-gray-800 text-white hover:bg-black text-xs">Close</button>}
              </div>
            </li>
          ))}
          {filteredDiscipline.length===0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No discipline cases.</li>}
        </ul>
      </section>

      {/* Pager */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Page {page}</p>
        <div className="inline-flex -space-x-px">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-3 h-9 border border-gray-300 rounded-s-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={()=>setPage(p=>p+1)} className="px-3 h-9 border border-gray-300 rounded-e-md bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};

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

export default ComplaintsAndDisciplineReport;
