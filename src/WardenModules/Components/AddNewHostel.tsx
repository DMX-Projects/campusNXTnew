import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Moon,
  Sun
} from 'lucide-react';

// --- TypeScript Interfaces ---
interface BlockConfig {
  id: number;
  name: string;
  floors: number;
}

interface RoomTypeConfig {
  id: number;
  typeName: string;
  capacity: number;
  amenities: string[];
}

interface RoomGenerationConfig {
  [blockId: number]: {
    [floor: number]: {
      prefix: string;
      start: number;
      types: {
        [roomTypeId: number]: number;
      }
    }
  }
}

interface NewHostelData {
  name: string;
  type: 'Boys' | 'Girls' | 'Co-ed';
  description: string;
  blocks: BlockConfig[];
  roomTypes: RoomTypeConfig[];
}

const API_BASE = 'http://localhost:5000';

// --- Theme Toggler Hook ---
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
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

const AddNewHostel: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [hostelData, setHostelData] = useState<NewHostelData>({
    name: '',
    type: 'Boys',
    description: '',
    blocks: [{ id: Date.now(), name: 'Block A', floors: 3 }],
    roomTypes: [
        { id: Date.now() + 1, typeName: 'Single Seater', capacity: 1, amenities: ['Bed', 'Table', 'Chair', 'Cupboard'] },
        { id: Date.now() + 2, typeName: 'Double Seater', capacity: 2, amenities: ['Bed', 'Table', 'Chair'] }
    ],
  });
  
  const [roomMatrix, setRoomMatrix] = useState<RoomGenerationConfig>({});
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDarkMode, setIsDarkMode] = useTheme();

  const nextStep = () => {
    if (step === 1 && !hostelData.name.trim()) {
      setError('Hostel Name is a required field.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    setError('');
    setStep(prev => prev < 4 ? prev + 1 : prev);
  };
  const prevStep = () => setStep(prev => prev > 1 ? prev - 1 : prev);

  const handleHostelInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setHostelData({ ...hostelData, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    const newMatrix = { ...roomMatrix };
    hostelData.blocks.forEach(block => {
      if (!newMatrix[block.id]) {
        newMatrix[block.id] = {};
        for(let i = 1; i <= block.floors; i++) {
            newMatrix[block.id][i] = {
                prefix: block.name.split(' ').pop() || 'F',
                start: i * 100 + 1,
                types: {}
            };
        }
      }
    });
    setRoomMatrix(newMatrix);
  }, [hostelData.blocks]);

  const addBlock = () => {
    setHostelData({
      ...hostelData,
      blocks: [...hostelData.blocks, { id: Date.now(), name: `Block ${String.fromCharCode(65 + hostelData.blocks.length)}`, floors: 3 }]
    });
  };

  const updateBlock = (id: number, field: keyof BlockConfig, value: string | number) => {
    setHostelData({
      ...hostelData,
      blocks: hostelData.blocks.map(block => block.id === id ? { ...block, [field]: value } : block)
    });
  };

  const removeBlock = (id: number) => {
    if (hostelData.blocks.length <= 1) {
      setError("At least one block must remain.");
      setTimeout(() => setError(''), 3000);
      return;
    }
    setHostelData({ ...hostelData, blocks: hostelData.blocks.filter(b => b.id !== id) });
  };

  const addRoomType = () => {
    setHostelData({
      ...hostelData,
      roomTypes: [...hostelData.roomTypes, { id: Date.now(), typeName: '', capacity: 1, amenities: [] }]
    });
  };
  
  const updateRoomType = (id: number, field: keyof RoomTypeConfig, value: any) => {
    setHostelData({
      ...hostelData,
      roomTypes: hostelData.roomTypes.map(rt => rt.id === id ? { ...rt, [field]: value } : rt)
    });
  };

  const handleAmenitiesChange = (id: number, amenities: string) => {
    updateRoomType(id, 'amenities', amenities.split(',').map(a => a.trim()).filter(Boolean));
  };

  const removeRoomType = (id: number) => {
    if (hostelData.roomTypes.length <= 1) {
      setError("At least one room type is required.");
      setTimeout(() => setError(''), 3000);
      return;
    }
    setHostelData({ ...hostelData, roomTypes: hostelData.roomTypes.filter(rt => rt.id !== id) });
  };

  const handleMatrixChange = (blockId: number, floor: number, roomTypeId: number, count: number) => {
    setRoomMatrix(prev => ({
      ...prev,
      [blockId]: {
        ...prev[blockId],
        [floor]: {
          ...prev[blockId][floor],
          types: {
            ...prev[blockId][floor].types,
            [roomTypeId]: Math.max(0, count)
          }
        }
      }
    }));
  };

  const handleMatrixConfigChange = (blockId: number, floor: number, field: 'prefix' | 'start', value: string | number) => {
      const isStart = field === 'start';
      const processedValue = isStart ? (Number.isNaN(parseInt(String(value), 10)) ? 0 : parseInt(String(value), 10)) : value;
      setRoomMatrix(prev => ({
        ...prev,
        [blockId]: {
          ...prev[blockId],
          [floor]: {
            ...prev[blockId][floor],
            [field]: processedValue
          }
        }
    }));
  }

  const getTotalRoomsToBeGenerated = () => {
    let totalRooms = 0;
    for (const block of hostelData.blocks) {
      for (let floor = 1; floor <= block.floors; floor++) {
        const floorConfig = roomMatrix[block.id]?.[floor];
        if (floorConfig) {
          totalRooms += Object.values(floorConfig.types).reduce((sum, count) => sum + (count || 0), 0);
        }
      }
    }
    return totalRooms;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const hostelPayload = {
        name: hostelData.name,
        type: hostelData.type,
        blocks: hostelData.blocks.map(b => b.name),
        floors: Math.max(...hostelData.blocks.map(b => b.floors), 1)
      };

      const hostelResponse = await axios.post(`${API_BASE}/hostels`, hostelPayload);
      const newHostelId = hostelResponse.data.id;

      const roomsPayload = [];
      for (const block of hostelData.blocks) {
        for (let floor = 1; floor <= block.floors; floor++) {
          const floorConfig = roomMatrix[block.id]?.[floor];
          if (!floorConfig) continue;

          let roomCounter = floorConfig.start;
          const roomsForThisFloor = floorConfig.types || {};
          
          for (const roomTypeIdStr in roomsForThisFloor) {
            const roomTypeId = parseInt(roomTypeIdStr);
            const count = roomsForThisFloor[roomTypeId] || 0;
            const roomType = hostelData.roomTypes.find(rt => rt.id === roomTypeId);

            if (roomType) {
              for (let i = 0; i < count; i++) {
                roomsPayload.push({
                  hostelId: newHostelId,
                  block: block.name,
                  floor: floor,
                  roomNumber: `${floorConfig.prefix}${roomCounter++}`,
                  roomType: roomType.typeName,
                  capacity: roomType.capacity,
                  gender: hostelData.type === 'Boys' ? 'male' : (hostelData.type === 'Girls' ? 'female' : 'any'),
                  amenities: roomType.amenities,
                  occupied: false,
                  studentIds: []
                });
              }
            }
          }
        }
      }

      if (roomsPayload.length > 0) {
        await Promise.all(roomsPayload.map(room => axios.post(`${API_BASE}/rooms`, room)));
      }
      
      setSuccess(`Hostel '${hostelData.name}' and ${roomsPayload.length} rooms created! Redirecting...`);
      setTimeout(() => navigate('/hostel-management/dashboard'), 3000);
      
    } catch (err) {
      setError('Failed to create hostel. Please check API and data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const steps = ["Hostel Details", "Room Types", "Generate Rooms", "Finalize"];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Create New Hostel</h1>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">A wizard to configure new hostel facilities.</p>
          </div>
          <div className="flex items-center gap-2">

            <button onClick={() => navigate(-1)} className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold">
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
                  <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold transition-all duration-300 ${
                    step > index ? 'bg-blue-600 text-white' : 
                    step === index + 1 ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500' : 
                    'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {step > index ? <CheckCircle size={20} /> : index + 1}
                  </div>
                  <span className={`ml-2 md:ml-3 hidden sm:inline font-semibold transition-colors duration-300 ${
                    step >= index + 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>{title}</span>
                </div>
                {index < steps.length - 1 && <div className={`flex-auto border-t-2 mx-2 sm:mx-4 transition-colors duration-500 ease-in-out ${step > index + 1 ? 'border-blue-600' : 'border-gray-300 dark:border-gray-600'}`}></div>}
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Basic Hostel Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hostel Name *</label>
                  <input type="text" name="name" value={hostelData.name} onChange={handleHostelInfoChange} className="w-full text-lg px-4 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., 'Vivekananda Bhawan'" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hostel For *</label>
                  <select name="type" value={hostelData.type} onChange={handleHostelInfoChange} className="w-full text-lg px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Boys</option>
                    <option>Girls</option>
                    <option>Co-ed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea name="description" value={hostelData.description} onChange={handleHostelInfoChange} rows={4} className="w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Provide a brief description..."></textarea>
              </div>
            </section>
          )}

          {step === 2 && (
             <section className="space-y-8 animate-fade-in">
              <div className="flex items-center space-x-4">
                <Wrench className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Define Room Types & Amenities</h2>
              </div>
              <div className="space-y-4">
                {hostelData.roomTypes.map(rt => (
                  <div key={rt.id} className="bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-500 dark:border-blue-500 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg sm:text-xl text-gray-800 dark:text-gray-100">Editing Room Template</h3>
                      <button onClick={() => removeRoomType(rt.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md"><Trash2 size={20} /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Room Type Name *</label>
                        <input type="text" value={rt.typeName} onChange={(e) => updateRoomType(rt.id, 'typeName', e.target.value)} className="w-full mt-1 text-base sm:text-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-md focus:ring-2 focus:ring-blue-500" placeholder="e.g., 'AC Single'"/>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Capacity (Students) *</label>
                        <input type="number" min="1" max="10" value={rt.capacity} onChange={(e) => updateRoomType(rt.id, 'capacity', parseInt(e.target.value) || 1)} className="w-full mt-1 text-base sm:text-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-md focus:ring-2 focus:ring-blue-500"/>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amenities (Comma-separated)</label>
                      <input type="text" value={rt.amenities.join(', ')} onChange={(e) => handleAmenitiesChange(rt.id, e.target.value)} className="w-full mt-1 text-base sm:text-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-transparent rounded-md focus:ring-2 focus:ring-blue-500" placeholder="e.g., WiFi, Geyser, Balcony" />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={addRoomType} className="flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors">
                <Plus size={20} />
                <span>Add Room Template</span>
              </button>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-8 animate-fade-in">
                <div className="flex items-center space-x-4">
                    <BedDouble className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Generate Rooms</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    For each floor, define a room number prefix, a starting number, and how many rooms of each type to create.
                </p>
                <div className="space-y-8">
                    {hostelData.blocks.map(block => (
                        <div key={block.id} className="bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border dark:border-gray-700">
                            <h3 className="text-xl font-bold mb-4">{block.name}</h3>
                            <div className="space-y-6">
                            {Array.from({ length: block.floors }, (_, i) => i + 1).map(floor => (
                                <div key={floor} className="border-t dark:border-gray-600 pt-4">
                                    <h4 className="font-bold text-lg mb-3">Floor {floor}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="text-xs font-medium text-gray-500">Room No. Prefix</label>
                                            <input type="text" value={roomMatrix[block.id]?.[floor]?.prefix || ''} onChange={(e) => handleMatrixConfigChange(block.id, floor, 'prefix', e.target.value)} className="w-full mt-1 p-2 border dark:border-gray-600 bg-transparent rounded-md" placeholder="e.g., 'A' or 'G'"/>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500">Start Number From</label>
                                            <input type="number" value={roomMatrix[block.id]?.[floor]?.start || ''} onChange={(e) => handleMatrixConfigChange(block.id, floor, 'start', e.target.value)} className="w-full mt-1 p-2 border dark:border-gray-600 bg-transparent rounded-md" placeholder="e.g., 101" />
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Number of rooms to create on this floor:</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {hostelData.roomTypes.map(rt => (
                                            <div key={rt.id}>
                                                <label className="text-sm font-semibold">{rt.typeName} <span className="text-xs font-normal">({rt.capacity}p)</span></label>
                                                <input
                                                    type="number" min="0"
                                                    className="w-full mt-1 text-center p-2 border dark:border-gray-600 bg-transparent rounded-md"
                                                    placeholder="0"
                                                    value={roomMatrix[block.id]?.[floor]?.types?.[rt.id] || ''}
                                                    onChange={(e) => handleMatrixChange(block.id, floor, rt.id, parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
          )}

          {step === 4 && (
             <section className="space-y-8 animate-fade-in">
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Review & Finalize</h2>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 p-4 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Hostel Name</h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{hostelData.name || "Not specified"}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Hostel Type</h4>
                    <p className="text-lg font-medium">{hostelData.type}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Description</h4>
                    <p className="text-base text-gray-700 dark:text-gray-300">{hostelData.description || "No description."}</p>
                  </div>
                </div>
              
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">Generation Summary</h4>
                  {hostelData.blocks.map(block => {
                     let roomsInBlock = 0;
                     for (let floor = 1; floor <= block.floors; floor++) {
                         roomsInBlock += Object.values(roomMatrix[block.id]?.[floor]?.types || {}).reduce((sum, count) => sum + count, 0);
                     }
                     if(roomsInBlock === 0) return null;
                     
                     return (
                        <div key={block.id} className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                          <h5 className="font-bold text-lg">{block.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total rooms to be created: <span className="font-semibold">{roomsInBlock}</span></p>
                        </div>
                     )
                  })}
               </div>
                <div className="pt-4 border-t dark:border-gray-700">
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold">Total Rooms to be Created</h4>
                  <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{getTotalRoomsToBeGenerated()}</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="sticky bottom-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <button onClick={prevStep} disabled={step === 1 || loading} className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex-1 text-center px-4">
            {error && <div className="inline-flex items-center text-red-500 font-semibold text-sm"><AlertCircle className="mr-2" size={20} />{error}</div>}
            {success && <div className="inline-flex items-center text-green-500 font-semibold text-sm"><CheckCircle className="mr-2" size={20} />{success}</div>}
          </div>
          
          {step < 4 ? (
            <button onClick={nextStep} className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20">
              <span className="hidden sm:inline">Next Step</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading || !hostelData.name} className="flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 shadow-lg shadow-green-500/20">
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div> : <Save size={20} />}
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
