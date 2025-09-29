import React, { useState, useMemo, useEffect } from 'react';
import { Coffee, Clock, User, Calendar, Filter } from 'lucide-react';

// --- MOCK DATA (Simulate fetching from a database/localStorage) ---
const MOCK_TIMETABLE_DATA = {
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
    programs: [
        {
            id: 'PROG01',
            name: 'Bachelor of Technology (B.Tech)',
            courses: [
                {
                    id: 'COURSE01', name: 'Computer Science & Engineering',
                    years: [{
                        id: 'YEAR01', name: '4th Year',
                        sections: [
                            { id: 'CSE-A-4', name: 'Section A' },
                            { id: 'CSE-B-4', name: 'Section B' }
                        ]
                    }]
                },
                {
                    id: 'COURSE02', name: 'Physics',
                    years: [{
                        id: 'YEAR02', name: '4th Year',
                        sections: [{ id: 'PHY-A-4', name: 'Section A' }]
                    }]
                }
            ]
        }
    ],
    config: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        timeSlots: [
            "09:00 - 09:52", "09:52 - 10:45",
            "11:00 - 11:52", "11:52 - 12:45",
            "13:45 - 14:37", "14:37 - 15:30", "15:30 - 16:22"
        ],
        lunchTime: { name: 'Lunch Break', startTime: '12:45', endTime: '13:45' },
        breakTimes: [{ id: 1, name: 'Morning Break', startTime: '10:45', endTime: '11:00' }],
    },
    timetables: {
        'CSE-A-4': {
            'Monday-09:00 - 09:52': { subjectId: 'SUB002', facultyId: 'FAC02', classroomId: 'CR01' },
            'Monday-09:52 - 10:45': { subjectId: 'SUB003', facultyId: 'FAC03', classroomId: 'CR01' },
            'Tuesday-11:00 - 11:52': { subjectId: 'SUB004', facultyId: 'FAC03', classroomId: 'LAB01' },
            'Wednesday-13:45 - 14:37': { subjectId: 'SUB002', facultyId: 'FAC02', classroomId: 'CR02' },
        },
        'CSE-B-4': {
            'Monday-09:00 - 09:52': { subjectId: 'SUB005', facultyId: 'FAC02', classroomId: 'CR02' },
            'Tuesday-13:45 - 14:37': { subjectId: 'SUB006', facultyId: 'FAC04', classroomId: 'LAB02' },
        },
        'PHY-A-4': {
            'Friday-09:00 - 09:52': { subjectId: 'SUB001', facultyId: 'FAC01', classroomId: 'CR01' },
        },
    }
};

// --- Helper Functions & Derived Data ---
const flattenAcademicData = (programs) => {
    const sections = [];
    programs.forEach(prog => {
        prog.courses.forEach(course => {
            course.years.forEach(year => {
                year.sections.forEach(sec => {
                    sections.push({
                        ...sec,
                        yearName: year.name,
                        courseName: course.name,
                        fullDisplayName: `${course.name} - ${year.name} - ${sec.name}`
                    });
                });
            });
        });
    });
    return { sections };
};

// --- UI Components ---
const TimetableCell = ({ slot, color }) => (
    <td className="border border-gray-200 dark:border-gray-700 h-24 p-1 align-top">
        {slot ? (
            <div className={`p-2 rounded-md h-full flex flex-col justify-between text-xs ${color}`}>
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-900">{slot.subject.name}</p>
                    <p className="text-gray-600 dark:text-gray-700">{slot.faculty.name}</p>
                </div>
                <p className="text-gray-500 dark:text-gray-600 font-medium">{slot.classroom.name}</p>
            </div>
        ) : (
            <div className="w-full h-full rounded-md bg-gray-50 dark:bg-gray-800/50"></div>
        )}
    </td>
);

