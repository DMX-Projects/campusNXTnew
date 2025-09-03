import React, { useState } from "react";
import { Edit, Check, X } from "lucide-react";

// Mock data for demonstration
const initialDuties = [
  {
    id: 1,
    subject: "Computer Networks",
    code: "CS301",
    date: "2025-09-06",
    room: "A201",
    branch: "CSE",
    time: "10:00 AM - 12:00 PM",
    session: "Mid Sem",
    type: "Midterm",
    status: "Pending",
  },
  {
    id: 2,
    subject: "Database Management",
    code: "CS302",
    date: "2025-09-08",
    room: "A206",
    branch: "CSE",
    time: "02:00 PM - 04:00 PM",
    session: "End Sem",
    type: "Semester",
    status: "Requested",
  },
  {
    id: 3,
    subject: "Digital Signal Processing",
    code: "EE301",
    date: "2025-09-10",
    room: "B102",
    branch: "EEE",
    time: "09:00 AM - 12:00 PM",
    session: "End Sem",
    type: "Semester",
    status: "Approved",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Requested: "bg-blue-100 text-blue-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const FacultyInvigilationDuties: React.FC = () => {
  const [duties, setDuties] = useState(initialDuties);
  const [editRow, setEditRow] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<any>(null);

  // Open edit modal
  const openEditModal = (row: any) => {
    setEditRow(row);
    setForm({ ...row });
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setEditRow(null);
    setForm(null);
  };

  // Form handling
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save edited row
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDuties((prev) =>
      prev.map((row) => (row.id === editRow.id ? { ...form } : row))
    );
    closeModal();
  };

  // Accept handler
  const handleAccept = (id: number) => {
    setDuties((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, status: "Approved" } : row
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">
        Invigilation Duties
      </h1>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 font-semibold text-left">Subject Name</th>
              <th className="p-3 font-semibold text-left">Subject Code</th>
              <th className="p-3 font-semibold text-left">Exam Date</th>
              <th className="p-3 font-semibold text-left">Room No</th>
              <th className="p-3 font-semibold text-left">Branch</th>
              <th className="p-3 font-semibold text-left">Exam Time</th>
              <th className="p-3 font-semibold text-left">Session</th>
              <th className="p-3 font-semibold text-left">Type</th>
              <th className="p-3 font-semibold text-left">Status</th>
              <th className="p-3 font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {duties.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                <td className="p-3">{row.subject}</td>
                <td className="p-3">{row.code}</td>
                <td className="p-3">{row.date}</td>
                <td className="p-3">{row.room}</td>
                <td className="p-3">{row.branch}</td>
                <td className="p-3">{row.time}</td>
                <td className="p-3">{row.session}</td>
                <td className="p-3">{row.type}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[row.status] || "bg-gray-100 text-gray-700"}`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-3 flex space-x-2">
                  <button
                    className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:text-blue-800 rounded border border-blue-200 bg-blue-50 transition"
                    onClick={() => openEditModal(row)}
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                  {row.status !== "Approved" && (
                    <button
                      className="flex items-center space-x-1 px-3 py-1 text-green-600 hover:text-green-800 rounded border border-green-200 bg-green-50 transition"
                      onClick={() => handleAccept(row.id)}
                    >
                      <Check size={16} />
                      <span>Accept</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {modalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-0 m-4 space-y-0 relative">
      <div className="flex justify-between items-center px-8 py-4 border-b">
        <h2 className="font-bold text-lg">Edit Invigilation Duty</h2>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-900 transition"
        >
          <X size={28} />
        </button>
      </div>
      <form onSubmit={handleEditSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-600">Subject Name</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-600">Subject Code</label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-600">Exam Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-600">Room No</label>
            <input
              type="text"
              name="room"
              value={form.room}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-600">Branch</label>
            <input
              type="text"
              name="branch"
              value={form.branch}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-600">Exam Time</label>
            <input
              type="text"
              name="time"
              value={form.time}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-600">Session</label>
            <input
              type="text"
              name="session"
              value={form.session}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 w-full text-base focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-600">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 w-full text-base bg-white focus:ring-2 focus:ring-blue-200"
              required
            >
              <option value="Midterm">Midterm</option>
              <option value="Semester">Semester</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-600">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 w-full text-base bg-white focus:ring-2 focus:ring-blue-200"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Requested">Requested</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-10">
          <button
            type="button"
            onClick={closeModal}
            className="px-6 py-2 rounded-lg border text-gray-700 bg-gray-50 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>


      )}
    </div>
  );
};

export default FacultyInvigilationDuties;
