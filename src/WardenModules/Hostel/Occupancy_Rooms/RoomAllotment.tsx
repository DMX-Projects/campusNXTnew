// src/components/hostel/RoomAllotment.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { LayoutGrid, List, SlidersHorizontal, UserPlus, X } from 'lucide-react';

interface Occupant {
  id: string;
  name: string;
  bedNumber: number;
  yearDept: string;
}

interface Room {
  id: number;
  building: 'A' | 'B' | 'C' | 'D';
  floor: number;
  roomNumber: string;
  roomType: 'Single' | 'Double' | 'Triple' | 'Dormitory';
  capacity: number;
  occupants: Occupant[];
  amenities: ('AC' | 'Non-AC' | 'Attached Bathroom' | 'Study Desk' | 'Fan')[];
  status: 'Available' | 'Full' | 'Maintenance';
  rent: number;
}

const initialRoomsData: Room[] = [
  { id: 1, building: 'A', floor: 1, roomNumber: 'A-101', roomType: 'Double', capacity: 2,
    occupants: [{ id: 'ST1023', name: 'Rohan Sharma', bedNumber: 1, yearDept: '2nd Year - CSE' }],
    amenities: ['AC', 'Attached Bathroom', 'Study Desk'], status: 'Available', rent: 8000 },

  { id: 2, building: 'A', floor: 1, roomNumber: 'A-102', roomType: 'Double', capacity: 2,
    occupants: [
      { id: 'ST1024', name: 'Priya Singh', bedNumber: 1, yearDept: '3rd Year - ECE' },
      { id: 'ST1025', name: 'Anjali Verma', bedNumber: 2, yearDept: '3rd Year - ECE' }
    ],
    amenities: ['AC', 'Attached Bathroom', 'Fan'], status: 'Full', rent: 8000 },

  { id: 3, building: 'A', floor: 2, roomNumber: 'A-201', roomType: 'Triple', capacity: 3,
    occupants: [{ id: 'ST1101', name: 'Karthik Iyer', bedNumber: 1, yearDept: '1st Year - ME' }],
    amenities: ['Non-AC', 'Study Desk'], status: 'Available', rent: 6000 },

  { id: 4, building: 'A', floor: 3, roomNumber: 'A-301', roomType: 'Double', capacity: 2,
    occupants: [],
    amenities: ['Non-AC', 'Fan'], status: 'Maintenance', rent: 6000 },

  { id: 5, building: 'A', floor: 4, roomNumber: 'A-401', roomType: 'Single', capacity: 1,
    occupants: [],
    amenities: ['AC', 'Study Desk'], status: 'Available', rent: 12000 },

  { id: 6, building: 'B', floor: 1, roomNumber: 'B-101', roomType: 'Triple', capacity: 3,
    occupants: [
      { id: 'ST1027', name: 'Amit Kumar', bedNumber: 1, yearDept: '4th Year - ECE' },
      { id: 'ST1028', name: 'Suresh Patel', bedNumber: 2, yearDept: '4th Year - ECE' },
      { id: 'ST1029', name: 'Manoj Tiwari', bedNumber: 3, yearDept: '4th Year - ECE' }
    ],
    amenities: ['Non-AC', 'Fan'], status: 'Full', rent: 5500 },

  { id: 7, building: 'B', floor: 2, roomNumber: 'B-205', roomType: 'Triple', capacity: 3,
    occupants: [{ id: 'ST1026', name: 'Vikram Rathore', bedNumber: 1, yearDept: '1st Year - ME' }],
    amenities: ['Non-AC', 'Study Desk'], status: 'Available', rent: 5500 },

  { id: 8, building: 'B', floor: 3, roomNumber: 'B-305', roomType: 'Double', capacity: 2,
    occupants: [{ id: 'ST1130', name: 'Mohan Das', bedNumber: 1, yearDept: '2nd Year - IT' }],
    amenities: ['AC', 'Study Desk'], status: 'Available', rent: 9000 },

  { id: 9, building: 'C', floor: 1, roomNumber: 'C-102', roomType: 'Double', capacity: 2,
    occupants: [],
    amenities: ['Non-AC', 'Fan'], status: 'Available', rent: 6500 },

  { id: 10, building: 'C', floor: 2, roomNumber: 'C-202', roomType: 'Single', capacity: 1,
    occupants: [{ id: 'ST1032', name: 'Arjun Mehta', bedNumber: 1, yearDept: '4th Year - CSE' }],
    amenities: ['AC', 'Attached Bathroom', 'Study Desk'], status: 'Full', rent: 12500 },

  { id: 11, building: 'C', floor: 3, roomNumber: 'C-310', roomType: 'Single', capacity: 1,
    occupants: [],
    amenities: ['AC', 'Study Desk'], status: 'Available', rent: 12000 },

  { id: 12, building: 'D', floor: 2, roomNumber: 'D-201', roomType: 'Dormitory', capacity: 6,
    occupants: [{ id: 'ST1201', name: 'Zoya Khan', bedNumber: 1, yearDept: '1st Year - CE' }],
    amenities: ['Non-AC', 'Fan'], status: 'Available', rent: 4000 },

  { id: 13, building: 'D', floor: 3, roomNumber: 'D-310', roomType: 'Double', capacity: 2,
    occupants: [{ id: 'ST1202', name: 'Nitin Rao', bedNumber: 1, yearDept: '2nd Year - EEE' }],
    amenities: ['Non-AC', 'Study Desk'], status: 'Available', rent: 5000 },

  { id: 14, building: 'D', floor: 4, roomNumber: 'D-401', roomType: 'Dormitory', capacity: 6,
    occupants: [
      { id: 'ST1030', name: 'Sunita Devi', bedNumber: 1, yearDept: '2nd Year - CE' },
      { id: 'ST1031', name: 'Geeta Biswas', bedNumber: 2, yearDept: '2nd Year - CE' }
    ],
    amenities: ['Non-AC', 'Fan'], status: 'Available', rent: 4000 },

  { id: 15, building: 'A', floor: 2, roomNumber: 'A-202', roomType: 'Double', capacity: 2,
    occupants: [{ id: 'ST1301', name: 'Dev Patel', bedNumber: 1, yearDept: '1st Year - IT' }],
    amenities: ['AC', 'Study Desk'], status: 'Available', rent: 8500 },

  { id: 16, building: 'B', floor: 2, roomNumber: 'B-210', roomType: 'Double', capacity: 2,
    occupants: [],
    amenities: ['Non-AC', 'Fan'], status: 'Available', rent: 5200 },

  { id: 17, building: 'C', floor: 1, roomNumber: 'C-105', roomType: 'Triple', capacity: 3,
    occupants: [
      { id: 'ST1401', name: 'Rehan Ali', bedNumber: 1, yearDept: '2nd Year - ME' },
      { id: 'ST1402', name: 'Sahil Jain', bedNumber: 2, yearDept: '2nd Year - ME' }
    ],
    amenities: ['Non-AC', 'Study Desk'], status: 'Available', rent: 6000 },

  { id: 18, building: 'D', floor: 3, roomNumber: 'D-315', roomType: 'Double', capacity: 2,
    occupants: [
      { id: 'ST1501', name: 'Kiran Joshi', bedNumber: 1, yearDept: '3rd Year - CSE' },
      { id: 'ST1502', name: 'Meena Kumari', bedNumber: 2, yearDept: '3rd Year - CSE' }
    ],
    amenities: ['AC', 'Study Desk'], status: 'Full', rent: 9000 },
];

