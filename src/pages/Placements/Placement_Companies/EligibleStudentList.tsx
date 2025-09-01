import React, { useState } from "react";
import { Search, Eye } from "lucide-react";
import Modal from "../../LMS/Components/common/Modal";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  branch: string;
  cgpa: number;
  skills: string[];
  status: "Eligible" | "Shortlisted" | "Placed";
  email?: string;
  phone?: string;
  profilePic?: string;
  tenthPercent?: number; // 10th %
  twelfthPercent?: number; // 12th %
  previousPlacements?: { company: string; role: string; year: number }[];
}
const mockStudents: Student[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    rollNo: "20CS001",
    branch: "CSE",
    cgpa: 8.9,
    skills: ["Java", "React", "DSA"],
    status: "Eligible",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    tenthPercent: 92,
    twelfthPercent: 89,
    previousPlacements: [
      { company: "TCS", role: "Intern", year: 2023 },
      { company: "Infosys", role: "Intern", year: 2022 },
    ],
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNo: "20IT014",
    branch: "IT",
    cgpa: 9.2,
    skills: ["Python", "Django", "ML"],
    status: "Shortlisted",
    email: "priya.patel@example.com",
    phone: "+91 9876501234",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    tenthPercent: 95,
    twelfthPercent: 93,
    previousPlacements: [{ company: "Google", role: "Intern", year: 2023 }],
  },
  {
    id: 3,
    name: "Arjun Reddy",
    rollNo: "20ME030",
    branch: "Mechanical",
    cgpa: 8.1,
    skills: ["AutoCAD", "MATLAB"],
    status: "Eligible",
    email: "arjun.reddy@example.com",
    phone: "+91 9876512345",
    profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
    tenthPercent: 88,
    twelfthPercent: 85,
    previousPlacements: [],
  },
  {
    id: 4,
    name: "Sneha Verma",
    rollNo: "20EC022",
    branch: "ECE",
    cgpa: 9.0,
    skills: ["VLSI", "Verilog", "Python"],
    status: "Placed",
    email: "sneha.verma@example.com",
    phone: "+91 9876523456",
    profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
    tenthPercent: 91,
    twelfthPercent: 90,
    previousPlacements: [
      { company: "Qualcomm", role: "Intern", year: 2023 },
      { company: "Intel", role: "Research Intern", year: 2022 },
    ],
  },
  {
    id: 5,
    name: "Ravi Kumar",
    rollNo: "20EE017",
    branch: "Electrical",
    cgpa: 7.8,
    skills: ["Power Systems", "MATLAB", "C++"],
    status: "Eligible",
    email: "ravi.kumar@example.com",
    phone: "+91 9876534567",
    profilePic: "https://randomuser.me/api/portraits/men/52.jpg",
    tenthPercent: 85,
    twelfthPercent: 82,
    previousPlacements: [],
  },
  {
    id: 6,
    name: "Ayesha Khan",
    rollNo: "20CS025",
    branch: "CSE",
    cgpa: 9.5,
    skills: ["AI", "Deep Learning", "TensorFlow", "Python"],
    status: "Shortlisted",
    email: "ayesha.khan@example.com",
    phone: "+91 9876547890",
    profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
    tenthPercent: 96,
    twelfthPercent: 94,
    previousPlacements: [
      { company: "Microsoft", role: "Intern", year: 2023 },
      { company: "Amazon", role: "Research Intern", year: 2022 },
    ],
  },
  {
    id: 7,
    name: "Karan Mehta",
    rollNo: "20CE040",
    branch: "Civil",
    cgpa: 8.2,
    skills: ["AutoCAD", "STAAD Pro", "Revit"],
    status: "Eligible",
    email: "karan.mehta@example.com",
    phone: "+91 9876549870",
    profilePic: "https://randomuser.me/api/portraits/men/70.jpg",
    tenthPercent: 87,
    twelfthPercent: 84,
    previousPlacements: [{ company: "L&T", role: "Intern", year: 2022 }],
  },
  {
    id: 8,
    name: "Neha Gupta",
    rollNo: "20IT055",
    branch: "IT",
    cgpa: 8.7,
    skills: ["JavaScript", "React", "Node.js"],
    status: "Placed",
    email: "neha.gupta@example.com",
    phone: "+91 9876598765",
    profilePic: "https://randomuser.me/api/portraits/women/15.jpg",
    tenthPercent: 93,
    twelfthPercent: 91,
    previousPlacements: [
      { company: "Accenture", role: "Intern", year: 2023 },
      { company: "Wipro", role: "Intern", year: 2022 },
    ],
  },
];


const EligibleStudentList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStudents = mockStudents.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || s.status === filter;
    return matchSearch && matchFilter;
  });

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          🎓 Eligible Student List
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or roll no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 w-full sm:w-72 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="All">All</option>
            <option value="Eligible">Eligible</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Placed">Placed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-xl border overflow-x-auto">
        {filteredStudents.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No students found 🚫
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Roll No</th>
                <th className="px-6 py-3 font-medium">Branch</th>
                <th className="px-6 py-3 font-medium">CGPA</th>
                <th className="px-6 py-3 font-medium">Skills</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4">{student.rollNo}</td>
                  <td className="px-6 py-4">{student.branch}</td>
                  <td className="px-6 py-4">{student.cgpa}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {student.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        student.status === "Eligible"
                          ? "bg-green-100 text-green-700"
                          : student.status === "Shortlisted"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleView(student)}
                      className="inline-flex items-center px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Student Profile Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Student Profile" size="lg">
        {selectedStudent && (
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="flex items-center space-x-4">
              <img
                src={selectedStudent.profilePic}
                alt={selectedStudent.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                <p className="text-gray-600">{selectedStudent.email}</p>
                <p className="text-gray-600">{selectedStudent.phone}</p>
              </div>
            </div>

            {/* Academic Profile */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-1">
              <h3 className="font-semibold text-gray-800 mb-2">Academic Profile</h3>
              <p><span className="font-medium">Branch:</span> {selectedStudent.branch}</p>
              <p><span className="font-medium">CGPA:</span> {selectedStudent.cgpa}</p>
              <p><span className="font-medium">10th %:</span> {selectedStudent.tenthPercent}</p>
              <p><span className="font-medium">12th %:</span> {selectedStudent.twelfthPercent}</p>
              <p className="font-medium mt-2">Skills:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedStudent.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Previous Placements */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Previous Placements</h3>
              {selectedStudent.previousPlacements && selectedStudent.previousPlacements.length > 0 ? (
                <ul className="space-y-1">
                  {selectedStudent.previousPlacements.map((placement, idx) => (
                    <li key={idx} className="flex justify-between px-2 py-1 border rounded-lg">
                      <span>{placement.company}</span>
                      <span>{placement.role} - {placement.year}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No previous placements</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EligibleStudentList;
