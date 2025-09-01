import React, { useState } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
  location: string;
  package: string;
  positions: number;
  status: "Active" | "Inactive";
  lastVisit: string;
  arrivalDate: string;
}

const PlacementCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: "Tata Consultancy Services",
      logo: "/api/placeholder/60/60",
      industry: "IT Services",
      location: "Mumbai, India",
      package: "₹3.5 - 8.0 LPA",
      positions: 45,
      status: "Active",
      lastVisit: "2024-08-15",
      arrivalDate: "2024-09-20",
    },
    {
      id: 2,
      name: "Infosys Technologies",
      logo: "/api/placeholder/60/60",
      industry: "Software Development",
      location: "Bangalore, India",
      package: "₹4.0 - 9.5 LPA",
      positions: 30,
      status: "Active",
      lastVisit: "2024-07-22",
      arrivalDate: "2024-10-05",
    },
    {
      id: 3,
      name: "Wipro Limited",
      logo: "/api/placeholder/60/60",
      industry: "IT Consulting",
      location: "Pune, India",
      package: "₹3.8 - 7.5 LPA",
      positions: 25,
      status: "Inactive",
      lastVisit: "2024-06-10",
      arrivalDate: "2024-09-28",
    },
    {
      id: 4,
      name: "HCL Technologies",
      logo: "/api/placeholder/60/60",
      industry: "Technology Services",
      location: "Chennai, India",
      package: "₹3.2 - 6.8 LPA",
      positions: 20,
      status: "Active",
      lastVisit: "2024-08-01",
      arrivalDate: "2024-09-25",
    },
    {
      id: 5,
      name: "Accenture Solutions",
      logo: "/api/placeholder/60/60",
      industry: "Consulting & IT",
      location: "Hyderabad, India",
      package: "₹4.5 - 10.0 LPA",
      positions: 50,
      status: "Active",
      lastVisit: "2024-08-18",
      arrivalDate: "2024-10-15",
    },
    {
      id: 6,
      name: "Tech Mahindra",
      logo: "/api/placeholder/60/60",
      industry: "IT & Business Services",
      location: "Pune, India",
      package: "₹3.0 - 7.0 LPA",
      positions: 35,
      status: "Inactive",
      lastVisit: "2024-07-05",
      arrivalDate: "2024-09-30",
    },
    {
      id: 7,
      name: "Capgemini",
      logo: "/api/placeholder/60/60",
      industry: "Technology Consulting",
      location: "Bangalore, India",
      package: "₹3.6 - 8.5 LPA",
      positions: 40,
      status: "Active",
      lastVisit: "2024-08-12",
      arrivalDate: "2024-10-10",
    },
    {
      id: 8,
      name: "Deloitte",
      logo: "/api/placeholder/60/60",
      industry: "Consulting & Audit",
      location: "Gurgaon, India",
      package: "₹5.0 - 12.0 LPA",
      positions: 28,
      status: "Active",
      lastVisit: "2024-07-28",
      arrivalDate: "2024-10-20",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState<Company | null>(null);
  const [showEditModal, setShowEditModal] = useState<Company | null>(null);

  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    name: "",
    industry: "",
    location: "",
    package: "",
    arrivalDate: "",
    positions: 0,
    status: "Active",
    logo: "/api/placeholder/60/60",
    lastVisit: new Date().toISOString().split("T")[0],
  });

  // Filtered list
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new company
  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const id = companies.length + 1;
    setCompanies([...companies, { ...(newCompany as Company), id }]);
    setNewCompany({
      name: "",
      industry: "",
      location: "",
      package: "",
      arrivalDate: "",
      positions: 0,
      status: "Active",
      logo: "/api/placeholder/60/60",
      lastVisit: new Date().toISOString().split("T")[0],
    });
    setShowAddModal(false);
  };

  // Save edited company
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showEditModal) {
      setCompanies((prev) =>
        prev.map((c) => (c.id === showEditModal.id ? showEditModal : c))
      );
      setShowEditModal(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Placement Companies
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <BuildingOfficeIcon className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600">{company.industry}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    company.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {company.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span className="font-semibold text-gray-800 mr-1">
                    Location:
                  </span>
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                  <span className="font-semibold text-gray-800 mr-1">
                    Package:
                  </span>
                  <span>{company.package}</span>
                </div>
                <p>
                  <span className="font-semibold text-gray-800 mr-1">
                    Arrival Date:
                  </span>
                  <span>{company.arrivalDate}</span>
                </p>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setShowViewModal(company)}
                  className="flex-1 bg-indigo-50 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => setShowEditModal({ ...company })}
                  className="flex-1 bg-gray-50 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
{/* Add Modal */}
{showAddModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Add New Company</h2>
      <form onSubmit={handleAddCompany} className="space-y-4">
        {/* Company Name */}
        <input
          type="text"
          placeholder="Company Name"
          className="w-full border rounded p-2"
          value={newCompany.name}
          onChange={(e) =>
            setNewCompany({ ...newCompany, name: e.target.value })
          }
        />

        {/* Industry */}
        <input
          type="text"
          placeholder="Industry"
          className="w-full border rounded p-2"
          value={newCompany.industry}
          onChange={(e) =>
            setNewCompany({ ...newCompany, industry: e.target.value })
          }
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          className="w-full border rounded p-2"
          value={newCompany.location}
          onChange={(e) =>
            setNewCompany({ ...newCompany, location: e.target.value })
          }
        />

        {/* Package */}
        <input
          type="text"
          placeholder="Package"
          className="w-full border rounded p-2"
          value={newCompany.package}
          onChange={(e) =>
            setNewCompany({ ...newCompany, package: e.target.value })
          }
        />

        {/* Positions */}
        <input
          type="number"
          placeholder="Positions"
          className="w-full border rounded p-2"
          value={newCompany.positions}
          onChange={(e) =>
            setNewCompany({ ...newCompany, positions: e.target.value })
          }
        />

        {/* Status */}
        <select
          className="w-full border rounded p-2"
          value={newCompany.status}
          onChange={(e) =>
            setNewCompany({ ...newCompany, status: e.target.value })
          }
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
          <option value="Upcoming">Upcoming</option>
        </select>

        {/* Last Visit */}
        <input
          type="date"
          className="w-full border rounded p-2"
          value={newCompany.lastVisit}
          onChange={(e) =>
            setNewCompany({ ...newCompany, lastVisit: e.target.value })
          }
        />

        {/* Arrival Date */}
        <input
          type="date"
          className="w-full border rounded p-2"
          value={newCompany.arrivalDate}
          onChange={(e) =>
            setNewCompany({ ...newCompany, arrivalDate: e.target.value })
          }
        />

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-2">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
          >
            Add Company
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {showViewModal.name} - Details
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold text-gray-800">Industry:</span>{" "}
                {showViewModal.industry}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Location:</span>{" "}
                {showViewModal.location}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Package:</span>{" "}
                {showViewModal.package}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Positions:</span>{" "}
                {showViewModal.positions}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Status:</span>{" "}
                {showViewModal.status}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Arrival Date:</span>{" "}
                {showViewModal.arrivalDate}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Last Visit:</span>{" "}
                {showViewModal.lastVisit}
              </p>
            </div>
            <button
              onClick={() => setShowViewModal(null)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
{/* Edit Modal */}
{showEditModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Edit Company</h2>
      <form onSubmit={handleSaveEdit} className="space-y-4">
        {/* Company Name */}
        <input
          type="text"
          placeholder="Company Name"
          className="w-full border rounded p-2"
          value={showEditModal.name}
          onChange={(e) =>
            setShowEditModal({ ...showEditModal, name: e.target.value })
          }
        />

        {/* Industry */}
        <input
          type="text"
          placeholder="Industry"
          className="w-full border rounded p-2"
          value={showEditModal.industry}
          onChange={(e) =>
            setShowEditModal({ ...showEditModal, industry: e.target.value })
          }
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          className="w-full border rounded p-2"
          value={showEditModal.location}
          onChange={(e) =>
            setShowEditModal({ ...showEditModal, location: e.target.value })
          }
        />

        {/* Package */}
        <input
          type="text"
          placeholder="Package"
          className="w-full border rounded p-2"
          value={showEditModal.package}
          onChange={(e) =>
            setShowEditModal({ ...showEditModal, package: e.target.value })
          }
        />

        {/* Positions */}
        <input
          type="text"
          placeholder="Positions"
          className="w-full border rounded p-2"
          value={showEditModal.positions}
          onChange={(e) =>
            setShowEditModal({ ...showEditModal, positions: e.target.value })
          }
        />

        {/* Status */}
        <select
          className="w-full border rounded p-2"
          value={showEditModal.status}
          onChange={(e) =>
            setShowEditModal({ ...showEditModal, status: e.target.value })
          }
        >
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
          <option value="Upcoming">Upcoming</option>
        </select>

        {/* Last Visit */}
        <input
          type="date"
          className="w-full border rounded p-2"
          value={showEditModal.lastVisit}
          onChange={(e) =>
            setShowEditModal({ ...showEditModal, lastVisit: e.target.value })
          }
        />

        {/* Arrival Date */}
        <input
          type="date"
          className="w-full border rounded p-2"
          value={showEditModal.arrivalDate}
          onChange={(e) =>
            setShowEditModal({ ...showEditModal, arrivalDate: e.target.value })
          }
        />

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-2">
          <button
            type="button"
            onClick={() => setShowEditModal(null)}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default PlacementCompanies;
