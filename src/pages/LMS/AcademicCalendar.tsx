import React, { useState } from "react";
import { Calendar as CalendarIcon, Plus, Clock, MapPin, Users } from "lucide-react";
import Modal from "../LMS/Components/common/Modal";
import EventForm from "../LMS/Components/calendar/EventForm";
import { mockEvents } from "../LMS/data/mockData";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AcademicCalendar: React.FC = () => {
  const [events, setEvents] = useState(
    mockEvents.map((e) => ({
      ...e,
      start: parse(`${e.date} ${e.time}`, "yyyy-MM-dd HH:mm", new Date()), // strict parse
      end: parse(`${e.date} ${e.time}`, "yyyy-MM-dd HH:mm", new Date()),
    }))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: any) => {
    const newEvent = {
      ...eventData,
      start: parse(`${eventData.date} ${eventData.time}`, "yyyy-MM-dd HH:mm", new Date()),
      end: parse(`${eventData.date} ${eventData.time}`, "yyyy-MM-dd HH:mm", new Date()),
    };

    if (editingEvent) {
      setEvents(events.map((e) => (e.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : e)));
    } else {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // Sort events by start date for upcoming events
  const upcomingEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Calendar</h1>
          <p className="text-gray-600 mt-1">Manage academic events, schedules, and important dates</p>
        </div>
        <button
          onClick={handleAddEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Calendar View</h2>
            <div className="h-[600px]">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                onSelectEvent={(event) => handleEditEvent(event)}
                eventPropGetter={() => ({
                  style: {
                    backgroundColor: "#2563eb", // Tailwind blue-600
                    color: "white",
                    borderRadius: "6px",
                    padding: "2px 6px",
                  },
                })}
              />
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors cursor-pointer"
                onClick={() => handleEditEvent(event)}
              >
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <div className="space-y-1 mt-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>{format(event.start, "PPpp")}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                  {event.attendees && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEvent ? "Edit Event" : "Add New Event"}
        size="lg"
      >
        <EventForm event={editingEvent} onSave={handleSaveEvent} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default AcademicCalendar;
