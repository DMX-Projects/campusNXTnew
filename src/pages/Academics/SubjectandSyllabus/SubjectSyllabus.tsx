 import React, { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  FileText,
  BarChart3,
  Filter,
} from "lucide-react";
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
} from "recharts";

// ---------------- TYPES ----------------
interface Subject {
  id: number;
  subjectCode: string;
  subjectName: string;
  semester: number;
  branch: string;
  credits: number;
  syllabus: string;
}

// ---------------- DUMMY DATA ----------------
const dummySubjects: Subject[] = [
  {
    id: 1,
    subjectCode: "CS101",
    subjectName: "Data Structures",
    semester: 3,
    branch: "CSE",
    credits: 4,
    syllabus: "Stacks, Queues, Linked Lists, Trees, Graphs",
  },
  {
    id: 2,
    subjectCode: "CS102",
    subjectName: "Database Management Systems",
    semester: 4,
    branch: "CSE",
    credits: 3,
    syllabus: "ER Model, SQL, Transactions, Indexing",
  },
  {
    id: 3,
    subjectCode: "EE101",
    subjectName: "Circuit Theory",
    semester: 2,
    branch: "EEE",
    credits: 4,
    syllabus: "Ohm’s Law, Kirchhoff’s Law, Network Theorems",
  },
  {
    id: 4,
    subjectCode: "ME101",
    subjectName: "Thermodynamics",
    semester: 3,
    branch: "ME",
    credits: 3,
    syllabus: "Laws of Thermodynamics, Entropy, Heat Engines",
  },
  {
    id: 5,
    subjectCode: "MA201",
    subjectName: "Engineering Mathematics",
    semester: 1,
    branch: "ALL",
    credits: 4,
    syllabus: "Calculus, Matrices, Probability, Linear Algebra",
  },
];

// ---------------- COMPONENT ----------------
const SubjectsAndSyllabus: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  // ---------------- SEARCH + PAGINATION ----------------
  const filteredSubjects = useMemo(() => {
    return dummySubjects.filter(
      (s) =>
        s.subjectCode.toLowerCase().includes(search.toLowerCase()) ||
        s.subjectName.toLowerCase().includes(search.toLowerCase()) ||
        s.branch.toLowerCase().includes(search.toLowerCase()) ||
        s.syllabus.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const paginatedSubjects = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredSubjects.slice(start, start + itemsPerPage);
  }, [page, filteredSubjects]);

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);

  // ---------------- ANALYTICS DATA ----------------
  const creditsByBranch = useMemo(() => {
    const grouped: Record<string, number> = {};
    dummySubjects.forEach((s) => {
      grouped[s.branch] = (grouped[s.branch] || 0) + s.credits;
    });
    return Object.keys(grouped).map((branch) => ({
      branch,
      credits: grouped[branch],
    }));
  }, []);

  const subjectsBySemester = useMemo(() => {
    const grouped: Record<number, number> = {};
    dummySubjects.forEach((s) => {
      grouped[s.semester] = (grouped[s.semester] || 0) + 1;
    });
    return Object.keys(grouped).map((sem) => ({
      semester: `Sem ${sem}`,
      subjects: grouped[parseInt(sem)],
    }));
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c"];

  // ---------------- UI ----------------
  return (
    <div className="p-6 space-y-8">
      {/* HEADER
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <BookOpen className="text-blue-600" /> Subjects & Syllabus
      </h1> */}

      {/* SEARCH BAR */}
      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-96">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by subject, code, syllabus..."
          className="outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Code</th>
              <th className="p-3 border">Subject Name</th>
              <th className="p-3 border">Semester</th>
              <th className="p-3 border">Branch</th>
              <th className="p-3 border">Credits</th>
              <th className="p-3 border">Syllabus</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSubjects.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-3 border">{s.subjectCode}</td>
                <td className="p-3 border">{s.subjectName}</td>
                <td className="p-3 border">{s.semester}</td>
                <td className="p-3 border">{s.branch}</td>
                <td className="p-3 border">{s.credits}</td>
                <td className="p-3 border text-sm">{s.syllabus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <p>
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* ANALYTICS */}
      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <BarChart3 className="text-green-600" /> Analytics
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="h-64 border rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Subjects per Semester</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectsBySemester}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="subjects" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="h-64 border rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Credits by Branch</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={creditsByBranch}
                  dataKey="credits"
                  nameKey="branch"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {creditsByBranch.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectsAndSyllabus;
