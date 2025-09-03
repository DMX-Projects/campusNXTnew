import React, { useState } from "react";
import { Edit, Check, X } from "lucide-react";

const branches = ["CSE", "EEE", "ME"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

const evaluationStatusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  inProgress: "bg-blue-100 text-blue-800",
};

interface SubjectEvaluation {
  id: string;
  code: string;
  name: string;
  branch: string;
  semester: string;
  examType: string;
  examDate: string;
  examTime: string;
  room: string;
  session: string;
  type: string;
  totalStudents: number;
  evaluationStatus: "pending" | "completed" | "inProgress";
  description?: string;
  maxMarks?: number;
  passMarks?: number;
}

const initialEvaluations: SubjectEvaluation[] = [
  {
    id: "IV001",
    code: "CS301",
    name: "Data Structures",
    branch: "CSE",
    semester: "1",
    examDate: "2025-09-10",
    examTime: "10:00 AM - 12:00 PM",
    room: "A201",
    session: "Mid Sem",
    type: "Midterm",
    totalStudents: 54,
    evaluationStatus: "pending",
    description: "Important mid-semester examination covering chapters 1-5.",
    maxMarks: 100,
    passMarks: 40,
  },
  {
    id: "IV002",
    code: "EE201",
    name: "Circuit Theory",
    branch: "EEE",
    semester: "2",
    examDate: "2025-09-20",
    examTime: "02:00 PM - 04:00 PM",
    room: "B102",
    session: "End Sem",
    type: "Semester",
    totalStudents: 45,
    evaluationStatus: "inProgress",
    description: "Comprehensive end semester exam covering theory and practice.",
    maxMarks: 100,
    passMarks: 40,
  },
  {
    id: "IV003",
    code: "ME101",
    name: "Thermodynamics",
    branch: "ME",
    semester: "3",
    examDate: "2025-09-15",
    examTime: "09:00 AM - 11:00 AM",
    room: "C305",
    session: "Mid Sem",
    type: "Midterm",
    totalStudents: 38,
    evaluationStatus: "completed",
    description: "Mid-term exam on thermodynamics fundamentals.",
    maxMarks: 100,
    passMarks: 40,
  },
];

const FacultyExamEvaluation: React.FC = () => {
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [selectedEval, setSelectedEval] = React.useState<SubjectEvaluation | null>(null);
  const [filters, setFilters] = React.useState({
    branch: "",
    semester: "",
  });
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredEvaluations = evaluations.filter((ev) => {
    if (filters.branch && ev.branch !== filters.branch) return false;
    if (filters.semester && ev.semester !== filters.semester) return false;
    if (
      searchTerm &&
      !(
        ev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
      return false;
    return true;
  });

  const openDetailsModal = (ev: SubjectEvaluation) => {
    setSelectedEval(ev);
  };

  const closeModal = () => {
    setSelectedEval(null);
  };

  const markComplete = (id: string) => {
    setEvaluations((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, evaluationStatus: "completed" } : ev
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Exam Evaluation</h1>
      <p className="text-gray-700 mb-6">
        List of subjects assigned for evaluation. Filter by branch and semester.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <select
          value={filters.branch}
          onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          className="border rounded p-2"
          aria-label="Filter by Branch"
        >
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={filters.semester}
          onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
          className="border rounded p-2"
          aria-label="Filter by Semester"
        >
          <option value="">All Semesters</option>
          {semesters.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by subject or code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 flex-1 max-w-xl"
          aria-label="Search subjects"
        />
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">Subject Code</th>
              <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">Subject Name</th>
              <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">Branch</th>
              <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">Semester</th>
              <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">Exam Date</th>
              <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">Exam Time</th>
              <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">Session</th>
              <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">Type</th>
              <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">Total Students</th>
              <th className="p-3 text-left font-semibold text-gray-700 whitespace-nowrap">Status</th>
              <th className="p-3 text-center font-semibold text-gray-700 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredEvaluations.length === 0 ? (
              <tr>
                <td colSpan={11} className="p-6 text-center text-gray-500 italic whitespace-nowrap">
                  No subjects found.
                </td>
              </tr>
            ) : (
              filteredEvaluations.map((ev) => (
                <tr key={ev.id} className="hover:bg-gray-50">
                  <td className="p-3 whitespace-nowrap">{ev.code}</td>
                  <td className="p-3 whitespace-nowrap">{ev.name}</td>
                  <td className="p-3 whitespace-nowrap">{ev.branch}</td>
                  <td className="p-3 whitespace-nowrap">{ev.semester}</td>
                  <td className="p-3 whitespace-nowrap">{ev.examDate}</td>
                  <td className="p-3 whitespace-nowrap">{ev.examTime}</td>
                  <td className="p-3 whitespace-nowrap">{ev.session}</td>
                  <td className="p-3 whitespace-nowrap">{ev.type}</td>
                  <td className="p-3 whitespace-nowrap">{ev.totalStudents}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${evaluationStatusColors[ev.evaluationStatus]}`}>
                      {ev.evaluationStatus.charAt(0).toUpperCase() + ev.evaluationStatus.slice(1)}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap text-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                      onClick={() => openDetailsModal(ev)}
                      aria-label={`View details of ${ev.name}`}
                    >
                      View
                    </button>
                    {ev.evaluationStatus !== "completed" && (
                      <button
                        className="text-green-600 hover:text-green-800 font-semibold"
                        onClick={() => markComplete(ev.id)}
                        aria-label={`Mark ${ev.name} as completed`}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for details */}
      {selectedEval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh]">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Evaluation Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Close details modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="px-6 py-4 text-gray-900">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <dt className="text-sm font-medium">Subject Name</dt>
                <dd>{selectedEval.name}</dd>

                <dt className="text-sm font-medium">Subject Code</dt>
                <dd>{selectedEval.code}</dd>

                <dt className="text-sm font-medium">Branch</dt>
                <dd>{selectedEval.branch}</dd>

                <dt className="text-sm font-medium">Semester</dt>
                <dd>{selectedEval.semester}</dd>

                <dt className="text-sm font-medium">Exam Date</dt>
                <dd>{selectedEval.examDate}</dd>

                <dt className="text-sm font-medium">Exam Time</dt>
                <dd>{selectedEval.examTime}</dd>

                <dt className="text-sm font-medium">Session</dt>
                <dd>{selectedEval.session}</dd>

                <dt className="text-sm font-medium">Type</dt>
                <dd>{selectedEval.type}</dd>

                <dt className="text-sm font-medium">Total Students</dt>
                <dd>{selectedEval.totalStudents}</dd>

                <dt className="text-sm font-medium">Status</dt>
                <dd>{selectedEval.evaluationStatus}</dd>

                <dt className="text-sm font-medium">Description</dt>
                <dd>{selectedEval.description ?? "N/A"}</dd>

                <dt className="text-sm font-medium">Maximum Marks</dt>
                <dd>{selectedEval.maxMarks ?? "N/A"}</dd>

                <dt className="text-sm font-medium">Pass Marks</dt>
                <dd>{selectedEval.passMarks ?? "N/A"}</dd>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyExamEvaluation;
