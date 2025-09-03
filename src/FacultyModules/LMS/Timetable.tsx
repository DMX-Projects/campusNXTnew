import React, { useState } from 'react';
import { CalendarIcon, PlusIcon, EditIcon, TrashIcon, DownloadIcon } from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  faculty: string;
  room: string;
  department: string;
  semester: string;
  batch: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

interface TimetableConflict {
  id: string;
  message: string;
  severity: 'warning' | 'error';
  slots: string[];
}

const Timetable: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: '1',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      subject: 'Data Structures',
      faculty: 'Dr. Priya Sharma',
      room: 'CS-101',
      department: 'CSE',
      semester: '3',
      batch: 'A',
      type: 'lecture'
    },
    {
      id: '2',
      day: 'Monday',
      startTime: '10:00',
      endTime: '12:00',
      subject: 'Database Lab',
      faculty: 'Prof. Rajesh Kumar',
      room: 'CS-LAB-2',
      department: 'CSE',
      semester: '4',
      batch: 'B',
      type: 'lab'
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('CSE');
  const [selectedSemester, setSelectedSemester] = useState('3');
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [conflicts, setConflicts] = useState<TimetableConflict[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [newSlot, setNewSlot] = useState<Partial<TimeSlot>>({});

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots_Hours = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  const handleCreateSlot = () => {
    if (newSlot.day && newSlot.startTime && newSlot.subject) {
      const slot: TimeSlot = {
        id: Date.now().toString(),
        day: newSlot.day || 'Monday',
        startTime: newSlot.startTime || '09:00',
        endTime: newSlot.endTime || '10:00',
        subject: newSlot.subject || '',
        faculty: newSlot.faculty || '',
        room: newSlot.room || '',
        department: selectedDepartment,
        semester: selectedSemester,
        batch: newSlot.batch || 'A',
        type: newSlot.type || 'lecture'
      };
      setTimeSlots([...timeSlots, slot]);
      setNewSlot({});
      setIsCreateModalOpen(false);
      checkForConflicts([...timeSlots, slot]);
    }
  };

  const checkForConflicts = (slots: TimeSlot[]) => {
    const conflicts: TimetableConflict[] = [];
    // Check for room conflicts
    slots.forEach((slot1, index) => {
      slots.slice(index + 1).forEach(slot2 => {
        if (slot1.day === slot2.day && 
            slot1.room === slot2.room && 
            slot1.startTime === slot2.startTime) {
          conflicts.push({
            id: `${slot1.id}-${slot2.id}`,
            message: `Room ${slot1.room} is double-booked on ${slot1.day} at ${slot1.startTime}`,
            severity: 'error',
            slots: [slot1.id, slot2.id]
          });
        }
      });
    });
    setConflicts(conflicts);
  };

  const handleDeleteSlot = (id: string) => {
    const updatedSlots = timeSlots.filter(slot => slot.id !== id);
    setTimeSlots(updatedSlots);
    checkForConflicts(updatedSlots);
  };

  const exportTimetable = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Day,Start Time,End Time,Subject,Faculty,Room,Department,Semester,Batch,Type\n" +
      timeSlots.map(slot => 
        `${slot.day},${slot.startTime},${slot.endTime},${slot.subject},${slot.faculty},${slot.room},${slot.department},${slot.semester},${slot.batch},${slot.type}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `timetable_${selectedDepartment}_sem${selectedSemester}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSlots = timeSlots.filter(slot => 
    slot.department === selectedDepartment && slot.semester === selectedSemester
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Timetable Management</h1>
              <p className="text-gray-600 mt-1">Create and manage academic schedules across departments</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Add Slot
              </button>
              <button
                onClick={exportTimetable}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export
              </button>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>

            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="current">Current Week</option>
              <option value="next">Next Week</option>
              <option value="upcoming">Upcoming Week</option>
            </select>
          </div>

          {/* Conflict Alert */}
          {conflicts.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-red-800 font-medium">{conflicts.length} Scheduling Conflicts Found</span>
                </div>
                <button
                  onClick={() => setIsConflictModalOpen(true)}
                  className="text-red-600 hover:text-red-800 text-sm underline"
                >
                  View Details
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{filteredSlots.length}</p>
              </div>
              <CalendarIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Lectures</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredSlots.filter(s => s.type === 'lecture').length}
                </p>
              </div>
              <div className="text-2xl">📚</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Lab Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredSlots.filter(s => s.type === 'lab').length}
                </p>
              </div>
              <div className="text-2xl">🔬</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Conflicts</p>
                <p className="text-2xl font-bold text-red-600">{conflicts.length}</p>
              </div>
              <div className="text-2xl">⚠️</div>
            </div>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Schedule - {selectedDepartment} Semester {selectedSemester}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left font-medium text-gray-900">Time</th>
                    {days.map(day => (
                      <th key={day} className="border border-gray-200 p-3 text-left font-medium text-gray-900">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots_Hours.map(time => (
                    <tr key={time} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 font-medium text-gray-700">
                        {time}
                      </td>
                      {days.map(day => {
                        const slot = filteredSlots.find(s => s.day === day && s.startTime === time);
                        return (
                          <td key={`${day}-${time}`} className="border border-gray-200 p-2">
                            {slot ? (
                              <div className={`p-2 rounded-lg text-xs ${
                                slot.type === 'lecture' ? 'bg-blue-100 text-blue-800' :
                                slot.type === 'lab' ? 'bg-green-100 text-green-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                <div className="font-medium mb-1">{slot.subject}</div>
                                <div className="text-gray-600">{slot.faculty}</div>
                                <div className="text-gray-600">{slot.room}</div>
                                <div className="flex gap-1 mt-1">
                                  <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <EditIcon size={12} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSlot(slot.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <TrashIcon size={12} />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setNewSlot({ day, startTime: time });
                                  setIsCreateModalOpen(true);
                                }}
                                className="w-full h-16 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-xs"
                              >
                                + Add Class
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Create Slot Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add Class Slot</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                    <select
                      value={newSlot.day || ''}
                      onChange={(e) => setNewSlot({...newSlot, day: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Day</option>
                      {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={newSlot.type || 'lecture'}
                      onChange={(e) => setNewSlot({...newSlot, type: e.target.value as 'lecture' | 'lab' | 'tutorial'})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="lecture">Lecture</option>
                      <option value="lab">Lab</option>
                      <option value="tutorial">Tutorial</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <select
                      value={newSlot.startTime || ''}
                      onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Time</option>
                      {timeSlots_Hours.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <select
                      value={newSlot.endTime || ''}
                      onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Time</option>
                      {timeSlots_Hours.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newSlot.subject || ''}
                    onChange={(e) => setNewSlot({...newSlot, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subject name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Faculty</label>
                    <input
                      type="text"
                      value={newSlot.faculty || ''}
                      onChange={(e) => setNewSlot({...newSlot, faculty: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter faculty name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                    <input
                      type="text"
                      value={newSlot.room || ''}
                      onChange={(e) => setNewSlot({...newSlot, room: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter room number"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
                  <select
                    value={newSlot.batch || 'A'}
                    onChange={(e) => setNewSlot({...newSlot, batch: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="A">Batch A</option>
                    <option value="B">Batch B</option>
                    <option value="C">Batch C</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSlot}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Slot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Conflicts Modal */}
        {isConflictModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Scheduling Conflicts</h2>
              
              <div className="space-y-3">
                {conflicts.map(conflict => (
                  <div key={conflict.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-500 rounded-full mt-0.5"></div>
                      <div className="flex-1">
                        <p className="text-red-800 font-medium">{conflict.message}</p>
                        <p className="text-red-600 text-sm mt-1">
                          Affected slots: {conflict.slots.length} classes
                        </p>
                      </div>
                      <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm transition-colors">
                        Resolve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsConflictModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                  Auto-Resolve All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timetable;
