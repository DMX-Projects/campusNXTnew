import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Save,
  FileText,
  AlertCircle,
  CheckCircle,
  Home,
  Wrench,
  BedDouble,
} from 'lucide-react';

// --- Types ---
interface BlockConfig {
  id: number;
  name: string;
  floors: number; // count
}

interface RoomTypeConfig {
  id: number;
  typeName: string;
  capacity: number;
  amenities: string[];
  price: number; // NEW
}

type RoomNumbersByType = {
  [roomTypeId: number]: string[]; // explicit room numbers per type
};

interface FloorGenerationConfig {
  roomNumbersByType: RoomNumbersByType;
}

interface BlockFloorMap {
  [floor: number]: FloorGenerationConfig;
}
interface GenerationConfig {
  [blockId: number]: BlockFloorMap;
}

type HostelType = 'Boys' | 'Girls' | 'Co-ed';

interface NewHostelData {
  name: string;
  type: HostelType;
  description: string;
  warden: string; // NEW
  blocks: BlockConfig[];
  roomTypes: RoomTypeConfig[];
}

// --- Theme Hook (unchanged) ---
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
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

const AddNewHostel: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isDarkMode] = useTheme();

  // Hardcoded seed data
  const defaultWardens = useMemo(
    () => ['Dr. Neeraj Sharma', 'Ms. Priya Iyer', 'Mr. Arjun Mehta', 'Mrs. Kavya Rao'],
    []
  );

  const [hostelData, setHostelData] = useState<NewHostelData>({
    name: '',
    type: 'Boys',
    description: '',
    warden: defaultWardens,
    blocks: [{ id: Date.now(), name: 'Block A', floors: 3 }],
    roomTypes: [
      {
        id: Date.now() + 1,
        typeName: 'Single Seater',
        capacity: 1,
        amenities: ['Bed', 'Table', 'Chair', 'Cupboard'],
        price: 65000,
      },
      {
        id: Date.now() + 2,
        typeName: 'Double Seater',
        capacity: 2,
        amenities: ['Bed', 'Table', 'Chair'],
        price: 45000,
      },
    ],
  });

  // Generation config: per block/floor, enter explicit room numbers per template
  const [generation, setGeneration] = useState<GenerationConfig>({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const steps = [
    'Hostel Details',
    'Blocks & Floors',
    'Room Types',
    'Generate Rooms',
    'Finalize',
  ];

  // Ensure generation map structure aligns with blocks/floors
  useEffect(() => {
    setGeneration((prev) => {
      const next: GenerationConfig = { ...prev };
      hostelData.blocks.forEach((block) => {
        if (!next[block.id]) next[block.id] = {};
        // Ensure floors exist
        for (let f = 1; f <= block.floors; f++) {
          if (!next[block.id][f]) {
            next[block.id][f] = { roomNumbersByType: {} };
          }
        }
        // Remove floors beyond current count
        Object.keys(next[block.id]).forEach((k) => {
          const floorNum = parseInt(k, 10);
          if (floorNum > block.floors) {
            delete next[block.id][floorNum];
          }
        });
      });
      // Remove generation for removed blocks
      Object.keys(next).forEach((bid) => {
        const exists = hostelData.blocks.some((b) => String(b.id) === String(bid));
        if (!exists) delete next[Number(bid)];
      });
      return { ...next };
    });
  }, [hostelData.blocks]);

  // Nav
  const nextStep = () => {
    // Basic validation gates
    if (step === 1 && !hostelData.name.trim()) {
      setError('Hostel Name is required.');
      setTimeout(() => setError(''), 2500);
      return;
    }
    if (step === 2 && hostelData.blocks.length === 0) {
      setError('Add at least one block.');
      setTimeout(() => setError(''), 2500);
      return;
    }
    if (step === 3 && hostelData.roomTypes.length === 0) {
      setError('Add at least one room template.');
      setTimeout(() => setError(''), 2500);
      return;
    }
    setError('');
    setStep((prev) => (prev < 5 ? prev + 1 : prev));
  };
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  // Step 1 handlers
  const handleHostelInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHostelData((d) => ({ ...d, [name]: value }));
  };

  // Step 2: Blocks & Floors
  const addBlock = () => {
    const nextIndex = hostelData.blocks.length;
    setHostelData((d) => ({
      ...d,
      blocks: [
        ...d.blocks,
        {
          id: Date.now(),
          name: `Block ${String.fromCharCode(65 + nextIndex)}`,
          floors: 1,
        },
      ],
    }));
  };

  const renameBlock = (id: number, name: string) => {
    setHostelData((d) => ({
      ...d,
      blocks: d.blocks.map((b) => (b.id === id ? { ...b, name } : b)),
    }));
  };

  const addFloor = (id: number) => {
    setHostelData((d) => ({
      ...d,
      blocks: d.blocks.map((b) =>
        b.id === id ? { ...b, floors: b.floors + 1 } : b
      ),
    }));
  };

  const removeBlock = (id: number) => {
    setHostelData((d) => {
      if (d.blocks.length <= 1) {
        setError('At least one block must remain.');
        setTimeout(() => setError(''), 2500);
        return d;
      }
      return { ...d, blocks: d.blocks.filter((b) => b.id !== id) };
    });
  };

  // Step 3: Room Types (with price)
  const addRoomType = () => {
    setHostelData((d) => ({
      ...d,
      roomTypes: [
        ...d.roomTypes,
        { id: Date.now(), typeName: '', capacity: 1, amenities: [], price: 0 },
      ],
    }));
  };

  const updateRoomType = (
    id: number,
    field: keyof RoomTypeConfig,
    value: any
  ) => {
    setHostelData((d) => ({
      ...d,
      roomTypes: d.roomTypes.map((rt) => (rt.id === id ? { ...rt, [field]: value } : rt)),
    }));
  };

  const handleAmenitiesChange = (id: number, amenities: string) => {
    updateRoomType(
      id,
      'amenities',
      amenities.split(',').map((a) => a.trim()).filter(Boolean)
    );
  };

  const removeRoomType = (id: number) => {
    setHostelData((d) => {
      if (d.roomTypes.length <= 1) {
        setError('At least one room type is required.');
        setTimeout(() => setError(''), 2500);
        return d;
      }
      return { ...d, roomTypes: d.roomTypes.filter((rt) => rt.id !== id) };
    });
  };

  // Step 4: Generate Rooms — explicit room numbers per type
  const getFloorConfig = (blockId: number, floor: number): FloorGenerationConfig => {
    return generation[blockId]?.[floor] ?? { roomNumbersByType: {} };
  };

  const setFloorRoomNumbers = (
    blockId: number,
    floor: number,
    roomTypeId: number,
    roomNumbers: string[]
  ) => {
    setGeneration((prev) => {
      const next = { ...prev };
      if (!next[blockId]) next[blockId] = {};
      if (!next[blockId][floor]) next[blockId][floor] = { roomNumbersByType: {} };
      next[blockId][floor] = {
        ...next[blockId][floor],
        roomNumbersByType: {
          ...next[blockId][floor].roomNumbersByType,
          [roomTypeId]: roomNumbers,
        },
      };
      return next;
    });
  };

  const parseRoomNumbers = (value: string) => {
    // Accept comma-separated values; trim and dedupe
    const parts = value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const uniq = Array.from(new Set(parts));
    return uniq;
  };

  const getTotalRooms = useMemo(() => {
    let total = 0;
    for (const b of hostelData.blocks) {
      for (let f = 1; f <= b.floors; f++) {
        const cfg = generation[b.id]?.[f];
        if (!cfg) continue;
        for (const key in cfg.roomNumbersByType) {
          total += cfg.roomNumbersByType[Number(key)]?.length ?? 0;
        }
      }
    }
    return total;
  }, [hostelData.blocks, generation]);

  // Step 5: Finalize (no API — just simulate submit)
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // In a real app, this is where the payload would be sent.
      // Here, we just confirm locally.
      setTimeout(() => {
        setSuccess(
          `Hostel '${hostelData.name}' configured with ${getTotalRooms} rooms.`
        );
        setLoading(false);
      }, 800);
    } catch (e) {
      setLoading(false);
      setError('Failed to finalize. Please review inputs.');
      console.error(e);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
              Create New Hostel
            </h1>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              A wizard to configure new hostel facilities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
          <div className="flex items-center">
            {steps.map((title, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold transition-all duration-300 ${
                      step > index + 1
                        ? 'bg-blue-600 text-white'
                        : step === index + 1
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step > index + 1 ? <CheckCircle size={20} /> : index + 1}
                  </div>
                  <span
                    className={`ml-2 md:ml-3 hidden sm:inline font-semibold transition-colors duration-300 ${
                      step >= index + 1
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-auto border-t-2 mx-2 sm:mx-4 transition-colors duration-500 ease-in-out ${
                      step > index + 2 ? 'border-blue-600' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-8 min-h-[50vh]">
          {step === 1 && (
            <section className="space-y-8 animate-fade-in">
              <div className="flex items-center space-x-4">
                <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Basic Hostel Details
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hostel Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={hostelData.name}
                    onChange={handleHostelInfoChange}
                    className="w-full text-lg px-4 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 'Vivekananda Bhawan'"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hostel For *
                  </label>
                  <select
                    name="type"
                    value={hostelData.type}
                    onChange={handleHostelInfoChange}
                    className="w-full text-lg px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Boys</option>
                    <option>Girls</option>
                    {/* <option></option> */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Warden *
                  </label>
                  <select
                    name="warden"
                    value={hostelData.warden}
                    onChange={handleHostelInfoChange}
                    className="w-full text-lg px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {defaultWardens.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={hostelData.description}
                  onChange={handleHostelInfoChange}
                  rows={4}
                  className="w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide a brief description..."
                />
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-8 animate-fade-in">
              <div className="flex items-center space-x-4">
                <Wrench className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Define Blocks & Floors
                </h2>
              </div>

              <div className="space-y-4">
                {hostelData.blocks.map((block) => (
                  <div
                    key={block.id}
                    className="bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-500 dark:border-blue-500 space-y-4"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Block Name
                          </label>
                          <input
                            type="text"
                            value={block.name}
                            onChange={(e) => renameBlock(block.id, e.target.value)}
                            className="w-full mt-1 text-base sm:text-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Block A"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Floors
                          </label>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md">
                              {block.floors}
                            </span>
                            <button
                              onClick={() => addFloor(block.id)}
                              type="button"
                              className="px-3 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
                            >
                              Add Floor
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeBlock(block.id)}
                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {Array.from({ length: block.floors }, (_, i) => i + 1).map((f) => (
                        <div
                          key={f}
                          className="text-xs px-2 py-1 rounded-md border dark:border-gray-600 text-gray-600 dark:text-gray-300"
                        >
                          Floor {f}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addBlock}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
              >
                <Plus size={20} />
                <span>Add Block</span>
              </button>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-8 animate-fade-in">
              <div className="flex items-center space-x-4">
                <Wrench className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Define Room Types & Amenities
                </h2>
              </div>

              <div className="space-y-4">
                {hostelData.roomTypes.map((rt) => (
                  <div
                    key={rt.id}
                    className="bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-500 dark:border-blue-500 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg sm:text-xl text-gray-800 dark:text-gray-100">
                        Editing Room Template
                      </h3>
                      <button
                        onClick={() => removeRoomType(rt.id)}
                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Room Type Name *
                        </label>
                        <input
                          type="text"
                          value={rt.typeName}
                          onChange={(e) => updateRoomType(rt.id, 'typeName', e.target.value)}
                          className="w-full mt-1 text-base sm:text-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 'AC Single'"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Capacity (Students) *
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={rt.capacity}
                          onChange={(e) =>
                            updateRoomType(rt.id, 'capacity', parseInt(e.target.value) || 1)
                          }
                          className="w-full mt-1 text-base sm:text-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Price (per bed/room)
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={rt.price}
                          onChange={(e) =>
                            updateRoomType(rt.id, 'price', parseInt(e.target.value) || 0)
                          }
                          className="w-full mt-1 text-base sm:text-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 65000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Amenities (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={rt.amenities.join(', ')}
                        onChange={(e) => handleAmenitiesChange(rt.id, e.target.value)}
                        className="w-full mt-1 text-base sm:text-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., WiFi, Geyser, Balcony"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addRoomType}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
              >
                <Plus size={20} />
                <span>Add Room Template</span>
              </button>
            </section>
          )}

          {step === 4 && (
            <section className="space-y-8 animate-fade-in">
              <div className="flex items-center space-x-4">
                <BedDouble className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Generate Rooms
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Enter explicit room numbers for each selected room type per floor. You can see each template’s capacity and price as a guide.
              </p>

              <div className="space-y-8">
                {hostelData.blocks.map((block) => (
                  <div
                    key={block.id}
                    className="bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border dark:border-gray-700"
                  >
                    <h3 className="text-xl font-bold mb-2">{block.name}</h3>
                    <div className="space-y-6">
                      {Array.from({ length: block.floors }, (_, i) => i + 1).map((floor) => {
                        const cfg = getFloorConfig(block.id, floor);
                        return (
                          <div key={floor} className="border-t dark:border-gray-600 pt-4">
                            <h4 className="font-bold text-lg mb-3">Floor {floor}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {hostelData.roomTypes.map((rt) => {
                                const current = cfg.roomNumbersByType[rt.id] || [];
                                return (
                                  <div
                                    key={rt.id}
                                    className="p-3 rounded-lg border dark:border-gray-600"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="font-semibold">
                                        {rt.typeName}{' '}
                                        <span className="text-xs font-normal">
                                          ({rt.capacity}p) • ₹{rt.price}
                                        </span>
                                      </div>
                                    </div>
                                    <label className="text-xs font-medium text-gray-500">
                                      Room Numbers (comma-separated)
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full mt-1 p-2 border dark:border-gray-600 bg-transparent rounded-md"
                                      placeholder="e.g., A101, A102, A103"
                                      value={current.join(', ')}
                                      onChange={(e) =>
                                        setFloorRoomNumbers(
                                          block.id,
                                          floor,
                                          rt.id,
                                          parseRoomNumbers(e.target.value)
                                        )
                                      }
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total rooms to be created: <span className="font-semibold">{getTotalRooms}</span>
                </p>
              </div>
            </section>
          )}

          {step === 5 && (
            <section className="space-y-8 animate-fade-in">
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Review & Finalize
                </h2>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 p-4 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                      Hostel Name
                    </h4>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {hostelData.name || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                      Hostel Type
                    </h4>
                    <p className="text-lg font-medium">{hostelData.type}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                      Warden
                    </h4>
                    <p className="text-lg font-medium">{hostelData.warden}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                      Description
                    </h4>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      {hostelData.description || 'No description.'}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">
                    Blocks & Floors
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hostelData.blocks.map((b) => (
                      <div
                        key={b.id}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700"
                      >
                        <h5 className="font-bold">{b.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Floors: {b.floors}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">
                    Room Templates
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hostelData.roomTypes.map((rt) => (
                      <div
                        key={rt.id}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700"
                      >
                        <h5 className="font-bold">
                          {rt.typeName} • {rt.capacity}p • ₹{rt.price}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Amenities: {rt.amenities.join(', ') || 'None'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">
                    Room Allocation Summary
                  </h4>
                  <div className="space-y-4">
                    {hostelData.blocks.map((b) => {
                      const blockTotal = Array.from({ length: b.floors }, (_, i) => i + 1)
                        .map((f) => {
                          const cfg = generation[b.id]?.[f];
                          if (!cfg) return 0;
                          return Object.values(cfg.roomNumbersByType).reduce(
                            (sum, arr) => sum + (arr?.length ?? 0),
                            0
                          );
                        })
                        .reduce((a, c) => a + c, 0);
                      if (blockTotal === 0) return null;
                      return (
                        <div
                          key={b.id}
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700"
                        >
                          <h5 className="font-bold text-lg">{b.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Total rooms: <span className="font-semibold">{blockTotal}</span>
                          </p>
                          {Array.from({ length: b.floors }, (_, i) => i + 1).map((f) => {
                            const cfg = generation[b.id]?.[f];
                            const perType = cfg?.roomNumbersByType || {};
                            const entries = Object.entries(perType).filter(
                              ([, arr]) => (arr?.length ?? 0) > 0
                            );
                            if (entries.length === 0) return null;
                            return (
                              <div key={f} className="mt-2">
                                <div className="font-semibold">Floor {f}</div>
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                  {entries.map(([rtIdStr, nums]) => {
                                    const rt = hostelData.roomTypes.find(
                                      (r) => r.id === Number(rtIdStr)
                                    );
                                    if (!rt) return null;
                                    return (
                                      <div key={rtIdStr} className="mt-1">
                                        <span className="font-medium">
                                          {rt.typeName} ({nums.length})
                                        </span>
                                        : {nums.join(', ')}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t dark:border-gray-700">
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold">
                    Total Rooms
                  </h4>
                  <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                    {getTotalRooms}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="sticky bottom-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={step === 1 || loading}
            className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex-1 text-center px-4">
            {error && (
              <div className="inline-flex items-center text-red-500 font-semibold text-sm">
                <AlertCircle className="mr-2" size={20} />
                {error}
              </div>
            )}
            {success && (
              <div className="inline-flex items-center text-green-500 font-semibold text-sm">
                <CheckCircle className="mr-2" size={20} />
                {success}
              </div>
            )}
          </div>

          {step < 5 ? (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20"
            >
              <span className="hidden sm:inline">Next Step</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || !hostelData.name}
              className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 shadow-lg shadow-green-500/20"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
              ) : (
                <Save size={20} />
              )}
              <span className="hidden md:inline">Finalize & Create</span>
              <span className="md:hidden">Create</span>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default AddNewHostel;
