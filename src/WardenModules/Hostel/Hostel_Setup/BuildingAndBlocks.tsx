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
  type: 'Boys' | 'Girls' | 'Co-ed';
  blocks: string[];
  floors: number;
  code?: string;
  address?: string;
}
interface Room {
  id: number;
  hostelId: number;
  block: string;
  capacity: number;
  studentIds: number[];
}

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
  { id: 1, name: 'Akal Boys Hostel', type: 'Boys', blocks: ['A', 'B', 'C'], floors: 4, code: 'HB-AKAL', address: 'Block A-C, North Campus' },
  { id: 2, name: 'Prerna Girls Hostel', type: 'Girls', blocks: ['D', 'E'], floors: 5, code: 'HG-PRER', address: 'Block D-E, East Campus' },
  { id: 3, name: 'Harmony Co-ed Hostel', type: 'Co-ed', blocks: ['F'], floors: 3, code: 'HC-HARM', address: 'Block F, Central Campus' },
];
const roomsSeed: Room[] = [
  { id: 101, hostelId: 1, block: 'A', capacity: 2, studentIds: [1, 2] },
  { id: 102, hostelId: 1, block: 'A', capacity: 2, studentIds: [21] },
  { id: 103, hostelId: 1, block: 'B', capacity: 3, studentIds: [4, 5, 6] },
  { id: 104, hostelId: 1, block: 'C', capacity: 1, studentIds: [22] },
  { id: 201, hostelId: 2, block: 'D', capacity: 3, studentIds: [8, 9] },
  { id: 202, hostelId: 2, block: 'D', capacity: 2, studentIds: [] },
  { id: 203, hostelId: 2, block: 'E', capacity: 2, studentIds: [10, 11] },
  { id: 301, hostelId: 3, block: 'F', capacity: 4, studentIds: [12, 13, 14] },
  { id: 302, hostelId: 3, block: 'F', capacity: 2, studentIds: [23] },
];

// Component
const HostelInfrastructure: React.FC = () => {
  const navigate = useNavigate();
  const [hostels, setHostels] = useState<Hostel[]>(hostelsSeed);
  const [rooms, setRooms] = useState<Room[]>(roomsSeed);
  // FIX: initialize to first hostel, not the array
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(hostelsSeed || null);
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
    // FIX: set to first remaining or null
    setSelectedHostel(remaining || null);
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Hostel Infrastructure — Warden</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDarkMode(d => !d)}
                className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
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

      {/* Modals */}
      {isEditModalOpen && selectedHostel && (
        <EditHostelModal
          hostel={selectedHostel}
          onClose={() => setIsEditModalOpen(false)}
          onHostelUpdated={(newName) => {
            setHostels(prev => prev.map(h => h.id === selectedHostel.id ? { ...h, name: newName } : h));
          }}
        />
      )}
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

// Block card
const BlockCard: React.FC<{ hostel: Hostel, blockName: string, rooms: Room[] }> = ({ hostel, blockName, rooms }) => {
  const blockStats = useMemo(() => {
    const blockRooms = rooms.filter(r => r.hostelId === hostel.id && r.block === blockName);
    const totalStudents = blockRooms.reduce((sum, r) => sum + r.studentIds.length, 0);
    const totalCapacity = blockRooms.reduce((sum, r) => sum + (r.capacity || 1), 0);
    const occupancy = totalCapacity > 0 ? (totalStudents / totalCapacity) * 100 : 0;
    return { totalRooms: blockRooms.length, totalStudents, totalCapacity, occupancy };
  }, [hostel.id, blockName, rooms]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{blockName}</h4>
        <div className={`flex items-center text-sm font-semibold ${
          hostel.type === 'Boys' ? 'text-blue-600 dark:text-blue-400' :
          hostel.type === 'Girls' ? 'text-pink-600 dark:text-pink-400' :
          'text-indigo-600 dark:text-indigo-400'
        }`}>
          <User size={16} className="mr-1"/>
          {hostel.type}
        </div>
      </div>
      <div className="space-y-3 mt-2">
        <div className="flex justify-between text-sm"><span>Rooms</span><span className="font-bold">{blockStats.totalRooms}</span></div>
        <div className="flex justify-between text-sm"><span>Capacity</span><span className="font-bold">{`${blockStats.totalStudents} / ${blockStats.totalCapacity}`}</span></div>
      </div>
      <div className="mt-4">
        <p className="text-sm mb-1 text-gray-500 dark:text-gray-400">Occupancy</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className={`h-2.5 rounded-full ${hostel.type==='Girls' ? 'bg-pink-600' : hostel.type==='Co-ed' ? 'bg-indigo-600' : 'bg-blue-600'}`} style={{ width: `${blockStats.occupancy}%` }}></div>
        </div>
      </div>
    </div>
  );
};

// Modals
const EditHostelModal: React.FC<{ hostel: Hostel, onClose: () => void, onHostelUpdated: (newName: string) => void }> = ({ hostel, onClose, onHostelUpdated }) => {
  const [name, setName] = useState(hostel.name);
  const handleSave = () => { onHostelUpdated(name.trim() || hostel.name); onClose(); };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit {hostel.name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close edit modal">
            <X size={20}/>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="font-medium text-sm">Hostel Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 p-2 border dark:border-gray-600 rounded-md bg-transparent focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
        <div className="px-6 py-4 border-t dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

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