const RoomAllotment: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRoomsData);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [filters, setFilters] = useState({ building: '', roomType: '', status: '', floor: '' });
  const [sortBy, setSortBy] = useState<'roomNumber' | 'rent' | 'vacancy'>('roomNumber');

  const [search, setSearch] = useState<string>('');
  const [roomForDetails, setRoomForDetails] = useState<Room | null>(null);
  const [roomForAllotment, setRoomForAllotment] = useState<Room | null>(null);
  const [selectedBed, setSelectedBed] = useState<number | null>(null);

  const pageSize = 12;
  const [cardPage, setCardPage] = useState(1);
  const [tablePage, setTablePage] = useState(1);

  useEffect(() => { setCardPage(1); setTablePage(1); }, [filters, sortBy, search, viewMode]);

  const processedRooms = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = rooms
      .filter(r =>
        (!filters.building || r.building === filters.building) &&
        (!filters.roomType || r.roomType === filters.roomType) &&
        (!filters.status || r.status === filters.status) &&
        (!filters.floor || r.floor === Number(filters.floor))
      )
      .filter(r => {
        if (!term) return true;
        return r.occupants.some(o =>
          o.id.toLowerCase().includes(term) || o.name.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'rent') return a.rent - b.rent;
        if (sortBy === 'vacancy') return (b.capacity - b.occupants.length) - (a.capacity - a.occupants.length);
        return a.roomNumber.localeCompare(b.roomNumber);
      });
    return list;
  }, [rooms, filters, sortBy, search]);

  const cardTotal = processedRooms.length;
  const cardTotalPages = Math.max(1, Math.ceil(cardTotal / pageSize));
  const cardStart = (cardPage - 1) * pageSize;
  const cardEnd = Math.min(cardStart + pageSize, cardTotal);
  const cardRooms = processedRooms.slice(cardStart, cardEnd);

  const tableTotal = processedRooms.length;
  const tableTotalPages = Math.max(1, Math.ceil(tableTotal / pageSize));
  const tableStart = (tablePage - 1) * pageSize;
  const tableEnd = Math.min(tableStart + pageSize, tableTotal);
  const tableRooms = processedRooms.slice(tableStart, tableEnd);

  const stats = useMemo(() => {
    const totalRooms = rooms.length;
    const totalCapacity = rooms.reduce((acc, r) => acc + r.capacity, 0);
    const totalOccupants = rooms.reduce((acc, r) => acc + r.occupants.length, 0);
    return { totalRooms, totalCapacity, totalOccupants, vacancy: totalCapacity - totalOccupants };
  }, [rooms]);

  const openAllotModal = (room: Room) => {
    setRoomForAllotment(room);
    setSelectedBed(null);
  };

  const submitAllotment = (studentId: string) => {
    if (!roomForAllotment || !studentId.trim() || selectedBed == null) return;
    if (roomForAllotment.occupants.some(o => o.bedNumber === selectedBed)) return;

    setRooms(prev => prev.map(r => {
      if (r.id !== roomForAllotment.id) return r;
      const updated = [...r.occupants, { id: studentId, name: `Student ${studentId}`, bedNumber: selectedBed, yearDept: '—' }];
      return { ...r, occupants: updated, status: updated.length === r.capacity ? 'Full' : 'Available' };
    }));
    setRoomForAllotment(null);
    setSelectedBed(null);
  };

  const FilterTag = ({ label, value, onClear }: { label: string; value: string; onClear: () => void }) =>
    !value ? null : (
      <span className="inline-flex items-center bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 rounded-full px-3 py-1 text-sm font-medium">
        {label}: {value}
        <button onClick={onClear} className="ml-2 -mr-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-700 p-0.5">
          <X size={14} />
        </button>
      </span>
    );

  const Pagination = ({
    total, start, end, page, setPage, totalPages,
  }: {
    total: number; start: number; end: number; page: number; setPage: (p: number) => void; totalPages: number;
  }) => (
    <nav className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3" aria-label="Pagination">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Showing {total === 0 ? 0 : start + 1}-{end} of {total}
      </p>
      <ul className="inline-flex items-center -space-x-px text-sm">
        <li>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 h-9 flex items-center justify-center leading-tight text-gray-600 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          const active = p === page;
          return (
            <li key={p}>
              <button
                onClick={() => setPage(p)}
                className={`px-3 h-9 flex items-center justify-center leading-tight border border-gray-300 dark:border-gray-700 ${
                  active
                    ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                    : 'text-gray-600 bg-white hover:bg-gray-100 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {p}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 h-9 flex items-center justify-center leading-tight text-gray-600 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Room Allotment</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Search by student, filter by building/floor/type/status, and allot beds.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Rooms</h3><p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRooms}</p></div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Capacity</h3><p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCapacity}</p></div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Occupied</h3><p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOccupants}</p></div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"><h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Vacancy</h3><p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.vacancy}</p></div>
        </div>

        {/* Search + Filters + View Toggle */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
          {/* Search bar */}
          <form onSubmit={e => e.preventDefault()} className="mb-3">
            <div className="relative flex items-center">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by Student ID or Name..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <svg className="pointer-events-none absolute right-3 h-5 w-5 text-gray-400 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0011.15 11.15z" />
              </svg>
            </div>
          </form>

          {/* Active filter tags */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <FilterTag label="Building" value={filters.building} onClear={() => setFilters(f => ({ ...f, building: '' }))} />
            <FilterTag label="Room Type" value={filters.roomType} onClear={() => setFilters(f => ({ ...f, roomType: '' }))} />
            <FilterTag label="Status" value={filters.status} onClear={() => setFilters(f => ({ ...f, status: '' }))} />
            <FilterTag label="Floor" value={filters.floor} onClear={() => setFilters(f => ({ ...f, floor: '' }))} />
          </div>

          {/* Filter controls + view toggle */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <SlidersHorizontal className="text-gray-500 dark:text-gray-400" size={20} />
              <select value={filters.building} onChange={e => setFilters(f => ({ ...f, building: e.target.value }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Building (All)</option>
                <option>A</option><option>B</option><option>C</option><option>D</option>
              </select>
              <select value={filters.roomType} onChange={e => setFilters(f => ({ ...f, roomType: e.target.value }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Room Type (All)</option>
                <option>Single</option><option>Double</option><option>Triple</option><option>Dormitory</option>
              </select>
              <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Status (All)</option>
                <option>Available</option><option>Full</option><option>Maintenance</option>
              </select>
              <select value={filters.floor} onChange={e => setFilters(f => ({ ...f, floor: e.target.value }))} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="">Floor (All)</option>
                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="roomNumber">Sort by Room No.</option>
                <option value="rent">Sort by Rent</option>
                <option value="vacancy">Sort by Vacancy</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setViewMode('card')} className={`p-2 rounded-md ${viewMode === 'card' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}><LayoutGrid size={20} /></button>
              <button onClick={() => setViewMode('table')} className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}><List size={20} /></button>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'card' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cardRooms.map(room => {
                const vacancy = room.capacity - room.occupants.length;
                return (
                  <div key={room.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer transition-transform hover:scale-[1.01]" onClick={() => setRoomForDetails(room)}>
                    <div className={`p-4 border-l-4 ${room.status === 'Available' ? 'border-green-500' : room.status === 'Full' ? 'border-red-500' : 'border-yellow-500'}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{room.roomNumber}</h3>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">INR {room.rent}/mo</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Floor {room.floor} | {room.roomType}</p>
                    </div>

                    <div className="p-4 flex-grow">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Vacancy:</strong> <span className="font-bold">{vacancy}/{room.capacity}</span>
                      </p>

                      <div className="mt-2">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Amenities</h4>
                        <div className="text-xs flex flex-wrap gap-2">
                          {room.amenities.map(a => <span key={a} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">{a}</span>)}
                        </div>
                      </div>

                      <div className="mt-3">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Occupants</h4>
                        {room.occupants.length ? (
                          <div className="flex flex-wrap gap-2">
                            {room.occupants.map(o => (
                              <span key={o.id} className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                                {o.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500 dark:text-gray-400">No occupants</p>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                      {room.status === 'Available' ? (
                        <button onClick={(e) => { e.stopPropagation(); openAllotModal(room); }} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">
                          <UserPlus size={16} /> Allot Room
                        </button>
                      ) : (
                        <p className={`text-center font-semibold ${room.status === 'Full' ? 'text-red-500' : 'text-yellow-500'}`}>{room.status}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Pagination total={cardTotal} start={cardStart} end={cardEnd} page={cardPage} setPage={setCardPage} totalPages={cardTotalPages} />
          </>
        ) : (
          <>
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>{['Room', 'Building', 'Floor', 'Type', 'Capacity', 'Vacancy', 'Rent', 'Status', 'Occupants', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {tableRooms.map(room => {
                    const vacancy = room.capacity - room.occupants.length;
                    return (
                      <tr key={room.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => setRoomForDetails(room)}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">{room.roomNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.building}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.floor}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.roomType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.capacity}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold">{vacancy}</td>
                        <td className="px-6 py-4 whitespace-nowrap">INR {room.rent}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : room.status === 'Full' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'}`}>
                            {room.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{room.occupants.map(o => o.name).join(', ') || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          {room.status === 'Available' && (
                            <button onClick={() => openAllotModal(room)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Allot</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Pagination total={tableTotal} start={tableStart} end={tableEnd} page={tablePage} setPage={setTablePage} totalPages={tableTotalPages} />
          </>
        )}
      </div>

      {/* Room Details Modal */}
      {roomForDetails && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4" onClick={() => setRoomForDetails(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg max-h-full overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Room {roomForDetails.roomNumber}</h3>
              <button onClick={() => setRoomForDetails(null)} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"><X size={24} /></button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <p><strong>Building:</strong> {roomForDetails.building}</p>
              <p><strong>Floor:</strong> {roomForDetails.floor}</p>
              <p><strong>Type:</strong> {roomForDetails.roomType}</p>
              <p><strong>Status:</strong> {roomForDetails.status}</p>
              <p className="col-span-2"><strong>Rent:</strong> INR {roomForDetails.rent} / month</p>
            </div>

            <h4 className="font-semibold text-gray-800 dark:text-gray-300 mb-2">Occupants ({roomForDetails.occupants.length}/{roomForDetails.capacity})</h4>
            {roomForDetails.occupants.length ? (
              <ul className="space-y-3 mb-4">
                {roomForDetails.occupants.map(o => (
                  <li key={o.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">{o.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                        Bed {o.bedNumber}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Student ID:</span> {o.id}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Year–Dept:</span> {o.yearDept}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mb-4">No occupants yet.</p>
            )}

            <h4 className="font-semibold text-gray-800 dark:text-gray-300 mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {roomForDetails.amenities.map(a => (
                <span key={a} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">{a}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Allotment Modal (with Bed selection) */}
      {roomForAllotment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Allot Bed in {roomForAllotment.roomNumber}</h3>
                <button onClick={() => setRoomForAllotment(null)} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"><X size={24} /></button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); submitAllotment((e.currentTarget.elements.namedItem('studentId') as HTMLInputElement).value); }}>
                <p className="mb-4 text-gray-600 dark:text-gray-400">Select an empty bed and enter the student ID.</p>

                <div className="mb-4">
                  <label htmlFor="bed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Bed</label>
                  <select
                    id="bed"
                    className="w-full form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={selectedBed ?? ''}
                    onChange={(e) => setSelectedBed(Number(e.target.value))}
                    required
                  >
                    <option value="" disabled>-- Select available bed --</option>
                    {[...Array(roomForAllotment.capacity)].map((_, i) => {
                      const bed = i + 1;
                      const occupied = roomForAllotment.occupants.some(o => o.bedNumber === bed);
                      return (
                        <option key={bed} value={bed} disabled={occupied}>
                          Bed {bed} {occupied ? '(Occupied)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student ID</label>
                  <input id="studentId" type="text" placeholder="e.g., ST2031" className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <button type="button" onClick={() => setRoomForAllotment(null)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">Confirm Allotment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomAllotment;
