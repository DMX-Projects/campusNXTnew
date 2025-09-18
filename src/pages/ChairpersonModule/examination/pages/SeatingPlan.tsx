import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Grid, List, Download, Users, MapPin, 
  Edit3, Trash2, Eye, BookOpen, GraduationCap, 
  Building, Calendar, Filter, X, CheckCircle,
  AlertCircle, Settings, RefreshCw, Shuffle
} from 'lucide-react';

// Mock Data
const initialStudents = [
  { id: 'CSE001', name: 'John Doe', rollNo: '20CS001', branch: 'CSE', year: '2020', class: 'A' },
  { id: 'CSE002', name: 'Jane Smith', rollNo: '20CS002', branch: 'CSE', year: '2020', class: 'A' },
  { id: 'CSE003', name: 'Mike Johnson', rollNo: '20CS003', branch: 'CSE', year: '2020', class: 'B' },
  { id: 'ECE001', name: 'Sarah Wilson', rollNo: '20EC001', branch: 'ECE', year: '2020', class: 'A' },
  { id: 'MECH001', name: 'David Brown', rollNo: '20ME001', branch: 'MECH', year: '2020', class: 'A' },
  { id: 'CSE004', name: 'Emily Davis', rollNo: '21CS001', branch: 'CSE', year: '2021', class: 'A' },
  { id: 'CSE005', name: 'Alex Turner', rollNo: '21CS002', branch: 'CSE', year: '2021', class: 'A' },
  { id: 'ECE002', name: 'Lisa Chen', rollNo: '21EC001', branch: 'ECE', year: '2021', class: 'A' },
  { id: 'MECH002', name: 'Robert Kim', rollNo: '21ME001', branch: 'MECH', year: '2021', class: 'A' },
  { id: 'IT001', name: 'Priya Singh', rollNo: '20IT001', branch: 'IT', year: '2020', class: 'A' },
  { id: 'CIVIL001', name: 'Mark Wilson', rollNo: '20CV001', branch: 'CIVIL', year: '2020', class: 'A' },
  { id: 'EEE001', name: 'Anna Garcia', rollNo: '20EE001', branch: 'EEE', year: '2020', class: 'A' },
  { id: 'CSE006', name: 'Chris Martinez', rollNo: '22CS001', branch: 'CSE', year: '2022', class: 'A' },
  { id: 'ECE003', name: 'Jessica Lee', rollNo: '22EC001', branch: 'ECE', year: '2022', class: 'A' },
  { id: 'IT002', name: 'Kevin Park', rollNo: '22IT001', branch: 'IT', year: '2022', class: 'A' },
];

const initialRooms = [
  { id: 'room101', name: 'Room 101', capacity: 60, layout: '6x10', building: 'Block A', floor: '1st Floor', type: 'Classroom' },
  { id: 'room102', name: 'Room 102', capacity: 45, layout: '5x9', building: 'Block A', floor: '1st Floor', type: 'Classroom' },
  { id: 'room103', name: 'Room 103', capacity: 80, layout: '8x10', building: 'Block B', floor: '2nd Floor', type: 'Hall' },
  { id: 'lab201', name: 'Lab 201', capacity: 30, layout: '5x6', building: 'Block C', floor: '2nd Floor', type: 'Lab' },
];

