import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

type Exam = {
  id: number;
  branch: string;
  subject: string;
  start: Date;
  end: Date;
  mode: "Online" | "Offline";
  venue?: string;
  semester: number;
};

const examsSample: Exam[] = [
  // CSE branch subjects only (filtered)
  {
    id: 1,
    branch: "CSE",
    subject: "Data Structures",
    start: new Date("2025-09-05T10:00:00"),
    end: new Date("2025-09-05T12:00:00"),
    mode: "Offline",
    venue: "Room 101",
    semester: 3,
  },
  {
    id: 2,
    branch: "CSE",
    subject: "Computer Networks",
    start: new Date("2025-09-07T14:00:00"),
    end: new Date("2025-09-07T16:00:00"),
    mode: "Online",
    semester: 3,
  },
  {
    id: 3,
    branch: "CSE",
    subject: "Algorithms",
    start: new Date("2025-09-10T09:00:00"),
    end: new Date("2025-09-10T11:00:00"),
    mode: "Offline",
    venue: "Room 202",
    semester: 3,
  },
  {
    id: 4,
    branch: "CSE",
    subject: "Operating Systems",
    start: new Date("2025-07-15T09:00:00"),
    end: new Date("2025-07-15T11:00:00"),
    mode: "Offline",
    venue: "Room 203",
    semester: 2,
  },
  {
    id: 5,
    branch: "CSE",
    subject: "Database Management",
    start: new Date("2025-08-20T13:00:00"),
    end: new Date("2025-08-20T15:00:00"),
    mode: "Online",
    semester: 2,
  },
];

// Map subject to color for calendar event styling (CSE subjects)
const subjectColors: Record<string, string> = {
  "Data Structures": "#3b82f6", // blue
  "Computer Networks": "#ef4444", // red
  Algorithms: "#f59e0b", // amber
  "Operating Systems": "#10b981", // green
  "Database Management": "#8b5cf6", // purple
};

const localizer = momentLocalizer(moment);

