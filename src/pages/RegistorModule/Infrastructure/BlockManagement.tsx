import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";

type Room = {
  roomName: string;
  roomType: string;
  capacity: number;
};
type Floor = {
  floorNumber: number;
  rooms: Room[];
};
type Block = {
  blockName: string;
  blockType: string;
  location: string;
  floors: Floor[];
};

const initialBlocks: Block[] = [
  {
    blockName: "CSE Block",
    blockType: "Academic",
    location: "Block A, North Campus",
    floors: [
      { floorNumber: 1, rooms: [{ roomName: "C1", roomType: "Classroom", capacity: 40 }, { roomName: "Lab1", roomType: "Lab", capacity: 24 }] },
      { floorNumber: 2, rooms: [{ roomName: "C4", roomType: "Classroom", capacity: 35 }, { roomName: "Lab3", roomType: "Lab", capacity: 22 }] },
    ],
  },
  {
    blockName: "EEE Block",
    blockType: "Academic",
    location: "Block B, East Campus",
    floors: [
      { floorNumber: 1, rooms: [{ roomName: "C2", roomType: "Classroom", capacity: 50 }] },
      { floorNumber: 2, rooms: [{ roomName: "Sem1", roomType: "SeminarHall", capacity: 70 }] },
    ],
  },
  // more as needed ...
];