const branches = ['CSE', 'ECE', 'MECH', 'CIVIL', 'IT', 'EEE'];
const years = ['2020', '2021', '2022', '2023', '2024'];
const classes = ['A', 'B', 'C', 'D'];

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden`}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Simple Generate Seating Plan Form
const SeatingPlanForm = ({ onClose, onGenerate }) => {
  const [formData, setFormData] = useState({
    examName: '',
    examDate: '',
    selectedBranches: ['CSE'],
    selectedYears: ['2020'],
    selectedClasses: ['A'],
    selectedRooms: ['room101'],
    generationMethod: 'alternate'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exam Name
          </label>
          <input
            type="text"
            value={formData.examName}
            onChange={(e) => setFormData({...formData, examName: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Mid-term Examination"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exam Date
          </label>
          <input
            type="date"
            value={formData.examDate}
            onChange={(e) => setFormData({...formData, examDate: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            required
          />
        </div>
      </div>

      {/* Selection Criteria */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">Select Students For Exam</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Branches</label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white">
              {branches.map(branch => (
                <label key={branch} className="flex items-center hover:bg-gray-50 p-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.selectedBranches.includes(branch)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, selectedBranches: [...formData.selectedBranches, branch]});
                      } else {
                        setFormData({...formData, selectedBranches: formData.selectedBranches.filter(b => b !== branch)});
                      }
                    }}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm">{branch}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years</label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white">
              {years.map(year => (
                <label key={year} className="flex items-center hover:bg-gray-50 p-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.selectedYears.includes(year)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, selectedYears: [...formData.selectedYears, year]});
                      } else {
                        setFormData({...formData, selectedYears: formData.selectedYears.filter(y => y !== year)});
                      }
                    }}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm">{year}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Classes</label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white">
              {classes.map(cls => (
                <label key={cls} className="flex items-center hover:bg-gray-50 p-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.selectedClasses.includes(cls)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, selectedClasses: [...formData.selectedClasses, cls]});
                      } else {
                        setFormData({...formData, selectedClasses: formData.selectedClasses.filter(c => c !== cls)});
                      }
                    }}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm">Class {cls}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Room Selection */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">Select Examination Rooms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {initialRooms.map(room => (
            <label key={room.id} className="flex items-center p-3 border border-blue-200 rounded-lg bg-white hover:bg-blue-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.selectedRooms.includes(room.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({...formData, selectedRooms: [...formData.selectedRooms, room.id]});
                  } else {
                    setFormData({...formData, selectedRooms: formData.selectedRooms.filter(r => r !== room.id)});
                  }
                }}
                className="mr-3 text-blue-600"
              />
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900">{room.name}</div>
                <div className="text-xs text-gray-600">{room.building} - Capacity: {room.capacity}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Generation Method */}
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">Choose Seating Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: 'alternate', label: 'Alternate Branch/Year', desc: 'Mix different branches and years' },
            { value: 'random', label: 'Random Assignment', desc: 'Completely random seating' },
            { value: 'branch_separate', label: 'Branch-wise Separate', desc: 'Keep same branch students apart' },
            { value: 'year_separate', label: 'Year-wise Separate', desc: 'Keep same year students apart' }
          ].map(method => (
            <label key={method.value} className="flex items-start p-3 border border-green-200 rounded-lg bg-white hover:bg-green-50 cursor-pointer transition-colors">
              <input
                type="radio"
                name="generationMethod"
                value={method.value}
                checked={formData.generationMethod === method.value}
                onChange={(e) => setFormData({...formData, generationMethod: e.target.value})}
                className="mt-1 mr-3 text-green-600"
              />
              <div>
                <div className="font-medium text-sm text-gray-900">{method.label}</div>
                <div className="text-xs text-gray-600 mt-1">{method.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <Shuffle className="h-4 w-4" />
          <span>Generate Seating Plan</span>
        </button>
      </div>
    </form>
  );
};

// Main Seating Plan Component
const SeatingPlan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewType, setViewType] = useState('grid');
  const [selectedRoom, setSelectedRoom] = useState('room101');
  const [students] = useState(initialStudents);
  const [rooms, setRooms] = useState(initialRooms);
  const [seatingArrangements, setSeatingArrangements] = useState({});
  const [selectedRoomData, setSelectedRoomData] = useState(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('seating');
  const [currentExam, setCurrentExam] = useState(null);

  // Generate seating arrangement
  const generateSeatingPlan = (formData) => {
    const eligibleStudents = students.filter(student => {
      return (
        formData.selectedBranches.includes(student.branch) &&
        formData.selectedYears.includes(student.year) &&
        formData.selectedClasses.includes(student.class)
      );
    });

    const selectedRoomsList = rooms.filter(room => formData.selectedRooms.includes(room.id));
    const totalCapacity = selectedRoomsList.reduce((sum, room) => sum + room.capacity, 0);

    if (eligibleStudents.length > totalCapacity) {
      alert(`Not enough room capacity!\nStudents: ${eligibleStudents.length}\nTotal Capacity: ${totalCapacity}`);
      return;
    }

    // Apply seating method
    let arrangedStudents = [...eligibleStudents];
    
    switch (formData.generationMethod) {
      case 'random':
        arrangedStudents = arrangedStudents.sort(() => Math.random() - 0.5);
        break;
      case 'alternate':
        arrangedStudents = arrangedStudents.sort((a, b) => {
          if (a.branch !== b.branch) return a.branch.localeCompare(b.branch);
          return a.year.localeCompare(b.year);
        });
        break;
      case 'branch_separate':
        arrangedStudents = arrangedStudents.sort(() => Math.random() - 0.5);
        break;
      case 'year_separate':
        arrangedStudents = arrangedStudents.sort(() => Math.random() - 0.5);
        break;
    }

    const newArrangements = {};
    let studentIndex = 0;

    selectedRoomsList.forEach(room => {
      const roomSeats = [];
      const [cols, rows] = room.layout.split('x').map(Number);
      
      for (let i = 0; i < rows && studentIndex < arrangedStudents.length; i++) {
        for (let j = 0; j < cols && studentIndex < arrangedStudents.length; j++) {
          const seatNo = String.fromCharCode(65 + i) + (j + 1);
          const student = arrangedStudents[studentIndex];
          
          roomSeats.push({
            seatNo,
            studentId: student?.id || '',
            studentName: student?.name || '',
            rollNo: student?.rollNo || '',
            branch: student?.branch || '',
            year: student?.year || '',
            class: student?.class || ''
          });
          
          if (student) studentIndex++;
        }
      }

      // Fill remaining seats as empty
      while (roomSeats.length < room.capacity) {
        const totalSeats = roomSeats.length;
        const [cols] = room.layout.split('x').map(Number);
        const row = Math.floor(totalSeats / cols);
        const col = totalSeats % cols;
        const seatNo = String.fromCharCode(65 + row) + (col + 1);
        
        roomSeats.push({
          seatNo,
          studentId: '',
          studentName: '',
          rollNo: '',
          branch: '',
          year: '',
          class: ''
        });
      }

      newArrangements[room.id] = roomSeats;
    });

    setSeatingArrangements(newArrangements);
    setCurrentExam({
      name: formData.examName,
      date: formData.examDate,
      studentsCount: eligibleStudents.length,
      roomsCount: selectedRoomsList.length
    });
    
    alert(`✅ Seating plan generated successfully!\n📊 ${eligibleStudents.length} students assigned to ${selectedRoomsList.length} rooms`);
  };

  // Get current room seating data
  const getCurrentRoomSeating = () => {
    return seatingArrangements[selectedRoom] || [];
  };

  // Grid View Component
  const GridView = () => {
    const currentRoom = rooms.find(r => r.id === selectedRoom);
    const seatingData = getCurrentRoomSeating();
    const [cols, rows] = currentRoom.layout.split('x').map(Number);

    if (seatingData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <MapPin className="h-16 w-16 mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No Seating Plan Generated</h3>
          <p className="text-sm">Click "Generate Plan" to create a seating arrangement</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Room Info Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{currentRoom.name}</h3>
              <p className="text-sm text-gray-600">{currentRoom.building} - {currentRoom.floor} | Capacity: {currentRoom.capacity}</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-700">Assigned</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded border-2 border-dashed border-gray-400"></div>
                <span className="text-sm text-gray-700">Empty</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seating Grid */}
        <div className="overflow-x-auto bg-white rounded-lg border-2 border-gray-200 p-6">
          <div className="grid gap-3 min-w-max mx-auto" style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}>
            {Array.from({ length: rows * cols }, (_, i) => {
              const seatNo = String.fromCharCode(65 + Math.floor(i / cols)) + (i % cols + 1);
              const seatData = seatingData.find(seat => seat.seatNo === seatNo);
              const isOccupied = seatData?.studentId;
              
              return (
                <div
                  key={seatNo}
                  className={`w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center text-xs font-medium cursor-pointer transition-all duration-200 ${
                    isOccupied 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md transform hover:scale-105' 
                      : 'bg-gray-50 text-gray-400 border-dashed border-gray-300 hover:bg-gray-100'
                  }`}
                  title={isOccupied ? `${seatData.studentName}\n${seatData.rollNo}\n${seatData.branch} - ${seatData.year}` : 'Empty Seat'}
                >
                  <div className="font-bold text-sm">{seatNo}</div>
                  {isOccupied && (
                    <div className="text-[10px] leading-tight text-center mt-1">
                      <div className="font-medium">{seatData.branch}</div>
                      <div>{seatData.year}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // List View Component
  const ListView = () => {
    const seatingData = getCurrentRoomSeating();
    const assignedSeats = seatingData.filter(seat => seat.studentId);
    
    if (seatingData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <List className="h-16 w-16 mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No Seating Plan Generated</h3>
          <p className="text-sm">Click "Generate Plan" to create a seating arrangement</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Assigned Students ({assignedSeats.length})</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Seat</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Roll No</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Student Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Branch</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Year</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Class</th>
              </tr>
            </thead>
            <tbody>
              {assignedSeats.map((seat) => (
                <tr key={seat.seatNo} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-lg font-bold text-sm">
                      {seat.seatNo}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{seat.rollNo}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{seat.studentName}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs rounded-full font-medium bg-purple-100 text-purple-800">
                      {seat.branch}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs rounded-full font-medium bg-green-100 text-green-800">
                      {seat.year}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800">
                      Class {seat.class}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Room Form Modal
  const RoomFormModal = () => {
    const [formData, setFormData] = useState(
      selectedRoomData || {
        id: '',
        name: '',
        capacity: '',
        layout: '',
        building: '',
        floor: '',
        type: 'Classroom'
      }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedRoomData) {
        setRooms(rooms.map(r => r.id === selectedRoomData.id ? {...formData, capacity: parseInt(formData.capacity)} : r));
      } else {
        setRooms([...rooms, { 
          ...formData, 
          id: formData.id || `room${Date.now()}`, 
          capacity: parseInt(formData.capacity) 
        }]);
      }
      setIsRoomModalOpen(false);
      setSelectedRoomData(null);
    };

    return (
      <Modal
        isOpen={isRoomModalOpen}
        onClose={() => {
          setIsRoomModalOpen(false);
          setSelectedRoomData(null);
        }}
        title={selectedRoomData ? 'Edit Room' : 'Add Room'}
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({...formData, id: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="room104"
                required
                disabled={selectedRoomData}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Room 104"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="60"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout (cols x rows)</label>
              <input
                type="text"
                value={formData.layout}
                onChange={(e) => setFormData({...formData, layout: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="6x10"
                required
                pattern="[0-9]+x[0-9]+"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Building</label>
              <input
                type="text"
                value={formData.building}
                onChange={(e) => setFormData({...formData, building: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Block A"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
              <input
                type="text"
                value={formData.floor}
                onChange={(e) => setFormData({...formData, floor: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="1st Floor"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            >
              <option value="Classroom">Classroom</option>
              <option value="Hall">Hall</option>
              <option value="Lab">Lab</option>
              <option value="Auditorium">Auditorium</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={() => {
                setIsRoomModalOpen(false);
                setSelectedRoomData(null);
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {selectedRoomData ? 'Update Room' : 'Add Room'}
            </button>
          </div>
        </form>
      </Modal>
    );
  };

  // Rooms Management Tab
  const RoomsTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Room Management</h3>
          <button
            onClick={() => {
              setSelectedRoomData(null);
              setIsRoomModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Room</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{room.name}</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedRoomData(room);
                      setIsRoomModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this room?')) {
                        setRooms(rooms.filter(r => r.id !== room.id));
                      }
                    }}
                    className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Building:</span>
                  <span className="font-medium text-gray-900">{room.building}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Floor:</span>
                  <span className="font-medium text-gray-900">{room.floor}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium text-gray-900">{room.capacity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Layout:</span>
                  <span className="font-medium text-gray-900">{room.layout}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="inline-flex px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800">
                    {room.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Export seating plan
  const exportSeatingPlan = () => {
    if (!currentExam || Object.keys(seatingArrangements).length === 0) {
      alert('No seating plan to export. Please generate a plan first.');
      return;
    }

    let csvContent = 'Room,Seat,Roll No,Student Name,Branch,Year,Class\n';
    
    Object.entries(seatingArrangements).forEach(([roomId, seats]) => {
      const room = rooms.find(r => r.id === roomId);
      seats.forEach(seat => {
        if (seat.studentId) {
          csvContent += `${room.name},${seat.seatNo},${seat.rollNo},${seat.studentName},${seat.branch},${seat.year},${seat.class}\n`;
        }
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentExam.name.replace(/\s+/g, '_')}_seating_plan.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Exam Seating Management</h1>
                <p className="text-sm text-gray-600">Automated seating arrangement system</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {currentExam && (
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{currentExam.name}</div>
                  <div className="text-xs text-gray-600">{new Date(currentExam.date).toLocaleDateString()}</div>
                </div>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Generate Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('seating')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'seating'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Seating Plans</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('rooms')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'rooms'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Room Management</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'seating' ? (
          <div className="space-y-6">
            {/* Stats Cards */}
            {currentExam && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Current Exam</p>
                      <p className="text-lg font-semibold text-gray-900">{currentExam.name}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-lg font-semibold text-gray-900">{currentExam.studentsCount}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Building className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Rooms Used</p>
                      <p className="text-lg font-semibold text-gray-900">{currentExam.roomsCount}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Exam Date</p>
                      <p className="text-lg font-semibold text-gray-900">{new Date(currentExam.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Room:</label>
                    <select
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      {rooms.map(room => (
                        <option key={room.id} value={room.id}>{room.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewType('grid')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        viewType === 'grid'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewType('list')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        viewType === 'list'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {Object.keys(seatingArrangements).length > 0 && (
                    <button
                      onClick={exportSeatingPlan}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Seating Display */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {viewType === 'grid' ? <GridView /> : <ListView />}
            </div>
          </div>
        ) : (
          <RoomsTab />
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Generate Seating Plan"
        size="lg"
      >
        <SeatingPlanForm onClose={() => setIsModalOpen(false)} onGenerate={generateSeatingPlan} />
      </Modal>

      <RoomFormModal />
    </div>
  );
};

function App() {
  return <SeatingPlan />;
}

export default App;