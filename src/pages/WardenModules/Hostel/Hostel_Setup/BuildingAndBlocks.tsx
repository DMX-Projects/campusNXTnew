// src/WardenModules/Hostel/HostelInfrastructure.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Plus, Edit2, X, Layers, Users,
  BedDouble, User, Menu, Trash2, AlertTriangle, MapPin, Hash,
} from 'lucide-react';

// Types
interface Hostel {
  id: number;
  name: string;
  type: 'Boys' | 'Girls';
  blocks: string[];
  floors: number; // global default floors
  blockFloors?: Record<string, number>; // per-block floors
  code?: string;
  address?: string;
}
type RoomType = 'Single' | 'Double' | 'Triple';
interface Room {
  id: number;
  hostelId: number;
  block: string;
  floor: number;       // explicit floor number
  roomNumber: string;  // visible room number label
  capacity: number;    // 1,2,3 => Single,Double,Triple
  price: number;       // monthly price in INR
  studentIds: number[];
}
const classifyType = (capacity: number): RoomType =>
  capacity <= 1 ? 'Single' : capacity === 2 ? 'Double' : 'Triple';

// Tailwind dark mode hook (class strategy)
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' ||
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  return [isDarkMode, setIsDarkMode] as const;
};

// Seeds (static)
const hostelsSeed: Hostel[] = [
  { id: 1, name: 'Akal Boys Hostel', type: 'Boys', blocks: ['A', 'B', 'C'], floors: 4, code: 'HB-AKAL', address: 'Block A-C, North Campus', blockFloors: { A: 4, B: 3, C: 2 } },
  { id: 2, name: 'Prerna Girls Hostel', type: 'Girls', blocks: ['D', 'E'], floors: 5, code: 'HG-PRER', address: 'Block D-E, East Campus', blockFloors: { D: 5, E: 4 } },
  { id: 3, name: 'Harmony Girls Hostel', type: 'Girls', blocks: ['F'], floors: 3, code: 'HG-HARM', address: 'Block F, Central Campus', blockFloors: { F: 3 } },
];

// Rooms include floor, roomNumber, and price
const roomsSeed: Room[] = [
  { id: 101, hostelId: 1, block: 'A', floor: 1, roomNumber: 'A-101', capacity: 2, price: 3500, studentIds: [1, 2] },
  { id: 102, hostelId: 1, block: 'A', floor: 2, roomNumber: 'A-201', capacity: 2, price: 3400, studentIds: [] },
  { id: 103, hostelId: 1, block: 'B', floor: 1, roomNumber: 'B-101', capacity: 3, price: 3800, studentIds: [4, 5, 6] },
  { id: 104, hostelId: 1, block: 'C', floor: 2, roomNumber: 'C-201', capacity: 1, price: 3000, studentIds: [] },
  { id: 201, hostelId: 2, block: 'D', floor: 3, roomNumber: 'D-301', capacity: 3, price: 4200, studentIds: [8, 9] },
  { id: 202, hostelId: 2, block: 'D', floor: 1, roomNumber: 'D-101', capacity: 2, price: 3600, studentIds: [] },
  { id: 203, hostelId: 2, block: 'E', floor: 4, roomNumber: 'E-401', capacity: 2, price: 3700, studentIds: [10, 11] },
  { id: 301, hostelId: 3, block: 'F', floor: 2, roomNumber: 'F-201', capacity: 4, price: 4500, studentIds: [12, 13, 14] },
  { id: 302, hostelId: 3, block: 'F', floor: 3, roomNumber: 'F-301', capacity: 2, price: 3600, studentIds: [] },
];

