// src/components/finance/FeeCollection.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronLeft, ChevronRight, Mail, Banknote, Receipt, CalendarDays } from 'lucide-react';

type FeeHead = 'Tuition' | 'Hostel' | 'Mess' | 'Library' | 'Exam' | 'SecurityDeposit';
type PaymentMode = 'Online' | 'UPI' | 'Card' | 'NetBanking' | 'Cash' | 'Cheque/DD';

interface StudentRef { id: string; name: string; yearDept: string; }
interface TermFeeHead { head: FeeHead; amount: number; }
interface TermStructure { id: string; name: string; dueDate: string; heads: TermFeeHead[]; }
interface Concession { type: 'Scholarship' | 'Concession' | 'Waiver'; head?: FeeHead; amount?: number; percent?: number; reason?: string; }
interface InvoiceLine { head: FeeHead; termId: string; termName: string; original: number; concession: number; fine: number; payable: number; paid: number; }
interface StudentInvoice { id: string; student: StudentRef; lines: InvoiceLine[]; concessions: Concession[]; createdAt: string; lastUpdatedAt: string; }
interface Payment { id: string; invoiceId: string; studentId: string; amount: number; mode: PaymentMode; txnRef?: string; paidAt: string; breakdown: Array<{ head: FeeHead; termId: string; amount: number }>; note?: string; }

/* Demo term structure with common hostel dues */
const termStructures: TermStructure[] = [
  { id: 'TERM-1', name: 'Hostel Term 1 (2025-26)', dueDate: new Date(Date.now() + 1000*60*60*24*7).toISOString().slice(0,10), heads: [
    { head: 'Hostel', amount: 30000 }, { head: 'Mess', amount: 12000 }, { head: 'SecurityDeposit', amount: 5000 },
  ]},
  { id: 'TERM-2', name: 'Hostel Term 2 (2025-26)', dueDate: new Date(Date.now() + 1000*60*60*24*90).toISOString().slice(0,10), heads: [
    { head: 'Hostel', amount: 30000 }, { head: 'Mess', amount: 12000 },
  ]},
];


