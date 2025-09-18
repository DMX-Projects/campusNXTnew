import React, { useState } from "react";

const initialData = [
  {
    rollNo: "101",
    studentName: "John Doe",
    branchName: "Computer Science",
    subjectName: "Data Structures",
    marks: 85,
    semester: 3,
    termExam: "Midterm",
    grade: "A",
  },
  {
    rollNo: "102",
    studentName: "Jane Smith",
    branchName: "Information Technology",
    subjectName: "Computer Networks",
    marks: 78,
    semester: 3,
    termExam: "Midterm",
    grade: "B",
  },
  {
    rollNo: "103",
    studentName: "Sam Lee",
    branchName: "Computer Science",
    subjectName: "Mathematics",
    marks: 92,
    semester: 2,
    termExam: "Final",
    grade: "A+",
  },
  {
    rollNo: "104",
    studentName: "Alice Kim",
    branchName: "Information Technology",
    subjectName: "Data Structures",
    marks: 88,
    semester: 1,
    termExam: "Final",
    grade: "A",
  },
];

const branches = [...new Set(initialData.map((d) => d.branchName))];
const semesters = [...new Set(initialData.map((d) => d.semester))].sort((a, b) => a - b);
const subjects = [...new Set(initialData.map((d) => d.subjectName))];
const termExams = [...new Set(initialData.map((d) => d.termExam))];

function StudentMarksTable() {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({
    branchName: "",
    semester: "",
    subjectName: "",
    termExam: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    rollNo: "",
    studentName: "",
    branchName: "",
    subjectName: "",
    marks: "",
    semester: "",
    termExam: "",
    grade: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredData = data.filter((item) => {
    return (
      (filters.branchName === "" || item.branchName === filters.branchName) &&
      (filters.semester === "" || item.semester.toString() === filters.semester) &&
      (filters.subjectName === "" || item.subjectName === filters.subjectName) &&
      (filters.termExam === "" || item.termExam === filters.termExam)
    );
  });

  const startEdit = (index) => {
    setEditIndex(index);
    setEditForm({ ...data[index] });
  };

  const cancelEdit = () => {
    setEditIndex(null);
  };

  const saveEdit = () => {
    const updated = [...data];
    updated[editIndex] = { ...editForm, semester: Number(editForm.semester) };
    setData(updated);
    setEditIndex(null);
  };

  const deleteRow = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md font-sans">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Student Marks List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <div className="flex flex-col">
          <label htmlFor="branchFilter" className="mb-1 font-medium text-gray-700">Filter by Branch</label>
          <select
            id="branchFilter"
            name="branchName"
            value={filters.branchName}
            onChange={handleFilterChange}
            className="rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="semesterFilter" className="mb-1 font-medium text-gray-700">Filter by Semester</label>
          <select
            id="semesterFilter"
            name="semester"
            value={filters.semester}
            onChange={handleFilterChange}
            className="rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem.toString()}>{sem}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="subjectFilter" className="mb-1 font-medium text-gray-700">Filter by Subject</label>
          <select
            id="subjectFilter"
            name="subjectName"
            value={filters.subjectName}
            onChange={handleFilterChange}
            className="rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            {subjects.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="termExamFilter" className="mb-1 font-medium text-gray-700">Filter by Term Exam</label>
          <select
            id="termExamFilter"
            name="termExam"
            value={filters.termExam}
            onChange={handleFilterChange}
            className="rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            {termExams.map((term) => (
              <option key={term} value={term}>{term}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300 shadow-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Roll No</th>
            <th className="py-3 px-4 text-left">Student Name</th>
            <th className="py-3 px-4 text-left">Branch Name</th>
            <th className="py-3 px-4 text-left">Subject Name</th>
            <th className="py-3 px-4 text-left">Marks</th>
            <th className="py-3 px-4 text-left">Semester</th>
            <th className="py-3 px-4 text-left">Term Exam</th>
            <th className="py-3 px-4 text-left">Grade</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center py-6 text-gray-500 italic">No records found.</td>
            </tr>
          )}
          {filteredData.map((row, idx) =>
            editIndex === idx ? (
              <tr key={idx} className="bg-yellow-50">
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={editForm.rollNo}
                    onChange={(e) => setEditForm({ ...editForm, rollNo: e.target.value })}
                    className="w-full px-2 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={editForm.studentName}
                    onChange={(e) => setEditForm({ ...editForm, studentName: e.target.value })}
                    className="w-full px-2 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={editForm.branchName}
                    onChange={(e) => setEditForm({ ...editForm, branchName: e.target.value })}
                    className="w-full px-2 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={editForm.subjectName}
                    onChange={(e) => setEditForm({ ...editForm, subjectName: e.target.value })}
                    className="w-full px-2 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    value={editForm.marks}
                    onChange={(e) => setEditForm({ ...editForm, marks: e.target.value })}
                    className="w-full px-2 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    value={editForm.semester}
                    onChange={(e) => setEditForm({ ...editForm, semester: e.target.value })}
                    min="1"
                    max="8"
                    className="w-full px-2 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={editForm.termExam}
                    onChange={(e) => setEditForm({ ...editForm, termExam: e.target.value })}
                    className="w-full px-2 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={editForm.grade}
                    onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                    className="w-full px-2 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={saveEdit}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={idx} className="even:bg-gray-100">
                <td className="border border-gray-300 p-2">{row.rollNo}</td>
                <td className="border border-gray-300 p-2">{row.studentName}</td>
                <td className="border border-gray-300 p-2">{row.branchName}</td>
                <td className="border border-gray-300 p-2">{row.subjectName}</td>
                <td className="border border-gray-300 p-2">{row.marks}</td>
                <td className="border border-gray-300 p-2">{row.semester}</td>
                <td className="border border-gray-300 p-2">{row.termExam}</td>
                <td className="border border-gray-300 p-2">{row.grade}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => startEdit(idx)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRow(idx)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentMarksTable;
