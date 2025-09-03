 // AcademicCalendar.tsx - Updated with Google Calendar Design
import React, { useState, useMemo } from 'react';
import { Calendar, BookOpen, Plane, BarChart3, Plus, Edit, Trash2, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface AcademicEvent {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  type: 'exam' | 'vacation' | 'holiday' | 'event' | 'semester';
  description: string;
  department?: string;
  semester?: string;
  location?: string;
}

// Google Calendar-like Calendar Grid Component
const CalendarGrid: React.FC<{
  events: AcademicEvent[];
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}> = ({ events, currentMonth, currentYear, onMonthChange }) => {
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Generate calendar grid
  const calendarDays = [];
  
  // Previous month's trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isPrevMonth: true,
      date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i)
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isPrevMonth: false,
      date: new Date(currentYear, currentMonth, day)
    });
  }
  
  // Next month's leading days
  const remainingCells = 42 - calendarDays.length; // 6 rows × 7 days
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: false,
      date: new Date(currentYear, currentMonth + 1, day)
    });
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventStart = new Date(event.startDate).toISOString().split('T')[0];
      const eventEnd = event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : eventStart;
      return dateStr >= eventStart && dateStr <= eventEnd;
    });
  };

  // Get event color
  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-500 text-white';
      case 'vacation': return 'bg-blue-500 text-white';
      case 'holiday': return 'bg-green-500 text-white';
      case 'event': return 'bg-purple-500 text-white';
      case 'semester': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        onMonthChange(11, currentYear - 1);
      } else {
        onMonthChange(currentMonth - 1, currentYear);
      }
    } else {
      if (currentMonth === 11) {
        onMonthChange(0, currentYear + 1);
      } else {
        onMonthChange(currentMonth + 1, currentYear);
      }
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="flex gap-1">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <button
            onClick={() => onMonthChange(new Date().getMonth(), new Date().getFullYear())}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayNames.map(day => (
          <div key={day} className="p-4 text-center font-semibold text-gray-700 bg-gray-50">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((calDay, index) => {
          const dayEvents = getEventsForDate(calDay.date);
          const isCurrentMonthDay = calDay.isCurrentMonth;
          const isTodayDate = isToday(calDay.date);

          return (
            <div
              key={index}
              className={`min-h-32 border-r border-b border-gray-200 p-2 ${
                isCurrentMonthDay ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              {/* Day Number */}
              <div className={`text-sm font-medium mb-2 ${
                isTodayDate
                  ? 'bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center'
                  : isCurrentMonthDay
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}>
                {calDay.day}
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <div
                    key={event.id}
                    className={`text-xs px-2 py-1 rounded truncate cursor-pointer hover:shadow-md transition-shadow ${getEventColor(event.type)}`}
                    title={`${event.title} - ${event.description}`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 px-2 py-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AcademicCalendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'exams' | 'vacations' | 'analytics'>('calendar');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Sample academic events data
  const [events] = useState<AcademicEvent[]>([
    {
      id: '1',
      title: 'Mid-Semester Examinations',
      startDate: '2025-10-15',
      endDate: '2025-10-25',
      type: 'exam',
      description: 'Mid-semester exams for all engineering branches',
      department: 'All Departments',
      location: 'Main Campus'
    },
    {
      id: '2',
      title: 'End-Semester Examinations',
      startDate: '2025-12-10',
      endDate: '2025-12-20',
      type: 'exam',
      description: 'Final semester exams for odd semester',
      department: 'All Departments',
      location: 'Main Campus'
    },
    {
      id: '3',
      title: 'Winter Vacation',
      startDate: '2025-12-25',
      endDate: '2026-01-05',
      type: 'vacation',
      description: 'Winter break for all students and faculty'
    },
    {
      id: '4',
      title: 'Summer Vacation',
      startDate: '2026-05-15',
      endDate: '2026-06-15',
      type: 'vacation',
      description: 'Summer break after even semester completion'
    },
    {
      id: '5',
      title: 'Independence Day',
      startDate: '2025-08-15',
      type: 'holiday',
      description: 'National holiday - College closed'
    },
    {
      id: '6',
      title: 'Gandhi Jayanti',
      startDate: '2025-10-02',
      type: 'holiday',
      description: 'National holiday - College closed'
    },
    {
      id: '7',
      title: 'TechnoVision 2025',
      startDate: '2025-11-20',
      endDate: '2025-11-22',
      type: 'event',
      description: 'Annual technical festival',
      location: 'Campus Wide'
    },
    {
      id: '8',
      title: 'Odd Semester Begins',
      startDate: '2025-09-01',
      type: 'semester',
      description: 'Classes begin for odd semester 2025-26'
    },
    {
      id: '9',
      title: 'Even Semester Begins',
      startDate: '2026-01-08',
      type: 'semester',
      description: 'Classes begin for even semester 2025-26'
    }
  ]);

  // Get events by type
  const getEventsByType = (type: string) => {
    return events.filter(event => event.type === type);
  };

  // Get event color based on type
  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      case 'vacation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'holiday': return 'bg-green-100 text-green-800 border-green-200';
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'semester': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    if (endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    return formatDate(startDate);
  };

  // Handle month navigation
  const handleMonthChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalEvents = events.length;
    const examCount = getEventsByType('exam').length;
    const vacationCount = getEventsByType('vacation').length;
    const holidayCount = getEventsByType('holiday').length;
    const eventCount = getEventsByType('event').length;

    return {
      totalEvents,
      examCount,
      vacationCount,
      holidayCount,
      eventCount
    };
  }, [events]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Academic Calendar</h1>
            <p className="text-gray-600">Comprehensive academic schedule and event management</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'exams', label: 'Exams', icon: BookOpen },
            { id: 'vacations', label: 'Vacations', icon: Plane },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Tab - Google Calendar Style */}
      {activeTab === 'calendar' && (
        <CalendarGrid
          events={events}
          currentMonth={selectedMonth}
          currentYear={selectedYear}
          onMonthChange={handleMonthChange}
        />
      )}

      {/* Exams Tab */}
      {activeTab === 'exams' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Examination Schedule</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Exam
            </button>
          </div>

          <div className="space-y-4">
            {getEventsByType('exam').map(exam => (
              <div key={exam.id} className={`border rounded-lg p-6 ${getEventColor('exam')}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-red-800">{exam.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-red-700">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{formatDateRange(exam.startDate, exam.endDate)}</span>
                    </div>
                    <p className="text-red-700 mt-2">{exam.description}</p>
                    {exam.department && (
                      <div className="mt-2">
                        <span className="text-sm font-medium text-red-600">Department: </span>
                        <span className="text-sm text-red-700">{exam.department}</span>
                      </div>
                    )}
                    {exam.location && (
                      <div className="flex items-center gap-1 mt-2 text-red-700">
                        <MapPin className="w-4 h-4" />
                        {exam.location}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vacations Tab */}
      {activeTab === 'vacations' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Vacations & Holidays</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Vacation
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vacations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vacation Periods</h3>
              <div className="space-y-4">
                {getEventsByType('vacation').map(vacation => (
                  <div key={vacation.id} className={`border rounded-lg p-4 ${getEventColor('vacation')}`}>
                    <h4 className="font-semibold text-blue-800">{vacation.title}</h4>
                    <div className="flex items-center gap-2 mt-2 text-blue-700">
                      <Clock className="w-4 h-4" />
                      <span>{formatDateRange(vacation.startDate, vacation.endDate)}</span>
                    </div>
                    <p className="text-blue-700 text-sm mt-2">{vacation.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Holidays */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Public Holidays</h3>
              <div className="space-y-4">
                {getEventsByType('holiday').map(holiday => (
                  <div key={holiday.id} className={`border rounded-lg p-4 ${getEventColor('holiday')}`}>
                    <h4 className="font-semibold text-green-800">{holiday.title}</h4>
                    <div className="flex items-center gap-2 mt-2 text-green-700">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(holiday.startDate)}</span>
                    </div>
                    <p className="text-green-700 text-sm mt-2">{holiday.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Overview</h2>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{analytics.totalEvents}</div>
                  <div className="text-sm text-gray-600">Total Events</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-red-600">{analytics.examCount}</div>
                  <div className="text-sm text-gray-600">Exam Periods</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <Plane className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{analytics.vacationCount}</div>
                  <div className="text-sm text-gray-600">Vacation Periods</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{analytics.holidayCount}</div>
                  <div className="text-sm text-gray-600">Public Holidays</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;