const TimetableGrid = ({ config, timetable, subjectColorMap, data, selectedDay = '' }) => {
    const allDaySlots = useMemo(() => {
        const teaching = config.timeSlots.map(ts => ({ type: 'class', time: ts }));
        const lunch = { type: 'lunch', time: `${config.lunchTime.startTime} - ${config.lunchTime.endTime}`, name: config.lunchTime.name };
        const breaks = config.breakTimes.map(bt => ({ type: 'break', time: `${bt.startTime} - ${bt.endTime}`, name: bt.name }));
        const combined = [...teaching, lunch, ...breaks];
        return combined.sort((a, b) => a.time.split(' - ')[0].localeCompare(b.time.split(' - ')[0]));
    }, [config]);

    const daysToDisplay = selectedDay ? [selectedDay] : config.days;

    const getFullSlotData = (slot) => {
        if (!slot) return null;
        return {
            subject: data.allSubjects.find(s => s.id === slot.subjectId),
            faculty: data.allFaculties.find(f => f.id === slot.facultyId),
            classroom: data.allClassrooms.find(c => c.id === slot.classroomId),
        };
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="p-3 font-semibold text-left text-gray-600 dark:text-gray-300 w-32 border border-gray-200 dark:border-gray-600">Time</th>
                        {daysToDisplay.map(day => (
                            <th key={day} className="p-3 font-semibold text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allDaySlots.map(slotInfo => {
                        if (slotInfo.type !== 'class') {
                            return (
                                <tr key={slotInfo.time}>
                                    <td className="p-3 font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">{slotInfo.time}</td>
                                    <td colSpan={daysToDisplay.length} className={`p-3 font-bold text-center border ${slotInfo.type === 'lunch' ? 'bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200' : 'bg-sky-100 dark:bg-sky-800/50 text-sky-800 dark:text-sky-200'}`}>
                                        <div className="flex items-center justify-center">
                                            {slotInfo.type === 'lunch' ? <Coffee size={16} className="mr-2" /> : <Clock size={16} className="mr-2" />}
                                            {slotInfo.name.toUpperCase()}
                                        </div>
                                    </td>
                                </tr>
                            );
                        }
                        return (
                            <tr key={slotInfo.time}>
                                <td className="p-3 font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">{slotInfo.time}</td>
                                {daysToDisplay.map(day => {
                                    const key = `${day}-${slotInfo.time}`;
                                    const slotData = getFullSlotData(timetable[key]);
                                    const color = slotData ? subjectColorMap[slotData.subject.id]?.cellBg : 'bg-gray-200';
                                    return <TimetableCell key={key} slot={slotData} color={color} />;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

// --- Student-Specific Component ---
const StudentView = ({ user, data }) => {
    const [filters, setFilters] = useState({ day: '', faculty: '' });
    const sectionId = user?.details?.sectionId;

    const studentTimetable = useMemo(() => {
        return data.timetables[sectionId] || {};
    }, [sectionId, data.timetables]);

    const mySection = useMemo(() => {
        const { sections } = flattenAcademicData(data.programs);
        return sections.find(s => s.id === sectionId);
    }, [sectionId, data.programs]);

    const sectionFaculties = useMemo(() => {
        const facultyIds = new Set(Object.values(studentTimetable).map(slot => slot.facultyId));
        return data.allFaculties.filter(faculty => facultyIds.has(faculty.id));
    }, [studentTimetable, data.allFaculties]);

    const filteredTimetable = useMemo(() => {
        if (!filters.faculty) {
            return studentTimetable;
        }
        return Object.entries(studentTimetable).reduce((acc, [key, slot]) => {
            if (slot.facultyId === filters.faculty) {
                acc[key] = slot;
            }
            return acc;
        }, {});
    }, [studentTimetable, filters.faculty]);

    const subjectColorMap = useMemo(() => {
        const colors = ['bg-sky-200', 'bg-amber-200', 'bg-emerald-200', 'bg-rose-200', 'bg-violet-200'];
        const map = {};
        Object.values(studentTimetable).forEach(({ subjectId }) => {
            if (!map[subjectId]) {
                map[subjectId] = { cellBg: colors[Object.keys(map).length % colors.length] };
            }
        });
        return map;
    }, [studentTimetable]);

    return (
        <div>
            <div className="p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg mb-6">
                 <div className="flex items-center mb-4">
                    <Filter className="mr-2 text-indigo-600" />
                    <h3 className="text-lg font-semibold">View Options for: <span className="text-indigo-700 dark:text-indigo-400">{mySection?.fullDisplayName || 'Your Class'}</span></h3>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                     <div className="flex items-center gap-2 w-full sm:w-1/2">
                        <label htmlFor="faculty-filter-student" className="font-medium text-sm shrink-0">Filter by Faculty:</label>
                        <select 
                            id="faculty-filter-student" 
                            value={filters.faculty} 
                            onChange={e => setFilters(f => ({...f, faculty: e.target.value}))} 
                            className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 w-full"
                        >
                            <option value="">All Faculty</option>
                            {sectionFaculties.map(faculty => (
                                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                            ))}
                        </select>
                    </div>
                     <div className="flex items-center gap-2 w-full sm:w-1/2">
                        <label htmlFor="day-filter-student" className="font-medium text-sm shrink-0">Filter by Day:</label>
                        <select 
                            id="day-filter-student" 
                            value={filters.day} 
                            onChange={e => setFilters(f => ({...f, day: e.target.value}))} 
                            className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 w-full"
                        >
                            <option value="">All Week</option>
                            {data.config.days.map(day => <option key={day} value={day}>{day}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <TimetableGrid
                config={data.config}
                timetable={filteredTimetable}
                subjectColorMap={subjectColorMap}
                data={data}
                selectedDay={filters.day}
            />
        </div>
    );
};


// --- Main Component ---
export default function StudentTimetableView() {
    const [timetableData, setTimetableData] = useState(null);
    const [loading, setLoading] = useState(true);

    const mockUser = {
        role: 'Student',
        details: {
            studentId: 'STU-24-CSE-067',
            sectionId: 'CSE-A-4', // Student is in section CSE-A-4
            name: 'Aarav Gupta'
        }
    };

    useEffect(() => {
        const id = setTimeout(() => {
            setTimetableData(MOCK_TIMETABLE_DATA);
            setLoading(false);
        }, 500);
        return () => clearTimeout(id);
    }, []);

    const renderContent = () => {
        if (loading || !timetableData) {
            return <div className="text-center p-10">Loading Timetable...</div>;
        }
        return <StudentView user={mockUser} data={timetableData} />;
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 flex items-center">
                    <Calendar className="mr-3 text-indigo-500" /> My Timetable
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome, {mockUser.details.name}. Here is your weekly class schedule.</p>
            </header>
            <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6">
                {renderContent()}
            </main>
        </div>
    );
}