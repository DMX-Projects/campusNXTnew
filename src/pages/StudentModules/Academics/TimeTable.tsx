import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import { Filter, Clock, User, BookOpen, MapPin, Sun, Moon, GraduationCap, Building2, Hash, Coffee } from 'lucide-react';

// Theme Context
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}
});

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};




// Student Profile Component
const StudentProfile = ({ student }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 rounded-xl p-6 text-white mb-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-blue-100">Student ID: {student.studentId}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-blue-100">Academic Year</div>
          <div className="text-lg font-semibold">{student.academicYear}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/20">
        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <Building2 className="w-5 h-5 text-blue-200" />
          <div>
            <div className="text-xs text-blue-200">Department</div>
            <div className="font-semibold">{student.department}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <Clock className="w-5 h-5 text-blue-200" />
          <div>
            <div className="text-xs text-blue-200">Semester</div>
            <div className="font-semibold">{student.semester}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <Hash className="w-5 h-5 text-blue-200" />
          <div>
            <div className="text-xs text-blue-200">Section</div>
            <div className="font-semibold">{student.section}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimeTableContent = () => {
  // Student Information
  const studentData = {
    name: "Alex Johnson",
    studentId: "CSE2023A045",
    department: "Computer Science Engineering",
    semester: "3rd Semester",
    section: "Section A",
    academicYear: "2023-2024"
  };

  // Sample timetable data with lunch break
  const timetableData = {
    'CSE-3-A': {
      department: 'Computer Science Engineering',
      semester: '3rd Semester',
      section: 'Section A',
      schedule: {
        Monday: {
          '09:00-10:00': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'CS101' },
          '10:00-11:00': { subject: 'Database Management', faculty: 'Prof. Johnson', room: 'CS102' },
          '11:15-12:15': { subject: 'Computer Networks', faculty: 'Dr. Brown', room: 'CS103' },
          '12:15-01:15': { subject: 'Software Engineering', faculty: 'Prof. Davis', room: 'CS104' },
          '01:15-02:15': { subject: 'LUNCH BREAK', faculty: '', room: '', isBreak: true },
          '02:15-03:15': { subject: 'Web Technologies Lab', faculty: 'Dr. Wilson', room: 'Lab1' },
          '03:15-04:15': { subject: 'Web Technologies Lab', faculty: 'Dr. Wilson', room: 'Lab1' }
        },
        Tuesday: {
          '09:00-10:00': { subject: 'Operating Systems', faculty: 'Dr. Miller', room: 'CS105' },
          '10:00-11:00': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'CS101' },
          '11:15-12:15': { subject: 'Mathematics III', faculty: 'Prof. Taylor', room: 'M201' },
          '12:15-01:15': { subject: 'Computer Networks', faculty: 'Dr. Brown', room: 'CS103' },
          '01:15-02:15': { subject: 'LUNCH BREAK', faculty: '', room: '', isBreak: true },
          '02:15-03:15': { subject: 'Database Lab', faculty: 'Prof. Johnson', room: 'Lab2' },
          '03:15-04:15': { subject: 'Database Lab', faculty: 'Prof. Johnson', room: 'Lab2' }
        },
        Wednesday: {
          '09:00-10:00': { subject: 'Software Engineering', faculty: 'Prof. Davis', room: 'CS104' },
          '10:00-11:00': { subject: 'Operating Systems', faculty: 'Dr. Miller', room: 'CS105' },
          '11:15-12:15': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'CS101' },
          '12:15-01:15': { subject: 'Technical Communication', faculty: 'Prof. Anderson', room: 'H101' },
          '01:15-02:15': { subject: 'LUNCH BREAK', faculty: '', room: '', isBreak: true },
          '02:15-03:15': { subject: 'Programming Lab', faculty: 'Dr. Wilson', room: 'Lab3' },
          '03:15-04:15': { subject: 'Programming Lab', faculty: 'Dr. Wilson', room: 'Lab3' }
        },
        Thursday: {
          '09:00-10:00': { subject: 'Database Management', faculty: 'Prof. Johnson', room: 'CS102' },
          '10:00-11:00': { subject: 'Computer Networks', faculty: 'Dr. Brown', room: 'CS103' },
          '11:15-12:15': { subject: 'Operating Systems', faculty: 'Dr. Miller', room: 'CS105' },
          '12:15-01:15': { subject: 'Mathematics III', faculty: 'Prof. Taylor', room: 'M201' },
          '01:15-02:15': { subject: 'LUNCH BREAK', faculty: '', room: '', isBreak: true },
          '02:15-03:15': { subject: 'Seminar', faculty: 'Various Faculty', room: 'Seminar Hall' },
          '03:15-04:15': { subject: 'Library', faculty: '', room: 'Library' }
        },
        Friday: {
          '09:00-10:00': { subject: 'Technical Communication', faculty: 'Prof. Anderson', room: 'H101' },
          '10:00-11:00': { subject: 'Software Engineering', faculty: 'Prof. Davis', room: 'CS104' },
          '11:15-12:15': { subject: 'Database Management', faculty: 'Prof. Johnson', room: 'CS102' },
          '12:15-01:15': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'CS101' },
          '01:15-02:15': { subject: 'LUNCH BREAK', faculty: '', room: '', isBreak: true },
          '02:15-03:15': { subject: 'Project Work', faculty: 'All Faculty', room: 'Various' },
          '03:15-04:15': { subject: 'Project Work', faculty: 'All Faculty', room: 'Various' }
        }
      }
    },
    'ECE-2-B': {
      department: 'Electronics & Communication Engineering',
      semester: '2nd Semester',
      section: 'Section B',
      schedule: {
        Monday: {
          '09:00-10:00': { subject: 'Circuit Theory', faculty: 'Dr. Kumar', room: 'ECE101' },
          '10:00-11:00': { subject: 'Digital Electronics', faculty: 'Prof. Patel', room: 'ECE102' },
          '11:15-12:15': { subject: 'Signals & Systems', faculty: 'Dr. Sharma', room: 'ECE103' },
          '12:15-01:15': { subject: 'Mathematics II', faculty: 'Prof. Gupta', room: 'M101' },
          '01:15-02:15': { subject: 'LUNCH BREAK', faculty: '', room: '', isBreak: true },
          '02:15-03:15': { subject: 'Electronics Lab', faculty: 'Dr. Kumar', room: 'ELab1' },
          '03:15-04:15': { subject: 'Electronics Lab', faculty: 'Dr. Kumar', room: 'ELab1' }
        },
        Tuesday: {
          '09:00-10:00': { subject: 'Digital Electronics', faculty: 'Prof. Patel', room: 'ECE102' },
          '10:00-11:00': { subject: 'Circuit Theory', faculty: 'Dr. Kumar', room: 'ECE101' },
          '11:15-12:15': { subject: 'Engineering Physics', faculty: 'Dr. Reddy', room: 'P201' },
          '12:15-01:15': { subject: 'Signals & Systems', faculty: 'Dr. Sharma', room: 'ECE103' },
          '01:15-02:15': { subject: 'LUNCH BREAK', faculty: '', room: '', isBreak: true },
          '02:15-03:15': { subject: 'Circuit Lab', faculty: 'Prof. Patel', room: 'ELab2' },
          '03:15-04:15': { subject: 'Circuit Lab', faculty: 'Prof. Patel', room: 'ELab2' }
        },
        Wednesday: {
          '09:00-10:00': { subject: 'Mathematics II', faculty: 'Prof. Gupta', room: 'M101' },
          '10:00-11:00': { subject: 'Signals & Systems', faculty: 'Dr. Sharma', room: 'ECE103' },
          '11:15-12:15': { subject: 'Digital Electronics', faculty: 'Prof. Patel', room: 'ECE102' },
          '12:15-01:15': { subject: 'Engineering Graphics', faculty: 'Prof. Singh', room: 'Drawing Hall' },
          '01:15-02:15': { subject: 'LUNCH BREAK', faculty: '', room: '', isBreak: true },
          '02:15-03:15': { subject: 'Physics Lab', faculty: 'Dr. Reddy', room: 'Physics Lab' },
          '03:15-04:15': { subject: 'Physics Lab', faculty: 'Dr. Reddy', room: 'Physics Lab' }
        },
        Thursday: {
          '09:00-10:00': { subject: 'Engineering Physics', faculty: 'Dr. Reddy', room: 'P201' },
          '10:00-11:00': { subject: 'Circuit Theory', faculty: 'Dr. Kumar', room: 'ECE101' },
          '11:15-12:15': { subject: 'Mathematics II', faculty: 'Prof. Gupta', room: 'M101' },
          '12:15-01:15': { subject: 'English Communication', faculty: 'Prof. Williams', room: 'H201' },
          '01:15-02:15': { subject: 'LUNCH BREAK', faculty: '', room: '', isBreak: true },
          '02:15-03:15': { subject: 'Workshop', faculty: 'Tech Staff', room: 'Workshop' },
          '03:15-04:15': { subject: 'Workshop', faculty: 'Tech Staff', room: 'Workshop' }
        },
        Friday: {
          '09:00-10:00': { subject: 'Engineering Graphics', faculty: 'Prof. Singh', room: 'Drawing Hall' },
          '10:00-11:00': { subject: 'English Communication', faculty: 'Prof. Williams', room: 'H201' },
          '11:15-12:15': { subject: 'Circuit Theory', faculty: 'Dr. Kumar', room: 'ECE101' },
          '12:15-01:15': { subject: 'Digital Electronics', faculty: 'Prof. Patel', room: 'ECE102' },
          '01:15-02:15': { subject: 'LUNCH BREAK', faculty: '', room: '', isBreak: true },
          '02:15-03:15': { subject: 'Sports/Extra Curricular', faculty: 'Sports Staff', room: 'Ground/Auditorium' },
          '03:15-04:15': { subject: 'Sports/Extra Curricular', faculty: 'Sports Staff', room: 'Ground/Auditorium' }
        }
      }
    }
  };

  const departments = [
    { id: 'CSE', name: 'Computer Science Engineering' },
    { id: 'ECE', name: 'Electronics & Communication Engineering' },
    { id: 'ME', name: 'Mechanical Engineering' },
    { id: 'CE', name: 'Civil Engineering' }
  ];

  const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];
  const sections = ['Section A', 'Section B', 'Section C'];

  // Use student data to set initial selections
  const [selectedDept, setSelectedDept] = useState('CSE');
  const [selectedSemester, setSemester] = useState('3rd Semester');
  const [selectedSection, setSelectedSection] = useState('Section A');

  const timeSlots = [
    '09:00-10:00',
    '10:00-11:00',
    '11:15-12:15',
    '12:15-01:15',
    '01:15-02:15', // Lunch break slot
    '02:15-03:15',
    '03:15-04:15'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const currentTimetable = useMemo(() => {
    const key = `${selectedDept}-${selectedSemester.charAt(0)}-${selectedSection.slice(-1)}`;
    return timetableData[key] || null;
  }, [selectedDept, selectedSemester, selectedSection]);

  const getSubjectColor = (subject, isBreak = false) => {
    if (isBreak) {
      return 'bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-900/30 dark:border-orange-700 dark:text-orange-300';
    }
    
    const colors = {
      'Data Structures': 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200',
      'Database Management': 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200',
      'Computer Networks': 'bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900 dark:border-purple-700 dark:text-purple-200',
      'Software Engineering': 'bg-indigo-100 border-indigo-300 text-indigo-800 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-200',
      'Operating Systems': 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200',
      'Mathematics III': 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200',
      'Web Technologies Lab': 'bg-teal-100 border-teal-300 text-teal-800 dark:bg-teal-900 dark:border-teal-700 dark:text-teal-200',
      'Database Lab': 'bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-900 dark:border-emerald-700 dark:text-emerald-200',
      'Programming Lab': 'bg-pink-100 border-pink-300 text-pink-800 dark:bg-pink-900 dark:border-pink-700 dark:text-pink-200',
      'Circuit Theory': 'bg-cyan-100 border-cyan-300 text-cyan-800 dark:bg-cyan-900 dark:border-cyan-700 dark:text-cyan-200',
      'Digital Electronics': 'bg-lime-100 border-lime-300 text-lime-800 dark:bg-lime-900 dark:border-lime-700 dark:text-lime-200',
      'Signals & Systems': 'bg-violet-100 border-violet-300 text-violet-800 dark:bg-violet-900 dark:border-violet-700 dark:text-violet-200'
    };
    return colors[subject] || 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Student Profile Section */}
        <StudentProfile student={studentData} />

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors duration-300">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Class Timetable</h1>
            <p className="text-gray-600 dark:text-gray-400">Your personalized weekly schedule</p>
          </div>

     
          {/* Timetable Grid */}
          {currentTimetable ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow transition-colors duration-300">
                <thead>
                  <tr className="bg-gray-800 dark:bg-gray-700 text-white">
                    <th className="border border-gray-600 dark:border-gray-500 p-3 text-left font-semibold min-w-24">
                      Day / Time
                    </th>
                    {timeSlots.map(slot => (
                      <th key={slot} className="border border-gray-600 dark:border-gray-500 p-3 text-center font-semibold min-w-40">
                        {slot}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map(day => (
                    <tr key={day} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                      <td className="border border-gray-300 dark:border-gray-600 p-3 font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        {day}
                      </td>
                      {timeSlots.map(slot => {
                        const classInfo = currentTimetable.schedule[day]?.[slot];
                        const isLunchBreak = classInfo?.isBreak;
                        
                        return (
                          <td key={`${day}-${slot}`} className="border border-gray-300 dark:border-gray-600 p-1">
                            {classInfo ? (
                              <div className={`rounded-md p-3 h-full min-h-20 border-2 transition-all duration-300 ${getSubjectColor(classInfo.subject, isLunchBreak)}`}>
                                {isLunchBreak ? (
                                  <div className="flex flex-col items-center justify-center h-full">
                                    <Coffee className="w-6 h-6 mb-2" />
                                    <div className="font-semibold text-sm text-center">{classInfo.subject}</div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="font-semibold text-sm mb-1">{classInfo.subject}</div>
                                    {classInfo.faculty && (
                                      <div className="text-xs opacity-80 flex items-center gap-1 mb-1">
                                        <User className="w-3 h-3" />
                                        {classInfo.faculty}
                                      </div>
                                    )}
                                    {classInfo.room && (
                                      <div className="text-xs opacity-80 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {classInfo.room}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            ) : (
                              <div className="h-20 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                                Free
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-8 text-center transition-colors duration-300">
              <BookOpen className="w-16 h-16 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">No Timetable Available</h3>
              <p className="text-yellow-700 dark:text-yellow-400">
                No timetable found for your current academic details. 
                Please contact the academic office for assistance.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
// Main TimeTable component with ThemeProvider
const TimeTable = () => {
  return (
    <ThemeProvider>
      <TimeTableContent />
    </ThemeProvider>
  );
};

export default TimeTable;
