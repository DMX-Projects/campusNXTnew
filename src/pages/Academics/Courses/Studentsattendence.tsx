import React, { useState } from "react";

interface Student {
  regNo: string;
  name: string;
  program: string;
  percentage: number;
}

const StudentAttendance: React.FC = () => {
  // Dummy Data
  const students: Student[] = [
    { regNo: "01027EE001", name: "Sandeep", program: "B.TECH CS", percentage: 76 },
    { regNo: "45688EE121", name: "Priya", program: "B.TECH CS", percentage: 67 },
    { regNo: "84193EE781", name: "Amit", program: "B.TECH CS", percentage: 81 },
    { regNo: "11082EE627", name: "Rahul", program: "B.TECH CS", percentage: 62 },
    { regNo: "56922EE521", name: "Amit", program: "B.TECH CS", percentage: 74 },
    { regNo: "91022EE555", name: "Neha", program: "B.TECH CS", percentage: 85 },
    { regNo: "22013EE444", name: "Ravi", program: "B.TECH CS", percentage: 59 },
    { regNo: "33045EE333", name: "Pooja", program: "B.TECH CS", percentage: 71 },
    { regNo: "44056EE222", name: "Karan", program: "B.TECH CS", percentage: 64 },
    { regNo: "55067EE111", name: "Simran", program: "B.TECH CS", percentage: 78 },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Filter students based on search
  const filteredStudents = students.filter(
    (student) =>
      student.regNo.toLowerCase().includes(search.toLowerCase()) ||
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.program.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">STUDENT ATTENDANCE</h2>

      {/* Search Box */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by Reg No, Name, Program"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg w-1/3 outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={() => setSearch("")}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg">
          <thead>
            <tr className="bg-purple-100 text-left">
              <th className="p-3 border">Reg No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Program</th>
              <th className="p-3 border">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((student, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-3 border">{student.regNo}</td>
                  <td className="p-3 border">{student.name}</td>
                  <td className="p-3 border">{student.program}</td>
                  <td className="p-3 border">{student.percentage}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-3">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          ◀
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded-lg ${
              currentPage === i + 1 ? "bg-purple-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default StudentAttendance;
