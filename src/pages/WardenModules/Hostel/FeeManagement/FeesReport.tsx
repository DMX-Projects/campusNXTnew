// src/WardenModules/Hostel/FeeManagement/FeesReport.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Filter,
  Search,
  CalendarDays,
  Download,
  Receipt,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Banknote,
  ArrowDownToLine,
  PieChart,
  RefreshCw,
} from 'lucide-react';

// Shared types
type FeeHead = 'Tuition' | 'Hostel' | 'Mess' | 'Library' | 'Exam' | 'SecurityDeposit';
type PaymentMode = 'Online' | 'UPI' | 'Card' | 'NetBanking' | 'Cash' | 'Cheque/DD';
type ReceiptType = 'Payment' | 'Refund';

interface StudentRef { id: string; name: string; yearDept: string; room?: string; block?: string; }
interface TermFeeHead { head: FeeHead; amount: number; }
interface TermStructure { id: string; name: string; dueDate: string; heads: TermFeeHead[]; }
interface Concession { type: 'Scholarship' | 'Concession' | 'Waiver'; head?: FeeHead; amount?: number; percent?: number; reason?: string; }
interface InvoiceLine { head: FeeHead; termId: string; termName: string; original: number; concession: number; fine: number; payable: number; paid: number; }
interface StudentInvoice { id: string; student: StudentRef; lines: InvoiceLine[]; concessions: Concession[]; createdAt: string; lastUpdatedAt: string; }
interface Payment {
  id: string;
  invoiceId: string;
  studentId: string;
  amount: number; // positive for payments, negative for refunds
  mode: PaymentMode;
  txnRef?: string;
  paidAt: string;
  breakdown: Array<{ head: FeeHead; termId: string; amount: number }>;
  note?: string;
  type: ReceiptType;
}

// Demo term structures (replace via API)
const termStructuresDemo: TermStructure[] = [
  {
    id: 'TERM-1',
    name: 'Hostel Term 1 (2025-26)',
    dueDate: new Date(Date.now() + 1000*60*60*24*7).toISOString().slice(0,10),
    heads: [
      { head: 'Hostel', amount: 30000 },
      { head: 'Mess', amount: 12000 },
      { head: 'SecurityDeposit', amount: 5000 },
    ],
  },
  {
    id: 'TERM-2',
    name: 'Hostel Term 2 (2025-26)',
    dueDate: new Date(Date.now() + 1000*60*60*24*90).toISOString().slice(0,10),
    heads: [
      { head: 'Hostel', amount: 30000 },
      { head: 'Mess', amount: 12000 },
    ],
  },
];

