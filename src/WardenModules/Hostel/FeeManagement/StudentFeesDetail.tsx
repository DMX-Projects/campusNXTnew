// src/components/finance/StudentFeesDetail.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Banknote,
  ChevronLeft,
  ChevronRight,
  Mail,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Info,
  Lock,
  Unlock,
  FileCheck2,
  StickyNote,
  AlertTriangle,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

type RouteParams = { studentId: string };

type FeeHead = 'Tuition' | 'Hostel' | 'Mess' | 'Library' | 'Exam' | 'SecurityDeposit';
type PaymentMode = 'Online' | 'UPI' | 'Card' | 'NetBanking' | 'Cash' | 'Cheque/DD';
type ReceiptType = 'Payment' | 'Refund';

interface StudentRef {
  id: string;
  name: string;
  yearDept: string;
  room?: string;
  block?: string;
}
interface TermFeeHead { head: FeeHead; amount: number; }
interface TermStructure { id: string; name: string; dueDate: string; heads: TermFeeHead[]; }
interface Concession { type: 'Scholarship' | 'Concession' | 'Waiver'; head?: FeeHead; amount?: number; percent?: number; reason?: string; }
interface InvoiceLine { head: FeeHead; termId: string; termName: string; original: number; concession: number; fine: number; payable: number; paid: number; }
interface StudentInvoice { id: string; student: StudentRef; lines: InvoiceLine[]; concessions: Concession[]; createdAt: string; lastUpdatedAt: string; }
interface Payment {
  id: string;
  invoiceId: string;
  studentId: string;
  amount: number;
  mode: PaymentMode;
  txnRef?: string;
  paidAt: string;
  breakdown: Array<{ head: FeeHead; termId: string; amount: number }>;
  note?: string;
  type: ReceiptType;
}

/**
 * Props remain for reusability when embedding this component with explicit data.
 * When used via routing, the component self-resolves student and termStructures.
 */
type Props = {
  student?: StudentRef;
  termStructures?: TermStructure[];
  initialConcessions?: Concession[];
  initialPayments?: Payment[];
  onBack?: () => void;
};

const LATE_FINE_PER_DAY = 50;  // demo rule
const LATE_FINE_CAP = 2000;    // demo cap

// Demo terms (align with your FeeCollection demo)
const demoTermStructures: TermStructure[] = [
  {
    id: 'TERM-1',
    name: 'Hostel Term 1 (2025-26)',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().slice(0, 10),
    heads: [
      { head: 'Hostel', amount: 30000 },
      { head: 'Mess', amount: 12000 },
      { head: 'SecurityDeposit', amount: 5000 },
    ],
  },
  {
    id: 'TERM-2',
    name: 'Hostel Term 2 (2025-26)',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().slice(0, 10),
    heads: [
      { head: 'Hostel', amount: 30000 },
      { head: 'Mess', amount: 12000 },
    ],
  },
];

