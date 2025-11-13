import React, { useState, useRef, useEffect } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";

// Types
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

type Lab = {
  id: string;
  labName: string;
  labRoomNo: string;
  capacity: number;
  availableSystems?: number;
  equipmentCost: number;
  issueReported: string;
  equipmentNeeded: string;
  // optional uploaded receipt
  receiptName?: string;
  receiptData?: string; // data URL for preview/download
};

// Initial data (NO labs inside blocks)
const initialBlocks: Block[] = [
  {
    blockName: "CSE Block",
    blockType: "Academic",
    location: "Block A, North Campus",
    floors: [
      { floorNumber: 1, rooms: [{ roomName: "C1", roomType: "Classroom", capacity: 40 }] },
      { floorNumber: 2, rooms: [{ roomName: "C4", roomType: "Classroom", capacity: 35 }] },
    ],
  },
  {
    blockName: "EEE Block",
    blockType: "Academic",
    location: "Block B, East Campus",
    floors: [
      { floorNumber: 1, rooms: [{ roomName: "C2", roomType: "Classroom", capacity: 50 }] },
      { floorNumber: 2, rooms: [{ roomName: "Sem1", roomType: "Seminar", capacity: 70 }] },
    ],
  },
];

// Initial CSE labs
const initialCseLabs: Lab[] = [
  { id: "c1", labName: "Digital Systems Lab", labRoomNo: "L-CSE-101", capacity: 24, availableSystems: 20, equipmentCost: 120000, issueReported: "Projector flicker", equipmentNeeded: "2x Oscilloscope" },
  { id: "c2", labName: "AI / ML Lab", labRoomNo: "L-CSE-102", capacity: 30, availableSystems: 28, equipmentCost: 300000, issueReported: "", equipmentNeeded: "GPU upgrades" },
];

// Initial EEE labs - include MATLAB Simulation by default
const initialEeeLabs: Lab[] = [
  { id: "e-matlab", labName: "MATLAB Simulation Lab", labRoomNo: "L-EEE-250", capacity: 25, availableSystems: 22, equipmentCost: 150000, issueReported: "", equipmentNeeded: "Toolboxes & licenses" },
  { id: "e1", labName: "Power Systems Lab", labRoomNo: "L-EEE-201", capacity: 20, availableSystems: 18, equipmentCost: 90000, issueReported: "Multimeter shortage", equipmentNeeded: "10x Multimeter" },
];

// Helper for ID
const genId = (prefix = "x") => `${prefix}${Math.random().toString(36).slice(2, 9)}`;

