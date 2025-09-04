 // FacultyTimetable.tsx - Updated Version
import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  Users, 
  Download,
  FileText,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Video,
  Eye,
  CheckCircle,
  AlertCircle,
  Printer
} from 'lucide-react';

interface ClassSchedule {
  id: string;
  subject: string;
  subjectCode: string;
  class: string;
  section: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  room: string;
  type: 'Lecture' | 'Tutorial' | 'Lab' | 'Seminar';
  duration: number;
  studentsCount: number;
  semester: string;
  isOnline?: boolean;
  meetingLink?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'ongoing';
}

interface TimePreference {
  day: string;
  preferredSlots: string[];
  avoidSlots: string[];
}

const FacultyTimetable: React.FC = () => {
  // Faculty Information
  const facultyInfo = {
    name: 'Dr. Rajesh Kumar',
    employeeId: 'FAC001',
    department: 'Computer Science Engineering',
    designation: 'Associate Professor'
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showPreferences, setShowPreferences] = useState(false);
  const [showChangeRequest, setShowChangeRequest] = useState(false);

  // Faculty's Personal Timetable (Read-Only)
  const [timetable] = useState<ClassSchedule[]>([
    {
      id: '1',
      subject: 'Data Structures and Algorithms',
      subjectCode: 'CS301',
      class: 'BTech CSE',
      section: 'A',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      room: 'Room 204',
      type: 'Lecture',
      duration: 60,
      studentsCount: 60,
      semester: '3rd Semester',
      status: 'scheduled'
    },
    {
      id: '2',
      subject: 'Data Structures and Algorithms',
      subjectCode: 'CS301',
      class: 'BTech CSE',
      section: 'A',
      day: 'Wednesday',
      startTime: '09:00',
      endTime: '10:00',
      room: 'Room 204',
      type: 'Lecture',
      duration: 60,
      studentsCount: 60,
      semester: '3rd Semester',
      status: 'scheduled'
    },
    {
      id: '3',
      subject: 'Algorithm Analysis',
      subjectCode: 'CS302',
      class: 'BTech CSE',
      section: 'B',
      day: 'Tuesday',
      startTime: '10:30',
      endTime: '11:30',
      room: 'Room 205',
      type: 'Lecture',
      duration: 60,
      studentsCount: 58,
      semester: '3rd Semester',
      status: 'scheduled'
    },
    {
      id: '4',
      subject: 'Database Systems Lab',
      subjectCode: 'CS303L',
      class: 'BTech CSE',
      section: 'A',
      day: 'Thursday',
      startTime: '14:00',
      endTime: '16:00',
      room: 'Lab 301',
      type: 'Lab',
      duration: 120,
      studentsCount: 30,
      semester: '3rd Semester',
      status: 'scheduled'
    },
    {
      id: '5',
      subject: 'Software Engineering Tutorial',
      subjectCode: 'CS304T',
      class: 'BTech CSE',
      section: 'A',
      day: 'Friday',
      startTime: '11:00',
      endTime: '12:00',
      room: 'Room 206',
      type: 'Tutorial',
      duration: 60,
      studentsCount: 60,
      semester: '3rd Semester',
      status: 'scheduled'
    },
    {
      id: '6',
      subject: 'Machine Learning Seminar',
      subjectCode: 'CS401',
      class: 'BTech CSE',
      section: 'A',
      day: 'Friday',
      startTime: '15:00',
      endTime: '16:00',
      room: 'Virtual',
      type: 'Seminar',
      duration: 60,
      studentsCount: 45,
      semester: '4th Semester',
      isOnline: true,
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      status: 'scheduled'
    }
  ]);

  // Time Preferences State
  const [timePreferences, setTimePreferences] = useState<TimePreference[]>([
    { day: 'Monday', preferredSlots: ['09:00-10:00', '11:00-12:00'], avoidSlots: ['16:00-17:00'] },
    { day: 'Tuesday', preferredSlots: ['10:00-11:00'], avoidSlots: ['15:00-16:00'] }
  ]);

  // Change Request State
  const [changeRequest, setChangeRequest] = useState({
    classId: '',
    requestType: 'reschedule',
    reason: '',
    preferredDate: '',
    preferredTime: '',
    comments: ''
  });

  // Get week dates
  const getWeekDates = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
    startDate.setDate(diff);

    for (let i = 0; i < 6; i++) {
      week.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  // Organize classes by day
  const classesByDay = useMemo(() => {
    const organized: Record<string, ClassSchedule[]> = {};
    daysOfWeek.forEach(day => {
      organized[day] = timetable
        .filter(cls => cls.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
    });
    return organized;
  }, [timetable]);

  // Get current time and check class status
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const isClassOngoing = (classItem: ClassSchedule) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = getCurrentTime();
    return classItem.day === today && currentTime >= classItem.startTime && currentTime <= classItem.endTime;
  };

  const isClassUpcoming = (classItem: ClassSchedule) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    if (classItem.day !== today) return false;
    
    const now = new Date();
    const classStart = new Date();
    const [hours, minutes] = classItem.startTime.split(':').map(Number);
    classStart.setHours(hours, minutes, 0, 0);
    
    const diffMinutes = (classStart.getTime() - now.getTime()) / (1000 * 60);
    return diffMinutes > 0 && diffMinutes <= 30;
  };

  // Calculate statistics
  const weeklyStats = useMemo(() => {
    const totalClasses = timetable.length;
    const totalHours = timetable.reduce((sum, cls) => sum + cls.duration / 60, 0);
    const uniqueSubjects = new Set(timetable.map(cls => cls.subject)).size;
    const totalStudents = timetable.reduce((sum, cls) => sum + cls.studentsCount, 0);

    return { totalClasses, totalHours, uniqueSubjects, totalStudents };
  }, [timetable]);

  // Navigation functions
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  // Export functions
  const exportTimetable = (format: 'pdf' | 'csv') => {
    if (format === 'csv') {
      const csvData = timetable.map(cls => ({
        Day: cls.day,
        Time: `${cls.startTime} - ${cls.endTime}`,
        Subject: cls.subject,
        'Subject Code': cls.subjectCode,
        Class: cls.class,
        Section: cls.section,
        Room: cls.room,
        Type: cls.type,
        'Student Count': cls.studentsCount,
        Duration: `${cls.duration} min`
      }));

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `faculty_timetable_${facultyInfo.employeeId}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
    // PDF export would be implemented similarly
  };

  // Submit change request
  const submitChangeRequest = () => {
    // This would typically send to backend
    console.log('Change request submitted:', changeRequest);
    alert('Change request submitted successfully! You will be notified once reviewed.');
    setShowChangeRequest(false);
    setChangeRequest({
      classId: '',
      requestType: 'reschedule',
      reason: '',
      preferredDate: '',
      preferredTime: '',
      comments: ''
    });
  };

  // Submit time preferences
  const submitTimePreferences = () => {
    // This would typically send to backend
    console.log('Time preferences submitted:', timePreferences);
    alert('Time preferences saved successfully!');
    setShowPreferences(false);
  };

  // Get class type styling
  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'Lecture': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Lab': return 'bg-green-100 text-green-800 border-green-200';
      case 'Tutorial': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Seminar': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Timetable</h1>
              <p className="text-gray-600">{facultyInfo.name} • {facultyInfo.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Employee ID: {facultyInfo.employeeId}</p>
              <p className="text-sm text-gray-500">{facultyInfo.designation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{weeklyStats.totalClasses}</div>
              <div className="text-sm text-gray-600">Classes/Week</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{weeklyStats.uniqueSubjects}</div>
              <div className="text-sm text-gray-600">Subjects</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{weeklyStats.totalStudents}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-orange-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{weeklyStats.totalHours.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Hours/Week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => exportTimetable('csv')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors"
          >
            <Download className="w-6 h-6" />
            <span className="text-sm font-medium">Export CSV</span>
          </button>

          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors"
          >
            <Printer className="w-6 h-6" />
            <span className="text-sm font-medium">Print Schedule</span>
          </button>

          <button
            onClick={() => setShowChangeRequest(true)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm font-medium">Request Change</span>
          </button>

          <button
            onClick={() => setShowPreferences(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-colors"
          >
            <Settings className="w-6 h-6" />
            <span className="text-sm font-medium">Time Preferences</span>
          </button>
        </div>
      </div>

      {/* Navigation and View Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Week of {weekDates[0].toLocaleDateString()} - {weekDates[5].toLocaleDateString()}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'weekly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weekly View
            </button>
            <button
              onClick={() => setViewMode('daily')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'daily'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Daily View
            </button>
          </div>
        </div>

        {/* Today's Quick View */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Today's Classes</h3>
          {classesByDay[new Date().toLocaleDateString('en-US', { weekday: 'long' })]?.length === 0 ? (
            <p className="text-blue-700">No classes scheduled for today</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(classesByDay[new Date().toLocaleDateString('en-US', { weekday: 'long' })] || []).slice(0, 3).map(cls => (
                <div key={cls.id} className={`p-3 rounded-lg border ${
                  isClassOngoing(cls) 
                    ? 'bg-green-100 border-green-300' 
                    : isClassUpcoming(cls)
                    ? 'bg-yellow-100 border-yellow-300'
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="font-medium text-sm">
                    {cls.subject}
                    {isClassOngoing(cls) && <span className="ml-2 text-green-600">(Live)</span>}
                    {isClassUpcoming(cls) && <span className="ml-2 text-orange-600">(Soon)</span>}
                  </div>
                  <div className="text-xs text-gray-600">
                    {cls.startTime} - {cls.endTime} • {cls.room}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Weekly Timetable Grid */}
      {viewMode === 'weekly' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-4 text-left font-semibold text-gray-900">Time</th>
                  {daysOfWeek.map((day, index) => (
                    <th key={day} className="border border-gray-200 p-4 text-center font-semibold text-gray-900">
                      <div>{day}</div>
                      <div className="text-sm text-gray-500 font-normal">
                        {weekDates[index]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }, (_, i) => i + 8).map(hour => (
                  <tr key={hour} className="border-b border-gray-200">
                    <td className="border border-gray-200 p-3 bg-gray-50 text-center font-medium text-gray-700">
                      {hour.toString().padStart(2, '0')}:00
                    </td>
                    {daysOfWeek.map(day => {
                      const dayClasses = classesByDay[day].filter(cls => {
                        const classHour = parseInt(cls.startTime.split(':')[0]);
                        return classHour === hour;
                      });

                      return (
                        <td key={`${day}-${hour}`} className="border border-gray-200 p-2 align-top min-h-20">
                          {dayClasses.map(cls => (
                            <div
                              key={cls.id}
                              className={`p-3 rounded-lg border-l-4 mb-2 cursor-pointer hover:shadow-md transition-shadow ${getClassTypeColor(cls.type)} ${
                                isClassOngoing(cls) ? 'ring-2 ring-green-400' : ''
                              }`}
                            >
                              <div className="font-semibold text-sm mb-1">{cls.subject}</div>
                              <div className="text-xs text-gray-600 mb-1">
                                {cls.class} {cls.section}
                              </div>
                              <div className="text-xs text-gray-600 flex items-center gap-1 mb-1">
                                <MapPin className="w-3 h-3" />
                                {cls.room}
                                {cls.isOnline && <Video className="w-3 h-3 text-blue-600" />}
                              </div>
                              <div className="text-xs text-gray-500">
                                {cls.startTime} - {cls.endTime}
                              </div>
                              {cls.isOnline && (
                                <a 
                                  href={cls.meetingLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-xs mt-1 block"
                                >
                                  Join Meeting
                                </a>
                              )}
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Daily View */}
      {viewMode === 'daily' && (
        <div className="space-y-6">
          {/* Day Selector */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex gap-2 overflow-x-auto">
              {daysOfWeek.map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex-shrink-0 px-4 py-3 rounded-lg font-medium transition-colors ${
                    selectedDay === day
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">{day.slice(0, 3)}</div>
                    <div className="text-sm">
                      {weekDates[index]?.getDate()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Day Classes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{selectedDay} Classes</h2>
            
            {classesByDay[selectedDay].length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No classes scheduled for {selectedDay}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {classesByDay[selectedDay].map(cls => (
                  <div
                    key={cls.id}
                    className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
                      isClassOngoing(cls) 
                        ? 'border-green-400 bg-green-50' 
                        : isClassUpcoming(cls)
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{cls.subject}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getClassTypeColor(cls.type)}`}>
                            {cls.type}
                          </span>
                          {isClassOngoing(cls) && (
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              Live Now
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{cls.subjectCode}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {cls.startTime} - {cls.endTime}
                        </div>
                        <div className="text-sm text-gray-500">
                          {cls.duration} minutes
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{cls.class} - Section {cls.section}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{cls.room}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span>{cls.studentsCount} students</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{cls.semester}</span>
                      </div>
                    </div>

                    {cls.isOnline && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-800 font-medium">
                          <Video className="w-4 h-4" />
                          Online Class
                        </div>
                        <a 
                          href={cls.meetingLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm mt-1 block"
                        >
                          Join Meeting: {cls.meetingLink}
                        </a>
                      </div>
                    )}

                    <div className="mt-4 flex gap-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        Mark Attendance
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Change Request Modal */}
      {showChangeRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Request Schedule Change</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
                <select
                  value={changeRequest.classId}
                  onChange={(e) => setChangeRequest(prev => ({ ...prev, classId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a class</option>
                  {timetable.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.subject} - {cls.day} {cls.startTime} ({cls.class} {cls.section})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
                <select
                  value={changeRequest.requestType}
                  onChange={(e) => setChangeRequest(prev => ({ ...prev, requestType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="reschedule">Reschedule Class</option>
                  <option value="cancel">Cancel Class</option>
                  <option value="room_change">Room Change</option>
                  <option value="online_mode">Switch to Online</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea
                  value={changeRequest.reason}
                  onChange={(e) => setChangeRequest(prev => ({ ...prev, reason: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide a reason for this change request..."
                />
              </div>

              {changeRequest.requestType === 'reschedule' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={changeRequest.preferredDate}
                      onChange={(e) => setChangeRequest(prev => ({ ...prev, preferredDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                    <input
                      type="time"
                      value={changeRequest.preferredTime}
                      onChange={(e) => setChangeRequest(prev => ({ ...prev, preferredTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
                <textarea
                  value={changeRequest.comments}
                  onChange={(e) => setChangeRequest(prev => ({ ...prev, comments: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional information..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowChangeRequest(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitChangeRequest}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Time Preferences</h2>
              <p className="text-gray-600">Set your preferred and non-preferred time slots</p>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {daysOfWeek.map(day => {
                  const dayPref = timePreferences.find(p => p.day === day) || { day, preferredSlots: [], avoidSlots: [] };
                  return (
                    <div key={day} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">{day}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-green-700 mb-2">Preferred Slots</label>
                          <div className="space-y-2">
                            {['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00'].map(slot => (
                              <label key={slot} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={dayPref.preferredSlots.includes(slot)}
                                  onChange={(e) => {
                                    const updatedPrefs = timePreferences.map(p => 
                                      p.day === day 
                                        ? {
                                            ...p,
                                            preferredSlots: e.target.checked 
                                              ? [...p.preferredSlots, slot]
                                              : p.preferredSlots.filter(s => s !== slot)
                                          }
                                        : p
                                    );
                                    if (!timePreferences.find(p => p.day === day)) {
                                      updatedPrefs.push({ day, preferredSlots: [slot], avoidSlots: [] });
                                    }
                                    setTimePreferences(updatedPrefs);
                                  }}
                                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-sm">{slot}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-red-700 mb-2">Avoid Slots</label>
                          <div className="space-y-2">
                            {['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00'].map(slot => (
                              <label key={slot} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={dayPref.avoidSlots.includes(slot)}
                                  onChange={(e) => {
                                    const updatedPrefs = timePreferences.map(p => 
                                      p.day === day 
                                        ? {
                                            ...p,
                                            avoidSlots: e.target.checked 
                                              ? [...p.avoidSlots, slot]
                                              : p.avoidSlots.filter(s => s !== slot)
                                          }
                                        : p
                                    );
                                    if (!timePreferences.find(p => p.day === day)) {
                                      updatedPrefs.push({ day, preferredSlots: [], avoidSlots: [slot] });
                                    }
                                    setTimePreferences(updatedPrefs);
                                  }}
                                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-sm">{slot}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitTimePreferences}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyTimetable;
