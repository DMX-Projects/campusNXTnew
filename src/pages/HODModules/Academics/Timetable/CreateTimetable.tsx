import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronRight, ChevronLeft, BookUser, User, School, Download, CheckCircle, AlertTriangle, Edit, X, Save, Plus, Trash2, Users, ArrowRightLeft, Clock, Coffee } from 'lucide-react';

// --- MOCK DATA (Simulating database pre-fill for a department) ---
const MOCK_DEPARTMENT_DATA = {
  // Shared resources for the whole department
  allSubjects: [
    { id: 'SUB001', name: 'Quantum Physics', code: 'PHY-401', lab: false },
    { id: 'SUB002', name: 'Advanced Algorithms', code: 'CS-402', lab: false },
    { id: 'SUB003', name: 'Machine Learning', code: 'AI-403', lab: false },
    { id: 'SUB004', name: 'ML Lab', code: 'AI-403L', lab: true },
    { id: 'SUB005', name: 'Compiler Design', code: 'CS-404', lab: false },
    { id: 'SUB006', name: 'Networks Lab', code: 'CS-405L', lab: true },
  ],
  allFaculties: [
    { id: 'FAC01', name: 'Dr. Evelyn Reed', expertise: ['SUB001'] },
    { id: 'FAC02', name: 'Prof. Samuel Tan', expertise: ['SUB002', 'SUB005'] },
    { id: 'FAC03', name: 'Dr. Ananya Sharma', expertise: ['SUB003', 'SUB004'] },
    { id: 'FAC04', name: 'Prof. Ben Carter', expertise: ['SUB006'] },
  ],
  allClassrooms: [
    { id: 'CR01', name: 'Room 101', capacity: 60, isLab: false },
    { id: 'CR02', name: 'Room 102', capacity: 60, isLab: false },
    { id: 'LAB01', name: 'AI & ML Lab', capacity: 40, isLab: true },
    { id: 'LAB02', name: 'Networks Lab', capacity: 40, isLab: true },
  ],
  // List of classes to be scheduled, with class-specific hours for each subject
  classes: [
    { id: 'CSE-A-4', year: '4th Year', department: 'CSE-A', strength: 55, subjects: [
        { subjectId: 'SUB002', hours: 4 },
        { subjectId: 'SUB003', hours: 3 },
        { subjectId: 'SUB004', hours: 2 }
    ]},
    { id: 'CSE-B-4', year: '4th Year', department: 'CSE-B', strength: 58, subjects: [
        { subjectId: 'SUB005', hours: 3 },
        { subjectId: 'SUB006', hours: 2 }
    ]},
    { id: 'PHY-A-4', year: '4th Year', department: 'Physics-A', strength: 50, subjects: [
        { subjectId: 'SUB001', hours: 4 }
    ]}
  ]
};

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// --- UI Components ---
const Stepper = ({ currentPhase }) => {
  const phases = ['Configure', 'Confirm', 'Generate & Refine', 'Review & Export'];
  return (
    <div className="flex items-center justify-center mb-8 md:mb-12">
      {phases.map((phase, index) => (
        <React.Fragment key={phase}>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${index + 1 <= currentPhase ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {index + 1 < currentPhase ? <CheckCircle size={20} /> : index + 1}
            </div>
            <span className={`ml-3 font-medium ${index + 1 <= currentPhase ? 'text-indigo-600' : 'text-gray-500'}`}>{phase}</span>
          </div>
          {index < phases.length - 1 && <div className="flex-auto border-t-2 transition duration-500 ease-in-out mx-4 border-gray-300"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

const SubjectPill = ({ subject, onDragStart, onDragEnd, remainingHours, color }) => (
    <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={`p-3 border rounded-lg cursor-grab flex items-center justify-between transition-all duration-200 hover:shadow-md hover:border-indigo-500 ${color.pillBg} ${color.border}`}
    >
      <div>
        <p className="font-bold text-sm text-gray-800">{subject.name}</p>
        <p className="text-xs text-gray-500">{subject.code}</p>
      </div>
      <div className="text-right">
         <p className="text-xs font-semibold text-gray-700">Hours Left</p>
         <p className="text-lg font-bold text-indigo-600">{remainingHours}</p>
      </div>
    </div>
);


const TimetableCell = ({ slotData, onDrop, onDragOver, onEditClick, onGridDragStart, onGridDragEnd, isUnavailable, color }) => (
  <td className="border border-gray-200 h-24 p-1 align-top relative"
      onDrop={isUnavailable ? undefined : onDrop}
      onDragOver={isUnavailable ? undefined : onDragOver}>
    {slotData ? (
      <div
        onClick={onEditClick}
        draggable
        onDragStart={onGridDragStart}
        onDragEnd={onGridDragEnd}
        className={`p-2 rounded-md h-full flex flex-col justify-between text-xs cursor-grab hover:ring-2 hover:ring-indigo-500 ${color.cellBg}`}>
        <div>
          <p className="font-bold text-gray-800">{slotData.subject.name}</p>
          <p className="text-gray-600">{slotData.faculty.name}</p>
        </div>
        <p className="text-gray-500 font-medium">{slotData.classroom.name}</p>
      </div>
    ) : (
      <div className="w-full h-full rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"></div>
    )}
    {isUnavailable && (
        <div className="absolute inset-0 bg-gray-300 bg-opacity-70 flex items-center justify-center text-gray-600 text-xs font-semibold uppercase tracking-wider cursor-not-allowed">
            Faculty Busy
        </div>
    )}
  </td>
);

const ConflictAlert = ({ conflict, onClose }) => {
    if (!conflict) return null;
    return (
        <div className="fixed top-5 right-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg z-50 flex items-center" role="alert">
            <AlertTriangle className="mr-3" />
            <div>
                <p className="font-bold">Schedule Conflict</p>
                <p>{conflict.message}</p>
            </div>
            <button onClick={onClose} className="ml-4 text-red-500 hover:text-red-700">&times;</button>
        </div>
    );
};

const EditSlotModal = ({ slot, onClose, onSave, subjects, faculties, classrooms, onConflictCheck }) => {
    const [editedSlot, setEditedSlot] = useState(slot.data);
    const [originalSlot, ] = useState(slot.data);

    const handleSave = () => {
        const conflict = onConflictCheck({
            day: slot.key.split('-')[0],
            hour: slot.key.split('-')[1],
            faculty: editedSlot.faculty,
            classroom: editedSlot.classroom,
            ignoreKey: slot.key,
        });

        if (conflict) {
            alert(`Conflict detected: ${conflict.message}`);
        } else {
            onSave(slot.key, editedSlot);
        }
    };
    
    const handleSubjectChange = (subjectId) => {
        const subject = subjects.find(s => s.id === subjectId);
        const faculty = faculties.find(f => f.expertise.includes(subject.id)) || originalSlot.faculty;
        const classroom = classrooms.find(c => c.isLab === subject.lab) || originalSlot.classroom;
        setEditedSlot({ subject, faculty, classroom });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Slot</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <select value={editedSlot.subject.id} onChange={(e) => handleSubjectChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
                        <select value={editedSlot.faculty.id} onChange={(e) => setEditedSlot(prev => ({ ...prev, faculty: faculties.find(f => f.id === e.target.value) }))} className="w-full p-2 border border-gray-300 rounded-md">
                            {faculties.filter(f=> f.expertise.includes(editedSlot.subject.id)).map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Classroom</label>
                        <select value={editedSlot.classroom.id} onChange={(e) => setEditedSlot(prev => ({ ...prev, classroom: classrooms.find(c => c.id === e.target.value) }))} className="w-full p-2 border border-gray-300 rounded-md">
                            {classrooms.filter(c => c.isLab === editedSlot.subject.lab).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"><Save size={16} className="mr-2"/> Save Changes</button>
                </div>
            </div>
        </div>
    );
};

const ConflictResolutionModal = ({ details, onResolve, onClose, availableRooms }) => {
    const [selectedRoom, setSelectedRoom] = useState(availableRooms[0]?.id || '');

    const handleResolve = () => {
        if (selectedRoom) {
            onResolve(selectedRoom);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center"><AlertTriangle className="text-amber-500 mr-3"/> Resolve Classroom Conflict</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <p className="text-gray-600 mb-6">{details.conflict.message}</p>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Change Classroom</h3>
                    <p className="text-sm text-gray-600 mb-4">The selected classroom is busy. Please choose an available alternative for this time slot.</p>
                     {availableRooms.length > 0 ? (
                        <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                            {availableRooms.map(room => (
                                <option key={room.id} value={room.id}>{room.name} (Capacity: {room.capacity})</option>
                            ))}
                        </select>
                     ) : (
                        <p className="text-red-600 font-medium bg-red-100 p-3 rounded-md">No alternative rooms available for this slot.</p>
                     )}
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                    <button onClick={handleResolve} disabled={!selectedRoom || availableRooms.length === 0} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <ArrowRightLeft size={16} className="mr-2"/> Assign to New Room
                    </button>
                </div>
            </div>
        </div>
    );
}


// --- Main App Component ---
export default function App() {
  const [phase, setPhase] = useState(1);
  const [timetables, setTimetables] = useState({}); // Key: classId, Value: { 'day-hour': { ... } }
  const [activeClassId, setActiveClassId] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [conflict, setConflict] = useState(null);
  const [view, setView] = useState({ type: 'class' });
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [conflictToResolve, setConflictToResolve] = useState(null);
  
  const [config, setConfig] = useState({
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      dayStartTime: '09:00',
      dayEndTime: '16:30',
      timeSlots: [],
      lunchTime: { name: 'Lunch Break', startTime: '12:00', endTime: '13:00' },
      breakTimes: [
          { id: 1, name: 'Morning Break', startTime: '10:30', endTime: '10:45' },
          { id: 2, name: 'Afternoon Break', startTime: '14:45', endTime: '15:00' },
      ],
  });
  const [departmentData, setDepartmentData] = useState(() => JSON.parse(JSON.stringify(MOCK_DEPARTMENT_DATA)));
  const [editingSlot, setEditingSlot] = useState(null);
  const [isManualPeriodEdit, setIsManualPeriodEdit] = useState(false);

  const configStr = JSON.stringify({
      dayStartTime: config.dayStartTime,
      dayEndTime: config.dayEndTime,
      lunchTime: config.lunchTime,
      breakTimes: config.breakTimes,
  });

  useEffect(() => {
    if (isManualPeriodEdit) return;

    const { dayStartTime, dayEndTime, lunchTime, breakTimes } = config;
    if (!dayStartTime || !dayEndTime || dayStartTime >= dayEndTime) {
        setConfig(prev => ({ ...prev, timeSlots: [] }));
        return;
    };

    const allBreaks = [lunchTime, ...breakTimes]
        .filter(b => b.startTime && b.endTime && b.startTime < b.endTime)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

    const teachingBlocks = [];
    let lastEndTime = dayStartTime;

    allBreaks.forEach(breakItem => {
        if (lastEndTime < breakItem.startTime) {
            teachingBlocks.push({ start: lastEndTime, end: breakItem.startTime });
        }
        lastEndTime = breakItem.endTime > lastEndTime ? breakItem.endTime : lastEndTime;
    });

    if (lastEndTime < dayEndTime) {
        teachingBlocks.push({ start: lastEndTime, end: dayEndTime });
    }
    
    const timeToMinutes = t => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };
    const minutesToTime = m => {
        const roundedM = Math.round(m);
        const h = Math.floor(roundedM / 60).toString().padStart(2, '0');
        const min = (roundedM % 60).toString().padStart(2, '0');
        return `${h}:${min}`;
    };

    const newTimeSlots = [];
    teachingBlocks.forEach(block => {
        const startMins = timeToMinutes(block.start);
        const endMins = timeToMinutes(block.end);
        const duration = endMins - startMins;
        if (duration > 1) { // Ensure block is at least 2 minutes long
            const period1EndMins = startMins + duration / 2;
            const period2StartMins = period1EndMins;

            newTimeSlots.push(`${minutesToTime(startMins)} - ${minutesToTime(period1EndMins)}`);
            newTimeSlots.push(`${minutesToTime(period2StartMins)} - ${minutesToTime(endMins)}`);
        }
    });
    
    setConfig(prev => ({
        ...prev,
        timeSlots: newTimeSlots
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configStr, isManualPeriodEdit]);

  const allDaySlots = useMemo(() => {
    const teaching = config.timeSlots.map(ts => ({ type: 'class', time: ts }));
    const lunch = { type: 'lunch', time: `${config.lunchTime.startTime} - ${config.lunchTime.endTime}`, name: config.lunchTime.name };
    const breaks = config.breakTimes.map(bt => ({ type: 'break', time: `${bt.startTime} - ${bt.endTime}`, name: bt.name }));

    const combined = [...teaching, lunch, ...breaks].filter(s => s.time.split(' - ')[0] && s.time.split(' - ')[1]);
    
    const getStartTime = (timeStr) => timeStr.split(' - ')[0];

    return combined.sort((a, b) => getStartTime(a.time).localeCompare(getStartTime(b.time)));
  }, [config.timeSlots, config.lunchTime, config.breakTimes]);

  const subjectColorMap = useMemo(() => {
    const colors = [
      { cellBg: 'bg-sky-200', pillBg: 'bg-sky-100', border: 'border-sky-300' },
      { cellBg: 'bg-amber-200', pillBg: 'bg-amber-100', border: 'border-amber-300' },
      { cellBg: 'bg-emerald-200', pillBg: 'bg-emerald-100', border: 'border-emerald-300' },
      { cellBg: 'bg-rose-200', pillBg: 'bg-rose-100', border: 'border-rose-300' },
      { cellBg: 'bg-violet-200', pillBg: 'bg-violet-100', border: 'border-violet-300' },
      { cellBg: 'bg-lime-200', pillBg: 'bg-lime-100', border: 'border-lime-300' },
      { cellBg: 'bg-cyan-200', pillBg: 'bg-cyan-100', border: 'border-cyan-300' },
      { cellBg: 'bg-fuchsia-200', pillBg: 'bg-fuchsia-100', border: 'border-fuchsia-300' },
    ];
    const map = {};
    departmentData.allSubjects.forEach((subject, index) => {
        map[subject.id] = colors[index % colors.length];
    });
    return map;
  }, [departmentData.allSubjects]);

  const activeClass = useMemo(() => departmentData.classes.find(c => c.id === activeClassId), [activeClassId, departmentData]);
  const activeTimetable = useMemo(() => timetables[activeClassId] || {}, [timetables, activeClassId]);

  const unassignedSubjects = useMemo(() => {
    if (!activeClass) return [];
    
    const assignedHours = Object.values(activeTimetable).reduce((acc, slot) => {
        acc[slot.subject.id] = (acc[slot.subject.id] || 0) + 1;
        return acc;
    }, {});
    
    return activeClass.subjects.map(classSub => {
      const subjectDetails = departmentData.allSubjects.find(s => s.id === classSub.subjectId);
      if (!subjectDetails) return null; // Handle case where subject might be deleted
      return {
        ...subjectDetails,
        hoursPerWeek: classSub.hours,
        remainingHours: classSub.hours - (assignedHours[classSub.subjectId] || 0),
      }
    }).filter(subject => subject && subject.remainingHours > 0);

  }, [activeTimetable, departmentData.allSubjects, activeClass]);


  const handleAutoGenerate = () => {
    if (!activeClassId) return;

    let newTimetableForClass = { ...activeTimetable };
    const availableSlots = config.days.flatMap(day => config.timeSlots.map(hour => {
        const key = `${day}-${hour}`;
        return newTimetableForClass[key] ? null : { day, hour };
    })).filter(Boolean);
    
    const subjectsToSchedule = unassignedSubjects.flatMap(subject => {
        return Array(subject.remainingHours).fill(subject);
    });

    let tempUnassigned = [...subjectsToSchedule];

    while (tempUnassigned.length > 0 && availableSlots.length > 0) {
        const subject = tempUnassigned.shift();
        
        for (let i = availableSlots.length - 1; i >= 0; i--) { // Iterate backwards for safe splicing
            const { day, hour } = availableSlots[i];
            
            const faculty = departmentData.allFaculties.find(f => f.expertise.includes(subject.id));
            const classroom = departmentData.allClassrooms.find(r => r.isLab === subject.lab);
            if (!faculty || !classroom) continue;

            const potentialConflict = checkForConflict({ day, hour, faculty, classroom, ignoreClassId: activeClassId });
            if (!potentialConflict) {
                const key = `${day}-${hour}`;
                newTimetableForClass[key] = { subject, faculty, classroom };
                availableSlots.splice(i, 1);
                break;
            }
        }
    }
    setTimetables(prev => ({ ...prev, [activeClassId]: newTimetableForClass }));
  };
  
  const checkForConflict = useCallback(({ day, hour, faculty, classroom, ignoreClassId = null }) => {
    for (const classId in timetables) {
        if (classId === ignoreClassId) continue;
        const currentTimetable = timetables[classId];
        const key = `${day}-${hour}`;
        if (currentTimetable[key]) {
            if (currentTimetable[key].faculty.id === faculty.id) {
                return { type: 'faculty', message: `Faculty ${faculty.name} is booked for ${departmentData.classes.find(c=>c.id === classId)?.department} at this time.` };
            }
            if (currentTimetable[key].classroom.id === classroom.id) {
                 return { type: 'classroom', message: `Room ${classroom.name} is booked for ${departmentData.classes.find(c=>c.id === classId)?.department} at this time.` };
            }
        }
    }
    return null;
  }, [timetables, departmentData.classes]);
  
  const calculateUnavailableSlots = (faculty) => {
    if (!faculty) return;
    const busySlots = [];
    for (const classId in timetables) {
        if (classId === activeClassId) continue;
        const timetable = timetables[classId];
        for (const key in timetable) {
            if (timetable[key].faculty.id === faculty.id) {
                busySlots.push(key);
            }
        }
    }
    setUnavailableSlots(busySlots);
  };
  
  const handlePillDragStart = (e, subject) => {
    if(subject.remainingHours <= 0) {
        e.preventDefault();
        return;
    }
    const faculty = departmentData.allFaculties.find(f => f.expertise.includes(subject.id));
    const classroom = departmentData.allClassrooms.find(r => r.isLab === subject.lab);
    if (!faculty || !classroom) {
        setConflict({ message: `No available faculty or ${subject.lab ? 'lab' : 'room'} for ${subject.name}.`});
        setTimeout(() => setConflict(null), 3000);
        e.preventDefault();
        return;
    }
    calculateUnavailableSlots(faculty);
    setDraggedItem({ subject, faculty, classroom, source: 'pill' });
  };
  
  const handleGridDragStart = (e, day, hour, slotData) => {
    if (!activeClassId) {
        e.preventDefault();
        return;
    }
    calculateUnavailableSlots(slotData.faculty);
    setDraggedItem({ ...slotData, source: 'grid', sourceKey: `${day}-${hour}` });
  };

  const handleDragEnd = () => {
      setUnavailableSlots([]);
      setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (day, hour) => {
    if (!draggedItem || !activeClassId) return;

    const targetKey = `${day}-${hour}`;
    const { source, sourceKey } = draggedItem;

    if (source === 'grid' && sourceKey === targetKey) {
        setDraggedItem(null);
        return;
    }
    
    const itemToPlace = {
        subject: draggedItem.subject,
        faculty: draggedItem.faculty,
        classroom: draggedItem.classroom,
    };
    
    const potentialConflict = checkForConflict({ day, hour, ...itemToPlace, ignoreClassId: activeClassId });

    if (potentialConflict) {
        if (potentialConflict.type === 'classroom') {
             setConflictToResolve({ day, hour, draggedItem, conflict: potentialConflict });
        } else { // Faculty conflict is a hard stop
            setConflict(potentialConflict);
            setTimeout(() => setConflict(null), 3000);
        }
    } else {
        setTimetables(prev => {
            const newTimetableForClass = { ...(prev[activeClassId] || {}) };
            const swappedItem = newTimetableForClass[targetKey];
            newTimetableForClass[targetKey] = itemToPlace;
            
            if (source === 'grid' && sourceKey) {
                if(swappedItem) {
                    newTimetableForClass[sourceKey] = swappedItem;
                } else {
                   delete newTimetableForClass[sourceKey];
                }
            }
            
            return { ...prev, [activeClassId]: newTimetableForClass };
        });
    }
    setDraggedItem(null);
  };
  
  const handleResolveConflict = (newClassroomId) => {
    if (!conflictToResolve) return;

    const { day, hour, draggedItem } = conflictToResolve;
    const newClassroom = departmentData.allClassrooms.find(c => c.id === newClassroomId);

    const itemToPlace = {
        ...draggedItem,
        classroom: newClassroom,
    };
    
    // Perform final placement logic
    setTimetables(prev => {
        const newTimetableForClass = { ...(prev[activeClassId] || {}) };
        const targetKey = `${day}-${hour}`;
        newTimetableForClass[targetKey] = itemToPlace;

        if (draggedItem.source === 'grid' && draggedItem.sourceKey) {
           delete newTimetableForClass[draggedItem.sourceKey];
        }
        
        return { ...prev, [activeClassId]: newTimetableForClass };
    });

    setConflictToResolve(null);
  };
  
  const findAvailableRooms = (day, hour, isLab) => {
    const busyRoomIds = new Set();
    for (const classId in timetables) {
        const key = `${day}-${hour}`;
        if(timetables[classId][key]) {
            busyRoomIds.add(timetables[classId][key].classroom.id);
        }
    }
    return departmentData.allClassrooms.filter(room => room.isLab === isLab && !busyRoomIds.has(room.id));
  };
  
  const handleDataChange = (category, index, field, value) => {
    setDepartmentData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        newData[category][index][field] = value;
        return newData;
    });
  };

  const handleClassSubjectChange = (classIndex, subjectIndex, field, value) => {
    setDepartmentData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        newData.classes[classIndex].subjects[subjectIndex][field] = value;
        return newData;
    });
  };
  
  const handleAddClassSubject = (classIndex) => {
     setDepartmentData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        newData.classes[classIndex].subjects.push({ subjectId: '', hours: 3});
        return newData;
    });
  };
  
  const handleRemoveClassSubject = (classIndex, subjectIndex) => {
      setDepartmentData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        newData.classes[classIndex].subjects.splice(subjectIndex, 1);
        return newData;
    });
  };


  const handleAddItem = (category) => {
      setDepartmentData(prev => {
          const newData = JSON.parse(JSON.stringify(prev));
          const newId = `${category.slice(0,3).toUpperCase()}${Date.now()}`;
          let newItem = {};
          if(category === 'allSubjects') newItem = { id: newId, name: 'New Subject', code: 'NEW-00', lab: false };
          if(category === 'allFaculties') newItem = { id: newId, name: 'New Faculty', expertise: [] };
          if(category === 'allClassrooms') newItem = { id: newId, name: 'New Room', capacity: 50, isLab: false };
          if(category === 'classes') newItem = { id: newId, year: '1st Year', department: 'New Dept', strength: 60, subjects: [] };
          newData[category].push(newItem);
          return newData;
      });
  }

  const handleDeleteItem = (category, index) => {
      setDepartmentData(prev => {
          const newData = JSON.parse(JSON.stringify(prev));
          newData[category].splice(index, 1);
          return newData;
      });
  }


  const handleUpdateSlot = (key, newSlotData) => {
    setTimetables(prev => ({
        ...prev,
        [activeClassId]: { ...prev[activeClassId], [key]: newSlotData }
    }));
    setEditingSlot(null);
  };

  const handleConfigChange = (type, value) => {
    setConfig(prev => ({ ...prev, [type]: value }));
  };

  const handleLunchChange = (field, value) => {
    setConfig(prev => ({ ...prev, lunchTime: {...prev.lunchTime, [field]: value} }));
  };

  const handleBreakChange = (id, field, value) => {
    setConfig(prev => ({
        ...prev,
        breakTimes: prev.breakTimes.map(b => b.id === id ? {...b, [field]: value} : b)
    }));
  };

  const handlePeriodChange = (index, part, value) => {
      setConfig(prev => {
          const newTimeSlots = [...prev.timeSlots];
          const parts = newTimeSlots[index].split(' - ');
          if (part === 'start') {
              parts[0] = value;
          } else {
              parts[1] = value;
          }
          newTimeSlots[index] = parts.join(' - ');
          return {...prev, timeSlots: newTimeSlots};
      })
  };

  const handleAddPeriod = () => {
      setConfig(prev => ({...prev, timeSlots: [...prev.timeSlots, '00:00 - 00:00']}))
  }

  const handleRemovePeriod = (index) => {
      setConfig(prev => ({...prev, timeSlots: prev.timeSlots.filter((_, i) => i !== index)}))
  }

  const renderTimetable = (colorMap) => {
    let timetableToDisplay = {};
    const currentViewClass = departmentData.classes.find(c => c.id === view.id);

    if (view.type === 'class' && currentViewClass) {
        timetableToDisplay = timetables[view.id] || {};
    } else if (view.type === 'faculty' || view.type === 'room') {
      let filteredSlots = {};
      for (const classId in timetables) {
        for (const key in timetables[classId]) {
          const slot = timetables[classId][key];
          const match = (view.type === 'faculty' && slot.faculty.id === view.id) || (view.type === 'room' && slot.classroom.id === view.id);
          if (match) {
            const classInfo = departmentData.classes.find(c => c.id === classId);
            filteredSlots[key] = { ...slot, subject: {...slot.subject, name: `${slot.subject.name} (${classInfo.department})`} };
          }
        }
      }
      timetableToDisplay = filteredSlots;
    } else {
        timetableToDisplay = activeTimetable;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
            <thead>
                <tr className="bg-gray-100">
                <th className="p-3 font-semibold text-left text-gray-600 w-32 border border-gray-200">Time</th>
                {config.days.map(day => (
                    <th key={day} className="p-3 font-semibold text-left text-gray-600 border border-gray-200">{day}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {allDaySlots.map(slot => {
                    const {type, time, name} = slot;
                    if(type === 'lunch' || type === 'break') {
                        return (
                            <tr key={time}>
                                <td className="p-3 font-medium text-gray-700 border border-gray-200">{time}</td>
                                <td colSpan={config.days.length} className={`p-3 font-bold text-center text-gray-600 border border-gray-300 ${type === 'lunch' ? 'bg-amber-100' : 'bg-sky-100'}`}>
                                    <div className="flex items-center justify-center">
                                        {type === 'lunch' ? <Coffee size={16} className="mr-2" /> : <Clock size={16} className="mr-2" />}
                                        {name.toUpperCase()}
                                    </div>
                                </td>
                            </tr>
                        );
                    }
                    // It's a class slot
                    return (
                        <tr key={time}>
                            <td className="p-3 font-medium text-gray-700 border border-gray-200">{time}</td>
                            {config.days.map(day => {
                            const key = `${day}-${time}`;
                            const slotData = timetableToDisplay[key];
                            const isUnavailable = unavailableSlots.includes(key);
                            const color = slotData ? colorMap[slotData.subject.id] : { cellBg: 'bg-gray-200' };
                            return (
                                <TimetableCell
                                    key={key}
                                    slotData={slotData}
                                    onDrop={() => handleDrop(day, time)}
                                    onDragOver={handleDragOver}
                                    onEditClick={() => slotData && activeClassId && setEditingSlot({ key, data: slotData })}
                                    onGridDragStart={(e) => handleGridDragStart(e, day, time, slotData)}
                                    onGridDragEnd={handleDragEnd}
                                    isUnavailable={isUnavailable}
                                    color={color}
                                />
                            )
                            })}
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
    );
  };

  // --- Phase Renderers ---
  const renderPhase1Configure = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Phase 1: Configure Department Data</h2>
      <p className="text-gray-600 mb-8">Define the daily schedule and manage resources. Teaching periods are calculated automatically based on your break timings.</p>
      
      <div className="space-y-8">
          <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">General Schedule Settings</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">College Start Time</label>
                      <input type="time" value={config.dayStartTime} onChange={(e) => handleConfigChange('dayStartTime', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white"/>
                  </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">College End Time</label>
                      <input type="time" value={config.dayEndTime} onChange={(e) => handleConfigChange('dayEndTime', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white"/>
                  </div>
              </div>

              <div className="space-y-4">
                 <div>
                    <h4 className="font-medium text-gray-800 mb-2">Lunch Break (Mandatory)</h4>
                    <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-md border">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Start Time</label>
                            <input type="time" value={config.lunchTime.startTime} onChange={(e) => handleLunchChange('startTime', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white"/>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">End Time</label>
                            <input type="time" value={config.lunchTime.endTime} onChange={(e) => handleLunchChange('endTime', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white"/>
                        </div>
                    </div>
                 </div>
                 <div>
                    <h4 className="font-medium text-gray-800 mb-2">Other Breaks</h4>
                     <div className="space-y-3">
                         {config.breakTimes.map((breakItem, index) => (
                             <div key={breakItem.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center p-3 bg-gray-50 rounded-md border">
                                <div>
                                     <label className="block text-xs font-medium text-gray-600 mb-1">Break Name</label>
                                     <input placeholder={`e.g., Break ${index + 1}`} value={breakItem.name} onChange={(e) => handleBreakChange(breakItem.id, 'name', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white"/>
                                </div>
                                <div>
                                     <label className="block text-xs font-medium text-gray-600 mb-1">Start Time</label>
                                     <input type="time" value={breakItem.startTime} onChange={(e) => handleBreakChange(breakItem.id, 'startTime', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white"/>
                                </div>
                                <div>
                                     <label className="block text-xs font-medium text-gray-600 mb-1">End Time</label>
                                     <input type="time" value={breakItem.endTime} onChange={(e) => handleBreakChange(breakItem.id, 'endTime', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white"/>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-center my-2">
                        <h4 className="font-medium text-gray-800">Calculated Teaching Periods</h4>
                        <button onClick={() => setIsManualPeriodEdit(prev => !prev)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center">
                            {isManualPeriodEdit ? <Save size={16} className="mr-1"/> : <Edit size={16} className="mr-1"/>}
                            {isManualPeriodEdit ? 'Save Periods' : 'Edit Periods'}
                        </button>
                    </div>
                    <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-md text-sm text-indigo-800">
                        {isManualPeriodEdit ? (
                            <div className="space-y-2">
                                {config.timeSlots.map((ts, index) => {
                                    const [start, end] = ts.split(' - ');
                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <input type="time" value={start} onChange={e => handlePeriodChange(index, 'start', e.target.value)} className="w-full p-1 border rounded text-gray-800 font-mono"/>
                                            <span className="font-bold text-gray-600">-</span>
                                            <input type="time" value={end} onChange={e => handlePeriodChange(index, 'end', e.target.value)} className="w-full p-1 border rounded text-gray-800 font-mono"/>
                                            <button onClick={() => handleRemovePeriod(index)} className="p-1 text-red-500 hover:bg-red-100 rounded-md"><Trash2 size={16}/></button>
                                        </div>
                                    )
                                })}
                                <button onClick={handleAddPeriod} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center mt-2"><Plus size={16} className="mr-1"/> Add Period</button>
                            </div>
                        ) : (
                            config.timeSlots.length > 0 ? (
                                <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {config.timeSlots.map(ts => <li key={ts} className="font-mono bg-white p-1 rounded text-center">{ts}</li>)}
                                </ul>
                            ) : <p>Please set valid start, end, and break times to generate periods.</p>
                        )}
                    </div>
                 </div>
              </div>
          </div>


          <div className="p-4 border rounded-lg">
             <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-700">Classes / Sections</h3>
                <button onClick={() => handleAddItem('classes')} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"><Plus size={16} className="mr-1"/> Add Class</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center px-3 mb-2 font-semibold text-sm text-gray-600">
                <span>Year</span>
                <span>Department</span>
                <span>Strength</span>
             </div>
             {departmentData.classes.map((item, i) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-md mb-3 border">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                        <input placeholder="Year" value={item.year} onChange={(e) => handleDataChange('classes', i, 'year', e.target.value)} className="p-1 border rounded"/>
                        <input placeholder="Department" value={item.department} onChange={(e) => handleDataChange('classes', i, 'department', e.target.value)} className="p-1 border rounded"/>
                        <input placeholder="Strength" type="number" value={item.strength} onChange={(e) => handleDataChange('classes', i, 'strength', e.target.value)} className="p-1 border rounded"/>
                        <button onClick={() => handleDeleteItem('classes', i)} className="p-2 text-red-500 hover:bg-red-100 rounded-md justify-self-end"><Trash2 size={16}/></button>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-sm text-gray-600">Subjects for {item.department || 'this class'}:</h4>
                             <button onClick={() => handleAddClassSubject(i)} className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center"><Plus size={14} className="mr-1"/> Assign Subject</button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center mb-1 font-semibold text-sm text-gray-600 px-1">
                            <span className="col-span-2">Subject</span>
                            <span>Periods/Week</span>
                        </div>
                        {item.subjects.map((sub, j) => (
                             <div key={j} className="grid grid-cols-3 gap-2 items-center mb-1">
                                <select value={sub.subjectId} onChange={(e) => handleClassSubjectChange(i, j, 'subjectId', e.target.value)} className="p-1 border rounded bg-white col-span-2">
                                     <option value="">Select Subject</option>
                                     {departmentData.allSubjects.map(s => <option key={s.id} value={s.id}>{s.code} - {s.name}</option>)}
                                </select>
                                <input type="number" value={sub.hours} onChange={(e) => handleClassSubjectChange(i, j, 'hours', parseInt(e.target.value) || 0)} className="p-1 border rounded" />
                                <button onClick={() => handleRemoveClassSubject(i, j)} className="p-1 text-red-500 hover:bg-red-100 rounded-md justify-self-center"><Trash2 size={14}/></button>
                             </div>
                        ))}
                    </div>
                </div>
             ))}
          </div>

           {[
                { title: 'Subjects', category: 'allSubjects', headers: ['Name', 'Code', 'Type'] },
                { title: 'Faculty', category: 'allFaculties', headers: ['Name', 'Expertise (Codes CSV)', ''] },
                { title: 'Classrooms', category: 'allClassrooms', headers: ['Name', 'Capacity', 'Type'] }
            ].map(({ title, category, headers }) => (
            <div key={category} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg text-gray-700">{title}</h3>
                    <button onClick={() => handleAddItem(category)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"><Plus size={16} className="mr-1"/> Add New</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2 px-2 font-semibold text-sm text-gray-600">
                    {headers.map(h => <span key={h} className={category === 'allFaculties' && h.includes('Expertise') ? 'col-span-2' : ''}>{h}</span>)}
                </div>
                {departmentData[category].map((item, i) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2 p-2 bg-gray-50 rounded-md items-center">
                        <input placeholder="Name" value={item.name} onChange={(e) => handleDataChange(category, i, 'name', e.target.value)} className="p-1 border rounded"/>
                        {category === 'allSubjects' && <>
                            <input placeholder="Code" value={item.code} onChange={(e) => handleDataChange(category, i, 'code', e.target.value)} className="p-1 border rounded"/>
                            <select value={item.lab} onChange={(e) => handleDataChange(category, i, 'lab', e.target.value === 'true')} className="p-1 border rounded bg-white"><option value={true}>Lab</option><option value={false}>Theory</option></select>
                        </>}
                        {category === 'allFaculties' && <input placeholder="e.g., SUB001,SUB002" value={item.expertise.join(',')} onChange={(e) => handleDataChange(category, i, 'expertise', e.target.value.split(',').map(s => s.trim()))} className="p-1 border rounded col-span-2"/>}
                        {category === 'allClassrooms' && <>
                            <input placeholder="Capacity" type="number" value={item.capacity} onChange={(e) => handleDataChange(category, i, 'capacity', e.target.value)} className="p-1 border rounded"/>
                            <select value={item.isLab} onChange={(e) => handleDataChange(category, i, 'isLab', e.target.value === 'true')} className="p-1 border rounded bg-white"><option value={true}>Lab</option><option value={false}>Room</option></select>
                        </>}
                         <button onClick={() => handleDeleteItem(category, i)} className="p-2 text-red-500 hover:bg-red-100 rounded-md justify-self-end"><Trash2 size={16}/></button>
                    </div>
                ))}
            </div>
            ))}
      </div>
      <div className="text-center mt-12">
        <button onClick={() => setPhase(2)} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
         Review & Confirm Data <ChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderPhase2Confirm = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Phase 2: Confirm Data</h2>
      <p className="text-gray-600 mb-8">Please verify the configured data. Go back to make changes or proceed to generate the timetable.</p>
       <div className="space-y-8">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center text-xl font-bold text-gray-800 mb-4">
            <Users className="text-indigo-500 mr-3" />
            <span>Academic Setup</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Classes ({departmentData.classes.length})</h3>
              <ul className="space-y-2 text-sm text-gray-800 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-md border">
                {departmentData.classes.map(c => <li key={c.id} className="p-2 bg-white rounded shadow-xs">{c.year} - {c.department}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Subjects ({departmentData.allSubjects.length})</h3>
              <ul className="space-y-2 text-sm text-gray-800 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-md border">
                {departmentData.allSubjects.map(s => <li key={s.id} className="p-2 bg-white rounded shadow-xs">{s.code} - {s.name}</li>)}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
           <div className="flex items-center text-xl font-bold text-gray-800 mb-4">
            <School className="text-teal-500 mr-3" />
            <span>Resources</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Faculty ({departmentData.allFaculties.length})</h3>
              <ul className="space-y-2 text-sm text-gray-800 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-md border">
                {departmentData.allFaculties.map(f => <li key={f.id} className="p-2 bg-white rounded shadow-xs">{f.name}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Classrooms ({departmentData.allClassrooms.length})</h3>
              <ul className="space-y-2 text-sm text-gray-800 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-md border">
                {departmentData.allClassrooms.map(c => <li key={c.id} className="p-2 bg-white rounded shadow-xs">{c.name}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
        <div className="flex justify-center items-center mt-12 space-x-4">
            <button onClick={() => setPhase(1)} className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 flex items-center justify-center">
              <ChevronLeft className="mr-2" /> Back to Configure
            </button>
            <button onClick={() => {
                if(departmentData.classes.length > 0) setActiveClassId(departmentData.classes[0].id);
                setPhase(3);
             }} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Confirm & Proceed <ChevronRight className="ml-2" />
            </button>
        </div>
    </div>
  );

  const renderPhase3Generate = (colorMap) => (
    <div className="p-8">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800">Phase 3: Generate & Refine Timetable</h2>
            <select onChange={(e) => setActiveClassId(e.target.value)} value={activeClassId || ''} className="p-2 border rounded-md bg-white shadow-sm">
                <option value="" disabled>Select a Class to Edit</option>
                {departmentData.classes.map(c => <option key={c.id} value={c.id}>{c.year} - {c.department}</option>)}
            </select>
        </div>
        <p className="text-gray-600 mb-8">Select a class, use "Auto-Generate", then drag & drop. Slots where faculty are busy with other classes will be disabled.</p>
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
                <button onClick={handleAutoGenerate} disabled={!activeClassId} className="w-full mb-6 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Auto-Generate for Selected Class
                </button>
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <h3 className="font-bold mb-4 text-gray-700">Unassigned Classes</h3>
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                        {unassignedSubjects.map(subject => {
                            const color = colorMap[subject.id] || { pillBg: 'bg-gray-100', border: 'border-gray-300' };
                            return <SubjectPill key={subject.id} subject={subject} remainingHours={subject.remainingHours}
                            onDragStart={(e) => handlePillDragStart(e, subject)}
                            onDragEnd={handleDragEnd}
                            color={color}
                           />
                        })}
                         {unassignedSubjects.length === 0 && activeClassId && <p className="text-sm text-center text-gray-500 p-4 bg-gray-50 rounded-lg">All classes assigned!</p>}
                         {!activeClassId && <p className="text-sm text-center text-gray-500 p-4">Please select a class.</p>}
                    </div>
                </div>
            </div>
            <div className="lg:w-3/4 bg-white p-4 rounded-xl shadow-sm border">
                 {renderTimetable(colorMap)}
            </div>
        </div>
        <div className="flex justify-center items-center mt-12 space-x-4">
            <button onClick={() => setPhase(2)} className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 flex items-center justify-center">
              <ChevronLeft className="mr-2" /> Back
            </button>
            <button onClick={() => {
                setView({type: 'class', id: departmentData.classes[0]?.id || null});
                setPhase(4);
            }} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Finalize & Proceed <ChevronRight className="ml-2" />
            </button>
        </div>
    </div>
  );

  const renderPhase4Review = (colorMap) => {
    const filterOptions = {
        class: departmentData.classes,
        faculty: departmentData.allFaculties,
        room: departmentData.allClassrooms,
    };
    
    const currentOptions = filterOptions[view.type] || [];
      
    return (
    <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Phase 4: Review & Export</h2>
        <p className="text-gray-600 mb-8">Review the finalized timetables. Viewing by faculty or room shows a consolidated schedule.</p>
        
        <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-100 p-4 rounded-xl mb-8">
            <span className="font-semibold text-gray-700">View By:</span>
            <div className="flex items-center rounded-lg shadow-sm border bg-white">
                <button 
                    onClick={() => setView({ type: 'class', id: departmentData.classes[0]?.id || null })}
                    className={`px-4 py-2 rounded-l-lg font-medium transition-colors ${view.type === 'class' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    Class
                </button>
                <button 
                    onClick={() => setView({ type: 'faculty', id: departmentData.allFaculties[0]?.id || null })}
                    className={`px-4 py-2 font-medium transition-colors border-l border-r ${view.type === 'faculty' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    Faculty
                </button>
                <button 
                    onClick={() => setView({ type: 'room', id: departmentData.allClassrooms[0]?.id || null })}
                    className={`px-4 py-2 rounded-r-lg font-medium transition-colors ${view.type === 'room' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    Room
                </button>
            </div>
            
            <select 
                value={view.id || ''}
                onChange={(e) => setView(prev => ({ ...prev, id: e.target.value }))}
                className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 shadow-sm"
            >
                {currentOptions.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.department || option.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
            {renderTimetable(colorMap)}
        </div>

        <div className="flex justify-center items-center mt-12 space-x-4">
             <button onClick={() => setPhase(3)} className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 flex items-center justify-center">
              <ChevronLeft className="mr-2" /> Back
            </button>
            <button onClick={() => alert('All timetables exported and synced!')} className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
              Export All & Sync Modules <Download className="ml-2" />
            </button>
        </div>
    </div>
    )
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Multi-Class Timetable Generator</h1>
          <p className="text-indigo-600 font-medium">Department-Wide Scheduling</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-8">
                 <Stepper currentPhase={phase} />
            </div>
            <div className="border-t border-gray-200">
              {phase === 1 && renderPhase1Configure()}
              {phase === 2 && renderPhase2Confirm()}
              {phase === 3 && renderPhase3Generate(subjectColorMap)}
              {phase === 4 && renderPhase4Review(subjectColorMap)}
            </div>
        </div>
        <ConflictAlert conflict={conflict} onClose={() => setConflict(null)} />
        {editingSlot && activeClassId && (
            <EditSlotModal
                slot={editingSlot}
                onClose={() => setEditingSlot(null)}
                onSave={handleUpdateSlot}
                subjects={departmentData.allSubjects.filter(s => activeClass.subjects.map(cs => cs.subjectId).includes(s.id))}
                faculties={departmentData.allFaculties}
                classrooms={departmentData.allClassrooms}
                onConflictCheck={(details) => checkForConflict({ ...details, ignoreClassId: activeClassId })}
            />
        )}
        {conflictToResolve && (
            <ConflictResolutionModal 
                details={conflictToResolve}
                onClose={() => setConflictToResolve(null)}
                onResolve={handleResolveConflict}
                availableRooms={findAvailableRooms(conflictToResolve.day, conflictToResolve.hour, conflictToResolve.draggedItem.subject.lab)}
            />
        )}
      </main>
    </div>
  );
}

