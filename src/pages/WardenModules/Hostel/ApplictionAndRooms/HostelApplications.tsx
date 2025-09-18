// src/components/hostel/HostelApplications.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { Filter, Search, Eye, CheckCircle2, XCircle, UserCheck, Building2, ReceiptText, ChevronLeft, ChevronRight, X } from 'lucide-react';

type ApplicantType = 'NewJoiner' | 'ExistingStudent';
type VerificationStatus = 'Pending' | 'Verified' | 'Rejected';
type FeeStatus = 'Unpaid' | 'Partially Paid' | 'Paid';
type AppStatus = 'Pending' | 'Allocated' | 'Rejected' | 'Waitlisted';

interface StudentRef { id: string; name: string; yearDept: string; }
interface PreferredRoom { building?: 'A' | 'B' | 'C' | 'D'; floor?: number; roomType?: 'Single' | 'Double' | 'Triple' | 'Dormitory'; preferencesNote?: string; }
interface PaymentInfo { amountDue: number; amountPaid: number; lastTxnId?: string; lastTxnAt?: string; feeStatus: FeeStatus; }
interface VerificationInfo { docStatus: VerificationStatus; guardianConsent: VerificationStatus; medicalClearance: VerificationStatus; remarks?: string; }
interface AllocationInfo { allocated?: { building: 'A'|'B'|'C'|'D'; floor: number; roomNumber: string; bedNumber?: number; }; decidedAt?: string; note?: string; }
interface HostelApplication {
  id: string; applicantType: ApplicantType; student: StudentRef;
  contactPhone: string; contactEmail: string;
  requestedOn: string; preferredRoom: PreferredRoom; reason: string;
  payment: PaymentInfo; verification: VerificationInfo; status: AppStatus; allocation?: AllocationInfo;
}

/** Expanded hardcoded availability inventory */
type RoomType = 'Single' | 'Double' | 'Triple' | 'Dormitory';
interface InventoryRoom { building: 'A'|'B'|'C'|'D'; floor: number; roomNumber: string; type: RoomType; capacity: number; occupiedBeds: number[]; }

const inventory: InventoryRoom[] = [
  { building: 'A', floor: 1, roomNumber: 'A-101', type: 'Double', capacity: 2, occupiedBeds: [21] },
  { building: 'A', floor: 1, roomNumber: 'A-102', type: 'Double', capacity: 2, occupiedBeds: [] },
  { building: 'A', floor: 2, roomNumber: 'A-201', type: 'Triple', capacity: 3, occupiedBeds: [22] },
  { building: 'A', floor: 2, roomNumber: 'A-202', type: 'Double', capacity: 2, occupiedBeds: [22] },
  { building: 'A', floor: 3, roomNumber: 'A-301', type: 'Double', capacity: 2, occupiedBeds: [] },

  { building: 'B', floor: 1, roomNumber: 'B-101', type: 'Triple', capacity: 3, occupiedBeds: [1,2] },
  { building: 'B', floor: 2, roomNumber: 'B-205', type: 'Triple', capacity: 3, occupiedBeds: [21] },
  { building: 'B', floor: 3, roomNumber: 'B-305', type: 'Double', capacity: 2, occupiedBeds: [21] },
  { building: 'B', floor: 3, roomNumber: 'B-310', type: 'Single', capacity: 1, occupiedBeds: [] },

  { building: 'C', floor: 1, roomNumber: 'C-102', type: 'Double', capacity: 2, occupiedBeds: [] },
  { building: 'C', floor: 1, roomNumber: 'C-105', type: 'Triple', capacity: 3, occupiedBeds: [1,2] },
  { building: 'C', floor: 2, roomNumber: 'C-202', type: 'Single', capacity: 1, occupiedBeds: [21] },
  { building: 'C', floor: 3, roomNumber: 'C-310', type: 'Single', capacity: 1, occupiedBeds: [] },

  { building: 'D', floor: 2, roomNumber: 'D-201', type: 'Dormitory', capacity: 6, occupiedBeds: [1,2,3] },
  { building: 'D', floor: 3, roomNumber: 'D-315', type: 'Double', capacity: 2, occupiedBeds: [1,2] }, // full
  { building: 'D', floor: 4, roomNumber: 'D-401', type: 'Dormitory', capacity: 6, occupiedBeds: [1,2] },
];

