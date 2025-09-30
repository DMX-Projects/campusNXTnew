import React, { useState, useMemo, useEffect } from 'react';
import { Eye, Filter, Coffee, Clock, User, Grid } from 'lucide-react';

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
    const courses = [];
    const sections = [];
    programs.forEach(prog => {
        prog.courses.forEach(course => {
            courses.push({ ...course, programId: prog.id, programName: prog.name });
            course.years.forEach(year => {
                year.sections.forEach(sec => {
                    sections.push({
                        ...sec,
                        yearName: year.name,
                        courseId: course.id,
                        courseName: course.name,
                        programId: prog.id,
                        programName: prog.name,
                        fullDisplayName: `${course.name} - ${year.name} - ${sec.name}`
                    });
                });
            });
        });
    });
    return { courses, sections };
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
                                    <td colSpan={daysToDisplay.length} className={`p-3 font-bold text-center border ${slotInfo.type === 'lunch' ? 'bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-700' : 'bg-sky-100 dark:bg-sky-800/50 text-sky-800 dark:text-sky-200 border-sky-200 dark:border-sky-700'}`}>
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

// --- HoD Component ---
const HodView = ({ data }) => {
    const [viewMode, setViewMode] = useState('section'); // 'section' or 'faculty'
    const [filters, setFilters] = useState({ program: '', course: '', section: '', faculty: '', day: '' });
    const { programs } = data;
    const { courses, sections } = useMemo(() => flattenAcademicData(programs), [programs]);

    const filteredCourses = useMemo(() => filters.program ? courses.filter(c => c.programId === filters.program) : [], [filters.program, courses]);
    const filteredSections = useMemo(() => filters.course ? sections.filter(s => s.courseId === filters.course) : [], [filters.course, sections]);
    
    // Reset filters when view mode changes to avoid confusion
    useEffect(() => {
        setFilters({ program: '', course: '', section: '', faculty: '', day: '' });
    }, [viewMode]);

    useEffect(() => {
        setFilters(f => ({ ...f, course: '', section: '' }));
    }, [filters.program]);

    useEffect(() => {
        setFilters(f => ({ ...f, section: '' }));
    }, [filters.course]);

    const displayedTimetable = useMemo(() => {
        if (viewMode === 'faculty' && filters.faculty) {
            const facultyTimetable = {};
            Object.entries(data.timetables).forEach(([sectionId, tt]) => {
                Object.entries(tt).forEach(([key, slot]) => {
                    if (slot.facultyId === filters.faculty) {
                        facultyTimetable[key] = slot;
                    }
                });
            });
            return facultyTimetable;
        }
        if (viewMode === 'section' && filters.section) {
            return data.timetables[filters.section] || {};
        }
        return {};
    }, [viewMode, filters, data.timetables]);
    
    const viewTitle = useMemo(() => {
        if (viewMode === 'faculty' && filters.faculty) {
            const facultyName = data.allFaculties.find(f => f.id === filters.faculty)?.name || 'Faculty';
            return `Timetable for ${facultyName}`;
        }
        if (viewMode === 'section' && filters.section) {
            const sectionName = sections.find(s => s.id === filters.section)?.fullDisplayName || 'Section';
            return `Timetable for ${sectionName}`;
        }
        return '';
    }, [viewMode, filters, data.allFaculties, sections]);

    const subjectColorMap = useMemo(() => {
        const colors = ['bg-sky-200', 'bg-amber-200', 'bg-emerald-200', 'bg-rose-200', 'bg-violet-200'];
        const map = {};
        data.allSubjects.forEach((subject, index) => {
            map[subject.id] = { cellBg: colors[index % colors.length] };
        });
        return map;
    }, [data.allSubjects]);

    const getButtonClass = (mode) => viewMode === mode 
        ? 'px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md flex items-center' 
        : 'px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 flex items-center';

    return (
        <div>
            <div className="p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg mb-6">
                <div className="flex items-center mb-4 border-b pb-4 border-gray-200 dark:border-gray-700">
                    <Filter className="mr-3 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <h3 className="text-lg font-semibold">Filter Timetables</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Select a view mode and then apply filters.</p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* View Mode Toggle */}
                    <div className="flex flex-col gap-2">
                         <label className="font-semibold text-sm">View Mode</label>
                         <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                            <button onClick={() => setViewMode('section')} className={getButtonClass('section')}>
                                <Grid size={16} className="mr-2" /> By Section
                            </button>
                            <button onClick={() => setViewMode('faculty')} className={getButtonClass('faculty')}>
                                <User size={16} className="mr-2" /> By Faculty
                            </button>
                         </div>
                    </div>

                    {/* Conditional Filters */}
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {viewMode === 'section' && (
                            <>
                                <div>
                                    <label className="font-semibold text-sm mb-1 block">Program</label>
                                    <select value={filters.program} onChange={e => setFilters({ ...filters, program: e.target.value })} className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 w-full">
                                        <option value="">Select Program</option>
                                        {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-semibold text-sm mb-1 block">Course</label>
                                    <select value={filters.course} onChange={e => setFilters({ ...filters, course: e.target.value })} className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 w-full" disabled={!filters.program}>
                                        <option value="">Select Course</option>
                                        {filteredCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-semibold text-sm mb-1 block">Section</label>
                                    <select value={filters.section} onChange={e => setFilters({ ...filters, section: e.target.value })} className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 w-full" disabled={!filters.course}>
                                        <option value="">Select Section</option>
                                        {filteredSections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                            </>
                        )}
                        {viewMode === 'faculty' && (
                            <div>
                                <label className="font-semibold text-sm mb-1 block">Faculty</label>
                                <select value={filters.faculty} onChange={e => setFilters({ ...filters, faculty: e.target.value })} className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 w-full">
                                    <option value="">Select Faculty</option>
                                    {data.allFaculties.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                </select>
                            </div>
                        )}
                        <div>
                             <label className="font-semibold text-sm mb-1 block">Day of Week</label>
                             <select value={filters.day} onChange={e => setFilters({ ...filters, day: e.target.value })} className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 w-full">
                                <option value="">All Days</option>
                                {data.config.days.map(day => <option key={day} value={day}>{day}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            {viewTitle ? (
                 <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{viewTitle}</h2>
                    <TimetableGrid config={data.config} timetable={displayedTimetable} subjectColorMap={subjectColorMap} data={data} selectedDay={filters.day} />
                 </div>
            ) : (
                <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">Please select filters to view a timetable.</p>
                </div>
            )}
        </div>
    );
};


// --- Main Component ---
export default function ViewTimetable() {
    const [timetableData, setTimetableData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call to fetch all necessary timetable data
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
        return <HodView data={timetableData} />;
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100 flex items-center">
                    <Eye className="mr-3 text-indigo-500" /> View Department Timetables
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Filter and view schedules for sections and faculty.</p>
            </header>
            <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6">
                {renderContent()}
            </main>
        </div>
    );
}

