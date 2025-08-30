import React, { useState } from "react";

interface Placement {
  id: number;
  date: string;
  studentId: string;
  position: string;
  company: string;
  department: string;
}

const PlacementHistory: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([
    {
      id: 1,
      date: "2024-01-15",
      studentId: "C12345",
      position: "Software Engineer",
      company: "Tech Solutions Inc.",
      department: "Engineering",
    },
    {
      id: 2,
      date: "2024-02-10",
      studentId: "C12346",
      position: "Data Analyst",
      company: "Data Insights Ltd.",
      department: "Analytics",
    },
    {
      id: 3,
      date: "2024-03-22",
      studentId: "C12347",
      position: "Marketing Specialist",
      company: "Creative Agency",
      department: "Marketing",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Placement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (placement: Placement) => {
    setEditData(placement);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (!editData) return;

    setPlacements((prev) =>
      prev.map((p) => (p.id === editData.id ? editData : p))
    );

    setIsModalOpen(false);
    setEditData(null);
  };

  // Filter placements based on search query
  const filteredPlacements = placements.filter(
    (p) =>
      p.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-700">
          HISTORICAL PLACEMENT ANALYSES
        </h2>
        <input
          type="text"
          placeholder="Search placements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Placement ID</th>
            <th className="p-2">Date of Placement</th>
            <th className="p-2">Student ID</th>
            <th className="p-2">Position Title</th>
            <th className="p-2">Company / Organization</th>
            <th className="p-2">Department</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlacements.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.date}</td>
              <td className="p-2">{p.studentId}</td>
              <td className="p-2">{p.position}</td>
              <td className="p-2">{p.company}</td>
              <td className="p-2">{p.department}</td>
              <td className="p-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {filteredPlacements.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No placements found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
            <h3 className="text-lg font-bold mb-2">Edit Placement</h3>

            <input
              type="date"
              name="date"
              value={editData.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="studentId"
              value={editData.studentId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="position"
              value={editData.position}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="company"
              value={editData.company}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="department"
              value={editData.department}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

export default PlacementHistory;