const initialApplications: HostelApplication[] = [
  { id: 'HA-2025-0001', applicantType: 'NewJoiner', student: { id: 'ST2099', name: 'Neha Gupta', yearDept: '1st Year - CSE' }, contactPhone: '+91 98765 10001', contactEmail: 'neha.gupta@example.edu', requestedOn: new Date(Date.now() - 36e5*30).toISOString(), preferredRoom: { building: 'A', floor: 1, roomType: 'Double', preferencesNote: 'Prefer AC with study desk' }, reason: 'Confirmed admission and paid hostel fee; need room from 1st Oct.', payment: { amountDue: 8000, amountPaid: 8000, lastTxnId: 'TXN-NEHA-001', lastTxnAt: new Date(Date.now() - 36e5*28).toISOString(), feeStatus: 'Paid' }, verification: { docStatus: 'Verified', guardianConsent: 'Verified', medicalClearance: 'Verified' }, status: 'Pending' },
  { id: 'HA-2025-0002', applicantType: 'ExistingStudent', student: { id: 'ST1501', name: 'Kiran Joshi', yearDept: '3rd Year - CSE' }, contactPhone: '+91 98765 10002', contactEmail: 'kiran.j@example.edu', requestedOn: new Date(Date.now() - 36e5*6).toISOString(), preferredRoom: { building: 'D', floor: 3, roomType: 'Double', preferencesNote: 'Willing to share, near library block' }, reason: 'Currently using public transport; wants to move to hostel due to late labs.', payment: { amountDue: 9000, amountPaid: 9000, lastTxnId: 'TXN-KIRAN-045', lastTxnAt: new Date(Date.now() - 36e5*5).toISOString(), feeStatus: 'Paid' }, verification: { docStatus: 'Verified', guardianConsent: 'Pending', medicalClearance: 'Verified', remarks: 'Guardian consent awaited' }, status: 'Pending' },
  { id: 'HA-2025-0003', applicantType: 'ExistingStudent', student: { id: 'ST1402', name: 'Sahil Jain', yearDept: '2nd Year - ME' }, contactPhone: '+91 98765 10003', contactEmail: 'sahil.jain@example.edu', requestedOn: new Date(Date.now() - 36e5*72).toISOString(), preferredRoom: { building: 'C', floor: 1, roomType: 'Triple' }, reason: 'Wants to join hostel to save commute time.', payment: { amountDue: 6000, amountPaid: 3000, lastTxnId: 'TXN-SAHIL-009', lastTxnAt: new Date(Date.now() - 36e5*70).toISOString(), feeStatus: 'Partially Paid' }, verification: { docStatus: 'Verified', guardianConsent: 'Verified', medicalClearance: 'Pending' }, status: 'Waitlisted' },
  { id: 'HA-2025-0004', applicantType: 'NewJoiner', student: { id: 'ST2201', name: 'Riya Patel', yearDept: '1st Year - ECE' }, contactPhone: '+91 98765 10004', contactEmail: 'riya.patel@example.edu', requestedOn: new Date(Date.now() - 36e5*96).toISOString(), preferredRoom: { building: 'A', floor: 2, roomType: 'Double' }, reason: 'Joining confirmed; fee paid; needs room near CSE block.', payment: { amountDue: 8500, amountPaid: 8500, lastTxnId: 'TXN-RIYA-003', lastTxnAt: new Date(Date.now() - 36e5*93).toISOString(), feeStatus: 'Paid' }, verification: { docStatus: 'Verified', guardianConsent: 'Verified', medicalClearance: 'Verified' }, status: 'Allocated', allocation: { allocated: { building: 'A', floor: 2, roomNumber: 'A-202', bedNumber: 2 }, decidedAt: new Date(Date.now() - 36e5*72).toISOString(), note: 'Allotted bed 2 in A-202' } },
];

const statusBadge: Record<AppStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Allocated: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  Waitlisted: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
};
const verifyBadge: Record<VerificationStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Verified: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};
const feeBadge: Record<FeeStatus, string> = {
  Unpaid: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  'Partially Paid': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Paid: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
};

