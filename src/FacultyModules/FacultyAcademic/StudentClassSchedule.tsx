 // StudentClassSchedule.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Search, 
  Filter,
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Printer,
  Grid,
  List,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface ClassSchedule {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  instructorEmail: string;
  day: string;
  startTime: string;
  endTime: string;
  venue: string;
  roomCapacity: number;
  classType: 'theory' | 'practical' | 'tutorial';
  section: string;
  semester: string;
  credits: number;
  duration: number; // in minutes
  isOnline: boolean;
  meetingLink?: string;
}

interface Holiday {
  date: string;
  name: string;
  type: 'national' | 'college' | 'exam';
}

const StudentClassSchedule: React.FC = () => {
  // Student Information
  const [studentInfo] = useState({
    name: 'Arjun Kumar',
    rollNumber: '2022CSE001',
    department: 'Computer Science Engineering',
    semester: '5th Semester',
    section: 'A',
    batch: '2022-2026',
    profileImage: '/api/placeholder/80/80'
  });

  // Class Schedule Data
  const [schedule] = useState<ClassSchedule[]>([
    {
      id: 'CS501-MON-1',
      courseCode: 'CS501',
      courseName: 'Advanced Data Structures',
      instructor: 'Dr. Rajesh Kumar',
      instructorEmail: 'rajesh.kumar@college.edu',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      venue: 'Room 203',
      roomCapacity: 60,
      classType: 'theory',
      section: 'A',
      semester: '5th',
      credits: 4,
      duration: 60,
      isOnline: false
    },
    {
      id: 'CS502-MON-2',
      courseCode: 'CS502',
      courseName: 'Database Management Systems',
      instructor: 'Prof. Priya Sharma',
      instructorEmail: 'priya.sharma@college.edu',
      day: 'Monday',
      startTime: '10:15',
      endTime: '11:15',
      venue: 'Room 204',
      roomCapacity: 50,
      classType: 'theory',
      section: 'A',
      semester: '5th',
      credits: 3,
      duration: 60,
      isOnline: false
    },
    {
      id: 'CS503-MON-3',
      courseCode: 'CS503',
      courseName: 'Computer Networks Lab',
      instructor: 'Prof. Amit Singh',
      instructorEmail: 'amit.singh@college.edu',
      day: 'Monday',
      startTime: '14:00',
      endTime: '16:00',
      venue: 'Lab 301',
      roomCapacity: 30,
      classType: 'practical',
      section: 'A',
      semester: '5th',
      credits: 2,
      duration: 120,
      isOnline: false
    },
    {
      id: 'CS504-TUE-1',
      courseCode: 'CS504',
      courseName: 'Operating Systems',
      instructor: 'Dr. Neha Gupta',
      instructorEmail: 'neha.gupta@college.edu',
      day: 'Tuesday',
      startTime: '09:00',
      endTime: '10:00',
      venue: 'Room 205',
      roomCapacity: 60,
      classType: 'theory',
      section: 'A',
      semester: '5th',
      credits: 4,
      duration: 60,
      isOnline: false
    },
    {
      id: 'CS505-WED-1',
      courseCode: 'CS505',
      courseName: 'Software Engineering',
      instructor: 'Prof. Rohit Verma',
      instructorEmail: 'rohit.verma@college.edu',
      day: 'Wednesday',
      startTime: '11:00',
      endTime: '12:00',
      venue: 'Online Meeting',
      roomCapacity: 100,
      classType: 'theory',
      section: 'A',
      semester: '5th',
      credits: 3,
      duration: 60,
      isOnline: true,
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 'CS506-THU-1',
      courseCode: 'CS506',
      courseName: 'Web Technologies',
      instructor: 'Prof. Kavita Patel',
      instructorEmail: 'kavita.patel@college.edu',
      day: 'Thursday',
      startTime: '10:00',
      endTime: '11:00',
      venue: 'Room 206',
      roomCapacity: 50,
      classType: 'theory',
      section: 'A',
      semester: '5th',
      credits: 3,
      duration: 60,
      isOnline: false
    },
    {
      id: 'CS507-FRI-1',
      courseCode: 'CS507',
      courseName: 'Machine Learning',
      instructor: 'Dr. Sanjay Kumar',
      instructorEmail: 'sanjay.kumar@college.edu',
      day: 'Friday',
      startTime: '14:00',
      endTime: '15:30',
      venue: 'Room 207',
      roomCapacity: 40,
      classType: 'theory',
      section: 'A',
      semester: '5th',
      credits: 4,
      duration: 90,
      isOnline: false
    }
  ]);

  // Holidays and Events
  const [holidays] = useState<Holiday[]>([
    { date: '2025-09-15', name: 'Mid-Semester Break', type: 'college' },
    { date: '2025-10-02', name: 'Gandhi Jayanti', type: 'national' },
    { date: '2025-10-15', name: 'Mid-Term Exams', type: 'exam' }
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day' | 'month'>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'theory' | 'practical' | 'tutorial'>('all');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Get current time and check for current/next class
  const getCurrentTimeInfo = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.toTimeString().slice(0, 5);
    
    const todaysClasses = schedule.filter(cls => cls.day === currentDay);
    const currentClass = todaysClasses.find(cls => 
      currentTime >= cls.startTime && currentTime <= cls.endTime
    );
    
    const upcomingClasses = todaysClasses.filter(cls => currentTime < cls.startTime)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    return {
      currentClass,
      nextClass: upcomingClasses[0],
      currentDay,
      currentTime
    };
  };

  const timeInfo = getCurrentTimeInfo();

  // Filter schedule based on search and filter
  const filteredSchedule = useMemo(() => {
    return schedule.filter(cls => {
      const matchesSearch = cls.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cls.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cls.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || cls.classType === filterType;
      
      return matchesSearch && matchesFilter;
    });
  }, [schedule, searchTerm, filterType]);

  // Group schedule by day
  const scheduleByDay = useMemo(() => {
    const grouped: Record<string, ClassSchedule[]> = {};
    daysOfWeek.forEach(day => {
      grouped[day] = filteredSchedule.filter(cls => cls.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
    });
    return grouped;
  }, [filteredSchedule]);

  // Get today's schedule
  const todaysSchedule = useMemo(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return schedule.filter(cls => cls.day === today)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [schedule]);

  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'practical': return 'bg-green-100 text-green-800 border-green-200';
      case 'tutorial': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClassTypeIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="w-4 h-4" />;
      case 'practical': return <Grid className="w-4 h-4" />;
      case 'tutorial': return <User className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const isCurrentClass = (classItem: ClassSchedule) => {
    return timeInfo.currentClass?.id === classItem.id;
  };

  const isUpcomingClass = (classItem: ClassSchedule) => {
    return timeInfo.nextClass?.id === classItem.id;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const downloadSchedule = () => {
    // Simulate download functionality
    alert('Downloading timetable as PDF...');
  };

  const printSchedule = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Class Schedule & Timetable</h1>
              <div className="text-gray-600">
                <p>{studentInfo.name} • {studentInfo.rollNumber}</p>
                <p>{studentInfo.department} • {studentInfo.semester} • Section {studentInfo.section}</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={downloadSchedule}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={printSchedule}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Current Class Alert */}
      {timeInfo.currentClass && (
        <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Current Class</h3>
              <p className="text-green-700">
                {timeInfo.currentClass.courseName} ({timeInfo.currentClass.courseCode}) - {timeInfo.currentClass.venue}
              </p>
              <p className="text-sm text-green-600">
                {formatTime(timeInfo.currentClass.startTime)} - {formatTime(timeInfo.currentClass.endTime)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next Class Alert */}
      {timeInfo.nextClass && !timeInfo.currentClass && (
        <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-800">Next Class</h3>
              <p className="text-blue-700">
                {timeInfo.nextClass.courseName} ({timeInfo.nextClass.courseCode}) - {timeInfo.nextClass.venue}
              </p>
              <p className="text-sm text-blue-600">
                {formatTime(timeInfo.nextClass.startTime)} - {formatTime(timeInfo.nextClass.endTime)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, instructors, or venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="theory">Theory</option>
            <option value="practical">Practical</option>
            <option value="tutorial">Tutorial</option>
          </select>

          {/* View Mode */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {[
              { id: 'week', label: 'Week', icon: <Calendar className="w-4 h-4" /> },
              { id: 'day', label: 'Day', icon: <Clock className="w-4 h-4" /> }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                  viewMode === mode.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {mode.icon}
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Display */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Weekly Timetable</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 w-24">Time</th>
                  {daysOfWeek.map(day => (
                    <th key={day} className="px-6 py-3 text-center text-sm font-medium text-gray-900 min-w-[200px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {timeSlots.map(timeSlot => (
                  <tr key={timeSlot} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatTime(timeSlot)}
                    </td>
                    {daysOfWeek.map(day => {
                      const classInSlot = scheduleByDay[day].find(cls => 
                        cls.startTime <= timeSlot && cls.endTime > timeSlot
                      );
                      
                      return (
                        <td key={day} className="px-6 py-4 text-center">
                          {classInSlot ? (
                            <div className={`p-3 rounded-lg border transition-all ${
                              isCurrentClass(classInSlot) ? 'ring-2 ring-green-500 bg-green-50' :
                              isUpcomingClass(classInSlot) ? 'ring-2 ring-blue-500 bg-blue-50' :
                              'hover:shadow-md'
                            }`}>
                              <div className="font-medium text-sm text-gray-900 mb-1">
                                {classInSlot.courseCode}
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                {classInSlot.courseName}
                              </div>
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <MapPin className="w-3 h-3 text-gray-500" />
                                <span className="text-xs text-gray-600">{classInSlot.venue}</span>
                              </div>
                              <div className="flex items-center justify-center gap-1 mb-2">
                                <User className="w-3 h-3 text-gray-500" />
                                <span className="text-xs text-gray-600">{classInSlot.instructor}</span>
                              </div>
                              <div className="flex justify-center">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getClassTypeColor(classInSlot.classType)}`}>
                                  {getClassTypeIcon(classInSlot.classType)}
                                  {classInSlot.classType}
                                </span>
                              </div>
                              {classInSlot.isOnline && (
                                <div className="mt-2">
                                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                    Online
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-gray-400 text-sm">-</div>
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
      )}

      {viewMode === 'day' && (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>

          <div className="p-6">
            {todaysSchedule.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No classes scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todaysSchedule.map(classItem => (
                  <div
                    key={classItem.id}
                    className={`border border-gray-200 rounded-lg p-6 transition-all ${
                      isCurrentClass(classItem) ? 'ring-2 ring-green-500 bg-green-50' :
                      isUpcomingClass(classItem) ? 'ring-2 ring-blue-500 bg-blue-50' :
                      'hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {classItem.courseName}
                          </h3>
                          <span className="text-sm font-medium text-gray-600">
                            ({classItem.courseCode})
                          </span>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getClassTypeColor(classItem.classType)}`}>
                            {getClassTypeIcon(classItem.classType)}
                            {classItem.classType}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{classItem.venue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{classItem.instructor}</span>
                          </div>
                        </div>

                        {classItem.isOnline && classItem.meetingLink && (
                          <div className="mt-3">
                            <a
                              href={classItem.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              Join Online Class
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-medium">{classItem.duration} min</div>
                        <div className="text-sm text-gray-600 mt-1">Credits: {classItem.credits}</div>
                      </div>
                    </div>

                    {(isCurrentClass(classItem) || isUpcomingClass(classItem)) && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className={`flex items-center gap-2 ${
                          isCurrentClass(classItem) ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {isCurrentClass(classItem) ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">Class in Progress</span>
                            </>
                          ) : (
                            <>
                              <Bell className="w-5 h-5" />
                              <span className="font-medium">Next Class</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Classes</span>
              <span className="font-medium">{schedule.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Theory Classes</span>
              <span className="font-medium">{schedule.filter(c => c.classType === 'theory').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Practical Classes</span>
              <span className="font-medium">{schedule.filter(c => c.classType === 'practical').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Online Classes</span>
              <span className="font-medium">{schedule.filter(c => c.isOnline).length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructors</h3>
          <div className="space-y-3">
            {Array.from(new Set(schedule.map(c => c.instructor))).slice(0, 4).map(instructor => (
              <div key={instructor} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">{instructor}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {holidays.slice(0, 3).map(holiday => (
              <div key={holiday.date} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  holiday.type === 'national' ? 'bg-red-500' :
                  holiday.type === 'exam' ? 'bg-orange-500' :
                  'bg-blue-500'
                }`}></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{holiday.name}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(holiday.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentClassSchedule;
