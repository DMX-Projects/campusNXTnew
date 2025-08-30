import React, { useState } from "react";

interface Permission {
  id: number;
  studentName: string;
  permissionType: string;
  startDate: string;
  endDate: string;
}

const HostelPermissions: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [form, setForm] = useState({
    studentName: "",
    permissionType: "",
    startDate: "",
    endDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle save
  const handleSave = () => {
    if (!form.studentName || !form.permissionType || !form.startDate || !form.endDate) {
      alert("Please fill all required fields");
      return;
    }

    const newPermission: Permission = {
      id: Date.now(),
      studentName: form.studentName,
      permissionType: form.permissionType,
      startDate: form.startDate,
      endDate: form.endDate,
    };

    setPermissions([...permissions, newPermission]);
    setForm({ studentName: "", permissionType: "", startDate: "", endDate: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Student Permissions</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Permission
        </button>
      </div>

      {/* Table */}
      {permissions.length > 0 ? (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Student Name</th>
              <th className="p-2 border">Permission Type</th>
              <th className="p-2 border">Start Date</th>
              <th className="p-2 border">End Date</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.studentName}</td>
                <td className="p-2 border">{p.permissionType}</td>
                <td className="p-2 border">{p.startDate}</td>
                <td className="p-2 border">{p.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No permissions added yet.</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">Add Permission</h3>

            <label className="block mb-2">
              Student Name *
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                value={form.studentName}
                onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              />
            </label>

            <label className="block mb-2">
              Permission Type *
              <select
                className="w-full border p-2 rounded mt-1"
                value={form.permissionType}
                onChange={(e) => setForm({ ...form, permissionType: e.target.value })}
              >
                <option value="">Select type</option>
                <option value="Leave">Leave</option>
                <option value="Outing">Outing</option>
              </select>
            </label>

            <label className="block mb-2">
              Start Date *
              <input
                type="date"
                className="w-full border p-2 rounded mt-1"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </label>

            <label className="block mb-2">
              End Date *
              <input
                type="date"
                className="w-full border p-2 rounded mt-1"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelPermissions;
