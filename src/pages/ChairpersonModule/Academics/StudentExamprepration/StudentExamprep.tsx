import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Search,
  BookOpen,
  FileText,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";

interface Preparation {
  id: number;
  subject: string;
  syllabusCompletion: number; // %
  difficulty: "Easy" | "Medium" | "Hard";
  studyHours: number;
  tips: string;
}

const preparationData: Preparation[] = [
  {
    id: 1,
    subject: "Data Structures",
    syllabusCompletion: 70,
    difficulty: "Medium",
    studyHours: 45,
    tips: "Revise trees and graphs daily.",
  },
  {
    id: 2,
    subject: "Computer Networks",
    syllabusCompletion: 50,
    difficulty: "Hard",
    studyHours: 30,
    tips: "Focus on subnetting & OSI layers.",
  },
  {
    id: 3,
    subject: "DBMS",
    syllabusCompletion: 80,
    difficulty: "Easy",
    studyHours: 20,
    tips: "Practice SQL queries daily.",
  },
  {
    id: 4,
    subject: "Operating System",
    syllabusCompletion: 40,
    difficulty: "Hard",
    studyHours: 25,
    tips: "Focus on deadlocks & memory mgmt.",
  },
  {
    id: 5,
    subject: "Machine Learning",
    syllabusCompletion: 60,
    difficulty: "Medium",
    studyHours: 35,
    tips: "Revise regression & classification.",
  },
];

const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"];

export default function ExamPreparationERP() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  const filteredData = useMemo(() => {
    return preparationData.filter(
      (p) =>
        p.subject.toLowerCase().includes(search.toLowerCase()) &&
        (difficulty === "All" || p.difficulty === difficulty)
    );
  }, [search, difficulty]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="text-blue-600" /> Exam Preparation - ERP
      </h1> */}

      {/* Search & Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search subject..."
            className="outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Preparation Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredData.map((prep) => (
          <div
            key={prep.id}
            className="bg-white p-5 rounded-xl shadow-md border"
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <FileText className="text-green-600" /> {prep.subject}
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Difficulty:</strong>{" "}
              <span
                className={`${
                  prep.difficulty === "Hard"
                    ? "text-red-600"
                    : prep.difficulty === "Medium"
                    ? "text-orange-600"
                    : "text-green-600"
                } font-semibold`}
              >
                {prep.difficulty}
              </span>
            </p>
            <p className="text-gray-600 mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              Study Hours: {prep.studyHours}
            </p>
            <p className="text-gray-600 mb-2">
              <Target className="inline w-4 h-4 mr-1" />
              Syllabus Completion: {prep.syllabusCompletion}%
            </p>
            <p className="text-sm text-blue-700 italic">Tip: {prep.tips}</p>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="text-purple-600" /> Analytics
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Pie Chart - Syllabus Completion */}
        <div className="bg-white p-5 rounded-xl shadow-md border">
          <h3 className="text-lg font-semibold mb-3">Syllabus Completion %</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={preparationData}
                dataKey="syllabusCompletion"
                nameKey="subject"
                outerRadius={100}
                label
              >
                {preparationData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Study Hours */}
        <div className="bg-white p-5 rounded-xl shadow-md border">
          <h3 className="text-lg font-semibold mb-3">Study Hours by Subject</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={preparationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="studyHours" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Progress Trend */}
        <div className="bg-white p-5 rounded-xl shadow-md border">
          <h3 className="text-lg font-semibold mb-3">Preparation Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={preparationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="syllabusCompletion" stroke="#FF9800" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
