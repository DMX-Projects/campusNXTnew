import React, { useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";
import { Download } from "lucide-react";

const attendanceData = [
  { name: "Present", value: 85 },
  { name: "Absent", value: 10 },
  { name: "Late", value: 5 },
];
const attendanceColors = ["#22c55e", "#ef4444", "#facc15"]; // green, red, yellow

const examResultsData = [
  { subject: "Data Structures", marks: 85 },
  { subject: "Computer Networks", marks: 78 },
  { subject: "Algorithms", marks: 92 },
  { subject: "Databases", marks: 88 },
  { subject: "Operating Systems", marks: 80 },
];

const examEvaluationData = [
  { status: "Evaluations Completed", count: 120 },
  { status: "Evaluations Pending", count: 30 },
];

const quickStats = [
  { title: "Total Exams", value: 24 },
  { title: "Students Evaluated", value: 156 },
  { title: "Average Score", value: "78.5%" },
  { title: "Pass Rate", value: "91%" },
];

const recentActivities = [
  { color: "bg-blue-600", title: "Exam evaluation completed", subtitle: "Computer Networks - 2 hours ago" },
  { color: "bg-green-600", title: "Marks uploaded", subtitle: "Database Management - 6 hours ago" },
  { color: "bg-purple-600", title: "Syllabus updated", subtitle: "Software Engineering - 1 day ago" },
];

const notifications = [
  { id: 1, message: "Semester exams start from 10th October" },
  { id: 2, message: "New grading policy approved by academic council" },
  { id: 3, message: "Upcoming faculty meeting scheduled on 15th Sept" },
];

export default function FacultyDashboard() {
  const [exporting, setExporting] = useState(false);

  // Dummy export handler
  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert("Exported PDF successfully!");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 font-sans">

      {/* Quick Stats */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Faculty Dashboard</h1>
        <p className="text-gray-600 mb-6">Key insights and examination analysis</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {quickStats.map(({ title, value }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-lg shadow border border-gray-200 text-center"
            >
              <p className="text-4xl font-extrabold text-gray-800">{value}</p>
              <p className="mt-2 text-gray-700 font-semibold">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={handleExport}
          disabled={exporting}
          className={`bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Download className="h-4 w-4" />
          <span>{exporting ? "Exporting..." : "Export Report PDF"}</span>
        </button>
      </div>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Attendance Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Attendance Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={attendanceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={attendanceColors[index % attendanceColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Exam Results Bar Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Exam Results - Marks by Subject</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={examResultsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="marks" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Exam Evaluation Status Bar Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Exam Evaluation Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={examEvaluationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="status" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map(({ color, title, subtitle }) => (
            <ActivityItem key={title} color={color} title={title} subtitle={subtitle} />
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notifications</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {notifications.map(({ id, message }) => (
            <li key={id}>{message}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// Activity Item Component
function ActivityItem({ color, title, subtitle }) {
  return (
    <div className="flex items-start space-x-3">
      <div className={`${color} w-3 h-3 rounded-full mt-2`} />
      <div>
        <p className="text-sm text-gray-900 font-semibold">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
