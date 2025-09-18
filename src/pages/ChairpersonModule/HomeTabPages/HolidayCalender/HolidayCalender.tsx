import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  type: "National" | "Festival" | "Optional";
  description?: string;
}

const holidays: Holiday[] = [
  { date: "2025-01-26", name: "Republic Day", type: "National", description: "Commemorates the adoption of the Constitution of India." },
  { date: "2025-03-14", name: "Holi", type: "Festival", description: "Festival of colors, symbolizing love and the arrival of spring." },
  { date: "2025-08-15", name: "Independence Day", type: "National", description: "Marks India's independence from British rule in 1947." },
  { date: "2025-10-02", name: "Gandhi Jayanti", type: "National", description: "Birth anniversary of Mahatma Gandhi." },
  { date: "2025-10-20", name: "Dussehra", type: "Festival", description: "Celebrates the victory of good over evil." },
  { date: "2025-10-31", name: "Diwali", type: "Festival", description: "Festival of lights, celebrating prosperity and victory of light over darkness." },
  { date: "2025-12-25", name: "Christmas", type: "Festival", description: "Celebrates the birth of Jesus Christ." },
];

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return days;
}

export const HolidayCalendar: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const days = generateCalendar(currentYear, currentMonth);

  const goPrev = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const holidayMap = holidays.reduce<Record<string, Holiday>>((map, h) => {
    map[h.date] = h;
    return map;
  }, {});

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Calendar className="w-6 h-6" />
          {monthNames[currentMonth]} {currentYear}
        </motion.h1>

        <div className="flex gap-2">
          <button
            onClick={goPrev}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goNext}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border rounded-xl overflow-hidden shadow-md">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="py-2 text-center font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {day}
          </div>
        ))}

        {days.map((day, i) => {
          const dateStr =
            day &&
            `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
              day
            ).padStart(2, "0")}`;

          const holiday = dateStr ? holidayMap[dateStr] : null;

          return (
            <motion.div
              key={i}
              className={`h-24 border p-1 text-sm relative 
                bg-white dark:bg-gray-900 dark:border-gray-700`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.01 }}
              onClick={() => holiday && setSelectedHoliday(holiday)}
            >
              {day && (
                <div
                  className={`absolute top-1 right-1 text-xs font-semibold ${
                    holiday
                      ? "text-primary-600 dark:text-primary-300"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {day}
                </div>
              )}

              {holiday && (
                <div
                  className={`mt-6 px-2 py-1 rounded-lg text-xs font-medium truncate cursor-pointer
                    ${
                      holiday.type === "National"
                        ? "bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200"
                        : holiday.type === "Festival"
                        ? "bg-accent-100 text-accent-700 dark:bg-accent-800 dark:text-accent-200"
                        : "bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-200"
                    }`}
                >
                  {holiday.name}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Holiday Modal */}
      <AnimatePresence>
        {selectedHoliday && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 max-w-md w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setSelectedHoliday(null)}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              <h2 className="text-xl font-bold text-primary-700 dark:text-primary-300">
                {selectedHoliday.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {new Date(selectedHoliday.date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <span
                className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full
                  ${
                    selectedHoliday.type === "National"
                      ? "bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200"
                      : selectedHoliday.type === "Festival"
                      ? "bg-accent-100 text-accent-700 dark:bg-accent-800 dark:text-accent-200"
                      : "bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-200"
                  }`}
              >
                {selectedHoliday.type}
              </span>

              {selectedHoliday.description && (
                <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {selectedHoliday.description}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HolidayCalendar;