export default function ExamSchedule() {
  type FilterType = "all" | "upcoming" | "completed";

  const [view, setView] = useState<View>("month");
  const [filter, setFilter] = useState<FilterType>("all");
  const [branchFilter, setBranchFilter] = useState<string>("CSE"); // student's branch default
  const [subjectFilter, setSubjectFilter] = useState<string>("");

  const now = new Date();

  // Filter exams by branch first
  const examsForBranch = examsSample.filter((e) => e.branch === branchFilter);

  // Get the list of subjects relevant for selected branch and filtered exams
  const allSubjects = [...new Set(examsForBranch.map((e) => e.subject))];

  // Filter exams by upcoming/completed/all and by subject
  const filteredExams = examsForBranch.filter((exam) => {
    const isUpcoming = exam.end >= now;
    if (filter === "upcoming" && !isUpcoming) return false;
    if (filter === "completed" && isUpcoming) return false;
    if (subjectFilter && exam.subject !== subjectFilter) return false;
    return true;
  });

  // Events for react-big-calendar
  const events = filteredExams.map((exam) => ({
    id: exam.id,
    title: exam.subject,
    start: exam.start,
    end: exam.end,
    resource: exam,
  }));

  // Export calendar events as iCal (.ics)
  const handleExportICal = () => {
    let ical = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Student Exam Schedule//EN\n`;
    filteredExams.forEach((exam) => {
      ical +=
        `BEGIN:VEVENT\n` +
        `UID:${exam.id}@exam-schedule\n` +
        `DTSTAMP:${moment().utc().format("YYYYMMDDTHHmmss")}Z\n` +
        `DTSTART:${moment(exam.start).utc().format("YYYYMMDDTHHmmss")}Z\n` +
        `DTEND:${moment(exam.end).utc().format("YYYYMMDDTHHmmss")}Z\n` +
        `SUMMARY:${exam.subject} Exam\n` +
        `DESCRIPTION:Mode: ${exam.mode}${exam.mode === "Offline" ? `; Venue: ${exam.venue ?? "TBD"}` : ""}\n` +
        `END:VEVENT\n`;
    });
    ical += `END:VCALENDAR`;

    const blob = new Blob([ical], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${branchFilter}_exam_schedule.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Event styling by subject color
  const eventStyleGetter = (event: any) => {
    const color = subjectColors[event.title] || "#6b7280";
    const style = {
      borderLeft: `6px solid ${color}`,
      backgroundColor: "#f9fafb",
      color: "#111827",
      paddingLeft: "8px",
      borderRadius: "4px",
      fontWeight: "600",
    };
    return { style };
  };

  // Tooltip content for events
  const EventTooltip = ({ event }: { event: any }) => {
    const exam: Exam = event.resource;
    return (
      <div className="p-2 text-xs bg-white border rounded shadow-lg max-w-xs pointer-events-none">
        <p><strong>Subject:</strong> {exam.subject}</p>
        <p>
          <strong>Duration:</strong>{" "}
          {moment(exam.start).format("MMM D, h:mm A")} - {moment(exam.end).format("h:mm A")}
        </p>
        <p><strong>Mode:</strong> {exam.mode}</p>
        {exam.mode === "Offline" && <p><strong>Venue:</strong> {exam.venue}</p>}
        <p><strong>Semester:</strong> {exam.semester}</p>
      </div>
    );
  };

  // Tooltip state & handlers
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number; y: number } | null>(null);
  const [tooltipEvent, setTooltipEvent] = React.useState<any>(null);

  const handleEventMouseEnter = (event: any, e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX + 12, y: e.clientY + 10 });
    setTooltipEvent(event);
  };
  const handleEventMouseLeave = () => {
    setTooltipPos(null);
    setTooltipEvent(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 font-sans">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">Exam Schedule</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">

        {/* Branch Selector */}
        <select
          className="rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={branchFilter}
          onChange={(e) => {
            setBranchFilter(e.target.value);
            setSubjectFilter(""); // reset subject filter when branch changes
          }}
          aria-label="Filter exams by branch"
        >
          <option value="CSE">Computer Science (CSE)</option>
          {/* Add other branches as needed */}
        </select>

        {/* View Selector */}
        <ViewSelector view={view} onChange={setView} />

        {/* Filter: Upcoming / Completed / All */}
        <select
          className="rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterType)}
          aria-label="Filter exams by status"
        >
          <option value="all">All Exams</option>
          <option value="upcoming">Upcoming Exams</option>
          <option value="completed">Completed Exams</option>
        </select>

        {/* Subject Filter */}
        <select
          className="rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          aria-label="Filter exams by subject"
          disabled={allSubjects.length === 0}
        >
          <option value="">All Subjects</option>
          {allSubjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Export Button */}
        <button
          onClick={handleExportICal}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
          aria-label="Export exam schedule calendar file"
          type="button"
        >
          Export Schedule
        </button>
      </div>

      {/* Calendar */}
      <div style={{ height: 600, position: "relative" }} className="rounded-lg shadow">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          eventPropGetter={eventStyleGetter}
          views={["month", "week", "agenda"]}
          defaultView={view}
          onView={setView}
          components={{
            event: ({ event }) => (
              <div
                onMouseEnter={(e) => handleEventMouseEnter(event, e)}
                onMouseLeave={handleEventMouseLeave}
                className="cursor-pointer truncate"
                title={event.title}
              >
                {event.title}
              </div>
            ),
          }}
        />
        {/* Tooltip */}
        {tooltipPos && tooltipEvent && (
          <div
            style={{
              position: "fixed",
              top: tooltipPos.y,
              left: tooltipPos.x,
              zIndex: 1000,
            }}
          >
            <EventTooltip event={tooltipEvent} />
          </div>
        )}
      </div>
    </div>
  );
}

type FilterType = "all" | "upcoming" | "completed";

function ViewSelector({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  return (
    <div className="flex items-center space-x-3">
      {(["month", "week", "agenda"] as const).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-4 py-2 rounded ${
            view === v
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
          aria-pressed={view === v}
          aria-label={`Switch to ${v} view`}
          type="button"
        >
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  );
}
