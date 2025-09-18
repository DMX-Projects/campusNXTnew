// pages/AssessmentTest.tsx
import React, { useState } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClipboardDocumentListIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

const AssessmentTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tests");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState<null | "create" | "view" | "edit" | "delete">(null);
  const [selectedTest, setSelectedTest] = useState<any | null>(null);

  // Stats
  const stats = [
    { name: "Total Tests", value: "24", icon: AcademicCapIcon, color: "bg-blue-500" },
    { name: "Active Tests", value: "8", icon: ChartBarIcon, color: "bg-green-500" },
    { name: "Students Enrolled", value: "342", icon: UserGroupIcon, color: "bg-purple-500" },
    { name: "Avg Score", value: "76%", icon: ChartBarIcon, color: "bg-yellow-500" },
  ];

  // Tests
  const tests = [
    {
      id: 1,
      title: "TCS Aptitude Test 2025",
      description: "Quantitative aptitude and logical reasoning",
      duration: 60,
      questions: 30,
      status: "Active",
      enrolled: 45,
      completed: 32,
      avgScore: 78,
      startDate: "2025-09-05",
      endDate: "2025-09-10",
      company: "TCS",
    },
    {
      id: 2,
      title: "Infosys Technical Assessment",
      description: "Programming and technical skills assessment",
      duration: 90,
      questions: 25,
      status: "Scheduled",
      enrolled: 67,
      completed: 0,
      avgScore: 0,
      startDate: "2025-09-12",
      endDate: "2025-09-15",
      company: "Infosys",
    },
    {
      id: 3,
      title: "Wipro Coding Challenge",
      description: "Hands-on coding and problem solving",
      duration: 120,
      questions: 5,
      status: "Completed",
      enrolled: 88,
      completed: 85,
      avgScore: 82,
      startDate: "2025-08-20",
      endDate: "2025-08-22",
      company: "Wipro",
    },
  ];

  // Question Bank
  const questions = [
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      type: "MCQ",
      difficulty: "Easy",
      topic: "Algorithms",
    },
    {
      id: 2,
      question: "Write a function to reverse a linked list.",
      type: "Coding",
      difficulty: "Medium",
      topic: "Data Structures",
    },
    {
      id: 3,
      question: "What is normalization in DBMS?",
      type: "Short Answer",
      difficulty: "Easy",
      topic: "Databases",
    },
  ];

  // Results
  const results = [
    {
      id: 1,
      student: "Rahul Sharma",
      test: "TCS Aptitude Test 2025",
      score: 82,
      status: "Passed",
      rank: 5,
    },
    {
      id: 2,
      student: "Priya Singh",
      test: "Infosys Technical Assessment",
      score: 0,
      status: "Pending",
      rank: "-",
    },
    {
      id: 3,
      student: "Arjun Mehta",
      test: "Wipro Coding Challenge",
      score: 76,
      status: "Passed",
      rank: 12,
    },
  ];

  const filteredTests = tests.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColor = (status: string) =>
    status === "Active"
      ? "bg-green-100 text-green-800"
      : status === "Scheduled"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";

  // Modal renderer
  const renderModal = () => {
    if (!modalType) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-lg shadow">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold capitalize">
              {modalType} {modalType !== "create" && "Test"}
            </h2>
            <button onClick={() => setModalType(null)} className="text-gray-500">✕</button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {modalType === "create" && (
              <>
                <input className="w-full border px-3 py-2 rounded" placeholder="Test Title" />
                <textarea className="w-full border px-3 py-2 rounded" placeholder="Description" />
              </>
            )}

            {modalType === "view" && selectedTest && (
              <>
                <p><strong>Title:</strong> {selectedTest.title}</p>
                <p><strong>Description:</strong> {selectedTest.description}</p>
                <p><strong>Company:</strong> {selectedTest.company}</p>
                <p><strong>Status:</strong> {selectedTest.status}</p>
              </>
            )}

            {modalType === "edit" && selectedTest && (
              <>
                <input
                  defaultValue={selectedTest.title}
                  className="w-full border px-3 py-2 rounded"
                />
                <textarea
                  defaultValue={selectedTest.description}
                  className="w-full border px-3 py-2 rounded"
                />
              </>
            )}

            {modalType === "delete" && selectedTest && (
              <p>Are you sure you want to delete <strong>{selectedTest.title}</strong>?</p>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t flex gap-2">
            <button
              onClick={() => setModalType(null)}
              className="flex-1 bg-gray-200 py-2 rounded"
            >
              Cancel
            </button>
            <button
              className={`flex-1 py-2 rounded text-white ${
                modalType === "delete" ? "bg-red-600" : "bg-indigo-600"
              }`}
            >
              {modalType === "delete" ? "Delete" : "Save"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Assessment Tests</h1>
        <button
          onClick={() => setModalType("create")}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" /> Create Test
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.name} className="bg-white p-4 border rounded flex items-center gap-3">
            <s.icon className={`${s.color} text-white w-8 h-8 p-1 rounded`} />
            <div>
              <p className="text-sm text-gray-600">{s.name}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white border rounded">
        <nav className="flex gap-6 border-b px-6">
          {["tests", "questions", "results"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 capitalize ${
                activeTab === tab ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"
              }`}
            >
              {tab === "questions" ? "Question Bank" : tab}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="p-6">
          {/* Tests */}
          {activeTab === "tests" && (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 border rounded px-3 py-2"
                />
              </div>

              {/* Tests */}
              <div className="grid gap-4 md:grid-cols-2">
                {filteredTests.map((t) => (
                  <div key={t.id} className="border rounded p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{t.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded ${statusColor(t.status)}`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{t.description}</p>
                    <p className="text-xs text-gray-500 mb-3">
                      {t.startDate} → {t.endDate}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedTest(t);
                          setModalType("view");
                        }}
                        className="flex-1 bg-indigo-50 text-indigo-600 py-1 rounded flex items-center justify-center text-sm"
                      >
                        <EyeIcon className="w-4 h-4 mr-1" /> View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTest(t);
                          setModalType("edit");
                        }}
                        className="flex-1 bg-gray-50 text-gray-600 py-1 rounded flex items-center justify-center text-sm"
                      >
                        <PencilIcon className="w-4 h-4 mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTest(t);
                          setModalType("delete");
                        }}
                        className="bg-red-50 text-red-600 px-2 rounded flex items-center justify-center"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question Bank */}
          {activeTab === "questions" && (
            <div className="grid gap-4">
              {questions.map((q) => (
                <div key={q.id} className="p-4 border rounded bg-gray-50">
                  <p className="font-medium">{q.question}</p>
                  <p className="text-sm text-gray-500">
                    {q.type} • {q.difficulty} • {q.topic}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {activeTab === "results" && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border">Student</th>
                    <th className="p-2 border">Test</th>
                    <th className="p-2 border">Score</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{r.student}</td>
                      <td className="p-2 border">{r.test}</td>
                      <td className="p-2 border">{r.score}</td>
                      <td
                        className={`p-2 border font-medium ${
                          r.status === "Passed"
                            ? "text-green-600"
                            : r.status === "Failed"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {r.status}
                      </td>
                      <td className="p-2 border">{r.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {renderModal()}
    </div>
  );
};

export default AssessmentTest;