const HostelInfrastructure: React.FC = () => {
  const navigate = useNavigate();
  const [hostels, setHostels] = useState<Hostel[]>(hostelsSeed);
  const [rooms, setRooms] = useState<Room[]>(roomsSeed);
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(hostelsSeed[0] || null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useTheme();

  // Delete (local)
  const handleDeleteHostel = () => {
    if (!selectedHostel) return;
    const id = selectedHostel.id;
    setRooms(prev => prev.filter(r => r.hostelId !== id));
    const remaining = hostels.filter(h => h.id !== id);
    setHostels(remaining);
    setSelectedHostel(remaining[0] || null);
    setIsDeleteModalOpen(false);
  };

  // KPIs
  const hostelStats = useMemo(() => {
    if (!selectedHostel) return null;
    const relevantRooms = rooms.filter(r => r.hostelId === selectedHostel.id);
    const totalStudents = relevantRooms.reduce((sum, room) => sum + room.studentIds.length, 0);
    const totalCapacity = relevantRooms.reduce((sum, room) => sum + (room.capacity || 1), 0);
    return {
      totalRooms: relevantRooms.length,
      totalStudents,
      totalCapacity,
      occupancy: totalCapacity > 0 ? (totalStudents / totalCapacity) * 100 : 0
    };
  }, [selectedHostel, rooms]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <aside className={`fixed lg:relative top-0 left-0 h-full z-30 w-72 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col shrink-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Hostels</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {hostels.map(hostel => (
            <button
              key={hostel.id}
              onClick={() => { setSelectedHostel(hostel); setIsSidebarOpen(false); }}
              className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${selectedHostel?.id === hostel.id ? 'bg-blue-50 dark:bg-blue-900/50 border-blue-500 dark:border-blue-500' : 'hover:border-gray-300 dark:hover:border-gray-600 border-transparent'}`}
            >
              <h3 className="font-bold flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-400" /> {hostel.name}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{hostel.type} Hostel</span>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4" /> {hostel.address || '—'}
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b dark:border-gray-700 px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Open sidebar">
                <Menu size={22} />
              </button>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Hostel Infrastructure</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/hostel/add-new-hostel')} className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 text-sm">
                <Plus size={18} /> <span className="hidden sm:inline">New Hostel</span>
              </button>
            </div>
          </div>
        </div>

        {selectedHostel ? (
          <>
            {/* Selected Hostel */}
            <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 sm:px-6 py-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Building2 size={28} className="text-gray-500 dark:text-gray-400" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{selectedHostel.name}</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700">
                        <Hash className="w-3 h-3" /> {selectedHostel.code || 'N/A'}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700">
                        <MapPin className="w-3 h-3" /> {selectedHostel.address || '—'}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700">
                        Floors: {selectedHostel.floors}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto self-end">
                  <button onClick={() => setIsEditModalOpen(true)} className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm">
                    <Edit2 size={16} /> <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button onClick={() => setIsDeleteModalOpen(true)} className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 font-semibold rounded-lg hover:bg-red-200 dark:hover:bg-red-900 text-sm">
                    <Trash2 size={16} /> <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>

              {hostelStats && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard icon={Layers} label="Blocks" value={selectedHostel?.blocks?.length ?? 0} color="blue" />
                  <StatCard icon={BedDouble} label="Rooms" value={hostelStats.totalRooms} color="green" />
                  <StatCard icon={Users} label="Capacity" value={`${hostelStats.totalStudents} / ${hostelStats.totalCapacity}`} color="purple" />
                  <StatCard icon={User} label="Occupancy" value={`${hostelStats.occupancy.toFixed(1)}%`} color="red" />
                </div>
              )}
            </header>

            {/* Blocks */}
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Hostel Blocks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {(selectedHostel?.blocks || []).map(blockName => (
                    <BlockCard key={blockName} hostel={selectedHostel} blockName={blockName} rooms={rooms} />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <Building2 size={64} className="text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold mb-1">No Hostels Available</h3>
            <p className="text-gray-500 dark:text-gray-400">Please create a new hostel to get started.</p>
            <button onClick={() => navigate('/hostel/add-new-hostel')} className="mt-4 flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
              <Plus size={20} /> Add New Hostel
            </button>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {isEditModalOpen && selectedHostel && (
        <EditHostelModal
          hostel={selectedHostel}
          onClose={() => setIsEditModalOpen(false)}
          onHostelUpdated={(updated) => {
            setHostels(prev => prev.map(h => h.id === updated.id ? updated : h));
            setSelectedHostel(updated);
          }}
          onRoomsUpdated={(updater) => setRooms(updater)}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedHostel && (
        <DeleteConfirmationModal
          hostelName={selectedHostel.name}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteHostel}
          isLoading={false}
        />
      )}
    </div>
  );
};

// Stat card
const StatCard: React.FC<{ icon: React.ElementType, label: string, value: any, color: 'blue'|'green'|'purple'|'red' }> = ({ icon: Icon, label, value, color }) => {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
    red: 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'
  };
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex items-center shadow-sm">
      <div className={`p-3 rounded-lg ${colors[color]}`}><Icon size={20} /></div>
      <div className="ml-3 sm:ml-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

// Block card shows per-block floors if set
const BlockCard: React.FC<{ hostel: Hostel, blockName: string, rooms: Room[] }> = ({ hostel, blockName, rooms }) => {
  const blockStats = useMemo(() => {
    const blockRooms = rooms.filter(r => r.hostelId === hostel.id && r.block === blockName);
    const totalStudents = blockRooms.reduce((sum, r) => sum + r.studentIds.length, 0);
    const totalCapacity = blockRooms.reduce((sum, r) => sum + (r.capacity || 1), 0);
    const occupancy = totalCapacity > 0 ? (totalStudents / totalCapacity) * 100 : 0;
    const typeCount = blockRooms.reduce<Record<RoomType, number>>((acc, r) => {
      const t = classifyType(r.capacity);
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, { Single: 0, Double: 0, Triple: 0 });
    const avgPrice = blockRooms.length ? Math.round(blockRooms.reduce((s, r) => s + (r.price || 0), 0) / blockRooms.length) : 0;
    return { totalRooms: blockRooms.length, totalStudents, totalCapacity, occupancy, typeCount, avgPrice };
  }, [hostel.id, blockName, rooms]);

  const floorsForBlock = hostel.blockFloors?.[blockName] ?? hostel.floors;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{blockName}</h4>
        <div className={`flex items-center text-sm font-semibold ${
          hostel.type === 'Boys' ? 'text-blue-600 dark:text-blue-400' :
          'text-pink-600 dark:text-pink-400'
        }`}>
          <User size={16} className="mr-1"/>
          {hostel.type}
        </div>
      </div>

      <div className="space-y-3 mt-2">
        <div className="flex justify-between text-sm">
          <span>Floors</span><span className="font-bold">{floorsForBlock}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Rooms</span><span className="font-bold">{blockStats.totalRooms}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Capacity</span><span className="font-bold">{`${blockStats.totalStudents} / ${blockStats.totalCapacity}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Avg Price</span><span className="font-bold">₹{blockStats.avgPrice}</span>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-sm mb-1 text-gray-500 dark:text-gray-400">Room Types</p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <span className="inline-flex justify-between bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            Single <strong>{blockStats.typeCount.Single}</strong>
          </span>
          <span className="inline-flex justify-between bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            Double <strong>{blockStats.typeCount.Double}</strong>
          </span>
          <span className="inline-flex justify-between bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            Triple <strong>{blockStats.typeCount.Triple}</strong>
          </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm mb-1 text-gray-500 dark:text-gray-400">Occupancy</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className={`h-2.5 rounded-full ${hostel.type==='Girls' ? 'bg-pink-600' : 'bg-blue-600'}`} style={{ width: `${blockStats.occupancy}%` }} />
        </div>
      </div>
    </div>
  );
};

// Edit modal with per-block floors and per-floor room editor (includes price)
const EditHostelModal: React.FC<{
  hostel: Hostel,
  onClose: () => void,
  onHostelUpdated: (updated: Hostel) => void,
  onRoomsUpdated: (updater: (prev: Room[]) => Room[]) => void
}> = ({ hostel, onClose, onHostelUpdated, onRoomsUpdated }) => {
  const [name, setName] = useState(hostel.name);
  const [code, setCode] = useState(hostel.code || '');
  const [address, setAddress] = useState(hostel.address || '');
  const [floors, setFloors] = useState<number>(hostel.floors);
  const [blocks, setBlocks] = useState<string[]>([...hostel.blocks]);
  const [blockFloors, setBlockFloors] = useState<Record<string, number>>({ ...(hostel.blockFloors || {}) });

  // Local rooms scoped
  const [activeBlock, setActiveBlock] = useState<string>(blocks[0] || '');
  const [activeFloor, setActiveFloor] = useState<number>(1);
  const [localRooms, setLocalRooms] = useState<Room[]>([]);

  useEffect(() => {
    onRoomsUpdated(prev => {
      const mine = prev.filter(r => r.hostelId === hostel.id).map(r => ({ ...r }));
      setLocalRooms(mine);
      return prev;
    });
  }, [hostel.id]);

  useEffect(() => {
    setActiveFloor(1);
  }, [activeBlock]);

  const floorsForBlock = (b: string) => blockFloors[b] ?? floors;

  const addBlock = () => {
    const label = prompt('New block name (e.g., G):')?.trim();
    if (!label) return;
    if (blocks.includes(label)) return alert('Block already exists.');
    setBlocks(prev => [...prev, label]);
    setBlockFloors(prev => ({ ...prev, [label]: 1 }));
    setActiveBlock(label);
    setActiveFloor(1);
  };

  const renameBlock = (oldName: string) => {
    const label = prompt(`Rename block ${oldName} to:`, oldName)?.trim();
    if (!label || label === oldName) return;
    if (blocks.includes(label)) return alert('Block already exists.');
    setBlocks(prev => prev.map(b => (b === oldName ? label : b)));
    setBlockFloors(prev => {
      const { [oldName]: oldVal, ...rest } = prev;
      return { ...rest, [label]: oldVal ?? 1 };
    });
    setLocalRooms(prev => prev.map(r => (r.block === oldName ? { ...r, block: label } : r)));
    if (activeBlock === oldName) setActiveBlock(label);
  };

  const removeBlock = (name: string) => {
    if (!confirm(`Remove block ${name}? Rooms in this block will be deleted.`)) return;
    setBlocks(prev => prev.filter(b => b !== name));
    setLocalRooms(prev => prev.filter(r => r.block !== name));
    setBlockFloors(prev => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
    if (activeBlock === name) {
      const next = blocks.find(b => b !== name) || '';
      setActiveBlock(next);
      setActiveFloor(1);
    }
  };

  const setBlockFloorCount = (b: string, val: number) => {
    const num = Math.max(1, Math.floor(Number(val) || 1));
    setBlockFloors(prev => ({ ...prev, [b]: num }));
    if (activeBlock === b && activeFloor > num) setActiveFloor(num);
  };

  const addRoom = (preset?: Partial<Room>) => {
    if (!activeBlock) return alert('Select a block first.');
    const floor = preset?.floor ?? activeFloor;
    const type: RoomType = (preset?.capacity ? classifyType(preset.capacity) : 'Double');
    const capacity = preset?.capacity ?? (type === 'Single' ? 1 : type === 'Double' ? 2 : 3);
    const roomNumber = preset?.roomNumber ?? `${activeBlock}-${floor}0${Math.floor(Math.random()*9)+1}`;
    const price = preset?.price ?? 3500;
    const id = Math.floor(100000 + Math.random() * 900000);
    const newRoom: Room = { id, hostelId: hostel.id, block: activeBlock, floor, roomNumber, capacity, price, studentIds: [] };
    setLocalRooms(prev => [newRoom, ...prev]);
  };

  const editRoomInline = (roomId: number, patch: Partial<Room>) => {
    setLocalRooms(prev => prev.map(r => r.id === roomId ? { ...r, ...patch } : r));
  };

  const removeRoom = (roomId: number) => {
    if (!confirm('Delete this room?')) return;
    setLocalRooms(prev => prev.filter(r => r.id !== roomId));
  };

  // Validation: rooms >= sum(blockFloors) or floors fallback
  const computeExpectedFloors = (): number => {
    const keys = Object.keys(blockFloors);
    if (keys.length) {
      return keys.reduce((s, b) => s + Math.max(1, Math.floor(Number(blockFloors[b]) || 1)), 0);
    }
    return Math.max(1, Math.floor(Number(floors) || 1));
  };

  const ensureRoomsForFloors = (expectedFloors: number): boolean => {
    const currentRoomsCount = localRooms.length;
    if (currentRoomsCount >= expectedFloors) return true;
    const deficit = expectedFloors - currentRoomsCount;
    if (!confirm(`Rooms (${currentRoomsCount}) are less than total floors (${expectedFloors}). Auto-create ${deficit} Single room(s)?`)) {
      alert('Please add more rooms or reduce floors, then try saving again.');
      return false;
    }
    const targetBlock = activeBlock || blocks[0];
    const defaultFloor = 1;
    const newRooms: Room[] = Array.from({ length: deficit }, (_, i) => ({
      id: Math.floor(100000 + Math.random() * 900000),
      hostelId: hostel.id,
      block: targetBlock!,
      floor: defaultFloor,
      roomNumber: `${targetBlock}-${defaultFloor}A${i+1}`,
      capacity: 1,
      price: 3000,
      studentIds: []
    }));
    setLocalRooms(prev => [...prev, ...newRooms]);
    return true;
  };

  const handleSave = () => {
    if (!name.trim()) return alert('Hostel name is required.');
    if (!blocks.length) return alert('At least one block is required.');

    const expectedFloors = computeExpectedFloors();
    if (!ensureRoomsForFloors(expectedFloors)) return;

    const cleanedBlockFloors: Record<string, number> | undefined =
      Object.keys(blockFloors).length
        ? Object.fromEntries(
            Object.entries(blockFloors).map(([k, v]) => [k, Math.max(1, Math.floor(Number(v) || 1))])
          )
        : undefined;

    const updated: Hostel = {
      ...hostel,
      name: name.trim(),
      code: code.trim() || undefined,
      address: address.trim() || undefined,
      floors: Math.max(1, Math.floor(Number(floors) || 1)),
      blocks: [...blocks],
      blockFloors: cleanedBlockFloors
    };

    onRoomsUpdated(prev => {
      const others = prev.filter(r => r.hostelId !== hostel.id);
      return [...others, ...localRooms];
    });

    onHostelUpdated(updated);
    onClose();
  };

  const filteredRooms = localRooms.filter(r => r.block === activeBlock && r.floor === activeFloor);

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit {hostel.name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close edit modal">
            <X size={20}/>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Hostel basics */}
          <section className="xl:col-span-1 space-y-3">
            <Field label="Hostel Name">
              <input value={name} onChange={e => setName(e.target.value)} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </Field>
            <Field label="Code">
              <input value={code} onChange={e => setCode(e.target.value)} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </Field>
            <Field label="Address">
              <input value={address} onChange={e => setAddress(e.target.value)} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </Field>
            <Field label="Default Floors (fallback)">
              <input type="number" min={1} value={floors} onChange={e => setFloors(Number(e.target.value))} className="w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </Field>
          </section>

          {/* Blocks + Block Floors */}
          <section className="xl:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Blocks</h3>
              <button onClick={addBlock} className="px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700">Add Block</button>
            </div>
            <ul className="space-y-2">
              {blocks.map(b => (
                <li key={b} className={`p-3 rounded border dark:border-gray-700 ${activeBlock === b ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-700' : 'bg-white dark:bg-gray-800'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <button onClick={() => setActiveBlock(b)} className="text-sm font-medium text-gray-800 dark:text-gray-200">{b}</button>
                    <div className="flex items-center gap-2">
                      <button onClick={() => renameBlock(b)} className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600">Rename</button>
                      <button onClick={() => removeBlock(b)} className="px-2 py-1 text-xs rounded bg-rose-600 text-white hover:bg-rose-700">Remove</button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-xs text-gray-600 dark:text-gray-300">Floors for Block {b}</label>
                    <input
                      type="number"
                      min={1}
                      value={blockFloors[b] ?? 1}
                      onChange={e => setBlockFloorCount(b, Number(e.target.value))}
                      className="mt-1 w-28 form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </li>
              ))}
              {blocks.length === 0 && <li className="text-sm text-gray-500 dark:text-gray-400">No blocks yet.</li>}
            </ul>
          </section>

          {/* Rooms manager with Floor selector and Inline editing */}
          <section className="xl:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Rooms in Block {activeBlock || '—'}</h3>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600 dark:text-gray-300">Floor</label>
                <select
                  value={activeFloor}
                  onChange={e => setActiveFloor(Number(e.target.value))}
                  className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                >
                  {Array.from({ length: activeBlock ? floorsForBlock(activeBlock) : 1 }, (_, i) => i+1).map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <button
                  onClick={() => addRoom({ floor: activeFloor, capacity: 2 })}
                  disabled={!activeBlock}
                  className="px-2 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  Add Room
                </button>
              </div>
            </div>

            <div className="overflow-auto rounded border border-gray-200 dark:border-gray-700">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200">
                  <tr>
                    <th className="px-3 py-2 text-left">Room No</th>
                    <th className="px-3 py-2 text-left">Type</th>
                    <th className="px-3 py-2 text-left">Floor</th>
                    <th className="px-3 py-2 text-left">Block</th>
                    <th className="px-3 py-2 text-left">Capacity</th>
                    <th className="px-3 py-2 text-left">Price (₹/mo)</th>
                    <th className="px-3 py-2 text-left">Occupied</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRooms.map(r => (
                    <tr key={r.id} className="bg-white dark:bg-gray-800">
                      <td className="px-3 py-2">
                        <input
                          value={r.roomNumber}
                          onChange={e => editRoomInline(r.id, { roomNumber: e.target.value })}
                          className="w-32 form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={classifyType(r.capacity)}
                          onChange={e => {
                            const t = e.target.value as RoomType;
                            editRoomInline(r.id, { capacity: t === 'Single' ? 1 : t === 'Double' ? 2 : 3 });
                          }}
                          className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <option>Single</option>
                          <option>Double</option>
                          <option>Triple</option>
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={r.floor}
                          onChange={e => editRoomInline(r.id, { floor: Number(e.target.value) })}
                          className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          {Array.from({ length: activeBlock ? floorsForBlock(activeBlock) : 1 }, (_, i) => i+1).map(f => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={r.block}
                          onChange={e => editRoomInline(r.id, { block: e.target.value })}
                          className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          {blocks.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-2">{r.capacity}</td>
                      <td className="px-3 py-2">
                        <div className="relative w-32">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 text-xs">₹</span>
                          <input
                            type="number"
                            min={0}
                            step={100}
                            value={r.price}
                            onChange={e => {
                              const v = Math.max(0, Math.floor(Number(e.target.value) || 0));
                              editRoomInline(r.id, { price: v });
                            }}
                            className="pl-6 w-full form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </td>
                      <td className="px-3 py-2">{r.studentIds.length}</td>
                      <td className="px-3 py-2 text-right">
                        <button onClick={() => removeRoom(r.id)} className="px-2 py-1 text-xs rounded bg-rose-600 text-white hover:bg-rose-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredRooms.length === 0 && (
                    <tr>
                      <td className="px-3 py-6 text-center text-gray-500 dark:text-gray-400" colSpan={8}>
                        No rooms on this floor. Use “Add Room”.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="px-6 py-4 border-t dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

// Small field wrapper
const Field: React.FC<{ label: string, children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="block text-sm mb-1 text-gray-700 dark:text-gray-300">{label}</span>
    {children}
  </label>
);

// Delete confirmation
const DeleteConfirmationModal: React.FC<{ hostelName: string, onClose: () => void, onConfirm: () => void, isLoading: boolean }> = ({ hostelName, onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">Delete Hostel</h3>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <p>Are you sure you want to delete <span className="font-bold">{hostelName}</span>? This will permanently delete the hostel and all its rooms. This action cannot be undone.</p>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-end gap-3 bg-gray-50 dark:bg-gray-700/50">
          <button onClick={onClose} disabled={isLoading} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={isLoading} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:bg-red-400">
            {isLoading ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostelInfrastructure;
