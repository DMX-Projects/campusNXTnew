import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import { Filter, Calendar, BookOpen, Users, CheckCircle, XCircle, Clock, User, Sun, Moon, TrendingUp, TrendingDown } from 'lucide-react';

// Theme Context
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}
});

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if there's a saved theme preference
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
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

// Custom hook to use theme
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Toggle Button Component
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

const StudentAttendanceContent = () => {
  // Sample attendance data
  const attendanceData = [
    {
      id: 1,
      course: 'Data Structures',
      courseCode: 'CS301',
      date: '2024-09-16',
      status: 'Present',
      semester: '3rd Semester',
      time: '09:00-10:00',
      faculty: 'Dr. Smith'
    },
    {
      id: 2,
      course: 'Database Management',
      courseCode: 'CS302',
      date: '2024-09-16',
      status: 'Present',
      semester: '3rd Semester',
      time: '10:00-11:00',
      faculty: 'Prof. Johnson'
    },
    {
      id: 3,
      course: 'Computer Networks',
      courseCode: 'CS303',
      date: '2024-09-15',
      status: 'Absent',
      semester: '3rd Semester',
      time: '11:15-12:15',
      faculty: 'Dr. Brown'
    },
    {
      id: 4,
      course: 'Data Structures',
      courseCode: 'CS301',
      date: '2024-09-15',
      status: 'Present',
      semester: '3rd Semester',
      time: '09:00-10:00',
      faculty: 'Dr. Smith'
    },
    {
      id: 5,
      course: 'Software Engineering',
      courseCode: 'CS304',
      date: '2024-09-14',
      status: 'Leave',
      semester: '3rd Semester',
      time: '12:15-01:15',
      faculty: 'Prof. Davis'
    },
    {
      id: 6,
      course: 'Operating Systems',
      courseCode: 'CS305',
      date: '2024-09-14',
      status: 'Present',
      semester: '3rd Semester',
      time: '09:00-10:00',
      faculty: 'Dr. Miller'
    },
    {
      id: 7,
      course: 'Web Technologies Lab',
      courseCode: 'CS306L',
      date: '2024-09-13',
      status: 'Present',
      semester: '3rd Semester',
      time: '02:15-04:15',
      faculty: 'Dr. Wilson'
    },
    {
      id: 8,
      course: 'Database Management',
      courseCode: 'CS302',
      date: '2024-09-13',
      status: 'Absent',
      semester: '3rd Semester',
      time: '10:00-11:00',
      faculty: 'Prof. Johnson'
    },
    {
      id: 9,
      course: 'Mathematics III',
      courseCode: 'MA301',
      date: '2024-09-12',
      status: 'Present',
      semester: '3rd Semester',
      time: '11:15-12:15',
      faculty: 'Prof. Taylor'
    },
    {
      id: 10,
      course: 'Computer Networks',
      courseCode: 'CS303',
      date: '2024-09-12',
      status: 'Present',
      semester: '3rd Semester',
      time: '12:15-01:15',
      faculty: 'Dr. Brown'
    }
  ];

  // Filter states
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Get unique courses and semesters
  const courses = ['All', ...new Set(attendanceData.map(item => item.course))];
  const semesters = ['All', ...new Set(attendanceData.map(item => item.semester))];

  // Filtered data
  const filteredData = useMemo(() => {
    return attendanceData.filter(item => {
      const courseMatch = selectedCourse === 'All' || item.course === selectedCourse;
      const semesterMatch = selectedSemester === 'All' || item.semester === selectedSemester;
      const dateMatch = (!dateFrom || item.date >= dateFrom) && (!dateTo || item.date <= dateTo);
      
      return courseMatch && semesterMatch && dateMatch;
    });
  }, [selectedCourse, selectedSemester, dateFrom, dateTo, attendanceData]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalClasses = filteredData.length;
    const attended = filteredData.filter(item => item.status === 'Present').length;
    const missed = filteredData.filter(item => item.status === 'Absent').length;
    const leave = filteredData.filter(item => item.status === 'Leave').length;
    const attendancePercentage = totalClasses > 0 ? ((attended / totalClasses) * 100).toFixed(1) : 0;

    return {
      totalClasses,
      attended,
      missed,
      leave,
      attendancePercentage
    };
  }, [filteredData]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Absent':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Leave':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1";
    switch (status) {
      case 'Present':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'Absent':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'Leave':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <ThemeToggle />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors duration-300">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Attendance</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your attendance records with detailed filters and insights</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Classes</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{stats.totalClasses}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium">Attended</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-200">{stats.attended}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">Missed</p>
                  <p className="text-2xl font-bold text-red-900 dark:text-red-200">{stats.missed}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">On Leave</p>
                  <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-200">{stats.leave}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className={`${parseFloat(stats.attendancePercentage) >= 75 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
              : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700'
            } border rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${parseFloat(stats.attendancePercentage) >= 75 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-orange-600 dark:text-orange-400'
                  } text-sm font-medium`}>Attendance %</p>
                  <p className={`text-2xl font-bold ${parseFloat(stats.attendancePercentage) >= 75 
                    ? 'text-green-900 dark:text-green-200' 
                    : 'text-orange-900 dark:text-orange-200'
                  }`}>{stats.attendancePercentage}%</p>
                </div>
                {parseFloat(stats.attendancePercentage) >= 75 
                  ? <TrendingUp className="w-8 h-8 text-green-500" />
                  : <TrendingDown className="w-8 h-8 text-orange-500" />
                }
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Filter Options</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course</label>
                <select 
                  value={selectedCourse} 
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                >
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Semester</label>
                <select 
                  value={selectedSemester} 
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                >
                  {semesters.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From Date</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To Date</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                />
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow transition-colors duration-300">
              <thead>
                <tr className="bg-gray-800 dark:bg-gray-700 text-white">
                  <th className="border border-gray-600 dark:border-gray-500 p-3 text-left font-semibold">Date</th>
                  <th className="border border-gray-600 dark:border-gray-500 p-3 text-left font-semibold">Course</th>
                  <th className="border border-gray-600 dark:border-gray-500 p-3 text-left font-semibold">Course Code</th>
                  <th className="border border-gray-600 dark:border-gray-500 p-3 text-left font-semibold">Time</th>
                  <th className="border border-gray-600 dark:border-gray-500 p-3 text-left font-semibold">Faculty</th>
                  <th className="border border-gray-600 dark:border-gray-500 p-3 text-center font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((record, index) => (
                    <tr 
                      key={record.id} 
                      className={`${index % 2 === 0 
                        ? 'bg-gray-50 dark:bg-gray-800' 
                        : 'bg-white dark:bg-gray-900'
                      } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200`}
                    >
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          {formatDate(record.date)}
                        </div>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 font-medium text-gray-900 dark:text-gray-100">
                        {record.course}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-400 font-mono text-sm">
                        {record.courseCode}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-400">
                        {record.time}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {record.faculty}
                        </div>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">
                        <div className="flex items-center justify-center">
                          <span className={getStatusBadge(record.status)}>
                            {getStatusIcon(record.status)}
                            {record.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td 
                      colSpan="6" 
                      className="border border-gray-300 dark:border-gray-600 p-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-12 h-12 text-gray-400" />
                        <p className="text-lg font-medium">No attendance records found</p>
                        <p className="text-sm">Try adjusting your filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Footer */}
          {filteredData.length > 0 && (
            <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transition-colors duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-6">
                  <span className="text-gray-700 dark:text-gray-300">
                    Showing {filteredData.length} record{filteredData.length !== 1 ? 's' : ''}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">Present</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">Absent</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">Leave</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  parseFloat(stats.attendancePercentage) >= 75
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : parseFloat(stats.attendancePercentage) >= 60
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  Overall: {stats.attendancePercentage}% attendance
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main StudentAttendance component with ThemeProvider
const StudentAttendance = () => {
  return (
    <ThemeProvider>
      <StudentAttendanceContent />
    </ThemeProvider>
  );
};

export default StudentAttendance;