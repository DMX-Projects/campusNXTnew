

import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  FileText,
  TrendingUp,
} from "lucide-react";
import {
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
} from "recharts";

interface StudyMaterial {
  id: number;
  subject: string;
  title: string;
  type: string; // Notes, Assignment, PPT, Book
  uploadedBy: string;
  uploadedOn: string;
  downloads: number;
  fileUrl: string; // 🔹 Added file URL
}

// Dummy data with file paths in public/files/
const studyMaterials: StudyMaterial[] = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Linear Algebra Notes",
    type: "Notes",
    uploadedBy: "Prof. Sharma",
    uploadedOn: "2024-07-01",
    downloads: 120,
    fileUrl: "/files/Linear_Algebra_Notes.pdf",
  },
  {
    id: 2,
    subject: "Physics",
    title: "Quantum Mechanics PPT",
    type: "PPT",
    uploadedBy: "Prof. Singh",
    uploadedOn: "2024-07-05",
    downloads: 95,
    fileUrl: "/files/Quantum_Mechanics_PPT.pdf",
  },
  {
    id: 3,
    subject: "Computer Science",
    title: "Data Structures Assignment",
    type: "Assignment",
    uploadedBy: "Dr. Verma",
    uploadedOn: "2024-07-08",
    downloads: 75,
    fileUrl: "/files/Data_Structures_Assignment.pdf",
  },
  {
    id: 4,
    subject: "English",
    title: "Poetry Analysis Book",
    type: "Book",
    uploadedBy: "Prof. Nair",
    uploadedOn: "2024-07-10",
    downloads: 60,
    fileUrl: "/files/Poetry_Analysis_Book.pdf",
  },
  {
    id: 5,
    subject: "Chemistry",
    title: "Organic Chemistry Notes",
    type: "Notes",
    uploadedBy: "Prof. Khan",
    uploadedOn: "2024-07-12",
    downloads: 110,
    fileUrl: "/files/Organic_Chemistry_Notes.pdf",
  },
];

export default function StudyMaterialPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Filtered data
  const filteredData = useMemo(() => {
    return studyMaterials.filter(
      (mat) =>
        (filterType === "All" || mat.type === filterType) &&
        (mat.subject.toLowerCase().includes(search.toLowerCase()) ||
          mat.title.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, filterType]);

  // Chart data
  const downloadTrend = studyMaterials.map((mat) => ({
    title: mat.title,
    downloads: mat.downloads,
  }));

  const materialTypeDistribution = [
    { name: "Notes", value: 2 },
    { name: "PPT", value: 1 },
    { name: "Assignment", value: 1 },
    { name: "Book", value: 1 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Download handler
  const handleDownload = (mat: StudyMaterial) => {
    const link = document.createElement("a");
    link.href = mat.fileUrl;
    link.download = mat.title.replace(/\s+/g, "_"); // filename suggestion
    link.click();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm w-1/3">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search study material..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border px-3 py-2 rounded-lg shadow-sm"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Notes">Notes</option>
          <option value="PPT">PPT</option>
          <option value="Assignment">Assignment</option>
          <option value="Book">Book</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Uploaded By</th>
              <th className="border px-4 py-2">Uploaded On</th>
              <th className="border px-4 py-2">Downloads</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((mat) => (
              <tr key={mat.id} className="text-center">
                <td className="border px-4 py-2">{mat.subject}</td>
                <td className="border px-4 py-2">{mat.title}</td>
                <td className="border px-4 py-2">{mat.type}</td>
                <td className="border px-4 py-2">{mat.uploadedBy}</td>
                <td className="border px-4 py-2">{mat.uploadedOn}</td>
                <td className="border px-4 py-2">{mat.downloads}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDownload(mat)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Download Trend */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" /> Download Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={downloadTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="downloads" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Material Type Distribution */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" /> Material Type Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={materialTypeDistribution}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {materialTypeDistribution.map((entry, index) => (
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
      </div>
    </div>
  );
}
