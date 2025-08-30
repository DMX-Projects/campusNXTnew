import React, { useState } from "react";

interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  contactPerson: string;
  email: string;
}

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: "Tech Solutions Inc.",
      industry: "Software",
      location: "Bangalore, India",
      contactPerson: "Ravi Kumar",
      email: "ravi@techsolutions.com",
    },
    {
      id: 2,
      name: "Data Insights Ltd.",
      industry: "Analytics",
      location: "Hyderabad, India",
      contactPerson: "Sneha Mehta",
      email: "sneha@datainsights.com",
    },
    {
      id: 3,
      name: "Creative Agency",
      industry: "Marketing",
      location: "Mumbai, India",
      contactPerson: "Arjun Singh",
      email: "arjun@creativeagency.com",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (company: Company) => {
    setEditData(company);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (!editData) return;

    setCompanies((prev) =>
      prev.map((c) => (c.id === editData.id ? editData : c))
    );

    setIsModalOpen(false);
    setEditData(null);
  };

  // Filter companies based on search
  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-700">
          COMPANY DIRECTORY
        </h2>
        <input
          type="text"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Company ID</th>
            <th className="p-2">Company Name</th>
            <th className="p-2">Industry</th>
            <th className="p-2">Location</th>
            <th className="p-2">Contact Person</th>
            <th className="p-2">Email</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{c.id}</td>
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.industry}</td>
              <td className="p-2">{c.location}</td>
              <td className="p-2">{c.contactPerson}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {filteredCompanies.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No companies found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
            <h3 className="text-lg font-bold mb-2">Edit Company</h3>

            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="industry"
              value={editData.industry}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="location"
              value={editData.location}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="contactPerson"
              value={editData.contactPerson}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={editData.email}
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

export default Companies;
