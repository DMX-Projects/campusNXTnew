// src/WardenModules/Hostel/OccupencyAndFeesReport.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Filter, Search, Download, Home, Users, AlertTriangle, IndianRupee, ChevronLeft, ChevronRight, RefreshCw, CheckCircle2, Clock } from 'lucide-react';

// Data models
type RoomType = 'Double' | 'Triple' | 'Quad' | 'Single';
type FeeStatus = 'Paid' | 'Partial' | 'Due' | 'Overdue' | 'Waived';

interface Room {
  id: string;
  block: string;
  floor: number;
  type: RoomType;
  capacity: number;
  occupied: number;
}

interface Occupant {
  id: string;
  name: string;
  yearDept: string;
  roomId: string;
  joinDate: string;
  exitDate?: string;
}

interface FeeLine {
  id: string;
  studentId: string;
  studentName: string;
  roomId: string;
  month: string;         // YYYY-MM
  baseFee: number;       // monthly fee
  lateFine?: number;     // e.g., Rs 100/day after due
  overstayFine?: number; // policy-based overstay fine
  paid: number;
  status: FeeStatus;
  dueDate: string;       // YYYY-MM-DD
  paidAt?: string;
  notes?: string;
}

// Demo data
const roomsSeed: Room[] = [
  { id: 'A-101', block: 'A', floor: 1, type: 'Double', capacity: 2, occupied: 2 },
  { id: 'A-102', block: 'A', floor: 1, type: 'Double', capacity: 2, occupied: 1 },
  { id: 'B-201', block: 'B', floor: 2, type: 'Triple', capacity: 3, occupied: 3 },
  { id: 'C-303', block: 'C', floor: 3, type: 'Single', capacity: 1, occupied: 1 },
];

