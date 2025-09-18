import React, { useState } from 'react';
import { CalendarIcon, PlusIcon, EyeIcon,  TrashIcon, BellIcon, DownloadIcon } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'academic' | 'exam' | 'holiday' | 'event' | 'meeting' | 'deadline';
  department: string;
  location: string;
  organizer: string;
  priority: 'low' | 'medium' | 'high';
  attendees: string[];
  isRecurring: boolean;
  notificationSent: boolean;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

const CampusCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Mid-Semester Examinations',
      description: 'Mid-semester examinations for all departments',
      date: '2025-09-15',
      startTime: '09:00',
      endTime: '17:00',
      type: 'exam',
      department: 'All',
      location: 'Examination Halls',
      organizer: 'Dr. Academic Controller',
      priority: 'high',
      attendees: ['All Students'],
      isRecurring: false,
      notificationSent: true,
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Technical Symposium 2025',
      description: 'Annual technical symposium with paper presentations and competitions',
      date: '2025-09-20',
      startTime: '10:00',
      endTime: '18:00',
      type: 'event',
      department: 'CSE',
      location: 'Main Auditorium',
      organizer: 'Prof. Event Coordinator',
      priority: 'medium',
      attendees: ['CSE Students', 'Faculty'],
      isRecurring: false,
      notificationSent: false,
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Faculty Meeting',
      description: 'Monthly faculty meeting to discuss academic progress',
      date: '2025-09-10',
      startTime: '14:00',
      endTime: '16:00',
      type: 'meeting',
      department: 'All',
      location: 'Conference Room',
      organizer: 'Principal',
      priority: 'high',
      attendees: ['All Faculty'],
      isRecurring: true,
      notificationSent: true,
      status: 'scheduled'
    }
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({});

  const departments = ['All', 'CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const eventTypes = ['academic', 'exam', 'holiday', 'event', 'meeting', 'deadline'];
  const priorities = ['low', 'medium', 'high'];

  const getEventTypeColor = (type: string) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800 border-blue-200',
      exam: 'bg-red-100 text-red-800 border-red-200',
      holiday: 'bg-green-100 text-green-800 border-green-200',
      event: 'bg-purple-100 text-purple-800 border-purple-200',
      meeting: 'bg-orange-100 text-orange-800 border-orange-200',
      deadline: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[type as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const filteredEvents = events.filter(event => {
    if (selectedFilter === 'all') return true;
    return event.type === selectedFilter || event.department === selectedFilter;
  });

  const getEventsForDate = (date: string) => {
    return filteredEvents.filter(event => event.date === date);
  };


  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.startTime) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description || '',
        date: newEvent.date,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime || newEvent.startTime,
        type: newEvent.type || 'event',
        department: newEvent.department || 'All',
        location: newEvent.location || '',
        organizer: 'Chairperson',
        priority: newEvent.priority || 'medium',
        attendees: newEvent.attendees || [],
        isRecurring: newEvent.isRecurring || false,
        notificationSent: false,
        status: 'scheduled'
      };
      
      setEvents([...events, event]);
      setNewEvent({});
      setIsCreateModalOpen(false);
      alert('Event created successfully!');
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    alert('Event deleted successfully!');
  };

  const sendNotification = (eventId: string) => {
    const updatedEvents = events.map(event => 
      event.id === eventId 
        ? { ...event, notificationSent: true }
        : event
    );
    setEvents(updatedEvents);
    alert('Notification sent to all attendees!');
  };

  const exportCalendar = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Date,Start Time,End Time,Type,Department,Location,Organizer,Priority\n" +
      filteredEvents.map(event => 
        `"${event.title}",${event.date},${event.startTime},${event.endTime},${event.type},${event.department},"${event.location}","${event.organizer}",${event.priority}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "campus_calendar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const stats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length,
    todayEvents: events.filter(e => e.date === new Date().toISOString().split('T')[0]).length,
    pendingNotifications: events.filter(e => !e.notificationSent && e.status === 'scheduled').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campus Calendar</h1>
              <p className="text-gray-600 mt-1">Manage academic events, examinations, and activities</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Add Event
              </button>
              <button
                onClick={exportCalendar}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                ←
              </button>
              <div className="px-4 py-2 bg-gray-50 rounded-lg font-medium">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                →
              </button>
            </div>

            <div className="flex gap-2">
              {(['month', 'week', 'day'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Events</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)} Events
                </option>
              ))}
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept} Department</option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
              <CalendarIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming</p>
                <p className="text-2xl font-bold text-green-600">{stats.upcomingEvents}</p>
              </div>
              <div className="text-2xl">📅</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Events</p>
                <p className="text-2xl font-bold text-purple-600">{stats.todayEvents}</p>
              </div>
              <div className="text-2xl">📍</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Notifications</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingNotifications}</p>
              </div>
              <BellIcon className="text-orange-500" size={24} />
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        {viewMode === 'month' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center font-medium text-gray-700 bg-gray-50 rounded">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => {
                const dateStr = day.toISOString().split('T')[0];
                const dayEvents = getEventsForDate(dateStr);
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const isToday = dateStr === new Date().toISOString().split('T')[0];
                
                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border border-gray-100 rounded cursor-pointer hover:bg-gray-50 transition-colors ${
                      !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                    } ${isToday ? 'bg-blue-50 border-blue-200' : ''}`}
                    onClick={() => setSelectedDate(dateStr)}
                  >
                    <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded border truncate ${getEventTypeColor(event.type)}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(event);
                            setIsEventDetailModalOpen(true);
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Events ({filteredEvents.filter(e => new Date(e.date) >= new Date()).length})
          </h2>
          
          <div className="space-y-3">
            {filteredEvents
              .filter(event => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 10)
              .map(event => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                          {event.priority}
                        </span>
                        {event.isRecurring && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Recurring
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span>⏰ {event.startTime} - {event.endTime}</span>
                        <span>📍 {event.location}</span>
                        <span>👥 {event.department}</span>
                        <span>👤 {event.organizer}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsEventDetailModalOpen(true);
                        }}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded transition-colors"
                      >
                        <EyeIcon size={16} />
                      </button>
                      {!event.notificationSent && (
                        <button
                          onClick={() => sendNotification(event.id)}
                          className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-2 rounded transition-colors"
                        >
                          <BellIcon size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded transition-colors"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Create Event Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Event</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    value={newEvent.title || ''}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event title"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newEvent.description || ''}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event description"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newEvent.date || ''}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select
                    value={newEvent.type || ''}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value as "academic" | "exam" | "holiday" | "event" | "meeting" | "deadline"})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={newEvent.startTime || ''}
                    onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={newEvent.endTime || ''}
                    onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={newEvent.department || ''}
                    onChange={(e) => setNewEvent({...newEvent, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newEvent.priority || ''}
                    onChange={(e) => setNewEvent({...newEvent, priority: e.target.value as "low" | "medium" | "high"})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Priority</option>
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newEvent.location || ''}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                  />
                </div>
                
                <div>
                  <label className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      checked={newEvent.isRecurring || false}
                      onChange={(e) => setNewEvent({...newEvent, isRecurring: e.target.checked})}
                      className="mr-2 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Recurring Event</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Event Detail Modal */}
        {isEventDetailModalOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
                <button
                  onClick={() => setIsEventDetailModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{selectedEvent.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(selectedEvent.type)}`}>
                      {selectedEvent.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedEvent.priority)}`}>
                      {selectedEvent.priority} priority
                    </span>
                    {selectedEvent.isRecurring && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        Recurring
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedEvent.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <p className="text-gray-900">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <p className="text-gray-900">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-gray-900">{selectedEvent.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <p className="text-gray-900">{selectedEvent.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
                    <p className="text-gray-900">{selectedEvent.organizer}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <p className="text-gray-900 capitalize">{selectedEvent.status}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notification Status</label>
                  <div className="flex items-center gap-2">
                    {selectedEvent.notificationSent ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        ✓ Notifications Sent
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                        ⚠ Notifications Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                {!selectedEvent.notificationSent && (
                  <button
                    onClick={() => sendNotification(selectedEvent.id)}
                    className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Send Notifications
                  </button>
                )}
                <button
                  onClick={() => setIsEventDetailModalOpen(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusCalendar;