/* Demo dataset: multiple hostel students */
const demoStudents: StudentRef[] = [
  { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE' },
  { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE' },
  { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE' },
  { id: 'ST1402', name: 'Sahil Jain', yearDept: '2nd Year - ME' },
];

const initialInvoices: StudentInvoice[] = [
  { 
    id: 'INV-1001', 
    student: demoStudents[0],  // Neha Gupta
    concessions: [{ type: 'Concession', head: 'Hostel', amount: 2000, reason: 'Sibling' }],
    lines: [], 
    createdAt: new Date(Date.now()-36e5*24).toISOString(), 
    lastUpdatedAt: new Date(Date.now()-36e5*24).toISOString() 
  },
  { 
    id: 'INV-1002', 
    student: demoStudents[1],  // Kiran Joshi
    concessions: [], 
    lines: [], 
    createdAt: new Date(Date.now()-36e5*20).toISOString(), 
    lastUpdatedAt: new Date(Date.now()-36e5*20).toISOString() 
  },
  { 
    id: 'INV-1003', 
    student: demoStudents[2],  // Zoya Khan
    concessions: [], 
    lines: [], 
    createdAt: new Date(Date.now()-36e5*12).toISOString(), 
    lastUpdatedAt: new Date(Date.now()-36e5*12).toISOString() 
  },
  { 
    id: 'INV-1004', 
    student: demoStudents[3],  // Sahil Jain
    concessions: [{ type: 'Scholarship', head: 'Mess', percent: 25, reason: 'Aid' }],
    lines: [], 
    createdAt: new Date(Date.now()-36e5*10).toISOString(), 
    lastUpdatedAt: new Date(Date.now()-36e5*10).toISOString() 
  },
];


const initialPayments: Payment[] = [
  { id: 'RCPT-9001', invoiceId: 'INV-1001', studentId: 'ST2099', amount: 15000, mode: 'UPI', txnRef: 'UPI-NEHA-001', paidAt: new Date(Date.now()-36e5*6).toISOString(), breakdown: [
    { head: 'Hostel', termId: 'TERM-1', amount: 10000 }, { head: 'Mess', termId: 'TERM-1', amount: 5000 },
  ], note: 'Part payment' },
  { id: 'RCPT-9002', invoiceId: 'INV-1002', studentId: 'ST1501', amount: 12000, mode: 'Card', paidAt: new Date(Date.now()-36e5*3).toISOString(), breakdown: [
    { head: 'Mess', termId: 'TERM-1', amount: 12000 },
  ]},
];

type SortBy = 'latest' | 'balance' | 'name';
type Props = { onOpenStudent?: (studentId: string) => void };

const FeeCollection: React.FC<Props> = ({ onOpenStudent }) => {
    const navigate = useNavigate()
  const [invoices, setInvoices] = useState<StudentInvoice[]>(initialInvoices);
  const [payments] = useState<Payment[]>(initialPayments);

  // Filters
  const [search, setSearch] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [onlyDue, setOnlyDue] = useState<'All'|'DueOnly'>('All');
  const [sortBy, setSortBy] = useState<SortBy>('latest');

  // Pagination
  const pageSize = 10;
  
  const [page, setPage] = useState(1);
  useEffect(()=>{ setPage(1); }, [search, filterTerm, onlyDue, sortBy]);

  // Compute invoice lines (late fine demo: ₹50/day capped ₹2,000)
  const compute = (inv: StudentInvoice): StudentInvoice => {
    const dueMap = Object.fromEntries(termStructures.map(t => [t.id, t.dueDate]));
    const lines: InvoiceLine[] = termStructures.flatMap(t => t.heads.map(h => {
      const original = h.amount;
      const cons = inv.concessions.filter(c => c.head === h.head).reduce((s,c)=>s + (c.amount || 0) + (c.percent ? original*c.percent/100 : 0), 0);
      const due = new Date(dueMap[t.id]); const now = new Date();
      const lateDays = Math.max(0, Math.floor((now.getTime()-due.getTime())/(1000*60*60*24)));
      const fine = lateDays>0 ? Math.min(2000, lateDays*50) : 0;
      const paid = payments.filter(p=>p.invoiceId===inv.id).flatMap(p=>p.breakdown).filter(b=>b.head===h.head && b.termId===t.id).reduce((s,b)=>s+b.amount,0);
      const payable = Math.max(0, original - Math.min(original, cons) + fine);
      return { head: h.head, termId: t.id, termName: t.name, original, concession: Math.min(original, cons), fine, payable, paid };
    }));
    return { ...inv, lines, lastUpdatedAt: new Date().toISOString() };
  };

  // Init and recompute when payments change
  useEffect(()=>{ setInvoices(prev => prev.map(compute)); }, []);
  // if payments were stateful externally, recompute here on change

  // Aggregated rows with balances
  const rows = useMemo(()=>invoices.map(inv=>{
    const payable = inv.lines.reduce((s,l)=>s+l.payable,0);
    const paid = inv.lines.reduce((s,l)=>s+l.paid,0);
    const balance = Math.max(0, payable - paid);
    const byHead = inv.lines.reduce((acc: Record<FeeHead, {payable:number;paid:number}>, l)=>{
      acc[l.head] = acc[l.head] || { payable:0, paid:0 };
      acc[l.head].payable += l.payable; acc[l.head].paid += l.paid;
      return acc;
    }, {} as any);
    return { inv, payable, paid, balance, byHead };
  }), [invoices]);

  const filtered = useMemo(()=>rows
    .filter(r => !filterTerm || r.inv.lines.some(l=>l.termId===filterTerm))
    .filter(r => onlyDue==='All' || r.balance>0)
    .filter(r => {
      const t = search.trim().toLowerCase();
      if (!t) return true;
      const hay = [
  r.inv.student?.name ?? "",
  r.inv.student?.id ?? "",
  r.inv.student?.yearDept ?? "",
  r.inv.id
].join(" ").toLowerCase();

      return hay.includes(t);
    })
    .sort((a,b)=>{
      if (sortBy==='balance') return b.balance - a.balance;
      if (sortBy==='name') return a.inv.student.name.localeCompare(b.inv.student.name);
      return new Date(b.inv.lastUpdatedAt).getTime() - new Date(a.inv.lastUpdatedAt).getTime();
    })
  , [rows, search, filterTerm, onlyDue, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total/pageSize));
  const start = (page-1)*pageSize;
  const end = Math.min(start+pageSize, total);
  const pageItems = filtered.slice(start, end);

  const deadlines = termStructures.map(t => ({ termId: t.id, termName: t.name, dueDate: t.dueDate }));

  const bulkReminder = () => {
    const dueList = filtered.filter(r=>r.balance>0);
    alert(`Reminders sent to ${dueList.length} students for hostel dues.`);
  };

  const openStudent = (studentId: string) => {
    
    if (onOpenStudent) onOpenStudent(studentId);
    // If using react-router:
    navigate(`/hostel/fees/student-details/${studentId}`);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hostel Fee Collection</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">List of hostel students with dues, payments, deadlines, and quick navigation to full fee history.</p>
      </div>

      {/* Common Deadlines */}
      <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <CalendarDays className="w-4 h-4" /> Common hostel due dates:
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            {deadlines.map(d=>`${d.termName}: ${d.dueDate}`).join(' • ')}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name/ID/department..." className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select value={filterTerm} onChange={e=>setFilterTerm(e.target.value)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Term (All)</option>
              {termStructures.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <select value={onlyDue} onChange={e=>setOnlyDue(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>All</option><option>DueOnly</option>
            </select>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="latest">Sort: Latest</option><option value="balance">Sort: Balance</option><option value="name">Sort: Name</option>
            </select>
            <button onClick={bulkReminder} className="px-3 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-sm flex items-center gap-1"><Mail className="w-4 h-4" /> Bulk Reminder</button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pageItems.map(r => (
            <li key={r.inv.id} className="p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              {/* Left */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <button onClick={()=>openStudent(r.inv.student.id)} className="text-left text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
                    {r.inv.student.name} ({r.inv.student.id})
                  </button>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{r.inv.student.yearDept}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${r.balance>0 ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'}`}>{r.balance>0 ? 'Due' : 'Cleared'}</span>
                </div>
                <div className="mt-1 text-xs text-gray-700 dark:text-gray-300">
                  Payable: ₹{r.payable.toLocaleString()} • Paid: ₹{r.paid.toLocaleString()} • Balance: ₹{r.balance.toLocaleString()}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Heads: {Object.entries(r.byHead).map(([h, v]: any) => `${h}: ₹${v.paid.toLocaleString()}/${v.payable.toLocaleString()}`).join(' • ')}
                </div>
              </div>
              {/* Right */}
              <div className="flex items-center gap-2">
                <button onClick={()=>openStudent(r.inv.student.id)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 text-sm flex items-center gap-1"><Receipt className="w-4 h-4" /> View</button>
                {r.balance>0 && <button onClick={()=>alert('Use detail page to collect payment.')} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm flex items-center gap-1"><Banknote className="w-4 h-4" /> Collect</button>}
                <button onClick={()=>alert(`Reminder sent to ${r.inv.student.name}.`)} className="px-3 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-sm"><Mail className="w-4 h-4" /></button>
              </div>
            </li>
          ))}
          {pageItems.length===0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No students found.</li>}
        </ul>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {total===0?0:start+1}-{end} of {total}</p>
        <div className="inline-flex -space-x-px">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-3 h-9 border border-gray-300 rounded-s-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="px-3 h-9 border border-gray-300 rounded-e-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};

export default FeeCollection;