export default function BlockManagementCards() {
  // Blocks state
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockForm, setBlockForm] = useState<Block>({ blockName: "", blockType: "Academic", location: "", floors: [] });
  const [editBlockIndex, setEditBlockIndex] = useState<number | null>(null);

  // Floors
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [floorForm, setFloorForm] = useState<Floor>({ floorNumber: 1, rooms: [] });
  const [blockFloorIndex, setBlockFloorIndex] = useState<number | null>(null);
  const [editFloorIndex, setEditFloorIndex] = useState<number | null>(null);

  // Rooms (non-lab rooms only)
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [roomForm, setRoomForm] = useState<Room>({ roomName: "", roomType: "Classroom", capacity: 0 });
  const [blockRoomIndex, setBlockRoomIndex] = useState<number | null>(null);
  const [floorRoomIndex, setFloorRoomIndex] = useState<number | null>(null);
  const [editRoomIndex, setEditRoomIndex] = useState<number | null>(null);
  const [roomTypes] = useState<string[]>(["Classroom", "Seminar", "HODOffice", "StaffRoom"]);

  // Labs state (separate sections)
  const [cseLabs, setCseLabs] = useState<Lab[]>(initialCseLabs);
  const [eeeLabs, setEeeLabs] = useState<Lab[]>(initialEeeLabs);
  const [showLabModal, setShowLabModal] = useState(false);
  const [labForm, setLabForm] = useState<Lab>({ id: "", labName: "", labRoomNo: "", capacity: 0, availableSystems: 0, equipmentCost: 0, issueReported: "", equipmentNeeded: "", receiptName: undefined, receiptData: undefined });
  const [editingLabDept, setEditingLabDept] = useState<"CSE" | "EEE" | null>(null);
  const [editLabIndex, setEditLabIndex] = useState<number | null>(null);

  // simple toast notification state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info"; visible: boolean }>({ message: "", type: "success", visible: false });
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success", ms = 3000) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ message, type, visible: true });
    toastTimerRef.current = window.setTimeout(() => setToast(t => ({ ...t, visible: false })), ms);
  };

  // modal focus & scroll management
  const labNameRef = useRef<HTMLInputElement | null>(null);
  const labModalContentRef = useRef<HTMLDivElement | null>(null);

  // receipt handlers for lab modal
  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLabForm(prev => ({ ...prev, receiptName: file.name, receiptData: result }));
      showToast("Receipt uploaded", "success");
    };
    reader.readAsDataURL(file);
  };

  const removeReceipt = () => {
    setLabForm(prev => ({ ...prev, receiptName: undefined, receiptData: undefined }));
    showToast("Receipt removed", "info");
  };

  useEffect(() => {
    // lock body scroll while modal is open
    if (showLabModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showLabModal]);

  // allow Esc to close the lab modal
  useEffect(() => {
    if (!showLabModal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowLabModal(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showLabModal]);

  // open lab modal helper — shows popup, focuses first input and scrolls to top
  const openLabModal = (dept: "CSE" | "EEE", index: number | null) => {
    setEditingLabDept(dept);
    if (index === null) {
      setLabForm({ id: "", labName: "", labRoomNo: "", capacity: 0, availableSystems: 0, equipmentCost: 0, issueReported: "", equipmentNeeded: "", receiptName: undefined, receiptData: undefined });
      setEditLabIndex(null);
    } else {
      const lab = dept === "CSE" ? cseLabs[index] : eeeLabs[index];
      setLabForm(lab);
      setEditLabIndex(index);
    }
    // show modal and focus the name input; reset internal modal scroll
    setShowLabModal(true);
    setTimeout(() => {
      labNameRef.current?.focus();
      if (labModalContentRef.current) labModalContentRef.current.scrollTop = 0;
    }, 220);
  };

  // ----- Block CRUD -----
  const openAddBlock = () => { setBlockForm({ blockName: "", blockType: "Academic", location: "", floors: [] }); setEditBlockIndex(null); setShowBlockModal(true); };
  const openEditBlock = (index: number) => { setBlockForm(blocks[index]); setEditBlockIndex(index); setShowBlockModal(true); };
  const handleBlockSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (editBlockIndex !== null) {
      const updated = [...blocks];
      updated[editBlockIndex] = blockForm;
      setBlocks(updated);
      showToast("Block updated successfully", "success");
    } else {
      setBlocks([...blocks, blockForm]);
      showToast("Block added successfully", "success");
    }
    setShowBlockModal(false);
  };
  const handleDeleteBlock = (index: number) => { if (confirm("Delete this block?")) { setBlocks(blocks.filter((_, i) => i !== index)); showToast("Block deleted", "info"); } };

  // ----- Floor CRUD -----
  const openAddFloor = (blockIdx: number) => { setBlockFloorIndex(blockIdx); setFloorForm({ floorNumber: blocks[blockIdx].floors.length + 1, rooms: [] }); setEditFloorIndex(null); setShowFloorModal(true); };
  const openEditFloor = (blockIdx: number, floorIdx: number) => { setBlockFloorIndex(blockIdx); setFloorForm(blocks[blockIdx].floors[floorIdx]); setEditFloorIndex(floorIdx); setShowFloorModal(true); };
  const handleFloorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (blockFloorIndex === null) return;
    const updated = [...blocks];
    if (editFloorIndex !== null) {
      updated[blockFloorIndex].floors[editFloorIndex] = floorForm;
      showToast("Floor updated successfully", "success");
    } else {
      updated[blockFloorIndex].floors.push(floorForm);
      showToast("Floor added successfully", "success");
    }
    setBlocks(updated);
    setShowFloorModal(false);
  };
  const handleDeleteFloor = (blockIdx: number, floorIdx: number) => { if (confirm("Delete this floor?")) { const updated = [...blocks]; updated[blockIdx].floors.splice(floorIdx, 1); setBlocks(updated); showToast("Floor deleted", "info"); } };

  // ----- Room CRUD (non-lab) -----
  const openAddRoom = (blockIdx: number, floorIdx: number) => { setBlockRoomIndex(blockIdx); setFloorRoomIndex(floorIdx); setRoomForm({ roomName: "", roomType: "Classroom", capacity: 0 }); setEditRoomIndex(null); setShowRoomModal(true); };
  const openEditRoom = (blockIdx: number, floorIdx: number, roomIdx: number) => { setBlockRoomIndex(blockIdx); setFloorRoomIndex(floorIdx); setRoomForm(blocks[blockIdx].floors[floorIdx].rooms[roomIdx]); setEditRoomIndex(roomIdx); setShowRoomModal(true); };
  const handleRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (blockRoomIndex === null || floorRoomIndex === null) return;
    const updated = [...blocks];
    if (editRoomIndex !== null) {
      updated[blockRoomIndex].floors[floorRoomIndex].rooms[editRoomIndex] = roomForm;
      showToast("Room updated successfully", "success");
    } else {
      updated[blockRoomIndex].floors[floorRoomIndex].rooms.push(roomForm);
      showToast("Room added successfully", "success");
    }
    setBlocks(updated);
    setShowRoomModal(false);
  };
  const handleDeleteRoom = (blockIdx: number, floorIdx: number, roomIdx: number) => { if (confirm("Delete this room?")) { const updated = [...blocks]; updated[blockIdx].floors[floorIdx].rooms.splice(roomIdx, 1); setBlocks(updated); showToast("Room deleted", "info"); } };

  // ----- Labs CRUD (CSE & EEE separate) -----
  const openAddLab = (dept: "CSE" | "EEE") => openLabModal(dept, null);
  const handleLabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLabDept) return;
    // determine target id so we can scroll to updated/added card
    let targetId = "";
    if (editLabIndex !== null) {
      // editing existing
      targetId = labForm.id;
      if (editingLabDept === "CSE") {
        const upd = [...cseLabs]; upd[editLabIndex] = labForm; setCseLabs(upd);
      } else {
        const upd = [...eeeLabs]; upd[editLabIndex] = labForm; setEeeLabs(upd);
      }
      showToast(`${editingLabDept} lab updated successfully`, "success");
    } else {
      // adding new
      const labWithId = { ...labForm, id: genId(editingLabDept === "CSE" ? "c" : "e") };
      targetId = labWithId.id;
      if (editingLabDept === "CSE") setCseLabs(prev => [...prev, labWithId]); else setEeeLabs(prev => [...prev, labWithId]);
      showToast(`${editingLabDept} lab added successfully`, "success");
    }
    setShowLabModal(false);
    // after closing modal, scroll to card so user can see update
    setTimeout(() => {
      const selector = `[data-lab="${editingLabDept}-${targetId}"]`;
      const el = document.querySelector(selector) as HTMLElement | null;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 350);
  };
  const handleDeleteLab = (dept: "CSE" | "EEE", index: number) => { if (!confirm("Delete this lab?")) return; if (dept === "CSE") setCseLabs(cseLabs.filter((_, i) => i !== index)); else setEeeLabs(eeeLabs.filter((_, i) => i !== index)); showToast("Lab deleted", "info"); };

  // Stats
  const blocksCount = blocks.length;
  const floorsCount = blocks.reduce((s, b) => s + b.floors.length, 0);
  const roomsCount = blocks.reduce((s, b) => s + b.floors.reduce((fs, f) => fs + f.rooms.length, 0), 0);
  const cseLabsCount = cseLabs.length;
  const eeeLabsCount = eeeLabs.length;

  return (
    <div className="p-6 space-y-6">
      {/* Toast notification */}
      {toast.visible && (
        <div role="status" aria-live="polite" className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow ${toast.type === "success" ? "bg-green-600 text-white" : toast.type === "error" ? "bg-red-600 text-white" : "bg-blue-600 text-white"}`}>
          {toast.message}
        </div>
      )}
      {/* Header + Add buttons */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Campus Resource Management</h1>
        <div className="flex gap-2">
          <button onClick={() => openAddLab("CSE")} className="bg-indigo-600 text-white px-3 py-2 rounded flex items-center gap-2"><Plus /> Add CSE Lab</button>
          <button onClick={() => openAddLab("EEE")} className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2"><Plus /> Add EEE Lab</button>
          <button onClick={openAddBlock} className="bg-primary-600 text-white px-3 py-2 rounded flex items-center gap-2"><Plus /> Add Block</button>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Blocks</div>
          <div className="text-2xl font-bold">{blocksCount}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Floors</div>
          <div className="text-2xl font-bold">{floorsCount}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Rooms</div>
          <div className="text-2xl font-bold">{roomsCount}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">CSE Labs</div>
          <div className="text-2xl font-bold">{cseLabsCount}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">EEE Labs</div>
          <div className="text-2xl font-bold">{eeeLabsCount}</div>
        </div>
      </div>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: CSE Block + CSE Labs */}
        <div className="space-y-6">
          {/* CSE Block (Academic block card group) */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">CSE Block</h2>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-bold">CSE Block</div>
                  <div className="text-sm text-gray-500">Academic ・ Block A, North Campus</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditBlock(0)} className="p-2 rounded hover:bg-gray-100"><Edit2 /></button>
                  <button onClick={() => handleDeleteBlock(0)} className="p-2 rounded text-red-600 hover:bg-red-50"><Trash2 /></button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Floors: {blocks[0]?.floors.length ?? 0}</div>
                <button onClick={() => openAddFloor(0)} className="text-indigo-600 flex items-center gap-1 text-sm"><Plus size={14}/> Add Floor</button>
              </div>

              <div className="space-y-3">
                {blocks[0]?.floors.map((floor, fidx) => (
                  <div key={fidx} className="bg-gray-50 rounded p-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-semibold">Floor {floor.floorNumber} ・ Rooms: {floor.rooms.length}</div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditFloor(0, fidx)} className="p-1 rounded hover:bg-gray-100"><Edit2 size={14}/></button>
                        <button onClick={() => handleDeleteFloor(0, fidx)} className="p-1 rounded text-red-600 hover:bg-red-50"><Trash2 size={14}/></button>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {floor.rooms.map((room, ridx) => (
                        <div key={ridx} className="bg-white border rounded px-3 py-2 flex items-center gap-3">
                          <div>
                            <div className="text-sm font-semibold">{room.roomName}</div>
                            <div className="text-xs text-gray-500">{room.roomType} ・ Capacity: {room.capacity}</div>
                          </div>
                          <div className="flex gap-1 ml-auto">
                            <button onClick={() => openEditRoom(0, fidx, ridx)} className="p-1 rounded hover:bg-gray-100"><Edit2 size={14}/></button>
                            <button onClick={() => handleDeleteRoom(0, fidx, ridx)} className="p-1 rounded text-red-600 hover:bg-red-50"><Trash2 size={14}/></button>
                          </div>
                        </div>
                      ))}
                      {floor.rooms.length === 0 && <div className="text-xs text-gray-400">No rooms</div>}
                    </div>

                    <div className="mt-2">
                      <button onClick={() => openAddRoom(0, fidx)} className="text-sm text-indigo-600 flex items-center gap-1"><Plus size={12}/> Add Room</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CSE Labs */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">CSE Labs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cseLabs.map((lab, idx) => (
                <div key={lab.id} data-lab={`CSE-${lab.id}`} className="bg-white rounded-xl shadow p-5 border border-gray-100 hover:shadow-lg transition">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-indigo-500" />
                        <div>
                          <div className="text-lg font-semibold">{lab.labName}</div>
                          <div className="text-sm text-gray-500">{lab.labRoomNo} ・ Capacity: {lab.capacity}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button onClick={() => openLabModal("CSE", idx)} className="p-2 rounded hover:bg-gray-100" title="Edit"><Edit2 /></button>
                      <button onClick={() => handleDeleteLab("CSE", idx)} className="p-2 rounded text-red-600 hover:bg-red-50" title="Delete"><Trash2 /></button>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-3">
                    <div className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs">Systems: {lab.availableSystems ?? "N/A"}</div>
                    <div className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">Cost: ₹{lab.equipmentCost.toLocaleString()}</div>
          {lab.issueReported && <div className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">Issue</div>}
            {/* Receipt preview / download */}
                        {lab.receiptName && (
                          <div className="w-full mt-2 flex items-center gap-2">
                            <button onClick={() => openLabModal("CSE", idx)} className="text-sm text-indigo-600 underline">{lab.receiptName}</button>
                            {lab.receiptData && (
                              <a href={lab.receiptData} download={lab.receiptName} className="text-sm text-gray-600 hover:text-gray-800">(Download)</a>
                            )}
                          </div>
                        )}
                  </div>
                </div>
              ))}
              {cseLabs.length === 0 && <div className="text-gray-500">No CSE labs yet.</div>}
            </div>
          </section>
        </div>

        {/* Right column: EEE Block + EEE Labs */}
        <div className="space-y-6">
          {/* EEE Block */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">EEE Block</h2>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-bold">EEE Block</div>
                  <div className="text-sm text-gray-500">Academic ・ Block B, East Campus</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditBlock(1)} className="p-2 rounded hover:bg-gray-100"><Edit2 /></button>
                  <button onClick={() => handleDeleteBlock(1)} className="p-2 rounded text-red-600 hover:bg-red-50"><Trash2 /></button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Floors: {blocks[1]?.floors.length ?? 0}</div>
                <button onClick={() => openAddFloor(1)} className="text-indigo-600 flex items-center gap-1 text-sm"><Plus size={14}/> Add Floor</button>
              </div>

              <div className="space-y-3">
                {blocks[1]?.floors.map((floor, fidx) => (
                  <div key={fidx} className="bg-gray-50 rounded p-3">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-semibold">Floor {floor.floorNumber} ・ Rooms: {floor.rooms.length}</div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditFloor(1, fidx)} className="p-1 rounded hover:bg-gray-100"><Edit2 size={14}/></button>
                        <button onClick={() => handleDeleteFloor(1, fidx)} className="p-1 rounded text-red-600 hover:bg-red-50"><Trash2 size={14}/></button>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {floor.rooms.map((room, ridx) => (
                        <div key={ridx} className="bg-white border rounded px-3 py-2 flex items-center gap-3">
                          <div>
                            <div className="text-sm font-semibold">{room.roomName}</div>
                            <div className="text-xs text-gray-500">{room.roomType} ・ Capacity: {room.capacity}</div>
                          </div>
                          <div className="flex gap-1 ml-auto">
                            <button onClick={() => openEditRoom(1, fidx, ridx)} className="p-1 rounded hover:bg-gray-100"><Edit2 size={14}/></button>
                            <button onClick={() => handleDeleteRoom(1, fidx, ridx)} className="p-1 rounded text-red-600 hover:bg-red-50"><Trash2 size={14}/></button>
                          </div>
                        </div>
                      ))}
                      {floor.rooms.length === 0 && <div className="text-xs text-gray-400">No rooms</div>}
                    </div>

                    <div className="mt-2">
                      <button onClick={() => openAddRoom(1, fidx)} className="text-sm text-indigo-600 flex items-center gap-1"><Plus size={12}/> Add Room</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EEE Labs */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">EEE Labs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eeeLabs.map((lab, idx) => (
                <div key={lab.id} data-lab={`EEE-${lab.id}`} className="bg-white rounded-xl shadow p-5 border border-gray-100 hover:shadow-lg transition">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div>
                          <div className="text-lg font-semibold">{lab.labName}</div>
                          <div className="text-sm text-gray-500">{lab.labRoomNo} ・ Capacity: {lab.capacity}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button onClick={() => openLabModal("EEE", idx)} className="p-2 rounded hover:bg-gray-100" title="Edit"><Edit2 /></button>
                      <button onClick={() => handleDeleteLab("EEE", idx)} className="p-2 rounded text-red-600 hover:bg-red-50" title="Delete"><Trash2 /></button>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-3">
                    <div className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs">Systems: {lab.availableSystems ?? "N/A"}</div>
                    <div className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">Cost: ₹{lab.equipmentCost.toLocaleString()}</div>
                    {lab.issueReported && <div className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">Issue</div>}
                    {/* Receipt preview / download */}
                    {lab.receiptName && (
                      <div className="w-full mt-2 flex items-center gap-2">
                        <button onClick={() => openLabModal("EEE", idx)} className="text-sm text-green-600 underline">{lab.receiptName}</button>
                        {lab.receiptData && (
                          <a href={lab.receiptData} download={lab.receiptName} className="text-sm text-gray-600 hover:text-gray-800">(Download)</a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {eeeLabs.length === 0 && <div className="text-gray-500">No EEE labs yet.</div>}
            </div>
          </section>
        </div>
      </div>

      {/* Modals */}
      {showBlockModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-lg mb-4 font-semibold">{editBlockIndex !== null ? "Edit Block" : "Add Block"}</h2>
            <form onSubmit={handleBlockSubmit}>
              <label className="block mb-3">
                <span className="text-sm">Block Name</span>
                <input required className="w-full p-2 rounded border mt-1" value={blockForm.blockName} onChange={e => setBlockForm({ ...blockForm, blockName: e.target.value })} />
              </label>
              <label className="block mb-3">
                <span className="text-sm">Location</span>
                <input required className="w-full p-2 rounded border mt-1" value={blockForm.location} onChange={e => setBlockForm({ ...blockForm, location: e.target.value })} />
              </label>
              <div className="flex justify-end gap-2">
                <button type="button" className="px-3 py-2 rounded bg-gray-200" onClick={() => setShowBlockModal(false)}>Cancel</button>
                <button type="submit" className="px-3 py-2 rounded bg-indigo-600 text-white">{editBlockIndex !== null ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showFloorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-lg mb-4 font-semibold">{editFloorIndex !== null ? "Edit Floor" : "Add Floor"}</h2>
            <form onSubmit={handleFloorSubmit}>
              <label className="block mb-3">
                <span className="text-sm">Floor Number</span>
                <input required type="number" min={1} className="w-full p-2 rounded border mt-1" value={floorForm.floorNumber} onChange={e => setFloorForm({ ...floorForm, floorNumber: Number(e.target.value) })} />
              </label>
              <div className="flex justify-end gap-2">
                <button type="button" className="px-3 py-2 rounded bg-gray-200" onClick={() => setShowFloorModal(false)}>Cancel</button>
                <button type="submit" className="px-3 py-2 rounded bg-indigo-600 text-white">{editFloorIndex !== null ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRoomModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-lg mb-4 font-semibold">{editRoomIndex !== null ? "Edit Room" : "Add Room"}</h2>
            <form onSubmit={handleRoomSubmit}>
              <label className="block mb-3">
                <span className="text-sm">Room Name</span>
                <input required className="w-full p-2 rounded border mt-1" value={roomForm.roomName} onChange={e => setRoomForm({ ...roomForm, roomName: e.target.value })} />
              </label>
              <label className="block mb-3">
                <span className="text-sm">Room Type</span>
                <select required className="w-full p-2 rounded border mt-1" value={roomForm.roomType} onChange={e => setRoomForm({ ...roomForm, roomType: e.target.value })}>
                  {roomTypes.map(rt => <option key={rt} value={rt}>{rt}</option>)}
                </select>
              </label>
              <label className="block mb-3">
                <span className="text-sm">Capacity</span>
                <input required type="number" min={1} className="w-full p-2 rounded border mt-1" value={roomForm.capacity} onChange={e => setRoomForm({ ...roomForm, capacity: Number(e.target.value) })} />
              </label>
              <div className="flex justify-end gap-2">
                <button type="button" className="px-3 py-2 rounded bg-gray-200" onClick={() => setShowRoomModal(false)}>Cancel</button>
                <button type="submit" className="px-3 py-2 rounded bg-indigo-600 text-white">{editRoomIndex !== null ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLabModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div ref={labModalContentRef} className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[86vh] overflow-auto transform transition-all">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <div className="text-lg font-semibold">{editLabIndex !== null ? "Edit Lab" : `Add ${editingLabDept} Lab`}</div>
                <div className="text-xs text-gray-500">Update lab details and attach receipts</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => { setShowLabModal(false); }} className="text-gray-500 hover:text-gray-800 px-2 py-1 rounded-md">✕</button>
              </div>
            </div>

            {/* Body: two-column on md */}
            <form onSubmit={handleLabSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6">
              <div className="md:col-span-2 space-y-3">
                <label className="block">
                  <div className="text-sm text-gray-600 mb-1">Lab Name</div>
                  <input ref={labNameRef} required className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200" value={labForm.labName} onChange={e => setLabForm({ ...labForm, labName: e.target.value })} />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label>
                    <div className="text-sm text-gray-600 mb-1">Lab Room No</div>
                    <input required className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none" value={labForm.labRoomNo} onChange={e => setLabForm({ ...labForm, labRoomNo: e.target.value })} />
                  </label>
                  <label>
                    <div className="text-sm text-gray-600 mb-1">Capacity</div>
                    <input required type="number" min={0} className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none" value={labForm.capacity} onChange={e => setLabForm({ ...labForm, capacity: Number(e.target.value) })} />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label>
                    <div className="text-sm text-gray-600 mb-1">Available Systems (optional)</div>
                    <input type="number" min={0} className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none" value={labForm.availableSystems} onChange={e => setLabForm({ ...labForm, availableSystems: Number(e.target.value) })} />
                  </label>
                  <label>
                    <div className="text-sm text-gray-600 mb-1">Equipment Cost (INR)</div>
                    <input type="number" min={0} className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none" value={labForm.equipmentCost} onChange={e => setLabForm({ ...labForm, equipmentCost: Number(e.target.value) })} />
                  </label>
                </div>

                <label>
                  <div className="text-sm text-gray-600 mb-1">Issue Reported (optional)</div>
                  <input className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none" value={labForm.issueReported} onChange={e => setLabForm({ ...labForm, issueReported: e.target.value })} />
                </label>

                <label>
                  <div className="text-sm text-gray-600 mb-1">Equipment Needed (optional)</div>
                  <input className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none" value={labForm.equipmentNeeded} onChange={e => setLabForm({ ...labForm, equipmentNeeded: e.target.value })} />
                </label>
              </div>

              {/* Right column: receipt and actions */}
              <div className="md:col-span-1 space-y-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="text-sm font-medium text-gray-700">Receipt / Bill</div>
                  <div className="text-xs text-gray-500">Upload image or PDF (keeps only in local state)</div>
                  <input type="file" accept="image/*,.pdf" className="w-full mt-3" onChange={handleReceiptChange} />

                  {labForm.receiptName ? (
                    <div className="mt-4 flex flex-col gap-3">
                      <div className="text-sm text-gray-800 font-medium">{labForm.receiptName}</div>
                      {labForm.receiptData && labForm.receiptData.startsWith('data:image') ? (
                        <img src={labForm.receiptData} alt={labForm.receiptName} className="w-full h-40 object-contain rounded border bg-white" />
                      ) : (
                        <div className="w-full h-40 flex items-center justify-center bg-white rounded border text-sm text-gray-600">Preview not available for this file type</div>
                      )}
                      <div className="flex items-center gap-3">
                        {labForm.receiptData && (
                          <a href={labForm.receiptData} download={labForm.receiptName} className="px-3 py-2 bg-white border rounded text-sm text-gray-700 hover:bg-gray-50">Download</a>
                        )}
                        <button type="button" onClick={removeReceipt} className="px-3 py-2 bg-red-50 text-red-600 rounded text-sm">Remove</button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-gray-500">No receipt attached</div>
                  )}
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <button type="submit" className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg font-medium">{editLabIndex !== null ? 'Update Lab' : 'Add Lab'}</button>
                  <button type="button" onClick={() => setShowLabModal(false)} className="w-full px-4 py-3 border rounded-lg text-sm">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
