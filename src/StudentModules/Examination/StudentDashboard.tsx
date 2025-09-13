import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Exam = {
  subject: string;
  date: string; // ISO date string
  time: string; // e.g. "10:00 AM - 12:00 PM"
};

type Result = {
  subject: string;
  grade: string;
  status: "Passed" | "Pending" | "Failed";
};

type Notification = {
  id: number;
  type: "reminder" | "announcement";
  message: string;
  urgent?: boolean;
};

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Sample data
  const [nextExam, setNextExam] = useState<Exam>({
    subject: "Mathematics",
    date: "2025-09-05",
    time: "10:00 AM - 12:00 PM",
  });

  const [attendancePercent, setAttendancePercent] = useState<number>(86);

  const [latestResult, setLatestResult] = useState<Result>({
    subject: "Physics",
    grade: "B+",
    status: "Passed",
  });

  // Notifications - reminders and announcements
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: "reminder", message: "2 days left for Mathematics Midterm", urgent: false },
    { id: 2, type: "announcement", message: "Room changed for Chemistry Exam to Room 304", urgent: true },
    { id: 3, type: "reminder", message: "Submit your exam form by this Friday", urgent: false },
    { id: 4, type: "announcement", message: "Physics exam postponed to next month", urgent: true },
  ]);

  // Navigation handlers
  const handleViewSchedule = () => navigate('/examination/student-examtimetable');
  const handleCheckResults = () => navigate('/examination/student-examresult');
  const handleViewHallTicket = () => navigate('/examination/student-studenthallticket');
  const handleViewAttendance = () => navigate('/examination/student-examattendance');
  const handleRaiseTicket = () => navigate('/examination/student-raiseticket');

  // Color coding card background by status / percent urgency
  const getAttendanceColor = (percent: number) => {
    if (percent >= 90) return "bg-green-100 text-green-800";
    if (percent >= 75) return "bg-amber-100 text-amber-800";
    return "bg-red-100 text-red-800";
  };

  const getResultColor = (status: Result["status"]) => {
    switch (status) {
      case "Passed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 flex flex-col md:flex-row md:space-x-8">
      {/* Main Content: Cards */}
      <main className="flex-1 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Next Upcoming Exam */}
          <section className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Next Upcoming Exam</h2>
            <p className="text-xl font-bold text-gray-900">{nextExam.subject}</p>
            <p className="text-gray-600">{new Date(nextExam.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</p>
            <p className="text-gray-600">{nextExam.time}</p>
          </section>

          {/* Attendance Percentage */}
          <section className={`rounded-lg shadow p-6 border border-gray-200 flex flex-col justify-center ${getAttendanceColor(attendancePercent)}`}>
            <h2 className="text-lg font-semibold mb-3">Attendance Percentage</h2>
            <div className="relative w-full h-24 flex items-center justify-center">
              {/* Circle background */}
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-300"
                  fill="none"
                  strokeWidth="4"
                  stroke="currentColor"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-current"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="#22c55e"
                  strokeDasharray={`${attendancePercent}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold">{attendancePercent}%</span>
                <span className="text-xs text-gray-700">Attendance</span>
              </div>
            </div>
          </section>

          {/* Latest Exam Result */}
          <section className={`bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col justify-center ${getResultColor(latestResult.status)}`}>
            <h2 className="text-lg font-semibold mb-1">Latest Exam Result</h2>
            <p className="text-xl font-bold text-gray-900">{latestResult.subject}</p>
            <p className="text-gray-700">Grade: <span className="font-semibold">{latestResult.grade}</span></p>
            <p className="text-gray-800 mt-2 font-medium">{latestResult.status}</p>
          </section>
        </div>

        {/* Quick Access Buttons */}
        <section className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={handleViewSchedule}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left bg-blue-50 hover:bg-blue-100"
            >
              <h3 className="font-medium text-gray-800 mb-1">View Exam Schedule</h3>
              <p className="text-sm text-gray-600">Check upcoming exams and timings</p>
            </button>
            
            <button
              onClick={handleCheckResults}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left bg-green-50 hover:bg-green-100"
            >
              <h3 className="font-medium text-gray-800 mb-1">Check Results</h3>
              <p className="text-sm text-gray-600">View your exam results and grades</p>
            </button>
            
            <button
              onClick={handleViewHallTicket}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left bg-purple-50 hover:bg-purple-100"
            >
              <h3 className="font-medium text-gray-800 mb-1">Download Hall Ticket</h3>
              <p className="text-sm text-gray-600">Get your exam hall ticket</p>
            </button>
            
            <button
              onClick={handleViewAttendance}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left bg-yellow-50 hover:bg-yellow-100"
            >
              <h3 className="font-medium text-gray-800 mb-1">Exam Attendance</h3>
              <p className="text-sm text-gray-600">View your exam attendance record</p>
            </button>
            
            <button
              onClick={handleRaiseTicket}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left bg-red-50 hover:bg-red-100"
            >
              <h3 className="font-medium text-gray-800 mb-1">Raise Ticket</h3>
              <p className="text-sm text-gray-600">Report issues or request help</p>
            </button>
          </div>
        </section>
        
      </main>

      {/* Notifications Sidebar */}
      <aside className="mt-10 md:mt-0 md:w-80 bg-white rounded-lg shadow border border-gray-200 p-4 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications & Alerts</h2>
        <ul className="flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh_-_160px)]">
          {notifications.map(({ id, type, message, urgent }) => (
            <li
              key={id}
              className={`p-3 rounded border-l-4 ${
                urgent
                  ? "border-red-500 bg-red-50 text-red-800"
                  : type === "reminder"
                  ? "border-blue-500 bg-blue-50 text-blue-800"
                  : "border-gray-300 bg-gray-50 text-gray-800"
              }`}
              role="alert"
              aria-live="polite"
            >
              <strong className="block mb-1 capitalize font-semibold">{type}</strong>
              <p className="text-sm">{message}</p>
            </li>
          ))}
          {notifications.length === 0 && <li className="text-gray-500">No notifications at this time.</li>}
        </ul>
      </aside>
    </div>
  );
}