const HostelApplications: React.FC = () => {
  const [apps, setApps] = useState<HostelApplication[]>(initialApplications);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ status: '' | AppStatus; type: '' | ApplicantType; fee: '' | FeeStatus }>({ status: '', type: '', fee: '' });
  const [sortBy, setSortBy] = useState<'requestedOn' | 'feeStatus' | 'type'>('requestedOn');

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [search, filters, sortBy]);

  // Modals
  const [detailItem, setDetailItem] = useState<HostelApplication | null>(null);
  const [actionItem, setActionItem] = useState<HostelApplication | null>(null);
  const [adminNote, setAdminNote] = useState('');

  // Dependent selects for availability
  const [selBuilding, setSelBuilding] = useState<'A'|'B'|'C'|'D'>('A');
  const [selFloor, setSelFloor] = useState<number>(1);
  const [selRoom, setSelRoom] = useState<string>('');
  const [selBed, setSelBed] = useState<number | ''>('');

  const stats = useMemo(() => apps.reduce((acc, a) => { acc.total += 1; acc[a.status] += 1; return acc; }, { total: 0, Pending: 0, Allocated: 0, Rejected: 0, Waitlisted: 0 } as { total: number } & Record<AppStatus, number>), [apps]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return apps
      .filter(a =>
        (!filters.status || a.status === filters.status) &&
        (!filters.type || a.applicantType === filters.type) &&
        (!filters.fee || a.payment.feeStatus === filters.fee)
      )
      .filter(a => {
        if (!term) return true;
        const hay = [a.id, a.student.id, a.student.name, a.student.yearDept, a.contactEmail, a.contactPhone, a.reason, a.preferredRoom.building || '', a.preferredRoom.roomType || ''].join(' ').toLowerCase();
        return hay.includes(term);
      })
      .sort((a, b) => {
        if (sortBy === 'requestedOn') return new Date(b.requestedOn).getTime() - new Date(a.requestedOn).getTime();
        if (sortBy === 'feeStatus') { const order: FeeStatus[] = ['Unpaid', 'Partially Paid', 'Paid']; return order.indexOf(a.payment.feeStatus) - order.indexOf(b.payment.feeStatus); }
        if (sortBy === 'type') { const order: ApplicantType[] = ['NewJoiner', 'ExistingStudent']; return order.indexOf(a.applicantType) - order.indexOf(b.applicantType); }
        return 0;
      });
  }, [apps, search, filters, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = filtered.slice(start, end);

  // Availability derivations
  const floorsForBuilding = useMemo(() => {
    const set = new Set(inventory.filter(r => r.building === selBuilding).map(r => r.floor));
    return Array.from(set).sort((a,b) => a-b);
  }, [selBuilding]);

  const roomsForSelection = useMemo(() => inventory.filter(r => r.building === selBuilding && r.floor === selFloor), [selBuilding, selFloor]);

  const currentRoom = useMemo(() => roomsForSelection.find(r => r.roomNumber === selRoom), [roomsForSelection, selRoom]);

  const emptyBeds = useMemo(() => {
    if (!currentRoom) return [];
    const arr = Array.from({ length: currentRoom.capacity }, (_, i) => i+1);
    return arr.filter(bed => !currentRoom.occupiedBeds.includes(bed));
  }, [currentRoom]);

  // Open action prefill to preference
  const openAction = (a: HostelApplication) => {
    setActionItem(a);
    setAdminNote('');
    const b = (a.preferredRoom.building as any) || 'A';
    const f = a.preferredRoom.floor || 1;
    setSelBuilding(b);
    setSelFloor(f);
    const rooms = inventory.filter(r => r.building === b && r.floor === f);
    const available = rooms.find(r => r.capacity > r.occupiedBeds.length);
    setSelRoom(available ? available.roomNumber : (rooms?.roomNumber || ''));
    setSelBed('');
  };

  const decide = (id: string, decision: AppStatus) => {
    if (!actionItem) return;
    if (decision === 'Allocated' && (!currentRoom || emptyBeds.length === 0 || selBed === '')) {
      alert('Please choose a room with available bed and select a bed number.');
      return;
    }
    setApps(prev => prev.map(a => {
      if (a.id !== id) return a;
      if (decision === 'Allocated' && currentRoom && selBed !== '') {
        return {
          ...a,
          status: 'Allocated',
          allocation: {
            allocated: { building: currentRoom.building, floor: currentRoom.floor, roomNumber: currentRoom.roomNumber, bedNumber: Number(selBed) },
            decidedAt: new Date().toISOString(),
            note: adminNote || 'Allocated via admin action',
          }
        };
      }
      if (decision === 'Rejected' || decision === 'Waitlisted') {
        return {
          ...a,
          status: decision,
          allocation: { ...a.allocation, decidedAt: new Date().toISOString(), note: adminNote || (decision === 'Rejected' ? 'Rejected' : 'Waitlisted') }
        };
      }
      return a;
    }));
    setActionItem(null);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hostel Applications</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Compact cards for quick triage; view details to expand; allocate with live availability.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Total</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p></div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Pending</p><p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{(stats as any).Pending}</p></div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Allocated</p><p className="text-2xl font-bold text-green-600 dark:text-green-300">{(stats as any).Allocated}</p></div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p><p className="text-2xl font-bold text-red-600 dark:text-red-300">{(stats as any).Rejected}</p></div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><p className="text-sm text-gray-500 dark:text-gray-400">Waitlisted</p><p className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">{(stats as any).Waitlisted}</p></div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by App/Student/Contact/Reason..." className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value as any }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Status (All)</option><option>Pending</option><option>Allocated</option><option>Rejected</option><option>Waitlisted</option>
              </select>
              <select value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value as any }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Type (All)</option><option>NewJoiner</option><option>ExistingStudent</option>
              </select>
              <select value={filters.fee} onChange={e => setFilters(f => ({ ...f, fee: e.target.value as any }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Fee (All)</option><option>Paid</option><option>Partially Paid</option><option>Unpaid</option>
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="requestedOn">Sort: Latest</option><option value="feeStatus">Sort: Fee Status</option><option value="type">Sort: Type</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* List (compact for mobile) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pageItems.map(item => (
            <li key={item.id} className="p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              {/* Left */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{item.id}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${statusBadge[item.status]}`}>{item.status}</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{item.applicantType}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${feeBadge[item.payment.feeStatus]}`}>{item.payment.feeStatus}</span>
                </div>
                <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 truncate">
                  <span className="font-medium">{item.student.name}</span> ({item.student.id}) • {item.student.yearDept}
                </div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1"><UserCheck className="w-4 h-4" /> {item.contactPhone}</span>
                  <span className="inline-flex items-center gap-1"><ReceiptText className="w-4 h-4" /> ₹{item.payment.amountPaid}/{item.payment.amountDue}</span>
                  {item.preferredRoom.roomType && (
                    <span className="inline-flex items-center gap-1"><Building2 className="w-4 h-4" /> {item.preferredRoom.building || 'Any'} • {item.preferredRoom.roomType} • Fl {item.preferredRoom.floor || '—'}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{item.reason}</p>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">Requested: {new Date(item.requestedOn).toLocaleString()}</div>
              </div>
              {/* Right actions */}
              <div className="flex items-center gap-2">
                <button onClick={() => setDetailItem(item)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1 text-sm"><Eye className="w-4 h-4" /> View</button>
                {(item.status === 'Pending' || item.status === 'Waitlisted') && (
<button onClick={() => openAction(item)} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm">
Take Action
</button>
)}
              </div>
            </li>
          ))}
          {pageItems.length === 0 && (<li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No applications found.</li>)}
        </ul>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {total === 0 ? 0 : start + 1}-{end} of {total}</p>
        <div className="inline-flex -space-x-px">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 h-9 border border-gray-300 rounded-s-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 h-9 border border-gray-300 rounded-e-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Detail Modal */}
      {detailItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDetailItem(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Application {detailItem.id}</h3>
                <button onClick={() => setDetailItem(null)} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 text-xs rounded-full ${statusBadge[detailItem.status]}`}>{detailItem.status}</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{detailItem.applicantType}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${feeBadge[detailItem.payment.feeStatus]}`}>{detailItem.payment.feeStatus}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Student</p>
                  <p className="text-gray-700 dark:text-gray-300">{detailItem.student.name} ({detailItem.student.id})</p>
                  <p className="text-gray-600 dark:text-gray-400">{detailItem.student.yearDept}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 break-all">Phone: {detailItem.contactPhone}</p>
                  <p className="text-gray-600 dark:text-gray-400 break-all">Email: {detailItem.contactEmail}</p>
                </div>

                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Preferences</p>
                  <p className="text-gray-700 dark:text-gray-300">Building: {detailItem.preferredRoom.building || 'Any'}</p>
                  <p className="text-gray-700 dark:text-gray-300">Floor: {detailItem.preferredRoom.floor || '—'}</p>
                  <p className="text-gray-700 dark:text-gray-300">Room Type: {detailItem.preferredRoom.roomType || 'Any'}</p>
                  {detailItem.preferredRoom.preferencesNote && <p className="text-gray-600 dark:text-gray-400 mt-1">{detailItem.preferredRoom.preferencesNote}</p>}
                </div>

                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Verification</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${verifyBadge[detailItem.verification.docStatus]}`}>Docs: {detailItem.verification.docStatus}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${verifyBadge[detailItem.verification.guardianConsent]}`}>Guardian: {detailItem.verification.guardianConsent}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${verifyBadge[detailItem.verification.medicalClearance]}`}>Medical: {detailItem.verification.medicalClearance}</span>
                  </div>
                  {detailItem.verification.remarks && <p className="text-gray-600 dark:text-gray-400 mt-2">{detailItem.verification.remarks}</p>}
                </div>

                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Payment</p>
                  <p className="text-gray-700 dark:text-gray-300">Paid: ₹{detailItem.payment.amountPaid} / ₹{detailItem.payment.amountDue}</p>
                  {detailItem.payment.lastTxnId && <p className="text-gray-600 dark:text-gray-400 break-all">Txn: {detailItem.payment.lastTxnId}</p>}
                  {detailItem.payment.lastTxnAt && <p className="text-gray-600 dark:text-gray-400">At: {new Date(detailItem.payment.lastTxnAt).toLocaleString()}</p>}
                </div>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">Reason</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{detailItem.reason}</p>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Requested On</p>
                  <p className="text-gray-700 dark:text-gray-300">{new Date(detailItem.requestedOn).toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Decision</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {detailItem.status === 'Allocated' && detailItem.allocation?.decidedAt
                      ? `Allocated at ${new Date(detailItem.allocation.decidedAt).toLocaleString()}`
                      : '—'}
                  </p>
                  {detailItem.allocation?.allocated && (
                    <p className="text-gray-700 dark:text-gray-300">
                      Room: {detailItem.allocation.allocated.building}-{detailItem.allocation.allocated.roomNumber} (Floor {detailItem.allocation.allocated.floor}) {detailItem.allocation.allocated.bedNumber ? `• Bed ${detailItem.allocation.allocated.bedNumber}` : ''}
                    </p>
                  )}
                  {detailItem.allocation?.note && (<p className="text-gray-600 dark:text-gray-400">Note: {detailItem.allocation.note}</p>)}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <button onClick={() => setDetailItem(null)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">Close</button>
                {(detailItem.status === 'Pending' || detailItem.status === 'Waitlisted') && (
<button onClick={() => openAction(detailItem)} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
Take Action
</button>
)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal with availability */}
      {actionItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setActionItem(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Act on {actionItem.id}</h3>
                <button onClick={() => setActionItem(null)} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
              </div>

              {/* Availability: building -> floor -> room -> bed */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Building</label>
                  <select value={selBuilding} onChange={e => { setSelBuilding(e.target.value as any); setSelFloor(1); setSelRoom(''); setSelBed(''); }} className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option>A</option><option>B</option><option>C</option><option>D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Floor</label>
                  <select value={selFloor} onChange={e => { setSelFloor(Number(e.target.value)); setSelRoom(''); setSelBed(''); }} className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {floorsForBuilding.map(f => (<option key={f} value={f}>{f}</option>))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room</label>
                  <select value={selRoom} onChange={e => { setSelRoom(e.target.value); setSelBed(''); }} className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="" disabled>-- Select room --</option>
                    {roomsForSelection.map(r => {
                      const vacant = r.capacity - r.occupiedBeds.length;
                      const full = vacant === 0;
                      return <option key={r.roomNumber} value={r.roomNumber} disabled={full}>{r.roomNumber} • {r.type} • {vacant}/{r.capacity} available</option>;
                    })}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bed</label>
                  <select value={selBed} onChange={e => setSelBed(Number(e.target.value))} className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={!currentRoom || emptyBeds.length === 0}>
                    <option value="">-- Select bed --</option>
                    {emptyBeds.map(b => (<option key={b} value={b}>Bed {b}</option>))}
                  </select>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    {currentRoom ? <>Selected {currentRoom.roomNumber}: {currentRoom.capacity - currentRoom.occupiedBeds.length}/{currentRoom.capacity} beds free</> : 'Pick a building/floor/room to see availability'}
                  </p>
                </div>
              </div>

              {/* Wardens Remarks */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wardens Remarks</label>
                <textarea value={adminNote} onChange={e => setAdminNote(e.target.value)} rows={3} placeholder="Add note for allocation/waitlist/rejection..." className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text:white dark:border-gray-600" />
              </div>

              <div className="mt-5 flex items-center justify-end gap-3">
                <button onClick={() => setActionItem(null)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">Cancel</button>
                <button onClick={() => decide(actionItem.id, 'Waitlisted')} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Waitlist</button>
                <button onClick={() => decide(actionItem.id, 'Rejected')} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"><XCircle className="w-4 h-4" /> Reject</button>
                <button onClick={() => decide(actionItem.id, 'Allocated')} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Allocate</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelApplications;
