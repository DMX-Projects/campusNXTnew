import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  FileText,
  Users,
  BarChart2,
  BookOpen,
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

interface StudentProject {
  id: number;
  title: string;
  studentName: string;
  regNo: string;
  supervisor: string;
  domain: string;
  status: "Completed" | "Ongoing" | "Pending";
  grade: string;
}

const dummyProjects: StudentProject[] = [
  {
    id: 1,
    title: "AI-based Chatbot",
    studentName: "Aman Sharma",
    regNo: "2021CSE001",
    supervisor: "Dr. Mehta",
    domain: "Artificial Intelligence",
    status: "Completed",
    grade: "A",
  },
  {
    id: 2,
    title: "ERP System Development",
    studentName: "Priya Verma",
    regNo: "2021CSE002",
    supervisor: "Prof. Rao",
    domain: "Web Development",
    status: "Ongoing",
    grade: "B+",
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    studentName: "Ravi Kumar",
    regNo: "2021CSE003",
    supervisor: "Dr. Iyer",
    domain: "Blockchain",
    status: "Pending",
    grade: "N/A",
  },
  {
    id: 4,
    title: "Data Analytics Dashboard",
    studentName: "Sneha Gupta",
    regNo: "2021CSE004",
    supervisor: "Dr. Sharma",
    domain: "Data Science",
    status: "Completed",
    grade: "A+",
  },
  {
    id: 5,
    title: "IoT Smart Home",
    studentName: "Aditya Singh",
    regNo: "2021CSE005",
    supervisor: "Prof. Nair",
    domain: "IoT",
    status: "Ongoing",
    grade: "B",
  },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function StudentProjectsERP() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return dummyProjects.filter(
      (proj) =>
        (filter === "All" || proj.status === filter) &&
        (proj.studentName.toLowerCase().includes(search.toLowerCase()) ||
          proj.title.toLowerCase().includes(search.toLowerCase()) ||
          proj.domain.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, filter]);

  // Stats for charts
  const statusData = [
    {
      name: "Completed",
      value: dummyProjects.filter((p) => p.status === "Completed").length,
    },
    {
      name: "Ongoing",
      value: dummyProjects.filter((p) => p.status === "Ongoing").length,
    },
    {
      name: "Pending",
      value: dummyProjects.filter((p) => p.status === "Pending").length,
    },
  ];

  const domainData = dummyProjects.reduce((acc: any[], curr) => {
    const found = acc.find((a) => a.name === curr.domain);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: curr.domain, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Header
      <div className="flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">ERP - Student Projects</h1>
      </div> */}

      {/* Search + Filter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-lg px-3 py-2 w-1/2">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search projects by title, student, or domain..."
            className="outline-none flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <Filter className="w-4 h-4 text-gray-500 mr-2" />
          <select
            className="outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Reg No</th>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Project Title</th>
              <th className="px-4 py-2">Supervisor</th>
              <th className="px-4 py-2">Domain</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((proj) => (
              <tr key={proj.id} className="border-t">
                <td className="px-4 py-2">{proj.regNo}</td>
                <td className="px-4 py-2">{proj.studentName}</td>
                <td className="px-4 py-2">{proj.title}</td>
                <td className="px-4 py-2">{proj.supervisor}</td>
                <td className="px-4 py-2">{proj.domain}</td>
                <td className="px-4 py-2">{proj.status}</td>
                <td className="px-4 py-2">{proj.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Pie Chart */}
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Project Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Domain Bar Chart */}
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            Projects by Domain
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={domainData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
