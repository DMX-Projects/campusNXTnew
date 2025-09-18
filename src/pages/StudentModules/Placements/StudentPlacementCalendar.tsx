import React, { useState, useEffect } from 'react';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  BriefcaseIcon,
  AlertCircleIcon,
  PlusIcon,
  FilterIcon,
  EyeIcon,
  EditIcon,
  BellIcon,
  VideoIcon,
  BuildingIcon
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  company: string;
  type: 'interview' | 'drive' | 'deadline' | 'webinar' | 'test' | 'meeting';
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  description: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  importance: 'low' | 'medium' | 'high';
  attendees?: string[];
  meetingLink?: string;
  companyLogo: string;
  isReminder: boolean;
  reminderTime: number; // minutes before event
}

const StudentPlacementCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Technical Interview',
      company: 'TechCorp Solutions',
      type: 'interview',
      date: '2025-09-04',
      startTime: '10:00',
      endTime: '11:00',
      venue: 'Video Conference',
      description: 'Final round technical interview for Software Engineer position. Focus on system design and coding problems.',
      status: 'scheduled',
      importance: 'high',
      attendees: ['Sarah Johnson (HR)', 'Mike Chen (Tech Lead)'],
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      companyLogo: '🏢',
      isReminder: true,
      reminderTime: 30
    },
    {
      id: '2',
      title: 'HR Interview',
      company: 'InnovateX',
      type: 'interview',
      date: '2025-09-04',
      startTime: '14:00',
      endTime: '15:00',
      venue: 'Campus - Room 201',
      description: 'HR discussion about role expectations, company culture, and compensation.',
      status: 'scheduled',
      importance: 'high',
      attendees: ['Michael Chen (Recruitment Lead)'],
      companyLogo: '🚀',
      isReminder: true,
      reminderTime: 15
    },
    {
      id: '3',
      title: 'Company Drive Registration',
      company: 'Microsoft',
      type: 'deadline',
      date: '2025-09-05',
      startTime: '23:59',
      endTime: '23:59',
      venue: 'Online Portal',
      description: 'Last date to register for Microsoft campus placement drive.',
      status: 'scheduled',
      importance: 'high',
      companyLogo: '🪟',
      isReminder: true,
      reminderTime: 1440 // 24 hours
    },
    {
      id: '4',
      title: 'Campus Drive',
      company: 'FutureTech',
      type: 'drive',
      date: '2025-09-06',
      startTime: '09:00',
      endTime: '17:00',
      venue: 'Main Auditorium',
      description: 'Full day campus placement drive including aptitude test, technical rounds, and HR interviews.',
      status: 'scheduled',
      importance: 'medium',
      companyLogo: '⚡',
      isReminder: true,
      reminderTime: 60
    },
    {
      id: '5',
      title: 'Pre-placement Talk',
      company: 'Google',
      type: 'webinar',
      date: '2025-09-07',
      startTime: '11:00',
      endTime: '12:30',
      venue: 'Virtual - Zoom',
      description: 'Learn about Google culture, available positions, and application process.',
      status: 'scheduled',
      importance: 'medium',
      meetingLink: 'https://zoom.us/j/1234567890',
      companyLogo: '🌈',
      isReminder: true,
      reminderTime: 30
    },
    {
      id: '6',
      title: 'Aptitude Test',
      company: 'DataFlow Inc',
      type: 'test',
      date: '2025-09-08',
      startTime: '10:00',
      endTime: '12:00',
      venue: 'Computer Lab A',
      description: 'Online aptitude test covering quantitative, logical reasoning, and verbal ability.',
      status: 'scheduled',
      importance: 'medium',
      companyLogo: '📊',
      isReminder: true,
      reminderTime: 45
    },
    {
      id: '7',
      title: 'Mock Interview Session',
      company: 'Placement Cell',
      type: 'meeting',
      date: '2025-09-09',
      startTime: '15:00',
      endTime: '16:00',
      venue: 'Career Guidance Room',
      description: 'Practice interview session with placement officer to improve interview skills.',
      status: 'scheduled',
      importance: 'low',
      companyLogo: '🎯',
      isReminder: false,
      reminderTime: 0
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    company: '',
    type: 'interview' as const,
    date: '',
    startTime: '',
    endTime: '',
    venue: '',
    description: '',
    reminderTime: 30
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || days.length < 42) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      interview: 'bg-blue-500',
      drive: 'bg-green-500',
      deadline: 'bg-red-500',
      webinar: 'bg-purple-500',
      test: 'bg-orange-500',
      meeting: 'bg-gray-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  const getEventTypeIcon = (type: string) => {
    const icons = {
      interview: UserIcon,
      drive: BriefcaseIcon,
      deadline: AlertCircleIcon,
      webinar: VideoIcon,
      test: ClockIcon,
      meeting: BuildingIcon
    };
    return icons[type as keyof typeof icons] || CalendarIcon;
  };

  const getImportanceColor = (importance: string) => {
    const colors = {
      low: 'border-l-gray-400',
      medium: 'border-l-yellow-400',
      high: 'border-l-red-400'
    };
    return colors[importance as keyof typeof colors];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'next') {
        newDate.setMonth(newDate.getMonth() + 1);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime) {
      alert('⚠️ Please fill in all required fields!');
      return;
    }

    const event: CalendarEvent = {
      id: Date.now().toString(),
      ...newEvent,
      status: 'scheduled',
      importance: 'medium',
      companyLogo: '📅',
      isReminder: true
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({
      title: '',
      company: '',
      type: 'interview',
      date: '',
      startTime: '',
      endTime: '',
      venue: '',
      description: '',
      reminderTime: 30
    });
    setShowAddEventModal(false);
    alert('✅ Event added successfully!');
  };

  const setReminder = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      alert(`⏰ Reminder set for ${event.title} (${event.reminderTime} minutes before)`);
    }
  };

  const joinMeeting = (meetingLink: string) => {
    window.open(meetingLink, '_blank');
  };

  const filteredEvents = events.filter(event => {
    if (selectedFilter === 'all') return true;
    return event.type === selectedFilter;
  });

  const todayEvents = getEventsForDate(new Date());
  const upcomingEvents = events
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Placement Calendar</h1>
              <p className="text-gray-600 mt-1">Keep track of interviews, deadlines, and placement events</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowAddEventModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Add Event
              </button>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Events</option>
                <option value="interview">Interviews</option>
                <option value="drive">Campus Drives</option>
                <option value="deadline">Deadlines</option>
                <option value="webinar">Webinars</option>
                <option value="test">Tests</option>
                <option value="meeting">Meetings</option>
              </select>
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-l-lg`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-r-lg`}
            >
              Day
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeftIcon size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((date, index) => {
                  const dayEvents = getEventsForDate(date);
                  const displayEvents = dayEvents.slice(0, 3);
                  const hasMoreEvents = dayEvents.length > 3;

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        isToday(date) ? 'bg-blue-50 border-blue-200' : ''
                      } ${isSelectedDate(date) ? 'ring-2 ring-blue-500' : ''} ${
                        !isCurrentMonth(date) ? 'text-gray-400 bg-gray-50' : ''
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className={`text-sm mb-1 ${isToday(date) ? 'font-bold text-blue-600' : ''}`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {displayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate cursor-pointer ${getEventTypeColor(event.type)} text-white`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                              setShowEventModal(true);
                            }}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {hasMoreEvents && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Events</h3>
              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map(event => {
                    const IconComponent = getEventTypeIcon(event.type);
                    return (
                      <div
                        key={event.id}
                        className={`border-l-4 ${getImportanceColor(event.importance)} bg-gray-50 p-3 rounded cursor-pointer hover:bg-gray-100 transition-colors`}
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent size={16} className="text-gray-600" />
                          <span className="font-medium text-sm">{event.title}</span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">{event.company}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <ClockIcon size={12} />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPinIcon size={12} />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No events scheduled for today</p>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => {
                  const IconComponent = getEventTypeIcon(event.type);
                  return (
                    <div
                      key={event.id}
                      className="border border-gray-200 p-3 rounded-lg cursor-pointer hover:shadow-md transition-all"
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventModal(true);
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{event.companyLogo}</span>
                        <div>
                          <div className="font-medium text-sm">{event.title}</div>
                          <div className="text-xs text-gray-600">{event.company}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarIcon size={12} />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon size={12} />
                          {event.startTime}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-medium">{events.filter(e => {
                    const eventDate = new Date(e.date);
                    const today = new Date();
                    const weekEnd = new Date(today);
                    weekEnd.setDate(today.getDate() + 7);
                    return eventDate >= today && eventDate <= weekEnd;
                  }).length} events</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Interviews</span>
                  <span className="font-medium">{events.filter(e => e.type === 'interview').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Deadlines</span>
                  <span className="font-medium text-red-600">{events.filter(e => e.type === 'deadline').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Campus Drives</span>
                  <span className="font-medium">{events.filter(e => e.type === 'drive').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Detail Modal */}
        {showEventModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedEvent.companyLogo}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h2>
                    <p className="text-gray-600">{selectedEvent.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Date & Time</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={16} className="text-gray-400" />
                        <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon size={16} className="text-gray-400" />
                        <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon size={16} className="text-gray-400" />
                        <span>{selectedEvent.venue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Type:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getEventTypeColor(selectedEvent.type)}`}>
                          {selectedEvent.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Importance:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          selectedEvent.importance === 'high' ? 'bg-red-100 text-red-800' :
                          selectedEvent.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedEvent.importance.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          selectedEvent.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          selectedEvent.status === 'completed' ? 'bg-green-100 text-green-800' :
                          selectedEvent.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedEvent.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedEvent.description}</p>
                </div>
                
                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Attendees</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.attendees.map((attendee, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedEvent.isReminder && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <BellIcon size={16} className="text-blue-600" />
                      <span className="text-sm text-blue-900">
                        Reminder set for {selectedEvent.reminderTime} minutes before the event
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3 mt-6">
                {selectedEvent.meetingLink && (
                  <button
                    onClick={() => joinMeeting(selectedEvent.meetingLink!)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <VideoIcon size={16} />
                    Join Meeting
                  </button>
                )}
                <button
                  onClick={() => setReminder(selectedEvent.id)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <BellIcon size={16} />
                  Set Reminder
                </button>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Event Modal */}
        {showAddEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Event</h2>
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter event title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={newEvent.company}
                      onChange={(e) => setNewEvent({...newEvent, company: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({...newEvent, type: e.target.value as any})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="interview">Interview</option>
                      <option value="drive">Campus Drive</option>
                      <option value="deadline">Deadline</option>
                      <option value="webinar">Webinar</option>
                      <option value="test">Test</option>
                      <option value="meeting">Meeting</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                  <input
                    type="text"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter venue or meeting link"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reminder (minutes before)</label>
                  <select
                    value={newEvent.reminderTime}
                    onChange={(e) => setNewEvent({...newEvent, reminderTime: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>No reminder</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={1440}>1 day</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addEvent}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPlacementCalendar;
