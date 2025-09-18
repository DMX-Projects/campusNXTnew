 import React, { useState } from "react";
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
import { Search, Filter, CheckCircle, XCircle } from "lucide-react";

interface Student {
  id: number;
  name: string;
  regNo: string;
  course: string;
  year: number;
  status: "Pending" | "Approved" | "Rejected";
}

const dummyStudents: Student[] = [
  { id: 1, name: "Rohit Sharma", regNo: "2021CS001", course: "B.Tech CSE", year: 3, status: "Pending" },
  { id: 2, name: "Ananya Gupta", regNo: "2021CS002", course: "B.Tech IT", year: 2, status: "Approved" },
  { id: 3, name: "Vikram Singh", regNo: "2021CS003", course: "B.Sc Physics", year: 1, status: "Rejected" },
  { id: 4, name: "Priya Patel", regNo: "2021CS004", course: "MBA", year: 1, status: "Pending" },
  { id: 5, name: "Arjun Mehta", regNo: "2021CS005", course: "B.Tech ECE", year: 4, status: "Approved" },
];

const statusColors: Record<string, string> = {
  Approved: "#4caf50",
  Pending: "#ff9800",
  Rejected: "#f44336",
};

export default function StudentAppruval() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [students, setStudents] = useState<Student[]>(dummyStudents);

  const handleStatusChange = (id: number, status: "Approved" | "Rejected") => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      (filter === "All" || student.status === filter) &&
      (student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.regNo.toLowerCase().includes(search.toLowerCase()))
  );

  const statusData = [
    { name: "Approved", value: students.filter((s) => s.status === "Approved").length },
    { name: "Pending", value: students.filter((s) => s.status === "Pending").length },
    { name: "Rejected", value: students.filter((s) => s.status === "Rejected").length },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Student Approval Dashboard</h1>

      {/* Controls */}
      <div className="flex gap-4">
        <div className="flex items-center border rounded p-2 flex-1">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search students..."
            className="outline-none flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border rounded p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-3">Student Approvals</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Reg No</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="p-2 border">{student.regNo}</td>
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.course}</td>
                <td className="p-2 border">{student.year}</td>
                <td
                  className="p-2 border font-semibold"
                  style={{ color: statusColors[student.status] }}
                >
                  {student.status}
                </td>
                <td className="p-2 border flex justify-center gap-2">
                  <button
                    className="text-green-600"
                    onClick={() => handleStatusChange(student.id, "Approved")}
                  >
                    <CheckCircle />
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleStatusChange(student.id, "Rejected")}
                  >
                    <XCircle />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Approval Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={100}>
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={statusColors[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Approval Status Count</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