// Demo students (replace via API)
const hostelStudents: StudentRef[] = [
  { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE', room: '101', block: 'A' },
  { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE', room: '202', block: 'B' },
  { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE', room: '303', block: 'C' },
  { id: 'ST1402', name: 'Sahil Jain', yearDept: '2nd Year - ME', room: '404', block: 'D' },
];

// Seed concessions by student (demo)
const concessionsByStudent: Record<string, Concession[]> = {
  ST2099: [{ type: 'Concession', head: 'Hostel', amount: 2000, reason: 'Sibling' }],
  ST1501: [],
  ST1201: [],
  ST1402: [{ type: 'Scholarship', head: 'Mess', percent: 25, reason: 'Aid' }],
};

// Seed payments/receipts (demo)
const receiptsDemo: Payment[] = [
  {
    id: 'RCPT-9001',
    invoiceId: 'INV-ST2099',
    studentId: 'ST2099',
    amount: 15000,
    mode: 'UPI',
    txnRef: 'UPI-NEHA-001',
    paidAt: new Date(Date.now()-36e5*6).toISOString(),
    breakdown: [
      { head: 'Hostel', termId: 'TERM-1', amount: 10000 },
      { head: 'Mess', termId: 'TERM-1', amount: 5000 },
    ],
    note: 'Part payment',
    type: 'Payment',
  },
  {
    id: 'RCPT-9002',
    invoiceId: 'INV-ST1501',
    studentId: 'ST1501',
    amount: 12000,
    mode: 'Card',
    paidAt: new Date(Date.now()-36e5*3).toISOString(),
    breakdown: [{ head: 'Mess', termId: 'TERM-1', amount: 12000 }],
    type: 'Payment',
  },
  // Example refund
  {
    id: 'RCPT-9003',
    invoiceId: 'INV-ST2099',
    studentId: 'ST2099',
    amount: -2000,
    mode: 'Online',
    paidAt: new Date(Date.now()-36e5*2).toISOString(),
    breakdown: [],
    note: 'Security deposit partial refund (demo)',
    type: 'Refund',
  },
];

type SortBy = 'latest' | 'balance' | 'name' | 'paid' | 'fine';
type DocType = 'All' | 'Invoices' | 'Receipts' | 'Refunds' | 'Concessions' | 'Fines';

const LATE_FINE_PER_DAY = 50;
const LATE_FINE_CAP = 2000;

const FeesReport: React.FC = () => {
  // State for data (in real app, use RTK Query or API calls and selectors)
  const [termStructures] = useState<TermStructure[]>(termStructuresDemo);
  const [receipts, setReceipts] = useState<Payment[]>(receiptsDemo);

  // Build invoices on mount based on structures + concessions + receipts
  const [invoices, setInvoices] = useState<StudentInvoice[]>([]);

  // Filters and UI state
  const [search, setSearch] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [filterHead, setFilterHead] = useState<'' | FeeHead>('');
  const [docType, setDocType] = useState<DocType>('All');
  const [onlyDue, setOnlyDue] = useState<'All' | 'DueOnly'>('All');
  const [modeFilter, setModeFilter] = useState<'' | PaymentMode>('');
  const [sortBy, setSortBy] = useState<SortBy>('latest');

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [search, filterTerm, filterHead, docType, onlyDue, modeFilter, sortBy]);

  // Build initial invoices for all hostel students
  useEffect(() => {
    const buildInvoiceFor = (student: StudentRef): StudentInvoice => {
      const base: StudentInvoice = {
        id: `INV-${student.id}`,
        student,
        concessions: concessionsByStudent[student.id] || [],
        lines: [],
        createdAt: new Date(Date.now() - Math.floor(Math.random()*36e5*48)).toISOString(),
        lastUpdatedAt: new Date().toISOString(),
      };
      return computeInvoice(base, termStructures, receipts);
    };

    const all = hostelStudents.map(buildInvoiceFor);
    setInvoices(all);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recompute invoices when receipts change
  useEffect(() => {
    setInvoices(prev => prev.map(inv => computeInvoice({ ...inv, lastUpdatedAt: new Date().toISOString() }, termStructures, receipts)));
  }, [receipts, termStructures]);

  // Derived rows
  const rows = useMemo(() => {
    return invoices.map(inv => {
      const payable = inv.lines.reduce((s, l) => s + l.payable, 0);
      const paid = inv.lines.reduce((s, l) => s + l.paid, 0);
      const balance = Math.max(0, payable - paid);
      const fine = inv.lines.reduce((s, l) => s + l.fine, 0);
      return { inv, payable, paid, balance, fine };
    });
  }, [invoices]);

  // KPI cards
  const kpis = useMemo(() => {
    const totalPayable = rows.reduce((s, r) => s + r.payable, 0);
    const totalPaid = rows.reduce((s, r) => s + r.paid, 0);
    const totalBalance = Math.max(0, totalPayable - totalPaid);
    const totalFine = rows.reduce((s, r) => s + r.fine, 0);

    const today = new Date().toISOString().slice(0,10);
    const aging = { '0-7': 0, '8-30': 0, '31+': 0 } as Record<'0-7'|'8-30'|'31+', number>;
    termStructures.forEach(t => {
      const termDue = t.dueDate;
      const termBal = invoices
        .flatMap(inv => inv.lines.filter(l => l.termId === t.id))
        .reduce((s, l) => s + Math.max(0, l.payable - l.paid), 0);
      if (termBal <= 0) return;
      if (termDue >= today) aging['0-7'] += termBal;
      else {
        const days = Math.floor((new Date(today).getTime() - new Date(termDue).getTime())/(1000*60*60*24));
        if (days <= 30) aging['8-30'] += termBal; else aging['31+'] += termBal;
      }
    });

    return { totalPayable, totalPaid, totalBalance, totalFine, aging };
  }, [rows, invoices, termStructures]);

  // Document datasets
  const allInvoices = useMemo(() => invoices, [invoices]);
  const allReceipts = useMemo(() => receipts.filter(r => r.type === 'Payment'), [receipts]);
  const allRefunds = useMemo(() => receipts.filter(r => r.type === 'Refund'), [receipts]);
  const allConcessions = useMemo(
    () =>
      invoices.flatMap(inv =>
        (inv.concessions || []).map(c => ({
          invoiceId: inv.id,
          student: inv.student,
          concession: c,
          createdAt: inv.createdAt,
          lastUpdatedAt: inv.lastUpdatedAt,
        }))
      ),
    [invoices]
  );
  const allFines = useMemo(
    () =>
      invoices.flatMap(inv =>
        inv.lines
          .filter(l => l.fine > 0)
          .map(l => ({
            invoiceId: inv.id,
            student: inv.student,
            termId: l.termId,
            termName: l.termName,
            head: l.head,
            fine: l.fine,
            computedAt: inv.lastUpdatedAt,
          }))
      ),
    [invoices]
  );

  // Filtering/searching/sorting “main list” — show invoices by default
  const filteredInvoices = useMemo(() => {
    return rows
      .filter(r => !filterTerm || r.inv.lines.some(l => l.termId === filterTerm))
      .filter(r => !filterHead || r.inv.lines.some(l => l.head === filterHead))
      .filter(r => onlyDue === 'All' || r.balance > 0)
      .filter(r => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        const hay = [
          r.inv.student.name,
          r.inv.student.id,
          r.inv.student.yearDept,
          r.inv.id,
        ].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => {
        if (sortBy === 'balance') return b.balance - a.balance;
        if (sortBy === 'name') return a.inv.student.name.localeCompare(b.inv.student.name);
        if (sortBy === 'paid') return b.paid - a.paid;
        if (sortBy === 'fine') return b.fine - a.fine;
        return new Date(b.inv.lastUpdatedAt).getTime() - new Date(a.inv.lastUpdatedAt).getTime();
      });
  }, [rows, filterTerm, filterHead, onlyDue, search, sortBy]);

  // Receipts/refunds filtered view for the document switcher
  const filteredReceiptsOrRefunds = useMemo(() => {
    const data = docType === 'Receipts' ? allReceipts : docType === 'Refunds' ? allRefunds : [];
    return data
      .filter(p => !filterTerm || p.breakdown.some(b => b.termId === filterTerm))
      .filter(p => !filterHead || p.breakdown.some(b => b.head === filterHead))
      .filter(p => !modeFilter || p.mode === modeFilter)
      .filter(p => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        const hay = [
          p.id,
          p.invoiceId,
          p.studentId,
          p.mode,
          p.txnRef || '',
          p.note || '',
        ].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime());
  }, [docType, allReceipts, allRefunds, filterTerm, filterHead, modeFilter, search]);

  // Concessions filtered
  const filteredConcessions = useMemo(() => {
    if (docType !== 'Concessions') return [];
    return allConcessions
      .filter(c => !filterHead || c.concession.head === filterHead)
      .filter(c => !filterTerm || invoices.find(inv => inv.id === c.invoiceId)?.lines.some(l => l.termId === filterTerm))
      .filter(c => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        const hay = [
          c.invoiceId,
          c.student.id,
          c.student.name,
          c.student.yearDept,
          c.concession.type,
          c.concession.reason || '',
        ].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime());
  }, [docType, allConcessions, filterHead, filterTerm, search, invoices]);

  // Fines filtered
  const filteredFines = useMemo(() => {
    if (docType !== 'Fines') return [];
    return allFines
      .filter(f => !filterHead || f.head === filterHead)
      .filter(f => !filterTerm || f.termId === filterTerm)
      .filter(f => {
        const t = search.trim().toLowerCase();
        if (!t) return true;
        const hay = [
          f.invoiceId,
          f.student.id,
          f.student.name,
          f.student.yearDept,
          f.termName,
          f.head,
        ].join(' ').toLowerCase();
        return hay.includes(t);
      })
      .sort((a, b) => b.fine - a.fine);
  }, [docType, allFines, filterHead, filterTerm, search]);

  // Paginate the active dataset
  const activeCount = useMemo(() => {
    if (docType === 'Invoices' || docType === 'All') return filteredInvoices.length;
    if (docType === 'Receipts' || docType === 'Refunds') return filteredReceiptsOrRefunds.length;
    if (docType === 'Concessions') return filteredConcessions.length;
    if (docType === 'Fines') return filteredFines.length;
    return filteredInvoices.length;
  }, [docType, filteredInvoices.length, filteredReceiptsOrRefunds.length, filteredConcessions.length, filteredFines.length]);

  const totalPages = Math.max(1, Math.ceil(activeCount / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, activeCount);

  // Export helpers
  const exportCSV = (filename: string, rows: Record<string, any>[]) => {
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => window.URL.revokeObjectURL(url), 500);
  };

  const exportActive = () => {
    if (docType === 'Invoices' || docType === 'All') {
      const data = filteredInvoices.slice(start, end).map(r => ({
        invoiceId: r.inv.id,
        studentId: r.inv.student.id,
        studentName: r.inv.student.name,
        yearDept: r.inv.student.yearDept,
        payable: r.payable,
        paid: r.paid,
        balance: r.balance,
        fine: r.fine,
        lastUpdatedAt: r.inv.lastUpdatedAt,
      }));
      exportCSV(`hostel_invoices_${dateStamp()}.csv`, data);
      return;
    }
    if (docType === 'Receipts' || docType === 'Refunds') {
      const data = filteredReceiptsOrRefunds.slice(start, end).map(p => ({
        receiptId: p.id,
        type: p.type,
        invoiceId: p.invoiceId,
        studentId: p.studentId,
        amount: p.amount,
        mode: p.mode,
        txnRef: p.txnRef || '',
        paidAt: p.paidAt,
        note: p.note || '',
        breakdown: p.breakdown.map(b => `${b.termId}:${b.head}:${b.amount}`).join('|'),
      }));
      exportCSV(`hostel_${docType.toLowerCase()}_${dateStamp()}.csv`, data);
      return;
    }
    if (docType === 'Concessions') {
      const data = filteredConcessions.slice(start, end).map(c => ({
        invoiceId: c.invoiceId,
        studentId: c.student.id,
        studentName: c.student.name,
        yearDept: c.student.yearDept,
        type: c.concession.type,
        head: c.concession.head || '',
        amount: c.concession.amount || '',
        percent: c.concession.percent || '',
        reason: c.concession.reason || '',
        updatedAt: c.lastUpdatedAt,
      }));
      exportCSV(`hostel_concessions_${dateStamp()}.csv`, data);
      return;
    }
    if (docType === 'Fines') {
      const data = filteredFines.slice(start, end).map(f => ({
        invoiceId: f.invoiceId,
        studentId: f.student.id,
        studentName: f.student.name,
        yearDept: f.student.yearDept,
        termId: f.termId,
        termName: f.termName,
        head: f.head,
        fine: f.fine,
        computedAt: f.computedAt,
      }));
      exportCSV(`hostel_fines_${dateStamp()}.csv`, data);
      return;
    }
  };

  const exportSummary = () => {
    const data = rows.map(r => ({
      invoiceId: r.inv.id,
      studentId: r.inv.student.id,
      studentName: r.inv.student.name,
      yearDept: r.inv.student.yearDept,
      payable: r.payable,
      paid: r.paid,
      balance: r.balance,
      fine: r.fine,
    }));
    exportCSV(`hostel_summary_${dateStamp()}.csv`, data);
  };

  const reComputeFines = () => {
    // In real app, trigger server-side recompute; here we just update lastUpdatedAt to force recompute
    setInvoices(prev => prev.map(inv => computeInvoice({ ...inv, lastUpdatedAt: new Date().toISOString() }, termStructures, receipts)));
  };

  // Render helpers
  const activeHeaderTitle = () => {
    if (docType === 'All' || docType === 'Invoices') return 'Invoices';
    if (docType === 'Receipts') return 'Receipts';
    if (docType === 'Refunds') return 'Refunds';
    if (docType === 'Concessions') return 'Concessions';
    if (docType === 'Fines') return 'Fines';
    return 'Invoices';
  };

  const activeList = () => {
    if (docType === 'All' || docType === 'Invoices') {
      const list = filteredInvoices.slice(start, end);
      return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {list.map(r => (
            <li key={r.inv.id} className="p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{r.inv.student.name} ({r.inv.student.id})</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{r.inv.student.yearDept}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${r.balance>0?'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300':'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'}`}>{r.balance>0?'Due':'Cleared'}</span>
                </div>
                <div className="mt-1 text-xs text-gray-700 dark:text-gray-300">
                  Payable: ₹{r.payable.toLocaleString()} • Paid: ₹{r.paid.toLocaleString()} • Balance: ₹{r.balance.toLocaleString()} • Fine: ₹{r.fine.toLocaleString()}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {r.inv.lines.map(l => `${l.termId} ${l.head}: ₹${l.paid.toLocaleString()}/${l.payable.toLocaleString()}`).join(' • ')}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 text-sm flex items-center gap-1"
                  onClick={() => window.open(`/hostel/fees/student-details/${r.inv.student.id}`, '_self')}
                >
                  <Receipt className="w-4 h-4" /> View Details
                </button>
              </div>
            </li>
          ))}
          {list.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No invoices found.</li>}
        </ul>
      );
    }

    if (docType === 'Receipts' || docType === 'Refunds') {
      const list = filteredReceiptsOrRefunds.slice(start, end);
      return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {list.map(p => (
            <li key={p.id} className="p-4 flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-sm text-gray-800 dark:text-gray-100">
                    {p.id} • {p.type} • {p.mode} {p.txnRef ? `• ${p.txnRef}` : ''}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {new Date(p.paidAt).toLocaleString()} {p.note ? `• ${p.note}` : ''} • {p.invoiceId} • {p.studentId}
                </div>
                {p.breakdown.length > 0 && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {p.breakdown.map((b, idx) => (
                      <span key={idx} className="mr-3">{b.termId} {b.head}: ₹{b.amount.toLocaleString()}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className={`${p.amount >= 0 ? 'text-green-600 dark:text-green-300' : 'text-amber-600 dark:text-amber-300'} font-semibold`}>
                {p.amount >= 0 ? '+' : ''}₹{p.amount.toLocaleString()}
              </div>
            </li>
          ))}
          {list.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No records found.</li>}
        </ul>
      );
    }

    if (docType === 'Concessions') {
      const list = filteredConcessions.slice(start, end);
      return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {list.map((c, idx) => (
            <li key={`${c.invoiceId}-${idx}`} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="min-w-0">
                <div className="text-sm text-gray-800 dark:text-gray-100">
                  {c.student.name} ({c.student.id}) • {c.concession.type} {c.concession.head ? `• ${c.concession.head}` : ''}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Amt ₹{(c.concession.amount ?? 0).toLocaleString()} • % {(c.concession.percent ?? 0)} • {c.concession.reason || '—'}
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Updated {new Date(c.lastUpdatedAt).toLocaleString()}</div>
            </li>
          ))}
          {list.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No concessions found.</li>}
        </ul>
      );
    }

    if (docType === 'Fines') {
      const list = filteredFines.slice(start, end);
      return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {list.map((f, idx) => (
            <li key={`${f.invoiceId}-${idx}`} className="p-4 flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-sm text-gray-800 dark:text-gray-100">
                  {f.student.name} ({f.student.id}) • {f.termName} • {f.head}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Invoice {f.invoiceId} • Computed {new Date(f.computedAt).toLocaleString()}
                </div>
              </div>
              <div className="text-amber-600 dark:text-amber-300 font-semibold">₹{f.fine.toLocaleString()}</div>
            </li>
          ))}
          {list.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No fines found.</li>}
        </ul>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hostel Fees — Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">Centralized view of invoices, receipts, refunds, concessions, fines with aging, filters, and exports.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPI icon={<FileText className="w-5 h-5" />} label="Total Payable" value={`₹${kpis.totalPayable.toLocaleString()}`} tone="neutral" />
        <KPI icon={<Banknote className="w-5 h-5" />} label="Total Collected" value={`₹${kpis.totalPaid.toLocaleString()}`} tone="success" />
        <KPI icon={<AlertTriangle className="w-5 h-5" />} label="Total Balance" value={`₹${kpis.totalBalance.toLocaleString()}`} tone={kpis.totalBalance>0?'danger':'success'} />
        <KPI icon={<PieChart className="w-5 h-5" />} label="Total Fine" value={`₹${kpis.totalFine.toLocaleString()}`} tone="warn" />
      </div>

      {/* Deadlines & Aging */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <CalendarDays className="w-4 h-4" /> Common hostel due dates:
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              {termStructures.map(d => `${d.name}: ${d.dueDate}`).join(' • ')}
            </span>
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Aging (₹)</p>
          <p className="text-xs text-gray-700 dark:text-gray-300">
            0–7: ₹{kpis.aging['0-7'].toLocaleString()} • 8–30: ₹{kpis.aging['8-30'].toLocaleString()} • 31+: ₹{kpis.aging['31+'].toLocaleString()}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name/ID/invoice/notes..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select value={docType} onChange={e => setDocType(e.target.value as DocType)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>All</option>
              <option>Invoices</option>
              <option>Receipts</option>
              <option>Refunds</option>
              <option>Concessions</option>
              <option>Fines</option>
            </select>
            <select value={filterTerm} onChange={e => setFilterTerm(e.target.value)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Term (All)</option>
              {termStructures.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <select value={filterHead} onChange={e => setFilterHead(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">Head (All)</option>
              {['Hostel','Mess','SecurityDeposit','Tuition','Library','Exam'].map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            {(docType === 'Receipts' || docType === 'Refunds') && (
              <select value={modeFilter} onChange={e => setModeFilter(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Mode (All)</option>
                {['UPI','Online','Card','NetBanking','Cash','Cheque/DD'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            )}
            { (docType === 'All' || docType === 'Invoices') && (
              <select value={onlyDue} onChange={e => setOnlyDue(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option>All</option>
                <option>DueOnly</option>
              </select>
            )}
            {(docType === 'All' || docType === 'Invoices') && (
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="latest">Sort: Latest</option>
                <option value="balance">Sort: Balance</option>
                <option value="name">Sort: Name</option>
                <option value="paid">Sort: Paid</option>
                <option value="fine">Sort: Fine</option>
              </select>
            )}
            <button onClick={exportActive} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm flex items-center gap-1">
              <Download className="w-4 h-4" /> Export View
            </button>
            <button onClick={exportSummary} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
              <ArrowDownToLine className="w-4 h-4" /> Export Summary
            </button>
            <button onClick={reComputeFines} className="px-3 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-sm flex items-center gap-1">
              <RefreshCw className="w-4 h-4" /> Recompute Fines
            </button>
          </div>
        </div>
      </div>

      {/* Main list */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{activeHeaderTitle()}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Mobile-first • Dark-mode ready</p>
        </div>
        {activeList()}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {activeCount === 0 ? 0 : start + 1}-{end} of {activeCount}</p>
        <div className="inline-flex -space-x-px">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 h-9 border border-gray-300 rounded-s-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            ‹
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 h-9 border border-gray-300 rounded-e-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            ›
          </button>
        </div>
      </div>

      {/* Policy note */}
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 mt-0.5" />
        Reports include invoices, receipts, refunds, concessions, and fines; export CSV for finance audits and Board reporting. Align actions with institute rules.
      </p>
    </div>
  );
};

// Helpers

function computeInvoice(base: StudentInvoice, termStructures: TermStructure[], payments: Payment[]): StudentInvoice {
  const dueMap = Object.fromEntries(termStructures.map(t => [t.id, t.dueDate]));
  const lines: InvoiceLine[] = termStructures.flatMap(t =>
    t.heads.map(h => {
      const original = h.amount;
      const cons = (base.concessions || [])
        .filter(c => c.head === h.head)
        .reduce((s, c) => s + (c.amount || 0) + (c.percent ? (original * c.percent) / 100 : 0), 0);
      const due = new Date(dueMap[t.id]);
      const now = new Date();
      const lateDays = Math.max(0, Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)));
      const fine = lateDays > 0 ? Math.min(LATE_FINE_CAP, lateDays * LATE_FINE_PER_DAY) : 0;
      const paid = payments
        .filter(p => p.invoiceId === base.id && p.type === 'Payment')
        .flatMap(p => p.breakdown)
        .filter(b => b.head === h.head && b.termId === t.id)
        .reduce((s, b) => s + b.amount, 0);
      const payable = Math.max(0, original - Math.min(original, cons) + fine);
      return { head: h.head, termId: t.id, termName: t.name, original, concession: Math.min(original, cons), fine, payable, paid };
    })
  );
  return { ...base, lines, lastUpdatedAt: new Date().toISOString() };
}

function toCSV(rows: Record<string, any>[]): string {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = (val: any) => {
    if (val === null || val === undefined) return '';
    const s = String(val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  const lines = [
    headers.join(','),
    ...rows.map(r => headers.map(h => escape(r[h])).join(',')),
  ];
  return lines.join('\n');
}

function dateStamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

// Small KPI card component
const KPI: React.FC<{ icon: React.ReactNode; label: string; value: string; tone?: 'neutral'|'success'|'danger'|'warn' }> = ({ icon, label, value, tone='neutral' }) => {
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

export default FeesReport;
