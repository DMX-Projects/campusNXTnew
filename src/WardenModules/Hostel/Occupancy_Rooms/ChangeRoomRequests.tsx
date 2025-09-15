// src/components/hostel/ChangeRoomRequests.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { Filter, Search, CheckCircle2, XCircle,X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

type Status = 'Pending' | 'Approved' | 'Denied';
type ChangeType = 'Transfer' | 'Swap';
type Urgency = 'Low' | 'Medium' | 'High';

interface Requester {
  id: string;
  name: string;
  yearDept: string; // e.g., "3rd Year - CSE"
}

interface RoomRef {
  building: 'A' | 'B' | 'C' | 'D';
  floor: number;
  roomNumber: string;
}

interface ChangeRequest {
  id: string;
  requester: Requester;
  currentRoom: RoomRef;
  desiredRoom?: RoomRef;         // for Transfer
  swapWith?: Requester & { room: RoomRef }; // for Swap (student + their room)
  changeType: ChangeType;
  urgency: Urgency;
  reason: string;
  attachments?: string[];        // filenames or URLs (placeholder)
  status: Status;
  requestedAt: string;           // ISO
  decidedAt?: string;            // ISO
  adminNote?: string;
}

const initialData: ChangeRequest[] = [
  {
    id: 'CR-1001',
    requester: { id: 'ST1023', name: 'Rohan Sharma', yearDept: '2nd Year - CSE' },
    currentRoom: { building: 'A', floor: 1, roomNumber: 'A-101' },
    desiredRoom: { building: 'A', floor: 2, roomNumber: 'A-201' },
    changeType: 'Transfer',
    urgency: 'Medium',
    reason: 'Looking for quieter floor to focus on studies.',
    attachments: [],
    status: 'Pending',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: 'CR-1002',
    requester: { id: 'ST1024', name: 'Priya Singh', yearDept: '3rd Year - ECE' },
    currentRoom: { building: 'A', floor: 1, roomNumber: 'A-102' },
    swapWith: {
      id: 'ST1130',
      name: 'Mohan Das',
      yearDept: '2nd Year - IT',
      room: { building: 'B', floor: 3, roomNumber: 'B-305' }
    },
    changeType: 'Swap',
    urgency: 'High',
    reason: 'Wants closer proximity to lab block and project team.',
    attachments: ['medical_note.pdf'],
    status: 'Pending',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'CR-1003',
    requester: { id: 'ST1201', name: 'Zoya Khan', yearDept: '1st Year - CE' },
    currentRoom: { building: 'D', floor: 2, roomNumber: 'D-201' },
    desiredRoom: { building: 'C', floor: 1, roomNumber: 'C-102' },
    changeType: 'Transfer',
    urgency: 'Low',
    reason: 'Prefers Non-AC room with friends in C-Block.',
    status: 'Denied',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    decidedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    adminNote: 'No availability in requested room for this month.',
  },
  {
    id: 'CR-1004',
    requester: { id: 'ST1032', name: 'Arjun Mehta', yearDept: '4th Year - CSE' },
    currentRoom: { building: 'C', floor: 2, roomNumber: 'C-202' },
    desiredRoom: { building: 'C', floor: 3, roomNumber: 'C-310' },
    changeType: 'Transfer',
    urgency: 'High',
    reason: 'Prepping for placements; needs quieter single room.',
    status: 'Approved',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    decidedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    adminNote: 'Approved; update allocation by 15th.',
  },
];

const badgeByStatus: Record<Status, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  Approved: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Denied: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

