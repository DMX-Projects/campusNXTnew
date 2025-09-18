// FacultyAcademicCalendar.tsx
import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Filter, 
  Bell,
  BookOpen,
  Users,
  Clock,
  MapPin,
  Eye,
  Search,
  Settings,
  Plus,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface AcademicEvent {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  type: 'semester' | 'exam' | 'holiday' | 'event' | 'deadline' | 'meeting';
  description: string;
  department?: string;
  semester?: string;
  location?: string;
  isImportant: boolean;
  affectsTeaching: boolean;
}

interface PersonalReminder {
  id: string;
  eventId: string;
  reminderTime: string; // ISO string
  isActive: boolean;
}

const FacultyAcademicCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState<'all' | string>('all');
  const [filterDepartment, setFilterDepartment] = useState<'all' | string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showReminders, setShowReminders] = useState(false);

  // Faculty information
  const facultyInfo = {
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science Engineering',
    employeeId: 'FAC001'
  };

  // Academic events data (read-only for faculty)
  const [academicEvents] = useState<AcademicEvent[]>([
    {
      id: '1',
      title: 'Odd Semester 2025-26 Begins',
      startDate: '2025-08-01',
      type: 'semester',
      description: 'Start of odd semester for academic year 2025-26',
      department: 'All Departments',
      isImportant: true,
      affectsTeaching: true
    },
    {
      id: '2',
      title: 'Mid-Semester Examinations',
      startDate: '2025-10-15',
      endDate: '2025-10-25',
      type: 'exam',
      description: 'Mid-semester exams for all branches',
      department: 'All Departments',
      isImportant: true,
      affectsTeaching: true
    },
    {
      id: '3',
      title: 'Diwali Holidays',
      startDate: '2025-11-01',
      endDate: '2025-11-05',
      type: 'holiday',
      description: 'College closed for Diwali celebrations',
      isImportant: false,
      affectsTeaching: true
    },
    {
      id: '4',
      title: 'Industry-Academia Meet',
      startDate: '2025-09-15',
      type: 'event',
      description: 'Annual industry-academia interaction event',
      department: 'All Departments',
      location: 'Main Auditorium',
      isImportant: false,
      affectsTeaching: false
    },
    {
      id: '5',
      title: 'Grade Submission Deadline',
      startDate: '2025-11-30',
      type: 'deadline',
      description: 'Final deadline for mid-semester grade submission',
      department: 'All Departments',
      isImportant: true,
      affectsTeaching: false
    },
    {
      id: '6',
      title: 'Faculty Development Program',
      startDate: '2025-12-05',
      endDate: '2025-12-07',
      type: 'event',
      description: 'Three-day faculty development program on emerging technologies',
      department: 'Computer Science Engineering',
      location: 'Conference Hall',
      isImportant: false,
      affectsTeaching: false
    },
    {
      id: '7',
      title: 'Department Meeting',
      startDate: '2025-09-10',
      type: 'meeting',
      description: 'Monthly department meeting to discuss academic progress',
      department: 'Computer Science Engineering',
      location: 'HOD Office',
      isImportant: true,
      affectsTeaching: false
    },
    {
      id: '8',
      title: 'End-Semester Examinations',
      startDate: '2025-12-20',
      endDate: '2025-12-30',
      type: 'exam',
      description: 'Final semester examinations',
      department: 'All Departments',
      isImportant: true,
      affectsTeaching: true
    },
    {
      id: '9',
      title: 'Winter Vacation',
      startDate: '2026-01-01',
      endDate: '2026-01-15',
      type: 'holiday',
      description: 'Winter break for students and faculty',
      isImportant: false,
      affectsTeaching: true
    }
  ]);

  // Personal reminders (faculty can add these)
  const [personalReminders, setPersonalReminders] = useState<PersonalReminder[]>([
    {
      id: '1',
      eventId: '2',
      reminderTime: '2025-10-10T09:00:00',
      isActive: true
    }
  ]);

  // Get current month info
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }

    // Next month's leading days
    const remainingCells = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return academicEvents.filter(event => {
      const eventStart = event.startDate;
      const eventEnd = event.endDate || event.startDate;
      return dateStr >= eventStart && dateStr <= eventEnd;
    });
  };

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return academicEvents.filter(event => {
      const matchesType = filterType === 'all' || event.type === filterType;
      const matchesDepartment = filterDepartment === 'all' || 
                               event.department === filterDepartment || 
                               event.department === 'All Departments';
      const matchesSearch = !searchTerm || 
                           event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesType && matchesDepartment && matchesSearch;
    });
  }, [academicEvents, filterType, filterDepartment, searchTerm]);

  // Navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get event type styling
  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case 'semester':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'exam':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'holiday':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'event':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'deadline':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'meeting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Export calendar data
  const exportCalendar = (format: 'csv' | 'ical') => {
    if (format === 'csv') {
      const csvData = filteredEvents.map(event => ({
        Title: event.title,
        'Start Date': event.startDate,
        'End Date': event.endDate || event.startDate,
        Type: event.type,
        Description: event.description,
        Department: event.department || 'N/A',
        Location: event.location || 'N/A'
      }));

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `academic_calendar_${year}_${month + 1}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Add personal reminder
  const addPersonalReminder = (eventId: string) => {
    const event = academicEvents.find(e => e.id === eventId);
    if (event) {
      const reminderDate = new Date(event.startDate);
      reminderDate.setDate(reminderDate.getDate() - 1);
      reminderDate.setHours(9, 0, 0, 0);

      const newReminder: PersonalReminder = {
        id: Date.now().toString(),
        eventId,
        reminderTime: reminderDate.toISOString(),
        isActive: true
      };

      setPersonalReminders(prev => [...prev, newReminder]);
      alert('Personal reminder added successfully!');
    }
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Academic Calendar</h1>
              <p className="text-gray-600">{facultyInfo.name} • {facultyInfo.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Employee ID: {facultyInfo.employeeId}</p>
              <p className="text-sm text-gray-500">Read-Only Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="semester">Semester Events</option>
            <option value="exam">Examinations</option>
            <option value="holiday">Holidays</option>
            <option value="event">Events</option>
            <option value="deadline">Deadlines</option>
            <option value="meeting">Meetings</option>
          </select>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science Engineering">Computer Science</option>
            <option value="Mechanical Engineering">Mechanical</option>
            <option value="Electrical Engineering">Electrical</option>
            <option value="Civil Engineering">Civil</option>
          </select>

          {/* Export Button */}
          <button
            onClick={() => exportCalendar('csv')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {filteredEvents.filter(e => e.type === 'exam').length}
            </div>
            <div className="text-sm text-gray-600">Exam Periods</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredEvents.filter(e => e.type === 'holiday').length}
            </div>
            <div className="text-sm text-gray-600">Holiday Periods</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {filteredEvents.filter(e => e.type === 'deadline').length}
            </div>
            <div className="text-sm text-gray-600">Important Deadlines</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {personalReminders.filter(r => r.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Personal Reminders</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Calendar Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h2 className="text-xl font-bold text-gray-900">
                    {monthNames[month]} {year}
                  </h2>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={goToToday}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Today
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center font-semibold text-gray-700 bg-gray-50">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {calendarDays.map(({ date, isCurrentMonth }, index) => {
                const dayEvents = getEventsForDate(date).slice(0, 3); // Show max 3 events
                const hasMoreEvents = getEventsForDate(date).length > 3;
                const isTodayDate = isToday(date);

                return (
                  <div
                    key={index}
                    className={`min-h-32 border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                      isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                    } ${isTodayDate ? 'bg-blue-50 border-blue-200' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {/* Day Number */}
                    <div className={`text-sm font-medium mb-1 ${
                      isTodayDate
                        ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                        : isCurrentMonth
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }`}>
                      {date.getDate()}
                    </div>

                    {/* Events */}
                    <div className="space-y-1">
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          className={`text-xs px-2 py-1 rounded truncate ${getEventTypeStyle(event.type)} ${
                            event.isImportant ? 'font-semibold border-l-2 border-red-500' : ''
                          }`}
                          title={event.description}
                        >
                          {event.title}
                        </div>
                      ))}
                      {hasMoreEvents && (
                        <div className="text-xs text-gray-500 px-2 py-1">
                          +{getEventsForDate(date).length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Event Details Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredEvents
                .filter(event => new Date(event.startDate) >= new Date())
                .slice(0, 10)
                .map(event => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getEventTypeStyle(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {new Date(event.startDate).toLocaleDateString()}
                      {event.endDate && event.endDate !== event.startDate && 
                        ` - ${new Date(event.endDate).toLocaleDateString()}`
                      }
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                    {event.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2">
                        {event.isImportant && (
                          <AlertCircle className="w-4 h-4 text-red-500" title="Important Event" />
                        )}
                        {event.affectsTeaching && (
                          <BookOpen className="w-4 h-4 text-blue-500" title="Affects Teaching Schedule" />
                        )}
                      </div>
                      <button
                        onClick={() => addPersonalReminder(event.id)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        title="Add Personal Reminder"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
            <div className="space-y-2">
              {[
                { type: 'semester', label: 'Semester Events', icon: <Calendar className="w-4 h-4" /> },
                { type: 'exam', label: 'Examinations', icon: <BookOpen className="w-4 h-4" /> },
                { type: 'holiday', label: 'Holidays', icon: <Clock className="w-4 h-4" /> },
                { type: 'event', label: 'Academic Events', icon: <Users className="w-4 h-4" /> },
                { type: 'deadline', label: 'Deadlines', icon: <AlertCircle className="w-4 h-4" /> },
                { type: 'meeting', label: 'Meetings', icon: <Settings className="w-4 h-4" /> }
              ].map(item => (
                <div key={item.type} className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded text-sm font-medium ${getEventTypeStyle(item.type)}`}>
                    {item.icon}
                  </div>
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => exportCalendar('csv')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Calendar
              </button>
              <button
                onClick={() => window.print()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Print View
              </button>
              <button
                onClick={() => setShowReminders(!showReminders)}
                className="w-full bg-green-100 hover:bg-green-200 text-green-700 p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Bell className="w-4 h-4" />
                Manage Reminders
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Date Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-500 rotate-45" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {getEventsForDate(selectedDate).length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No events scheduled for this date</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className={`border rounded-lg p-4 ${getEventTypeStyle(event.type)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <div className="flex items-center gap-2">
                          {event.isImportant && (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-50 capitalize">
                            {event.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{event.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {event.department && (
                          <div>
                            <strong>Department:</strong> {event.department}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <strong>Location:</strong> {event.location}
                          </div>
                        )}
                        {event.endDate && event.endDate !== event.startDate && (
                          <div>
                            <strong>Duration:</strong> {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                          </div>
                        )}
                        <div>
                          <strong>Affects Teaching:</strong> {event.affectsTeaching ? 'Yes' : 'No'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyAcademicCalendar;
