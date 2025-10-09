import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronRight, ChevronLeft, School, Download, CheckCircle, AlertTriangle, Edit, X, Save, Plus, Trash2, Users, ArrowRightLeft, Clock, Coffee } from 'lucide-react';

// --- MOCK DATA (Simulating a hierarchical database structure) ---
const MOCK_DATA = {
    departments: [
        {
            id: 'DEPT01',
            name: 'Computer Science and  Engineering',
            programs: [
                {
                    id: 'PROG01',
                    name: 'Bachelor of Engineering (B.E)',
                    years: [
                        {
                            id: 'YEAR01',
                            name: 'Second Year',
                            sections: [
                                {
                                    id: 'EEE-A-2',
                                    name: 'EEE - Section A',
                                    strength: 55,
                                    courses: [
                                        { courseId: 'SUB001', hours: 4 },
                                        { courseId: 'SUB002', hours: 4 },
                                    ]
                                },
                                {
                                    id: 'CSE-A-2',
                                    name: 'CSE - Section A',
                                    strength: 60,
                                    courses: [
                                        { courseId: 'SUB003', hours: 3 },
                                        { courseId: 'SUB004', hours: 2 },
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    allCourses: [
        { id: 'SUB001', name: 'Mathematics-1', code: 'LST112', lab: false },
        { id: 'SUB002', name: 'Digital Circuits', code: 'EC-201', lab: true },
        { id: 'SUB003', name: 'Data Structures', code: 'CS-202', lab: false },
        { id: 'SUB004', name: 'Algorithms Lab', code: 'CS-202L', lab: true },
    ],
    allFaculties: [
        { id: 'FAC01', name: 'Mr. Sandeep Bandari', expertise: ['SUB001'] },
        { id: 'FAC02', name: 'Prof. Ada Lovelace', expertise: ['SUB002', 'SUB004'] },
        { id: 'FAC03', name: 'Dr. Alan Turing', expertise: ['SUB003'] },
    ],
    allClassrooms: [
        { id: 'CR102', name: 'Room 102', capacity: 60, isLab: false, building: 'ACHARYA BLOCK' },
        { id: 'LAB01', name: 'Digital Lab', capacity: 40, isLab: true, building: 'MAIN BLOCK' },
    ]
};


// --- UI Components ---
const Stepper = ({ currentPhase }) => {
    const phases = ['Schedule & Academics', 'Confirm', 'Generate & Refine', 'Review & Export'];
    return (
        <div className="flex items-center justify-center mb-8 md:mb-12 overflow-x-auto pb-4">
            {phases.map((phase, index) => (
                <React.Fragment key={phase}>
                    <div className="flex items-center flex-shrink-0">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${index + 1 <= currentPhase ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                            {index + 1 < currentPhase ? <CheckCircle size={20} /> : index + 1}
                        </div>
                        <span className={`ml-3 font-medium whitespace-nowrap ${index + 1 <= currentPhase ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>{phase}</span>
                    </div>
                    {index < phases.length - 1 && <div className="flex-auto border-t-2 transition duration-500 ease-in-out mx-4 border-gray-300 dark:border-gray-600"></div>}
                </React.Fragment>
            ))}
        </div>
    );
};

const CoursePill = ({ course, onDragStart, onDragEnd, remainingHours, color }) => (
    <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={`p-3 border rounded-lg cursor-grab flex items-center justify-between transition-all duration-200 hover:shadow-md hover:border-indigo-500 ${color.pillBg} ${color.border}`}
    >
        <div>
            <p className="font-bold text-sm text-gray-800 dark:text-gray-900">{course.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-600">{course.code}</p>
        </div>
        <div className="text-right">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-800">Hours Left</p>
            <p className="text-lg font-bold text-indigo-600">{remainingHours}</p>
        </div>
    </div>
);


const TimetableCell = ({ slotData, onDrop, onDragOver, onEditClick, onGridDragStart, onGridDragEnd, isUnavailable, color }) => (
    <td className="border border-gray-200 dark:border-gray-700 h-24 p-1 align-top relative"
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
                    <p className="font-bold text-gray-800 dark:text-gray-900">{slotData.course.name}</p>
                    <p className="text-gray-600 dark:text-gray-700">{slotData.faculty.name}</p>
                </div>
                <p className="text-gray-500 dark:text-gray-600 font-medium">{slotData.classroom.name}</p>
            </div>
        ) : (
            <div className="w-full h-full rounded-md bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"></div>
        )}
        {isUnavailable && (
            <div className="absolute inset-0 bg-gray-400 dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 flex items-center justify-center text-gray-800 dark:text-gray-300 text-xs font-semibold uppercase tracking-wider cursor-not-allowed">
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

const EditSlotModal = ({ slot, onClose, onSave, courses, faculties, classrooms, onConflictCheck }) => {
    const [editedSlot, setEditedSlot] = useState(slot.data);
    const [originalSlot,] = useState(slot.data);

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

    const handleCourseChange = (courseId) => {
        const course = courses.find(s => s.id === courseId);
        const faculty = faculties.find(f => f.expertise.includes(course.id)) || originalSlot.faculty;
        const classroom = classrooms.find(c => c.isLab === course.lab) || originalSlot.classroom;
        setEditedSlot({ course, faculty, classroom });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Edit Slot</h2>
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course</label>
                        <select value={editedSlot.course.id} onChange={(e) => handleCourseChange(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                            {courses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Faculty</label>
                        <select value={editedSlot.faculty.id} onChange={(e) => setEditedSlot(prev => ({ ...prev, faculty: faculties.find(f => f.id === e.target.value) }))} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                            {faculties.filter(f => f.expertise.includes(editedSlot.course.id)).map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Classroom</label>
                        <select value={editedSlot.classroom.id} onChange={(e) => setEditedSlot(prev => ({ ...prev, classroom: classrooms.find(c => c.id === e.target.value) }))} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                            {classrooms.filter(c => c.isLab === editedSlot.course.lab).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"><Save size={16} className="mr-2" /> Save Changes</button>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center"><AlertTriangle className="text-amber-500 mr-3" /> Resolve Classroom Conflict</h2>
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"><X size={24} /></button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{details.conflict.message}</p>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Change Classroom</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">The selected classroom is busy. Please choose an available alternative for this time slot.</p>
                    {availableRooms.length > 0 ? (
                        <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                            {availableRooms.map(room => (
                                <option key={room.id} value={room.id}>{room.name} (Capacity: {room.capacity})</option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-red-600 font-medium bg-red-100 p-3 rounded-md">No alternative rooms available for this slot.</p>
                    )}
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                    <button onClick={handleResolve} disabled={!selectedRoom || availableRooms.length === 0} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <ArrowRightLeft size={16} className="mr-2" /> Assign to New Room
                    </button>
                </div>
            </div>
        </div>
    );
}


// --- Main App Component ---
export default function CreateTimetable() {
    const [phase, setPhase] = useState(1);
    const [timetables, setTimetables] = useState({}); // Key: sectionId, Value: { 'day-hour': { ... } }
    const [activeSectionId, setActiveSectionId] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);
    const [conflict, setConflict] = useState(null);
    const [view, setView] = useState({}); // <<< FIX: Initialize with an empty object
    const [unavailableSlots, setUnavailableSlots] = useState([]);
    const [conflictToResolve, setConflictToResolve] = useState(null);
    const [config, setConfig] = useState({
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        dayStartTime: '09:00',
        dayEndTime: '16:30',
        timeSlots: [],
        lunchTime: { name: 'Lunch Break', startTime: '12:40', endTime: '13:30' },
        breakTimes: [
            { id: 1, name: 'Morning Break', startTime: '10:40', endTime: '11:00' },
        ],
    });
    const [departmentData, setDepartmentData] = useState(() => JSON.parse(JSON.stringify(MOCK_DATA)));
    const [editingSlot, setEditingSlot] = useState(null);
    const [isManualPeriodEdit, setIsManualPeriodEdit] = useState(false);

    const { allDepartments, allPrograms, allYears, allSections } = useMemo(() => {
        const departments = departmentData.departments;
        const programs = [];
        const years = [];
        const sections = [];

        departmentData.departments.forEach(dept => {
            (dept.programs || []).forEach(prog => {
                programs.push({ ...prog, departmentId: dept.id, departmentName: dept.name });
                (prog.years || []).forEach(year => {
                    years.push({ ...year, programId: prog.id, programName: prog.name });
                    (year.sections || []).forEach(sec => {
                        sections.push({
                            ...sec,
                            yearId: year.id,
                            yearName: year.name,
                            programId: prog.id,
                            programName: prog.name,
                            departmentId: dept.id,
                            departmentName: dept.name,
                            fullDisplayName: `${prog.name} / ${year.name} / ${sec.name}`
                        });
                    });
                });
            });
        });
        return { allDepartments: departments, allPrograms: programs, allYears: years, allSections: sections };
    }, [departmentData]);

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
            const periods = Math.round(duration / 50); // Assuming 50 min period
            if (periods > 0) {
                const periodDuration = duration / periods;
                for (let i = 0; i < periods; i++) {
                    const pStart = startMins + i * periodDuration;
                    const pEnd = pStart + periodDuration;
                    newTimeSlots.push(`${minutesToTime(pStart)} - ${minutesToTime(pEnd)}`);
                }
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

    const courseColorMap = useMemo(() => {
        const colors = [
            { cellBg: 'bg-sky-200', pillBg: 'bg-sky-100 dark:bg-sky-300/70', border: 'border-sky-300 dark:border-sky-400' },
            { cellBg: 'bg-amber-200', pillBg: 'bg-amber-100 dark:bg-amber-300/70', border: 'border-amber-300 dark:border-amber-400' },
            { cellBg: 'bg-emerald-200', pillBg: 'bg-emerald-100 dark:bg-emerald-300/70', border: 'border-emerald-300 dark:border-emerald-400' },
            { cellBg: 'bg-rose-200', pillBg: 'bg-rose-100 dark:bg-rose-300/70', border: 'border-rose-300 dark:border-rose-400' },
            { cellBg: 'bg-violet-200', pillBg: 'bg-violet-100 dark:bg-violet-300/70', border: 'border-violet-300 dark:border-violet-400' },
            { cellBg: 'bg-lime-200', pillBg: 'bg-lime-100 dark:bg-lime-300/70', border: 'border-lime-300 dark:border-lime-400' },
            { cellBg: 'bg-cyan-200', pillBg: 'bg-cyan-100 dark:bg-cyan-300/70', border: 'border-cyan-300 dark:border-cyan-400' },
            { cellBg: 'bg-fuchsia-200', pillBg: 'bg-fuchsia-100 dark:bg-fuchsia-300/70', border: 'border-fuchsia-300 dark:border-fuchsia-400' },
        ];
        const map = {};
        departmentData.allCourses.forEach((course, index) => {
            map[course.id] = colors[index % colors.length];
        });
        return map;
    }, [departmentData.allCourses]);

    const activeSection = useMemo(() => allSections.find(c => c.id === activeSectionId), [activeSectionId, allSections]);
    const activeTimetable = useMemo(() => timetables[activeSectionId] || {}, [timetables, activeSectionId]);

    const unassignedCourses = useMemo(() => {
        if (!activeSection) return [];

        const assignedHours = Object.values(activeTimetable).reduce((acc, slot) => {
            acc[slot.course.id] = (acc[slot.course.id] || 0) + 1;
            return acc;
        }, {});

        return (activeSection.courses || []).map(classSub => {
            const courseDetails = departmentData.allCourses.find(s => s.id === classSub.courseId);
            if (!courseDetails) return null;
            return {
                ...courseDetails,
                hoursPerWeek: classSub.hours,
                remainingHours: classSub.hours - (assignedHours[classSub.courseId] || 0),
            }
        }).filter(course => course && course.remainingHours > 0);

    }, [activeTimetable, departmentData.allCourses, activeSection]);

    const handleAutoGenerate = () => {
        if (!activeSectionId) return;

        let newTimetableForClass = { ...activeTimetable };
        const availableSlots = config.days.flatMap(day => config.timeSlots.map(hour => {
            const key = `${day}-${hour}`;
            return newTimetableForClass[key] ? null : { day, hour };
        })).filter(Boolean);

        const coursesToSchedule = unassignedCourses.flatMap(course => {
            return Array(course.remainingHours).fill(course);
        });

        let tempUnassigned = [...coursesToSchedule];

        while (tempUnassigned.length > 0 && availableSlots.length > 0) {
            const course = tempUnassigned.shift();

            for (let i = availableSlots.length - 1; i >= 0; i--) {
                const { day, hour } = availableSlots[i];

                const faculty = departmentData.allFaculties.find(f => f.expertise.includes(course.id));
                const classroom = departmentData.allClassrooms.find(r => r.isLab === course.lab);
                if (!faculty || !classroom) continue;

                const potentialConflict = checkForConflict({ day, hour, faculty, classroom, ignoreSectionId: activeSectionId });
                if (!potentialConflict) {
                    const key = `${day}-${hour}`;
                    newTimetableForClass[key] = { course, faculty, classroom };
                    availableSlots.splice(i, 1);
                    break;
                }
            }
        }
        setTimetables(prev => ({ ...prev, [activeSectionId]: newTimetableForClass }));
    };

    const checkForConflict = useCallback(({ day, hour, faculty, classroom, ignoreSectionId = null }) => {
        for (const sectionId in timetables) {
            if (sectionId === ignoreSectionId) continue;
            const currentTimetable = timetables[sectionId];
            const key = `${day}-${hour}`;
            if (currentTimetable[key]) {
                const conflictSection = allSections.find(s => s.id === sectionId);
                if (currentTimetable[key].faculty.id === faculty.id) {
                    return { type: 'faculty', message: `Faculty ${faculty.name} is booked for ${conflictSection?.fullDisplayName} at this time.` };
                }
                if (currentTimetable[key].classroom.id === classroom.id) {
                    return { type: 'classroom', message: `Room ${classroom.name} is booked for ${conflictSection?.fullDisplayName} at this time.` };
                }
            }
        }
        return null;
    }, [timetables, allSections]);

    const calculateUnavailableSlots = (faculty) => {
        if (!faculty) return;
        const busySlots = [];
        for (const sectionId in timetables) {
            if (sectionId === activeSectionId) continue;
            const timetable = timetables[sectionId];
            for (const key in timetable) {
                if (timetable[key].faculty.id === faculty.id) {
                    busySlots.push(key);
                }
            }
        }
        setUnavailableSlots(busySlots);
    };

    const handlePillDragStart = (e, course) => {
        if (course.remainingHours <= 0) {
            e.preventDefault();
            return;
        }
        const faculty = departmentData.allFaculties.find(f => f.expertise.includes(course.id));
        const classroom = departmentData.allClassrooms.find(r => r.isLab === course.lab);
        if (!faculty || !classroom) {
            setConflict({ message: `No available faculty or ${course.lab ? 'lab' : 'room'} for ${course.name}.` });
            setTimeout(() => setConflict(null), 3000);
            e.preventDefault();
            return;
        }
        calculateUnavailableSlots(faculty);
        setDraggedItem({ course, faculty, classroom, source: 'pill' });
    };

    const handleGridDragStart = (e, day, hour, slotData) => {
        if (!activeSectionId) {
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
        if (!draggedItem || !activeSectionId) return;

        const targetKey = `${day}-${hour}`;
        const { source, sourceKey } = draggedItem;

        // Avoid re-dropping in the same cell
        if (source === 'grid' && sourceKey === targetKey) {
            handleDragEnd();
            return;
        }

        const itemToPlace = {
            course: draggedItem.course,
            faculty: draggedItem.faculty,
            classroom: draggedItem.classroom,
        };

        const potentialConflict = checkForConflict({ day, hour, ...itemToPlace, ignoreSectionId: activeSectionId });

        if (potentialConflict) {
            if (potentialConflict.type === 'classroom') {
                setConflictToResolve({ day, hour, draggedItem, conflict: potentialConflict });
            } else {
                setConflict(potentialConflict);
                setTimeout(() => setConflict(null), 3000);
            }
        } else {
            setTimetables(prev => {
                const newTimetables = JSON.parse(JSON.stringify(prev));
                const newTimetableForClass = newTimetables[activeSectionId] || {};

                const swappedItem = newTimetableForClass[targetKey];
                newTimetableForClass[targetKey] = itemToPlace;

                if (source === 'grid' && sourceKey) {
                    if (swappedItem) {
                        newTimetableForClass[sourceKey] = swappedItem;
                    } else {
                        delete newTimetableForClass[sourceKey];
                    }
                }

                newTimetables[activeSectionId] = newTimetableForClass;
                return newTimetables;
            });
        }
        handleDragEnd();
    };

    const handleDropOnUnassigned = () => {
        if (draggedItem && draggedItem.source === 'grid' && activeSectionId) {
            setTimetables(prev => {
                const newTimetables = JSON.parse(JSON.stringify(prev));
                if (newTimetables[activeSectionId]) {
                    delete newTimetables[activeSectionId][draggedItem.sourceKey];
                }
                return newTimetables;
            });
        }
        handleDragEnd();
    };


    const handleResolveConflict = (newClassroomId) => {
        if (!conflictToResolve) return;

        const { day, hour, draggedItem } = conflictToResolve;
        const newClassroom = departmentData.allClassrooms.find(c => c.id === newClassroomId);

        const itemToPlace = {
            ...draggedItem,
            classroom: newClassroom,
        };

        setTimetables(prev => {
            const newTimetables = JSON.parse(JSON.stringify(prev));
            const newTimetableForClass = newTimetables[activeSectionId] || {};
            const targetKey = `${day}-${hour}`;
            newTimetableForClass[targetKey] = itemToPlace;

            if (draggedItem.source === 'grid' && draggedItem.sourceKey) {
                delete newTimetableForClass[draggedItem.sourceKey];
            }
            newTimetables[activeSectionId] = newTimetableForClass;
            return newTimetables;
        });

        setConflictToResolve(null);
        handleDragEnd();
    };


    const findAvailableRooms = (day, hour, isLab) => {
        const busyRoomIds = new Set();
        for (const classId in timetables) {
            const key = `${day}-${hour}`;
            if (timetables[classId][key]) {
                busyRoomIds.add(timetables[classId][key].classroom.id);
            }
        }
        return departmentData.allClassrooms.filter(room => room.isLab === isLab && !busyRoomIds.has(room.id));
    };

    const handleDataChange = (path, field, value) => {
        setDepartmentData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData.departments;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i].index][path[i].key];
            }
            current[path[path.length - 1].index][field] = value;
            return newData;
        });
    }

    const handleAddItem = (path, type) => {
        setDepartmentData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let list = newData.departments;

            path.forEach(p => {
                list = list[p.index][p.key];
            });

            const newId = `${type.slice(0, 4).toUpperCase()}${Date.now()}`;
            let newItem = {};
            if (type === 'department') newItem = { id: newId, name: 'New Department', programs: [] };
            if (type === 'program') newItem = { id: newId, name: 'New Program', years: [] };
            if (type === 'year') newItem = { id: newId, name: 'New Year', sections: [] };
            if (type === 'section') newItem = { id: newId, name: 'New Section', strength: 60, courses: [] };

            list.push(newItem);
            return newData;
        });
    }

    const handleDeleteItem = (path) => {
        setDepartmentData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let list = newData.departments;
            for (let i = 0; i < path.length - 1; i++) {
                list = list[path[i].index][path[i].key];
            }
            list.splice(path[path.length - 1].index, 1);
            return newData;
        });
    }

    const handleCourseAssignmentChange = (dIdx, pIdx, yIdx, sIdx, courseIndex, field, value) => {
        setDepartmentData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const section = newData.departments[dIdx].programs[pIdx].years[yIdx].sections[sIdx];
            section.courses[courseIndex][field] = value;
            return newData;
        });
    }
    const handleAddCourseAssignment = (dIdx, pIdx, yIdx, sIdx) => {
        setDepartmentData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const section = newData.departments[dIdx].programs[pIdx].years[yIdx].sections[sIdx];
            if (!section.courses) {
                section.courses = [];
            }
            section.courses.push({ courseId: '', hours: 3 });
            return newData;
        });
    }
    const handleRemoveCourseAssignment = (dIdx, pIdx, yIdx, sIdx, courseIndex) => {
        setDepartmentData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            const section = newData.departments[dIdx].programs[pIdx].years[yIdx].sections[sIdx];
            section.courses.splice(courseIndex, 1);
            return newData;
        });
    }

    const handleUpdateSlot = (key, newSlotData) => {
        setTimetables(prev => ({
            ...prev,
            [activeSectionId]: { ...prev[activeSectionId], [key]: newSlotData }
        }));
        setEditingSlot(null);
    };

    const handleConfigChange = (type, value) => {
        setConfig(prev => ({ ...prev, [type]: value }));
    };

    const handleLunchChange = (field, value) => {
        setConfig(prev => ({ ...prev, lunchTime: { ...prev.lunchTime, [field]: value } }));
    };

    const handleBreakChange = (id, field, value) => {
        setConfig(prev => ({
            ...prev,
            breakTimes: prev.breakTimes.map(b => b.id === id ? { ...b, [field]: value } : b)
        }));
    };

    const handleAddBreak = () => {
        setConfig(prev => ({
            ...prev,
            breakTimes: [...prev.breakTimes, { id: Date.now(), name: 'New Break', startTime: '00:00', endTime: '00:00' }]
        }));
    };

    const handleRemoveBreak = (id) => {
        setConfig(prev => ({
            ...prev,
            breakTimes: prev.breakTimes.filter(b => b.id !== id)
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
            return { ...prev, timeSlots: newTimeSlots };
        })
    };

    const handleAddPeriod = () => {
        setConfig(prev => ({ ...prev, timeSlots: [...prev.timeSlots, '00:00 - 00:00'] }))
    }

    const handleRemovePeriod = (index) => {
        setConfig(prev => ({ ...prev, timeSlots: prev.timeSlots.filter((_, i) => i !== index) }))
    }

    const renderTimetable = (colorMap) => {
        let timetableToDisplay = {};

        if (view.type === 'department' || view.type === 'program' || view.type === 'year') {
            let sectionsToDisplay = [];
            if (view.type === 'department') {
                sectionsToDisplay = allSections.filter(s => s.departmentId === view.id);
            } else if (view.type === 'program') {
                sectionsToDisplay = allSections.filter(s => s.programId === view.id);
            } else { // year
                sectionsToDisplay = allSections.filter(s => s.yearId === view.id);
            }
            const sectionIdSet = new Set(sectionsToDisplay.map(s => s.id));

            const filteredSlots = {};
            for (const sectionId in timetables) {
                if (sectionIdSet.has(sectionId)) {
                    for (const key in timetables[sectionId]) {
                        if (filteredSlots[key]) continue;

                        const slot = timetables[sectionId][key];
                        const sectionInfo = allSections.find(s => s.id === sectionId);
                        const subName = `${sectionInfo.name}`
                        filteredSlots[key] = { ...slot, course: { ...slot.course, name: `${slot.course.name} (${subName})` } };
                    }
                }
            }
            timetableToDisplay = filteredSlots;

        } else if (view.type === 'class') {
            timetableToDisplay = timetables[view.id] || {};
        } else if (view.type === 'faculty' || view.type === 'room') {
            let filteredSlots = {};
            for (const sectionId in timetables) {
                for (const key in timetables[sectionId]) {
                    const slot = timetables[sectionId][key];
                    const match = (view.type === 'faculty' && slot.faculty.id === view.id) || (view.type === 'room' && slot.classroom.id === view.id);
                    if (match) {
                        const sectionInfo = allSections.find(s => s.id === sectionId);
                        const sectionShortName = `${sectionInfo.name}`;
                        filteredSlots[key] = { ...slot, course: { ...slot.course, name: `${slot.course.name} (${sectionShortName})` } };
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
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="p-3 font-semibold text-left text-gray-600 dark:text-gray-300 w-32 border border-gray-200 dark:border-gray-600">Time</th>
                            {config.days.map(day => (
                                <th key={day} className="p-3 font-semibold text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allDaySlots.map(slot => {
                            const { type, time, name } = slot;
                            if (type === 'lunch' || type === 'break') {
                                return (
                                    <tr key={time}>
                                        <td className="p-3 font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">{time}</td>
                                        <td colSpan={config.days.length} className={`p-3 font-bold text-center border ${type === 'lunch' ? 'bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-700' : 'bg-sky-100 dark:bg-sky-800/50 text-sky-800 dark:text-sky-200 border-sky-200 dark:border-sky-700'}`}>
                                            <div className="flex items-center justify-center">
                                                {type === 'lunch' ? <Coffee size={16} className="mr-2" /> : <Clock size={16} className="mr-2" />}
                                                {name.toUpperCase()}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                            return (
                                <tr key={time}>
                                    <td className="p-3 font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">{time}</td>
                                    {config.days.map(day => {
                                        const key = `${day}-${time}`;
                                        const slotData = timetableToDisplay[key];
                                        const isUnavailable = unavailableSlots.includes(key);
                                        const color = slotData ? colorMap[slotData.course.id] : { cellBg: 'bg-gray-200' };
                                        return (
                                            <TimetableCell
                                                key={key}
                                                slotData={slotData}
                                                onDrop={() => handleDrop(day, time)}
                                                onDragOver={handleDragOver}
                                                onEditClick={() => slotData && activeSectionId && setEditingSlot({ key, data: slotData })}
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

    const renderPhase1ScheduleAndAcademics = () => (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Phase 1: Configure Schedule & Academics</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Define the daily schedule, academic structure, and assign courses to sections.</p>

            <div className="space-y-8">
                {/* General Schedule Settings */}
                <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-200 mb-4">General Schedule Settings</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">College Start Time</label>
                            <input type="time" value={config.dayStartTime} onChange={(e) => handleConfigChange('dayStartTime', e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">College End Time</label>
                            <input type="time" value={config.dayEndTime} onChange={(e) => handleConfigChange('dayEndTime', e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Lunch Break (Mandatory)</h4>
                            <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-200 dark:border-gray-700">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Start Time</label>
                                    <input type="time" value={config.lunchTime.startTime} onChange={(e) => handleLunchChange('startTime', e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">End Time</label>
                                    <input type="time" value={config.lunchTime.endTime} onChange={(e) => handleLunchChange('endTime', e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">Other Breaks</h4>
                                <button onClick={handleAddBreak} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"><Plus size={16} className="mr-1" /> Add Break</button>
                            </div>
                            <div className="space-y-3">
                                {config.breakTimes.map((breakItem, index) => (
                                    <div key={breakItem.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-200 dark:border-gray-700">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Break Name</label>
                                            <input placeholder={`e.g., Break ${index + 1}`} value={breakItem.name} onChange={(e) => handleBreakChange(breakItem.id, 'name', e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Start Time</label>
                                            <input type="time" value={breakItem.startTime} onChange={(e) => handleBreakChange(breakItem.id, 'startTime', e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                                        </div>
                                        <div className="flex items-end h-full">
                                            <div className="w-full">
                                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">End Time</label>
                                                <input type="time" value={breakItem.endTime} onChange={(e) => handleBreakChange(breakItem.id, 'endTime', e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                                            </div>
                                            <button onClick={() => handleRemoveBreak(breakItem.id)} className="p-2 ml-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center my-2">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">Calculated Teaching Periods</h4>
                                <button onClick={() => setIsManualPeriodEdit(prev => !prev)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center">
                                    {isManualPeriodEdit ? <Save size={16} className="mr-1" /> : <Edit size={16} className="mr-1" />}
                                    {isManualPeriodEdit ? 'Save Periods' : 'Edit Periods'}
                                </button>
                            </div>
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-md text-sm text-indigo-800 dark:text-indigo-200">
                                {isManualPeriodEdit ? (
                                    <div className="space-y-2">
                                        {config.timeSlots.map((ts, index) => {
                                            const [start, end] = ts.split(' - ');
                                            return (
                                                <div key={index} className="flex items-center gap-2">
                                                    <input type="time" value={start} onChange={e => handlePeriodChange(index, 'start', e.target.value)} className="w-full p-1 border rounded text-gray-800 dark:text-gray-200 font-mono bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                                                    <span className="font-bold text-gray-600 dark:text-gray-400">-</span>
                                                    <input type="time" value={end} onChange={e => handlePeriodChange(index, 'end', e.target.value)} className="w-full p-1 border rounded text-gray-800 dark:text-gray-200 font-mono bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                                                    <button onClick={() => handleRemovePeriod(index)} className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md"><Trash2 size={16} /></button>
                                                </div>
                                            )
                                        })}
                                        <button onClick={handleAddPeriod} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center mt-2"><Plus size={16} className="mr-1" /> Add Period</button>
                                    </div>
                                ) : (
                                    config.timeSlots.length > 0 ? (
                                        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {config.timeSlots.map(ts => <li key={ts} className="font-mono bg-white dark:bg-gray-800/50 p-1 rounded text-center">{ts}</li>)}
                                        </ul>
                                    ) : <p>Please set valid start, end, and break times to generate periods.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Structure */}
                <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-200">Academic Structure</h3>
                        <button onClick={() => handleAddItem([], 'department')} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"><Plus size={16} className="mr-1" /> Add Department</button>
                    </div>
                    <div className="space-y-4">
                        {departmentData.departments.map((dept, dIdx) => (
                            <div key={dept.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 border rounded-md border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <input value={dept.name} onChange={(e) => handleDataChange([{ index: dIdx }], "name", e.target.value)} className="p-2 border rounded font-semibold text-gray-800 dark:text-gray-100 w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                                    <button onClick={() => handleAddItem([{ key: 'programs', index: dIdx }], 'program')} className="p-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-md whitespace-nowrap">Add Program</button>
                                    <button onClick={() => handleDeleteItem([{ index: dIdx }])} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md"><Trash2 size={16} /></button>
                                </div>
                                <div className="pl-6 space-y-3">
                                    {(dept.programs || []).map((prog, pIdx) => (
                                        <div key={prog.id} className="p-2 bg-white dark:bg-gray-800 border rounded border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center gap-2 mb-2">
                                                <input value={prog.name} onChange={(e) => handleDataChange([{ key: "programs", index: dIdx }, { index: pIdx }], "name", e.target.value)} className="p-1 border rounded font-medium text-gray-700 dark:text-gray-200 w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500" />
                                                <button onClick={() => handleAddItem([{ key: 'programs', index: dIdx }, { key: 'years', index: pIdx }], 'year')} className="p-1 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded whitespace-nowrap">Add Year</button>
                                                <button onClick={() => handleDeleteItem([{ key: 'programs', index: dIdx }, { index: pIdx }])} className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded"><Trash2 size={14} /></button>
                                            </div>
                                            <div className="pl-4 space-y-2">
                                                {(prog.years || []).map((year, yIdx) => (
                                                    <div key={year.id} className="p-2 bg-gray-50 dark:bg-gray-700/50 border rounded border-gray-200 dark:border-gray-600">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <input value={year.name} onChange={(e) => handleDataChange([{ key: "programs", index: dIdx }, { key: "years", index: pIdx }, { index: yIdx }], "name", e.target.value)} className="p-1 border rounded w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500" />
                                                            <button onClick={() => handleAddItem([{ key: 'programs', index: dIdx }, { key: 'years', index: pIdx }, { key: 'sections', index: yIdx }], 'section')} className="p-1 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded whitespace-nowrap">Add Section</button>
                                                            <button onClick={() => handleDeleteItem([{ key: 'programs', index: dIdx }, { key: 'years', index: pIdx }, { index: yIdx }])} className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded"><Trash2 size={14} /></button>
                                                        </div>
                                                        <div className="pl-4 space-y-2">
                                                            {(year.sections || []).map((section, sIdx) => (
                                                                <div key={section.id} className="p-2 bg-white dark:bg-gray-800 border rounded border-gray-200 dark:border-gray-600">
                                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center mb-2">
                                                                        <input placeholder="Section Name" value={section.name} onChange={(e) => handleDataChange([{ key: "programs", index: dIdx }, { key: "years", index: pIdx }, { key: "sections", index: yIdx }, { index: sIdx }], 'name', e.target.value)} className="p-1 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500" />
                                                                        <input placeholder="Strength" type="number" value={section.strength} onChange={(e) => handleDataChange([{ key: "programs", index: dIdx }, { key: "years", index: pIdx }, { key: "sections", index: yIdx }, { index: sIdx }], 'strength', parseInt(e.target.value) || 0)} className="p-1 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500" />
                                                                        <button onClick={() => handleDeleteItem([{ key: 'programs', index: dIdx }, { key: 'years', index: pIdx }, { key: 'sections', index: yIdx }, { index: sIdx }])} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md justify-self-end"><Trash2 size={16} /></button>
                                                                    </div>
                                                                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                                        <div className="flex justify-between items-center mb-2">
                                                                            <h4 className="font-medium text-sm text-gray-600 dark:text-gray-300">Courses & Hours/Week:</h4>
                                                                            <button onClick={() => handleAddCourseAssignment(dIdx, pIdx, yIdx, sIdx)} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center"><Plus size={14} className="mr-1" /> Add Course</button>
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            {(section.courses || []).map((sub, j) => (
                                                                                <div key={j} className="grid grid-cols-3 gap-2 items-center">
                                                                                    <select value={sub.courseId} onChange={(e) => handleCourseAssignmentChange(dIdx, pIdx, yIdx, sIdx, j, 'courseId', e.target.value)} className="p-1 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500 col-span-2 text-xs">
                                                                                        <option value="">Select Course</option>
                                                                                        {departmentData.allCourses.map(s => <option key={s.id} value={s.id}>{s.code} - {s.name}</option>)}
                                                                                    </select>
                                                                                    <div className="flex items-center">
                                                                                        <input type="number" value={sub.hours} onChange={(e) => handleCourseAssignmentChange(dIdx, pIdx, yIdx, sIdx, j, 'hours', parseInt(e.target.value) || 0)} className="p-1 border rounded w-full text-xs bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500" />
                                                                                        <button onClick={() => handleRemoveCourseAssignment(dIdx, pIdx, yIdx, sIdx, j)} className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md"><Trash2 size={14} /></button>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-12 space-x-4">
                <button onClick={() => setPhase(2)} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                    Review & Confirm Data <ChevronRight className="ml-2" />
                </button>
            </div>
        </div>
    );

    const renderPhase2Confirm = () => (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Phase 2: Confirm Data</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Please verify the configured data. Go back to make changes or proceed to generate the timetable.</p>
            <div className="space-y-8">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        <Users className="text-indigo-500 dark:text-indigo-400 mr-3" />
                        <span>Academic Setup ({allSections.length} Sections)</span>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                        <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
                            {allSections.map(s => <li key={s.id} className="p-2 bg-white dark:bg-gray-800 rounded shadow-xs list-none">{s.fullDisplayName}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        <School className="text-teal-500 dark:text-teal-400 mr-3" />
                        <span>Resources</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Courses ({departmentData.allCourses.length})</h3>
                            <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200 max-h-48 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                                {departmentData.allCourses.map(s => <li key={s.id} className="p-2 bg-white dark:bg-gray-800 rounded shadow-xs">{s.code} - {s.name}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Faculty ({departmentData.allFaculties.length})</h3>
                            <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200 max-h-48 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                                {departmentData.allFaculties.map(f => <li key={f.id} className="p-2 bg-white dark:bg-gray-800 rounded shadow-xs">{f.name}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Classrooms ({departmentData.allClassrooms.length})</h3>
                            <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200 max-h-48 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                                {departmentData.allClassrooms.map(c => <li key={c.id} className="p-2 bg-white dark:bg-gray-800 rounded shadow-xs">{c.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-12 space-x-4">
                <button onClick={() => setPhase(1)} className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center">
                    <ChevronLeft className="mr-2" /> Back to Configure
                </button>
                <button onClick={() => {
                    if (allSections.length > 0) setActiveSectionId(allSections[0].id);
                    setPhase(3);
                }} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                    Confirm & Proceed <ChevronRight className="ml-2" />
                </button>
            </div>
        </div>
    );

    const renderPhase3Generate = (colorMap) => (
        <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Phase 3: Generate & Refine</h2>
                <select onChange={(e) => setActiveSectionId(e.target.value)} value={activeSectionId || ''} className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 shadow-sm w-full md:max-w-sm text-gray-900 dark:text-gray-200">
                    <option value="" disabled>Select a Section to Edit</option>
                    {allSections.map(c => <option key={c.id} value={c.id}>{c.fullDisplayName}</option>)}
                </select>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Select a section, auto-generate, then drag & drop classes. Drag a class to this panel to unassign it.</p>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4">
                    <button onClick={handleAutoGenerate} disabled={!activeSectionId} className="w-full mb-6 bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed">
                        Auto-Generate for Section
                    </button>
                    <div
                        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        onDrop={handleDropOnUnassigned}
                        onDragOver={handleDragOver}
                    >
                        <h3 className="font-bold mb-4 text-gray-700 dark:text-gray-200">Unassigned Courses</h3>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                            {unassignedCourses.map(course => {
                                const color = colorMap[course.id] || { pillBg: 'bg-gray-100', border: 'border-gray-300' };
                                return <CoursePill key={`${course.id}-${course.remainingHours}`} course={course} remainingHours={course.remainingHours}
                                    onDragStart={(e) => handlePillDragStart(e, course)}
                                    onDragEnd={handleDragEnd}
                                    color={color}
                                />
                            })}
                            {unassignedCourses.length === 0 && activeSectionId && <div className="text-sm text-center text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">All courses assigned!</div>}
                            {!activeSectionId && <p className="text-sm text-center text-gray-500 dark:text-gray-400 p-4">Please select a section.</p>}
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    {renderTimetable(colorMap)}
                </div>
            </div>
            <div className="flex justify-center items-center mt-12 space-x-4">
                <button onClick={() => setPhase(2)} className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center">
                    <ChevronLeft className="mr-2" /> Back
                </button>
                <button onClick={() => {
                    setView({ type: 'class', id: allSections[0]?.id || null });
                    setPhase(4);
                }} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                    Finalize & Proceed <ChevronRight className="ml-2" />
                </button>
            </div>
        </div>
    );

    const renderPhase4Review = (colorMap) => {
        const filterOptions = {
            department: allDepartments,
            program: allPrograms,
            year: allYears,
            class: allSections.map(s => ({ ...s, name: s.fullDisplayName })),
            faculty: departmentData.allFaculties,
            room: departmentData.allClassrooms,
        };

        const viewTypes = ['department', 'program', 'year', 'class', 'faculty', 'room'];
        const currentOptions = filterOptions[view.type] || [];

        return (
            <div className="p-4 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Phase 4: Review & Export</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Review the finalized timetables. Viewing by faculty or room shows a consolidated schedule.</p>

                <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-100 dark:bg-gray-900/50 p-4 rounded-xl mb-8">
                    <span className="font-semibold text-gray-700 dark:text-gray-300 flex-shrink-0">View By:</span>
                    <div className="flex items-center rounded-lg shadow-sm border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-x-auto">
                        {viewTypes.map((type, index) => (
                            <button
                                key={type}
                                onClick={() => {
                                    const defaultId = filterOptions[type][0]?.id || null;
                                    setView({ type, id: defaultId });
                                }}
                                className={`px-4 py-2 font-medium transition-colors whitespace-nowrap
                                    ${view.type === type ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}
                                    ${index > 0 ? 'border-l border-gray-200 dark:border-gray-700' : ''}
                                `}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>

                    <select
                        value={view.id || ''}
                        onChange={(e) => setView(prev => ({ ...prev, id: e.target.value }))}
                        className="w-full md:w-auto bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 shadow-sm"
                    >
                        {currentOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    {renderTimetable(colorMap)}
                </div>

                <div className="flex justify-center items-center mt-12 space-x-4">
                    <button onClick={() => setPhase(3)} className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center">
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
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100">
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100">Multi-Class Timetable Generator</h1>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium">Department-Wide Scheduling</p>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-4 md:p-8">
                        <Stepper currentPhase={phase} />
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700">
                        {phase === 1 && renderPhase1ScheduleAndAcademics()}
                        {phase === 2 && renderPhase2Confirm()}
                        {phase === 3 && renderPhase3Generate(courseColorMap)}
                        {phase === 4 && renderPhase4Review(courseColorMap)}
                    </div>
                </div>
                <ConflictAlert conflict={conflict} onClose={() => setConflict(null)} />
                {editingSlot && activeSectionId && (
                    <EditSlotModal
                        slot={editingSlot}
                        onClose={() => setEditingSlot(null)}
                        onSave={handleUpdateSlot}
                        courses={departmentData.allCourses.filter(s => (activeSection.courses || []).map(cs => cs.courseId).includes(s.id))}
                        faculties={departmentData.allFaculties}
                        classrooms={departmentData.allClassrooms}
                        onConflictCheck={(details) => checkForConflict({ ...details, ignoreSectionId: activeSectionId })}
                    />
                )}
                {conflictToResolve && (
                    <ConflictResolutionModal
                        details={conflictToResolve}
                        onClose={() => setConflictToResolve(null)}
                        onResolve={handleResolveConflict}
                        availableRooms={findAvailableRooms(conflictToResolve.day, conflictToResolve.hour, conflictToResolve.draggedItem.course.lab)}
                    />
                )}
            </main>
        </div>
    );
}