// Demo students (align with FeeCollection demo)
const demoStudents: StudentRef[] = [
  { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE', room: '101', block: 'A' },
  { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE', room: '202', block: 'B' },
  { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE', room: '303', block: 'C' },
  { id: 'ST1402', name: 'Sahil Jain', yearDept: '2nd Year - ME', room: '404', block: 'D' },
];

const StudentFeesDetail: React.FC<Props> = ({
  student: studentProp,
  termStructures: termStructuresProp,
  initialConcessions = [],
  initialPayments = [],
  onBack,
}) => {
  // Read param if coming from route
  const { studentId } = useParams<RouteParams>();

  // Resolve student and terms:
  const student: StudentRef | undefined = useMemo(() => {
    if (studentProp) return studentProp;
    if (!studentId) return undefined;
    return demoStudents.find(s => s.id === studentId);
  }, [studentProp, studentId]);

  const termStructures: TermStructure[] = useMemo(() => {
    return termStructuresProp ?? demoTermStructures;
  }, [termStructuresProp]);

  // Guard: if no student yet, render a safe UI (prevents undefined access)
  if (!student) {
    return (
      <div className="min-h-screen p-6 text-sm text-gray-700 dark:text-gray-300">
        Student not found or loading. Please check the URL or navigate from the fee list. 
      </div>
    );
  }

  // Core state
  const [invoice, setInvoice] = useState<StudentInvoice>({
    id: `INV-${student.id}`,
    student,
    concessions: initialConcessions,
    lines: [],
    createdAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
  });
  const [payments, setPayments] = useState<Payment[]>(initialPayments);

  // Warden controls
  const [messStopped, setMessStopped] = useState(false);
  const [wardenRemark, setWardenRemark] = useState('');
  const [noDuesReady, setNoDuesReady] = useState(false);

  // Filters
  const [filterTerm, setFilterTerm] = useState('');
  const [filterHead, setFilterHead] = useState<'' | FeeHead>('');
  const [searchReceipt, setSearchReceipt] = useState('');

  // Payment modal
  const [collectOpen, setCollectOpen] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [mode, setMode] = useState<PaymentMode>('UPI');
  const [txnRef, setTxnRef] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [allocations, setAllocations] = useState<Array<{ key: string; head: FeeHead; termId: string; amount: number }>>([]);

  // Refund modal
  const [refundOpen, setRefundOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundNote, setRefundNote] = useState<string>('');

  // Compute invoice lines
  const compute = (base: StudentInvoice): StudentInvoice => {
    const dueMap = Object.fromEntries(termStructures.map(t => [t.id, t.dueDate]));
    const lines: InvoiceLine[] = termStructures.flatMap(t =>
      t.heads.map(h => {
        const original = h.amount;
        const cons = base.concessions
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
  };

  // Initialize and recompute
  useEffect(() => {
    setInvoice(prev => compute(prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setInvoice(prev => compute(prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments, termStructures]);

  // Totals and analytics
  const totals = useMemo(() => {
    const original = invoice.lines.reduce((s, l) => s + l.original, 0);
    const concession = invoice.lines.reduce((s, l) => s + l.concession, 0);
    const fine = invoice.lines.reduce((s, l) => s + l.fine, 0);
    const payable = invoice.lines.reduce((s, l) => s + l.payable, 0);
    const paid = invoice.lines.reduce((s, l) => s + l.paid, 0);
    const balance = Math.max(0, payable - paid);
    const deadlines = termStructures.map(t => ({ termId: t.id, termName: t.name, dueDate: t.dueDate }));
    const today = new Date().toISOString().slice(0, 10);
    const aging = { '0-7': 0, '8-30': 0, '31+': 0 } as Record<'0-7' | '8-30' | '31+', number>;
    termStructures.forEach(t => {
      const bucketLines = invoice.lines.filter(l => l.termId === t.id);
      const termDue = t.dueDate;
      const termBal = bucketLines.reduce((s, l) => s + Math.max(0, l.payable - l.paid), 0);
      if (termBal <= 0) return;
      if (termDue >= today) aging['0-7'] += termBal;
      else {
        const days = Math.floor((new Date(today).getTime() - new Date(termDue).getTime()) / (1000 * 60 * 60 * 24));
        if (days <= 30) aging['8-30'] += termBal;
        else aging['31+'] += termBal;
      }
    });
    const messDue = invoice.lines.filter(l => l.head === 'Mess').reduce((s, l) => s + Math.max(0, l.payable - l.paid), 0);
    const isDefaulter = balance > 0;
    return { original, concession, fine, payable, paid, balance, deadlines, aging, messDue, isDefaulter };
  }, [invoice, termStructures]);

  // Visible lines
  const visibleLines = useMemo(
    () => invoice.lines.filter(l => (!filterTerm || l.termId === filterTerm) && (!filterHead || l.head === filterHead)),
    [invoice, filterTerm, filterHead]
  );

  // Receipts
  const filteredReceipts = useMemo(
    () =>
      payments
        .filter(p => p.invoiceId === invoice.id && p.studentId === student.id)
        .filter(p => {
          const t = searchReceipt.trim().toLowerCase();
          if (!t) return true;
          const hay = [p.id, p.mode, p.txnRef || '', p.note || ''].join(' ').toLowerCase();
          return hay.includes(t);
        })
        .sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()),
    [payments, invoice.id, student.id, searchReceipt]
  );

  // Warden actions
  const toggleMess = () => {
    const newState = !messStopped;
    setMessStopped(newState);
    alert(`${newState ? 'Mess stopped' : 'Mess restored'} for ${student.name}.`);
  };

  const markNoDues = () => {
    if (totals.balance > 0) {
      alert('Cannot mark No-Dues while balance exists.');
      return;
    }
    setNoDuesReady(true);
    alert(`Student ${student.name} marked as Ready for No-Dues.`);
  };

  const addRemark = () => {
    if (!wardenRemark.trim()) {
      alert('Enter a remark.');
      return;
    }
    alert(`Remark recorded: ${wardenRemark}`);
    setWardenRemark('');
  };

  const sendReminder = () => {
    alert(`Reminder sent to ${student.name} (${student.id}) for ₹${totals.balance.toLocaleString()}. Mess due: ₹${totals.messDue.toLocaleString()}.`);
  };

  // Payment handlers
  const openCollect = () => {
    setCollectOpen(true);
    setMode('UPI');
    setTxnRef('');
    setNote('');
    const dues = invoice.lines
      .map(l => ({ ...l, due: Math.max(0, l.payable - l.paid) }))
      .filter(l => l.due > 0);
    const suggested = Math.min(20000, dues.reduce((s, d) => s + d.due, 0));
    setAmount(suggested);
    let remaining = suggested;
    const alloc: Array<{ key: string; head: FeeHead; termId: string; amount: number }> = [];
    for (const d of dues) {
      if (remaining <= 0) break;
      const take = Math.min(remaining, d.due);
      alloc.push({ key: `${d.termId}-${d.head}`, head: d.head, termId: d.termId, amount: take });
      remaining -= take;
    }
    setAllocations(alloc);
  };

  const submitCollect = () => {
    if (amount <= 0) return;
    const sum = allocations.reduce((s, a) => s + a.amount, 0);
    if (sum !== amount) {
      alert('Allocation must equal amount.');
      return;
    }
    const rec: Payment = {
      id: `RCPT-${Math.floor(9000 + Math.random() * 9999)}`,
      invoiceId: invoice.id,
      studentId: student.id,
      amount,
      mode,
      txnRef: txnRef || undefined,
      paidAt: new Date().toISOString(),
      breakdown: allocations.map(a => ({ head: a.head, termId: a.termId, amount: a.amount })),
      note: note || undefined,
      type: 'Payment',
    };
    setPayments(prev => [rec, ...prev]);
    setCollectOpen(false);
  };

  const openRefund = () => {
    setRefundOpen(true);
    setRefundAmount(0);
    setRefundNote('');
  };

  const submitRefund = () => {
    const totalPaid = invoice.lines.reduce((s, l) => s + l.paid, 0);
    const totalPayable = invoice.lines.reduce((s, l) => s + l.payable, 0);
    const refundableDeposit = invoice.lines
      .filter(l => l.head === 'SecurityDeposit')
      .reduce((s, l) => s + Math.min(l.paid, l.payable), 0);
    const maxRefund = Math.max(0, totalPaid - totalPayable) + refundableDeposit;
    if (refundAmount <= 0 || refundAmount > maxRefund) {
      alert('Refund exceeds allowable limit.');
      return;
    }
    const rec: Payment = {
      id: `RCPT-${Math.floor(9000 + Math.random() * 9999)}`,
      invoiceId: invoice.id,
      studentId: student.id,
      amount: -refundAmount,
      mode: 'Online',
      paidAt: new Date().toISOString(),
      breakdown: [],
      note: refundNote || 'Refund',
      type: 'Refund',
    };
    setPayments(prev => [rec, ...prev]);
    setRefundOpen(false);
  };

  // Receipts pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [searchReceipt]);
  const totalReceipts = filteredReceipts.length;
  const totalPages = Math.max(1, Math.ceil(totalReceipts / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, totalReceipts);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Warden — Student Fee Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Room {student.room || '—'}, Block {student.block || '—'} • {student.name} ({student.id}) • {student.yearDept}
        </p>
      </div>

      {/* Warden Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Due</p>
          <p className={`text-2xl font-bold ${totals.balance > 0 ? 'text-red-600 dark:text-red-300' : 'text-green-600 dark:text-green-300'}`}>
            ₹{totals.balance.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Payable ₹{totals.payable.toLocaleString()} • Paid ₹{totals.paid.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Mess Due</p>
          <p className={`text-2xl font-bold ${totals.messDue > 0 ? 'text-amber-600 dark:text-amber-300' : 'text-green-600 dark:text-green-300'}`}>
            ₹{totals.messDue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">{messStopped ? 'Mess: Stopped' : 'Mess: Active'}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Aging (₹)</p>
          <p className="text-xs text-gray-700 dark:text-gray-300">
            0–7: ₹{totals.aging['0-7'].toLocaleString()} • 8–30: ₹{totals.aging['8-30'].toLocaleString()} • 31+: ₹{totals.aging['31+'].toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            <CalendarDays className="inline w-4 h-4 mr-1" />
            Common due dates: {totals.deadlines.map(d => `${d.termName} ${d.dueDate}`).join(' | ')}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Defaulter</p>
          <p className={`text-2xl font-bold ${totals.isDefaulter ? 'text-red-600 dark:text-red-300' : 'text-green-600 dark:text-green-300'}`}>
            {totals.isDefaulter ? 'Yes' : 'No'}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">{noDuesReady ? 'No-Dues: Ready' : 'No-Dues: Pending'}</p>
        </div>
      </div>

      {/* Warden Actions */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={toggleMess}
            className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 ${
              messStopped ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {messStopped ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />} {messStopped ? 'Restore Mess' : 'Stop Mess'}
          </button>
          <button
            onClick={openCollect}
            className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm flex items-center gap-1"
          >
            <Banknote className="w-4 h-4" /> Collect Payment
          </button>
          <button
            onClick={sendReminder}
            className="px-3 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-sm flex items-center gap-1"
          >
            <Mail className="w-4 h-4" /> Send Reminder
          </button>
          <button
            onClick={markNoDues}
            disabled={totals.balance > 0}
            className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 text-sm flex items-center gap-1"
          >
            <FileCheck2 className="w-4 h-4" /> Mark No-Dues Ready
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            value={wardenRemark}
            onChange={e => setWardenRemark(e.target.value)}
            placeholder="Add warden remark (discipline/fees/mess)..."
            className="w-full sm:max-w-xl form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={addRemark}
            className="px-3 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 text-sm flex items-center gap-1"
          >
            <StickyNote className="w-4 h-4" /> Save
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <AlertTriangle className="w-4 h-4" /> Advisory: Persistent default may lead to room double-lock as per hostel rules; use per your
          institute’s policy.
        </p>
      </div>

      {/* Filters for fee lines */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <select value={filterTerm} onChange={e => setFilterTerm(e.target.value)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="">Term (All)</option>
            {termStructures.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <select
            value={filterHead}
            onChange={e => setFilterHead(e.target.value as any)}
            className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Head (All)</option>
            {['Hostel', 'Mess', 'SecurityDeposit', 'Tuition', 'Library', 'Exam'].map(h => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Detailed lines */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Fee Breakdown</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Original − Concession + Fine = Payable • Paid • Balance</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {visibleLines.map(l => {
            const bal = Math.max(0, l.payable - l.paid);
            return (
              <li key={`${l.termId}-${l.head}`} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-800 dark:text-gray-100">
                    {l.termName} • {l.head}
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      bal > 0 ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                    }`}
                  >
                    {bal > 0 ? 'Due' : 'Cleared'}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Orig ₹{l.original.toLocaleString()} − Cons ₹{l.concession.toLocaleString()} + Fine ₹{l.fine.toLocaleString()} = Payable ₹
                  {l.payable.toLocaleString()}
                </div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Paid ₹{l.paid.toLocaleString()} • Balance ₹{bal.toLocaleString()}
                </div>
              </li>
            );
          })}
          {visibleLines.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No lines.</li>}
        </ul>
      </div>

      {/* Receipts & ledger */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Receipts & Ledger</p>
          <div className="relative w-full sm:w-80">
            <input
              value={searchReceipt}
              onChange={e => setSearchReceipt(e.target.value)}
              placeholder="Search receipts by ID/mode/ref/note..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredReceipts.slice(start, end).map(p => (
            <li key={p.id} className="p-4 flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-sm text-gray-800 dark:text-gray-100">
                  {p.id} • {p.type} • {p.mode} {p.txnRef ? `• ${p.txnRef}` : ''}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {new Date(p.paidAt).toLocaleString()} {p.note ? `• ${p.note}` : ''}
                </div>
                {p.breakdown.length > 0 && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {p.breakdown.map((b, idx) => (
                      <span key={idx} className="mr-3">
                        {b.termId} {b.head}: ₹{b.amount.toLocaleString()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className={`${p.amount >= 0 ? 'text-green-600 dark:text-green-300' : 'text-amber-600 dark:text-amber-300'} font-semibold`}>
                {p.amount >= 0 ? '+' : ''}₹{p.amount.toLocaleString()}
              </div>
            </li>
          ))}
          {filteredReceipts.length === 0 && <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No receipts.</li>}
        </ul>
        <div className="p-3 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredReceipts.length === 0 ? 0 : start + 1}-{Math.min(end, filteredReceipts.length)} of {filteredReceipts.length}
          </p>
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
      </div>

      {/* Collect Modal */}
      {collectOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setCollectOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Collect Payment • {student.name} ({student.id})
                </h3>
                <button onClick={() => setCollectOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    min={0}
                    onChange={e => setAmount(Number(e.target.value))}
                    className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Mode</label>
                  <select
                    value={mode}
                    onChange={e => setMode(e.target.value as PaymentMode)}
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option>UPI</option>
                    <option>Online</option>
                    <option>Card</option>
                    <option>NetBanking</option>
                    <option>Cash</option>
                    <option>Cheque/DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Txn Ref (optional)</label>
                  <input value={txnRef} onChange={e => setTxnRef(e.target.value)} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Note</label>
                <input
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Optional note"
                />
              </div>
              <div className="mt-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Allocate to dues</p>
                <div className="space-y-2">
                  {invoice.lines
                    .map(l => ({ ...l, due: Math.max(0, l.payable - l.paid) }))
                    .filter(l => l.due > 0 || allocations.some(a => a.key === `${l.termId}-${l.head}`))
                    .map(l => {
                      const key = `${l.termId}-${l.head}`;
                      const current = allocations.find(a => a.key === key)?.amount || 0;
                      const max = Math.max(0, l.payable - l.paid);
                      return (
                        <div key={key} className="flex items-center justify-between gap-3 text-sm">
                          <div className="text-gray-700 dark:text-gray-300">
                            {l.termName} • {l.head} • Due ₹{max.toLocaleString()}
                          </div>
                          <input
                            type="number"
                            min={0}
                            max={max}
                            value={current}
                            onChange={e => {
                              const val = Number(e.target.value);
                              setAllocations(prev => {
                                const others = prev.filter(a => a.key !== key);
                                return val > 0 ? [...others, { key, head: l.head, termId: l.termId, amount: val }] : others;
                              });
                            }}
                            className="w-28 form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      );
                    })}
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Allocation total must equal Amount.</p>
              </div>
              <div className="mt-5 flex items-center justify-end gap-3">
                <button onClick={() => setCollectOpen(false)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                  Cancel
                </button>
                <button onClick={submitCollect} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {refundOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setRefundOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Issue Refund • {student.name}</h3>
                <button onClick={() => setRefundOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="mb-3">
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={refundAmount}
                  onChange={e => setRefundAmount(Number(e.target.value))}
                  min={0}
                  className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Reason / Note</label>
                <input value={refundNote} onChange={e => setRefundNote(e.target.value)} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setRefundOpen(false)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                  Cancel
                </button>
                <button onClick={submitRefund} className="px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Confirm Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy note */}
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2">
        <Info className="w-4 h-4 mt-0.5" />
        Demo late fine rule: ₹{LATE_FINE_PER_DAY}/day after due date capped at ₹{LATE_FINE_CAP}. Institute policies may also permit mess stop,
        defaulter notices, room double-lock, and no-dues issuance post clearance; align actions with official rules.
      </p>
    </div>
  );
};

export default StudentFeesDetail;
