import React, { useState } from "react";

interface PlacementEvent {
  date: string;
  title: string;
  description?: string;
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const PlacementCalendar: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<PlacementEvent[]>([
    {
      date: `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-05`,
      title: "Tech Innovators Drive",
      description: "On-campus placement drive",
    },
    {
      date: `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-12`,
      title: "HR Round Prep",
      description: "Resume & interview prep session",
    },
    {
      date: `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-18`,
      title: "Company Talk",
      description: "Info session by ABC Corp.",
    },
  ]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({ title: "", description: "" });

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const openAddEventModal = (date: string) => {
    setSelectedDate(date);
    setEventData({ title: "", description: "" });
    setShowModal(true);
  };

  const addEvent = () => {
    if (!eventData.title.trim()) return;
    setEvents([
      ...events,
      {
        date: selectedDate!,
        title: eventData.title,
        description: eventData.description,
      },
    ]);
    setShowModal(false);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  return (
    <div className="p-4 bg-gray-50 h-screen">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
            })}
          </span>
          <input
            type="number"
            value={currentYear}
            onChange={(e) =>
              setCurrentYear(parseInt(e.target.value) || currentYear)
            }
            className="w-20 px-2 py-1 border rounded text-center"
          />
        </div>
        <button
          onClick={nextMonth}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}

        {daysInMonth.map((day) => {
          const dateStr = day.toISOString().split("T")[0];
          const dayEvents = events.filter((e) => e.date === dateStr);
          const isToday = dateStr === today.toISOString().split("T")[0];

          return (
            <div
              key={dateStr}
              className={`p-2 border h-28 cursor-pointer relative rounded flex flex-col`}
              onClick={() => openAddEventModal(dateStr)}
            >
              <span
                className={`font-semibold mb-1 ${
                  isToday
                    ? "text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center"
                    : ""
                }`}
              >
                {day.getDate()}
              </span>

              <div className="flex flex-col space-y-1 mt-1 overflow-y-auto">
                {dayEvents.map((e, idx) => (
                  <div
                    key={idx}
                    title={e.description}
                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full truncate hover:bg-blue-700 transition"
                  >
                    {e.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3 space-y-4">
            <h3 className="text-xl font-bold">Add Placement Event</h3>
            <p className="text-gray-500">Date: {selectedDate}</p>
            <input
              type="text"
              placeholder="Event Title"
              value={eventData.title}
              onChange={(e) =>
                setEventData({ ...eventData, title: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              placeholder="Description (optional)"
              value={eventData.description}
              onChange={(e) =>
                setEventData({ ...eventData, description: e.target.value })
              }
              className="w-full border px-3 py-2 rounded h-24 resize-none"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementCalendar;
