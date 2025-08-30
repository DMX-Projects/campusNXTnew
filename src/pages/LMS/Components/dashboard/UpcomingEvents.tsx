import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const UpcomingEvents: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Faculty Meeting',
      date: 'Today',
      time: '2:00 PM',
      location: 'Conference Room A',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Student Registration',
      date: 'Tomorrow',
      time: '9:00 AM',
      location: 'Admin Building',
      type: 'registration'
    },
    {
      id: 3,
      title: 'Semester End Exam',
      date: 'Mar 15',
      time: '10:00 AM',
      location: 'Exam Hall 1',
      type: 'exam'
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="font-medium text-gray-900">{event.title}</h3>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{event.date} at {event.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;