export default function BlockManagementCards() {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  // Block modal
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockForm, setBlockForm] = useState<Block>({ blockName: "", blockType: "", location: "", floors: [] });
  const [editBlockIndex, setEditBlockIndex] = useState<number | null>(null);

  // Floor modal
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [floorForm, setFloorForm] = useState<Floor>({ floorNumber: 1, rooms: [] });
  const [blockFloorIndex, setBlockFloorIndex] = useState<number | null>(null);
  const [editFloorIndex, setEditFloorIndex] = useState<number | null>(null);

  // Room modal
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [roomForm, setRoomForm] = useState<Room>({ roomName: "", roomType: "", capacity: 0 });
  const [blockRoomIndex, setBlockRoomIndex] = useState<number | null>(null);
  const [floorRoomIndex, setFloorRoomIndex] = useState<number | null>(null);
  const [editRoomIndex, setEditRoomIndex] = useState<number | null>(null);

  // --- Block logic ---
  const openAddBlock = () => { setBlockForm({ blockName: "", blockType: "", location: "", floors: [] }); setEditBlockIndex(null); setShowBlockModal(true); };
  const openEditBlock = (index: number) => { setBlockForm(blocks[index]); setEditBlockIndex(index); setShowBlockModal(true); };
  const handleBlockSubmit = (e: React.FormEvent) => { e.preventDefault();
    if (editBlockIndex !== null) { const updated = [...blocks]; updated[editBlockIndex] = blockForm; setBlocks(updated);
    } else { setBlocks([...blocks, blockForm]); }
    setShowBlockModal(false);
  };
  const handleDeleteBlock = (index: number) => {
    if (window.confirm("Are you sure to delete this block?")) setBlocks(blocks.filter((_, i) => i !== index));
  };

  // --- Floor logic ---
  const openAddFloor = (blockIdx: number) => { setBlockFloorIndex(blockIdx); setFloorForm({ floorNumber: blocks[blockIdx].floors.length + 1, rooms: [] }); setEditFloorIndex(null); setShowFloorModal(true); };
  const openEditFloor = (blockIdx: number, floorIdx: number) => { setBlockFloorIndex(blockIdx); setFloorForm(blocks[blockIdx].floors[floorIdx]); setEditFloorIndex(floorIdx); setShowFloorModal(true); };
  const handleFloorSubmit = (e: React.FormEvent) => { e.preventDefault();
    if (blockFloorIndex === null) return;
    const updatedBlocks = [...blocks];
    if (editFloorIndex !== null) { updatedBlocks[blockFloorIndex].floors[editFloorIndex] = floorForm;
    } else { updatedBlocks[blockFloorIndex].floors.push(floorForm); }
    setBlocks(updatedBlocks); setShowFloorModal(false);
  };
  const handleDeleteFloor = (blockIdx: number, floorIdx: number) => {
    if (window.confirm("Delete this floor?")) {
      const updatedBlocks = [...blocks];
      updatedBlocks[blockIdx].floors.splice(floorIdx, 1);
      setBlocks(updatedBlocks);
    }
  };

  // --- Room logic ---
  const openAddRoom = (blockIdx: number, floorIdx: number) => { setBlockRoomIndex(blockIdx); setFloorRoomIndex(floorIdx); setRoomForm({ roomName: "", roomType: "", capacity: 0 }); setEditRoomIndex(null); setShowRoomModal(true); };
  const openEditRoom = (blockIdx: number, floorIdx: number, roomIdx: number) => { setBlockRoomIndex(blockIdx); setFloorRoomIndex(floorIdx); setRoomForm(blocks[blockIdx].floors[floorIdx].rooms[roomIdx]); setEditRoomIndex(roomIdx); setShowRoomModal(true); };
  const handleRoomSubmit = (e: React.FormEvent) => { e.preventDefault();
    if (blockRoomIndex === null || floorRoomIndex === null) return;
    const updatedBlocks = [...blocks];
    if (editRoomIndex !== null) { updatedBlocks[blockRoomIndex].floors[floorRoomIndex].rooms[editRoomIndex] = roomForm;
    } else { updatedBlocks[blockRoomIndex].floors[floorRoomIndex].rooms.push(roomForm); }
    setBlocks(updatedBlocks); setShowRoomModal(false);
  };
  const handleDeleteRoom = (blockIdx: number, floorIdx: number, roomIdx: number) => {
    if (window.confirm("Delete this room?")) {
      const updatedBlocks = [...blocks];
      updatedBlocks[blockIdx].floors[floorIdx].rooms.splice(roomIdx, 1);
      setBlocks(updatedBlocks);
    }
  };

  // Summary cards
  const blocksCount = blocks.length;
  const floorsCount = blocks.reduce((s, b) => s + b.floors.length, 0);
  const roomsCount = blocks.reduce((s, b) => s + b.floors.reduce((fs, f) => fs + f.rooms.length, 0), 0);
  const roomTypesCount = Array.from(new Set(blocks.flatMap(b => b.floors.flatMap(f => f.rooms.map(r => r.roomType))))).length;

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
                             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                                Define Infrastructure
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Create and manage the Blocks and Rooms available in the campus.</p>
                        </div>
        <h1 className="text-3xl font-bold text-primary-800 dark:text-gray-100"></h1>
        <button onClick={openAddBlock} className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-800 text-white rounded px-4 py-2 shadow transition flex items-center gap-2" type="button"><Plus size={18} /> Add Block</button>
      </div>
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[{ label: "Blocks", value: blocksCount }, { label: "Floors", value: floorsCount }, { label: "Rooms", value: roomsCount }, { label: "Room Types", value: roomTypesCount }]
          .map((card) => (
            <div key={card.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-xl">
              <span className="text-primary-900 dark:text-gray-300 text-lg font-semibold">{card.label}</span>
              <span className="text-3xl font-bold text-primary-700 dark:text-gray-50">{card.value}</span>
            </div>))}
      </div>
      {/* Card layout for blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blocks.map((block, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-primary-900 dark:text-primary-100">{block.blockName}</div>
                <div className="text-sm text-primary-700 dark:text-primary-300">{block.blockType} ・ {block.location}</div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => openEditBlock(idx)} aria-label="Edit Block" className="hover:bg-primary-100 dark:hover:bg-primary-700 rounded p-2"><Edit2 size={18} /></button>
                <button type="button" onClick={() => handleDeleteBlock(idx)} aria-label="Delete Block" className="hover:bg-red-100 dark:hover:bg-red-900 rounded p-2 text-red-700"><Trash2 size={18} /></button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-primary-800 dark:text-primary-100 font-semibold">Floors: {block.floors.length}</span>
              <button type="button" onClick={() => openAddFloor(idx)} className="text-accent-600 dark:text-accent-400 font-medium flex items-center gap-1"><Plus size={16}/>Add Floor</button>
            </div>
            <div className="flex flex-col gap-3">
              {block.floors.map((floor, fidx) => (
                <div key={fidx} className="bg-primary-50 dark:bg-gray-900 p-3 rounded-lg flex flex-col gap-2">
                  <div className="flex items-center justify-between text-primary-900 dark:text-primary-100">
                    <span className="font-semibold">Floor {floor.floorNumber}・Rooms: {floor.rooms.length}</span>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => openEditFloor(idx, fidx)} aria-label="Edit Floor"><Edit2 size={15} /></button>
                      <button type="button" onClick={() => handleDeleteFloor(idx, fidx)} aria-label="Delete Floor" className="text-red-700"><Trash2 size={15} /></button>
                    </div>
                  </div>
                  <button type="button" onClick={() => openAddRoom(idx, fidx)} className="text-xs text-accent-600 dark:text-accent-400 font-medium flex gap-1 items-center"><Plus size={14}/>Add Room</button>
                  <div className="flex flex-col md:flex-row flex-wrap gap-2 mt-1">
                    {floor.rooms.map((room, ridx) => (
                      <div key={ridx} className="flex items-center gap-2 px-2 py-1 rounded bg-accent-100 dark:bg-accent-800">
                        <div>
                          <span className="block text-xs font-semibold">{room.roomName}</span>
                          <span className="block text-xs">{room.roomType}</span>
                          <span className="block text-xs">Capacity: {room.capacity}</span>
                        </div>
                        <button type="button" onClick={() => openEditRoom(idx, fidx, ridx)} aria-label="Edit Room"><Edit2 size={13}/></button>
                        <button type="button" className="text-red-700" onClick={() => handleDeleteRoom(idx, fidx, ridx)} aria-label="Delete Room"><Trash2 size={13}/></button>
                      </div>
                    ))}
                    {floor.rooms.length === 0 && (<span className="text-xs text-gray-500 dark:text-gray-400">No rooms.</span>)}
                  </div>
                </div>
              ))}
              {block.floors.length === 0 && <span className="text-xs text-gray-400 dark:text-gray-500">No floors yet.</span>}
            </div>
          </div>
        ))}
      </div>
      {/* BLOCK Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <form onSubmit={handleBlockSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-lg mb-4 font-semibold text-primary-800 dark:text-gray-100">{editBlockIndex !== null ? "Edit Block" : "Add Block"}</h2>
            <label className="block mb-3">
              <span className="font-medium text-primary-700 dark:text-gray-300">Block Name</span>
              <input className="w-full p-2 rounded border mt-1 bg-white dark:bg-gray-900" required value={blockForm.blockName} onChange={e => setBlockForm({ ...blockForm, blockName: e.target.value })}/>
            </label>
            <label className="block mb-3">
              <span className="font-medium text-primary-700 dark:text-gray-300">Block Type</span>
              <input className="w-full p-2 rounded border mt-1 bg-white dark:bg-gray-900" required value={blockForm.blockType} onChange={e => setBlockForm({ ...blockForm, blockType: e.target.value })}/>
            </label>
            <label className="block mb-4">
              <span className="font-medium text-primary-700 dark:text-gray-300">Location</span>
              <input className="w-full p-2 rounded border mt-1 bg-white dark:bg-gray-900" required value={blockForm.location} onChange={e => setBlockForm({ ...blockForm, location: e.target.value })}/>
            </label>
            <div className="flex justify-end gap-3 mt-2">
              <button type="button" className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={() => setShowBlockModal(false)}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-primary-600 hover:bg-primary-700 text-white">{editBlockIndex !== null ? "Update" : "Add"}</button>
            </div>
          </form>
        </div>
      )}
      {/* FLOOR Modal */}
      {showFloorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <form onSubmit={handleFloorSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-lg mb-4 font-semibold text-primary-800 dark:text-gray-100">{editFloorIndex !== null ? "Edit Floor" : "Add Floor"}</h2>
            <label className="block mb-3">
              <span className="font-medium text-primary-700 dark:text-gray-300">Floor Number</span>
              <input className="w-full p-2 rounded border mt-1 bg-white dark:bg-gray-900" required type="number" min={1} value={floorForm.floorNumber}
                onChange={e => setFloorForm({ ...floorForm, floorNumber: Number(e.target.value) })}/>
            </label>
            <div className="flex justify-end gap-3 mt-2">
              <button type="button" className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={() => setShowFloorModal(false)}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-primary-600 hover:bg-primary-700 text-white">{editFloorIndex !== null ? "Update" : "Add"}</button>
            </div>
          </form>
        </div>
      )}
      {/* ROOM Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <form onSubmit={handleRoomSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-lg mb-4 font-semibold text-primary-800 dark:text-gray-100">{editRoomIndex !== null ? "Edit Room" : "Add Room"}</h2>
            <label className="block mb-3">
              <span className="font-medium text-primary-700 dark:text-gray-300">Room Name</span>
              <input className="w-full p-2 rounded border mt-1 bg-white dark:bg-gray-900" required value={roomForm.roomName} onChange={e => setRoomForm({ ...roomForm, roomName: e.target.value })}/>
            </label>
            <label className="block mb-3">
              <span className="font-medium text-primary-700 dark:text-gray-300">Room Type</span>
              <input className="w-full p-2 rounded border mt-1 bg-white dark:bg-gray-900" required value={roomForm.roomType} onChange={e => setRoomForm({ ...roomForm, roomType: e.target.value })}/>
            </label>
            <label className="block mb-4">
              <span className="font-medium text-primary-700 dark:text-gray-300">Capacity</span>
              <input className="w-full p-2 rounded border mt-1 bg-white dark:bg-gray-900" required type="number" min={1} value={roomForm.capacity}
                onChange={e => setRoomForm({ ...roomForm, capacity: Number(e.target.value) })}/>
            </label>
            <div className="flex justify-end gap-3 mt-2">
              <button type="button" className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={() => setShowRoomModal(false)}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-primary-600 hover:bg-primary-700 text-white">{editRoomIndex !== null ? "Update" : "Add"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