const occupantsSeed: Occupant[] = [
  { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st - CSE', roomId: 'A-101', joinDate: '2025-07-01' },
  { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd - CSE', roomId: 'A-101', joinDate: '2025-07-01' },
  { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st - CE', roomId: 'B-201', joinDate: '2025-07-01' },
  { id: 'ST1402', name: 'Sahil Jain', yearDept: '2nd - ME', roomId: 'C-303', joinDate: '2025-07-01' },
];

const feesSeed: FeeLine[] = [
  { id: 'F-0001', studentId: 'ST2099', studentName: 'Neha Gupta', roomId: 'A-101', month: '2025-08', baseFee: 3500, lateFine: 0, overstayFine: 0, paid: 3500, status: 'Paid', dueDate: '2025-08-10', paidAt: '2025-08-05' },
  { id: 'F-0002', studentId: 'ST1501', studentName: 'Kiran Joshi', roomId: 'A-101', month: '2025-08', baseFee: 3500, lateFine: 100, overstayFine: 0, paid: 0, status: 'Overdue', dueDate: '2025-08-10', notes: 'Late fine Rs 100/day from 11th' },
  { id: 'F-0003', studentId: 'ST1201', studentName: 'Zoya Khan', roomId: 'B-201', month: '2025-08', baseFee: 3000, lateFine: 0, overstayFine: 0, paid: 1500, status: 'Partial', dueDate: '2025-08-10' },
  { id: 'F-0004', studentId: 'ST1402', studentName: 'Sahil Jain', roomId: 'C-303', month: '2025-08', baseFee: 4000, lateFine: 0, overstayFine: 0, paid: 0, status: 'Due', dueDate: '2025-08-10' },
];

// CSV helpers
const toCSV = (rows: Record<string, any>[]) => {
  if (!rows.length) return '';
  const headers = Object.keys(rows);
  const cell = (v: any) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
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

const OccupencyAndFeesReport: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(roomsSeed);
  const [occupants, setOccupants] = useState<Occupant[]>(occupantsSeed);
  const [fees, setFees] = useState<FeeLine[]>(feesSeed);

  // Filters
  const [search, setSearch] = useState('');
  const [block, setBlock] = useState('');
  const [feeStatus, setFeeStatus] = useState<''|'Paid'|'Partial'|'Due'|'Overdue'|'Waived'>('');
  const [month, setMonth] = useState('');
  const [showVacantOnly, setShowVacantOnly] = useState(false);

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [search, block, feeStatus, month, showVacantOnly]);

  // KPIs
  const kpi = useMemo(() => {
    const totalBeds = rooms.reduce((s, r) => s + r.capacity, 0);
    const occupiedBeds = rooms.reduce((s, r) => s + r.occupied, 0);
    const vacantBeds = totalBeds - occupiedBeds;
    const occupancyPct = totalBeds ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

    const totalDue = fees.filter(f => f.status === 'Due' || f.status === 'Overdue' || f.status === 'Partial')
      .reduce((s, f) => s + Math.max(0, (f.baseFee + (f.lateFine || 0) + (f.overstayFine || 0) - f.paid)), 0);

    return { totalBeds, occupiedBeds, vacantBeds, occupancyPct, totalDue };
  }, [rooms, fees]);

  // Derived rooms list
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(r => !block || r.block === block)
      .filter(r => !showVacantOnly || r.occupied < r.capacity)
      .filter(r => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        return [r.id, r.block, r.type].join(' ').toLowerCase().includes(t);
      })
      .sort((a,b) => a.block.localeCompare(b.block) || a.floor - b.floor || a.id.localeCompare(b.id));
  }, [rooms, block, showVacantOnly, search]);

  // Derived fees list
  const filteredFees = useMemo(() => {
    return fees
      .filter(f => !feeStatus || f.status === feeStatus)
      .filter(f => !month || f.month === month)
      .filter(f => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        return [f.studentId, f.studentName, f.roomId, f.month, f.status].join(' ').toLowerCase().includes(t);
      })
      .sort((a,b) => b.month.localeCompare(a.month) || a.studentId.localeCompare(b.studentId));
  }, [fees, feeStatus, month, search]);

  // Exporters
  const exportRooms = () => {
    const data = filteredRooms.map(r => ({ id: r.id, block: r.block, floor: r.floor, type: r.type, capacity: r.capacity, occupied: r.occupied, vacant: r.capacity - r.occupied }));
    downloadCSV(`rooms_${dateStamp()}.csv`, data);
  };
  const exportFees = () => {
    const data = filteredFees.map(f => ({
      id: f.id, studentId: f.studentId, studentName: f.studentName, roomId: f.roomId, month: f.month,
      baseFee: f.baseFee, lateFine: f.lateFine || 0, overstayFine: f.overstayFine || 0, paid: f.paid, status: f.status, dueDate: f.dueDate, paidAt: f.paidAt || '', notes: f.notes || ''
    }));
    downloadCSV(`fees_${dateStamp()}.csv`, data);
  };

  // Fee actions
  const markPaid = (id: string) => {
    setFees(prev => prev.map(f => f.id === id ? { ...f, paid: f.baseFee + (f.lateFine||0) + (f.overstayFine||0), status: 'Paid', paidAt: new Date().toISOString() } : f));
  };
  const addLateFine = (id: string) => {
    const v = Number(prompt('Late fine amount (Rs):', '100') || '0');
    if (Number.isNaN(v) || v < 0) return;
    setFees(prev => prev.map(f => f.id === id ? { ...f, lateFine: (f.lateFine||0) + v } : f));
  };
  const waive = (id: string) => {
    if (!confirm('Waive remaining dues?')) return;
    setFees(prev => prev.map(f => f.id === id ? { ...f, status: 'Waived', notes: 'Waived by Warden', lateFine: 0, overstayFine: 0 } : f));
  };

  // Helpers
  function dateStamp() { const d=new Date(); const pad=(n:number)=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}`; }

  // UI
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Occupancy & Fees </h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor occupancy, vacancies, and fee dues/fines with exports and quick actions.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPI icon={<Home className="w-5 h-5" />} label="Beds" value={kpi.totalBeds} tone="neutral" />
        <KPI icon={<Users className="w-5 h-5" />} label="Occupied" value={kpi.occupiedBeds} tone="success" />
        <KPI icon={<AlertTriangle className="w-5 h-5" />} label="Vacant" value={kpi.vacantBeds} tone="warn" />
        <KPI icon={<IndianRupee className="w-5 h-5" />} label="Due (Rs)" value={kpi.totalDue} tone="danger" />
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by room/student..." className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select value={block} onChange={e=>setBlock(e.target.value)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Block (All)</option>
              {Array.from(new Set(rooms.map(r=>r.block))).map(b=><option key={b}>{b}</option>)}
            </select>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input type="checkbox" checked={showVacantOnly} onChange={e=>setShowVacantOnly(e.target.checked)} />
              Vacant only
            </label>
            <select value={feeStatus} onChange={e=>setFeeStatus(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Fee Status (All)</option>
              {['Paid','Partial','Due','Overdue','Waived'].map(s=><option key={s}>{s}</option>)}
            </select>
            <input type="month" value={month} onChange={e=>setMonth(e.target.value)} className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <button onClick={() => { setSearch(''); setBlock(''); setFeeStatus(''); setMonth(''); setShowVacantOnly(false); }} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1">
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
            <button onClick={exportRooms} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Rooms</button>
            <button onClick={exportFees} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Fees</button>
          </div>
        </div>
      </div>

      {/* Rooms list */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Rooms</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Dark-mode • Responsive</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredRooms.slice((page-1)*pageSize, (page-1)*pageSize + pageSize).map(r => (
            <li key={r.id} className="p-4 flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{r.id} • Block {r.block} • Floor {r.floor}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{r.type} • Capacity {r.capacity} • Occupied {r.occupied} • Vacant {r.capacity - r.occupied}</p>
              </div>
              <span className={`px-2 py-0.5 text-xs rounded-full ${r.occupied < r.capacity ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'}`}>
                {r.occupied < r.capacity ? 'Vacancy' : 'Full'}
              </span>
            </li>
          ))}
          {filteredRooms.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No rooms.</li>}
        </ul>
      </div>

      {/* Fees list */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Fees</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Actions: Mark Paid, Add Late Fine, Waive</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredFees.slice((page-1)*pageSize, (page-1)*pageSize + pageSize).map(f => {
            const remaining = Math.max(0, (f.baseFee + (f.lateFine||0) + (f.overstayFine||0) - f.paid));
            return (
              <li key={f.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 dark:text-gray-100">{f.studentName} ({f.studentId}) • {f.roomId} • {f.month}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Due: {f.dueDate} • Paid: {f.paidAt ? new Date(f.paidAt).toLocaleDateString() : '—'} • Notes: {f.notes || '—'}</p>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-2 flex-wrap">
                  <span>Fee: ₹{f.baseFee}</span>
                  {f.lateFine ? <span>Late: ₹{f.lateFine}</span> : null}
                  {f.overstayFine ? <span>Overstay: ₹{f.overstayFine}</span> : null}
                  <span>Paid: ₹{f.paid}</span>
                  <span className={`px-2 py-0.5 rounded-full ${f.status==='Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : f.status==='Overdue' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'}`}>{f.status}</span>
                  <span className="font-semibold">Remain: ₹{remaining}</span>
                  <button onClick={() => markPaid(f.id)} className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700">Mark Paid</button>
                  <button onClick={() => addLateFine(f.id)} className="px-2 py-1 rounded bg-amber-600 text-white hover:bg-amber-700">Add Late</button>
                  <button onClick={() => waive(f.id)} className="px-2 py-1 rounded bg-gray-800 text-white hover:bg-black">Waive</button>
                </div>
              </li>
            );
          })}
          {filteredFees.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No fees found.</li>}
        </ul>
      </div>

      {/* Pager */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {(page-1)*pageSize+1}-{Math.min(page*pageSize, Math.max(filteredRooms.length, filteredFees.length))} of {Math.max(filteredRooms.length, filteredFees.length)}</p>
        <div className="inline-flex -space-x-px">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-3 h-9 border border-gray-300 rounded-s-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"><ChevronLeft className="w-4 h-4"/></button>
          <button onClick={()=>setPage(p=>p+1)} className="px-3 h-9 border border-gray-300 rounded-e-md bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"><ChevronRight className="w-4 h-4"/></button>
        </div>
      </div>
    </div>
  );
};

const KPI: React.FC<{ icon: React.ReactNode; label: string; value: number; tone?: 'neutral'|'success'|'warn'|'danger' }> = ({ icon, label, value, tone='neutral' }) => {
  const toneCls = tone==='success' ? 'text-green-600 dark:text-green-300' : tone==='warn' ? 'text-amber-600 dark:text-amber-300' : tone==='danger' ? 'text-rose-600 dark:text-rose-300' : 'text-indigo-600 dark:text-indigo-300';
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

export default OccupencyAndFeesReport;