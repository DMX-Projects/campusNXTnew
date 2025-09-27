import React, { useState, useMemo } from 'react';
import { Filter, Calendar, BookOpen, Users, CheckCircle, XCircle, Clock, User, TrendingUp, TrendingDown, Eye, CalendarDays, BarChart3 } from 'lucide-react';

const StudentAttendance = () => {
  // Enhanced sample attendance data with more records for better demonstration
  const attendanceData = [
    // Today's classes (6 subjects) - 2024-09-26
    { id: 1, course: 'Data Structures', courseCode: 'CS301', date: '2024-09-26', status: 'Present', semester: '3rd Semester', time: '09:00-10:00', faculty: 'Dr. Smith' },
    { id: 2, course: 'Database Management', courseCode: 'CS302', date: '2024-09-26', status: 'Present', semester: '3rd Semester', time: '10:00-11:00', faculty: 'Prof. Johnson' },
    { id: 3, course: 'Computer Networks', courseCode: 'CS303', date: '2024-09-26', status: 'Absent', semester: '3rd Semester', time: '11:15-12:15', faculty: 'Dr. Brown' },
    { id: 4, course: 'Software Engineering', courseCode: 'CS304', date: '2024-09-26', status: 'Present', semester: '3rd Semester', time: '12:15-01:15', faculty: 'Prof. Davis' },
    { id: 5, course: 'Operating Systems', courseCode: 'CS305', date: '2024-09-26', status: 'Present', semester: '3rd Semester', time: '02:15-03:15', faculty: 'Dr. Miller' },
    { id: 6, course: 'Mathematics III', courseCode: 'MA301', date: '2024-09-26', status: 'Leave', semester: '3rd Semester', time: '03:15-04:15', faculty: 'Prof. Taylor' },
    
    // Yesterday's classes - 2024-09-25
    { id: 7, course: 'Data Structures', courseCode: 'CS301', date: '2024-09-25', status: 'Present', semester: '3rd Semester', time: '09:00-10:00', faculty: 'Dr. Smith' },
    { id: 8, course: 'Database Management', courseCode: 'CS302', date: '2024-09-25', status: 'Present', semester: '3rd Semester', time: '10:00-11:00', faculty: 'Prof. Johnson' },
    { id: 9, course: 'Computer Networks', courseCode: 'CS303', date: '2024-09-25', status: 'Present', semester: '3rd Semester', time: '11:15-12:15', faculty: 'Dr. Brown' },
    { id: 10, course: 'Software Engineering', courseCode: 'CS304', date: '2024-09-25', status: 'Present', semester: '3rd Semester', time: '12:15-01:15', faculty: 'Prof. Davis' },
    { id: 11, course: 'Operating Systems', courseCode: 'CS305', date: '2024-09-25', status: 'Absent', semester: '3rd Semester', time: '02:15-03:15', faculty: 'Dr. Miller' },
    { id: 12, course: 'Mathematics III', courseCode: 'MA301', date: '2024-09-25', status: 'Present', semester: '3rd Semester', time: '03:15-04:15', faculty: 'Prof. Taylor' },
    
    // Previous days in the week
    { id: 13, course: 'Data Structures', courseCode: 'CS301', date: '2024-09-24', status: 'Present', semester: '3rd Semester', time: '09:00-10:00', faculty: 'Dr. Smith' },
    { id: 14, course: 'Database Management', courseCode: 'CS302', date: '2024-09-24', status: 'Present', semester: '3rd Semester', time: '10:00-11:00', faculty: 'Prof. Johnson' },
    { id: 15, course: 'Computer Networks', courseCode: 'CS303', date: '2024-09-24', status: 'Absent', semester: '3rd Semester', time: '11:15-12:15', faculty: 'Dr. Brown' },
    { id: 16, course: 'Software Engineering', courseCode: 'CS304', date: '2024-09-24', status: 'Present', semester: '3rd Semester', time: '12:15-01:15', faculty: 'Prof. Davis' },
    { id: 17, course: 'Operating Systems', courseCode: 'CS305', date: '2024-09-24', status: 'Present', semester: '3rd Semester', time: '02:15-03:15', faculty: 'Dr. Miller' },
    { id: 18, course: 'Mathematics III', courseCode: 'MA301', date: '2024-09-24', status: 'Present', semester: '3rd Semester', time: '03:15-04:15', faculty: 'Prof. Taylor' },
    
    { id: 19, course: 'Data Structures', courseCode: 'CS301', date: '2024-09-23', status: 'Present', semester: '3rd Semester', time: '09:00-10:00', faculty: 'Dr. Smith' },
    { id: 20, course: 'Database Management', courseCode: 'CS302', date: '2024-09-23', status: 'Present', semester: '3rd Semester', time: '10:00-11:00', faculty: 'Prof. Johnson' },
    { id: 21, course: 'Computer Networks', courseCode: 'CS303', date: '2024-09-23', status: 'Present', semester: '3rd Semester', time: '11:15-12:15', faculty: 'Dr. Brown' },
    { id: 22, course: 'Software Engineering', courseCode: 'CS304', date: '2024-09-23', status: 'Absent', semester: '3rd Semester', time: '12:15-01:15', faculty: 'Prof. Davis' },
    { id: 23, course: 'Operating Systems', courseCode: 'CS305', date: '2024-09-23', status: 'Present', semester: '3rd Semester', time: '02:15-03:15', faculty: 'Dr. Miller' },
    { id: 24, course: 'Mathematics III', courseCode: 'MA301', date: '2024-09-23', status: 'Present', semester: '3rd Semester', time: '03:15-04:15', faculty: 'Prof. Taylor' },
    
    // Previous week data
    { id: 25, course: 'Data Structures', courseCode: 'CS301', date: '2024-09-20', status: 'Present', semester: '3rd Semester', time: '09:00-10:00', faculty: 'Dr. Smith' },
    { id: 26, course: 'Database Management', courseCode: 'CS302', date: '2024-09-20', status: 'Present', semester: '3rd Semester', time: '10:00-11:00', faculty: 'Prof. Johnson' },
    
    // Previous month data
    { id: 27, course: 'Mathematics III', courseCode: 'MA301', date: '2024-08-30', status: 'Present', semester: '3rd Semester', time: '03:15-04:15', faculty: 'Prof. Taylor' },
    { id: 28, course: 'Computer Networks', courseCode: 'CS303', date: '2024-08-29', status: 'Present', semester: '3rd Semester', time: '11:15-12:15', faculty: 'Dr. Brown' }
  ];

  // Filter states
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [timeView, setTimeView] = useState('all'); // New time period filter

  // Get unique courses and semesters
  const courses = ['All', ...new Set(attendanceData.map(item => item.course))];
  const semesters = ['All', ...new Set(attendanceData.map(item => item.semester))];

  // Time view options
  const timeViewOptions = [
    { value: 'all', label: 'All Records', icon: Eye },
    { value: 'daily', label: 'Daily View', icon: Calendar },
    { value: 'weekly', label: 'Weekly View', icon: CalendarDays },
    { value: 'monthly', label: 'Monthly View', icon: BarChart3 }
  ];

  // Function to filter data based on time view
  const filterByTimeView = (data, view) => {
    const today = new Date('2024-09-26'); // Using fixed date for demo
    
    switch (view) {
      case 'daily':
        return data;
      
      case 'weekly':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
        
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= startOfWeek && itemDate <= endOfWeek;
        });
      
      case 'monthly':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= startOfMonth && itemDate <= endOfMonth;
        });
      
      default:
        return data;
    }
  };

  // Filtered data
  const filteredData = useMemo(() => {
    let filtered = attendanceData;

    // Apply time view filter first
    filtered = filterByTimeView(filtered, timeView);

    // Then apply other filters
    return filtered.filter(item => {
      const courseMatch = selectedCourse === 'All' || item.course === selectedCourse;
      const semesterMatch = selectedSemester === 'All' || item.semester === selectedSemester;
      const dateMatch = (!dateFrom || item.date >= dateFrom) && (!dateTo || item.date <= dateTo);
      
      return courseMatch && semesterMatch && dateMatch;
    });
  }, [selectedCourse, selectedSemester, dateFrom, dateTo, timeView, attendanceData]);

  // Group data based on view type
  const groupedData = useMemo(() => {
    if (timeView === 'daily') {
      return filteredData.reduce((groups, item) => {
        const date = item.date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      }, {});
    } else if (timeView === 'weekly') {
      return filteredData.reduce((groups, item) => {
        const date = new Date(item.date);
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const weekKey = startOfWeek.toISOString().split('T')[0];
        if (!groups[weekKey]) {
          groups[weekKey] = [];
        }
        groups[weekKey].push(item);
        return groups;
      }, {});
    } else if (timeView === 'monthly') {
      return filteredData.reduce((groups, item) => {
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!groups[monthKey]) {
          groups[monthKey] = [];
        }
        groups[monthKey].push(item);
        return groups;
      }, {});
    }
    return { 'all': filteredData };
  }, [filteredData, timeView]);

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
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Absent':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Leave':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
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

  const formatWeekRange = (startDate) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const formatMonth = (monthKey) => {
    const [year, month] = monthKey.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  // Reset date filters when time view changes
  const handleTimeViewChange = (newView) => {
    setTimeView(newView);
    if (newView !== 'all') {
      setDateFrom('');
      setDateTo('');
    }
  };

  // Calculate group statistics
  const getGroupStats = (groupData) => {
    const total = groupData.length;
    const present = groupData.filter(item => item.status === 'Present').length;
    const absent = groupData.filter(item => item.status === 'Absent').length;
    const leave = groupData.filter(item => item.status === 'Leave').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    
    return { total, present, absent, leave, percentage };
  };

  const renderGroupedView = () => {
    const groupKeys = Object.keys(groupedData).sort().reverse();

    if (timeView === 'all') {
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                <th className="border border-gray-600 p-4 text-left font-semibold">Date</th>
                <th className="border-gray-600 p-4 text-left font-semibold">Course</th>
                <th className="border border-gray-600 p-4 text-left font-semibold">Course Code</th>
                <th className="border border-gray-600 p-4 text-left font-semibold">Time</th>
                <th className="border border-gray-600 p-4 text-left font-semibold">Faculty</th>
                <th className="border border-gray-600 p-4 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((record, index) => (
                  <tr key={record.id} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'} hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200`}>
                    <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-900 dark:text-gray-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {formatDate(record.date)}
                      </div>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-4 font-medium text-gray-900 dark:text-gray-100">{record.course}</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-600 dark:text-gray-300 font-mono text-sm">{record.courseCode}</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-600 dark:text-gray-300">{record.time}</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-4 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {record.faculty}
                      </div>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-4 text-center">
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
                  <td colSpan="6" className="border border-gray-300 dark:border-gray-600 p-8 text-center text-gray-500 dark:text-gray-400">
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
      );
    }

    return (
      <div className="space-y-6">
        {groupKeys.map((groupKey) => {
          const groupData = groupedData[groupKey];
          const groupStats = getGroupStats(groupData);
          
          let groupTitle = '';
          if (timeView === 'daily') {
            groupTitle = formatDate(groupKey);
          } else if (timeView === 'weekly') {
            groupTitle = `Week of ${formatWeekRange(groupKey)}`;
          } else if (timeView === 'monthly') {
            groupTitle = formatMonth(groupKey);
          }

          return (
            <div key={groupKey} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Group Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{groupTitle}</h3>
                    <p className="text-blue-100 mt-1">
                      {groupStats.total} classes • {groupStats.present} present • {groupStats.absent} absent • {groupStats.leave} leave
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${parseFloat(groupStats.percentage) >= 75 ? 'text-green-200' : 'text-orange-200'}`}>
                      {groupStats.percentage}%
                    </div>
                    <div className="text-sm text-blue-200">Attendance</div>
                  </div>
                </div>
              </div>

              {/* Group Content */}
              <div className="p-6">
                {timeView === 'daily' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupData.map((record) => (
                      <div key={record.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{record.course}</span>
                          </div>
                          <span className={getStatusBadge(record.status)}>
                            {getStatusIcon(record.status)}
                            {record.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-xs">{record.courseCode}</span>
                            <span>{record.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            <span>{record.faculty}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                          <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                            {timeView === 'weekly' ? 'Date' : 'Course'}
                          </th>
                          <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                            {timeView === 'weekly' ? 'Course' : 'Present'}
                          </th>
                          <th className="border border-gray-300 dark:border-gray-600 p-3 text-center font-semibold text-gray-800 dark:text-gray-200">
                            {timeView === 'weekly' ? 'Status' : 'Absent'}
                          </th>
                          {timeView === 'monthly' && (
                            <>
                              <th className="border border-gray-300 dark:border-gray-600 p-3 text-center font-semibold text-gray-800 dark:text-gray-200">Leave</th>
                              <th className="border border-gray-300 dark:border-gray-600 p-3 text-center font-semibold text-gray-800 dark:text-gray-200">Total</th>
                              <th className="border border-gray-300 dark:border-gray-600 p-3 text-center font-semibold text-gray-800 dark:text-gray-200">Attendance %</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {timeView === 'weekly' ? (
                          groupData.map((record, index) => (
                            <tr key={record.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200`}>
                              <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-900 dark:text-gray-100">
                                {formatDate(record.date)}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 p-3 font-medium text-gray-900 dark:text-gray-100">
                                {record.course}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">
                                <span className={getStatusBadge(record.status)}>
                                  {getStatusIcon(record.status)}
                                  {record.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          // Monthly view - summarized by course
                          Object.entries(
                            groupData.reduce((acc, record) => {
                              const course = record.course;
                              if (!acc[course]) {
                                acc[course] = { present: 0, absent: 0, leave: 0, total: 0 };
                              }
                              acc[course].total++;
                              if (record.status === 'Present') acc[course].present++;
                              else if (record.status === 'Absent') acc[course].absent++;
                              else if (record.status === 'Leave') acc[course].leave++;
                              return acc;
                            }, {})
                          ).map(([course, stats], index) => (
                            <tr key={course} className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200`}>
                              <td className="border border-gray-300 dark:border-gray-600 p-3 font-medium text-gray-900 dark:text-gray-100">{course}</td>
                              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                                  {stats.present}
                                </span>
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                                  {stats.absent}
                                </span>
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                                  {stats.leave}
                                </span>
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center font-medium text-gray-900 dark:text-gray-100">
                                {stats.total}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">
                                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                                  parseFloat(((stats.present / stats.total) * 100).toFixed(1)) >= 75
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {((stats.present / stats.total) * 100).toFixed(1)}%
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg--to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              My Attendance
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Track your attendance records with detailed filters and insights</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border border-blue-200 dark:border-blue-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 dark:text-blue-300 text-sm font-medium">Total Classes</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.totalClasses}</p>
                </div>
                <BookOpen className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border border-green-200 dark:border-green-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 dark:text-green-300 text-sm font-medium">Attended</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.attended}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 border border-red-200 dark:border-red-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 dark:text-red-300 text-sm font-medium">Missed</p>
                  <p className="text-3xl font-bold text-red-900 dark:text-red-100">{stats.missed}</p>
                </div>
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 dark:text-yellow-300 text-sm font-medium">On Leave</p>
                  <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{stats.leave}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
            </div>

            <div className={`${parseFloat(stats.attendancePercentage) >= 75 
              ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-green-200 dark:border-green-700' 
              : 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border-orange-200 dark:border-orange-700'
            } border rounded-xl p-6 shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${parseFloat(stats.attendancePercentage) >= 75 
                    ? 'text-green-600 dark:text-green-300' 
                    : 'text-orange-600 dark:text-orange-300'
                  } text-sm font-medium`}>Attendance %</p>
                  <p className={`text-3xl font-bold ${parseFloat(stats.attendancePercentage) >= 75 
                    ? 'text-green-900 dark:text-green-100' 
                    : 'text-orange-900 dark:text-orange-100'
                  }`}>{stats.attendancePercentage}%</p>
                </div>
                {parseFloat(stats.attendancePercentage) >= 75 
                  ? <TrendingUp className="w-10 h-10 text-green-500" />
                  : <TrendingDown className="w-10 h-10 text-orange-500" />
                }
              </div>
            </div>
          </div>

          {/* Time View Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {timeViewOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleTimeViewChange(option.value)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      timeView === option.value
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Filter Options</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course</label>
                <select 
                  value={selectedCourse} 
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
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
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
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
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To Date</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Attendance View */}
          {renderGroupedView()}

          {/* Summary Footer */}
          {filteredData.length > 0 && (
            <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-6 text-sm">
                <div className="flex items-center gap-8">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Showing {filteredData.length} record{filteredData.length !== 1 ? 's' : ''}
                  </span>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">Leave</span>
                    </div>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
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

export default StudentAttendance;