const urgencyChip: Record<Urgency, string> = {
  Low: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
  Medium: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  High: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

const ChangeRoomRequests: React.FC = () => {
  const [requests, setRequests] = useState<ChangeRequest[]>(initialData);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ status: '' | Status; changeType: '' | ChangeType; urgency: '' | Urgency }>({
    status: '',
    changeType: '',
    urgency: '',
  });
  const [sortBy, setSortBy] = useState<'requestedAt' | 'urgency'>('requestedAt');

  // Pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [search, filters, sortBy]);

  // Modals
  const [detailItem, setDetailItem] = useState<ChangeRequest | null>(null);
  const [actionItem, setActionItem] = useState<ChangeRequest | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return requests
      .filter(r =>
        (!filters.status || r.status === filters.status) &&
        (!filters.changeType || r.changeType === filters.changeType) &&
        (!filters.urgency || r.urgency === filters.urgency)
      )
      .filter(r => {
        if (!term) return true;
        const hay = [
          r.id,
          r.requester.id,
          r.requester.name,
          r.requester.yearDept,
          `${r.currentRoom.building}-${r.currentRoom.roomNumber}`,
          r.desiredRoom ? `${r.desiredRoom.building}-${r.desiredRoom.roomNumber}` : '',
          r.swapWith ? r.swapWith.id : '',
          r.swapWith ? r.swapWith.name : '',
          r.swapWith ? r.swapWith.yearDept : '',
          r.reason
        ].join(' ').toLowerCase();
        return hay.includes(term);
      })
      .sort((a, b) => {
        if (sortBy === 'requestedAt') return new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime();
        // urgency order High > Medium > Low
        const order: Urgency[] = ['High', 'Medium', 'Low'];
        return order.indexOf(a.urgency) - order.indexOf(b.urgency);
      });
  }, [requests, search, filters, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageItems = filtered.slice(start, end);

  const resetActionModal = () => {
    setActionItem(null);
    setAdminNote('');
  };

  const actOnRequest = (id: string, decision: Extract<Status, 'Approved' | 'Denied'>) => {
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: decision, decidedAt: new Date().toISOString(), adminNote } : r)
    );
    resetActionModal();
  };

  const statusCounts = useMemo(() => {
    return requests.reduce(
      (acc, r) => {
        acc.total += 1;
        acc[r.status] += 1;
        return acc;
      },
      { total: 0, Pending: 0, Approved: 0, Denied: 0 } as { total: number } & Record<Status, number>
    );
  }, [requests]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Change Room Requests</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Review, search, and act on student room-change requests.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{statusCounts.total}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{(statusCounts as any).Pending}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Approved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-300">{(statusCounts as any).Approved}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Denied</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-300">{(statusCounts as any).Denied}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="w-full sm:max-w-md">
            <div className="relative">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by Request ID, Student ID/Name, Room, Reason..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value as any }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Status (All)</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Denied</option>
              </select>
              <select value={filters.changeType} onChange={e => setFilters(f => ({ ...f, changeType: e.target.value as any }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Type (All)</option>
                <option>Transfer</option>
                <option>Swap</option>
              </select>
              <select value={filters.urgency} onChange={e => setFilters(f => ({ ...f, urgency: e.target.value as any }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Urgency (All)</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="requestedAt">Sort: Latest</option>
                <option value="urgency">Sort: Urgency</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pageItems.map(item => (
            <li key={item.id} className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Left */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{item.id}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${badgeByStatus[item.status]}`}>{item.status}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${urgencyChip[item.urgency]}`}>{item.urgency}</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{item.changeType}</span>
                </div>
                <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{item.requester.name}</span> ({item.requester.id}) • {item.requester.yearDept}
                </div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Current: {item.currentRoom.building}-{item.currentRoom.roomNumber} (Floor {item.currentRoom.floor})
                </div>
                {item.changeType === 'Transfer' && item.desiredRoom && (
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    Desired: {item.desiredRoom.building}-{item.desiredRoom.roomNumber} (Floor {item.desiredRoom.floor})
                  </div>
                )}
                {item.changeType === 'Swap' && item.swapWith && (
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    Swap with: {item.swapWith.name} ({item.swapWith.id}) • {item.swapWith.yearDept} • {item.swapWith.room.building}-{item.swapWith.room.roomNumber}
                  </div>
                )}
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{item.reason}</p>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Requested: {new Date(item.requestedAt).toLocaleString()} {item.decidedAt ? `• Decided: ${new Date(item.decidedAt).toLocaleString()}` : ''}
                </div>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                <button onClick={() => setDetailItem(item)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 flex items-center gap-1 text-sm">
                  <Eye className="w-4 h-4" /> View
                </button>
                {item.status === 'Pending' && (
                  <button onClick={() => { setActionItem(item); setAdminNote(''); }} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm">
                    Take Action
                  </button>
                )}
              </div>
            </li>
          ))}

          {pageItems.length === 0 && (
            <li className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">No requests found.</li>
          )}
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

      {/* Detail Modal */}
{detailItem && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDetailItem(null)}>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Request {detailItem.id}</h3>
          <button onClick={() => setDetailItem(null)} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`px-2 py-0.5 text-xs rounded-full ${badgeByStatus[detailItem.status]}`}>{detailItem.status}</span>
          <span className={`px-2 py-0.5 text-xs rounded-full ${urgencyChip[detailItem.urgency]}`}>{detailItem.urgency}</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">{detailItem.changeType}</span>
        </div>

        {/* Helpers to format hostel info from your RoomRef */}
        {/*
          You may replace these maps with actual data from backend later.
        */}
        {(() => {
          const getHostelName = (b: RoomRef['building']) => {
            const map: Record<RoomRef['building'], string> = { A: 'Hostel A', B: 'Hostel B', C: 'Hostel C', D: 'Hostel D' };
            return map[b] || `Hostel ${b}`;
          };
          const getHostelBlock = (b: RoomRef['building']) => `${b}-Block`;
          const getRoomNo = (room: RoomRef) => room.roomNumber;
          const getRoomType = (room: RoomRef) => {
            // Example heuristic; swap with real field when available
            return room.floor >= 3 ? 'Single' : 'Double';
          };
          const getPrevAllotDate = (_: RoomRef) => {
            // Placeholder: derive from student allocation history when integrated
            return '—';
          };

          const current = detailItem.currentRoom;
          const desired = detailItem.desiredRoom;
          const swap = detailItem.swapWith?.room;

          return (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {/* Student Details */}
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Student Details</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {detailItem.requester.name} ({detailItem.requester.id})
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{detailItem.requester.yearDept}</p>
                </div>

                {/* Current Room with enriched fields */}
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Current Room</p>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>Hostel Name: {getHostelName(current.building)}</p>
                    <p>Hostel Block: {getHostelBlock(current.building)}</p>
                    <p>Room No: {getRoomNo(current)}</p>
                    <p>Room Type: {getRoomType(current)}</p>
                    <p>Previous Date of Allotment: {getPrevAllotDate(current)}</p>
                  </div>
                </div>

                {/* Requested Change for Transfer */}
                {detailItem.changeType === 'Transfer' && desired && (
                  <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Requested Change</p>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>Preferred Hostel: {getHostelName(desired.building)}</p>
                      <p>Preferred Block: {getHostelBlock(desired.building)}</p>
                      <p>Preferred Room Type: {getRoomType(desired)}</p>
                    </div>
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      Target: {desired.building}-{desired.roomNumber} (Floor {desired.floor})
                    </p>
                  </div>
                )}

                {/* Requested Change for Swap (renamed and includes preferences) */}
                {detailItem.changeType === 'Swap' && swap && (
                  <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Requested Change</p>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>Preferred Hostel: {getHostelName(swap.building)}</p>
                      <p>Preferred Block: {getHostelBlock(swap.building)}</p>
                      <p>Preferred Room Type: {getRoomType(swap)}</p>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <p>Swap Candidate: {detailItem.swapWith?.name} ({detailItem.swapWith?.id}) • {detailItem.swapWith?.yearDept}</p>
                      <p>Candidate Room: {swap.building}-{swap.roomNumber} (Floor {swap.floor})</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        })()}

        <div className="mt-4">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Reason</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{detailItem.reason}</p>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Timestamps</p>
            <p className="text-gray-700 dark:text-gray-300">Requested: {new Date(detailItem.requestedAt).toLocaleString()}</p>
            {detailItem.decidedAt && <p className="text-gray-700 dark:text-gray-300">Decided: {new Date(detailItem.decidedAt).toLocaleString()}</p>}
          </div>
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Wardens Remarks</p>
            <p className="text-gray-700 dark:text-gray-300">{detailItem.adminNote || 'Not specified'}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button onClick={() => setDetailItem(null)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">Close</button>
          {detailItem.status === 'Pending' && (
            <button onClick={() => { setActionItem(detailItem); setAdminNote(''); }} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Take Action</button>
          )}
        </div>
      </div>
    </div>
  </div>
)}


      {/* Action Modal */}
      {actionItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={resetActionModal}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Act on {actionItem.id}</h3>
                <button onClick={resetActionModal} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wardens Remarks</label>
                <textarea
                  value={adminNote}
                  onChange={e => setAdminNote(e.target.value)}
                  rows={4}
                  placeholder="Provide context for approval or denial..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button onClick={resetActionModal} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">Cancel</button>
                <button onClick={() => actOnRequest(actionItem.id, 'Denied')} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Deny
                </button>
                <button onClick={() => actOnRequest(actionItem.id, 'Approved')} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeRoomRequests;
