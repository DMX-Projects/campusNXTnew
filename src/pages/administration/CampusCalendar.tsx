import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  attendees: number;
  organizer: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

const CampusCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15)); // January 15, 2024
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const events: CalendarEvent[] = [
    {
      id: 'EVT001',
      title: 'New Student Orientation',
      description: 'Welcome session for incoming students',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '12:00',
      location: 'Main Auditorium',
      category: 'Academic',
      attendees: 200,
      organizer: 'Student Affairs',
      status: 'upcoming'
    },
    {
      id: 'EVT002',
      title: 'Faculty Meeting',
      description: 'Monthly faculty coordination meeting',
      date: '2024-01-16',
      startTime: '14:00',
      endTime: '16:00',
      location: 'Conference Room A',
      category: 'Administrative',
      attendees: 25,
      organizer: 'Dr. Sarah Johnson',
      status: 'upcoming'
    },
    {
      id: 'EVT003',
      title: 'Science Fair 2024',
      description: 'Annual science exhibition by students',
      date: '2024-01-18',
      startTime: '10:00',
      endTime: '17:00',
      location: 'Science Building',
      category: 'Events',
      attendees: 500,
      organizer: 'Science Department',
      status: 'upcoming'
    },
    {
      id: 'EVT004',
      title: 'Guest Lecture: AI in Healthcare',
      description: 'Industry expert talk on AI applications',
      date: '2024-01-20',
      startTime: '15:00',
      endTime: '16:30',
      location: 'Lecture Hall 201',
      category: 'Academic',
      attendees: 150,
      organizer: 'Computer Science Dept',
      status: 'upcoming'
    },
    {
      id: 'EVT005',
      title: 'Sports Tournament',
      description: 'Inter-college basketball championship',
      date: '2024-01-22',
      startTime: '08:00',
      endTime: '18:00',
      location: 'Sports Complex',
      category: 'Sports',
      attendees: 300,
      organizer: 'Sports Committee',
      status: 'upcoming'
    },
    {
      id: 'EVT006',
      title: 'Cultural Night',
      description: 'Annual cultural celebration event',
      date: '2024-01-25',
      startTime: '18:00',
      endTime: '22:00',
      location: 'Open Air Theatre',
      category: 'Cultural',
      attendees: 800,
      organizer: 'Cultural Committee',
      status: 'upcoming'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Administrative': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Events': return 'bg-green-100 text-green-800 border-green-200';
      case 'Sports': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Cultural': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Campus Calendar</h1>
          <p className="text-gray-600">Manage campus events, meetings, and important dates</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Categories</option>
                <option value="Academic">Academic</option>
                <option value="Administrative">Administrative</option>
                <option value="Events">Events</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-7 bg-gray-50">
              {dayNames.map((day) => (
                <div key={day} className="p-4 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {getDaysInMonth(currentDate).map((day, index) => {
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const isToday = day.toDateString() === new Date().toDateString();
                const dayEvents = getEventsForDate(day);
                
                return (
                  <div
                    key={index}
                    className={`min-h-[120px] p-2 border-b border-r border-gray-200 ${
                      !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                    } ${isToday ? 'bg-teal-50' : ''}`}
                  >
                    <div className={`text-sm font-medium mb-2 ${isToday ? 'text-teal-600' : ''}`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded border ${getCategoryColor(event.category)} truncate cursor-pointer hover:opacity-80 transition-opacity`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
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

          {/* Events List */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {filteredEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        {event.attendees} attendees
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Events</span>
                  <span className="font-medium text-gray-900">{events.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Academic</span>
                  <span className="font-medium text-blue-600">{events.filter(e => e.category === 'Academic').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cultural</span>
                  <span className="font-medium text-pink-600">{events.filter(e => e.category === 'Cultural').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sports</span>
                  <span className="font-medium text-orange-600">{events.filter(e => e.category === 'Sports').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusCalendar;