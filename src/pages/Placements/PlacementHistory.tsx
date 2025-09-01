import React, { useState } from "react";

interface Placement {
  id: number;
  date: string;
  company: string;
  role: string;
  department: string;
  ctc: string;
  location: string;
}

const PlacementHistory: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([
  {
    id: 1,
    date: "2024-01-15",
    company: "Tech Solutions Inc.",
    role: "Software Engineer",
    department: "Engineering",
    ctc: "6 LPA",
    location: "Bangalore",
  },
  {
    id: 2,
    date: "2024-02-10",
    company: "Data Insights Ltd.",
    role: "Data Analyst",
    department: "Analytics",
    ctc: "5 LPA",
    location: "Hyderabad",
  },
  {
    id: 3,
    date: "2024-03-22",
    company: "Creative Agency",
    role: "Marketing Specialist",
    department: "Marketing",
    ctc: "4.5 LPA",
    location: "Mumbai",
  },
  {
    id: 4,
    date: "2024-04-05",
    company: "FinTech Global",
    role: "Business Analyst",
    department: "Finance",
    ctc: "7 LPA",
    location: "Pune",
  },
  {
    id: 5,
    date: "2024-05-18",
    company: "NextGen Robotics",
    role: "Robotics Engineer",
    department: "Mechanical",
    ctc: "8 LPA",
    location: "Chennai",
  },
  {
    id: 6,
    date: "2024-06-30",
    company: "HealthCare Plus",
    role: "ML Engineer",
    department: "Computer Science",
    ctc: "10 LPA",
    location: "Bangalore",
  },
  {
    id: 7,
    date: "2024-07-12",
    company: "EduTech Hub",
    role: "Frontend Developer",
    department: "IT",
    ctc: "5.5 LPA",
    location: "Delhi",
  },
  {
    id: 8,
    date: "2024-08-21",
    company: "Green Energy Corp",
    role: "Electrical Engineer",
    department: "Electrical",
    ctc: "6.2 LPA",
    location: "Hyderabad",
  },
  {
    id: 9,
    date: "2024-09-10",
    company: "CyberSecure Ltd.",
    role: "Cybersecurity Analyst",
    department: "Information Security",
    ctc: "9 LPA",
    location: "Noida",
  },
  {
    id: 10,
    date: "2024-10-02",
    company: "AI Innovators",
    role: "AI Research Associate",
    department: "Artificial Intelligence",
    ctc: "12 LPA",
    location: "Bangalore",
  },
]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Placement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Add company modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPlacement, setNewPlacement] = useState<Placement>({
    id: 0,
    date: "",
    company: "",
    role: "",
    department: "",
    ctc: "",
    location: "",
  });

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

  // Handle add placement
  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlacement({ ...newPlacement, [e.target.name]: e.target.value });
  };

  const handleAddSave = () => {
    const newEntry = { ...newPlacement, id: placements.length + 1 };
    setPlacements((prev) => [...prev, newEntry]);
    setIsAddModalOpen(false);
    setNewPlacement({
      id: 0,
      date: "",
      company: "",
      role: "",
      department: "",
      ctc: "",
      location: "",
    });
  };

  // Filter placements based on search query
  const filteredPlacements = placements.filter(
    (p) =>
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ctc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Company Placement History
        </h1>

        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Search company visits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Company
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Date</th>
            <th className="p-2">Company</th>
            <th className="p-2">Role</th>
            <th className="p-2">Department</th>
            <th className="p-2">CTC</th>
            <th className="p-2">Location</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlacements.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.date}</td>
              <td className="p-2">{p.company}</td>
              <td className="p-2">{p.role}</td>
              <td className="p-2">{p.department}</td>
              <td className="p-2">{p.ctc}</td>
              <td className="p-2">{p.location}</td>
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
              <td colSpan={8} className="text-center p-4 text-gray-500">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
            <h3 className="text-lg font-bold mb-2">Edit Company Visit</h3>

            <input
              type="date"
              name="date"
              value={editData.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="company"
              value={editData.company}
              onChange={handleChange}
              placeholder="Company"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="role"
              value={editData.role}
              onChange={handleChange}
              placeholder="Role"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="department"
              value={editData.department}
              onChange={handleChange}
              placeholder="Department"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="ctc"
              value={editData.ctc}
              onChange={handleChange}
              placeholder="CTC"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="location"
              value={editData.location}
              onChange={handleChange}
              placeholder="Location"
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

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
            <h3 className="text-lg font-bold mb-2">Add New Company Visit</h3>

            <input
              type="date"
              name="date"
              value={newPlacement.date}
              onChange={handleAddChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="company"
              value={newPlacement.company}
              onChange={handleAddChange}
              placeholder="Company"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="role"
              value={newPlacement.role}
              onChange={handleAddChange}
              placeholder="Role"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="department"
              value={newPlacement.department}
              onChange={handleAddChange}
              placeholder="Department"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="ctc"
              value={newPlacement.ctc}
              onChange={handleAddChange}
              placeholder="CTC"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="location"
              value={newPlacement.location}
              onChange={handleAddChange}
              placeholder="Location"
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
